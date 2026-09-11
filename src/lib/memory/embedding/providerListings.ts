import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  deriveEmbeddingProviderForChatProvider,
  getEmbeddingProvider,
} from "@omniroute/open-sse/config/embeddingRegistry.ts";
import type {
  EmbeddingProviderListing,
} from "./types";

type ChatRegistryEntry = { id?: string; baseUrl?: string | string[] } | undefined;

/**
 * Derive EmbeddingProviderListings for configured providers that have NO
 * curated EMBEDDING_PROVIDERS entry but expose a derivable OpenAI-compatible
 * /embeddings endpoint (groq, mistral, upstage, vercel-ai-gateway, ...).
 *
 * @param configuredProviderIds provider ids/aliases with working credentials
 * @param derive pure derivation fn (injectable for tests)
 * @param hasKey predicate marking which ids are actually configured
 */
export function buildDerivedProviderListings(
  configuredProviderIds: Iterable<string>,
  derive: (
    providerId: string,
    chatEntry: ChatRegistryEntry
  ) => ReturnType<typeof deriveEmbeddingProviderForChatProvider>,
  hasKey: (providerId: string) => boolean
): EmbeddingProviderListing[] {
  const registry = REGISTRY as Record<string, ChatRegistryEntry>;
  const result: EmbeddingProviderListing[] = [];
  for (const id of configuredProviderIds) {
    // Curated registry entries are authoritative — never duplicate them here.
    if (getEmbeddingProvider(id)) continue;
    const derived = derive(id, registry[id]);
    if (!derived) continue;
    result.push({
      provider: id,
      hasKey: hasKey(id),
      models: [],
    });
  }
  return result;
}

/**
 * Merge curated listings (first) with derived/local listings (appended in
 * order). Curated entries win on id collisions.
 */
export function mergeProviderListings(
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
