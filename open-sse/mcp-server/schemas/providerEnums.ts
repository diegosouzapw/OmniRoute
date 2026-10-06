import { SEARCH_PROVIDERS } from "../../config/searchRegistry";
import { isProviderBlockedByIdOrAlias } from "../../../src/shared/utils/noAuthProviders";

/**
 * Dynamically generates a tuple of active search provider IDs for Zod enums.
 * Filters out any providers marked as disabled or blocked in the security policy.
 */
export function getActiveSearchProviders(blockedProviders: string[] = []): [string, ...string[]] {
  const activeProviders = Object.values(SEARCH_PROVIDERS)
    .filter(
      (provider) =>
        !provider.disabled && !isProviderBlockedByIdOrAlias(provider.id, blockedProviders)
    )
    .map((provider) => provider.id);

  if (activeProviders.length === 0) {
    return ["none_available"];
  }

  return activeProviders as [string, ...string[]];
}
