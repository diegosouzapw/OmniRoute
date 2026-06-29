/**
 * concurrencyCaps.ts — Per-connection concurrency-cap resolution for combos.
 *
 * A provider connection (OAuth account / API key) can declare a `maxConcurrent`
 * ceiling (provider_connections.max_concurrent). Subscription accounts often
 * allow only ~1–3 concurrent requests; exceeding that triggers 429s and
 * cooldowns. These helpers resolve that ceiling from the DB so the routing layer
 * can honor it:
 *
 *   - resolveMaxConcurrentByConnection: batch-resolves a Map<connectionId, cap>
 *     for a set of targets (used by the quota-share strategy gating).
 *   - makeConnectionConcurrencyResolver: a cached per-target resolver returning
 *     the effective semaphore maxConcurrency (used by the round-robin loop).
 *
 * Both deduplicate DB reads per connectionId (the same connection can repeat
 * across combo steps) so at most one lookup happens per distinct connection, and
 * both fail open: a null/<=0 cap or a lookup error means "no per-connection
 * limit" and never blocks routing. Extracted from combo.ts to keep that god-file
 * shrinking (Quality Gate / #3501).
 */

import { getProviderConnectionById } from "../../../src/lib/db/providers";
import { effectiveMaxConcurrency } from "./comboPredicates.ts";
import type { ResolvedComboTarget } from "./types.ts";

/** Read a connection's positive `maxConcurrent`, or null when unset / <= 0 / on error. */
export async function lookupPositiveCap(connectionId: string): Promise<number | null> {
  try {
    const conn = await getProviderConnectionById(connectionId);
    const raw = (conn as { maxConcurrent?: number | null } | null)?.maxConcurrent;
    return typeof raw === "number" && Number.isFinite(raw) && raw > 0 ? raw : null;
  } catch {
    return null; // fail-open: never block routing on a lookup error
  }
}

/**
 * Resolve each distinct target connection's `maxConcurrent` into a Map keyed by
 * connectionId. null entries mean "no limit". DB reads are deduplicated per
 * connectionId, so this adds at most one lookup per distinct connection.
 */
export async function resolveMaxConcurrentByConnection(
  targets: ResolvedComboTarget[]
): Promise<Map<string, number | null>> {
  const caps = new Map<string, number | null>();
  const distinctIds = new Set<string>();
  for (const target of targets) {
    const connId = target.connectionId ?? "";
    if (connId) distinctIds.add(connId);
  }
  for (const connId of distinctIds) {
    caps.set(connId, await lookupPositiveCap(connId));
  }
  return caps;
}

/**
 * Build a cached resolver that maps a target's connectionId to the effective
 * semaphore `maxConcurrency`: the connection's own positive `maxConcurrent` when
 * set, else `fallbackConcurrency`. The cache lives for the resolver's lifetime
 * (one combo dispatch) so a repeated connection costs a single DB read.
 */
export function makeConnectionConcurrencyResolver(
  fallbackConcurrency: number
): (connectionId: string | null) => Promise<number> {
  const cache = new Map<string, number | null>();
  return async (connectionId: string | null): Promise<number> => {
    if (!connectionId) return fallbackConcurrency;
    let cap = cache.get(connectionId);
    if (cap === undefined) {
      cap = await lookupPositiveCap(connectionId);
      cache.set(connectionId, cap);
    }
    return effectiveMaxConcurrency(cap, fallbackConcurrency);
  };
}
