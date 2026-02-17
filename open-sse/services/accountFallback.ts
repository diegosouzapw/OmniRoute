import {
  COOLDOWN_MS,
  BACKOFF_CONFIG,
  BACKOFF_STEPS_MS,
  RateLimitReason,
  HTTP_STATUS,
  PROVIDER_PROFILES,
} from "../config/constants.js";
import { getProviderCategory } from "../config/providerRegistry.js";

// ─── Provider Profile Helper ────────────────────────────────────────────────

/**
 * Get the resilience profile for a provider (oauth or apikey).
 * @param {string} provider - Provider ID or alias
 * @returns {import('../config/constants.js').PROVIDER_PROFILES['oauth']}
 */
export function getProviderProfile(provider) {
  const category = getProviderCategory(provider);
  return PROVIDER_PROFILES[category] ?? PROVIDER_PROFILES.apikey;
}

// ─── Per-Model Lockout Tracking ─────────────────────────────────────────────
// In-memory map: "provider:connectionId:model" → { reason, until, lockedAt }
const modelLockouts = new Map();

// Auto-cleanup expired lockouts every 15 seconds
const _cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of modelLockouts) {
    if (now > entry.until) modelLockouts.delete(key);
  }
}, 15_000);
_cleanupTimer.unref(); // Don't prevent process exit

/**
 * Lock a specific model on a specific account
 * @param {string} provider
 * @param {string} connectionId
 * @param {string} model
 * @param {string} reason - from RateLimitReason
 * @param {number} cooldownMs
 */
export function lockModel(provider, connectionId, model, reason, cooldownMs) {
  if (!model) return; // No model → skip model-level locking
  const key = `${provider}:${connectionId}:${model}`;
  modelLockouts.set(key, {
    reason,
    until: Date.now() + cooldownMs,
    lockedAt: Date.now(),
  });
}

/**
 * Check if a specific model on a specific account is locked
 * @returns {boolean}
 */
export function isModelLocked(provider, connectionId, model) {
  if (!model) return false;
  const key = `${provider}:${connectionId}:${model}`;
  const entry = modelLockouts.get(key);
  if (!entry) return false;
  if (Date.now() > entry.until) {
    modelLockouts.delete(key);
    return false;
  }
  return true;
}

/**
 * Get model lockout info (for debugging/dashboard)
 */
export function getModelLockoutInfo(provider, connectionId, model) {
  if (!model) return null;
  const key = `${provider}:${connectionId}:${model}`;
  const entry = modelLockouts.get(key);
  if (!entry || Date.now() > entry.until) return null;
  return {
    reason: entry.reason,
    remainingMs: entry.until - Date.now(),
    lockedAt: new Date(entry.lockedAt).toISOString(),
  };
}

/**
 * Get all active model lockouts (for dashboard)
 */
export function getAllModelLockouts() {
  const now = Date.now();
  const active = [];
  for (const [key, entry] of modelLockouts) {
    if (now <= entry.until) {
      const [provider, connectionId, model] = key.split(":");
      active.push({
        provider,
        connectionId,
        model,
        reason: entry.reason,
        remainingMs: entry.until - now,
      });
    }
  }
  return active;
}

// ─── Retry-After Parsing ────────────────────────────────────────────────────

/**
 * Parse retry-after information from JSON error response bodies.
 * Providers embed retry info in different formats.
 *
 * @param {string|object} responseBody - Raw response body or parsed JSON
 * @returns {{ retryAfterMs: number|null, reason: string }}
 */
export function parseRetryAfterFromBody(responseBody) {
  let body;
  try {
    body = typeof responseBody === "string" ? JSON.parse(responseBody) : responseBody;
  } catch {
    return { retryAfterMs: null, reason: RateLimitReason.UNKNOWN };
  }

  if (!body) return { retryAfterMs: null, reason: RateLimitReason.UNKNOWN };

  // Gemini: { error: { details: [{ retryDelay: "33s" }] } }
  const details = body.error?.details || body.details || [];
  for (const detail of Array.isArray(details) ? details : []) {
    if (detail.retryDelay) {
      return {
        retryAfterMs: parseDelayString(detail.retryDelay),
        reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
      };
    }
  }

  // OpenAI: "Please retry after 20s" in message
  const msg = body.error?.message || body.message || "";
  const retryMatch = msg.match(/retry\s+after\s+(\d+)\s*s/i);
  if (retryMatch) {
    return {
      retryAfterMs: parseInt(retryMatch[1], 10) * 1000,
      reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
    };
  }

  // Anthropic: error type classification
  const errorType = body.error?.type || body.type || "";
  if (errorType === "rate_limit_error") {
    return { retryAfterMs: null, reason: RateLimitReason.RATE_LIMIT_EXCEEDED };
  }

  // Classify by error message keywords
  const reason = classifyErrorText(msg || errorType);
  return { retryAfterMs: null, reason };
}

/**
 * Parse delay strings like "33s", "2m", "1h", "1500ms"
 */
function parseDelayString(value) {
  if (!value) return null;
  const str = String(value).trim();
  const msMatch = str.match(/^(\d+)\s*ms$/i);
  if (msMatch) return parseInt(msMatch[1], 10);
  const secMatch = str.match(/^(\d+)\s*s$/i);
  if (secMatch) return parseInt(secMatch[1], 10) * 1000;
  const minMatch = str.match(/^(\d+)\s*m$/i);
  if (minMatch) return parseInt(minMatch[1], 10) * 60 * 1000;
  const hrMatch = str.match(/^(\d+)\s*h$/i);
  if (hrMatch) return parseInt(hrMatch[1], 10) * 3600 * 1000;
  // Bare number → seconds
  const num = parseInt(str, 10);
  return isNaN(num) ? null : num * 1000;
}

// ─── Error Classification ───────────────────────────────────────────────────

/**
 * Classify error text into RateLimitReason
 */
export function classifyErrorText(errorText) {
  if (!errorText) return RateLimitReason.UNKNOWN;
  const lower = String(errorText).toLowerCase();

  if (
    lower.includes("quota exceeded") ||
    lower.includes("quota depleted") ||
    lower.includes("billing")
  ) {
    return RateLimitReason.QUOTA_EXHAUSTED;
  }
  if (
    lower.includes("rate limit") ||
    lower.includes("too many requests") ||
    lower.includes("rate_limit")
  ) {
    return RateLimitReason.RATE_LIMIT_EXCEEDED;
  }
  if (
    lower.includes("capacity") ||
    lower.includes("overloaded") ||
    lower.includes("resource exhausted")
  ) {
    return RateLimitReason.MODEL_CAPACITY;
  }
  if (
    lower.includes("unauthorized") ||
    lower.includes("invalid api key") ||
    lower.includes("authentication")
  ) {
    return RateLimitReason.AUTH_ERROR;
  }
  if (lower.includes("server error") || lower.includes("internal error")) {
    return RateLimitReason.SERVER_ERROR;
  }
  return RateLimitReason.UNKNOWN;
}

/**
 * Classify HTTP status + error text into RateLimitReason
 */
export function classifyError(status, errorText) {
  // Text classification takes priority (more specific)
  const textReason = classifyErrorText(errorText);
  if (textReason !== RateLimitReason.UNKNOWN) return textReason;

  // Fall back to status code
  if (status === HTTP_STATUS.UNAUTHORIZED || status === HTTP_STATUS.FORBIDDEN) {
    return RateLimitReason.AUTH_ERROR;
  }
  if (status === HTTP_STATUS.PAYMENT_REQUIRED) {
    return RateLimitReason.QUOTA_EXHAUSTED;
  }
  if (status === HTTP_STATUS.RATE_LIMITED) {
    return RateLimitReason.RATE_LIMIT_EXCEEDED;
  }
  if (status === HTTP_STATUS.SERVICE_UNAVAILABLE || status === 529) {
    return RateLimitReason.MODEL_CAPACITY;
  }
  if (status >= 500) {
    return RateLimitReason.SERVER_ERROR;
  }
  return RateLimitReason.UNKNOWN;
}

// ─── Configurable Backoff ───────────────────────────────────────────────────

/**
 * Get backoff duration from configurable steps.
 * @param {number} failureCount - Number of consecutive failures
 * @returns {number} Duration in ms
 */
export function getBackoffDuration(failureCount) {
  const idx = Math.min(failureCount, BACKOFF_STEPS_MS.length - 1);
  return BACKOFF_STEPS_MS[idx];
}

// ─── Original API (Backward Compatible) ────────────────────────────────────

/**
 * Calculate exponential backoff cooldown for rate limits (429)
 * Level 0: 1s, Level 1: 2s, Level 2: 4s... → max 2 min
 * @param {number} backoffLevel - Current backoff level
 * @returns {number} Cooldown in milliseconds
 */
export function getQuotaCooldown(backoffLevel = 0) {
  const cooldown = BACKOFF_CONFIG.base * Math.pow(2, backoffLevel);
  return Math.min(cooldown, BACKOFF_CONFIG.max);
}

/**
 * Check if error should trigger account fallback (switch to next account)
 * @param {number} status - HTTP status code
 * @param {string} errorText - Error message text
 * @param {number} backoffLevel - Current backoff level for exponential backoff
 * @param {string} [model] - Optional model name for model-level lockout
 * @param {string} [provider] - Provider ID for profile-aware cooldowns
 * @returns {{ shouldFallback: boolean, cooldownMs: number, newBackoffLevel?: number, reason?: string }}
 */
export function checkFallbackError(
  status,
  errorText,
  backoffLevel = 0,
  model = null,
  provider = null
) {
  // Check error message FIRST - specific patterns take priority over status codes
  if (errorText) {
    const errorStr = typeof errorText === "string" ? errorText : JSON.stringify(errorText);
    const lowerError = errorStr.toLowerCase();

    if (lowerError.includes("no credentials")) {
      return {
        shouldFallback: true,
        cooldownMs: COOLDOWN_MS.notFound,
        reason: RateLimitReason.AUTH_ERROR,
      };
    }

    if (lowerError.includes("request not allowed")) {
      return {
        shouldFallback: true,
        cooldownMs: COOLDOWN_MS.requestNotAllowed,
        reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
      };
    }

    // Rate limit keywords - exponential backoff
    if (
      lowerError.includes("rate limit") ||
      lowerError.includes("too many requests") ||
      lowerError.includes("quota exceeded") ||
      lowerError.includes("capacity") ||
      lowerError.includes("overloaded")
    ) {
      const newLevel = Math.min(backoffLevel + 1, BACKOFF_CONFIG.maxLevel);
      const reason = classifyErrorText(errorStr);
      return {
        shouldFallback: true,
        cooldownMs: getQuotaCooldown(backoffLevel),
        newBackoffLevel: newLevel,
        reason,
      };
    }
  }

  if (status === HTTP_STATUS.UNAUTHORIZED) {
    return {
      shouldFallback: true,
      cooldownMs: COOLDOWN_MS.unauthorized,
      reason: RateLimitReason.AUTH_ERROR,
    };
  }

  if (status === HTTP_STATUS.PAYMENT_REQUIRED || status === HTTP_STATUS.FORBIDDEN) {
    return {
      shouldFallback: true,
      cooldownMs: COOLDOWN_MS.paymentRequired,
      reason: RateLimitReason.QUOTA_EXHAUSTED,
    };
  }

  if (status === HTTP_STATUS.NOT_FOUND) {
    return {
      shouldFallback: true,
      cooldownMs: COOLDOWN_MS.notFound,
      reason: RateLimitReason.UNKNOWN,
    };
  }

  // 429 - Rate limit with exponential backoff
  if (status === HTTP_STATUS.RATE_LIMITED) {
    const newLevel = Math.min(backoffLevel + 1, BACKOFF_CONFIG.maxLevel);
    return {
      shouldFallback: true,
      cooldownMs: getQuotaCooldown(backoffLevel),
      newBackoffLevel: newLevel,
      reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
    };
  }

  // Transient / server errors — exponential backoff with provider profile
  const transientStatuses = [
    HTTP_STATUS.NOT_ACCEPTABLE,
    HTTP_STATUS.REQUEST_TIMEOUT,
    HTTP_STATUS.SERVER_ERROR,
    HTTP_STATUS.BAD_GATEWAY,
    HTTP_STATUS.SERVICE_UNAVAILABLE,
    HTTP_STATUS.GATEWAY_TIMEOUT,
  ];
  if (transientStatuses.includes(status)) {
    const profile = provider ? getProviderProfile(provider) : null;
    const baseCooldown = profile?.transientCooldown ?? COOLDOWN_MS.transientInitial;
    const maxLevel = profile?.maxBackoffLevel ?? BACKOFF_CONFIG.maxLevel;
    const cooldownMs = Math.min(baseCooldown * Math.pow(2, backoffLevel), COOLDOWN_MS.transientMax);
    const newLevel = Math.min(backoffLevel + 1, maxLevel);
    return {
      shouldFallback: true,
      cooldownMs,
      newBackoffLevel: newLevel,
      reason: RateLimitReason.SERVER_ERROR,
    };
  }

  // 400 Bad Request - don't fallback (same request will fail on all accounts)
  if (status === HTTP_STATUS.BAD_REQUEST) {
    return { shouldFallback: false, cooldownMs: 0, reason: RateLimitReason.UNKNOWN };
  }

  // All other errors - fallback with transient cooldown
  return {
    shouldFallback: true,
    cooldownMs: COOLDOWN_MS.transient,
    reason: RateLimitReason.UNKNOWN,
  };
}

// ─── Account State Management ───────────────────────────────────────────────

/**
 * Check if account is currently unavailable (cooldown not expired)
 */
export function isAccountUnavailable(unavailableUntil) {
  if (!unavailableUntil) return false;
  return new Date(unavailableUntil).getTime() > Date.now();
}

/**
 * Calculate unavailable until timestamp
 */
export function getUnavailableUntil(cooldownMs) {
  return new Date(Date.now() + cooldownMs).toISOString();
}

/**
 * Get the earliest rateLimitedUntil from a list of accounts
 */
export function getEarliestRateLimitedUntil(accounts) {
  let earliest = null;
  const now = Date.now();
  for (const acc of accounts) {
    if (!acc.rateLimitedUntil) continue;
    const until = new Date(acc.rateLimitedUntil).getTime();
    if (until <= now) continue;
    if (!earliest || until < earliest) earliest = until;
  }
  if (!earliest) return null;
  return new Date(earliest).toISOString();
}

/**
 * Format rateLimitedUntil to human-readable "reset after Xm Ys"
 */
export function formatRetryAfter(rateLimitedUntil) {
  if (!rateLimitedUntil) return "";
  const diffMs = new Date(rateLimitedUntil).getTime() - Date.now();
  if (diffMs <= 0) return "reset after 0s";
  const totalSec = Math.ceil(diffMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);
  return `reset after ${parts.join(" ")}`;
}

/**
 * Filter available accounts (not in cooldown)
 */
export function filterAvailableAccounts(accounts, excludeId = null) {
  const now = Date.now();
  return accounts.filter((acc) => {
    if (excludeId && acc.id === excludeId) return false;
    if (acc.rateLimitedUntil) {
      const until = new Date(acc.rateLimitedUntil).getTime();
      if (until > now) return false;
    }
    return true;
  });
}

/**
 * Reset account state when request succeeds
 */
export function resetAccountState(account) {
  if (!account) return account;
  return {
    ...account,
    rateLimitedUntil: null,
    backoffLevel: 0,
    lastError: null,
    status: "active",
  };
}

/**
 * Apply error state to account
 */
export function applyErrorState(account, status, errorText, provider = null) {
  if (!account) return account;

  const backoffLevel = account.backoffLevel || 0;
  const { cooldownMs, newBackoffLevel, reason } = checkFallbackError(
    status,
    errorText,
    backoffLevel,
    null,
    provider
  );

  return {
    ...account,
    rateLimitedUntil: cooldownMs > 0 ? getUnavailableUntil(cooldownMs) : null,
    backoffLevel: newBackoffLevel ?? backoffLevel,
    lastError: { status, message: errorText, timestamp: new Date().toISOString(), reason },
    status: "error",
  };
}

/**
 * Get account health score (0-100) for P2C selection (Phase 9)
 * @param {object} account
 * @returns {number} score 0 = unhealthy, 100 = perfectly healthy
 */
export function getAccountHealth(account, model?: any) {
  if (!account) return 0;
  let score = 100;
  score -= (account.backoffLevel || 0) * 10;
  if (account.lastError) score -= 20;
  if (account.rateLimitedUntil && isAccountUnavailable(account.rateLimitedUntil)) score -= 30;
  return Math.max(0, score);
}
