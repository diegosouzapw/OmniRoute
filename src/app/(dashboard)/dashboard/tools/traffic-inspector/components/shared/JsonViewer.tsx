"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/cn";

interface JsonViewerProps {
  data: unknown;
  depth?: number;
  className?: string;
}

function JsonNode({ data, depth = 0 }: { data: unknown; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);

  if (data === null) return <span className="text-text-muted">null</span>;
  if (typeof data === "boolean") return <span className="text-amber-400">{String(data)}</span>;
  if (typeof data === "number") return <span className="text-blue-400">{String(data)}</span>;
  if (typeof data === "string") return <span className="text-green-400">&quot;{data}&quot;</span>;

  if (Array.isArray(data)) {
    if (data.length === 0) return <span className="text-text-muted">[]</span>;
    return (
      <span>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="text-text-muted hover:text-text-main font-mono text-xs focus-ring rounded"
        >
          {expanded ? "▼" : "▶"} [{data.length}]
        </button>
        {expanded && (
          <div className="ml-4 border-l border-border pl-2">
            {data.map((item, i) => (
              <div key={i} className="flex gap-1 text-xs font-mono">
                <span className="text-text-muted">{i}:</span>
                <JsonNode data={item} depth={depth + 1} />
                {i < data.length - 1 && <span className="text-text-muted">,</span>}
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  if (typeof data === "object" && data !== null) {
    const entries = Object.entries(data as Record<string, unknown>);
    if (entries.length === 0) return <span className="text-text-muted">{"{}"}</span>;
    return (
      <span>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="text-text-muted hover:text-text-main font-mono text-xs focus-ring rounded"
        >
          {expanded ? "▼" : "▶"} {"{"}
          {entries.length}
          {"}"}
        </button>
        {expanded && (
          <div className="ml-4 border-l border-border pl-2">
            {entries.map(([k, v], i) => (
              <div key={k} className="flex gap-1 text-xs font-mono">
                <span className="text-text-main">&quot;{k}&quot;</span>
                <span className="text-text-muted">:</span>
                <JsonNode data={v} depth={depth + 1} />
                {i < entries.length - 1 && <span className="text-text-muted">,</span>}
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  return <span className="text-text-main font-mono text-xs">{String(data)}</span>;
}

export function JsonViewer({ data, className }: JsonViewerProps) {
  return (
    <div className={cn("overflow-auto font-mono text-xs", className)}>
      <JsonNode data={data} depth={0} />
    </div>
  );
}
