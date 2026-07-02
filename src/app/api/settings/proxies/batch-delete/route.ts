import { deleteProxyById } from "@/lib/localDb";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";

/**
 * POST /api/settings/proxies/batch-delete
 * Body: { ids: string[], force?: boolean }
 *
 * Deletes multiple proxies in a single request. Returns per-id results
 * so the UI can show which deletions succeeded and which failed.
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON body",
      type: "invalid_request",
    });
  }

  const body = rawBody as { ids?: unknown; force?: unknown };
  const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === "string") : [];
  const force = body.force === true;

  if (ids.length === 0) {
    return createErrorResponse({
      status: 400,
      message: "ids array is required and must contain at least one string",
      type: "invalid_request",
    });
  }

  if (ids.length > 100) {
    return createErrorResponse({
      status: 400,
      message: "Maximum 100 proxies per batch delete",
      type: "invalid_request",
    });
  }

  try {
    const results: Array<{ id: string; success: boolean; error?: string }> = [];
    let deletedCount = 0;

    for (const id of ids) {
      try {
        const deleted = await deleteProxyById(id, { force });
        if (deleted) {
          results.push({ id, success: true });
          deletedCount++;
        } else {
          results.push({ id, success: false, error: "Proxy not found" });
        }
      } catch (err) {
        results.push({
          id,
          success: false,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    // Clear dispatcher cache if any proxies were deleted
    if (deletedCount > 0) {
      try {
        clearDispatcherCache();
      } catch {
        // non-critical
      }
    }

    return Response.json({
      success: deletedCount > 0,
      deleted: deletedCount,
      failed: ids.length - deletedCount,
      results,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to batch delete proxies");
  }
}
