import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const days = ["M", "T", "W", "T", "F", "S", "S"];
const activeDays = [true, true, true, true, true, false, true];

interface StreakCalendarProps {
  streak: number;
}

export function StreakCalendar({ streak }: StreakCalendarProps) {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Streak</CardTitle>
        <div className="flex items-center gap-1.5 text-orange-500">
          <Flame className="h-4 w-4" />
          <span className="font-semibold">{streak} days</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-1">
          {days.map((day, i) => (
            <motion.div
              key={`${day}-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-muted-foreground">{day}</span>
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl text-xs font-medium transition-colors",
                  activeDays[i]
                    ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-sm"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {activeDays[i] ? "✓" : "·"}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
