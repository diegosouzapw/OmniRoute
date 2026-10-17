/**
 * Account-selection side of the GitHub Copilot local AI Credits cutoff.
 *
 * Reads the last `ai_credits` reading from the quota cache (kept fresh by the
 * existing provider-limits / quota-cache polling — never a fetch on the request
 * path) and compares it with the connection's live `githubCreditLimit`, so a
 * changed limit applies immediately. Fail-open on missing/stale readings; see
 * `open-sse/services/githubCreditLimit.ts` for the full semantics.
 */
import { getQuotaCache } from "@/domain/quotaCache";
import {
  GITHUB_AI_CREDITS_QUOTA_KEY,
  evaluateGitHubCreditLimit,
  readGitHubCreditLimit,
  type GitHubCreditLimitDecision,
} from "@omniroute/open-sse/services/githubCreditLimit.ts";

const NOT_BLOCKED: GitHubCreditLimitDecision = { blocked: false, reason: null, resetAt: null };

export function evaluateGitHubCreditLimitForConnection(
  provider: string,
  connection: { id: string; providerSpecificData?: unknown }
): GitHubCreditLimitDecision {
  if (provider !== "github") return NOT_BLOCKED;
  const limit = readGitHubCreditLimit(connection.providerSpecificData);
  if (limit === null) return NOT_BLOCKED;

  const entry = getQuotaCache(connection.id);
  const quota = entry?.quotas?.[GITHUB_AI_CREDITS_QUOTA_KEY];
  return evaluateGitHubCreditLimit(
    limit,
    entry && quota
      ? { creditsUsed: quota.creditsUsed, resetAt: quota.resetAt, fetchedAt: entry.fetchedAt }
      : null
  );
}

/**
 * Initial `reasons` / `resetCandidates` for `evaluateQuotaLimitPolicy`: one entry when
 * the credit cutoff blocks the connection, empty otherwise. Fresh arrays on every call —
 * the caller appends the window-policy reasons to them.
 */
export function seedGitHubCreditLimitReasons(
  provider: string,
  connection: { id: string; providerSpecificData?: unknown }
): { reasons: string[]; resetCandidates: Array<string | null> } {
  const decision = evaluateGitHubCreditLimitForConnection(provider, connection);
  if (!decision.blocked || !decision.reason) return { reasons: [], resetCandidates: [] };
  return { reasons: [decision.reason], resetCandidates: [decision.resetAt] };
}
