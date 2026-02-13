import { COOLDOWN_MS, BACKOFF_CONFIG, HTTP_STATUS } from "../config/constants.js";

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
 * @returns {{ shouldFallback: boolean, cooldownMs: number, newBackoffLevel?: number }}
 */
export function checkFallbackError(status, errorText, backoffLevel = 0) {
  // Check error message FIRST - specific patterns take priority over status codes
  if (errorText) {
    const errorStr = typeof errorText === "string" ? errorText : JSON.stringify(errorText);
    const lowerError = errorStr.toLowerCase();

    if (lowerError.includes("no credentials")) {
      return { shouldFallback: true, cooldownMs: COOLDOWN_MS.notFound };
    }

    if (lowerError.includes("request not allowed")) {
      return { shouldFallback: true, cooldownMs: COOLDOWN_MS.requestNotAllowed };
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
      return {
        shouldFallback: true,
        cooldownMs: getQuotaCooldown(backoffLevel),
        newBackoffLevel: newLevel,
      };
    }
  }

  if (status === HTTP_STATUS.UNAUTHORIZED) {
    return { shouldFallback: true, cooldownMs: COOLDOWN_MS.unauthorized };
  }

  if (status === HTTP_STATUS.PAYMENT_REQUIRED || status === HTTP_STATUS.FORBIDDEN) {
    return { shouldFallback: true, cooldownMs: COOLDOWN_MS.paymentRequired };
  }

  if (status === HTTP_STATUS.NOT_FOUND) {
    return { shouldFallback: true, cooldownMs: COOLDOWN_MS.notFound };
  }

  // 429 - Rate limit with exponential backoff
  if (status === HTTP_STATUS.RATE_LIMITED) {
    const newLevel = Math.min(backoffLevel + 1, BACKOFF_CONFIG.maxLevel);
    return {
      shouldFallback: true,
      cooldownMs: getQuotaCooldown(backoffLevel),
      newBackoffLevel: newLevel,
    };
  }

  // Transient errors
  const transientStatuses = [
    HTTP_STATUS.NOT_ACCEPTABLE,
    HTTP_STATUS.REQUEST_TIMEOUT,
    HTTP_STATUS.SERVER_ERROR,
    HTTP_STATUS.BAD_GATEWAY,
    HTTP_STATUS.SERVICE_UNAVAILABLE,
    HTTP_STATUS.GATEWAY_TIMEOUT,
  ];
  if (transientStatuses.includes(status)) {
    return { shouldFallback: true, cooldownMs: COOLDOWN_MS.transient };
  }

  // 400 Bad Request - don't fallback (same request will fail on all accounts)
  if (status === HTTP_STATUS.BAD_REQUEST) {
    return { shouldFallback: false, cooldownMs: 0 };
  }

  // All other errors - fallback with transient cooldown
  return { shouldFallback: true, cooldownMs: COOLDOWN_MS.transient };
}

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
 * @param {Array} accounts - Array of account objects with rateLimitedUntil
 * @returns {string|null} Earliest rateLimitedUntil ISO string, or null
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
 * @param {string} rateLimitedUntil - ISO timestamp
 * @returns {string} e.g. "reset after 2m 30s"
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
 * Clears cooldown and resets backoff level to 0
 * @param {object} account - Account object
 * @returns {object} Updated account with reset state
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
 * @param {object} account - Account object
 * @param {number} status - HTTP status code
 * @param {string} errorText - Error message
 * @returns {object} Updated account with error state
 */
export function applyErrorState(account, status, errorText) {
  if (!account) return account;

  const backoffLevel = account.backoffLevel || 0;
  const { cooldownMs, newBackoffLevel } = checkFallbackError(status, errorText, backoffLevel);

  return {
    ...account,
    rateLimitedUntil: cooldownMs > 0 ? getUnavailableUntil(cooldownMs) : null,
    backoffLevel: newBackoffLevel ?? backoffLevel,
    lastError: { status, message: errorText, timestamp: new Date().toISOString() },
    status: "error",
  };
}
