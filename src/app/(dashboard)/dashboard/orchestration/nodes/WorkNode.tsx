"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useTranslations } from "next-intl";
import { StatusDot } from "@/shared/components/flow/StatusDot";
import { orchStateColor, type OrchNode, type OrchState } from "../model/orchestrationTypes";

const STATE_KEY: Record<OrchState, string> = {
  queued: "stateQueued",
  running: "stateRunning",
  waiting_approval: "stateWaitingApproval",
  succeeded: "stateSucceeded",
  failed: "stateFailed",
  cancelled: "stateCancelled",
};
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";

function WorkNodeImpl({ data }: { data: OrchNode }) {
  const t = useTranslations("orchestration");
  const state = data.state ?? "queued";
  const color = orchStateColor(state);
  return (
    <div
      aria-label={`${data.label} — ${t(STATE_KEY[state])}`}
      className="rounded-lg border border-border bg-surface px-3 py-2 min-w-[180px] max-w-[240px]"
      style={{ borderColor: color }}
    >
      <div className="flex items-center gap-2">
        <StatusDot color={color} error={state === "failed"} pulse={state === "running"} />
        <span className="text-xs font-medium truncate">{data.label}</span>
      </div>
      {data.sublabel && (
        <div className="text-[10px] text-muted truncate mt-0.5">{data.sublabel}</div>
      )}
      <div className="text-[10px] mt-1" style={{ color }}>
        {t(STATE_KEY[state])}
      </div>
      {data.mirrorOf && <div className="text-[9px] text-muted mt-0.5">{t("mirroredInA2A")}</div>}
      <Handle type="target" position={Position.Top} className={HANDLE} />
      <Handle type="source" position={Position.Bottom} className={HANDLE} />
    </div>
  );
}

export const WorkNode = memo(WorkNodeImpl);
WorkNode.displayName = "WorkNode";
