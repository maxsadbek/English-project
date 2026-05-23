import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Flame, Star, Target, TrendingUp, Zap } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { ContinueLearningCard } from "@/components/shared/ContinueLearningCard";
import { StreakCalendar } from "@/components/shared/StreakCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { dailyMissions, lessons, weeklyActivity, leaderboard } from "@/data/mockData";

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const continueLesson = lessons.find((l) => l.progress > 0 && l.progress < 100) ?? lessons[0];
  const dailyPercent = user
    ? Math.round((user.dailyProgress / user.dailyGoal) * 100)
    : 0;
  const xpToNext = 5200 - (user?.xp ?? 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Your learning hub
        </h1>
        <p className="mt-1 text-muted-foreground">
          Track progress, complete missions, and keep your streak alive.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total XP"
          value={(user?.xp ?? 0).toLocaleString()}
          subtitle={`${xpToNext} XP to Level ${(user?.level ?? 0) + 1}`}
          icon={Zap}
          trend={{ value: 12, positive: true }}
          delay={0}
        />
        <StatCard
          title="Current level"
          value={user?.level ?? 1}
          subtitle="Top 15% of learners"
          icon={Star}
          delay={0.05}
        />
        <StatCard
          title="Day streak"
          value={`${user?.streak ?? 0} days`}
          subtitle="Personal best: 21 days"
          icon={Flame}
          delay={0.1}
        />
        <StatCard
          title="Daily goal"
          value={`${user?.dailyProgress ?? 0}/${user?.dailyGoal ?? 30} min`}
          subtitle={`${dailyPercent}% complete`}
          icon={Target}
          trend={{ value: 8, positive: true }}
          delay={0.15}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ContinueLearningCard
            title={continueLesson.title}
            type={continueLesson.type}
            progress={continueLesson.progress}
            lessonId={continueLesson.id}
          />

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-primary" />
                Weekly activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyActivity}>
                    <defs>
                      <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="xp"
                      stroke="hsl(var(--primary))"
                      fill="url(#xpGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <StreakCalendar streak={user?.streak ?? 0} />

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Daily missions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dailyMissions.map((mission) => (
                <div key={mission.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={mission.completed ? "text-muted-foreground line-through" : ""}>
                      {mission.title}
                    </span>
                    <Badge variant={mission.completed ? "success" : "outline"}>
                      +{mission.xpReward} XP
                    </Badge>
                  </div>
                  <Progress
                    value={(mission.progress / mission.target) * 100}
                    className="h-1.5"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Leaderboard</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/community">View all</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {leaderboard.slice(0, 4).map((entry) => (
                <div key={entry.id} className="flex items-center gap-3">
                  <span className="w-6 text-sm font-medium text-muted-foreground">
                    #{entry.rank}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
                    {entry.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{entry.name}</p>
                    <p className="text-xs text-muted-foreground">{entry.xp.toLocaleString()} XP</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="glass-card border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold">Smart recommendation</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on your grammar scores, try Present Perfect Deep Dive next.
            </p>
          </div>
          <Button asChild>
            <Link to="/lessons/2">Start lesson</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
