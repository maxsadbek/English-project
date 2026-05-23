import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className={cn("glass-card overflow-hidden", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
              {subtitle && (
                <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
              )}
              {trend && (
                <p
                  className={cn(
                    "mt-2 text-xs font-medium",
                    trend.positive ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {trend.positive ? "+" : ""}
                  {trend.value}% vs last week
                </p>
              )}
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
