// src/components/BadgeCard.tsx — achievement badge tile.
import { motion, useReducedMotion } from "framer-motion";
import { Lock } from "lucide-react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import type { Badge } from "@/data/interfaces";

export function BadgeCard({ badge, onClick }: { badge: Badge; onClick: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduced ? undefined : { y: -4, scale: 1.02 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      disabled={!badge.unlocked}
      aria-label={badge.unlocked ? `${badge.name} badge, unlocked` : `${badge.name} badge, locked`}
      className={cn(
        "flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border p-5 text-center transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
        badge.unlocked
          ? "glass-card cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10"
          : "cursor-not-allowed border-dashed bg-muted/50",
      )}
    >
      <div
        className={cn(
          "relative flex h-16 w-16 items-center justify-center rounded-full",
          badge.unlocked
            ? "gradient-brand text-white shadow-lg ring-4 ring-secondary/20"
            : "bg-muted text-muted-foreground grayscale",
        )}
      >
        {badge.unlocked ? (
          <Icon name={badge.icon} className="h-8 w-8" />
        ) : (
          <Lock className="h-7 w-7" />
        )}
        {badge.unlocked && !reduced && (
          <span className="absolute inset-0 animate-pulse rounded-full ring-2 ring-accent/40" />
        )}
      </div>
      <span className={cn("text-sm font-semibold", badge.unlocked ? "text-foreground" : "text-muted-foreground")}>
        {badge.name}
      </span>
    </motion.button>
  );
}
