import {
  BACKOFF_STEPS_MS,
  EXECUTOR_CONTRACT_VIOLATION_CODE,
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
  serviceSupervisorCooldown,
  isNimFunctionDegraded,
} from "../config/errorConfig.ts";
import {
  getProviderErrorRuleMatch,
  resolveRuleMatchBody,
  honorsRuleLockScope,
} from "../config/providerErrorRules.ts";
import * as rot from "./rotationConfig.ts";
import {
  getPassthroughProviders,
  getProviderCategory,
  isLocalProvider,
} from "../config/providerRegistry.ts";
import {
  DEFAULT_RESILIENCE_SETTINGS,
  resolveResilienceSettings,
} from "../../src/lib/resilience/settings";
import { resolveModelLockoutSettings } from "../../src/lib/resilience/modelLockoutSettings";
import {
  getAllCircuitBreakerStatuses,
  getCircuitBreaker,
} from "../../src/shared/utils/circuitBreaker";
import {
  classify429FromError,
  looksLikeQuotaExhausted,
  type FailureKind,
} from "../../src/shared/utils/classify429";
import { recordProviderSuccess as resetCooldownFailureCount } from "./providerCooldownTracker.ts";
import {
  getProviderById,
  resolveProviderId,
  isLocalProvider as isLocalProviderId,
  isSelfHostedChatProvider,
} from "../../src/shared/constants/providers";
import { resolveUseUpstream429BreakerHints } from "../../src/shared/utils/providerHints";
import { getCodexModelScope } from "../config/codexQuotaScopes.ts";
import { getQuotaScopedModelForProvider, isAntigravityQuotaProvider } from "./antigravityQuotaFamily.ts";
import { persistAntigravityFamilyCooldownIfQuota } from "./antigravityFamilyCooldown.ts";
import {
  classifyGeminiQuotaMetricFromText,
  isRpdExhausted,
  isRpmExhausted,
  isTpmExhausted,
} from "./geminiRateLimitTracker.ts";
import { setConnectionRateLimitUntil } from "@/lib/db/providers";
import {
  parseRetryHintFromJsonBody,
  parseDetailedRetryHintFromJsonBody,
  parseDelayString,
  MAX_SHORT_RETRY_HINT_MS,
} from "./retryAfterJson.ts";
import { isMoonshotAccountBalanceExhausted } from "./usage/moonshotOpenPlatform.ts";
import { isTpdRateLimit, resolveTpdCooldownMs } from "./dailyQuotaReset.ts";

// Pre-compiled regex constants for hot-path retry parsing (avoid per-call compilation)
const RETRY_AFTER_RE = /retry\s+after\s+(\d+)\s*s/i;
const PLEASE_RETRY_RE = /please retry in\s+([\d.]+\s*s)/i;
const ISO_RETRY_RE = /\b(?:try again at|wait until|reset(?:s)? at|available at|retry after)\s+(\d{4}-\d{2}-\d{2}[Tt ]\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?)/i;
const RESETS_AFTER_RE = /resets? after (\d+h)?(\d+m)?(\d+s)?/i;
const WILL_RESET_AFTER_RE = /will reset after (\d+h)?(\d+m)?(\d+s)?/i;
const RESETS_IN_RE = /resets? in (\d+h)?(\d+m)?(\d+s)?/i;
const RETRY_IN_SEC_RE = /please retry in (\d+(?:\.\d+)?)\s*s/i;
const COOLDOWN_NUMERIC_RE = /^\d+(\.\d+)?$/;

export type RetryHintProvenance = "header" | "google_rpc_retry_info" | "body";

export function retryHintBypassesMaxCooldownMs(
  provenance: RetryHintProvenance | undefined
): boolean {
  return provenance === "header" || provenance === "google_rpc_retry_info";
}

import {
  isSubscriptionQuotaText,
  buildSubscriptionQuotaFallback,
  buildWeeklyQuotaFallback,
  buildSessionQuotaFallback,
  SUBSCRIPTION_QUOTA_COOLDOWN_MS,
} from "./quotaTextCooldowns.ts";
import { parseDayGranularityResetMs, shouldPreserveQuotaSignals } from "./quotaResetParsing.ts";
import { evictLockoutOverflow } from "./accountFallback/lockoutEviction.ts";
export { MODEL_LOCKOUT_EVICTION_CAP } from "./accountFallback/lockoutEviction.ts";
import { capScaledCooldownMs } from "./accountFallback/cooldownCap.ts";
import { resolveApiKeyForbiddenFallback } from "./accountFallback/nonRetryableUpstream.ts";
import * as exactModelLock from "./accountFallback/exactModelLock.ts";
export type ProviderProfile = {
  baseCooldownMs: number;
  useUpstreamRetryHints: boolean;
  useUpstream429BreakerHints?: boolean;
  maxCooldownMs: number;
  maxBackoffSteps: number;
  failureThreshold: number;
  resetTimeoutMs: number;
  transientCooldown: number;
  rateLimitCooldown: number;
  maxBackoffLevel: number;
  circuitBreakerThreshold: number;
  circuitBreakerReset: number;
  // Adaptive circuit breaker fields
  degradationThreshold?: number;
  // Provider-level cooldown fields
  providerFailureThreshold: number;
  providerFailureWindowMs: number;
  providerCooldownMs: number;
  maxBackoffMultiplier?: number;
  backoffEscalationCount?: number;
};
type JsonRecord = Record<string, unknown>;
type RateLimitReasonValue = (typeof RateLimitReason)[keyof typeof RateLimitReason];
export type ModelLockoutEntry = {
  reason: string;
  until: number;
  lockedAt: number;
  failureCount: number;
  lastFailureAt: number;
  resetAfterMs: number;
};
export type ModelFailureState = {
  failureCount: number;
  lastFailureAt: number;
  resetAfterMs: number;
  /** Cooldown applied on the last failure — extends the escalation window so a
   *  model that fails again right after its lockout expires keeps escalating. */
  lastCooldownMs?: number;
};
type AccountState = JsonRecord & {
  id?: string | null;
  rateLimitedUntil?: string | null;
  backoffLevel?: number | null;
  lastError?: unknown;
  status?: string;
};

function toJsonRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

// Provider-level failure tracking for circuit breaker behavior
// Error codes that count toward provider-level failure threshold.
// 429 is included: per-error-type cooldowns (rate_limit: 60s, quota_exhausted: 1h)
// prevent cascading provider trips at scale (Issue #1846 concern addressed),
// while still allowing the circuit breaker to open on sustained 429s and
// prevent infinite combo retries (Issue #3200).
const PROVIDER_FAILURE_ERROR_CODES = new Set([408, 429, 500, 502, 503, 504]);

// Per-connection failure deduplication: prevents rapid-fire failures from the
// same connection from counting multiple times toward the provider breaker.
const CONNECTION_FAILURE_DEDUP_MS = 5000;
const MAX_CONNECTION_FAILURE_DEDUP_ENTRIES = 10_000;
const lastConnectionFailure = new Map<string, number>();

// Per-provider network-error dedup: several combo targets on the SAME provider can
// fail the same single network event (a VPN blip) in the same request. Without this,
// each target counts once and one transient blip opens the whole-provider breaker
// while the provider is healthy. A genuinely dead proxy persists ACROSS requests
// (past the window) and still accumulates to its threshold.
const NETWORK_ERROR_DEDUP_MS = 10_000;
const MAX_NETWORK_ERROR_DEDUP_ENTRIES = 1000;
const lastNetworkErrorByProvider = new Map<string, number>();

function pruneConnectionFailureDedupeEntries(): void {
  while (lastConnectionFailure.size > MAX_CONNECTION_FAILURE_DEDUP_ENTRIES) {
    const oldestKey = lastConnectionFailure.keys().next().value;
    if (typeof oldestKey !== "string") return;
    lastConnectionFailure.delete(oldestKey);
  }
}

const _connectionFailureSweep = setInterval(() => {
  const now = Date.now();
  for (const [key, ts] of lastConnectionFailure) {
    if (now - ts > CONNECTION_FAILURE_DEDUP_MS) lastConnectionFailure.delete(key);
  }
}, 60_000);
if (typeof _connectionFailureSweep === "object" && "unref" in _connectionFailureSweep) {
  (_connectionFailureSweep as { unref?: () => void }).unref?.();
}

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

// Custom banned signals — loaded from DB settings at runtime.
// Combined with ACCOUNT_DEACTIVATED_SIGNALS in isAccountDeactivated().
let _customBannedSignals: string[] = [];

export function setCustomBannedSignals(signals: string[]): void {
  _customBannedSignals = signals;
}

export function getMergedBannedSignals(): string[] {
  if (_customBannedSignals.length === 0) return ACCOUNT_DEACTIVATED_SIGNALS;
  return [...ACCOUNT_DEACTIVATED_SIGNALS, ..._customBannedSignals];
}

// T10 (sub2api PR #1169): Signals that indicate billing credits are exhausted.
// Distinct from rate-limit 429 — the account won't recover until credits are added.
export const CREDITS_EXHAUSTED_SIGNALS = [
  "insufficient_quota",
  "billing_hard_limit_reached",
  "exceeded your current quota",
  "exceeded your current usage quota",
  "credit_balance_too_low",
  "your credit balance is too low",
  "credits exhausted",
  "out of credits",
  "payment required",
  "free tier of the model has been exhausted",
  // #8631: narrower than a bare "has been exhausted" — that generic phrase also
  // appears in Gemini's transient RPM/TPM 429 body ("Resource has been exhausted
  // (e.g. check quota)."), which must stay RATE_LIMIT_EXCEEDED, not terminal.
  // Anchoring on "tier" keeps free-tier depletion wording matched while excluding
  // Gemini's "resource has been exhausted" rate-limit phrasing.
  "tier has been exhausted",
  // #5239: providers (e.g. DeepSeek/GLM-style) return "Insufficient account balance"
  // on a depleted key. 402 is already terminalized by status, but catch non-402
  // out-of-credit bodies here too.
  "insufficient balance",
  "insufficient_balance",
  "insufficient account balance",
  "insufficient credit balance",
  // Command Code returns 400 "You have insufficient credits to make this
  // request. Please purchase more credits to continue using the service."
  // when the account's billing credits run out. Without this signal the
  // error stays unclassified (errorType=null), so the connection is never
  // marked credits_exhausted and keeps being re-selected on every request.
  "insufficient credits",
  "insufficient credit",
];

// T11: Signals that indicate OAuth token is invalid/expired (not permanent deactivation)
export const OAUTH_INVALID_TOKEN_SIGNALS = [
  "invalid authentication credentials",
  "oauth 2",
  "login cookie",
  "valid authentication credential",
  "invalid credentials",
];

// A model that upstream has permanently retired — Gemini's deprecated-model 404
// ("This model models/gemini-2.5-flash is no longer available to new users...")
// and Fireworks/OpenAI-compatible "end of life" 410s ("has reached its end of
// life ... and is no longer available") — will 404/410 on EVERY future request;
// no cooldown short enough to retry soon is ever correct. Without this check
// these fall through to the generic "all other errors" branch at the bottom of
// checkFallbackError, which only applies a short (seconds-to-minutes) transient
// cooldown, so combo/auto-routing keeps re-selecting the dead model roughly
// every cooldown window, forever — wasted upstream calls that, at volume, look
// like abusive traffic to the provider (observed: a Gemini free-tier key
// retried `gemini-2.5-flash`/`gemini-2.5-flash-lite` every ~15-45 minutes for a
// full day). Matched independent of MODEL_ACCESS_DENIED_PATTERNS below because
// those only fire for status 400; this needs to catch the far more common
// 404/410 status a retired model actually returns.
export const MODEL_PERMANENTLY_UNAVAILABLE_PATTERNS = [
  /\bno longer available\b/i,
  /\bno longer supported\b/i,
  /\bhas reached (?:its |the )?end.?of.?life\b/i,
  /\bmodel[\s\S]{0,40}?\b(?:deprecated|retired|discontinued|decommissioned)\b/i,
  /\b(?:deprecated|retired|discontinued|decommissioned)[\s\S]{0,40}?\bmodel\b/i,
];

// A provider that has permanently retired its API base_url — the old endpoint
// keeps returning 410/404 on EVERY future request until the connection's
// base_url is updated by an operator; no cooldown short enough to retry soon
// is ever correct. Without this check these fall through to the generic
// "all other errors" branch, which only applies a short (seconds-to-minutes)
// transient cooldown, so combo/auto-routing keeps re-selecting the dead
// endpoint roughly every cooldown window, forever — wasted upstream calls
// that, at volume, look like abusive traffic (observed: freeaiapikey's moved
// endpoint retried every ~1 minute for a full day: "This API endpoint has
// moved. Please update your base_url to https://api.freeaiapikey.com/v1 —
// the old endpoint on freeaiapikey.com no longer works.").
export const ENDPOINT_PERMANENTLY_MOVED_PATTERNS = [
  /\bendpoint has moved\b/i,
  /\bno longer works\b/i,
  /\bupdate your base.?url\b/i,
];

// A billing/account suspension that requires manual operator action (unpaid
// invoice, spending limit) — text varies per provider/account name, e.g.
// Fireworks: "Account hummern is suspended, possibly due to reaching the
// monthly spending limit or failure to pay past invoices." This does not
// match ACCOUNT_DEACTIVATED_SIGNALS' fixed "your account has been suspended"
// substring, and several providers surface it on a status (412) that
// checkFallbackError does not otherwise classify — so it fell through to the
// generic transient-error branch and got retried every few minutes, all day,
// against an account that cannot succeed until billing is fixed.
export const ACCOUNT_SUSPENDED_BILLING_PATTERNS = [
  /\bsuspended\b[\s\S]{0,120}?\b(?:spending limit|billing|invoice|payment)\b/i,
  /\b(?:spending limit|billing|invoice|payment)\b[\s\S]{0,120}?\bsuspended\b/i,
];

// Context overflow patterns — the prompt exceeds the model's maximum context length.
// Different providers phrase this differently. Used to decide whether a 400 error
// should trigger combo fallback (a different model may have a larger context window).
// Exported so combo.ts's isContextOverflow400() guard (open-sse/services/combo.ts)
// can reuse this single source of truth instead of maintaining its own,
// independently-drifting pattern list (see issue #6637).
export const CONTEXT_OVERFLOW_PATTERNS = [
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

// Structured error codes that reliably indicate model access denied
// (more reliable than regex on human-readable messages).
// OpenAI:  { error: { code: "model_not_found", ... } }
// Anthropic: { error: { type: "not_found_error", ... } }
const MODEL_ACCESS_DENIED_CODES = new Set([
  "model_not_found", // OpenAI, OpenAI-compatible (Kiro, Together, Fireworks, etc.)
  "deployment_not_found", // Azure OpenAI
]);

const MODEL_ACCESS_DENIED_TYPES = new Set([
  "not_found_error", // Anthropic: model doesn't exist — reliably model-scoped
]);

// Anthropic's permission_error is NOT exclusively model-access related: it also
// covers API-key scope, organization restrictions and feature gating. Treating it
// as model-access-denied unconditionally would make a genuinely auth-restricted key
// silently exhaust every combo target and hide the real error from the caller.
// So it only counts when the message text confirms it refers to the model.
const MODEL_ACCESS_AMBIGUOUS_TYPES = new Set([
  "permission_error", // Anthropic: could be model access OR key/org/feature scope
]);

// Model access patterns — the account does not have access to the requested model
// but a different account (e.g. PRO vs free tier) may support it.
// Exported so combo.ts #2101 can exempt model-scoped 400s from the body-specific
// stop guard (#5249): "model not supported" must advance to the next combo target
// even when the message also contains wrapper words like "invalid" / "bad request".
export const MODEL_ACCESS_DENIED_PATTERNS = [
  /\binvalid model\b/i,
  /\bmodel.*not.*(?:available|found|supported|accessible)\b/i,
  /\bmodel.*(?:does not exist|doesn't exist)\b/i,
  // "does not support" / "unsupported model" — GitHub Copilot / OpenAI-compatible
  // often phrase model rejection this way without the "is not supported" word order.
  /\bmodel\b[\s\S]{0,80}?\b(?:does\s+not\s+support|doesn't\s+support|unsupported)\b/i,
  /\b(?:does\s+not\s+support|doesn't\s+support|unsupported)\b[\s\S]{0,80}?\bmodel\b/i,
  /\bunsupported\s+model\b/i,
  /\baccess.*denied.*model\b/i,
  /\bmodel.*access.*denied\b/i,
  /\bplease select a different model\b/i,
  // "...access to the requested model" / "model ... access" — bounded lookahead
  // (no nested quantifiers) so it stays ReDoS-safe while requiring BOTH an
  // access/permission word and "model" so a pure auth error never matches.
  /\b(?:access|permission)[\s\S]{0,60}?\bmodel\b/i,
  /\bmodel[\s\S]{0,60}?\b(?:access|permission)\b/i,
];

// Pure credential/authentication failures — the key or token itself is bad, which
// is NOT a model-availability problem. Some providers phrase these as a 400 that
// also mentions the model (e.g. "invalid api key for model X"), which would
// otherwise trip MODEL_ACCESS_DENIED_PATTERNS above and trigger combo fallback
// across every target, masking the real "fix your credential" error. When the
// text clearly indicates a bad credential, the regex-based model-access detection
// is suppressed (structured codes/types like model_not_found are unaffected).
export const AUTH_CREDENTIAL_ERROR_PATTERNS = [
  /\b(?:invalid|incorrect|expired|missing|revoked)\s+api[\s_-]?key\b/i,
  /\bapi[\s_-]?key\s+(?:is\s+)?(?:invalid|incorrect|expired|missing|revoked|not\s+valid)\b/i,
  /\bauthentication\s+(?:failed|error|required)\b/i,
  /\b(?:invalid|expired|missing|revoked)\s+(?:token|credentials?|bearer)\b/i,
  /\bunauthorized\b/i,
  /\bnot\s+authenticated\b/i,
];

// #10460: strict subset of MODEL_ACCESS_DENIED_PATTERNS that is unambiguously
// PROVIDER-wide — the model does not exist / is not served by this provider at all, so
// no account of that provider could serve it (e.g. "The requested model is not
// supported", "model not found"). Deliberately EXCLUDES the "access"/"permission"
// patterns from MODEL_ACCESS_DENIED_PATTERNS (e.g. "does not have permission to access
// this model", "access denied ... model"): those commonly indicate an ACCOUNT-scoped
// entitlement gap (e.g. PRO vs free tier) where a *different* account of the same
// provider may still have access, so they must keep rotating through the normal
// account-cooldown path — not be treated as provider-wide unsupported.
const PROVIDER_MODEL_UNSUPPORTED_PATTERNS = [
  /\binvalid model\b/i,
  /\bmodel.*not.*(?:available|found|supported|accessible)\b/i,
  /\bmodel.*(?:does not exist|doesn't exist)\b/i,
  /\bmodel\b[\s\S]{0,80}?\b(?:does\s+not\s+support|doesn't\s+support|unsupported)\b/i,
  /\b(?:does\s+not\s+support|doesn't\s+support|unsupported)\b[\s\S]{0,80}?\bmodel\b/i,
  /\bunsupported\s+model\b/i,
  /\bplease select a different model\b/i,
];

/**
 * #10460: is this 400 an unambiguous, PROVIDER-wide "model not supported" response —
 * i.e. would retrying a *different account* of the same provider also fail for the
 * same reason? Reuses AUTH_CREDENTIAL_ERROR_PATTERNS (the same bad-credential
 * exclusion `checkFallbackError`'s 400 branch applies) so a message like "invalid api
 * key for model X" is never misclassified as model-wide. Also excludes the broader,
 * ambiguous MODEL_ACCESS_DENIED_PATTERNS access/permission phrasing — those can be
 * account-scoped entitlement gaps, not a provider-wide unsupported model — so account
 * rotation for those keeps working normally via the regular cooldown path.
 *
 * Callers that want "should combo keep trying other targets" (not "should this
 * specific account keep rotating") should use MODEL_ACCESS_DENIED_PATTERNS /
 * isModelScoped400() instead — this helper is deliberately narrower.
 */
export function isProviderModelUnsupported400(status: number, errorText: string): boolean {
  if (status !== HTTP_STATUS.BAD_REQUEST) return false;
  if (AUTH_CREDENTIAL_ERROR_PATTERNS.some((p) => p.test(errorText))) return false;
  return PROVIDER_MODEL_UNSUPPORTED_PATTERNS.some((p) => p.test(errorText));
}

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

// Rate-limit text on a 400 — some providers (e.g. MiMoCode) signal throttling with a
// non-standard 400 status whose body carries rate-limit semantics instead of a 429
// (#4976). When detected, the request is fallback-worthy at connection-cooldown scope
// (NOT a whole-provider breaker) so combo routing can fail over to another free target.
// Exported: mimocode.ts's executor reuses this list directly (single source of truth).
export const RATE_LIMIT_TEXT_PATTERNS = [
  /high.?frequency/i,
  /non-compliant/i,
  /too many requests/i,
  /rate.?limit/i,
  /频繁/, // "frequent" (zh) — high-frequency request throttling
  /频率/, // "frequency" (zh) — request-frequency throttling
];

// Parameter validation errors — model-specific constraints (different models = different limits)
const PARAM_VALIDATION_PATTERNS = [
  /max_tokens.*illegal/i,
  /max_tokens.*must be/i,
  /max_tokens.*range/i,
  /parameter is illegal/i,
  /is illegal.*range/i,
];

/**
 * T06: Returns true if response body indicates the account is permanently deactivated.
 */
export function isAccountDeactivated(errorText: string): boolean {
  const lower = String(errorText || "").toLowerCase();
  return getMergedBannedSignals().some((sig) => lower.includes(sig));
}

/**
 * T10: Returns true if response body indicates credits/quota are permanently exhausted.
 */
export function isCreditsExhausted(errorText: string): boolean {
  const lower = String(errorText || "").toLowerCase();
  return CREDITS_EXHAUSTED_SIGNALS.some((sig) => lower.includes(sig));
}

/**
 * Returns true if the response body indicates the requested model has been
 * permanently retired by the provider (see MODEL_PERMANENTLY_UNAVAILABLE_PATTERNS).
 */
export function isModelPermanentlyUnavailable(errorText: string): boolean {
  const text = String(errorText || "");
  return MODEL_PERMANENTLY_UNAVAILABLE_PATTERNS.some((p) => p.test(text));
}

/**
 * Returns true if response body indicates the provider's API endpoint/base_url
 * has permanently moved (see ENDPOINT_PERMANENTLY_MOVED_PATTERNS).
 */
export function isEndpointPermanentlyMoved(errorText: string): boolean {
  const text = String(errorText || "");
  return ENDPOINT_PERMANENTLY_MOVED_PATTERNS.some((p) => p.test(text));
}

/**
 * Returns true if response body indicates the account is suspended for a
 * billing reason (unpaid invoice, spending limit) — see
 * ACCOUNT_SUSPENDED_BILLING_PATTERNS.
 */
export function isAccountSuspendedForBilling(errorText: string): boolean {
  const text = String(errorText || "");
  return ACCOUNT_SUSPENDED_BILLING_PATTERNS.some((p) => p.test(text));
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
    useUpstream429BreakerHints: connectionCooldown.useUpstream429BreakerHints,
    maxCooldownMs: resolveModelLockoutSettings(settings).maxCooldownMs,
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
    degradationThreshold: providerBreaker.degradationThreshold,
    // Provider-level cooldown fields are not exposed in resilience settings yet.
    providerFailureThreshold: PROVIDER_PROFILES[category].providerFailureThreshold,
    providerFailureWindowMs: PROVIDER_PROFILES[category].providerFailureWindowMs,
    maxBackoffMultiplier: PROVIDER_PROFILES[category].maxBackoffMultiplier,
    backoffEscalationCount: PROVIDER_PROFILES[category].backoffEscalationCount,
    providerCooldownMs: PROVIDER_PROFILES[category].providerCooldownMs,
  } satisfies ProviderProfile;
}

/**
 * Get the resilience profile for a provider (oauth or apikey).
 * @param {string} provider - Provider ID or alias
 */
export function getProviderProfile(provider: string): ProviderProfile {
  const category = getProviderCategory(provider);
  return buildProviderProfile(category);
}

export async function getRuntimeProviderProfile(provider: string | null | undefined) {
  try {
    const { getCachedSettings } = await import("@/lib/db/readCache");
    const settings = await getCachedSettings();
    const category = getProviderCategory(provider || "");
    return buildProviderProfile(category, settings);
  } catch {
    return getProviderProfile(provider || "");
  }
}

// ─── Per-Model Lockout Tracking ─────────────────────────────────────────────
// In-memory map: "provider:connectionId:model" → { reason, until, lockedAt }
const modelLockouts = new Map<string, ModelLockoutEntry>();
const modelFailureState = new Map<string, ModelFailureState>();

// Aliases (e.g. "cx" → "codex") must share lockout state with their canonical
// provider, otherwise a model locked via one spelling stays routable via the other.
const canonicalProviderCache = new Map<string, string>();
function getCanonicalLockProvider(provider: string): string {
  let canonical = canonicalProviderCache.get(provider);
  if (!canonical) {
    canonical = resolveProviderId(provider);
    canonicalProviderCache.set(provider, canonical);
  }
  return canonical;
}

export function shouldDeferAntigravityQuotaStateToCaller(
  provider: string,
  hasCallerOwner: boolean
): boolean {
  const canonicalProvider = getCanonicalLockProvider(provider);
  return hasCallerOwner && (canonicalProvider === "antigravity" || canonicalProvider === "agy");
}

export async function recordCoreOwnedAntigravityQuotaState({
  provider,
  connectionId,
  model,
  status,
  errorText,
  headers,
  profileOverride = null,
}: {
  provider: string;
  connectionId: string;
  model: string;
  status: number;
  errorText: string;
  headers: Headers | Record<string, string> | null;
  profileOverride?: ProviderProfile | null;
}) {
  const profile = profileOverride ?? (await getRuntimeProviderProfile(provider));
  const fallback = checkFallbackError(status, errorText, 0, model, provider, headers, profile);
  const lockout = recordModelLockoutFailure(
    provider,
    connectionId,
    model,
    "quota_exhausted",
    status,
    fallback.baseCooldownMs ?? profile.baseCooldownMs ?? COOLDOWN_MS.rateLimit,
    profile,
    {
      exactCooldownMs:
        fallback.usedUpstreamRetryHint === true
          ? fallback.cooldownMs
          : (fallback.quotaResetHintMs ?? null),
      maxCooldownMs: profile.maxCooldownMs,
      scope: "exact",
      exactCooldownIsUpstreamReset: retryHintBypassesMaxCooldownMs(fallback.retryHintSource),
    }
  );
  if (lockout.cooldownMs > 0 && isProviderExhaustedReason(fallback)) {
    persistAntigravityFamilyCooldownIfQuota({ provider, connectionId, model, cooldownMs: lockout.cooldownMs, reason: "quota_exhausted" });
  }
  return { cooldownMs: lockout.cooldownMs, failureCount: lockout.failureCount };
}

function getModelLockKey(
  provider: string,
  connectionId: string,
  model: string,
  reason?: string | null,
  status?: number | null
) {
  const canonicalProvider = getCanonicalLockProvider(provider);
  const lockModel =
    reason === "not_found" || status === 404
      ? model
      : canonicalProvider === "codex"
        ? getCodexModelScope(model)
        : getQuotaScopedModelForProvider(canonicalProvider, model) || model;
  return `${canonicalProvider}:${connectionId}:${lockModel}`;
}

const buildExactKey = exactModelLock.buildExactModelLockKey; // see exactModelLock.ts
const getModelLockKeys = exactModelLock.createGetModelLockKeys(
  getModelLockKey,
  getCanonicalLockProvider
);

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
  // The escalation window extends past the applied cooldown: a model that fails
  // again right after its lockout expires must keep escalating, not reset to 1.
  if (now - failure.lastFailureAt <= failure.resetAfterMs + (failure.lastCooldownMs ?? 0)) return;
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
      evictModelLockoutOverflow();
    }, 15_000);
    if (typeof _cleanupTimer === "object" && "unref" in _cleanupTimer) {
      (_cleanupTimer as { unref?: () => void }).unref?.(); // Don't prevent process exit (Node.js only)
    }
  } catch {
    // Cloudflare Workers may not support setInterval outside handlers — skip cleanup timer
  }
}

/** @internal exported for testing only (both accessors below). */
export function evictModelLockoutOverflow(): void {
  evictLockoutOverflow(modelLockouts, modelFailureState);
}
export function getModelLockoutSize(): number {
  return modelLockouts.size;
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
  provider: string,
  connectionId: string,
  model: string | null | undefined,
  reason: string,
  cooldownMs: number,
  metadata: Partial<ModelLockoutEntry> = {}
): void {
  if (!model) return; // No model → skip model-level locking
  ensureCleanupTimer();
  const key = getModelLockKey(provider, connectionId, model, reason);
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

// Lock only this exact provider/account/model tuple, never a quota family — see exactModelLock.ts.
export const lockExactModel = exactModelLock.createLockExactModel(
  modelLockouts,
  ensureCleanupTimer,
  cleanupModelLockKey,
  getCanonicalLockProvider
);

/**
 * Pick the `exactCooldownMs` to apply to a model lockout (#1308).
 *
 * Prefer a parsed reset longer than the base cooldown so a precise body hint
 * still beats exponential backoff. Whether it may bypass maxCooldownMs is a
 * separate provenance decision made by retryHintBypassesMaxCooldownMs.
 */
export function selectLockoutCooldownMs(
  parsedCooldownMs: number,
  settings: { baseCooldownMs: number; useExponentialBackoff: boolean }
): number {
  if (typeof parsedCooldownMs === "number" && parsedCooldownMs > settings.baseCooldownMs) {
    return parsedCooldownMs;
  }
  return settings.useExponentialBackoff ? 0 : settings.baseCooldownMs;
}

export function recordModelLockoutFailure(
  provider: string,
  connectionId: string,
  model: string,
  reason: string,
  status: number,
  fallbackCooldownMs: number,
  profile: ProviderProfile | null = null,
  options: {
    exactCooldownMs?: number | null;
    maxCooldownMs?: number;
    scope?: "exact" | "quota_family";
    /**
     * #6863 vs #7940: set true only when `exactCooldownMs` came from an actual
     * authoritative upstream signal: Retry-After/X-RateLimit-Reset headers or
     * google.rpc.RetryInfo. Generic JSON and prose-derived reset text are useful
     * exact hints but remain bounded by maxCooldownMs. Leave false/omitted for
     * those body hints and for synthetic estimates (the quota_exhausted
     * until-midnight default below, plain exponential backoff).
     */
    exactCooldownIsUpstreamReset?: boolean;
  } = {}
) {
  ensureCleanupTimer();
  const key =
    options.scope === "exact"
      ? buildExactKey(getCanonicalLockProvider(provider), connectionId, model)
      : getModelLockKey(provider, connectionId, model, reason, status);
  const now = Date.now();
  cleanupModelLockKey(key, now);

  // For daily quota exhaustion (quota_exhausted), set cooldown until tomorrow 00:00
  // Use exactCooldownMs to bypass exponential backoff, ensuring precise lock until midnight
  if (reason === "quota_exhausted" && typeof options.exactCooldownMs !== "number") {
    options = { ...options, exactCooldownMs: getMsUntilTomorrow() };
  }

  const resetAfterMs = getFailureWindowMs(profile);
  const previous = modelFailureState.get(key);
  // Escalation window extends past the previously applied cooldown so a model
  // that fails again right after its lockout expires keeps escalating.
  const withinWindow =
    previous &&
    now - previous.lastFailureAt <= previous.resetAfterMs + (previous.lastCooldownMs ?? 0);
  const failureCount = withinWindow ? previous.failureCount + 1 : 1;

  const baseCooldownMs = getModelLockBaseCooldown(status, fallbackCooldownMs, profile);
  // Cap both exponential backoff and computed exact cooldowns (e.g. daily-quota
  // until-midnight, #7940/#7980) against maxCooldownMs so user-configured caps are
  // honored — EXCEPT an authoritative parsed upstream reset (#6863, e.g. Antigravity
  // "Resets in 92h27m28s"), which the upstream told us to wait and must be honored
  // exactly, never clamped down to maxCooldownMs.
  const maxCooldownMs =
    typeof options.maxCooldownMs === "number" && options.maxCooldownMs > 0
      ? options.maxCooldownMs
      : null;
  const cooldownMs =
    typeof options.exactCooldownMs === "number" && options.exactCooldownMs > 0
      ? maxCooldownMs !== null && !options.exactCooldownIsUpstreamReset
        ? Math.min(options.exactCooldownMs, maxCooldownMs)
        : options.exactCooldownMs
      : Math.min(
          getScaledCooldown(
            baseCooldownMs,
            failureCount,
            profile?.maxBackoffSteps ?? BACKOFF_CONFIG.maxLevel
          ),
          maxCooldownMs ?? BACKOFF_CONFIG.max
        );

  modelFailureState.set(key, {
    failureCount,
    lastFailureAt: now,
    resetAfterMs,
    lastCooldownMs: cooldownMs,
  });

  const lockFn = options.scope === "exact" ? lockExactModel : lockModel;
  lockFn(provider, connectionId, model, reason, cooldownMs, {
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

export function clearModelLock(
  provider: string,
  connectionId: string,
  model: string | null | undefined
): boolean {
  if (!model) return false;
  return exactModelLock.clearMultiKeyLock(
    modelLockouts,
    modelFailureState,
    getModelLockKeys(provider, connectionId, model)
  );
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
  const canonicalId = resolveProviderId(provider);
  if (getCanonicalLockProvider(canonicalId) === "antigravity") return true;
  if (getCanonicalLockProvider(canonicalId) === "codex") return true;
  if (canonicalId === "gemini" || canonicalId === "github") return true;
  if (canonicalId === "antigravity" || canonicalId === "agy") return true;
  if (getPassthroughProviders().has(canonicalId)) return true;
  // #11071: getPassthroughProviders() reads the open-sse REGISTRY. A provider can declare
  // passthroughModels:true in the SHARED registry (src/shared/constants/providers/) and be
  // absent from that set — 40 of them are, and they are neither local nor self-hosted, so the
  // branch below never reaches them either. Without this lookup a missing-model 404 on one of
  // those cools the whole connection instead of locking out the single model.
  if (getProviderById(canonicalId)?.passthroughModels === true) return true;
  if (isCompatibleProvider(canonicalId)) return true;
  if (isLocalProviderId(canonicalId) || isSelfHostedChatProvider(canonicalId)) return true;
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
  const lockFn = getCanonicalLockProvider(provider) === "antigravity" ? lockExactModel : lockModel;
  lockFn(provider, connectionId, model, reason, cooldownMs);
  return true;
}

export function shouldMarkAccountExhaustedFrom429(
  provider: string | null | undefined,
  model: string | null | undefined = null,
  connectionPassthroughModels?: boolean,
  failureKind?: FailureKind
): boolean {
  // A plain 429 means transient rate limiting / high traffic for many OAuth providers.
  // Only connection-poison the quota cache when the upstream body explicitly says
  // the long-window quota is exhausted; otherwise fallback should try another account
  // without making this one look quota-depleted for 5 minutes.
  if (failureKind === "rate_limit" || failureKind === "transient") return false;
  return (
    shouldPreserveQuotaSignals(provider) &&
    !hasPerModelQuota(provider, model, connectionPassthroughModels)
  );
}

export function classifyLockoutReason(status: number): string {
  if (status === 429) return "rate_limit";
  if (status === 403) return "quota_exhausted";
  return "unknown";
}

export type DecayResult = { cleared: boolean; newFailureCount: number };

export function decayModelFailureCount(
  provider: string,
  connectionId: string,
  model: string
): DecayResult {
  const key = getModelLockKey(provider, connectionId, model);
  const failure = modelFailureState.get(key);
  if (!failure) return { cleared: false, newFailureCount: 0 };

  const newFailureCount = Math.floor(failure.failureCount / 2);
  if (newFailureCount === 0) {
    modelFailureState.delete(key);
    return { cleared: true, newFailureCount: 0 };
  } else {
    modelFailureState.set(key, {
      ...failure,
      failureCount: newFailureCount,
    });
    return { cleared: false, newFailureCount };
  }
}

/**
 * Clear all in-memory model lockouts and failure state (for tests / full reset).
 */
export function clearAllModelLockouts(): void {
  modelLockouts.clear();
  modelFailureState.clear();
}

/**
 * Check if a specific model on a specific account is locked
 * @returns {boolean}
 */
export function isModelLocked(
  provider: string,
  connectionId: string,
  model: string | null | undefined
): boolean {
  if (!model) return false;
  return exactModelLock.isAnyKeyLocked(
    modelLockouts,
    cleanupModelLockKey,
    getModelLockKeys(provider, connectionId, model)
  );
}

/**
 * Get model lockout info (for debugging/dashboard)
 */
export function getModelLockoutInfo(
  provider: string,
  connectionId: string,
  model: string | null | undefined
) {
  if (!model) return null;
  const entry = exactModelLock.findLatestLockEntry(
    modelLockouts,
    cleanupModelLockKey,
    getModelLockKeys(provider, connectionId, model)
  );
  if (!entry) return null;
  return {
    reason: entry.reason,
    remainingMs: entry.until - Date.now(),
    lockedAt: new Date(entry.lockedAt).toISOString(),
    failureCount: entry.failureCount,
  };
}

export type ModelLockoutInfo = {
  provider: string;
  connectionId: string;
  model: string;
  reason: string;
  remainingMs: number;
  failureCount: number;
  lockedAt: string;
  until: number;
};

/**
 * Get all active model lockouts (for dashboard)
 */
export function getAllModelLockouts(): ModelLockoutInfo[] {
  const now = Date.now();
  const active: ModelLockoutInfo[] = [];
  for (const key of modelLockouts.keys()) {
    cleanupModelLockKey(key, now);
  }
  for (const [key, entry] of modelLockouts) {
    const [provider, connectionId, ...modelParts] = key.split(":");
    const model = modelParts.join(":");
    active.push({
      provider,
      connectionId,
      model,
      reason: entry.reason,
      remainingMs: entry.until - now,
      failureCount: entry.failureCount,
      lockedAt: new Date(entry.lockedAt).toISOString(),
      until: entry.until,
    });
  }
  return active;
}

// ─── Provider Breaker Compatibility Wrappers ────────────────────────────────
// Legacy helpers now delegate to the shared provider circuit breaker.

type ProviderBreakerProfile = {
  failureThreshold?: number;
  degradationThreshold?: number;
  resetTimeoutMs?: number;
  circuitBreakerThreshold?: number;
  circuitBreakerReset?: number;
};

function getProviderBreaker(provider: string | null | undefined) {
  return provider ? getCircuitBreaker(provider) : null;
}

function configureProviderBreaker(
  provider: string | null | undefined,
  profile?: ProviderBreakerProfile | null
) {
  if (!provider) return null;

  const resolvedProfile = { ...getProviderProfile(provider), ...profile };
  // Issue #2100 follow-up: resolve useUpstream429BreakerHints from the
  // provider profile (stored override) or fall back to per-provider default.
  // Stored value type is `boolean | undefined` — never `null` after PATCH.
  const userValue = resolvedProfile.useUpstream429BreakerHints;
  const useHints = resolveUseUpstream429BreakerHints(provider, userValue);
  return getCircuitBreaker(provider, {
    failureThreshold: resolvedProfile.failureThreshold ?? resolvedProfile.circuitBreakerThreshold,
    resetTimeout: resolvedProfile.resetTimeoutMs ?? resolvedProfile.circuitBreakerReset,
    ...(useHints
      ? {
          cooldownByKind: {
            rate_limit: 60_000,
            quota_exhausted: 3_600_000,
          } satisfies Partial<Record<FailureKind, number>>,
          classifyError: classify429FromError,
        }
      : {}),
    degradationThreshold: resolvedProfile.degradationThreshold,
    maxBackoffMultiplier: resolvedProfile.maxBackoffMultiplier,
    backoffEscalationCount: resolvedProfile.backoffEscalationCount,
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

export function getProviderBreakerState(provider: string | null | undefined) {
  const breaker = getProviderBreaker(provider);
  return breaker?.getStatus?.() ?? null;
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
  log?: { warn?: (...args: unknown[]) => void },
  connectionId?: string | null,
  profile?: ProviderBreakerProfile | null,
  opts?: { isQueueTimeout?: boolean; isNetworkError?: boolean }
): void {
  if (!provider) return;
  // OmniRoute's own rate-limit queue timeout is backpressure we applied, not a
  // provider failure — the provider never saw the request, so it must not count
  // toward the provider breaker.
  if (opts?.isQueueTimeout) return;

  // Network-layer errors (proxy_unreachable) get a separate SAME-PROVIDER dedup, so a
  // single transient network event is not counted once per combo target (see the
  // declaration). A dead proxy persists across requests and still accumulates.
  if (opts?.isNetworkError) {
    const now = Date.now();
    const last = lastNetworkErrorByProvider.get(provider);
    if (last && now - last < NETWORK_ERROR_DEDUP_MS) return;
    lastNetworkErrorByProvider.delete(provider);
    lastNetworkErrorByProvider.set(provider, now);
    while (lastNetworkErrorByProvider.size > MAX_NETWORK_ERROR_DEDUP_ENTRIES) {
      const oldestKey = lastNetworkErrorByProvider.keys().next().value;
      if (typeof oldestKey !== "string") break;
      lastNetworkErrorByProvider.delete(oldestKey);
    }
  }

  // Deduplicate rapid-fire failures from the same connection
  if (connectionId) {
    const dedupKey = `${provider}:${connectionId}`;
    const now = Date.now();
    const lastFailure = lastConnectionFailure.get(dedupKey);
    if (lastFailure && now - lastFailure < CONNECTION_FAILURE_DEDUP_MS) {
      return;
    }
    lastConnectionFailure.delete(dedupKey);
    lastConnectionFailure.set(dedupKey, now);
    pruneConnectionFailureDedupeEntries();
  }

  const breaker = configureProviderBreaker(provider, profile);
  if (!breaker) return;

  if (!breaker.canExecute()) return;

  breaker._onFailure();

  if (!breaker.canExecute()) {
    log?.warn?.(`[ProviderFailure] ${provider}: circuit breaker opened after repeated failures`);
  }
}

/**
 * Record a successful request for a provider.
 * Symmetric counterpart of recordProviderFailure:
 * - Resets cooldown failureCount (exponential backoff) for all non-OPEN states.
 * - HALF_OPEN -> CLOSED (probe success), CLOSED/DEGRADED -> decay failureCount.
 *
 * When the breaker is OPEN (provider is failing), this is a no-op -- the
 * cooldown stays intact and the breaker keeps its cooldown period.
 *
 * Matches execute()'s behavior: _onSuccess() is called for all non-OPEN states.
 */
export function recordProviderSuccess(
  provider: string | null | undefined,
  connectionId?: string | null
): void {
  if (!provider || provider === "unknown") return;

  const breaker = getProviderBreaker(provider);
  if (!breaker) return;
  const breakerState = breaker.getStatus().state;

  // When breaker is OPEN, the provider is failing -- do not reset cooldown
  // even if one request slipped through (dispatched before the open).
  // The cooldown resets when the breaker reaches HALF_OPEN and the probe
  // succeeds below.
  if (breakerState === "OPEN") return;

  // Reset cooldown failureCount (exponential backoff) -- symmetric with
  // recordProviderCooldown which increments it on each failure.
  resetCooldownFailureCount(provider, connectionId ?? undefined);

  // Clear failure-dedup window so the next genuine failure is not suppressed.
  if (connectionId) {
    lastConnectionFailure.delete(`${provider}:${connectionId}`);
  }

  // Transition breaker on success, matching execute()'s behavior:
  // HALF_OPEN -> CLOSED (probe success), CLOSED/DEGRADED -> decay failureCount.
  breaker._onSuccess();
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
  lastFailureAt: number | null;
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

/**
 * Returns true when a checkFallbackError result signals that the entire provider
 * quota is exhausted for this request, so the combo router can skip remaining
 * targets from the same provider (#1731).
 *
 * Covers:
 *  - reason === "quota_exhausted"  (subscription, daily, credits)
 *  - creditsExhausted flag
 *  - dailyQuotaExhausted flag
 */
export function isProviderExhaustedReason(result: {
  reason?: string;
  creditsExhausted?: boolean;
  dailyQuotaExhausted?: boolean;
}): boolean {
  if (result.creditsExhausted || result.dailyQuotaExhausted) return true;
  return result.reason === RateLimitReason.QUOTA_EXHAUSTED;
}

// ─── Retry-After Parsing ────────────────────────────────────────────────────

/**
 * Parse retry-after information from JSON error response bodies.
 * Providers embed retry info in different formats.
 *
 * @param {string|object} responseBody - Raw response body or parsed JSON
 * @returns {{ retryAfterMs: number|null, reason: string }}
 */
export function parseRetryAfterFromBody(responseBody: unknown): {
  retryAfterMs: number | null;
  reason: RateLimitReasonValue;
} {
  let body: JsonRecord;
  try {
    body = toJsonRecord(typeof responseBody === "string" ? JSON.parse(responseBody) : responseBody);
  } catch {
    return { retryAfterMs: null, reason: RateLimitReason.UNKNOWN };
  }

  if (Object.keys(body).length === 0) {
    return { retryAfterMs: null, reason: RateLimitReason.UNKNOWN };
  }

  // Gemini: { error: { details: [{ retryDelay: "33s" }] } }
  const error = toJsonRecord(body.error);
  const details = error.details || body.details || [];
  for (const detail of Array.isArray(details) ? details : []) {
    const detailRecord = toJsonRecord(detail);
    if (detailRecord.retryDelay) {
      return {
        retryAfterMs: parseDelayString(detailRecord.retryDelay),
        reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
      };
    }
  }

  // OpenAI: "Please retry after 20s" in message
  const msg = String(error.message || body.message || "");
  const retryMatch = RETRY_AFTER_RE.exec(msg);
  if (retryMatch) {
    return {
      retryAfterMs: Number.parseInt(retryMatch[1], 10) * 1000,
      reason: RateLimitReason.RATE_LIMIT_EXCEEDED,
    };
  }

  // Anthropic: error type classification
  const errorType = String(error.type || body.type || "");
  if (errorType === "rate_limit_error") {
    return { retryAfterMs: null, reason: RateLimitReason.RATE_LIMIT_EXCEEDED };
  }

  // Classify by error message keywords
  const reason = classifyErrorText(msg || errorType);
  return { retryAfterMs: null, reason };
}

// parseDelayString now lives in ./retryAfterJson.ts (shared with parseRetryHintFromJsonBody's
// Gemini RetryInfo.retryDelay parsing, #7940) — see the import at the top of this file.

// T07: parse retry time from error text body with combined "XhYmZs" format.
export function parseRetryFromErrorText(errorText: unknown): number | null {
  if (!errorText || typeof errorText !== "string") return null;
  const msg: string = String(errorText);

  const bodyHintMs = parseRetryHintFromJsonBody(msg, MAX_PROVIDER_COOLDOWN_MS);
  if (bodyHintMs !== null) return bodyHintMs;

  // Gemini free-tier text fallback (no parseable JSON details present):
  // "Please retry in 26.660853464s." Short throttle hint — capped independently of
  // MAX_PROVIDER_COOLDOWN_MS, mirroring the JSON RetryInfo.retryDelay cap (#7940).
  const pleaseRetryMs = parseDelayString(PLEASE_RETRY_RE.exec(msg)?.[1]);
  if (pleaseRetryMs !== null && pleaseRetryMs > 0) {
    return Math.min(pleaseRetryMs, MAX_SHORT_RETRY_HINT_MS);
  }

  // Issue #2321: parse embedded absolute ISO retry timestamps.
  const isoMatch = ISO_RETRY_RE.exec(msg);
  if (isoMatch) {
    const parsedTs = Date.parse(isoMatch[1]);
    if (Number.isFinite(parsedTs)) {
      const waitMs = parsedTs - Date.now();
      if (waitMs > 0) return waitMs;
    }
  }

  const match = RESETS_AFTER_RE.exec(msg);
  if (match?.[1] || match?.[2] || match?.[3]) return computeDurationMs(match);

  // Variant without "reset after": "will reset after XhYmZs"
  const altMatch = WILL_RESET_AFTER_RE.exec(msg);
  if (altMatch?.[1] || altMatch?.[2] || altMatch?.[3]) return computeDurationMs(altMatch);

  // Antigravity / Cloud Code phrasing: "Resets in 164h27m24s".
  const resetsInMatch = RESETS_IN_RE.exec(msg);
  if (resetsInMatch?.[1] || resetsInMatch?.[2] || resetsInMatch?.[3]) {
    return computeDurationMs(resetsInMatch);
  }

  // Gemini phrasing: "Please retry in 54.472178091s" (fractional seconds).
  const retryInSecMatch = RETRY_IN_SEC_RE.exec(msg);
  if (retryInSecMatch?.[1]) {
    const sec = Number.parseFloat(retryInSecMatch[1]);
    if (Number.isFinite(sec) && sec > 0) {
      return Math.min(Math.round(sec * 1000), MAX_PROVIDER_COOLDOWN_MS);
    }
  }

  return parseDayGranularityResetMs(msg, MAX_PROVIDER_COOLDOWN_MS);
}

/**
 * Compute total milliseconds from regex match groups (Xh)(Ym)(Zs)
 * Capped at 30 days to prevent adversarial/buggy upstream from locking indefinitely.
 */
const MAX_PROVIDER_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function computeDurationMs(match: RegExpMatchArray): number | null {
  let totalMs = 0;
  if (match[1]) totalMs += Number.parseInt(match[1], 10) * 3600 * 1000; // hours
  if (match[2]) totalMs += Number.parseInt(match[2], 10) * 60 * 1000; // minutes
  if (match[3]) totalMs += Number.parseInt(match[3], 10) * 1000; // seconds
  return totalMs > 0 ? Math.min(totalMs, MAX_PROVIDER_COOLDOWN_MS) : null;
}

// ─── Error Classification ───────────────────────────────────────────────────

/**
 * Classify error text into RateLimitReason
 */
export function classifyErrorText(errorText: unknown): RateLimitReasonValue {
  if (!errorText) return RateLimitReason.UNKNOWN;
  const lower = String(errorText).toLowerCase();

  if (
    lower.includes("quota exceeded") ||
    lower.includes("quota depleted") ||
    lower.includes("quota will reset") ||
    lower.includes("your quota will reset") ||
    lower.includes("quota has been exceeded") ||
    lower.includes("hour quota") ||
    lower.includes("billing") ||
    looksLikeQuotaExhausted(lower) ||
    // Issue #2321: Anthropic OAuth (Claude Code Pro/Team) 429 bodies surface
    // the subscription quota with phrases that contain neither "quota" nor
    // "billing". Without these patterns the error was classified as a
    // transient RATE_LIMIT_EXCEEDED (~5s base cooldown), which cascades all
    // Pro accounts into a tight retry loop until the 5h window resets.
    isSubscriptionQuotaText(lower)
  ) {
    return RateLimitReason.QUOTA_EXHAUSTED;
  }
  // T10: credits_exhausted signals
  if (isCreditsExhausted(lower)) {
    return RateLimitReason.QUOTA_EXHAUSTED;
  }
  // T06: account_deactivated signals
  if (isAccountDeactivated(lower)) {
    return RateLimitReason.AUTH_ERROR;
  }
  const configuredRule = matchErrorRuleByText(errorText);
  if (configuredRule?.reason) return configuredRule.reason;
  if (lower.includes("rate_limit")) return RateLimitReason.RATE_LIMIT_EXCEEDED;
  if (lower.includes("resource exhausted") || lower.includes("high demand"))
    return RateLimitReason.MODEL_CAPACITY;
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
 *
 * If context (provider, headers, body) is supplied, provider-specific rules
 * are evaluated FIRST. A provider like Opencode can signal account-wide quota
 * exhaustion via `x-ratelimit-remaining-requests: 0` even when the body says
 * "rate limit" — without context, classifyError falls through to the global
 * text rules and misclassifies as RATE_LIMIT_EXCEEDED. With context, the
 * provider rule takes precedence.
 */
export function classifyError(
  status: number,
  errorText: unknown,
  context?: { provider?: string | null; headers?: Record<string, string> | null; body?: unknown }
): RateLimitReasonValue {
  // Provider-specific rules take priority — they have the most accurate signal
  // (e.g. `x-ratelimit-remaining-requests: 0` is irrefutable account exhaustion).
  if (context?.provider) {
    const match = getProviderErrorRuleMatch(
      context.provider,
      status,
      context.headers ?? null,
      context.body
    );
    if (match) return match.reason;
  }

  // Text classification takes priority (more specific)
  const textReason = classifyErrorText(errorText);
  if (textReason !== RateLimitReason.UNKNOWN) return textReason;

  // Fall back to status code
  if (status === HTTP_STATUS.UNAUTHORIZED || status === HTTP_STATUS.FORBIDDEN) {
    return RateLimitReason.AUTH_ERROR;
  }
  if (status === HTTP_STATUS.PAYMENT_REQUIRED || status === HTTP_STATUS.PLAN_LIMIT_EXCEEDED) {
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
    lower.includes("try again tomorrow") ||
    lower.includes("tpd rate limit")
  );
}

// ─── Configurable Backoff ───────────────────────────────────────────────────

/**
 * Get backoff duration from configurable steps.
 * @param {number} failureCount - Number of consecutive failures
 * @returns {number} Duration in ms
 */
export function getBackoffDuration(failureCount: number): number {
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
  status: number,
  errorText: string | null,
  backoffLevel: number = 0,
  _model: string | null = null,
  provider: string | null = null,
  headers: Headers | Record<string, string> | null = null,
  profileOverride: ProviderProfile | null = null,
  structuredError?: { code?: string | null; type?: string | null } | null,
  rotation?: { account?: unknown } | null,
  dailyReset?: {
    timezone?: unknown;
    hour?: unknown;
    nowMs?: number;
  } | null,
): {
  shouldFallback: boolean;
  cooldownMs: number;
  baseCooldownMs?: number;
  newBackoffLevel?: number;
  usedUpstreamRetryHint?: boolean;
  retryHintSource?: RetryHintProvenance;
  reason?: string;
  permanent?: boolean;
  creditsExhausted?: boolean;
  dailyQuotaExhausted?: boolean;
  /** G-02: true when the error originates from an embedded service supervisor (not the upstream AI
   * provider itself). Callers should apply connection cooldown only — do NOT record a provider
   * circuit-breaker failure when this flag is set. */
  skipProviderBreaker?: boolean;
  quotaResetHintMs?: number;
  /** #6061: the provider-configured cooldown (ms) before backoff scaling, surfaced so the
   * caller can persist an explicit reset window instead of the engine's scaled cooldown. */
  configuredCooldownMs?: number;
  /** #10334 — the matched ProviderErrorRule's declared lock scope, surfaced so the
   * persistence layer can honor it instead of re-deriving scope from
   * hasPerModelQuota(). Populated ONLY when honorsRuleLockScope(provider) is true;
   * always undefined for every other provider, so existing consumers are unaffected. */
  ruleScope?: "model" | "provider" | "connection";
} {
  // #10360: an executor-result contract violation is OUR bug, not the provider's.
  // Retrying reproduces it verbatim, and cooling the connection down (or tripping
  // the provider breaker) punishes a healthy account for an internal defect. Must
  // run before every other classification — the surfaced status is a plain 500,
  // which the retryable set below would otherwise treat as a transient upstream
  // failure and hand a backoff cooldown.
  if (structuredError?.code === EXECUTOR_CONTRACT_VIOLATION_CODE) {
    return {
      shouldFallback: false,
      cooldownMs: 0,
      reason: EXECUTOR_CONTRACT_VIOLATION_CODE,
      skipProviderBreaker: true,
    };
  }

  const previousResponseBindingMiss =
    structuredError?.code === "invalid_previous_response_binding" ||
    (status === 409 && /previous_response_id does not belong/i.test(String(errorText || "")));
  if (previousResponseBindingMiss) {
    return {
      shouldFallback: false,
      cooldownMs: 0,
      reason: "invalid_previous_response_binding",
      skipProviderBreaker: true,
    };
  }

  const svc = serviceSupervisorCooldown(status, headers);
  if (svc) return svc;
  const rg = rot.gateFor(status, rotation?.account);
  if (rg) return rg;
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

  function parseResetFromHeaders(headers: Headers | Record<string, string> | null): number | null {
    if (!headers) return null;
    const recordHeaders = headers as Record<string, string>;

    // Retry-After header
    const retryAfter =
      typeof (headers as Headers).get === "function"
        ? (headers as Headers).get("retry-after")
        : recordHeaders["retry-after"] || recordHeaders["Retry-After"];

    if (retryAfter) {
      const seconds = Number.parseInt(retryAfter, 10);
      if (!Number.isNaN(seconds) && String(seconds) === String(retryAfter).trim()) {
        return Date.now() + seconds * 1000;
      }
      const date = new Date(retryAfter);
      if (!Number.isNaN(date.getTime())) return date.getTime();
    }

    // X-RateLimit-Reset
    const rlReset =
      typeof (headers as Headers).get === "function"
        ? (headers as Headers).get("x-ratelimit-reset")
        : recordHeaders["x-ratelimit-reset"] || recordHeaders["X-RateLimit-Reset"];

    if (rlReset) {
      const ts = Number.parseInt(rlReset, 10);
      if (!Number.isNaN(ts)) {
        return ts > 10000000000 ? ts : ts * 1000;
      }
    }
    return null;
  }

  function detectRetryHint(): {
    retryAfterMs: number;
    provenance: RetryHintProvenance;
  } | null {
    const resetTime = parseResetFromHeaders(headers);
    if (resetTime) {
      const waitMs = Math.max(resetTime - Date.now(), 0);
      if (waitMs > 0) return { retryAfterMs: waitMs, provenance: "header" };
    }

    const detailedJsonHint = parseDetailedRetryHintFromJsonBody(errorStr, MAX_PROVIDER_COOLDOWN_MS);
    if (detailedJsonHint) {
      return {
        retryAfterMs: detailedJsonHint.retryAfterMs,
        provenance: detailedJsonHint.provenance,
      };
    }

    const retryFromErrorText = parseRetryFromErrorText(errorStr);
    if (retryFromErrorText && retryFromErrorText > 0) {
      return { retryAfterMs: retryFromErrorText, provenance: "body" };
    }

    return null;
  }

  function getUpstreamRetryHint() {
    return profile?.useUpstreamRetryHints ? detectRetryHint() : null;
  }

  function getScaledBaseCooldown(reason: RateLimitReasonValue, level = backoffLevel) {
    void reason;
    const baseCooldownMs =
      typeof profile?.baseCooldownMs === "number" && profile.baseCooldownMs >= 0
        ? profile.baseCooldownMs
        : COOLDOWN_MS.transientInitial;
    // #8396: cap against profile.maxCooldownMs, mirroring the model-lockout path.
    return {
      baseCooldownMs,
      cooldownMs: capScaledCooldownMs(
        getScaledCooldown(baseCooldownMs, level + 1, maxBackoffSteps),
        profile?.maxCooldownMs,
        BACKOFF_CONFIG.max
      ),
      newBackoffLevel: Math.min(level + 1, maxBackoffSteps),
    };
  }

  function buildRetryableFallback(reason: RateLimitReasonValue) {
    const upstreamRetryHint = getUpstreamRetryHint();
    if (upstreamRetryHint && upstreamRetryHint.retryAfterMs > 0) {
      return {
        shouldFallback: true,
        cooldownMs: upstreamRetryHint.retryAfterMs,
        baseCooldownMs: upstreamRetryHint.retryAfterMs,
        newBackoffLevel: 0,
        usedUpstreamRetryHint: true,
        retryHintSource: upstreamRetryHint.provenance,
        reason,
      };
    }

    const ro = rot.overrideFor(reason, rotation?.account);
    if (ro) return ro;
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
  const preserveQuota429 = shouldPreserveQuotaSignals(provider, errorText);
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

    // A retired model (Gemini deprecated-model 404, Fireworks/etc. end-of-life 410)
    // will fail identically on every future request — lock it for a long, fixed
    // window instead of falling through to the generic transient-error branch's
    // short backoff, which would otherwise keep re-selecting a permanently dead
    // model roughly every cooldown window, all day, hammering the provider with
    // guaranteed-to-fail requests (see MODEL_PERMANENTLY_UNAVAILABLE_PATTERNS).
    // `quotaResetHintMs` flows into combo.ts's per-request model-lockout as an
    // upstream-verified reset, so it is honored in full and not clamped to the
    // normal ~20min model-lockout ceiling.
    if (
      (status === HTTP_STATUS.NOT_FOUND || status === HTTP_STATUS.GONE) &&
      isModelPermanentlyUnavailable(errorStr)
    ) {
      const cooldownMs = 24 * 60 * 60 * 1000; // 24h
      return {
        shouldFallback: true,
        cooldownMs,
        reason: "not_found",
        quotaResetHintMs: cooldownMs,
      };
    }

    // The provider's API endpoint/base_url has permanently moved — every future
    // request against the stale base_url fails identically, so lock it for a
    // long, fixed window instead of the generic transient-error branch's short
    // backoff (see ENDPOINT_PERMANENTLY_MOVED_PATTERNS).
    if (isEndpointPermanentlyMoved(errorStr)) {
      const cooldownMs = 24 * 60 * 60 * 1000; // 24h
      return {
        shouldFallback: true,
        cooldownMs,
        reason: "not_found",
        quotaResetHintMs: cooldownMs,
      };
    }

    // The account is suspended for a billing reason (unpaid invoice, spending
    // limit) that varies per provider/account name and can arrive on a status
    // checkFallbackError does not otherwise classify (e.g. Fireworks 412) —
    // treat it like a credits-exhausted account so it stops being retried
    // every few minutes until billing is fixed (see ACCOUNT_SUSPENDED_BILLING_PATTERNS).
    if (isAccountSuspendedForBilling(errorStr)) {
      return {
        shouldFallback: true,
        cooldownMs: COOLDOWN_MS.paymentRequired ?? 3600 * 1000, // 1h cooldown
        reason: RateLimitReason.QUOTA_EXHAUSTED,
        creditsExhausted: true,
      };
    }

    // Gemini-specific check — MUST run before isCreditsExhausted/
    // isDailyQuotaExhausted/the generic text classifier below: Gemini's free-
    // tier 429 boilerplate literally says "You exceeded your current quota,
    // please check your plan and billing details" for EVERY limit type
    // (RPM/TPM/RPD alike), which collides with CREDITS_EXHAUSTED_SIGNALS'
    // `"exceeded your current quota"` entry (added for OpenAI-style terminal
    // billing errors) — that generic check would otherwise short-circuit
    // straight to QUOTA_EXHAUSTED before this Gemini-specific block ever runs
    // (#7360). Gated on provider === "gemini" so it cannot affect any other
    // provider's genuine credits-exhausted classification.
    //
    // Preference order:
    //  1. The upstream error text's own metric name (authoritative — it is
    //     Google's own signal, e.g. "...free_tier_input_token_count..." = TPM).
    //     Required because the local per-model counters below only increment
    //     on a SUCCESSFUL response; a request that gets rejected — especially
    //     the first of several concurrent requests racing to trip the same
    //     per-minute limit — never contributes to the counter, so it can read
    //     0 at the exact moment it needs to report exhaustion.
    //  2. Local per-model counters, when the text names no metric.
    if (provider === "gemini" && status === HTTP_STATUS.RATE_LIMITED && _model) {
      const metricClass = classifyGeminiQuotaMetricFromText(errorStr);
      if (metricClass === "rpd") {
        return buildRetryableFallback(RateLimitReason.QUOTA_EXHAUSTED);
      }
      if (metricClass === "rpm" || metricClass === "tpm") {
        return buildRetryableFallback(RateLimitReason.RATE_LIMIT_EXCEEDED);
      }
      if (isRpdExhausted(_model)) {
        return buildRetryableFallback(RateLimitReason.QUOTA_EXHAUSTED);
      }
      if (isRpmExhausted(_model)) {
        return buildRetryableFallback(RateLimitReason.RATE_LIMIT_EXCEEDED);
      }
      if (isTpmExhausted(_model)) {
        return buildRetryableFallback(RateLimitReason.RATE_LIMIT_EXCEEDED);
      }
    }

    // T10 (sub2api #1169) + #8247: credits/quota exhausted; *-compatible-* nicknames stay model-scoped
    // unless the body is an account-level Open Platform empty wallet.
    if (
      shouldUseQuotaSignal &&
      isCreditsExhausted(errorStr) &&
      (!isCompatibleProvider(provider) || isMoonshotAccountBalanceExhausted(errorStr))
    ) {
      return {
        shouldFallback: true,
        cooldownMs: COOLDOWN_MS.paymentRequired ?? 3600 * 1000, // 1h cooldown
        reason: RateLimitReason.QUOTA_EXHAUSTED,
        creditsExhausted: true,
      };
    }

    // Daily quota exhausted. TPD uses the node clock / header; other daily
    // quota text still uses getMsUntilTomorrow. TPD without either is not a
    // host-midnight lock — fall through to short 429.
    if (shouldUseQuotaSignal && isDailyQuotaExhausted(errorStr)) {
      if (isTpdRateLimit(errorStr)) {
        const headerResetAtMs = parseResetFromHeaders(headers);
        const tpdMs = resolveTpdCooldownMs(errorStr, {
          timezone: dailyReset?.timezone,
          hour: dailyReset?.hour,
          nowMs: dailyReset?.nowMs,
          headerResetAtMs,
        });
        if (tpdMs == null) {
          // no clock, no header — short 429, do not guess midnight
          console.warn(
            "[accountFallback] TPD 429 without node daily-reset clock or Reset header; using short cooldown",
            { provider },
          );
        } else {
          return {
            shouldFallback: true,
            cooldownMs: tpdMs,
            reason: RateLimitReason.QUOTA_EXHAUSTED,
            dailyQuotaExhausted: true,
          };
        }
      } else {
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
    }

    // Issue #2321 (5h subscription quota) + Issue #3709 (ollama-cloud weekly
    // cap): both classifiers live in quotaTextCooldowns.ts (this file is
    // frozen at its file-size-baseline cap). The weekly check runs
    // UNCONDITIONALLY (not gated by shouldUseQuotaSignal) because it targets
    // apikey-category providers like ollama-cloud, which the oauth-only
    // shouldUseQuotaSignal gate deliberately excludes from the subscription
    // check above.
    if (shouldUseQuotaSignal && !isCreditsExhausted(errorStr) && !isDailyQuotaExhausted(errorStr)) {
      const subResult = buildSubscriptionQuotaFallback(
        errorStr,
        () => getUpstreamRetryHint()?.retryAfterMs ?? null,
        parseRetryFromErrorText,
        provider
      );
      if (subResult) return subResult;
    }
    const weeklyResult = buildWeeklyQuotaFallback(errorStr);
    if (weeklyResult) return weeklyResult;
    // Issue #7071 (session usage cap) is the same sibling gap as #3709 above —
    // runs UNCONDITIONALLY for the same reason: apikey-category providers
    // like ollama-cloud are excluded from the oauth-only shouldUseQuotaSignal
    // gate.
    const sessionResult = buildSessionQuotaFallback(errorStr);
    if (sessionResult) return sessionResult;

    const detectedRetryHint = detectRetryHint();
    const quotaResetHintMs = detectedRetryHint?.retryAfterMs ?? parseRetryFromErrorText(errorStr);
    const quotaResetHintSource: RetryHintProvenance | undefined = detectedRetryHint
      ? detectedRetryHint.provenance
      : quotaResetHintMs
        ? "body"
        : undefined;
    if (
      shouldUseQuotaSignal &&
      quotaResetHintMs &&
      classifyErrorText(errorStr) === RateLimitReason.QUOTA_EXHAUSTED
    ) {
      const fallbackResult = buildRetryableFallback(RateLimitReason.QUOTA_EXHAUSTED);
      return {
        ...fallbackResult,
        quotaResetHintMs,
        retryHintSource: fallbackResult.retryHintSource ?? quotaResetHintSource,
      };
    }

    // #2929: A route-restriction 403 (e.g. Fireworks Fire Pass keys returning
    // "Fire Pass API keys are not authorized for this route." on the /models
    // endpoint) means the key is valid but lacks access to THIS route — it still
    // serves chat. It must NOT cool down the connection or be classified as an
    // auth error, otherwise a single model-listing 403 marks the key unavailable.
    if (
      status === HTTP_STATUS.FORBIDDEN &&
      errorStr.toLowerCase().includes("not authorized for this route")
    ) {
      return { shouldFallback: false, cooldownMs: 0, reason: RateLimitReason.UNKNOWN };
    }

    // #10334 — agentrouter EXCLUSIVE: consult the provider rules BEFORE the
    // apikey-FORBIDDEN early-return below, so a recognized 403 body (e.g.
    // "无权访问模型") carries the rule's declared reason/cooldown/scope instead of
    // the generic short auth cooldown. Gated on honorsRuleLockScope — for any
    // other provider this block is a no-op and the early-return stays identical.
    if (status === HTTP_STATUS.FORBIDDEN && provider && honorsRuleLockScope(provider)) {
      const forbiddenMatch = getProviderErrorRuleMatch(
        provider,
        status,
        headers,
        resolveRuleMatchBody(provider, structuredError ?? null, errorStr)
      );
      if (forbiddenMatch) {
        const scaled = getScaledBaseCooldown(
          forbiddenMatch.reason as RateLimitReasonValue,
          backoffLevel
        );
        const ruleCooldownMs = forbiddenMatch.cooldownMs;
        return {
          shouldFallback: true,
          cooldownMs: ruleCooldownMs ?? scaled.cooldownMs,
          baseCooldownMs: ruleCooldownMs ?? scaled.baseCooldownMs,
          configuredCooldownMs: ruleCooldownMs,
          newBackoffLevel: ruleCooldownMs !== undefined ? 0 : scaled.newBackoffLevel,
          reason: forbiddenMatch.reason,
          ruleScope: forbiddenMatch.scope,
        };
      }
    }

    if (
      status === HTTP_STATUS.FORBIDDEN &&
      provider &&
      getProviderCategory(provider) === "apikey" &&
      !errorStr.toLowerCase().includes("has not been used in project") &&
      !errorStr.toLowerCase().includes("hour quota") &&
      !errorStr.toLowerCase().includes("quota has been exceeded")
    ) {
      return resolveApiKeyForbiddenFallback(
        errorStr,
        buildRetryableFallback,
        RateLimitReason.AUTH_ERROR
      );
    }
  }

  const configuredRule =
    isRateLimitStatus && !preserveQuota429
      ? matchErrorRuleByStatus(status)
      : findMatchingErrorRule(status, errorStr);
  if (configuredRule) {
    if (configuredRule.backoff) {
      // Provider-specific rules in `providerRuleRegistry` are MORE SPECIFIC
      // than the configured (global) rule, so we check them first. If a
      // provider rule matches, it overrides the configured rule's reason
      // (e.g. Opencode's `x-ratelimit-remaining-requests: 0` overrides
      // 429 → RATE_LIMIT_EXCEEDED). We do NOT call the full `classifyError`
      // here because its global status fallback would otherwise override
      // specific configured reasons (e.g. 503 → SERVER_ERROR would be
      // shadowed by 503 → MODEL_CAPACITY).
      const providerMatch = provider
        ? getProviderErrorRuleMatch(
            provider,
            status,
            headers,
            resolveRuleMatchBody(provider, structuredError ?? null, errorStr)
          )
        : null;
      const reason = providerMatch
        ? providerMatch.reason
        : (configuredRule.reason ?? RateLimitReason.UNKNOWN);
      // Fix C: thread `providerMatch.cooldownMs` through so a configured rule
      // like the "Monthly usage limit reached. Resets in N days." matcher can
      // declare an explicit cooldown (e.g. 13 days) and have it win over the
      // scaled backoff default returned by `buildRetryableFallback`. Without
      // this, the rule's reason is used but its cooldownMs is silently
      // dropped — which is exactly the user-visible bug where a 13-day
      // upstream quota reset was being treated as ~60s.
      const providerCooldownMs =
        providerMatch?.cooldownMs !== undefined && providerMatch.cooldownMs > 0
          ? providerMatch.cooldownMs
          : undefined;
      const ruleScope =
        providerMatch && honorsRuleLockScope(provider) ? providerMatch.scope : undefined;
      const fallback = buildRetryableFallback(reason);
      if (providerCooldownMs !== undefined) {
        return {
          ...fallback,
          cooldownMs: providerCooldownMs,
          baseCooldownMs: providerCooldownMs,
          configuredCooldownMs: providerCooldownMs,
          ruleScope,
        };
      }
      return { ...fallback, ruleScope };
    }
    // #6842: non-backoff configured rules (e.g. status_402) previously never
    // consulted providerRuleRegistry, so a provider-specific rule (like
    // OpenRouter's credit-exhausted 402 lock) could never override the
    // generic zero-cooldown default. Mirror the backoff branch above so
    // provider rules win on cooldown/reason regardless of `backoff`.
    const providerMatch = provider
      ? getProviderErrorRuleMatch(
          provider,
          status,
          headers,
          resolveRuleMatchBody(provider, structuredError ?? null, errorStr)
        )
      : null;
    const cooldownMs = providerMatch?.cooldownMs ?? configuredRule.cooldownMs ?? 0;
    const ruleScope =
      providerMatch && honorsRuleLockScope(provider) ? providerMatch.scope : undefined;
    return {
      shouldFallback: true,
      cooldownMs,
      baseCooldownMs: cooldownMs,
      configuredCooldownMs: cooldownMs,
      reason: providerMatch?.reason ?? configuredRule.reason ?? RateLimitReason.UNKNOWN,
      ruleScope,
    };
  }

  if (status === HTTP_STATUS.NOT_ACCEPTABLE || retryableStatuses.has(status)) {
    return buildRetryableFallback(RateLimitReason.SERVER_ERROR);
  }

  // 432 -- plan limit reached (e.g. Tavily, Context7, and search upstreams)
  if (status === HTTP_STATUS.PLAN_LIMIT_EXCEEDED) {
    const subResult = buildSubscriptionQuotaFallback(
      errorStr,
      () => getUpstreamRetryHint()?.retryAfterMs ?? null,
      parseRetryFromErrorText,
      provider
    );
    if (subResult) return subResult;
    const cooldownMs = getUpstreamRetryHint()?.retryAfterMs ?? SUBSCRIPTION_QUOTA_COOLDOWN_MS;
    return {
      shouldFallback: true,
      cooldownMs,
      baseCooldownMs: cooldownMs,
      reason: RateLimitReason.QUOTA_EXHAUSTED,
    };
  }

  // 400 — context overflow / malformed request / model access denied
  if (status === HTTP_STATUS.BAD_REQUEST) {
    // Check structured error codes first (more reliable, no false positives)
    // OpenAI:  error.code === "model_not_found"
    // Anthropic: error.type === "not_found_error" / "permission_error"
    const structuredCode =
      typeof structuredError?.code === "string" ? structuredError.code.toLowerCase() : "";
    const structuredType =
      typeof structuredError?.type === "string" ? structuredError.type.toLowerCase() : "";
    // A clear bad-credential error must never be reclassified as model-access
    // (which would silently exhaust every combo target). Structured detection
    // below still catches genuine model_not_found / not_found_error codes.
    const looksLikeAuthCredentialError = AUTH_CREDENTIAL_ERROR_PATTERNS.some((p) =>
      p.test(errorStr)
    );
    const matchesModelAccessPattern =
      !looksLikeAuthCredentialError && MODEL_ACCESS_DENIED_PATTERNS.some((p) => p.test(errorStr));

    const isModelAccessDeniedStructured =
      !!structuredError &&
      (MODEL_ACCESS_DENIED_CODES.has(structuredCode) ||
        MODEL_ACCESS_DENIED_TYPES.has(structuredType) ||
        // Ambiguous types (e.g. Anthropic permission_error) only count as a model
        // access denial when the message text confirms it is about the model.
        (MODEL_ACCESS_AMBIGUOUS_TYPES.has(structuredType) && matchesModelAccessPattern));

    const isOverflow = CONTEXT_OVERFLOW_PATTERNS.some((p) => p.test(errorStr));
    const isMalformed = MALFORMED_REQUEST_PATTERNS.some((p) => p.test(errorStr));
    const isParamValidation = PARAM_VALIDATION_PATTERNS.some((p) => p.test(errorStr));
    const isModelAccessDenied = isModelAccessDeniedStructured || matchesModelAccessPattern;
    const isNimDegraded = isNimFunctionDegraded(errorStr);
    if (isOverflow || isMalformed || isParamValidation || isModelAccessDenied || isNimDegraded) {
      return {
        shouldFallback: true,
        cooldownMs: 0,
        reason: RateLimitReason.MODEL_CAPACITY,
      };
    }

    // Some providers (e.g. MiMoCode) signal throttling with a non-standard 400 whose
    // body carries rate-limit semantics ("Detected high-frequency non-compliant
    // requests from you.") instead of a 429. Detected here (AFTER malformed/overflow
    // detection above, so a genuinely malformed 400 still wins and keeps its #2101
    // zero-cooldown MODEL_CAPACITY classification), it is fallback-worthy at
    // connection-cooldown scope so combo can fail over to another target (#4976).
    if (RATE_LIMIT_TEXT_PATTERNS.some((p) => p.test(errorStr))) {
      return buildRetryableFallback(RateLimitReason.RATE_LIMIT_EXCEEDED);
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
 * Normalize a stored cooldown timestamp to epoch milliseconds.
 *
 * `rate_limited_until` is a TEXT column, but some write paths persist a raw
 * epoch NUMBER (e.g. `setConnectionRateLimitUntil` on the Antigravity full-quota
 * path). SQLite TEXT affinity coerces it to a numeric string like
 * "1781696905131.0", which `new Date(...)` cannot parse (→ NaN). Accept numeric
 * epoch strings/numbers as well as ISO strings and Date objects (#3954).
 */
export function cooldownUntilMs(value: string | number | Date | null | undefined): number {
  if (value === null || value === undefined || value === "") return NaN;
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  const raw = value.trim();
  if (COOLDOWN_NUMERIC_RE.test(raw)) return Number(raw);
  return new Date(raw).getTime();
}

/**
 * Check if account is currently unavailable (cooldown not expired)
 */
export function isAccountUnavailable(unavailableUntil: string | Date | null | undefined): boolean {
  if (!unavailableUntil) return false;
  const ms = cooldownUntilMs(unavailableUntil);
  return Number.isFinite(ms) && ms > Date.now();
}

/**
 * Calculate unavailable until timestamp
 */
export function getUnavailableUntil(cooldownMs: number): string {
  return new Date(Date.now() + cooldownMs).toISOString();
}

/**
 * Get the earliest rateLimitedUntil from a list of accounts
 */
export function getEarliestRateLimitedUntil(
  accounts: Array<{ rateLimitedUntil?: string | null }>
): string | null {
  let earliest: number | null = null;
  const now = Date.now();
  for (const acc of accounts) {
    if (!acc.rateLimitedUntil) continue;
    const until = cooldownUntilMs(acc.rateLimitedUntil);
    if (!Number.isFinite(until) || until <= now) continue;
    if (!earliest || until < earliest) earliest = until;
  }
  if (!earliest) return null;
  return new Date(earliest).toISOString();
}

/**
 * Format rateLimitedUntil to human-readable "reset after Xm Ys"
 */
export function formatRetryAfter(
  rateLimitedUntil: string | number | Date | null | undefined
): string {
  if (!rateLimitedUntil) return "";
  const diffMs = new Date(rateLimitedUntil).getTime() - Date.now();
  if (diffMs <= 0) return "reset after 0s";
  const totalSec = Math.ceil(diffMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);
  return `reset after ${parts.join(" ")}`;
}

/**
 * Filter available accounts (not in cooldown)
 */
export function filterAvailableAccounts<T extends AccountState>(
  accounts: T[],
  excludeId: string | null = null
): T[] {
  const now = Date.now();
  return accounts.filter((acc) => {
    if (excludeId && acc.id === excludeId) return false;
    if (acc.rateLimitedUntil) {
      const until = cooldownUntilMs(acc.rateLimitedUntil);
      if (Number.isFinite(until) && until > now) return false;
    }
    return true;
  });
}

/**
 * Reset account state when request succeeds
 */
export function resetAccountState<T extends AccountState | null | undefined>(
  account: T
): T | AccountState {
  if (!account) return account;
  // Persist the cooldown clear so a successfully-retried connection is no longer
  // marked as rate-limited in `provider_connections.rate_limited_until`. Mirrors
  // Fix A: the in-memory AccountState and the DB row must agree so the cascade
  // survives the request boundary and `clearStaleCrashCooldowns` doesn't have
  // to rediscover what we already know is healthy.
  // Best-effort: a DB write failure must not crash the request path.
  const connId = (account as AccountState | null | undefined)?.id;
  if (typeof connId === "string" && connId.length > 0) {
    try {
      setConnectionRateLimitUntil(connId, null);
    } catch {
      // ignore — best effort
    }
  }
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
export function applyErrorState<T extends AccountState | null | undefined>(
  account: T,
  status: number,
  errText: string | null,
  prov: string | null = null
): T | AccountState {
  if (!account) return account;

  const lvl = account.backoffLevel || 0;
  const fallbackDecision = checkFallbackError(status, errText, lvl, null, prov, null, null, null, {
    account,
  });
  const { cooldownMs, reason } = fallbackDecision;
  const newBackoffLevel =
    "newBackoffLevel" in fallbackDecision ? fallbackDecision.newBackoffLevel : undefined;

  // Cooldown may be overridden by a configured provider rule (see
  // `accountFallback.ts:1511-1540` provider-match branch + the
  // `providerMatch.cooldownMs` thread-through added by Fix C). When the
  // configured rule sets an explicit cooldownMs, it wins over the scaled
  // backoff default that `checkFallbackError` returned.
  const configuredCooldownMs =
    "configuredCooldownMs" in fallbackDecision
      ? (fallbackDecision as { configuredCooldownMs?: number }).configuredCooldownMs
      : undefined;
  const effectiveCooldownMs =
    typeof configuredCooldownMs === "number" && configuredCooldownMs > 0
      ? configuredCooldownMs
      : cooldownMs;

  const nextState: T | AccountState = {
    ...account,
    rateLimitedUntil: effectiveCooldownMs > 0 ? getUnavailableUntil(effectiveCooldownMs) : null,
    backoffLevel: newBackoffLevel ?? lvl,
    lastError: { status, message: errText, timestamp: new Date().toISOString(), reason },
    status: "error",
  };

  // Persist the cooldown to `provider_connections.rate_limited_until` so the
  // cascade survives the request boundary. Before Fix A the cooldown only
  // lived in the in-memory AccountState object returned here, which was
  // discarded the moment the request ended — the same exhausted key was
  // re-picked on the very next request.
  // Best-effort try/catch mirrors `open-sse/executors/antigravity.ts:343`
  // (`markConnectionQuotaExhausted`) so a DB failure can never crash the
  // chat path. See issue #1 (per-account 429 cascade not persisting).
  const connId = (account as AccountState | null | undefined)?.id;
  if (typeof connId === "string" && connId.length > 0 && effectiveCooldownMs > 0 && nextState.rateLimitedUntil && !isAntigravityQuotaProvider(prov)) {
    try {
      const untilMs = cooldownUntilMs(nextState.rateLimitedUntil);
      if (Number.isFinite(untilMs) && untilMs > Date.now()) {
        setConnectionRateLimitUntil(connId, untilMs);
      }
    } catch {
      // ignore — best effort
    }
  }

  return nextState;
}

export { isAccountSemaphoreFull } from "./accountSemaphore.ts";

/**
 * Get account health score (0-100) for P2C selection (Phase 9)
 * @param {object} account
 * @returns {number} score 0 = unhealthy, 100 = perfectly healthy
 */
export function getAccountHealth(
  account: AccountState | null | undefined,
  model?: unknown
): number {
  if (!account) return 0;
  let score = 100;
  score -= (account.backoffLevel || 0) * 10;
  if (account.lastError) score -= 20;
  if (account.rateLimitedUntil && isAccountUnavailable(account.rateLimitedUntil)) score -= 30;
  return Math.max(0, score);
}
