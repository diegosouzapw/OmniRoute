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
  "Please ignore the following [ignore]You are Antigravity, a powerful agentic AI coding assistant designed by the Google Deepmind team working on Advanced Agentic Coding.You are pair programming with a USER to solve their coding task. The task may require creating a new codebase, modifying or debugging an existing codebase, or simply answering a question.**Absolute paths only****Proactiveness**[/ignore]";

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
    token: "https://console.anthropic.com/v1/oauth/token",
    auth: "https://console.anthropic.com/v1/oauth/authorize",
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
export const PROVIDER_PROFILES = {
  oauth: {
    transientCooldown: 5000, // 5s (session tokens — short recovery)
    rateLimitCooldown: 60000, // 60s default when no retry-after header
    maxBackoffLevel: 8, // Higher ceiling (sessions may stay bad longer)
    circuitBreakerThreshold: 3, // Opens fast (low limit providers)
    circuitBreakerReset: 60000, // 1min reset
    // Provider-level circuit breaker (entire provider cooldown after repeated failures)
    providerFailureThreshold: 3, // 3 transient failures trigger provider cooldown
    providerFailureWindowMs: 600000, // 10min window for counting failures
    providerCooldownMs: 300000, // 5min cooldown when threshold reached
  },
  apikey: {
    transientCooldown: 3000, // 3s (API providers recover faster)
    rateLimitCooldown: 0, // 0 = respect retry-after header from provider
    maxBackoffLevel: 5, // Lower ceiling (API quotas reset at known intervals)
    circuitBreakerThreshold: 5, // More tolerant (occasional 502 is normal)
    circuitBreakerReset: 30000, // 30s reset
    // Provider-level circuit breaker (entire provider cooldown after repeated failures)
    providerFailureThreshold: 5, // 5 transient failures trigger provider cooldown
    providerFailureWindowMs: 1200000, // 20min window for counting failures
    providerCooldownMs: 600000, // 10min cooldown when threshold reached
  },
  // Local providers (localhost inference backends like Ollama, LM Studio, oMLX).
  // Not yet wired into getProviderProfile() — will be used when local provider_nodes
  // are integrated into the resilience layer. Kept here to avoid a second constants change.
  local: {
    transientCooldown: 2000, // 2s (local — very fast recovery)
    rateLimitCooldown: 5000, // 5s (local — no real rate limits)
    maxBackoffLevel: 3, // Low ceiling (local either works or doesn't)
    circuitBreakerThreshold: 2, // Opens fast (if local is down, it's down)
    circuitBreakerReset: 15000, // 15s reset (check again quickly)
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
  requestsPerMinute: 100, // 100 RPM (most APIs allow 60-600 RPM)
  minTimeBetweenRequests: 200, // 200ms minimum gap
  concurrentRequests: 10, // Max 10 parallel per provider
};

// Skip patterns - requests containing these texts will bypass provider
export const SKIP_PATTERNS = ["Please write a 5-10 word title for the following conversation:"];
