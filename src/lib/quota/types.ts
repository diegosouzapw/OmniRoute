import type { DimensionKey, Policy, QuotaDimension } from "./dimensions";

export interface PoolUsageSnapshot {
  poolId: string;
  generatedAt: string;
  dimensions: Array<{
    unit: QuotaDimension["unit"];
    window: QuotaDimension["window"];
    limit: number;
    consumedTotal: number;
    perKey: Array<{
      apiKeyId: string;
      consumed: number;
      fairShare: number;
      deficit: number;
      borrowing: boolean;
    }>;
  }>;
  burnRate?: {
    tokensPerSecond: number;
    timeToExhaustionMs: number | null;
  };
}

export interface ConsumeResult {
  effective: number;
  limit: number;
  fairShare: number;
  allowed: boolean;
  policyApplied: Policy;
  reason: "ok" | "fair-share" | "cap-absolute" | "global-saturated";
}

export interface QuotaStore {
  consume(apiKeyId: string, dim: DimensionKey, cost: number): Promise<number>;
  peek(apiKeyId: string, dim: DimensionKey): Promise<number>;
  /**
   * Return the real pool-wide consumption for a dimension in the current
   * sliding window — i.e. the sum of each key's effective consumption across
   * ALL apiKeyIds that have contributed to (poolId, unit, window).
   *
   * Unlike the per-key saturation signal (which can be 0 for countable units
   * whose hard-cap has never been set), this reflects actual spent units so
   * the enforce path can block when the pool total hits the plan limit.
   */
  poolConsumedTotal(poolId: string, dim: DimensionKey): Promise<number>;
  poolUsage(poolId: string): Promise<PoolUsageSnapshot>;
  /**
   * Build a PoolUsageSnapshot with explicit plan dimensions. This is the
   * primary method for dashboard / REST usage — it resolves per-key
   * consumption, fair-share, deficit, borrowing, and burn-rate from the
   * plan's dimension list.
   *
   * The parameterless `poolUsage()` is kept for backward compatibility but
   * returns minimal data (no plan context). Prefer this method when plan
   * dimensions are available.
   */
  poolUsageWithDimensions(
    poolId: string,
    planDimensions: Array<{ unit: string; window: string; limit: number }>
  ): Promise<PoolUsageSnapshot>;
  clear(apiKeyId: string, dim: DimensionKey): Promise<void>;
}

export interface EnforceInput {
  apiKeyId: string;
  connectionId: string;
  provider: string;
  /**
   * Optional model identifier. When present, `enforceQuotaShare` checks for a
   * per-(key, model) cap row in `quota_allocation_model_caps` and blocks only
   * this model if the cap is reached (Fase 3 #7). Fully backward-compatible:
   * callers that do not pass `model` receive unchanged behaviour.
   */
  model?: string;
  estimatedCost?: { tokens?: number; usd?: number; requests?: number };
}

export type EnforceDecision =
  | { kind: "allow"; deprioritize?: boolean }
  | { kind: "block"; reason: string; httpStatus: 429; retryAfterSeconds?: number };

export interface RecordConsumptionInput {
  apiKeyId: string;
  connectionId: string;
  provider: string;
  /**
   * Optional model identifier. When present, `recordConsumption` also
   * increments the per-(key, model) consumption bucket used by the model-cap
   * pre-check in `enforceQuotaShare` (Fase 3 #7). Backward-compatible.
   */
  model?: string;
  cost: { tokens?: number; usd?: number; requests?: number };
}
