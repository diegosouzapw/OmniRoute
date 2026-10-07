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
import { getProxyById, getProviderUpstreamSummary } from "@/lib/db/proxies";
import { flushProxyLogsSync } from "@/lib/proxyLogger";
import {
  isOperatorEgressEnabled,
  isPoolEgressObservationEnabled,
} from "@/shared/utils/featureFlags";
import { createLogger } from "@/shared/utils/logger";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";

const log = createLogger("proxy/uniform-egress-regime");

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

/**
 * Whether every exit of a provider fails upstream together: an upstream problem,
 * never an exit problem. Decides on 5xx shares over exits with traffic only
 * (4xx rows never flag a 5xx regime); `measured` counts rows whose upstream
 * status was recorded, and no measured row means `unmeasured` with no uniform
 * conclusion. Exits below `minAttemptsPerExit` carry no signal, a single exit
 * with traffic can never be uniform, and the affected share must strictly
 * exceed `majorityRatio`.
 */
export type UpstreamRegimeThresholds = {
  shareThreshold: number;
  majorityRatio: number;
  minAttemptsPerExit: number;
  minExitsWithTraffic: number;
};

export type UpstreamRegimeExit = { attempts: number; serverErrors: number; measured?: number };

export type UpstreamRegime = {
  uniform: boolean;
  state: "measured" | "unmeasured";
  share5xx: number;
  exitsWithTraffic: number;
  affectedExits: number;
};

export const UPSTREAM_REGIME_THRESHOLDS: UpstreamRegimeThresholds = {
  shareThreshold: 0.3,
  majorityRatio: 0.5,
  minAttemptsPerExit: 5,
  minExitsWithTraffic: 2,
};

export function isUpstreamRegime(
  rows: UpstreamRegimeExit[],
  thresholds: UpstreamRegimeThresholds = UPSTREAM_REGIME_THRESHOLDS
): UpstreamRegime {
  const measured = rows.reduce((sum, row) => sum + (row.measured ?? row.attempts), 0);
  if (measured === 0) {
    return {
      uniform: false,
      state: "unmeasured",
      share5xx: 0,
      exitsWithTraffic: 0,
      affectedExits: 0,
    };
  }
  const withTraffic = rows.filter((row) => row.attempts >= thresholds.minAttemptsPerExit);
  const exitsWithTraffic = withTraffic.length;
  if (exitsWithTraffic < Math.max(2, thresholds.minExitsWithTraffic)) {
    return { uniform: false, state: "measured", share5xx: 0, exitsWithTraffic, affectedExits: 0 };
  }
  const affectedExits = withTraffic.filter(
    (row) => row.attempts > 0 && row.serverErrors / row.attempts >= thresholds.shareThreshold
  ).length;
  const attempts = withTraffic.reduce((sum, row) => sum + row.attempts, 0);
  const serverErrors = withTraffic.reduce((sum, row) => sum + row.serverErrors, 0);
  return {
    uniform: affectedExits / exitsWithTraffic > thresholds.majorityRatio,
    state: "measured",
    share5xx: attempts > 0 ? serverErrors / attempts : 0,
    exitsWithTraffic,
    affectedExits,
  };
}

export type UniformEgressRegime = UpstreamRegime & {
  provider: string;
  windowHours: number;
  attempts: number;
  measured: number;
  exitsTouched: number;
};

const UNIFORM_REGIME_CACHE_TTL_MS = 30_000;
const UNIFORM_REGIME_CACHE_MAX_ENTRIES = 200;

const uniformRegimeCache = new Map<string, { at: number; value: UniformEgressRegime | null }>();

function readUniformRegimeCache(
  key: string,
  nowMs: number
): UniformEgressRegime | null | undefined {
  const hit = uniformRegimeCache.get(key);
  if (!hit || nowMs - hit.at >= UNIFORM_REGIME_CACHE_TTL_MS) return undefined;
  return hit.value;
}

function writeUniformRegimeCache(
  key: string,
  value: UniformEgressRegime | null,
  nowMs: number
): void {
  if (!uniformRegimeCache.has(key) && uniformRegimeCache.size >= UNIFORM_REGIME_CACHE_MAX_ENTRIES) {
    const oldest = uniformRegimeCache.keys().next().value;
    if (oldest !== undefined) uniformRegimeCache.delete(oldest);
  }
  uniformRegimeCache.set(key, { at: nowMs, value });
}

/**
 * Uniform 5xx regime of one provider over the last `windowHours` (1..24): read
 * from the proxy log, fronted by the same 30 s / 200-entry cache as the pool
 * observations. Read-only and never on the routing path: a disabled flag or a
 * failed read returns null so it cannot break the pool screen.
 */
export function readUniformEgressRegime(
  provider: string,
  windowHours = 1,
  nowMs: number = Date.now()
): UniformEgressRegime | null {
  if (!isPoolEgressObservationEnabled()) return null;
  const name = provider.trim();
  if (!name) return null;
  const hours = Math.max(1, Math.min(24, Math.floor(windowHours) || 1));
  const key = `${name}:${hours}`;
  const cached = readUniformRegimeCache(key, nowMs);
  if (cached !== undefined) return cached;

  let value: UniformEgressRegime | null;
  try {
    flushProxyLogsSync();
    const since = new Date(nowMs - hours * 60 * 60 * 1000).toISOString();
    const summaries = getProviderUpstreamSummary(since);
    const summary = summaries.find((entry) => entry.provider === name);
    if (!summary) {
      value = null;
    } else {
      const regime = isUpstreamRegime(summary.exits);
      value = {
        ...regime,
        provider: name,
        windowHours: hours,
        attempts: summary.attempts,
        measured: summary.measured,
        exitsTouched: summary.exits.length,
      };
    }
  } catch (error) {
    // Observer only: a failed read hides the line instead of failing the pool
    // screen. The client still gets null, but the failure is traced server-side
    // so a transient outage is never mistaken for a healthy provider.
    log.error(
      { provider: name, windowHours: hours },
      sanitizeErrorMessage(error) || "Failed to read uniform egress regime"
    );
    return null;
  }

  writeUniformRegimeCache(key, value, nowMs);
  return value;
}

export function resetUniformEgressRegimeCache(): void {
  uniformRegimeCache.clear();
}

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
