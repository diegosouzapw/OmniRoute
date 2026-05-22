import { timingSafeEqual } from "node:crypto";
import { isModelSyncInternalRequest } from "../../../shared/services/modelSyncScheduler";
import { isAuthRequired, isDashboardSessionAuthenticated } from "../../../shared/utils/apiAuth";
import { getMachineTokenSync } from "../../../lib/machineToken";
import type { AuthOutcome, PolicyContext, RoutePolicy } from "../context";
import { allow, reject } from "../context";
import { extractApiKey, isValidApiKey } from "../../../sse/services/auth";
import { getApiKeyMetadata } from "../../../lib/db/apiKeys";
import { hasManageScope } from "../../../lib/api/requireManagementAuth";
import { CLI_TOKEN_HEADER } from "../headers";
import {
  isAlwaysProtectedPath,
  isLocalOnlyBypassableByManageScope,
  isLocalOnlyPath,
  isLoopbackHost,
} from "../routeGuard";

const MODEL_SYNC_MANAGEMENT_PATH = /^\/api\/providers\/[^/]+\/(sync-models|models)$/;

function isLoopbackRequest(headers: Headers): boolean {
  return isLoopbackHost(headers.get("host"));
}

function hasValidCliToken(headers: Headers): boolean {
  if (!isLoopbackRequest(headers)) return false;
  const provided = headers.get(CLI_TOKEN_HEADER);
  if (!provided) return false;
  const expected = getMachineTokenSync();
  if (expected === "" || provided.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}

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
    const path = ctx.classification.normalizedPath;

    // Tier 1: local-only gate — block spawn-capable routes from non-loopback.
    //
    // Carve-out: a small allow-list of LOCAL_ONLY paths (see
    // LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES) is reachable from non-loopback
    // when the caller presents EITHER (a) a valid API key with the `manage`
    // scope, or (b) an authenticated dashboard session. This lets:
    //   - headless / remote MCP clients drive the management surface with a
    //     manage-scope Bearer key, and
    //   - the Dashboard UI itself (cookie session) render its MCP pages
    //     (/api/mcp/status, /api/mcp/tools) from a public hostname.
    //
    // The strict-loopback default still applies to everything else (notably
    // the subprocess-spawning /api/cli-tools/runtime/* surface, which is NOT
    // in the bypass list).
    //
    // Anonymous (no Bearer / invalid key / wrong scope / no session) requests
    // still hit the same 403 LOCAL_ONLY they did before.
    if (isLocalOnlyPath(path) && !isLoopbackRequest(ctx.request.headers)) {
      if (isLocalOnlyBypassableByManageScope(path)) {
        const apiKey = extractApiKey(ctx.request as unknown as Request);
        if (apiKey) {
          try {
            if (await isValidApiKey(apiKey)) {
              const meta = await getApiKeyMetadata(apiKey);
              if (meta && hasManageScope(meta.scopes)) {
                // Distinguish admin vs manage in the audit label so log review
                // can tell which privilege actually granted the bypass.
                const grantedBy = meta.scopes.includes("admin") ? "admin" : "manage";
                return allow({
                  kind: "management_key",
                  id: meta.id,
                  label: `api-key-${grantedBy}-scope-local-only-bypass`,
                });
              }
            }
          } catch (err) {
            // Auth backend (DB / file store) failure: surface as 503 so the
            // caller can retry. Anything else (TypeError / ReferenceError /
            // programmer error) is logged so it's not silently swallowed —
            // the policy still degrades closed (503) to avoid leaking the
            // route, but we leave a breadcrumb for ops.
            console.error("[managementPolicy] manage-scope bypass auth check failed", err);
            return reject(503, "AUTH_BACKEND_UNAVAILABLE", "Service temporarily unavailable");
          }
        }
        // Dashboard session bypass: the Dashboard UI itself needs to render
        // /api/mcp/status, /api/mcp/tools, etc. from a public hostname. Cookie
        // auth is already proof of an authenticated admin — same trust level
        // as a manage-scope Bearer for the surface in scope here.
        try {
          if (await isDashboardSessionAuthenticated(ctx.request)) {
            return allow({
              kind: "dashboard_session",
              id: "dashboard",
              label: "dashboard-session-local-only-bypass",
            });
          }
        } catch (err) {
          // Mirror the manage-scope branch above: degrade closed (503) rather
          // than leaking the route through an unhandled 500, but log a
          // breadcrumb for ops. Session-store DB failure / cookie parsing
          // error / JWT decode throw all land here.
          console.error("[managementPolicy] dashboard-session bypass auth check failed", err);
          return reject(503, "AUTH_BACKEND_UNAVAILABLE", "Service temporarily unavailable");
        }
      }
      return reject(403, "LOCAL_ONLY", "This endpoint requires localhost access");
    }

    if (isInternalModelSyncRequest(ctx)) {
      return allow({ kind: "management_key", id: "model-sync", label: "internal-model-sync" });
    }

    if (hasValidCliToken(ctx.request.headers)) {
      return allow({ kind: "management_key", id: "cli", label: "local-cli-token" });
    }

    // Tier 2: always-protected routes skip the requireLogin=false bypass.
    if (!isAlwaysProtectedPath(path) && !(await isAuthRequired(ctx.request))) {
      return allow({ kind: "anonymous", id: "anonymous", label: "auth-disabled" });
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
