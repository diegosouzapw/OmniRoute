import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { tryAgentAuth, tryIdeAuth } from "@/lib/cursor/tokenExtractor";

/**
 * GET /api/oauth/cursor/auto-import
 * Auto-detect and extract Cursor tokens from:
 *   1. Cursor IDE's local SQLite database (state.vscdb) — includes machineId
 *   2. cursor-agent CLI's auth.json — fallback, no machineId
 *
 * 🔒 Auth-guarded: requires JWT cookie or Bearer API key (finding #258-4).
 */
export async function GET(request: Request) {
  // GHSA-mg76 / GHSA-gxv4: reading/importing host credentials is a management action.
  const authError = await requireManagementAuth(request, { invalidApiKeyStatus: 401 });
  if (authError) return authError;

  try {
    // Try Cursor IDE first (has both accessToken and machineId)
    const ideResult = await tryIdeAuth();
    if (ideResult.found) {
      return NextResponse.json({
        found: true,
        accessToken: ideResult.accessToken,
        refreshToken: ideResult.refreshToken,
        machineId: ideResult.machineId,
        source: ideResult.source,
      });
    }

    // Fall back to cursor-agent CLI auth (accessToken only, no machineId)
    const agentResult = await tryAgentAuth();
    if (agentResult.found) {
      return NextResponse.json({
        found: true,
        accessToken: agentResult.accessToken,
        source: agentResult.source,
      });
    }

    return NextResponse.json({
      found: false,
      error: "No Cursor credentials found. Install Cursor IDE or login with cursor-agent.",
    });
  } catch (error) {
    console.error("Cursor auto-import error:", error);
    return NextResponse.json({ found: false, error: "Internal server error" }, { status: 500 });
  }
}
