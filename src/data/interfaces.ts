// src/data/interfaces.ts — single source of truth for all data shapes.

export type MilestoneStatus = "completed" | "current" | "upcoming";

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  xpReward: number;
  estimatedDuration: string;
  status: MilestoneStatus;
  progress?: number;
}

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Quest {
  id: string;
  title: string;
  difficulty: Difficulty;
  xp: number;
  reward: string;
  timeEstimate: string;
  completion: number;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  years: number;
  rating: number;
  available: boolean;
  photoUrl: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string; // lucide icon name
  description: string;
  unlocked: boolean;
  earnedDate?: string;
}

export interface AIConversation {
  prompt: string;
  response: string; // markdown
}

export interface DailyChallenge {
  id: string;
  text: string;
  done: boolean;
}

export interface UserStats {
  name: string;
  currentStage: string;
  destination: string;
  level: number;
  levelTitle: string;
  xp: number;
  xpToNextLevel: number;
  readiness: number;
  skillsCount: number;
  certifications: number;
  projects: number;
  mentorSessions: number;
  applications: number;
  interviewSuccess: number;
}
