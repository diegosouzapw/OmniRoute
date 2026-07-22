// #5420 — Tool-only providers (web search / web fetch) do not expose a model
// listing; their "Import Models" button hits the `400 "does not support models
// listing"` route. The old `-search` suffix heuristic caught `brave-search` but
// missed tool-only providers whose id has no suffix (e.g. `firecrawl`, declared
// `serviceKinds: ["webFetch"]`). This pure helper decides, from the provider id
// plus its resolved serviceKinds, whether to hide model listing — without ever
// hiding an LLM or media provider that genuinely lists models. Leaf module: it
// imports nothing, so it cannot create an import cycle with the page.

/** Service kinds that, on their own, mean the provider lists no models. */
const TOOL_ONLY_SERVICE_KINDS = new Set<string>(["webSearch", "webFetch"]);

/** Providers whose registry catalog is the complete, intentional model list. */
const CURATED_MODEL_ONLY_PROVIDERS = new Set<string>(["kimi-web"]);

export function providerUsesCuratedModelsOnly(providerId: string): boolean {
  return CURATED_MODEL_ONLY_PROVIDERS.has(providerId.trim().toLowerCase());
}

/**
 * True when the provider is tool-only and therefore has no model listing:
 *  - its id ends in `-search` (legacy search providers), OR
 *  - it declares at least one serviceKind and EVERY declared kind is a tool-only
 *    kind (`webSearch` / `webFetch`) — i.e. no `llm` and no media/embedding kind.
 *
 * Returns false for an empty `kinds` (most LLM providers declare nothing) and for
 * any provider that has `llm`/image/video/music/tts/stt/embedding.
 */
export function providerLacksModelListing(providerId: string, kinds: readonly string[]): boolean {
  if (providerId.endsWith("-search")) return true;
  if (kinds.length === 0) return false;
  return kinds.every((kind) => TOOL_ONLY_SERVICE_KINDS.has(kind));
}
