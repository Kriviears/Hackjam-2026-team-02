# 🚀 PerX — Gamified Cloud Career Gateway

PerX is an interactive, full-stack tech futures platform designed for **Per Scholas** learners, alumni, and aspiring tech professionals. It acts as an immersive digital gateway that demystifies the path from graduate to high-earning, specialized cloud professionals.

---

## 🧭 The Problem & The PerX Solution
Transitioning from standard technical certifications (such as AWS re/Start) into high-paying cloud roles (such as Solutions Architecture, DevOps, and Platform Engineering) can be highly intimidating. Traditional career guides are static and passive.

**PerX transforms career exploration into a gamified, AI-guided RPG (Role-Playing Game):**
* **Visualize the End Goal**: Instead of searching text logs, explore stylized, interactive career tracks.
* **Earn XP and Level Up**: Track milestones, complete quests, and unlock career achievement badges.
* **Gain Real-Time Mentorship**: Converse with a persistent, intelligent AI career coach or book top-tier local industry mentors.

---

## ⚡ Core Feature Showcases

### 1. 💬 AI Career Navigator (DeepSeek Live Chat)
Integrated directly in your dashboard workspace, the floating navigator provides live, context-aware mentoring.
* **Live API Mode**: Securely speaks directly to the **DeepSeek Chat API** via high-performance TanStack Start backend RPC server functions.
* **Robust Graceful Fallback (Demo Mode)**: If no API key is set in the hosting environment (such as on Vercel), the navigator automatically matches standard prompts (like *"Compare AWS Bedrock vs Azure OpenAI"* or *"Explain RAG simply"*) and responds instantly with static answers, maintaining uninterrupted usability for presenters and judges.

### 2. 🌿 Dynamic 20-Step Career Roadmaps
Select any target cloud specialization and instantly generate or load a curated 20-step roadmap. Steps are structured logically from Foundation (marked completed to celebrate prior training), through Intermediate (IaC, containerization, pipelines), and final placement stages.

### 3. 🛡️ Role-Based Access Control (RBAC) Console
A fully interactive administrative simulation panel allowing you to test permissions by switching between three distinct simulated user roles:
* **Learner** (Alex Rivera)
* **Mentor** (Priya Sharma)
* **Admin** (Jordan Blake)
The system automatically rewrites layout sidebars and locks or exposes dashboard features based on active role permissions.

### 4. 🎯 Quest Engine, Achievements, & Badges
Track your daily learning progress, participate in simulated scenario quests, and unlock cryptographically ready career achievement badges as you progress toward your target role.

---

## 🛠️ Unified Tech Stack

PerX was custom-engineered to meet and exceed modern web development and performance standards:

* **Frontend**: React 19 (Stable), Vite, Tailwind CSS v4, Framer Motion v11, Radix UI.
* **Backend**: TanStack Start (Router + Server Actions SSR), Node Nitro Engine.
* **APIs**: DeepSeek Chat Completion API.

---

## 🚀 Getting Started & Local Setup

Running the PerX application locally takes less than two minutes:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file at the root level of your project and add your private DeepSeek API credentials:
```env
DEEPSEEK_API_KEY=your_private_api_key_here
```
*(A `.env.example` file is included in the project as a helper template).*

### 3. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:8080`** in your browser to experience PerX!

---

## 📂 Deliverables & Submission References
To verify compliance with all Hack Jam 2026 guidelines, our official documentation and code structures are organized as follows:

* **📁 `docs/`**: Official submission folder.
  * **📄 [docs/overview.md](docs/overview.md)**: Deep-dive Technical Design and architectural flowcharts.
  * **📄 [docs/roadmap.md](docs/roadmap.md)**: Long-term strategic future vision, product stages, and scaling plans.
* **🔐 Local Security**: `.gitignore` is pre-configured to strictly exclude all local `.env` and credential files to secure private cloud assets.

---

## 🏅 Resource Credits & Attributions
* **Framework**: [TanStack Start](https://tanstack.com/start)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Aesthetics**: Custom Glassmorphism engineered with [Tailwind CSS v4](https://tailwindcss.com/)
* **AI Model**: [DeepSeek API](https://api.deepseek.com) / [Llama 3.3](https://groq.com)
