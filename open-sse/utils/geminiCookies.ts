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
