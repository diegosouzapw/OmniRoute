/**
 * Text-based quota-exhaustion classifiers for the account-fallback engine.
 *
 * Extracted out of `accountFallback.ts` (frozen at its file-size-baseline
 * cap — see `config/quality/file-size-baseline.json`) so a new quota-text
 * signal (Issue #3709) could be added without growing that file. These are
 * pure functions with no dependency back on `accountFallback.ts`, so there
 * is no circular import (`npm run check:cycles`).
 *
 * @module services/quotaTextCooldowns
 */

import { RateLimitReason } from "../config/constants.ts";

type RateLimitReasonValue = (typeof RateLimitReason)[keyof typeof RateLimitReason];

export interface QuotaTextFallback {
  shouldFallback: true;
  cooldownMs: number;
  reason: RateLimitReasonValue;
  usedUpstreamRetryHint?: boolean;
  quotaResetHintMs?: number;
}

// ─── Issue #2321 — Subscription (5h) usage-limit text ──────────────────────
//
// Anthropic OAuth (Claude Pro/Team) returns 429 with "Usage Limit Reached"
// for the 5-hour subscription quota. Without a dedicated branch the request
// falls through to the generic 429 retry path (~5s base cooldown).

export function isSubscriptionQuotaText(lower: string): boolean {
  return (
    lower.includes("usage limit reached") ||
    lower.includes("usage limit has been") ||
    lower.includes("claude pro usage limit") ||
    lower.includes("you've reached your usage limit") ||
    lower.includes("you have reached your usage limit")
  );
}

const SUBSCRIPTION_QUOTA_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

/**
 * Builds the QUOTA_EXHAUSTED fallback for the subscription-quota text above.
 * Honor upstream Retry-After / reset hints only when the caller's profile
 * enables them (via `getUpstreamRetryHintMs`); otherwise apply a local 1h
 * cooldown so all Pro accounts on the same subscription tier stop cycling
 * through tight retries. (We deliberately do not use COOLDOWN_MS.paymentRequired
 * — that constant is 2 minutes, shorter than the recovery time of a
 * subscription quota.)
 *
 * `getUpstreamRetryHintMs`/`parseRetryFromErrorText` are injected by the
 * caller (accountFallback.ts) to avoid importing back into that file.
 */
export function buildSubscriptionQuotaFallback(
  errorStr: string,
  getUpstreamRetryHintMs: () => number | null,
  parseRetryFromErrorText: (text: string) => number | null
): QuotaTextFallback | null {
  if (!isSubscriptionQuotaText(errorStr.toLowerCase())) return null;
  const hintMs = getUpstreamRetryHintMs();
  const bodyHint = parseRetryFromErrorText(errorStr);
  return {
    shouldFallback: true,
    cooldownMs: hintMs ?? SUBSCRIPTION_QUOTA_COOLDOWN_MS,
    reason: RateLimitReason.QUOTA_EXHAUSTED,
    usedUpstreamRetryHint: Boolean(hintMs),
    quotaResetHintMs: bodyHint ?? undefined,
  };
}

// ─── Issue #3709 — Ollama Cloud weekly usage cap ───────────────────────────
//
// Ollama Cloud free-tier accounts have a hard WEEKLY request cap. On cap the
// upstream returns 429 "you (<account>) have reached your weekly usage
// limit". ollama-cloud is an apikey-category provider (not oauth), so the
// `shouldUseQuotaSignal` gate in `checkFallbackError` (oauth-only) skips the
// subscription-quota-text branch above for its 429s — without a dedicated,
// ungated check the account fell through to the generic 429 backoff
// (~1s, capped at 2min) and got retried every few minutes for the rest of
// the week (one account took 285x429 in 48h — issue #3709).
//
// The exact weekly reset anchor (UTC Monday? rolling 7d from first request?)
// is not publicly documented by Ollama, so this uses a fixed 24h cooldown —
// short enough to recover promptly once the real window resets, long enough
// to stop the every-5-minute retry storm. The phrase match is generic (not
// ollama-specific), so any other provider using the same wording benefits.
const WEEKLY_QUOTA_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

export function isWeeklyUsageLimitText(lower: string): boolean {
  return (
    lower.includes("weekly usage limit") ||
    lower.includes("weekly limit reached") ||
    lower.includes("reached your weekly")
  );
}

export function buildWeeklyQuotaFallback(errorStr: string): QuotaTextFallback | null {
  if (!isWeeklyUsageLimitText(errorStr.toLowerCase())) return null;
  return {
    shouldFallback: true,
    cooldownMs: WEEKLY_QUOTA_COOLDOWN_MS,
    reason: RateLimitReason.QUOTA_EXHAUSTED,
  };
}

// ─── Issue #7071 — Ollama Cloud 5-hour SESSION usage cap ───────────────────
//
// Ollama Cloud also enforces a rolling 5-hour "session" usage cap, sibling to
// the weekly cap above (#3709/#6638). On cap the upstream returns 429 with a
// body like "you (<account>) have reached your session usage limit". Same
// root cause as the weekly gap: neither the generic subscription-quota-text
// classifier nor the weekly one recognize "session" wording, so the account
// fell through to the generic 429 backoff and got retried within the same
// 5-hour window instead of cooling down for it — combo/LKGP routing cycled
// back to the "exhausted" account instead of advancing to the next one.
//
// Patterns are scoped to "session ... usage limit" / "session limit reached"
// / "reached your session ... usage limit" phrasing (not a bare "session"
// match) so unrelated "session expired"/"session token invalid" auth errors
// from other providers are not misclassified as quota-exhausted.
const SESSION_QUOTA_COOLDOWN_MS = 5 * 60 * 60 * 1000; // 5 hours

export function isSessionUsageLimitText(lower: string): boolean {
  return (
    lower.includes("session usage limit") ||
    lower.includes("session limit reached") ||
    (lower.includes("reached your session") && lower.includes("usage limit"))
  );
}

export function buildSessionQuotaFallback(errorStr: string): QuotaTextFallback | null {
  if (!isSessionUsageLimitText(errorStr.toLowerCase())) return null;
  return {
    shouldFallback: true,
    cooldownMs: SESSION_QUOTA_COOLDOWN_MS,
    reason: RateLimitReason.QUOTA_EXHAUSTED,
  };
}
