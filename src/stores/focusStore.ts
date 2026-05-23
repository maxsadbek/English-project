import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Note } from "@/types";

interface FocusState {
  focusMinutes: number;
  isTimerRunning: boolean;
  musicEnabled: boolean;
  bookmarkedLessons: string[];
  notes: Note[];
  setFocusMinutes: (minutes: number) => void;
  toggleTimer: () => void;
  toggleMusic: () => void;
  toggleBookmark: (lessonId: string) => void;
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set, get) => ({
      focusMinutes: 25,
      isTimerRunning: false,
      musicEnabled: false,
      bookmarkedLessons: [],
      notes: [],

      setFocusMinutes: (focusMinutes) => set({ focusMinutes }),
      toggleTimer: () => set({ isTimerRunning: !get().isTimerRunning }),
      toggleMusic: () => set({ musicEnabled: !get().musicEnabled }),
      toggleBookmark: (lessonId) => {
        const bookmarks = get().bookmarkedLessons;
        set({
          bookmarkedLessons: bookmarks.includes(lessonId)
            ? bookmarks.filter((id) => id !== lessonId)
            : [...bookmarks, lessonId],
        });
      },
      addNote: (note) => set({ notes: [note, ...get().notes] }),
      removeNote: (id) =>
        set({ notes: get().notes.filter((n) => n.id !== id) }),
    }),
    { name: "lingua-focus" }
  )
);
