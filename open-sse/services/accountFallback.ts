import {
  BACKOFF_STEPS_MS,
  PROVIDER_PROFILES,
  RateLimitReason,
  HTTP_STATUS,
} from "../config/constants.ts";
import {
  BACKOFF_CONFIG,
  COOLDOWN_MS,
  calculateBackoffCooldown,
  findMatchingErrorRule,
  matchErrorRuleByText,
  matchErrorRuleByStatus,
} from "../config/errorConfig.ts";
import { getPassthroughProviders, getProviderCategory } from "../config/providerRegistry.ts";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  resolveResilienceSettings,
} from "../../src/lib/resilience/settings";
import {
  getAllCircuitBreakerStatuses,
  getCircuitBreaker,
  STATE,
} from "../../src/shared/utils/circuitBreaker";

type ProviderProfile = {
  baseCooldownMs: number;
  useUpstreamRetryHints: boolean;
  maxBackoffSteps: number;
  failureThreshold: number;
  resetTimeoutMs: number;
  transientCooldown: number;
  rateLimitCooldown: number;
  maxBackoffLevel: number;
  circuitBreakerThreshold: number;
  circuitBreakerReset: number;
  // Provider-level circuit breaker fields
  providerFailureThreshold: number;
  providerFailureWindowMs: number;
  providerCooldownMs: number;
};
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

// Provider-level failure tracking for circuit breaker behavior
// Error codes that count toward provider-level failure threshold
const PROVIDER_FAILURE_ERROR_CODES = new Set([408, 429, 500, 502, 503, 504]);

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

// Context overflow patterns — the prompt exceeds the model's maximum context length.
// Different providers phrase this differently. Used to decide whether a 400 error
// should trigger combo fallback (a different model may have a larger context window).
const CONTEXT_OVERFLOW_PATTERNS = [
  /\binput is too long\b/i,
  /\binput too long\b/i,
  /\bcontext.*(too long|exceeded|overflow|limit)/i,
  /\btoo many tokens\b/i,
  /\bprompt is too long\b/i,
  /\bcontext window/i,
  /\bmaximum context/i,
  /\bmax.*token/i,
  /\btoken limit/i,
  /\brequest too large\b/i,
];

// Malformed request patterns — the model rejected the message format but a different
// provider/model in the combo may accept it.
const MALFORMED_REQUEST_PATTERNS = [
  /\bimproperly formed request\b/i,
  /\binvalid.*message.*format/i,
  /\bmessages must alternate\b/i,
  /\bempty (message|content)\b/i,
  // Tool call function name errors
  /\bfunction'?s? name (?:can't|can not|is|has) (?:blank|empty|missing)/i,
  /function.*name.*(?:blank|empty|missing)/i,
  /tool_call.*name.*(?:blank|empty|missing)/i,
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

// ─── Resilience Profile Helper ──────────────────────────────────────────────

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function isCompatibleProvider(provider: string | null | undefined): boolean {
  return (
    typeof provider === "string" &&
    (provider.startsWith("openai-compatible-") || provider.startsWith("anthropic-compatible-"))
  );
}

function buildProviderProfile(
  category: "oauth" | "apikey",
  settings?: Record<string, unknown> | null
) {
  const resilience = settings ? resolveResilienceSettings(settings) : DEFAULT_RESILIENCE_SETTINGS;
  const connectionCooldown = resilience.connectionCooldown[category];
  const providerBreaker = resilience.providerBreaker[category];

  return {
    baseCooldownMs: connectionCooldown.baseCooldownMs,
    useUpstreamRetryHints: connectionCooldown.useUpstreamRetryHints,
    maxBackoffSteps: connectionCooldown.maxBackoffSteps,
    failureThreshold: providerBreaker.failureThreshold,
    resetTimeoutMs: providerBreaker.resetTimeoutMs,
    transientCooldown: connectionCooldown.baseCooldownMs,
    rateLimitCooldown: connectionCooldown.useUpstreamRetryHints
      ? 0
      : connectionCooldown.baseCooldownMs,
    maxBackoffLevel: connectionCooldown.maxBackoffSteps,
    circuitBreakerThreshold: providerBreaker.failureThreshold,
    circuitBreakerReset: providerBreaker.resetTimeoutMs,
    // Provider-level circuit breaker fields (not configurable via settings, use PROVIDER_PROFILES defaults)
    providerFailureThreshold: PROVIDER_PROFILES[category].providerFailureThreshold,
    providerFailureWindowMs: PROVIDER_PROFILES[category].providerFailureWindowMs,
    providerCooldownMs: PROVIDER_PROFILES[category].providerCooldownMs,
  } satisfies ProviderProfile;
}

/**
 * Get the resilience profile for a provider (oauth or apikey).
 * @param {string} provider - Provider ID or alias
 */
export function getProviderProfile(provider) {
  const category = getProviderCategory(provider);
  return buildProviderProfile(category);
}

function shouldPreserveQuotaSignalsFor429(provider: string | null | undefined): boolean {
  if (!provider) return true;
  return getProviderCategory(provider) === "oauth";
}

export async function getRuntimeProviderProfile(provider: string | null | undefined) {
  try {
    const { getCachedSettings } = await import("@/lib/db/readCache");
    const settings = await getCachedSettings();
    const category = getProviderCategory(provider);
    return buildProviderProfile(category, settings);
  } catch {
    return getProviderProfile(provider);
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
  const configured = profile?.resetTimeoutMs;
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
  if (Number.isFinite(fallbackCooldownMs) && fallbackCooldownMs > 0) {
    return fallbackCooldownMs;
  }
  if (typeof profile?.baseCooldownMs === "number" && profile.baseCooldownMs >= 0) {
    return profile.baseCooldownMs;
  }
  return status === HTTP_STATUS.RATE_LIMITED ? getQuotaCooldown(0) : COOLDOWN_MS.transientInitial;
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
  profile: ProviderProfile | null = null,
  options: { exactCooldownMs?: number | null } = {}
) {
  ensureCleanupTimer();
  const key = getModelLockKey(provider, connectionId, model);
  const now = Date.now();
  cleanupModelLockKey(key, now);

  // For daily quota exhaustion (quota_exhausted), set cooldown until tomorrow 00:00
  // Use exactCooldownMs to bypass exponential backoff, ensuring precise lock until midnight
  if (reason === "quota_exhausted" && typeof options.exactCooldownMs !== "number") {
    options = { ...options, exactCooldownMs: getMsUntilTomorrow() };
  }

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
  const cooldownMs =
    typeof options.exactCooldownMs === "number" && options.exactCooldownMs > 0
      ? options.exactCooldownMs
      : getScaledCooldown(
          baseCooldownMs,
          failureCount,
          profile?.maxBackoffSteps ?? BACKOFF_CONFIG.maxLevel
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
 *
 * @param provider - Provider ID
 * @param _model - Model ID (reserved for future use)
 * @param connectionPassthroughModels - Optional per-connection override from providerSpecificData.
 *        When provided, takes precedence over registry/provider-level logic.
 */
export function hasPerModelQuota(
  provider: string | null | undefined,
  _model: string | null | undefined = null,
  connectionPassthroughModels?: boolean
): boolean {
  // Connection-level override takes precedence (e.g., user-configured ModelScope)
  if (typeof connectionPassthroughModels === "boolean") {
    return connectionPassthroughModels;
  }
  if (!provider) return false;
  if (provider === "gemini" || provider === "github") return true;
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
  cooldownMs: number,
  connectionPassthroughModels?: boolean
): boolean {
  if (!hasPerModelQuota(provider, model, connectionPassthroughModels) || !model) return false;
  // Skip model-level lock if the entire provider is in circuit-breaker cooldown.
  // The provider cooldown already prevents all requests, so a model lock is redundant.
  if (isProviderInCooldown(provider)) return false;
  lockModel(provider, connectionId, model, reason, cooldownMs);
  return true;
}

export function shouldMarkAccountExhaustedFrom429(
  provider: string | null | undefined,
  model: string | null | undefined = null,
  connectionPassthroughModels?: boolean
): boolean {
  return !hasPerModelQuota(provider, model, connectionPassthroughModels);
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

// ─── Provider Breaker Compatibility Wrappers ────────────────────────────────
// Legacy helpers now delegate to the shared provider circuit breaker.

function getProviderBreaker(provider: string | null | undefined) {
  if (!provider) return null;
  const profile = getProviderProfile(provider);
  return getCircuitBreaker(provider, {
    failureThreshold: profile.failureThreshold ?? profile.circuitBreakerThreshold,
    resetTimeout: profile.resetTimeoutMs ?? profile.circuitBreakerReset,
  });
}

/**
 * Check if a provider is currently blocked by the shared circuit breaker.
 */
export function isProviderInCooldown(provider: string | null | undefined): boolean {
  const breaker = getProviderBreaker(provider);
  return breaker ? !breaker.canExecute() : false;
}

/**
 * Get remaining retry-after time for a provider breaker.
 */
export function getProviderCooldownRemainingMs(provider: string | null | undefined): number | null {
  const breaker = getProviderBreaker(provider);
  if (!breaker || breaker.canExecute()) return null;
  const remaining = breaker.getRetryAfterMs();
  return remaining > 0 ? remaining : null;
}

/**
 * Record a provider failure against the shared circuit breaker.
 * Delegates to the existing CircuitBreaker utility which handles
 * failure counting, threshold detection, and state transitions.
 *
 * IMPORTANT: If the breaker is already OPEN (in cooldown), we skip
 * recording the failure to prevent resetting the cooldown timer.
 * This matches the original behavior where failures during cooldown
 * were ignored to avoid indefinite lockout.
 */
export function recordProviderFailure(
  provider: string | null | undefined,
  log?: { warn?: (...args: unknown[]) => void }
): void {
  if (!provider) return;

  const breaker = getProviderBreaker(provider);
  if (!breaker) return;

  // Skip if already in cooldown to prevent timer reset (indefinite lockout bug)
  if (!breaker.canExecute()) return;

  breaker._onFailure();

  if (!breaker.canExecute()) {
    log?.warn?.(`[ProviderFailure] ${provider}: circuit breaker opened after repeated failures`);
  }
}

/**
 * Reset the shared provider breaker.
 */
export function clearProviderFailure(provider: string | null | undefined): void {
  const breaker = getProviderBreaker(provider);
  breaker?.reset();
}

/**
 * Get all providers currently blocked by the shared breaker.
 */
export function getProvidersInCooldown(): Array<{
  provider: string;
  failureCount: number;
  cooldownRemainingMs: number | null;
  lastFailureAt: number;
}> {
  return getAllCircuitBreakerStatuses()
    .filter((status) => {
      const breaker = getProviderBreaker(status.name);
      return Boolean(breaker && !breaker.canExecute());
    })
    .map((status) => ({
      provider: status.name,
      failureCount: status.failureCount,
      cooldownRemainingMs: status.retryAfterMs || null,
      lastFailureAt: status.lastFailureTime,
    }));
}

/**
 * Check if a status code should be counted toward provider failure threshold
 */
export function isProviderFailureCode(status: number): boolean {
  return PROVIDER_FAILURE_ERROR_CODES.has(status);
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
  const configuredRule = matchErrorRuleByText(errorText);
  if (configuredRule?.reason) return configuredRule.reason;
  if (lower.includes("rate_limit")) return RateLimitReason.RATE_LIMIT_EXCEEDED;
  if (lower.includes("resource exhausted")) return RateLimitReason.MODEL_CAPACITY;
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

// ─── Daily Quota Helpers ────────────────────────────────────────────────────

/**
 * Calculate milliseconds from now until tomorrow at midnight (00:00:00).
 * Used to lock a model until the next day when daily quota is exhausted.
 * @returns {number} Milliseconds until tomorrow
 */
export function getMsUntilTomorrow(): number {
  const nowMs = Date.now();
  const now = new Date(nowMs);
  const tomorrow = new Date(nowMs);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const ms = tomorrow.getTime() - nowMs;
  // Guard against DST edge cases: if ms is negative (shouldn't happen) or
  // unreasonably large (>25h due to spring-forward), cap at 24 hours.
  return ms > 0 && ms <= 25 * 60 * 60 * 1000 ? ms : 24 * 60 * 60 * 1000;
}

/**
 * Check if error text indicates daily quota exhaustion (as opposed to rate limiting).
 * Daily quota errors typically mention "today's quota" or "try again tomorrow".
 * @param {string} errorText - Error message text
 * @returns {boolean} True if daily quota is exhausted
 */
export function isDailyQuotaExhausted(errorText: string): boolean {
  if (!errorText) return false;
  const lower = errorText.toLowerCase();
  return (
    lower.includes("today's quota") ||
    lower.includes("daily quota") ||
    lower.includes("try again tomorrow")
  );
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
  return calculateBackoffCooldown(backoffLevel);
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
  _model = null,
  provider = null,
  headers = null,
  profileOverride: ProviderProfile | null = null
) {
  const errorStr = (errorText || "").toString();
  const profile = profileOverride ?? (provider ? getProviderProfile(provider) : null);
  const maxBackoffSteps = profile?.maxBackoffSteps ?? BACKOFF_CONFIG.maxLevel;
  const retryableStatuses = new Set([
    HTTP_STATUS.REQUEST_TIMEOUT,
    HTTP_STATUS.RATE_LIMITED,
    HTTP_STATUS.SERVER_ERROR,
    HTTP_STATUS.BAD_GATEWAY,
    HTTP_STATUS.SERVICE_UNAVAILABLE,
    HTTP_STATUS.GATEWAY_TIMEOUT,
  ]);

  function parseResetFromHeaders(headers) {
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

  function getUpstreamRetryHintMs() {
    if (!profile?.useUpstreamRetryHints) return null;
    const resetTime = parseResetFromHeaders(headers);
    if (resetTime) {
      const waitMs = Math.max(resetTime - Date.now(), 0);
      if (waitMs > 0) return waitMs;
    }

    const retryFromErrorText = parseRetryFromErrorText(errorStr);
    if (retryFromErrorText && retryFromErrorText > 0) {
      return retryFromErrorText;
    }

    return null;
  }

  function getScaledBaseCooldown(reason, level = backoffLevel) {
    const baseCooldownMs =
      typeof profile?.baseCooldownMs === "number" && profile.baseCooldownMs >= 0
        ? profile.baseCooldownMs
        : COOLDOWN_MS.transientInitial;
    return {
      baseCooldownMs,
      cooldownMs: getScaledCooldown(baseCooldownMs, level + 1, maxBackoffSteps),
      newBackoffLevel: Math.min(level + 1, maxBackoffSteps),
    };
  }

  function buildRetryableFallback(reason) {
    const upstreamRetryHintMs = getUpstreamRetryHintMs();
    if (typeof upstreamRetryHintMs === "number" && upstreamRetryHintMs > 0) {
      return {
        shouldFallback: true,
        cooldownMs: upstreamRetryHintMs,
        baseCooldownMs: upstreamRetryHintMs,
        newBackoffLevel: 0,
        usedUpstreamRetryHint: true,
        reason,
      };
    }

    const scaled = getScaledBaseCooldown(reason, backoffLevel);
    return {
      shouldFallback: true,
      cooldownMs: scaled.cooldownMs,
      baseCooldownMs: scaled.baseCooldownMs,
      newBackoffLevel: scaled.newBackoffLevel,
      usedUpstreamRetryHint: false,
      reason,
    };
  }

  const isRateLimitStatus = status === HTTP_STATUS.RATE_LIMITED;
  const preserveQuota429 = shouldPreserveQuotaSignalsFor429(provider);
  const shouldUseQuotaSignal = !isRateLimitStatus || preserveQuota429;

  // Check error message FIRST - specific patterns take priority over status codes
  if (errorText) {
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
    if (shouldUseQuotaSignal && isCreditsExhausted(errorStr)) {
      return {
        shouldFallback: true,
        cooldownMs: COOLDOWN_MS.paymentRequired ?? 3600 * 1000, // 1h cooldown
        reason: RateLimitReason.QUOTA_EXHAUSTED,
        creditsExhausted: true,
      };
    }

    // Daily quota exhausted — lock model until tomorrow
    if (shouldUseQuotaSignal && isDailyQuotaExhausted(errorStr)) {
      const msUntilTomorrow = getMsUntilTomorrow();
      // Cap at 24 hours to handle timezone edge cases
      const cooldownMs = Math.min(msUntilTomorrow, 24 * 60 * 60 * 1000);
      return {
        shouldFallback: true,
        cooldownMs,
        reason: RateLimitReason.QUOTA_EXHAUSTED,
        dailyQuotaExhausted: true,
      };
    }

    if (
      status === HTTP_STATUS.FORBIDDEN &&
      provider &&
      getProviderCategory(provider) === "apikey" &&
      !errorStr.toLowerCase().includes("has not been used in project")
    ) {
      return buildRetryableFallback(RateLimitReason.AUTH_ERROR);
    }
  }

  const configuredRule =
    isRateLimitStatus && !preserveQuota429
      ? matchErrorRuleByStatus(status)
      : findMatchingErrorRule(status, errorStr);
  if (configuredRule) {
    if (configuredRule.backoff) {
      return buildRetryableFallback(configuredRule.reason ?? classifyError(status, errorStr));
    }
    const cooldownMs = configuredRule.cooldownMs ?? 0;
    return {
      shouldFallback: true,
      cooldownMs,
      baseCooldownMs: cooldownMs,
      reason: configuredRule.reason ?? RateLimitReason.UNKNOWN,
    };
  }

  if (status === HTTP_STATUS.NOT_ACCEPTABLE || retryableStatuses.has(status)) {
    return buildRetryableFallback(RateLimitReason.SERVER_ERROR);
  }

  // 400 — context overflow / malformed request may succeed on another model in the combo
  if (status === HTTP_STATUS.BAD_REQUEST) {
    const isOverflow = CONTEXT_OVERFLOW_PATTERNS.some((p) => p.test(errorStr));
    const isMalformed = MALFORMED_REQUEST_PATTERNS.some((p) => p.test(errorStr));

    if (isOverflow || isMalformed) {
      return {
        shouldFallback: true,
        cooldownMs: 0,
        reason: RateLimitReason.MODEL_CAPACITY,
      };
    }

    // Generic 400 is not account-fallback-worthy. Combo routing may still try a
    // different provider/model because combo fallback is target-level orchestration.
    return { shouldFallback: false, cooldownMs: 0, reason: RateLimitReason.UNKNOWN };
  }

  // All other errors - fallback with transient cooldown
  return {
    shouldFallback: true,
    cooldownMs: profile?.baseCooldownMs ?? COOLDOWN_MS.transient,
    baseCooldownMs: profile?.baseCooldownMs ?? COOLDOWN_MS.transient,
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
  const fallbackDecision = checkFallbackError(status, errorText, backoffLevel, null, provider);
  const { cooldownMs, reason } = fallbackDecision;
  const newBackoffLevel =
    "newBackoffLevel" in fallbackDecision ? fallbackDecision.newBackoffLevel : undefined;

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
