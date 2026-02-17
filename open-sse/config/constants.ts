import { loadProviderCredentials } from "./credentialLoader.ts";

// Timeout for non-streaming fetch requests (ms). Prevents stalled connections.
export const FETCH_TIMEOUT_MS = parseInt(process.env.FETCH_TIMEOUT_MS || "120000", 10);

// Idle timeout for SSE streams (ms). Closes stream if no data for this duration.
export const STREAM_IDLE_TIMEOUT_MS = parseInt(process.env.STREAM_IDLE_TIMEOUT_MS || "60000", 10);

// Provider configurations
// OAuth credentials read from env vars with hardcoded fallbacks for backward compatibility.
// Use provider-credentials.json or env vars to override in production.
import { generateLegacyProviders } from "./providerRegistry.ts";

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
  iflow: {
    token: "https://iflow.cn/oauth/token",
    auth: "https://iflow.cn/oauth",
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

// OpenAI-compatible error types mapping
export const ERROR_TYPES = {
  [HTTP_STATUS.BAD_REQUEST]: { type: "invalid_request_error", code: "bad_request" },
  [HTTP_STATUS.UNAUTHORIZED]: { type: "authentication_error", code: "invalid_api_key" },
  [HTTP_STATUS.FORBIDDEN]: { type: "permission_error", code: "insufficient_quota" },
  [HTTP_STATUS.NOT_FOUND]: { type: "invalid_request_error", code: "model_not_found" },
  [HTTP_STATUS.RATE_LIMITED]: { type: "rate_limit_error", code: "rate_limit_exceeded" },
  [HTTP_STATUS.SERVER_ERROR]: { type: "server_error", code: "internal_server_error" },
  [HTTP_STATUS.BAD_GATEWAY]: { type: "server_error", code: "bad_gateway" },
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: { type: "server_error", code: "service_unavailable" },
  [HTTP_STATUS.GATEWAY_TIMEOUT]: { type: "server_error", code: "gateway_timeout" },
};

// Default error messages per status code
export const DEFAULT_ERROR_MESSAGES = {
  [HTTP_STATUS.BAD_REQUEST]: "Bad request",
  [HTTP_STATUS.UNAUTHORIZED]: "Invalid API key provided",
  [HTTP_STATUS.FORBIDDEN]: "You exceeded your current quota",
  [HTTP_STATUS.NOT_FOUND]: "Model not found",
  [HTTP_STATUS.RATE_LIMITED]: "Rate limit exceeded",
  [HTTP_STATUS.SERVER_ERROR]: "Internal server error",
  [HTTP_STATUS.BAD_GATEWAY]: "Bad gateway - upstream provider error",
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: "Service temporarily unavailable",
  [HTTP_STATUS.GATEWAY_TIMEOUT]: "Gateway timeout",
};

// Exponential backoff config for rate limits (like CLIProxyAPI)
export const BACKOFF_CONFIG = {
  base: 1000, // 1 second base
  max: 2 * 60 * 1000, // 2 minutes max
  maxLevel: 15, // Cap backoff level
};

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

// Error-based cooldown times (aligned with CLIProxyAPI)
export const COOLDOWN_MS = {
  unauthorized: 2 * 60 * 1000, // 401 → 2 min
  paymentRequired: 2 * 60 * 1000, // 402/403 → 2 min
  notFound: 2 * 60 * 1000, // 404 → 2 minutes
  transientInitial: 5 * 1000, // 408/500/502/503/504 first hit → 5s (backoff from here)
  transientMax: 60 * 1000, // 502/503/504 backoff ceiling → 60s
  transient: 5 * 1000, // Legacy alias → points to transientInitial
  requestNotAllowed: 5 * 1000, // "Request not allowed" → 5 sec
  // Legacy aliases for backward compatibility
  rateLimit: 2 * 60 * 1000,
  serviceUnavailable: 2 * 1000,
  authExpired: 2 * 60 * 1000,
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
  },
  apikey: {
    transientCooldown: 3000, // 3s (API providers recover faster)
    rateLimitCooldown: 0, // 0 = respect retry-after header from provider
    maxBackoffLevel: 5, // Lower ceiling (API quotas reset at known intervals)
    circuitBreakerThreshold: 5, // More tolerant (occasional 502 is normal)
    circuitBreakerReset: 30000, // 30s reset
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
