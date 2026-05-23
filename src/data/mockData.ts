import type {
  Achievement,
  DailyMission,
  LeaderboardEntry,
  Lesson,
} from "@/types";

export const stats = [
  { label: "Active learners", value: 2400000, suffix: "+" },
  { label: "Lessons completed", value: 48, suffix: "M+" },
  { label: "Countries", value: 120, suffix: "+" },
  { label: "Average rating", value: 4.9, suffix: "/5" },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "University Student",
    content:
      "Lingua feels like a professional tool, not a game for kids. The focus mode and AI tutor helped me pass IELTS with confidence.",
    avatar: "SC",
  },
  {
    name: "Marcus Webb",
    role: "Software Engineer",
    content:
      "I practice during lunch breaks. Clean UI, smart recommendations, and real conversation simulations — exactly what I needed.",
    avatar: "MW",
  },
  {
    name: "Elena Rodriguez",
    role: "Business Professional",
    content:
      "The dashboard analytics show exactly where I need improvement. Premium design that actually motivates daily practice.",
    avatar: "ER",
  },
];

export const advantages = [
  {
    title: "Adaptive Learning Path",
    description:
      "AI analyzes your strengths and gaps to build a personalized curriculum that evolves with you.",
  },
  {
    title: "Real-World Conversations",
    description:
      "Practice interviews, meetings, and travel scenarios with intelligent conversation simulations.",
  },
  {
    title: "Focus-First Experience",
    description:
      "Distraction-free study mode with timers, ambient sounds, and progress tracking built in.",
  },
  {
    title: "Professional Analytics",
    description:
      "Detailed insights on vocabulary retention, grammar accuracy, and speaking fluency over time.",
  },
];

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Business Email Essentials",
    description: "Master formal tone, structure, and common phrases for professional correspondence.",
    type: "writing",
    duration: 15,
    xpReward: 50,
    difficulty: "intermediate",
    progress: 65,
    tags: ["business", "writing"],
  },
  {
    id: "2",
    title: "Present Perfect Deep Dive",
    description: "Understand when and how to use present perfect in real contexts.",
    type: "grammar",
    duration: 20,
    xpReward: 60,
    difficulty: "intermediate",
    progress: 30,
    tags: ["grammar", "tenses"],
  },
  {
    id: "3",
    title: "Podcast Listening: Tech News",
    description: "Train your ear with authentic tech podcast excerpts and comprehension checks.",
    type: "listening",
    duration: 12,
    xpReward: 45,
    difficulty: "advanced",
    progress: 0,
    tags: ["listening", "technology"],
  },
  {
    id: "4",
    title: "Job Interview Simulation",
    description: "Practice answering common interview questions with AI feedback.",
    type: "conversation",
    duration: 25,
    xpReward: 80,
    difficulty: "advanced",
    progress: 0,
    locked: false,
    tags: ["speaking", "career"],
  },
  {
    id: "5",
    title: "Academic Vocabulary Set 4",
    description: "Expand your academic word bank with context-based exercises.",
    type: "vocabulary",
    duration: 10,
    xpReward: 40,
    difficulty: "intermediate",
    progress: 100,
    tags: ["vocabulary", "academic"],
  },
  {
    id: "6",
    title: "Pronunciation: TH Sounds",
    description: "Perfect the voiced and voiceless TH sounds with guided practice.",
    type: "speaking",
    duration: 8,
    xpReward: 35,
    difficulty: "beginner",
    progress: 45,
    tags: ["speaking", "pronunciation"],
  },
];

export const dailyMissions: DailyMission[] = [
  { id: "1", title: "Complete 2 lessons", xpReward: 30, completed: true, progress: 2, target: 2 },
  { id: "2", title: "Practice speaking for 5 min", xpReward: 25, completed: false, progress: 3, target: 5 },
  { id: "3", title: "Review 20 vocabulary words", xpReward: 20, completed: false, progress: 12, target: 20 },
  { id: "4", title: "Maintain your streak", xpReward: 15, completed: true, progress: 1, target: 1 },
];

export const achievements: Achievement[] = [
  { id: "1", title: "First Steps", description: "Complete your first lesson", icon: "🎯", unlocked: true },
  { id: "2", title: "Week Warrior", description: "7-day learning streak", icon: "🔥", unlocked: true },
  { id: "3", title: "Grammar Guru", description: "Score 90%+ on 10 grammar quizzes", icon: "📚", unlocked: false, progress: 6, maxProgress: 10 },
  { id: "4", title: "Conversation Master", description: "Complete 5 conversation simulations", icon: "💬", unlocked: false, progress: 2, maxProgress: 5 },
];

export const leaderboard: LeaderboardEntry[] = [
  { id: "1", name: "Jordan Lee", xp: 12400, level: 18, rank: 1 },
  { id: "2", name: "Alex Morgan", xp: 4820, level: 12, rank: 2 },
  { id: "3", name: "Priya Sharma", xp: 4650, level: 11, rank: 3 },
  { id: "4", name: "Tomás Silva", xp: 4200, level: 11, rank: 4 },
  { id: "5", name: "Nina Kowalski", xp: 3980, level: 10, rank: 5 },
];

export const weeklyActivity = [
  { day: "Mon", minutes: 25, xp: 120 },
  { day: "Tue", minutes: 40, xp: 180 },
  { day: "Wed", minutes: 15, xp: 90 },
  { day: "Thu", minutes: 35, xp: 150 },
  { day: "Fri", minutes: 50, xp: 220 },
  { day: "Sat", minutes: 20, xp: 100 },
  { day: "Sun", minutes: 30, xp: 140 },
];

export const quizQuestions = [
  {
    id: "q1",
    type: "multiple-choice" as const,
    prompt: "Choose the correct form: She ___ in London for three years.",
    options: ["lives", "has lived", "is living", "lived"],
    correctAnswer: "has lived",
    explanation: "Present perfect is used for actions that started in the past and continue to the present.",
  },
  {
    id: "q2",
    type: "typing" as const,
    prompt: "Type the missing word: I would like to ___ a meeting for next Tuesday.",
    correctAnswer: "schedule",
    explanation: "'Schedule' is the standard business verb for arranging meetings.",
  },
  {
    id: "q3",
    type: "multiple-choice" as const,
    prompt: "Which phrase is most appropriate for a formal email closing?",
    options: ["See ya!", "Cheers mate", "Best regards", "Later"],
    correctAnswer: "Best regards",
  },
];
