"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Loader2,
  Bot,
  User,
  Lightbulb,
  HelpCircle,
} from "lucide-react";
import { HintLadder } from "./HintLadder";
import { Button } from "@/components/ui/Button";
import { TaskDefinition } from "@/lib/tasks";

interface Message {
  id: string;
  sender: "tutor" | "user";
  text: string;
  time: string;
}

interface TutorPanelProps {
  task: TaskDefinition;
  code: string;
  hintLevel: number;
  unlockedHints: Array<{ level: number; content: string }>;
  onRequestNextHint: () => Promise<void>;
  isHintLoading: boolean;
}

export function TutorPanel({
  task,
  code,
  hintLevel,
  unlockedHints,
  onRequestNextHint,
  isHintLoading,
}: TutorPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      sender: "tutor",
      text: `Hello! I'm your Socratic AI Mentor for "${task.title}". 
I won't just dump the completed solution on you—instead, I'll guide your thinking so you truly understand the concepts. 

Where would you like to start? Check the Hint Ladder below or ask me any question!`,
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isSending) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput("");
    setIsSending(true);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "tutor",
          question: textToSend,
          context: {
            taskTitle: task.title,
            taskDescription: task.description,
            currentCode: code,
            concepts: task.concepts,
            hintLevel,
          },
        }),
      });

      const data = await res.json();
      const tutorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "tutor",
        text: data.response || "Reflect on how state mutations behave in React compared to regular JavaScript objects.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error("Tutor chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "tutor",
          text: "Remember: React checks state reference changes. If you mutate the array directly, the reference does not change, and the UI won't update.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const QUICK_QUESTIONS = [
    "Why is my state not updating on click?",
    "How does the spread operator work with state?",
    "What is the role of key in list rendering?",
  ];

  return (
    <div className="h-full flex flex-col bg-slate-950 border-l border-slate-800 text-slate-100 select-none">
      {/* Header */}
      <div className="h-12 px-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-400 flex items-center justify-center p-0.5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Mentor Socratic AI</h3>
            <p className="text-[10px] text-cyan-400 font-mono">Conceptual Guidance Mode</p>
          </div>
        </div>
      </div>

      {/* Main Scrollable View */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Progressive Hint Ladder Component */}
        <HintLadder
          currentLevel={hintLevel}
          unlockedHints={unlockedHints}
          onRequestNextHint={onRequestNextHint}
          isLoading={isHintLoading}
        />

        {/* Chat History Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <HelpCircle className="h-3 w-3" />
            <span>Socratic Conversation</span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 text-xs ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.sender === "tutor" && (
                <div className="h-7 w-7 rounded-lg bg-violet-950/80 border border-violet-700/60 flex items-center justify-center flex-shrink-0 text-violet-300">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                  m.sender === "user"
                    ? "bg-violet-600 text-white rounded-br-sm"
                    : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                <div
                  className={`text-[9px] mt-1 text-right ${
                    m.sender === "user" ? "text-violet-200" : "text-slate-500"
                  }`}
                >
                  {m.time}
                </div>
              </div>

              {m.sender === "user" && (
                <div className="h-7 w-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-slate-300">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex gap-2.5 items-center text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
              <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
              <span>Mentor is analyzing code context...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 border-t border-slate-800/60 bg-slate-950/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        {QUICK_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 hover:border-violet-500 text-slate-300 hover:text-white whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <Lightbulb className="h-3 w-3 text-amber-400" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask mentor a conceptual question..."
            disabled={isSending}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isSending}
            size="sm"
            className="bg-violet-600 hover:bg-violet-500 text-white px-3"
          >
            {isSending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
