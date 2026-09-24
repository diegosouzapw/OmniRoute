import { looksLikeQuotaExhausted } from "../../src/shared/utils/classify429";
import { getProviderCategory, getRegistryEntry } from "../config/providerRegistry.ts";

const ZAI_PATTERNS = [
  /\[1308\]/,
  /\[1310\]/,
  /\bz\.ai\b/i,
  /\bbigmodel\.cn\b/i,
];

/**
 * Resolves the timezone offset for naive (zone-less) reset timestamps (Issue #14479).
 * If the provider or body indicates Z.AI/GLM (which outputs local Asia/Shanghai time),
 * uses "+08:00"; otherwise defaults to "Z" (UTC).
 * Explicit timezone offsets passed directly or configured per provider take precedence.
 */
export function resolveNaiveResetZone(
  msg: string,
  providerOrZone?: string | null
): string {
  if (providerOrZone && /^(?:Z|[+-]\d{2}:?\d{2})$/i.test(providerOrZone)) {
    return providerOrZone.toUpperCase();
  }

  if (providerOrZone) {
    const configuredTz = getRegistryEntry(providerOrZone)?.naiveResetTimezone;
    if (typeof configuredTz === "string" && configuredTz) return configuredTz;
  }

  if (ZAI_PATTERNS.some((pat) => pat.test(msg))) {
    return "+08:00";
  }

  return "Z";
}

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
 * Parse a day-granularity quota reset countdown (\"Your quota will reset in
 * 3 days.\", \"Resets in 13 days\") out of an upstream 429 body.
 *
 * Companion to the Xh/Ym/Zs countdown parsing already handled inline by
 * `parseRetryFromErrorText` — none of those patterns match when the upstream
 * expresses the reset window in whole days rather than hours/minutes/seconds,
 * so a multi-day quota reset previously parsed to `null` and fell back to the
 * engine's ~seconds-scale default cooldown.
 *
 * Delegates to `parseIsoDateTimeResetMs` (absolute \"reset at YYYY-MM-DD HH:MM:SS\")
 * and then `parseMonthDayResetMs` (year-less \"reset at MM-DD HH:MM:SS UTC\") so
 * every absolute-reset shape an upstream uses resolves to the real wait.
 */
export function parseDayGranularityResetMs(
  msg: string,
  maxMs: number,
  nowMs: number = Date.now(),
  providerOrZone?: string | null
): number | null {
  const dayMatch = /reset(?:s)?\s+in\s+(\d+)\s*day(?:s)?/i.exec(msg);
  if (dayMatch) {
    const days = Number.parseInt(dayMatch[1], 10);
    if (Number.isFinite(days) && days > 0) {
      return Math.min(days * 24 * 3600 * 1000, maxMs);
    }
  }
  const isoMs = parseIsoDateTimeResetMs(msg, maxMs, nowMs, providerOrZone);
  if (isoMs !== null) return isoMs;
  return parseMonthDayResetMs(msg, maxMs, nowMs);
}

/**
 * Z.AI (GLM) reports an exhausted weekly/monthly cap with a FULL absolute
 * datetime rather than a countdown:
 *
 *   \"[1310][Weekly/Monthly Limit Exhausted. … Your limit will reset at
 *    2026-08-29 21:01:21]\"
 *
 * `parseRetryFromErrorText` (accountFallback.ts) has an equivalent ISO matcher,
 * but `buildWeeklyQuotaFallback` never reaches it: it calls
 * `parseDayGranularityResetMs` directly, and neither the \"reset in N days\" nor
 * the year-less MM-DD parser matched this shape. The weekly fallback therefore
 * fell back to WEEKLY_QUOTA_COOLDOWN_MS (24h) and the connection was dispatched
 * again — into a real upstream 429 — every day until the true reset ~6 days out.
 *
 * The datetime may use a `T` or a space separator, and may carry `Z` or a
 * `±HH:MM` offset. A NAIVE datetime (no zone) defaults to UTC, or Asia/Shanghai (+08:00)
 * for Z.AI/GLM providers which output local China Standard Time (Issue #14479).
 * Returns null when the instant is not in the future.
 */
export function parseIsoDateTimeResetMs(
  msg: string,
  maxMs: number,
  nowMs: number = Date.now(),
  providerOrZone?: string | null
): number | null {
  const match =
    /\b(?:try again at|wait until|reset(?:s)?\s+at|available at|retry after)\s+(\d{4}-\d{2}-\d{2}[Tt ]\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?)\s*(Z|[+-]\d{2}:?\d{2})?/i.exec(
      msg
    );
  if (!match) return null;
  const stamp = match[1].replace(/[Tt ]/, "T");
  // Normalize "+0200" to "+02:00": the bare-offset form is not part of the ES Date.parse grammar.
  const rawZone = match[2]
    ? match[2].toUpperCase()
    : resolveNaiveResetZone(msg, providerOrZone);
  const zone = /^[+-]\d{4}$/.test(rawZone)
    ? `${rawZone.slice(0, 3)}:${rawZone.slice(3)}`
    : rawZone;
  const resetMs = Date.parse(`${stamp}${zone}`);
  if (!Number.isFinite(resetMs)) return null;
  const waitMs = resetMs - nowMs;
  if (waitMs <= 0) return null;
  return Math.min(waitMs, maxMs);
}

/**
 * Qwen token-plan (and similar apikey providers) report the weekly reset as
 * \"The quota will reset at 08-29 15:29:00 UTC\" without a year. Treat that as
 * the next occurrence of MM-DD HH:MM[:SS] UTC; if the date already passed this
 * year, roll to next year. Returns null when the parsed instant is not in the
 * future or the wait would exceed maxMs.
 */
export function parseMonthDayResetMs(
  msg: string,
  maxMs: number,
  nowMs: number = Date.now()
): number | null {
  const match =
    /reset(?:s)?\s+at\s+(\d{2})-(\d{2})\s+(\d{2}):(\d{2})(?::(\d{2}))?\s*(?:UTC|Z)?/i.exec(
      msg
    );
  if (!match) return null;
  const month = Number.parseInt(match[1], 10);
  const day = Number.parseInt(match[2], 10);
  const hour = Number.parseInt(match[3], 10);
  const minute = Number.parseInt(match[4], 10);
  const second = match[5] ? Number.parseInt(match[5], 10) : 0;
  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour > 23 ||
    minute > 59 ||
    second > 59
  ) {
    return null;
  }
  const now = new Date(nowMs);
  let year = now.getUTCFullYear();
  let resetMs = Date.UTC(year, month - 1, day, hour, minute, second);
  if (!Number.isFinite(resetMs)) return null;
  if (resetMs <= nowMs) {
    year += 1;
    resetMs = Date.UTC(year, month - 1, day, hour, minute, second);
  }
  const waitMs = resetMs - nowMs;
  if (!Number.isFinite(waitMs) || waitMs <= 0) return null;
  return Math.min(waitMs, maxMs);
}
