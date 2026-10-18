"use client";

import React from "react";
import { Layers, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";

interface ConceptScore {
  concept: string;
  score: number;
}

interface MasteryChartProps {
  concepts?: ConceptScore[];
}

const DEFAULT_CONCEPTS: ConceptScore[] = [
  { concept: "React State Management", score: 88 },
  { concept: "Event Handlers & Form State", score: 82 },
  { concept: "Lists & Reconciliation Keys", score: 75 },
  { concept: "State Immutability & Spread", score: 90 },
  { concept: "Controlled Input Patterns", score: 85 },
];

export function MasteryChart({ concepts = DEFAULT_CONCEPTS }: MasteryChartProps) {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Target Concept Mastery Breakdown</span>
          </CardTitle>
          <span className="text-[11px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
            Formative Data
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Synthesized from prediction accuracy, hint usage, and Feynman assessments
        </p>
      </CardHeader>

      <CardContent className="p-5 pt-2 space-y-4">
        {concepts.map((c) => {
          let colorClass = "from-violet-600 to-cyan-400";
          if (c.score >= 85) colorClass = "from-emerald-500 to-teal-400";
          else if (c.score < 70) colorClass = "from-amber-500 to-orange-400";

          return (
            <div key={c.concept} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-200">{c.concept}</span>
                <span className="font-mono font-bold text-slate-300">
                  {c.score}%
                </span>
              </div>
              <Progress
                value={c.score}
                max={100}
                indicatorClassName={`bg-gradient-to-r ${colorClass}`}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
