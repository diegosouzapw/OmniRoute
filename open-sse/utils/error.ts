import { CORS_HEADERS } from "./cors.ts";
import { unwrapClinepassEnvelope } from "./clinepassEnvelope.ts";
import { getDefaultErrorMessage, getErrorInfo } from "../config/errorConfig.ts";
import { normalizePayloadForLog } from "@/lib/logPayloads";
import type { ModelCooldownErrorPayload } from "@/types";

/**
 * Sanitize an error message to prevent stack trace exposure in API responses.
 * Strips stack traces, file paths, and absolute Windows/POSIX paths from
 * error messages before they reach the client.
 */
interface ErrorResponseBody {
  error: {
    message: string;
    type?: string;
    code?: string;
  };
  upstream_details?: Record<string, unknown> | null; // sanitized upstream provider body
}

// Length cap protects against pathological inputs even before tokenization.
const MAX_ERROR_LEN = 4096;
const SOURCE_EXT = ["ts", "tsx", "js", "jsx", "mjs", "cjs"] as const;

function looksLikeAbsolutePath(tok: string): boolean {
  // POSIX: "/<...>.ts" (optionally followed by :line[:col]).
  // Windows: "C:\<...>.ts" or "C:/<...>.ts".
  if (tok.length < 4 || tok.length > 2048) return false;
  const isPosix = tok.charCodeAt(0) === 0x2f; // '/'
  const isWindows = tok.length > 2 && tok.charCodeAt(1) === 0x3a && /[A-Za-z]/.test(tok[0]);
  if (!isPosix && !isWindows) return false;
  const dot = tok.lastIndexOf(".");
  if (dot <= 0 || dot === tok.length - 1) return false;
  const ext = tok
    .slice(dot + 1)
    .split(":", 1)[0]
    .toLowerCase();
  return (SOURCE_EXT as readonly string[]).includes(ext);
}

/**
 * Strip stack-trace tail and absolute source paths from error messages.
 *
 * Implemented via simple whitespace tokenization (linear time) instead of a
 * single complex regex, so CodeQL `js/polynomial-redos` stays clean even when
 * the runtime error message is attacker-controlled.
 */
export function sanitizeErrorMessage(message: unknown): string {
  let str = typeof message === "string" ? message : String(message ?? "");
  if (str.length > MAX_ERROR_LEN) str = str.slice(0, MAX_ERROR_LEN);
  const nl = str.indexOf("\n");
  const firstLine = nl >= 0 ? str.slice(0, nl) : str;
  // Preserve original whitespace by splitting on captured separator.
  const parts = firstLine.split(/(\s+)/);
  for (let i = 0; i < parts.length; i++) {
    if (looksLikeAbsolutePath(parts[i])) parts[i] = "<path>";
  }
  return parts.join("");
}

const BLOCKED_KEYS = /stack|trace|path|file|cwd|dir|password|secret|token|key/i;
const MAX_DEPTH = 4;

/**
 * Recursively sanitize an arbitrary JSON value from an upstream provider body.
 * - Strings: run through sanitizeErrorMessage (strips stacks + absolute paths).
 * - Keys matching BLOCKED_KEYS are dropped (credential/path guards).
 * - Depth capped at MAX_DEPTH to prevent pathological nesting.
 * - Arrays capped at 32 elements.
 * - Returns null for null/undefined/non-JSON-serializable values.
 */
export function sanitizeUpstreamDetails(value: unknown, depth = 0): unknown {
  if (depth > MAX_DEPTH) return "[truncated]";
  if (value === null || value === undefined) return null;
  if (typeof value === "string") return sanitizeErrorMessage(value);
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) {
    return value.slice(0, 32).map((v) => sanitizeUpstreamDetails(v, depth + 1));
  }
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (BLOCKED_KEYS.test(k)) continue;
      out[k] = sanitizeUpstreamDetails(v, depth + 1);
    }
    return out;
  }
  return null;
}

/**
 * Build OpenAI-compatible error response body. Message is always sanitized
 * so callers do not need to remember to strip stack traces themselves.
 * Optional third argument `upstreamDetails` (raw parsed provider body) is
 * sanitized by sanitizeUpstreamDetails before inclusion as `upstream_details`.
 */
export function buildErrorBody(
  statusCode: number,
  message: string,
  upstreamDetails?: unknown
): ErrorResponseBody {
  const errorInfo = getErrorInfo(statusCode);
  const safeMessage = sanitizeErrorMessage(message) || getDefaultErrorMessage(statusCode);

  const body: ErrorResponseBody = {
    error: {
      message: safeMessage,
      type: errorInfo.type,
      code: errorInfo.code,
    },
  };

  if (upstreamDetails !== undefined && upstreamDetails !== null) {
    const sanitized = sanitizeUpstreamDetails(upstreamDetails);
    if (sanitized !== null && typeof sanitized === "object" && !Array.isArray(sanitized)) {
      body.upstream_details = sanitized as Record<string, unknown>;
    }
  }

  return body;
}

/**
 * Create error Response object (for non-streaming)
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @returns {Response} HTTP Response object
 */
export function errorResponse(statusCode: number, message: string): Response {
  return new Response(JSON.stringify(buildErrorBody(statusCode, sanitizeErrorMessage(message))), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * Write error to SSE stream (for streaming)
 * @param {WritableStreamDefaultWriter} writer - Stream writer
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
export async function writeStreamError(
  writer: WritableStreamDefaultWriter<Uint8Array>,
  statusCode: number,
  message: string
): Promise<void> {
  const errorBody = buildErrorBody(statusCode, sanitizeErrorMessage(message));
  const encoder = new TextEncoder();
  await writer.write(encoder.encode(`data: ${JSON.stringify(errorBody)}\n\n`));
}

function normalizeRetryAfterSeconds(retryAfter?: string | number | Date | null): number {
  if (typeof retryAfter === "number" && Number.isFinite(retryAfter)) {
    if (retryAfter > 0 && retryAfter < 1_000_000_000) {
      return Math.max(Math.ceil(retryAfter), 1);
    }

    const retryTimeMs = new Date(retryAfter).getTime();
    if (Number.isFinite(retryTimeMs)) {
      return Math.max(Math.ceil((retryTimeMs - Date.now()) / 1000), 1);
    }
  }

  if (retryAfter instanceof Date || typeof retryAfter === "string") {
    const retryTimeMs = new Date(retryAfter).getTime();
    if (Number.isFinite(retryTimeMs)) {
      return Math.max(Math.ceil((retryTimeMs - Date.now()) / 1000), 1);
    }
  }

  return 1;
}

/**
 * Parse Antigravity error message to extract retry time
 * Example: "You have exhausted your capacity on this model. Your quota will reset after 2h7m23s."
 * @param {string} message - Error message
 * @returns {number|null} Retry time in milliseconds, or null if not found
 */
export function parseAntigravityRetryTime(message: unknown): number | null {
  if (typeof message !== "string") return null;

  // Match patterns like: 2h7m23s, 5m30s, 45s, 1h20m, etc.
  const match = message.match(/reset after (\d+h)?(\d+m)?(\d+s)?/i);
  if (!match) return null;

  let totalMs = 0;

  // Extract hours
  if (match[1]) {
    const hours = parseInt(match[1]);
    totalMs += hours * 60 * 60 * 1000;
  }

  // Extract minutes
  if (match[2]) {
    const minutes = parseInt(match[2]);
    totalMs += minutes * 60 * 1000;
  }

  // Extract seconds
  if (match[3]) {
    const seconds = parseInt(match[3]);
    totalMs += seconds * 1000;
  }

  return totalMs > 0 ? totalMs : null;
}

/**
 * Parse upstream provider error response
 * @param {Response} response - Fetch response from provider
 * @param {string} provider - Provider name (for Antigravity-specific parsing)
 * @returns {Promise<{statusCode: number, message: string, retryAfterMs: number|null, responseBody: unknown}>}
 */
export async function parseUpstreamError(response: Response, provider: string | null = null) {
  let message: unknown = "";
  let retryAfterMs: number | null = null;
  let responseBody: unknown = null;
  let errorCode: unknown = undefined;
  let errorType: unknown = undefined;

  try {
    const text = await response.text();
    responseBody = normalizePayloadForLog(text);

    // Try parse as JSON
    try {
      const parsed = JSON.parse(text);
      // Handle array responses (e.g., from some Gemini APIs)
      const json = (Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : parsed) || {};
      // ClinePass wraps upstream errors in a {success:false, error} envelope.
      // Extract the upstream error string (an upstream JSON field, not a local
      // stack) — still routed through sanitizeErrorMessage/buildErrorBody by
      // every consumer below (Rule #12).
      const { error: clinepassEnvError } = unwrapClinepassEnvelope(json, provider);
      message = clinepassEnvError
        ? clinepassEnvError.message
        : json.error?.message || json.message || json.error || text;
      errorCode = json.error?.code || json.code;
      errorType = json.error?.type || json.type;
    } catch {
      message = text;
    }
  } catch {
    message = `Upstream error: ${response.status}`;
    responseBody = { _rawText: message };
  }

  const messageStr = typeof message === "string" ? message : JSON.stringify(message);

  const retryAfterHeader = response.headers?.get?.("retry-after");
  if (retryAfterHeader && !retryAfterMs) {
    const retryAfterSec = Number.parseInt(retryAfterHeader, 10);
    if (Number.isFinite(retryAfterSec) && retryAfterSec > 0) {
      retryAfterMs = retryAfterSec * 1000;
    } else {
      const retryAfterDate = new Date(retryAfterHeader).getTime();
      if (Number.isFinite(retryAfterDate) && retryAfterDate > Date.now()) {
        retryAfterMs = retryAfterDate - Date.now();
      }
    }
  }

  // Parse Antigravity-specific retry time from error message
  if (provider === "antigravity" && response.status === 429) {
    retryAfterMs = parseAntigravityRetryTime(messageStr);
  }

  // Also parse retry time for other providers (Qwen, etc.) with "quota will reset after XhYmZs" format
  if (response.status === 429 && !retryAfterMs) {
    retryAfterMs = parseAntigravityRetryTime(messageStr);
  }

  // Generic providers: "Please retry after 20s"
  if (response.status === 429 && !retryAfterMs) {
    const retryMatch = messageStr.match(/retry\s+after\s+(\d+)\s*s/i);
    if (retryMatch) {
      retryAfterMs = Number.parseInt(retryMatch[1], 10) * 1000;
    }
  }

  // Cap maximum retry time at 24 hours to prevent infinite wait
  const MAX_RETRY_MS = 24 * 60 * 60 * 1000;
  if (retryAfterMs && retryAfterMs > MAX_RETRY_MS) {
    retryAfterMs = MAX_RETRY_MS;
  }

  const responseHeaders: Record<string, string> | null = response.headers
    ? Object.fromEntries(response.headers.entries())
    : null;

  return {
    statusCode: response.status,
    message: messageStr,
    errorCode,
    errorType,
    retryAfterMs,
    responseBody,
    responseHeaders,
  };
}

/**
 * Create error result for chatCore handler
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {number|null} retryAfterMs - Optional retry-after time in milliseconds
 * @returns {{ success: false, status: number, error: string, response: Response, retryAfterMs?: number }}
 */
export function createErrorResult(
  statusCode: number,
  message: string,
  retryAfterMs: number | null = null,
  errorCode?: string,
  errorType?: string,
  upstreamDetails?: unknown
) {
  const body = buildErrorBody(statusCode, message, upstreamDetails);
  if (errorCode) {
    body.error.code = errorCode;
  }
  if (errorType) {
    body.error.type = errorType;
  }

  const result: {
    success: false;
    status: number;
    error: string;
    errorType?: string;
    errorCode?: string;
    response: Response;
    retryAfterMs?: number;
  } = {
    success: false,
    status: statusCode,
    error: body.error.message,
    errorType,
    errorCode,
    response: new Response(JSON.stringify(body), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    }),
  };

  // Add retryAfterMs if available (for Antigravity quota errors)
  if (retryAfterMs) {
    result.retryAfterMs = retryAfterMs;
  }

  return result;
}

/**
 * Create unavailable response when all accounts are rate limited
 * @param {number} statusCode - Original error status code
 * @param {string} message - Error message (without retry info)
 * @param {string} retryAfter - ISO timestamp when earliest account becomes available
 * @param {string} retryAfterHuman - Human-readable retry info e.g. "reset after 30s"
 * @returns {Response}
 */
export function unavailableResponse(
  statusCode: number,
  message: string,
  retryAfter?: string | number | Date | null,
  retryAfterHuman?: string
) {
  const retryAfterSec = normalizeRetryAfterSeconds(retryAfter);
  const msg = retryAfterHuman ? `${message} (${retryAfterHuman})` : message;
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(retryAfterSec),
    },
  });
}

export function providerCircuitOpenResponse(
  provider: string,
  retryAfter?: string | number | Date | null
) {
  const retryAfterSec = normalizeRetryAfterSeconds(retryAfter);
  return new Response(
    JSON.stringify({
      error: {
        message: `Provider ${provider} circuit breaker is open`,
        type: "server_error",
        code: "provider_circuit_open",
        provider,
        retry_after: retryAfterSec,
      },
    }),
    {
      status: 503,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSec),
        "X-OmniRoute-Provider-Breaker": "open",
      },
    }
  );
}

export function buildModelCooldownBody({
  model,
  retryAfterSec,
}: {
  model?: string | null;
  retryAfterSec: number;
}): ModelCooldownErrorPayload {
  const resolvedModel = typeof model === "string" && model.trim().length > 0 ? model.trim() : null;

  return {
    error: {
      message: resolvedModel
        ? `All credentials for model ${resolvedModel} are cooling down`
        : "All credentials for the requested model are cooling down",
      type: "rate_limit_error",
      code: "model_cooldown",
      ...(resolvedModel ? { model: resolvedModel } : {}),
      reset_seconds: Math.max(Math.ceil(retryAfterSec), 1),
    },
  };
}

export function modelCooldownResponse({
  model,
  retryAfter,
}: {
  model?: string | null;
  retryAfter?: string | number | Date | null;
}) {
  const retryAfterSec = normalizeRetryAfterSeconds(retryAfter);
  return new Response(
    JSON.stringify(
      buildModelCooldownBody({
        model,
        retryAfterSec,
      })
    ),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSec),
      },
    }
  );
}

/**
 * Build an executor-style error result (response + url + headers + transformedBody).
 * Shared by web-cookie executors that return the `{ response, url, headers, transformedBody }` shape.
 */
export function makeExecutorErrorResult(
  status: number,
  message: string,
  body: unknown,
  url: string
) {
  return {
    response: new Response(
      JSON.stringify({
        error: {
          message: sanitizeErrorMessage(message),
          type: "upstream_error",
          code: `HTTP_${status}`,
        },
      }),
      { status, headers: { "Content-Type": "application/json" } }
    ),
    url,
    headers: {} as Record<string, string>,
    transformedBody: body,
  };
}

/**
 * Normalize a cookie string: strip a leading "Cookie:" prefix if present.
 */
export function normalizeCookie(raw: string): string {
  return raw?.startsWith("Cookie:") ? raw.slice(7).trim() : raw || "";
}

/**
 * Format provider error with context
 * @param {Error} error - Original error
 * @param {string} provider - Provider name
 * @param {string} model - Model name
 * @param {number|string} statusCode - HTTP status code or error code
 * @returns {string} Formatted error message
 */
export function formatProviderError(
  error: { code?: string | number; message?: string; cause?: unknown } | Error,
  provider: string,
  model: string,
  statusCode?: string | number | null
): string {
  const providerCode = "code" in error ? error.code : undefined;
  const code = statusCode || providerCode || "FETCH_FAILED";
  const message = error.message || "Unknown error";
  // Expose low-level cause (e.g. UND_ERR_SOCKET, ECONNRESET, ETIMEDOUT) for diagnosing fetch failures
  const cause = (error as { cause?: unknown }).cause;
  const causeObj =
    cause && typeof cause === "object" ? (cause as Record<string, unknown>) : undefined;
  const causeCode = typeof causeObj?.code === "string" ? causeObj.code : undefined;
  const causeMsg = typeof causeObj?.message === "string" ? causeObj.message : undefined;
  const causeStr =
    causeCode || causeMsg ? ` (cause: ${[causeCode, causeMsg].filter(Boolean).join(": ")})` : "";
  return `[${code}]: ${message}${causeStr}`;
}
