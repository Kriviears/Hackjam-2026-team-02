import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, Sparkles, Trophy } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { BadgeCard } from "@/components/BadgeCard";
import { Icon } from "@/components/Icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@/context/UserContext";
import { badges } from "@/data/mockData";
import type { Badge } from "@/data/interfaces";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — PerX" },
      { name: "description", content: "Collect badges as you complete milestones and quests on your cloud career journey." },
      { property: "og:title", content: "Achievements — PerX" },
      { property: "og:description", content: "Unlock and showcase your career achievement badges." },
    ],
  }),
  component: Achievements,
});

function Achievements() {
  const { xp } = useUser();
  const [selected, setSelected] = useState<Badge | null>(null);

  const unlockedCount = useMemo(() => badges.filter((b) => b.unlocked).length, []);

  const summary = [
    { icon: Trophy, label: "Badges Unlocked", value: `${unlockedCount}/${badges.length}` },
    { icon: Sparkles, label: "Total XP", value: xp.toLocaleString() },
    { icon: Flame, label: "Current Streak", value: "7 days" },
  ];

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Achievements</h1>
        <p className="mt-1 text-muted-foreground">Every badge is proof of progress. Keep collecting!</p>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {summary.map((s) => {
          const Ico = s.icon;
          return (
            <div key={s.label} className="glass-card flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-brand text-white">
                <Ico className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badge grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        {badges.map((b) => (
          <motion.div key={b.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <BadgeCard badge={b} onClick={() => b.unlocked && setSelected(b)} />
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full gradient-brand text-white shadow-lg ring-4 ring-secondary/20">
                  <Icon name={selected.icon} className="h-10 w-10" />
                </div>
                <DialogTitle className="text-center text-2xl">{selected.name}</DialogTitle>
                <DialogDescription className="text-center">{selected.description}</DialogDescription>
              </DialogHeader>
              <p className="text-center text-sm font-medium text-secondary">
                Earned on {selected.earnedDate ?? "—"}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
