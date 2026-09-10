/**
 * MaxAI connection credential resolution.
 *
 * MaxAI's request signer needs three things bound together: the OpenAI-style
 * `access_token` (Bearer, ~24h), the `device_id` that minted it (embedded in the
 * signed `X-Authorization` — a mismatch is rejected), and the `user_id` (folded
 * into the signature proof). OmniRoute stores these in the connection's
 * `providerSpecificData` (minted by OmniRoute's own browser-mint flow — see
 * maxaiBrowserLogin), so the router is self-contained and never reads any
 * external (Hermes) token file.
 *
 * The access token is refreshed out-of-band by the browser-mint (the
 * `/oauth/refresh_access_token` endpoint is deep-TLS-gated and cannot be called
 * by any HTTP client — only a real browser passes), so this module only READS
 * the stored credential; it does not attempt an HTTP refresh.
 */

export interface MaxaiCredential {
  accessToken: string;
  deviceId: string;
  userId: string;
  /** ~1-year refresh token used for browserless access-token refresh (optional). */
  refreshToken?: string;
}

type ProviderSpecificData = Record<string, unknown> | null | undefined;

function firstString(...values: unknown[]): string | null {
  for (const v of values) {
    if (typeof v === "string") {
      // Raw browser LocalStorage sometimes wraps the device id in quotes.
      const trimmed = v.trim().replace(/^"|"$/g, "");
      if (trimmed.length > 0) return trimmed;
    }
  }
  return null;
}

/** Decode the `user_id` from a MaxAI access JWT (subject.user_id or sub). No verify. */
export function userIdFromJwt(accessToken: string): string | null {
  try {
    const seg = accessToken.split(".")[1];
    if (!seg) return null;
    const b64 = seg.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (seg.length % 4)) % 4);
    const claims = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
    const subject = claims?.subject as { user_id?: unknown } | undefined;
    if (typeof subject?.user_id === "string") return subject.user_id;
    if (typeof claims?.sub === "string") return claims.sub;
    return null;
  } catch {
    return null;
  }
}

/** Epoch seconds of the access-JWT `exp`, or 0 when undecodable. */
export function accessTokenExpiry(accessToken: string): number {
  try {
    const seg = accessToken.split(".")[1];
    if (!seg) return 0;
    const b64 = seg.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (seg.length % 4)) % 4);
    const claims = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
    return typeof claims?.exp === "number" ? claims.exp : 0;
  } catch {
    return 0;
  }
}

/**
 * Resolve the MaxAI credential from a connection's providerSpecificData (with the
 * OpenAI-style `access_token` optionally supplied separately by the caller, which
 * is how OmniRoute threads the stored connection token). Returns null when not
 * fully configured (all three of accessToken/deviceId/userId required).
 */
export function resolveMaxaiCredential(
  psd: ProviderSpecificData,
  accessTokenFromConnection?: string | null
): MaxaiCredential | null {
  const accessToken = firstString(
    accessTokenFromConnection,
    psd?.maxaiAccessToken,
    psd?.accessToken
  );
  if (!accessToken) return null;

  const deviceId = firstString(psd?.maxaiDeviceId, psd?.deviceId);
  if (!deviceId) return null;

  const userId =
    firstString(psd?.maxaiUserId, psd?.userId) ?? userIdFromJwt(accessToken);
  if (!userId) return null;

  const refreshToken =
    firstString(psd?.maxaiRefreshToken, psd?.refreshToken) ?? undefined;

  return { accessToken, deviceId, userId, refreshToken };
}
