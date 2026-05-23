import { motion } from "framer-motion";
import { MessageCircle, Swords, Users, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { leaderboard } from "@/data/mockData";

const friends = [
  { name: "Jordan Lee", status: "Studying grammar", online: true },
  { name: "Priya Sharma", status: "In a study room", online: true },
  { name: "Tomás Silva", status: "Offline", online: false },
];

const groups = [
  { name: "IELTS Prep 2025", members: 24, active: true },
  { name: "Business English", members: 18, active: false },
  { name: "Daily Conversation", members: 42, active: true },
];

export function CommunityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Community</h1>
        <p className="mt-1 text-muted-foreground">
          Connect, compete, and learn together.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: "Friends", count: 12 },
          { icon: MessageCircle, label: "Groups", count: 3 },
          { icon: Swords, label: "Challenges", count: 2 },
          { icon: Video, label: "Study rooms", count: 1 },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="glass-card">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{item.count}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Friends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {friends.map((friend) => (
              <div key={friend.name} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>
                      {friend.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {friend.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-emerald-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">{friend.status}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Study groups</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {groups.map((group) => (
              <div
                key={group.name}
                className="flex items-center justify-between rounded-xl border border-border/50 p-4"
              >
                <div>
                  <p className="font-medium">{group.name}</p>
                  <p className="text-xs text-muted-foreground">{group.members} members</p>
                </div>
                <div className="flex items-center gap-2">
                  {group.active && <Badge variant="success">Live</Badge>}
                  <Button size="sm">Join</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Global leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
              >
                <span className="w-8 text-center font-semibold text-muted-foreground">
                  {entry.rank}
                </span>
                <Avatar>
                  <AvatarFallback>
                    {entry.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-xs text-muted-foreground">Level {entry.level}</p>
                </div>
                <p className="font-semibold text-primary">{entry.xp.toLocaleString()} XP</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
