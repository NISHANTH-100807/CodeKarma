import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  colorScheme?: "violet" | "cyan" | "amber" | "emerald";
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  colorScheme = "violet",
}: StatsCardProps) {
  const colorMap = {
    violet: {
      bg: "bg-violet-600/15",
      border: "border-violet-500/30",
      text: "text-violet-400",
      glow: "shadow-violet-950/30",
    },
    cyan: {
      bg: "bg-cyan-500/15",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      glow: "shadow-cyan-950/30",
    },
    amber: {
      bg: "bg-amber-500/15",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "shadow-amber-950/30",
    },
    emerald: {
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      glow: "shadow-emerald-950/30",
    },
  };

  const scheme = colorMap[colorScheme];

  return (
    <Card className="hover:border-slate-700 transition-all shadow-md">
      <CardContent className="p-5 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              {trend && (
                <span
                  className={cn(
                    "font-bold text-[11px]",
                    trendPositive ? "text-emerald-400" : "text-rose-400"
                  )}
                >
                  {trend}
                </span>
              )}
              <span>{subtitle}</span>
            </p>
          )}
        </div>

        <div
          className={cn(
            "h-12 w-12 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-lg",
            scheme.bg,
            scheme.border,
            scheme.text,
            scheme.glow
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}
