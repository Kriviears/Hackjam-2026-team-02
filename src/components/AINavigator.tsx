// src/components/AINavigator.tsx — floating AI career chat available on every route.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { MarkdownLite } from "@/components/MarkdownLite";
import { useTyping } from "@/hooks/useTyping";
import { aiConversations as baseConversations } from "@/data/mockData";
import { extraAIConversations } from "@/data/demoData";
import { cn } from "@/lib/utils";

const aiConversations = [...baseConversations, ...extraAIConversations];

interface Message {
  role: "user" | "ai";
  content: string;
}

export function AINavigator() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingTarget, setTypingTarget] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { output, done } = useTyping(typingTarget);

  // When typing finishes, commit the AI message to history.
  useEffect(() => {
    if (typingTarget && done) {
      setMessages((prev) => [...prev, { role: "ai", content: typingTarget }]);
      setTypingTarget("");
    }
  }, [done, typingTarget]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, output, isThinking]);

  const ask = (conv: (typeof aiConversations)[number]) => {
    if (isThinking || typingTarget) return;
    setMessages((prev) => [...prev, { role: "user", content: conv.prompt }]);
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setTypingTarget(conv.response);
    }, 1000);
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
                <div className="text-xs text-white/80">Your personal guide</div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && !isThinking && !typingTarget && (
                <p className="text-sm text-muted-foreground">
                  Hi Alex! 👋 Ask me anything about your cloud career. Tap a prompt below to get started.
                </p>
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

              {typingTarget && output && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl bg-muted px-3 py-2">
                    <MarkdownLite text={output} />
                  </div>
                </div>
              )}
            </div>

            {/* Prompt chips */}
            <div className="border-t border-border p-3">
              <div className="flex flex-wrap gap-2">
                {aiConversations.map((conv) => (
                  <button
                    key={conv.prompt}
                    type="button"
                    onClick={() => ask(conv)}
                    disabled={isThinking || !!typingTarget}
                    className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary transition-colors hover:bg-secondary/20 disabled:opacity-50"
                  >
                    {conv.prompt}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
                <span className="flex-1">Pick a prompt above to chat</span>
                <Send className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
