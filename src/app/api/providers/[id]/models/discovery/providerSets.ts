export const NAMED_OPENAI_STYLE_PROVIDERS = new Set([
  "modal",
  "reka",
  "empower",
  "nous-research",
  "poe",
  "siliconflow",
  // #3976: these carry a real modelsUrl but were not classified by any live-fetch
  // branch, so their hardcoded registry catalog was served instead of the live
  // `<baseUrl>/models` list. Live fetch falls back to the local catalog on error.
  "llm7",
  "byteplus",
  // #4202: zenmux is the same case — its free models (e.g. z-ai/glm-5.2-free,
  // moonshotai/kimi-k2.7-code-free) live only on the upstream /models list.
  "zenmux",
  // #4249: vercel-ai-gateway carries a real baseUrl (.../v1/chat/completions) but
  // was unclassified, so import served the 5-entry hardcoded catalog instead of the
  // live `https://ai-gateway.vercel.sh/v1/models` list. Falls back to local on error.
  "vercel-ai-gateway",
  // #4239 / #4155 / #3841: OpenAI-compatible aggregators whose real catalog lives
  // on the upstream `/v1/models` list — serve it live, fall back to the seeded
  // registry catalog on error (same case as zenmux).
  "openadapter",
  "dit",
  "tokenrouter",
  // provider-model-sweep (2026-06-19): same class as #3976/#4202/#4249 — keyed
  // openai-style providers with a real live `<baseUrl>/models` catalog, served
  // their small hardcoded seed because unclassified. Seed stays as offline fallback.
  "venice",
  "deepinfra",
  "wandb",
  "pollinations",
  "nscale",
  "inference-net",
  "moonshot",
  // provider-model-sweep (2026-06-19) cont.: GPU-cloud / aggregator marketplaces
  // hosting large, volatile OSS catalogs. The sweep confirmed each exposes a live
  // `<baseUrl>/v1/models` endpoint (200 public or 401/403 = exists + keyed), so live
  // fetch keeps the catalog fresh; the registry seed remains the offline fallback.
  "crof",
  "featherless-ai",
  "ovhcloud",
  "sambanova",
  "orcarouter",
  "uncloseai",
  "opencode-go",
  "baseten",
  "hyperbolic",
  "nebius",
  "scaleway",
  "together",
  // escalated cmqlvxg4o: api-airforce has a live `https://api.airforce/v1/models` catalog
  // but was left out of the sweep, so it served a stale hardcoded seed (grok-3, grok-2-1212,
  // claude-3.7-sonnet …). Live fetch keeps it fresh; seed stays as the offline fallback.
  "api-airforce",
  // DGrid is an OpenAI-compatible gateway whose default seed is the free auto-router;
  // the full model catalog is discovered live from https://api.dgrid.ai/v1/models.
  "dgrid",
]);

export function isNamedOpenAIStyleProvider(provider: string): boolean {
  return NAMED_OPENAI_STYLE_PROVIDERS.has(provider);
}
