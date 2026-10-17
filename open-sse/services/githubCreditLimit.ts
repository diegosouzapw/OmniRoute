/**
 * githubCreditLimit.ts — local per-connection GitHub Copilot AI Credits cutoff (pure leaf).
 *
 * Token-billed Copilot plans report consumed AI Credits as
 * `copilot_internal/user → quota_snapshots.premium_interactions.credits_used`.
 * The usage parser (usage/github.ts) surfaces that figure as the `ai_credits`
 * quota; the quota cache keeps the latest reading, refreshed by the existing
 * provider-limits / quota-cache polling. Account selection
 * (`auth.ts::evaluateQuotaLimitPolicy`) compares that cached reading with
 * `providerSpecificData.githubCreditLimit` and skips the connection when the
 * limit is reached, so normal account fallback picks another connection.
 *
 * Semantics:
 * - limit unset/null → no cutoff;
 * - limit 0 → the connection is always skipped (explicit kill switch);
 * - FAIL-OPEN: a missing, stale or previous-billing-period reading never blocks.
 *
 * This is a local safeguard, NOT a hard spending ceiling: GitHub reporting
 * delays, the polling interval, in-flight/concurrent requests and usage made
 * outside OmniRoute can all push consumption past the limit.
 *
 * Pure — no network, no DB, no Node-only imports — so the API validator, the
 * routing policy and the dashboard edit form can all share it.
 */

export const GITHUB_CREDIT_LIMIT_FIELD = "githubCreditLimit";
export const GITHUB_AI_CREDITS_QUOTA_KEY = "ai_credits";

/**
 * Oldest usage reading still trusted for the cutoff. The quota cache refreshes
 * cached entries every ~5 minutes; a reading older than this means refreshes
 * have been failing, and the cutoff fails open instead of blocking on old data.
 */
export const GITHUB_CREDIT_SNAPSHOT_MAX_AGE_MS = 15 * 60 * 1000;

export interface GitHubCreditReading {
  creditsUsed?: number;
  resetAt?: string | null;
  fetchedAt?: number;
}

export interface GitHubCreditLimitDecision {
  blocked: boolean;
  reason: string | null;
  resetAt: string | null;
}

const NOT_BLOCKED: GitHubCreditLimitDecision = { blocked: false, reason: null, resetAt: null };

export function isValidGitHubCreditLimit(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isFinite(value) && value >= 0);
}

/** Read the configured limit; anything unset or invalid means "no cutoff". */
export function readGitHubCreditLimit(providerSpecificData: unknown): number | null {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return null;
  const value = (providerSpecificData as Record<string, unknown>)[GITHUB_CREDIT_LIMIT_FIELD];
  return typeof value === "number" && isValidGitHubCreditLimit(value) ? value : null;
}

/** Parse GitHub's `credits_used` (number or numeric string); undefined when absent/invalid. */
export function parseGitHubCreditsUsed(value: unknown): number | undefined {
  if (typeof value !== "number" && (typeof value !== "string" || !value.trim())) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

/** Edit-form text → limit. Blank disables the cutoff. */
export function parseGitHubCreditLimitInput(raw: string): {
  value: number | null;
  invalid: boolean;
} {
  const trimmed = raw.trim();
  if (!trimmed) return { value: null, invalid: false };
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) return { value: null, invalid: true };
  return { value: parsed, invalid: false };
}

function formatCredits(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Math.round(value * 100) / 100);
}

function futureResetAt(resetAt: string | null | undefined, now: number): string | null {
  if (!resetAt) return null;
  const ms = new Date(resetAt).getTime();
  return Number.isFinite(ms) && ms > now ? resetAt : null;
}

export function evaluateGitHubCreditLimit(
  limit: number | null,
  reading: GitHubCreditReading | null,
  now = Date.now()
): GitHubCreditLimitDecision {
  if (limit === null || !isValidGitHubCreditLimit(limit)) return NOT_BLOCKED;
  if (limit === 0) {
    return {
      blocked: true,
      reason: "AI Credits local limit is 0 (all requests blocked)",
      resetAt: futureResetAt(reading?.resetAt, now),
    };
  }

  const used = reading?.creditsUsed;
  if (typeof used !== "number" || !Number.isFinite(used)) return NOT_BLOCKED;
  const fetchedAt = reading?.fetchedAt;
  if (typeof fetchedAt !== "number" || now - fetchedAt > GITHUB_CREDIT_SNAPSHOT_MAX_AGE_MS) {
    return NOT_BLOCKED;
  }
  if (reading?.resetAt) {
    const resetMs = new Date(reading.resetAt).getTime();
    // The billing period rolled over since the reading: the figure is stale.
    if (Number.isFinite(resetMs) && resetMs <= now) return NOT_BLOCKED;
  }
  if (used < limit) return NOT_BLOCKED;

  return {
    blocked: true,
    reason: `AI Credits ${formatCredits(used)}/${formatCredits(limit)} reached the local limit`,
    resetAt: futureResetAt(reading?.resetAt, now),
  };
}
