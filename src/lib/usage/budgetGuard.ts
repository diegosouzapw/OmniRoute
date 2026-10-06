export type BudgetPeriod = "daily" | "weekly" | "monthly";
export type BudgetDecision = "allow" | "warn" | "deny";

export interface InternalBudgetLimit {
  id: string;
  scope: "global" | "provider" | "model" | "pool";
  providerId?: string;
  modelId?: string;
  poolId?: string;
  period: BudgetPeriod;
  limitType: "currency" | "tokens" | "requests";
  limitValue: number;
  warningThreshold: number;
  enabled: boolean;
}

export interface BudgetUsage {
  currency: number;
  tokens: number;
  requests: number;
}

export interface BudgetEvaluation {
  decision: BudgetDecision;
  limit?: InternalBudgetLimit;
  used: number;
  remaining?: number;
  reason: string;
}

export function evaluateBudget(
  limit: InternalBudgetLimit | undefined,
  usage: BudgetUsage
): BudgetEvaluation {
  if (!limit || !limit.enabled)
    return { decision: "allow", used: 0, reason: "No enabled internal budget applies." };
  const used = usage[limit.limitType];
  if (!Number.isFinite(used) || limit.limitValue <= 0) {
    return {
      decision: "deny",
      limit,
      used: 0,
      remaining: 0,
      reason: "Internal budget configuration is invalid.",
    };
  }
  const remaining = Math.max(0, limit.limitValue - used);
  if (used >= limit.limitValue)
    return { decision: "deny", limit, used, remaining, reason: "Internal budget exhausted." };
  if (used / limit.limitValue >= limit.warningThreshold) {
    return {
      decision: "warn",
      limit,
      used,
      remaining,
      reason: `Internal budget is ${Math.round((used / limit.limitValue) * 100)}% consumed.`,
    };
  }
  return {
    decision: "allow",
    limit,
    used,
    remaining,
    reason: "Internal budget permits the request.",
  };
}
