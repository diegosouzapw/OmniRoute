export type ErrorInfo = {
  type: string;
  code: string;
};

export type ConfiguredErrorReason =
  | "auth_error"
  | "quota_exhausted"
  | "rate_limit_exceeded"
  | "model_capacity"
  | "server_error"
  | "unknown";

export type ErrorRule = {
  id: string;
  text?: string;
  status?: number;
  reason?: ConfiguredErrorReason;
  cooldownMs?: number;
  backoff?: boolean;
};

// OpenAI-compatible error types mapping (client-facing)
export const ERROR_TYPES: Record<number, ErrorInfo> = {
  400: { type: "invalid_request_error", code: "bad_request" },
  401: { type: "authentication_error", code: "invalid_api_key" },
  402: { type: "billing_error", code: "payment_required" },
  403: { type: "permission_error", code: "insufficient_quota" },
  404: { type: "invalid_request_error", code: "model_not_found" },
  406: { type: "invalid_request_error", code: "model_not_supported" },
  429: { type: "rate_limit_error", code: "rate_limit_exceeded" },
  500: { type: "server_error", code: "internal_server_error" },
  502: { type: "server_error", code: "bad_gateway" },
  503: { type: "server_error", code: "service_unavailable" },
  504: { type: "server_error", code: "gateway_timeout" },
};

// Default error messages per status code (client-facing)
export const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: "Bad request",
  401: "Invalid API key provided",
  402: "Payment required",
  403: "You exceeded your current quota",
  404: "Model not found",
  406: "Model not supported",
  429: "Rate limit exceeded",
  500: "Internal server error",
  502: "Bad gateway - upstream provider error",
  503: "Service temporarily unavailable",
  504: "Gateway timeout",
};

// Exponential backoff config for rate limits.
// Preserve OmniRoute's existing 2-minute cap to avoid changing runtime behavior.
export const BACKOFF_CONFIG = {
  base: 1000,
  max: 2 * 60 * 1000,
  maxLevel: 15,
};

export const TRANSIENT_COOLDOWN_MS = 5 * 1000;

// Cooldown durations (ms)
export const COOLDOWN_MS = {
  unauthorized: 2 * 60 * 1000,
  paymentRequired: 2 * 60 * 1000,
  notFound: 2 * 60 * 1000,
  notFoundLocal: 5 * 1000,
  transientInitial: TRANSIENT_COOLDOWN_MS,
  transientMax: 60 * 1000,
  transient: TRANSIENT_COOLDOWN_MS,
  requestNotAllowed: 5 * 1000,
  rateLimit: 2 * 60 * 1000,
  serviceUnavailable: 2 * 1000,
  authExpired: 2 * 60 * 1000,
};

/**
 * Shared rules for account fallback classification.
 * Checked top-to-bottom: text rules first, then status rules.
 */
export const ERROR_RULES: ErrorRule[] = [
  {
    id: "no_credentials",
    text: "no credentials",
    cooldownMs: COOLDOWN_MS.notFound,
    reason: "auth_error",
  },
  {
    id: "request_not_allowed",
    text: "request not allowed",
    cooldownMs: COOLDOWN_MS.requestNotAllowed,
    reason: "rate_limit_exceeded",
  },
  {
    id: "improperly_formed_request",
    text: "improperly formed request",
    cooldownMs: 0,
    reason: "model_capacity",
  },
  { id: "rate_limit", text: "rate limit", backoff: true, reason: "rate_limit_exceeded" },
  {
    id: "too_many_requests",
    text: "too many requests",
    backoff: true,
    reason: "rate_limit_exceeded",
  },
  {
    id: "quota_exceeded",
    text: "quota exceeded",
    backoff: true,
    reason: "quota_exhausted",
  },
  {
    id: "quota_will_reset",
    text: "quota will reset",
    backoff: true,
    reason: "quota_exhausted",
  },
  {
    id: "capacity_exhausted",
    text: "exhausted your capacity",
    backoff: true,
    reason: "quota_exhausted",
  },
  {
    id: "quota_exhausted",
    text: "quota exhausted",
    backoff: true,
    reason: "quota_exhausted",
  },
  { id: "capacity", text: "capacity", backoff: true, reason: "model_capacity" },
  { id: "overloaded", text: "overloaded", backoff: true, reason: "model_capacity" },
  { id: "status_401", status: 401, cooldownMs: 0, reason: "auth_error" },
  { id: "status_402", status: 402, cooldownMs: 0, reason: "quota_exhausted" },
  { id: "status_403", status: 403, cooldownMs: 0, reason: "quota_exhausted" },
  { id: "status_404", status: 404, cooldownMs: COOLDOWN_MS.notFound, reason: "unknown" },
  { id: "status_406", status: 406, backoff: true, reason: "server_error" },
  { id: "status_408", status: 408, backoff: true, reason: "server_error" },
  { id: "status_429", status: 429, backoff: true, reason: "rate_limit_exceeded" },
  { id: "status_500", status: 500, backoff: true, reason: "server_error" },
  { id: "status_502", status: 502, backoff: true, reason: "server_error" },
  { id: "status_503", status: 503, backoff: true, reason: "server_error" },
  { id: "status_504", status: 504, backoff: true, reason: "server_error" },
];

function normalizeErrorMessage(message: unknown): string {
  return String(message || "").toLowerCase();
}

export function getErrorInfo(statusCode: number): ErrorInfo {
  return (
    ERROR_TYPES[statusCode] ||
    (statusCode >= 500
      ? { type: "server_error", code: "internal_server_error" }
      : { type: "invalid_request_error", code: "" })
  );
}

export function getDefaultErrorMessage(statusCode: number): string {
  return DEFAULT_ERROR_MESSAGES[statusCode] || "An error occurred";
}

export function calculateBackoffCooldown(level = 0): number {
  const safeLevel = Math.max(0, Math.floor(level));
  const cooldown = BACKOFF_CONFIG.base * Math.pow(2, safeLevel);
  return Math.min(cooldown, BACKOFF_CONFIG.max);
}

export function matchErrorRuleByText(message: unknown): ErrorRule | null {
  const lower = normalizeErrorMessage(message);
  if (!lower) return null;
  return ERROR_RULES.find((rule) => rule.text && lower.includes(rule.text)) || null;
}

export function matchErrorRuleByStatus(statusCode: number): ErrorRule | null {
  return ERROR_RULES.find((rule) => rule.status === statusCode) || null;
}

export function findMatchingErrorRule(statusCode: number, message: unknown): ErrorRule | null {
  return matchErrorRuleByText(message) || matchErrorRuleByStatus(statusCode);
}
