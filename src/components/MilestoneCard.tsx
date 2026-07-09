// src/components/MilestoneCard.tsx — a single node in the roadmap timeline.
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Milestone } from "@/data/interfaces";

interface MilestoneCardProps {
  milestone: Milestone;
  isCompleted: boolean;
  onComplete?: () => void;
}

export function MilestoneCard({ milestone, isCompleted, onComplete }: MilestoneCardProps) {
  const reduced = useReducedMotion();
  const status: Milestone["status"] = isCompleted ? "completed" : milestone.status;

  return (
    <div className="relative flex gap-5">
      {/* Node marker */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl border-2 shadow-lg transition-colors",
            status === "completed" && "gradient-brand border-transparent text-white",
            status === "current" && "border-secondary bg-white text-secondary",
            status === "upcoming" && "border-border bg-muted text-muted-foreground",
          )}
        >
          {status === "completed" ? (
            <Check className="h-6 w-6" />
          ) : (
            <Icon name={milestone.icon} className="h-6 w-6" />
          )}
          {status === "current" && (
            <span className="absolute inline-flex h-14 w-14 animate-ping rounded-2xl bg-secondary/30" />
          )}
        </div>
      </div>

      {/* Content */}
      <motion.div
        whileHover={reduced ? undefined : { y: -3 }}
        className={cn(
          "mb-8 flex-1 rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-xl hover:shadow-blue-500/10",
          status === "current" ? "glass-card ring-2 ring-secondary/40" : "bg-card",
          status === "upcoming" && "opacity-80",
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground">
            +{milestone.xpReward} XP
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-medium">⏱ {milestone.estimatedDuration}</span>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 font-semibold capitalize",
              status === "completed" && "bg-success/15 text-success",
              status === "current" && "bg-secondary/15 text-secondary",
              status === "upcoming" && "bg-muted text-muted-foreground",
            )}
          >
            {status}
          </span>
        </div>

        {status === "current" && (
          <div className="mt-4">
            {typeof milestone.progress === "number" && (
              <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full gradient-brand" style={{ width: `${milestone.progress}%` }} />
              </div>
            )}
            <Button
              size="sm"
              onClick={onComplete}
              className="gradient-brand text-white hover:opacity-90"
            >
              Mark Complete
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
