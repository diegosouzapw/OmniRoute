/**
 * Centralized CORS origin allowlist.
 *
 * Source of truth for which browser origins may call OmniRoute over CORS.
 * No wildcard default. To allow any origin, opt in via `CORS_ALLOW_ALL=true`.
 *
 * Resolution order:
 *   1. If `CORS_ALLOW_ALL=true` → echo any origin back (effectively `*`,
 *      but with `Vary: Origin` so caches stay correct).
 *   2. Otherwise, the request's `Origin` is matched (case-insensitive,
 *      trailing slash ignored) against the allowlist.
 *   3. Allowlist sources (merged): env `CORS_ALLOWED_ORIGINS` (csv) and
 *      anything injected at runtime via `setRuntimeAllowedOrigins()` from
 *      the persisted settings layer.
 *
 * The middleware applies the resolved value via `applyCorsHeaders()`.
 * Per-route handlers no longer set `Access-Control-Allow-Origin` themselves.
 */
const ENV_ALLOW_ALL = "CORS_ALLOW_ALL";
const ENV_ALLOWED = "CORS_ALLOWED_ORIGINS";
const LEGACY_ENV_SINGLE = "CORS_ORIGIN";

const STANDARD_ALLOW_HEADERS =
  "Content-Type, Authorization, x-api-key, anthropic-version, x-omniroute-connection, x-internal-test, accept";
const STANDARD_ALLOW_METHODS = "GET, POST, PUT, DELETE, PATCH, OPTIONS";

let runtimeAllowedOrigins: ReadonlySet<string> = new Set();

/**
 * Persisted-setting hook. The settings layer should call this whenever the
 * stored `corsOrigins` value changes (csv string).
 */
export function setRuntimeAllowedOrigins(csv: string | null | undefined): void {
  runtimeAllowedOrigins = parseOriginList(csv);
}

export function getRuntimeAllowedOrigins(): ReadonlySet<string> {
  return runtimeAllowedOrigins;
}

function parseOriginList(value: string | null | undefined): Set<string> {
  const result = new Set<string>();
  if (!value) return result;
  for (const raw of value.split(",")) {
    const v = raw.trim();
    if (!v) continue;
    result.add(normalizeOrigin(v));
  }
  return result;
}

function normalizeOrigin(origin: string): string {
  let normalized = origin.toLowerCase();
  while (normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

function envAllowAll(): boolean {
  const raw = process.env[ENV_ALLOW_ALL];
  if (!raw) {
    // Backward-compat: legacy `CORS_ORIGIN=*` behaves like allow-all.
    return process.env[LEGACY_ENV_SINGLE]?.trim() === "*";
  }
  return raw.trim().toLowerCase() === "true" || raw.trim() === "1";
}

function envAllowedOrigins(): Set<string> {
  const fromList = parseOriginList(process.env[ENV_ALLOWED]);
  const legacy = process.env[LEGACY_ENV_SINGLE]?.trim();
  if (legacy && legacy !== "*") {
    fromList.add(normalizeOrigin(legacy));
  }
  return fromList;
}

/**
 * Resolve which value should be returned in `Access-Control-Allow-Origin`
 * for the given request origin, or `null` if the origin is not allowed.
 *
 * Returns the original (un-normalized) origin string when allowed so the
 * browser sees an exact echo and cookies/credentials work correctly.
 */
export function resolveAllowedOrigin(requestOrigin: string | null | undefined): string | null {
  if (envAllowAll()) {
    // `*` is only safe when no credentials are involved; if a request did
    // arrive with an Origin header, echo it back with Vary so credentialed
    // flows can opt in via the explicit allowlist instead.
    return requestOrigin && requestOrigin.length > 0 ? requestOrigin : "*";
  }
  if (!requestOrigin) return null;
  const normalized = normalizeOrigin(requestOrigin);
  if (envAllowedOrigins().has(normalized)) return requestOrigin;
  if (runtimeAllowedOrigins.has(normalized)) return requestOrigin;
  return null;
}

/**
 * Apply CORS headers to a response in-place. Safe to call on any response
 * (rejections, preflight, normal `next()` continuations). When the origin
 * is not allowed, no `Access-Control-Allow-Origin` is added — browsers
 * will block the response, which is the desired fail-closed behavior.
 */
export function applyCorsHeaders(response: Response, request: Request): void {
  const requestOrigin = request.headers.get("origin");
  const allowed = resolveAllowedOrigin(requestOrigin);
  if (allowed !== null) {
    response.headers.set("Access-Control-Allow-Origin", allowed);
    response.headers.append("Vary", "Origin");
  }
  response.headers.set("Access-Control-Allow-Methods", STANDARD_ALLOW_METHODS);
  response.headers.set("Access-Control-Allow-Headers", STANDARD_ALLOW_HEADERS);
  const requestedHeaders = request.headers.get("access-control-request-headers");
  if (requestedHeaders) {
    response.headers.set("Access-Control-Allow-Headers", requestedHeaders);
  }
}

/**
 * Plain-object form for handlers that still need static CORS headers
 * (no origin echo). Middleware overlays the proper `Access-Control-Allow-Origin`
 * later on the way out.
 */
export const STATIC_CORS_HEADERS: Readonly<Record<string, string>> = Object.freeze({
  "Access-Control-Allow-Methods": STANDARD_ALLOW_METHODS,
  "Access-Control-Allow-Headers": STANDARD_ALLOW_HEADERS,
});
