/**
 * POST /api/services/9router/provider-expose
 *
 * Toggle provider exposure for the 9router embedded service.
 * When enabled, 9Router models are discoverable as `9router/...` in OmniRoute routing.
 *
 * Body: { enabled: boolean }
 * Response: 204 No Content on success.
 *
 * Route is under /api/services/ — already classified LOCAL_ONLY in routeGuard.ts.
 */

import { z } from "zod";
import { updateServiceField } from "@/lib/db/versionManager";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const BodySchema = z.object({ enabled: z.boolean() });

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({ status: 400, message: parsed.error.message });
  }

  try {
    await updateServiceField("9router", "providerExpose", parsed.data.enabled);
    return new Response(null, { status: 204 });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
