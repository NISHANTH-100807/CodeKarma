"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Brain,
  CheckSquare,
  Sparkles,
  ChevronRight,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { TaskDefinition, TASKS } from "@/lib/tasks";

interface TaskPanelProps {
  task: TaskDefinition;
  completedObjectives: number[];
  onToggleObjective: (index: number) => void;
  onOpenExplainBack?: () => void;
  onOpenQuiz?: () => void;
  onOpenBugChallenge?: () => void;
}

export function TaskPanel({
  task,
  completedObjectives,
  onToggleObjective,
  onOpenExplainBack,
  onOpenQuiz,
  onOpenBugChallenge,
}: TaskPanelProps) {
  const progressPercent = Math.round(
    (completedObjectives.length / Math.max(task.objectives.length, 1)) * 100
  );

  return (
    <div className="h-full flex flex-col bg-slate-950 border-r border-slate-800 text-slate-100 select-none overflow-y-auto">
      {/* Task Switcher Pill Navigation */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>CURRICULUM MODULE</span>
          <span className="text-[10px] text-cyan-400 font-mono">
            {task.id.toUpperCase()}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {TASKS.map((t, idx) => {
            const isCurrent = t.id === task.id;
            return (
              <Link
                key={t.id}
                href={`/workspace/${t.id}`}
                className={`px-2 py-1.5 rounded text-center text-xs font-medium transition-all ${
                  isCurrent
                    ? "bg-violet-600 text-white font-bold shadow-sm shadow-violet-950"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                Task {idx + 1}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-5 space-y-6 flex-1">
        {/* Title and metadata */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Interactive Challenge
            </span>
            <Badge
              variant={
                task.difficulty === "beginner"
                  ? "success"
                  : task.difficulty === "intermediate"
                  ? "warning"
                  : "destructive"
              }
            >
              {task.difficulty}
            </Badge>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {task.title}
          </h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Concept Badges */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="h-3 w-3 text-cyan-400" />
            <span>Target Mental Concepts</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {task.concepts.map((concept) => (
              <Badge key={concept} variant="cyan">
                {concept}
              </Badge>
            ))}
          </div>
        </div>

        {/* Learning Objectives Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="h-3 w-3 text-violet-400" />
              <span>Learning Objectives</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-semibold">
              {progressPercent}%
            </span>
          </div>

          <Progress value={progressPercent} max={100} />

          <div className="space-y-2 pt-1">
            {task.objectives.map((obj, index) => {
              const isDone = completedObjectives.includes(index);
              return (
                <button
                  key={index}
                  onClick={() => onToggleObjective(index)}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left text-xs transition-all border ${
                    isDone
                      ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-200"
                      : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={isDone ? "line-through opacity-80" : ""}>
                    {obj}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Functional Requirements */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckSquare className="h-3 w-3 text-cyan-400" />
            <span>Acceptance Requirements</span>
          </div>
          <ul className="space-y-1.5">
            {task.requirements.map((req, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/40 p-2 rounded border border-slate-800/60"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Post-task Deep Comprehension Activities */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Deep Comprehension Modalities
          </div>

          {onOpenExplainBack && (
            <button
              onClick={onOpenExplainBack}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-violet-950/40 border border-violet-800/50 hover:bg-violet-900/40 text-violet-200 text-xs font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                <span>Explain Back to Mentor</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-violet-400" />
            </button>
          )}

          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50 hover:bg-cyan-900/40 text-cyan-200 text-xs font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <Brain className="h-3.5 w-3.5 text-cyan-400" />
                <span>Concept Mastery Quiz</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />
            </button>
          )}

          {task.hasBugChallenge && onOpenBugChallenge && (
            <button
              onClick={onOpenBugChallenge}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/50 hover:bg-amber-900/40 text-amber-200 text-xs font-medium transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Planted Bug Challenge</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-amber-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
