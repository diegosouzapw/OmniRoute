import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import {
  getTopN,
  getRank,
  getNeighbors,
  type LeaderboardScope,
} from "@/lib/gamification/leaderboard";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const scope = (url.searchParams.get("scope") || "global") as LeaderboardScope;
  const limit = Number(url.searchParams.get("limit") || 50);
  const apiKeyId = url.searchParams.get("apiKeyId");

  const entries = await getTopN(scope, Math.min(limit, 200));
  let myRank: number | null = null;
  let neighbors = null;

  if (apiKeyId) {
    myRank = await getRank(apiKeyId, scope);
    neighbors = await getNeighbors(apiKeyId, scope);
  }

  return NextResponse.json({ entries, myRank, neighbors }, { headers: CORS_HEADERS });
}
