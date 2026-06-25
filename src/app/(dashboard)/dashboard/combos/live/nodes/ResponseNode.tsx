"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { FLOW_EDGE_COLORS } from "@/shared/components/flow/edgeStyles";
import type { ComboRunModel } from "../comboFlowModel";

// ── Node data shape ───────────────────────────────────────────────────────

export interface ResponseNodeData {
  label: string;
  outcome: ComboRunModel["outcome"];
  finishedAt?: number;
  [key: string]: unknown;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function getOutcomeColor(outcome: ComboRunModel["outcome"]): string {
  switch (outcome) {
    case "succeeded":
      return FLOW_EDGE_COLORS.active;
    case "exhausted":
      return FLOW_EDGE_COLORS.error;
    case "running":
    default:
      return FLOW_EDGE_COLORS.last;
  }
}

const OUTCOME_LABELS: Record<ComboRunModel["outcome"], string> = {
  succeeded: "succeeded",
  exhausted: "exhausted",
  running: "running…",
};

// ── Component ─────────────────────────────────────────────────────────────

/**
 * ResponseNode — terminal node in the cascade showing:
 * - Overall outcome: succeeded / exhausted / running
 * - Number of fallbacks (targets tried − 1 if succeeded, all if exhausted)
 * - Total latency (derived from finishedAt if available)
 *
 * Has a Left (target) Handle only — no right output.
 */
export function ResponseNode({ data }: NodeProps) {
  const { outcome, finishedAt } = data as ResponseNodeData;
  const color = getOutcomeColor(outcome as ComboRunModel["outcome"]);
  const outcomeLabel = OUTCOME_LABELS[outcome as ComboRunModel["outcome"]] ?? (outcome as string);

  return (
    <div
      className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg border-2 bg-bg transition-all duration-300"
      style={{
        borderColor: color,
        boxShadow: `0 0 10px ${color}30`,
        minWidth: "100px",
      }}
      data-testid="response-node"
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-transparent !border-0 !w-0 !h-0"
      />

      {/* Outcome indicator */}
      <span
        className="text-[10px] font-semibold uppercase tracking-wide"
        style={{ color }}
        data-testid="response-outcome"
      >
        {outcomeLabel}
      </span>

      {/* Finished timestamp */}
      {finishedAt != null && (
        <span className="text-[9px] text-muted font-mono" data-testid="response-finished-at">
          {new Date(finishedAt as number).toLocaleTimeString()}
        </span>
      )}

      {/* Response label */}
      <span className="text-xs font-bold" style={{ color }}>
        Response
      </span>
    </div>
  );
}
