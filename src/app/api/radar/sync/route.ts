/**
 * POST /api/radar/sync — trigger a Radar feed sync server-side.
 *
 * Calls syncRadar() which handles all gating (flag, opt-in, Ed25519
 * verification, schema validation, version floor). Returns the status
 * object. Never proxies the feed URL to the client.
 *
 * Flag off => 404, checked BEFORE auth (byte-identical flag-off inertia).
 * Unauthenticated access once the flag is on => 401.
 */

import { NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { syncRadar } from "@/lib/radar/sync";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { radarSyncBodyError, validateRadarSyncBody } from "../syncRequest";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request) {
  // Flag gate — MUST run before auth (byte-identical flag-off inertia).
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(buildErrorBody(404, "Not found"), {
      status: 404,
      headers: CORS_HEADERS,
    });
  }

  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Unauthorized"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  const bodyError = radarSyncBodyError(await validateRadarSyncBody(request));
  if (bodyError) {
    return NextResponse.json(buildErrorBody(bodyError.status, bodyError.message), {
      status: bodyError.status,
      headers: CORS_HEADERS,
    });
  }

  try {
    const result = await syncRadar();
    return NextResponse.json(result, { headers: CORS_HEADERS });
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Radar sync failed"),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
