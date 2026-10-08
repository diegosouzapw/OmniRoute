/**
 * Dashboard session token — the ONE verifier for the `auth_token` cookie.
 *
 * A dashboard session is a JWT that verifies against JWT_SECRET AND carries
 * `authenticated: true` — the claim every session minter emits
 * (`api/auth/login`, `api/auth/oidc/callback`, the authz pipeline refresh).
 * Other tokens signed with the same secret exist (the Cursor CLI passthrough
 * mints `iss "omniroute" / aud "cursor-cli"` tokens for any key holder) and
 * MUST NOT verify as a session: before #13298 any such token forged the
 * cookie and reached instance-wide operations. Every place that trusts the
 * cookie goes through `verifyDashboardSessionToken`; a bare `jwtVerify` on
 * `auth_token` is a regression (guarded by
 * tests/unit/dashboard-session-verifier-source-guard.test.ts).
 */
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const DASHBOARD_SESSION_COOKIE = "auth_token";
export const DASHBOARD_SESSION_CLAIM = "authenticated";

/** Sessions issued before this second (unix seconds) are no longer valid. Set on a password change. */
export const SESSIONS_VALID_AFTER_SETTING = "sessionsValidAfter";
/** Ids (`jti`) of sessions that signed out before they expired, kept until their own expiry. */
export const REVOKED_SESSIONS_SETTING = "revokedDashboardSessions";
const MAX_REVOKED_SESSIONS = 500;

export type RevokedSession = { jti: string; exp: number };

/**
 * Mint a dashboard session token. Every minter goes through here so each session carries an
 * issue time and an id, which is what `verifyDashboardSessionToken` needs to honour a password
 * change or a sign-out before the 30 days are up.
 */
export async function mintDashboardSessionToken(secret: Uint8Array): Promise<string> {
  return new SignJWT({ [DASHBOARD_SESSION_CLAIM]: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setJti(crypto.randomUUID())
    .setExpirationTime("30d")
    .sign(secret);
}

/** The revoked-session list with `jti` added and entries past their own expiry dropped. */
export function addRevokedSession(
  current: unknown,
  session: RevokedSession,
  nowSeconds: number
): RevokedSession[] {
  const kept = (Array.isArray(current) ? (current as RevokedSession[]) : []).filter(
    (entry) =>
      entry &&
      typeof entry.jti === "string" &&
      typeof entry.exp === "number" &&
      entry.exp > nowSeconds &&
      entry.jti !== session.jti
  );
  return [...kept, session].slice(-MAX_REVOKED_SESSIONS);
}

/**
 * True when a verified session was ended server-side: it predates the password change cutoff, or
 * its id was revoked at sign-out. Tokens minted before these existed have no `iat` or `jti` and
 * stay valid until the first password change. Fails closed: if the settings cannot be read the
 * session is not trusted.
 */
async function isDashboardSessionEnded(payload: JWTPayload): Promise<boolean> {
  try {
    const { getCachedSettings } = await import("@/lib/db/readCache");
    const settings = (await getCachedSettings()) as Record<string, unknown>;

    const validAfter = settings[SESSIONS_VALID_AFTER_SETTING];
    if (typeof validAfter === "number" && (payload.iat ?? 0) < validAfter) return true;

    const revoked = settings[REVOKED_SESSIONS_SETTING];
    if (
      typeof payload.jti === "string" &&
      Array.isArray(revoked) &&
      revoked.some((entry) => entry && (entry as RevokedSession).jti === payload.jti)
    ) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export function getDashboardJwtSecret(): Uint8Array | null {
  const secret = process.env.JWT_SECRET?.trim();
  return secret ? new TextEncoder().encode(secret) : null;
}

/**
 * Returns the verified payload when `token` is a dashboard session, else null.
 * Never throws: a malformed, expired, foreign-secret or claim-less token is
 * simply "not a session". Pass `secret` explicitly when the caller already
 * resolved it (the authz pipeline does); `null` means "no secret → no session".
 */
export async function verifyDashboardSessionToken(
  token: string | null | undefined,
  secret: Uint8Array | null = getDashboardJwtSecret()
): Promise<JWTPayload | null> {
  if (!token || typeof token !== "string" || !secret || secret.length === 0) return null;
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    if (payload[DASHBOARD_SESSION_CLAIM] === true) {
      return (await isDashboardSessionEnded(payload)) ? null : payload;
    }
    return null;
  } catch {
    return null;
  }
}
