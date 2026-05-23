import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { stats, testimonials, advantages } from "@/data/mockData";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-40 top-60 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Trusted by 2.4M+ learners worldwide
            </span>
            <h1 className="mt-8 font-serif text-5xl font-normal tracking-tight sm:text-6xl lg:text-7xl">
              Master English with
              <br />
              <span className="gradient-text italic">intelligence</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              A calm, premium learning experience designed for students and professionals.
              AI-powered practice, real conversations, and focus-first design.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8" asChild>
                <Link to="/auth/sign-up">
                  Start learning free
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="glass" className="h-12 gap-2" asChild>
                <Link to="/auth/sign-in">
                  <Play className="h-4 w-4" />
                  Watch demo
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto mt-16 max-w-5xl"
          >
            <div className="glass-card overflow-hidden rounded-2xl border p-2 shadow-glow">
              <div className="rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-50 p-8 dark:from-zinc-900 dark:to-zinc-950">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Today's XP", value: "240", color: "from-primary to-blue-500" },
                    { label: "Streak", value: "14 days", color: "from-orange-500 to-amber-500" },
                    { label: "Level", value: "12", color: "from-emerald-500 to-teal-500" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-xl bg-gradient-to-br ${item.color} p-4 text-white`}
                    >
                      <p className="text-xs opacity-80">{item.label}</p>
                      <p className="mt-1 text-2xl font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-2 rounded-full bg-muted">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-primary to-emerald-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="border-y border-border/50 bg-muted/30 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-semibold sm:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.label.includes("rating") ? 1 : 0}
                />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif text-4xl">Built for serious learners</h2>
            <p className="mt-4 text-muted-foreground">
              No cartoons. No gimmicks. Just intelligent, beautiful learning.
            </p>
          </div>
          <div id="features" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="glass-card h-full border-border/50 transition-all hover:border-primary/30">
                  <CardContent className="p-6">
                    <CheckCircle2 className="mb-4 h-5 w-5 text-emerald-500" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-muted/20 py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl">Loved by learners</h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card h-full">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">&ldquo;{t.content}&rdquo;</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10 p-12 text-center glass-card">
          <h2 className="font-serif text-3xl sm:text-4xl">Ready to elevate your English?</h2>
          <p className="mt-4 text-muted-foreground">
            Join millions learning with focus, intelligence, and style.
          </p>
          <Button size="lg" className="mt-8 h-12 px-8" asChild>
            <Link to="/onboarding">
              Begin your journey
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Lingua. Premium English learning.
      </footer>
    </div>
  );
}
