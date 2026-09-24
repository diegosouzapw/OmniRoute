import {
  hasConfiguredOidc,
  hasConfiguredPassword,
  isAuthRequired,
  isDashboardSessionAuthenticated,
  isLoopbackRequest,
} from "@/shared/utils/apiAuth";
import { extractApiKey } from "@/sse/services/auth";

// Request-scoped catalog helpers: API-key auth gating for `/v1/models` and Codex
// CLI client detection. Extracted verbatim from ./catalog.ts.

async function validateCatalogApiKey(apiKey: string): Promise<boolean> {
  const { validateApiKey } = await import("@/lib/db/apiKeys");
  return validateApiKey(apiKey);
}

/**
 * #13354: `isAuthRequired()` can return true purely from its bootstrap
 * `setupComplete === true || !loopback` fallback, with ZERO credentials
 * configured anywhere. That is a broader signal than "management auth is
 * configured" — the intent #9320 actually wants to gate on. A pre-existing
 * keyless install that completed onboarding (without ever configuring a
 * password, OIDC, or INITIAL_PASSWORD, and without ever creating an API key)
 * has no credential surface at all, so `/v1/models` must stay open for it —
 * restoring the documented keyless local-first posture without reopening
 * the #9320 leak for any install that DOES have a credential surface.
 *
 * The bypass is scoped to a TRUSTED loopback peer (`isLoopbackRequest`, the
 * same token-stamped TCP-peer verdict the bootstrap gate uses). A keyless
 * install exposed on the network — public IP, LAN, or a Docker bridge gateway,
 * which is deliberately NOT loopback (#14296) — keeps requiring a credential.
 */
async function hasNoCredentialSurface(settings: Record<string, any>): Promise<boolean> {
  if (hasConfiguredPassword(settings) || hasConfiguredOidc(settings)) return false;
  if (process.env.INITIAL_PASSWORD) return false;
  try {
    const { getApiKeysCount } = await import("@/lib/db/apiKeys");
    return getApiKeysCount() === 0;
  } catch {
    // Fail closed: on a DB hiccup, assume keys exist and keep requiring auth.
    return false;
  }
}

export async function getModelCatalogAuthRejection(
  request: Request,
  settings: Record<string, any>,
  headers: Record<string, string>
): Promise<Response | null> {
  const authRequired = await isAuthRequired(request);
  if (!authRequired) return null;
  if (settings.requireAuthForModels === false) return null;
  if (isLoopbackRequest(request) && (await hasNoCredentialSurface(settings))) return null;

  const apiKey = extractApiKey(request);
  if (apiKey) {
    if (await validateCatalogApiKey(apiKey)) return null;
    return Response.json(
      {
        error: {
          message: "Invalid API key",
          type: "invalid_api_key",
          code: "invalid_api_key",
        },
      },
      {
        status: 401,
        headers,
      }
    );
  }

  if (await isDashboardSessionAuthenticated(request)) return null;

  return Response.json(
    {
      error: {
        message: "Authentication required",
        type: "invalid_api_key",
        code: "invalid_api_key",
      },
    },
    {
      status: 401,
      headers,
    }
  );
}

/**
 * Detect the Codex CLI's model-catalog refresh client. Codex sends an `originator` header
 * of `codex_exec` (codex exec) / `codex_cli_rs` (interactive TUI) — see openai/codex
 * login/src/auth/default_client.rs DEFAULT_ORIGINATOR — and a matching `codex_*`
 * User-Agent on its `GET /v1/models?client_version=...` catalog refresh. We only augment
 * the response shape for these clients so every other OpenAI consumer keeps the
 * byte-identical `{object,data}` payload.
 */
export function isCodexModelCatalogClient(request: Request): boolean {
  const headers = request.headers;
  const originator = headers.get("originator")?.toLowerCase() ?? "";
  if (originator.startsWith("codex")) return true;
  const userAgent = headers.get("user-agent")?.toLowerCase() ?? "";
  return userAgent.startsWith("codex");
}

/**
 * Detect a `GET /v1/models` catalog request coming from the Claude Code CLI,
 * for the cc-discovery usage metric only (never changes the response shape).
 * Reuses the same `claude-cli` User-Agent substring check as
 * open-sse/utils/bypassHandler.ts's `handleBypassRequest`.
 */
export function isCcDiscoveryModelCatalogClient(request: Request): boolean {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? "";
  return userAgent.includes("claude-cli");
}
