export const ERROR_TYPES = {
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
} as const;

export const DEFAULT_ERROR_MESSAGES = {
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
} as const;

export const BACKOFF_CONFIG = {
  base: 1000,
  max: 2 * 60 * 1000,
  maxLevel: 15,
} as const;

export const TRANSIENT_COOLDOWN_MS = 5 * 1000;

export const COOLDOWN = {
  long: 2 * 60 * 1000,
  short: 5 * 1000,
} as const;

export const COOLDOWN_MS = {
  unauthorized: COOLDOWN.long,
  paymentRequired: COOLDOWN.long,
  notFound: COOLDOWN.long,
  notFoundLocal: COOLDOWN.short,
  transientInitial: TRANSIENT_COOLDOWN_MS,
  transientMax: 60 * 1000,
  transient: TRANSIENT_COOLDOWN_MS,
  requestNotAllowed: COOLDOWN.short,
  rateLimit: COOLDOWN.long,
  serviceUnavailable: 2 * 1000,
  authExpired: COOLDOWN.long,
} as const;

export type ErrorRuleReason =
  | "quota_exhausted"
  | "rate_limit_exceeded"
  | "model_capacity"
  | "server_error"
  | "auth_error"
  | "unknown";

export interface ErrorRule {
  text?: string;
  status?: number;
  cooldownMs?: number;
  backoff?: boolean;
  reason?: ErrorRuleReason;
}

export const ERROR_RULES: ErrorRule[] = [
  { text: "no credentials", cooldownMs: COOLDOWN.long, reason: "auth_error" },
  { text: "request not allowed", cooldownMs: COOLDOWN.short, reason: "rate_limit_exceeded" },
  { text: "improperly formed request", cooldownMs: COOLDOWN.long, reason: "unknown" },
  { text: "rate limit", backoff: true, reason: "rate_limit_exceeded" },
  { text: "too many requests", backoff: true, reason: "rate_limit_exceeded" },
  { text: "quota exceeded", backoff: true, reason: "quota_exhausted" },
  { text: "quota will reset", backoff: true, reason: "quota_exhausted" },
  { text: "capacity", backoff: true, reason: "model_capacity" },
  { text: "overloaded", backoff: true, reason: "model_capacity" },
  { text: "resource exhausted", backoff: true, reason: "model_capacity" },
  { text: "unauthorized", cooldownMs: 0, reason: "auth_error" },
  { text: "invalid api key", cooldownMs: 0, reason: "auth_error" },
  { text: "authentication", cooldownMs: 0, reason: "auth_error" },
  { status: 401, cooldownMs: COOLDOWN.long, reason: "auth_error" },
  { status: 402, cooldownMs: COOLDOWN.long, reason: "quota_exhausted" },
  { status: 403, cooldownMs: COOLDOWN.long, reason: "auth_error" },
  { status: 404, cooldownMs: COOLDOWN.long, reason: "unknown" },
  { status: 406, cooldownMs: COOLDOWN.long, reason: "unknown" },
  { status: 429, backoff: true, reason: "rate_limit_exceeded" },
  { status: 500, backoff: true, reason: "server_error" },
  { status: 502, backoff: true, reason: "server_error" },
  { status: 503, backoff: true, reason: "model_capacity" },
  { status: 504, backoff: true, reason: "server_error" },
];

export function classifyError(status: number, message: string): ErrorRule | null {
  const lower = String(message || "").toLowerCase();

  for (const rule of ERROR_RULES) {
    if (rule.text && lower.includes(rule.text)) {
      return rule;
    }
  }

  for (const rule of ERROR_RULES) {
    if (typeof rule.status === "number" && rule.status === status) {
      return rule;
    }
  }

  return null;
}

export function calculateBackoff(level: number): number {
  const normalizedLevel = Number.isFinite(level) ? Math.max(0, Math.floor(level)) : 0;
  const boundedLevel = Math.min(normalizedLevel, BACKOFF_CONFIG.maxLevel);
  return Math.min(BACKOFF_CONFIG.base * Math.pow(2, boundedLevel), BACKOFF_CONFIG.max);
}
