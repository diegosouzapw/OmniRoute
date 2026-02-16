import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core.js";

/**
 * GET /api/providers/metrics — Aggregate per-provider stats from call_logs
 * Returns: { metrics: { [provider]: { totalRequests, totalSuccesses, successRate, avgLatencyMs } } }
 */
export async function GET() {
  try {
    const db = getDbInstance();
    const rows = db
      .prepare(
        `SELECT
          provider,
          COUNT(*) as totalRequests,
          SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) as totalSuccesses,
          ROUND(AVG(duration)) as avgLatencyMs
        FROM call_logs
        WHERE provider IS NOT NULL AND provider != '-'
        GROUP BY provider`
      )
      .all();

    const metrics = {};
    for (const row of rows) {
      metrics[row.provider] = {
        totalRequests: row.totalRequests,
        totalSuccesses: row.totalSuccesses,
        successRate:
          row.totalRequests > 0 ? Math.round((row.totalSuccesses / row.totalRequests) * 100) : 0,
        avgLatencyMs: row.avgLatencyMs || 0,
      };
    }

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error("[providers/metrics] Error:", error);
    return NextResponse.json({ metrics: {} });
  }
}
