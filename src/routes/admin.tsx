// src/routes/admin.tsx — admin portal: analytics, user/role management, moderation, RBAC matrix.
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Minus, Search, ShieldAlert, X } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";
import { permissionMatrix, roleLabels, type Role } from "@/data/rbac";
import { platformUsers, resources, discussions, jobs } from "@/data/demoData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — PerX" },
      { name: "description", content: "Manage users, roles, content moderation and platform analytics." },
    ],
  }),
  component: AdminPage,
});

const tabs = ["Analytics", "Users", "Moderation", "Permissions"] as const;
const roles: Role[] = ["learner", "mentor", "admin"];

function AccessDenied() {
  return (
    <PageTransition>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <h1 className="mt-4 text-2xl font-bold text-foreground">Access Restricted</h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          The Admin Portal is only available to platform administrators. Sign in with the Admin demo role to explore it.
        </p>
      </div>
    </PageTransition>
  );
}

function MatrixCell({ level }: { level: string }) {
  if (level === "yes") return <Check className="mx-auto h-4 w-4 text-emerald-600" />;
  if (level === "limited") return <Minus className="mx-auto h-4 w-4 text-amber-600" />;
  return <X className="mx-auto h-4 w-4 text-muted-foreground/40" />;
}

function AdminPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Analytics");
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(platformUsers);

  const filteredUsers = useMemo(
    () => users.filter((u) => !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.includes(query.toLowerCase())),
    [users, query],
  );

  const pending = resources.filter((r) => r.status === "pending");

  if (user?.role !== "admin") return <AccessDenied />;

  const changeRole = (id: string, role: Role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    toast.success(`Role updated to ${roleLabels[role]}`);
  };

  return (
    <PageTransition>
      <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
      <p className="mt-1 text-muted-foreground">Platform administration and analytics.</p>

      <div className="mt-6 flex gap-1 rounded-xl border border-border bg-background p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn("flex-1 rounded-lg px-3 py-2 text-sm font-medium", tab === t ? "gradient-brand text-white" : "text-muted-foreground")}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Analytics" && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon="Users" label="Total Users" value={platformUsers.length} />
            <StatCard icon="Library" label="Resources" value={resources.length} />
            <StatCard icon="MessagesSquare" label="Discussions" value={discussions.length} />
            <StatCard icon="Briefcase" label="Open Jobs" value={jobs.length} />
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {roles.map((r) => {
              const count = platformUsers.filter((u) => u.role === r).length;
              const pct = Math.round((count / platformUsers.length) * 100);
              return (
                <Card key={r} className="glass-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{roleLabels[r]}s</span>
                    <span className="text-2xl font-bold text-primary">{count}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div className="h-full gradient-brand" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }} />
                  </div>
                  <span className="mt-1 block text-xs text-muted-foreground">{pct}% of members</span>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {tab === "Users" && (
        <div className="mt-6">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-transparent py-2.5 text-sm outline-none"
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{filteredUsers.length} users</p>
          <div className="mt-3 space-y-2">
            {filteredUsers.slice(0, 40).map((u) => (
              <Card key={u.id} className="flex flex-wrap items-center gap-3 p-3">
                <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">{u.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    u.status === "active" ? "bg-emerald-500/10 text-emerald-600" : u.status === "pending" ? "bg-amber-500/10 text-amber-600" : "bg-rose-500/10 text-rose-600",
                  )}
                >
                  {u.status}
                </span>
                <select
                  value={u.role}
                  onChange={(e) => changeRole(u.id, e.target.value as Role)}
                  className="rounded-lg border border-border bg-background px-2 py-1 text-xs text-foreground outline-none"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>{roleLabels[r]}</option>
                  ))}
                </select>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "Moderation" && (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-muted-foreground">{pending.length} resources awaiting approval.</p>
          {pending.map((r) => (
            <Card key={r.id} className="flex flex-wrap items-center gap-3 p-4">
              <Icon name="FileText" className="h-5 w-5 text-primary" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold text-foreground">{r.title}</div>
                <div className="text-xs text-muted-foreground">by {r.author} · {r.category}</div>
              </div>
              <button
                onClick={() => toast.success(`Approved "${r.title}"`)}
                className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600"
              >
                <Check className="h-3.5 w-3.5" /> Approve
              </button>
              <button
                onClick={() => toast.message(`Rejected "${r.title}"`)}
                className="flex items-center gap-1 rounded-lg bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-600"
              >
                <X className="h-3.5 w-3.5" /> Reject
              </button>
            </Card>
          ))}
        </div>
      )}

      {tab === "Permissions" && (
        <Card className="glass-card mt-6 overflow-x-auto p-2">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-3 font-semibold text-foreground">Feature</th>
                {roles.map((r) => (
                  <th key={r} className="p-3 text-center font-semibold text-foreground">{roleLabels[r]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.map((row) => (
                <tr key={row.key} className="border-b border-border/60 last:border-0">
                  <td className="p-3 text-foreground">{row.feature}</td>
                  <td className="p-3"><MatrixCell level={row.learner} /></td>
                  <td className="p-3"><MatrixCell level={row.mentor} /></td>
                  <td className="p-3"><MatrixCell level={row.admin} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </PageTransition>
  );
}
