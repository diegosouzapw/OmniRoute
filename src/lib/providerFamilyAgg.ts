import { PROVIDER_CONNECTION_FAMILY_ALIASES } from "@/shared/constants/providers";

/**
 * Provider family aggregation for call_logs stats (#15005).
 *
 * The SQL in `src/lib/db/callLogStats.ts` stays grouped by the raw
 * `call_logs.provider` column so the correlated `lastStatus` /
 * `lastErrorStatus` subqueries keep seeking `idx_cl_provider_timestamp`
 * (migration 175) and the dashboard topology keeps one metrics entry per
 * member node (e.g. `kimi-coding-apikey`). Family totals are folded here, in
 * JS, over those per-member rows.
 */

/**
 * Resolution entries that win over the declared family map. xai-oauth stays
 * the stats key for the xai family (dashboard keeps a single xai-oauth row).
 */
const FAMILY_SPECIAL_CANONICAL: ReadonlyArray<readonly [string, string]> = [
  ["xao", "xai-oauth"],
  ["xai-oauth", "xai-oauth"],
  ["xai", "xai"],
];

let cachedFamilyCanonicalOf: Map<string, string> | null = null;

/**
 * Member id to canonical family id. Special entries first, then per map entry
 * the canonical identity before its members; the first writer wins so the
 * freepik/magnific pair resolves to magnific either way round.
 */
export function buildFamilyCanonicalOf(): Map<string, string> {
  if (cachedFamilyCanonicalOf) return cachedFamilyCanonicalOf;
  const table = new Map<string, string>();
  const setIfAbsent = (member: string, canonical: string) => {
    if (!table.has(member)) table.set(member, canonical);
  };
  for (const [member, canonical] of FAMILY_SPECIAL_CANONICAL) {
    setIfAbsent(member, canonical);
  }
  for (const [canonical, members] of Object.entries(PROVIDER_CONNECTION_FAMILY_ALIASES)) {
    setIfAbsent(canonical, canonical);
    for (const member of members) setIfAbsent(member, canonical);
  }
  cachedFamilyCanonicalOf = table;
  return table;
}

export function familyCanonicalOf(provider: string): string {
  return buildFamilyCanonicalOf().get(provider) ?? provider;
}

interface LatencyAggregate {
  provider: string;
  avgLatencyMs: number | null;
  latencySamples?: number | null;
}

/** Sample-weighted mean of per-member `ROUND(AVG(duration))` values. */
function weightedLatency(rows: LatencyAggregate[]): number | null {
  let weight = 0;
  let sum = 0;
  for (const row of rows) {
    const samples = Number(row.latencySamples ?? 0);
    if (row.avgLatencyMs == null || samples <= 0) continue;
    weight += samples;
    sum += Number(row.avgLatencyMs) * samples;
  }
  return weight > 0 ? Math.round(sum / weight) : null;
}

function maxIso(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return b > a ? b : a;
}

function groupByFamily<T extends { provider: string }>(rows: T[]): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const canonical = familyCanonicalOf(row.provider);
    const group = groups.get(canonical);
    if (group) group.push(row);
    else groups.set(canonical, [row]);
  }
  return groups;
}

export interface FamilyUsageRow extends LatencyAggregate {
  requests: number;
  successes: number;
  lastRequestAt: string | null;
}

/** Folds per-member usage rows into one row per canonical family id. */
export function foldUsageRowsByFamily<T extends FamilyUsageRow>(rows: T[]): T[] {
  return [...groupByFamily(rows)].map(([canonical, group]) => ({
    ...group[0],
    provider: canonical,
    requests: group.reduce((n, r) => n + Number(r.requests ?? 0), 0),
    successes: group.reduce((n, r) => n + Number(r.successes ?? 0), 0),
    avgLatencyMs: weightedLatency(group),
    latencySamples: group.reduce((n, r) => n + Number(r.latencySamples ?? 0), 0),
    lastRequestAt: group.reduce<string | null>((m, r) => maxIso(m, r.lastRequestAt), null),
  }));
}

export interface FamilyMetricRow extends LatencyAggregate {
  totalRequests: number;
  totalSuccesses: number;
  lastRequestAt: string | null;
  lastErrorAt: string | null;
  lastStatus: number | null;
  lastErrorStatus: number | null;
}

/**
 * Family aggregates over per-member metric rows, only for families that
 * actually fold something (a member id differing from the canonical id).
 * `lastStatus` / `lastErrorStatus` come from the member whose newest request /
 * newest error is the most recent across the family.
 */
export function foldMetricRowsByFamily<T extends FamilyMetricRow>(rows: T[]): T[] {
  const out: T[] = [];
  for (const [canonical, group] of groupByFamily(rows)) {
    if (group.every((r) => r.provider === canonical)) continue;
    let newest = group[0];
    let newestError: T | null = null;
    for (const row of group) {
      if ((row.lastRequestAt ?? "") > (newest.lastRequestAt ?? "")) newest = row;
      if (row.lastErrorAt && (!newestError || row.lastErrorAt > (newestError.lastErrorAt ?? ""))) {
        newestError = row;
      }
    }
    out.push({
      ...newest,
      provider: canonical,
      totalRequests: group.reduce((n, r) => n + Number(r.totalRequests ?? 0), 0),
      totalSuccesses: group.reduce((n, r) => n + Number(r.totalSuccesses ?? 0), 0),
      avgLatencyMs: weightedLatency(group),
      latencySamples: group.reduce((n, r) => n + Number(r.latencySamples ?? 0), 0),
      lastErrorAt: newestError?.lastErrorAt ?? null,
      lastStatus: newest.lastStatus,
      lastErrorStatus: newestError?.lastErrorStatus ?? null,
    });
  }
  return out;
}
