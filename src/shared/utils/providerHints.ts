/**
 * Per-provider default policy for upstream 429 hint trust.
 *
 * @see Issue #2100 follow-up — surface a user-overridable per-profile toggle
 * that decides whether the circuit breaker uses upstream 429 body / Retry-After
 * hints (`classify429`, `cooldownByKind`) to differentiate rate-limit from
 * quota-exhausted failure cooldowns.
 *
 * This helper returns the **default** answer for a given provider. The actual
 * runtime decision is the user override (if any) OR this default. See
 * `accountFallback.ts` / `chat.ts` / `chatHelpers.ts` for the resolution
 * call sites:
 *
 * ```ts
 * const userValue = providerProfile.useUpstream429BreakerHints; // boolean | undefined
 * const useHints  = userValue !== undefined
 *   ? userValue
 *   : defaultUseUpstream429BreakerHints(provider);
 * ```
 *
 * Default policy: direct cloud providers default `true` because their 429
 * bodies and `Retry-After` headers are authoritative. Reverse-proxy /
 * self-hosted / CLI-backed providers default `false` because forwarded 429
 * metadata is often unreliable or fabricated by the proxy.
 *
 * @module shared/utils/providerHints
 */

import {
  UPSTREAM_PROXY_PROVIDERS,
  SELF_HOSTED_CHAT_PROVIDER_IDS,
  isLocalProvider,
  isClaudeCodeCompatibleProvider,
} from "../constants/providers";

/**
 * Conservative per-provider default for `useUpstream429BreakerHints`.
 *
 * Returns `false` for any provider whose 429 metadata may be forwarded by
 * an intermediary (proxy, self-hosted runtime, CLI wrapper). Returns `true`
 * for direct cloud providers where the upstream response is authoritative.
 */
export function defaultUseUpstream429BreakerHints(providerId: string): boolean {
  if (Object.prototype.hasOwnProperty.call(UPSTREAM_PROXY_PROVIDERS, providerId)) {
    return false;
  }
  if (isLocalProvider(providerId)) {
    return false;
  }
  if (SELF_HOSTED_CHAT_PROVIDER_IDS.has(providerId)) {
    return false;
  }
  if (isClaudeCodeCompatibleProvider(providerId)) {
    return false;
  }
  return true;
}

/**
 * Resolve the effective `useHints` decision: the user override wins if set,
 * otherwise fall back to the per-provider default.
 *
 * `undefined` means "not user-set" and triggers the default lookup.
 */
export function resolveUseUpstream429BreakerHints(
  providerId: string,
  userValue: boolean | undefined
): boolean {
  if (userValue !== undefined) {
    return userValue;
  }
  return defaultUseUpstream429BreakerHints(providerId);
}
