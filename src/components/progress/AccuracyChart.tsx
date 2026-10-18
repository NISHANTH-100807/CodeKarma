"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TrendingUp } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AccuracyPoint {
  date: string;
  accuracy: number;
}

interface AccuracyChartProps {
  history?: AccuracyPoint[];
}

export function AccuracyChart({
  history = [
    { date: "Oct 12", accuracy: 66 },
    { date: "Oct 13", accuracy: 75 },
    { date: "Oct 14", accuracy: 80 },
    { date: "Oct 15", accuracy: 83 },
    { date: "Oct 16", accuracy: 88 },
    { date: "Oct 17", accuracy: 91 },
  ],
}: AccuracyChartProps) {
  const data = {
    labels: history.map((h) => h.date),
    datasets: [
      {
        label: "Prediction Accuracy (%)",
        data: history.map((h) => h.accuracy),
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6, 182, 212, 0.12)",
        fill: true,
        tension: 0.35,
        borderWidth: 2.5,
        pointBackgroundColor: "#7c3aed",
        pointBorderColor: "#fff",
        pointBorderWidth: 1.5,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#94a3b8",
          font: { size: 10 },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "#94a3b8",
          font: { size: 10 },
          callback: (value: any) => `${value}%`,
        },
        suggestedMin: 50,
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
        callbacks: {
          label: (context: any) => `Accuracy: ${context.parsed.y}%`,
        },
      },
    },
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <span>Prediction Hypothesis Accuracy Trend</span>
          </CardTitle>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            +25% Growth
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Tracking your ability to accurately forecast code execution before runtime
        </p>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-1 min-h-[300px] flex items-center justify-center">
        <div className="h-[280px] w-full">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
