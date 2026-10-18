"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Code2,
  TrendingUp,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Workspace",
    href: "/workspace/task-1",
    icon: Code2,
    badge: "Active",
  },
  {
    name: "Learning Analytics",
    href: "/progress",
    icon: TrendingUp,
    badge: null,
  },
  {
    name: "Instructor Hub",
    href: "/instructor",
    icon: GraduationCap,
    badge: "Cohort",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between select-none">
      <div>
        {/* Brand Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-violet-950/50 group-hover:scale-105 transition-transform">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                Mentor
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80 ml-1.5 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                AI
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-6">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
            Core Learning Flow
          </p>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/workspace/task-1"
                  ? pathname.startsWith("/workspace")
                  : pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group",
                    isActive
                      ? "bg-violet-600/15 text-violet-300 border border-violet-500/30 shadow-sm shadow-violet-950/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-400 group-hover:text-slate-300"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                        isActive
                          ? "bg-violet-500/30 text-violet-200"
                          : "bg-slate-800 text-slate-400 group-hover:text-slate-300"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pedagogical Principle Callout */}
        <div className="mx-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Active Recall Loop</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Predict outcomes, receive progressive hints, and explain code back to achieve deep conceptual mastery.
          </p>
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-violet-500/20">
            DL
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">
              Demo Learner
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              demo@mentor.dev
            </p>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
      </div>
    </aside>
  );
}
