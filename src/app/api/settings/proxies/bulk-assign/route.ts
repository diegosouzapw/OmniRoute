import { bulkAssignProxyToScope } from "@/lib/localDb";
import { bulkProxyAssignmentSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function PUT(request: Request) {
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

  try {
    const validation = validateBody(bulkProxyAssignmentSchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const { scope, scopeIds, proxyId } = validation.data;
    const normalizedScope = scope === "key" ? "account" : scope;
    const result = await bulkAssignProxyToScope(normalizedScope, scopeIds || [], proxyId || null);
    clearDispatcherCache();

    return Response.json({
      success: true,
      scope: normalizedScope,
      requested: normalizedScope === "global" ? 1 : (scopeIds || []).length,
      updated: result.updated,
      failed: result.failed,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to run bulk assignment");
  }
}
