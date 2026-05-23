# EnglishHub — Premium English Learning Platform

A modern, premium English learning platform built for teenagers, students, and adults. Calm, intelligent, and polished — inspired by Apple, Notion, and Linear.

![EnglishHub](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

- **Landing Page** — Hero, animated stats, testimonials, advantages, CTAs
- **Authentication** — Sign in/up, social login UI, session persistence (Zustand)
- **Student Dashboard** — XP, streaks, charts, missions, recommendations
- **Lessons** — Vocabulary, grammar, listening, speaking, writing, conversation
- **Interactive Quiz** — Multiple choice, typing, voice UI, instant feedback
- **Gamification** — XP, levels, achievements, leaderboards, daily missions
- **AI Tutor** — Chat teacher, pronunciation, smart suggestions
- **Community** — Friends, groups, challenges, study rooms
- **Admin Panel** — User management, analytics, reports
- **Focus Mode** — Timer, ambient sounds, notes, bookmarks
- **Dark/Light Theme** — System-aware theme switching

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS + tailwindcss-animate
- Framer Motion
- React Router 7
- Zustand (state + persistence)
- shadcn/ui patterns + Radix UI
- Lucide React icons
- Recharts
- Firebase (configured, demo-ready)

## Project Structure

```
src/
├── components/
│   ├── auth/          # ProtectedRoute
│   ├── layout/        # Navbar, Sidebar, DashboardLayout, transitions
│   ├── shared/        # StatCard, LessonCard, StreakCalendar, etc.
│   └── ui/            # shadcn-style primitives
├── pages/
│   ├── landing/       # LandingPage
│   ├── auth/          # AuthPage
│   ├── onboarding/    # OnboardingPage
│   ├── dashboard/     # DashboardPage
│   ├── lessons/       # LessonsPage
│   ├── quiz/          # QuizPage
│   ├── ai/            # AIPage
│   ├── community/     # CommunityPage
│   ├── admin/         # AdminPage
│   ├── focus/         # FocusPage
│   ├── achievements/  # AchievementsPage
│   └── settings/      # SettingsPage
├── stores/            # authStore, themeStore, focusStore
├── data/              # mockData
├── lib/               # utils, firebase
└── types/             # TypeScript interfaces
```

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables (optional — works in demo mode)
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build
```

## Demo Login

Sign in with any email/password — demo authentication simulates a session and redirects to onboarding, then the dashboard.

## Firebase Setup

Add your Firebase credentials to `.env`:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
...
```

## Design Philosophy

- Minimal but premium aesthetic
- Calm zinc/slate palette with blue and emerald accents
- Glassmorphism, soft shadows, rounded 2xl cards
- No childish or cartoonish elements
- Focus-first, SaaS-quality UX

## License

MIT
