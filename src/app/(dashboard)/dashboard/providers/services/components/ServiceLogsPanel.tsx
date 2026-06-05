"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { useServiceLogs } from "../hooks/useServiceLogs";
import type { LogLine } from "../hooks/useServiceLogs";

interface ServiceLogsPanelProps {
  name: string;
}

function LogLineRow({ line }: { line: LogLine }) {
  const ts = new Date(line.ts).toLocaleTimeString("en", { hour12: false });
  return (
    <div className="flex gap-2 text-[11px] leading-5 font-mono hover:bg-bg-subtle/50 px-2">
      <span className="text-text-muted shrink-0 select-none">{ts}</span>
      <span
        className={cn(
          "text-text-muted shrink-0 select-none",
          line.stream === "stderr" && "text-red-400 dark:text-red-400"
        )}
      >
        {line.stream === "stderr" ? "ERR" : "OUT"}
      </span>
      <span className="break-all">{line.line}</span>
    </div>
  );
}

export function ServiceLogsPanel({ name }: ServiceLogsPanelProps) {
  const [filterInput, setFilterInput] = useState("");
  const { lines, isPaused, togglePause, clear, setFilter } = useServiceLogs(name, { tail: 200 });
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new lines unless paused
  useEffect(() => {
    if (!isPaused) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lines, isPaused]);

  function applyFilter(val: string) {
    setFilterInput(val);
    setFilter(val);
  }

  function downloadLogs() {
    const text = lines
      .map((l) => `${new Date(l.ts).toISOString()} [${l.stream}] ${l.line}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name}-logs.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-bg-subtle">
        <input
          type="text"
          placeholder="Filter logs…"
          value={filterInput}
          onChange={(e) => applyFilter(e.target.value)}
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-text-muted min-w-0"
        />
        <button
          type="button"
          onClick={togglePause}
          className="text-xs text-text-muted hover:text-text-primary shrink-0"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          type="button"
          onClick={clear}
          className="text-xs text-text-muted hover:text-text-primary shrink-0"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={downloadLogs}
          className="text-xs text-text-muted hover:text-text-primary shrink-0"
        >
          Download
        </button>
      </div>
      <div className="h-80 overflow-y-auto bg-bg-main py-1">
        {lines.length === 0 ? (
          <p className="text-xs text-text-muted px-4 py-4">No log output yet.</p>
        ) : (
          lines.map((l, i) => <LogLineRow key={i} line={l} />)
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
