/**
 * db/proxyLogs.ts — Read queries over the `proxy_logs` table.
 * Extracted from the /api/logs/export route handler.
 *
 * Hard Rule #5: routes must not embed raw SQL — these queries live here so the
 * /api/logs/export route can delegate.
 *
 * NOTE: The SELECT * intentionally returns the historical `public_ip` column,
 * NOT `clientIp`. This differs from GET /api/usage/proxy-logs which exposes
 * the value as `clientIp`. Callers of the export endpoint should read
 * `public_ip`. This inconsistency will be resolved in a future DB migration
 * (#2880).
 *
 * Sliced out of #3500 (proxy_logs cluster, slice 4).
 */

import { getDbInstance } from "./core";
import { normalizeProxyHostForLog } from "../proxyLogger";

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/**
 * Returns all proxy_logs rows with timestamp >= `since`, ordered by timestamp
 * descending (most recent first).
 *
 * @param since - ISO-8601 timestamp lower bound, e.g. "2024-01-01T00:00:00.000Z".
 */
export function exportProxyLogsSince(since: string): Record<string, unknown>[] {
  const db = getDbInstance();
  const stmt = db.prepare(
    "SELECT * FROM proxy_logs WHERE timestamp >= @since ORDER BY timestamp DESC"
  );
  return stmt.all({ since }) as Record<string, unknown>[];
}

/**
 * Total number of proxy_logs rows with timestamp >= `since` — a cheap
 * aggregate query that never materializes the matching rows themselves.
 * Used by /api/logs/export to report `totalAvailable` without paying the
 * cost of fetching every row just to count them (#13123).
 */
export function countProxyLogsSince(since: string): number {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT COUNT(*) AS count FROM proxy_logs WHERE timestamp >= @since")
    .get({ since }) as { count: number };
  return row.count;
}

const PAGE_SIZE = 500;

/**
 * Streams proxy_logs rows with timestamp >= `since`, up to `limit` rows,
 * ordered by timestamp descending — paginated via SQL LIMIT/OFFSET in fixed
 * batches, never buffering more than `PAGE_SIZE` rows at once (#13123: the
 * previous `exportProxyLogsSince()` + slice-after-fetch approach still
 * materialized every matching row before the row cap was even applied). Note:
 * the `SqliteAdapter` (`./adapters/types.ts`) intentionally exposes only
 * `run`/`get`/`all` — no `.iterate()` cursor — so LIMIT/OFFSET batching is
 * the cursor-equivalent available without widening that shared interface
 * across all 4 driver adapters.
 */
export function* iterateProxyLogsSince(
  since: string,
  limit: number
): Generator<Record<string, unknown>, void, void> {
  const db = getDbInstance();
  let offset = 0;
  let yielded = 0;
  while (yielded < limit) {
    const pageLimit = Math.min(PAGE_SIZE, limit - yielded);
    const stmt = db.prepare(
      "SELECT * FROM proxy_logs WHERE timestamp >= @since ORDER BY timestamp DESC LIMIT @pageLimit OFFSET @offset"
    );
    const page = stmt.all({ since, pageLimit, offset }) as Record<string, unknown>[];
    if (page.length === 0) break;
    for (const row of page) {
      yield row;
      yielded++;
    }
    offset += page.length;
    if (page.length < pageLimit) break;
  }
}

// 24h window for "last known egress IP" lookups. This helper answers a
// different question from proxyEgress.ts (#10677): that module reports which
// connections share an egress IP *right now*, derived from their proxy config
// and a live probe (5 min cache), while the lock needs the IP a connection
// actually *left through* on its recent traffic — history, which only
// proxy_logs holds. Hence a local window constant rather than a dependency.
// Exported so callers can build `since` without duplicating the window.
export const EGRESS_IP_LOOKUP_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Last non-null egress IP observed for a connection within the window, or
 * null. Best-effort by design: egress_ip is only populated once the egress IP
 * has been probed (cache TTL 5 min), so a cold cache yields null and the
 * caller must fall back to today's behavior. Synchronous read (#10539 — no
 * in-memory cache to go stale). The table has no index on connection_id
 * (migration 134, YAGNI); the scan is bounded by the window via
 * idx_pl_timestamp and this helper only runs at 429 frequency.
 */
export function getRecentEgressIpForConnection(
  connectionId: string,
  since: string
): { egressIp: string; at: string } | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT egress_ip, timestamp FROM proxy_logs
       WHERE connection_id = ? AND egress_ip IS NOT NULL AND timestamp >= ?
       ORDER BY timestamp DESC LIMIT 1`
    )
    .get(connectionId, since) as { egress_ip: string; timestamp: string } | undefined;
  if (!row) return null;
  return { egressIp: row.egress_ip, at: row.timestamp };
}

/**
 * Normalizes a proxy host lookup key: trim, strip one bracket pair, lowercase.
 * Anything that is not a non-empty string normalizes to "" so callers never
 * throw on missing or mistyped input — the reader below maps "" to null.
 */
function normalizeProxyHostKey(host: unknown): string {
  return normalizeProxyHostForLog(host) ?? "";
}

/**
 * Last non-null egress IP observed through a proxy endpoint within the
 * window, keyed by (host, port), or null. Best-effort by design: egress_ip is
 * only populated once the egress IP has been probed (cache TTL 5 min), so a
 * cold cache yields null and the caller must fall back to today's behavior.
 * Synchronous read (no in-memory cache to go stale). The table has no index
 * on (proxy_host, proxy_port) (migration 134, YAGNI); the scan is bounded by
 * the window via idx_pl_timestamp, same as getRecentEgressIpForConnection.
 * The host key is normalized (trim, strip one bracket pair, lowercase);
 * IPv4-mapped IPv6 forms are intentionally not unmapped. The port must be an
 * integer in 1-65535 — anything else returns null instead of throwing.
 */
export function getRecentEgressIpForProxy(
  host: string,
  port: number
): { egressIp: string; at: string } | null {
  const h = normalizeProxyHostKey(host);
  if (!h) return null;
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null;
  const db = getDbInstance();
  const since = new Date(Date.now() - EGRESS_IP_LOOKUP_WINDOW_MS).toISOString();
  const row = db
    .prepare(
      `SELECT egress_ip, timestamp FROM proxy_logs
       WHERE proxy_host = ? AND proxy_port = ?
         AND egress_ip IS NOT NULL AND timestamp >= ?
       ORDER BY timestamp DESC LIMIT 1`
    )
    .get(h, port, since) as { egress_ip: string; timestamp: string } | undefined;
  if (!row) return null;
  return { egressIp: row.egress_ip, at: row.timestamp };
}

export type PoolEgressObservationCounts = {
  connections: number;
  distinctExits: number;
  maxConnectionsOnOneExit: number;
};

export type PoolEgressFailureFamily = {
  family: string;
  count: number;
};

export type PoolEgressFailureExit = {
  exit: string;
  failures: number;
  byFamily: PoolEgressFailureFamily[];
};

export type PoolEgressFailureBreakdown = {
  byExit: PoolEgressFailureExit[];
  byFamily: PoolEgressFailureFamily[];
  unattributed: number;
  attributionNote: string;
};

export type PoolEgressObservation = PoolEgressObservationCounts & {
  failures: PoolEgressFailureBreakdown;
};

// Per-family breakdowns only cover requests whose per-family attribution was
// logged: `proxy_logs.correlation_id` is NULL for legacy rows and whenever the
// attribution flag is off (`isRotationAttributionEnabled()` gates the proxy
// side), while `call_logs.correlation_id` is written by `saveCallLog` with
// no gate. Unmatchable rows land in the explicit `unattributed` bucket.
export const POOL_EGRESS_ATTRIBUTION_NOTE =
  "per-family breakdown covers only requests logged with attribution on";

/**
 * Per-exit failure breakdown for a proxy pool's members since `since`: one row
 * per failed proxied request (`status != 'success'`, i.e. `error` and
 * `timeout`), grouped by egress IP and by call-log error family. Families come
 * from `call_logs.error_type` (persisted vocabulary + `unknown`; NULL means
 * "legacy row / not a failure") joined on `correlation_id`; rows with no
 * correlation or no match land in `unattributed`, never in a family.
 *
 * Same member join and same `egress_ip IS NOT NULL AND connection_id IS NOT
 * NULL` filters as the `connections` counters above, so failure totals stay
 * reconcilable with them (no host:port fallback; note `failures` counts rows
 * via `COUNT(*)` while `connections` counts `DISTINCT connection_id`, so the
 * two are comparable but not equatable). A retry can share one
 * correlation_id across several call_logs rows (precedent:
 * agenticConversations.ts keeps the first match), so a correlated scalar
 * sub-query reads `error_type` from the first row by `rowid`, one index seek
 * per failed request on `idx_cl_correlation_id` instead of a pass over the
 * whole call_logs table. The family is computed in a derived table and grouped
 * outside it: grouping on the scalar sub-query's alias in the same SELECT
 * merges distinct families on SQLite. 0 new indexes: the window rides
 * `idx_pl_timestamp`.
 * `scope`/`scopeId` must already be normalized; an empty pool yields empties.
 */
export function getPoolEgressFailureBreakdown(
  scope: string,
  scopeId: string | null,
  since: string
): PoolEgressFailureBreakdown {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT exit, family, COUNT(*) AS n
       FROM (
         SELECT l.egress_ip AS exit,
                (SELECT c.error_type FROM call_logs c
                 WHERE c.correlation_id = l.correlation_id
                 ORDER BY c.rowid LIMIT 1) AS family
         FROM proxy_logs l
         JOIN proxy_registry r ON l.proxy_host = r.host AND l.proxy_port = r.port
         WHERE r.id IN (SELECT proxy_id FROM proxy_assignments WHERE scope = ? AND scope_id IS ?)
           AND l.timestamp >= ? AND l.status != 'success'
           AND l.egress_ip IS NOT NULL AND l.connection_id IS NOT NULL
       )
       GROUP BY exit, family
       ORDER BY exit ASC`
    )
    .all(scope, scopeId, since) as Array<{ exit: string; family: string | null; n: number }>;
  const byExitMap = new Map<string, Map<string, number>>();
  const byFamilyMap = new Map<string, number>();
  let unattributed = 0;
  for (const row of rows) {
    const family = row.family ?? "unattributed";
    let exitFamilies = byExitMap.get(row.exit);
    if (!exitFamilies) {
      exitFamilies = new Map<string, number>();
      byExitMap.set(row.exit, exitFamilies);
    }
    exitFamilies.set(family, (exitFamilies.get(family) ?? 0) + row.n);
    byFamilyMap.set(family, (byFamilyMap.get(family) ?? 0) + row.n);
    if (family === "unattributed") unattributed += row.n;
  }
  const sortFamilies = (entries: Array<[string, number]>): PoolEgressFailureFamily[] =>
    entries
      .map(([family, count]) => ({ family, count }))
      .sort((a, b) => b.count - a.count || (a.family < b.family ? -1 : 1));
  return {
    byExit: [...byExitMap.entries()].map(([exit, families]) => ({
      exit,
      failures: [...families.values()].reduce((sum, n) => sum + n, 0),
      byFamily: sortFamilies([...families.entries()]),
    })),
    byFamily: sortFamilies([...byFamilyMap.entries()]),
    unattributed,
    attributionNote: POOL_EGRESS_ATTRIBUTION_NOTE,
  };
}

/**
 * How many distinct observed egress IPs served a proxy pool's members since `since`, how
 * many OmniRoute connections went through them, and the most connections seen behind one
 * egress IP over that window. Members are matched to log rows by host and port, so two
 * registry rows sharing one entry point count together. Only numbers leave this function.
 * `scope` and `scopeId` must already be normalized (normalizeScope and
 * normalizeAssignmentScopeId); an empty pool simply matches no rows.
 */
export function getPoolEgressObservation(
  scope: string,
  scopeId: string | null,
  since: string
): PoolEgressObservation {
  const db = getDbInstance();
  const perExit = db
    .prepare(
      `SELECT COUNT(DISTINCT l.connection_id) AS n
       FROM proxy_logs l
       JOIN proxy_registry r ON l.proxy_host = r.host AND l.proxy_port = r.port
       WHERE r.id IN (SELECT proxy_id FROM proxy_assignments WHERE scope = ? AND scope_id IS ?)
         AND l.timestamp >= ? AND l.egress_ip IS NOT NULL AND l.connection_id IS NOT NULL
       GROUP BY l.egress_ip`
    )
    .all(scope, scopeId, since) as Array<{ n: number }>;
  const total = db
    .prepare(
      `SELECT COUNT(DISTINCT l.connection_id) AS n
       FROM proxy_logs l
       JOIN proxy_registry r ON l.proxy_host = r.host AND l.proxy_port = r.port
       WHERE r.id IN (SELECT proxy_id FROM proxy_assignments WHERE scope = ? AND scope_id IS ?)
         AND l.timestamp >= ? AND l.egress_ip IS NOT NULL AND l.connection_id IS NOT NULL`
    )
    .get(scope, scopeId, since) as { n: number };
  return {
    connections: total.n,
    distinctExits: perExit.length,
    maxConnectionsOnOneExit: perExit.reduce((max, row) => Math.max(max, row.n), 0),
    failures: getPoolEgressFailureBreakdown(scope, scopeId, since),
  };
}
