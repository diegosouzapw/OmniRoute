/**
 * #7993 — sibling provider ids whose no-auth `providerSpecificData`
 * (fingerprints + accountProxies) must also be consulted when hydrating
 * credentials for a provider that shares the same public endpoint.
 *
 * Empty since the keyless OpenCode provider was removed (see
 * docs/reference/REMOVED_PROVIDERS.md): it was the only sibling pair.
 */
const NOAUTH_SIBLING_PROVIDER_IDS: Record<string, string[]> = {};

/** Provider ids to query when hydrating no-auth `providerSpecificData` for `providerId`. */
export function getNoAuthHydrationProviderIds(providerId: string): string[] {
  return [providerId, ...(NOAUTH_SIBLING_PROVIDER_IDS[providerId] || [])];
}
