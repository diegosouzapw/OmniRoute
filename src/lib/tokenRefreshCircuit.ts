/**
 * Shared refresh-policy helpers for Token Health Check + CredentialHealth.
 *
 * Kept tiny and dependency-free on purpose: CredentialHealth's sweep needs to
 * honor the OAuth refresh backoff window, but importing `tokenHealthCheck`
 * would pull in its module-level scheduler (which auto-starts timers).
 *
 * Moved verbatim out of `src/lib/tokenHealthCheck.ts`, which re-exports it for
 * existing callers and tests.
 */

export function isInRefreshBackoff(conn: any, nowMs: number): boolean {
  const until = conn?.providerSpecificData?.refreshCircuit?.until;
  if (typeof until !== "string") return false;
  const untilMs = new Date(until).getTime();
  return Number.isFinite(untilMs) && untilMs > nowMs;
}

/**
 * Rotating-refresh providers whose refresh token must survive an "unrecoverable"
 * refresh error instead of being nulled on the first failure.
 *
 * #11414 keeps the connection active for EXPIRED_RETRY_MAX retries, but the same
 * update also nulled the refresh token for every rotating provider. The next sweep
 * then hits the `!conn.refreshToken` guard, whose self-heal branch only fires while
 * testStatus is empty or "active" — the row is already "expired", so the sweep
 * returns silently and the retry budget is never spent. The connection stays active,
 * expired and unrecoverable until a manual re-auth (#13183).
 *
 * Claude access tokens are short-lived (~8h) and an invalid_grant /
 * refresh_token_reused is frequently a dual-consumer race (the same Claude Max
 * account refreshed by another OAuth client), not a confirmed revoke — so the token
 * is worth keeping for the retries. Same reasoning as #3679 for non-rotating
 * providers: the stored refresh token is the user's only recovery artifact.
 */
const PRESERVE_REFRESH_TOKEN_PROVIDERS = new Set(["claude"]);

export function preservesRefreshTokenOnUnrecoverable(provider: unknown): boolean {
  return PRESERVE_REFRESH_TOKEN_PROVIDERS.has(String(provider || "").toLowerCase());
}
