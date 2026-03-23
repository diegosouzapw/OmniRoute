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

    // Total search requests
    const totalRow = db
      .prepare(`SELECT COUNT(*) as cnt FROM call_logs WHERE request_type = 'search'`)
      .get() as { cnt: number };
    const total = totalRow?.cnt ?? 0;

    // Today's searches (UTC date)
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayRow = db
      .prepare(
        `SELECT COUNT(*) as cnt FROM call_logs WHERE request_type = 'search' AND timestamp >= ?`
      )
      .get(todayStart.toISOString()) as { cnt: number };
    const today = todayRow?.cnt ?? 0;

    // Errors
    const errRow = db
      .prepare(
        `SELECT COUNT(*) as cnt FROM call_logs WHERE request_type = 'search' AND (status >= 400 OR error IS NOT NULL)`
      )
      .get() as { cnt: number };
    const errors = errRow?.cnt ?? 0;

    // Avg duration
    const durRow = db
      .prepare(
        `SELECT AVG(duration) as avg FROM call_logs WHERE request_type = 'search' AND duration > 0`
      )
      .get() as { avg: number | null };
    const avgDurationMs = Math.round(durRow?.avg ?? 0);

    // Per-provider breakdown (provider column stores search provider id)
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

    // Cached: very fast responses (< 5ms) indicate cache hits
    const cachedRow = db
      .prepare(
        `SELECT COUNT(*) as cnt FROM call_logs 
         WHERE request_type = 'search' AND duration > 0 AND duration < 5`
      )
      .get() as { cnt: number };
    const cached = cachedRow?.cnt ?? 0;
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
