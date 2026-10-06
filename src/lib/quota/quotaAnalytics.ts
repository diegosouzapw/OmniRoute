/**
 * quotaAnalytics.ts — Usage analytics for provider quota state & remaining capacity.
 *
 * Computes aggregated capacity metrics, average remaining ratios, exhausted connection counts,
 * and per-connection quota usage summaries for dashboard visibility.
 *
 * Part of: Quota-aware provider scheduling (Phase 2).
 */

import { getDbInstance } from "@/lib/db/core";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("quota:analytics");

export interface QuotaAnalyticsSummary {
  totalConnectionsTracked: number;
  exhaustedConnections: number;
  healthyConnections: number;
  averageRemainingRatio: number;
  totalTokensUsed: number;
  totalTokenLimit: number;
  connections: Array<{
    connectionId: string;
    model: string;
    tokensUsed: number;
    tokenLimit: number;
    tokensRemaining: number;
    remainingRatio: number;
    windowReset: number;
    isExhausted: boolean;
  }>;
}

/**
 * Compute real-time quota analytics across all provider connections.
 */
export function getQuotaAnalyticsSummary(): QuotaAnalyticsSummary {
  try {
    const db = getDbInstance();
    const rows = db.prepare("SELECT * FROM provider_quota_state").all() as Array<{
      connection_id: string;
      model: string;
      tokens_used: number;
      token_limit: number;
      window_start: number;
      window_reset: number;
    }>;

    const now = Date.now();
    let totalTokensUsed = 0;
    let totalTokenLimit = 0;
    let exhaustedConnections = 0;
    let healthyConnections = 0;
    let ratioSum = 0;

    const connections = rows.map((r) => {
      const tokensUsed = Number(r.tokens_used ?? 0);
      const tokenLimit = Number(r.token_limit ?? 0);
      const windowReset = Number(r.window_reset ?? 0);
      const isExpired = windowReset > 0 && now > windowReset;

      const effectiveUsed = isExpired ? 0 : tokensUsed;
      const effectiveLimit = isExpired ? 0 : tokenLimit;
      const tokensRemaining = Math.max(0, effectiveLimit - effectiveUsed);
      const remainingRatio = effectiveLimit > 0 ? tokensRemaining / effectiveLimit : 1.0;
      const isExhausted = effectiveLimit > 0 && remainingRatio <= 0.05;

      totalTokensUsed += effectiveUsed;
      totalTokenLimit += effectiveLimit;
      ratioSum += remainingRatio;

      if (isExhausted) {
        exhaustedConnections++;
      } else {
        healthyConnections++;
      }

      return {
        connectionId: String(r.connection_id),
        model: String(r.model),
        tokensUsed: effectiveUsed,
        tokenLimit: effectiveLimit,
        tokensRemaining,
        remainingRatio,
        windowReset,
        isExhausted,
      };
    });

    const count = connections.length;
    const averageRemainingRatio = count > 0 ? ratioSum / count : 1.0;

    return {
      totalConnectionsTracked: count,
      exhaustedConnections,
      healthyConnections,
      averageRemainingRatio,
      totalTokensUsed,
      totalTokenLimit,
      connections,
    };
  } catch (error) {
    log.error("Failed to compute quota analytics summary", error);
    return {
      totalConnectionsTracked: 0,
      exhaustedConnections: 0,
      healthyConnections: 0,
      averageRemainingRatio: 1.0,
      totalTokensUsed: 0,
      totalTokenLimit: 0,
      connections: [],
    };
  }
}
