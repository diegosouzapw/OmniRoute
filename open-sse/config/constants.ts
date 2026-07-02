import { getUpstreamTimeoutConfig } from "@/shared/utils/runtimeTimeouts";
import { loadProviderCredentials } from "./credentialLoader.ts";
import { generateLegacyProviders } from "./providerRegistry.ts";

const upstreamTimeouts = getUpstreamTimeoutConfig(process.env, (message) => {
  console.warn(`[open-sse] ${message}`);
});

// Timeout for receiving the initial upstream response (ms).
// After headers arrive, active SSE streams are governed by STREAM_IDLE_TIMEOUT_MS
// and Undici's bodyTimeout instead of this one-shot startup timer.
export const FETCH_TIMEOUT_MS = upstreamTimeouts.fetchTimeoutMs;

// Idle timeout for SSE streams (ms). Before a stream is accepted, the same
// budget is used to wait for the first useful event so HTTP 200 zombie streams
// can fail fast and trigger fallback. After startup, it closes streams that go
// idle for this duration. Override with STREAM_IDLE_TIMEOUT_MS env var.
export const STREAM_IDLE_TIMEOUT_MS = upstreamTimeouts.streamIdleTimeoutMs;

// Timeout for the first non-ping SSE event. Inherits REQUEST_TIMEOUT_MS when
// set, unless STREAM_READINESS_TIMEOUT_MS is specified directly. This must stay
// conservative for large prompts and slow first-byte reasoning providers.
export const STREAM_READINESS_TIMEOUT_MS = upstreamTimeouts.streamReadinessTimeoutMs;

// Error code used when an upstream Antigravity request stalls before response
// headers are returned. Keep it shared so executor, core normalization and
// account fallback detection cannot drift.
export const ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE = "ANTIGRAVITY_PRE_RESPONSE_TIMEOUT";

// Heartbeat interval for synthetic SSE keepalive emission toward the downstream
// client (Capy, Claude Code, OpenAI SDK, etc). Keeps strict proxies from
// dropping the connection during long upstream thinking phases. Set to 0 to
// disable. Override with SSE_HEARTBEAT_INTERVAL_MS env var.
export const SSE_HEARTBEAT_INTERVAL_MS = upstreamTimeouts.sseHeartbeatIntervalMs;

// Timeout for reading the full response body after headers arrive (ms).
// Prevents indefinite hangs when the upstream sends headers but stalls on the body.
// Defaults to FETCH_TIMEOUT_MS. Override with FETCH_BODY_TIMEOUT_MS env var.
export const FETCH_BODY_TIMEOUT_MS = upstreamTimeouts.fetchBodyTimeoutMs;

// Provider configurations
// OAuth credentials read from env vars with hardcoded fallbacks for backward compatibility.
// Use provider-credentials.json or env vars to override in production.
export const PROVIDERS = generateLegacyProviders();

// Merge external credentials from data/provider-credentials.json (if present)
loadProviderCredentials(PROVIDERS);

// Claude system prompt
export const CLAUDE_SYSTEM_PROMPT = "You are Claude Code, Anthropic's official CLI for Claude.";

// Antigravity default system prompt (required for API to work)
export const ANTIGRAVITY_DEFAULT_SYSTEM =
  "You are Antigravity, a powerful agentic AI coding assistant designed by the Google Deepmind team working on Advanced Agentic Coding.\n" +
  "You are pair programming with a USER to solve their coding task. The task may require creating a new codebase, modifying or debugging an existing codebase, or simply answering a question.\n" +
  "**Absolute paths only**\n" +
  "**Proactiveness**";

// OAuth endpoints
export const OAUTH_ENDPOINTS = {
  google: {
    token: "https://oauth2.googleapis.com/token",
    auth: "https://accounts.google.com/o/oauth2/auth",
  },
  openai: {
    token: "https://auth.openai.com/oauth/token",
    auth: "https://auth.openai.com/oauth/authorize",
  },
  anthropic: {
    token: "https://api.anthropic.com/v1/oauth/token",
    auth: "https://api.anthropic.com/v1/oauth/authorize",
  },
  qwen: {
    token: "https://chat.qwen.ai/api/v1/oauth2/token", // From CLIProxyAPI
    auth: "https://chat.qwen.ai/api/v1/oauth2/device/code", // From CLIProxyAPI
  },
  qoder: {
    token: process.env.QODER_OAUTH_TOKEN_URL || "",
    auth: process.env.QODER_OAUTH_AUTHORIZE_URL || "",
  },
  github: {
    token: "https://github.com/login/oauth/access_token",
    auth: "https://github.com/login/oauth/authorize",
    deviceCode: "https://github.com/login/device/code",
  },
};

// Cache TTLs (seconds)
export const CACHE_TTL = {
  userInfo: 300, // 5 minutes
  modelAlias: 3600, // 1 hour
};

// Default max tokens
export const DEFAULT_MAX_TOKENS = 64000;

// Minimum max tokens for tool calling (to prevent truncated arguments)
export const DEFAULT_MIN_TOKENS = 32000;

export const PROVIDER_MAX_TOKENS: Record<string, number> = {
  groq: 16384, // Groq strict per-model enforcement
  openai: 16384, // GPT-4/4o standard
  anthropic: 65536, // Claude models
  gemini: 65536, // Gemini Studio
};

export const DEFAULT_PROVIDER_MAX_TOKENS = 32000;

// HTTP status codes
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  RATE_LIMITED: 429,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};
export {
  BACKOFF_CONFIG,
  COOLDOWN_MS,
  DEFAULT_ERROR_MESSAGES,
  ERROR_RULES,
  ERROR_TYPES,
  TRANSIENT_COOLDOWN_MS,
  calculateBackoffCooldown,
  findMatchingErrorRule,
  getDefaultErrorMessage,
  getErrorInfo,
  matchErrorRuleByStatus,
  matchErrorRuleByText,
} from "./errorConfig.ts";

// Configurable backoff steps for rate limits (Phase 1 — enhanced rate limiting)
// Used for per-model lockouts with increasing severity
export const BACKOFF_STEPS_MS = [60_000, 120_000, 300_000, 600_000, 1_200_000];
// 1min → 2min → 5min → 10min → 20min

// Structured error classification for rate limiting decisions
export const RateLimitReason = {
  QUOTA_EXHAUSTED: "quota_exhausted", // Daily/monthly quota depleted
  RATE_LIMIT_EXCEEDED: "rate_limit_exceeded", // RPM/RPD limits hit
  MODEL_CAPACITY: "model_capacity", // Model overloaded (529, 503)
  SERVER_ERROR: "server_error", // 5xx errors
  AUTH_ERROR: "auth_error", // 401, 403
  UNKNOWN: "unknown",
};

// ─── Provider Resilience Profiles ───────────────────────────────────────────
// Separate behavior for OAuth (low-limit, session-based) vs API Key (high-limit, metered)
// Circuit-breaker thresholds and reset windows are overridable via
// OMNIROUTE_CIRCUIT_BREAKER_* env vars so operators can dampen or harden
// behavior without recompiling.
function envInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === null || raw === "") return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export const PROVIDER_PROFILES = {
  oauth: {
    transientCooldown: 5000, // 5s (session tokens — short recovery)
    rateLimitCooldown: 60000, // 60s default when no retry-after header
    maxBackoffLevel: 8, // Higher ceiling (sessions may stay bad longer)
    circuitBreakerThreshold: envInt("OMNIROUTE_CIRCUIT_BREAKER_OAUTH_THRESHOLD", 8),
    circuitBreakerReset: envInt("OMNIROUTE_CIRCUIT_BREAKER_OAUTH_RESET_MS", 60000),
    // Provider-level circuit breaker (entire provider cooldown after repeated failures)
    providerFailureThreshold: 10, // Scaled for 500+ connections (was 3)
    providerFailureWindowMs: 900000, // 15min window (was 10min)
    providerCooldownMs: 300000, // 5min cooldown when threshold reached
    // Adaptive circuit breaker v2 settings
    degradationThreshold: 5, // Enter DEGRADED at this many failures
    maxBackoffMultiplier: 8, // Max 8x resetTimeout escalation
    backoffEscalationCount: 2, // Escalate after 2 open cycles
  },
  apikey: {
    transientCooldown: 3000, // 3s (API providers recover faster)
    rateLimitCooldown: 0, // 0 = respect retry-after header from provider
    maxBackoffLevel: 5, // Lower ceiling (API quotas reset at known intervals)
    circuitBreakerThreshold: envInt("OMNIROUTE_CIRCUIT_BREAKER_API_KEY_THRESHOLD", 12),
    circuitBreakerReset: envInt("OMNIROUTE_CIRCUIT_BREAKER_API_KEY_RESET_MS", 30000),
    // Provider-level circuit breaker (entire provider cooldown after repeated failures)
    providerFailureThreshold: 15, // Scaled for 500+ connections (was 5)
    providerFailureWindowMs: 1800000, // 30min window (was 20min)
    providerCooldownMs: 600000, // 10min cooldown when threshold reached
    degradationThreshold: 7,
    maxBackoffMultiplier: 4,
    backoffEscalationCount: 3,
  },
  // Local providers (localhost inference backends like Ollama, LM Studio, oMLX).
  // Not yet wired into getProviderProfile() — will be used when local provider_nodes
  // are integrated into the resilience layer. Kept here to avoid a second constants change.
  local: {
    transientCooldown: 2000, // 2s (local — very fast recovery)
    rateLimitCooldown: 5000, // 5s (local — no real rate limits)
    maxBackoffLevel: 3, // Low ceiling (local either works or doesn't)
    circuitBreakerThreshold: envInt("OMNIROUTE_CIRCUIT_BREAKER_LOCAL_THRESHOLD", 2),
    circuitBreakerReset: envInt("OMNIROUTE_CIRCUIT_BREAKER_LOCAL_RESET_MS", 15000),
    // Provider-level circuit breaker (entire provider cooldown after repeated failures)
    providerFailureThreshold: 2, // 2 failures trigger provider cooldown
    providerFailureWindowMs: 300000, // 5min window for counting failures
    providerCooldownMs: 60000, // 1min cooldown when threshold reached
  },
};

// Default rate limit values for API Key providers (auto-enabled safety net)
// These are intentionally HIGH — they won't restrict normal usage.
// Real limits are learned from provider response headers.
export const DEFAULT_API_LIMITS = {
  requestsPerMinute: 60, // 60 RPM (reduced from 100 — saves Bottleneck queue memory)
  minTimeBetweenRequests: 350, // 350ms minimum gap (increased from 200)
  concurrentRequests: 6, // Max 6 parallel per provider (reduced from 10)
};

// Skip patterns - requests containing these texts will bypass provider
export const SKIP_PATTERNS = ["Please write a 5-10 word title for the following conversation:"];

// Default maximum number of tools allowed in a request (OpenAI default)
export const MAX_TOOLS_LIMIT = 128;

// ── Credential Health Check ────────────────────────────────────────

/**
 * Interval (ms) for the background credential health check scheduler.
 * Default: 300000 (5 minutes). Minimum: 10000 (10 seconds).
 */
export const CREDENTIAL_HEALTH_CHECK_INTERVAL = (() => {
  const raw = process.env.CREDENTIAL_HEALTH_CHECK_INTERVAL;
  if (raw) {
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed >= 10_000) return parsed;
  }
  return 300_000;
})();

/**
 * TTL (ms) for cached credential health status.
 * After this time, the cache entry expires and the next request will
 * re-check. Default: 300000 (5 minutes).
 */
export const CREDENTIAL_HEALTH_CACHE_TTL = (() => {
  const raw = process.env.CREDENTIAL_HEALTH_CACHE_TTL;
  if (raw) {
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed >= 10_000) return parsed;
  }
  return 300_000;
})();

/**
 * Stream-recovery tuning (opt-in, see ResilienceSettings.streamRecovery).
 *
 * Ported from free-claude-code's always-on recovery (`core/anthropic/stream_recovery.py`).
 * In OmniRoute the holdback is disabled by default because buffering the opening
 * window adds up to HOLDBACK_MS of time-to-first-token latency on every stream;
 * operators opt in via STREAM_RECOVERY_ENABLED / the resilience settings.
 *
 * - HOLDBACK_MS: how long the opening SSE window is held so an early truncation
 *   can be retried transparently before any byte reaches the client.
 * - BUFFER_MAX_BYTES: hard cap on the held window — commit (flush + passthrough)
 *   as soon as this many bytes accumulate, regardless of the timer.
 * - EARLY_RETRY_MAX: max transparent re-opens of the upstream stream while the
 *   holdback is still uncommitted (free-claude-code uses 5 total attempts = 4 retries).
 */
export const STREAM_RECOVERY = {
  HOLDBACK_MS: 750,
  BUFFER_MAX_BYTES: 65536,
  EARLY_RETRY_MAX: 4,
} as const;
