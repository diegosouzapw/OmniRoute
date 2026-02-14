/**
 * Response Helpers — FASE-03 Architecture Refactoring
 *
 * Standardized API response factories for consistent JSON responses.
 * Eliminates ad-hoc Response/NextResponse construction scattered across handlers.
 *
 * @module domain/responses
 */

/**
 * Create a standard success response.
 *
 * @param {Object} data - Response payload
 * @param {number} [status=200] - HTTP status code
 * @param {Object} [headers={}] - Additional headers
 * @returns {Response}
 */
export function successResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

/**
 * Create a standard error response.
 *
 * @param {number} status - HTTP status code
 * @param {string} code - Error code (e.g. 'INVALID_INPUT')
 * @param {string} message - Human-readable error message
 * @param {Object} [details] - Additional error details
 * @returns {Response}
 */
export function apiErrorResponse(status, code, message, details) {
  return new Response(
    JSON.stringify({
      error: {
        status,
        code,
        message,
        ...(details && { details }),
      },
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

/**
 * Create a 400 Bad Request response.
 *
 * @param {string} message - Error message
 * @param {Object} [details] - Validation details
 * @returns {Response}
 */
export function badRequest(message, details) {
  return apiErrorResponse(400, "BAD_REQUEST", message, details);
}

/**
 * Create a 401 Unauthorized response.
 *
 * @param {string} [message='Authentication required'] - Error message
 * @returns {Response}
 */
export function unauthorized(message = "Authentication required") {
  return apiErrorResponse(401, "UNAUTHORIZED", message);
}

/**
 * Create a 403 Forbidden response.
 *
 * @param {string} [message='Access denied'] - Error message
 * @returns {Response}
 */
export function forbidden(message = "Access denied") {
  return apiErrorResponse(403, "FORBIDDEN", message);
}

/**
 * Create a 404 Not Found response.
 *
 * @param {string} [resource='Resource'] - Resource name
 * @returns {Response}
 */
export function notFound(resource = "Resource") {
  return apiErrorResponse(404, "NOT_FOUND", `${resource} not found`);
}

/**
 * Create a 409 Conflict response.
 *
 * @param {string} message - Conflict description
 * @returns {Response}
 */
export function conflict(message) {
  return apiErrorResponse(409, "CONFLICT", message);
}

/**
 * Create a 429 Too Many Requests response.
 *
 * @param {number} [retryAfterSec=60] - Retry-After in seconds
 * @returns {Response}
 */
export function tooManyRequests(retryAfterSec = 60) {
  return new Response(
    JSON.stringify({
      error: {
        status: 429,
        code: "RATE_LIMITED",
        message: "Too many requests, please try again later",
        retryAfter: retryAfterSec,
      },
    }),
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
 * Create a 500 Internal Server Error response.
 *
 * @param {string} [message='Internal server error'] - Error message
 * @returns {Response}
 */
export function internalError(message = "Internal server error") {
  return apiErrorResponse(500, "INTERNAL_ERROR", message);
}
