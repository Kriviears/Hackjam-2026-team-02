// src/data/mockData.ts — authoritative mock dataset for PerX.
import type {
  AIConversation,
  Badge,
  DailyChallenge,
  Mentor,
  Milestone,
  Quest,
  UserStats,
} from "./interfaces";

export const userStats: UserStats = {
  name: "Alex",
  currentStage: "AWS re/Start Graduate",
  destination: "Senior Cloud Solutions Architect",
  level: 8,
  levelTitle: "Cloud Explorer",
  xp: 4820,
  xpToNextLevel: 6000,
  readiness: 72,
  skillsCount: 38,
  certifications: 3,
  projects: 12,
  mentorSessions: 9,
  applications: 41,
  interviewSuccess: 67,
};

// Level titles used when the user levels up.
export const levelTitles: Record<number, string> = {
  8: "Cloud Explorer",
  9: "Cloud Navigator",
  10: "Cloud Architect",
  11: "Cloud Strategist",
  12: "Cloud Visionary",
};

// 20 milestones: Foundation -> Intermediate -> Advanced -> Final Goal
export const milestones: Milestone[] = [
  { id: "m1", title: "Complete AWS re/Start", description: "Finish the AWS re/Start foundational program.", icon: "GraduationCap", xpReward: 200, estimatedDuration: "Done", status: "completed" },
  { id: "m2", title: "Linux Fundamentals", description: "Master core Linux commands and shell scripting.", icon: "Terminal", xpReward: 150, estimatedDuration: "1 week", status: "completed" },
  { id: "m3", title: "Networking Basics", description: "Understand TCP/IP, DNS, VPC and subnets.", icon: "Network", xpReward: 150, estimatedDuration: "1 week", status: "completed" },
  { id: "m4", title: "Cloud Foundations", description: "Learn core AWS services and the shared model.", icon: "Cloud", xpReward: 200, estimatedDuration: "2 weeks", status: "completed" },
  { id: "m5", title: "AWS Cloud Practitioner", description: "Earn the CLF-C02 certification.", icon: "Award", xpReward: 300, estimatedDuration: "Done", status: "completed" },
  { id: "m6", title: "Complete AWS Certification", description: "Pass the Solutions Architect Associate exam.", icon: "BadgeCheck", xpReward: 400, estimatedDuration: "3 weeks", status: "current", progress: 55 },
  { id: "m7", title: "Build Portfolio", description: "Publish 3 cloud projects to a portfolio site.", icon: "FolderGit2", xpReward: 250, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
  { id: "m8", title: "Infrastructure as Code", description: "Provision infra with Terraform and CloudFormation.", icon: "Boxes", xpReward: 300, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
  { id: "m9", title: "CI/CD Pipelines", description: "Automate deployments with GitHub Actions & CodePipeline.", icon: "GitBranch", xpReward: 300, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
  { id: "m10", title: "Containers & Kubernetes", description: "Deploy workloads with Docker, ECS and EKS.", icon: "Container", xpReward: 350, estimatedDuration: "3 weeks", status: "upcoming", progress: 0 },
  { id: "m11", title: "Serverless Architecture", description: "Build event-driven apps with Lambda & API Gateway.", icon: "Zap", xpReward: 300, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
  { id: "m12", title: "Cloud Security", description: "Apply IAM, KMS and security best practices.", icon: "ShieldCheck", xpReward: 350, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
  { id: "m13", title: "Monitoring & Observability", description: "Instrument systems with CloudWatch & X-Ray.", icon: "Activity", xpReward: 250, estimatedDuration: "1 week", status: "upcoming", progress: 0 },
  { id: "m14", title: "Cost Optimization", description: "Design cost-efficient, well-architected systems.", icon: "PiggyBank", xpReward: 250, estimatedDuration: "1 week", status: "upcoming", progress: 0 },
  { id: "m15", title: "Solutions Architect Pro", description: "Earn the SAP-C02 professional certification.", icon: "Trophy", xpReward: 500, estimatedDuration: "4 weeks", status: "upcoming", progress: 0 },
  { id: "m16", title: "Mock Interview", description: "Complete 5 technical mock interviews.", icon: "MessagesSquare", xpReward: 200, estimatedDuration: "1 week", status: "upcoming", progress: 0 },
  { id: "m17", title: "Resume Review", description: "Polish your resume with mentor feedback.", icon: "FileText", xpReward: 150, estimatedDuration: "3 days", status: "upcoming", progress: 0 },
  { id: "m18", title: "LinkedIn Optimization", description: "Optimize your profile for recruiters.", icon: "Linkedin", xpReward: 150, estimatedDuration: "2 days", status: "upcoming", progress: 0 },
  { id: "m19", title: "Networking Event", description: "Attend 3 cloud community meetups.", icon: "Users", xpReward: 200, estimatedDuration: "Ongoing", status: "upcoming", progress: 0 },
  { id: "m20", title: "Land Senior Cloud Engineer Role", description: "Sign your offer as a Senior Cloud Solutions Architect.", icon: "Rocket", xpReward: 1000, estimatedDuration: "Final goal", status: "upcoming", progress: 0 },
];

// 8 quests
export const quests: Quest[] = [
  { id: "q1", title: "Cloud & Cyber Showdown", difficulty: "Medium", xp: 150, reward: "Cyber Sentinel Badge", timeEstimate: "45 min", completion: 60 },
  { id: "q2", title: "AWS Escape Room", difficulty: "Hard", xp: 250, reward: "Escape Artist Badge", timeEstimate: "60 min", completion: 20 },
  { id: "q3", title: "Terraform Builder Challenge", difficulty: "Hard", xp: 220, reward: "IaC Master Badge", timeEstimate: "50 min", completion: 35 },
  { id: "q4", title: "Python Coding Sprint", difficulty: "Medium", xp: 160, reward: "Code Sprinter Badge", timeEstimate: "40 min", completion: 80 },
  { id: "q5", title: "Linux Command Master", difficulty: "Easy", xp: 100, reward: "Shell Ninja Badge", timeEstimate: "30 min", completion: 100 },
  { id: "q6", title: "Networking Deep Dive", difficulty: "Medium", xp: 170, reward: "Packet Pro Badge", timeEstimate: "45 min", completion: 10 },
  { id: "q7", title: "Serverless Speedrun", difficulty: "Hard", xp: 240, reward: "Lambda Legend Badge", timeEstimate: "55 min", completion: 0 },
  { id: "q8", title: "Docker Dungeon", difficulty: "Easy", xp: 120, reward: "Container Captain Badge", timeEstimate: "35 min", completion: 45 },
];

// 6 mentors (pravatar photos only)
export const mentors: Mentor[] = [
  { id: "me1", name: "Priya Sharma", role: "Principal Cloud Architect", company: "Amazon Web Services", expertise: ["Solutions Architecture", "Serverless", "Cost Optimization"], years: 12, rating: 4.9, available: true, photoUrl: "https://i.pravatar.cc/150?img=47" },
  { id: "me2", name: "Marcus Reed", role: "Staff DevOps Engineer", company: "Netflix", expertise: ["Kubernetes", "CI/CD", "Terraform"], years: 10, rating: 4.8, available: true, photoUrl: "https://i.pravatar.cc/150?img=12" },
  { id: "me3", name: "Elena Rossi", role: "Cloud Security Lead", company: "Cloudflare", expertise: ["IAM", "Zero Trust", "Compliance"], years: 9, rating: 4.7, available: false, photoUrl: "https://i.pravatar.cc/150?img=32" },
  { id: "me4", name: "David Kim", role: "Senior SRE", company: "Google Cloud", expertise: ["Observability", "Reliability", "Networking"], years: 11, rating: 4.9, available: true, photoUrl: "https://i.pravatar.cc/150?img=15" },
  { id: "me5", name: "Amara Okafor", role: "Data Platform Architect", company: "Snowflake", expertise: ["Data Engineering", "Analytics", "AWS"], years: 8, rating: 4.6, available: true, photoUrl: "https://i.pravatar.cc/150?img=45" },
  { id: "me6", name: "Tom Andersson", role: "Engineering Manager", company: "HashiCorp", expertise: ["Leadership", "Terraform", "Career Growth"], years: 14, rating: 4.8, available: false, photoUrl: "https://i.pravatar.cc/150?img=51" },
];

// 10 badges (live only on Achievements)
export const badges: Badge[] = [
  { id: "b1", name: "First Steps", icon: "Footprints", description: "Completed your very first milestone on the PerX journey.", unlocked: true, earnedDate: "Jan 12, 2026" },
  { id: "b2", name: "Certified", icon: "Award", description: "Earned your first industry certification.", unlocked: true, earnedDate: "Feb 03, 2026" },
  { id: "b3", name: "Shell Ninja", icon: "Terminal", description: "Mastered the Linux command line quest.", unlocked: true, earnedDate: "Feb 20, 2026" },
  { id: "b4", name: "Streak Master", icon: "Flame", description: "Maintained a 7-day learning streak.", unlocked: true, earnedDate: "Mar 01, 2026" },
  { id: "b5", name: "Team Player", icon: "Users", description: "Attended your first networking event.", unlocked: true, earnedDate: "Mar 15, 2026" },
  { id: "b6", name: "IaC Master", icon: "Boxes", description: "Provisioned infrastructure with Terraform.", unlocked: false },
  { id: "b7", name: "Lambda Legend", icon: "Zap", description: "Shipped a production serverless application.", unlocked: false },
  { id: "b8", name: "Container Captain", icon: "Container", description: "Deployed a containerized workload to Kubernetes.", unlocked: false },
  { id: "b9", name: "Interview Ace", icon: "MessagesSquare", description: "Passed 5 technical mock interviews.", unlocked: false },
  { id: "b10", name: "Career Champion", icon: "Trophy", description: "Landed your dream senior cloud role.", unlocked: false },
];

// 5 AI conversations (markdown responses)
export const aiConversations: AIConversation[] = [
  {
    prompt: "How do I transition into AWS?",
    response:
      "Great goal, Alex! You're already ahead as an **AWS re/Start graduate**. Here's your path:\n\n- **Certify:** Target the **Solutions Architect Associate** next.\n- **Build:** Ship 2–3 real projects (a serverless API, an IaC deployment).\n- **Network:** Join AWS community meetups and post your builds.\n\nYou've got real momentum — keep going! 🚀",
  },
  {
    prompt: "Help me prep for an AWS interview",
    response:
      "Absolutely — let's get you interview-ready:\n\n- **Core concepts:** VPC, IAM, S3, EC2, Lambda, the Well-Architected Framework.\n- **Scenario design:** Practice designing a **highly available 3-tier app**.\n- **Behavioral:** Prepare STAR stories around your projects.\n\nTip: explain your reasoning out loud. Interviewers reward clear trade-off thinking. You've got this! 💪",
  },
  {
    prompt: "Terraform vs Kubernetes — which first?",
    response:
      "Both are valuable, but sequence matters:\n\n- **Terraform first:** It's your **provisioning** layer — infrastructure as code across any cloud.\n- **Kubernetes next:** It's your **orchestration** layer — running containers at scale.\n\nLearn Terraform to stand up infrastructure, then Kubernetes to run workloads on it. That order compounds nicely for a Solutions Architect. 🎯",
  },
  {
    prompt: "What does it take to become a Solutions Architect?",
    response:
      "You're aiming for **Senior Cloud Solutions Architect** — excellent target! Focus on:\n\n- **Breadth:** compute, storage, networking, security, databases.\n- **Design skill:** trade-offs between cost, performance, and resilience.\n- **Communication:** translating business needs into architecture.\n\nPair the **SAA → SAP** certifications with real designs and you'll be there. 🌟",
  },
  {
    prompt: "What projects should I build for my portfolio?",
    response:
      "Build projects that prove real skills:\n\n- **Serverless URL shortener** (Lambda + DynamoDB + API Gateway).\n- **IaC-deployed 3-tier web app** (Terraform + VPC + RDS).\n- **CI/CD pipeline** that auto-deploys on every push.\n\nDocument each with an architecture diagram and a short write-up. Recruiters love clarity! ✨",
  },
];

// 4 daily challenges
export const dailyChallenges: DailyChallenge[] = [
  { id: "d1", text: "Complete 1 AWS practice exam question set", done: false },
  { id: "d2", text: "Write today's learning notes", done: false },
  { id: "d3", text: "Review 5 flashcards on IAM policies", done: false },
  { id: "d4", text: "Commit one change to your portfolio repo", done: false },
];
