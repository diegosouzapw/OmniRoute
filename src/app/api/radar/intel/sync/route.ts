/** POST a server-side Radar Intel sync. The browser never receives the supporter key. */

import { NextResponse } from "next/server";

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

import { syncRadarIntel } from "@/lib/radar/intelSync";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { radarSyncBodyError, validateRadarSyncBody } from "../../syncRequest";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request) {
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
    return NextResponse.json(await syncRadarIntel(), { headers: CORS_HEADERS });
  } catch (error: unknown) {
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(error) || "Radar Intel sync failed"),
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
