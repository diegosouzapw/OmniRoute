// DuckDuckGo Duck.ai model catalog helpers (pure — no network, no DOM stubs).
// Wire ids captured live from GET /duckchat/v1/models on 2026-08-26; that
// endpoint requires no VQD/challenge token, so the executor re-validates the
// requested model against it at runtime (see getLiveModelIds in duckduckgo-web.ts)
// and this static map stays as the offline fallback.

// #4037: the real served x-fe-version token has a 20-hex tail (e.g.
// `serp_20250401_100419_ET-19d438eb199b2bf7c300`); an earlier `{40}` requirement
// never matched the live token, so the scrape silently fell back to a hardcoded
// default. Bounded `{20,40}` keeps the pattern ReDoS-safe.
export const FE_VERSION_PATTERN = /serp_\d{8}_\d{6}_[A-Z]{2}-[0-9a-f]{20,40}/;

export const DUCKDUCKGO_DEFAULT_MODEL = "gpt-5.4-mini";

export const DUCKDUCKGO_MODEL_ALIASES: Readonly<Record<string, string>> = {
  // retired OpenAI ids → current GPT-5.x free tier
  "gpt-4o-mini": "gpt-5.4-mini",
  "gpt-5-mini": "gpt-5.4-mini",
  "o3-mini": "gpt-5.4-mini",
  // gpt-5.4-nano left the free lineup between the 2026-07-22 and 2026-08-26 captures
  "gpt-5.4-nano": "gpt-5.4-mini",
  // retired Llama (dropped from Duck.ai free) → nearest general free model
  "llama-4-scout": "gpt-5.4-mini",
  // renamed/versioned ids
  "claude-3-5-haiku-20241022": "claude-haiku-4-5",
  "mistral-small-2501": "mistral-small-2603",
  "gpt-oss-120b": "tinfoil/gpt-oss-120b",
  "gemma4-31b": "tinfoil/gemma4-31b",
};

export function normalizeDuckDuckGoModel(model: string | undefined): string {
  if (!model) return DUCKDUCKGO_DEFAULT_MODEL;
  const clean = model.startsWith("duckduckgo-web/") ? model.slice("duckduckgo-web/".length) : model;
  return DUCKDUCKGO_MODEL_ALIASES[clean] ?? clean;
}

// Resolve a requested model id against a live wire-id set from
// /duckchat/v1/models. When the live list is unavailable (`null` or empty),
// pass the request through untouched so an offline probe can never silently
// rewrite an otherwise valid model id.
export function pickDuckDuckGoModel(requested: string, liveIds: ReadonlySet<string> | null): string {
  if (!liveIds || liveIds.size === 0) return requested;
  if (liveIds.has(requested)) return requested;
  const aliased = DUCKDUCKGO_MODEL_ALIASES[requested] ?? requested;
  return liveIds.has(aliased) ? aliased : DUCKDUCKGO_DEFAULT_MODEL;
}

export function extractFreeDuckDuckGoModelIds(value: unknown): Set<string> {
  if (!value || typeof value !== "object") return new Set();
  const models = (value as { models?: unknown }).models;
  if (!Array.isArray(models)) return new Set();
  return new Set(
    models
      .filter((model) => {
        if (!model || typeof model !== "object") return false;
        const tiers = (model as { accessTier?: unknown }).accessTier;
        return Array.isArray(tiers) && tiers.some((tier) => tier === "free");
      })
      .map((model) => String((model as { id?: unknown }).id ?? ""))
      .filter(Boolean)
  );
}
