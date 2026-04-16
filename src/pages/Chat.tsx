import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = { id: string; role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; messages: Message[] };

const starterPrompts = [
  "Help me plan my day",
  "Give me productivity tips",
  "Suggest healthy habits",
  "Help me set a goal",
];

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "New conversation", messages: [] },
  ]);
  const [activeId, setActiveId] = useState("1");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active.messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              title: c.messages.length === 0 ? text.slice(0, 40) : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    );
    setInput("");
    setIsTyping(true);

    // Simulate AI response (will be replaced with real AI later)
    setTimeout(() => {
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "I'm your LifeAI assistant! Once the AI backend is connected, I'll be able to help you plan your day, track goals, build habits, and much more. For now, I'm here as a preview of what's to come! 🚀",
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, messages: [...c.messages, aiMsg] } : c
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  const newConversation = () => {
    const id = crypto.randomUUID();
    setConversations((prev) => [
      ...prev,
      { id, title: "New conversation", messages: [] },
    ]);
    setActiveId(id);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Conversation List - hidden on mobile */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card">
        <div className="p-3">
          <Button
            onClick={newConversation}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <Plus className="h-4 w-4" /> New Chat
          </Button>
        </div>
        <div className="flex-1 overflow-auto px-2 pb-2 space-y-1">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full text-left rounded-lg px-3 py-2.5 text-sm transition-colors truncate ${
                c.id === activeId
                  ? "bg-secondary font-medium text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-auto p-4 md:p-6 space-y-4">
          {active.messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="gradient-primary flex h-16 w-16 items-center justify-center rounded-2xl mb-4"
              >
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </motion.div>
              <h2 className="text-xl font-heading font-semibold mb-2">
                How can I help you today?
              </h2>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                Ask me anything — plan your day, get advice, or just chat.
              </p>
              <div className="grid grid-cols-2 gap-2 max-w-md">
                {starterPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="rounded-xl border bg-card px-4 py-3 text-sm text-left transition-colors hover:border-primary/30 hover:shadow-card"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {active.messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-secondary rounded-2xl px-4 py-3 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-soft" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-soft [animation-delay:200ms]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-soft [animation-delay:400ms]" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2 max-w-3xl mx-auto"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-ring/20"
            />
            <Button
              type="submit"
              size="icon"
              className="gradient-primary h-11 w-11 rounded-xl shrink-0"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4 text-primary-foreground" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
