import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { isCliTokenAuthValid } from "@/lib/middleware/cliTokenAuth";
import { evaluateAccessTokenAuth } from "@/server/authz/accessTokenAuth";
import {
  MANAGE_SCOPE,
  hasManageScope as hasManageScopeShared,
} from "@/shared/constants/managementScopes";

export { MANAGE_SCOPE };

/**
 * Check whether any of the supplied scopes authorizes management API access.
 *
 * Re-exported here for backwards compatibility with existing callers. The
 * canonical definition lives in `@/shared/constants/managementScopes`.
 */
export function hasManageScope(scopes: string[] = []): boolean {
  return hasManageScopeShared(scopes);
}

interface RequireManagementAuthOptions {
  alwaysRequireAuth?: boolean;
  invalidApiKeyStatus?: 401 | 403;
}

function invalidManagementTokenResponse(options: RequireManagementAuthOptions): Response {
  const status = options.invalidApiKeyStatus ?? 403;
  return createErrorResponse({
    status,
    message: status === 401 ? "Invalid API key" : "Invalid management token",
    type: "invalid_request",
  });
}

export async function requireManagementAuth(
  request: Request,
  options: RequireManagementAuthOptions = {}
): Promise<Response | null> {
  if (!options.alwaysRequireAuth && !(await isAuthRequired(request))) {
    return null;
  }

  if (await isDashboardSessionAuthenticated(request)) {
    return null;
  }

  // CLI machine-id token allows localhost CLI access without an explicit API key.
  if (await isCliTokenAuthValid(request)) {
    return null;
  }

  // Scoped CLI access token (remote mode). Intercepted BEFORE the API-key branch:
  // these `oma_` tokens are management/CLI credentials, not inference API keys,
  // and would otherwise be rejected by isValidApiKey. Same shared evaluation the
  // central managementPolicy uses (no drift). Dashboard JWT, the loopback CLI
  // token, and manage-scope API keys remain full-access above/below.
  const accessVerdict = evaluateAccessTokenAuth(request);
  switch (accessVerdict.kind) {
    case "ok":
      return null;
    case "error":
      return createErrorResponse({
        status: 503,
        message: "Service temporarily unavailable",
        type: "server_error",
      });
    case "invalid":
      return createErrorResponse({
        status: 401,
        message: "Invalid or expired access token",
        type: "invalid_request",
      });
    case "insufficient":
      return createErrorResponse({
        status: 403,
        message: `Access token scope '${accessVerdict.have}' is insufficient; '${accessVerdict.need}' required.`,
        type: "invalid_request",
      });
    case "absent":
      break; // no oma_ token → fall through to API-key auth
  }

  // Management auth never honours a URL-borne credential (header-only) — a token
  // in the path/query must not authenticate a management route. See #3300 follow-up.
  const apiKey = extractApiKey(request, { allowUrl: false });
  if (apiKey) {
    let meta: Awaited<ReturnType<typeof getApiKeyMetadata>>;
    try {
      if (!(await isValidApiKey(apiKey))) {
        return invalidManagementTokenResponse(options);
      }
      meta = await getApiKeyMetadata(apiKey);
    } catch {
      return createErrorResponse({
        status: 503,
        message: "Service temporarily unavailable",
        type: "server_error",
      });
    }

    if (meta && hasManageScope(meta.scopes)) return null;

    return createErrorResponse({
      status: 403,
      message: "API key lacks 'manage' scope. Enable it in the API Keys dashboard.",
      type: "invalid_request",
    });
  }

  return createErrorResponse({
    status: 401,
    message: "Authentication required",
    type: "invalid_request",
  });
}
