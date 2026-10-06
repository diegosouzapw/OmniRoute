import { RERANK_PROVIDERS } from "@omniroute/open-sse/config/rerankRegistry.ts";
import type { EmbeddingProviderListing } from "./types";

type RerankProviderConfig = (typeof RERANK_PROVIDERS)[keyof typeof RERANK_PROVIDERS];

/**
 * Build a rerank provider listing entry for one curated registry config.
 */
export function buildRerankProviderListing(
  providerId: string,
  config: RerankProviderConfig,
  hasKey: boolean
): EmbeddingProviderListing {
  return {
    provider: providerId,
    hasKey,
    models: config.models.map((m) => ({
      id: `${providerId}/${m.id}`,
      name: m.name,
      dimensions: null,
    })),
  };
}

/**
 * Merge curated rerank listings (first, authoritative on id collisions) with
 * derived/local entries (appended in order).
 */
export function mergeRerankProviderListings(
  curated: EmbeddingProviderListing[],
  extra: EmbeddingProviderListing[]
): EmbeddingProviderListing[] {
  const seen = new Set(curated.map((p) => p.provider));
  const merged = [...curated];
  for (const p of extra) {
    if (!seen.has(p.provider)) {
      seen.add(p.provider);
      merged.push(p);
    }
  }
  return merged;
}
