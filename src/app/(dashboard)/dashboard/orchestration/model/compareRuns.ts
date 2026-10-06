/**
 * Pure model to compare two Orchestration Canvas history runs side by side (History tab,
 * PR-A / Task A1). No React, no side effects.
 *
 * `normalizeRunSide` turns a `HistoryItem` plus its raw detail payload (the JSON body of
 * `GET /api/a2a/tasks/[id]` for `source === "a2a"`, or the in-memory `CloudAgentTask` for
 * `source === "cloud-agent"`) into a `RunSide` with a normalized `events` timeline and
 * `memoryHits` list. `detail` is untrusted: for A2A it round-trips through
 * `reconstituteHistoricalTask` (`src/app/api/a2a/tasks/[id]/route.ts`) plus client-supplied
 * `metadata` with no Zod validation, so every field is read defensively — a malformed shape
 * drops the offending item (or yields `[]`) instead of throwing. See Fase 2 lesson in
 * `historyModel.ts` / global-constraints: `memoryHits: "boom"` used to crash the drawer.
 *
 * `buildComparison` derives signed deltas (`right - left`) for `durationMs`/`cost` only when
 * both sides have a finite value, and always reports `eventCount`'s delta and whether the two
 * sides share the same (source, identity) pair.
 */
import type { HistoryItem } from "./historyModel";

export interface RunEvent {
  label: string;
  timestamp: string | null;
}

export interface RunMemoryHit {
  id: string;
  key: string;
  type: string;
  snippet: string;
}

export interface RunSide {
  item: HistoryItem;
  events: RunEvent[];
  memoryHits: RunMemoryHit[];
}

export interface RunDeltas {
  durationMs: number | null;
  cost: number | null;
  eventCount: number;
  sameIdentity: boolean;
}

export interface RunComparison {
  left: RunSide;
  right: RunSide;
  deltas: RunDeltas;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

/** One `reconstituteHistoricalTask` event (`{ timestamp: string; state: string; message?: string
 * }`) → `RunEvent`, or `null` if the raw shape does not match. Split out of `a2aEventsFrom` only
 * to keep that function's cognitive complexity under the ratchet — no behavior change; the same
 * field checks run in the same order. */
function a2aEventFrom(raw: unknown): RunEvent | null {
  if (!isRecord(raw)) return null;
  const { state, message, timestamp } = raw;
  if (!isNonEmptyString(state)) return null;
  if (message !== undefined && typeof message !== "string") return null;
  if (timestamp !== undefined && timestamp !== null && typeof timestamp !== "string") return null;
  return {
    label: typeof message === "string" ? message : state,
    timestamp: typeof timestamp === "string" ? timestamp : null,
  };
}

/** `{ timestamp: string; state: string; message?: string }` — reconstituteHistoricalTask's shape. */
function a2aEventsFrom(detail: Record<string, unknown>): RunEvent[] {
  const events = detail.events;
  if (!Array.isArray(events)) return [];
  const out: RunEvent[] = [];
  for (const raw of events) {
    const event = a2aEventFrom(raw);
    if (event) out.push(event);
  }
  return out;
}

/** `CloudAgentActivity[]` (`src/lib/cloudAgent/types.ts`) — each item has `type` and `content`. */
function cloudAgentEventsFrom(detail: Record<string, unknown>): RunEvent[] {
  const activities = detail.activities;
  if (!Array.isArray(activities)) return [];
  const out: RunEvent[] = [];
  for (const raw of activities) {
    if (!isRecord(raw)) continue;
    const { content, timestamp } = raw;
    if (!isNonEmptyString(content)) continue;
    if (timestamp !== undefined && timestamp !== null && typeof timestamp !== "string") continue;
    out.push({
      label: content,
      timestamp: typeof timestamp === "string" ? timestamp : null,
    });
  }
  return out;
}

function memoryHitsFrom(detail: Record<string, unknown>): RunMemoryHit[] {
  const metadata = detail.metadata;
  if (!isRecord(metadata)) return [];
  const hits = metadata.memoryHits;
  if (!Array.isArray(hits)) return [];
  const out: RunMemoryHit[] = [];
  for (const raw of hits) {
    if (!isRecord(raw)) continue;
    const { id, key, type, snippet } = raw;
    if (
      typeof id === "string" &&
      typeof key === "string" &&
      typeof type === "string" &&
      typeof snippet === "string"
    ) {
      out.push({ id, key, type, snippet });
    }
  }
  return out;
}

/**
 * Builds one side of a comparison. NEVER throws — `detail` is untrusted JSON (persisted rows
 * for A2A history, client-supplied `metadata` with no Zod) so any shape mismatch just drops
 * the offending item; a missing/non-object `detail` yields empty `events`/`memoryHits`.
 */
export function normalizeRunSide(item: HistoryItem, detail: unknown): RunSide {
  if (!isRecord(detail)) {
    return { item, events: [], memoryHits: [] };
  }
  const events = item.source === "a2a" ? a2aEventsFrom(detail) : cloudAgentEventsFrom(detail);
  const memoryHits = item.source === "a2a" ? memoryHitsFrom(detail) : [];
  return { item, events, memoryHits };
}

function signedDelta(left: number | null, right: number | null): number | null {
  if (!Number.isFinite(left) || !Number.isFinite(right)) return null;
  return (right as number) - (left as number);
}

/** Combines two normalized sides into a comparison with signed `right - left` deltas. */
export function buildComparison(left: RunSide, right: RunSide): RunComparison {
  return {
    left,
    right,
    deltas: {
      durationMs: signedDelta(left.item.durationMs, right.item.durationMs),
      cost: signedDelta(left.item.cost, right.item.cost),
      eventCount: right.events.length - left.events.length,
      sameIdentity:
        left.item.source === right.item.source && left.item.identity === right.item.identity,
    },
  };
}
