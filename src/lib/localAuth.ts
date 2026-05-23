import type { User } from "@/types";

const USERS_KEY = "lingua-local-users";
const SESSION_KEY = "lingua-local-session";

interface LocalAccount {
  name: string;
  email: string;
  password: string;
  profile: User;
}

function loadAccounts(): LocalAccount[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as LocalAccount[]) : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: LocalAccount[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(accounts));
}

function createProfile(name: string, email: string, id?: string): User {
  return {
    id: id ?? `local-${Date.now()}`,
    name,
    email,
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

export function getLocalSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setLocalSession(user: User | null) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

export function localSignUp(name: string, email: string, password: string): User {
  const normalized = email.trim().toLowerCase();
  const accounts = loadAccounts();

  if (accounts.some((a) => a.email === normalized)) {
    throw { code: "auth/email-already-in-use" };
  }

  const profile = createProfile(name.trim(), normalized);
  accounts.push({ name: name.trim(), email: normalized, password, profile });
  saveAccounts(accounts);
  setLocalSession(profile);
  return profile;
}

export function localSignIn(email: string, password: string): User {
  const normalized = email.trim().toLowerCase();
  const account = loadAccounts().find((a) => a.email === normalized);

  if (!account) {
    throw { code: "auth/user-not-found" };
  }
  if (account.password !== password) {
    throw { code: "auth/wrong-password" };
  }

  setLocalSession(account.profile);
  return account.profile;
}

export function localGoogleSignIn(email?: string, name?: string): User {
  const normalized = email?.trim().toLowerCase() || "google-local@lingua.app";
  const displayName = name?.trim() || "Google User";
  const accounts = loadAccounts();
  const existing = accounts.find((a) => a.email === normalized);

  if (existing) {
    setLocalSession(existing.profile);
    return existing.profile;
  }

  const profile = createProfile(displayName, normalized);
  accounts.push({
    name: displayName,
    email: normalized,
    password: "google-oauth-local",
    profile,
  });
  saveAccounts(accounts);
  setLocalSession(profile);
  return profile;
}

export function updateLocalProfile(user: User) {
  const accounts = loadAccounts();
  const idx = accounts.findIndex((a) => a.profile.id === user.id);
  if (idx >= 0) {
    accounts[idx].profile = user;
    saveAccounts(accounts);
  }
  setLocalSession(user);
}

export function localSignOut() {
  setLocalSession(null);
}
