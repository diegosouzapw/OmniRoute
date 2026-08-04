/**
 * Per-session combo consecutive-failure tracker.
 *
 * Purpose: stop the silent-stop pattern where a combo cascade fails, the session
 * keeps re-picking the same combo, and every retry hits the same dead/stale pin
 * (the user has no visible signal to switch). After N consecutive failures for a
 * (sessionId, comboName) pair we drop the session pin so the next request is
 * forced to re-resolve targets from scratch — and we surface an
 * `X-OmniRoute-Recovery-Action: try-auto` (or `switch-combo`) hint so the client
 * (e.g. the OpenCode plugin) can render an actionable error instead of the
 * previous opaque "model stopped producing output" loop.
 *
 * Design constraints
 * ──────────────────
 *  - In-memory Map (no DB) — failures are a per-process hot-path signal, the
 *    pin that gets cleared is the same in-memory + DB record managed by
 *    recordSessionModelUsage / deleteSessionModelHistory. Losing the
 *    counter on process restart is acceptable: worst case the user takes N
 *    retries before we clear the pin again.
 *  - TTL eviction (default 5 min, matching sessionManager session stickiness)
 *    prevents unbounded growth across long-lived sessions.
 *  - Fail-open: every public function catches its own throws and returns a safe
 *    default — a bug in the tracker must never block a request.
 *  - Pinned to a counter threshold (default 3) so a single transient 5xx does
 *    not destroy the prompt-cache pinning benefit.
 *
 * No barrel import — consistent with the other combo/* leaves.
 */

import { deleteSessionModelHistory } from "@/lib/db/contextHandoffs";

/** Default threshold — after this many consecutive failures the pin is cleared. */
export const COMBO_FAILURE_THRESHOLD = 3 as const;

/** TTL for the in-memory counter (matches the sessionManager SESSION_TTL_MS). */
const COUNTER_TTL_MS = 5 * 60 * 1000;

/** Hard cap to prevent unbounded growth in pathological traffic patterns. */
const MAX_ENTRIES = 2_000;

interface FailureEntry {
  /** Consecutive failure count (resets on success). */
  count: number;
  /** Last failure timestamp — used for TTL eviction. */
  lastFailureAt: number;
  /** Whether we have already auto-cleared the pin for this streak. */
  pinClearedThisStreak: boolean;
}

const failureMap = new Map<string, FailureEntry>();

/** Pure keying helper — keeps the lookup format in one place. */
function keyOf(sessionId: string, comboName: string): string {
  return `${sessionId}::${comboName}`;
}

/**
 * Evict expired entries + enforce the hard cap. Called lazily on every mutation
 * so we never need a background timer.
 */
function evict(now: number): void {
  for (const [k, entry] of failureMap) {
    if (now - entry.lastFailureAt > COUNTER_TTL_MS) failureMap.delete(k);
  }
  while (failureMap.size > MAX_ENTRIES) {
    // Drop the oldest entry by lastFailureAt — Map iteration order is insertion
    // order which approximates recency, but we still walk to find the true min.
    let oldestKey: string | null = null;
    let oldestTime = Infinity;
    for (const [k, entry] of failureMap) {
      if (entry.lastFailureAt < oldestTime) {
        oldestTime = entry.lastFailureAt;
        oldestKey = k;
      }
    }
    if (oldestKey === null) break;
    failureMap.delete(oldestKey);
  }
}

/**
 * Increment the consecutive-failure count for a (session, combo) pair. When the
 * counter first crosses the threshold (default 3) we additionally clear the
 * session pin so the next request re-resolves targets instead of re-routing to
 * the stale one. Returns the new count + a flag indicating whether we just
 * auto-cleared the pin.
 *
 * Pure read with side-effect: NEVER throws — a thrown deleteSessionModelHistory
 * must not propagate into the combo terminal-failure response path. Catches
 * and returns pinClearedNow=false so the caller can log the failure without
 * pretending the cleanup succeeded.
 */
export function recordComboFailure(
  sessionId: string | null | undefined,
  comboName: string
): { count: number; pinClearedNow: boolean } {
  if (!sessionId) return { count: 0, pinClearedNow: false };
  try {
    const now = Date.now();
    evict(now);
    const key = keyOf(sessionId, comboName);
    const existing = failureMap.get(key);
    const count = (existing?.count ?? 0) + 1;
    const pinClearedBefore = existing?.pinClearedThisStreak ?? false;
    const shouldClearNow = count >= COMBO_FAILURE_THRESHOLD && !pinClearedBefore;
    failureMap.set(key, {
      count,
      lastFailureAt: now,
      pinClearedThisStreak: shouldClearNow || pinClearedBefore,
    });
    if (shouldClearNow) {
      try {
        // Session-scoped: clears ONLY this session's pin on this combo. Other
        // sessions sharing the same combo keep their own pin (see
        // deleteSessionModelHistory's docstring in contextHandoffs.ts).
        deleteSessionModelHistory(sessionId, comboName);
      } catch {
        // Best effort — the counter still records the streak, future clears will
        // retry on the next threshold-cross.
      }
    }
    return { count, pinClearedNow: shouldClearNow };
  } catch {
    return { count: 0, pinClearedNow: false };
  }
}

/**
 * Reset the consecutive-failure counter for a (session, combo) pair on a
 * successful dispatch. Cheap Map.delete — no logging, no DB write.
 */
export function clearComboFailureTracking(
  sessionId: string | null | undefined,
  comboName: string
): void {
  if (!sessionId) return;
  try {
    failureMap.delete(keyOf(sessionId, comboName));
  } catch {
    /* fail-open */
  }
}

/** Read-only peek — used by tests + log messages ("3rd failure in a row"). */
export function getComboFailureCount(
  sessionId: string | null | undefined,
  comboName: string
): number {
  if (!sessionId) return 0;
  try {
    const entry = failureMap.get(keyOf(sessionId, comboName));
    if (!entry) return 0;
    if (Date.now() - entry.lastFailureAt > COUNTER_TTL_MS) return 0;
    return entry.count;
  } catch {
    return 0;
  }
}

/** Test-only — wipe all state. Not exported under a stable name (prefixed `__`). */
export function __resetComboFailureTrackerForTests(): void {
  failureMap.clear();
}
