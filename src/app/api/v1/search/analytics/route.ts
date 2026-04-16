/**
 * GET /api/v1/search/analytics
 *
 * Returns search request statistics from call_logs (request_type = 'search').
 * Includes provider breakdown, cache hit rate, cost summary, and error count.
 */

import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";

export async function GET(req: Request) {
  const policy = await enforceApiKeyPolicy(req, "analytics");
  if (policy.rejection) return policy.rejection;

  try {
    const db = getDbInstance();

    // Single aggregated query for all scalar metrics — replaces 5 separate round-trips
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayIso = todayStart.toISOString();

    type StatsRow = {
      total: number;
      today: number;
      errors: number;
      avg_duration: number | null;
      cached: number;
    };
    const statsRow = db
      .prepare(
        `SELECT
          COUNT(*) as total,
          COALESCE(SUM(CASE WHEN timestamp >= ? THEN 1 ELSE 0 END), 0) as today,
          COALESCE(SUM(CASE WHEN status >= 400 OR error_summary IS NOT NULL THEN 1 ELSE 0 END), 0) as errors,
          AVG(CASE WHEN duration > 0 THEN duration END) as avg_duration,
          COALESCE(SUM(CASE WHEN duration > 0 AND duration < 5 THEN 1 ELSE 0 END), 0) as cached
         FROM call_logs
         WHERE request_type = 'search'`
      )
      .get(todayIso) as StatsRow | undefined;

    const total = statsRow?.total ?? 0;
    const today = statsRow?.today ?? 0;
    const errors = statsRow?.errors ?? 0;
    const avgDurationMs = Math.round(statsRow?.avg_duration ?? 0);
    const cached = statsRow?.cached ?? 0;

    // Per-provider breakdown
    const provRows = db
      .prepare(
        `SELECT provider, COUNT(*) as cnt
         FROM call_logs WHERE request_type = 'search'
         GROUP BY provider ORDER BY cnt DESC`
      )
      .all() as Array<{ provider: string; cnt: number }>;

    // Cost per search provider (matching searchRegistry.ts rates)
    const COST_PER_QUERY: Record<string, number> = {
      "serper-search": 0.001,
      "brave-search": 0.003,
      "perplexity-search": 0.005,
      "exa-search": 0.01,
      "tavily-search": 0.004,
    };

    const byProvider: Record<string, { count: number; costUsd: number }> = {};
    let totalCostUsd = 0;
    for (const row of provRows) {
      const cost = (COST_PER_QUERY[row.provider] ?? 0.001) * row.cnt;
      byProvider[row.provider] = { count: row.cnt, costUsd: cost };
      totalCostUsd += cost;
    }

    const cacheHitRate = total > 0 ? Math.round((cached / total) * 100) : 0;

    return NextResponse.json({
      total,
      today,
      cached,
      errors,
      totalCostUsd,
      byProvider,
      cacheHitRate,
      avgDurationMs,
      last24h: [],
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/v1/search/analytics]", msg);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
