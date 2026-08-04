import { z } from "zod";
import { updateProxy } from "@/lib/localDb";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const batchActivateSchema = z.object({
  ids: z.array(z.string()).min(1).max(500),
  // "active" (bulk enable) or "inactive" (bulk disable). Defaults to enable —
  // the #6246 ask was a way to re-enable proxies an operator had disabled.
  status: z.enum(["active", "inactive"]).optional().default("active"),
});

/**
 * POST /api/settings/proxies/batch-activate
 *
 * Bulk-set the status of multiple proxies in one request (#6246). This is the
 * ONLY automated path allowed to change proxy status — it is an explicit
 * operator action, unlike the reachability probes which are read-only by
 * default (see src/lib/proxyHealth/statusPolicy.ts).
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body", type: "invalid_request" });
  }

  const validation = validateBody(batchActivateSchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({ status: 400, message: validation.error.message, type: "invalid_request" });
  }

  const { ids, status } = validation.data;

  try {
    const results: Array<{ id: string; success: boolean; error?: string }> = [];
    let updatedCount = 0;

    for (const id of ids) {
      try {
        if (await updateProxy(id, { status })) {
          results.push({ id, success: true });
          updatedCount++;
        } else {
          results.push({ id, success: false, error: "Proxy not found" });
        }
      } catch (err) {
        results.push({ id, success: false, error: err instanceof Error ? err.message : "Unknown error" });
      }
    }

    if (updatedCount > 0) {
      try { clearDispatcherCache(); } catch { /* non-critical */ }
    }

    return Response.json({
      success: updatedCount > 0,
      status,
      updated: updatedCount,
      failed: ids.length - updatedCount,
      results,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to batch update proxy status");
  }
}
