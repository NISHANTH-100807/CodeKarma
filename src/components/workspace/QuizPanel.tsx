"use client";

import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  XCircle,
  Sparkles,
  RefreshCw,
  Loader2,
  Award,
} from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { QuizQuestion } from "@/lib/ai";

interface QuizPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
  concepts: string[];
  sessionId?: string;
}

const DEFAULT_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    type: "multiple-choice",
    question: "Why does React skip re-rendering if you do `tasks.push(newTask)` followed by `setTasks(tasks)`?",
    options: [
      "JavaScript arrays are frozen by React strict mode",
      "React uses shallow reference equality (Object.is) and sees the array memory address did not change",
      "State can only be mutated using Redux reducers",
      "The DOM node is already locked by the browser renderer",
    ],
    correctAnswer: 1,
    explanation: "Because both previous and next states point to the exact same array in memory, React concludes that nothing changed and optimizes away the re-render.",
    concept: "React State",
  },
  {
    id: "q2",
    type: "multiple-choice",
    question: "When rendering a dynamic list with `.map()`, why is using array index as a `key` dangerous?",
    options: [
      "Indices cause TypeScript compilation errors",
      "If list items are reordered or deleted, React can mismatch DOM nodes with component state",
      "Indexes use extra memory in the browser V8 heap",
      "React will re-render in infinite loops",
    ],
    correctAnswer: 1,
    explanation: "Keys provide stable persistent identities. When items shift or are removed, index keys cause React to preserve incorrect inputs or DOM state in the wrong row.",
    concept: "Lists & Keys",
  },
  {
    id: "q3",
    type: "multiple-choice",
    question: "What makes an `<input>` component 'controlled' in React?",
    options: [
      "Adding a CSS class `form-control`",
      "Its value is driven by React state and every user stroke triggers an `onChange` updater function",
      "Using the HTML5 `required` attribute",
      "Enclosing it in an HTML `<form>` tag",
    ],
    correctAnswer: 1,
    explanation: "In a controlled input, React is the single source of truth. The value attribute reflects state, and onChange updates that state.",
    concept: "Event Handlers",
  },
];

export function QuizPanel({
  open,
  onOpenChange,
  taskId,
  concepts,
  sessionId,
}: QuizPanelProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let correctCount = 0;
    DEFAULT_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const finalScore = Math.round((correctCount / DEFAULT_QUESTIONS.length) * 100);
    setScore(finalScore);

    try {
      if (sessionId) {
        await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            taskId,
            questions: DEFAULT_QUESTIONS,
            answers: selectedAnswers,
            score: finalScore,
          }),
        });
      }
    } catch (err) {
      console.error("Quiz submission error:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const allAnswered =
    Object.keys(selectedAnswers).length === DEFAULT_QUESTIONS.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Brain className="h-4 w-4 text-violet-400" />
          <span>Formative Concept Quiz</span>
        </div>
        <DialogTitle>Concept Mastery Checkpoint</DialogTitle>
        <DialogDescription>
          Verify your mental models on: {concepts.join(", ")}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 my-2 max-h-[60vh] overflow-y-auto pr-1">
        {submitted && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-extrabold text-xl font-mono">
                {score}%
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Quiz Evaluation</h4>
                <p className="text-xs text-slate-400">
                  {score >= 80 ? "Mastery Achieved!" : "Review the explanations below"}
                </p>
              </div>
            </div>
            <Award className="h-8 w-8 text-cyan-400" />
          </div>
        )}

        {DEFAULT_QUESTIONS.map((q, qIndex) => {
          const userAns = selectedAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-slate-200">
                  {qIndex + 1}. {q.question}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {q.concept}
                </span>
              </div>

              <div className="space-y-1.5">
                {q.options?.map((option, optIdx) => {
                  const isSelected = userAns === optIdx;
                  const isRightAnswer = optIdx === q.correctAnswer;

                  let optClass =
                    "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700";

                  if (submitted) {
                    if (isRightAnswer) {
                      optClass = "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      optClass = "bg-rose-950/40 border-rose-500 text-rose-200";
                    } else {
                      optClass = "opacity-50 bg-slate-950 border-slate-800 text-slate-400";
                    }
                  } else if (isSelected) {
                    optClass = "bg-violet-950/60 border-violet-500 text-violet-200";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition-all ${optClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="h-4 w-4 rounded-full border border-current flex items-center justify-center font-mono text-[9px] flex-shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {submitted && isRightAnswer && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="h-3.5 w-3.5 text-rose-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="pt-2 text-xs text-slate-400 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-slate-200">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DialogFooter>
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered || isSubmitting}
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Grading Quiz...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Submit Quiz Responses</span>
              </>
            )}
          </Button>
        ) : (
          <div className="flex gap-2 w-full justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="text-xs border-slate-700 text-slate-300 gap-1.5"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Retry Quiz</span>
            </Button>
            <Button
              size="sm"
              onClick={() => onOpenChange(false)}
              className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
            >
              Done &amp; Close
            </Button>
          </div>
        )}
      </DialogFooter>
    </Dialog>
  );
}
