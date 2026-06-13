/**
 * GET /api/v1/search/analytics
 *
 * Returns search request statistics from call_logs (request_type = 'search').
 * Includes provider breakdown, cache hit rate, cost summary, and error count.
 */

import { NextResponse } from "next/server";
import { SEARCH_PROVIDERS } from "@omniroute/open-sse/config/searchRegistry.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { getSearchAggregateStats, getSearchProviderCounts } from "@/lib/db/callLogStats";

export async function GET(req: Request) {
  const policy = await enforceApiKeyPolicy(req, "analytics");
  if (policy.rejection) return policy.rejection;

  try {
    // Single aggregated query for all scalar metrics — replaces 5 separate round-trips
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayIso = todayStart.toISOString();

    const statsRow = getSearchAggregateStats(todayIso);

    const total = statsRow?.total ?? 0;
    const today = statsRow?.today ?? 0;
    const errors = statsRow?.errors ?? 0;
    const avgDurationMs = Math.round(statsRow?.avg_duration ?? 0);
    const cached = statsRow?.cached ?? 0;

    // Per-provider breakdown
    const provRows = getSearchProviderCounts();

    const byProvider: Record<string, { count: number; costUsd: number }> = {};
    let totalCostUsd = 0;
    for (const row of provRows) {
      const costPerQuery = SEARCH_PROVIDERS[row.provider]?.costPerQuery ?? 0;
      const cost = costPerQuery * row.cnt;
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
