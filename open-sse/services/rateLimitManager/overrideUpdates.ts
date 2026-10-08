/**
 * rateLimitManager/overrideUpdates — operator override → Bottleneck settings.
 *
 * Maps a per-connection overrides record (`rpm`, `minTime`, `maxConcurrent`)
 * onto Bottleneck constructor options, and loads the overrides map BEFORE
 * any limiter exists (newborns pick them up). Zero/missing values fall
 * through to the global defaults (an rpm of 0 would set reservoir=0 =
 * depleted forever). Pure: plain record, no limiter dependency.
 *
 * @module services/rateLimitManager/overrideUpdates
 */

import type { ConnectionRateLimitOverrides } from "@/lib/db/providers/columns";

export function buildOverrideUpdates(
  overrides: ConnectionRateLimitOverrides
): Record<string, number> {
  const updates: Record<string, number> = {};
  if (typeof overrides.maxConcurrent === "number" && overrides.maxConcurrent > 0) {
    updates.maxConcurrent = overrides.maxConcurrent;
  }
  if (typeof overrides.minTime === "number" && overrides.minTime > 0) {
    updates.minTime = overrides.minTime;
  }
  if (typeof overrides.rpm === "number" && overrides.rpm > 0) {
    updates.reservoir = overrides.rpm;
    updates.reservoirRefreshAmount = overrides.rpm;
    updates.reservoirRefreshInterval = 60 * 1000;
  }
  return updates;
}

export function loadOverrideMap(
  target: Map<string, ConnectionRateLimitOverrides>,
  connections: Array<Record<string, unknown>>
): void {
  target.clear();
  for (const conn of connections) {
    const overrides = conn.rateLimitOverrides;
    if (overrides && typeof overrides === "object" && !Array.isArray(overrides))
      target.set(String(conn.id), overrides as ConnectionRateLimitOverrides);
  }
}
