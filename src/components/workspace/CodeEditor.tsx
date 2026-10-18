"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamic import with ssr: false to prevent window/browser issues
const MonacoEditorComponent = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
        <span className="text-xs font-mono">Initializing Monaco Editor...</span>
      </div>
    ),
  }
);

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
}

export function CodeEditor({
  code,
  onChange,
  language = "typescript",
  readOnly = false,
}: CodeEditorProps) {
  return (
    <div className="h-full w-full overflow-hidden bg-slate-950 font-mono text-xs">
      <MonacoEditorComponent
        height="100%"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={(val) => onChange(val || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 12, bottom: 12 },
          fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, 'Courier New', monospace",
          fontLigatures: true,
          bracketPairColorization: { enabled: true },
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
        }}
      />
    </div>
  );
}
