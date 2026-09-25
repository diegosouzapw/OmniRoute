/**
 * Metered-budget policy — provider economics applied to the dollar budget.
 *
 * The dollar budget in {@link module:domain/costRules} is scoped by apiKeyId
 * alone and has no scope dimension for the provider that will actually serve
 * the request. Enforced at the api-key policy phase — before provider
 * resolution — it can only answer "has this key spent its allowance?", never
 * "would this request spend any of it?". Once the allowance is gone, a
 * flat-rate subscription that costs nothing per call is rejected together with
 * the metered APIs, because the gate cannot tell them apart.
 *
 * This module supplies the missing dimension. It reads the ONE existing
 * economic classification ({@link isFlatRateProvider}) and derives both halves
 * of the metered-budget decision from it, so eligibility and accounting can
 * never drift apart:
 *
 * - {@link consumesMeteredBudget} — does a call to this provider spend the
 *   metered allowance at all?
 * - {@link meteredBudgetCost} — how much of the allowance does a completed
 *   call consume?
 * - {@link checkMeteredBudgetForProvider} — may this candidate be served
 *   under the key's current budget state?
 *
 * Fail-closed by construction: the classification recognises flat-rate plans
 * explicitly, so an unknown or unclassified provider is metered and stays
 * subject to the allowance. A provider never becomes free by being unknown.
 *
 * Cost OBSERVABILITY is deliberately untouched. Analytics compute their own
 * per-row cost from the request log with the `flatRateAsZero` option
 * (`lib/usage/costCalculator`, `lib/usage/usageStats`), so exempting flat-rate
 * traffic from budget CONSUMPTION here removes nothing from the dashboards.
 *
 * @module lib/usage/meteredBudgetPolicy
 */

import { checkBudget } from "@/domain/costRules";
import { isFlatRateProvider } from "./flatRateProviders";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";

/**
 * Whether a call to this provider draws down the metered dollar allowance.
 *
 * Flat-rate plans are paid for by a subscription the allowance does not
 * govern; everything else — including an unknown provider — is metered.
 */
export function consumesMeteredBudget(providerId: string | null | undefined): boolean {
  return !isFlatRateProvider(providerId);
}

/**
 * The portion of an estimated request cost that the metered allowance should
 * absorb. Flat-rate providers contribute nothing: their per-token rows exist
 * for estimates and analytics, not for a bill the allowance is tracking.
 *
 * A negative or non-finite estimate is clamped to 0 so a bad pricing lookup
 * can never credit the allowance back.
 */
export function meteredBudgetCost(
  providerId: string | null | undefined,
  estimatedCost: number
): number {
  if (!consumesMeteredBudget(providerId)) return 0;
  if (!Number.isFinite(estimatedCost) || estimatedCost <= 0) return 0;
  return estimatedCost;
}

export interface MeteredBudgetDecision {
  /** May this candidate be served under the key's current budget state? */
  allowed: boolean;
  /** Client-facing reason, present only when `allowed` is false. */
  reason?: string;
}

const ALLOWED: MeteredBudgetDecision = { allowed: true };

/**
 * Budget eligibility for ONE candidate provider.
 *
 * This is an eligibility answer, never a routing answer: it can remove a
 * candidate from consideration, and it can never nominate one. Ranking,
 * health, quota and compatibility stay where they are — the router remains the
 * single authority over which eligible candidate is used.
 *
 * A key with no budget configured, or with budget remaining, is allowed for
 * every provider. A key whose allowance is spent is allowed only for providers
 * that do not consume it.
 */
export function checkMeteredBudgetForProvider(
  apiKeyId: string | null | undefined,
  providerId: string | null | undefined
): MeteredBudgetDecision {
  if (!apiKeyId) return ALLOWED;
  if (!consumesMeteredBudget(providerId)) return ALLOWED;
  const budget = checkBudget(apiKeyId);
  if (budget.allowed) return ALLOWED;
  return { allowed: false, reason: budget.reason || "Budget limit exceeded" };
}

/**
 * The per-dispatch monetary-eligibility gate: called once a candidate provider
 * is known, before a credential is acquired (a refusal must never take one), and
 * before the fallback loop (a local refusal must never be read as an upstream
 * rate limit and cool a healthy connection). Returns the 429 to send, or null to
 * proceed. Kept out of the handler to stay under its frozen file-size ratchet.
 */
export function rejectIfMeteredBudgetExceeded(
  apiKeyId: string | null | undefined,
  providerId: string | null | undefined,
  modelStr: string
): Response | null {
  const decision = checkMeteredBudgetForProvider(apiKeyId, providerId);
  if (decision.allowed) return null;
  log.info(
    "BUDGET",
    `Rejecting ${modelStr} — ${providerId} draws on the metered budget and it is exhausted`
  );
  return errorResponse(HTTP_STATUS.RATE_LIMITED, decision.reason || "Budget limit exceeded", {
    code: "BUDGET_EXCEEDED",
  });
}
