/**
 * GET /api/context/analytics/engine?engineId=&days=
 *
 * Returns per-engine compression analytics aggregated over the requested
 * time window (default: last 7 days).
 *
 * Query params:
 *   engineId  (required) — e.g. "headroom", "caveman", "rtk"
 *   days      (optional, default 7) — lookback window in days
 */

import { NextResponse } from "next/server";
import { getPerEngineAnalytics } from "@/lib/db/compressionAnalytics";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  try {
    const url = new URL(req.url);
    const engineId = url.searchParams.get("engineId");
    if (!engineId) {
      return NextResponse.json({ error: "engineId query parameter is required" }, { status: 400 });
    }

    const daysParam = url.searchParams.get("days");
    const days = daysParam ? Math.max(1, Math.floor(Number(daysParam))) || 7 : 7;

    const result = getPerEngineAnalytics(engineId, days);

    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/context/analytics/engine]", msg);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
