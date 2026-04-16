import {
  COOLDOWN_MS,
  BACKOFF_CONFIG,
  BACKOFF_STEPS_MS,
  RateLimitReason,
  HTTP_STATUS,
  PROVIDER_PROFILES,
} from "../config/constants.ts";
import { getPassthroughProviders, getProviderCategory } from "../config/providerRegistry.ts";

type ProviderProfile = (typeof PROVIDER_PROFILES)["oauth"];
type JsonRecord = Record<string, unknown>;
type ModelLockoutEntry = {
  reason: string;
  until: number;
  lockedAt: number;
  failureCount: number;
  lastFailureAt: number;
  resetAfterMs: number;
};
type ModelFailureState = {
  failureCount: number;
  lastFailureAt: number;
  resetAfterMs: number;
};

// T06 (sub2api PR #1037): Signals that indicate permanent account deactivation.
// When a 401 body contains these strings, the account is permanently dead
// and should NOT be retried after token refresh.
export const ACCOUNT_DEACTIVATED_SIGNALS = [
  "account_deactivated",
  "account has been deactivated",
  "account has been disabled",
  "your account has been suspended",
  "this account is deactivated",
  // AG (Antigravity/Google Cloud Code) permanent ban signals
  "verify your account to continue",
  "this service has been disabled in this account for violation",
  "this service has been disabled in this account",
];

// T10 (sub2api PR #1169): Signals that indicate billing credits are exhausted.
// Distinct from rate-limit 429 — the account won't recover until credits are added.
export const CREDITS_EXHAUSTED_SIGNALS = [
  "insufficient_quota",
  "billing_hard_limit_reached",
  "exceeded your current quota",
  "credit_balance_too_low",
  "your credit balance is too low",
  "credits exhausted",
  "out of credits",
  "payment required",
];

// T11: Signals that indicate OAuth token is invalid/expired (not permanent deactivation)
export const OAUTH_INVALID_TOKEN_SIGNALS = [
  "invalid authentication credentials",
  "oauth 2",
  "login cookie",
  "valid authentication credential",
  "invalid credentials",
];

/**
 * T06: Returns true if response body indicates the account is permanently deactivated.
 */
export function isAccountDeactivated(errorText: string): boolean {
  const lower = String(errorText || "").toLowerCase();
  return ACCOUNT_DEACTIVATED_SIGNALS.some((sig) => lower.includes(sig));
}

/**
 * T10: Returns true if response body indicates credits/quota are permanently exhausted.
 */
export function isCreditsExhausted(errorText: string): boolean {
  const lower = String(errorText || "").toLowerCase();
  return CREDITS_EXHAUSTED_SIGNALS.some((sig) => lower.includes(sig));
}

/**
 * T11: Returns true if response body indicates OAuth token is invalid/expired.
 * This is different from permanent account deactivation - token refresh can recover.
 */
export function isOAuthInvalidToken(errorText: string): boolean {
  const lower = String(errorText || "").toLowerCase();
  return OAUTH_INVALID_TOKEN_SIGNALS.some((sig) => lower.includes(sig));
}

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

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function isCompatibleProvider(provider: string | null | undefined): boolean {
  return (
    typeof provider === "string" &&
    (provider.startsWith("openai-compatible-") || provider.startsWith("anthropic-compatible-"))
  );
}

function mergeProviderProfile(fallback: ProviderProfile, overrides: unknown): ProviderProfile {
  const record = asRecord(overrides);
  return {
    transientCooldown:
      typeof record.transientCooldown === "number"
        ? record.transientCooldown
        : fallback.transientCooldown,
    rateLimitCooldown:
      typeof record.rateLimitCooldown === "number"
        ? record.rateLimitCooldown
        : fallback.rateLimitCooldown,
    maxBackoffLevel:
      typeof record.maxBackoffLevel === "number"
        ? record.maxBackoffLevel
        : fallback.maxBackoffLevel,
    circuitBreakerThreshold:
      typeof record.circuitBreakerThreshold === "number"
        ? record.circuitBreakerThreshold
        : fallback.circuitBreakerThreshold,
    circuitBreakerReset:
      typeof record.circuitBreakerReset === "number"
        ? record.circuitBreakerReset
        : fallback.circuitBreakerReset,
  };
}

export async function getRuntimeProviderProfile(provider: string | null | undefined) {
  const fallback = getProviderProfile(provider);
  try {
    const { getCachedSettings } = await import("@/lib/db/readCache");
    const settings = await getCachedSettings();
    const profiles = asRecord(settings.providerProfiles);
    const category = getProviderCategory(provider);
    return mergeProviderProfile(fallback, profiles[category]);
  } catch {
    return fallback;
  }
}

// ─── Per-Model Lockout Tracking ─────────────────────────────────────────────
// In-memory map: "provider:connectionId:model" → { reason, until, lockedAt }
const modelLockouts = new Map<string, ModelLockoutEntry>();
const modelFailureState = new Map<string, ModelFailureState>();

function getModelLockKey(provider: string, connectionId: string, model: string) {
  return `${provider}:${connectionId}:${model}`;
}

function getFailureWindowMs(profile: ProviderProfile | null = null, fallbackMs = 30 * 60 * 1000) {
  const configured = profile?.circuitBreakerReset;
  return typeof configured === "number" && configured > 0 ? configured : fallbackMs;
}

function cleanupModelLockKey(key: string, now = Date.now()) {
  const entry = modelLockouts.get(key);
  if (entry && now > entry.until) {
    modelLockouts.delete(key);
  }

  const failure = modelFailureState.get(key);
  if (!failure) return;
  if (now - failure.lastFailureAt <= failure.resetAfterMs) return;
  if (modelLockouts.has(key)) return;
  modelFailureState.delete(key);
}

function getModelLockBaseCooldown(
  status: number,
  fallbackCooldownMs: number,
  profile: ProviderProfile | null = null
) {
  if (status === HTTP_STATUS.RATE_LIMITED) {
    if (typeof profile?.rateLimitCooldown === "number" && profile.rateLimitCooldown > 0) {
      return profile.rateLimitCooldown;
    }
    if (Number.isFinite(fallbackCooldownMs) && fallbackCooldownMs > 0) {
      return fallbackCooldownMs;
    }
    return getQuotaCooldown(0);
  }

  if (typeof profile?.transientCooldown === "number" && profile.transientCooldown > 0) {
    return profile.transientCooldown;
  }
  if (Number.isFinite(fallbackCooldownMs) && fallbackCooldownMs > 0) {
    return fallbackCooldownMs;
  }
  return COOLDOWN_MS.transientInitial;
}

function getScaledCooldown(
  baseCooldownMs: number,
  failureCount: number,
  maxBackoffLevel = BACKOFF_CONFIG.maxLevel
) {
  const safeBase = Number.isFinite(baseCooldownMs) && baseCooldownMs > 0 ? baseCooldownMs : 1000;
  const exponent = Math.min(Math.max(0, failureCount - 1), Math.max(0, maxBackoffLevel));
  return safeBase * Math.pow(2, exponent);
}

// Auto-cleanup expired lockouts every 15 seconds (lazy init for Cloudflare Workers compatibility)
let _cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanupTimer() {
  if (_cleanupTimer) return;
  try {
    _cleanupTimer = setInterval(() => {
      const now = Date.now();
      for (const key of modelLockouts.keys()) cleanupModelLockKey(key, now);
      for (const key of modelFailureState.keys()) cleanupModelLockKey(key, now);
    }, 15_000);
    if (typeof _cleanupTimer === "object" && "unref" in _cleanupTimer) {
      (_cleanupTimer as { unref?: () => void }).unref?.(); // Don't prevent process exit (Node.js only)
    }
  } catch {
    // Cloudflare Workers may not support setInterval outside handlers — skip cleanup timer
  }
}

/**
 * Lock a specific model on a specific account
 * @param {string} provider
 * @param {string} connectionId
 * @param {string} model
 * @param {string} reason - from RateLimitReason
 * @param {number} cooldownMs
 */
export function lockModel(
  provider,
  connectionId,
  model,
  reason,
  cooldownMs,
  metadata: Partial<ModelLockoutEntry> = {}
) {
  if (!model) return; // No model → skip model-level locking
  ensureCleanupTimer();
  const key = getModelLockKey(provider, connectionId, model);
  cleanupModelLockKey(key);
  const newUntil = Date.now() + cooldownMs;
  // Preserve the longer cooldown if an existing lock has more time remaining.
  // Safe without a mutex: no await between get/set, so this runs atomically
  // within Node.js's single-threaded event loop.
  const existing = modelLockouts.get(key);
  if (existing && existing.until > newUntil) {
    if (metadata.failureCount && metadata.failureCount > existing.failureCount) {
      existing.failureCount = metadata.failureCount;
      existing.lastFailureAt = metadata.lastFailureAt ?? existing.lastFailureAt;
      existing.resetAfterMs = metadata.resetAfterMs ?? existing.resetAfterMs;
      modelLockouts.set(key, existing);
    }
    return;
  }
  const now = Date.now();
  modelLockouts.set(key, {
    reason,
    until: newUntil,
    lockedAt: now,
    failureCount: metadata.failureCount ?? existing?.failureCount ?? 1,
    lastFailureAt: metadata.lastFailureAt ?? now,
    resetAfterMs: metadata.resetAfterMs ?? existing?.resetAfterMs ?? 0,
  });
}

export function recordModelLockoutFailure(
  provider: string,
  connectionId: string,
  model: string,
  reason: string,
  status: number,
  fallbackCooldownMs: number,
  profile: ProviderProfile | null = null
) {
  ensureCleanupTimer();
  const key = getModelLockKey(provider, connectionId, model);
  const now = Date.now();
  cleanupModelLockKey(key, now);

  const resetAfterMs = getFailureWindowMs(profile);
  const previous = modelFailureState.get(key);
  const withinWindow = previous && now - previous.lastFailureAt <= previous.resetAfterMs;
  const failureCount = withinWindow ? previous.failureCount + 1 : 1;
  modelFailureState.set(key, {
    failureCount,
    lastFailureAt: now,
    resetAfterMs,
  });

  const baseCooldownMs = getModelLockBaseCooldown(status, fallbackCooldownMs, profile);
  const cooldownMs = getScaledCooldown(
    baseCooldownMs,
    failureCount,
    profile?.maxBackoffLevel ?? BACKOFF_CONFIG.maxLevel
  );

  lockModel(provider, connectionId, model, reason, cooldownMs, {
    failureCount,
    lastFailureAt: now,
    resetAfterMs,
  });

  return {
    cooldownMs,
    failureCount,
    resetAfterMs,
  };
}

export function clearModelLock(provider, connectionId, model) {
  if (!model) return false;
  const key = getModelLockKey(provider, connectionId, model);
  const hadLock = modelLockouts.delete(key);
  const hadFailureState = modelFailureState.delete(key);
  return hadLock || hadFailureState;
}

/**
 * Whether a provider should use per-model lockouts instead of connection-wide cooldowns.
 * Compatible and passthrough providers multiplex multiple upstream models behind one
 * connection, so transient 404/429 responses should stay model-scoped instead of
 * poisoning the whole connection.
 */
export function hasPerModelQuota(
  provider: string | null | undefined,
  _model: string | null | undefined = null
): boolean {
  if (!provider) return false;
  if (provider === "gemini") return true;
  if (getPassthroughProviders().has(provider)) return true;
  if (isCompatibleProvider(provider)) return true;
  return false;
}

/**
 * Lock a model (not connection) for a provider with per-model quotas.
 * No-ops for providers that don't use per-model lockouts.
 */
export function lockModelIfPerModelQuota(
  provider: string,
  connectionId: string,
  model: string | null,
  reason: string,
  cooldownMs: number
): boolean {
  if (!hasPerModelQuota(provider, model) || !model) return false;
  lockModel(provider, connectionId, model, reason, cooldownMs);
  return true;
}

export function shouldMarkAccountExhaustedFrom429(
  provider: string | null | undefined,
  model: string | null | undefined = null
): boolean {
  return !hasPerModelQuota(provider, model);
}

/**
 * Check if a specific model on a specific account is locked
 * @returns {boolean}
 */
export function isModelLocked(provider, connectionId, model) {
  if (!model) return false;
  const key = getModelLockKey(provider, connectionId, model);
  cleanupModelLockKey(key);
  const entry = modelLockouts.get(key);
  return Boolean(entry);
}

/**
 * Get model lockout info (for debugging/dashboard)
 */
export function getModelLockoutInfo(provider, connectionId, model) {
  if (!model) return null;
  const key = getModelLockKey(provider, connectionId, model);
  cleanupModelLockKey(key);
  const entry = modelLockouts.get(key);
  if (!entry) return null;
  return {
    reason: entry.reason,
    remainingMs: entry.until - Date.now(),
    lockedAt: new Date(entry.lockedAt).toISOString(),
    failureCount: entry.failureCount,
  };
}

/**
 * Get all active model lockouts (for dashboard)
 */
export function getAllModelLockouts() {
  const now = Date.now();
  const active = [];
  for (const key of modelLockouts.keys()) {
    cleanupModelLockKey(key, now);
  }
  for (const [key, entry] of modelLockouts) {
    const [provider, connectionId, model] = key.split(":");
    active.push({
      provider,
      connectionId,
      model,
      reason: entry.reason,
      remainingMs: entry.until - now,
      failureCount: entry.failureCount,
    });
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

/**
 * T07: Parse retry time from error text body with combined "XhYmZs" format.
 * Examples: "Your quota will reset after 2h30m14s", "reset after 45m", "reset after 30s"
 * Returns milliseconds or null if not parseable.
 *
 * @param {string} errorText - Error message text from response body
 * @returns {number|null} Retry duration in milliseconds
 */
export function parseRetryFromErrorText(errorText) {
  if (!errorText || typeof errorText !== "string") return null;

  const match = errorText.match(/reset after (\d+h)?(\d+m)?(\d+s)?/i);
  if (!match) {
    // Also try the variant without "reset after": "will reset after XhYmZs"
    const altMatch = errorText.match(/will reset after (\d+h)?(\d+m)?(\d+s)?/i);
    if (!altMatch) return null;
    return computeDurationMs(altMatch);
  }

  return computeDurationMs(match);
}

/**
 * Compute total milliseconds from regex match groups (Xh)(Ym)(Zs)
 */
function computeDurationMs(match) {
  let totalMs = 0;
  if (match[1]) totalMs += parseInt(match[1], 10) * 3600 * 1000; // hours
  if (match[2]) totalMs += parseInt(match[2], 10) * 60 * 1000; // minutes
  if (match[3]) totalMs += parseInt(match[3], 10) * 1000; // seconds
  return totalMs > 0 ? totalMs : null;
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
    lower.includes("quota will reset") ||
    lower.includes("your quota will reset") ||
    lower.includes("billing")
  ) {
    return RateLimitReason.QUOTA_EXHAUSTED;
  }
  // T10: credits_exhausted signals
  if (isCreditsExhausted(errorText)) {
    return RateLimitReason.QUOTA_EXHAUSTED;
  }
  // T06: account_deactivated signals
  if (isAccountDeactivated(errorText)) {
    return RateLimitReason.AUTH_ERROR;
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

function getRateLimitCooldown(backoffLevel = 0, profile: ProviderProfile | null = null) {
  const maxLevel = profile?.maxBackoffLevel ?? BACKOFF_CONFIG.maxLevel;
  const cappedLevel = Math.min(Math.max(0, backoffLevel), maxLevel);
  const configuredBase = profile?.rateLimitCooldown;
  if (typeof configuredBase === "number" && configuredBase > 0) {
    return configuredBase * Math.pow(2, cappedLevel);
  }
  return getQuotaCooldown(cappedLevel);
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
  provider = null,
  headers = null,
  profileOverride: ProviderProfile | null = null
) {
  const errorStr = (errorText || "").toString();
  const profile = profileOverride ?? (provider ? getProviderProfile(provider) : null);

  function parseResetFromHeaders(headers, errorStr = "") {
    if (!headers) return null;

    // Retry-After header
    const retryAfter =
      typeof headers.get === "function"
        ? headers.get("retry-after")
        : headers["retry-after"] || headers["Retry-After"];

    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      if (!isNaN(seconds) && String(seconds) === String(retryAfter).trim()) {
        return Date.now() + seconds * 1000;
      }
      const date = new Date(retryAfter);
      if (!isNaN(date.getTime())) return date.getTime();
    }

    // X-RateLimit-Reset
    const rlReset =
      typeof headers.get === "function"
        ? headers.get("x-ratelimit-reset")
        : headers["x-ratelimit-reset"] || headers["X-RateLimit-Reset"];

    if (rlReset) {
      const ts = parseInt(rlReset, 10);
      if (!isNaN(ts)) {
        return ts > 10000000000 ? ts : ts * 1000;
      }
    }
    return null;
  }
  // Check error message FIRST - specific patterns take priority over status codes
  if (errorText) {
    const lowerError = errorStr.toLowerCase();

    // T06 (sub2api #1037): Permanent account deactivation — do NOT retry, mark as permanent failure
    if (isAccountDeactivated(errorStr)) {
      return {
        shouldFallback: true,
        cooldownMs: 365 * 24 * 60 * 60 * 1000, // 1 year = effectively permanent
        reason: RateLimitReason.AUTH_ERROR,
        permanent: true,
      };
    }

    // T10 (sub2api #1169): Credits/quota exhausted — long cooldown, distinct from rate limit
    if (isCreditsExhausted(errorStr)) {
      return {
        shouldFallback: true,
        cooldownMs: COOLDOWN_MS.paymentRequired ?? 3600 * 1000, // 1h cooldown
        reason: RateLimitReason.QUOTA_EXHAUSTED,
        creditsExhausted: true,
      };
    }

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
      lowerError.includes("quota will reset") ||
      lowerError.includes("exhausted your capacity") ||
      lowerError.includes("quota exhausted") ||
      lowerError.includes("capacity") ||
      lowerError.includes("overloaded")
    ) {
      const resetTime = parseResetFromHeaders(headers);
      if (resetTime) {
        const waitMs = resetTime - Date.now();
        if (waitMs > 60_000) {
          return {
            shouldFallback: true,
            cooldownMs: waitMs,
            newBackoffLevel: 0,
            reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
          };
        }
      }
      const retryFromBody = parseRetryFromErrorText(errorStr);
      if (retryFromBody && retryFromBody > 60_000) {
        return {
          shouldFallback: true,
          cooldownMs: retryFromBody,
          newBackoffLevel: 0,
          reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
        };
      }
      const newLevel = Math.min(
        backoffLevel + 1,
        profile?.maxBackoffLevel ?? BACKOFF_CONFIG.maxLevel
      );
      const reason = classifyErrorText(errorStr);
      return {
        shouldFallback: true,
        cooldownMs: getRateLimitCooldown(backoffLevel, profile),
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
    const resetTime = parseResetFromHeaders(headers);
    if (resetTime) {
      const waitMs = resetTime - Date.now();
      if (waitMs > 60_000) {
        return {
          shouldFallback: true,
          cooldownMs: waitMs,
          newBackoffLevel: 0,
          reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
        };
      }
    }

    const newLevel = Math.min(
      backoffLevel + 1,
      profile?.maxBackoffLevel ?? BACKOFF_CONFIG.maxLevel
    );
    return {
      shouldFallback: true,
      cooldownMs: getRateLimitCooldown(backoffLevel, profile),
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
    const resetTime = parseResetFromHeaders(headers, errorStr);
    if (resetTime) {
      const waitMs = resetTime - Date.now();
      if (waitMs > 60_000) {
        return {
          shouldFallback: true,
          cooldownMs: waitMs,
          newBackoffLevel: 0,
          reason: RateLimitReason.SERVER_ERROR,
        };
      }
    }

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
export function getAccountHealth(account, model?: unknown) {
  if (!account) return 0;
  let score = 100;
  score -= (account.backoffLevel || 0) * 10;
  if (account.lastError) score -= 20;
  if (account.rateLimitedUntil && isAccountUnavailable(account.rateLimitedUntil)) score -= 30;
  return Math.max(0, score);
}
