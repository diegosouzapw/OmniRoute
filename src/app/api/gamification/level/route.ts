/**
 * GET /api/gamification/level — current XP/level for a key, or the operator-wide
 * aggregate when no `apiKeyId` is supplied (the dashboard profile page case). (#3484)
 *
 * LOCAL_ONLY: not process-spawning; management-scoped via requireManagementAuth.
 */
import { NextRequest, NextResponse } from "next/server";

import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getXp, getAggregateXp } from "@/lib/db/gamification";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const apiKeyId = new URL(request.url).searchParams.get("apiKeyId");
  const level = apiKeyId ? getXp(apiKeyId) : getAggregateXp();
  return NextResponse.json({ level }, { headers: CORS_HEADERS });
}
