import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export function isFirebaseConfigured(): boolean {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return Boolean(apiKey && apiKey !== "demo-api-key" && apiKey.length > 10);
}

export function getAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    "auth/invalid-email": "Email manzil noto'g'ri.",
    "auth/user-disabled": "Bu hisob o'chirilgan.",
    "auth/user-not-found": "Foydalanuvchi topilmadi. Ro'yxatdan o'ting.",
    "auth/wrong-password": "Parol noto'g'ri.",
    "auth/invalid-credential": "Email yoki parol noto'g'ri.",
    "auth/email-already-in-use": "Bu email allaqachon ro'yxatdan o'tgan.",
    "auth/weak-password": "Parol kamida 6 ta belgidan iborat bo'lishi kerak.",
    "auth/too-many-requests": "Juda ko'p urinish. Biroz kuting.",
    "auth/popup-closed-by-user": "Google oynasi yopildi. Qayta urinib ko'ring.",
    "auth/popup-blocked-by-browser": "Brauzer popupni blokladi. Popupga ruxsat bering.",
    "auth/cancelled-popup-request": "Kutilmoqda... Qayta urinib ko'ring.",
    "auth/operation-not-allowed":
      "Google login Firebase da yoqilmagan. Console → Authentication → Google ni yoqing.",
    "auth/unauthorized-domain":
      "Bu domen Firebase da ruxsat etilmagan. Console → Authentication → Authorized domains ga localhost qo'shing.",
    "auth/network-request-failed": "Internet aloqasini tekshiring.",
    "auth/missing-password": "Parolni kiriting.",
  };
  return messages[code] ?? `Xatolik: ${code}`;
}

export async function signInWithEmail(email: string, password: string): Promise<FirebaseUser> {
  const result = await signInWithEmailAndPassword(auth, email.trim(), password);
  return result.user;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> {
  const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (displayName.trim()) {
    await updateProfile(result.user, { displayName: displayName.trim() });
  }
  return result.user;
}

export async function signInWithGoogle(): Promise<FirebaseUser> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutUser(): Promise<void> {
  await firebaseSignOut(auth);
}
