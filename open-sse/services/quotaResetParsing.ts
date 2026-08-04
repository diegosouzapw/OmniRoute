import { looksLikeQuotaExhausted } from "../../src/shared/utils/classify429";
import { getProviderCategory } from "../config/providerRegistry.ts";

/**
 * Issue #6638 — Ollama Cloud (and any other apikey-category provider) 429s
 * skip body-text quota classification by default: a bare 429 usually just
 * means "too many requests/min" for these providers, so a short exponential
 * backoff applies instead of the long cooldown reserved for genuine
 * daily/monthly/weekly quota exhaustion.
 *
 * That default is correct for plain rate limiting, but it must not swallow
 * an EXPLICIT quota-exhausted signal in the body (see `looksLikeQuotaExhausted`
 * / QUOTA_PATTERNS) — otherwise the account looks "available" again seconds
 * after a multi-day quota was exhausted, and combo routing retries it right
 * away (the reported symptom). OAuth-category providers always preserve
 * quota signals; apikey-category providers only do when the body explicitly
 * says a long-period cap was hit.
 */
export function shouldPreserveQuotaSignals(
  provider: string | null | undefined,
  errorText?: string | null
): boolean {
  if (!provider) return true;
  if (getProviderCategory(provider) === "oauth") return true;
  return Boolean(errorText) && looksLikeQuotaExhausted(errorText);
}

/**
 * Parse a day-granularity quota reset countdown ("Your quota will reset in
 * 3 days.", "Resets in 13 days") out of an upstream 429 body.
 *
 * Companion to the Xh/Ym/Zs countdown parsing already handled inline by
 * `parseRetryFromErrorText` — none of those patterns match when the upstream
 * expresses the reset window in whole days rather than hours/minutes/seconds,
 * so a multi-day quota reset previously parsed to `null` and fell back to the
 * engine's ~seconds-scale default cooldown.
 */
export function parseDayGranularityResetMs(msg: string, maxMs: number): number | null {
  const dayMatch = /reset(?:s)?\s+in\s+(\d+)\s*day(?:s)?/i.exec(msg);
  if (!dayMatch) return null;
  const days = Number.parseInt(dayMatch[1], 10);
  if (!Number.isFinite(days) || days <= 0) return null;
  return Math.min(days * 24 * 3600 * 1000, maxMs);
}
