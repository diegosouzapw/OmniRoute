import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getBridgeStats } from "@/lib/guardrails/modalityBridge/bridgeStats";

/**
 * GET /api/modality-bridge/stats — read-only, in-memory Modality Bridge
 * telemetry (per-modality bridged/cacheHits/failures/lastUsedAt counters).
 * Same MANAGEMENT auth tier as GET /api/settings (routeGuard default —
 * intentionally NOT local-only: harmless read-only telemetry, no side effects).
 * Counters reset on process restart; force-dynamic + no-store so the dashboard
 * always sees live values.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  return NextResponse.json(getBridgeStats(), { headers: { "Cache-Control": "no-store" } });
}
