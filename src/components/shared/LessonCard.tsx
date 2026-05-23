import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookMarked,
  Headphones,
  Lock,
  MessageSquare,
  Mic,
  PenLine,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Lesson, LessonType } from "@/types";
import { cn } from "@/lib/utils";

const typeIcons: Record<LessonType, typeof BookOpen> = {
  vocabulary: BookOpen,
  grammar: PenLine,
  listening: Headphones,
  speaking: Mic,
  writing: PenLine,
  conversation: MessageSquare,
};

interface LessonCardProps {
  lesson: Lesson;
  index?: number;
}

export function LessonCard({ lesson, index = 0 }: LessonCardProps) {
  const Icon = typeIcons[lesson.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link to={lesson.locked ? "#" : `/lessons/${lesson.id}`}>
        <Card
          className={cn(
            "group glass-card transition-all hover:border-primary/30 hover:shadow-glow",
            lesson.locked && "pointer-events-none opacity-60"
          )}
        >
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                {lesson.locked ? (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Icon className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <Badge variant="outline" className="capitalize">
                    {lesson.difficulty}
                  </Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {lesson.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{lesson.duration} min</span>
                  <span>+{lesson.xpReward} XP</span>
                  {lesson.progress > 0 && lesson.progress < 100 && (
                    <span className="text-primary">{lesson.progress}% done</span>
                  )}
                  {lesson.progress === 100 && (
                    <span className="text-emerald-500">Completed</span>
                  )}
                </div>
                {lesson.progress > 0 && lesson.progress < 100 && (
                  <Progress value={lesson.progress} className="mt-3 h-1.5" />
                )}
              </div>
              <BookMarked className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
