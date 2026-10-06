/**
 * GET /api/radar/catalog — return the merged Radar catalog from local cache.
 *
 * NEVER proxies the private feed server. The browser talks only to this
 * local endpoint; sync happens server-side via POST /api/radar/sync.
 *
 * Flag off => 404 (the surface doesn't exist when disabled), checked BEFORE
 * auth so flag-off inertia stays byte-identical (no auth required to learn
 * the surface doesn't exist). Unauthenticated access once the flag is on
 * => 401 (management route — dashboard session or a management-scoped key).
 */

import { NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getRadarCatalog } from "@/lib/radar";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: Request) {
  // Flag gate — surface doesn't exist when disabled. MUST run before auth.
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(buildErrorBody(404, "Not found"), {
      status: 404,
      headers: { ...CORS_HEADERS, "Cache-Control": "no-store" },
    });
  }

  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Unauthorized"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  try {
    const result = getRadarCatalog();
    return NextResponse.json(
      { entries: result.entries, meta: result.meta },
      { headers: { ...CORS_HEADERS, "Cache-Control": "no-store" } }
    );
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Failed to load Radar catalog"),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
