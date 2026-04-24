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
