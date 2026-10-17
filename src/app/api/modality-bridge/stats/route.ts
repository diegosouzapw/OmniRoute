import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getBridgeStats } from "@/lib/guardrails/modalityBridge/bridgeStats";
import { getCachedSettings } from "@/lib/db/readCache";
import { getVideoDrilldownSnapshot } from "@/lib/guardrails/videoBridgeDrilldownStore";
import { getVideoBridgePromotionStatus } from "@/lib/guardrails/videoBridgePromotionAllowlist";
import {
  resolveVideoBridgeRuntimeSettings,
  resolveVisionBridgeRuntimeSettings,
} from "@/shared/constants/modalityBridgeDefaults";

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

  const stats = getBridgeStats();
  const settings = await getCachedSettings();
  const drilldown = getVideoDrilldownSnapshot(settings);
  const model =
    resolveVideoBridgeRuntimeSettings(settings).model.trim() ||
    resolveVisionBridgeRuntimeSettings(settings).model.trim();
  // Settings contain a model alias, not a verified provider revision + build SHA.
  // Never infer eligibility from an entry belonging to a different execution context.
  const promotion = {
    model: model || null,
    segmentAware: getVideoBridgePromotionStatus(model),
    contactSheet: getVideoBridgePromotionStatus(model),
    contextVerified: false,
  };
  return NextResponse.json(
    { ...stats, video: { ...stats.video, drilldown, promotion } },
    { headers: { "Cache-Control": "no-store" } }
  );
}
