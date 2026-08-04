import { NextResponse } from "next/server";
import { getCacheStats } from "@omniroute/open-sse/services/searchCache.ts";
import { SEARCH_PROVIDERS } from "@omniroute/open-sse/config/searchRegistry.ts";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getSearchProviderStats, getRecentSearchLogs } from "@/lib/db/callLogStats";

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const cache = getCacheStats();

    // Provider aggregate stats — cost is per-query from registry
    const providerStats = getSearchProviderStats();

    const providers: Record<
      string,
      { requests: number; avg_latency_ms: number; total_cost: number }
    > = {};
    for (const row of providerStats) {
      const costPerQuery = SEARCH_PROVIDERS[row.provider]?.costPerQuery || 0;
      providers[row.provider] = {
        requests: row.requests,
        avg_latency_ms: row.avg_latency_ms,
        total_cost: parseFloat((row.requests * costPerQuery).toFixed(4)),
      };
    }

    // Recent searches
    const recentRows = getRecentSearchLogs();

    const recent_searches = recentRows.map((row) => {
      let query = "";
      let filters = {};
      try {
        const summary = JSON.parse(row.request_summary ?? "");
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
