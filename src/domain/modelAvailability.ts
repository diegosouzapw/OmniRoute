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

/** @type {Map<string, { failureCount: number, lastFailureAt: number }>} */
const failureState = new Map();

const FAILURE_WINDOW_MS = 30 * 60 * 1000;

const PROBLEMATIC_STATUS_COOLDOWNS = {
  429: 5 * 60 * 1000,
  408: 60 * 1000,
  500: 2 * 60 * 1000,
  502: 2 * 60 * 1000,
  503: 2 * 60 * 1000,
  504: 2 * 60 * 1000,
};

const MIN_PROBLEMATIC_COOLDOWN_MS = 60 * 1000;
const MAX_PROBLEMATIC_COOLDOWN_MS = 30 * 60 * 1000;

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
  const now = Date.now();
  const safeCooldownMs = Number.isFinite(cooldownMs) && cooldownMs > 0 ? cooldownMs : 60000;
  const existing = unavailable.get(key);
  const existingRemainingMs =
    existing && Date.now() - existing.unavailableSince < existing.cooldownMs
      ? existing.cooldownMs - (Date.now() - existing.unavailableSince)
      : 0;
  const effectiveCooldownMs = Math.max(safeCooldownMs, existingRemainingMs);

  unavailable.set(key, {
    provider,
    model,
    unavailableSince: now,
    cooldownMs: effectiveCooldownMs,
    reason: reason || "unknown",
  });
}

/**
 * Marca provider/model como problemático com cooldown adaptativo.
 * Mantém retrocompatibilidade: não altera o comportamento de setModelUnavailable,
 * apenas oferece uma estratégia mais agressiva para falhas recorrentes.
 *
 * @param {string} provider
 * @param {string} model
 * @param {{ status?: number, baseCooldownMs?: number, reason?: string }} [options]
 * @returns {{ cooldownMs: number, failureCount: number }}
 */
export function markModelAsProblematic(provider, model, options = {}) {
  const key = makeKey(provider, model);
  const now = Date.now();
  const status = Number.isFinite(options.status) ? Number(options.status) : null;
  const statusBaseCooldown =
    status && Object.prototype.hasOwnProperty.call(PROBLEMATIC_STATUS_COOLDOWNS, status)
      ? PROBLEMATIC_STATUS_COOLDOWNS[status]
      : 0;
  const baseCooldownMs =
    Number.isFinite(options.baseCooldownMs) && Number(options.baseCooldownMs) > 0
      ? Number(options.baseCooldownMs)
      : 0;

  const prev = failureState.get(key);
  const withinFailureWindow = prev && now - prev.lastFailureAt <= FAILURE_WINDOW_MS;
  const failureCount = withinFailureWindow ? prev.failureCount + 1 : 1;
  failureState.set(key, { failureCount, lastFailureAt: now });

  const cooldownBase = Math.max(baseCooldownMs, statusBaseCooldown, MIN_PROBLEMATIC_COOLDOWN_MS);
  const cooldownMs = Math.min(
    cooldownBase * Math.pow(2, Math.max(0, failureCount - 1)),
    MAX_PROBLEMATIC_COOLDOWN_MS
  );

  setModelUnavailable(provider, model, cooldownMs, options.reason || "problematic_model");
  return { cooldownMs, failureCount };
}

/**
 * Clear unavailability for a model (e.g. after manual reset).
 *
 * @param {string} provider
 * @param {string} model
 * @returns {boolean} true if entry existed and was removed
 */
export function clearModelUnavailability(provider, model) {
  const key = makeKey(provider, model);
  failureState.delete(key);
  return unavailable.delete(key);
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
  failureState.clear();
}
