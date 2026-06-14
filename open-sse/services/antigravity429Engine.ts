/**
 * Antigravity 429 classification and retry decision engine.
 *
 * CLIProxyAPI classifies 429 responses into 4 categories and makes nuanced
 * retry decisions for each. OmniRoute previously had only 2 categories
 * (free tier vs RPM). This module brings full parity.
 *
 * Categories:
 *   - unknown:          Generic 429, exponential backoff
 *   - rate_limited:     Per-minute rate limit, short backoff + same auth retry
 *   - quota_exhausted:  Daily/plan quota gone, switch auth or long cooldown
 *   - soft_rate_limit:  Temporary burst limit, instant retry
 *
 * Decisions:
 *   - soft_retry:                    Wait briefly, retry same auth
 *   - instant_retry_same_auth:       Retry immediately on same auth
 *   - short_cooldown_switch_auth:    5min cooldown, try next account
 *   - full_quota_exhausted:          24h cooldown, skip this account
 */

export type Category = "unknown" | "rate_limited" | "quota_exhausted" | "soft_rate_limit";

export type DecisionKind =
  | "soft_retry"
  | "instant_retry_same_auth"
  | "short_cooldown_switch_auth"
  | "full_quota_exhausted";

export interface Decision {
  kind: DecisionKind;
  retryAfterMs: number | null;
  reason: string;
}

const QUOTA_EXHAUSTED_KEYWORDS = [
  "quota_exhausted",
  "quota exhausted",
  // Antigravity native message: "Individual quota reached. Contact your administrator to enable overages."
  "quota reached",
  "enable overages",
  "individual quota",
];

const CREDITS_EXHAUSTED_KEYWORDS = [
  "google_one_ai",
  "insufficient credit",
  "insufficient credits",
  "not enough credit",
  "not enough credits",
  "credit exhausted",
  "credits exhausted",
  "credit balance",
  "minimumcreditamountforusage",
  "minimum credit amount for usage",
  "minimum credit",
  "resource has been exhausted",
];

const SHORT_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
const INSTANT_RETRY_THRESHOLD_MS = 3 * 1000; // 3 seconds
const FULL_QUOTA_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

export function classify429(errorMessage: string): Category {
  const lower = (errorMessage || "").toLowerCase();

  // Check for quota exhaustion first (most specific)
  for (const kw of QUOTA_EXHAUSTED_KEYWORDS) {
    if (lower.includes(kw)) return "quota_exhausted";
  }

  // Check for credits exhaustion (also quota-related)
  for (const kw of CREDITS_EXHAUSTED_KEYWORDS) {
    if (lower.includes(kw)) return "quota_exhausted";
  }

  // Check for RPM/rate limit indicators
  if (
    lower.includes("per minute") ||
    lower.includes("rpm") ||
    lower.includes("rate limit") ||
    lower.includes("rate_limit") ||
    lower.includes("too many requests")
  ) {
    return "rate_limited";
  }

  // Check for free tier exhaustion
  if (
    lower.includes("free tier") ||
    lower.includes("daily limit") ||
    lower.includes("exhausted your capacity")
  ) {
    return "quota_exhausted";
  }

  // Check for soft/burst limits
  if (lower.includes("try again") || lower.includes("temporarily")) {
    return "soft_rate_limit";
  }

  return "unknown";
}

export function decide429(category: Category, retryAfterMs: number | null): Decision {
  switch (category) {
    case "soft_rate_limit":
      return {
        kind:
          retryAfterMs && retryAfterMs <= INSTANT_RETRY_THRESHOLD_MS
            ? "instant_retry_same_auth"
            : "soft_retry",
        retryAfterMs: retryAfterMs ?? 2000,
        reason: "Soft rate limit — brief backoff",
      };

    case "rate_limited":
      return {
        kind:
          retryAfterMs && retryAfterMs <= SHORT_COOLDOWN_MS
            ? "soft_retry"
            : "short_cooldown_switch_auth",
        retryAfterMs: retryAfterMs ?? 60_000,
        reason: "RPM rate limit — switch auth if cooldown is long",
      };

    case "quota_exhausted":
      return {
        kind: "full_quota_exhausted",
        retryAfterMs: retryAfterMs ?? FULL_QUOTA_COOLDOWN_MS,
        reason: "Quota exhausted — skip this account",
      };

    default:
      return {
        kind: "soft_retry",
        retryAfterMs: retryAfterMs ?? 5000,
        reason: "Unknown 429 — generic backoff",
      };
  }
}

/**
 * Track credits failure state per auth key.
 * Auto-disables after repeated failures with 5h cooldown.
 */
const creditsFailureMap = new Map<
  string,
  {
    count: number;
    disabledUntil: number;
  }
>();

const CREDITS_DISABLE_THRESHOLD = 3;
const CREDITS_COOLDOWN_MS = 5 * 60 * 60 * 1000; // 5 hours

export function recordCreditsFailure(authKey: string): boolean {
  const state = creditsFailureMap.get(authKey) ?? { count: 0, disabledUntil: 0 };
  state.count++;

  if (state.count >= CREDITS_DISABLE_THRESHOLD) {
    state.disabledUntil = Date.now() + CREDITS_COOLDOWN_MS;
    creditsFailureMap.set(authKey, state);
    return true; // disabled
  }

  creditsFailureMap.set(authKey, state);
  return false;
}

export function isCreditsDisabled(authKey: string): boolean {
  const state = creditsFailureMap.get(authKey);
  if (!state) return false;
  if (state.disabledUntil > Date.now()) return true;
  // Cooldown expired, reset
  creditsFailureMap.delete(authKey);
  return false;
}

export { SHORT_COOLDOWN_MS, FULL_QUOTA_COOLDOWN_MS };
