// src/data/techStackData.ts — authoritative technology stack definitions and comparative insights for PerX.

export interface Tech {
  name: string;
  category: "Frontend" | "Styling & UI" | "Backend & Server" | "AI Layer" | "State Management" | "Visualization & Animation";
  icon: string;
  description: string;
  why: string;
  benefits: string[];
  accent?: string;
}

export const technologies: Tech[] = [
  {
    name: "React 19",
    category: "Frontend",
    icon: "Atom",
    description: "Stable component library powering concurrent transitions and Server Actions.",
    why: "Offers lightning-fast renders, hydration support, and modern React compile lifecycles.",
    benefits: ["Concurrent Rendering", "Server Components Ready", "Optimized Hook Trees"],
  },
  {
    name: "TanStack Start",
    category: "Backend & Server",
    icon: "Rocket",
    description: "Full-stack React meta-framework powered by Nitro and TanStack Router.",
    why: "Delivers absolute type safety from routes down to server actions with fast server-side execution.",
    benefits: ["Full Type-Safety", "Nitro Engine SSR", "RPC Server Functions"],
  },
  {
    name: "Tailwind CSS v4",
    category: "Styling & UI",
    icon: "Palette",
    description: "Native CSS-first design engine enabling zero-overhead performance.",
    why: "Builds responsive, stunning user interfaces without runtime CSS compiling bottlenecks.",
    benefits: ["Zero CSS Runtime", "CSS-First Design", "Optimized Bundles"],
  },
  {
    name: "DeepSeek API",
    category: "AI Layer",
    icon: "Brain",
    description: "Advanced model reasoning API for career navigator and learning roadmaps.",
    why: "Provides industry-leading reasoning performance at highly cost-effective scales.",
    benefits: ["Dynamic Real-Time Chat", "20-Step Roadmap Output", "Cost-Efficient Intelligence"],
    accent: "ai",
  },
  {
    name: "Llama 3.3 70B",
    category: "AI Layer",
    icon: "Cpu",
    description: "Production-ready, highly versatile open-weights model.",
    why: "Maintains absolute response stability and high reasoning capabilities on Groq nodes.",
    benefits: ["High Concurrency", "Response Stability", "Zero-Latency Inference"],
    accent: "ai",
  },
  {
    name: "React Context API",
    category: "State Management",
    icon: "Database",
    description: "Native state management tracking active auth profiles and gamification scores.",
    why: "Simple, lightweight, and built-in, avoiding external library bundle bloat.",
    benefits: ["Zero Bundle Bloat", "Instant State Propagation", "Declarative Flow"],
  },
  {
    name: "Framer Motion v11",
    category: "Visualization & Animation",
    icon: "Wand2",
    description: "High-performance vector animation library supporting layout transitions.",
    why: "Allows fluid page load fades, slide triggers, and scaling card interactions.",
    benefits: ["Layout Animations", "Hardware Acceleration", "Fluid Transitions"],
  },
  {
    name: "Radix UI Primitives",
    category: "Styling & UI",
    icon: "ShieldCheck",
    description: "Unstyled, fully accessible interactive UI primitives.",
    why: "Guarantees full screen-reader accessibility and keyboard compliance.",
    benefits: ["WAI-ARIA Compliant", "Fully Accessible", "Keyboard Interactive"],
  },
];

export interface ComparisonRow {
  requirement: string;
  technology: string;
  benefit: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    requirement: "Full-Stack Security",
    technology: "TanStack Start Server Actions",
    benefit: "Keeps private API keys safely on the server; the browser never sees credentials.",
  },
  {
    requirement: "Type-Safe Routing",
    technology: "TanStack Router",
    benefit: "Guarantees zero invalid page links during site compilation and runtime navigation.",
  },
  {
    requirement: "High-Aesthetic UI",
    technology: "Tailwind CSS v4 & glassmorphism",
    benefit: "Builds a sleek dark-mode, premium platform feel with zero manual stylesheet bloat.",
  },
  {
    requirement: "Accessibility & Tap Targets",
    technology: "Radix UI Primitives & shadcn",
    benefit: "Ensures responsive sizing, robust touch states, and comprehensive screen-reader accessibility.",
  },
];

export interface PerformanceHighlight {
  title: string;
  icon: string;
  description: string;
}

export const performanceHighlights: PerformanceHighlight[] = [
  {
    title: "Sub-50ms SSR Latency",
    icon: "Zap",
    description: "Fueled by the Nitro Server Engine rendering React pages on edge nodes.",
  },
  {
    title: "100% Type-Safe Routes",
    icon: "BadgeCheck",
    description: "Complete compile-time safety preventing broken layout references.",
  },
  {
    title: "Zero UI Layout Shifts",
    icon: "Activity",
    description: "Precise aspect-ratios and CSS container queries block layout jumps during render.",
  },
  {
    title: "Edge Cached Content",
    icon: "Server",
    description: "Global CDNs cache static assets and static fallback parameters instantaneously.",
  },
];

export interface FutureRoadmapItem {
  name: string;
  icon: string;
  description: string;
}

export const futureRoadmap: FutureRoadmapItem[] = [
  {
    name: "Interactive VPC Sandbox",
    icon: "Terminal",
    description: "Lightweight, cloud terminal sandboxes nested straight inside career milestones.",
  },
  {
    name: "Multi-Agent Guild Orchestrator",
    icon: "Users",
    description: "Decentralized task execution with autonomous coding, audit, and design agents.",
  },
  {
    name: "On-Chain Verified Badging",
    icon: "Award",
    description: "Soulbound cryptographically verifiable career badges to bypass resume screens.",
  },
];

export interface ArchitectureLayer {
  label: string;
  icon: string;
  detail: string;
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    label: "Client Browser Workspace",
    icon: "Laptop",
    detail: "Responsive React 19 UI with Framer Motion, glassmorphism dashboard, and the floating chat widget.",
  },
  {
    label: "TanStack Start Server Actions (Nitro RPC)",
    icon: "Server",
    detail: "Type-safe server-side functions processing routing context, security authorizations, and data queries.",
  },
  {
    label: "DeepSeek / Llama AI Intelligence Node",
    icon: "BrainCircuit",
    detail: "Secure reasoning API generating personalized 20-step career progression nodes and chat guidance.",
  },
];
