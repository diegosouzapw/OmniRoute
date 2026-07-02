import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { extractApiKey } from "@/sse/services/auth";

// Request-scoped catalog helpers: API-key auth gating for `/v1/models` and Codex
// CLI client detection. Extracted verbatim from ./catalog.ts.

async function validateCatalogApiKey(apiKey: string): Promise<boolean> {
  const { validateApiKey } = await import("@/lib/db/apiKeys");
  return validateApiKey(apiKey);
}

export async function getModelCatalogAuthRejection(
  request: Request,
  settings: Record<string, any>,
  headers: Record<string, string>
): Promise<Response | null> {
  if (settings.requireAuthForModels !== true || !(await isAuthRequired(request))) return null;

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
