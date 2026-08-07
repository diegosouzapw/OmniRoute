/**
 * GET /api/radar/referrals — return the referral links section ("Pegue seus
 * créditos grátis", D28) of the locally cached Radar feed.
 *
 * NEVER proxies the private feed server. Like GET /api/radar/catalog, the
 * browser talks only to this local endpoint; sync happens server-side via
 * POST /api/radar/sync, and this route only reads the cache that sync
 * already wrote.
 *
 * `fixed` referrals are present in every tier (community included, gated
 * server-side); `campaigns` only comes populated on the `live` (supporter)
 * tier — the community artifact publishes `campaigns: []` — so this route
 * never needs to decide tier gating itself, it just relays what the cached
 * feed already contains. `tier` is informative (from the cache row), used
 * by the UI to show a soft upsell note when campaigns is empty.
 *
 * Flag off => 404 (the surface doesn't exist when disabled), checked BEFORE
 * auth. Unauthenticated access once the flag is on => 401 (management route
 * — dashboard session or a management-scoped key).
 */

import { NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getRadarReferrals } from "@/lib/radar";
import { getRadarCache } from "@/lib/db/radar";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request) {
  // Flag gate — surface doesn't exist when disabled. MUST run before auth.
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(
      buildErrorBody(404, "Not found"),
      { status: 404, headers: CORS_HEADERS },
    );
  }

  if (!(await isAuthenticated(request))) {
    return NextResponse.json(
      buildErrorBody(401, "Unauthorized"),
      { status: 401, headers: CORS_HEADERS },
    );
  }

  try {
    const { fixed, campaigns } = getRadarReferrals();
    const cache = getRadarCache();
    return NextResponse.json(
      { fixed, campaigns, tier: cache?.tier ?? null },
      { headers: { ...CORS_HEADERS, "Cache-Control": "no-store" } },
    );
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Failed to load Radar referrals"),
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
