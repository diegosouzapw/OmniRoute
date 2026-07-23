"use client";

import { useState } from "react";
import { JsonViewer } from "../shared/JsonViewer";

interface ToolResultBlockProps {
  toolUseId: string;
  content: unknown;
}

export function ToolResultBlock({ toolUseId, content }: ToolResultBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded border border-green-500/40 bg-green-900/20 px-3 py-2 text-sm">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center gap-2 text-left focus-ring rounded"
      >
        <span className="material-symbols-outlined text-[14px] text-green-400" aria-hidden="true">
          {expanded ? "expand_less" : "expand_more"}
        </span>
        <span className="text-green-300 font-mono font-medium text-xs">tool_result</span>
        <span className="text-text-muted text-xs font-mono ml-auto">{toolUseId.slice(0, 8)}</span>
      </button>
      {expanded && (
        <div className="mt-2 border-t border-green-500/20 pt-2">
          <JsonViewer data={content} />
        </div>
      )}
    </div>
  );
}
