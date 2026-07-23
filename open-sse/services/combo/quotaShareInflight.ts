/**
 * quotaShareInflight.ts — In-flight request counter for the quota-share strategy.
 *
 * Tracks how many requests are currently in-flight per connectionId so the
 * quota-share P2C tie-break can prefer the least-loaded connection in real time.
 *
 * Decrement-on-abort safety (TTL/lease):
 *   The generic combo dispatch path is intentionally NOT instrumented (so this
 *   feature cannot regress existing strategies). Instead, each in-flight slot
 *   carries an expiry: incrementInflight() stamps `nowMs + leaseMs`. The normal
 *   path calls decrementInflight() (returned to the caller as a callback) once
 *   the request settles, which clears the slot immediately. If a request is
 *   aborted or crashes before that callback runs, the slot still auto-expires
 *   after DEFAULT_LEASE_MS — so the counter can never leak forever, even without
 *   touching the generic dispatch.
 *
 * Fail-open: getInflight() returns 0 for an unknown / empty connectionId.
 * All time input is injectable (the `nowMs` param) so unit tests drive the
 * clock deterministically — the tested path never calls Date.now() implicitly.
 *
 * Part of: Quota Sharing Engine — Phase 3 (#9 dedicated quota-share strategy).
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Default lease duration (ms). A slot that is never explicitly decremented
 * (aborted / crashed request) auto-expires after this, bounding the counter.
 */
export const DEFAULT_LEASE_MS = 120_000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InflightSlot {
  count: number;
  expiresAtMs: number;
}

// ---------------------------------------------------------------------------
// In-process store. Key: connectionId.
// ---------------------------------------------------------------------------

const _inflightMap = new Map<string, InflightSlot>();

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Increment the in-flight counter for a connection and return the new count.
 * Sets / refreshes the slot's expiry lease.
 *
 * @param connectionId  Opaque connection identifier (empty → no-op, returns 0).
 * @param leaseMs       Lease before the slot auto-expires if never decremented.
 * @param nowMs         Current epoch ms; defaults to Date.now() (off-path only).
 */
export function incrementInflight(
  connectionId: string,
  leaseMs: number = DEFAULT_LEASE_MS,
  nowMs: number = Date.now()
): number {
  if (!connectionId) return 0;
  pruneExpired(nowMs);
  const slot = _inflightMap.get(connectionId);
  const base = slot && slot.expiresAtMs > nowMs ? slot.count : 0;
  const newCount = base + 1;
  _inflightMap.set(connectionId, { count: newCount, expiresAtMs: nowMs + leaseMs });
  return newCount;
}

/**
 * Decrement the in-flight counter for a connection, flooring at 0. The entry is
 * removed once the count reaches 0 (or if the slot already expired).
 *
 * @param connectionId  Opaque connection identifier (empty → no-op).
 * @param nowMs         Current epoch ms; defaults to Date.now() (off-path only).
 */
export function decrementInflight(connectionId: string, nowMs: number = Date.now()): void {
  if (!connectionId) return;
  const slot = _inflightMap.get(connectionId);
  if (!slot || slot.expiresAtMs <= nowMs) {
    _inflightMap.delete(connectionId);
    return;
  }
  const newCount = Math.max(0, slot.count - 1);
  if (newCount === 0) {
    _inflightMap.delete(connectionId);
  } else {
    _inflightMap.set(connectionId, { count: newCount, expiresAtMs: slot.expiresAtMs });
  }
}

/**
 * Current in-flight count for a connection (0 if unknown / empty / expired).
 *
 * @param connectionId  Opaque connection identifier.
 * @param nowMs         Current epoch ms; defaults to Date.now() (off-path only).
 */
export function getInflight(connectionId: string, nowMs: number = Date.now()): number {
  if (!connectionId) return 0;
  const slot = _inflightMap.get(connectionId);
  if (!slot || slot.expiresAtMs <= nowMs) return 0;
  return slot.count;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Drop all expired slots so the map cannot grow unbounded with stale leases. */
function pruneExpired(nowMs: number): void {
  for (const [key, slot] of _inflightMap) {
    if (slot.expiresAtMs <= nowMs) _inflightMap.delete(key);
  }
}

// ---------------------------------------------------------------------------
// Test helpers (never call in production code)
// ---------------------------------------------------------------------------

/** Clear all in-flight state. Tests only — keeps state isolation between cases. */
export function _clearInflightForTest(): void {
  _inflightMap.clear();
}

/** Return the current slot count. Tests only — black-box size assertion. */
export function _inflightSizeForTest(): number {
  return _inflightMap.size;
}
