// src/data/careerTracks.ts — branching career roadmaps.
// A learner completes a shared foundation, then chooses (or switches) between
// three specialization tracks. This powers the roadmap branching demo.
import type { Milestone } from "./interfaces";

export type TrackId = "cloud" | "data" | "aiml";

export interface CareerTrack {
  id: TrackId;
  name: string;
  tagline: string;
  destination: string;
  icon: string; // lucide icon name
  milestones: Milestone[]; // track-specific milestones (after the shared foundation)
}

// Shared foundation — every track starts here. These are completed for our
// branching learner, who has finished the common groundwork.
export const foundationMilestones: Milestone[] = [
  { id: "f1", title: "Complete AWS re/Start", description: "Finish the AWS re/Start foundational program.", icon: "GraduationCap", xpReward: 200, estimatedDuration: "Done", status: "completed" },
  { id: "f2", title: "Linux Fundamentals", description: "Master core Linux commands and shell scripting.", icon: "Terminal", xpReward: 150, estimatedDuration: "Done", status: "completed" },
  { id: "f3", title: "Networking Basics", description: "Understand TCP/IP, DNS, VPC and subnets.", icon: "Network", xpReward: 150, estimatedDuration: "Done", status: "completed" },
  { id: "f4", title: "Cloud Foundations", description: "Learn core AWS services and the shared model.", icon: "Cloud", xpReward: 200, estimatedDuration: "Done", status: "completed" },
  { id: "f5", title: "Programming with Python", description: "Build a solid Python base for automation and data.", icon: "Code", xpReward: 250, estimatedDuration: "Done", status: "completed" },
];

// Three branches diverging from the shared foundation.
export const careerTracks: CareerTrack[] = [
  {
    id: "cloud",
    name: "Cloud Engineering",
    tagline: "Design and run scalable cloud infrastructure.",
    destination: "Senior Cloud Engineer",
    icon: "Cloud",
    milestones: [
      { id: "cloud-1", title: "AWS Solutions Architect", description: "Pass the Solutions Architect Associate exam.", icon: "BadgeCheck", xpReward: 400, estimatedDuration: "3 weeks", status: "current", progress: 45 },
      { id: "cloud-2", title: "Infrastructure as Code", description: "Provision infra with Terraform and CloudFormation.", icon: "Boxes", xpReward: 300, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
      { id: "cloud-3", title: "CI/CD Pipelines", description: "Automate deployments with GitHub Actions & CodePipeline.", icon: "GitBranch", xpReward: 300, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
      { id: "cloud-4", title: "Containers & Kubernetes", description: "Deploy workloads with Docker, ECS and EKS.", icon: "Container", xpReward: 350, estimatedDuration: "3 weeks", status: "upcoming", progress: 0 },
      { id: "cloud-5", title: "Serverless Architecture", description: "Build event-driven apps with Lambda & API Gateway.", icon: "Zap", xpReward: 300, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
      { id: "cloud-6", title: "Cloud Security", description: "Apply IAM, KMS and security best practices.", icon: "ShieldCheck", xpReward: 350, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
      { id: "cloud-7", title: "Land Cloud Engineer Role", description: "Sign your offer as a Senior Cloud Engineer.", icon: "Rocket", xpReward: 1000, estimatedDuration: "Final goal", status: "upcoming", progress: 0 },
    ],
  },
  {
    id: "data",
    name: "Data Engineering",
    tagline: "Build the pipelines that power analytics & ML.",
    destination: "Senior Data Engineer",
    icon: "Database",
    milestones: [
      { id: "data-1", title: "SQL & Data Modeling", description: "Master advanced SQL, schemas and normalization.", icon: "Database", xpReward: 300, estimatedDuration: "2 weeks", status: "current", progress: 30 },
      { id: "data-2", title: "Python for Data", description: "Wrangle data with Pandas, NumPy and PyArrow.", icon: "Code", xpReward: 300, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
      { id: "data-3", title: "ETL & Data Pipelines", description: "Design robust batch and incremental pipelines.", icon: "GitBranch", xpReward: 350, estimatedDuration: "3 weeks", status: "upcoming", progress: 0 },
      { id: "data-4", title: "Big Data with Spark", description: "Process large datasets with Apache Spark.", icon: "Boxes", xpReward: 400, estimatedDuration: "3 weeks", status: "upcoming", progress: 0 },
      { id: "data-5", title: "Cloud Data Warehousing", description: "Model warehouses in Snowflake & Redshift.", icon: "Cloud", xpReward: 350, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
      { id: "data-6", title: "Orchestration & Streaming", description: "Schedule with Airflow and stream with Kafka.", icon: "Activity", xpReward: 400, estimatedDuration: "3 weeks", status: "upcoming", progress: 0 },
      { id: "data-7", title: "Land Data Engineer Role", description: "Sign your offer as a Senior Data Engineer.", icon: "Rocket", xpReward: 1000, estimatedDuration: "Final goal", status: "upcoming", progress: 0 },
    ],
  },
  {
    id: "aiml",
    name: "AI / ML Engineering",
    tagline: "Ship intelligent, ML-powered products.",
    destination: "Senior AI/ML Engineer",
    icon: "Brain",
    milestones: [
      { id: "aiml-1", title: "Math & Stats for ML", description: "Linear algebra, probability and statistics.", icon: "Brain", xpReward: 300, estimatedDuration: "2 weeks", status: "current", progress: 25 },
      { id: "aiml-2", title: "Python ML Stack", description: "Model with scikit-learn, Pandas and NumPy.", icon: "Code", xpReward: 300, estimatedDuration: "2 weeks", status: "upcoming", progress: 0 },
      { id: "aiml-3", title: "Deep Learning", description: "Build neural nets with PyTorch & TensorFlow.", icon: "Cpu", xpReward: 400, estimatedDuration: "4 weeks", status: "upcoming", progress: 0 },
      { id: "aiml-4", title: "MLOps & Deployment", description: "Serve, monitor and version models in production.", icon: "Boxes", xpReward: 400, estimatedDuration: "3 weeks", status: "upcoming", progress: 0 },
      { id: "aiml-5", title: "LLMs & RAG Systems", description: "Build retrieval-augmented generation pipelines.", icon: "Server", xpReward: 400, estimatedDuration: "3 weeks", status: "upcoming", progress: 0 },
      { id: "aiml-6", title: "Generative AI Apps", description: "Ship production GenAI features and agents.", icon: "Sparkles", xpReward: 400, estimatedDuration: "3 weeks", status: "upcoming", progress: 0 },
      { id: "aiml-7", title: "Land AI/ML Engineer Role", description: "Sign your offer as a Senior AI/ML Engineer.", icon: "Rocket", xpReward: 1000, estimatedDuration: "Final goal", status: "upcoming", progress: 0 },
    ],
  },
];

// The branching learner's original path before switching.
export const originalTrackId: TrackId = "cloud";

export function getTrack(id: TrackId): CareerTrack {
  return careerTracks.find((t) => t.id === id) ?? careerTracks[0];
}
