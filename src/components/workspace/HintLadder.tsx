"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Compass,
  Code2,
  FileCode,
  Lock,
  CheckCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HintLadderProps {
  currentLevel: number;
  unlockedHints: Array<{ level: number; content: string }>;
  onRequestNextHint: () => Promise<void>;
  isLoading: boolean;
}

const HINT_TIERS = [
  {
    level: 1,
    title: "Guiding Question",
    desc: "Targeted question to examine execution path",
    icon: HelpCircle,
  },
  {
    level: 2,
    title: "Concept Nudge",
    desc: "Mental model reminder of underlying React principles",
    icon: Compass,
  },
  {
    level: 3,
    title: "Code Skeleton",
    desc: "Architectural structure with TODO placeholders",
    icon: Code2,
  },
  {
    level: 4,
    title: "Concrete Example",
    desc: "Focused implementation snippet illustrating syntax",
    icon: FileCode,
  },
];

export function HintLadder({
  currentLevel,
  unlockedHints,
  onRequestNextHint,
  isLoading,
}: HintLadderProps) {
  const [showPedagogy, setShowPedagogy] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(Math.max(1, currentLevel));

  // Sync active tab when new level is unlocked
  React.useEffect(() => {
    if (currentLevel > 0) {
      setActiveTab(currentLevel);
    }
  }, [currentLevel]);

  const activeHintData = unlockedHints.find((h) => h.level === activeTab);

  return (
    <div className="flex flex-col bg-slate-900/60 rounded-xl border border-slate-800 p-4 space-y-4">
      {/* Header and Pedagogical philosophy toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Progressive Hint Ladder ({currentLevel}/4)
          </h3>
        </div>
        <button
          onClick={() => setShowPedagogy(!showPedagogy)}
          className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
        >
          <span>Why progressive?</span>
          {showPedagogy ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>
      </div>

      {showPedagogy && (
        <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px] text-slate-300 leading-relaxed animate-in fade-in duration-200">
          <strong className="text-violet-300">Desirable Difficulty:</strong> Instant solutions create the illusion of competence. By stepping through progressive hints, you build the neural scaffolding required to solve novel bugs independently.
        </div>
      )}

      {/* 4 Ladder Step Badges */}
      <div className="grid grid-cols-4 gap-1.5">
        {HINT_TIERS.map((tier) => {
          const isUnlocked = tier.level <= currentLevel;
          const isSelected = tier.level === activeTab;
          const Icon = tier.icon;

          return (
            <button
              key={tier.level}
              disabled={!isUnlocked}
              onClick={() => setActiveTab(tier.level)}
              className={`p-2 rounded-lg flex flex-col items-center justify-center text-center transition-all border ${
                isSelected
                  ? "bg-violet-950/80 border-violet-500 text-violet-200 shadow-md shadow-violet-950"
                  : isUnlocked
                  ? "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                  : "bg-slate-950/50 border-slate-800/80 text-slate-600 cursor-not-allowed opacity-60"
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                {isUnlocked ? (
                  <CheckCircle className="h-3 w-3 text-cyan-400" />
                ) : (
                  <Lock className="h-3 w-3 text-slate-600" />
                )}
                <span className="text-[10px] font-mono font-bold">L{tier.level}</span>
              </div>
              <span className="text-[10px] font-medium truncate w-full">
                {tier.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Hint Content Display */}
      {currentLevel === 0 ? (
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
          <p className="text-xs text-slate-400">
            No hints unlocked yet. Try writing your solution, or request Level 1 for a Socratic guiding question.
          </p>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 border-b border-slate-800 pb-2">
            <span>
              {HINT_TIERS[activeTab - 1]?.title} (Tier {activeTab})
            </span>
            <span className="text-cyan-400 font-mono text-[10px]">Server Verified</span>
          </div>
          <div className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-300">
            {activeHintData?.content || "Select an unlocked tier above."}
          </div>
        </div>
      )}

      {/* Next Hint Button */}
      {currentLevel < 4 && (
        <Button
          onClick={onRequestNextHint}
          disabled={isLoading}
          variant="secondary"
          size="sm"
          className="w-full text-xs font-semibold justify-center gap-2 border-slate-700 bg-slate-800/80 hover:bg-slate-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Verifying &amp; Unlocking Level {currentLevel + 1}...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Unlock Hint Level {currentLevel + 1} ({HINT_TIERS[currentLevel].title})</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
}
