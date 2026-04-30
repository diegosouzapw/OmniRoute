import { CORS_HEADERS } from "./cors.ts";
import { getDefaultErrorMessage, getErrorInfo } from "../config/errorConfig.ts";
import { normalizePayloadForLog } from "@/lib/logPayloads";
import type { ModelCooldownErrorPayload } from "@/types";

/**
 * Build OpenAI-compatible error response body
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @returns {object} Error response object
 */
export function buildErrorBody(statusCode, message) {
  const errorInfo = getErrorInfo(statusCode);

  return {
    error: {
      message: message || getDefaultErrorMessage(statusCode),
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
 * @returns {Promise<{statusCode: number, message: string, retryAfterMs: number|null, responseBody: unknown}>}
 */
export async function parseUpstreamError(response, provider = null) {
  let message = "";
  let retryAfterMs = null;
  let responseBody = null;

  try {
    const text = await response.text();
    responseBody = normalizePayloadForLog(text);

    // Try parse as JSON
    try {
      const json = JSON.parse(text);
      message = json.error?.message || json.message || json.error || text;
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
  retryAfterMs: number | null = null
) {
  const result: {
    success: false;
    status: number;
    error: string;
    response: Response;
    retryAfterMs?: number;
  } = {
    success: false,
    status: statusCode,
    error: message,
    response: errorResponse(statusCode, message),
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
 * Format provider error with context
 * @param {Error} error - Original error
 * @param {string} provider - Provider name
 * @param {string} model - Model name
 * @param {number|string} statusCode - HTTP status code or error code
 * @returns {string} Formatted error message
 */
export function formatProviderError(error, provider, model, statusCode) {
  const code = statusCode || error.code || "FETCH_FAILED";
  const message = error.message || "Unknown error";
  return `[${code}]: ${message}`;
}
