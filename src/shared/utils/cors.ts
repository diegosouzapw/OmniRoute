/**
 * Static CORS headers for route handlers.
 *
 * `Access-Control-Allow-Origin` is intentionally NOT set here. The middleware
 * (`src/middleware.ts` → `applyCorsHeaders`) is the single source of truth for
 * which origin to echo, based on the central allowlist in
 * `src/server/cors/origins.ts`. Route handlers may keep spreading
 * `CORS_HEADERS` for the standard methods/allowed-headers; the middleware
 * overlays the proper origin on the way out.
 */
export const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, x-api-key, anthropic-version, x-omniroute-connection, x-internal-test, accept",
} as const;

/**
 * Preflight responder kept for routes that still ship their own OPTIONS handler.
 * Returning 204 with `CORS_HEADERS` is enough; the middleware will add the
 * allowed origin and `Vary: Origin` before the response leaves the server.
 */
export function handleCorsOptions(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
