/**
 * GET /api/gamification/badges/earned — badges earned by a key, or the operator-wide
 * earned set (distinct across all keys) when no `apiKeyId` is supplied. (#3484)
 *
 * LOCAL_ONLY: not process-spawning; management-scoped via requireManagementAuth.
 */
import { NextRequest, NextResponse } from "next/server";

import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getBadges, getAllEarnedBadges } from "@/lib/db/gamification";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const apiKeyId = new URL(request.url).searchParams.get("apiKeyId");
  const badges = apiKeyId ? getBadges(apiKeyId) : getAllEarnedBadges();
  return NextResponse.json({ badges }, { headers: CORS_HEADERS });
}
