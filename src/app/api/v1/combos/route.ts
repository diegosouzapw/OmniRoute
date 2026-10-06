/**
 * GET /v1/combos — API-key safe read of combo metadata.
 *
 * Issue #2300: `/api/combos` is management-gated, which blocks integrations
 * like `opencode-omniroute-auth` that need to enrich combo capabilities from
 * a normal Bearer API key. This endpoint exposes the same public metadata
 * with the API-key auth model used by `/v1/models` and projects out internal
 * routing details (account/connection ids, weights, internal labels).
 */
import { NextResponse } from "next/server";
import { getCombos } from "@/lib/db/combos";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { projectComboCollectionWithCapabilities } from "./projectCombo";

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(request: Request) {
  // Accept: (1) valid Bearer API key, (2) dashboard session cookie. Reject
  // anonymous requests so combo metadata isn't world-readable on a deployed
  // proxy unless the operator has explicitly disabled API-key enforcement.
  const apiKeyRaw = extractApiKey(request);
  const apiKeyOk = apiKeyRaw ? await isValidApiKey(apiKeyRaw) : false;
  const dashboardOk = !apiKeyOk ? await isDashboardSessionAuthenticated(request) : false;

  if (!apiKeyOk && !dashboardOk) {
    if (isRequireApiKeyEnabled()) {
      return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
    }
    // REQUIRE_API_KEY=false → still allow anonymous read of public metadata.
    // This mirrors the /v1/models behavior on single-user local deployments.
  }

  try {
    const combos = await getCombos();
    // #3979/#14232: project the full collection through one canonical capability
    // snapshot so nested combos agree with /v1/models without per-member reads.
    const data = projectComboCollectionWithCapabilities(Array.isArray(combos) ? combos : []);

    return NextResponse.json(
      { object: "list", data },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return errorResponse(HTTP_STATUS.SERVER_ERROR, "Failed to fetch combos");
  }
}
