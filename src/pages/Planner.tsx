import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Trash2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

type Task = {
  id: string;
  text: string;
  done: boolean;
  priority: "low" | "medium" | "high";
};

const priorityColors = {
  low: "bg-success/10 text-success",
  medium: "bg-warning/10 text-warning",
  high: "bg-destructive/10 text-destructive",
};

export default function Planner() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Morning workout", done: false, priority: "high" },
    { id: "2", text: "Review weekly goals", done: false, priority: "medium" },
    { id: "3", text: "Read 30 minutes", done: true, priority: "low" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: newTask.trim(), done: false, priority },
    ]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <CalendarDays className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-heading font-bold">Daily Planner</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {doneCount}/{tasks.length} tasks completed today
        </p>
      </motion.div>

      {/* Progress */}
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full gradient-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: tasks.length ? `${(doneCount / tasks.length) * 100}%` : "0%" }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Add Task */}
      <div className="flex gap-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          className="flex-1 rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-ring/20"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className="rounded-xl border bg-card px-3 py-3 text-sm outline-none"
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
        <Button onClick={addTask} size="icon" className="gradient-primary h-11 w-11 rounded-xl shrink-0">
          <Plus className="h-4 w-4 text-primary-foreground" />
        </Button>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:shadow-card group"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  task.done
                    ? "border-success bg-success"
                    : "border-muted-foreground/30 hover:border-primary"
                }`}
              >
                {task.done && <Check className="h-3 w-3 text-success-foreground" />}
              </button>
              <span
                className={`flex-1 text-sm ${
                  task.done ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.text}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
