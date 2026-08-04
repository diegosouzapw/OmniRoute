/**
 * Discovery scan — POST /api/discovery/scan
 *
 * Triggers a scan for one provider and persists the findings. Body:
 * `{ "providerId": "<id>" }`.
 *
 * Auth: Tier 3 MANAGEMENT + strict local-only (see ../results/route.ts). The
 * strict-loopback classification matters here specifically: `scanProvider` may
 * probe outbound provider endpoints (SSRF-adjacent), so the surface must never
 * be reachable from a tunnel/remote origin.
 */

import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { scanProvider, persistDiscoveryResult } from "@/lib/discovery/index";

const scanRequestSchema = z.object({
  providerId: z.string().min(1).max(200),
});

export async function POST(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid request",
      details: [{ field: "body", message: "Invalid JSON body" }],
    });
  }

  const validation = validateBody(scanRequestSchema, raw);
  if (isValidationFailure(validation)) {
    return createErrorResponse({
      status: 400,
      message: validation.error.message,
      details: validation.error.details,
    });
  }

  try {
    const found = await scanProvider(validation.data.providerId);
    const persisted = found.map((result) => persistDiscoveryResult(result));
    return Response.json({ results: persisted });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to scan provider");
  }
}
