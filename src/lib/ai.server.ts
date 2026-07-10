// src/lib/ai.server.ts
// Minimal AI integration — no database needed.
// Calls Groq (Llama 3.3 70B) to generate a personalized career roadmap.
// Server-only — the API key never reaches the browser.

import { createServerFn } from "@tanstack/react-start";
import type { Milestone } from "../data/interfaces";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

interface GenerateRoadmapInput {
  currentStage: string; // e.g. "AWS re/Start Graduate"
  destination: string;  // e.g. "Senior Cloud Solutions Architect"
  skills?: string;       // optional, comma-separated
}

export const generateRoadmap = createServerFn({ method: "POST" })
  .validator((input: GenerateRoadmapInput) => input)
  .handler(async ({ data }): Promise<Milestone[]> => {
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not set. Add it to your .env file.");
    }

    const prompt = `You are a career roadmap generator for a tech career platform.

Generate a personalized 8-milestone career roadmap for someone transitioning from:
Current stage: ${data.currentStage}
Target role: ${data.destination}
${data.skills ? `Existing skills: ${data.skills}` : ""}

Return ONLY a valid JSON array (no markdown, no explanation, no code fences) of exactly 8 milestones, each with this exact shape:
{
  "id": "m1",
  "title": "short title",
  "description": "one sentence description",
  "icon": "a lucide-react icon name like GraduationCap, Terminal, Cloud, Award, Rocket",
  "xpReward": a number between 100 and 500,
  "estimatedDuration": "e.g. 2 weeks",
  "status": "current" for the first milestone, "upcoming" for the rest,
  "progress": 0
}

Order milestones logically from where the person is now to landing the target role. Return ONLY the JSON array.`;

    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq API error (${response.status}): ${errText}`);
    }

    const result = await response.json();
    const rawText: string = result.choices?.[0]?.message?.content ?? "";

    // Defensive parsing — LLMs sometimes wrap JSON in markdown fences
    // or add stray text before/after the array.
    const cleaned = rawText
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "");

    const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("Groq did not return a parseable JSON array. Raw response: " + rawText);
    }

    let milestones: Milestone[];
    try {
      milestones = JSON.parse(jsonMatch[0]);
    } catch (err) {
      throw new Error("Failed to parse Groq's JSON response: " + (err as Error).message);
    }

    return milestones;
  });