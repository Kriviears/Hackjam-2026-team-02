import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
import { GitBranch, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { MilestoneCard } from "@/components/MilestoneCard";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import {
  careerTracks,
  foundationMilestones,
  getTrack,
  originalTrackId,
  type TrackId,
} from "@/data/careerTracks";
import { generateRoadmap } from "@/lib/deepseek.functions";
import type { Milestone } from "@/data/interfaces";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Branching Career Roadmap — PerX" },
      {
        name: "description",
        content:
          "Follow a shared foundation, then branch into Cloud, Data or AI/ML Engineering — and switch paths anytime.",
      },
      { property: "og:title", content: "Branching Career Roadmap — PerX" },
      {
        property: "og:description",
        content: "Switch between Cloud, Data and AI/ML Engineering career tracks while keeping your foundation.",
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

// Initial per-track milestones (default; AI generation can override a track).
const initialTrackMilestones: Record<TrackId, Milestone[]> = {
  cloud: getTrack("cloud").milestones,
  data: getTrack("data").milestones,
  aiml: getTrack("aiml").milestones,
};

function Roadmap() {
  const { completedMilestones, dispatch } = useUser();
  const [selected, setSelected] = useState<TrackId>(originalTrackId);
  const [trackMilestones, setTrackMilestones] =
    useState<Record<TrackId, Milestone[]>>(initialTrackMilestones);
  const [loadingStep, setLoadingStep] = useState(-1);
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const runGenerate = useServerFn(generateRoadmap);

  const activeTrack = getTrack(selected);
  const isGenerating = loadingStep >= 0;

  const fireConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  };

  const switchTrack = (id: TrackId) => {
    if (id === selected) return;
    setSelected(id);
    const track = getTrack(id);
    if (id === originalTrackId) {
      toast.message(`Back on your original path · ${track.name}`);
    } else {
      toast.success(`Roadmap switched to ${track.name}! Your foundation carries over. 🎯`);
      fireConfetti();
    }
  };

  const generate = async () => {
    setLoadingStep(0);
    try {
      const { milestones: aiMilestones } = await runGenerate({
        data: {
          currentStage: "Completed shared foundation (Linux, Networking, Cloud, Python)",
          destination: activeTrack.destination,
        },
      });
      if (aiMilestones.length) {
        // Re-status as a branch continuation: no foundation duplicates here.
        const branch = aiMilestones.map((m, i, arr) => ({
          ...m,
          id: `${selected}-ai-${i + 1}`,
          status: i === 0 ? "current" : "upcoming",
          progress: i === 0 ? 20 : 0,
        })) as Milestone[];
        setTrackMilestones((prev) => ({ ...prev, [selected]: branch }));
        toast.success(`Personalized ${activeTrack.name} roadmap ready! ✨`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Roadmap generation failed.";
      toast.error(`${msg} Showing the default ${activeTrack.name} path.`);
      setTrackMilestones((prev) => ({ ...prev, [selected]: getTrack(selected).milestones }));
    } finally {
      setLoadingStep(loadingSteps.length);
    }
  };

  useEffect(() => {
    if (loadingStep < 0) return;
    if (loadingStep >= loadingSteps.length) {
      setLoadingStep(-1);
      return;
    }
    const t = setTimeout(() => setLoadingStep((s) => Math.min(s + 1, loadingSteps.length - 1)), 800);
    return () => clearTimeout(t);
  }, [loadingStep]);

  const handleComplete = (id: string, xp: number, title: string) => {
    dispatch({ type: "COMPLETE_MILESTONE", id, xp });
    fireConfetti();
    toast.success(`Milestone complete: ${title} (+${xp} XP)`);
  };

  const branchMilestones = trackMilestones[selected];

  return (
    <PageTransition>
      {confetti && width > 0 && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={280} />
      )}

      <div className="glass-card p-8 text-center">
        <h1 className="text-3xl font-extrabold text-foreground">Branching Career Roadmap</h1>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
          Everyone starts with a shared <span className="font-semibold text-secondary">foundation</span>. From
          there your path <span className="font-semibold text-accent-foreground">branches</span> — pick Cloud, Data
          or AI/ML Engineering, and switch anytime. Your completed foundation always carries over.
        </p>
      </div>

      {/* Branch point — track switcher */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-secondary" />
          <h2 className="text-lg font-bold text-foreground">Choose your path</h2>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Switch anytime
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {careerTracks.map((track) => {
            const isActive = track.id === selected;
            const isOriginal = track.id === originalTrackId;
            return (
              <motion.button
                key={track.id}
                type="button"
                onClick={() => switchTrack(track.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative rounded-2xl border p-5 text-left transition-all",
                  isActive
                    ? "glass-card border-transparent ring-2 ring-secondary shadow-xl shadow-blue-500/10"
                    : "bg-card hover:border-primary/50",
                )}
              >
                {isOriginal && (
                  <span className="absolute right-3 top-3 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                    Original path
                  </span>
                )}
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    isActive ? "gradient-brand text-white" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon name={track.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{track.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{track.tagline}</p>
                <p className="mt-3 text-xs font-medium text-secondary">→ {track.destination}</p>
                {isActive && (
                  <span className="mt-3 inline-block rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary">
                    Active track
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-5 flex justify-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={generate}
              disabled={isGenerating}
              className="gradient-brand px-6 py-5 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Generating…" : `Personalize ${activeTrack.name} with AI`}
            </Button>
          </motion.div>
        </div>
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
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 transition-colors",
                  i <= loadingStep ? "glass-card" : "opacity-40",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                    i < loadingStep
                      ? "gradient-brand text-white"
                      : i === loadingStep
                        ? "gradient-brand animate-pulse text-white"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {i < loadingStep ? "✓" : i + 1}
                </div>
                <span className="font-medium text-foreground">{step}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline */}
      {!isGenerating && (
        <motion.div
          key={selected}
          className="relative mt-10 pl-2"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          {/* glowing connector line */}
          <div className="absolute bottom-8 left-[30px] top-2 w-1 rounded-full gradient-brand opacity-40" />

          {/* Shared foundation */}
          <p className="mb-3 ml-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Shared foundation
          </p>
          {foundationMilestones.map((m) => (
            <motion.div key={m.id} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <MilestoneCard
                milestone={m}
                isCompleted
              />
            </motion.div>
          ))}

          {/* Branch marker */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
            className="relative mb-8 flex gap-5"
          >
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed border-secondary bg-white text-secondary">
              <GitBranch className="h-6 w-6" />
            </div>
            <div className="flex-1 rounded-2xl border border-dashed border-secondary/50 bg-secondary/5 p-5">
              <h3 className="text-lg font-semibold text-foreground">Branch point — you chose to switch</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Continuing on{" "}
                <span className="font-semibold text-secondary">{activeTrack.name}</span> toward{" "}
                <span className="font-semibold text-accent-foreground">{activeTrack.destination}</span>. Use the
                cards above to explore a different branch.
              </p>
            </div>
          </motion.div>

          {/* Selected track */}
          <p className="mb-3 ml-1 text-xs font-bold uppercase tracking-wide text-secondary">
            {activeTrack.name} path
          </p>
          {branchMilestones.map((m) => (
            <motion.div key={m.id} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <MilestoneCard
                milestone={m}
                isCompleted={completedMilestones.includes(m.id)}
                onComplete={() => handleComplete(m.id, m.xpReward, m.title)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageTransition>
  );
}
