// @ts-check
/**
 * Lockout Policy — FASE-09 Domain Extraction (T-46)
 *
 * Extracts account lockout logic from handleChat into a dedicated
 * domain service. Manages login attempt tracking and lockout decisions.
 *
 * @module domain/lockoutPolicy
 */

/**
 * @typedef {Object} LockoutConfig
 * @property {number} [maxAttempts=5] - Max failed attempts before lockout
 * @property {number} [lockoutDurationMs=900000] - Lockout duration (15 min default)
 * @property {number} [attemptWindowMs=300000] - Window for counting attempts (5 min)
 */

/** @type {Map<string, { attempts: number[], lockedUntil: number|null }>} */
const lockoutState = new Map();

/** @type {LockoutConfig} */
const DEFAULT_CONFIG = {
  maxAttempts: 5,
  lockoutDurationMs: 15 * 60 * 1000, // 15 minutes
  attemptWindowMs: 5 * 60 * 1000, // 5 minutes
};

/**
 * Check if an identifier (IP, username, API key) is currently locked out.
 *
 * @param {string} identifier - The identifier to check
 * @param {LockoutConfig} [config]
 * @returns {{ locked: boolean, remainingMs?: number, attempts?: number }}
 */
export function checkLockout(identifier, config = DEFAULT_CONFIG) {
  const state = lockoutState.get(identifier);
  if (!state) {
    return { locked: false, attempts: 0 };
  }

  // Check if lockout has expired
  if (state.lockedUntil && Date.now() < state.lockedUntil) {
    return {
      locked: true,
      remainingMs: state.lockedUntil - Date.now(),
      attempts: state.attempts.length,
    };
  }

  // Clear expired lockout
  if (state.lockedUntil) {
    state.lockedUntil = null;
    state.attempts = [];
  }

  // Count recent attempts within the window
  const windowStart = Date.now() - config.attemptWindowMs;
  const recentAttempts = state.attempts.filter((t) => t > windowStart);
  state.attempts = recentAttempts;

  return { locked: false, attempts: recentAttempts.length };
}

/**
 * Record a failed attempt. Returns whether the identifier is now locked out.
 *
 * @param {string} identifier
 * @param {LockoutConfig} [config]
 * @returns {{ locked: boolean, remainingMs?: number }}
 */
export function recordFailedAttempt(identifier, config = DEFAULT_CONFIG) {
  if (!lockoutState.has(identifier)) {
    lockoutState.set(identifier, { attempts: [], lockedUntil: null });
  }

  const state = lockoutState.get(identifier);

  // Clean old attempts
  const windowStart = Date.now() - config.attemptWindowMs;
  state.attempts = state.attempts.filter((t) => t > windowStart);

  // Record new attempt
  state.attempts.push(Date.now());

  // Check if threshold exceeded
  if (state.attempts.length >= config.maxAttempts) {
    state.lockedUntil = Date.now() + config.lockoutDurationMs;
    return {
      locked: true,
      remainingMs: config.lockoutDurationMs,
    };
  }

  return { locked: false };
}

/**
 * Record a successful login — clears history for identifier.
 *
 * @param {string} identifier
 */
export function recordSuccess(identifier) {
  lockoutState.delete(identifier);
}

/**
 * Force-unlock an identifier (admin action).
 *
 * @param {string} identifier
 */
export function forceUnlock(identifier) {
  lockoutState.delete(identifier);
}

/**
 * Get all currently locked identifiers (for monitoring).
 *
 * @returns {Array<{ identifier: string, lockedUntil: number, remainingMs: number }>}
 */
export function getLockedIdentifiers() {
  const now = Date.now();
  const locked = [];

  for (const [id, state] of lockoutState.entries()) {
    if (state.lockedUntil && state.lockedUntil > now) {
      locked.push({
        identifier: id,
        lockedUntil: state.lockedUntil,
        remainingMs: state.lockedUntil - now,
      });
    }
  }

  return locked;
}
