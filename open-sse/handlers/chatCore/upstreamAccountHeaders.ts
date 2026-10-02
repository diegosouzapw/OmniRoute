import { hasSelfAccountQuotaScope } from "@/shared/constants/selfServiceScopes";

/**
 * Per-API-key policy for forwarding the
 * upstream Anthropic account-identity/quota headers
 * (`anthropic-ratelimit-*`, `anthropic-organization-id`) on the streaming
 * passthrough.
 *
 * These headers describe the ACCOUNT that served the request (its rate
 * limit window state, its org id), not the caller's own usage. Forwarding
 * them to an API key holder who does not exclusively own that account (or
 * who is not opted into sharing that account's quota) leaks another
 * account's identity/quota data. `mode: "forward"` (the default) preserves legacy forwarding; `mode: "auto"` only forwards
 * when the key is both scoped for it AND pinned to exactly one connection.
 */

/** The subset of `apiKeyInfo` this policy reads. Kept structural (not `ApiKeyMetadata`) so this module has no dependency on the DB-facing key metadata shape. */
export interface AnthropicAccountHeaderPolicyKeyInfo {
  scopes?: string[];
  allowedConnections?: string[];
  sharedQuotaProviders?: string[] | null;
  anthropicRateLimitHeaders?: "auto" | "forward" | "strip";
}

/**
 * True when `name` is one of the upstream Anthropic account-identity/quota
 * response headers governed by this policy: any `anthropic-ratelimit-*`
 * header, or exactly `anthropic-organization-id`. Case-insensitive.
 */
export function isAnthropicAccountHeader(name: string): boolean {
  const normalized = name.toLowerCase();
  return (
    normalized.startsWith("anthropic-ratelimit-") || normalized === "anthropic-organization-id"
  );
}

/**
 * Decide whether the upstream Anthropic account-identity/quota headers must
 * be stripped from the streaming response for this request:
 *
 * - No API key on the request (`apiKeyInfo` null/undefined) → forward
 *   (unchanged, pre-existing behavior for unauthenticated/local usage).
 * - `anthropicRateLimitHeaders === "forward"` → forward.
 * - `anthropicRateLimitHeaders === "strip"` → strip.
 * - Unset (the default) or `"forward"` → forward (preserves pre-PR behavior for all existing keys).
 * - `"auto"` → forward ONLY IF the key's scopes
 *   include `self:account-quota` AND (`sharedQuotaProviders` is
 *   null/undefined, i.e. "all providers", OR it includes `provider`) AND
 *   `allowedConnections` has exactly one entry (the key is pinned to a
 *   single account, so the served account is unambiguously the caller's
 *   own); otherwise strip.
 */
export function shouldStripAnthropicAccountHeaders(
  apiKeyInfo: AnthropicAccountHeaderPolicyKeyInfo | null | undefined,
  provider: string | null | undefined
): boolean {
  if (!apiKeyInfo) return false;

  const mode = apiKeyInfo.anthropicRateLimitHeaders ?? "forward";
  if (mode === "forward") return false;
  if (mode === "strip") return true;

  const hasScope = hasSelfAccountQuotaScope(apiKeyInfo.scopes);
  const sharedProviders = apiKeyInfo.sharedQuotaProviders;
  const providerShared =
    sharedProviders === null ||
    sharedProviders === undefined ||
    (!!provider && sharedProviders.includes(provider));
  const pinnedToSingleConnection = (apiKeyInfo.allowedConnections?.length ?? 0) === 1;

  const forwardAllowed = hasScope && providerShared && pinnedToSingleConnection;
  return !forwardAllowed;
}

/** Strip all upstream Anthropic account-identity/quota headers from a Headers instance. */
export function stripAnthropicAccountHeadersFromHeaders(headers: Headers): void {
  const toDelete: string[] = [];
  headers.forEach((_val, key) => {
    if (isAnthropicAccountHeader(key)) toDelete.push(key);
  });
  for (const k of toDelete) headers.delete(k);
}
