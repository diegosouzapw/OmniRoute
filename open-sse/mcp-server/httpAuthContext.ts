import { AsyncLocalStorage } from "node:async_hooks";
import { extractApiKey, isValidApiKey } from "../../src/sse/services/auth.ts";
import { getApiKeyMetadata } from "../../src/lib/db/apiKeys.ts";

type McpHttpAuthContext = {
  authorization?: string;
  cookie?: string;
  xApiKey?: string;
  anthropicVersion?: string;
};

/**
 * Minimal shape of the MCP SDK's `AuthInfo` (server/auth/types.ts) that
 * `httpTransport.ts` passes into `transport.handleRequest(req, { authInfo })`
 * so per-tool-call `extra.authInfo` — and therefore
 * `scopeEnforcement.ts::resolveCallerScopeContext` — sees the caller's real
 * per-key scopes instead of falling back to the `OMNIROUTE_MCP_SCOPES` env var.
 */
export type McpCallerAuthInfo = {
  token: string;
  clientId: string;
  scopes: string[];
};

const mcpHttpAuthContext = new AsyncLocalStorage<McpHttpAuthContext>();

function headerValue(request: Request, name: string): string | undefined {
  const value = request.headers.get(name);
  return value && value.trim().length > 0 ? value : undefined;
}

export function getMcpHttpAuthHeadersForInternalFetch(): Record<string, string> {
  const context = mcpHttpAuthContext.getStore();
  const headers: Record<string, string> = {};
  if (context?.authorization) headers.Authorization = context.authorization;
  if (context?.cookie) headers.Cookie = context.cookie;
  if (context?.xApiKey && context?.anthropicVersion) {
    headers["x-api-key"] = context.xApiKey;
    headers["anthropic-version"] = context.anthropicVersion;
  }
  return headers;
}

/**
 * Resolve the caller's real per-key `api_keys.scopes` for one HTTP/SSE MCP
 * request, for #7895's per-key scope binding. Returns `undefined` when the
 * request carries no resolvable API key (no header, invalid key, or the
 * DB/auth backend throws) — callers MUST treat `undefined` as "no per-key
 * authInfo available", NOT as "zero scopes", so `scopeEnforcement.ts` falls
 * through to its existing `meta` → env fallback chain unchanged. Only the
 * HTTP/SSE transports call this; stdio has no per-caller identity and stays
 * on the env fallback (see `docs/frameworks/MCP-SERVER.md`).
 */
export async function resolveMcpCallerAuthInfo(
  request: Request
): Promise<McpCallerAuthInfo | undefined> {
  const rawKey = extractApiKey(request, { allowUrl: false });
  if (!rawKey) return undefined;

  try {
    if (!(await isValidApiKey(rawKey))) return undefined;
    const meta = await getApiKeyMetadata(rawKey);
    if (!meta || !meta.id) return undefined;
    return { token: rawKey, clientId: String(meta.id), scopes: meta.scopes ?? [] };
  } catch {
    // Fail closed: an unresolved caller falls through to the meta/env scope
    // chain rather than ever synthesizing a false per-key scope grant.
    return undefined;
  }
}

export async function withMcpHttpAuthContext<T>(
  request: Request,
  callback: () => Promise<T>
): Promise<T> {
  return mcpHttpAuthContext.run(
    {
      authorization: headerValue(request, "authorization"),
      cookie: headerValue(request, "cookie"),
      xApiKey: headerValue(request, "x-api-key"),
      anthropicVersion: headerValue(request, "anthropic-version"),
    },
    callback
  );
}
