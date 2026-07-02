import { assignProxyToScope, getProxyAssignments, resolveProxyForConnection } from "@/lib/localDb";
import { proxyAssignmentSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";

function toPagination(searchParams: URLSearchParams) {
  const limit = Math.max(1, Math.min(200, Number(searchParams.get("limit") || 100)));
  const offset = Math.max(0, Number(searchParams.get("offset") || 0));
  return { limit, offset };
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const proxyId = searchParams.get("proxy_id");
    const scope = searchParams.get("scope");
    const scopeId = searchParams.get("scope_id");
    const resolveConnectionId = searchParams.get("resolve_connection_id");

    if (resolveConnectionId) {
      const resolved = await resolveProxyForConnection(resolveConnectionId);
      return Response.json(resolved);
    }

    const all = await getProxyAssignments({
      proxyId: proxyId || undefined,
      scope: scope || undefined,
    });

    const filtered = scopeId ? all.filter((entry) => entry.scopeId === scopeId) : all;
    const { limit, offset } = toPagination(searchParams);
    const items = filtered.slice(offset, offset + limit);

    return Response.json({
      items,
      page: { limit, offset, total: filtered.length },
    });
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
    const assignment = await assignProxyToScope(scope, scopeId || null, proxyId || null);
    clearDispatcherCache();

    return Response.json({ success: true, assignment });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to update proxy assignment");
  }
}
