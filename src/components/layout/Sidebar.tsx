import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Bot,
  Home,
  Settings,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mainNav = [
  { to: "/dashboard", icon: Home, label: "Dashboard" },
  { to: "/lessons", icon: BookOpen, label: "Lessons" },
  { to: "/quiz", icon: Target, label: "Practice" },
  { to: "/ai", icon: Bot, label: "AI Tutor" },
  { to: "/community", icon: Users, label: "Community" },
  { to: "/achievements", icon: Trophy, label: "Achievements" },
  { to: "/focus", icon: Sparkles, label: "Focus" },
];

const secondaryNav = [
  { to: "/admin", icon: Shield, label: "Admin", adminOnly: true },
  { to: "/settings", icon: Settings, label: "Settings" },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);

  const NavItem = ({
    to,
    icon: Icon,
    label,
  }: {
    to: string;
    icon: typeof Home;
    label: string;
  }) => {
    const active = location.pathname === to || location.pathname.startsWith(`${to}/`);
    return (
      <Link
        to={to}
        onClick={onClose}
        className={cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className={cn("h-4 w-4", active && "text-primary")} />
        {label}
        {active && (
          <motion.div
            layoutId="sidebar-active"
            className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
          />
        )}
      </Link>
    );
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border/50 bg-card/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/50 px-4">
          <Link to="/dashboard" className="flex items-center gap-2" onClick={onClose}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Lingua</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Learn
          </p>
          {mainNav.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}

          <p className="mb-2 mt-6 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            More
          </p>
          {secondaryNav
            .filter((item) => !item.adminOnly || user?.role === "admin")
            .map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
        </nav>

        <div className="border-t border-border/50 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
            <Avatar>
              <AvatarFallback>
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2) ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-muted-foreground">Level {user?.level}</p>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </aside>
    </>
  );
}
