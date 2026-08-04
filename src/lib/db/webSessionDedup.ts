/**
 * db/webSessionDedup.ts — pure helpers for de-duplicating web-session
 * (cookie/token) provider credentials. Extracted from providers.ts so the
 * cookie-dedup wiring there stays thin (#3368 PR6). No DB access here.
 */

/**
 * Reduce a `provider_specific_data` record to a single comparable credential
 * value. Cookie/token credentials are mirrored across a provider's storage
 * keys (e.g. `cookie`, `sessionToken`, `token`) with the same secret value, so
 * any one of them identifies the session. Returns the trimmed value, or null
 * when no usable string credential is present.
 */
const PREFERRED_CREDENTIAL_KEYS = [
  "cookie",
  "token",
  "sessionToken",
  "session-token",
  "sso",
  "access_token",
  "accessToken",
];

/** First trimmed non-empty string value among `keys` of `rec`, else null. */
function firstNonEmptyString(rec: Record<string, unknown>, keys: readonly string[]): string | null {
  for (const key of keys) {
    const value = rec[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

export function webSessionCredentialKey(psd: unknown): string | null {
  if (!psd || typeof psd !== "object") return null;
  const rec = psd as Record<string, unknown>;
  // Prefer canonical credential keys, then fall back to the first non-empty
  // string value (sorted for determinism).
  return (
    firstNonEmptyString(rec, PREFERRED_CREDENTIAL_KEYS) ??
    firstNonEmptyString(rec, Object.keys(rec).sort())
  );
}

/** Parse a stored `provider_specific_data` column (JSON string or object). */
export function parseProviderSpecificData(raw: unknown): Record<string, unknown> | null {
  if (!raw) return null;
  if (typeof raw === "object") return raw as Record<string, unknown>;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  }
  return null;
}
