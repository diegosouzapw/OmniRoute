/**
 * User-supplied upstream extra headers: names we never forward (Host / hop-by-hop / framing).
 * Changing this list requires syncing: `sanitizeUpstreamHeadersMap` (models.ts), Zod
 * `upstreamHeaderNameSchema` / record refine (schemas.ts), and `upstream-headers-sanitize` tests.
 *
 * The forwarding/IP set (x-forwarded-for, x-real-ip, cf-connecting-ip, forwarded, via, …)
 * is forbidden so the client-origin IP can never be disclosed (or spoofed) to the upstream
 * provider through an operator-set custom upstream header. This mirrors the established
 * scrubbers/denylists already used by the Antigravity (`antigravityHeaderScrub.ts`) and
 * Cursor CLI (`cursorCliProxy.ts`) paths, extended here to cover every provider.
 */
const FORBIDDEN = new Set(
  [
    "host",
    "connection",
    "content-length",
    "keep-alive",
    "proxy-connection",
    "transfer-encoding",
    "te",
    "trailer",
    "upgrade",
    // Origin-IP disclosure: never send the client's forwarding headers upstream.
    "x-forwarded-for",
    "x-forwarded-host",
    "x-forwarded-proto",
    "x-forwarded-port",
    "x-forwarded-server",
    "x-real-ip",
    "cf-connecting-ip",
    "true-client-ip",
    "client-ip",
    "forwarded",
    "via",
  ].map((s) => s.toLowerCase())
);

export function isForbiddenUpstreamHeaderName(name: string): boolean {
  return FORBIDDEN.has(String(name).trim().toLowerCase());
}

/**
 * Auth headers that must come from the connection's credentials, never from
 * operator-set per-provider custom headers. Kept here as the single source of
 * truth so the Zod `customHeadersSchema` (schemas.ts) and the executor's
 * apply-loop (open-sse/executors/default.ts) cannot drift apart.
 */
const FORBIDDEN_AUTH = new Set(
  ["authorization", "x-api-key", "x-goog-api-key", "api-key", "cookie"].map((s) => s.toLowerCase())
);

/**
 * Forbidden for operator-supplied custom headers: the hop-by-hop/framing set
 * PLUS auth headers (owned by the credential layer). Use this in both the
 * validation schema and the executor so there is one canonical denylist.
 */
export function isForbiddenCustomHeaderName(name: string): boolean {
  const n = String(name).trim().toLowerCase();
  return isForbiddenUpstreamHeaderName(n) || FORBIDDEN_AUTH.has(n);
}
