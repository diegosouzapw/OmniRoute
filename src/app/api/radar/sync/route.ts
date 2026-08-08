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
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { syncRadar } from "@/lib/radar/sync";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Empty body — sync has no user-configurable parameters
const SyncBodySchema = z.object({}).strict().optional();

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(request: Request) {
  // Flag gate — MUST run before auth (byte-identical flag-off inertia).
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

  // Validate body (must be empty or absent)
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = undefined;
  }

  const parsed = SyncBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      buildErrorBody(400, "Invalid request body"),
      { status: 400, headers: CORS_HEADERS },
    );
  }

  try {
    const result = await syncRadar();
    return NextResponse.json(result, { headers: CORS_HEADERS });
  } catch (err: unknown) {
    const { sanitizeErrorMessage } = await import("@omniroute/open-sse/utils/error");
    return NextResponse.json(
      buildErrorBody(500, sanitizeErrorMessage(err) || "Radar sync failed"),
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
