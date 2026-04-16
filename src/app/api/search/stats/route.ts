import { NextResponse } from "next/server";
import { getCacheStats } from "@omniroute/open-sse/services/searchCache.ts";
import { SEARCH_PROVIDERS } from "@omniroute/open-sse/config/searchRegistry.ts";
import { getDbInstance } from "@/lib/db/core";
import { isAuthenticated } from "@/shared/utils/apiAuth";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const db = getDbInstance();
    const cache = getCacheStats();

    // Provider aggregate stats — cost is per-query from registry
    const providerStats = db
      .prepare(
        `
        SELECT provider, COUNT(*) as requests,
          CAST(AVG(duration) AS INTEGER) as avg_latency_ms
        FROM call_logs
        WHERE request_type = 'search'
        GROUP BY provider
      `
      )
      .all();

    const providers: Record<
      string,
      { requests: number; avg_latency_ms: number; total_cost: number }
    > = {};
    for (const row of providerStats as any[]) {
      const costPerQuery = SEARCH_PROVIDERS[row.provider]?.costPerQuery || 0;
      providers[row.provider] = {
        requests: row.requests,
        avg_latency_ms: row.avg_latency_ms,
        total_cost: parseFloat((row.requests * costPerQuery).toFixed(4)),
      };
    }

    // Recent searches
    const recentRows = db
      .prepare(
        `
        SELECT request_summary, provider, timestamp
        FROM call_logs
        WHERE request_type = 'search'
        ORDER BY timestamp DESC
        LIMIT 10
      `
      )
      .all();

    const recent_searches = (recentRows as any[]).map((row) => {
      let query = "";
      let filters = {};
      try {
        const summary = JSON.parse(row.request_summary);
        query = summary.query || "";
        filters = summary.filters || {};
      } catch {
        // Unparseable request_summary
      }
      return {
        query,
        provider: row.provider,
        timestamp: row.timestamp,
        filters,
      };
    });

    return NextResponse.json({ cache, providers, recent_searches });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get stats" }, { status: 500 });
  }
}
