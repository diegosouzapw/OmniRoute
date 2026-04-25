import { assignProxyToScope, getProxyAssignments, resolveProxyForConnection } from "@/lib/localDb";
import { proxyAssignmentSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const proxyId = searchParams.get("proxyId");
    const scope = searchParams.get("scope");
    const scopeId = searchParams.get("scopeId");
    const resolveConnectionId = searchParams.get("resolveConnectionId");

    if (resolveConnectionId) {
      const resolved = await resolveProxyForConnection(resolveConnectionId);
      return Response.json(resolved);
    }

    const assignments = await getProxyAssignments({
      proxyId: proxyId || undefined,
      scope: scope || undefined,
    });
    const filtered = scopeId
      ? assignments.filter((entry) => entry.scopeId === scopeId)
      : assignments;
    return Response.json({ items: filtered, total: filtered.length });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy assignments");
  }
}

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
    const validation = validateBody(proxyAssignmentSchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const { scope, scopeId, proxyId } = validation.data;
    const assigned = await assignProxyToScope(scope, scopeId || null, proxyId || null);
    clearDispatcherCache();
    return Response.json({ success: true, assignment: assigned });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to update assignment");
  }
}
