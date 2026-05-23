import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { quizQuestions } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function QuizPage() {
  const [searchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const question = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
  const lessonId = searchParams.get("lesson");

  const checkAnswer = (answer: string) => {
    const correct =
      typeof question.correctAnswer === "string"
        ? answer.toLowerCase().trim() === question.correctAnswer.toLowerCase()
        : false;
    if (correct) setScore((s) => s + 1);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setTypedAnswer("");
      setShowFeedback(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-2xl space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Practice</h1>
          {lessonId && <p className="text-sm text-muted-foreground">Lesson {lessonId}</p>}
        </div>
        <Badge variant="accent">
          {currentIndex + 1} / {quizQuestions.length}
        </Badge>
      </div>

      <Progress value={progress} className="h-2" />

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="glass-card">
            <CardContent className="p-8">
              <Badge variant="outline" className="mb-4 capitalize">
                {question.type.replace("-", " ")}
              </Badge>
              <h2 className="text-xl font-medium">{question.prompt}</h2>

              {question.type === "multiple-choice" && question.options && (
                <div className="mt-6 space-y-3">
                  {question.options.map((option) => {
                    const isCorrect = option === question.correctAnswer;
                    const isWrong = showFeedback && selected === option && !isCorrect;
                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={showFeedback}
                        onClick={() => {
                          setSelected(option);
                          checkAnswer(option);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all",
                          selected === option && !showFeedback && "border-primary bg-primary/5",
                          showFeedback && isCorrect && "border-emerald-500 bg-emerald-500/10",
                          isWrong && "border-red-500 bg-red-500/10"
                        )}
                      >
                        {option}
                        {showFeedback && isCorrect && (
                          <Check className="h-4 w-4 text-emerald-500" />
                        )}
                        {isWrong && <X className="h-4 w-4 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {question.type === "typing" && (
                <div className="mt-6 space-y-4">
                  <Input
                    placeholder="Type your answer..."
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    disabled={showFeedback}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !showFeedback) checkAnswer(typedAnswer);
                    }}
                  />
                  {!showFeedback && (
                    <Button onClick={() => checkAnswer(typedAnswer)} disabled={!typedAnswer}>
                      Check answer
                    </Button>
                  )}
                </div>
              )}

              {showFeedback && question.explanation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground"
                >
                  {question.explanation}
                </motion.div>
              )}

              {showFeedback && (
                <Button className="mt-6 w-full" onClick={nextQuestion}>
                  {currentIndex < quizQuestions.length - 1
                    ? "Next question"
                    : `Finish — Score: ${score}/${quizQuestions.length}`}
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
