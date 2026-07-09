import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Target } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { ProgressRing } from "@/components/ProgressRing";
import { StatCard } from "@/components/StatCard";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import { milestones, userStats } from "@/data/mockData";
import { platformUsers, resources, discussions, jobs } from "@/data/demoData";
import { roleLabels } from "@/data/rbac";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function MentorDashboard({ name }: { name: string }) {
  const mentees = platformUsers.filter((u) => u.role === "learner").slice(0, 6);
  return (
    <PageTransition>
      <section className="glass-card p-8">
        <p className="text-sm font-medium text-secondary">Mentor workspace</p>
        <h1 className="text-4xl font-extrabold text-foreground">Welcome, {name}! 👋</h1>
        <p className="mt-2 text-muted-foreground">Guide your mentees, review progress and share resources.</p>
      </section>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="Users" label="Active Mentees" value={24} />
        <StatCard icon="CalendarClock" label="Sessions This Month" value={18} />
        <StatCard icon="Library" label="Resources Shared" value={42} />
        <StatCard icon="Star" label="Avg. Rating" value={49} suffix="/50" />
      </div>
      <h2 className="mt-8 mb-4 text-xl font-bold text-foreground">Your Mentees</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mentees.map((m) => (
          <Card key={m.id} className="glass-card flex items-center gap-3 p-4">
            <img src={m.avatar} alt={m.name} className="h-11 w-11 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold text-foreground">{m.name}</div>
              <div className="text-xs text-muted-foreground">Last active {m.lastActive}</div>
            </div>
            <Icon name="ChevronRight" className="h-4 w-4 text-muted-foreground" />
          </Card>
        ))}
      </div>
    </PageTransition>
  );
}

function AdminDashboard({ name }: { name: string }) {
  return (
    <PageTransition>
      <section className="glass-card flex flex-wrap items-center justify-between gap-4 p-8">
        <div>
          <p className="text-sm font-medium text-secondary">Administrator</p>
          <h1 className="text-4xl font-extrabold text-foreground">Welcome, {name}! 👋</h1>
          <p className="mt-2 text-muted-foreground">Platform overview and management at a glance.</p>
        </div>
        <Button asChild className="gradient-brand text-white hover:opacity-90">
          <Link to="/admin">Open Admin Portal <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </section>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon="Users" label="Total Users" value={platformUsers.length} />
        <StatCard icon="Library" label="Resources" value={resources.length} />
        <StatCard icon="MessagesSquare" label="Discussions" value={discussions.length} />
        <StatCard icon="Briefcase" label="Open Jobs" value={jobs.length} />
      </div>
    </PageTransition>
  );
}


const stats = [
  { icon: "Wrench", label: "Skills", value: userStats.skillsCount },
  { icon: "Award", label: "Certifications", value: userStats.certifications },
  { icon: "FolderGit2", label: "Projects", value: userStats.projects },
  { icon: "Users", label: "Mentor Sessions", value: userStats.mentorSessions },
  { icon: "Send", label: "Applications", value: userStats.applications },
  { icon: "TrendingUp", label: "Interview Success", value: userStats.interviewSuccess, suffix: "%" },
];

const dueDates = ["Jul 22", "Aug 05", "Aug 12", "Aug 19", "Aug 26", "Sep 02"];

function Dashboard() {
  const { user } = useAuth();
  const { xp, level, levelTitle, xpToNextLevel } = useUser();
  const xpPct = Math.min(100, Math.round((xp / xpToNextLevel) * 100));
  const upcoming = milestones.slice(5, 11);

  if (user?.role === "mentor") return <MentorDashboard name={user.name.split(" ")[0]} />;
  if (user?.role === "admin") return <AdminDashboard name={user.name.split(" ")[0]} />;

  const displayName = user?.name?.split(" ")[0] ?? userStats.name;

  return (
    <PageTransition>
      {/* Hero */}
      <section className="glass-card overflow-hidden p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-secondary">Welcome back, {roleLabels[user?.role ?? "learner"]}</p>
            <h1 className="text-4xl font-extrabold text-foreground">{displayName}! 👋</h1>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> {userStats.currentStage}
              </span>
              <span className="inline-flex items-center gap-2">
                <Target className="h-4 w-4 text-secondary" /> {userStats.destination}
              </span>
            </div>
            <Button asChild className="mt-6 gradient-brand text-white hover:opacity-90">
              <Link to="/roadmap">
                View your roadmap <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <ProgressRing value={userStats.readiness} label="Career Readiness" size={180} />
          </div>
        </div>
      </section>

      {/* Level card */}
      <section className="mt-6 glass-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Level {level} · <span className="text-gradient-brand">{levelTitle}</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              {xp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP to next level
            </p>
          </div>
          <span className="rounded-full bg-secondary/15 px-3 py-1 text-sm font-semibold text-secondary">
            {xpPct}%
          </span>
        </div>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full gradient-brand"
            initial={{ width: 0 }}
            animate={{ width: `${xpPct}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </section>

      {/* Upcoming milestones */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Upcoming Milestones</h2>
          <Link to="/roadmap" className="text-sm font-medium text-secondary hover:underline">
            See all
          </Link>
        </div>
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {upcoming.map((m, i) => (
            <motion.div
              key={m.id}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-brand text-white">
                  <Icon name={m.icon} className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Due {dueDates[i]}</span>
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{m.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{m.description}</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full gradient-brand" style={{ width: `${m.progress ?? 0}%` }} />
              </div>
              <span className="mt-2 inline-block rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold capitalize text-secondary">
                {m.status}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick stats */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-foreground">Your Progress</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} suffix={s.suffix} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
