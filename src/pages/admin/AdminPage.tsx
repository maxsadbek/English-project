import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BookOpen, TrendingUp, Users } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const adminStats = [
  { month: "Jan", users: 1200, revenue: 8400 },
  { month: "Feb", users: 1450, revenue: 9200 },
  { month: "Mar", users: 1680, revenue: 10100 },
  { month: "Apr", users: 1920, revenue: 11500 },
  { month: "May", users: 2100, revenue: 12800 },
];

const recentUsers = [
  { name: "Emma Wilson", email: "emma@email.com", plan: "Pro", status: "active" },
  { name: "James Park", email: "james@email.com", plan: "Free", status: "active" },
  { name: "Lisa Chen", email: "lisa@email.com", plan: "Pro", status: "inactive" },
];

export function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge variant="outline" className="mb-2">
            Admin
          </Badge>
          <h1 className="text-2xl font-semibold sm:text-3xl">Analytics dashboard</h1>
          <p className="mt-1 text-muted-foreground">Platform overview and management</p>
        </div>
        <Button>Export report</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total users" value="24,892" icon={Users} trend={{ value: 18, positive: true }} />
        <StatCard title="Active today" value="3,241" icon={TrendingUp} trend={{ value: 5, positive: true }} delay={0.05} />
        <StatCard title="Courses" value="156" icon={BookOpen} delay={0.1} />
        <StatCard title="Completion rate" value="78%" icon={TrendingUp} trend={{ value: 3, positive: true }} delay={0.15} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">User growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminStats}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="users" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Recent users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <motion.div
                  key={user.email}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between rounded-xl border border-border/50 p-4"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.plan === "Pro" ? "default" : "outline"}>{user.plan}</Badge>
                    <Badge variant={user.status === "active" ? "success" : "secondary"}>
                      {user.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
