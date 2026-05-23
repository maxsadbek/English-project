import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ContinueLearningCardProps {
  title: string;
  type: string;
  progress: number;
  lessonId: string;
}

export function ContinueLearningCard({
  title,
  type,
  progress,
  lessonId,
}: ContinueLearningCardProps) {
  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Badge variant="accent" className="mb-3">
              Continue learning
            </Badge>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground capitalize">{type}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
        </div>
        <Button className="mt-6 w-full sm:w-auto" asChild>
          <Link to={`/lessons/${lessonId}`}>
            Resume lesson
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
