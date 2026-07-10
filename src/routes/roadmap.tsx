import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { MilestoneCard } from "@/components/MilestoneCard";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { generateRoadmap } from "@/lib/ai.server";
import type { Milestone } from "@/data/interfaces";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "AI Career Roadmap — PerX" },
      {
        name: "description",
        content:
          "Your personalized 20-step AI career roadmap from foundation to landing a Senior Cloud Engineer role.",
      },
      { property: "og:title", content: "AI Career Roadmap — PerX" },
      {
        property: "og:description",
        content: "Generate a personalized career path with milestones, XP and skill gaps.",
      },
    ],
  }),
  component: Roadmap,
});

const loadingSteps = [
  "Analyzing Skills…",
  "Matching Career Goals…",
  "Identifying Skill Gaps…",
  "Building Personalized Roadmap…",
];

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

function Roadmap() {
  const { completedMilestones, dispatch } = useUser();
  const [generated, setGenerated] = useState(false);
  const [loadingStep, setLoadingStep] = useState(-1);
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const generate = async () => {
    setGenerated(false);
    setLoadingStep(0);

     try {
    const result = await generateRoadmap({
      data: {
        currentStage: "AWS re/Start Graduate",
        destination: "Senior Cloud Solutions Architect",
      },
    });
    setMilestones(result);
  } catch (err) {
    toast.error("Failed to generate roadmap. Please try again.");
    console.error(err);
    setLoadingStep(-1);
    return;
  }

  setLoadingStep(loadingSteps.length); // triggers the existing useEffect to reveal the timeline
  };

  useEffect(() => {
    if (loadingStep < 0) return;
    if (loadingStep >= loadingSteps.length) {
      setGenerated(true);
      setLoadingStep(-1);
      return;
    }
    const t = setTimeout(() => setLoadingStep((s) => s + 1), 800);
    return () => clearTimeout(t);
  }, [loadingStep]);

  const handleComplete = (id: string, xp: number, title: string) => {
    dispatch({ type: "COMPLETE_MILESTONE", id, xp });
    setConfetti(true);
    toast.success(`Milestone complete: ${title} (+${xp} XP)`);
    setTimeout(() => setConfetti(false), 5000);
  };

  const isGenerating = loadingStep >= 0;

  return (
    <PageTransition>
      {confetti && width > 0 && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={280} />
      )}

      <div className="glass-card p-8 text-center">
        <h1 className="text-3xl font-extrabold text-foreground">AI Career Roadmap</h1>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          A guided path from <span className="font-semibold text-secondary">AWS re/Start Graduate</span> to{" "}
          <span className="font-semibold text-accent-foreground">Senior Cloud Solutions Architect</span> — 20
          milestones across Foundation, Intermediate, Advanced and your Final Goal.
        </p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-6 inline-block">
          <Button
            onClick={generate}
            disabled={isGenerating}
            className="relative gradient-brand px-8 py-6 text-base font-semibold text-white shadow-2xl shadow-blue-500/30 hover:opacity-90"
          >
            <span className="absolute inset-0 animate-pulse rounded-md bg-white/10" />
            <Sparkles className="h-5 w-5" />
            {generated ? "Regenerate AI Career Path" : "Generate AI Career Path"}
          </Button>
        </motion.div>
      </div>

      {/* Loading sequence */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 space-y-3"
          >
            {loadingSteps.map((step, i) => (
              <div
                key={step}
                className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                  i <= loadingStep ? "glass-card" : "opacity-40"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    i < loadingStep
                      ? "gradient-brand text-white"
                      : i === loadingStep
                        ? "gradient-brand animate-pulse text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < loadingStep ? "✓" : i + 1}
                </div>
                <span className="font-medium text-foreground">{step}</span>
              </div>
            ))}
            <div className="mt-4 grid gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline */}
      {generated && !isGenerating && (
        <motion.div
          className="relative mt-10 pl-2"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {/* glowing connector line */}
          <div className="absolute bottom-8 left-[30px] top-2 w-1 rounded-full gradient-brand opacity-40" />
          {milestones.map((m) => (
            <motion.div
              key={m.id}
              variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
            >
              <MilestoneCard
                milestone={m}
                isCompleted={completedMilestones.includes(m.id)}
                onComplete={() => handleComplete(m.id, m.xpReward, m.title)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {!generated && !isGenerating && (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Tap <span className="font-semibold text-secondary">Generate AI Career Path</span> to reveal your
          personalized 20-step roadmap.
        </div>
      )}
    </PageTransition>
  );
}
