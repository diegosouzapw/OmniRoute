import {
  addProxyToScopePool,
  removeProxyFromScopePool,
  getScopeProxyPool,
  getScopeRotationStrategy,
  setScopeRotationStrategy,
} from "@/lib/localDb";
import {
  proxyPoolMemberSchema,
  proxyRotationStrategySchema,
} from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

// #6365 proxy pools — a scope (global/provider/account/combo) may hold MULTIPLE
// proxies that a rotation strategy cycles through. Pure DB ops (no process spawn),
// so this inherits the sibling /api/settings/proxies management-auth tier.
//
//   GET    ?scope=&scopeId=  → { members, strategy }
//   PUT    { scope, scopeId?, proxyId }              → add a member
//   DELETE { scope, scopeId?, proxyId }              → remove a member
//   PATCH  { scope, scopeId?, strategy, stickyWindowMinutes? } → set strategy

// The single-assign UI still uses "key" as an alias for the account scope; keep
// the API surface consistent with the sibling bulk-assign route.
function normalizeScopeAlias(scope: string): string {
  return scope === "key" ? "account" : scope;
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const rawScope = searchParams.get("scope");
    if (!rawScope) {
      return createErrorResponse({
        status: 400,
        message: "scope is required",
        type: "invalid_request",
      });
    }
    const scope = normalizeScopeAlias(rawScope);
    const scopeId = searchParams.get("scopeId");
    if (scope !== "global" && !scopeId?.trim()) {
      return createErrorResponse({
        status: 400,
        message: "scopeId is required for provider/account/combo/key scope",
        type: "invalid_request",
      });
    }

    const normalizedScopeId = scope === "global" ? null : scopeId;
    const [members, strategy] = await Promise.all([
      getScopeProxyPool(scope, normalizedScopeId),
      getScopeRotationStrategy(scope, normalizedScopeId),
    ]);
    return Response.json({ members, strategy, total: members.length });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy pool");
  }
}

async function parseJsonBody(request: Request): Promise<{ body: unknown } | { error: Response }> {
  try {
    return { body: await request.json() };
  } catch {
    return {
      error: createErrorResponse({
        status: 400,
        message: "Invalid JSON body",
        type: "invalid_request",
      }),
    };
  }
}

export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = await parseJsonBody(request);
  if ("error" in parsed) return parsed.error;

  try {
    const validation = validateBody(proxyPoolMemberSchema, parsed.body);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const { scope, scopeId, proxyId } = validation.data;
    const normalizedScope = normalizeScopeAlias(scope);
    const member = await addProxyToScopePool(normalizedScope, scopeId || null, proxyId);
    clearDispatcherCache();
    return Response.json({ success: true, member });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to add proxy to pool");
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = await parseJsonBody(request);
  if ("error" in parsed) return parsed.error;

  try {
    const validation = validateBody(proxyPoolMemberSchema, parsed.body);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const { scope, scopeId, proxyId } = validation.data;
    const normalizedScope = normalizeScopeAlias(scope);
    const removed = await removeProxyFromScopePool(normalizedScope, scopeId || null, proxyId);
    clearDispatcherCache();
    return Response.json({ success: true, removed });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to remove proxy from pool");
  }
}

export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const parsed = await parseJsonBody(request);
  if ("error" in parsed) return parsed.error;

  try {
    const validation = validateBody(proxyRotationStrategySchema, parsed.body);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }

    const { scope, scopeId, strategy, stickyWindowMinutes } = validation.data;
    const normalizedScope = normalizeScopeAlias(scope);
    const applied = await setScopeRotationStrategy(normalizedScope, scopeId || null, strategy, {
      stickyWindowMinutes,
    });
    clearDispatcherCache();
    return Response.json({ success: true, strategy: applied });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to set rotation strategy");
  }
}
