"use client";
/**
 * History tab — Airflow-grid style view over PERSISTED runs (A2A task history from Task C3's
 * `GET /api/a2a/tasks/history`, plus the existing in-memory `GET /api/v1/agents/tasks` for
 * Cloud Agent). Conductor is intentionally absent — its runs are remote and not persisted
 * locally, surfaced to the operator via the `historyConductorNote` banner instead of silently
 * omitted.
 *
 * Selection here (`selected`) is LOCAL component state, NOT the page's `?node=` URL param:
 * `useOrchUrlState`'s `?node=` resolves against the LIVE orchestration snapshot
 * (`useOrchestrationSnapshot`), and a finished/historical run generally does not exist in that
 * snapshot any more (or, for A2A, might exist only via the persisted-history fallback added in
 * C3) — so there is nothing for `?node=` to look up on a page refresh/deep link into this tab.
 * The live snapshot's `OrchestrationToolbar` filters (search/state/source/provider chips) also
 * do not apply here — this tab fetches its own two sources directly, over its own preset time
 * range, independent of the live snapshot filter pipeline.
 */
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { OrchestrationDrawer } from "../drawer/OrchestrationDrawer";
import { orchStateColor, type OrchNode, type OrchState } from "../model/orchestrationTypes";
import {
  buildHistoryGrid,
  historyItemFromA2A,
  historyItemFromCloudAgent,
  historyRangeFromPreset,
  type HistoryGrid,
  type HistoryItem,
} from "../model/historyModel";
import type { CloudAgentTask } from "@/lib/cloudAgent/types";

type Preset = "1d" | "7d" | "30d";
type SourceKind = "a2a" | "cloud-agent";

const PRESETS: Preset[] = ["1d", "7d", "30d"];
const PRESET_KEY: Record<Preset, string> = {
  "1d": "historyRange1d",
  "7d": "historyRange7d",
  "30d": "historyRange30d",
};
// Column count per preset — hourly slices for the 1-day view, daily slices otherwise.
const BUCKET_COUNT: Record<Preset, number> = { "1d": 24, "7d": 7, "30d": 30 };
// i18n key per source/state — resolved through `t()` inside the component (never at module
// scope, where no translator exists). `SOURCE_KEY` mirrors `OrchestrationToolbar.tsx:25`
// (minus `conductor`, which this tab never lists) and `STATE_KEY` mirrors
// `drawer/OrchestrationDrawer.tsx:35` / `tabs/OverviewTab.tsx:14`.
const SOURCE_KEY: Record<SourceKind, string> = {
  a2a: "sourceA2A",
  "cloud-agent": "sourceCloudAgent",
};
const STATE_KEY: Record<OrchState, string> = {
  queued: "stateQueued",
  running: "stateRunning",
  waiting_approval: "stateWaitingApproval",
  succeeded: "stateSucceeded",
  failed: "stateFailed",
  cancelled: "stateCancelled",
};

interface A2AHistoryRow {
  id: string;
  state: string;
  skill: string | null;
  createdAt: string;
  completedAt: string | null;
}

function formatDuration(ms: number | null): string {
  if (ms == null) return "—";
  const s = Math.max(0, Math.round(ms / 1000));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

/** Column header label for one bucket — hour-of-day for the 1d preset (24 hourly slices),
 * calendar date for 7d/30d (daily slices), so an operator can tell which column is which
 * time slice without hovering every cell. */
function formatBucketLabel(startMs: number, preset: Preset): string {
  const d = new Date(startMs);
  return preset === "1d" ? d.toLocaleTimeString() : d.toLocaleDateString();
}

/**
 * Resets `isLoading` back to `true` synchronously during render when `rangeKey` changes —
 * React's documented "adjust state when a prop changes" idiom (same shape as
 * `useDrawerDetail.ts`'s `useSyncedNodeIdentity`), kept out of the fetch effect below so that
 * effect never calls `setState` synchronously in its own body (`react-hooks/set-state-in-effect`).
 */
function useSyncedRangeReset(rangeKey: string, setIsLoading: (b: boolean) => void) {
  const [syncedKey, setSyncedKey] = useState<string | undefined>(undefined);
  if (rangeKey !== syncedKey) {
    setSyncedKey(rangeKey);
    setIsLoading(true);
  }
}

/**
 * Fetches A2A persisted history + Cloud Agent tasks for `range`, `Promise.allSettled` so one
 * source failing never hides the other. Cloud Agent has no server-side range filter, so it is
 * filtered client-side by `createdAt`. State is only ever set from the settled callback — the
 * effect body itself never calls setState synchronously, keeping it clean under
 * `react-hooks/set-state-in-effect` (same shape as `useDrawerDetail.ts`'s `useFetchDetail`).
 */
function useHistoryData(range: { fromMs: number; toMs: number }) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [failedSources, setFailedSources] = useState<ReadonlySet<SourceKind>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useSyncedRangeReset(`${range.fromMs}:${range.toMs}`, setIsLoading);

  useEffect(() => {
    const controller = new AbortController();
    const from = new Date(range.fromMs).toISOString();
    const to = new Date(range.toMs).toISOString();

    const a2aReq = fetch(
      `/api/a2a/tasks/history?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&limit=500`,
      { signal: controller.signal, cache: "no-store" }
    ).then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))));
    const cloudAgentReq = fetch("/api/v1/agents/tasks?limit=100", {
      signal: controller.signal,
      cache: "no-store",
    }).then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))));

    Promise.allSettled([a2aReq, cloudAgentReq]).then(([a2aResult, cloudAgentResult]) => {
      if (controller.signal.aborted) return;
      const failed = new Set<SourceKind>();
      const nextItems: HistoryItem[] = [];

      if (a2aResult.status === "fulfilled") {
        const rows = (a2aResult.value as { tasks?: A2AHistoryRow[] })?.tasks ?? [];
        for (const row of rows) nextItems.push(historyItemFromA2A(row));
      } else {
        failed.add("a2a");
      }

      if (cloudAgentResult.status === "fulfilled") {
        const tasks = (cloudAgentResult.value as { data?: CloudAgentTask[] })?.data ?? [];
        for (const t of tasks) {
          const createdMs = Date.parse(t.createdAt);
          if (Number.isFinite(createdMs) && createdMs >= range.fromMs && createdMs <= range.toMs) {
            nextItems.push(historyItemFromCloudAgent(t));
          }
        }
      } else {
        failed.add("cloud-agent");
      }

      setItems(nextItems);
      setFailedSources(failed);
      setIsLoading(false);
    });

    return () => controller.abort();
  }, [range.fromMs, range.toMs]);

  return { items, failedSources, isLoading };
}

/** Turns a clicked HistoryItem into the synthetic OrchNode OrchestrationDrawer expects — the
 * `a2a:`/`cloud-agent:` id prefix is preserved so `useDrawerDetail`'s `routeFor` resolves the
 * right detail endpoint (the A2A one falls back to persisted history per Task C3). */
function nodeFromHistoryItem(item: HistoryItem): OrchNode {
  return {
    id: item.id,
    kind: "work",
    source: item.source,
    state: item.state,
    label: item.label,
    raw: item.raw,
  };
}

/** Preset range buttons (1d/7d/30d) — presentation only; selecting a preset re-samples "now"
 * via `onSelect` (a real DOM event handler) so the range recomputes against the current clock.
 * Extracted so `HistoryTab` stays under the max-lines ratchet, same shape as
 * `OrchestrationToolbar.tsx`'s `ChipGroup`. */
function PresetButtons({
  preset,
  t,
  onSelect,
}: {
  preset: Preset;
  t: ReturnType<typeof useTranslations>;
  onSelect: (p: Preset) => void;
}) {
  return (
    <div className="flex gap-1">
      {PRESETS.map((p) => (
        <button
          key={p}
          type="button"
          aria-pressed={preset === p}
          className={`px-2 py-1 text-xs rounded border ${
            preset === p ? "border-primary bg-primary/10 font-medium" : "border-border text-muted"
          }`}
          onClick={() => onSelect(p)}
        >
          {t(PRESET_KEY[p])}
        </button>
      ))}
    </div>
  );
}

/** Alert rows for history sources that failed to fetch — presentation only. */
function FailedSourcesList({
  failedSources,
  t,
}: {
  failedSources: ReadonlySet<SourceKind>;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <>
      {[...failedSources].map((source) => (
        <div key={source} role="alert" className="text-xs text-error">
          {t("historySourceFailed", { source: t(SOURCE_KEY[source]) })}
        </div>
      ))}
    </>
  );
}

/** The Airflow-grid table itself — header row of bucket labels + one row per identity with
 * state-colored cell dots. Presentation only; clicking a dot calls `onSelectItem`. Extracted so
 * `HistoryTab` stays under the max-lines ratchet. */
function HistoryGridTable({
  grid,
  preset,
  t,
  onSelectItem,
}: {
  grid: HistoryGrid;
  preset: Preset;
  t: ReturnType<typeof useTranslations>;
  onSelectItem: (item: HistoryItem) => void;
}) {
  return (
    // Kept mounted (with the previous range's rows) while `isLoading` is true for a refetch —
    // only the very first load (no rows yet) falls through to the loading line above instead of
    // an empty bordered table.
    <div className="flex-1 min-h-0 overflow-x-auto overflow-y-auto border border-border rounded">
      <table className="text-xs border-collapse w-full">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="px-2 py-1 sticky left-0 bg-surface" />
            {grid.buckets.map((bucket, i) => (
              <th
                key={i}
                scope="col"
                className="px-0.5 py-1 text-[9px] font-normal text-muted whitespace-nowrap"
              >
                {formatBucketLabel(bucket.start, preset)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.rows.map((row) => (
            <tr key={`${row.source}:${row.identity}`} className="border-b border-border">
              <th
                scope="row"
                className="text-left px-2 py-1 sticky left-0 bg-surface whitespace-nowrap font-normal"
              >
                <span className="font-medium">{row.identity}</span>{" "}
                <span className="text-[9px] uppercase text-muted">{t(SOURCE_KEY[row.source])}</span>
              </th>
              {row.cells.map((cell, i) => (
                <td key={i} className="p-0.5 align-top">
                  <div className="flex flex-wrap gap-0.5">
                    {cell.map((item) => {
                      const meta = `${item.label} · ${formatDuration(item.durationMs)} · ${t(
                        STATE_KEY[item.state]
                      )}`;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className="w-3 h-3 rounded-sm motion-reduce:transition-none"
                          style={{ backgroundColor: orchStateColor(item.state) }}
                          title={meta}
                          aria-label={meta}
                          onClick={() => onSelectItem(item)}
                        />
                      );
                    })}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HistoryTab() {
  const t = useTranslations("orchestration");
  // `common.loading` is an already-translated global key — the history namespace has no
  // loading string of its own and this task adds no new i18n keys (Task C5 owns i18n).
  const tCommon = useTranslations("common");
  const [preset, setPreset] = useState<Preset>("7d");
  // Sampled at mount (lazy initializer, runs once) and re-sampled directly inside the
  // button's onClick below (a real DOM event handler, which — unlike a plain closure
  // referenced by one — the `react-hooks/purity` rule permits to be impure). Never sampled
  // during render or inside a `useEffect` body: this codebase's established idiom
  // (`useOrchestrationSnapshot.ts`'s `polledAt`, `OverviewTab.tsx`'s `now`) only calls
  // `Date.now()` from a lazy initializer or from inside a nested async/timer callback.
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [selected, setSelected] = useState<OrchNode | null>(null);

  const range = useMemo(() => historyRangeFromPreset(preset, nowMs), [preset, nowMs]);
  const { items, failedSources, isLoading } = useHistoryData(range);
  const grid = useMemo(
    () => buildHistoryGrid(items, range, BUCKET_COUNT[preset]),
    [items, range, preset]
  );

  const onSelectPreset = (p: Preset) => {
    setPreset(p);
    setNowMs(Date.now());
  };
  const onSelectItem = (item: HistoryItem) => setSelected(nodeFromHistoryItem(item));

  return (
    <div className="flex flex-col h-full min-h-0 gap-2">
      <div className="flex items-center gap-2 flex-wrap">
        <PresetButtons preset={preset} t={t} onSelect={onSelectPreset} />
        <span className="text-[10px] text-muted">{t("historyConductorNote")}</span>
      </div>

      <FailedSourcesList failedSources={failedSources} t={t} />

      {isLoading && (
        <div role="status" aria-live="polite" className="text-xs text-muted">
          {tCommon("loading")}
        </div>
      )}

      {grid.rows.length === 0 && !isLoading && (
        <div className="text-xs text-muted p-4">{t("historyEmpty")}</div>
      )}

      {grid.rows.length > 0 && (
        <HistoryGridTable grid={grid} preset={preset} t={t} onSelectItem={onSelectItem} />
      )}

      {/* `onActionDone` must NOT close the drawer: the drawer renders its own success toast
          right after calling it, so unmounting here threw the confirmation away and the
          operator saw a repeat/cancel silently do nothing. Re-sampling `nowMs` instead
          keeps the drawer mounted (the toast lands) and refreshes the grid through the new
          range — the same "refetch, don't close" contract `OrchestrationPageClient` uses.
          `Date.now()` is sampled inside a real event-driven callback, never during render
          (see the `nowMs` note above), and the updater is pure — it only picks the larger of
          the sampled clock and `prev + 1`, so the range always changes (and the refetch
          always happens) even when two samples land in the same millisecond. */}
      <OrchestrationDrawer
        node={selected}
        onClose={() => setSelected(null)}
        onActionDone={() => {
          const sampled = Date.now();
          setNowMs((prev) => (sampled > prev ? sampled : prev + 1));
        }}
      />
    </div>
  );
}
