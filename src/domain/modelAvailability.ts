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

/**
 * @typedef {Object} FailureState
 * @property {number} failureCount
 * @property {number} lastFailureAt
 * @property {number} resetAfterMs
 */

/**
 * @typedef {Object} ProviderProfile
 * @property {number} [transientCooldown]
 * @property {number} [rateLimitCooldown]
 * @property {number} [maxBackoffLevel]
 * @property {number} [circuitBreakerThreshold]
 * @property {number} [circuitBreakerReset]
 */

/** @type {Map<string, FailureState>} */
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

function toPositiveNumber(value) {
  return Number.isFinite(value) && Number(value) > 0 ? Number(value) : null;
}

function toNonNegativeNumber(value) {
  return Number.isFinite(value) && Number(value) >= 0 ? Number(value) : null;
}

/**
 * The first layer already reacts immediately to authoritative model/account failures.
 * Global provider/model quarantine is the escalation layer, so its failure window and
 * threshold are only customized when a runtime provider profile is supplied.
 *
 * @param {ProviderProfile | null | undefined} profile
 * @returns {number}
 */
function getFailureWindowMs(profile) {
  return toPositiveNumber(profile?.circuitBreakerReset) ?? FAILURE_WINDOW_MS;
}

/**
 * Without a runtime profile we preserve legacy behavior: quarantine on the first failure.
 *
 * @param {ProviderProfile | null | undefined} profile
 * @returns {number}
 */
function getFailureThreshold(profile) {
  return toPositiveNumber(profile?.circuitBreakerThreshold) ?? 1;
}

function getLegacyStatusCooldown(status) {
  return status && Object.prototype.hasOwnProperty.call(PROBLEMATIC_STATUS_COOLDOWNS, status)
    ? PROBLEMATIC_STATUS_COOLDOWNS[status]
    : 0;
}

/**
 * @param {number | null} status
 * @param {ProviderProfile | null | undefined} profile
 * @returns {number}
 */
function getProfileStatusCooldown(status, profile) {
  if (!profile) return 0;
  if (status === 429) {
    return toPositiveNumber(profile.rateLimitCooldown) ?? 0;
  }
  return toPositiveNumber(profile.transientCooldown) ?? 0;
}

/**
 * @param {number} baseCooldownMs
 * @param {number} failureCount
 * @param {ProviderProfile | null | undefined} profile
 * @returns {number}
 */
function getScaledCooldown(baseCooldownMs, failureCount, profile) {
  const safeBase = toPositiveNumber(baseCooldownMs) ?? 1000;
  if (!profile) {
    return Math.min(
      Math.max(safeBase, MIN_PROBLEMATIC_COOLDOWN_MS) * Math.pow(2, Math.max(0, failureCount - 1)),
      MAX_PROBLEMATIC_COOLDOWN_MS
    );
  }

  const maxBackoffLevel = Math.max(
    0,
    Math.trunc(toNonNegativeNumber(profile.maxBackoffLevel) ?? 0)
  );
  const exponent = Math.min(Math.max(0, failureCount - 1), maxBackoffLevel);
  return safeBase * Math.pow(2, exponent);
}

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
 * Get remaining cooldown information for a model, if it is currently unavailable.
 *
 * @param {string} provider
 * @param {string} model
 * @returns {{ provider: string, model: string, reason: string, remainingMs: number, unavailableSince: string } | null}
 */
export function getModelCooldownInfo(provider, model) {
  const key = makeKey(provider, model);
  const entry = unavailable.get(key);
  if (!entry) return null;

  const elapsed = Date.now() - entry.unavailableSince;
  if (elapsed >= entry.cooldownMs) {
    unavailable.delete(key);
    return null;
  }

  return {
    provider: entry.provider,
    model: entry.model,
    reason: entry.reason || "unknown",
    remainingMs: entry.cooldownMs - elapsed,
    unavailableSince: new Date(entry.unavailableSince).toISOString(),
  };
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
 * @param {{ status?: number, baseCooldownMs?: number, reason?: string, profile?: ProviderProfile | null }} [options]
 * @returns {{ cooldownMs: number, failureCount: number, quarantined: boolean, threshold: number, resetAfterMs: number }}
 */
export function markModelAsProblematic(provider, model, options = {}) {
  const key = makeKey(provider, model);
  const now = Date.now();
  const status = Number.isFinite(options.status) ? Number(options.status) : null;
  const profile = options.profile || null;
  const explicitBaseCooldownMs =
    Number.isFinite(options.baseCooldownMs) && Number(options.baseCooldownMs) > 0
      ? Number(options.baseCooldownMs)
      : 0;
  const statusBaseCooldown = profile
    ? getProfileStatusCooldown(status, profile)
    : getLegacyStatusCooldown(status);
  const baseCooldownMs = Math.max(explicitBaseCooldownMs, statusBaseCooldown);

  const prev = failureState.get(key);
  const resetAfterMs = getFailureWindowMs(profile);
  const withinFailureWindow = prev && now - prev.lastFailureAt <= prev.resetAfterMs;
  const failureCount = withinFailureWindow ? prev.failureCount + 1 : 1;
  failureState.set(key, { failureCount, lastFailureAt: now, resetAfterMs });

  const threshold = getFailureThreshold(profile);
  const cooldownMs = getScaledCooldown(baseCooldownMs, failureCount, profile);
  const quarantined = failureCount >= threshold;

  if (quarantined) {
    setModelUnavailable(provider, model, cooldownMs, options.reason || "problematic_model");
  }

  return {
    cooldownMs,
    failureCount,
    quarantined,
    threshold,
    resetAfterMs,
  };
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
