/**
 * Model Deprecation Auto-Forward — Feature 2
 *
 * Maps deprecated model IDs to their replacements so user configs
 * don't break when providers rename or retire models.
 *
 * Supports both built-in aliases (static) and custom aliases (persisted via Settings API).
 */

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
  "gemini-3-pro-high": "gemini-3.1-pro-high",
  "gemini-3-pro-low": "gemini-3.1-pro-low",
  // Retired free Gemma (was in the gemini-free pool) → current gemini-free model
  "gemma-4": "gemini-3.1-flash-lite",

  // Claude legacy → current
  "claude-3-opus-20240229": "claude-opus-4-20250514",
  "claude-3-sonnet-20240229": "claude-sonnet-4-20250514",
  "claude-3-haiku-20240307": "claude-3-5-sonnet-20241022",
  "claude-3-5-sonnet-latest": "claude-sonnet-4-20250514",
  "claude-3-5-haiku-latest": "claude-3-5-sonnet-20241022",

  // OpenAI legacy → current
  "gpt-4-turbo-preview": "gpt-4-turbo",
  "gpt-4-0125-preview": "gpt-4-turbo",
  "gpt-4-1106-preview": "gpt-4-turbo",
  "gpt-3.5-turbo-0125": "gpt-3.5-turbo",

  // Kimi/Moonshot — Fireworks long-path aliases (#265)
  "accounts/fireworks/models/kimi-k2p5": "moonshotai/Kimi-K2.5",
  "fireworks/accounts/fireworks/models/kimi-k2p5": "moonshotai/Kimi-K2.5",
  "kimi-k2p5": "moonshotai/Kimi-K2.5",
  "accounts/fireworks/models/kimi-k2": "moonshotai/Kimi-K2",
  "fireworks/accounts/fireworks/models/kimi-k2": "moonshotai/Kimi-K2",
  "kimi-k2": "moonshotai/Kimi-K2",

  // Mistral short aliases
  "mistral-large": "mistral-large-latest",
  "mistral-small": "mistral-small-latest",
  codestral: "codestral-latest",
  // Sweep 2026-06-19: codestral-2405 retired 2025-06-16 — forward to the current stable.
  "codestral-2405": "codestral-2508",

  // Llama short aliases
  "llama-3.3": "llama-3.3-70b-versatile",
  "llama-3-70b": "llama-3.3-70b-versatile",
  "llama-3-8b": "llama3-8b-8192",
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
const _aliasStore = globalThis as unknown as Record<
  string,
  Record<string, string> | undefined
>;

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
 * @param {string} modelId - The model ID to resolve
 * @returns {string} The resolved model ID, or the original if not deprecated
 */
export function resolveModelAlias(modelId: string): string {
  if (!modelId) return modelId;

  // Check custom aliases first (higher priority)
  const custom = customAliases();
  if (custom[modelId]) return custom[modelId];

  // Then check built-in
  if (BUILT_IN_ALIASES[modelId]) return BUILT_IN_ALIASES[modelId];

  return modelId;
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
