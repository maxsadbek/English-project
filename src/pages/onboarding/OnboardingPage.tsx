import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";

const steps = [
  {
    id: "goal",
    title: "What's your goal?",
    subtitle: "We'll personalize your learning path",
    options: [
      "University & exams",
      "Career advancement",
      "Travel & culture",
      "Personal growth",
    ],
  },
  {
    id: "level",
    title: "Your current level",
    subtitle: "Be honest — we'll adjust as you improve",
    options: ["Beginner (A1-A2)", "Intermediate (B1-B2)", "Advanced (C1-C2)"],
  },
  {
    id: "time",
    title: "Daily study time",
    subtitle: "Consistency beats intensity",
    options: ["10 min/day", "20 min/day", "30 min/day", "45+ min/day"],
  },
  {
    id: "interests",
    title: "What interests you?",
    subtitle: "Select all that apply",
    options: [
      "Business English",
      "Academic writing",
      "Conversation",
      "Grammar mastery",
      "Pronunciation",
      "IELTS / TOEFL prep",
    ],
    multi: true,
  },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({});

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const toggleOption = (option: string) => {
    if (current.multi) {
      const prev = (selections[current.id] as string[]) ?? [];
      setSelections({
        ...selections,
        [current.id]: prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option],
      });
    } else {
      setSelections({ ...selections, [current.id]: option });
    }
  };

  const isSelected = (option: string) => {
    const val = selections[current.id];
    if (Array.isArray(val)) return val.includes(option);
    return val === option;
  };

  const canProceed = current.multi
    ? ((selections[current.id] as string[])?.length ?? 0) > 0
    : !!selections[current.id];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">EnglishHub</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Step {step + 1} of {steps.length}
          </span>
        </div>

        <div className="mb-8 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h1 className="font-serif text-3xl">{current.title}</h1>
            <p className="mt-2 text-muted-foreground">{current.subtitle}</p>

            <div className="mt-8 space-y-3">
              {current.options.map((option) => (
                <Card
                  key={option}
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary/50",
                    isSelected(option) && "border-primary bg-primary/5"
                  )}
                  onClick={() => toggleOption(option)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <span className="font-medium">{option}</span>
                    {isSelected(option) && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          )}
          <Button
            className="flex-1"
            disabled={!canProceed}
            onClick={async () => {
              if (isLast) {
                await completeOnboarding();
                navigate("/dashboard");
              } else {
                setStep(step + 1);
              }
            }}
          >
            {isLast ? "Enter dashboard" : "Continue"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
