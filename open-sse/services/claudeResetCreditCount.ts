/**
 * claudeResetCreditCount.ts — the Claude reset-credit usage request and the banked-count memo.
 *
 * `/api/oauth/usage` only fills `cedar_ember` (banked grants) and `juniper_tide` (weekly
 * session reset) when it is called with the reset-credit query string and CLI headers. The
 * regular usage poller (usage/claude.ts) deliberately keeps the base URL and User-Agent, and
 * it runs from background schedulers, so it must never send this request. Only the
 * dashboard's reset-credit list (the user opened the modal) sends it and seeds the memo
 * below; the provider-limits refresh only READS it. The opt-in auto-reset keeps its own
 * base request shape (claudeLimitReset.ts) and never seeds the count. A redeem or an
 * auto-claim forgets the count, so the dashboard treats it as unknown until the next list.
 *
 * The count is tri-state: a number is authoritative (0 = nothing banked); null means unknown
 * (never listed, forgotten, older than CLAUDE_RESET_CREDIT_COUNT_MAX_AGE_MS, or the last list
 * was refused with a non-429 4xx).
 */

import { getClaudeCodeVersion } from "../executors/claudeIdentity.ts";
import { setBoundedEntry } from "./claudeLowPriority.ts";

type JsonRecord = Record<string, unknown>;
type FetchLike = typeof fetch;

export const CLAUDE_RESET_CREDIT_USAGE_URL =
  "https://api.anthropic.com/api/oauth/usage?at_wall=1&cedar_ember=1&skip_spend=1";
export const CLAUDE_RESET_CREDIT_USAGE_TIMEOUT_MS = 5_000;
/** Deadline of the dashboard list read; every call that joins an in-flight list shares it. */
export const CLAUDE_RESET_CREDIT_LIST_TIMEOUT_MS = 10_000;
/** A count nobody has re-listed for this long is treated as unknown again. */
export const CLAUDE_RESET_CREDIT_COUNT_MAX_AGE_MS = 60 * 60_000;
const CLAUDE_RESET_CREDIT_COUNT_CACHE_LIMIT = 10_000;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/** Headers for the dashboard's reset-credit list and redeem requests (Claude Code CLI shape). */
export function claudeResetCreditHeaders(accessToken: string): Record<string, string> {
  return {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "User-Agent": `claude-cli/${getClaudeCodeVersion()} (external, cli)`,
    "x-app": "cli",
    "anthropic-beta": "oauth-2025-04-20",
  };
}

export type JsonResponse = { ok: boolean; status: number; body: unknown };

/**
 * Fetch and read a JSON body under one deadline: the timer covers the body read too, so a
 * response whose body never finishes cannot hang the caller. Throws on timeout or transport
 * failure; an unparseable body reads as null.
 */
export async function fetchJsonWithTimeout(
  fetchImpl: FetchLike,
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<JsonResponse> {
  const ctrl = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      ctrl.abort();
      reject(new Error(`request timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  deadline.catch(() => {});
  try {
    const res = await Promise.race([fetchImpl(url, { ...init, signal: ctrl.signal }), deadline]);
    const body: unknown = await Promise.race([res.json().catch(() => null), deadline]);
    return { ok: res.ok, status: res.status, body };
  } finally {
    clearTimeout(timer);
  }
}

export type ClaudeResetCreditUsageResult =
  { ok: true; body: unknown } | { ok: false; status: number; body: unknown };

/** GET the reset-credit usage snapshot. Never throws — a timeout or transport failure is status 0. */
export async function fetchClaudeResetCreditUsage(
  accessToken: string,
  options: { fetchImpl?: FetchLike; timeoutMs?: number } = {}
): Promise<ClaudeResetCreditUsageResult> {
  try {
    const res = await fetchJsonWithTimeout(
      options.fetchImpl ?? fetch,
      CLAUDE_RESET_CREDIT_USAGE_URL,
      { method: "GET", headers: claudeResetCreditHeaders(accessToken) },
      options.timeoutMs ?? CLAUDE_RESET_CREDIT_USAGE_TIMEOUT_MS
    );
    return res.ok
      ? { ok: true, body: res.body ?? {} }
      : { ok: false, status: res.status, body: res.body };
  } catch {
    return { ok: false, status: 0, body: null };
  }
}

/**
 * Banked reset credits for the dashboard badge: every `cedar_ember` grant with resets left
 * plus the weekly `juniper_tide` session reset when it is offered to this account.
 */
export function countClaudeBankedResetCredits(usageBody: unknown): number {
  const body = asRecord(usageBody);
  let count = 0;
  const cedar = asRecord(body.cedar_ember);
  if (Array.isArray(cedar.grants)) {
    for (const item of cedar.grants) {
      const g = asRecord(item);
      if (typeof g.resets_left === "number" && g.resets_left > 0) count += g.resets_left;
    }
  }
  const juniper = asRecord(body.juniper_tide);
  if (juniper.available === true || (juniper.eligible === true && juniper.arm === "reset")) {
    count += 1;
  }
  return count;
}

type CountEntry = { count: number; seededAt: number };

const entries = new Map<string, CountEntry>();
// The registered in-flight list per connection doubles as its admission token: a request
// may store its result only while it is still the registered one, so a request that
// forget() dropped (or a newer one replaced) can never write — with nothing to evict.
const inflight = new Map<string, Promise<ClaudeResetCreditUsageResult>>();

function applyListResult(
  connectionId: string,
  result: ClaudeResetCreditUsageResult,
  seededAt: number
): void {
  if (result.ok) {
    setBoundedEntry(
      entries,
      connectionId,
      { count: countClaudeBankedResetCredits(result.body), seededAt },
      CLAUDE_RESET_CREDIT_COUNT_CACHE_LIMIT
    );
    return;
  }
  // 429 / 5xx / transport: transient, keep the last count (bounded by the max age).
  // Any other 4xx means upstream refused this account's list: the count is unknown.
  if (result.status >= 400 && result.status < 500 && result.status !== 429) {
    entries.delete(connectionId);
  }
}

/**
 * The dashboard's reset-credit list read (user-initiated): send the request and seed the
 * connection's count from it. Concurrent list calls for one connection share one request
 * with one deadline; a result that lands after forgetClaudeResetCreditCount() is returned
 * but not stored.
 */
export function fetchAndSeedClaudeResetCreditUsage(
  connectionId: string,
  accessToken: string,
  options: { fetchImpl?: FetchLike; now?: number } = {}
): Promise<ClaudeResetCreditUsageResult> {
  const pending = inflight.get(connectionId);
  if (pending) return pending;
  const run: Promise<ClaudeResetCreditUsageResult> = fetchClaudeResetCreditUsage(accessToken, {
    fetchImpl: options.fetchImpl,
    timeoutMs: CLAUDE_RESET_CREDIT_LIST_TIMEOUT_MS,
  })
    .then((result) => {
      if (inflight.get(connectionId) === run) {
        applyListResult(connectionId, result, options.now ?? Date.now());
      }
      return result;
    })
    .finally(() => {
      if (inflight.get(connectionId) === run) inflight.delete(connectionId);
    });
  inflight.set(connectionId, run);
  return run;
}

/** The memoised banked count, or null when unknown. Expired entries are deleted on read. */
export function peekClaudeResetCreditCount(
  connectionId: string,
  now: number = Date.now()
): number | null {
  const entry = entries.get(connectionId);
  if (!entry) return null;
  if (now - entry.seededAt > CLAUDE_RESET_CREDIT_COUNT_MAX_AGE_MS) {
    entries.delete(connectionId);
    return null;
  }
  return entry.count;
}

/** Attach the memoised count to a usage payload; an unknown count is omitted, never faked. */
export function withClaudeResetCreditCount<T extends JsonRecord>(
  connectionId: string,
  usage: T,
  now: number = Date.now()
): T & { bankedResetCredits?: number } {
  const { bankedResetCredits: _ignored, ...rest } = usage;
  const count = peekClaudeResetCreditCount(connectionId, now);
  return (count === null ? rest : { ...rest, bankedResetCredits: count }) as T & {
    bankedResetCredits?: number;
  };
}

/**
 * Drop the count after a redeem or auto-claim, together with the in-flight list request, so a
 * request started earlier cannot store the pre-redeem count.
 */
export function forgetClaudeResetCreditCount(connectionId: string): void {
  entries.delete(connectionId);
  inflight.delete(connectionId);
}

/** Test-only: clear every memoised count and in-flight request. */
export function _resetClaudeResetCreditCountCache(): void {
  entries.clear();
  inflight.clear();
}
