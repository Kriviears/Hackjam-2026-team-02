// src/data/rbac.ts — roles, permissions, RBAC matrix and role-aware navigation.

export type Role = "learner" | "mentor" | "admin";

export interface DemoAccount {
  role: Role;
  email: string;
  password: string;
  name: string;
  title: string;
  avatar: string;
}

// Demo credentials shown on the login screen.
export const demoAccounts: DemoAccount[] = [
  {
    role: "learner",
    email: "learner@perx.ai",
    password: "password123",
    name: "Alex Rivera",
    title: "AWS re/Start Graduate",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    role: "learner",
    email: "sam@perx.ai",
    password: "password123",
    name: "Sam Chen",
    title: "Switching Paths · Cloud → Data / AI",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    role: "mentor",
    email: "mentor@perx.ai",
    password: "password123",
    name: "Priya Sharma",
    title: "Principal Cloud Architect",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    role: "admin",
    email: "admin@perx.ai",
    password: "password123",
    name: "Jordan Blake",
    title: "Platform Administrator",
    avatar: "https://i.pravatar.cc/150?img=13",
  },
];

// Permission keys used across the app.
export type Permission =
  | "view_dashboard"
  | "view_resources"
  | "upload_resources"
  | "approve_resources"
  | "create_events"
  | "moderate_discussions"
  | "manage_users"
  | "manage_roles"
  | "post_jobs"
  | "ai_roadmaps"
  | "review_mentees"
  | "admin_portal";

export type PermissionLevel = "yes" | "no" | "limited";

interface MatrixRow {
  key: Permission;
  feature: string;
  learner: PermissionLevel;
  mentor: PermissionLevel;
  admin: PermissionLevel;
}

// Visual RBAC permission matrix (also the source of truth for `can`).
export const permissionMatrix: MatrixRow[] = [
  { key: "view_dashboard", feature: "View Dashboard", learner: "yes", mentor: "yes", admin: "yes" },
  { key: "view_resources", feature: "View Resources", learner: "yes", mentor: "yes", admin: "yes" },
  { key: "ai_roadmaps", feature: "AI Roadmaps", learner: "yes", mentor: "yes", admin: "yes" },
  { key: "upload_resources", feature: "Upload Resources", learner: "no", mentor: "yes", admin: "yes" },
  { key: "review_mentees", feature: "Review Mentee Progress", learner: "no", mentor: "yes", admin: "yes" },
  { key: "create_events", feature: "Create Events", learner: "no", mentor: "yes", admin: "yes" },
  { key: "moderate_discussions", feature: "Moderate Discussions", learner: "no", mentor: "limited", admin: "yes" },
  { key: "post_jobs", feature: "Post Jobs", learner: "no", mentor: "limited", admin: "yes" },
  { key: "approve_resources", feature: "Approve Resources", learner: "no", mentor: "no", admin: "yes" },
  { key: "manage_users", feature: "Manage Users", learner: "no", mentor: "no", admin: "yes" },
  { key: "manage_roles", feature: "Manage Roles", learner: "no", mentor: "no", admin: "yes" },
  { key: "admin_portal", feature: "Admin Portal", learner: "no", mentor: "no", admin: "yes" },
];

export function can(role: Role, permission: Permission): boolean {
  const row = permissionMatrix.find((r) => r.key === permission);
  if (!row) return false;
  return row[role] !== "no";
}

export interface NavItem {
  to: string;
  label: string;
  icon: string; // lucide name
  roles: Role[];
}

// Full navigation set, filtered per role in the Sidebar.
export const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: "LayoutDashboard", roles: ["learner", "mentor", "admin"] },
  { to: "/roadmap", label: "Career Roadmap", icon: "Compass", roles: ["learner", "mentor", "admin"] },
  { to: "/learning", label: "AI Learning Center", icon: "GraduationCap", roles: ["learner", "mentor", "admin"] },
  { to: "/resources", label: "Resource Library", icon: "Library", roles: ["learner", "mentor", "admin"] },
  { to: "/community", label: "Community Hub", icon: "MessagesSquare", roles: ["learner", "mentor", "admin"] },
  { to: "/success-stories", label: "Success Stories", icon: "Sparkles", roles: ["learner", "mentor", "admin"] },
  { to: "/jobs", label: "Job Board", icon: "Briefcase", roles: ["learner", "mentor", "admin"] },
  { to: "/events", label: "Events", icon: "CalendarDays", roles: ["learner", "mentor", "admin"] },
  { to: "/mentorship", label: "Mentorship", icon: "Users", roles: ["learner", "mentor", "admin"] },
  { to: "/achievements", label: "Achievements", icon: "Trophy", roles: ["learner", "mentor", "admin"] },
  { to: "/notifications", label: "Notifications", icon: "Bell", roles: ["learner", "mentor", "admin"] },
  { to: "/admin", label: "Admin Portal", icon: "ShieldCheck", roles: ["admin"] },
  { to: "/technology-stack", label: "Tech Stack", icon: "Info", roles: ["learner", "mentor", "admin"] },
  { to: "/settings", label: "Settings", icon: "Settings", roles: ["learner", "mentor", "admin"] },
];

export const roleLabels: Record<Role, string> = {
  learner: "Learner",
  mentor: "Mentor",
  admin: "Admin",
};
