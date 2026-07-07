// src/routes/resources.tsx — collaborative resource library with category filtering + search.
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bookmark, Heart, Search, Upload, Clock, CheckCircle2, Clock3 } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { resources, resourceCategories } from "@/data/demoData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resource Library — PerX" },
      { name: "description", content: "Explore 150+ curated cloud, AI and career resources shared by the PerX community." },
    ],
  }),
  component: ResourcesPage,
});

const diffColor: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-600",
  Intermediate: "bg-amber-500/10 text-amber-600",
  Advanced: "bg-rose-500/10 text-rose-600",
};

function ResourcesPage() {
  const { can } = useAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchCat = category === "All" || r.category === category;
      const matchQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, category]);

  return (
    <PageTransition>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resource Library</h1>
          <p className="mt-1 text-muted-foreground">{resources.length} community resources across {resourceCategories.length} categories.</p>
        </div>
        {can("upload_resources") && (
          <button
            onClick={() => toast.success("Upload flow opened (demo)")}
            className="flex items-center gap-2 rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
          >
            <Upload className="h-4 w-4" /> Upload Resource
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-background px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources..."
          className="w-full bg-transparent py-2.5 text-sm outline-none"
        />
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["All", ...resourceCategories].map((c) => (
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

      <p className="mt-4 text-sm text-muted-foreground">{filtered.length} results</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 60).map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.02, 0.4) }}
          >
            <Card className="glass-card flex h-full flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{r.category}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", diffColor[r.difficulty])}>{r.difficulty}</span>
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{r.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground line-clamp-3">{r.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <img src={r.authorAvatar} alt={r.author} className="h-6 w-6 rounded-full object-cover" />
                <span className="text-xs text-muted-foreground">{r.author}</span>
                {r.status === "pending" ? (
                  <span className="ml-auto flex items-center gap-1 text-xs text-amber-600"><Clock3 className="h-3 w-3" /> Pending</span>
                ) : (
                  <span className="ml-auto flex items-center gap-1 text-xs text-emerald-600"><CheckCircle2 className="h-3 w-3" /> Approved</span>
                )}
              </div>
              <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {r.readTime}</span>
                <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {r.likes}</span>
                <span className="flex items-center gap-1"><Bookmark className="h-3.5 w-3.5" /> {r.bookmarks}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
