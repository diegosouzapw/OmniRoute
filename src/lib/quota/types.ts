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
  clear(apiKeyId: string, dim: DimensionKey): Promise<void>;
}

export interface EnforceInput {
  apiKeyId: string;
  connectionId: string;
  provider: string;
  estimatedCost?: { tokens?: number; usd?: number; requests?: number };
}

export type EnforceDecision =
  | { kind: "allow"; deprioritize?: boolean }
  | { kind: "block"; reason: string; httpStatus: 429; retryAfterSeconds?: number };

export interface RecordConsumptionInput {
  apiKeyId: string;
  connectionId: string;
  provider: string;
  cost: { tokens?: number; usd?: number; requests?: number };
}
