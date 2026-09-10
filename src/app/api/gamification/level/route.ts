/**
 * GET /api/gamification/level — current XP/level for a key, or the operator-wide
 * aggregate when no `apiKeyId` is supplied (the dashboard profile page case). (#3484)
 * The daily streak rides along in the same payload so the profile streak card can show
 * real data without a second round trip. (#2403)
 *
 * LOCAL_ONLY: not process-spawning; management-scoped via requireManagementAuth.
 */
import { NextRequest, NextResponse } from "next/server";

import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getXp, getAggregateXp } from "@/lib/db/gamification";
import { getStreak, getAggregateStreak } from "@/lib/gamification/streaks";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const apiKeyId = new URL(request.url).searchParams.get("apiKeyId");
  const level = apiKeyId ? getXp(apiKeyId) : getAggregateXp();
  const streakData = apiKeyId ? await getStreak(apiKeyId) : await getAggregateStreak();
  const streak = { current: streakData.currentStreak, longest: streakData.longestStreak };
  return NextResponse.json({ level, streak }, { headers: CORS_HEADERS });
}
