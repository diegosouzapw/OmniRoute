"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

// ── Node data shapes ──────────────────────────────────────────────────────

export interface IoNodeData {
  variant: "input" | "output";
  tokens: number;
  savingsPercent?: number;
  label?: string;
  [key: string]: unknown;
}

// ── Component ─────────────────────────────────────────────────────────────

export function IoNode({ data }: NodeProps) {
  const { variant, tokens, savingsPercent } = data as IoNodeData;

  const isInput = variant === "input";
  const color = isInput ? "#6366f1" : "#22c55e"; // indigo for input, green for output

  return (
    <div
      className="rounded-xl border-2 bg-bg px-4 py-3 min-w-[120px] text-center transition-all duration-200"
      style={{
        borderColor: color,
        boxShadow: `0 0 12px ${color}25`,
      }}
    >
      {/* Input only uses source handle; Output only uses target handle */}
      {isInput ? (
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-transparent !border-0 !w-0 !h-0"
        />
      ) : (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-transparent !border-0 !w-0 !h-0"
        />
      )}

      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color }}>
        {isInput ? "Input" : "Output"}
      </div>

      <div className="text-base font-bold" style={{ color }}>
        {(tokens as number).toLocaleString()}
      </div>
      <div className="text-[10px] text-muted">tokens</div>

      {!isInput && savingsPercent != null && (
        <div
          className="mt-1 text-[11px] font-semibold"
          style={{ color: "#22c55e" }}
          data-testid="io-savings-percent"
        >
          {`-${(savingsPercent as number).toFixed(1)}%`}
        </div>
      )}
    </div>
  );
}

export default IoNode;
