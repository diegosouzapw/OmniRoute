export function stripCookieInputPrefix(rawValue: string): string {
  const trimmed = (rawValue || "").trim();
  if (!trimmed) return "";

  const withoutBearer = trimmed.replace(/^bearer\s+/i, "");
  return withoutBearer.replace(/^cookie:/i, "").trim();
}

/**
 * Parse a JSON array of cookie objects and produce a Cookie header string.
 *
 * Accepts the format exported by browser cookie-editor extensions / DevTools:
 * ```json
 * [
 *   {"name":"sso","value":"eyJ0eXAi...","domain":".example.com","path":"/"},
 *   {"name":"sso-rw","value":"eyJOTHER..."}
 * ]
 * ```
 *
 * Only `name` and `value` are required. Extra fields (domain, path, expires,
 * httpOnly, secure, sameSite) are silently ignored — they describe the cookie
 * but are not part of the `Cookie` request header.
 *
 * @param rawValue - The user-provided cookie string (possibly JSON).
 * @returns A Cookie header string, null if the input is not JSON (pass-through).
 * @throws {Error} If a JSON entry is missing the required `name` or `value` field.
 */
export function parseJsonCookiesToHeader(rawValue: string): string | null {
  const trimmed = (rawValue || "").trim();
  if (!trimmed || !trimmed.startsWith("[")) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return null;
  }

  if (!Array.isArray(parsed)) return null;
  if (parsed.length === 0) return "";

  const parts: string[] = [];
  for (let i = 0; i < parsed.length; i++) {
    const entry = parsed[i];
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new Error(`Invalid cookie JSON at index ${i}: expected an object`);
    }
    const record = entry as Record<string, unknown>;

    if (typeof record.name !== "string" || !record.name) {
      throw new Error(`Invalid cookie JSON at index ${i}: missing required field 'name'`);
    }
    if (typeof record.value !== "string") {
      throw new Error(`Invalid cookie JSON at index ${i}: missing required field 'value'`);
    }

    parts.push(`${record.name}=${record.value}`);
  }

  return parts.join("; ");
}

export function normalizeSessionCookieHeader(rawValue: string, defaultCookieName: string): string {
  const stripped = stripCookieInputPrefix(rawValue);
  if (!stripped) return "";

  const jsonResult = parseJsonCookiesToHeader(stripped);
  if (jsonResult !== null) {
    return jsonResult;
  }

  if (stripped.includes("=")) {
    return stripped;
  }

  return `${defaultCookieName}=${stripped}`;
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

/** Extract Kimi Web's current localStorage access token, with legacy cookie compatibility. */
export function extractKimiAccessToken(rawValue: string): string {
  const raw = String(rawValue ?? "").trim();
  if (!raw) return "";

  // 1. JSON dump extraction
  if (raw.startsWith("{") && raw.endsWith("}")) {
    try {
      const parsed = JSON.parse(raw);
      const access = parsed?.access_token || parsed?.token || "";
      if (access && typeof access === "string") return access.trim();
    } catch {}
  }

  const bearer = raw.match(/^(?:authorization:\s*)?bearer\s+([^;\s]+)/i);
  if (bearer) return bearer[1];

  const trimmed = stripCookieInputPrefix(raw);
  for (const key of ["access_token", "kimi-auth"]) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = trimmed.match(new RegExp(`(?:^|[\\s;])${escaped}=([^;\\s]+)`));
    if (match) return match[1];
  }

  return !trimmed.includes("=") && !trimmed.includes(";") ? trimmed : "";
}

/** Extract Kimi Web refresh_token from key-value, raw string, or localStorage JSON dump. */
export function extractKimiRefreshToken(rawValue: string): string {
  const raw = String(rawValue ?? "").trim();
  if (!raw) return "";

  // 1. JSON dump extraction
  if (raw.startsWith("{") && raw.endsWith("}")) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed?.refresh_token && typeof parsed.refresh_token === "string") {
        return parsed.refresh_token.trim();
      }
    } catch {}
  }

  // 2. Key-value extraction
  const match = raw.match(/(?:^|[\s;])refresh_token=([^;\s]+)/);
  if (match) return match[1];

  return "";
}

/** Extract both access_token and refresh_token from user input. */
export function extractKimiCredentials(rawValue: string): {
  accessToken: string;
  refreshToken: string;
} {
  const raw = String(rawValue ?? "").trim();
  if (!raw) return { accessToken: "", refreshToken: "" };

  return {
    accessToken: extractKimiAccessToken(raw),
    refreshToken: extractKimiRefreshToken(raw),
  };
}

/** @deprecated Use extractKimiAccessToken; retained for existing imports. */
export function extractKimiJwt(rawValue: string): string {
  return extractKimiAccessToken(rawValue);
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
