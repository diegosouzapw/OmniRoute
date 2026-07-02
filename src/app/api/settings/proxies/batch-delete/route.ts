import { z } from "zod";
import { deleteProxyById } from "@/lib/localDb";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const batchDeleteSchema = z.object({
  ids: z.array(z.string()).min(1).max(100),
  force: z.boolean().optional().default(false),
});

/**
 * POST /api/settings/proxies/batch-delete
 * Deletes multiple proxies in a single request.
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

  const validation = validateBody(batchDeleteSchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({ status: 400, message: validation.error.message, type: "invalid_request" });
  }

  const { ids, force } = validation.data;

  try {
    const results: Array<{ id: string; success: boolean; error?: string }> = [];
    let deletedCount = 0;

    for (const id of ids) {
      try {
        if (await deleteProxyById(id, { force })) {
          results.push({ id, success: true });
          deletedCount++;
        } else {
          results.push({ id, success: false, error: "Proxy not found" });
        }
      } catch (err) {
        results.push({ id, success: false, error: err instanceof Error ? err.message : "Unknown error" });
      }
    }

    if (deletedCount > 0) {
      try { clearDispatcherCache(); } catch { /* non-critical */ }
    }

    return Response.json({ success: deletedCount > 0, deleted: deletedCount, failed: ids.length - deletedCount, results });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to batch delete proxies");
  }
}
