"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Users,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  HelpCircle,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { TopNav } from "@/components/layout/TopNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function InstructorPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/instructor")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.log("Instructor data load:", err));
  }, []);

  const cohortStats = data?.cohortStats || {
    cohortName: "React Engineering Cohort Alpha",
    totalStudents: 28,
    activeToday: 24,
    avgPredictionAccuracy: 78,
    avgHintsPerTask: 2.1,
    strugglingConcept: "State Immutability & Reference Equality",
  };

  const heatmap = data?.conceptHeatmap || [
    { concept: "React State", average: 84, distribution: { high: 18, mid: 8, low: 2 } },
    { concept: "Event Handlers", average: 81, distribution: { high: 16, mid: 9, low: 3 } },
    { concept: "Lists & Keys", average: 74, distribution: { high: 12, mid: 11, low: 5 } },
    { concept: "Immutability & Spread", average: 63, distribution: { high: 7, mid: 13, low: 8 } },
    { concept: "Controlled Inputs", average: 86, distribution: { high: 20, mid: 6, low: 2 } },
    { concept: "Planted Bug Debugging", average: 69, distribution: { high: 9, mid: 12, low: 7 } },
  ];

  const students = data?.students || [
    {
      id: "s1",
      name: "Demo Learner (You)",
      email: "demo@mentor.dev",
      streak: 4,
      mastery: 82,
      predictionAccuracy: 85,
      avgHints: 1.8,
      status: "Exceeding Pace",
      lastActive: "Active Now",
    },
    {
      id: "s2",
      name: "Alex Rivera",
      email: "alex.r@school.edu",
      streak: 5,
      mastery: 89,
      predictionAccuracy: 92,
      avgHints: 1.2,
      status: "Mastery Leader",
      lastActive: "15m ago",
    },
    {
      id: "s3",
      name: "Sarah Chen",
      email: "s.chen@school.edu",
      streak: 3,
      mastery: 65,
      predictionAccuracy: 58,
      avgHints: 3.4,
      status: "Needs Intervention",
      lastActive: "1h ago",
    },
    {
      id: "s4",
      name: "Marcus Johnson",
      email: "marcus.j@school.edu",
      streak: 2,
      mastery: 77,
      predictionAccuracy: 74,
      avgHints: 2.3,
      status: "On Track",
      lastActive: "3h ago",
    },
    {
      id: "s5",
      name: "Elena Rostova",
      email: "elena.r@school.edu",
      streak: 6,
      mastery: 91,
      predictionAccuracy: 90,
      avgHints: 1.0,
      status: "Mastery Leader",
      lastActive: "5h ago",
    },
  ];

  const interventionAlerts = data?.interventionAlerts || [
    {
      studentName: "Sarah Chen",
      issue: "High Hint Dependency on Immutability (3.4 avg hints)",
      recommendedAction: "Assign Feynman Explain-Back module on React Reference Equality",
    },
    {
      studentName: "Marcus Johnson",
      issue: "Low Prediction Accuracy on List Key Reconciliation (40%)",
      recommendedAction: "Review diffing algorithm visualization in Task 1",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0a0e1a] text-slate-100">
      <TopNav title="Instructor Hub" subtitle="Cohort Insights &amp; Early Interventions" />

      <div className="p-6 max-w-7xl mx-auto w-full space-y-8 flex-1">
        {/* Banner with Sample Class Data badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
              <GraduationCap className="h-4 w-4 text-violet-400" />
              <span>{cohortStats.cohortName}</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Cohort Conceptual Mastery &amp; Friction Points
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Real-time formative telemetry from student coding sessions to catch misconceptions early.
            </p>
          </div>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-violet-950/80 text-violet-300 border border-violet-800/40">
            Sample class data
          </span>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-slate-900/60 border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Active Students</span>
              <Users className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              {cohortStats.activeToday} / {cohortStats.totalStudents}
            </div>
            <p className="text-[10px] text-emerald-400 mt-1">86% attendance rate</p>
          </Card>

          <Card className="p-4 bg-slate-900/60 border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Cohort Prediction Accuracy</span>
              <BrainCircuit className="h-4 w-4 text-violet-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-cyan-400">
              {cohortStats.avgPredictionAccuracy}%
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Target is &gt; 70%</p>
          </Card>

          <Card className="p-4 bg-slate-900/60 border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Average Hints Requested</span>
              <HelpCircle className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-amber-400">
              {cohortStats.avgHintsPerTask}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Scaffolding depth</p>
          </Card>

          <Card className="p-4 bg-slate-900/60 border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Primary Cohort Blocker</span>
              <AlertTriangle className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-sm font-bold text-rose-300 truncate mt-1">
              {cohortStats.strugglingConcept}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">8 students flagged</p>
          </Card>
        </div>

        {/* Pedagogical Intervention Alerts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <ShieldAlert className="h-4 w-4" />
            <span>Recommended Instructor Interventions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interventionAlerts.map((alert: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    {alert.studentName}
                  </span>
                  <Badge variant="warning">Action Needed</Badge>
                </div>
                <p className="text-slate-300">
                  <strong className="text-amber-300">Friction Point:</strong> {alert.issue}
                </p>
                <div className="p-2 rounded bg-slate-950/60 border border-amber-900/50 text-[11px] text-amber-300/90 font-mono">
                  Recommended: {alert.recommendedAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concept Mastery Heatmap Table */}
        <Card>
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">
                Cohort Concept Mastery Distribution Heatmap
              </CardTitle>
              <span className="text-[10px] font-mono text-slate-500">
                Sample class data
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Student distribution across High (&gt;80%), Medium (65-80%), and Low (&lt;65%) comprehension
            </p>
          </CardHeader>
          <CardContent className="p-5 pt-0 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-3 px-2">Concept Area</th>
                  <th className="py-3 px-2 text-center">Cohort Avg</th>
                  <th className="py-3 px-2 text-center">High (&gt;80%)</th>
                  <th className="py-3 px-2 text-center">Mid (65-80%)</th>
                  <th className="py-3 px-2 text-center">Low (&lt;65%)</th>
                  <th className="py-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {heatmap.map((row: any) => {
                  const isStruggling = row.average < 70;
                  return (
                    <tr key={row.concept} className="hover:bg-slate-900/40">
                      <td className="py-3 px-2 font-sans font-medium text-slate-200">
                        {row.concept}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-white">
                        {row.average}%
                      </td>
                      <td className="py-3 px-2 text-center text-emerald-400">
                        {row.distribution.high}
                      </td>
                      <td className="py-3 px-2 text-center text-amber-400">
                        {row.distribution.mid}
                      </td>
                      <td className="py-3 px-2 text-center text-rose-400 font-bold">
                        {row.distribution.low}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <Badge variant={isStruggling ? "destructive" : "success"}>
                          {isStruggling ? "Blocker" : "Mastered"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Student Activity Roster Table */}
        <Card>
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">
                Student Telemetry Roster
              </CardTitle>
              <span className="text-[10px] font-mono text-slate-500">
                Sample class data
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live engagement, prediction accuracy, and hint usage across students
            </p>
          </CardHeader>
          <CardContent className="p-5 pt-0 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="py-3 px-2">Student</th>
                  <th className="py-3 px-2 text-center">Streak</th>
                  <th className="py-3 px-2 text-center">Mastery</th>
                  <th className="py-3 px-2 text-center">Prediction Acc.</th>
                  <th className="py-3 px-2 text-center">Avg Hints</th>
                  <th className="py-3 px-2 text-center">Status</th>
                  <th className="py-3 px-2 text-right">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {students.map((student: any) => (
                  <tr key={student.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-2">
                      <div className="font-sans font-semibold text-slate-200">
                        {student.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-sans">
                        {student.email}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center text-amber-400">
                      {student.streak}d
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-white">
                      {student.mastery}%
                    </td>
                    <td className="py-3 px-2 text-center text-cyan-400">
                      {student.predictionAccuracy}%
                    </td>
                    <td className="py-3 px-2 text-center text-slate-300">
                      {student.avgHints}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <Badge
                        variant={
                          student.status === "Mastery Leader" ||
                          student.status === "Exceeding Pace"
                            ? "success"
                            : student.status === "Needs Intervention"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-right text-slate-400 font-sans text-[11px]">
                      {student.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
