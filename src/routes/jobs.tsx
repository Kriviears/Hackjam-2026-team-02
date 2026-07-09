// src/routes/jobs.tsx — job board with AI match scoring.
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { jobs } from "@/data/demoData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Job Board — PerX" },
      { name: "description", content: "Discover cloud and AI roles with personalized AI match scoring on PerX." },
    ],
  }),
  component: JobsPage,
});

function matchColor(m: number) {
  if (m >= 90) return "text-emerald-600 bg-emerald-500/10";
  if (m >= 75) return "text-amber-600 bg-amber-500/10";
  return "text-slate-500 bg-slate-500/10";
}

const types = ["All", "Remote", "Hybrid", "On-site"] as const;

function JobsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof types)[number]>("All");

  const filtered = useMemo(() => {
    return jobs
      .filter((j) => {
        const matchType = type === "All" || j.type === type;
        const matchQuery =
          !query ||
          j.role.toLowerCase().includes(query.toLowerCase()) ||
          j.company.toLowerCase().includes(query.toLowerCase());
        return matchType && matchQuery;
      })
      .sort((a, b) => b.match - a.match);
  }, [query, type]);

  return (
    <PageTransition>
      <div>
        <h1 className="text-3xl font-bold text-foreground">Job Board</h1>
        <p className="mt-1 text-muted-foreground">{jobs.length} open roles · ranked by your AI match score.</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles or companies..."
            className="w-full bg-transparent py-2.5 text-sm outline-none"
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-border bg-background p-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn("rounded-lg px-3 py-1.5 text-xs font-medium", type === t ? "gradient-brand text-white" : "text-muted-foreground")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {filtered.map((j, i) => (
          <motion.div key={j.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}>
            <Card className="glass-card flex h-full flex-col p-5">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: j.logoColor }}
                >
                  {j.company.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground">{j.role}</h3>
                  <p className="text-sm text-muted-foreground">{j.company}</p>
                </div>
                <span className={cn("flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold", matchColor(j.match))}>
                  <Sparkles className="h-3 w-3" /> {j.match}%
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {j.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {j.type}</span>
                <span>· {j.experience}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {j.skills.map((s) => (
                  <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground">{s}</span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold text-foreground">{j.salary}</span>
                <button
                  onClick={() => toast.success(`Application started for ${j.role} (demo)`)}
                  className="rounded-lg gradient-brand px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Apply
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
