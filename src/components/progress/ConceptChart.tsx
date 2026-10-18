"use client";

import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Brain } from "lucide-react";

// Register Chart.js modules
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ConceptChartProps {
  concepts?: Array<{ concept: string; score: number }>;
}

export function ConceptChart({
  concepts = [
    { concept: "React State", score: 88 },
    { concept: "Event Handlers", score: 82 },
    { concept: "Lists & Keys", score: 75 },
    { concept: "Immutability", score: 90 },
    { concept: "Reconciliation", score: 70 },
    { concept: "Debugging", score: 85 },
  ],
}: ConceptChartProps) {
  const data = {
    labels: concepts.map((c) => c.concept),
    datasets: [
      {
        label: "Mastery Level (%)",
        data: concepts.map((c) => c.score),
        backgroundColor: "rgba(124, 58, 237, 0.25)",
        borderColor: "rgba(124, 58, 237, 0.9)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(6, 182, 212, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(6, 182, 212, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.08)",
        },
        pointLabels: {
          color: "#94a3b8",
          font: {
            size: 11,
            family: "system-ui",
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: "#64748b",
          stepSize: 20,
          font: {
            size: 9,
          },
        },
        suggestedMin: 40,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        borderColor: "#334155",
        borderWidth: 1,
        padding: 10,
      },
    },
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Brain className="h-4 w-4 text-violet-400" />
            <span>Concept Radar: Mental Model Topology</span>
          </CardTitle>
          <span className="text-[10px] font-mono text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/40">
            Multidimensional
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Synthesized from prediction accuracy, hint usage, and Feynman assessments
        </p>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-1 min-h-[300px] flex items-center justify-center">
        <div className="h-[280px] w-full">
          <Radar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
