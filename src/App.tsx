import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useThemeStore } from "@/stores/themeStore";

const LandingPage = lazy(() =>
  import("@/pages/landing/LandingPage").then((m) => ({ default: m.LandingPage }))
);
const AuthPage = lazy(() =>
  import("@/pages/auth/AuthPage").then((m) => ({ default: m.AuthPage }))
);
const OnboardingPage = lazy(() =>
  import("@/pages/onboarding/OnboardingPage").then((m) => ({ default: m.OnboardingPage }))
);
const DashboardPage = lazy(() =>
  import("@/pages/dashboard/DashboardPage").then((m) => ({ default: m.DashboardPage }))
);
const LessonsPage = lazy(() =>
  import("@/pages/lessons/LessonsPage").then((m) => ({ default: m.LessonsPage }))
);
const QuizPage = lazy(() =>
  import("@/pages/quiz/QuizPage").then((m) => ({ default: m.QuizPage }))
);
const AIPage = lazy(() => import("@/pages/ai/AIPage").then((m) => ({ default: m.AIPage })));
const CommunityPage = lazy(() =>
  import("@/pages/community/CommunityPage").then((m) => ({ default: m.CommunityPage }))
);
const AdminPage = lazy(() =>
  import("@/pages/admin/AdminPage").then((m) => ({ default: m.AdminPage }))
);
const FocusPage = lazy(() =>
  import("@/pages/focus/FocusPage").then((m) => ({ default: m.FocusPage }))
);
const AchievementsPage = lazy(() =>
  import("@/pages/achievements/AchievementsPage").then((m) => ({ default: m.AchievementsPage }))
);
const SettingsPage = lazy(() =>
  import("@/pages/settings/SettingsPage").then((m) => ({ default: m.SettingsPage }))
);

function ThemeInitializer() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    setTheme(theme);
  }, []);

  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />} key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/sign-in" element={<AuthPage mode="sign-in" />} />
          <Route path="/auth/sign-up" element={<AuthPage mode="sign-up" />} />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/lessons/:lessonId" element={<LessonsPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/focus" element={<FocusPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeInitializer />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
