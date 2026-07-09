// src/routes/notifications.tsx — activity + notification center.
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { notifications as seed, type Notification } from "@/data/demoData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — PerX" },
      { name: "description", content: "Your PerX activity: messages, jobs, events, badges and more." },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(seed);
  const unread = items.filter((n) => !n.read).length;

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggle = (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <PageTransition>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="mt-1 text-muted-foreground">{unread} unread updates.</p>
        </div>
        <button
          onClick={markAll}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <CheckCheck className="h-4 w-4" /> Mark all read
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {items.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
            <Card
              onClick={() => toggle(n.id)}
              className={cn(
                "flex cursor-pointer items-start gap-3 p-4 transition-colors",
                n.read ? "bg-background" : "glass-card border-primary/30",
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-brand text-white">
                <Icon name={n.icon} className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{n.title}</span>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-secondary" />}
                </div>
                <p className="text-sm text-muted-foreground">{n.body}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
