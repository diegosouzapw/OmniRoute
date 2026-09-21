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
import { jwtVerify, type JWTPayload } from "jose";

export const DASHBOARD_SESSION_COOKIE = "auth_token";
export const DASHBOARD_SESSION_CLAIM = "authenticated";

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
  if (!token || typeof token !== "string" || !secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload[DASHBOARD_SESSION_CLAIM] === true ? payload : null;
  } catch {
    return null;
  }
}
