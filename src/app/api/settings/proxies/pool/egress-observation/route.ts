import { errorResponse } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { readPoolEgressObservation } from "@/lib/proxyPoolEgressObservation";
import { proxyPoolEgressObservationQuerySchema } from "@/shared/validation/schemas";
import {
  formatValidationMessage,
  isValidationFailure,
  validateBody,
} from "@/shared/validation/helpers";

// Observed egress spread of a proxy pool, read from the proxy log (numbers only). Kept
// apart from GET /api/settings/proxies/pool on purpose: a failure here answers null and
// can never break the pool editor. Same management-auth tier as the pool route.
//
//   GET ?scope=global|provider|account|combo|key&scopeId=
//     -> { connections, distinctExits, maxConnectionsOnOneExit, windowHours }
//      | null (read failed, or the PROXY_POOL_EGRESS_OBSERVATION feature flag is off)
//     -> 400 on an unknown scope or a missing scopeId outside global

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const validation = validateBody(proxyPoolEgressObservationQuerySchema, {
      scope: searchParams.get("scope") ?? undefined,
      scopeId: searchParams.get("scopeId"),
    });
    if (isValidationFailure(validation)) {
      return errorResponse(400, formatValidationMessage(validation.error));
    }
    const { scope, scopeId } = validation.data;
    return Response.json(
      readPoolEgressObservation(scope, scope === "global" ? null : (scopeId ?? null))
    );
  } catch {
    return errorResponse(500, "Failed to load pool egress observation");
  }
}
