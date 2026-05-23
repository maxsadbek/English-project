import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { LessonCard } from "@/components/shared/LessonCard";
import { lessons } from "@/data/mockData";
import { useFocusStore } from "@/stores/focusStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LessonsPage() {
  const { lessonId } = useParams();
  const { bookmarkedLessons, toggleBookmark } = useFocusStore();

  if (lessonId) {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return <div>Lesson not found</div>;

    const isBookmarked = bookmarkedLessons.includes(lesson.id);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-3xl space-y-6"
      >
        <Button variant="ghost" size="sm" asChild>
          <Link to="/lessons">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to lessons
          </Link>
        </Button>

        <motion.div className="glass-card rounded-2xl p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent" className="capitalize">
              {lesson.type}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {lesson.difficulty}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {lesson.duration} min
            </span>
            <span className="text-sm text-muted-foreground">+{lesson.xpReward} XP</span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold">{lesson.title}</h1>
          <p className="mt-2 text-muted-foreground">{lesson.description}</p>

          <div className="mt-6">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{lesson.progress}%</span>
            </div>
            <Progress value={lesson.progress} className="mt-2 h-2" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to={`/quiz?lesson=${lesson.id}`}>
                {lesson.progress > 0 ? "Continue practice" : "Start lesson"}
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => toggleBookmark(lesson.id)}>
              <Bookmark
                className={`mr-1 h-4 w-4 ${isBookmarked ? "fill-primary text-primary" : ""}`}
              />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  This lesson covers essential concepts through real-world applications.
                  Complete interactive exercises to reinforce your understanding.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {lesson.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="vocabulary">
            <Card>
              <CardContent className="space-y-3 p-6">
                {["schedule", "deadline", "follow-up", "collaborate"].map((word) => (
                  <motion.div
                    key={word}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between rounded-xl border border-border/50 p-4"
                  >
                    <span className="font-medium">{word}</span>
                    <span className="text-sm text-muted-foreground">/{word.slice(0, 4)}/</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="practice">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-center gap-4 p-6">
                <Sparkles className="h-8 w-8 text-primary" />
                <motion.div>
                  <p className="font-medium">AI-powered practice</p>
                  <p className="text-sm text-muted-foreground">
                    Generate custom exercises based on this lesson.
                  </p>
                </motion.div>
                <Button className="ml-auto" asChild>
                  <Link to="/ai">Open AI Tutor</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Lessons</h1>
        <p className="mt-1 text-muted-foreground">
          Structured paths across vocabulary, grammar, and conversation.
        </p>
       </div>

      <div className="grid gap-4">
        {lessons.map((lesson, i) => (
          <LessonCard key={lesson.id} lesson={lesson} index={i} />
        ))}
      </div>
    </div>
  );
}
