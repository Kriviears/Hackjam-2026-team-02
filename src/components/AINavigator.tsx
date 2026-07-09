// src/components/AINavigator.tsx — floating AI career chat powered by DeepSeek.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { MarkdownLite } from "@/components/MarkdownLite";
import { deepseekChat } from "@/lib/deepseek.functions";
import { aiConversations as baseConversations } from "@/data/mockData";
import { extraAIConversations } from "@/data/demoData";
import { cn } from "@/lib/utils";

const suggestedPrompts = [...baseConversations, ...extraAIConversations]
  .map((c) => c.prompt)
  .slice(0, 8);

interface Message {
  role: "user" | "ai";
  content: string;
}

export function AINavigator() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chat = useServerFn(deepseekChat);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, isThinking]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    setError(null);
    setInput("");
    const history = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(history);
    setIsThinking(true);

    try {
      const payload = history.map((m) => ({
        role: m.role === "ai" ? ("assistant" as const) : ("user" as const),
        content: m.content,
      }));
      const { content } = await chat({ data: { messages: payload } });
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: content || "Sorry, I couldn't come up with a response. Try again?" },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setError(msg);
      setMessages((prev) => [...prev, { role: "ai", content: `⚠️ ${msg}` }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Career Navigator"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-brand text-white shadow-2xl shadow-blue-500/30"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-secondary/30" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-[560px] max-h-[80vh] w-[92vw] max-w-sm flex-col overflow-hidden rounded-3xl border border-border bg-white/85 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3 gradient-brand px-4 py-3 text-white">
              <Sparkles className="h-5 w-5" />
              <div>
                <div className="font-semibold">AI Career Navigator</div>
                <div className="text-xs text-white/80">Powered by DeepSeek</div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && !isThinking && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Hi Alex! 👋 Ask me anything about your cloud career — or tap a suggestion below.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => void send(p)}
                        className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary transition-colors hover:bg-secondary/20"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3 py-2",
                      m.role === "user" ? "gradient-brand text-white" : "bg-muted",
                    )}
                  >
                    {m.role === "user" ? (
                      <span className="text-sm">{m.content}</span>
                    ) : (
                      <MarkdownLite text={m.content} />
                    )}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl bg-muted px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form onSubmit={handleSubmit} className="border-t border-border p-3">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isThinking}
                  placeholder="Ask about your career…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isThinking || !input.trim()}
                  aria-label="Send message"
                  className="flex h-8 w-8 items-center justify-center rounded-full gradient-brand text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
