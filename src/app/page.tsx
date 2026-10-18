"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Layers,
  CheckCircle2,
  HelpCircle,
  Play,
  ShieldCheck,
  Code2,
  Bug,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 selection:bg-violet-500 selection:text-white">
      {/* Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-violet-950/50">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Mentor
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-slate-200 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-200 transition-colors">
              How It Works
            </a>
            <a href="#curriculum" className="hover:text-slate-200 transition-colors">
              Challenges
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="text-slate-300 border-slate-700 hover:bg-slate-800"
            >
              Dashboard
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push("/workspace/task-1")}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-900/30 gap-1.5"
            >
              Start Coding
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/20 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-800/50 text-violet-300 text-xs font-semibold mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>The AI Coding Mentor That Never Gives Away The Answer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            AI that teaches you to{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              think
            </span>
            , not just code.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            <strong className="text-white">Think first. Code smarter. Learn for real.</strong>{" "}
            Mentor uses Socratic questioning, predict-before-run checkpoints, and progressive hint ladders to build deep conceptual retention.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => router.push("/workspace/task-1")}
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base px-8 py-3 rounded-xl shadow-xl shadow-violet-950/50 gap-2 h-12"
            >
              <Play className="h-4 w-4 fill-white" />
              Launch Interactive Demo
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push("/dashboard")}
              className="w-full sm:w-auto bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-slate-200 text-base px-8 py-3 rounded-xl h-12 gap-2"
            >
              Explore Learner Hub
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Button>
          </div>
        </div>

        {/* Workspace Visual Preview Card */}
        <div className="max-w-5xl mx-auto mt-16 rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl shadow-violet-950/20 overflow-hidden">
          {/* Mock Window Header */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-3">
                workspace / task-1 (Build a Task Tracker)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded bg-violet-900/50 text-violet-300 font-mono border border-violet-700/40">
                Predict Mode: Active
              </span>
            </div>
          </div>

          {/* Mock Workspace Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 font-mono text-xs">
            {/* Task Objectives */}
            <div className="lg:col-span-3 p-4 bg-slate-950/70 text-slate-300 space-y-3 font-sans">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <BrainCircuit className="h-4 w-4" />
                <span>Task 1: Task Tracker</span>
              </div>
              <p className="text-xs text-slate-400">
                Implement state management and event handlers for interactive todo list.
              </p>
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>State initialization</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>Predict button event handler</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="h-3.5 w-3.5 rounded-full border border-slate-700" />
                  <span>Toggle item completion</span>
                </div>
              </div>
            </div>

            {/* Code snippet */}
            <div className="lg:col-span-5 p-4 bg-slate-950 text-slate-200 overflow-x-auto leading-relaxed">
              <div className="text-slate-500">{"// Predict what clicking Add will do..."}</div>
              <div><span className="text-violet-400">const</span> [<span className="text-cyan-300">tasks</span>, <span className="text-cyan-300">setTasks</span>] = <span className="text-indigo-400">useState</span>([]);</div>
              <div><span className="text-violet-400">const</span> [<span className="text-cyan-300">inputValue</span>, <span className="text-cyan-300">setInputValue</span>] = <span className="text-indigo-400">useState</span>(<span className="text-emerald-300">&#39;&#39;</span>);</div>
              <br />
              <div><span className="text-violet-400">const</span> <span className="text-yellow-300">addTask</span> = () =&gt; &#123;</div>
              <div className="pl-4 text-slate-400">{"// Spread previous tasks and append new item"}</div>
              <div className="pl-4"><span className="text-indigo-400">setTasks</span>([...tasks, &#123; id: Date.now(), text: inputValue &#125;]);</div>
              <div className="pl-4"><span className="text-indigo-400">setInputValue</span>(<span className="text-emerald-300">&#39;&#39;</span>);</div>
              <div>&#125;;</div>
            </div>

            {/* AI Socratic Tutor */}
            <div className="lg:col-span-4 p-4 bg-slate-900/40 text-slate-300 font-sans space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Mentor Socratic AI</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/30">
                  Hint Level 1
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs leading-relaxed text-slate-300">
                &ldquo;Before you execute, think: what happens to the existing items in memory when you call <code className="text-cyan-300">setTasks</code>? Does React create a new reference?&rdquo;
              </div>
              <Button
                variant="cyan"
                size="sm"
                onClick={() => router.push("/workspace/task-1")}
                className="w-full text-xs font-semibold"
              >
                Try In Live Workspace
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Feature Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-3">
            Pedagogical Architecture
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built on proven cognitive learning science
          </h3>
          <p className="text-sm text-slate-400 mt-3">
            Traditional AI coding assistants bypass learning by writing the solution for you. Mentor guides your mental models so knowledge sticks permanently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-violet-500/40 transition-colors group">
            <div className="h-12 w-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-105 transition-transform">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Predict Before You Run</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Form hypotheses before executing code. Predictions activate prior knowledge, prime the brain for feedback, and boost conceptual retention by up to 40%.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-colors group">
            <div className="h-12 w-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
              <Layers className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Progressive Hint Ladder</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              A 4-tier server-enforced scaffolding ladder: 1) Guiding Question, 2) Concept Nudge, 3) Code Skeleton, 4) Isolated Example. Never jump straight to the answer.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500/40 transition-colors group">
            <div className="h-12 w-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Prove Understanding</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Synthesize learning with explain-back prompts scored by AI rubric, concept mastery quizzes, and intentional bug-fixing challenges that test debugging skill.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Step Workflow */}
      <section id="how-it-works" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="text-center mb-16">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            The Mentor 3-Step Mastery Loop
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            How students advance through every interactive coding challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-4xl font-extrabold text-violet-500/30 font-mono mb-3">01</div>
            <h4 className="text-base font-bold text-white mb-2">Predict</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Before code runs in the sandboxed preview, answer targeted questions about execution flow and edge cases.
            </p>
          </div>

          <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-4xl font-extrabold text-cyan-500/30 font-mono mb-3">02</div>
            <h4 className="text-base font-bold text-white mb-2">Build</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Write solution code inside the live Monaco editor with real-time browser preview and progressive Socratic hints.
            </p>
          </div>

          <div className="relative p-6 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-4xl font-extrabold text-indigo-500/30 font-mono mb-3">03</div>
            <h4 className="text-base font-bold text-white mb-2">Explain</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reinforce understanding with the Feynman technique by explaining concepts in your own words for instant AI rubric feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Modules Preview */}
      <section id="curriculum" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Interactive Challenges
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Ready-to-run interactive modules designed for React state &amp; event comprehension.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="mt-4 md:mt-0 text-xs border-slate-700"
          >
            View All in Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Beginner
                </span>
                <span className="text-xs text-slate-500">Task 1</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">Build a Task Tracker</h4>
              <p className="text-xs text-slate-400 mb-4">
                Build a working todo list with useState, event handlers, and item completion.
              </p>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push("/workspace/task-1")}
              className="w-full text-xs"
            >
              Start Challenge
            </Button>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Beginner
                </span>
                <span className="text-xs text-slate-500">Task 2</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">React State and Events</h4>
              <p className="text-xs text-slate-400 mb-4">
                Master counter state, updater closures, and controlled user interactions.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push("/workspace/task-2")}
              className="w-full text-xs"
            >
              Start Challenge
            </Button>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Intermediate
                </span>
                <span className="text-xs text-slate-500">Task 3</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">Debug: Broken Component</h4>
              <p className="text-xs text-slate-400 mb-4">
                Find and fix 2 planted bugs causing array replacement and unintended toggling.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push("/workspace/task-3")}
              className="w-full text-xs"
            >
              Start Debug Challenge
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Mentor AI</span>
            <span>— Hackathon Prototype</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => router.push("/dashboard")} className="hover:text-slate-300">
              Dashboard
            </button>
            <button onClick={() => router.push("/workspace/task-1")} className="hover:text-slate-300">
              Workspace
            </button>
            <button onClick={() => router.push("/progress")} className="hover:text-slate-300">
              Analytics
            </button>
            <button onClick={() => router.push("/instructor")} className="hover:text-slate-300">
              Instructor Cohort
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
