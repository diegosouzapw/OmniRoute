/**
 * autoSync.ts — pure staleness rule shared by the Radar page (client) and the
 * background scheduler (server).
 *
 * Kept free of any server-only import (db, sync) so the "use client" Radar
 * page can consume it directly.
 */

/** Cache older than this triggers an automatic sync when the page opens. */
export const AUTO_SYNC_STALE_MS = 6 * 60 * 60 * 1000; // 6h

/**
 * Whether an automatic sync should fire for a cache fetched at `fetchedAt`.
 *
 * Missing or unparseable timestamps count as stale — the only way to get a
 * fresh verdict is a real, recent fetch.
 */
export function shouldAutoSyncOnOpen(
  fetchedAt: string | null | undefined,
  nowMs: number,
  staleMs: number = AUTO_SYNC_STALE_MS
): boolean {
  if (!fetchedAt) return true;
  const fetchedMs = Date.parse(fetchedAt);
  if (!Number.isFinite(fetchedMs)) return true;
  return nowMs - fetchedMs >= staleMs;
}
