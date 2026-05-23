import { create } from "zustand";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  getAuthErrorMessage,
  isFirebaseConfigured,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  signUpWithEmail,
} from "@/lib/auth";
import {
  getLocalSession,
  localGoogleSignIn,
  localSignIn,
  localSignOut,
  localSignUp,
  updateLocalProfile,
} from "@/lib/localAuth";
import {
  completeOnboarding as markOnboardingComplete,
  ensureUserProfile,
} from "@/lib/userService";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  isDemoMode: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  loginWithGoogle: (opts?: { email?: string; name?: string }) => Promise<User>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  initAuth: () => () => void;
}

function profileFromFirebase(firebaseUser: FirebaseUser, displayName?: string): User {
  return {
    id: firebaseUser.uid,
    name:
      displayName?.trim() ||
      firebaseUser.displayName ||
      firebaseUser.email?.split("@")[0] ||
      "Learner",
    email: firebaseUser.email ?? "",
    avatar: firebaseUser.photoURL ?? undefined,
    role: "student",
    level: 1,
    xp: 0,
    streak: 0,
    dailyGoal: 30,
    dailyProgress: 0,
    joinedAt: new Date().toISOString().split("T")[0],
    onboardingCompleted: false,
  };
}

async function syncFirebaseUser(firebaseUser: FirebaseUser, displayName?: string): Promise<User> {
  try {
    return await ensureUserProfile(firebaseUser, displayName);
  } catch {
    return profileFromFirebase(firebaseUser, displayName);
  }
}

function getErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    return getAuthErrorMessage(String((err as { code: string }).code));
  }
  if (err instanceof Error) return err.message;
  return "Noma'lum xatolik yuz berdi.";
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  isDemoMode: !isFirebaseConfigured(),
  error: null,

  initAuth: () => {
    const demo = !isFirebaseConfigured();

    if (demo) {
      const session = getLocalSession();
      set({
        user: session,
        isAuthenticated: !!session,
        isInitialized: true,
        isDemoMode: true,
        isLoading: false,
      });
      return () => {};
    }

    set({ isDemoMode: false });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const profile = await syncFirebaseUser(firebaseUser);
          set({
            user: profile,
            isAuthenticated: true,
            isInitialized: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            isLoading: false,
          });
        }
      } catch {
        if (firebaseUser) {
          const profile = profileFromFirebase(firebaseUser);
          set({
            user: profile,
            isAuthenticated: true,
            isInitialized: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            isLoading: false,
            error: "Sessiya yuklanmadi.",
          });
        }
      }
    });

    return unsubscribe;
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    if (!isFirebaseConfigured()) {
      try {
        const profile = localSignIn(email, password);
        set({ user: profile, isAuthenticated: true, isLoading: false, isDemoMode: true });
        return profile;
      } catch (err) {
        const message = getErrorMessage(err);
        set({ isLoading: false, error: message });
        throw err;
      }
    }

    try {
      const firebaseUser = await signInWithEmail(email, password);
      const profile = await syncFirebaseUser(firebaseUser);
      set({ user: profile, isAuthenticated: true, isLoading: false, isDemoMode: false });
      return profile;
    } catch (err) {
      const message = getErrorMessage(err);
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });

    if (!isFirebaseConfigured()) {
      try {
        const profile = localSignUp(name, email, password);
        set({ user: profile, isAuthenticated: true, isLoading: false, isDemoMode: true });
        return profile;
      } catch (err) {
        const message = getErrorMessage(err);
        set({ isLoading: false, error: message });
        throw err;
      }
    }

    try {
      const firebaseUser = await signUpWithEmail(email, password, name);
      const profile = await syncFirebaseUser(firebaseUser, name);
      set({ user: profile, isAuthenticated: true, isLoading: false, isDemoMode: false });
      return profile;
    } catch (err) {
      const message = getErrorMessage(err);
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  loginWithGoogle: async (opts) => {
    set({ isLoading: true, error: null });

    if (!isFirebaseConfigured()) {
      try {
        const profile = localGoogleSignIn(opts?.email, opts?.name);
        set({ user: profile, isAuthenticated: true, isLoading: false, isDemoMode: true });
        return profile;
      } catch (err) {
        const message = getErrorMessage(err);
        set({ isLoading: false, error: message });
        throw err;
      }
    }

    try {
      const firebaseUser = await signInWithGoogle();
      const profile = await syncFirebaseUser(firebaseUser);
      set({ user: profile, isAuthenticated: true, isLoading: false, isDemoMode: false });
      return profile;
    } catch (err) {
      const message = getErrorMessage(err);
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      if (isFirebaseConfigured()) {
        await signOutUser();
      } else {
        localSignOut();
      }
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (err) {
      const message = getErrorMessage(err);
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  completeOnboarding: async () => {
    const current = get().user;
    if (!current) return;

    if (get().isDemoMode) {
      const updated = { ...current, onboardingCompleted: true };
      updateLocalProfile(updated);
      set({ user: updated });
      return;
    }

    if (isFirebaseConfigured()) {
      try {
        await markOnboardingComplete(current.id);
      } catch {
        /* Firestore yo'q bo'lsa ham dashboardga o'tsin */
      }
    }

    set({ user: { ...current, onboardingCompleted: true } });
  },

  clearError: () => set({ error: null }),

  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
