import { z } from "zod";
import { errorResponse } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { readUniformEgressRegime } from "@/lib/proxyPoolEgressObservation";
import {
  formatValidationMessage,
  isValidationFailure,
  validateBody,
} from "@/shared/validation/helpers";

// Whether every exit of one provider fails upstream together, read from the
// proxy log (numbers only). Kept apart from GET /api/settings/proxies/pool on
// purpose: a failure here answers null and can never break the pool editor.
// Same management-auth tier as the pool route.
//
//   GET ?provider=<name>&hours=<1..24, default 1>
//     -> { provider, windowHours, attempts, measured, share5xx, exitsTouched,
//          exitsWithTraffic, affectedExits, uniform, state } | null (unknown
//          provider, read failed, or the PROXY_POOL_EGRESS_OBSERVATION flag
//          is off)
//     -> 400 on a missing/blank provider or hours outside 1..24
//
// A uniform 5xx regime means the provider fails as a whole — never an exit
// problem — but the line never calls the provider down.

const uniformEgressQuerySchema = z.object({
  provider: z.string().trim().min(1).max(256),
  hours: z.coerce.number().int().min(1).max(24).default(1),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const validation = validateBody(uniformEgressQuerySchema, {
      provider: searchParams.get("provider") ?? undefined,
      hours: searchParams.get("hours") ?? undefined,
    });
    if (isValidationFailure(validation)) {
      return errorResponse(400, formatValidationMessage(validation.error));
    }
    const { provider, hours } = validation.data;
    return Response.json(readUniformEgressRegime(provider, hours));
  } catch {
    return errorResponse(500, "Failed to load uniform egress regime");
  }
}
