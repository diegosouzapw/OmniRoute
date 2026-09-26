/**
 * chatCore rate-limit connection guard (#14573).
 *
 * Decides whether a 429/quota-exhausted failure may keep the provider
 * connection active because sibling extra API keys remain eligible. A single
 * hot key must not take the other ~200 down: the per-key cooldown recorded at
 * the execution sites cools only the offending key, and as long as the rotator
 * can still produce an eligible key the connection stays up.
 *
 * Mirrors the ACCOUNT_DEACTIVATED extra-keys guard in chatCore.ts — same
 * shape, extended from the 401-family to the 429/rate-limit path.
 */
import {
  connectionHasExtraKeys,
  hasEligibleKey,
  type KeyHealth,
} from "../../services/apiKeyRotator.ts";

export function shouldKeepConnectionActiveOnRateLimit(
  credentials: unknown,
  errorConnectionId: string | null | undefined
): boolean {
  if (!errorConnectionId) return false;
  const creds = credentials as Record<string, unknown> | null | undefined;
  const psd = creds?.providerSpecificData as Record<string, unknown> | undefined;
  const extraKeys = (psd?.extraApiKeys as string[] | undefined) ?? [];
  const health = psd?.apiKeyHealth as Record<string, KeyHealth> | undefined;
  const primaryKey = typeof creds?.apiKey === "string" ? creds.apiKey : "";
  return (
    connectionHasExtraKeys(errorConnectionId, extraKeys) &&
    hasEligibleKey(errorConnectionId, primaryKey, extraKeys, health)
  );
}
