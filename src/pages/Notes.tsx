import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Note = { id: string; title: string; content: string; createdAt: Date };

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Project Ideas", content: "Build a habit tracker with AI coaching...", createdAt: new Date() },
    { id: "2", title: "Book Notes", content: "Atomic Habits key takeaways: 1% better every day...", createdAt: new Date() },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const addNote = () => {
    const note: Note = {
      id: crypto.randomUUID(),
      title: "Untitled",
      content: "",
      createdAt: new Date(),
    };
    setNotes((prev) => [note, ...prev]);
    setActiveId(note.id);
  };

  const updateNote = (id: string, field: "title" | "content", value: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, [field]: value } : n))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const active = notes.find((n) => n.id === activeId);

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* List */}
      <div className="w-full md:w-72 flex flex-col border-r bg-card">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StickyNote className="h-5 w-5 text-primary" />
            <h1 className="font-heading font-semibold">Notes</h1>
          </div>
          <Button onClick={addNote} size="icon" variant="ghost" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto px-2 pb-2 space-y-1">
          {notes.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveId(n.id)}
              className={`w-full text-left rounded-lg px-3 py-2.5 transition-colors ${
                n.id === activeId
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60"
              }`}
            >
              <p className="text-sm font-medium truncate">{n.title || "Untitled"}</p>
              <p className="text-xs truncate text-muted-foreground mt-0.5">
                {n.content || "Empty note"}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="hidden md:flex flex-1 flex-col">
        {active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-1 flex-col p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <input
                value={active.title}
                onChange={(e) => updateNote(active.id, "title", e.target.value)}
                className="text-2xl font-heading font-bold bg-transparent outline-none flex-1"
                placeholder="Note title..."
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteNote(active.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <textarea
              value={active.content}
              onChange={(e) => updateNote(active.id, "content", e.target.value)}
              className="flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none"
              placeholder="Start writing..."
            />
          </motion.div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground text-sm">
            Select a note or create a new one
          </div>
        )}
      </div>
    </div>
  );
}
