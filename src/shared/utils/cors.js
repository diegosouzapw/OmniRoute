/**
 * Shared CORS configuration for all API routes.
 *
 * Centralizes the Access-Control-Allow-Origin header so it can be
 * configured via the CORS_ORIGIN environment variable instead of
 * being hardcoded as "*" in every route handler.
 *
 * Usage:
 *   import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
 *
 *   // In route responses:
 *   return new Response(body, { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } });
 *
 *   // For OPTIONS preflight:
 *   export function OPTIONS() { return handleCorsOptions(); }
 */

const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

/**
 * Standard CORS headers to spread into any Response.
 * @type {Record<string, string>}
 */
export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": CORS_ORIGIN,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-api-key, anthropic-version",
};

/**
 * Handle CORS preflight (OPTIONS) request.
 * @returns {Response} 204 No Content with CORS headers
 */
export function handleCorsOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
