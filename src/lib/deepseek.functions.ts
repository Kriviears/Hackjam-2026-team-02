// src/lib/deepseek.functions.ts — server-side DeepSeek (OpenAI-compatible) calls.
// The API key stays on the server; the browser never sees it.
import { createServerFn } from "@tanstack/react-start";
import type { Milestone } from "@/data/interfaces";
import { milestones as defaultMilestones } from "@/data/mockData";
import { extraAIConversations } from "@/data/demoData";

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

interface ChatInput {
  messages: ChatMessage[];
}

function validateChatInput(input: unknown): ChatInput {
  const data = input as ChatInput;
  if (!data || !Array.isArray(data.messages)) {
    throw new Error("messages array is required");
  }
  const messages = data.messages
    .filter((m) => m && typeof m.content === "string")
    .map((m) => ({
      role: m.role === "user" || m.role === "assistant" ? m.role : "user",
      content: String(m.content).slice(0, 4000),
    }))
    .slice(-16) as ChatMessage[];
  return { messages };
}

const SYSTEM_PROMPT = `You are the PerX AI Career Navigator, a friendly, motivating career coach for people breaking into tech careers (Cloud, AI, Cybersecurity, Data, DevOps, and Forward Deployment Engineering).
- Be concise, encouraging and practical. Use short paragraphs.
- Use simple markdown: **bold** for emphasis and "- " bullet lists for steps.
- Give concrete, actionable next steps, certifications, and skills.
- The user (Alex) is on a journey from AWS re/Start Graduate toward a Senior Cloud Solutions Architect role.`;

async function callDeepseek(
  apiKey: string,
  messages: ChatMessage[],
  options: { jsonMode?: boolean; temperature?: number } = {},
): Promise<string> {
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: options.temperature ?? 0.7,
      ...(options.jsonMode ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 401) throw new Error("DeepSeek API key is invalid or expired.");
    if (res.status === 402) throw new Error("DeepSeek account is out of credits.");
    if (res.status === 429) throw new Error("DeepSeek rate limit reached — please try again shortly.");
    throw new Error(`DeepSeek request failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "";
}

export const deepseekChat = createServerFn({ method: "POST" })
  .inputValidator(validateChatInput)
  .handler(async ({ data }) => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      // Robust Fallback Mode: Match client prompt to demo conversations
      const lastMessage = data.messages[data.messages.length - 1]?.content || "";
      const match = extraAIConversations.find(
        (c) => c.prompt.toLowerCase().trim() === lastMessage.toLowerCase().trim()
      );
      if (match) {
        return { content: match.response };
      }

      // Default mock responses for standard prompts
      if (lastMessage.toLowerCase().includes("bedrock") || lastMessage.toLowerCase().includes("azure")) {
        return {
          content: "**AWS Bedrock**: model choice (Anthropic, Meta, Amazon), tight AWS integration, good for multi-model apps.\n\n**Azure OpenAI**: first-class GPT models, enterprise compliance, deep Microsoft ecosystem fit.\n\nChoose based on your **existing cloud** and whether you need model variety (Bedrock) or the latest OpenAI models (Azure). ⚖️"
        };
      }

      return {
        content: `I'm currently running in **Demo Mode** because the \`DEEPSEEK_API_KEY\` environment secret is not configured in this environment (such as on Vercel).

To enable fully dynamic, live AI responses:
1. Go to your **Vercel Project Dashboard** under **Settings -> Environment Variables**.
2. Add a new variable named \`DEEPSEEK_API_KEY\` with your private key value.
3. Re-deploy your project! 🚀

For now, feel free to try clicking any of the suggested prompts in the sidebar (e.g., *Compare AWS Bedrock vs Azure OpenAI*, *Explain RAG simply*), and I will instantly return high-quality simulated answers! ✨`
      };
    }

    const content = await callDeepseek(apiKey, [
      { role: "system", content: SYSTEM_PROMPT },
      ...data.messages,
    ]);
    return { content };
  });

interface RoadmapInput {
  currentStage: string;
  destination: string;
}

function validateRoadmapInput(input: unknown): RoadmapInput {
  const data = (input ?? {}) as Partial<RoadmapInput>;
  return {
    currentStage: String(data.currentStage ?? "AWS re/Start Graduate").slice(0, 200),
    destination: String(data.destination ?? "Senior Cloud Solutions Architect").slice(0, 200),
  };
}

const ALLOWED_ICONS = [
  "GraduationCap", "Terminal", "Network", "Cloud", "Award", "BadgeCheck",
  "FolderGit2", "Boxes", "GitBranch", "Container", "Zap", "ShieldCheck",
  "Activity", "PiggyBank", "Trophy", "MessagesSquare", "FileText", "Linkedin",
  "Users", "Rocket", "Database", "Cpu", "Lock", "Code", "Server", "Brain",
];

export const generateRoadmap = createServerFn({ method: "POST" })
  .inputValidator(validateRoadmapInput)
  .handler(async ({ data }): Promise<{ milestones: Milestone[] }> => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.warn("DEEPSEEK_API_KEY is not set. Falling back to default high-quality milestones.");
      return { milestones: defaultMilestones };
    }

    const prompt = `Generate a personalized 20-step tech career roadmap as JSON.
Current stage: "${data.currentStage}"
Destination: "${data.destination}"

Return a JSON object with a single key "milestones" that is an array of EXACTLY 20 objects, ordered from foundation to final goal. Each object must have:
- "title": string (short, <= 6 words)
- "description": string (one sentence, actionable)
- "icon": string (choose the best fit from this list: ${ALLOWED_ICONS.join(", ")})
- "xpReward": number (150-1000, increasing toward the end; final step = 1000)
- "estimatedDuration": string (e.g. "1 week", "2 weeks", "3 days", final = "Final goal")

The first 4-5 steps should be foundational and marked done, the middle steps intermediate/advanced, and the last step is landing the destination role.
Respond with ONLY the JSON object.`;

    const raw = await callDeepseek(
      apiKey,
      [
        { role: "system", content: "You are a career-planning assistant that returns strictly valid JSON." },
        { role: "user", content: prompt },
      ],
      { jsonMode: true, temperature: 0.8 },
    );

    let parsed: { milestones?: unknown };
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new Error("Could not parse the generated roadmap. Please try again.");
    }

    const list = Array.isArray(parsed.milestones) ? parsed.milestones : [];
    if (list.length === 0) throw new Error("The AI returned an empty roadmap. Please try again.");

    const milestones: Milestone[] = list.slice(0, 20).map((item, index) => {
      const m = (item ?? {}) as Record<string, unknown>;
      const total = Math.min(list.length, 20);
      const status: Milestone["status"] =
        index < 5 ? "completed" : index === 5 ? "current" : "upcoming";
      const icon = ALLOWED_ICONS.includes(String(m.icon)) ? String(m.icon) : "Circle";
      return {
        id: `ai-m${index + 1}`,
        title: String(m.title ?? `Step ${index + 1}`).slice(0, 80),
        description: String(m.description ?? "").slice(0, 200),
        icon,
        xpReward: Number.isFinite(Number(m.xpReward))
          ? Math.max(150, Math.min(1000, Math.round(Number(m.xpReward))))
          : 200,
        estimatedDuration:
          index === total - 1 ? "Final goal" : String(m.estimatedDuration ?? "1 week").slice(0, 40),
        status,
        progress: status === "current" ? 20 : status === "upcoming" ? 0 : undefined,
      };
    });

    return { milestones };
  });
