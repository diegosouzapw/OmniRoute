/**
 * Models declared identically in both the `opencode-zen` and `opencode-go` provider
 * registries (same upstream family, opencode.ai/zen/*). Mirrors the GLM_SHARED_MODELS
 * pattern in glmProvider.ts: one array, spread into each sibling RegistryEntry, so a
 * metadata fix (targetFormat, supportsReasoning, ...) only has to land in one file
 * instead of drifting out of sync across registries.
 *
 * Only entries that are byte-identical across both registries belong here — a model
 * with tier-specific flags (e.g. go's effort variants, or a flag only one tier needs)
 * stays local to that registry's own `models` array.
 */
export const OPENCODE_ZEN_GO_SHARED_MODELS = Object.freeze([
  { id: "kimi-k2.7-code", name: "Kimi K2.7 Code" },
  { id: "qwen3.5-plus", name: "Qwen3.5 Plus", targetFormat: "claude", supportsVision: false },
  {
    id: "qwen3.6-plus",
    name: "Qwen3.6 Plus",
    targetFormat: "claude",
    supportsVision: false,
    // #10788: effort-tier aliases exist as explicit registry rows; declare the
    // vocabulary on the shared base row so variant synthesis and the sanitizer
    // agree on it for both opencode-go and opencode-zen.
    supportsReasoning: true,
    supportedThinkingEfforts: ["high", "max"],
  },
]);
