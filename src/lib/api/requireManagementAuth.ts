import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { isCliTokenAuthValid } from "@/lib/middleware/cliTokenAuth";
import { evaluateAccessTokenAuth } from "@/server/authz/accessTokenAuth";
import { isTrustedLoopbackInternalServiceRequest } from "@/lib/api/internalServiceAuth";
import { AUTHZ_HEADER_AUTH_KIND, AUTHZ_HEADER_AUTH_LABEL } from "@/server/authz/headers";
import {
  MANAGE_SCOPE,
  MCP_CONNECT_SCOPE,
  hasManageScope as hasManageScopeShared,
  hasMcpConnectOrManageScope,
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
  /**
   * Accept the narrow `mcp:connect` scope in the API-key branch, mirroring the
   * #9159 carve-out the central managementPolicy already applies to /api/mcp/*
   * paths. Only the MCP transport routes (stream/sse/status/tools) may enable
   * this — every other management route stays manage/admin-only.
   */
  acceptMcpConnectScope?: boolean;
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
  request?: Request | null,
  options: RequireManagementAuthOptions = {}
): Promise<Response | null> {
  // Direct in-process invocation without a Request (unit/integration tests call
  // route handlers as plain functions) is a trusted local caller — Next.js always
  // supplies a real Request on the HTTP path, so this branch is unreachable there.
  if (request === undefined || request === null) {
    return null;
  }
  if (!options.alwaysRequireAuth && !(await isAuthRequired(request, { ignorePublicRoute: true }))) {
    return null;
  }

  if (await isDashboardSessionAuthenticated(request)) {
    return null;
  }

  if (isTrustedLoopbackInternalServiceRequest(request)) {
    return null;
  }

  // The authz pipeline strips the raw machine-token header after it validates it
  // and forwards this trusted subject stamp to route handlers.
  if (
    request.headers.get(AUTHZ_HEADER_AUTH_KIND) === "management_key" &&
    request.headers.get(AUTHZ_HEADER_AUTH_LABEL) === "local-cli-token"
  ) {
    return null;
  }

  // Direct/raw-Node callers without the central pipeline can still validate the
  // CLI token here, including the trusted peer-locality stamp path.
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

    // API-key branch: with acceptMcpConnectScope (MCP transport routes) the
    // #9159 carve-out applies — hasMcpConnectOrManageScope accepts manage,
    // admin, and mcp:connect. Without it, the guard stays manage-only. A null
    // meta (valid key, metadata unavailable — deleted mid-request) falls
    // through to the same 403 as the default path for every caller, keeping
    // the error contract uniform.
    if (
      meta &&
      (options.acceptMcpConnectScope
        ? hasMcpConnectOrManageScope(meta.scopes)
        : hasManageScope(meta.scopes))
    ) {
      return null;
    }

    return createErrorResponse({
      status: 403,
      message: options.acceptMcpConnectScope
        ? `API key lacks '${MCP_CONNECT_SCOPE}' (or 'manage') scope. Enable it in the API Keys dashboard.`
        : "API key lacks 'manage' scope. Enable it in the API Keys dashboard.",
      type: "invalid_request",
    });
  }

  return createErrorResponse({
    status: 401,
    message: "Authentication required",
    type: "invalid_request",
  });
}
