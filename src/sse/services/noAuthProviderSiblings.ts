/**
 * #7993 — "OpenCode Free" is served by TWO distinct provider identities that
 * are never unified: the no-auth "opencode" provider (NOAUTH_PROVIDERS,
 * alias "oc" — the id the NoAuthAccountCard UI writes fingerprints +
 * accountProxies onto via a `provider_connections` row) and the
 * "opencode-zen" / "opencode-go" APIKEY_PROVIDERS gateways (which carry
 * `anonymousFallback: true` for the same public endpoint).
 *
 * A model string resolved to the canonical/full prefix ("opencode/<model>")
 * routes to "opencode-zen", not "opencode" (see the #2901 guard in
 * open-sse/services/model.ts). When that happens, credential hydration for
 * "opencode-zen" must still be able to find the user's proxy/fingerprint
 * config, which physically lives on the "opencode" connection row — this
 * sibling map lets `loadNoAuthProviderSpecificData()` look there too.
 */
const NOAUTH_SIBLING_PROVIDER_IDS: Record<string, string[]> = {
  "opencode-zen": ["opencode"],
  "opencode-go": ["opencode"],
};

/** Provider ids to query when hydrating no-auth `providerSpecificData` for `providerId`. */
export function getNoAuthHydrationProviderIds(providerId: string): string[] {
  return [providerId, ...(NOAUTH_SIBLING_PROVIDER_IDS[providerId] || [])];
}
