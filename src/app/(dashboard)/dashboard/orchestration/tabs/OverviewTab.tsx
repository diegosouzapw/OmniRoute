"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { aggregateComboEventsToSets } from "@/app/(dashboard)/dashboard/combos/live/fleetAggregation";
import type { ComboEventInput } from "@/app/(dashboard)/dashboard/combos/live/comboFlowModel";
import { overviewProjection } from "../model/overviewProjection";
import {
  orchStateColor,
  type OrchNode,
  type OrchSnapshot,
  type OrchState,
} from "../model/orchestrationTypes";

const STATE_KEY: Record<OrchState, string> = {
  queued: "stateQueued",
  running: "stateRunning",
  waiting_approval: "stateWaitingApproval",
  succeeded: "stateSucceeded",
  failed: "stateFailed",
  cancelled: "stateCancelled",
};
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function formatElapsed(ms: number): string {
  if (!Number.isFinite(ms)) return "—";
  const s = Math.max(0, Math.floor(ms / 1000));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

function Card({
  node,
  now,
  onClick,
  onSeeInGraph,
  t,
}: {
  node: OrchNode;
  now: number;
  onClick: () => void;
  onSeeInGraph: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const color = node.state ? orchStateColor(node.state) : undefined;
  return (
    <div
      data-orch-card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="rounded-lg border border-border bg-surface p-2.5 text-xs cursor-pointer hover:border-primary/50"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium truncate">{node.label}</span>
        <span className="text-[9px] uppercase text-muted shrink-0">{node.source}</span>
      </div>
      {node.sublabel && <div className="text-[10px] text-muted truncate">{node.sublabel}</div>}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[10px]" style={{ color }}>
          {node.state && t(STATE_KEY[node.state])}
          {node.startedAt &&
            !node.endedAt &&
            ` · ${formatElapsed(now - Date.parse(node.startedAt))}`}
          {node.cost != null && ` · ${usd.format(node.cost)}`}
        </span>
        <button
          className="text-[10px] underline text-muted"
          onClick={(e) => {
            e.stopPropagation();
            onSeeInGraph();
          }}
        >
          {t("actionSeeInGraph")}
        </button>
      </div>
    </div>
  );
}

export function OverviewTab({
  snapshot,
  comboEvents,
  onCardClick,
  onSeeInGraph,
}: {
  snapshot: OrchSnapshot;
  comboEvents: ComboEventInput[];
  onCardClick: (id: string) => void;
  onSeeInGraph: (id: string) => void;
}) {
  const t = useTranslations("orchestration");
  const [filter, setFilter] = useState<OrchState | null>(null);
  // `now` must advance, or the 60s combo-active window and the per-card elapsed
  // timer both freeze at mount. Sampling `Date.now()` directly during render (or
  // inside a `useMemo` factory) trips `react-hooks/purity` — a low-frequency tick
  // (mirrors `ComboLiveStudio.tsx`'s `FleetOverview`) keeps both correct instead.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 5_000);
    return () => clearInterval(id);
  }, []);
  const comboActive = useMemo(
    () => aggregateComboEventsToSets(comboEvents, 60_000, now).active.size,
    [comboEvents, now]
  );
  const { counts, columns } = useMemo(
    () => overviewProjection(snapshot, comboActive),
    [snapshot, comboActive]
  );
  const visible = (list: OrchNode[]) => (filter ? list.filter((n) => n.state === filter) : list);

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-auto">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {(Object.keys(counts) as OrchState[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(filter === s ? null : s)}
            className={`rounded-lg border p-2 text-center ${filter === s ? "border-primary" : "border-border"}`}
          >
            <div className="text-lg font-semibold" style={{ color: orchStateColor(s) }}>
              {counts[s]}
            </div>
            <div className="text-[10px] text-muted">{t(STATE_KEY[s])}</div>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
        {(["queued", "running", "waiting_approval", "done"] as const).map((col) => (
          <div key={col} className="flex flex-col gap-2">
            <div className="text-[10px] font-semibold uppercase text-muted">
              {col === "done"
                ? `${t("stateSucceeded")} / ${t("stateFailed")} / ${t("stateCancelled")}`
                : t(STATE_KEY[col])}
            </div>
            {visible(columns[col]).map((n) => (
              <Card
                key={n.id}
                node={n}
                now={now}
                t={t}
                onClick={() => onCardClick(n.id)}
                onSeeInGraph={() => onSeeInGraph(n.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
