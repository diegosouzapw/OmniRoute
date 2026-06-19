/**
 * bifrostShadow.ts — DB domain module for the Bifrost traffic-shadow log.
 *
 * Backs the `bifrost_shadow_events` table (migration 101). Records per-request
 * comparisons between the legacy chatCore path and the parallel Bifrost path
 * during the B6.1 traffic-shadow phase of the v8.1 Bifrost rollout.
 *
 * Cache contract:
 *   - `recordBifrostShadowEvent(event)` — append one comparison row.
 *   - `getBifrostShadowEvents({since, limit})` — operator query for the dashboard.
 *   - `purgeBifrostShadowEvents(olderThan)` — housekeeping; returns row count.
 *   - `getBifrostShadowStats({since})` — aggregate (count, error_rate, p50/p99
 *     latency, agreement_rate).
 *
 * B6.1 is strictly observe-only: the chatCore response is always returned to
 * the user. The shadow call is best-effort; a recordBifrostShadowEvent failure
 * must not affect the user-visible response. Callers in the hot dispatch path
 * are expected to wrap with try/catch — see open-sse/executors/bifrostShadow.ts.
 *
 * See: docs/adr/0031-bifrost-tier1-router.md
 *      PLAN.md § 2.5.2 (B6.1)
 *      open-sse/executors/bifrostShadow.ts
 *      src/lib/db/migrations/101_bifrost_shadow.sql
 */

import { getDbInstance, rowToCamel } from "./core";

// ──────────────── Types ────────────────

export type BifrostShadowStatus = "ok" | "error" | "timeout" | "skipped";

export const BIFROST_SHADOW_STATUSES: readonly BifrostShadowStatus[] = [
  "ok",
  "error",
  "timeout",
  "skipped",
] as const;

export interface BifrostShadowEvent {
  eventId: string;
  chatcoreRequestId: string | null;
  provider: string;
  model: string;
  bifrostStatus: BifrostShadowStatus;
  bifrostLatencyMs: number | null;
  chatcoreLatencyMs: number | null;
  agreementScore: number | null;
  bifrostTokensIn: number | null;
  bifrostTokensOut: number | null;
  chatcoreTokensIn: number | null;
  chatcoreTokensOut: number | null;
  bifrostCostUsd: number | null;
  chatcoreCostUsd: number | null;
  createdAt: string;
}

/** Public input — `eventId` is auto-generated if absent. */
export interface BifrostShadowEventInput {
  eventId?: string;
  chatcoreRequestId?: string | null;
  provider: string;
  model: string;
  bifrostStatus: BifrostShadowStatus;
  bifrostLatencyMs?: number | null;
  chatcoreLatencyMs?: number | null;
  agreementScore?: number | null;
  bifrostTokensIn?: number | null;
  bifrostTokensOut?: number | null;
  chatcoreTokensIn?: number | null;
  chatcoreTokensOut?: number | null;
  bifrostCostUsd?: number | null;
  chatcoreCostUsd?: number | null;
  createdAt?: string;
}

export interface BifrostShadowStats {
  sinceIso: string;
  count: number;
  okCount: number;
  errorCount: number;
  timeoutCount: number;
  skippedCount: number;
  /** error+timeout divided by total non-skipped. 0..1. */
  errorRate: number;
  /** Median Bifrost latency in ms. null if no successful rows. */
  bifrostP50LatencyMs: number | null;
  /** 99th percentile Bifrost latency in ms. null if <100 rows. */
  bifrostP99LatencyMs: number | null;
  /** Median chatCore latency in ms. null if no rows. */
  chatcoreP50LatencyMs: number | null;
  /** 99th percentile chatCore latency in ms. null if <100 rows. */
  chatcoreP99LatencyMs: number | null;
  /** Mean of agreement_score across rows where it's not null. 0..1. */
  meanAgreementScore: number | null;
}

export interface GetBifrostShadowEventsOptions {
  /** ISO timestamp inclusive lower bound. Undefined = no lower bound. */
  since?: string;
  /** Max rows to return. Default 100. Cap at 5,000. */
  limit?: number;
  /** Filter by provider. Undefined = no filter. */
  provider?: string;
  /** Filter by status. Undefined = no filter. */
  bifrostStatus?: BifrostShadowStatus;
}

// ──────────────── Helpers ────────────────

function isValidStatus(status: string): status is BifrostShadowStatus {
  return (
    status === "ok" ||
    status === "error" ||
    status === "timeout" ||
    status === "skipped"
  );
}

function rowToEvent(row: Record<string, unknown>): BifrostShadowEvent | null {
  const camel = rowToCamel(row) ?? {};
  const eventId = typeof camel.eventId === "string" ? camel.eventId : "";
  const provider = typeof camel.provider === "string" ? camel.provider : "";
  const model = typeof camel.model === "string" ? camel.model : "";
  const status = typeof camel.bifrostStatus === "string" ? camel.bifrostStatus : "";
  if (!eventId || !provider || !model || !isValidStatus(status)) {
    return null;
  }
  return {
    eventId,
    chatcoreRequestId:
      typeof camel.chatcoreRequestId === "string" ? camel.chatcoreRequestId : null,
    provider,
    model,
    bifrostStatus: status,
    bifrostLatencyMs:
      typeof camel.bifrostLatencyMs === "number" ? camel.bifrostLatencyMs : null,
    chatcoreLatencyMs:
      typeof camel.chatcoreLatencyMs === "number" ? camel.chatcoreLatencyMs : null,
    agreementScore:
      typeof camel.agreementScore === "number" ? camel.agreementScore : null,
    bifrostTokensIn:
      typeof camel.bifrostTokensIn === "number" ? camel.bifrostTokensIn : null,
    bifrostTokensOut:
      typeof camel.bifrostTokensOut === "number" ? camel.bifrostTokensOut : null,
    chatcoreTokensIn:
      typeof camel.chatcoreTokensIn === "number" ? camel.chatcoreTokensIn : null,
    chatcoreTokensOut:
      typeof camel.chatcoreTokensOut === "number" ? camel.chatcoreTokensOut : null,
    bifrostCostUsd:
      typeof camel.bifrostCostUsd === "number" ? camel.bifrostCostUsd : null,
    chatcoreCostUsd:
      typeof camel.chatcoreCostUsd === "number" ? camel.chatcoreCostUsd : null,
    createdAt: String(camel.createdAt ?? ""),
  };
}

function nearestRankPercentile(sorted: number[], p: number): number | null {
  if (sorted.length === 0) return null;
  const rank = Math.max(1, Math.ceil((p / 100) * sorted.length));
  return sorted[Math.min(sorted.length - 1, rank - 1)];
}

// ──────────────── CRUD ────────────────

/**
 * Append one shadow comparison row. The dispatcher wraps this in try/catch;
 * see open-sse/executors/bifrostShadow.ts. Throws on invalid input so unit
 * tests can assert on bad-data paths.
 */
export function recordBifrostShadowEvent(input: BifrostShadowEventInput): {
  eventId: string;
} {
  if (!input || typeof input !== "object") {
    throw new Error("bifrostShadow.recordBifrostShadowEvent: input is required");
  }
  if (!input.provider || typeof input.provider !== "string") {
    throw new Error("bifrostShadow.recordBifrostShadowEvent: provider is required");
  }
  if (!input.model || typeof input.model !== "string") {
    throw new Error("bifrostShadow.recordBifrostShadowEvent: model is required");
  }
  if (!isValidStatus(input.bifrostStatus)) {
    throw new Error(
      `bifrostShadow.recordBifrostShadowEvent: bifrostStatus must be one of ${BIFROST_SHADOW_STATUSES.join(", ")} (got ${String(input.bifrostStatus)})`
    );
  }

  const eventId =
    typeof input.eventId === "string" && input.eventId.length > 0
      ? input.eventId
      : `bse_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;

  const agreement =
    typeof input.agreementScore === "number" && Number.isFinite(input.agreementScore)
      ? Math.max(0, Math.min(1, input.agreementScore))
      : null;

  const db = getDbInstance();
  db.prepare(
    `INSERT INTO bifrost_shadow_events
       (event_id, chatcore_request_id, provider, model, bifrost_status,
        bifrost_latency_ms, chatcore_latency_ms, agreement_score,
        bifrost_tokens_in, bifrost_tokens_out,
        chatcore_tokens_in, chatcore_tokens_out,
        bifrost_cost_usd, chatcore_cost_usd, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, datetime('now')))`
  ).run(
    eventId,
    input.chatcoreRequestId ?? null,
    input.provider,
    input.model,
    input.bifrostStatus,
    input.bifrostLatencyMs ?? null,
    input.chatcoreLatencyMs ?? null,
    agreement,
    input.bifrostTokensIn ?? null,
    input.bifrostTokensOut ?? null,
    input.chatcoreTokensIn ?? null,
    input.chatcoreTokensOut ?? null,
    input.bifrostCostUsd ?? null,
    input.chatcoreCostUsd ?? null,
    input.createdAt ?? null
  );

  return { eventId };
}

/**
 * Read recent shadow events. Newest-first. Capped at 5,000 rows per query.
 */
export function getBifrostShadowEvents(
  options: GetBifrostShadowEventsOptions = {}
): BifrostShadowEvent[] {
  const limit = Math.max(1, Math.min(5_000, options.limit ?? 100));

  const where: string[] = [];
  const params: unknown[] = [];
  if (options.since) {
    where.push("created_at >= ?");
    params.push(options.since);
  }
  if (options.provider) {
    where.push("provider = ?");
    params.push(options.provider);
  }
  if (options.bifrostStatus && isValidStatus(options.bifrostStatus)) {
    where.push("bifrost_status = ?");
    params.push(options.bifrostStatus);
  }
  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT event_id, chatcore_request_id, provider, model, bifrost_status,
              bifrost_latency_ms, chatcore_latency_ms, agreement_score,
              bifrost_tokens_in, bifrost_tokens_out,
              chatcore_tokens_in, chatcore_tokens_out,
              bifrost_cost_usd, chatcore_cost_usd, created_at
         FROM bifrost_shadow_events
         ${whereSql}
         ORDER BY created_at DESC, event_id DESC
         LIMIT ?`
    )
    .all(...params, limit) as Record<string, unknown>[];

  const out: BifrostShadowEvent[] = [];
  for (const row of rows) {
    const ev = rowToEvent(row);
    if (ev) out.push(ev);
  }
  return out;
}

/**
 * Delete rows older than the given ISO timestamp. Returns the number of
 * rows removed. Housekeeping: run on a cron (e.g. hourly) to keep the
 * table bounded during the 14-day B6 ramp.
 */
export function purgeBifrostShadowEvents(olderThan: string): number {
  if (!olderThan || typeof olderThan !== "string") {
    throw new Error("bifrostShadow.purgeBifrostShadowEvents: olderThan (ISO string) is required");
  }
  const db = getDbInstance();
  const result = db
    .prepare(`DELETE FROM bifrost_shadow_events WHERE created_at < ?`)
    .run(olderThan);
  return result.changes ?? 0;
}

/**
 * Aggregate stats since a given ISO timestamp. Used by the operator
 * dashboard and the B6.1 weekly review. Pure SQL where possible; the
 * percentile computation runs in TypeScript over a sorted slice (cheap,
 * bounded by row count which is purged hourly).
 */
export function getBifrostShadowStats(since: string): BifrostShadowStats {
  if (!since || typeof since !== "string") {
    throw new Error("bifrostShadow.getBifrostShadowStats: since (ISO string) is required");
  }
  const db = getDbInstance();

  const agg = db
    .prepare(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN bifrost_status = 'ok'       THEN 1 ELSE 0 END) AS ok_count,
         SUM(CASE WHEN bifrost_status = 'error'    THEN 1 ELSE 0 END) AS error_count,
         SUM(CASE WHEN bifrost_status = 'timeout'  THEN 1 ELSE 0 END) AS timeout_count,
         SUM(CASE WHEN bifrost_status = 'skipped'  THEN 1 ELSE 0 END) AS skipped_count,
         AVG(agreement_score) AS mean_agreement
       FROM bifrost_shadow_events
       WHERE created_at >= ?`
    )
    .get(since) as {
    total: number;
    ok_count: number | null;
    error_count: number | null;
    timeout_count: number | null;
    skipped_count: number | null;
    mean_agreement: number | null;
  };

  const total = agg?.total ?? 0;
  const ok = agg?.ok_count ?? 0;
  const err = agg?.error_count ?? 0;
  const to = agg?.timeout_count ?? 0;
  const sk = agg?.skipped_count ?? 0;
  const nonSkipped = total - sk;
  const errorRate = nonSkipped > 0 ? (err + to) / nonSkipped : 0;

  // Latencies: pull just the two columns + sort in memory. Bounded by
  // purgeBifrostShadowEvents hourly, so worst case is ~1hr of traffic
  // per provider, which is small enough for an in-process percentile.
  const latencyRows = db
    .prepare(
      `SELECT bifrost_latency_ms, chatcore_latency_ms
         FROM bifrost_shadow_events
         WHERE created_at >= ? AND bifrost_status = 'ok'`
    )
    .all(since) as Array<{ bifrost_latency_ms: number | null; chatcore_latency_ms: number | null }>;

  const bifrostLatencies: number[] = [];
  const chatcoreLatencies: number[] = [];
  for (const r of latencyRows) {
    if (typeof r.bifrost_latency_ms === "number") bifrostLatencies.push(r.bifrost_latency_ms);
    if (typeof r.chatcore_latency_ms === "number") chatcoreLatencies.push(r.chatcore_latency_ms);
  }
  bifrostLatencies.sort((a, b) => a - b);
  chatcoreLatencies.sort((a, b) => a - b);

  return {
    sinceIso: since,
    count: total,
    okCount: ok,
    errorCount: err,
    timeoutCount: to,
    skippedCount: sk,
    errorRate,
    bifrostP50LatencyMs: nearestRankPercentile(bifrostLatencies, 50),
    bifrostP99LatencyMs: nearestRankPercentile(bifrostLatencies, 99),
    chatcoreP50LatencyMs: nearestRankPercentile(chatcoreLatencies, 50),
    chatcoreP99LatencyMs: nearestRankPercentile(chatcoreLatencies, 99),
    meanAgreementScore:
      typeof agg?.mean_agreement === "number" ? agg.mean_agreement : null,
  };
}
