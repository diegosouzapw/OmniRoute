/**
 * quotaScheduler.ts — pre-request capacity decision.
 *
 * Combines the per-connection token budget ledger (providerQuotaState) with
 * the request cost estimate (tokenEstimator) to answer one question:
 *
 *   "Can this connection afford this request without exceeding its
 *    configured per-window token budget?"
 *
 * The scheduler NEVER throws and NEVER blocks the request path when quota
 * tracking is unconfigured — it fails open (returns `affordable: true`),
 * preserving existing routing behavior. When a budget IS configured and the
 * estimated cost exceeds the remaining budget, it returns
 * `affordable: false` with the reason, and the caller should prefer another
 * connection (the same failover machinery used for 429s).
 *
 * Part of: Quota-aware provider scheduling (feat/quota-aware-scheduling).
 */
import { getProviderQuota, recordProviderQuotaUsage } from "./providerQuotaState";
import { estimateChatTokenCost } from "./tokenEstimator";

export interface QuotaDecision {
  affordable: boolean;
  reason?: "exhausted" | "insufficient_budget" | "unconfigured";
  /** remaining tokens in the window when known */
  tokensRemaining?: number;
  /** estimated cost of this request */
  estimatedCost?: number;
  /** 0..1 remaining ratio when known (1 when unknown) */
  remainingRatio: number;
}

/**
 * Decide whether (connectionId, model) can afford a request.
 *
 * @param connectionId provider connection id
 * @param model model string (as routed)
 * @param requestBody parsed chat body (used for the cost estimate)
 * @returns a decision — always resolves, never throws
 */
export function canAffordRequest(
  connectionId: string,
  model: string,
  requestBody: Record<string, unknown> | null | undefined
): QuotaDecision {
  if (!connectionId || !model) {
    return { affordable: true, reason: "unconfigured", remainingRatio: 1 };
  }

  const snapshot = getProviderQuota(connectionId, model);
  if (!snapshot || !snapshot.known || snapshot.tokenLimit <= 0) {
    // No configured budget → nothing to enforce → affordable.
    return { affordable: true, reason: "unconfigured", remainingRatio: 1 };
  }

  const cost = estimateChatTokenCost(requestBody);
  const remaining = snapshot.tokensRemaining;
  const remainingRatio = snapshot.remainingRatio;

  if (remaining <= 0) {
    return {
      affordable: false,
      reason: "exhausted",
      tokensRemaining: 0,
      estimatedCost: cost.totalTokens,
      remainingRatio: 0,
    };
  }

  if (cost.totalTokens > remaining) {
    return {
      affordable: false,
      reason: "insufficient_budget",
      tokensRemaining: remaining,
      estimatedCost: cost.totalTokens,
      remainingRatio,
    };
  }

  return {
    affordable: true,
    tokensRemaining: remaining,
    estimatedCost: cost.totalTokens,
    remainingRatio,
  };
}

/**
 * Reserve budget for a request (call AFTER a successful dispatch decision,
 * before/around the upstream call). Best-effort: never throws.
 */
export function reserveQuota(
  connectionId: string,
  model: string,
  requestBody: Record<string, unknown> | null | undefined,
  opts: { tokenLimit?: number; windowMs?: number } = {}
): void {
  if (!connectionId || !model) return;
  const cost = estimateChatTokenCost(requestBody);
  if (cost.totalTokens <= 0) return;
  recordProviderQuotaUsage(connectionId, model, cost.totalTokens, opts);
}
