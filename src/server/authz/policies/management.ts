import { isModelSyncInternalRequest } from "../../../shared/services/modelSyncScheduler";
import { isAuthRequired, isDashboardSessionAuthenticated } from "../../../shared/utils/apiAuth";
import type { AuthOutcome, PolicyContext, RoutePolicy } from "../context";
import { allow, reject } from "../context";
import { extractApiKey, isValidApiKey } from "../../../sse/services/auth";
import { getApiKeyMetadata } from "../../../lib/db/apiKeys";
import { hasManageScope } from "../../../lib/api/requireManagementAuth";

const MODEL_SYNC_MANAGEMENT_PATH = /^\/api\/providers\/[^/]+\/(sync-models|models)$/;

function hasBearerToken(headers: Headers): boolean {
  const authHeader = headers.get("authorization") ?? headers.get("Authorization");
  return typeof authHeader === "string" && authHeader.trim().toLowerCase().startsWith("bearer ");
}

function isInternalModelSyncRequest(ctx: PolicyContext): boolean {
  if (!MODEL_SYNC_MANAGEMENT_PATH.test(ctx.classification.normalizedPath)) return false;
  return isModelSyncInternalRequest(ctx.request);
}

export const managementPolicy: RoutePolicy = {
  routeClass: "MANAGEMENT",
  async evaluate(ctx: PolicyContext): Promise<AuthOutcome> {
    if (!(await isAuthRequired(ctx.request))) {
      return allow({ kind: "anonymous", id: "anonymous", label: "auth-disabled" });
    }

    if (isInternalModelSyncRequest(ctx)) {
      return allow({ kind: "management_key", id: "model-sync", label: "internal-model-sync" });
    }

    if (await isDashboardSessionAuthenticated(ctx.request)) {
      return allow({ kind: "dashboard_session", id: "dashboard" });
    }

    // Allow API keys with the `manage` scope — enables headless / programmatic
    // management (e.g. provisioning providers, setting rate limits) without
    // a browser session. The pieces below already exist and are used by
    // `requireManagementAuth` on individual routes; wiring them here closes
    // the gap so management auth is consistent across the policy layer.
    //
    // Error handling mirrors `requireManagementAuth.ts`: a thrown
    // isValidApiKey / getApiKeyMetadata indicates the auth backend is
    // unhealthy, which is a 503, not a 403 — masking it as an auth failure
    // would tell callers their credentials are wrong when the real problem
    // is that the server cannot validate any credential right now.
    const apiKey = extractApiKey(ctx.request as unknown as Request);
    if (apiKey) {
      try {
        if (await isValidApiKey(apiKey)) {
          const meta = await getApiKeyMetadata(apiKey);
          // getApiKeyMetadata returns null whenever the row has no id,
          // so when `meta` is truthy `meta.id` is guaranteed non-empty.
          if (meta && hasManageScope(meta.scopes)) {
            return allow({
              kind: "management_key",
              id: meta.id,
              label: "api-key-manage-scope",
            });
          }
        }
      } catch {
        return reject(503, "AUTH_BACKEND_UNAVAILABLE", "Service temporarily unavailable");
      }
    }

    const bearerPresent = hasBearerToken(ctx.request.headers);
    return reject(
      bearerPresent ? 403 : 401,
      "AUTH_001",
      bearerPresent ? "Invalid management token" : "Authentication required"
    );
  },
};
