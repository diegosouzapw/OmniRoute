import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { type LeaderboardScope, getTopN } from "@/lib/gamification/leaderboard";
import crypto from "crypto";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/gamification/federation/leaderboard — Serve leaderboard for federation
 *
 * Requires bearer token authentication against community_servers.
 */
export async function GET(request: NextRequest) {
  // Authenticate: validate bearer token against community_servers
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing authorization" },
      { status: 401, headers: CORS_HEADERS }
    );
  }

  const token = authHeader.slice(7);
  const tokenHash = crypto
    .pbkdf2Sync(token, "omniroute-federation-salt", 120000, 32, "sha256")
    .toString("hex");
  const { getDbInstance } = await import("@/lib/db/core");
  const db = getDbInstance();
  const server = db
    .prepare("SELECT id FROM community_servers WHERE api_key_hash = ? AND status = 'connected'")
    .get(tokenHash) as { id: string } | undefined;

  if (!server) {
    return NextResponse.json(
      { error: "Invalid or unauthorized token" },
      { status: 403, headers: CORS_HEADERS }
    );
  }

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
