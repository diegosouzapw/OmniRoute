import { extractCookieValue, stripCookieInputPrefix } from "@/lib/providers/webCookieAuth";

export function isEncryptedCredentialBlob(value: unknown): boolean {
  return typeof value === "string" && value.trim().startsWith("enc:v1:");
}

/**
 * Resolve the pasted cookie for a notrack-web connection. The dashboard add
 * flow stores it in `apiKey`; the bulk web-session importer (cookie-kind) keeps
 * `apiKey` null and stores the value in `providerSpecificData.cookie` — read
 * both so imported sessions authenticate.
 */
export function resolveNotrackCookieSource(credentials: {
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}): string {
  if (credentials.apiKey && credentials.apiKey.trim()) return credentials.apiKey;
  const psdCookie = credentials.providerSpecificData?.cookie;
  return typeof psdCookie === "string" ? psdCookie : "";
}

/**
 * Build the `Cookie` header value for notrack.ai from whatever the user pasted.
 *
 * When the pasted string contains the named session cookies (uid, si_usr_id,
 * si_ses_id) we rebuild a clean `Cookie` header with only those pairs — plus
 * `nt_session` (the `ntk_…` auth token set for logged-in accounts) when
 * present, so authenticated sessions are not silently downgraded to anonymous.
 * If any named cookie is missing we forward the raw pasted string verbatim.
 */
export function buildNotrackCookie(rawApiKey: string): { cookie: string; hasSession: boolean } {
  const raw = stripCookieInputPrefix(rawApiKey || "");
  if (!raw) return { cookie: "", hasSession: false };

  const uid = raw.includes("uid=") ? extractCookieValue(raw, "uid") : "";
  const siUsrId = raw.includes("si_usr_id=") ? extractCookieValue(raw, "si_usr_id") : "";
  const siSesId = raw.includes("si_ses_id=") ? extractCookieValue(raw, "si_ses_id") : "";

  if (uid && siUsrId && siSesId) {
    const parts = [`uid=${uid}`, `si_usr_id=${siUsrId}`, `si_ses_id=${siSesId}`];
    const ntSession = raw.includes("nt_session=") ? extractCookieValue(raw, "nt_session") : "";
    if (ntSession) parts.push(`nt_session=${ntSession}`);
    return { cookie: parts.join("; "), hasSession: true };
  }

  return { cookie: raw, hasSession: raw.trim().length > 0 };
}
