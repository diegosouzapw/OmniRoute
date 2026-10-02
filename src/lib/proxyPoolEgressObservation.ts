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
  getRecentEgressIpForProxy,
  type PoolEgressObservationCounts,
} from "@/lib/db/proxyLogs";
import { normalizeAssignmentScopeId, normalizeScope } from "@/lib/db/proxies/mappers";
import { getScopeProxyPool, readEgressAddressSetForMember } from "@/lib/db/proxies/rotation";
import { getProxyById } from "@/lib/db/proxies";
import { flushProxyLogsSync } from "@/lib/proxyLogger";
import {
  isOperatorEgressEnabled,
  isPoolEgressObservationEnabled,
} from "@/shared/utils/featureFlags";

export type PoolEgressObservation = PoolEgressObservationCounts & { windowHours: number };

export type PoolMemberEgress = {
  host: string;
  port: number;
  egressIp: string | null;
  at: string | null;
  source: "operator" | "observed" | null;
};

export type PoolMemberEgressObservation = {
  windowHours: number;
  members: PoolMemberEgress[];
};

const MEMBER_CACHE_TTL_MS = 30_000;
const MEMBER_CACHE_MAX_ENTRIES = 200;

const memberCache = new Map<string, { at: number; value: PoolMemberEgressObservation }>();

function readMemberCache(key: string, nowMs: number): PoolMemberEgressObservation | null {
  const hit = memberCache.get(key);
  if (!hit || nowMs - hit.at >= MEMBER_CACHE_TTL_MS) return null;
  return hit.value;
}

function writeMemberCache(key: string, value: PoolMemberEgressObservation, nowMs: number): void {
  if (!memberCache.has(key) && memberCache.size >= MEMBER_CACHE_MAX_ENTRIES) {
    const oldest = memberCache.keys().next().value;
    if (oldest !== undefined) memberCache.delete(oldest);
  }
  memberCache.set(key, { at: nowMs, value });
}

function nullMember(host: string, port: number): PoolMemberEgress {
  return { host, port, egressIp: null, at: null, source: null };
}

function journalMember(
  host: string,
  port: number,
  observed: { egressIp: string; at: string } | null
): PoolMemberEgress {
  return {
    host,
    port,
    egressIp: observed?.egressIp ?? null,
    at: observed?.at ?? null,
    source: "observed",
  };
}

function operatorMember(
  host: string,
  port: number,
  freshest: { address: string; at: string },
  journalAt: number
): PoolMemberEgress {
  const operatorIsNewer = !Number.isFinite(journalAt) || Date.parse(freshest.at) >= journalAt;
  if (!operatorIsNewer)
    return journalMember(host, port, { egressIp: freshest.address, at: freshest.at });
  return {
    host,
    port,
    egressIp: freshest.address,
    at: freshest.at,
    source: "operator",
  };
}

function mergedMemberEntry(
  host: string,
  port: number,
  observed: { egressIp: string; at: string } | null,
  nowMs: number
): PoolMemberEgress {
  if (observed?.egressIp == null) return nullMember(host, port);
  if (!isOperatorEgressEnabled()) return journalMember(host, port, observed);
  // The operator rows are the freshest dated observation when newer than the
  // journal: serve them as operator-provided, else the journal read.
  const merged = readEgressAddressSetForMember({ host, port }, nowMs);
  if (merged.freshest === null) return journalMember(host, port, observed);
  return operatorMember(host, port, merged.freshest, Date.parse(observed.at));
}

async function collectMemberEgressEntries(
  assignments: { proxyId: string }[],
  nowMs: number
): Promise<PoolMemberEgress[]> {
  const members: PoolMemberEgress[] = [];
  for (const assignment of assignments) {
    const proxy = await getProxyById(assignment.proxyId);
    if (!proxy || typeof proxy.host !== "string" || !Number.isInteger(proxy.port)) continue;
    const observed = getRecentEgressIpForProxy(proxy.host, proxy.port);
    members.push(mergedMemberEntry(proxy.host, proxy.port, observed, nowMs));
  }
  return members;
}

/**
 * Last observed egress IP per member of a scope's proxy pool, for the dashboard pool
 * editor. Read-only and never on the routing path: a failure returns null so it cannot
 * break the pool screen. Opt-in through the same PROXY_POOL_EGRESS_OBSERVATION flag
 * (default off: null, the member lines stay hidden). Dashboard-only traffic, so the
 * per-member reads are bounded by the number of members in the current scope view and
 * fronted by the same 30 s cache as the aggregate observation.
 */
export async function readPoolMemberEgressObservation(
  scope: string,
  scopeId: string | null,
  nowMs: number = Date.now()
): Promise<PoolMemberEgressObservation | null> {
  if (!isPoolEgressObservationEnabled()) return null;
  const normalizedScope = normalizeScope(scope);
  const normalizedScopeId = normalizeAssignmentScopeId(normalizedScope, scopeId);
  const key = `members:${normalizedScope}:${normalizedScopeId ?? ""}`;

  const hit = readMemberCache(key, nowMs);
  if (hit) return hit;

  let value: PoolMemberEgressObservation;
  try {
    flushProxyLogsSync();
    const assignments = await getScopeProxyPool(normalizedScope, normalizedScopeId);
    const members = await collectMemberEgressEntries(assignments, nowMs);
    value = { windowHours: EGRESS_IP_LOOKUP_WINDOW_MS / (60 * 60 * 1000), members };
  } catch {
    // Observer only: a failed read hides the lines instead of failing the pool screen.
    return null;
  }

  writeMemberCache(key, value, nowMs);
  return value;
}

export function resetPoolMemberEgressObservationCache(): void {
  memberCache.clear();
}

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
