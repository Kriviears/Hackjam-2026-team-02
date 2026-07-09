import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Flame } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { QuestCard } from "@/components/QuestCard";
import { useUser } from "@/context/UserContext";
import { dailyChallenges, quests } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Gamified Learning Hub — PerX" },
      {
        name: "description",
        content: "Level up with quests, XP and daily challenges across Cloud, Cyber, Terraform, Python and Linux.",
      },
      { property: "og:title", content: "Gamified Learning Hub — PerX" },
      { property: "og:description", content: "Duolingo-style quests and daily challenges to build tech skills." },
    ],
  }),
  component: LearningHub,
});

const CHALLENGE_XP = 50;

function LearningHub() {
  const { completedChallenges, dispatch } = useUser();
  const [localChallenges] = useState(dailyChallenges);

  const startQuest = (title: string) => toast.success(`Quest started: ${title}`);

  const toggleChallenge = (id: string, text: string) => {
    const wasDone = completedChallenges.includes(id);
    dispatch({ type: "TOGGLE_CHALLENGE", id, xp: CHALLENGE_XP });
    if (!wasDone) toast.success(`Challenge complete! +${CHALLENGE_XP} XP`);
    else toast(`Marked "${text}" as not done`);
  };

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Learning Hub</h1>
        <p className="mt-1 text-muted-foreground">Take on quests, earn XP and keep your streak alive.</p>
      </div>

      {/* Quests */}
      <motion.div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {quests.map((q) => (
          <motion.div key={q.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <QuestCard quest={q} onStart={() => startQuest(q.title)} />
          </motion.div>
        ))}
      </motion.div>

      {/* Daily challenges */}
      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <Flame className="h-6 w-6 text-secondary" />
          <h2 className="text-xl font-bold text-foreground">Daily Challenges</h2>
        </div>
        <div className="glass-card divide-y divide-border p-2">
          {localChallenges.map((c) => {
            const done = completedChallenges.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleChallenge(c.id, c.text)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-muted"
              >
                {done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
                <span className={cn("flex-1 text-sm", done ? "text-muted-foreground line-through" : "text-foreground")}>
                  {c.text}
                </span>
                <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-secondary">
                  +{CHALLENGE_XP} XP
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
