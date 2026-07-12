import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getLeaderboard } from "@/lib/leaderboard/scraper";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get("refresh") === "true";

  try {
    const leaderboard = await getLeaderboard(forceRefresh);
    return NextResponse.json(leaderboard, { headers: CORS_HEADERS });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch leaderboard";
    return NextResponse.json({ error: message }, { status: 502, headers: CORS_HEADERS });
  }
}
