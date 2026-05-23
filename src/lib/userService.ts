import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import type { User as FirebaseUser } from "firebase/auth";
import { db } from "@/lib/firebase";
import type { User } from "@/types";

export interface UserProfileDoc {
  name: string;
  email: string;
  avatar?: string;
  role: "student" | "admin" | "teacher";
  level: number;
  xp: number;
  streak: number;
  dailyGoal: number;
  dailyProgress: number;
  joinedAt: string;
  onboardingCompleted: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

function docToUser(uid: string, data: UserProfileDoc): User {
  return {
    id: uid,
    name: data.name,
    email: data.email,
    avatar: data.avatar,
    role: data.role,
    level: data.level,
    xp: data.xp,
    streak: data.streak,
    dailyGoal: data.dailyGoal,
    dailyProgress: data.dailyProgress,
    joinedAt: data.joinedAt,
    onboardingCompleted: data.onboardingCompleted,
  };
}

export async function getUserProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return docToUser(uid, snap.data() as UserProfileDoc);
}

export async function createUserProfile(
  firebaseUser: FirebaseUser,
  displayName?: string
): Promise<User> {
  const uid = firebaseUser.uid;
  const ref = doc(db, "users", uid);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    return docToUser(uid, existing.data() as UserProfileDoc);
  }

  const profile: UserProfileDoc = {
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
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };

  await setDoc(ref, profile);
  return docToUser(uid, profile);
}

export async function ensureUserProfile(
  firebaseUser: FirebaseUser,
  displayName?: string
): Promise<User> {
  const existing = await getUserProfile(firebaseUser.uid);
  if (existing) {
    if (firebaseUser.photoURL && existing.avatar !== firebaseUser.photoURL) {
      await updateDoc(doc(db, "users", firebaseUser.uid), {
        avatar: firebaseUser.photoURL,
        updatedAt: serverTimestamp(),
      });
      return { ...existing, avatar: firebaseUser.photoURL };
    }
    return existing;
  }
  return createUserProfile(firebaseUser, displayName);
}

export async function completeOnboarding(uid: string): Promise<void> {
  await updateDoc(doc(db, "users", uid), {
    onboardingCompleted: true,
    updatedAt: serverTimestamp(),
  });
}
