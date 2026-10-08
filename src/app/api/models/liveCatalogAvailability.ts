import { getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";
import { providerUsesAuthoritativeLiveCatalog } from "@omniroute/open-sse/config/providerRegistry";
import { getRegisteredProviderEffortBaseModelId } from "@omniroute/open-sse/utils/registeredEffortVariants.ts";

/**
 * #15585: dispatch (`getModelInfo` -> `lookupModelMeta`) rejects a model with
 * `model_not_found` when the provider's active live catalog is authoritative and
 * does not list it. GET /api/models must report the same verdict, otherwise the
 * dashboard shows phantom-available rows (and hides rows routing accepts).
 *
 * Maps provider (as used by AI_MODELS rows) -> live model ids, only for
 * providers whose catalog is currently authoritative. Providers absent from the
 * map keep the static availability logic.
 */
export async function loadAuthoritativeLiveCatalogs(
  providers: Iterable<string>
): Promise<Map<string, Set<string>>> {
  const result = new Map<string, Set<string>>();
  await Promise.all(
    Array.from(new Set(providers)).map(async (provider) => {
      // Same predicate getActiveSyncedCatalog applies; skipping the rest avoids a
      // per-provider catalog read (and customModels read) for every static provider.
      if (!providerUsesAuthoritativeLiveCatalog(provider)) return;
      try {
        const catalog = await getActiveSyncedCatalog(provider);
        if (!catalog.authoritative) return;
        const ids = new Set<string>();
        for (const model of catalog.models) {
          if (typeof model?.id === "string") ids.add(model.id);
        }
        result.set(provider, ids);
      } catch {
        // Fail open to the static availability logic.
      }
    })
  );
  return result;
}

/** Mirror of the runtime gate: live id match or a live-backed registered effort variant. */
export function isModelInLiveCatalog(
  provider: string,
  modelId: string,
  liveIds: Set<string>
): boolean {
  if (liveIds.has(modelId)) return true;
  const effortBase = getRegisteredProviderEffortBaseModelId(provider, modelId);
  return effortBase !== null && liveIds.has(effortBase);
}
