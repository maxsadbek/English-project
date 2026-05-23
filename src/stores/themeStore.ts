import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      resolvedTheme: "light",
      setTheme: (theme) => {
        const resolved = resolveTheme(theme);
        document.documentElement.classList.toggle("dark", resolved === "dark");
        set({ theme, resolvedTheme: resolved });
      },
    }),
    {
      name: "lingua-theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolved = resolveTheme(state.theme);
          document.documentElement.classList.toggle("dark", resolved === "dark");
          state.resolvedTheme = resolved;
        }
      },
    }
  )
);
