// src/context/AuthContext.tsx — client-side mock auth + RBAC (localStorage persisted).
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { can as canDo, demoAccounts, roleLabels, type Permission, type Role } from "@/data/rbac";

export interface AuthUser {
  role: Role;
  email: string;
  name: string;
  title: string;
  avatar: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  hydrated: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  loginAs: (role: Role) => void;
  logout: () => void;
  can: (permission: Permission) => boolean;
}

const STORAGE_KEY = "perx.auth.user";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Read persisted session after mount to avoid SSR hydration mismatch.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: AuthUser | null) => {
    setUser(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const login = useCallback(
    (email: string, password: string) => {
      const account = demoAccounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
      if (!account || account.password !== password) {
        return { ok: false, error: "Invalid email or password. Try a demo account below." };
      }
      const next: AuthUser = {
        role: account.role,
        email: account.email,
        name: account.name,
        title: account.title,
        avatar: account.avatar,
      };
      persist(next);
      queueMicrotask(() => toast.success(`Welcome back, ${account.name.split(" ")[0]}! · ${roleLabels[account.role]}`));
      return { ok: true };
    },
    [persist],
  );

  const loginAs = useCallback(
    (role: Role) => {
      const account = demoAccounts.find((a) => a.role === role);
      if (account) login(account.email, account.password);
    },
    [login],
  );

  const logout = useCallback(() => {
    persist(null);
    queueMicrotask(() => toast.message("Signed out"));
  }, [persist]);

  const can = useCallback((permission: Permission) => (user ? canDo(user.role, permission) : false), [user]);

  return (
    <AuthContext.Provider value={{ user, hydrated, login, loginAs, logout, can }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
