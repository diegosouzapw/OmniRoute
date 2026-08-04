/**
 * accountFallback/cooldownCap.ts — absolute ceiling for exponentially-scaled cooldowns.
 *
 * Extracted from services/accountFallback.ts (file-size gate): a pure, one-purpose clamp
 * so the connection-level 429/retryable-error cooldown path (getScaledBaseCooldown, inside
 * checkFallbackError) applies the same absolute ceiling the model-lockout path
 * (recordModelLockoutFailure) already enforces. Fixes #8396 — after a sustained 429 burst
 * pushed backoffLevel high, `baseCooldownMs * 2^level` had no upper bound on this path and
 * could black a connection out for hours, long past any real rate-limit reset window.
 */

/**
 * Clamp an exponentially-scaled cooldown to `maxCooldownMs` (operator-configured, per
 * ProviderProfile) falling back to `fallbackMaxMs` (e.g. BACKOFF_CONFIG.max) when the
 * profile did not configure one. Never widens the cooldown, only bounds it — the
 * exponential backoff itself is untouched.
 */
export function capScaledCooldownMs(
  cooldownMs: number,
  maxCooldownMs: number | undefined | null,
  fallbackMaxMs: number
): number {
  const cap =
    typeof maxCooldownMs === "number" && maxCooldownMs > 0 ? maxCooldownMs : fallbackMaxMs;
  return Math.min(cooldownMs, cap);
}
