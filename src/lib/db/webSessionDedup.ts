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

/** Trimmed non-empty string, else null — local to avoid a cross-module import for one coercion. */
function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/**
 * Two-sided disambiguator match: `true` when both sides agree, `false` when
 * both carry a value and it differs, `undefined` when the field can't decide
 * (at most one side carries it) — the caller then defers to other fields.
 */
function fieldMatch(incoming: string | null, existing: string | null): boolean | undefined {
  if (incoming && existing) return incoming === existing;
  if (incoming || existing) return false;
  return undefined;
}

/**
 * Strictly two-sided disambiguator match: decides only when BOTH sides carry
 * the field. Unlike `fieldMatch`, a value present on one side alone stays
 * undecided, so rows stored before the field existed are never forked into a
 * duplicate on the next login.
 */
function bothSidesFieldMatch(
  incoming: string | null,
  existing: string | null
): boolean | undefined {
  if (incoming && existing) return incoming === existing;
  return undefined;
}

/**
 * Decide whether `row` (an existing `provider_connections` record) is the
 * same OAuth identity as an incoming connection carrying `incomingUsername`
 * and `incomingProfileArn` (#10815), plus `incomingOrganizationUuid` for
 * Claude.
 *
 * Three independent disambiguators, any of which can prove "different
 * account": `providerSpecificData.username` (generic username/IdP fallback),
 * `providerSpecificData.profileArn` (Kiro/AWS profile dedup — Kiro never
 * sets `username`) and `providerSpecificData.organizationUUID` (Claude, where
 * one identity reaches its personal workspace and any Team organization under
 * the same email and the same accountUUID). A field only rules a match IN/OUT
 * when both the incoming and existing record carry it; when neither carries
 * any of them the legacy bare-email match still applies unchanged.
 */
export function isMatchingOauthIdentity(
  row: { provider_specific_data?: unknown },
  incomingUsername: string | null,
  incomingProfileArn: string | null,
  incomingOrganizationUuid: string | null = null
): boolean {
  const existingPsd = parseProviderSpecificData(row.provider_specific_data);
  const usernameMatch = fieldMatch(incomingUsername, nonEmptyString(existingPsd?.username));
  const profileArnMatch = fieldMatch(incomingProfileArn, nonEmptyString(existingPsd?.profileArn));
  const organizationMatch = bothSidesFieldMatch(
    incomingOrganizationUuid,
    nonEmptyString(existingPsd?.organizationUUID)
  );
  if (usernameMatch === false || profileArnMatch === false || organizationMatch === false) {
    return false;
  }
  return true;
}
