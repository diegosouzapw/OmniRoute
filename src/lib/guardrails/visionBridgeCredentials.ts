/**
 * Shared provider-credential checks for the Vision Bridge guardrail.
 * Extracted from visionBridge.ts so visionBridgeRouter.ts can reuse the same
 * "is this connection actually usable" logic without a circular import
 * (visionBridge.ts already imports getBestVisionModel from visionBridgeRouter.ts).
 */

import { resolveProviderId } from "@/shared/constants/providers";
import { isNoAuthProviderKey } from "@/shared/utils/noAuthProviders";
import { SYNTHETIC_NOAUTH_CONNECTION_ID } from "@omniroute/open-sse/services/autoCombo/resilienceCandidateFilter.ts";

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
 * Resolve whether `provider/model` has at least one usable active connection.
 * Returns `null` when the credential store is unavailable (unit tests / early boot).
 *
 * The provider prefix is resolved alias→canonical id before querying
 * `provider_connections` (the column stores the id, e.g. "opencode" for the
 * "oc" alias — #10702: an alias-keyed query returned zero rows and excluded
 * every candidate). No-auth providers (NOAUTH_PROVIDERS) need no stored API
 * key: their effective credential is the synthetic "noauth" connection, so
 * an empty active set is usable for them (unlike keyed providers). A stored
 * row with a terminal status (disabled/banned/expired) still blocks the
 * provider; any other row is treated as usable (the key requirement does not
 * apply — a noauth row carries no API key by design).
 */
export async function hasUsableCredentialsForModel(model: string): Promise<boolean | null> {
  const rawProvider = typeof model === "string" ? model.split("/")[0]?.trim() : "";
  if (!rawProvider) return null;
  const provider = resolveProviderId(rawProvider);
  const isNoAuth = isNoAuthProviderKey(rawProvider, provider);
  try {
    const { getProviderConnections } = await loadProvidersModule();
    const connections = await getProviderConnections({ provider, isActive: true });
    if (!Array.isArray(connections)) return null;
    // Empty active set: keyed providers are definitively unusable; no-auth
    // providers still work through the synthetic "noauth" connection.
    if (connections.length === 0) return isNoAuth;
    // No-auth rows store no API key (authType "noauth" + empty apiKey would
    // fail the generic key check) — only a terminal status blocks them.
    if (isNoAuth) {
      return !connections.some((c: any) => hasTerminalConnectionStatus(c));
    }
    return connections.some((c: any) => isProviderConnectionUsable(c));
  } catch {
    return null;
  }
}

/** A minimal reference to a usable provider connection, for per-connection lockout checks. */
export interface UsableConnectionRef {
  id: string;
}

/**
 * Resolve the individual usable connections for `model`'s provider (#12111).
 *
 * `hasUsableCredentialsForModel` collapses this same data to a single
 * boolean, which is enough to know a provider is reachable at all but not
 * enough to know whether one *specific* model is servable: `isModelLocked`
 * (open-sse/services/accountFallback.ts) is scoped per provider+connection+
 * model, so callers that need to exclude a locked model must check it
 * against each connection that could actually serve it — dropping the model
 * only when every one of those connections has it locked (mirrors
 * `isConnectionEligibleForModel` in
 * open-sse/services/autoCombo/resilienceCandidateFilter.ts).
 *
 * Returns `null` on the same indeterminate cases as
 * `hasUsableCredentialsForModel` (credential store unavailable) so callers
 * can fail open identically. No-auth providers with no stored connection row
 * resolve to the synthetic "noauth" connection id, matching the id
 * `lockModel`/`isModelLocked` use for those providers elsewhere in the
 * resilience layer.
 */
export async function getUsableConnectionsForModel(
  model: string
): Promise<UsableConnectionRef[] | null> {
  const rawProvider = typeof model === "string" ? model.split("/")[0]?.trim() : "";
  if (!rawProvider) return null;
  const provider = resolveProviderId(rawProvider);
  const isNoAuth = isNoAuthProviderKey(rawProvider, provider);
  try {
    const { getProviderConnections } = await loadProvidersModule();
    const connections = await getProviderConnections({ provider, isActive: true });
    if (!Array.isArray(connections)) return null;
    if (connections.length === 0) {
      return isNoAuth ? [{ id: SYNTHETIC_NOAUTH_CONNECTION_ID }] : [];
    }
    const usable = isNoAuth
      ? connections.filter((c: any) => !hasTerminalConnectionStatus(c))
      : connections.filter((c: any) => isProviderConnectionUsable(c));
    return usable.map((c: any) => ({ id: String(c.id) }));
  } catch {
    return null;
  }
}
