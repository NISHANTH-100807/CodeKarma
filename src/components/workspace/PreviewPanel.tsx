"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Terminal, RefreshCw, AlertCircle, CheckCircle, Bug } from "lucide-react";

interface PreviewPanelProps {
  code: string;
  isRunAllowed: boolean;
  onRequirePrediction?: () => void;
}

export function PreviewPanel({
  code,
  isRunAllowed,
  onRequirePrediction,
}: PreviewPanelProps) {
  const [logs, setLogs] = useState<Array<{ type: "log" | "error"; text: string; time: string }>>([]);
  const [key, setKey] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

      if (event.data.type === "CONSOLE_ERROR" || event.data.type === "COMPILATION_ERROR") {
        setHasError(true);
        setLogs((prev) => [
          ...prev.slice(-15),
          { type: "error", text: String(event.data.message), time: now },
        ]);
      } else if (event.data.type === "CONSOLE_LOG") {
        setLogs((prev) => [
          ...prev.slice(-15),
          { type: "log", text: String(event.data.message), time: now },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleRefresh = () => {
    setLogs([]);
    setHasError(false);
    setKey((prev) => prev + 1);
  };

  // Prepare iframe HTML
  const srcDoc = useMemo(() => {
    if (!isRunAllowed) {
      return `
        <!DOCTYPE html>
        <html>
          <body style="background:#0a0e1a; color:#94a3b8; font-family:system-ui; display:flex; flex-direction:column; align-items:center; justify-content:center; height:90vh; text-align:center; padding:20px;">
            <div style="background:#1e1b4b; border:1px solid #4338ca; padding:16px 24px; border-radius:12px; max-width:400px;">
              <h3 style="color:#c7d2fe; margin-top:0; font-size:16px;">Active Prediction Checkpoint</h3>
              <p style="font-size:13px; line-height:1.5; color:#a5b4fc; margin-bottom:0;">
                To cultivate deep mental models, predict the component's execution behavior first before the code runs.
              </p>
            </div>
          </body>
        </html>
      `;
    }

    // Clean code for Babel standalone
    let sanitizedCode = code
      // Remove import lines like "import React, { useState } from 'react';"
      .replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, "")
      // Remove export default keywords
      .replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g, "function $1")
      .replace(/export\s+default\s+([A-Za-z0-9_]+);?/g, "");

    // Find main component name (either TaskTracker, Counter, BuggyTaskTracker, or last declared function)
    const functionMatch = sanitizedCode.match(/function\s+([A-Za-z0-9_]+)\s*\(/);
    const mainComponent = functionMatch ? functionMatch[1] : "App";

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            background-color: #0b0f19;
            color: #f1f5f9;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 16px;
            overflow-y: auto;
          }
        </style>
        <script>
          window.onerror = function(msg, url, lineNo) {
            window.parent.postMessage({ type: 'CONSOLE_ERROR', message: msg + (lineNo ? ' (line ' + lineNo + ')' : '') }, '*');
            return false;
          };
          console.error = function() {
            var args = Array.prototype.slice.call(arguments);
            window.parent.postMessage({ type: 'CONSOLE_ERROR', message: args.join(' ') }, '*');
          };
          console.log = function() {
            var args = Array.prototype.slice.call(arguments);
            window.parent.postMessage({ type: 'CONSOLE_LOG', message: args.join(' ') }, '*');
          };
        </script>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          const { useState, useEffect, useMemo, useRef, useCallback } = React;
          
          try {
            ${sanitizedCode}

            const ComponentToRender = typeof ${mainComponent} !== 'undefined' ? ${mainComponent} : null;
            if (ComponentToRender) {
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(React.createElement(ComponentToRender));
            } else {
              document.getElementById('root').innerHTML = '<div style="color:#ef4444; padding:12px;">No React component function found to render.</div>';
            }
          } catch(err) {
            window.parent.postMessage({ type: 'COMPILATION_ERROR', message: err.message }, '*');
            document.getElementById('root').innerHTML = '<div style="background:#450a0a; border:1px solid #991b1b; padding:12px; border-radius:8px; color:#fca5a5; font-size:12px; font-family:monospace;">Runtime Exception: ' + err.message + '</div>';
          }
        </script>
      </body>
      </html>
    `;
  }, [code, isRunAllowed]);

  return (
    <div className="h-full flex flex-col bg-slate-950 border-t border-slate-800">
      {/* Header Bar */}
      <div className="h-10 px-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">Interactive Sandboxed Preview</span>
          {isRunAllowed ? (
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
              <CheckCircle className="h-3 w-3" /> Live
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full">
              <AlertCircle className="h-3 w-3" /> Prediction Pending
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isRunAllowed && onRequirePrediction && (
            <button
              onClick={onRequirePrediction}
              className="px-2.5 py-1 text-[11px] font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded transition-colors shadow-sm"
            >
              Open Prediction Checkpoint
            </button>
          )}
          <button
            onClick={handleRefresh}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Reload Preview"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Split: Render Viewport + Console Output */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 min-h-0">
        {/* Render Viewport */}
        <div className="md:col-span-2 relative h-full bg-[#0b0f19] border-r border-slate-800 overflow-hidden">
          <iframe
            key={key}
            srcDoc={srcDoc}
            title="Sandboxed React Preview"
            sandbox="allow-scripts allow-modals"
            className="w-full h-full border-none"
          />
        </div>

        {/* Runtime Console / Diagnostic logs */}
        <div className="h-full bg-slate-950 p-3 overflow-y-auto flex flex-col font-mono text-[11px]">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 font-sans text-xs">
            <span className="font-semibold">Runtime Diagnostics</span>
            <span className="text-[10px] text-slate-500">{logs.length} events</span>
          </div>

          <div className="flex-1 space-y-1.5 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-slate-500 italic text-xs pt-2">
                No runtime warnings or exceptions logged. Output from `console.log` and uncaught exceptions will appear here.
              </p>
            ) : (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded border text-xs leading-relaxed ${
                    log.type === "error"
                      ? "bg-rose-950/40 border-rose-800/60 text-rose-300"
                      : "bg-slate-900 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-70 mb-1">
                    <span>{log.type === "error" ? "RUNTIME ERROR" : "LOG"}</span>
                    <span>{log.time}</span>
                  </div>
                  <div className="break-words whitespace-pre-wrap">{log.text}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
