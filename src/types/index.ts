export type UserRole = "student" | "admin" | "teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  level: number;
  xp: number;
  streak: number;
  dailyGoal: number;
  dailyProgress: number;
  joinedAt: string;
  onboardingCompleted?: boolean;
}

export type LessonType =
  | "vocabulary"
  | "grammar"
  | "listening"
  | "speaking"
  | "writing"
  | "conversation";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  duration: number;
  xpReward: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  progress: number;
  locked?: boolean;
  tags: string[];
}

export type QuizType = "multiple-choice" | "drag-drop" | "typing" | "voice";

export interface QuizQuestion {
  id: string;
  type: QuizType;
  prompt: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface DailyMission {
  id: string;
  title: string;
  xpReward: number;
  completed: boolean;
  progress: number;
  target: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  rank: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  lessonId?: string;
  createdAt: string;
}

export interface OnboardingData {
  goal: string;
  level: string;
  dailyMinutes: number;
  interests: string[];
}
