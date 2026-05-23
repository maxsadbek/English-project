import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/authStore";

interface AuthPageProps {
  mode: "sign-in" | "sign-up";
}

function getRedirectPath(onboardingCompleted?: boolean) {
  return onboardingCompleted ? "/dashboard" : "/onboarding";
}

export function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate();
  const {
    login,
    signup,
    loginWithGoogle,
    isLoading,
    isAuthenticated,
    isInitialized,
    user,
    error,
    clearError,
  } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSignUp = mode === "sign-up";
  const isDemoMode = useAuthStore((s) => s.isDemoMode);

  useEffect(() => {
    clearError();
  }, [mode, clearError]);

  useEffect(() => {
    if (isInitialized && isAuthenticated && user) {
      navigate(getRedirectPath(user.onboardingCompleted), { replace: true });
    }
  }, [isInitialized, isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (isSignUp && password !== confirmPassword) {
      useAuthStore.setState({ error: "Parollar mos kelmayapti." });
      return;
    }

    if (isSignUp && password.length < 6) {
      useAuthStore.setState({ error: "Parol kamida 6 ta belgidan iborat bo'lishi kerak." });
      return;
    }

    try {
      const profile = isSignUp
        ? await signup(name, email, password)
        : await login(email, password);
      navigate(getRedirectPath(profile.onboardingCompleted), { replace: true });
    } catch {
      // error is set in store
    }
  };

  const handleGoogleSignIn = async () => {
    clearError();
    try {
      const profile = await loginWithGoogle({ email, name });
      navigate(getRedirectPath(profile.onboardingCompleted), { replace: true });
    } catch {
      // error is set in store
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold">Lingua</span>
        </Link>
        <div>
          <h2 className="font-serif text-4xl leading-tight">
            Learn with clarity.
            <br />
            <span className="italic text-primary">Grow with purpose.</span>
          </h2>
          <p className="mt-4 max-w-md text-zinc-400">
            Join a community of focused learners mastering English through intelligent,
            distraction-free practice.
          </p>
        </div>
        <p className="text-sm text-zinc-500">© Lingua — Premium English Learning</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {isDemoMode && (
            <div className="mb-4 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-700 dark:text-blue-300">
              <strong>Demo rejim.</strong> Hozir login brauzerda saqlanadi. Haqiqiy Google
              uchun <code className="rounded bg-muted px-1">.env</code> da Firebase kalitlarini
              qo&apos;ying.
            </div>
          )}

          <Card className="glass-card border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">
                {isSignUp ? "Hisob yarating" : "Xush kelibsiz"}
              </CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Premium o'rganishni bugun boshlang"
                  : "Davom etish uchun tizimga kiring"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <Button
                variant="outline"
                type="button"
                className="w-full gap-2"
                disabled={isLoading}
                onClick={handleGoogleSignIn}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                Google bilan kirish
              </Button>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  yoki email orqali
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="name">To'liq ism</Label>
                    <Input
                      id="name"
                      placeholder="Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Parol</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                  />
                </div>
                {isSignUp && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      autoComplete="new-password"
                    />
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Kutilmoqda...
                    </>
                  ) : isSignUp ? (
                    "Ro'yxatdan o'tish"
                  ) : (
                    "Kirish"
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                {isSignUp ? "Hisobingiz bormi?" : "Hisobingiz yo'qmi?"}{" "}
                <Link
                  to={isSignUp ? "/auth/sign-in" : "/auth/sign-up"}
                  className="font-medium text-primary hover:underline"
                >
                  {isSignUp ? "Kirish" : "Ro'yxatdan o'tish"}
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
