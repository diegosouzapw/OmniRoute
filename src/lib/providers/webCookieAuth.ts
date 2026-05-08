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
