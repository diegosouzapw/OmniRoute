import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { getCcDiscoveryMetrics } from "@/lib/db/ccDiscoveryMetrics";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/**
 * GET /api/settings/cc-discovery-metrics — usage counters for the Claude Code
 * discovery-alias feature: how many requests were served via a resolved
 * `claude/…` mirror id (total + per-model breakdown), and how many
 * `GET /v1/models` catalog hits were detected as coming from Claude Code.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const metrics = getCcDiscoveryMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json(
      buildErrorBody(
        500,
        error instanceof Error ? error.message : "Failed to load cc-discovery metrics"
      ),
      { status: 500 }
    );
  }
}
