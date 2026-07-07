// src/components/LoginScreen.tsx — glassmorphism login gate with demo role selection.
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Lock, LogIn, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { demoAccounts, roleLabels } from "@/data/rbac";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

const roleIcons: Record<string, string> = {
  learner: "GraduationCap",
  mentor: "Users",
  admin: "ShieldCheck",
};

export function LoginScreen() {
  const { login, loginAs } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const res = login(email, password);
      if (!res.ok) {
        setError(res.error ?? "Login failed");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-white/70 shadow-2xl backdrop-blur-xl md:grid-cols-2"
      >
        {/* Brand panel */}
        <div className="relative hidden flex-col justify-between gradient-brand p-8 text-white md:flex">
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-xl font-bold">P</div>
            <div>
              <div className="text-xl font-bold">PerX</div>
              <div className="text-xs text-white/80">Career Success Platform</div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold leading-tight">Your gamified path to a tech career.</h1>
            <p className="mt-3 text-sm text-white/80">
              AI roadmaps, mentorship, a 150+ resource library, community, jobs and events — all in one place.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <div><div className="text-2xl font-bold">156+</div><div className="text-white/70">Resources</div></div>
            <div><div className="text-2xl font-bold">300+</div><div className="text-white/70">Members</div></div>
            <div><div className="text-2xl font-bold">54</div><div className="text-white/70">Open Jobs</div></div>
          </div>
        </div>

        {/* Form panel */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue your journey.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@perx.ai"
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent py-2.5 text-sm outline-none"
                />
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl gradient-brand py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              Sign in
            </button>
          </form>

          <div className="mt-6">
            <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Or try a demo role
            </p>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => loginAs(acc.role)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border border-border bg-background/60 p-3 text-center transition-colors hover:border-primary hover:bg-primary/5",
                  )}
                >
                  <Icon name={roleIcons[acc.role]} className="h-5 w-5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">{roleLabels[acc.role]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
