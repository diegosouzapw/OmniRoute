/**
 * Model Family Fallback — Phase 2 Feature (T5)
 *
 * Implements two-phase model resolution:
 *   Phase 1 (static, pre-request): already done by model.ts alias resolution.
 *   Phase 2 (dynamic, post-error): when a provider returns a model-not-available
 *   error (400 with specific message or 404), we try sibling models within the
 *   same "family" before giving up.
 *
 * Inspired by Antigravity Manager's account-aware dynamic model remapping
 * (commit 6cea566, Mar 8 2026).
 */

// ── Model Family Definitions ─────────────────────────────────────────────────

/**
 * Ordered candidate lists per model family.
 * First entry is the most preferred; fallback proceeds in order.
 */
const MODEL_FAMILIES: Record<string, string[]> = {
  // Gemini 3 / 3.1 Pro family — ordered by preference
  "gemini-3-pro": [
    "gemini-3.1-pro-preview",
    "gemini-3-pro-preview",
    "gemini-3.1-pro-high",
    "gemini-3-pro-high",
    "gemini-3.1-pro-low",
    "gemini-3-pro-low",
  ],
  "gemini-3.1-pro": [
    "gemini-3.1-pro-preview",
    "gemini-3-pro-preview",
    "gemini-3.1-pro-high",
    "gemini-3-pro-high",
    "gemini-3.1-pro-low",
    "gemini-3-pro-low",
  ],
  "gemini-3-pro-preview": [
    "gemini-3.1-pro-preview",
    "gemini-3-pro-high",
    "gemini-3.1-pro-high",
    "gemini-3-pro-low",
    "gemini-3.1-pro-low",
  ],
  "gemini-3.1-pro-preview": [
    "gemini-3-pro-preview",
    "gemini-3.1-pro-high",
    "gemini-3-pro-high",
    "gemini-3.1-pro-low",
    "gemini-3-pro-low",
  ],
  "gemini-3-pro-high": [
    "gemini-3.1-pro-high",
    "gemini-3-pro-preview",
    "gemini-3.1-pro-preview",
    "gemini-3-pro-low",
    "gemini-3.1-pro-low",
  ],
  "gemini-3.1-pro-high": [
    "gemini-3-pro-high",
    "gemini-3.1-pro-preview",
    "gemini-3-pro-preview",
    "gemini-3.1-pro-low",
    "gemini-3-pro-low",
  ],

  // Gemini 2.5 Pro family
  "gemini-2.5-pro": ["gemini-2.5-pro-preview-06-05", "gemini-2.5-pro-exp-03-25"],
  "gemini-2.5-pro-preview-06-05": ["gemini-2.5-pro", "gemini-2.5-pro-exp-03-25"],

  // Claude Opus family
  "claude-opus-4-6": ["claude-opus-4-6-thinking", "claude-opus-4-5-20251101", "claude-sonnet-4-6"],
  "claude-opus-4-6-thinking": ["claude-opus-4-6", "claude-opus-4-5-20251101"],

  // Claude Sonnet family
  "claude-sonnet-4-6": ["claude-sonnet-4-5-20250929", "claude-sonnet-4-20250514"],
  "claude-sonnet-4-5-20250929": ["claude-sonnet-4-6", "claude-sonnet-4-20250514"],

  // GPT-5 family
  "gpt-5": ["gpt-5-mini", "gpt-4o"],
  "gpt-5.1": ["gpt-5.1-mini", "gpt-5", "gpt-4o"],
};

// ── Error Detection ──────────────────────────────────────────────────────────

/**
 * Error message fragments that indicate the requested model is unavailable
 * for the current account/provider, as opposed to a transient error.
 */
const MODEL_UNAVAILABLE_FRAGMENTS = [
  "model not found",
  "model_not_found",
  "model not available",
  "model is not available",
  "no such model",
  "unsupported model",
  "unknown model",
  "this model does not exist",
  "invalid model",
  "model not supported",
  "does not support",
  "not enabled for",
  "access to model",
  "improperly formed request", // Kiro 400 (model unavailable)
];

/**
 * Returns true if the HTTP status + error message indicates the model
 * itself is not available, not a transient server error.
 */
export function isModelUnavailableError(status: number, errorMessage: string): boolean {
  if (status === 404) return true;
  if (status !== 400 && status !== 403) return false;

  const msg = errorMessage.toLowerCase();
  return MODEL_UNAVAILABLE_FRAGMENTS.some((fragment) => msg.includes(fragment));
}

// ── Fallback Resolution ──────────────────────────────────────────────────────

/**
 * Get the next fallback model from the same family.
 *
 * @param currentModel  The model that just failed
 * @param triedModels   Set of model IDs already tried (to avoid cycles)
 * @returns             Next model to try, or null if family exhausted
 */
export function getNextFamilyFallback(
  currentModel: string,
  triedModels: Set<string>
): string | null {
  const family = MODEL_FAMILIES[currentModel];
  if (!family) return null;

  for (const candidate of family) {
    if (!triedModels.has(candidate)) {
      return candidate;
    }
  }

  return null; // family exhausted
}

/**
 * Check if a model belongs to any registered family.
 */
export function isInModelFamily(model: string): boolean {
  return model in MODEL_FAMILIES;
}

/**
 * Get all members of a model's family (including itself).
 */
export function getModelFamily(model: string): string[] {
  const family = MODEL_FAMILIES[model];
  if (!family) return [model];
  return [model, ...family];
}
