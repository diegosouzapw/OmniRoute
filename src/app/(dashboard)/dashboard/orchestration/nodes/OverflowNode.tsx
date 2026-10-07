"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useTranslations } from "next-intl";
import { ORCH_STATES, orchStateColor, type OrchNode } from "../model/orchestrationTypes";
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

function OverflowNodeImpl({ data }: { data: OrchNode }) {
  const t = useTranslations("orchestration");
  const count = Object.values(data.counts ?? {}).reduce((a, b) => a + (b ?? 0), 0);
  return (
    <div
      className="rounded-lg border border-dashed border-border bg-surface/60 px-3 py-2 text-xs text-muted cursor-pointer"
      aria-label={t("overflowMore", { count })}
    >
      {t("overflowMore", { count })}
      <div className="flex gap-1 mt-1">
        {ORCH_STATES.filter((s) => (data.counts?.[s] ?? 0) > 0).map((s) => (
          <span key={s} className="text-[9px]" style={{ color: orchStateColor(s) }}>
            {data.counts?.[s]}
          </span>
        ))}
      </div>
      <Handle type="target" position={Position.Top} className={HANDLE} />
    </div>
  );
}

export const OverflowNode = memo(OverflowNodeImpl);
OverflowNode.displayName = "OverflowNode";
