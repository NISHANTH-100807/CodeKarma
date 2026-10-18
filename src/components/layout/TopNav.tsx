"use client";

import React from "react";
import Link from "next/link";
import { Flame, Sparkles, Award, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TopNavProps {
  title?: string;
  subtitle?: string;
}

export function TopNav({ title = "Mentor Coding Workspace", subtitle }: TopNavProps) {
  return (
    <header className="h-14 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
          <span>{title}</span>
          {subtitle && (
            <>
              <span className="text-slate-600">/</span>
              <span className="text-xs text-slate-400 font-normal">{subtitle}</span>
            </>
          )}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Streak indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-bounce" />
          <span>4 Day Streak</span>
        </div>

        {/* Accuracy badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <Award className="h-3.5 w-3.5 text-cyan-400" />
          <span>85% Accuracy</span>
        </div>

        {/* Quick workspace launch */}
        <Link href="/workspace/task-1">
          <Button variant="default" size="sm" className="gap-1.5 text-xs font-semibold">
            <Terminal className="h-3.5 w-3.5" />
            <span>Launch Editor</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
