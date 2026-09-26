/**
 * claudeResetCreditCount.ts — banked Claude reset-credit count for the usage poller.
 *
 * `/api/oauth/usage` only fills `cedar_ember` (banked grants) and `juniper_tide` (weekly
 * session reset) when it is called with the reset-credit query string; the regular usage
 * poller deliberately keeps the base URL and User-Agent, so it receives both keys as null.
 * The dashboard badge/redeem button therefore takes its count from the dedicated
 * reset-credit list request, memoised per access token so a quota refresh costs at most one
 * extra upstream call per TTL instead of one per poll.
 *
 * Tri-state result: a number is authoritative (0 = none banked); null means the list
 * request has not succeeded yet for this token, so callers omit the count.
 */

import {
  CLAUDE_LIMIT_RESET_CACHE_LIMIT,
  CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS,
  countClaudeBankedResetCredits,
  fetchClaudeResetCreditUsage,
} from "./claudeLimitReset.ts";
import { setBoundedEntry } from "./claudeLowPriority.ts";

type FetchLike = typeof fetch;

/** How long a successful count is reused before the list request is repeated. */
export const CLAUDE_RESET_CREDIT_COUNT_TTL_MS = 30 * 60_000;
/** Back-off after a failed list request; the last known count keeps being served meanwhile. */
export const CLAUDE_RESET_CREDIT_COUNT_RETRY_MS = CLAUDE_LIMIT_RESET_RETRY_BACKOFF_MS;

type CountEntry = { count: number | null; refreshAfter: number };

const entries = new Map<string, CountEntry>();
const inflight = new Map<string, Promise<number | null>>();

function store(accessToken: string, count: number | null, refreshAfter: number): void {
  setBoundedEntry(entries, accessToken, { count, refreshAfter }, CLAUDE_LIMIT_RESET_CACHE_LIMIT);
}

async function refreshCount(
  accessToken: string,
  now: number,
  lastKnown: number | null,
  fetchImpl: FetchLike | undefined
): Promise<number | null> {
  const result = await fetchClaudeResetCreditUsage(accessToken, { fetchImpl });
  if (result.ok) {
    const count = countClaudeBankedResetCredits(result.body);
    store(accessToken, count, now + CLAUDE_RESET_CREDIT_COUNT_TTL_MS);
    return count;
  }
  store(accessToken, lastKnown, now + CLAUDE_RESET_CREDIT_COUNT_RETRY_MS);
  return lastKnown;
}

/** Banked reset-credit count for `accessToken`, fetched at most once per TTL. Never throws. */
export async function getClaudeResetCreditCount(
  accessToken: string,
  options: { now?: number; fetchImpl?: FetchLike } = {}
): Promise<number | null> {
  if (!accessToken) return null;
  const now = options.now ?? Date.now();
  const cached = entries.get(accessToken);
  if (cached && now < cached.refreshAfter) return cached.count;
  // Parallel pollers on one token share a single list request.
  const pending = inflight.get(accessToken);
  if (pending) return pending;
  const run = refreshCount(accessToken, now, cached?.count ?? null, options.fetchImpl).finally(
    () => {
      if (inflight.get(accessToken) === run) inflight.delete(accessToken);
    }
  );
  inflight.set(accessToken, run);
  return run;
}

/** Seed the count from a list response the dashboard just fetched (keeps badge and modal in sync). */
export function rememberClaudeResetCreditCount(
  accessToken: string,
  usageBody: unknown,
  now: number = Date.now()
): void {
  if (!accessToken) return;
  store(
    accessToken,
    countClaudeBankedResetCredits(usageBody),
    now + CLAUDE_RESET_CREDIT_COUNT_TTL_MS
  );
}

/** Drop the memoised count after a redeem so the follow-up usage refresh re-reads it. */
export function forgetClaudeResetCreditCount(accessToken: string): void {
  entries.delete(accessToken);
}

/** Test-only: clear every memoised count and in-flight request. */
export function _resetClaudeResetCreditCountCache(): void {
  entries.clear();
  inflight.clear();
}
