/**
 * Model Deprecation Auto-Forward — Feature 2
 *
 * Maps deprecated model IDs to their replacements so user configs
 * don't break when providers rename or retire models.
 *
 * Supports both built-in aliases (static) and custom aliases (persisted via Settings API).
 */

import { hasKnownProviderModel } from "./model.ts";

// ── Built-in Deprecation Aliases ────────────────────────────────────────────
// These are known renames/retirements across providers.
// Format: deprecated ID → current ID
const BUILT_IN_ALIASES: Record<string, string> = {
  // Gemini legacy → current
  "gemini-pro": "gemini-2.5-pro",
  "gemini-pro-vision": "gemini-2.5-pro",
  "gemini-1.5-pro": "gemini-2.5-pro",
  "gemini-1.5-flash": "gemini-2.5-flash",
  "gemini-1.0-pro": "gemini-2.5-pro",
  "gemini-2.0-flash": "gemini-2.5-flash",
  "gemini-2.0-flash-lite": "gemini-3.1-flash-lite",
  "gemini-3.1-flash-lite-preview": "gemini-3.1-flash-lite",
  // #11503: the catalog spells this one with hyphens ("gemini-3-1-pro-high"); the
  // dotted form is not a routable id, so the rewrite used to guarantee a 404.
  "gemini-3-pro-high": "gemini-3-1-pro-high",
  "gemini-3-pro-low": "gemini-3.1-pro-low",
  // Retired free Gemma (was in the gemini-free pool) → current gemini-free model
  "gemma-4": "gemini-3.1-flash-lite",

  // Claude legacy → current.
  // #11503: these five forwarded one retired id to another (claude-opus-4-20250514 and
  // claude-sonnet-4-20250514 retired 2026-06-15, claude-3-5-sonnet-20241022 retired
  // 2025-10-28), so every rewrite landed on a model the vendor no longer serves. The
  // targets below are the replacements Anthropic publishes on its deprecations page.
  "claude-3-opus-20240229": "claude-opus-4-8",
  "claude-3-sonnet-20240229": "claude-sonnet-4-6",
  "claude-3-haiku-20240307": "claude-haiku-4-5-20251001",
  "claude-3-5-sonnet-latest": "claude-sonnet-4-6",
  "claude-3-5-haiku-latest": "claude-haiku-4-5-20251001",

  // Kimi/Moonshot — Fireworks long-path aliases (#265)
  "accounts/fireworks/models/kimi-k2p5": "moonshotai/Kimi-K2.5",
  "fireworks/accounts/fireworks/models/kimi-k2p5": "moonshotai/Kimi-K2.5",
  "kimi-k2p5": "moonshotai/Kimi-K2.5",
  "accounts/fireworks/models/kimi-k2": "moonshotai/Kimi-K2",
  "fireworks/accounts/fireworks/models/kimi-k2": "moonshotai/Kimi-K2",
  "kimi-k2": "moonshotai/Kimi-K2",

  // Qwen — the model ships only under the `-preview` id (bailian-coding-plan, qoder,
  // qwen-cloud-token-plan). Without this, the bare id missed MODEL_SPECS and
  // the context preflight fell back to contextManager's `default: 128000`, rejecting
  // prompts the model's real 1M window accepts. Drop this line if Alibaba ever ships a
  // distinct GA `qwen3.8-max` — it would no longer be the same model.
  "qwen3.8-max": "qwen3.8-max-preview",

  // Mistral short aliases
  "mistral-large": "mistral-large-latest",
  "mistral-small": "mistral-small-latest",
  codestral: "codestral-latest",
  // Sweep 2026-06-19: codestral-2405 retired 2025-06-16 — forward to the current stable.
  "codestral-2405": "codestral-2508",

  // Llama short aliases
  "llama-3.3": "llama-3.3-70b-versatile",
  "llama-3-70b": "llama-3.3-70b-versatile",
  // #11503: llama3-8b-8192 deprecated on Groq 2025-08-30 and not in the
  // catalog; llama-3.1-8b-instant is the replacement Groq names.
  "llama-3-8b": "llama-3.1-8b-instant",

  // Agnes 1.5 Flash: wiki marks deprecated; live GET /v1/models
  // (2026-09-09) no longer lists it (503 no channel).
  "agnes-1.5-flash": "agnes-3.0-flash",
};

// ── Custom Aliases (persisted via Settings API) ─────────────────────────────
//
// Backed by globalThis so the singleton store is shared across the SEPARATE webpack
// module graphs Next.js builds for `instrumentation.ts` (boot-time hydration via
// applyRuntimeSettings → setCustomAliases) and the app-route `GET /api/settings/model-aliases`.
// A plain module-level `let` is DUPLICATED per graph, so startup hydration lands on the
// instrumentation graph's copy while the API route reads an empty copy — the exact
// symptom #5777 patched at the route layer. Migrating the store to globalThis fixes the
// root cause (both instances read/write one store), mirroring the #5312 pattern already
// applied to thinkingBudget.ts and backgroundTaskDetector.ts (and systemPrompt.ts #2470).
const CUSTOM_ALIASES_GLOBAL_KEY = "__omniroute_customAliases__";
const _aliasStore = globalThis as unknown as Record<string, Record<string, string> | undefined>;

function customAliases(): Record<string, string> {
  if (!_aliasStore[CUSTOM_ALIASES_GLOBAL_KEY]) {
    _aliasStore[CUSTOM_ALIASES_GLOBAL_KEY] = {};
  }
  return _aliasStore[CUSTOM_ALIASES_GLOBAL_KEY]!;
}

/**
 * Set custom aliases (called from settings API or startup).
 */
export function setCustomAliases(aliases: Record<string, string>): void {
  _aliasStore[CUSTOM_ALIASES_GLOBAL_KEY] = { ...aliases };
}

/**
 * Get current custom aliases.
 */
export function getCustomAliases(): Record<string, string> {
  return { ...customAliases() };
}

/**
 * Get the full alias map (built-in + custom).
 * Custom aliases take precedence over built-in.
 */
export function getAllAliases(): Record<string, string> {
  return { ...BUILT_IN_ALIASES, ...customAliases() };
}

/**
 * Resolve a model alias to its current ID.
 * Custom aliases override built-in ones.
 *
 * The table is GLOBAL but the catalog is not: `kimi-k2`, `gemini-2.0-flash` and friends
 * are still served under their original id by some aggregators, and rewriting them there
 * turns a working request into a 404. So when the caller knows which provider will serve
 * the request (#11503), a provider that lists the id as-is wins over the alias table.
 * Callers with no provider in hand keep the previous unconditional behaviour.
 *
 * @param {string} modelId - The model ID to resolve
 * @param {string | null} [provider] - Provider (id or alias) that will serve the request
 * @returns {string} The resolved model ID, or the original if not deprecated
 */
export function resolveModelAlias(modelId: string, provider?: string | null): string {
  if (!modelId) return modelId;

  // Check custom aliases first (higher priority). An operator-authored alias is an
  // explicit instruction, so it applies even when the provider serves the source id.
  const custom = customAliases();
  if (custom[modelId]) return custom[modelId];

  if (!BUILT_IN_ALIASES[modelId]) return modelId;

  // The provider serves this id itself — nothing is deprecated from its point of view.
  if (provider && hasKnownProviderModel(provider, modelId)) return modelId;

  return BUILT_IN_ALIASES[modelId];
}

/**
 * Get a deprecation notice if the model is deprecated.
 *
 * @param {string} modelId - The model ID to check
 * @returns {string | null} Deprecation message or null if not deprecated
 */
export function getDeprecationNotice(modelId: string): string | null {
  if (!modelId) return null;

  const resolved = resolveModelAlias(modelId);
  if (resolved === modelId) return null;

  return `Model "${modelId}" is deprecated. Forwarding to "${resolved}".`;
}

/**
 * Check if a model is deprecated.
 */
export function isDeprecated(modelId: string): boolean {
  return getDeprecationNotice(modelId) !== null;
}

/**
 * Add a custom alias.
 */
export function addCustomAlias(from: string, to: string): void {
  customAliases()[from] = to;
}

/**
 * Remove a custom alias.
 */
export function removeCustomAlias(from: string): boolean {
  const custom = customAliases();
  if (custom[from]) {
    delete custom[from];
    return true;
  }
  return false;
}

/**
 * Get the built-in aliases (read-only reference).
 */
export function getBuiltInAliases(): Record<string, string> {
  return { ...BUILT_IN_ALIASES };
}
