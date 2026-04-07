import { NextResponse } from "next/server";
import { getUsageDb } from "@/lib/usageDb";
import { computeAnalytics } from "@/lib/usageAnalytics";
import { getDbInstance } from "@/lib/db/core";

function getRangeStartIso(range: string): string | null {
  const end = new Date();
  const start = new Date(end);

  switch (range) {
    case "1d":
      start.setDate(start.getDate() - 1);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
    case "90d":
      start.setDate(start.getDate() - 90);
      break;
    case "ytd":
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    case "all":
    default:
      return null;
  }

  return start.toISOString();
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";

    // Cap history load to last 365 days — the heatmap never looks beyond that,
    // and all named ranges (1d/7d/30d/90d/ytd) fall within this window.
    const heatmapSince = new Date();
    heatmapSince.setDate(heatmapSince.getDate() - 365);
    const db = await getUsageDb(heatmapSince.toISOString());
    const history = db.data.history || [];

    // Build connection map for account names
    const { getProviderConnections } = await import("@/lib/localDb");
    const connectionMap: Record<string, string> = {};
    try {
      const connections = await getProviderConnections();
      for (const connRaw of connections as unknown[]) {
        const conn =
          connRaw && typeof connRaw === "object" && !Array.isArray(connRaw)
            ? (connRaw as Record<string, unknown>)
            : {};
        const connectionId =
          typeof conn.id === "string" && conn.id.trim().length > 0 ? conn.id : null;
        if (!connectionId) continue;

        const name =
          (typeof conn.name === "string" && conn.name.trim()) ||
          (typeof conn.email === "string" && conn.email.trim()) ||
          connectionId;
        connectionMap[connectionId] = name;
      }
    } catch {
      /* ignore */
    }

    const analytics: any = await computeAnalytics(history, range, connectionMap);

    // T01: fallback transparency metrics from call_logs (requested_model vs routed model).
    try {
      const db = getDbInstance();
      const sinceIso = getRangeStartIso(range);
      const whereClause = sinceIso ? "WHERE timestamp >= @since" : "";
      const row = db
        .prepare(
          `
          SELECT
            COUNT(*) as total,
            SUM(CASE WHEN requested_model IS NOT NULL AND requested_model != '' THEN 1 ELSE 0 END) as with_requested,
            SUM(CASE
              WHEN requested_model IS NOT NULL
               AND requested_model != ''
               AND model IS NOT NULL
               AND requested_model != model
              THEN 1 ELSE 0 END
            ) as fallbacks
          FROM call_logs
          ${whereClause}
        `
        )
        .get(sinceIso ? { since: sinceIso } : {}) as
        | { total?: number; with_requested?: number; fallbacks?: number }
        | undefined;

      const total = Number(row?.total || 0);
      const withRequested = Number(row?.with_requested || 0);
      const fallbackCount = Number(row?.fallbacks || 0);

      analytics.summary.fallbackCount = fallbackCount;
      analytics.summary.fallbackRatePct =
        withRequested > 0 ? Number(((fallbackCount / withRequested) * 100).toFixed(2)) : 0;
      analytics.summary.requestedModelCoveragePct =
        total > 0 ? Number(((withRequested / total) * 100).toFixed(2)) : 0;
    } catch {
      analytics.summary.fallbackCount = 0;
      analytics.summary.fallbackRatePct = 0;
      analytics.summary.requestedModelCoveragePct = 0;
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Error computing analytics:", error);
    return NextResponse.json({ error: "Failed to compute analytics" }, { status: 500 });
  }
}
