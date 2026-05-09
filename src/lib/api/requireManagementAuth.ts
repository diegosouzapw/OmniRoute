import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";

export const MANAGE_SCOPE = "manage";

export function hasManageScope(scopes: string[] = []): boolean {
  return scopes.includes("manage") || scopes.includes("admin");
}

export async function requireManagementAuth(request: Request): Promise<Response | null> {
  if (!(await isAuthRequired(request))) {
    return null;
  }

  if (await isDashboardSessionAuthenticated(request)) {
    return null;
  }

  const apiKey = extractApiKey(request);
  if (apiKey) {
    let validKey = false;
    try {
      validKey = await isValidApiKey(apiKey);
    } catch {
      // DB unavailable or similar transient error — treat as unauthenticated
    }
    if (!validKey) {
      return createErrorResponse({
        status: 401,
        message: "Invalid API key",
        type: "invalid_request",
      });
    }

    // Env passthrough key (OMNIROUTE_API_KEY / ROUTER_API_KEY) is root by design
    const envKey = process.env.OMNIROUTE_API_KEY || process.env.ROUTER_API_KEY;
    if (envKey && apiKey === envKey) return null;

    const meta = await getApiKeyMetadata(apiKey);
    if (meta && hasManageScope(meta.scopes)) return null;

    return createErrorResponse({
      status: 403,
      message: "API key lacks 'manage' scope. Enable it in the API Manager dashboard.",
      type: "invalid_request",
    });
  }

  return createErrorResponse({
    status: 401,
    message: "Authentication required",
    type: "invalid_request",
  });
}
