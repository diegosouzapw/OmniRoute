export function stripCookieInputPrefix(rawValue: string): string {
  const trimmed = (rawValue || "").trim();
  if (!trimmed) return "";

  const withoutBearer = trimmed.replace(/^bearer\s+/i, "");
  return withoutBearer.replace(/^cookie:/i, "").trim();
}

export function normalizeSessionCookieHeader(rawValue: string, defaultCookieName: string): string {
  const normalized = stripCookieInputPrefix(rawValue);
  if (!normalized) return "";

  if (normalized.includes("=")) {
    return normalized;
  }

  return `${defaultCookieName}=${normalized}`;
}

/**
 * Extract a single cookie's value from whatever the user pasted. Handles:
 *   - bare value:                    "eyJ0eXAi..."          → "eyJ0eXAi..."
 *   - single pair:                   "sso=eyJ0eXAi..."      → "eyJ0eXAi..."
 *   - full DevTools cookie blob:     "foo=1; sso=eyJ...; bar=2" → "eyJ..."
 * Returns "" if a blob is given that does not contain the named cookie.
 */
export function extractCookieValue(rawValue: string, cookieName: string): string {
  const trimmed = stripCookieInputPrefix(rawValue);
  if (!trimmed) return "";

  if (trimmed.includes(";")) {
    const escaped = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = trimmed.match(new RegExp("(?:^|;\\s*)" + escaped + "=([^;\\s]+)"));
    return match ? match[1] : "";
  }

  const prefix = `${cookieName}=`;
  if (trimmed.startsWith(prefix)) return trimmed.slice(prefix.length);

  return trimmed;
}

/**
 * Build the `Cookie` header value for grok.com from whatever the user pasted.
 *
 * Always emits `sso=<value>`. When the pasted blob also carries the paired
 * `sso-rw` write cookie, it is forwarded too — Grok's anti-bot now rejects
 * requests that send `sso` without `sso-rw` (error code 7, #3063). `sso-rw` is
 * only appended when it appears as a real cookie pair in the input, so a bare
 * `sso` value (no `;`/`=`) is never mistaken for an `sso-rw` value.
 *
 * The Cloudflare cookies `cf_clearance` and `__cf_bm` are forwarded the same
 * way when present (#5350) — Cloudflare on grok.com expects the same clearance
 * the browser earned, and AIClient2API forwards them too. Like `sso-rw`, each is
 * appended only when it appears as a real cookie pair, so a bare `sso` blob
 * still produces exactly `sso=<value>` (no phantom cf keys).
 *
 * Returns "" when no `sso` value can be extracted.
 */
export function buildGrokCookieHeader(rawValue: string): string {
  const sso = extractCookieValue(rawValue, "sso");
  if (!sso) return "";

  const parts = [`sso=${sso}`];
  for (const name of ["sso-rw", "cf_clearance", "__cf_bm"]) {
    if (new RegExp("(?:^|;\\s*)" + name + "=").test(rawValue)) {
      const value = extractCookieValue(rawValue, name);
      if (value) parts.push(`${name}=${value}`);
    }
  }
  return parts.join("; ");
}

/**
 * Build the `Cookie` header value for chat.qwen.ai (Qwen Web / Tongyi).
 *
 * The Qwen v2 API sits behind Alibaba's "baxia" WAF, which requires the full
 * browser cookie jar from a real logged-in session (`cna`, `ssxmod_itna`,
 * `ssxmod_itna2`, `token`, `_bl_uid`, `x-ap`, ...). Unlike grok we cannot
 * reconstruct a canonical subset, so we forward the whole pasted/captured blob
 * verbatim (minus a leading `Cookie:`/`bearer ` prefix).
 *
 * A bare token (no cookie pairs, i.e. no `=`) yields "" — there is no jar to
 * replay, only a bearer credential (handled by {@link extractQwenToken}).
 */
export function buildQwenCookieHeader(rawValue: string): string {
  const trimmed = stripCookieInputPrefix(rawValue);
  if (!trimmed || !trimmed.includes("=")) return "";
  return trimmed;
}

/**
 * Extract the Qwen bearer token from whatever the user pasted/captured.
 *
 * Qwen stores its auth JWT in localStorage as `token`, and chat.qwen.ai also
 * mirrors it into a `token` cookie. So:
 *   - full cookie blob with `token=...`  → that value
 *   - bare token (no cookie pairs)       → the value itself
 *   - cookie blob without a `token` pair → "" (token must come from elsewhere)
 */
export function extractQwenToken(rawValue: string): string {
  const trimmed = stripCookieInputPrefix(rawValue);
  if (!trimmed) return "";
  if (!trimmed.includes("=")) return trimmed;
  const match = trimmed.match(/(?:^|;\s*)token=([^;\s]+)/);
  return match ? match[1] : "";
}

/**
 * Pull the `kimi-auth` JWT out of whatever the user pasted for the
 * international Kimi consumer chat (www.kimi.com).
 *
 * Accepts (all return the same JWT string):
 *   - bare JWT                       `eyJhbGci...sig`
 *   - full Cookie header             `_ga=...; kimi-auth=eyJ...; theme=dark`
 *   - `Cookie:` / `Authorization: Bearer` prefixed forms
 *   - stray `Bearer eyJ...` without a header label
 *
 * Returns "" if no JWT can be located.
 */
export function extractKimiJwt(rawValue: string): string {
  const trimmed = stripCookieInputPrefix(rawValue);
  if (!trimmed) return "";

  // Bare JWT — three base64url segments separated by dots.
  if (/^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(trimmed)) {
    return trimmed;
  }

  // Cookie-style pair: pull `kimi-auth=<value>` out of the blob.
  const match = trimmed.match(/(?:^|[\s;])kimi-auth=([^;\s]+)/);
  if (match) return match[1];

  // Last resort: a `Bearer <jwt>` pasted without the header label.
  const bearer = trimmed.match(/bearer\s+(eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/i);
  if (bearer) return bearer[1];

  return "";
}

export function normalizeSessionCookieHeaders(
  rawValues: Array<string | null | undefined>,
  defaultCookieName: string
): string[] {
  const seen = new Set<string>();
  const normalizedHeaders: string[] = [];

  for (const rawValue of rawValues) {
    if (typeof rawValue !== "string") continue;
    const normalized = normalizeSessionCookieHeader(rawValue, defaultCookieName);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    normalizedHeaders.push(normalized);
  }

  return normalizedHeaders;
}
