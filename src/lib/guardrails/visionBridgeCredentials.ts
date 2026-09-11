/**
 * Shared provider-credential checks for the Vision Bridge guardrail.
 * Extracted from visionBridge.ts so visionBridgeRouter.ts can reuse the same
 * "is this connection actually usable" logic without a circular import
 * (visionBridge.ts already imports getBestVisionModel from visionBridgeRouter.ts).
 */

import { resolveProviderId } from "@/shared/constants/providers";
import { isNoAuthProviderKey } from "@/shared/utils/noAuthProviders";

/**
 * True when a provider connection can actually authenticate upstream.
 * `noauth` with no real API key is NOT usable (opencode-zen free tier often
 * surfaces as noauth and then 401 "Missing API key").
 */
export type ProviderConnectionLike = {
  authType?: string | null;
  apiKey?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  testStatus?: string | null;
};

const TERMINAL_CONNECTION_STATUSES = new Set(["disabled", "banned", "expired"]);
// Free/noauth only counts when a real key is still present; apikey/cookie need the same.
const KEY_ONLY_AUTH_TYPES = new Set(["noauth", "none", "", "apikey", "cookie"]);
const TOKEN_AUTH_TYPES = new Set(["oauth", "access_token", "external_idp"]);

function hasNonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function hasOAuthCredential(connection: ProviderConnectionLike): boolean {
  return (
    hasNonEmptyString(connection.refreshToken) ||
    hasNonEmptyString(connection.accessToken) ||
    hasNonEmptyString(connection.idToken)
  );
}

/** True when the connection row carries a terminal status (disabled/banned/expired). */
export function hasTerminalConnectionStatus(connection: ProviderConnectionLike): boolean {
  const status = String(connection.testStatus || "").toLowerCase();
  return TERMINAL_CONNECTION_STATUSES.has(status);
}

export function isProviderConnectionUsable(connection: ProviderConnectionLike): boolean {
  if (hasTerminalConnectionStatus(connection)) {
    return false;
  }

  const auth = String(connection.authType || "").toLowerCase();
  const hasKey = hasNonEmptyString(connection.apiKey);

  if (KEY_ONLY_AUTH_TYPES.has(auth)) {
    return hasKey;
  }
  if (TOKEN_AUTH_TYPES.has(auth)) {
    return hasOAuthCredential(connection) || hasKey;
  }
  return hasKey;
}

// Memoize the dynamic import itself (not just call it inline per-invocation).
// getVisionCapableModels() fans out to this function once per vision-capable
// catalog entry via Promise.all — tens of concurrent calls on every
// getBestVisionModel()/getFallbackModels() invocation. Issuing a fresh
// `await import(...)` per call means dozens of concurrent first-resolution
// import() calls for the *same* specifier land in the module loader at once;
// under Vitest/vite-node this observably races (some callers resolve against
// the mocked module, others against a real one loaded via a different
// resolution path such as readCache.ts's own relative `./providers` import —
// see tests/unit/guardrails/visionBridgeRouter.test.tsx). Resolving the
// import exactly once and reusing the settled module for every subsequent
// call removes the concurrent-first-load race entirely (and is strictly
// cheaper at runtime too — one module resolution instead of N).
let providersModulePromise: Promise<typeof import("@/lib/db/providers")> | null = null;
function loadProvidersModule(): Promise<typeof import("@/lib/db/providers")> {
  if (!providersModulePromise) {
    providersModulePromise = import("@/lib/db/providers");
  }
  return providersModulePromise;
}

/**
 * Credential candidate provider ids for `hasUsableCredentialsForModel`.
 *
 * A compatible provider node (openai-compatible-chat-<uuid>) is stored in
 * `provider_connections` under its generated node id, while the
 * operator-facing model id uses the node's configured public prefix
 * (skhynix/HCP-...). Composed AFTER #10760's alias→canonical
 * `resolveProviderId` step: the literal prefix alone misses the node row, so
 * the prefix-index mapped node id is appended (deduped when the mapping is a
 * no-op). Limitation: a node prefix that also collides with a catalog alias
 * would already have been canonicalized by `resolveProviderId` and can miss
 * here — no such collision exists in practice (reserved prefixes are
 * filtered out of the index), noted for future maintainers.
 */
export function resolveProviderCredentialIds(
  provider: string,
  prefixToNode?: Map<string, string> | null
): string[] {
  const ids = [provider];
  const mapped = prefixToNode?.get(provider);
  // Skip when the mapping is a no-op (already the literal provider).
  if (mapped && mapped !== provider) ids.push(mapped);
  return ids;
}

// getBestVisionModel()/getFallbackModels() fan out to hasUsableCredentialsForModel
// once per vision-capable catalog entry via Promise.all. The prefix index reads
// the provider_nodes table on every call, so cache it briefly (same TTL order as
// the router's selection cache) to avoid N concurrent table reads per request.
let prefixIndexCache: { at: number; index: Map<string, string> } | null = null;
const PREFIX_INDEX_TTL_MS = 60_000;
async function getPrefixToNode(): Promise<Map<string, string> | null> {
  try {
    const { getProviderPrefixIndex } = await import("@/lib/providerNodePrefixes");
    if (prefixIndexCache && Date.now() - prefixIndexCache.at < PREFIX_INDEX_TTL_MS) {
      return prefixIndexCache.index;
    }
    const index = await getProviderPrefixIndex();
    prefixIndexCache = { at: Date.now(), index: index.prefixToNode };
    return index.prefixToNode;
  } catch {
    return null;
  }
}

/**
 * Resolve whether `provider/model` has at least one usable active connection.
 * Returns `null` when the credential store is unavailable (unit tests / early boot).
 *
 * Two-step resolve before querying `provider_connections`:
 *   1. alias→canonical id (#10702: the column stores the id, e.g. "opencode"
 *      for the "oc" alias — an alias-keyed query returned zero rows);
 *   2. public prefix→node id via the provider-prefix index (#re-land 932002580:
 *      a compatible node's rows are stored under its generated
 *      `openai-compatible-chat-<uuid>` id while the operator-facing model id
 *      uses the node's public prefix, e.g. "skhynix" — a bare-prefix query
 *      matched zero rows and made a credentialed, active connection report as
 *      unusable, so the Vision Bridge discarded the configured model).
 * Both the literal segment and the mapped node id are queried; any usable
 * active connection wins.
 *
 * No-auth providers (NOAUTH_PROVIDERS) need no stored API key: their effective
 * credential is the synthetic "noauth" connection, so an empty active set is
 * usable for them (unlike keyed providers). A stored row with a terminal
 * status (disabled/banned/expired) still blocks the provider; any other row
 * is treated as usable (the key requirement does not apply — a noauth row
 * carries no API key by design).
 */
export async function hasUsableCredentialsForModel(model: string): Promise<boolean | null> {
  const rawProvider = typeof model === "string" ? model.split("/")[0]?.trim() : "";
  if (!rawProvider) return null;
  const provider = resolveProviderId(rawProvider);
  const isNoAuth = isNoAuthProviderKey(rawProvider, provider);
  try {
    const { getProviderConnections } = await loadProvidersModule();
    const prefixToNode = await getPrefixToNode();
    const providerIds = resolveProviderCredentialIds(provider, prefixToNode);
    let sawStoredRow = false;
    for (const providerId of providerIds) {
      const connections = await getProviderConnections({ provider: providerId, isActive: true });
      if (!Array.isArray(connections)) return null;
      // This candidate has no rows — the next candidate (mapped node id) may
      // still hold the operator's connection.
      if (connections.length === 0) continue;
      sawStoredRow = true;
      // No-auth rows store no API key (authType "noauth" + empty apiKey would
      // fail the generic key check) — only a terminal status blocks them.
      const usable = isNoAuth
        ? !connections.some((c: any) => hasTerminalConnectionStatus(c))
        : connections.some((c: any) => isProviderConnectionUsable(c));
      if (usable) return true;
    }
    // No candidate has a stored row: keyed providers are definitively
    // unusable; no-auth providers still work through the synthetic "noauth"
    // connection (and a noauth provider with stored rows can only have been
    // rejected via a terminal status in the loop above).
    return isNoAuth && !sawStoredRow;
  } catch {
    return null;
  }
}
