import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarDays,
  Target,
  Repeat,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

const stats = [
  { label: "Today's Tasks", value: "5", icon: CalendarDays, color: "text-primary", bg: "bg-primary/10" },
  { label: "Active Goals", value: "3", icon: Target, color: "text-accent", bg: "bg-accent/10" },
  { label: "Habit Streak", value: "12d", icon: Repeat, color: "text-success", bg: "bg-success/10" },
  { label: "Chats Today", value: "2", icon: MessageSquare, color: "text-warning", bg: "bg-warning/10" },
];

const quickActions = [
  { label: "Ask AI anything", to: "/chat", icon: Sparkles },
  { label: "Plan your day", to: "/planner", icon: CalendarDays },
  { label: "Track a habit", to: "/habits", icon: Repeat },
  { label: "Set a goal", to: "/goals", icon: Target },
];

export default function Dashboard() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-heading font-bold">
          Good morning ☀️
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here's your overview for today.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="rounded-xl border bg-card p-5 shadow-card"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-3 text-2xl font-heading font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-heading font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((a, i) => (
            <motion.div
              key={a.label}
              custom={i + 4}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <Link
                to={a.to}
                className="flex items-center justify-between rounded-xl border bg-card p-4 transition-all hover:shadow-card hover:border-primary/30 group"
              >
                <div className="flex items-center gap-3">
                  <a.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{a.label}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Insight Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="gradient-primary rounded-2xl p-6 text-primary-foreground"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5" />
          <span className="font-heading font-semibold">AI Insight</span>
        </div>
        <p className="text-sm opacity-90">
          You've been consistent with your habits this week! Consider adding a new
          morning routine to boost your productivity even further.
        </p>
      </motion.div>
    </div>
  );
}
