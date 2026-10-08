import { COOLDOWN_MS } from "@omniroute/open-sse/config/constants.ts";
import { PROVIDER_ERROR_TYPES } from "@omniroute/open-sse/services/errorClassifier.ts";

/**
 * Cooldown for an OAuth connection that keeps failing with a non-terminal 401: a still-valid
 * token after a refresh (#12452 keeps it out of `expired`) or an invalid-token class (#12594).
 *
 * The status_401 rule declares no cooldown, so without this every request re-selected the
 * account, refreshed the token and failed again (seen in production: 273 refreshes and 216
 * requests losing ~3 s each in a 21-minute 401 burst). The cooldown starts at the OAuth base
 * cooldown and doubles per consecutive 401 up to COOLDOWN_MS.unauthorized.
 *
 * backoffLevel cannot carry this streak: the status_401 rule does not raise it, and
 * getProviderCredentials resets it once a cooldown has passed. The streak ends when a request
 * succeeds (resetStreak from clearAccountError) or after a quiet window.
 */
const FAILURE_WINDOW_MS = COOLDOWN_MS.unauthorized;
const streaks = new Map<string, { count: number; cooldownUntil: number }>();

export interface OAuthAuthFailureInput {
  status: number;
  authType: string | null | undefined;
  providerErrorType: string | null;
  terminalStatus: string | null;
  disableCooling: boolean;
  /** Cooldown the error rules already chose; a positive one is kept as is. */
  resolvedCooldownMs: number;
  baseCooldownMs: number | null | undefined;
}

/** Cooldown for this 401 in ms, or null when the rule-based cooldown applies. */
export function nextCooldownMs(connectionId: string, input: OAuthAuthFailureInput): number | null {
  if (
    input.status !== 401 ||
    input.authType !== "oauth" ||
    input.terminalStatus ||
    input.disableCooling ||
    input.resolvedCooldownMs > 0 ||
    // #7268: a 401 that names an unsupported model is a model fact; other models stay usable.
    input.providerErrorType === PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  ) {
    return null;
  }
  const now = Date.now();
  const previous = streaks.get(connectionId);
  const count =
    previous && now <= previous.cooldownUntil + FAILURE_WINDOW_MS ? previous.count + 1 : 1;
  const baseCooldownMs = input.baseCooldownMs || COOLDOWN_MS.transientInitial;
  const cooldownMs = Math.min(
    baseCooldownMs * 2 ** Math.min(count - 1, 16),
    COOLDOWN_MS.unauthorized
  );
  streaks.set(connectionId, { count, cooldownUntil: now + cooldownMs });
  return cooldownMs;
}

export function resetStreak(connectionId: string): void {
  streaks.delete(connectionId);
}
