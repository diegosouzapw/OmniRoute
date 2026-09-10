"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { OrchNode } from "../model/orchestrationTypes";
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

function ActivityNodeImpl({ data }: { data: OrchNode }) {
  return (
    <div
      className="rounded border border-border/60 bg-surface/80 px-2.5 py-1.5 max-w-[220px] text-[10px] italic text-muted"
      aria-label={data.label}
    >
      <span className="not-italic font-mono text-[9px] mr-1">{data.sublabel}</span>
      <span className="truncate">{data.label}</span>
      <Handle type="target" position={Position.Top} className={HANDLE} />
    </div>
  );
}

export const ActivityNode = memo(ActivityNodeImpl);
ActivityNode.displayName = "ActivityNode";
