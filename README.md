# Mentor — AI Coding Mentor That Teaches You to Think

> **"Think first. Code smarter. Learn for real."**  
> Mentor is an interactive AI-powered learning environment designed on proven cognitive learning science. Unlike traditional AI coding tools that write solutions for you, Mentor acts as an expert Socratic tutor that builds deep mental models through active prediction, progressive hint scaffolding, and Feynman comprehension checks.

---

## 🌟 Core Pedagogical Architecture

### 1. Predict-Before-Run Engine
- Before code executes in the sandboxed runtime, learners are prompted with targeted multiple-choice hypotheses about execution flow, closure behavior, and edge cases.
- **Why it works**: Forming an advance prediction activates prior knowledge, primes the brain for corrective feedback, and increases concept retention by up to 40%.

### 2. Server-Enforced Progressive Hint Ladder
- A strictly guarded 4-tier hint progression:
  1. **Tier 1 (Guiding Question)**: Directs attention to the execution path or unhandled event.
  2. **Tier 2 (Concept Nudge)**: Highlights the underlying principle (e.g. React state immutability, reference equality).
  3. **Tier 3 (Code Skeleton)**: Architectural structure with informative TODO comments.
  4. **Tier 4 (Concrete Example)**: Focused implementation snippet illustrating correct syntax.
- **Security & Integrity**: The server validates the learner's session hint level, strictly preventing jumping straight to full solutions.

### 3. Feynman "Explain-Back" Assessment
- Deep comprehension is evaluated by asking learners to articulate *why* their code works in plain English.
- Evaluated against a pedagogical rubric scoring clarity, mention of core principles (e.g., shallow reference comparison, state snapshots), and cause-and-effect reasoning.

### 4. Formative Concept Quizzes
- Targeted conceptual checks testing common pitfalls (such as direct array mutation with `.push()`, list index key bugs, and controlled vs. uncontrolled inputs).

### 5. Planted Debug Challenges
- Pre-planted subtle bugs (such as single-item array replacement or toggling all rows) test reading comprehension and diagnosis skills.

### 6. Dual Telemetry Dashboards
- **Learner Dashboard**: Daily streak, prediction hypothesis accuracy trajectory, multidimensional concept radar, and scaffolding depth.
- **Instructor Hub**: Cohort-wide telemetry, concept friction heatmaps, and early intervention alerts for struggling students.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Editor**: Monaco Editor (`@monaco-editor/react`) with dynamic SSR-free loading
- **Sandbox**: Sandboxed `iframe` with Babel Standalone, React 18, and runtime diagnostics capture
- **Styling**: Tailwind CSS, Lucide React icons, Framer Motion
- **Database & ORM**: Prisma with SQLite (`dev.db`)
- **Charts**: Chart.js & `react-chartjs-2` (Radar & Line charts)
- **AI Integration**: Dual-mode engine supporting `@google/generative-ai` (Gemini 1.5 Flash) with automatic seamless fallback to an intelligent mock provider when API keys are absent.

---

## 🚀 Quickstart & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧭 Complete Demo Walkthrough (Hackathon Guide)

1. **Landing Page (`/`)**:
   - Tour the value proposition, 3 pillars of active learning, and featured interactive challenges.
   - Click **"Launch Interactive Demo"** or **"Start Coding"**.

2. **Interactive Coding Workspace (`/workspace/task-1`)**:
   - **Step 1 - Task Overview**: Inspect the requirements and learning objectives in the left panel.
   - **Step 2 - Predict**: Click the green **"Predict & Run"** button. The active prediction modal will prompt you to predict what clicking "Add" will do before running the code.
   - **Step 3 - Sandboxed Preview**: Once predicted, the code executes in the sandboxed preview below the editor.
   - **Step 4 - Progressive Hints**: Open the right panel and unlock **Hint Level 1** through **Hint Level 4** one tier at a time.
   - **Step 5 - Explain-Back**: Click the **"Explain-Back"** button in the top bar to submit a Feynman explanation and receive instant rubric scoring.
   - **Step 6 - Concept Quiz**: Click **"Concept Quiz"** to verify mental models on React State, Reconciliation, and Event Handlers.
   - **Step 7 - Planted Bug**: Click **"Planted Bug"** to load the buggy version and test your debugging methodology.

3. **Learner Analytics (`/progress`)**:
   - Explore the multidimensional Concept Radar chart and Prediction Accuracy Growth Line chart.
   - Review scaffolding depth per challenge.

4. **Instructor Cohort Hub (`/instructor`)**:
   - View aggregated cohort analytics, concept mastery distribution heatmap, and automated intervention alerts.

---

## 🔒 Security & Sandboxing Note
Code execution in the preview panel runs inside a heavily sandboxed `iframe` without access to parent storage or cookies. Code transforms are handled safely in the browser via Babel Standalone.