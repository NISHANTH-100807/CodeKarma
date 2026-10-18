"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Play,
  RotateCcw,
  Sparkles,
  Brain,
  Bug,
  Award,
  Layers,
  ArrowLeft,
  ChevronDown,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { getTaskById, TASKS, TaskDefinition } from "@/lib/tasks";
import { CodeEditor } from "@/components/workspace/CodeEditor";
import { PreviewPanel } from "@/components/workspace/PreviewPanel";
import { TaskPanel } from "@/components/workspace/TaskPanel";
import { TutorPanel } from "@/components/workspace/TutorPanel";
import { PredictionDialog } from "@/components/workspace/PredictionDialog";
import { ExplainBack } from "@/components/workspace/ExplainBack";
import { QuizPanel } from "@/components/workspace/QuizPanel";
import { BugChallenge } from "@/components/workspace/BugChallenge";
import { Button } from "@/components/ui/Button";

export default function WorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const taskId = (params?.taskId as string) || "task-1";

  const task = getTaskById(taskId) || TASKS[0];

  const [code, setCode] = useState(task.starterCode);
  const [sessionId, setSessionId] = useState<string>("demo-session-1");
  const [isRunAllowed, setIsRunAllowed] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [unlockedHints, setUnlockedHints] = useState<Array<{ level: number; content: string }>>([]);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState<number[]>([]);

  // Modals state
  const [predictionOpen, setPredictionOpen] = useState(false);
  const [explainOpen, setExplainOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [bugOpen, setBugOpen] = useState(false);

  // Re-sync starter code when switching tasks
  useEffect(() => {
    const currentTask = getTaskById(taskId) || TASKS[0];
    setCode(currentTask.starterCode);
    setIsRunAllowed(false);
    setHintLevel(0);
    setUnlockedHints([]);
    setCompletedObjectives([]);
  }, [taskId]);

  const handleRunCode = () => {
    // If prediction questions exist and run isn't unlocked yet, require prediction
    if (!isRunAllowed && task.predictions.length > 0) {
      setPredictionOpen(true);
    } else {
      setIsRunAllowed(true);
    }
  };

  const handleResetCode = () => {
    if (confirm("Reset editor to starter code?")) {
      setCode(task.starterCode);
    }
  };

  const handleToggleObjective = (index: number) => {
    setCompletedObjectives((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRequestNextHint = async () => {
    setIsHintLoading(true);
    const nextLevel = hintLevel + 1;

    try {
      const res = await fetch("/api/hints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          requestedLevel: nextLevel,
          taskContext: {
            taskId: task.id,
            taskTitle: task.title,
            taskDescription: task.description,
            currentCode: code,
            solutionCode: task.solutionCode,
            concepts: task.concepts,
          },
        }),
      });

      const data = await res.json();
      if (data.hint) {
        setHintLevel(data.hint.level);
        setUnlockedHints((prev) => [
          ...prev.filter((h) => h.level !== data.hint.level),
          { level: data.hint.level, content: data.hint.content },
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch hint:", err);
    } finally {
      setIsHintLoading(false);
    }
  };

  const handleLoadBuggyCode = (bugCode: string) => {
    setCode(bugCode);
    setIsRunAllowed(false);
  };

  const prediction = task.predictions[0] || {
    question: "What will happen when you execute this component in its current state?",
    options: [
      "The component will mount and render the basic layout",
      "An unhandled syntax error will crash the application",
      "Interactive event listeners will fire immediately",
      "The browser will trigger a page reload",
    ],
    correctIndex: 0,
    explanation: "Because basic JSX is valid, the initial component render will succeed.",
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#0a0e1a] text-slate-100 overflow-hidden">
      {/* Top Workspace Header Bar */}
      <header className="h-14 px-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between z-30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="text-slate-400 hover:text-white px-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline text-xs">Dashboard</span>
          </Button>

          <div className="h-4 w-px bg-slate-800" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">
                {task.title}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-950/80 text-violet-300 border border-violet-700/40">
                {task.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Explain-Back Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExplainOpen(true)}
            className="hidden md:flex text-xs border-violet-800/60 text-violet-300 hover:bg-violet-950/50 gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span>Explain-Back</span>
          </Button>

          {/* Quiz Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuizOpen(true)}
            className="hidden md:flex text-xs border-cyan-800/60 text-cyan-300 hover:bg-cyan-950/50 gap-1.5"
          >
            <Brain className="h-3.5 w-3.5 text-cyan-400" />
            <span>Concept Quiz</span>
          </Button>

          {/* Bug Challenge Button */}
          {task.hasBugChallenge && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBugOpen(true)}
              className="hidden lg:flex text-xs border-amber-800/60 text-amber-300 hover:bg-amber-950/50 gap-1.5"
            >
              <Bug className="h-3.5 w-3.5 text-amber-400" />
              <span>Planted Bug</span>
            </Button>
          )}

          {/* Reset Code */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetCode}
            className="text-xs text-slate-400 hover:text-slate-200"
            title="Reset to starter template"
          >
            <RotateCcw className="h-3.5 w-3.5 sm:mr-1" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          {/* Run Code / Predict */}
          <Button
            size="sm"
            onClick={handleRunCode}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-1.5 shadow-md shadow-emerald-950/50"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>{isRunAllowed ? "Re-Run Preview" : "Predict & Run"}</span>
          </Button>
        </div>
      </header>

      {/* Main 3-Column Split Workspace */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden">
        {/* Left: Task Panel (3 cols) */}
        <div className="hidden md:block md:col-span-3 h-full overflow-hidden">
          <TaskPanel
            task={task}
            completedObjectives={completedObjectives}
            onToggleObjective={handleToggleObjective}
            onOpenExplainBack={() => setExplainOpen(true)}
            onOpenQuiz={() => setQuizOpen(true)}
            onOpenBugChallenge={task.hasBugChallenge ? () => setBugOpen(true) : undefined}
          />
        </div>

        {/* Center: Monaco Code Editor + Sandboxed Preview (6 cols) */}
        <div className="col-span-1 md:col-span-6 h-full flex flex-col min-h-0 border-r border-slate-800">
          {/* Top half: Monaco Editor */}
          <div className="h-[52%] min-h-0 relative">
            <CodeEditor code={code} onChange={setCode} />
          </div>

          {/* Bottom half: Sandboxed Preview */}
          <div className="h-[48%] min-h-0">
            <PreviewPanel
              code={code}
              isRunAllowed={isRunAllowed}
              onRequirePrediction={() => setPredictionOpen(true)}
            />
          </div>
        </div>

        {/* Right: Socratic Tutor & Hint Ladder (3 cols) */}
        <div className="hidden md:block md:col-span-3 h-full overflow-hidden">
          <TutorPanel
            task={task}
            code={code}
            hintLevel={hintLevel}
            unlockedHints={unlockedHints}
            onRequestNextHint={handleRequestNextHint}
            isHintLoading={isHintLoading}
          />
        </div>
      </div>

      {/* Modals */}
      <PredictionDialog
        open={predictionOpen}
        onOpenChange={setPredictionOpen}
        prediction={prediction}
        sessionId={sessionId}
        onPredictionSubmitted={(isCorrect) => {
          setIsRunAllowed(true);
        }}
      />

      <ExplainBack
        open={explainOpen}
        onOpenChange={setExplainOpen}
        taskId={task.id}
        taskTitle={task.title}
        sessionId={sessionId}
      />

      <QuizPanel
        open={quizOpen}
        onOpenChange={setQuizOpen}
        taskId={task.id}
        concepts={task.concepts}
        sessionId={sessionId}
      />

      {task.hasBugChallenge && (
        <BugChallenge
          open={bugOpen}
          onOpenChange={setBugOpen}
          buggyCode={task.buggyCode || task.starterCode}
          bugDescription={task.bugDescription || "Component behaves unexpectedly."}
          onLoadBuggyCode={handleLoadBuggyCode}
        />
      )}
    </div>
  );
}
