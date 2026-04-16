import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type Goal = {
  id: string;
  title: string;
  category: "short" | "long";
  progress: number;
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", title: "Learn a new language", category: "long", progress: 35 },
    { id: "2", title: "Run 5K under 25 min", category: "short", progress: 70 },
    { id: "3", title: "Read 12 books this year", category: "long", progress: 50 },
  ]);
  const [newGoal, setNewGoal] = useState("");
  const [category, setCategory] = useState<Goal["category"]>("short");

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: newGoal.trim(), category, progress: 0 },
    ]);
    setNewGoal("");
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Target className="h-6 w-6 text-accent" />
          <h1 className="text-2xl font-heading font-bold">Goals</h1>
        </div>
        <p className="text-muted-foreground text-sm">Track your progress and stay motivated</p>
      </motion.div>

      {/* Add Goal */}
      <div className="flex gap-2">
        <input
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGoal()}
          placeholder="Set a new goal..."
          className="flex-1 rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-ring/20"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Goal["category"])}
          className="rounded-xl border bg-card px-3 py-3 text-sm outline-none"
        >
          <option value="short">Short-term</option>
          <option value="long">Long-term</option>
        </select>
        <Button onClick={addGoal} size="icon" className="gradient-primary h-11 w-11 rounded-xl shrink-0">
          <Plus className="h-4 w-4 text-primary-foreground" />
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-3">
        {goals.map((goal, i) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border bg-card p-5 shadow-card space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{goal.title}</h3>
                <span className={`inline-block mt-1 text-xs rounded-full px-2.5 py-0.5 font-medium ${
                  goal.category === "short" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                }`}>
                  {goal.category === "short" ? "Short-term" : "Long-term"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <TrendingUp className="h-4 w-4 text-success" />
                {goal.progress}%
              </div>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full gradient-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
