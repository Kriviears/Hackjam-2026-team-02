// src/lib/mentor-match.server.ts
// Scores mentors against a user's target role + skills.
// Pure logic, no external API call — fast, free, no rate limits.

import { createServerFn } from "@tanstack/react-start";
import { mentors as mockMentors } from "../data/mockData";
import type { Mentor } from "../data/interfaces";

export interface MatchedMentor extends Mentor {
  matchScore: number; // 0-100
}

interface MatchInput {
  destination: string; // e.g. "Senior Cloud Solutions Architect"
  skills?: string[];    // e.g. ["Terraform", "Kubernetes"]
}

// Very small keyword map: destination role -> relevant expertise keywords.
// Extend this as needed — it's intentionally simple and fast, not an AI call.
const ROLE_KEYWORDS: Record<string, string[]> = {
  "solutions architect": ["Solutions Architecture", "Cost Optimization", "Serverless"],
  "devops": ["Kubernetes", "CI/CD", "Terraform"],
  "security": ["IAM", "Zero Trust", "Compliance"],
  "sre": ["Observability", "Reliability", "Networking"],
  "data": ["Data Engineering", "Analytics", "AWS"],
  "engineering manager": ["Leadership", "Career Growth", "Terraform"],
};

function scoreMentor(mentor: Mentor, input: MatchInput): number {
  let score = 0;
  const destinationLower = input.destination.toLowerCase();

  // 1. Match destination role against known keyword groups (up to 60 points)
  for (const [roleKey, keywords] of Object.entries(ROLE_KEYWORDS)) {
    if (destinationLower.includes(roleKey)) {
      const overlap = mentor.expertise.filter((e) =>
        keywords.some((k) => e.toLowerCase() === k.toLowerCase())
      ).length;
      score += Math.min(overlap * 20, 60);
    }
  }

  // 2. Match user's explicit skills against mentor expertise (up to 30 points)
  if (input.skills && input.skills.length > 0) {
    const skillOverlap = mentor.expertise.filter((e) =>
      input.skills!.some((s) => s.toLowerCase() === e.toLowerCase())
    ).length;
    score += Math.min(skillOverlap * 15, 30);
  }

  // 3. Small boost for availability and rating (up to 10 points)
  if (mentor.available) score += 5;
  score += Math.min(mentor.rating, 5); // rating is out of 5

  return Math.min(Math.round(score), 100);
}

export const getMatchedMentors = createServerFn({ method: "POST" })
  .validator((input: MatchInput) => input)
  .handler(async ({ data }): Promise<MatchedMentor[]> => {
    const scored = mockMentors.map((mentor) => ({
      ...mentor,
      matchScore: scoreMentor(mentor, data),
    }));

    // Highest match first
    return scored.sort((a, b) => b.matchScore - a.matchScore);
  });
