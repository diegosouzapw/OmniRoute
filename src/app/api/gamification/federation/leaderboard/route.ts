import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { type LeaderboardScope, getTopN } from "@/lib/gamification/leaderboard";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/gamification/federation/leaderboard — Serve leaderboard for federation
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const scope: LeaderboardScope = (url.searchParams.get("scope") || "global") as LeaderboardScope;
  const limit = Number(url.searchParams.get("limit") || 100);

  const entries = await getTopN(scope, limit);

  return NextResponse.json(
    {
      entries: entries.map((e: any) => ({
        apiKeyId: e.apiKeyId,
        score: e.score,
      })),
    },
    { headers: CORS_HEADERS }
  );
}
