import { motion } from "framer-motion";
import { Lock, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { achievements } from "@/data/mockData";

export function AchievementsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Achievements</h1>
        <p className="mt-1 text-muted-foreground">
          Unlock badges and track your learning milestones.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card
              className={`glass-card ${!achievement.unlocked && "opacity-75"}`}
            >
              <CardContent className="flex items-start gap-4 p-6">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-primary/20 to-emerald-500/20"
                      : "bg-muted"
                  }`}
                >
                  {achievement.unlocked ? (
                    achievement.icon
                  ) : (
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{achievement.title}</h3>
                    {achievement.unlocked && (
                      <Trophy className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  {!achievement.unlocked &&
                    achievement.progress !== undefined &&
                    achievement.maxProgress && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress
                          value={(achievement.progress / achievement.maxProgress) * 100}
                          className="mt-1 h-1.5"
                        />
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
