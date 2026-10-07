/**
 * Pure history-grid model for the Orchestration Canvas "History" tab (Airflow-grid style).
 * No React, no side effects. Spec: _tasks/superpowers/specs/2026-08-30-orchestration-canvas-design.md
 *
 * Converts persisted A2A task-history rows (`GET /api/a2a/tasks/history`, Task C3) and the
 * existing in-memory Cloud Agent task list (`GET /api/v1/agents/tasks`) into a shared
 * `HistoryItem` shape, then buckets them into a time-sliced grid — one row per
 * (source, identity) pair, one column per time bucket.
 *
 * State mapping intentionally repeats (rather than imports) the per-source maps already
 * defined locally in `model/fromA2A.ts` / `model/fromCloudAgent.ts` — those maps are not
 * exported (keeping the live-snapshot mappers v1 unchanged), and history rows come from a
 * different shape (a persisted DB row for A2A, not a live `A2ATask`) so sharing a map across
 * both would couple two independent evolution paths.
 */
import type { OrchState } from "./orchestrationTypes";
import type { CloudAgentTask } from "@/lib/cloudAgent/types";

export interface HistoryItem {
  id: string; // "a2a:<id>" | "cloud-agent:<id>"
  source: "a2a" | "cloud-agent";
  identity: string; // skill (a2a) | providerId (cloud-agent)
  state: OrchState;
  label: string; // skill | prompt truncado
  createdAt: string;
  completedAt: string | null;
  durationMs: number | null;
  cost: number | null;
  raw: unknown;
}

const A2A_STATE_MAP: Record<string, OrchState> = {
  submitted: "queued",
  working: "running",
  completed: "succeeded",
  failed: "failed",
  cancelled: "cancelled",
};

// Mirrors model/fromCloudAgent.ts:5 (STATE_MAP) — not exported there, repeated here on purpose.
const CLOUD_AGENT_STATE_MAP: Record<string, OrchState> = {
  queued: "queued",
  running: "running",
  awaiting_approval: "waiting_approval",
  completed: "succeeded",
  failed: "failed",
  cancelled: "cancelled",
};

function truncate(s: string, n = 60): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function durationBetween(createdAt: string, completedAt: string | null): number | null {
  if (!completedAt) return null;
  const start = Date.parse(createdAt);
  const end = Date.parse(completedAt);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  return end - start;
}

export function historyItemFromA2A(row: {
  id: string;
  state: string;
  skill: string | null;
  createdAt: string;
  completedAt: string | null;
}): HistoryItem {
  const state = A2A_STATE_MAP[row.state] ?? "failed";
  const identity = row.skill ?? "unknown";
  return {
    id: `a2a:${row.id}`,
    source: "a2a",
    identity,
    state,
    label: identity,
    createdAt: row.createdAt,
    completedAt: row.completedAt,
    durationMs: durationBetween(row.createdAt, row.completedAt),
    cost: null,
    raw: row,
  };
}

export function historyItemFromCloudAgent(t: CloudAgentTask): HistoryItem {
  const state = CLOUD_AGENT_STATE_MAP[t.status] ?? "failed";
  const completedAt = t.completedAt ?? null;
  return {
    id: `cloud-agent:${t.id}`,
    source: "cloud-agent",
    identity: t.providerId,
    state,
    label: truncate(t.prompt),
    createdAt: t.createdAt,
    completedAt,
    durationMs: durationBetween(t.createdAt, completedAt),
    cost: t.result?.cost ?? null,
    raw: t,
  };
}

export interface HistoryGrid {
  buckets: Array<{ start: number; end: number }>; // ms epoch
  rows: Array<{ identity: string; source: HistoryItem["source"]; cells: HistoryItem[][] }>;
  // cells[i] = itens cujo createdAt cai no bucket i, ordenados por createdAt
}

/**
 * Buckets `items` into `bucketCount` equal-width slices of `[range.fromMs, range.toMs]`.
 * An item exactly on an internal boundary belongs to the bucket that STARTS at that
 * timestamp (i.e. bucket boundaries are `[start, end)`, except the very last bucket, whose
 * end is inclusive so an item exactly at `range.toMs` still lands in the final bucket
 * instead of being dropped). Items outside `[fromMs, toMs]` are discarded entirely — no
 * row is created for an identity whose only items fall outside the range.
 */
export function buildHistoryGrid(
  items: HistoryItem[],
  range: { fromMs: number; toMs: number },
  bucketCount: number
): HistoryGrid {
  const { fromMs, toMs } = range;
  const span = Math.max(0, toMs - fromMs);
  const bucketWidth = bucketCount > 0 ? span / bucketCount : 0;

  const buckets = Array.from({ length: Math.max(0, bucketCount) }, (_, i) => ({
    start: fromMs + i * bucketWidth,
    end: fromMs + (i + 1) * bucketWidth,
  }));

  function bucketIndexFor(ms: number): number | null {
    if (bucketCount <= 0) return null;
    if (ms < fromMs || ms > toMs) return null;
    if (ms === toMs) return bucketCount - 1;
    if (bucketWidth === 0) return 0;
    const idx = Math.floor((ms - fromMs) / bucketWidth);
    return Math.min(Math.max(idx, 0), bucketCount - 1);
  }

  const rowMap = new Map<
    string,
    { identity: string; source: HistoryItem["source"]; cells: HistoryItem[][] }
  >();

  for (const item of items) {
    const createdMs = Date.parse(item.createdAt);
    if (!Number.isFinite(createdMs)) continue;
    const idx = bucketIndexFor(createdMs);
    if (idx === null) continue;

    const key = `${item.source}:${item.identity}`;
    let row = rowMap.get(key);
    if (!row) {
      row = {
        identity: item.identity,
        source: item.source,
        cells: Array.from({ length: bucketCount }, () => []),
      };
      rowMap.set(key, row);
    }
    row.cells[idx].push(item);
  }

  for (const row of rowMap.values()) {
    for (const cell of row.cells) {
      cell.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    }
  }

  return { buckets, rows: [...rowMap.values()] };
}

const PRESET_MS: Record<"1d" | "7d" | "30d", number> = {
  "1d": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

export function historyRangeFromPreset(
  preset: "1d" | "7d" | "30d",
  nowMs: number
): { fromMs: number; toMs: number } {
  return { fromMs: nowMs - PRESET_MS[preset], toMs: nowMs };
}
