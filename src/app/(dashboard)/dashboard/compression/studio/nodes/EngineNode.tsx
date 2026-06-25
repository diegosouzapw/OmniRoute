"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { StatusDot } from "@/shared/components/flow/StatusDot";

// ── Layer pill color map (10-layer model) ─────────────────────────────────

const LAYER_COLORS: Record<string, string> = {
  L1: "#3b82f6", // prose — blue
  L3: "#f97316", // tool — orange
  L4: "#22c55e", // code — green
  L5: "#a855f7", // MCP — purple
  L6: "#9ca3af", // history — gray
  L9: "#ec4899", // pruning — pink
};

/** Map engine name → layer tags for the pill display */
const ENGINE_LAYER_MAP: Record<string, string[]> = {
  rtk: ["L3", "L4"],
  caveman: ["L1"],
  headroom: ["L3"],
  llmlingua: ["L9"],
  lite: ["L1"],
  sigmap: ["L1", "L3"],
  gcf: ["L4"],
  cocoindex: ["L5", "L6"],
  "caveman:full": ["L1"],
  "rtk:standard": ["L3", "L4"],
};

function getSavingsColor(savingsPercent: number): string {
  if (savingsPercent >= 30) return "#22c55e";
  if (savingsPercent >= 15) return "#f59e0b";
  return "#6b7280";
}

// ── Node data shape ───────────────────────────────────────────────────────

export interface EngineNodeData {
  engine: string;
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  techniquesUsed: string[];
  rulesApplied?: string[];
  durationMs?: number;
  /** visual replay state */
  stepState?: "pending" | "running" | "done" | "skipped";
  label?: string;
  [key: string]: unknown;
}

// ── Component ─────────────────────────────────────────────────────────────

export function EngineNode({ data }: NodeProps) {
  const {
    engine,
    originalTokens,
    compressedTokens,
    savingsPercent,
    techniquesUsed,
    durationMs,
    stepState = "done",
  } = data as EngineNodeData;

  const skipped = stepState === "skipped" || originalTokens === compressedTokens;
  const running = stepState === "running";
  const color = getSavingsColor(savingsPercent as number);
  const layers = ENGINE_LAYER_MAP[engine as string] ?? [];
  const savings = savingsPercent as number;
  const tokIn = originalTokens as number;
  const tokOut = compressedTokens as number;
  const techniques = (techniquesUsed as string[]).slice(0, 2);

  const borderColor = skipped ? "var(--color-border)" : running ? "#f59e0b" : color;

  return (
    <div
      className="rounded-lg border-2 bg-bg transition-all duration-300 min-w-[150px] max-w-[180px]"
      style={{
        borderColor,
        boxShadow: running ? `0 0 14px #f59e0b40` : skipped ? "none" : `0 0 10px ${color}30`,
      }}
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

      {/* Header */}
      <div
        className="flex items-center gap-1.5 px-2.5 pt-2 pb-1"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        {running && <StatusDot color="#f59e0b" sizeClass="size-1.5" />}
        <span className="text-xs font-semibold truncate flex-1" title={engine as string}>
          {engine as string}
        </span>
        {skipped && <span className="text-[10px] text-muted px-1 rounded bg-muted/10">skip</span>}
      </div>

      {/* Body — token bar */}
      {!skipped && (
        <div className="px-2.5 py-1.5">
          <div className="flex justify-between text-[10px] text-muted mb-0.5">
            <span>{tokIn.toLocaleString()}</span>
            <span>→</span>
            <span>{tokOut.toLocaleString()}</span>
          </div>
          <div className="relative h-1.5 rounded-full overflow-hidden bg-border">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: tokIn > 0 ? `${(tokOut / tokIn) * 100}%` : "100%",
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-2.5 pb-2 pt-1 flex flex-col gap-0.5">
        {!skipped && (
          <span className="text-[11px] font-bold" style={{ color }} data-testid="savings-percent">
            {`-${savings.toFixed(1)}%`}
          </span>
        )}
        {techniques.length > 0 && (
          <span
            className="text-[9px] text-muted truncate"
            title={(techniquesUsed as string[]).join(", ")}
          >
            {techniques.join(", ")}
          </span>
        )}
        {durationMs != null && (
          <span className="text-[9px] text-muted">{(durationMs as number).toFixed(1)}ms</span>
        )}
        {/* Layer pills */}
        {layers.length > 0 && (
          <div className="flex gap-0.5 flex-wrap mt-0.5">
            {layers.map((layer) => (
              <span
                key={layer}
                className="text-[9px] px-1 rounded-sm font-medium"
                style={{
                  backgroundColor: `${LAYER_COLORS[layer] ?? "#6b7280"}22`,
                  color: LAYER_COLORS[layer] ?? "#6b7280",
                }}
              >
                {layer}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
