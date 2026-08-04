"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

// ── Node data shape ───────────────────────────────────────────────────────

export interface RequestNodeData {
  label: string;
  comboName: string;
  [key: string]: unknown;
}

// ── Component ─────────────────────────────────────────────────────────────

/**
 * RequestNode — entry node in the combo cascade flow graph.
 * Shows "Request" label + the combo name. Source handle on the Right.
 */
export function RequestNode({ data }: NodeProps) {
  const { comboName } = data as RequestNodeData;
  const color = "#6366f1"; // indigo — matches IoNode input color

  return (
    <div
      className="rounded-xl border-2 bg-bg px-4 py-3 min-w-[110px] text-center transition-all duration-200"
      style={{
        borderColor: color,
        boxShadow: `0 0 12px ${color}25`,
      }}
      data-testid="request-node"
    >
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-transparent !border-0 !w-0 !h-0"
      />

      <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color }}>
        Request
      </div>
      <div
        className="text-[11px] font-mono text-muted truncate max-w-[130px]"
        title={comboName as string}
      >
        {comboName as string}
      </div>
    </div>
  );
}

export default RequestNode;
