import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { MentorCard } from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getMatchedMentors, type MatchedMentor } from "@/lib/mentor-match.server";

export const Route = createFileRoute("/mentorship")({
  head: () => ({
    meta: [
      { title: "Mentorship Hub — PerX" },
      {
        name: "description",
        content: "Get matched with senior cloud, DevOps and security mentors from top tech companies.",
      },
      { property: "og:title", content: "Mentorship Hub — PerX" },
      { property: "og:description", content: "Book sessions with expert mentors matched to your career goals." },
    ],
  }),
  component: Mentorship,
});

function Mentorship() {
 const [mentors, setMentors] = useState<MatchedMentor[]>([]);

  useEffect(() => {
    getMatchedMentors({
      data: {
        destination: "Senior Cloud Solutions Architect", // matches roadmap.tsx for now
      },
    }).then(setMentors);
  }, []);

  const featured = mentors[0];
  const rest = mentors.slice(1);

  const notify = (msg: string) => toast.success(msg);
if (!featured) {
  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Mentorship Hub</h1>
        <p className="mt-1 text-muted-foreground">Learn from those who've walked the path before you.</p>
      </div>
      <section className="glass-card overflow-hidden p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center animate-pulse">
          <div className="h-28 w-28 rounded-3xl bg-muted" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-6 w-48 rounded bg-muted" />
            <div className="h-4 w-56 rounded bg-muted" />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Mentorship Hub</h1>
        <p className="mt-1 text-muted-foreground">Learn from those who've walked the path before you.</p>
      </div>

      {/* Featured mentor */}
      <section className="glass-card overflow-hidden p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative">
            <img
              src={featured.photoUrl}
              alt={`${featured.name} portrait`}
              className="h-28 w-28 rounded-3xl object-cover ring-4 ring-secondary/30"
              loading="lazy"
            />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full gradient-brand px-3 py-1 text-xs font-bold text-white shadow-lg">
              {featured?.matchScore}% match
            </span>
          </div>
          <div className="flex-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
              <Sparkles className="h-3.5 w-3.5" /> Top match for you
            </span>
            <h2 className="mt-2 text-2xl font-bold text-foreground">{featured.name}</h2>
            <p className="text-muted-foreground">
              {featured.role} · {featured.company}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {featured.expertise.map((tag) => (
                <span key={tag} className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {featured.rating} · {featured.years} yrs
            </div>
          </div>
          <Button
            onClick={() => notify(`Session booked with ${featured.name}`)}
            className="gradient-brand text-white hover:opacity-90"
          >
            Book Session
          </Button>
        </div>
      </section>

      {/* Mentor grid */}
      <motion.div
        className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {rest.map((m) => (
          <motion.div key={m.id} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            <MentorCard
              mentor={m}
              onBook={() => notify(`Session booked with ${m.name}`)}
              onProfile={() => notify(`Opening ${m.name}'s profile`)}
              onMessage={() => notify(`Message sent to ${m.name}`)}
            />
          </motion.div>
        ))}
      </motion.div>
    </PageTransition>
  );
}
