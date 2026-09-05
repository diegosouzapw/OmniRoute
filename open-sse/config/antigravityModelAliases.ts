import {
  GOOGLE_CLOUD_CODE_PUBLIC_MODELS,
  isDiscoverableGoogleCloudCodeModelId,
  isVisibleGoogleCloudCodeQuotaModelId,
} from "./googleCloudCodeModelCatalog";

export const ANTIGRAVITY_PUBLIC_MODELS = GOOGLE_CLOUD_CODE_PUBLIC_MODELS;

export const ANTIGRAVITY_MODEL_ALIASES = Object.freeze({
  // Gemini 3.8 Flash tiers map to the upstream tiered endpoint model; the thinking
  // budget is steered via generationConfig.thinkingConfig.thinkingBudget.
  "gemini-3.8-flash": "gemini-3.8-flash-tiered",
  "gemini-3.8-flash-high": "gemini-3.8-flash-tiered",
  "gemini-3.8-flash-medium": "gemini-3.8-flash-tiered",
  "gemini-3.8-flash-low": "gemini-3.8-flash-tiered",
  "gpt-oss-120b": "gpt-oss-120b-medium",
  // gemini-3.1-pro-low is not aliased: the upstream accepts it verbatim.
  // gemini-3.1-pro-high: the discovery slot returns HTTP 400 on v1internal;
  // the live upstream id is gemini-pro-agent (see ANTIGRAVITY_PUBLIC_MODELS).
  "gemini-3.1-pro-high": "gemini-pro-agent",
  "gemini-3-pro-image-preview": "gemini-3-pro-image",
  // Legacy Claude display ids → current upstream ids. NOTE: an earlier comment here
  // assumed Claude was removed from Antigravity 2.0 and would 404; discussion #3184
  // disproved that — the Antigravity OAuth backend still serves claude-opus-4-6-thinking
  // and claude-sonnet-4-6 (now listed in ANTIGRAVITY_PUBLIC_MODELS above). These aliases
  // remap the old gemini-claude-* ids to the live upstream ids.
  "gemini-claude-sonnet-4-5": "claude-sonnet-4-6",
  "gemini-claude-sonnet-4-5-thinking": "claude-sonnet-4-6",
  "gemini-claude-opus-4-5-thinking": "claude-opus-4-6-thinking",
});

type AntigravityModelAliasMap = Record<string, string>;

/**
 * Per-request upstream-id fallback chains for callable Gemini 3.1 Pro tiers.
 * Each chain starts with its own key and every candidate is listed at most once.
 */
export const ANTIGRAVITY_PRO_FALLBACK_CHAINS: Readonly<Record<string, readonly string[]>> =
  Object.freeze({
    "gemini-3.1-pro-low": Object.freeze(["gemini-3.1-pro-low", "gemini-3-pro-low"]),
  });

/**
 * Return the ordered upstream-id fallback chain for `modelId` (the requested id first), or
 * `[]` when the model has no chain (flash, claude, plain pro, etc.). Pure — safe to unit test
 * and to call on every request (returns `[]` cheaply off the happy path's hot models).
 */
export function getAntigravityModelFallbacks(modelId: string): readonly string[] {
  if (!modelId) return [];
  return ANTIGRAVITY_PRO_FALLBACK_CHAINS[modelId] ?? [];
}

export const ANTIGRAVITY_REVERSE_MODEL_ALIASES: AntigravityModelAliasMap = Object.freeze({
  "gemini-3-pro-image": "gemini-3-pro-image-preview",
});

const CLIENT_VISIBLE_MODEL_NAMES = Object.freeze(
  ANTIGRAVITY_PUBLIC_MODELS.reduce<Record<string, string>>((acc, model) => {
    acc[model.id] = model.name;
    return acc;
  }, {})
);

export function resolveAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return (ANTIGRAVITY_MODEL_ALIASES as AntigravityModelAliasMap)[modelId] || modelId;
}

export function toClientAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return ANTIGRAVITY_REVERSE_MODEL_ALIASES[modelId] || modelId;
}

/**
 * Keep Antigravity quota buckets in the upstream model-id namespace used by the public
 * catalog, or return `null` when a retired preview bucket should be hidden from clients.
 */
export function toClientAntigravityQuotaModelId(modelId: string): string | null {
  if (!isVisibleGoogleCloudCodeQuotaModelId(modelId)) return null;
  return toClientAntigravityModelId(modelId);
}

export function getClientVisibleAntigravityModelName(
  modelId: string,
  fallbackName?: string
): string {
  return CLIENT_VISIBLE_MODEL_NAMES[modelId] || fallbackName || modelId;
}

export const isUserCallableAntigravityModelId = isDiscoverableGoogleCloudCodeModelId;

/**
 * Return whether a model reported by Antigravity's authenticated live catalog belongs to the
 * explicitly supported public catalog. Unknown and legacy upstream entries stay hidden until
 * they are deliberately added to the shared Google Cloud Code catalog.
 */
export const isDiscoverableAntigravityModelId = isDiscoverableGoogleCloudCodeModelId;
