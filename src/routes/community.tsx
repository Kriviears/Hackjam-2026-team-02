// src/routes/community.tsx — Reddit-style community discussions hub.
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUp, MessageSquare, Pin, PlusCircle, Search } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { discussions, communityCategories } from "@/data/demoData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community Hub — PerX" },
      { name: "description", content: "Ask questions, share success stories and showcase projects in the PerX community." },
    ],
  }),
  component: CommunityPage,
});

const sorts = ["Trending", "Newest", "Top"] as const;

function CommunityPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Trending");

  const filtered = useMemo(() => {
    const list = discussions.filter((d) => {
      const matchCat = category === "All" || d.category === category;
      const matchQuery = !query || d.title.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
    const sorted = [...list].sort((a, b) => {
      if (sort === "Top") return b.upvotes - a.upvotes;
      if (sort === "Newest") return a.postedAgo.localeCompare(b.postedAgo);
      return b.upvotes + b.comments - (a.upvotes + a.comments);
    });
    return sorted.sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
  }, [query, category, sort]);

  return (
    <PageTransition>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Hub</h1>
          <p className="mt-1 text-muted-foreground">Discussions, Q&amp;A, success stories and project showcases.</p>
        </div>
        <button
          onClick={() => toast.success("New post composer opened (demo)")}
          className="flex items-center gap-2 rounded-xl gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
        >
          <PlusCircle className="h-4 w-4" /> New Post
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full bg-transparent py-2.5 text-sm outline-none"
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-border bg-background p-1">
          {sorts.map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn("rounded-lg px-3 py-1.5 text-xs font-medium", sort === s ? "gradient-brand text-white" : "text-muted-foreground")}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["All", ...communityCategories].map((c) => (
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

      <div className="mt-4 space-y-3">
        {filtered.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.3) }}>
            <Card className="glass-card flex gap-4 p-4">
              <div className="flex flex-col items-center gap-1 text-muted-foreground">
                <ArrowUp className="h-4 w-4 text-secondary" />
                <span className="text-sm font-bold text-foreground">{d.upvotes}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {d.pinned && <Pin className="h-3.5 w-3.5 text-primary" />}
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{d.category}</span>
                  <span className="text-xs text-muted-foreground">{d.postedAgo}</span>
                </div>
                <h3 className="mt-1.5 font-semibold text-foreground">{d.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{d.excerpt}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <img src={d.authorAvatar} alt={d.author} className="h-5 w-5 rounded-full object-cover" /> {d.author}
                  </span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {d.comments} comments</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
