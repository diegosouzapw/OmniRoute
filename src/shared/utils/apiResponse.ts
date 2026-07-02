/**
 * Canonical API Response Helpers — P1-02
 *
 * Provides a consistent error and success response contract:
 *   { error: { code, message, correlation_id?, details? } }
 *
 * All management API routes should use these helpers instead of
 * ad-hoc NextResponse.json({ error: "..." }) calls.
 *
 * @module shared/utils/apiResponse
 */

import { NextResponse } from "next/server";

interface ApiError {
  code: string;
  message: string;
  correlation_id?: string;
  details?: Record<string, unknown>;
}

/**
 * Return a structured error response.
 *
 * @param code  Machine-readable error code (e.g. AUTH_001, VALIDATION_001)
 * @param message Human-readable message
 * @param status HTTP status code
 * @param opts   Optional correlation_id and details
 */
export function errorResponse(
  code: string,
  message: string,
  status: number,
  opts?: { correlationId?: string; details?: Record<string, unknown> }
): NextResponse {
  const body: { error: ApiError } = {
    error: {
      code,
      message,
      ...(opts?.correlationId ? { correlation_id: opts.correlationId } : {}),
      ...(opts?.details ? { details: opts.details } : {}),
    },
  };
  return NextResponse.json(body, { status });
}

/**
 * Return a structured success response.
 */
export function successResponse(data: unknown, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}

/**
 * Standard error codes for consistent client handling.
 */
export const ErrorCodes = {
  // Auth
  AUTH_001: "AUTH_001", // Authentication required
  AUTH_002: "AUTH_002", // Invalid credentials
  AUTH_003: "AUTH_003", // Token expired

  // Validation
  VALIDATION_001: "VALIDATION_001", // Invalid request body
  VALIDATION_002: "VALIDATION_002", // Missing required field

  // Server
  SERVER_001: "SERVER_001", // Internal server error
  SERVER_002: "SERVER_002", // Service unavailable
  SERVER_003: "SERVER_003", // Configuration error

  // Security
  SECURITY_001: "SECURITY_001", // Prompt injection detected
  SECURITY_002: "SECURITY_002", // Rate limit exceeded

  // Resource
  RESOURCE_001: "RESOURCE_001", // Not found
  RESOURCE_002: "RESOURCE_002", // Conflict
} as const;
