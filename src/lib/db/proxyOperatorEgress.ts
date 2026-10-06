// Operator-provided dated egress observations per pool member (`proxy_operator_egress`).
//
// All SQL for the operator-egress table lives here, never outside `src/lib/db/`.
// The table is keyed by entry point (host, port) + observed address, with the same
// normalization as the journal reader (trim, strip one bracket pair, lowercase;
// port 1-65535). A pushed address that cannot normalize is rejected with its reason,
// never stored. Rows unknown to the proxy registry are kept while fresh (the registry
// can change under the rows; only the window decides) and purged at expiry.
//
// Growth is bounded at every write, in one transaction, in this order:
// (1) purge stale rows, (2) keep the 10 newest rows per touched member,
// (3) past 2000 total rows, evict the oldest rows first. Surplus rows are counted
// in `rejected` with `reason: "cap-evicted"` — a push is a dated observation,
// never a batch error.
import { getDbInstance } from "./core";
import { normalizeProxyHostForLog } from "../proxyLogHost";
import { normalizeEgressAddress } from "@/shared/network/egressAddress";

export const OPERATOR_EGRESS_MAX_ADDRESSES_PER_MEMBER = 10;
export const OPERATOR_EGRESS_MAX_ROWS_TOTAL = 2000;
export const OPERATOR_EGRESS_DEFAULT_WINDOW_HOURS = 24;
export const OPERATOR_EGRESS_MIN_WINDOW_HOURS = 1;
export const OPERATOR_EGRESS_MAX_WINDOW_HOURS = 168;
export const OPERATOR_EGRESS_FUTURE_TOLERANCE_MS = 5 * 60_000;

export type OperatorEgressPushRow = {
  host: string;
  port: number;
  addresses: string[];
  observedAt: string;
};

export type OperatorEgressRejection = {
  member: string;
  address?: string;
  reason: string;
};

export type OperatorEgressUpsertResult = {
  stored: number;
  ignored: number;
  rejected: OperatorEgressRejection[];
};

export type OperatorEgressRead = {
  addresses: Set<string>;
  freshest: { address: string; at: string } | null;
};

let warnedInvalidWindow = false;

/** Test-only: let the next invalid window warn again. */
export function __resetOperatorEgressWarnedForTesting(): void {
  warnedInvalidWindow = false;
}

/**
 * Observation window in hours, read on every read (never cached: the expiry
 * check needs the current value). Out-of-range, non-numeric, or empty input
 * falls back to 24 h with a single process-wide warning, never a throw.
 */
export function readOperatorEgressWindowHours(): number {
  const raw = process.env.PROXY_OPERATOR_EGRESS_WINDOW_HOURS;
  if (raw === undefined) return OPERATOR_EGRESS_DEFAULT_WINDOW_HOURS;
  const trimmed = raw.trim();
  if (!trimmed) {
    if (!warnedInvalidWindow) {
      warnedInvalidWindow = true;
      console.warn(
        `[proxyOperatorEgress] Ignoring invalid PROXY_OPERATOR_EGRESS_WINDOW_HOURS=${JSON.stringify(raw)}: using ${OPERATOR_EGRESS_DEFAULT_WINDOW_HOURS} h`
      );
    }
    return OPERATOR_EGRESS_DEFAULT_WINDOW_HOURS;
  }
  const parsed = Number(trimmed);
  if (
    !Number.isFinite(parsed) ||
    !Number.isInteger(Math.floor(parsed)) ||
    parsed < OPERATOR_EGRESS_MIN_WINDOW_HOURS ||
    parsed > OPERATOR_EGRESS_MAX_WINDOW_HOURS
  ) {
    if (!warnedInvalidWindow) {
      warnedInvalidWindow = true;
      console.warn(
        `[proxyOperatorEgress] Ignoring invalid PROXY_OPERATOR_EGRESS_WINDOW_HOURS=${JSON.stringify(raw)}: using ${OPERATOR_EGRESS_DEFAULT_WINDOW_HOURS} h`
      );
    }
    return OPERATOR_EGRESS_DEFAULT_WINDOW_HOURS;
  }
  return Math.floor(parsed);
}

/**
 * Whether a host:port couple names a registry member. Exact lookup first;
 * the fallback accepts any syntactically usable couple absent from the
 * registry — callers count those rows `ignored`, never a batch error.
 */
export function isKnownProxyMember(host: string, port: number): boolean {
  try {
    const db = getDbInstance();
    const normalized = normalizeProxyHostForLog(host);
    if (!normalized || !Number.isInteger(port) || port < 1 || port > 65535) return false;
    const row = db
      .prepare("SELECT id FROM proxy_registry WHERE host = ? AND port = ? LIMIT 1")
      .get(normalized, port) as { id?: string } | undefined;
    return !!row;
  } catch {
    return false;
  }
}

/**
 * Store one batch of operator observations. All addresses in a batch share the
 * batch `observedAt`; the freshest timestamp wins per address through an atomic
 * upsert (no read-then-write, safe under concurrent pushes). One atomic
 * statement per row, one transaction per call.
 */
export function upsertOperatorEgress(rows: OperatorEgressPushRow[]): OperatorEgressUpsertResult {
  const result: OperatorEgressUpsertResult = { stored: 0, ignored: 0, rejected: [] };
  if (rows.length === 0) return result;
  const db = getDbInstance();
  const nowIso = new Date().toISOString();
  const upsert = db.prepare(
    `INSERT INTO proxy_operator_egress (host, port, address, observed_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT (host, port, address)
     DO UPDATE SET observed_at = max(observed_at, excluded.observed_at)`
  );
  const touched = new Set<string>();
  const write = db.transaction(() => {
    for (const row of rows) {
      const normalizedHost = normalizeProxyHostForLog(row.host);
      const port = Number(row.port);
      if (
        !normalizedHost ||
        !Number.isInteger(port) ||
        port < 1 ||
        port > 65535 ||
        typeof row.observedAt !== "string" ||
        !row.observedAt
      ) {
        result.rejected.push({ member: `${row.host}:${row.port}`, reason: "invalid-member" });
        continue;
      }
      if (!isKnownProxyMember(row.host, port)) result.ignored += row.addresses.length;
      for (const rawAddress of row.addresses) {
        const normalized = normalizeEgressAddress(rawAddress);
        if (normalized === null) {
          result.rejected.push({
            member: `${normalizedHost}:${port}`,
            address: String(rawAddress),
            reason: "unusable-address",
          });
          continue;
        }
        upsert.run(normalizedHost, port, normalized, row.observedAt);
        result.stored++;
        touched.add(`${normalizedHost}:${port}`);
      }
    }
    evictOperatorEgressLocked(db, touched, nowIso, result.rejected);
  });
  write();
  return result;
}

function evictOperatorEgressLocked(
  db: ReturnType<typeof getDbInstance>,
  touched: Set<string>,
  nowIso: string,
  rejected: OperatorEgressRejection[]
): void {
  const windowMs = readOperatorEgressWindowHours() * 60 * 60_000;
  const cutoff = new Date(Date.parse(nowIso) - windowMs).toISOString();
  // (1) Purge stale rows.
  db.prepare("DELETE FROM proxy_operator_egress WHERE observed_at < ?").run(cutoff);
  // (2) Per-member cap: keep the 10 newest rows per touched member. Evicted
  // rows are counted, newest submission order wins the tie.
  const perMember = db.prepare(
    `DELETE FROM proxy_operator_egress
     WHERE host = ? AND port = ?
       AND rowid NOT IN (
         SELECT rowid FROM proxy_operator_egress
         WHERE host = ? AND port = ?
         ORDER BY observed_at DESC, rowid DESC LIMIT ?
       )`
  );
  for (const key of touched) {
    const separator = key.lastIndexOf(":");
    const host = key.slice(0, separator);
    const port = Number(key.slice(separator + 1));
    const evicted = db
      .prepare(
        `SELECT address FROM proxy_operator_egress
       WHERE host = ? AND port = ?
         AND rowid NOT IN (
           SELECT rowid FROM proxy_operator_egress
           WHERE host = ? AND port = ?
           ORDER BY observed_at DESC, rowid DESC LIMIT ?
         )`
      )
      .all(host, port, host, port, OPERATOR_EGRESS_MAX_ADDRESSES_PER_MEMBER) as Array<{
      address: string;
    }>;
    perMember.run(host, port, host, port, OPERATOR_EGRESS_MAX_ADDRESSES_PER_MEMBER);
    for (const row of evicted) {
      rejected.push({ member: key, address: row.address, reason: "cap-evicted" });
    }
  }
  // (3) Total cap: past 2000 rows, evict the oldest rows first.
  const total = (
    db.prepare("SELECT COUNT(*) AS n FROM proxy_operator_egress").get() as { n: number }
  ).n;
  if (total > OPERATOR_EGRESS_MAX_ROWS_TOTAL) {
    const overflow = total - OPERATOR_EGRESS_MAX_ROWS_TOTAL;
    const evicted = db
      .prepare(
        `SELECT host, port, address FROM proxy_operator_egress
         ORDER BY observed_at ASC, rowid ASC LIMIT ?`
      )
      .all(overflow) as Array<{ host: string; port: number; address: string }>;
    db.prepare(
      `DELETE FROM proxy_operator_egress
       WHERE rowid IN (
         SELECT rowid FROM proxy_operator_egress
         ORDER BY observed_at ASC, rowid ASC LIMIT ?
       )`
    ).run(overflow);
    for (const row of evicted) {
      rejected.push({
        member: `${row.host}:${row.port}`,
        address: row.address,
        reason: "cap-evicted",
      });
    }
  }
}

/**
 * Fresh operator-observed addresses for one member. Direct read, never cached:
 * a row that crosses the window must disappear on the next read, not linger
 * behind a TTL. Rows inside the +5 min future tolerance still read as fresh so
 * a push accepted at the edge stays visible. Every address is re-normalized
 * through the shared normalizer.
 */
export function readOperatorEgressForMember(
  host: string,
  port: number,
  nowMs: number = Date.now()
): OperatorEgressRead {
  const empty: OperatorEgressRead = { addresses: new Set(), freshest: null };
  try {
    const normalizedHost = normalizeProxyHostForLog(host);
    if (!normalizedHost || !Number.isInteger(port) || port < 1 || port > 65535) return empty;
    const windowMs = readOperatorEgressWindowHours() * 60 * 60_000;
    const cutoff = new Date(nowMs - windowMs).toISOString();
    const db = getDbInstance();
    const rows = db
      .prepare(
        `SELECT address, observed_at FROM proxy_operator_egress
         WHERE host = ? AND port = ? AND observed_at >= ?
         ORDER BY observed_at DESC`
      )
      .all(normalizedHost, port, cutoff) as Array<{ address: string; observed_at: string }>;
    for (const row of rows) {
      const normalized = normalizeEgressAddress(row.address);
      if (normalized === null) continue;
      if (Date.parse(row.observed_at) - nowMs > OPERATOR_EGRESS_FUTURE_TOLERANCE_MS) continue;
      empty.addresses.add(normalized);
      if (!empty.freshest) empty.freshest = { address: normalized, at: row.observed_at };
    }
    return empty;
  } catch {
    return empty;
  }
}
