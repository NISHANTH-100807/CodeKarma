"use client";

import React, { useState } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { PredictionQuestion } from "@/lib/tasks";

interface PredictionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prediction: PredictionQuestion;
  sessionId?: string;
  onPredictionSubmitted: (isCorrect: boolean) => void;
}

export function PredictionDialog({
  open,
  onOpenChange,
  prediction,
  sessionId,
  onPredictionSubmitted,
}: PredictionDialogProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [reasoning, setReasoning] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = async () => {
    if (selectedOption === null) return;
    setIsSubmitting(true);

    const correct = selectedOption === prediction.correctIndex;
    setIsCorrect(correct);

    try {
      if (sessionId) {
        await fetch("/api/predictions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            question: prediction.question,
            prediction: prediction.options[selectedOption],
            correctAnswer: prediction.options[prediction.correctIndex],
            isCorrect: correct,
            explanation: reasoning || prediction.explanation,
          }),
        });
      }
    } catch (err) {
      console.error("Failed to record prediction:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleContinue = () => {
    onPredictionSubmitted(isCorrect);
    onOpenChange(false);
    // Reset state for future runs
    setTimeout(() => {
      setSubmitted(false);
      setSelectedOption(null);
      setReasoning("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <BrainCircuit className="h-4 w-4 text-cyan-400" />
          <span>Active Learning Checkpoint</span>
        </div>
        <DialogTitle>Predict Execution Behavior</DialogTitle>
        <DialogDescription>
          Forming a hypothesis before running code primes mental models and enhances long-term retention.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 my-2">
        <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700 text-sm font-medium text-slate-100">
          {prediction.question}
        </div>

        {/* 4 Multiple Choice Options */}
        <div className="space-y-2">
          {prediction.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isAnswer = idx === prediction.correctIndex;

            let optionStyle =
              "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600";

            if (submitted) {
              if (isAnswer) {
                optionStyle =
                  "bg-emerald-950/40 border-emerald-500 text-emerald-200";
              } else if (isSelected && !isCorrect) {
                optionStyle = "bg-rose-950/40 border-rose-500 text-rose-200";
              } else {
                optionStyle = "opacity-50 bg-slate-900 border-slate-800 text-slate-400";
              }
            } else if (isSelected) {
              optionStyle =
                "bg-violet-950/60 border-violet-500 text-violet-200 shadow-sm shadow-violet-950";
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={submitted}
                onClick={() => setSelectedOption(idx)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-left text-xs transition-all ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
                {submitted && isAnswer && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                )}
                {submitted && isSelected && !isCorrect && (
                  <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Reasoning Textarea */}
        {!submitted && (
          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Why do you expect this behavior? (Optional cognitive reasoning)
            </label>
            <textarea
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              placeholder="e.g. The handler isn't attached to onClick, so the event listener won't fire..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        )}

        {/* Feedback Reveal */}
        {submitted && (
          <div
            className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in duration-300 ${
              isCorrect
                ? "bg-emerald-950/30 border-emerald-800/60 text-emerald-200"
                : "bg-amber-950/30 border-amber-800/60 text-amber-200"
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Exact Prediction! Excellent Mental Model.</span>
                </>
              ) : (
                <>
                  <HelpCircle className="h-4 w-4 text-amber-400" />
                  <span>Runtime Reality Differed. Learning Opportunity!</span>
                </>
              )}
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {prediction.explanation}
            </p>
          </div>
        )}
      </div>

      <DialogFooter>
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null || isSubmitting}
            className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Recording...
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Commit Prediction &amp; Verify
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleContinue}
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs gap-2"
          >
            <span>Proceed to Sandboxed Execution</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
