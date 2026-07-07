// src/components/MentorCard.tsx — mentor profile card with actions.
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Mentor } from "@/data/interfaces";

interface MentorCardProps {
  mentor: Mentor;
  onBook: () => void;
  onProfile: () => void;
  onMessage: () => void;
}

export function MentorCard({ mentor, onBook, onProfile, onMessage }: MentorCardProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass-card flex flex-col p-6 transition-shadow hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="flex items-center gap-4">
        <img
          src={mentor.photoUrl}
          alt={`${mentor.name} portrait`}
          className="h-16 w-16 rounded-2xl object-cover ring-2 ring-secondary/30"
          loading="lazy"
        />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-foreground">{mentor.name}</h3>
          <p className="truncate text-sm text-muted-foreground">{mentor.role}</p>
          <p className="truncate text-xs text-muted-foreground">{mentor.company}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {mentor.expertise.map((tag) => (
          <span key={tag} className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-foreground">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {mentor.rating}
        </span>
        <span className="text-muted-foreground">{mentor.years} yrs exp</span>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-semibold",
            mentor.available ? "bg-success/15 text-success" : "bg-muted text-muted-foreground",
          )}
        >
          {mentor.available ? "Available" : "Busy"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Button size="sm" onClick={onBook} className="gradient-brand text-white hover:opacity-90">
          Book
        </Button>
        <Button size="sm" variant="outline" onClick={onProfile}>
          Profile
        </Button>
        <Button size="sm" variant="secondary" onClick={onMessage}>
          Message
        </Button>
      </div>
    </motion.div>
  );
}
