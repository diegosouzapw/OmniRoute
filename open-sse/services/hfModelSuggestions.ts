/**
 * HuggingFace Hub "suggested models" helpers.
 *
 * Pure, unit-testable pieces used by
 * `GET /api/v1/providers/suggested-models` — that route proxies the public
 * HuggingFace Hub models search API (never exposing any HF token
 * client-side) and uses these helpers to map a dashboard media "kind" to an
 * HF `pipeline_tag`, then sort/limit the raw search results.
 */

/** Media kinds (mirrors `RegistryMediaKind` in mediaServiceKinds.ts) that currently
 *  have a mapped HF Hub `pipeline_tag`. Extend as more kinds get suggestions. */
export const SUGGESTED_MODEL_KIND_PIPELINE_TAGS: Readonly<Record<string, string>> = {
  image: "text-to-image",
};

export type SuggestedModelKind = keyof typeof SUGGESTED_MODEL_KIND_PIPELINE_TAGS;

/**
 * Resolve a dashboard media kind (e.g. "image") to the HuggingFace Hub
 * `pipeline_tag` used to search https://huggingface.co/api/models.
 * Returns null for kinds without a mapped pipeline tag.
 */
export function resolveHfPipelineTag(kind: string): string | null {
  return SUGGESTED_MODEL_KIND_PIPELINE_TAGS[kind] ?? null;
}

/** Minimal shape consumed from the HF Hub `/api/models` search response. */
export interface HfModelSummary {
  id: string;
  likes?: number;
  downloads?: number;
  pipeline_tag?: string;
}

export type HfSuggestedModelSortBy = "downloads" | "likes";

/**
 * Pure filter/sort over raw HF Hub model search results:
 * - drops entries without a usable string `id`
 * - sorts descending by the requested metric (missing/non-numeric treated as 0)
 * - caps the result to `limit` entries
 *
 * No network access — safe to unit test directly with fixture arrays.
 */
export function sortHfSuggestedModels(
  models: readonly HfModelSummary[],
  sortBy: HfSuggestedModelSortBy = "downloads",
  limit = 20
): HfModelSummary[] {
  const valid = (models ?? []).filter(
    (m): m is HfModelSummary => !!m && typeof m.id === "string" && m.id.trim().length > 0
  );

  const sorted = [...valid].sort((a, b) => {
    const bVal = Number(b[sortBy]);
    const aVal = Number(a[sortBy]);
    return (Number.isFinite(bVal) ? bVal : 0) - (Number.isFinite(aVal) ? aVal : 0);
  });

  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 20;
  return sorted.slice(0, safeLimit);
}
