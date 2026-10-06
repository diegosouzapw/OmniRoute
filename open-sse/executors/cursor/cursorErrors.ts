/**
 * Classify Cursor transport / Connect / gRPC error text into actionable categories.
 * Modeled on OpenCodex `adapters/cursor/cursor-errors.ts` (safe messages + quota vs size).
 */

const ABSOLUTE_PATH_PATTERN =
  /(?:\/Users\/[^ "';,]+|\/home\/[^ "';,]+|[A-Za-z]:\\Users\\[^ "';,]+)/g;
const CURSOR_CREDENTIAL_PATTERN =
  /\b(authorization|auth[_-]?token|cursor[_-]?token|bearer)=([^&\s"',;]+)/gi;

const QUOTA_RATE_CUES = [
  "too many requests",
  "quota",
  "rate limit",
  "rate-limit",
  "throttl",
  "out of usage",
  "increase limits",
  "actionrequired",
];
const REQUEST_TOO_LARGE_PATTERNS: (string | RegExp)[] = [
  "tool catalog too large",
  "tool registration too large",
  "too many tools",
  "message too large",
  "payload too large",
  "request too large",
  /request exceeds .*size/,
  /request (?:body|size) exceeds .*(?:size|limit)/,
  "maximum allowed size",
];

export type CursorErrorKind =
  "rate_limit" | "auth" | "invalid" | "overload" | "timeout" | "connection" | "upstream";

export type ClassifiedCursorError = {
  kind: CursorErrorKind;
  /** HTTP status to surface to OmniRoute clients. */
  status: number;
  /** OpenAI-style error.type */
  type: string;
  /** Secret-safe user-facing message with category prefix. */
  message: string;
};

function sanitize(value: string): string {
  return value
    .replace(CURSOR_CREDENTIAL_PATTERN, "$1=[REDACTED]")
    .replace(ABSOLUTE_PATH_PATTERN, "[REDACTED_PATH]")
    .replace(/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[REDACTED_JWT]");
}

export function isCursorRequestTooLargeDetail(lowerMessage: string): boolean {
  if (QUOTA_RATE_CUES.some((cue) => lowerMessage.includes(cue))) return false;
  return REQUEST_TOO_LARGE_PATTERNS.some((pattern) =>
    typeof pattern === "string" ? lowerMessage.includes(pattern) : pattern.test(lowerMessage)
  );
}

function errorMessage(value: unknown): string {
  if (value instanceof Error) return value.message;
  if (typeof value === "string") return value;
  return String(value ?? "");
}

function errorCode(value: unknown): string {
  if (typeof value !== "object" || !value || !("code" in value)) return "";
  const code = (value as { code?: unknown }).code;
  return code === undefined || code === null ? "" : String(code);
}

/**
 * True when Cursor intentionally cancelled the HTTP/2 stream after a client-tool
 * suspend (OpenCodex `isCursorBenignCancelError`). Not an upstream failure.
 */
export function isCursorBenignCancelError(value: unknown): boolean {
  const message = errorMessage(value).toLowerCase();
  const code = errorCode(value).toUpperCase();
  if (code === "NGHTTP2_CANCEL") return true;
  if (message.includes("nghttp2_cancel")) return true;
  if (message.includes("cursor stream suspended")) return true;
  return false;
}

export function classifyCursorErrorKind(rawMessage: string): CursorErrorKind {
  const lower = rawMessage.toLowerCase();

  if (lower.includes("resource_exhausted") || lower.includes("resource exhausted")) {
    return isCursorRequestTooLargeDetail(lower) ? "invalid" : "rate_limit";
  }
  if (QUOTA_RATE_CUES.some((cue) => lower.includes(cue))) return "rate_limit";

  // Live Cursor out-of-usage for premium models often surfaces as:
  //   not_found: AI Model Not Found (reset after 109h …)
  // OmniRoute may also append "(reset after …)" after classification; treat the
  // Cursor-specific "AI Model Not Found" cue as rate/quota either way.
  if (
    lower.includes("ai model not found") ||
    (lower.includes("reset after") && lower.includes("model not found"))
  ) {
    return "rate_limit";
  }

  if (
    lower.includes("unauthenticated") ||
    lower.includes("unauthorized") ||
    lower.includes("permission_denied") ||
    lower.includes("permission denied") ||
    lower.includes("forbidden") ||
    lower.includes("invalid token") ||
    lower.includes("expired token") ||
    lower.includes("authentication") ||
    lower.includes("access denied")
  ) {
    return "auth";
  }

  if (
    lower.includes("unavailable") ||
    lower.includes("overloaded") ||
    lower.includes("temporarily") ||
    lower.includes("server is busy")
  ) {
    return "overload";
  }

  if (
    lower.includes("invalid") ||
    lower.includes("not found") ||
    lower.includes("unsupported") ||
    lower.includes("malformed") ||
    lower.includes("unimplemented")
  ) {
    return "invalid";
  }

  if (
    lower.includes("timed out") ||
    lower.includes("timeout") ||
    lower.includes("etimedout") ||
    lower.includes("deadline")
  ) {
    return "timeout";
  }

  if (
    lower.includes("econnreset") ||
    lower.includes("econnrefused") ||
    lower.includes("goaway") ||
    lower.includes("nghttp2") ||
    lower.includes("socket hang up") ||
    lower.includes("connection reset")
  ) {
    return "connection";
  }

  return "upstream";
}

function kindToStatus(kind: CursorErrorKind): number {
  switch (kind) {
    case "rate_limit":
      return 429;
    case "auth":
      return 401;
    case "invalid":
      return 400;
    case "overload":
    case "timeout":
    case "connection":
    case "upstream":
    default:
      return 502;
  }
}

function kindToType(kind: CursorErrorKind): string {
  switch (kind) {
    case "rate_limit":
      return "rate_limit_error";
    case "auth":
      return "authentication_error";
    case "invalid":
      return "invalid_request_error";
    default:
      return "api_error";
  }
}

function kindPrefix(kind: CursorErrorKind): string {
  switch (kind) {
    case "rate_limit":
      return "Cursor rate limit / usage exceeded";
    case "auth":
      return "Cursor authentication failed";
    case "invalid":
      return "Cursor invalid request";
    case "overload":
      return "Cursor server overloaded";
    case "timeout":
      return "Cursor request timed out";
    case "connection":
      return "Cursor connection failed";
    default:
      return "Cursor upstream error";
  }
}

/** Produce a classified, secret-safe Cursor error for HTTP / SSE responses. */
export function classifyCursorError(rawMessage: string): ClassifiedCursorError {
  const kind = classifyCursorErrorKind(rawMessage);
  const detail = sanitize(rawMessage)
    .replace(/resource[_ ]exhausted/gi, "resource limit exceeded")
    .slice(0, 500);
  const prefix = kindPrefix(kind);
  const message = detail.startsWith(prefix) ? detail : detail ? `${prefix}: ${detail}` : prefix;
  return {
    kind,
    status: kindToStatus(kind),
    type: kindToType(kind),
    message,
  };
}

export const CURSOR_EMPTY_TURN_MESSAGE =
  'Cursor returned an empty turn (often usage/quota exhausted). Try model "auto", or check Usage → Provider Limits / raise Cursor limits.';

/**
 * Resolve the error to emit when a Cursor turn ends with no assistant text/tool_calls.
 * Prefer classifying an upstream JSON/error message; otherwise use the empty-turn hint.
 * When `quotaExhaustedHint` is true (fresh Provider Limits cache), force 429.
 */
export function resolveCursorEmptyTurnError(options: {
  upstreamMessage?: string | null;
  quotaExhaustedHint?: boolean;
}): ClassifiedCursorError {
  const upstream = options.upstreamMessage?.trim();
  if (upstream) {
    const classified = classifyCursorError(upstream);
    if (options.quotaExhaustedHint && classified.kind !== "auth") {
      return {
        ...classified,
        kind: "rate_limit",
        status: 429,
        type: "rate_limit_error",
        message: classified.message.includes("usage")
          ? classified.message
          : `${classified.message} (${CURSOR_EMPTY_TURN_MESSAGE})`,
      };
    }
    return classified;
  }

  if (options.quotaExhaustedHint) {
    return {
      kind: "rate_limit",
      status: 429,
      type: "rate_limit_error",
      message: CURSOR_EMPTY_TURN_MESSAGE,
    };
  }

  return {
    kind: "upstream",
    status: 502,
    type: "api_error",
    message: CURSOR_EMPTY_TURN_MESSAGE,
  };
}
