/**
 * Error Codes Catalog — T-22
 *
 * Centralized error code registry for consistent API error responses.
 * Each code has a category prefix, numeric ID, message, and HTTP status.
 *
 * Usage:
 *   import { ERROR_CODES, createErrorResponse } from "@/shared/constants/errorCodes";
 *   return createErrorResponse("AUTH_001", { detail: "Token expired" });
 *
 * @module shared/constants/errorCodes
 */

export interface ErrorCodeDef {
  code: string;
  message: string;
  httpStatus: number;
  category: string;
}

interface ErrorDetails {
  detail?: string;
  requestId?: string;
  retryAfter?: number;
}

export const ERROR_CODES: Record<string, ErrorCodeDef> = {
  // ── Auth ──
  AUTH_001: { code: "AUTH_001", message: "Authentication required", httpStatus: 401, category: "AUTH" },
  AUTH_002: { code: "AUTH_002", message: "Invalid API key", httpStatus: 401, category: "AUTH" },
  AUTH_003: { code: "AUTH_003", message: "API key expired", httpStatus: 401, category: "AUTH" },
  AUTH_004: { code: "AUTH_004", message: "Insufficient permissions", httpStatus: 403, category: "AUTH" },
  AUTH_005: { code: "AUTH_005", message: "Account locked", httpStatus: 423, category: "AUTH" },
  AUTH_006: { code: "AUTH_006", message: "No credentials for provider", httpStatus: 400, category: "AUTH" },

  // ── Proxy ──
  PROXY_001: { code: "PROXY_001", message: "Proxy connection failed", httpStatus: 502, category: "PROXY" },
  PROXY_002: { code: "PROXY_002", message: "Proxy timeout", httpStatus: 504, category: "PROXY" },
  PROXY_003: { code: "PROXY_003", message: "All proxies exhausted", httpStatus: 503, category: "PROXY" },

  // ── Rate Limiting ──
  RATE_001: { code: "RATE_001", message: "Rate limit exceeded", httpStatus: 429, category: "RATE_LIMIT" },
  RATE_002: { code: "RATE_002", message: "Daily budget exceeded", httpStatus: 429, category: "RATE_LIMIT" },
  RATE_003: { code: "RATE_003", message: "All accounts rate-limited", httpStatus: 503, category: "RATE_LIMIT" },

  // ── Model / Routing ──
  MODEL_001: { code: "MODEL_001", message: "Model not found", httpStatus: 404, category: "MODEL" },
  MODEL_002: { code: "MODEL_002", message: "Ambiguous model identifier", httpStatus: 400, category: "MODEL" },
  MODEL_003: { code: "MODEL_003", message: "Model temporarily unavailable", httpStatus: 503, category: "MODEL" },

  // ── Provider ──
  PROVIDER_001: { code: "PROVIDER_001", message: "Provider error", httpStatus: 502, category: "PROVIDER" },
  PROVIDER_002: { code: "PROVIDER_002", message: "Provider timeout", httpStatus: 504, category: "PROVIDER" },
  PROVIDER_003: { code: "PROVIDER_003", message: "Provider not configured", httpStatus: 400, category: "PROVIDER" },

  // ── Validation ──
  VALID_001: { code: "VALID_001", message: "Invalid request body", httpStatus: 400, category: "VALIDATION" },
  VALID_002: { code: "VALID_002", message: "Missing required field", httpStatus: 400, category: "VALIDATION" },
  VALID_003: { code: "VALID_003", message: "Input sanitization blocked", httpStatus: 400, category: "VALIDATION" },

  // ── Internal ──
  INTERNAL_001: { code: "INTERNAL_001", message: "Internal server error", httpStatus: 500, category: "INTERNAL" },
  INTERNAL_002: { code: "INTERNAL_002", message: "Database error", httpStatus: 500, category: "INTERNAL" },
  INTERNAL_003: { code: "INTERNAL_003", message: "Circuit breaker open", httpStatus: 503, category: "INTERNAL" },
};

export function createErrorResponse(code: string, details: ErrorDetails = {}) {
  const def = ERROR_CODES[code];
  if (!def) {
    return {
      error: {
        code: "INTERNAL_001",
        message: `Unknown error code: ${code}`,
        category: "INTERNAL",
      },
      status: 500,
    };
  }

  const response: any = {
    error: {
      code: def.code,
      message: def.message,
      category: def.category,
      ...(details.detail ? { detail: details.detail } : {}),
      ...(details.requestId ? { requestId: details.requestId } : {}),
    },
    status: def.httpStatus,
  };

  if (details.retryAfter) {
    response.retryAfter = details.retryAfter;
  }

  return response;
}

export function getErrorsByCategory(category: string): ErrorCodeDef[] {
  return Object.values(ERROR_CODES).filter((e) => e.category === category);
}
