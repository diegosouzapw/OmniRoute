"use client";
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useTranslations } from "next-intl";
import {
  ORCH_STATES,
  orchStateColor,
  orchStateBadgeBg,
  type OrchNode,
} from "../model/orchestrationTypes";
const HANDLE = "!bg-transparent !border-0 !w-0 !h-0";
const LABEL_KEY: Record<string, string> = {
  "cloud-agent": "sourceCloudAgent",
  a2a: "sourceA2A",
  conductor: "sourceConductor",
};

function SourceNodeImpl({ data }: { data: OrchNode }) {
  const t = useTranslations("orchestration");
  const stale = data.sourceIssue === "error"; // set by mergeSnapshot for failed sources
  const collapsed = !!data.collapsed; // set by orchestrationToFlow's opts.collapsed
  const label = data.source && LABEL_KEY[data.source] ? t(LABEL_KEY[data.source]) : data.label;
  // Formatting a prop, not sampling the clock during render (react-hooks/purity) —
  // `data.staleSince` is a snapshot value set once by mergeSnapshot, not `Date.now()`.
  const since =
    data.staleSince && Number.isFinite(Date.parse(data.staleSince))
      ? new Date(data.staleSince).toLocaleTimeString()
      : "—";
  return (
    <div
      className={`rounded-lg border bg-surface px-3 py-2 min-w-[150px] ${stale ? "opacity-70 border-warning" : "border-border"}`}
      aria-label={label}
      aria-expanded={!collapsed}
      title={t(collapsed ? "sourceExpand" : "sourceCollapse")}
    >
      <div className="text-xs font-semibold flex items-center gap-1.5">
        <span aria-hidden>{collapsed ? "▸" : "▾"}</span>
        {stale && <span aria-hidden>⚠</span>}
        {label}
      </div>
      {stale && <div className="text-[10px] text-warning">{t("sourceStale", { since })}</div>}
      {data.sourceIssue === "offline" && (
        <div className="text-[10px] text-muted">{t("sourceOffline")}</div>
      )}
      <div className="flex flex-wrap gap-1 mt-1">
        {ORCH_STATES.filter((s) => (data.counts?.[s] ?? 0) > 0).map((s) => (
          <span
            key={s}
            className="text-[9px] px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: orchStateBadgeBg(s), color: orchStateColor(s) }}
          >
            {data.counts?.[s]}
          </span>
        ))}
      </div>
      <Handle type="target" position={Position.Top} className={HANDLE} />
      <Handle type="source" position={Position.Bottom} className={HANDLE} />
    </div>
  );
}

export const SourceNode = memo(SourceNodeImpl);
SourceNode.displayName = "SourceNode";
