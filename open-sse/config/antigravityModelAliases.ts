export const ANTIGRAVITY_PUBLIC_MODELS = Object.freeze([
  // Gemini 3.7 Flash tiers listed by the current official Antigravity model catalog.
  // Keep the upstream model ids unchanged so discovery and execution address the same
  // models selected by the native client.
  {
    id: "gemini-3.7-flash-high",
    name: "Gemini 3.7 Flash (High)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.7-flash-medium",
    name: "Gemini 3.7 Flash (Medium)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.7-flash-low",
    name: "Gemini 3.7 Flash (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.7-flash-tiered",
    name: "Gemini 3.7 Flash (Tiered)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  // Gemini 3.1 Pro budget tiers. Live streamGenerateContent validation uses
  // `gemini-pro-agent` for High; the separately advertised `gemini-3.1-pro-high`
  // discovery slot currently returns HTTP 400 and is intentionally not public.
  {
    id: "gemini-pro-agent",
    name: "Gemini 3.1 Pro (High)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-pro-low",
    name: "Gemini 3.1 Pro (Low)",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gemini-3.1-flash-lite",
    name: "Gemini 3.1 Flash Lite",
    contextLength: 1048576,
    maxOutputTokens: 65535,
    toolCalling: true,
  },
  // Claude (Antigravity backend). The `agy` provider already ships these from the live
  // :fetchAvailableModels probe (see agyModels.ts) and discussion #3184 confirmed they
  // are user-callable through the `antigravity` OAuth provider too — same backend.
  // `antigravity/claude-opus-4-6-thinking` and `antigravity/claude-sonnet-4-6` both work.
  // They are upstream IDs, so no alias remapping is required.
  {
    id: "claude-opus-4-6-thinking",
    name: "Claude Opus 4.6 (Thinking)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6 (Thinking)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  },
  {
    id: "gpt-oss-120b-medium",
    name: "GPT-OSS 120B (Medium)",
    contextLength: 131072,
    maxOutputTokens: 32768,
    supportsReasoning: true,
    toolCalling: true,
  },
]);

export const ANTIGRAVITY_MODEL_ALIASES = Object.freeze({
  // Gemini 3.7 Flash tiers map to the upstream tiered endpoint model; the thinking
  // budget is steered via generationConfig.thinkingConfig.thinkingBudget.
  "gemini-3.7-flash": "gemini-3.7-flash-tiered",
  "gemini-3.7-flash-high": "gemini-3.7-flash-tiered",
  "gemini-3.7-flash-medium": "gemini-3.7-flash-tiered",
  "gemini-3.7-flash-low": "gemini-3.7-flash-tiered",
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

const PUBLIC_MODEL_IDS = new Set(ANTIGRAVITY_PUBLIC_MODELS.map((model) => model.id));
const UPSTREAM_PUBLIC_MODEL_IDS = new Set(
  ANTIGRAVITY_PUBLIC_MODELS.map((model) => resolveAntigravityModelId(model.id))
);

// The authenticated Antigravity `:fetchAvailableModels` response is the source of truth for
// the models enabled for the current account and client version. Keep only known non-chat
// surfaces out of that live catalog; do not require every newly launched chat model to be
// added to this static fallback catalog first.
const ANTIGRAVITY_NON_CHAT_MODEL_IDS = new Set([
  "gemini-3-pro-image-preview",
  "gemini-3.1-flash-image",
  "gemini-3.1-flash-tts-preview",
  "gemini-2.5-flash-preview-tts",
  "tab_flash_lite_preview",
  "tab_jump_flash_lite_preview",
]);

// Non-chat models that still expose user-facing quota buckets. Keep these out of
// chat discovery while allowing Provider Limits to surface their live quota.
const ANTIGRAVITY_QUOTA_VISIBLE_NON_CHAT_MODEL_IDS = new Set([
  "gemini-3-pro-image-preview",
  "gemini-3.1-flash-image",
]);

const ANTIGRAVITY_RETIRED_MODEL_IDS = new Set([
  "gemini-3-pro-preview",
  "gemini-3.1-pro",
  "gemini-3.6-flash-high",
  "gemini-3.6-flash-medium",
  "gemini-3.6-flash-low",
  "gemini-3-flash-agent",
  "gemini-3.5-flash",
  "gemini-3.5-flash-extra-low",
  "gemini-3.5-flash-low",
  "gemini-3.5-flash-high",
  "gemini-3.5-flash-medium",
  "gemini-3.5-flash-preview",
  "gemini-2.5-pro",
  "gemini-2.5-flash-thinking",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.5-computer-use-preview-10-2025",
]);

const ANTIGRAVITY_NON_CHAT_MODEL_PATTERN =
  /(?:^|[-_])(image|imagen|audio|tts|embedding|embed|video|veo)(?:[-_]|$)/i;

export function resolveAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return (ANTIGRAVITY_MODEL_ALIASES as AntigravityModelAliasMap)[modelId] || modelId;
}

export function toClientAntigravityModelId(modelId: string): string {
  if (!modelId) return modelId;
  return ANTIGRAVITY_REVERSE_MODEL_ALIASES[modelId] || modelId;
}

// Retired/hidden upstream preview buckets that must be dropped from client-facing usage.
const ANTIGRAVITY_DROPPED_QUOTA_BUCKETS = new Set<string>([
  "gemini-3.5-flash-preview",
  "gemini-3-flash-preview",
]);

/**
 * Keep Antigravity quota buckets in the upstream model-id namespace used by the public
 * catalog, or return `null` when a retired preview bucket should be hidden from clients.
 */
export function toClientAntigravityQuotaModelId(modelId: string): string | null {
  if (!modelId) return null;
  if (
    ANTIGRAVITY_DROPPED_QUOTA_BUCKETS.has(modelId) ||
    ANTIGRAVITY_RETIRED_MODEL_IDS.has(modelId)
  ) {
    return null;
  }
  return toClientAntigravityModelId(modelId);
}

export function getClientVisibleAntigravityModelName(
  modelId: string,
  fallbackName?: string
): string {
  return CLIENT_VISIBLE_MODEL_NAMES[modelId] || fallbackName || modelId;
}

export function isUserCallableAntigravityModelId(modelId: string): boolean {
  if (!modelId) return false;
  const clientId = toClientAntigravityModelId(modelId);
  const upstreamId = resolveAntigravityModelId(modelId);
  return PUBLIC_MODEL_IDS.has(clientId) || UPSTREAM_PUBLIC_MODEL_IDS.has(upstreamId);
}

/**
 * Return whether a model reported by Antigravity's authenticated live catalog is eligible for
 * chat discovery. The upstream response already applies account/subscription gating and marks
 * internal entries with `isInternal`; this predicate only excludes known non-chat surfaces.
 */
export function isDiscoverableAntigravityModelId(modelId: string): boolean {
  const id = modelId.trim();
  if (!id || ANTIGRAVITY_NON_CHAT_MODEL_IDS.has(id) || ANTIGRAVITY_RETIRED_MODEL_IDS.has(id)) {
    return false;
  }
  return !ANTIGRAVITY_NON_CHAT_MODEL_PATTERN.test(id);
}

/**
 * Return whether an Antigravity model quota should be visible to users. Quota
 * visibility is intentionally broader than chat discovery: image-only models
 * are callable through /v1/images/generations and have their own live quota
 * buckets, but must remain excluded from the chat model catalog.
 */
export function isUserVisibleAntigravityQuotaModelId(modelId: string): boolean {
  const id = modelId.trim();
  if (!id) return false;
  return (
    isDiscoverableAntigravityModelId(id) || ANTIGRAVITY_QUOTA_VISIBLE_NON_CHAT_MODEL_IDS.has(id)
  );
}
