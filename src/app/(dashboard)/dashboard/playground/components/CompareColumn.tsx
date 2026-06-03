"use client";

// src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx

import type { StreamMetrics } from "@/shared/schemas/playground";
import MarkdownMessage from "./MarkdownMessage";
import ProviderMetrics from "./ProviderMetrics";

export type ColumnStatus = "idle" | "streaming" | "done" | "error";

export interface CompareColumnData {
  id: string;
  model: string;
  status: ColumnStatus;
  metrics: StreamMetrics;
  response: string;
  errorMessage?: string;
}

interface CompareColumnProps {
  column: CompareColumnData;
  onCancel: (id: string) => void;
  onRemove: (id: string) => void;
}

/**
 * CompareColumn — a single column in the Compare tab.
 * Shows the model name, streaming response (via MarkdownMessage), and ProviderMetrics.
 */
export default function CompareColumn({ column, onCancel, onRemove }: CompareColumnProps) {
  const { id, model, status, metrics, response, errorMessage } = column;

  return (
    <div className="flex flex-col h-full border-r border-border last:border-r-0 min-w-0">
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-bg-alt shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {/* Status indicator */}
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              status === "streaming"
                ? "bg-primary animate-pulse"
                : status === "done"
                  ? "bg-green-500"
                  : status === "error"
                    ? "bg-destructive"
                    : "bg-text-muted/30"
            }`}
            aria-label={`Status: ${status}`}
          />
          <span
            className="text-xs font-medium text-text-main truncate"
            title={model}
          >
            {model || <span className="text-text-muted italic">No model</span>}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {status === "streaming" && (
            <button
              onClick={() => onCancel(id)}
              className="text-[10px] px-1.5 py-0.5 rounded border border-border text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Cancel stream"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => onRemove(id)}
            className="p-0.5 rounded text-text-muted hover:text-destructive transition-colors"
            title="Remove column"
            aria-label={`Remove column for ${model}`}
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>
      </div>

      {/* Metrics bar */}
      {(status === "streaming" || status === "done") && (
        <div className="px-3 py-1.5 border-b border-border shrink-0">
          <ProviderMetrics metrics={metrics} />
        </div>
      )}

      {/* Response content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 text-sm">
        {status === "idle" && (
          <p className="text-text-muted text-xs italic">
            Ready to run.
          </p>
        )}

        {status === "error" && (
          <div className="text-destructive text-xs bg-destructive/10 rounded p-2">
            <span className="font-medium">Error: </span>
            {errorMessage ?? "Unknown error occurred."}
          </div>
        )}

        {status === "streaming" && response === "" && (
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <span className="inline-block w-1.5 h-4 bg-primary/60 animate-pulse rounded-sm" />
            Waiting for response…
          </div>
        )}

        {(status === "streaming" || status === "done") && response !== "" && (
          <MarkdownMessage content={response} />
        )}
      </div>
    </div>
  );
}
