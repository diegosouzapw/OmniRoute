/**
 * Per-token cooldown for the Claude OAuth usage endpoint
 * (`https://api.anthropic.com/api/oauth/usage`).
 *
 * Anthropic rate-limits this quota endpoint independently of `/v1/messages`.
 * When polled from multiple connections at once (dashboard auto-refresh + the
 * combo health-scheduler), it spams `429` and that surfaces as noisy provider
 * errors plus increased upstream load. Chat with the same token still works.
 *
 * We track a per-access-token "skip until" timestamp. When we see a `429`,
 * we suppress further OAuth-usage polls for that token until the cooldown
 * expires and the caller falls back to the legacy settings/org endpoint
 * (which is what `getClaudeUsage` does on every non-OK response).
 *
 * Pure helpers (no fetch, no timers) keep this TDD-friendly.
 *
 * Inspired-by upstream 9router commit `79df34ca`.
 */

export const OAUTH_USAGE_429_COOLDOWN_MS = 180_000; // 3 minutes

const oauthCooldown = new Map<string, number>();

/** Returns true while `accessToken` is still inside its 429 cooldown window. */
export function isClaudeOauthUsageCoolingDown(
  accessToken: string | undefined,
  now: number = Date.now()
): boolean {
  if (!accessToken) return false;
  const until = oauthCooldown.get(accessToken);
  if (until === undefined) return false;
  if (until > now) return true;
  // Lazy GC of expired entries — keeps the Map bounded by active tokens.
  oauthCooldown.delete(accessToken);
  return false;
}

/** Record a 429 from the OAuth usage endpoint for `accessToken`. */
export function markClaudeOauthUsage429(
  accessToken: string | undefined,
  now: number = Date.now(),
  cooldownMs: number = OAUTH_USAGE_429_COOLDOWN_MS
): void {
  if (!accessToken) return;
  oauthCooldown.set(accessToken, now + cooldownMs);
}

/** Test-only: clear all entries. */
export function _resetClaudeOauthUsageCooldown(): void {
  oauthCooldown.clear();
}
