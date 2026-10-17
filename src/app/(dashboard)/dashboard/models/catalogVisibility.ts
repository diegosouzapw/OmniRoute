import type { CatalogModelRow } from "./modelCatalogUtils";

/** One `PATCH /api/provider-models?provider=` request body, scoped to one modality. */
export interface CatalogVisibilityPatch {
  provider: string;
  modality: string;
  modelIds: string[];
}

export interface CatalogVisibilityCounts {
  visible: number;
  hidden: number;
  total: number;
}

export function countCatalogVisibility(rows: CatalogModelRow[]): CatalogVisibilityCounts {
  const hidden = rows.filter((row) => row.hidden === true).length;
  return { visible: rows.length - hidden, hidden, total: rows.length };
}

/**
 * Group the rows whose visibility must change into one PATCH per provider + modality.
 * Rows already in the requested state, and rows without a visibility target (combos,
 * catalogs loaded without `includeHidden`), are skipped. Order follows the rows.
 */
export function groupVisibilityPatches(
  rows: CatalogModelRow[],
  hidden: boolean
): CatalogVisibilityPatch[] {
  const patches = new Map<string, CatalogVisibilityPatch>();
  for (const row of rows) {
    if (!row.visibility || (row.hidden === true) === hidden) continue;
    const { modality, targets } = row.visibility;
    for (const { provider, modelId } of targets) {
      const key = `${provider}\u0000${modality}`;
      const patch = patches.get(key) ?? { provider, modality, modelIds: [] };
      if (!patch.modelIds.includes(modelId)) patch.modelIds.push(modelId);
      patches.set(key, patch);
    }
  }
  return [...patches.values()];
}
