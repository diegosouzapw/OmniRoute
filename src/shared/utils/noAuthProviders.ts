import { NOAUTH_PROVIDERS, getProviderById } from "@/shared/constants/providers";

type ProviderWithAlias = { alias?: string };
type NoAuthProviderEntry = { id: string; alias?: string };

const noAuthProviderEntries = Object.values(NOAUTH_PROVIDERS) as NoAuthProviderEntry[];

export function normalizeBlockedProviderSet(blockedProviders: unknown): Set<string> {
  const entries = blockedProviders instanceof Set ? Array.from(blockedProviders) : blockedProviders;
  return new Set(
    Array.isArray(entries)
      ? entries.filter(
          (provider): provider is string => typeof provider === "string" && provider.length > 0
        )
      : []
  );
}

export function isProviderBlockedByIdOrAlias(
  providerId: string,
  blockedProviders: unknown
): boolean {
  const blockedProviderSet = normalizeBlockedProviderSet(blockedProviders);
  const provider = getProviderById(providerId) as ProviderWithAlias | undefined;
  return (
    blockedProviderSet.has(providerId) ||
    (typeof provider?.alias === "string" && blockedProviderSet.has(provider.alias))
  );
}

export function isNoAuthProviderKey(...keys: Array<string | null | undefined>): boolean {
  return noAuthProviderEntries.some((provider) =>
    keys.some((key) => key === provider.id || key === provider.alias)
  );
}

export function isNoAuthProviderBlocked(
  blockedProviders: unknown,
  ...keys: Array<string | null | undefined>
): boolean {
  const blockedProviderSet = normalizeBlockedProviderSet(blockedProviders);
  return noAuthProviderEntries.some(
    (provider) =>
      keys.some((key) => key === provider.id || key === provider.alias) &&
      (blockedProviderSet.has(provider.id) ||
        (typeof provider.alias === "string" && blockedProviderSet.has(provider.alias)))
  );
}

/**
 * Partition a list of no-auth provider entries into the ones that are visible
 * (not blocked) and the ones currently in `blockedProviders`, matched by either
 * the provider id or its alias. Blocked entries are RETURNED (in `blocked`),
 * never discarded — the dashboard surfaces them with a "Disabled" badge + an
 * Enable button instead of silently hiding them (#5166/#5183: a disabled no-auth
 * provider used to vanish from the All Providers page with no in-place restore).
 * Order within each bucket is preserved.
 */
export function partitionNoAuthEntriesByBlocked<
  T extends { providerId: string; provider: { alias?: string } },
>(entries: T[], blockedProviders: unknown): { visible: T[]; blocked: T[] } {
  const blockedProviderSet = normalizeBlockedProviderSet(blockedProviders);
  const visible: T[] = [];
  const blocked: T[] = [];
  for (const entry of entries) {
    const alias = typeof entry.provider.alias === "string" ? entry.provider.alias : null;
    const isBlocked =
      blockedProviderSet.has(entry.providerId) || (alias !== null && blockedProviderSet.has(alias));
    (isBlocked ? blocked : visible).push(entry);
  }
  return { visible, blocked };
}

export function isNoAuthRawProviderPrefix(providerId: string, prefix: string): boolean {
  const provider = noAuthProviderEntries.find((entry) => entry.id === providerId);
  return (
    typeof provider?.alias === "string" && provider.alias !== providerId && prefix === providerId
  );
}
