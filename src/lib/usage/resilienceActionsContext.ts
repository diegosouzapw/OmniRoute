import { AsyncLocalStorage } from "node:async_hooks";

/**
 * Per-attempt resilience-action accumulator
 *
 * Implicit ALS model (same pattern as `callLogApiKeyContext.ts`): the caller
 * opens one store per attempt with `runWithResilienceActionsContext(fn)` and
 * the action points publish one-line best-effort notes. The sink
 * (`saveCallLogOperation`) reads the store with `readResilienceActions()`.
 * No traceId threading: isolation comes from the store, not from a key.
 */

export type ResilienceActionsPartial = {
  rotations?: number;
  parkMs?: number;
  parked?: boolean;
  replayed?: boolean;
  stored429?: boolean;
  emptyRetries?: number;
  continued?: number;
  buffered?: "retry" | "pass";
  resumed?: boolean;
};

export type ResilienceActionsAccumulator = {
  rotations: number;
  parkMs: number;
  parked: boolean;
  replayed: boolean | null;
  stored429: boolean;
  emptyRetries: number;
  continued: number;
  buffered: "retry" | "pass" | null;
  resumed: boolean;
  /** Notes dropped once NOTE_CAP is hit (anti-bloat accounting). */
  droppedNotes: number;
};

/** Max note() calls honoured per attempt store; beyond it notes are dropped. */
export const RESILIENCE_NOTE_CAP = 200;

const resilienceActionsContext = new AsyncLocalStorage<ResilienceActionsAccumulator>();

function freshAccumulator(): ResilienceActionsAccumulator {
  return {
    rotations: 0,
    parkMs: 0,
    parked: false,
    replayed: null,
    stored429: false,
    emptyRetries: 0,
    continued: 0,
    buffered: null,
    resumed: false,
    droppedNotes: 0,
  };
}

/**
 * Open one accumulator store for a single attempt. Combo attempts each get
 * their own store, so summaries never leak across attempts.
 */
export function runWithResilienceActionsContext<TResult>(callback: () => TResult): TResult {
  return resilienceActionsContext.run(freshAccumulator(), callback);
}

function isValidBuffered(value: unknown): value is "retry" | "pass" {
  return value === "retry" || value === "pass";
}

function addFiniteCount(current: number, value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return current;
  return current + Math.max(0, Math.floor(value));
}

function addFiniteMs(current: number, value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return current;
  return current + Math.max(0, Math.round(value));
}

/**
 * Publish one action fragment into the current attempt store. Best-effort:
 * no-op outside a store, never throws into the request path.
 */
export function noteResilienceAction(partial: ResilienceActionsPartial): void {
  try {
    const store = resilienceActionsContext.getStore();
    if (!store || partial === null || typeof partial !== "object") return;
    const notes = (store as { __notes?: number }).__notes ?? 0;
    if (notes >= RESILIENCE_NOTE_CAP) {
      store.droppedNotes += 1;
      return;
    }
    (store as { __notes?: number }).__notes = notes + 1;
    store.rotations = addFiniteCount(store.rotations, partial.rotations);
    store.parkMs = addFiniteMs(store.parkMs, partial.parkMs);
    if (partial.parked === true) store.parked = true;
    if (typeof partial.replayed === "boolean") store.replayed = partial.replayed;
    if (partial.stored429 === true) store.stored429 = true;
    store.emptyRetries = addFiniteCount(store.emptyRetries, partial.emptyRetries);
    store.continued = addFiniteCount(store.continued, partial.continued);
    if (isValidBuffered(partial.buffered)) store.buffered = partial.buffered;
    if (partial.resumed === true) store.resumed = true;
  } catch {
    /* resilience notes are best-effort; never break the request path */
  }
}

export type ResilienceActionsSnapshot = {
  rotations?: number;
  park_ms?: number;
  parked?: true;
  replayed?: boolean;
  stored_429?: true;
  empty_retries?: number;
  continued?: number;
  buffered?: "retry" | "pass";
  resumed?: true;
  dropped_notes?: number;
};

function snapshotStore(store: ResilienceActionsAccumulator): ResilienceActionsSnapshot {
  const snapshot: ResilienceActionsSnapshot = {};
  if (store.rotations > 0) snapshot.rotations = store.rotations;
  if (store.parkMs > 0) snapshot.park_ms = store.parkMs;
  if (store.parked) snapshot.parked = true;
  if (store.replayed !== null) snapshot.replayed = store.replayed;
  if (store.stored429) snapshot.stored_429 = true;
  if (store.emptyRetries > 0) snapshot.empty_retries = store.emptyRetries;
  if (store.continued > 0) snapshot.continued = store.continued;
  if (store.buffered !== null) snapshot.buffered = store.buffered;
  if (store.resumed) snapshot.resumed = true;
  if (store.droppedNotes > 0) snapshot.dropped_notes = store.droppedNotes;
  return snapshot;
}

/**
 * Read the current attempt store WITHOUT consuming it: double reads return
 * the same summary. The call-log sink is the unique consumer — it calls
 * resetResilienceActions() only after a successful INSERT, so a failed
 * write keeps the summary for retry.
 */
export function readResilienceActions(): ResilienceActionsSnapshot | null {
  try {
    const store = resilienceActionsContext.getStore();
    if (!store) return null;
    const snapshot = snapshotStore(store);
    return Object.keys(snapshot).length === 0 ? null : snapshot;
  } catch {
    return null;
  }
}

/** Explicit reset, called by the sink only after a successful INSERT. */
export function resetResilienceActions(): void {
  try {
    if (resilienceActionsContext.getStore()) {
      resilienceActionsContext.enterWith(freshAccumulator());
    }
  } catch {
    /* best-effort */
  }
}

/**
 * Serialize the current attempt store to the compact JSON persisted in
 * `call_logs.resilience_actions`. Null when nothing was recorded.
 */
export function serializeResilienceActions(): string | null {
  const snapshot = readResilienceActions();
  if (!snapshot) return null;
  try {
    return JSON.stringify(snapshot);
  } catch {
    return null;
  }
}
