import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { userStats } from "@/data/mockData";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — PerX" },
      { name: "description", content: "Manage your PerX profile, notifications and appearance preferences." },
      { property: "og:title", content: "Settings — PerX" },
      { property: "og:description", content: "Update your profile and preferences on PerX." },
    ],
  }),
  component: Settings,
});

const themes = ["System", "Light", "Dark"] as const;

function Settings() {
  const [name, setName] = useState(userStats.name);
  const [email, setEmail] = useState("alex@perx.dev");
  const [notifications, setNotifications] = useState({
    milestones: true,
    mentors: true,
    weekly: false,
  });
  const [theme, setTheme] = useState<(typeof themes)[number]>("System");

  const save = () => toast.success("Settings saved");

  return (
    <PageTransition>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">Personalize your PerX experience.</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <section className="glass-card p-6">
          <h2 className="text-lg font-bold text-foreground">Profile</h2>
          <div className="mt-4 flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/150?img=13"
              alt="Your avatar"
              className="h-16 w-16 rounded-2xl object-cover ring-2 ring-secondary/30"
            />
            <Button variant="outline" onClick={() => toast("Avatar upload coming soon")}>
              Change avatar
            </Button>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-foreground">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-foreground">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary"
              />
            </label>
          </div>
        </section>

        {/* Notifications */}
        <section className="glass-card p-6">
          <h2 className="text-lg font-bold text-foreground">Notifications</h2>
          <div className="mt-4 space-y-4">
            {(
              [
                ["milestones", "Milestone reminders"],
                ["mentors", "New mentor matches"],
                ["weekly", "Weekly progress digest"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{label}</span>
                <Switch
                  checked={notifications[key]}
                  onCheckedChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))}
                  aria-label={label}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Appearance */}
        <section className="glass-card p-6">
          <h2 className="text-lg font-bold text-foreground">Appearance</h2>
          <div className="mt-4 flex gap-2">
            {themes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                  theme === t
                    ? "gradient-brand border-transparent text-white"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Theme switching is a placeholder in this demo.</p>
        </section>

        <Button onClick={save} className="gradient-brand text-white hover:opacity-90">
          Save Changes
        </Button>
      </div>
    </PageTransition>
  );
}
