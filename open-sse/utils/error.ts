import { ERROR_TYPES, DEFAULT_ERROR_MESSAGES } from "../config/constants.js";

/**
 * Build OpenAI-compatible error response body
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @returns {object} Error response object
 */
export function buildErrorBody(statusCode, message) {
  const errorInfo =
    ERROR_TYPES[statusCode] ||
    (statusCode >= 500
      ? { type: "server_error", code: "internal_server_error" }
      : { type: "invalid_request_error", code: "" });

  return {
    error: {
      message: message || DEFAULT_ERROR_MESSAGES[statusCode] || "An error occurred",
      type: errorInfo.type,
      code: errorInfo.code,
    },
  };
}

/**
 * Create error Response object (for non-streaming)
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @returns {Response} HTTP Response object
 */
export function errorResponse(statusCode, message) {
  return new Response(JSON.stringify(buildErrorBody(statusCode, message)), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

/**
 * Write error to SSE stream (for streaming)
 * @param {WritableStreamDefaultWriter} writer - Stream writer
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
export async function writeStreamError(writer, statusCode, message) {
  const errorBody = buildErrorBody(statusCode, message);
  const encoder = new TextEncoder();
  await writer.write(encoder.encode(`data: ${JSON.stringify(errorBody)}\n\n`));
}

/**
 * Parse Antigravity error message to extract retry time
 * Example: "You have exhausted your capacity on this model. Your quota will reset after 2h7m23s."
 * @param {string} message - Error message
 * @returns {number|null} Retry time in milliseconds, or null if not found
 */
export function parseAntigravityRetryTime(message) {
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
 * @returns {Promise<{statusCode: number, message: string, retryAfterMs: number|null}>}
 */
export async function parseUpstreamError(response, provider = null) {
  let message = "";
  let retryAfterMs = null;

  try {
    const text = await response.text();

    // Try parse as JSON
    try {
      const json = JSON.parse(text);
      message = json.error?.message || json.message || json.error || text;
    } catch {
      message = text;
    }
  } catch {
    message = `Upstream error: ${response.status}`;
  }

  const messageStr = typeof message === "string" ? message : JSON.stringify(message);

  // Parse Antigravity-specific retry time from error message
  if (provider === "antigravity" && response.status === 429) {
    retryAfterMs = parseAntigravityRetryTime(messageStr);
  }

  return {
    statusCode: response.status,
    message: messageStr,
    retryAfterMs,
  };
}

/**
 * Create error result for chatCore handler
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {number|null} retryAfterMs - Optional retry-after time in milliseconds
 * @returns {{ success: false, status: number, error: string, response: Response, retryAfterMs?: number }}
 */
export function createErrorResult(statusCode: number, message: string, retryAfterMs: number | null = null) {
  const result: Record<string, any> = {
    success: false,
    status: statusCode,
    error: message,
    response: errorResponse(statusCode, message),
  };

  // Add retryAfterMs if available (for Antigravity quota errors)
  if (retryAfterMs) {
    result.retryAfterMs = retryAfterMs;
  }

  // @ts-ignore - boolean is assignable to false at runtime
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
export function unavailableResponse(statusCode, message, retryAfter, retryAfterHuman) {
  const retryAfterSec = Math.max(
    Math.ceil((new Date(retryAfter).getTime() - Date.now()) / 1000),
    1
  );
  const msg = `${message} (${retryAfterHuman})`;
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(retryAfterSec),
    },
  });
}

/**
 * Format provider error with context
 * @param {Error} error - Original error
 * @param {string} provider - Provider name
 * @param {string} model - Model name
 * @param {number|string} statusCode - HTTP status code or error code
 * @returns {string} Formatted error message
 */
export function formatProviderError(error, provider, model, statusCode) {
  // @ts-ignore - Error may have custom 'code' property
  const code = statusCode || error.code || "FETCH_FAILED";
  const message = error.message || "Unknown error";
  return `[${code}]: ${message}`;
}
