/**
 * Observed egress spread of a proxy pool, for the dashboard pool editor. Read-only and
 * never on the routing path: a failure returns null so it cannot break the pool screen.
 * Opt-in through the PROXY_POOL_EGRESS_OBSERVATION feature flag (default off: null, the
 * line stays hidden). The scope is normalized exactly like the pool read (key -> account,
 * global -> "__global__"), and a result is cached for 30 seconds per normalized scope.
 */
import {
  EGRESS_IP_LOOKUP_WINDOW_MS,
  getPoolEgressObservation,
  type PoolEgressObservationCounts,
} from "@/lib/db/proxyLogs";
import { normalizeAssignmentScopeId, normalizeScope } from "@/lib/db/proxies/mappers";
import { flushProxyLogsSync } from "@/lib/proxyLogger";
import { isPoolEgressObservationEnabled } from "@/shared/utils/featureFlags";

export type PoolEgressObservation = PoolEgressObservationCounts & { windowHours: number };

const CACHE_TTL_MS = 30_000;
const CACHE_MAX_ENTRIES = 200;

const cache = new Map<string, { at: number; value: PoolEgressObservation }>();

export function readPoolEgressObservation(
  scope: string,
  scopeId: string | null,
  nowMs: number = Date.now()
): PoolEgressObservation | null {
  if (!isPoolEgressObservationEnabled()) return null;
  const normalizedScope = normalizeScope(scope);
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, scopeId);
  const key = `${normalizedScope}:${normalizedScopeId ?? ""}`;

  const hit = cache.get(key);
  if (hit && nowMs - hit.at < CACHE_TTL_MS) return hit.value;

  let value: PoolEgressObservation;
  try {
    flushProxyLogsSync();
    const since = new Date(nowMs - EGRESS_IP_LOOKUP_WINDOW_MS).toISOString();
    value = {
      ...getPoolEgressObservation(normalizedScope, normalizedScopeId, since),
      windowHours: EGRESS_IP_LOOKUP_WINDOW_MS / (60 * 60 * 1000),
    };
  } catch {
    // Observer only: a failed read hides the line instead of failing the pool screen.
    return null;
  }

  if (!cache.has(key) && cache.size >= CACHE_MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(key, { at: nowMs, value });
  return value;
}

export function resetPoolEgressObservationCache(): void {
  cache.clear();
}
