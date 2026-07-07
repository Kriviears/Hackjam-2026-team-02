// src/components/Sidebar.tsx — role-aware desktop rail + mobile slide-in drawer.
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";
import { navItems, roleLabels } from "@/data/rbac";
import { cn } from "@/lib/utils";

function Brand() {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-lg font-bold text-white">
        P
      </div>
      <div>
        <div className="text-lg font-bold text-foreground">PerX</div>
        <div className="text-[11px] text-muted-foreground">Career Gateway</div>
      </div>
    </div>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();
  const role = user?.role ?? "learner";
  const items = navItems.filter((i) => i.roles.includes(role));

  return (
    <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
      {items.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "gradient-brand text-white shadow-lg shadow-blue-500/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon name={item.icon} className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserCard() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <div className="mt-4 rounded-2xl border border-border bg-background/60 p-3">
      <div className="flex items-center gap-3">
        <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-foreground">{user.name}</div>
          <div className="text-xs text-secondary">{roleLabels[user.role]}</div>
        </div>
        <button
          type="button"
          onClick={logout}
          aria-label="Sign out"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar/80 px-4 py-6 backdrop-blur-sm lg:flex">
        <Brand />
        <NavLinks />
        <UserCard />
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-sm lg:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-foreground hover:bg-muted"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar px-4 py-6 shadow-2xl lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between">
                <Brand />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="rounded-lg p-2 text-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <NavLinks onNavigate={() => setOpen(false)} />
              <UserCard />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
