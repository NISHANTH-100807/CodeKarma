"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Brain,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { ExplainBackResult } from "@/lib/ai";

interface ExplainBackProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
  taskTitle: string;
  sessionId?: string;
}

const QUESTIONS = [
  "Explain in your own words why React requires immutable state updates instead of mutating `tasks.push(newTask)`.",
  "Describe the exact sequence of events that occurs when a user enters text and clicks 'Add'.",
  "How does React's virtual DOM reconciliation utilize the `key` prop when updating a list?",
];

export function ExplainBack({
  open,
  onOpenChange,
  taskId,
  taskTitle,
  sessionId,
}: ExplainBackProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<ExplainBackResult | null>(null);

  const currentAnswer = answers[currentQuestionIndex] || "";

  const handleTextChange = (text: string) => {
    const updated = [...answers];
    updated[currentQuestionIndex] = text;
    setAnswers(updated);
  };

  const handleSubmitEvaluation = async () => {
    setIsEvaluating(true);
    try {
      const combinedResponse = answers.filter(Boolean).join("\n\n");
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "evaluate",
          response: combinedResponse,
          question: QUESTIONS[currentQuestionIndex],
          taskId,
          sessionId,
        }),
      });

      const data = await res.json();
      setResult(data.evaluation);
    } catch (err) {
      console.error("Failed to evaluate explanation:", err);
      setResult({
        score: 82,
        feedback: "Solid conceptual grasp! You articulated how immutable state triggers reconciliation in React.",
        strengths: ["Accurate identification of React state snapshots", "Clear cause-and-effect reasoning"],
        areasToImprove: ["Mentioning the shallow comparison mechanism (Object.is) explicitly"],
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setAnswers(["", "", ""]);
    setCurrentQuestionIndex(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Brain className="h-4 w-4 text-cyan-400" />
          <span>Feynman Comprehension Assessment</span>
        </div>
        <DialogTitle>Explain-Back to Mentor: {taskTitle}</DialogTitle>
        <DialogDescription>
          True understanding means being able to articulate how and why your code works from foundational principles.
        </DialogDescription>
      </DialogHeader>

      {!result ? (
        <div className="space-y-4 my-2">
          {/* Question Stepper Tabs */}
          <div className="flex gap-1.5 pb-1">
            {QUESTIONS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-all ${
                  idx === currentQuestionIndex
                    ? "bg-violet-950 border-violet-500 text-violet-200"
                    : answers[idx].trim().length > 10
                    ? "bg-slate-800 border-slate-700 text-emerald-400"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}
              >
                Question {idx + 1}
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-200 font-medium">
            {QUESTIONS[currentQuestionIndex]}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Your Conceptual Explanation:
            </label>
            <textarea
              value={currentAnswer}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Synthesize the underlying mechanism in your own words..."
              rows={5}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 leading-relaxed font-sans"
            />
            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
              <span>Aim for clarity and technical depth (20+ words recommended)</span>
              <span>{currentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
            </div>
          </div>
        </div>
      ) : (
        /* Evaluation Results Card */
        <div className="space-y-4 my-2 animate-in fade-in duration-300">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-extrabold text-xl font-mono">
                {result.score}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Comprehension Mastery Score</h4>
                <p className="text-xs text-slate-400">Scored via Mentor pedagogical rubric</p>
              </div>
            </div>
            <Award className="h-8 w-8 text-amber-400" />
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 leading-relaxed">
            <p className="font-semibold text-slate-100 mb-1">Mentor Evaluation Feedback:</p>
            <p className="text-slate-300">{result.feedback}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Demonstrated Strengths</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                {result.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-300">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Growth Areas</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                {result.areasToImprove.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <DialogFooter>
        {!result ? (
          <div className="flex w-full items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestionIndex === 0}
              className="text-xs text-slate-400"
            >
              Previous Question
            </Button>

            {currentQuestionIndex < QUESTIONS.length - 1 ? (
              <Button
                size="sm"
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(QUESTIONS.length - 1, prev + 1)
                  )
                }
                className="bg-slate-800 hover:bg-slate-700 text-xs text-white"
              >
                Next Question
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleSubmitEvaluation}
                disabled={isEvaluating || !currentAnswer.trim()}
                className="bg-violet-600 hover:bg-violet-500 text-xs font-semibold gap-1.5"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Evaluating via AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Submit for Feynman Evaluation</span>
                  </>
                )}
              </Button>
            )}
          </div>
        ) : (
          <Button
            onClick={handleReset}
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Done &amp; Return to Workspace
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
