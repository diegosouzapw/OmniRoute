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

type ApiKeyLookup = (rawKey: string) => Promise<{ id?: string | number | null } | null>;

/**
 * Load the API-key lookup only after a key is present. Importing the database
 * module eagerly makes every unauthenticated MCP tool import initialize the
 * full SQLite migration stack, even though there is no principal to resolve.
 * That is both unnecessary at runtime and makes parallel test workers contend
 * on a temporary database before the audit test can reach its mock seam.
 */
async function lookupApiKeyMetadata(
  rawKey: string
): Promise<{ id?: string | number | null } | null> {
  const { getApiKeyMetadata } = await import("../../src/lib/db/apiKeys.ts");
  return getApiKeyMetadata(rawKey);
}

/**
 * Pure resolver: given the request auth headers and a key→metadata lookup, return
 * the principal id (as a string) or `undefined`. Separated from the AsyncLocalStorage
 * read so it is unit-testable without a live transport or DB.
 */
export async function resolvePrincipalFromHeaders(
  headers: Record<string, string>,
  lookup: ApiKeyLookup = lookupApiKeyMetadata
): Promise<string | undefined> {
  // Nothing to resolve without an Authorization / x-api-key header.
  if (!headers.Authorization && !headers["x-api-key"]) return undefined;
  const { extractApiKey } = await import("../../src/sse/services/auth.ts");
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
    const meta = await lookupApiKeyMetadata(rawKey);
    return meta?.id != null && meta.id !== "" ? String(meta.id) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * The owner id a tool that stores or reads per-tenant data must act as. The authenticated caller
 * always wins over an id the caller wrote into the tool arguments; otherwise any MCP client could
 * read, change or run another tenant's memories and skills, or the global ones, by naming them.
 *
 * `extra.authInfo.clientId` is the key id the transport resolved with the same extractor the route
 * used to authenticate the request, so it covers every header form the route accepts. The
 * request-header lookup is kept as a second source, and the explicit argument is honoured only when
 * no caller can be resolved at all (a local process with no key, which is already trusted).
 */
export async function resolveMcpToolOwnerId(
  extra: { authInfo?: { clientId?: string } } | undefined,
  explicit?: string
): Promise<string | undefined> {
  const authenticated =
    typeof extra?.authInfo?.clientId === "string" ? extra.authInfo.clientId.trim() : "";
  if (authenticated) return authenticated;
  const caller = await resolveMcpCallerApiKeyId().catch(() => undefined);
  if (caller) return caller;
  const requested = typeof explicit === "string" ? explicit.trim() : "";
  return requested || undefined;
}
