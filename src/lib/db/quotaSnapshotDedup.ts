/**
 * Quota-snapshot dedup helper (#4438).
 *
 * The quota-cache background refresh writes a snapshot row for every connection on each
 * 60s tick. For idle connections whose quota never changes that produced 400K+ identical
 * rows/day. A snapshot only needs to be persisted when it DIFFERS from the last one
 * recorded for the same connection+window, so the history still captures every real
 * change while skipping the redundant duplicates.
 *
 * Kept dependency-free so it can be unit-tested without a DB.
 */

export interface SnapshotState {
  remainingPercentage: number;
  isExhausted: boolean;
}

/** True when `next` should be persisted (no prior snapshot, or a meaningful change). */
export function quotaSnapshotChanged(
  prev: SnapshotState | undefined,
  next: SnapshotState
): boolean {
  if (!prev) return true;
  return (
    prev.remainingPercentage !== next.remainingPercentage || prev.isExhausted !== next.isExhausted
  );
}
