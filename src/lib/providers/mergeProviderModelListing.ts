/**
 * Pure merge of registry / synced / custom model rows for the provider detail
 * dashboard (and thus Test All targets). Server-confirmed authoritative catalogs
 * exclude retired static/imported rows while preserving operator-owned models.
 */

import { ensureCursorAutoCatalogEntry } from "@/lib/providerModels/cursorAutoCatalog";
import { mergeModelsWithCustomPrecedence } from "@/lib/providers/modelMetadataPrecedence";
import {
  providerUsesCuratedModelsOnly,
  providerUsesExclusiveSyncedListing,
} from "@/lib/providers/modelListingCapability";

export type ProviderListingModel = {
  id: string;
  name?: string;
  source?: string;
  [key: string]: unknown;
};

/** Apply the same membership rule to compatible/passthrough rows, including alias-only rows. */
export function filterUnavailableModelRows<T extends { modelId: string }>(
  rows: T[],
  syncedModels: Array<{ id?: string }>,
  customModels: Array<{ id?: string; source?: string }>,
  authoritative: boolean
): T[] {
  if (!authoritative) return rows;
  const allowed = new Set([
    ...syncedModels.map((model) => model.id),
    ...customModels.filter((model) => model.source !== "imported").map((model) => model.id),
  ]);
  return rows.filter((row) => allowed.has(row.modelId));
}

export type MergeProviderModelListingInput = {
  providerId: string;
  registryModels: Array<{ id: string; name?: string }>;
  syncedModels: Array<{ id: string; name?: string; [key: string]: unknown }>;
  customModels: Array<{ id: string; name?: string; source?: string; [key: string]: unknown }>;
  usesCuratedModelsOnly?: boolean;
  syncedCatalogAuthoritative?: boolean;
};

function normalizeCustomSource(source: unknown): "imported" | "custom" {
  return source === "imported" ? "imported" : "custom";
}

function dedupeById(models: ProviderListingModel[]): ProviderListingModel[] {
  const deduped = new Map<string, ProviderListingModel>();
  for (const m of models) {
    if (m.id && !deduped.has(m.id)) deduped.set(m.id, m);
  }
  return Array.from(deduped.values());
}

export function mergeProviderModelListing(
  input: MergeProviderModelListingInput
): ProviderListingModel[] {
  const curated =
    input.usesCuratedModelsOnly === true || providerUsesCuratedModelsOnly(input.providerId);
  const synced = curated ? [] : input.syncedModels.filter((m) => m?.id);
  const custom = curated ? [] : input.customModels.filter((m) => m?.id);

  const exclusive =
    !curated &&
    (input.syncedCatalogAuthoritative ??
      (providerUsesExclusiveSyncedListing(input.providerId) && synced.length > 0));

  if (exclusive) {
    const cursor = providerUsesExclusiveSyncedListing(input.providerId);
    const registryById = new Map(input.registryModels.map((model) => [model.id, model]));
    const liveModels = synced.map((model) => ({
      ...(registryById.get(model.id) || {}),
      ...model,
      id: model.id,
      name: model.name || model.id,
      owned_by: cursor ? "cursor" : input.providerId,
      source: "imported",
    }));
    const withAuto =
      cursor && liveModels.length > 0 ? ensureCursorAutoCatalogEntry(liveModels) : liveModels;
    const liveIds = new Set(withAuto.map((model) => model.id));
    const normalizedCustom = custom
      .filter((model) => model.source !== "imported" || liveIds.has(model.id))
      .map((model) => ({
        ...model,
        id: model.id,
        name: model.name || model.id,
        source: normalizeCustomSource(model.source),
      }));
    return dedupeById(mergeModelsWithCustomPrecedence(withAuto, normalizedCustom));
  }

  const builtInModels = input.registryModels.map((model) => ({
    ...model,
    source: "system",
  }));
  const registryIds = new Set(builtInModels.map((model) => model.id));
  const syncedExtras = synced
    .filter((model) => model.id && !registryIds.has(model.id))
    .map((model) => ({
      ...model,
      id: model.id,
      name: model.name || model.id,
      source: "imported",
    }));
  const normalizedCustom = custom.map((model) => ({
    ...model,
    id: model.id,
    name: model.name || model.id,
    source: normalizeCustomSource(model.source),
  }));

  return dedupeById(
    mergeModelsWithCustomPrecedence([...builtInModels, ...syncedExtras], normalizedCustom)
  );
}
