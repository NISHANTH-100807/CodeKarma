"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Code2,
  ArrowRight,
  Sparkles,
  Bug,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { TASKS, TaskDefinition } from "@/lib/tasks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ChallengeListProps {
  tasks?: TaskDefinition[];
}

export function ChallengeList({ tasks = TASKS }: ChallengeListProps) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Active Curriculum Modules</h3>
          <p className="text-xs text-slate-400">Interactive Socratic coding challenges</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map((task, idx) => {
          return (
            <Card
              key={task.id}
              className="flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                    Challenge #{idx + 1}
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

                <CardTitle className="text-base font-bold group-hover:text-cyan-400 transition-colors">
                  {task.title}
                </CardTitle>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>
              </CardHeader>

              <CardContent className="p-5 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1">
                  {task.concepts.map((concept) => (
                    <span
                      key={concept}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 font-medium"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    {task.hasBugChallenge ? (
                      <span className="flex items-center gap-1 text-amber-400 text-[11px] font-medium">
                        <Bug className="h-3 w-3" /> Includes Bug Fix
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Clock className="h-3 w-3" /> ~15 mins
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    onClick={() => router.push(`/workspace/${task.id}`)}
                    className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold gap-1 px-3"
                  >
                    <span>Launch</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
