/**
 * accountFallback/lockoutEviction.ts — model-lockout map eviction (cap enforcement).
 *
 * Extracted from services/accountFallback.ts (file-size gate, #6923): the bounded-growth
 * eviction sweep for the in-memory `modelLockouts` / `modelFailureState` maps. Pure w.r.t.
 * module state — operates only on the maps passed in by the caller — so it is independently
 * testable and reusable outside accountFallback.ts, which wraps evictLockoutOverflow() with
 * its own private map instances and re-exports MODEL_LOCKOUT_EVICTION_CAP.
 */

import type { ModelLockoutEntry, ModelFailureState } from "../accountFallback.ts";

// Cap prevents unbounded growth under sustained load. Entries beyond this limit
// are evicted (oldest first, in insertion order) during the periodic cleanup.
export const MODEL_LOCKOUT_EVICTION_CAP = 1000;

/**
 * Evict oldest (insertion-order) entries once a map exceeds the cap — but NEVER a
 * still-active (until > now) lockout: cleanupModelLockKey() has already run on every
 * key this tick, so anything active left here is a real, in-progress cooldown, and
 * dropping it would wrongly let routing resume to it. If a map is still over cap
 * purely from active entries, the cap is a soft bound in that rare case rather than
 * a correctness trade-off.
 */
export function evictLockoutOverflow(
  modelLockouts: Map<string, ModelLockoutEntry>,
  modelFailureState: Map<string, ModelFailureState>,
  cap: number = MODEL_LOCKOUT_EVICTION_CAP
): void {
  if (modelLockouts.size > cap) {
    const overflow = modelLockouts.size - cap;
    const now = Date.now();
    // Only expired entries are eviction candidates (oldest-first, up to the
    // overflow count) — active ones never appear in this list at all.
    const evictableKeys = [...modelLockouts.entries()]
      .filter(([, entry]) => entry.until <= now)
      .slice(0, overflow)
      .map(([key]) => key);
    for (const key of evictableKeys) {
      modelLockouts.delete(key);
      modelFailureState.delete(key);
    }
  }
  if (modelFailureState.size > cap) {
    const overflow = modelFailureState.size - cap;
    let evicted = 0;
    for (const key of modelFailureState.keys()) {
      if (evicted >= overflow) break;
      if (!modelLockouts.has(key)) modelFailureState.delete(key);
      evicted++;
    }
  }
}
