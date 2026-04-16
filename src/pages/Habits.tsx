import { useState } from "react";
import { motion } from "framer-motion";
import { Repeat, Plus, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

type Habit = {
  id: string;
  name: string;
  streak: number;
  todayDone: boolean;
  weekLog: boolean[]; // last 7 days
};

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Morning Meditation", streak: 12, todayDone: true, weekLog: [true, true, true, false, true, true, true] },
    { id: "2", name: "Read 30 min", streak: 7, todayDone: false, weekLog: [true, true, false, true, true, true, false] },
    { id: "3", name: "Drink 2L Water", streak: 5, todayDone: false, weekLog: [true, false, true, true, true, false, false] },
  ]);
  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: newHabit.trim(), streak: 0, todayDone: false, weekLog: Array(7).fill(false) },
    ]);
    setNewHabit("");
  };

  const toggleToday = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              todayDone: !h.todayDone,
              streak: !h.todayDone ? h.streak + 1 : h.streak - 1,
              weekLog: [...h.weekLog.slice(0, 6), !h.todayDone],
            }
          : h
      )
    );
  };

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <Repeat className="h-6 w-6 text-success" />
          <h1 className="text-2xl font-heading font-bold">Habits</h1>
        </div>
        <p className="text-muted-foreground text-sm">Build consistency, one day at a time</p>
      </motion.div>

      {/* Add Habit */}
      <div className="flex gap-2">
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHabit()}
          placeholder="Add a new habit..."
          className="flex-1 rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-ring/20"
        />
        <Button onClick={addHabit} size="icon" className="gradient-primary h-11 w-11 rounded-xl shrink-0">
          <Plus className="h-4 w-4 text-primary-foreground" />
        </Button>
      </div>

      {/* Habits */}
      <div className="space-y-3">
        {habits.map((habit, i) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border bg-card p-5 shadow-card space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{habit.name}</h3>
                <div className="flex items-center gap-1 mt-1 text-sm text-warning">
                  <Flame className="h-4 w-4" />
                  <span className="font-medium">{habit.streak} day streak</span>
                </div>
              </div>
              <button
                onClick={() => toggleToday(habit.id)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  habit.todayDone
                    ? "border-success bg-success text-success-foreground scale-110"
                    : "border-muted-foreground/30 hover:border-primary"
                }`}
              >
                {habit.todayDone && <span className="text-lg">✓</span>}
              </button>
            </div>

            {/* Week view */}
            <div className="flex gap-2">
              {days.map((day, di) => (
                <div key={di} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{day}</span>
                  <div
                    className={`h-8 w-full rounded-md transition-colors ${
                      habit.weekLog[di] ? "gradient-primary" : "bg-secondary"
                    }`}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
