/**
 * #5649 — resolve the MCP caller's API-key **principal id** for content stores
 * (CCR) that are keyed by principal.
 *
 * The CCR store keys blocks by `String(apiKeyInfo.id)` at compression time
 * (`chatCore` → `apiKeyInfo = getApiKeyMetadata(rawKey)`). MCP tool retrieval must
 * resolve the SAME id or the block is not found. On the MCP HTTP transports
 * (SSE / Streamable HTTP) the raw key lives in `httpAuthContext`'s
 * AsyncLocalStorage (set by `withMcpHttpAuthContext`), NOT in the tool handler's
 * `extra.authInfo` (OmniRoute authenticates with API keys, not OAuth client ids —
 * so `extra.authInfo.clientId` is never populated and the caller resolved to
 * "anonymous", producing a cross-principal store-key miss).
 *
 * On stdio transport (`omniroute --mcp`) there is no HTTP context, so we fall
 * back to the OMNIROUTE_API_KEY / ROUTER_API_KEY environment variable.
 *
 * Resolving through the same `getApiKeyMetadata` lookup keeps cross-tenant IDOR
 * isolation intact: a different key → a different id → a miss; no key → undefined
 * → the anonymous (`__anon__`) bucket, which only matches unauthenticated stores.
 */
import { getMcpHttpAuthHeadersForInternalFetch } from "./httpAuthContext.ts";
import { extractApiKey } from "../../src/sse/services/auth.ts";
import { getApiKeyMetadata } from "../../src/lib/db/apiKeys.ts";

type ApiKeyLookup = (rawKey: string) => Promise<{ id?: string | number | null } | null>;

/**
 * Pure resolver: given the request auth headers and a key→metadata lookup, return
 * the principal id (as a string) or `undefined`. Separated from the AsyncLocalStorage
 * read so it is unit-testable without a live transport or DB.
 */
export async function resolvePrincipalFromHeaders(
  headers: Record<string, string>,
  lookup: ApiKeyLookup = getApiKeyMetadata
): Promise<string | undefined> {
  // Nothing to resolve without an Authorization / x-api-key header.
  if (!headers.Authorization && !headers["x-api-key"]) return undefined;
  const rawKey = extractApiKey({ headers: new Headers(headers) }, { allowUrl: false });
  if (!rawKey) return undefined;
  try {
    const meta = await lookup(rawKey);
    return meta?.id != null && meta.id !== "" ? String(meta.id) : undefined;
  } catch {
    // Fail closed: an unresolved principal can only reach the anonymous bucket.
    return undefined;
  }
}

/**
 * Resolve the current MCP HTTP caller's API-key principal id from the ambient
 * `httpAuthContext`. Returns `undefined` off the HTTP transport (stdio) or when the
 * request carries no API key.
 *
 * Falls back to OMNIROUTE_API_KEY / ROUTER_API_KEY env vars for stdio transport
 * where there is no HTTP context. The env var resolves through the same
 * `getApiKeyMetadata()` lookup that storage (chatCore) uses, so the principal
 * matches. Both storage and retrieval get `{id: "env-key"}` when the env var
 * matches the configured key — consistent and correct.
 */
export async function resolveMcpCallerApiKeyId(): Promise<string | undefined> {
  // 1. Try per-request HTTP auth headers (SSE / Streamable HTTP transport)
  const fromHeaders = await resolvePrincipalFromHeaders(getMcpHttpAuthHeadersForInternalFetch());
  if (fromHeaders !== undefined) return fromHeaders;

  // 2. Fallback: env var (stdio transport, no HTTP context)
  return resolvePrincipalFromEnv();
}

/**
 * Resolve the principal id from the OMNIROUTE_API_KEY (or ROUTER_API_KEY) env var.
 * Used when the MCP server runs on stdio transport and there's no HTTP context.
 * Uses the same getApiKeyMetadata() lookup as storage (chatCore.ts:1336).
 *
 * NOTE: When the key matches the configured env key, getApiKeyMetadata returns
 * `{id: "env-key"}` (not a DB row ID). This is correct — storage on the same
 * process uses the same env var and gets the same `"env-key"` principal, so the
 * store key matches.
 */
async function resolvePrincipalFromEnv(): Promise<string | undefined> {
  const rawKey = process.env.OMNIROUTE_API_KEY || process.env.ROUTER_API_KEY;
  if (!rawKey) return undefined;
  try {
    const meta = await getApiKeyMetadata(rawKey);
    return meta?.id != null && meta.id !== "" ? String(meta.id) : undefined;
  } catch {
    return undefined;
  }
}
