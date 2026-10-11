import { PROVIDER_ID_TO_ALIAS } from "../config/providerModels.ts";
import { resolveProviderAlias } from "./providerAlias.ts";

/**
 * #15622: `parseModel()` freezes `<provider>/<id>` as an exact model id when another
 * provider catalogs that verbatim string (e.g. xKiro lists `sensenova/sensenova-6.8-flash-lite`)
 * and the named provider's static registry lacks the bare id. The operator's customModels /
 * synced entries for the named provider were never consulted, so the request was misrouted.
 *
 * Returns `{ provider, model }` only when the prefix is a registered provider that has an
 * ACTIVE connection whose customModels / syncedAvailableModels contain the bare id.
 * Otherwise returns null and the exact-id behaviour is kept (aggregator-style ids).
 */
export async function resolveActivePrefixedProviderModel(
  prefixedId: string | null
): Promise<{ provider: string; model: string } | null> {
  if (!prefixedId || typeof prefixedId !== "string") return null;
  const firstSlash = prefixedId.indexOf("/");
  if (firstSlash <= 0) return null;

  const provider = resolveProviderAlias(prefixedId.slice(0, firstSlash).trim());
  const bareId = prefixedId.slice(firstSlash + 1).trim();
  if (!provider || !bareId || !(provider in PROVIDER_ID_TO_ALIAS)) return null;

  try {
    const { getActiveProvidersWithSyncedModel } = await import("@/lib/db/models");
    const active = await getActiveProvidersWithSyncedModel(bareId);
    if (active.some((p) => resolveProviderAlias(p) === provider)) {
      return { provider, model: bareId };
    }
  } catch {
    // DB unavailable in a lightweight runtime: keep the exact-id behaviour.
  }
  return null;
}
