"use client";

import { useEffect, useMemo, useState } from "react";
import type { NodeTypes } from "@xyflow/react";
import { FlowCanvas } from "@/shared/components/flow/FlowCanvas";
import {
  comboRunToFlow,
  reduceComboEvent,
  type ComboRunModel,
  type ComboEventInput,
} from "./comboFlowModel";
import { aggregateComboEventsToSets } from "./fleetAggregation";
import { StrategyNode } from "./nodes/StrategyNode";
import { ProviderCascadeNode } from "./nodes/ProviderCascadeNode";
import { ResponseNode } from "./nodes/ResponseNode";
import { RequestNode } from "./nodes/RequestNode";

// ── Node type map ─────────────────────────────────────────────────────────
//
// comboRunToFlow (comboFlowModel.ts) emits exactly these `type` strings:
//   "request"  → entry node (RequestNode)
//   "strategy" → routing strategy pill (StrategyNode)
//   "target"   → one per combo target (ProviderCascadeNode)
//   "response" → terminal outcome node (ResponseNode)

const NODE_TYPES: NodeTypes = {
  request: RequestNode as unknown as NodeTypes["request"],
  strategy: StrategyNode as unknown as NodeTypes["strategy"],
  target: ProviderCascadeNode as unknown as NodeTypes["target"],
  response: ResponseNode as unknown as NodeTypes["response"],
};

// ── Fleet overview ────────────────────────────────────────────────────────

const FLEET_WINDOW_MS = 60_000; // 1-minute rolling window

interface FleetOverviewProps {
  comboEvents: ComboEventInput[];
}

function FleetOverview({ comboEvents }: FleetOverviewProps) {
  // `now` must advance, or the 60s rolling window freezes at mount and aging
  // events are never re-classified out of "active". A low-frequency tick rolls it.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 5_000);
    return () => clearInterval(id);
  }, []);
  const sets = useMemo(
    () => aggregateComboEventsToSets(comboEvents, FLEET_WINDOW_MS, now),
    [comboEvents, now]
  );

  const total = sets.active.size + sets.error.size + sets.last.size;

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted">
        <span className="text-2xl opacity-40">⌁</span>
        <p className="text-sm">No providers observed yet.</p>
        <p className="text-xs opacity-60">Fleet data arrives via live combo events.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-4 h-full overflow-auto" data-testid="fleet-overview">
      {sets.active.size > 0 && (
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-muted mb-1.5">
            Active ({sets.active.size})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[...sets.active].map((p) => (
              <span
                key={p}
                className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: "#22c55e20", color: "#22c55e" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
      {sets.error.size > 0 && (
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-muted mb-1.5">
            Errors ({sets.error.size})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[...sets.error].map((p) => (
              <span
                key={p}
                className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: "#ef444420", color: "#ef4444" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
      {sets.last.size > 0 && (
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-muted mb-1.5">
            Inactive ({sets.last.size})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[...sets.last].map((p) => (
              <span
                key={p}
                className="text-[11px] px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--color-border)",
                  color: "var(--color-text-muted)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-3 text-muted"
      data-testid="combo-live-studio-empty"
    >
      <span className="text-3xl opacity-40">⌁</span>
      <p className="text-sm">No combo run available.</p>
      <p className="text-xs opacity-60">Live data arrives via the WS combo channel.</p>
    </div>
  );
}

// ── Disconnected banner ───────────────────────────────────────────────────

function DisconnectedBanner() {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-bg/80 text-xs text-muted shrink-0"
      data-testid="combo-disconnected-banner"
    >
      <span className="text-amber-500 font-semibold">●</span>
      <span>Live disabled — WebSocket disconnected. Showing last known state.</span>
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────

export interface ComboLiveStudioProps {
  /**
   * If provided, renders this run directly (static / test mode — no WS dependency).
   * Mirror of how CompressionCockpit accepts `run?`.
   */
  run?: ComboRunModel | null;
  /**
   * All raw combo events used to (a) populate the combo selector and
   * (b) fold into a run for the selected combo.
   * In live mode, callers supply events from `useLiveComboStatus().comboEvents`.
   */
  comboEvents?: ComboEventInput[];
  /**
   * Available combo names for the combo selector.
   * Defaults to the unique comboNames found in `comboEvents`.
   */
  combos?: string[];
  /**
   * Whether the WebSocket connection is live. Defaults to true.
   * When false, shows the "Live disabled" banner.
   */
  isConnected?: boolean;
}

// ── Main component ────────────────────────────────────────────────────────

/**
 * ComboLiveStudio — Tela B: Combo/Routing Studio.
 *
 * Renders the combo routing cascade as a ReactFlow canvas:
 *   Request → StrategyNode → [ProviderCascadeNode × N] → ResponseNode
 *
 * Features:
 * - Combo selector: picks which combo's latest run to display.
 * - Single ⇄ Fleet toggle: Single = cascade flow; Fleet = radial provider
 *   aggregation over all `comboEvents` (last 60 s).
 * - Graceful empty state when no run is available.
 * - "Live disabled" banner when `isConnected` is false.
 *
 * Testable with a static `run` prop — no WS required.
 */
export function ComboLiveStudio({
  run: runProp,
  comboEvents = [],
  combos: combosProp,
  isConnected = true,
}: ComboLiveStudioProps) {
  const [mode, setMode] = useState<"single" | "fleet">("single");
  const [selectedCombo, setSelectedCombo] = useState<string>("");

  // Derive combo list from events when not supplied explicitly
  const comboOptions = useMemo<string[]>(() => {
    if (combosProp) return combosProp;
    const seen = new Set<string>();
    for (const ev of comboEvents) seen.add(ev.comboName);
    return [...seen];
  }, [combosProp, comboEvents]);

  // Build the displayed run: static prop wins; otherwise fold live events
  const displayRun = useMemo<ComboRunModel | null>(() => {
    if (runProp !== undefined) return runProp ?? null;

    if (!selectedCombo) return null;

    const eventsForCombo = comboEvents
      .filter((e) => e.comboName === selectedCombo)
      .sort((a, b) => a.timestamp - b.timestamp);

    if (eventsForCombo.length === 0) return null;

    return eventsForCombo.reduce<ComboRunModel | null>(
      (acc, ev) => reduceComboEvent(acc, ev),
      null
    );
  }, [runProp, selectedCombo, comboEvents]);

  // Build ReactFlow graph from the current run
  const { nodes, edges } = useMemo(() => {
    if (!displayRun) return { nodes: [], edges: [] };
    return comboRunToFlow(displayRun);
  }, [displayRun]);

  const fitKey = displayRun
    ? `${displayRun.comboName}-${displayRun.targets.length}-${displayRun.outcome}`
    : "empty";

  // Whether to show the combo selector (hidden when a static run prop is given)
  const showSelector = runProp === undefined;

  return (
    <div className="flex flex-col h-full gap-2" data-testid="combo-live-studio">
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-bg/60 shrink-0 flex-wrap">
        {showSelector && (
          <select
            className="text-xs border border-border rounded px-2 py-1 bg-bg text-muted"
            value={selectedCombo}
            onChange={(e) => setSelectedCombo(e.target.value)}
            aria-label="Select combo"
            data-testid="combo-selector"
          >
            <option value="">— select combo —</option>
            {comboOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        )}

        {displayRun && (
          <>
            <span className="text-xs font-mono text-muted truncate">{displayRun.comboName}</span>
            {displayRun.strategy && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                style={{ backgroundColor: "#6366f120", color: "#6366f1" }}
              >
                {displayRun.strategy}
              </span>
            )}
            <span className="text-xs text-muted">
              {displayRun.targets.length} target{displayRun.targets.length !== 1 ? "s" : ""}
            </span>
            <span
              className="text-xs font-bold"
              style={{
                color:
                  displayRun.outcome === "succeeded"
                    ? "#22c55e"
                    : displayRun.outcome === "exhausted"
                      ? "#ef4444"
                      : "#f59e0b",
              }}
              data-testid="run-outcome"
            >
              {displayRun.outcome}
            </span>
          </>
        )}

        {/* Single ⇄ Fleet toggle */}
        <div className="ml-auto flex items-center border border-border rounded overflow-hidden text-xs">
          <button
            className="px-2.5 py-1 transition-colors"
            style={{
              background: mode === "single" ? "var(--color-primary)" : "transparent",
              color: mode === "single" ? "#fff" : "var(--color-text-muted)",
            }}
            onClick={() => setMode("single")}
            data-testid="mode-single"
          >
            Single
          </button>
          <button
            className="px-2.5 py-1 transition-colors"
            style={{
              background: mode === "fleet" ? "var(--color-primary)" : "transparent",
              color: mode === "fleet" ? "#fff" : "var(--color-text-muted)",
            }}
            onClick={() => setMode("fleet")}
            data-testid="mode-fleet"
          >
            Fleet
          </button>
        </div>
      </div>

      {/* ── Disconnected banner ───────────────────────────────────────────── */}
      {!isConnected && <DisconnectedBanner />}

      {/* ── Main canvas area ─────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 rounded-lg overflow-hidden border border-border">
        {mode === "fleet" ? (
          <FleetOverview comboEvents={comboEvents} />
        ) : displayRun ? (
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            fitKey={fitKey}
            className="h-full w-full"
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

export default ComboLiveStudio;
