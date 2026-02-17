/**
 * Model Availability — Domain Layer (T-19)
 *
 * Tracks model availability per provider with TTL-based cooldowns.
 * When a model becomes unavailable (rate-limited, erroring), it is
 * marked with a cooldown period. The availability report powers
 * the dashboard health view.
 *
 * @module domain/modelAvailability
 */

// @ts-check

/**
 * @typedef {Object} UnavailableEntry
 * @property {string} provider
 * @property {string} model
 * @property {number} unavailableSince - timestamp
 * @property {number} cooldownMs
 * @property {string} [reason]
 */

/** @type {Map<string, UnavailableEntry>} */
const unavailable = new Map();

/**
 * Build a composite key for provider+model.
 * @param {string} provider
 * @param {string} model
 * @returns {string}
 */
function makeKey(provider, model) {
  return `${provider}::${model}`;
}

/**
 * Check if a model is currently available.
 *
 * @param {string} provider - Provider ID (e.g. "openai", "anthropic")
 * @param {string} model - Model ID (e.g. "gpt-4o", "claude-sonnet-4-20250514")
 * @returns {boolean} true if model is available (not in cooldown)
 */
export function isModelAvailable(provider, model) {
  const key = makeKey(provider, model);
  const entry = unavailable.get(key);
  if (!entry) return true;

  // Check if cooldown has expired
  if (Date.now() - entry.unavailableSince >= entry.cooldownMs) {
    unavailable.delete(key);
    return true;
  }

  return false;
}

/**
 * Mark a model as temporarily unavailable.
 *
 * @param {string} provider
 * @param {string} model
 * @param {number} [cooldownMs=60000] - Cooldown in milliseconds (default 60s)
 * @param {string} [reason] - Optional reason for unavailability
 */
export function setModelUnavailable(provider, model, cooldownMs = 60000, reason) {
  const key = makeKey(provider, model);
  unavailable.set(key, {
    provider,
    model,
    unavailableSince: Date.now(),
    cooldownMs,
    reason: reason || "unknown",
  });
}

/**
 * Clear unavailability for a model (e.g. after manual reset).
 *
 * @param {string} provider
 * @param {string} model
 * @returns {boolean} true if entry existed and was removed
 */
export function clearModelUnavailability(provider, model) {
  return unavailable.delete(makeKey(provider, model));
}

/**
 * Get a report of all currently unavailable models.
 *
 * @returns {Array<{ provider: string, model: string, reason: string, remainingMs: number, unavailableSince: string }>}
 */
export function getAvailabilityReport() {
  const now = Date.now();
  const report = [];

  for (const [key, entry] of unavailable.entries()) {
    const elapsed = now - entry.unavailableSince;
    if (elapsed >= entry.cooldownMs) {
      unavailable.delete(key);
      continue;
    }

    report.push({
      provider: entry.provider,
      model: entry.model,
      reason: entry.reason || "unknown",
      remainingMs: entry.cooldownMs - elapsed,
      unavailableSince: new Date(entry.unavailableSince).toISOString(),
    });
  }

  return report;
}

/**
 * Get total count of unavailable models.
 * @returns {number}
 */
export function getUnavailableCount() {
  // Prune expired entries first
  getAvailabilityReport();
  return unavailable.size;
}

/**
 * Reset all availability states (for testing or admin).
 */
export function resetAllAvailability() {
  unavailable.clear();
}
