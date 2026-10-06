/**
 * GET /v1/explain/routing — routing explainability + feedback state.
 *
 * Returns the most recent routing events (bounded in-memory ring buffer) and
 * the per-provider/model quality snapshot produced by the feedback foundation
 * (open-sse/services/routing). This is REAL decision data — the events were
 * emitted by the request hot path, not recomputed after the fact.
 *
 * Safety: only routing metadata (provider/model/strategy/timing/tokens/outcome/
 * status/finish_reason). Never prompts, bodies, headers, credentials, accounts.
 *
 * Auth mirrors /v1/combos: valid Bearer API key or dashboard session. With
 * REQUIRE_API_KEY=false (single-user local deployments) anonymous read is
 * allowed, matching /v1/models behavior.
 */
import { NextResponse } from "next/server";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import {
  recentRoutingEvents,
  routingQualitySnapshot,
  routingOtelStats,
  initRoutingObservability,
  classifyQuality,
} from "@omniroute/open-sse/services/routing/index.ts";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(request: Request) {
  const apiKeyRaw = extractApiKey(request);
  const apiKeyOk = apiKeyRaw ? await isValidApiKey(apiKeyRaw) : false;
  const dashboardOk = !apiKeyOk ? await isDashboardSessionAuthenticated(request) : false;

  if (!apiKeyOk && !dashboardOk && isRequireApiKeyEnabled()) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }

  try {
    const limit = Math.min(
      500,
      Math.max(1, Number(new URL(request.url).searchParams.get("limit")) || 50)
    );
    const { sinks, otelEnabled } = initRoutingObservability();
    const quality = routingQualitySnapshot(limit).map((q) => ({
      ...q,
      classification: classifyQuality(q),
    }));
    return NextResponse.json(
      {
        object: "routing_explain",
        sinks,
        otelEnabled,
        events: recentRoutingEvents(limit),
        quality,
        otel: routingOtelStats(),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return errorResponse(HTTP_STATUS.SERVER_ERROR, "Failed to build routing explain payload");
  }
}
