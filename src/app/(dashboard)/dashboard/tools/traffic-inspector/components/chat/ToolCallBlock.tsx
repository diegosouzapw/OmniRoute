"use client";

import { useState } from "react";
import { JsonViewer } from "../shared/JsonViewer";

interface ToolCallBlockProps {
  id: string;
  name: string;
  input: unknown;
}

export function ToolCallBlock({ id, name, input }: ToolCallBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded border border-amber-500/40 bg-amber-900/20 px-3 py-2 text-sm">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center gap-2 text-left focus-ring rounded"
      >
        <span className="material-symbols-outlined text-[14px] text-amber-400" aria-hidden="true">
          {expanded ? "expand_less" : "expand_more"}
        </span>
        <span className="text-amber-300 font-mono font-medium">{name}</span>
        <span className="text-text-muted text-xs font-mono ml-auto">{id.slice(0, 8)}</span>
      </button>
      {expanded && (
        <div className="mt-2 border-t border-amber-500/20 pt-2">
          <JsonViewer data={input} />
        </div>
      )}
    </div>
  );
}
