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

export function isNoAuthRawProviderPrefix(providerId: string, prefix: string): boolean {
  const provider = noAuthProviderEntries.find((entry) => entry.id === providerId);
  return (
    typeof provider?.alias === "string" && provider.alias !== providerId && prefix === providerId
  );
}
