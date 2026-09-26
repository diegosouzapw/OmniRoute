/**
 * claudeResetCreditCount.ts — the Claude reset-credit usage request and the banked-count memo.
 *
 * `/api/oauth/usage` only fills `cedar_ember` (banked grants) and `juniper_tide` (weekly
 * session reset) when it is called with the reset-credit query string and CLI headers. The
 * regular usage poller (usage/claude.ts) deliberately keeps the base URL and User-Agent, and
 * it runs from background schedulers, so it must never send this request. Only two callers
 * do:
 *   - the dashboard's reset-credit list (the user opened the modal), and
 *   - the opt-in auto-reset at the usage wall (claudeLimitReset.ts), which already reads it.
 * Both seed the memo below; the provider-limits refresh only READS it. A redeem or an
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
/** A count nobody has re-listed for this long is treated as unknown again. */
export const CLAUDE_RESET_CREDIT_COUNT_MAX_AGE_MS = 60 * 60_000;
const CLAUDE_RESET_CREDIT_COUNT_CACHE_LIMIT = 10_000;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/** Headers for the reset-credit usage, claim and auto-reset requests (Claude Code CLI shape). */
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
const inflight = new Map<string, Promise<ClaudeResetCreditUsageResult>>();
const generations = new Map<string, number>();

function generationOf(connectionId: string): number {
  return generations.get(connectionId) ?? 0;
}

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
 * Send the reset-credit usage request for a user- or auto-reset-initiated read and seed the
 * connection's count from it. Concurrent calls for one connection share a single request; a
 * result that lands after forgetClaudeResetCreditCount() is returned but not stored.
 */
export function fetchAndSeedClaudeResetCreditUsage(
  connectionId: string | null | undefined,
  accessToken: string,
  options: { fetchImpl?: FetchLike; timeoutMs?: number; now?: number } = {}
): Promise<ClaudeResetCreditUsageResult> {
  if (!connectionId) return fetchClaudeResetCreditUsage(accessToken, options);
  const pending = inflight.get(connectionId);
  if (pending) return pending;
  const generation = generationOf(connectionId);
  const run = fetchClaudeResetCreditUsage(accessToken, options)
    .then((result) => {
      if (generationOf(connectionId) === generation) {
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
 * Drop the count after a redeem or auto-claim, together with any in-flight list request, and
 * bump the generation so a request started earlier cannot store the pre-redeem count.
 */
export function forgetClaudeResetCreditCount(connectionId: string): void {
  entries.delete(connectionId);
  inflight.delete(connectionId);
  setBoundedEntry(
    generations,
    connectionId,
    generationOf(connectionId) + 1,
    CLAUDE_RESET_CREDIT_COUNT_CACHE_LIMIT
  );
}

/** Test-only: clear every memoised count, in-flight request and generation. */
export function _resetClaudeResetCreditCountCache(): void {
  entries.clear();
  inflight.clear();
  generations.clear();
}
