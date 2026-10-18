"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Flame,
  Award,
  Sparkles,
  HelpCircle,
  Play,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Terminal,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChallengeList } from "@/components/dashboard/ChallengeList";
import { MasteryChart } from "@/components/dashboard/MasteryChart";
import { TopNav } from "@/components/layout/TopNav";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TASKS } from "@/lib/tasks";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<{
    stats: {
      streakDays: number;
      conceptMasteryPercent: number;
      predictionAccuracyPercent: number;
      avgHintsUsed: number;
    };
    recentActivity: Array<{
      id: string;
      title: string;
      result: string;
      timestamp: string;
    }>;
  }>({
    stats: {
      streakDays: 4,
      conceptMasteryPercent: 82,
      predictionAccuracyPercent: 85,
      avgHintsUsed: 1.8,
    },
    recentActivity: [
      {
        id: "act-1",
        title: "Prediction: Button Event Handler Flow",
        result: "Correct Verification",
        timestamp: "10 mins ago",
      },
      {
        id: "act-2",
        title: "Progressive Hint: Immutability Pattern",
        result: "Level 2 Unlocked",
        timestamp: "35 mins ago",
      },
      {
        id: "act-3",
        title: "Feynman Assessment: State Re-rendering",
        result: "88/100 Score",
        timestamp: "Yesterday",
      },
    ],
  });

  useEffect(() => {
    fetch("/api/progress")
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.stats) {
          setData(resData);
        }
      })
      .catch((err) => console.log("Using cached dashboard stats:", err));
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0a0e1a] text-slate-100">
      <TopNav title="Learner Dashboard" subtitle="Overview &amp; Trajectory" />

      <div className="p-6 max-w-7xl mx-auto w-full space-y-8 flex-1">
        {/* Welcome Banner Card */}
        <div className="relative rounded-2xl bg-gradient-to-r from-violet-950/80 via-slate-900 to-slate-950 border border-violet-800/40 p-6 sm:p-8 overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-violet-600/10 via-cyan-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/40 border border-violet-700/50 text-violet-300 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Socratic Trajectory: On Pace</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, Demo Learner!
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your prediction accuracy increased to <strong>85%</strong> this week. Continue building your mental models on React state immutability in Challenge #1.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Button
                onClick={() => router.push("/workspace/task-1")}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs gap-1.5 shadow-md shadow-cyan-950/40"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Resume Task 1 Workspace</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/progress")}
                className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <span>View Full Analytics</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Daily Learning Streak"
            value={`${data.stats.streakDays} Days`}
            subtitle="Consistent practice"
            icon={Flame}
            trend="+1 day"
            colorScheme="amber"
          />
          <StatsCard
            title="Concept Mastery"
            value={`${data.stats.conceptMasteryPercent}%`}
            subtitle="Across core React"
            icon={Award}
            trend="+8% this week"
            colorScheme="violet"
          />
          <StatsCard
            title="Prediction Accuracy"
            value={`${data.stats.predictionAccuracyPercent}%`}
            subtitle="Pre-run hypotheses"
            icon={BrainCircuit}
            trend="+5% accuracy"
            colorScheme="cyan"
          />
          <StatsCard
            title="Scaffolding Hints Used"
            value={data.stats.avgHintsUsed}
            subtitle="Avg hints per task"
            icon={HelpCircle}
            trend="Target < 2.0"
            colorScheme="emerald"
          />
        </div>

        {/* Curriculum Challenges Section */}
        <ChallengeList tasks={TASKS} />

        {/* Concept Mastery & Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <MasteryChart />
          </div>

          <div className="lg:col-span-5">
            <Card className="h-full flex flex-col justify-between">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-violet-400" />
                  <span>Recent Active Learning Log</span>
                </CardTitle>
                <p className="text-xs text-slate-400">
                  Recorded checkpoints from interactive workspace
                </p>
              </CardHeader>

              <CardContent className="p-5 pt-2 flex-1 space-y-3">
                {data.recentActivity.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-200">{act.title}</p>
                      <p className="text-[11px] text-cyan-400 font-medium">
                        {act.result}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">
                      {act.timestamp}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
