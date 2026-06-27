/**
 * Per-request Content-Security-Policy builder (#5083).
 *
 * The static CSP in next.config.mjs only covers loopback origins.
 * When OmniRoute is reached from a LAN, Tailscale, or public hostname the
 * dashboard opens WebSocket connections to ws://<window.location.hostname>:*
 * which the browser blocks because that host is absent from connect-src.
 *
 * Fix: build the CSP per-request by reading the validated Host header and
 * appending ws://<host>:* / http://<host>:* to connect-src.
 *
 * Security constraints:
 *  - The Host header value is VALIDATED with a strict hostname/IPv4 regex
 *    before being interpolated into any CSP directive.  An invalid or
 *    injection-shaped Host (e.g. "evil.com ; script-src *") is silently
 *    ignored — the baseline CSP is returned unchanged.
 *  - Loopback hosts are excluded (already covered by the baseline).
 *  - Bounded quantifiers are used throughout to prevent ReDoS
 *    (CLAUDE.md §PII §1).
 */

/** Loopback hostnames that need no additional connect-src entry. */
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

/**
 * Strict allow-regex for a hostname that is safe to inject into a CSP
 * directive value.  Accepts:
 *   • IPv4   — four octets of 1-3 decimal digits
 *   • Label  — RFC-1123 hostname labels (alphanumeric + hyphen, 1-63 chars
 *               each), up to 10 labels joined by dots
 * Explicitly rejects anything containing space, ";", "'", or other CSP
 * meta-characters.  Uses bounded repetition to prevent ReDoS.
 */
const VALID_HOST_RE =
  /^(?:(?:\d{1,3}\.){3}\d{1,3}|(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.){0,10}[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)$/i;

/**
 * Extract and validate the plain hostname from a raw `Host` header value
 * (which may include a port, e.g. "192.168.1.5:20128").
 *
 * Returns the lower-cased hostname if it is a valid, non-loopback host that
 * is safe to interpolate into a CSP directive; returns `null` otherwise.
 */
export function sanitizeHostForCsp(rawHost: string | null): string | null {
  if (!rawHost) return null;
  let host = rawHost.trim();

  // Reject IPv6 literals — loopback [::1] is already in the baseline; other
  // IPv6 LAN addresses are uncommon and harder to validate safely here.
  if (host.startsWith("[")) return null;

  // Strip trailing :port for IPv4 / plain hostname (a single colon).
  // A bare IPv6 address has multiple colons; we already rejected "[" above.
  const colonCount = (host.match(/:/g) ?? []).length;
  if (colonCount === 1) {
    host = host.split(":")[0];
  } else if (colonCount > 1) {
    // Unbracketed multi-colon string — likely a bare IPv6 address or
    // injection attempt; reject.
    return null;
  }

  host = host.toLowerCase();
  if (LOOPBACK_HOSTS.has(host)) return null; // already in baseline
  if (!VALID_HOST_RE.test(host)) return null; // invalid / injection attempt
  return host;
}

/**
 * The baseline connect-src value that always applies.
 * Covers loopback HTTP + WS, plus bare https:/wss: for external API calls.
 */
const BASELINE_CONNECT_SRC =
  "connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https: wss:";

/**
 * Ordered CSP directive parts that form the baseline policy.
 * Kept here so unit tests can assert individual directives without
 * parsing the full concatenated string.
 */
export const CSP_BASELINE_PARTS: ReadonlyArray<string> = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob:",
  BASELINE_CONNECT_SRC,
  "worker-src 'self' blob:",
  "manifest-src 'self'",
];

/**
 * Build a per-request Content-Security-Policy that extends the loopback
 * baseline with `ws://<host>:*` and `http://<host>:*` when the Host header
 * carries a validated non-loopback hostname or IPv4 address.
 *
 * @param rawHost  Value of the `Host` request header (may include port).
 *                 `null` is safe — returns the loopback baseline unchanged.
 */
export function buildCspForHost(rawHost: string | null): string {
  const host = sanitizeHostForCsp(rawHost);
  if (!host) {
    return CSP_BASELINE_PARTS.join("; ");
  }

  // Inject the validated host into connect-src only — never into other directives.
  const parts = CSP_BASELINE_PARTS.map((p) =>
    p.startsWith("connect-src ") ? `${p} ws://${host}:* http://${host}:*` : p
  );
  return parts.join("; ");
}
