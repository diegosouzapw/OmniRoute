/**
 * Mistral ambiguous 401 (#7638 / #7718 / #13609).
 *
 * Mistral answers a revoked key and an exhausted quota with the same bare
 * `401 {"detail":"Unauthorized"}`. This leaf module (zero imports) is the ONE
 * implementation of that ambiguity check, shared by the connection-test
 * diagnosis (`src/app/api/providers/[id]/test/mistralAmbiguousAuth.ts`) and the
 * runtime fallback path (`checkFallbackError` + `resolveTerminalConnectionStatus`).
 *
 * It also holds the bound for the opt-in runtime soft lockout
 * (MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT): a connection gets at most
 * MISTRAL_AMBIGUOUS_401_MAX_SOFT_STRIKES soft cooldowns inside the strike window;
 * the next bare 401 parks it as expired, so a genuinely revoked key converges.
 */

const AUTH_SIGNALS = ["invalid api key", "token invalid", "revoked", "access denied"];

/** Soft cooldowns allowed per connection inside the strike window. */
export const MISTRAL_AMBIGUOUS_401_MAX_SOFT_STRIKES = 3;
/** Window, measured from the first strike, in which soft strikes accumulate. */
export const MISTRAL_AMBIGUOUS_401_STRIKE_WINDOW_MS = 60 * 60 * 1000;

/** True for a Mistral 401 body that carries no explicit auth signal (callers check the status). */
export function isMistralAmbiguous401(
  provider: string | null | undefined,
  errorText: string | null | undefined
): boolean {
  if (provider !== "mistral") return false;
  const normalized = String(errorText || "").toLowerCase();
  return !AUTH_SIGNALS.some((signal) => normalized.includes(signal));
}

const strikes = new Map<string, { count: number; firstAt: number }>();

/**
 * Record one ambiguous bare 401 for `connectionId` and say whether it may still
 * be softened (true) or must park the connection (false). Crossing the bound
 * clears the entry, so a re-authenticated connection starts a fresh count.
 */
export function takeMistralAmbiguous401SoftStrike(connectionId: string, now = Date.now()): boolean {
  const entry = strikes.get(connectionId);
  const current =
    entry && now - entry.firstAt < MISTRAL_AMBIGUOUS_401_STRIKE_WINDOW_MS
      ? entry
      : { count: 0, firstAt: now };
  current.count += 1;
  if (current.count > MISTRAL_AMBIGUOUS_401_MAX_SOFT_STRIKES) {
    strikes.delete(connectionId);
    return false;
  }
  strikes.set(connectionId, current);
  return true;
}

/** Test hook: forget every recorded strike. */
export function resetMistralAmbiguous401Strikes(): void {
  strikes.clear();
}
