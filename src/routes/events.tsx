// src/routes/events.tsx — event calendar with category filtering.
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarPlus, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { perxEvents, eventCategories } from "@/data/demoData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — PerX" },
      { name: "description", content: "Tech events, cohorts, webinars and career fairs on PerX." },
    ],
  }),
  component: EventsPage,
});

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function EventsPage() {
  const { can } = useAuth();
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return perxEvents
      .filter((e) => category === "All" || e.category === category)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [category]);

  return (
    <PageTransition>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="mt-1 text-muted-foreground">{perxEvents.length} upcoming events, cohorts and webinars.</p>
        </div>
        {can("create_events") && (
          <button
            onClick={() => toast.success("Event creation opened (demo)")}
            className="flex items-center gap-2 rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
          >
            <CalendarPlus className="h-4 w-4" /> Create Event
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All", ...eventCategories].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              category === c ? "gradient-brand text-white" : "border border-border bg-background text-muted-foreground hover:bg-muted",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}>
            <Card className="glass-card flex h-full gap-4 p-5">
              <div className="flex flex-col items-center justify-center rounded-xl px-3 py-2 text-white" style={{ backgroundColor: e.color }}>
                <span className="text-xs uppercase">{formatDate(e.date).split(" ")[0]}</span>
                <span className="text-xl font-bold leading-none">{formatDate(e.date).split(" ")[1]}</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{e.category}</span>
                <h3 className="mt-1.5 font-semibold text-foreground line-clamp-2">{e.title}</h3>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {e.time} · {e.organizer}</p>
                  <p className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {e.location}</p>
                </div>
                <button
                  onClick={() => toast.success(`RSVP confirmed for ${e.title} (demo)`)}
                  className="mt-3 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  RSVP
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
