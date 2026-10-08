/**
 * Token-expiry parsing + the refresh-capable "expired" verdict used by the
 * token health sweep. Extracted from tokenHealthCheck.ts (file-size ceiling);
 * re-exported from there, so existing imports keep working.
 */
const NUMERIC_STRING = /^\d+(\.\d+)?$/;

/**
 * Normalize any stored token-expiry value to epoch milliseconds.
 *
 * `provider_connections.expires_at` / `token_expires_at` are TEXT columns, so a
 * numeric epoch written by an external sync tool reads back as a *string* —
 * and `new Date("1789012345678")` is an Invalid Date. Both numeric shapes are
 * accepted here with the seconds/ms heuristic the Copilot path already used,
 * before falling back to `Date` for ISO 8601 and other date strings.
 *
 * @returns epoch ms, or 0 when the value carries no usable time
 */
export function parseTokenExpiryMs(expiresAt: unknown): number {
  if (typeof expiresAt === "number") {
    if (!Number.isFinite(expiresAt) || expiresAt <= 0) return 0;
    return expiresAt < 1e12 ? expiresAt * 1000 : expiresAt;
  }

  if (typeof expiresAt === "string") {
    const trimmed = expiresAt.trim();
    if (!trimmed) return 0;

    if (NUMERIC_STRING.test(trimmed)) {
      const numeric = Number(trimmed);
      if (!Number.isFinite(numeric) || numeric <= 0) return 0;
      return numeric < 1e12 ? numeric * 1000 : numeric;
    }

    const parsed = new Date(trimmed).getTime();
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

export function getEffectiveTokenExpiryIso(conn: any): string | null {
  if (!conn || typeof conn !== "object") return null;
  return conn.tokenExpiresAt || conn.expiresAt || null;
}

export function getEffectiveTokenExpiryMs(conn: any): number {
  return parseTokenExpiryMs(getEffectiveTokenExpiryIso(conn));
}

/**
 * Providers whose OAuth surface ALSO mints long-lived, refresh-less credentials.
 *
 * `claude setup-token` issues a 1-year token with no refresh token; the same
 * provider's browser login does return one. So `claude` is refresh-CAPABLE (it
 * stays in `supportsTokenRefresh()`), yet a missing refresh token on one of its
 * connections is normal rather than broken — unlike `antigravity`/`gemini`, whose
 * flows always mint one.
 */
function issuesRefreshLessLongLivedTokens(provider: unknown): boolean {
  return typeof provider === "string" && provider.toLowerCase() === "claude";
}

/**
 * Should the health sweep write a terminal `expired` / `no_refresh_token` state?
 *
 * #5326 established the rule: a refresh-capable provider whose connection has no
 * refresh token can never self-heal, so surface that as terminal instead of
 * leaving `testStatus: "active"` disagreeing with the dashboard's expiry badge.
 * That holds for providers whose OAuth flow ALWAYS mints a refresh token — a
 * missing one there really is broken auth.
 *
 * It does not hold universally (#14261). Some refresh-capable providers also issue
 * long-lived credentials that are refresh-less BY DESIGN: `claude setup-token`
 * mints a 1-year token with no refresh token and no stored expiry. Those were
 * condemned within one 60s tick of a successful request, then re-condemned after
 * every self-heal, because absence of a RECOVERY mechanism was read as evidence of
 * expiry.
 *
 * For those providers, gate on the same field the badge reads
 * (`tokenExpiresAt || expiresAt`): with no known expiry the badge cannot claim
 * "Token Expired" either, so there is no mismatch to correct and condemning the
 * row is pure loss. Where an expiry IS known and has passed, the terminal write
 * still happens and #5326 is preserved.
 *
 * @param conn Provider connection row.
 * @param supportsRefresh Result of `supportsTokenRefresh(conn.provider)`, injected
 *   so this stays pure and unit-testable without the provider registry.
 * @param nowMs Current epoch ms; injected for deterministic tests.
 * @returns true when the sweep should mark the connection expired.
 */
export function shouldMarkRefreshCapableExpired(
  conn: any,
  supportsRefresh: boolean,
  nowMs: number = Date.now()
): boolean {
  if (!conn || typeof conn !== "object") return false;
  if (!supportsRefresh) return false;
  // Cursor access-token-only imports: refresh is optional (deep-control stores one).
  if (conn.provider === "cursor") return false;
  // Never clobber a terminal/specific state, nor the request path's `unavailable` cooldown.
  if (conn.testStatus && conn.testStatus !== "active") return false;
  // API-key-only connections do not need refresh tokens at all.
  if (conn.apiKey && conn.apiKey.length > 0) return false;
  if (!issuesRefreshLessLongLivedTokens(conn.provider)) return true;
  const expiryMs = getEffectiveTokenExpiryMs(conn);
  return expiryMs > 0 && expiryMs <= nowMs;
}
