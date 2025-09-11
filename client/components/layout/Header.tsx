import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Flame, Trophy, Dumbbell, CalendarDays, Apple, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/athletes", label: "Athlete Performance", icon: Trophy },
  { to: "/training", label: "Training Programs", icon: Dumbbell },
  { to: "/events", label: "Event Schedules", icon: CalendarDays },
  { to: "/nutrition", label: "Nutrition Plans", icon: Apple },
  { to: "/leaderboard", label: "Leaderboard", icon: Medal },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl glass shadow-glow">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-electric via-brand-purple to-brand-neon text-white shadow-lg">
                <Flame className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm text-muted-foreground">Sports Authority of India</div>
                <div className="text-lg font-extrabold tracking-tight text-gradient">SportSphere</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-foreground/70 hover:text-foreground",
                    )
                  }
                >
                  <Icon className="h-4 w-4 text-brand-electric group-hover:text-brand-neon transition-colors" />
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                asChild
                className="hidden md:inline-flex bg-gradient-to-r from-brand-electric via-brand-purple to-brand-neon text-white shadow-glow hover:brightness-110"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
