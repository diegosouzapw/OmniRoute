"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

// ── Strategy color map ────────────────────────────────────────────────────

const STRATEGY_COLORS: Record<string, string> = {
  priority: "#3b82f6",
  weighted: "#8b5cf6",
  "round-robin": "#06b6d4",
  "fill-first": "#f59e0b",
  p2c: "#10b981",
  random: "#6b7280",
  "least-used": "#84cc16",
  "cost-optimized": "#22c55e",
  "reset-aware": "#f97316",
  "reset-window": "#f97316",
  "strict-random": "#a855f7",
  auto: "#6366f1",
  lkgp: "#ec4899",
  "context-optimized": "#14b8a6",
  "context-relay": "#0ea5e9",
};

function getStrategyColor(strategy: string): string {
  return STRATEGY_COLORS[strategy] ?? "#6b7280";
}

// ── Node data shape ───────────────────────────────────────────────────────

export interface StrategyNodeData {
  label: string;
  strategy: string;
  targetCount: number;
  [key: string]: unknown;
}

// ── Component ─────────────────────────────────────────────────────────────

/**
 * StrategyNode — pill that shows the combo routing strategy + target count.
 * Custom ReactFlow node with Left/Right Handles (left = source from request,
 * right = target into first provider cascade).
 */
export function StrategyNode({ data }: NodeProps) {
  const { strategy, targetCount } = data as StrategyNodeData;
  const color = getStrategyColor(strategy as string);
  const label = (strategy as string) || "combo";
  const count = targetCount as number;

  return (
    <div
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-full border-2 bg-bg transition-all duration-300"
      style={{
        borderColor: color,
        boxShadow: `0 0 10px ${color}30`,
        minWidth: "110px",
      }}
      data-testid="strategy-node"
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-transparent !border-0 !w-0 !h-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !border-0 !w-0 !h-0"
      />

      <span
        className="text-xs font-semibold uppercase tracking-wide truncate"
        style={{ color }}
        data-testid="strategy-label"
      >
        {label}
      </span>
      {count > 0 && (
        <span
          className="text-[10px] font-mono px-1.5 rounded-full"
          style={{ backgroundColor: `${color}20`, color }}
          data-testid="strategy-target-count"
        >
          {count} target{count !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

export default StrategyNode;
