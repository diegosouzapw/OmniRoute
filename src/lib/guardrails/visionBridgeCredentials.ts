/**
 * Shared provider-credential checks for the Vision Bridge guardrail.
 * Extracted from visionBridge.ts so visionBridgeRouter.ts can reuse the same
 * "is this connection actually usable" logic without a circular import
 * (visionBridge.ts already imports getBestVisionModel from visionBridgeRouter.ts).
 */

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

export function isProviderConnectionUsable(connection: ProviderConnectionLike): boolean {
  const status = String(connection.testStatus || "").toLowerCase();
  if (TERMINAL_CONNECTION_STATUSES.has(status)) {
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

/**
 * Resolve whether `provider/model` has at least one usable active connection.
 * Returns `null` when the credential store is unavailable (unit tests / early boot).
 */
export async function hasUsableCredentialsForModel(model: string): Promise<boolean | null> {
  const provider = typeof model === "string" ? model.split("/")[0]?.trim() : "";
  if (!provider) return null;
  try {
    const { getProviderConnections } = await import("@/lib/db/providers");
    const connections = await getProviderConnections({ provider, isActive: true });
    if (!Array.isArray(connections)) return null;
    // Empty active set is a definitive "no" only when the table is readable.
    if (connections.length === 0) return false;
    return connections.some((c: any) => isProviderConnectionUsable(c));
  } catch {
    return null;
  }
}
