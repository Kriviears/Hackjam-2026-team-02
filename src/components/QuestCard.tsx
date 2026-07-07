// src/components/QuestCard.tsx — Duolingo-style quest card.
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Quest } from "@/data/interfaces";

const difficultyStyles: Record<Quest["difficulty"], string> = {
  Easy: "bg-success/15 text-success",
  Medium: "bg-accent/20 text-accent-foreground",
  Hard: "bg-secondary/15 text-secondary",
};

export function QuestCard({ quest, onStart }: { quest: Quest; onStart: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass-card flex flex-col p-6 transition-shadow hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-foreground">{quest.title}</h3>
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", difficultyStyles[quest.difficulty])}>
          {quest.difficulty}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1 font-semibold text-secondary">
          <Sparkles className="h-4 w-4" /> {quest.xp} XP
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4" /> {quest.timeEstimate}
        </span>
      </div>

      <div className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground">
        <Gift className="h-4 w-4 text-accent" /> {quest.reward}
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{quest.completion}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full gradient-brand"
            initial={reduced ? false : { width: 0 }}
            whileInView={{ width: `${quest.completion}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      <Button onClick={onStart} className="mt-5 gradient-brand text-white hover:opacity-90">
        {quest.completion === 100 ? "Replay Quest" : "Start Quest"}
      </Button>
    </motion.div>
  );
}
