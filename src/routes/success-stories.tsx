// src/routes/success-stories.tsx — community success stories feed.
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Heart, MessageSquare, Sparkles } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { successStories } from "@/data/demoData";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — PerX" },
      { name: "description", content: "Real career transformations from the PerX community." },
    ],
  }),
  component: SuccessStoriesPage,
});

function SuccessStoriesPage() {
  const featured = successStories.filter((s) => s.featured);
  const rest = successStories.filter((s) => !s.featured);

  return (
    <PageTransition>
      <div>
        <h1 className="text-3xl font-bold text-foreground">Success Stories</h1>
        <p className="mt-1 text-muted-foreground">Career transformations powered by PerX.</p>
      </div>

      {/* Featured */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {featured.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="glass-card flex h-full flex-col gap-3 p-6">
              <span className="flex w-fit items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
                <Sparkles className="h-3 w-3" /> Featured
              </span>
              <div className="flex items-center gap-3">
                <img src={s.avatar} alt={s.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">Now at {s.company}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs">{s.from}</span>
                <ArrowRight className="h-4 w-4 text-secondary" />
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">{s.to}</span>
              </div>
              <p className="flex-1 text-sm text-muted-foreground">{s.story}</p>
              <div className="flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {s.likes}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {s.comments}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Feed */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {rest.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.03, 0.4) }}>
            <Card className="glass-card flex h-full gap-4 p-5">
              <img src={s.avatar} alt={s.name} className="h-12 w-12 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-foreground">{s.name}</div>
                <div className="text-sm font-medium text-primary">{s.headline}</div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{s.story}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {s.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {s.comments}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageTransition>
  );
}
