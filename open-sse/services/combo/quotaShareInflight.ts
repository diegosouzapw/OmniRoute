/**
 * quotaShareInflight.ts — In-flight request counter for the quota-share strategy.
 *
 * Tracks how many requests are currently in-flight per connectionId so the
 * quota-share P2C tie-break can prefer the least-loaded connection in real time.
 *
 * Decrement-on-abort safety (TTL/lease):
 *   The generic combo dispatch path is intentionally NOT instrumented (so this
 *   feature cannot regress existing strategies). Instead, EACH IN-FLIGHT REQUEST
 *   carries its own expiry: incrementInflight() appends `nowMs + leaseMs`. The
 *   normal path calls decrementInflight() (returned to the caller as a callback)
 *   once the request settles, which retires one lease immediately. If a request
 *   is aborted or crashes before that callback runs, only that request's lease
 *   remains, and it expires after DEFAULT_LEASE_MS — so the counter cannot leak
 *   forever, even without touching the generic dispatch.
 *
 *   The lease is per request rather than per connection on purpose. A single
 *   shared `expiresAtMs` was refreshed by every subsequent increment on the same
 *   connection, so under sustained traffic an orphaned count rode along
 *   indefinitely and never expired — the exact leak this mechanism exists to
 *   bound. It also meant a request settling after that shared lease lapsed
 *   deleted the whole entry, zeroing the count for its still-active neighbours
 *   and presenting a busy connection to P2C as idle.
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

/**
 * Expiry timestamps for the requests currently in flight on one connection,
 * kept in ascending order. The count IS `leases.length` — there is no separate
 * counter to drift out of step with the leases.
 */
interface InflightSlot {
  leases: number[];
}

/**
 * Upper bound on tracked leases per connection. A connection with more than this
 * many simultaneous in-flight requests is already far past any sane concurrency
 * cap; beyond the bound the oldest lease is retired so memory stays bounded.
 * Under-counting a saturated connection is the fail-open direction this module
 * already takes elsewhere (getInflight returns 0 for anything unknown).
 */
const MAX_LEASES_PER_CONNECTION = 4096;

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
  const slot = _inflightMap.get(connectionId) ?? { leases: [] };
  // Appending keeps `leases` ascending whenever leaseMs is constant, which is the
  // only case in production; a shorter bespoke lease can land out of order, and
  // retiring the earliest expiry below stays correct either way.
  slot.leases.push(nowMs + leaseMs);
  if (slot.leases.length > MAX_LEASES_PER_CONNECTION) slot.leases.shift();
  _inflightMap.set(connectionId, slot);
  return slot.leases.length;
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
  if (!slot) return;

  // A release says "one request settled" without saying which, so the lease to
  // retire has to be inferred. Two rules, in order:
  //
  //  1. If any lease has already expired, retire the newest of those. A request
  //     that outlived its own lease is by definition the longest-running one, so
  //     an expired lease is the best match for the caller — and consuming it
  //     leaves the still-live neighbours alone. Retiring a live lease here
  //     instead would decrement twice for one settled request: once when the
  //     expiry lapsed, once again now.
  //  2. Otherwise retire the newest live lease. Never the oldest: a normal
  //     request's release would then retire an *orphaned* lease and leave its
  //     own newer one behind, so the orphan never ages out on its own schedule
  //     and the count never converges — which is the leak the lease exists to
  //     bound.
  const expiredIndex = lastIndexWhere(slot.leases, (expiresAtMs) => expiresAtMs <= nowMs);
  if (expiredIndex >= 0) {
    slot.leases.splice(expiredIndex, 1);
  } else {
    slot.leases.pop();
  }
  retireExpired(slot, nowMs);

  if (slot.leases.length === 0) {
    _inflightMap.delete(connectionId);
  } else {
    _inflightMap.set(connectionId, slot);
  }
}

/** Index of the last element satisfying `predicate`, or -1. */
function lastIndexWhere(values: number[], predicate: (value: number) => boolean): number {
  for (let i = values.length - 1; i >= 0; i--) {
    if (predicate(values[i]!)) return i;
  }
  return -1;
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
  if (!slot) return 0;
  retireExpired(slot, nowMs);
  return slot.leases.length;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Drop one slot's expired leases in place. */
function retireExpired(slot: InflightSlot, nowMs: number): void {
  if (slot.leases.length === 0) return;
  slot.leases = slot.leases.filter((expiresAtMs) => expiresAtMs > nowMs);
}

/** Drop all expired leases so the map cannot grow unbounded with stale entries. */
function pruneExpired(nowMs: number): void {
  for (const [key, slot] of _inflightMap) {
    retireExpired(slot, nowMs);
    if (slot.leases.length === 0) _inflightMap.delete(key);
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
