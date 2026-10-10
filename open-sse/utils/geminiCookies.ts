type CookieRecord = Record<string, unknown>;

function cookiePairsFromJson(raw: string): string[] {
  if (!raw.startsWith("{")) return [];
  try {
    const parsed = JSON.parse(raw) as CookieRecord;
    const cookies =
      parsed.cookies && typeof parsed.cookies === "object" && !Array.isArray(parsed.cookies)
        ? (parsed.cookies as CookieRecord)
        : parsed;
    return Object.entries(cookies)
      .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
      .map(([name, value]) => `${name}=${String(value).trim()}`);
  } catch {
    return [];
  }
}

/** Normalize a pasted Gemini cookie header, bare PSID, or browser-export JSON. */
export function normalizeGeminiCookieInput(raw: string, cookieName = "__Secure-1PSID"): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const jsonPairs = cookiePairsFromJson(trimmed);
  if (jsonPairs.length > 0) return jsonPairs.join("; ");
  return trimmed.includes("=") ? trimmed : `${cookieName}=${trimmed}`;
}

/**
 * #15387: normalize a pasted Gemini credential for the connection test and make sure it
 * actually carries a non-empty `__Secure-1PSID` cookie. Strips a pasted `Cookie:` header
 * prefix. Returns `null` when no PSID is present so callers can reject before any network call.
 */
export function normalizeGeminiValidationCookie(raw: string): string | null {
  const cookie = normalizeGeminiCookieInput(raw.trim().replace(/^cookie:\s*/i, ""));
  const psid = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.toLowerCase().startsWith("__secure-1psid="));
  if (!psid || psid.slice(psid.indexOf("=") + 1).trim().length === 0) return null;
  return cookie;
}
