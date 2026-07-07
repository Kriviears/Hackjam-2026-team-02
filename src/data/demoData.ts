// src/data/demoData.ts — extended, demo-ready mock dataset for PerX enterprise features.

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar: string;
  uploadDate: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  likes: number;
  bookmarks: number;
  status: "approved" | "pending";
}

export interface Discussion {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  postedAgo: string;
  upvotes: number;
  comments: number;
  tags: string[];
  pinned?: boolean;
}

export interface Job {
  id: string;
  role: string;
  company: string;
  logoColor: string;
  location: string;
  type: "Remote" | "Hybrid" | "On-site";
  experience: string;
  salary: string;
  skills: string[];
  postedAgo: string;
  match: number;
}

export interface PerxEvent {
  id: string;
  title: string;
  category: string;
  date: string; // ISO
  time: string;
  location: string;
  organizer: string;
  description: string;
  color: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  story: string;
  from: string;
  to: string;
  company: string;
  likes: number;
  comments: number;
  featured?: boolean;
  badges: string[];
}

export interface Notification {
  id: string;
  type: "message" | "job" | "event" | "resource" | "badge" | "discussion" | "interview" | "milestone";
  icon: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: "learner" | "mentor" | "admin";
  status: "active" | "pending" | "suspended";
  joined: string;
  lastActive: string;
  avatar: string;
}

export interface AIRoadmap {
  id: string;
  title: string;
  icon: string;
  category: string;
  duration: string;
  milestones: number;
  certifications: string[];
  summary: string;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const resourceCategories = [
  "AWS", "Azure", "Google Cloud", "DevOps", "Kubernetes", "Docker", "Linux",
  "Python", "Java", "SQL", "Gen AI", "Machine Learning", "Deep Learning",
  "RAG", "AI Agents", "Prompt Engineering", "Forward Deployment Engineer",
  "Data Engineering", "Cybersecurity", "Networking", "Interview Prep",
  "Resume Tips", "System Design", "Behavioral Interviews", "Soft Skills",
  "Career Growth",
];

export const communityCategories = [
  "Question & Answer", "Success Stories", "Project Showcase", "Career Advice",
  "Interview Experiences", "Cloud", "AI", "Data", "Cyber", "DevOps",
  "Programming", "General Discussion",
];

export const eventCategories = [
  "AWS Events", "Azure Events", "Google Cloud Events", "PerX Cohorts",
  "Career Fairs", "Hackathons", "Meetups", "Tech Conferences",
  "AI Conferences", "Webinars", "Resume Workshops", "Interview Workshops",
  "Networking Sessions", "Mock Interview Days",
];

// ---------------------------------------------------------------------------
// Generators (to reach demo volume cheaply)
// ---------------------------------------------------------------------------
const authors = [
  { n: "Priya Sharma", a: "https://i.pravatar.cc/150?img=47" },
  { n: "Marcus Reed", a: "https://i.pravatar.cc/150?img=12" },
  { n: "Elena Rossi", a: "https://i.pravatar.cc/150?img=32" },
  { n: "David Kim", a: "https://i.pravatar.cc/150?img=15" },
  { n: "Amara Okafor", a: "https://i.pravatar.cc/150?img=45" },
  { n: "Tom Andersson", a: "https://i.pravatar.cc/150?img=51" },
  { n: "Sofia Nguyen", a: "https://i.pravatar.cc/150?img=44" },
  { n: "Liam Carter", a: "https://i.pravatar.cc/150?img=33" },
];
const pick = <T,>(arr: T[], i: number): T => arr[i % arr.length];
const rand = (seed: number, min: number, max: number) =>
  min + Math.floor(((Math.sin(seed) + 1) / 2) * (max - min));
const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;

const resourceTitles: Record<string, string[]> = {
  default: ["Complete Guide", "Hands-on Deep Dive", "Cheat Sheet", "Best Practices", "From Zero to Hero", "Interview Crash Course"],
};

export const resources: Resource[] = Array.from({ length: 156 }, (_, i) => {
  const cat = pick(resourceCategories, i);
  const titleKind = pick(resourceTitles.default, i);
  const author = pick(authors, i);
  return {
    id: `r${i + 1}`,
    title: `${cat}: ${titleKind}`,
    description: `A practical, curated ${cat} resource covering core concepts, real-world examples, and job-ready skills for the PerX community.`,
    category: cat,
    tags: [cat, pick(["2026", "Hands-on", "Certification", "Project", "Guide"], i)],
    author: author.n,
    authorAvatar: author.a,
    uploadDate: `${rand(i + 1, 1, 28)} ${pick(["Jan", "Feb", "Mar", "Apr", "May", "Jun"], i)} 2026`,
    difficulty: pick(difficulties as unknown as string[], i) as Resource["difficulty"],
    readTime: `${rand(i + 3, 5, 40)} min`,
    likes: rand(i + 7, 8, 640),
    bookmarks: rand(i + 11, 2, 210),
    status: i % 9 === 0 ? "pending" : "approved",
  };
});

const discussionTitles = [
  "How do I become a Forward Deployment Engineer?",
  "Passed my SAA-C03 today — AMA!",
  "Is Kubernetes worth learning before GenAI?",
  "Show off: my serverless RAG chatbot",
  "Best way to explain trade-offs in system design interviews?",
  "Landed a role at AWS after PerX — my exact timeline",
  "RAG vs fine-tuning: when to use which?",
  "How many projects do recruiters actually want?",
  "Behavioral interview STAR templates that worked",
  "Terraform vs Pulumi in 2026?",
  "Breaking into cybersecurity from a non-tech background",
  "My 6-month AI Engineering study plan (feedback welcome)",
];

export const discussions: Discussion[] = Array.from({ length: 78 }, (_, i) => {
  const author = pick(authors, i + 2);
  return {
    id: `d${i + 1}`,
    title: pick(discussionTitles, i),
    excerpt: "Sharing what worked for me and where I got stuck — would love the community's take on the next steps and resources.",
    category: pick(communityCategories, i),
    author: author.n,
    authorAvatar: author.a,
    postedAgo: `${rand(i + 1, 1, 23)}h ago`,
    upvotes: rand(i + 5, 3, 480),
    comments: rand(i + 9, 0, 96),
    tags: [pick(communityCategories, i), pick(["help", "guide", "win", "discussion"], i)],
    pinned: i < 2,
  };
});

const companies = [
  { n: "Amazon", c: "#FF9900" }, { n: "Microsoft", c: "#00A4EF" },
  { n: "Google", c: "#4285F4" }, { n: "AWS", c: "#232F3E" },
  { n: "Accenture", c: "#A100FF" }, { n: "Deloitte", c: "#86BC25" },
  { n: "IBM", c: "#1F70C1" }, { n: "Oracle", c: "#F80000" },
  { n: "Salesforce", c: "#00A1E0" }, { n: "Infosys", c: "#007CC3" },
  { n: "Capgemini", c: "#0070AD" }, { n: "TCS", c: "#EE3124" },
  { n: "Wipro", c: "#341E6E" }, { n: "Cognizant", c: "#1A4CA1" },
  { n: "Mphasis", c: "#E4002B" }, { n: "PerX Partner", c: "#2563EB" },
];
const jobRoles = [
  "Cloud Solutions Architect", "DevOps Engineer", "AI Engineer",
  "Machine Learning Engineer", "Site Reliability Engineer", "Data Engineer",
  "Cybersecurity Analyst", "Forward Deployment Engineer", "Platform Engineer",
  "Kubernetes Administrator", "GenAI Developer", "Solutions Engineer",
];
const jobSkills = ["AWS", "Terraform", "Kubernetes", "Python", "LLMs", "RAG", "Docker", "CI/CD", "Azure", "GCP"];

export const jobs: Job[] = Array.from({ length: 54 }, (_, i) => {
  const company = pick(companies, i);
  return {
    id: `j${i + 1}`,
    role: pick(jobRoles, i),
    company: company.n,
    logoColor: company.c,
    location: pick(["New York, NY", "Remote", "Seattle, WA", "Austin, TX", "Bengaluru, IN", "London, UK", "Toronto, CA"], i),
    type: pick(["Remote", "Hybrid", "On-site"] as string[], i) as Job["type"],
    experience: pick(["Entry", "1-3 yrs", "3-5 yrs", "5+ yrs"], i),
    salary: `$${rand(i + 1, 85, 180)}k - $${rand(i + 40, 190, 260)}k`,
    skills: [pick(jobSkills, i), pick(jobSkills, i + 3), pick(jobSkills, i + 6)],
    postedAgo: `${rand(i + 2, 1, 20)}d ago`,
    match: rand(i + 3, 62, 98),
  };
});

export const perxEvents: PerxEvent[] = Array.from({ length: 62 }, (_, i) => {
  const day = rand(i + 1, 1, 27);
  const month = (i % 3) + 6; // Jul-Sep 2026
  return {
    id: `e${i + 1}`,
    title: `${pick(eventCategories, i)} ${rand(i, 2026, 2027)}`,
    category: pick(eventCategories, i),
    date: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    time: `${rand(i + 1, 9, 17)}:00`,
    location: pick(["Virtual", "New York", "San Francisco", "London", "Bengaluru", "Remote"], i),
    organizer: pick(["AWS", "PerX", "Azure", "Google Cloud", "Community"], i),
    description: "Join industry experts and the PerX community for hands-on learning, networking, and career-boosting sessions.",
    color: pick(["#2563EB", "#7C3AED", "#0EA5E9", "#F59E0B", "#10B981", "#EF4444"], i),
  };
});

export const successStories: SuccessStory[] = Array.from({ length: 32 }, (_, i) => {
  const author = pick(authors, i);
  const company = pick(companies, i);
  return {
    id: `s${i + 1}`,
    name: author.n,
    avatar: author.a,
    headline: `From ${pick(["retail", "teaching", "support", "sales", "military"], i)} to ${pick(jobRoles, i)}`,
    story: "PerX gave me the roadmap, mentorship, and community I needed. Six months of focused learning, real projects, and mock interviews turned into a life-changing offer.",
    from: pick(["Career switcher", "New grad", "Bootcamp grad", "Self-taught"], i),
    to: pick(jobRoles, i),
    company: company.n,
    likes: rand(i + 4, 20, 540),
    comments: rand(i + 8, 2, 88),
    featured: i < 3,
    badges: [pick(["Certified", "IaC Master", "Interview Ace", "Career Champion"], i)],
  };
});

export const notifications: Notification[] = [
  { id: "n1", type: "message", icon: "MessageCircle", title: "New mentor message", body: "Priya Sharma replied to your roadmap question.", time: "2m ago", read: false },
  { id: "n2", type: "job", icon: "Briefcase", title: "Job recommendation", body: "New 94% match: Cloud Solutions Architect at AWS.", time: "1h ago", read: false },
  { id: "n3", type: "event", icon: "CalendarDays", title: "Upcoming event", body: "AWS Community Day starts in 2 days.", time: "3h ago", read: false },
  { id: "n4", type: "resource", icon: "Library", title: "New resource", body: "\"RAG: Complete Guide\" was added to your saved category.", time: "5h ago", read: true },
  { id: "n5", type: "badge", icon: "Award", title: "Badge unlocked", body: "You earned the Streak Master badge! 🔥", time: "1d ago", read: true },
  { id: "n6", type: "discussion", icon: "MessagesSquare", title: "Discussion reply", body: "3 new replies on your Kubernetes question.", time: "1d ago", read: true },
  { id: "n7", type: "interview", icon: "CalendarClock", title: "Upcoming interview", body: "Mock interview with David Kim tomorrow at 3 PM.", time: "1d ago", read: false },
  { id: "n8", type: "milestone", icon: "Flag", title: "Milestone complete", body: "You completed 'Cloud Foundations'. +200 XP!", time: "2d ago", read: true },
];

const firstNames = ["Alex", "Sam", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Jamie", "Avery", "Quinn", "Noah", "Maya", "Leo", "Zara", "Ivan"];
const lastNames = ["Rivera", "Chen", "Patel", "Khan", "Nguyen", "Silva", "Brown", "Kumar", "Lopez", "Wang", "Ahmed", "Garcia"];

export const platformUsers: PlatformUser[] = Array.from({ length: 312 }, (_, i) => {
  const fn = pick(firstNames, i);
  const ln = pick(lastNames, i + 3);
  const role = i % 11 === 0 ? "admin" : i % 4 === 0 ? "mentor" : "learner";
  return {
    id: `u${i + 1}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@perx.ai`,
    role: role as PlatformUser["role"],
    status: (i % 13 === 0 ? "pending" : i % 29 === 0 ? "suspended" : "active") as PlatformUser["status"],
    joined: `${rand(i + 1, 1, 28)} ${pick(["Jan", "Feb", "Mar", "Apr"], i)} 2026`,
    lastActive: pick(["2m ago", "1h ago", "Today", "Yesterday", "3d ago"], i),
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  };
});

export const aiRoadmaps: AIRoadmap[] = [
  { id: "ai1", title: "Generative AI Engineer", icon: "Sparkles", category: "AI", duration: "6 months", milestones: 14, certifications: ["AWS ML Specialty", "Azure AI Engineer"], summary: "Master LLMs, RAG, and production AI systems end-to-end." },
  { id: "ai2", title: "AI Engineering", icon: "BrainCircuit", category: "AI", duration: "7 months", milestones: 16, certifications: ["Deep Learning Specialization"], summary: "From ML foundations to deploying scalable inference." },
  { id: "ai3", title: "Machine Learning", icon: "Bot", category: "AI", duration: "5 months", milestones: 12, certifications: ["TensorFlow Developer"], summary: "Supervised, unsupervised, and MLOps fundamentals." },
  { id: "ai4", title: "Deep Learning", icon: "Layers", category: "AI", duration: "5 months", milestones: 11, certifications: ["Deep Learning Specialization"], summary: "Neural networks, CNNs, transformers and beyond." },
  { id: "ai5", title: "LLMs & Prompt Engineering", icon: "MessageSquareCode", category: "AI", duration: "3 months", milestones: 8, certifications: [], summary: "Prompting, evaluation, and building on OpenAI/Claude/Gemini." },
  { id: "ai6", title: "AI Agents & RAG", icon: "Workflow", category: "AI", duration: "4 months", milestones: 10, certifications: [], summary: "Vector DBs, LangChain, LangGraph, MCP and agentic systems." },
  { id: "ai7", title: "Forward Deployment Engineer", icon: "Rocket", category: "AI", duration: "6 months", milestones: 13, certifications: ["AWS Solutions Architect"], summary: "Customer-facing AI delivery: integrate, deploy, and iterate." },
  { id: "ai8", title: "AWS Bedrock & Azure OpenAI", icon: "Cloud", category: "Cloud AI", duration: "3 months", milestones: 9, certifications: ["AWS ML Specialty"], summary: "Managed foundation models on AWS, Azure and Vertex AI." },
  { id: "ai9", title: "MLOps & LLMOps", icon: "Settings2", category: "Ops", duration: "4 months", milestones: 10, certifications: [], summary: "CI/CD for models, monitoring, and responsible AI." },
  { id: "ai10", title: "Data Engineering", icon: "Database", category: "Data", duration: "6 months", milestones: 14, certifications: ["AWS Data Analytics"], summary: "Pipelines, warehousing, and streaming at scale." },
  { id: "ai11", title: "Cloud Engineering", icon: "CloudCog", category: "Cloud", duration: "6 months", milestones: 15, certifications: ["AWS SAA", "Terraform Associate"], summary: "Compute, networking, IaC and multi-cloud design." },
  { id: "ai12", title: "Cybersecurity", icon: "ShieldCheck", category: "Security", duration: "7 months", milestones: 16, certifications: ["Security+", "AWS Security"], summary: "Threat modeling, zero trust, and cloud security." },
  { id: "ai13", title: "DevOps & Platform Engineering", icon: "Infinity", category: "DevOps", duration: "6 months", milestones: 14, certifications: ["CKA", "Terraform Associate"], summary: "Kubernetes, GitOps, and internal developer platforms." },
  { id: "ai14", title: "Solutions Architecture", icon: "Building2", category: "Cloud", duration: "8 months", milestones: 18, certifications: ["AWS SAP"], summary: "Enterprise-scale, well-architected system design." },
];

// Enhanced AI Navigator conversations for the expanded chatbot.
export const extraAIConversations: { prompt: string; response: string }[] = [
  {
    prompt: "How do I become a Forward Deployment Engineer?",
    response:
      "A **Forward Deployment Engineer (FDE)** blends engineering with customer delivery:\n\n- **Core:** Strong Python + cloud (AWS/Azure) + APIs.\n- **AI layer:** LLMs, RAG, and integrating models into real products.\n- **Soft skills:** Translating customer problems into shipped solutions.\n\nStart with the FDE roadmap in the AI Learning Center — 6 months, 13 milestones. 🚀",
  },
  {
    prompt: "Create a roadmap for AI Engineering",
    response:
      "Here's a condensed **AI Engineering** path:\n\n- **Months 1-2:** Python, math foundations, ML basics.\n- **Months 3-4:** Deep learning, transformers, LLMs.\n- **Months 5-6:** RAG, agents, deployment & MLOps.\n\nPair it with the **Deep Learning Specialization** and 3 portfolio projects. Open the full roadmap in the Learning Center! 🎯",
  },
  {
    prompt: "Compare AWS Bedrock vs Azure OpenAI",
    response:
      "**AWS Bedrock**: model choice (Anthropic, Meta, Amazon), tight AWS integration, good for multi-model apps.\n\n**Azure OpenAI**: first-class GPT models, enterprise compliance, deep Microsoft ecosystem fit.\n\nChoose based on your **existing cloud** and whether you need model variety (Bedrock) or the latest OpenAI models (Azure). ⚖️",
  },
  {
    prompt: "Explain RAG simply",
    response:
      "**RAG = Retrieval-Augmented Generation.**\n\n- **Retrieve:** Search your documents for relevant chunks (via a vector database).\n- **Augment:** Add those chunks to the prompt.\n- **Generate:** The LLM answers using that fresh context.\n\nIt keeps answers accurate and grounded without retraining the model. 📚",
  },
  {
    prompt: "Generate a 6-month AI learning plan",
    response:
      "**6-Month AI Plan:**\n\n- **M1:** Python + data handling.\n- **M2:** ML fundamentals.\n- **M3:** Deep learning + transformers.\n- **M4:** LLMs + prompt engineering.\n- **M5:** RAG + agents (LangChain/LangGraph).\n- **M6:** Deploy + MLOps + capstone project.\n\nBook a mentor to review your capstone at month 6! 🌟",
  },
];
