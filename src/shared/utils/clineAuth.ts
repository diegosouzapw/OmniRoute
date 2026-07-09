/**
 * Cline (cline.bot) auth-shape helpers.
 *
 * Cline's API expects the bearer token to be prefixed with `workos:` (the
 * upstream auth provider), and a set of Cline client-identification headers
 * (HTTP-Referer / X-Title / X-CLIENT-* / X-PLATFORM*). Plain `Bearer <token>`
 * without the `workos:` prefix is rejected upstream, so every Cline request
 * must route its headers through `buildClineHeaders()`.
 */

const APP_VERSION = process.env.npm_package_version || "0.0.0";

/**
 * Normalize a raw Cline token into the `workos:`-prefixed access-token shape
 * Cline expects. Idempotent: a token that already carries the prefix is
 * returned untouched. Non-string / empty input yields an empty string.
 */
export function getClineAccessToken(token: unknown): string {
  if (typeof token !== "string") return "";
  const trimmed = token.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("workos:") ? trimmed : `workos:${trimmed}`;
}

/**
 * Build the full `Authorization` header value for a Cline request, or an empty
 * string when no usable token is present.
 */
export function getClineAuthorizationHeader(token: unknown): string {
  const accessToken = getClineAccessToken(token);
  return accessToken ? `Bearer ${accessToken}` : "";
}

/**
 * Build the complete Cline client header set, optionally merged with caller
 * extras. The `Authorization` header is only added when a usable token is
 * present (so callers can build probe headers without a token).
 */
export function buildClineHeaders(
  token: unknown,
  extraHeaders: Record<string, string> = {}
): Record<string, string> {
  const authorization = getClineAuthorizationHeader(token);
  const headers: Record<string, string> = {
    "HTTP-Referer": "https://cline.bot",
    "X-Title": "Cline",
    "User-Agent": `OmniRoute/${APP_VERSION}`,
    "X-PLATFORM": process.platform || "unknown",
    "X-PLATFORM-VERSION": process.version || "unknown",
    "X-CLIENT-TYPE": "omniroute",
    "X-CLIENT-VERSION": APP_VERSION,
    "X-CORE-VERSION": APP_VERSION,
    "X-IS-MULTIROOT": "false",
    ...extraHeaders,
  };

  if (authorization) {
    headers.Authorization = authorization;
  }

  return headers;
}

/**
 * Build headers for a ClinePass request. ClinePass is dual-auth: an OAuth
 * connection (workos:-prefixed token in `accessToken`) needs the full Cline
 * client header set from `buildClineHeaders()`; a BYOK API-key connection
 * (`sk_...` key, #5942) sends the key as a plain Bearer token — no `workos:`
 * prefix — alongside the Cline identification headers.
 */
export function buildClinepassHeaders(
  credentials: { accessToken?: unknown; apiKey?: unknown } | null | undefined,
  effectiveKey?: string
): Record<string, string> {
  if (credentials?.accessToken) {
    return buildClineHeaders(credentials.accessToken);
  }
  const headers: Record<string, string> = {
    "HTTP-Referer": "https://cline.bot",
    "X-Title": "Cline",
  };
  const byokKey = effectiveKey || (credentials?.apiKey as string | undefined);
  if (byokKey) headers.Authorization = `Bearer ${byokKey}`;
  return headers;
}
