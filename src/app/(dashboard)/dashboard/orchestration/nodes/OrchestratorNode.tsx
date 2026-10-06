"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { OrchNode } from "../model/orchestrationTypes";
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

function OrchestratorNodeImpl({ data }: { data: OrchNode }) {
  return (
    <div
      className="rounded-xl border-2 border-primary bg-surface px-5 py-3 text-sm font-semibold"
      aria-label={data.label}
    >
      {data.label}
      <Handle type="source" position={Position.Bottom} className={HANDLE} />
    </div>
  );
}

export const OrchestratorNode = memo(OrchestratorNodeImpl);
OrchestratorNode.displayName = "OrchestratorNode";
