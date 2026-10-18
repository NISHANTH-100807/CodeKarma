"use client";

import React, { useState } from "react";
import {
  Bug,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Code2,
  FileCheck,
} from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

interface BugChallengeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buggyCode: string;
  bugDescription: string;
  onLoadBuggyCode: (code: string) => void;
}

export function BugChallenge({
  open,
  onOpenChange,
  buggyCode,
  bugDescription,
  onLoadBuggyCode,
}: BugChallengeProps) {
  const [diagnosis, setDiagnosis] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleInjectIntoEditor = () => {
    onLoadBuggyCode(buggyCode);
    setConfirmed(true);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Bug className="h-4 w-4" />
          <span>Planted Debug Challenge</span>
        </div>
        <DialogTitle>Find &amp; Repair Planted Bug</DialogTitle>
        <DialogDescription>
          Debugging code written by others builds the highest level of conceptual mastery.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 my-2">
        <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Bug Symptom: </span>
            {bugDescription}
          </div>
        </div>

        {/* Buggy Code Read-Only Preview */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Code2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>Target Buggy Component</span>
            </span>
            <span className="text-[10px] font-mono text-rose-400">Contains 2 Bugs</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 max-h-52 overflow-y-auto whitespace-pre leading-relaxed">
            {buggyCode}
          </div>
        </div>

        {/* Diagnosis prompt */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Pre-flight Diagnosis: What is causing the bug?
          </label>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="e.g. When setTasks is called, it passes a new single-item array instead of spreading previous items..."
            rows={2}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          onClick={handleInjectIntoEditor}
          className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs gap-2"
        >
          <FileCheck className="h-4 w-4" />
          <span>Load Buggy Code Into Main Workspace</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
