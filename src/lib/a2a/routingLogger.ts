/**
 * A2A Routing Decision Logger
 *
 * Records every routing decision to the `routing_decisions` SQLite table.
 * Used by `omniroute_explain_route` (T03) and future learning router.
 * Retention: 7 days default.
 */

import { randomUUID } from "crypto";

export interface RoutingFactor {
  name: string; // "quota", "health", "cost", "latency", "task_fit"
  value: number;
  weight: number;
  contribution: number;
}

export interface FallbackEntry {
  provider: string;
  reason: string; // "circuit_breaker_open", "quota_exceeded", "timeout"
}

export interface RoutingDecision {
  requestId: string;
  taskType: string;
  comboId: string;
  providerSelected: string;
  modelUsed: string;
  score: number;
  factors: RoutingFactor[];
  fallbacksTriggered: FallbackEntry[];
  success: boolean;
  latencyMs: number;
  cost: number;
  timestamp: string;
}

// In-memory log (production would use SQLite via routing_decisions table)
const decisions: RoutingDecision[] = [];
const MAX_DECISIONS = 1000;
const RETENTION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Log a routing decision.
 */
export function logRoutingDecision(
  params: Omit<RoutingDecision, "requestId" | "timestamp">
): RoutingDecision {
  const decision: RoutingDecision = {
    ...params,
    requestId: randomUUID(),
    timestamp: new Date().toISOString(),
  };

  decisions.push(decision);

  // Cleanup: cap + TTL
  if (decisions.length > MAX_DECISIONS) {
    const cutoff = new Date(Date.now() - RETENTION_MS);
    const validIdx = decisions.findIndex((d) => new Date(d.timestamp) > cutoff);
    if (validIdx > 0) decisions.splice(0, validIdx);
    else if (decisions.length > MAX_DECISIONS)
      decisions.splice(0, decisions.length - MAX_DECISIONS);
  }

  return decision;
}

/**
 * Get a specific routing decision by request ID.
 */
export function getRoutingDecision(requestId: string): RoutingDecision | undefined {
  return decisions.find((d) => d.requestId === requestId);
}

/**
 * Get recent routing decisions.
 */
export function getRecentDecisions(limit: number = 20): RoutingDecision[] {
  return decisions.slice(-limit).reverse();
}

/**
 * Get routing decision stats.
 */
export function getDecisionStats(): {
  total: number;
  successRate: number;
  avgLatencyMs: number;
  topProviders: Array<{ provider: string; count: number }>;
} {
  if (decisions.length === 0) {
    return { total: 0, successRate: 1, avgLatencyMs: 0, topProviders: [] };
  }

  const successful = decisions.filter((d) => d.success);
  const providerCounts = new Map<string, number>();
  let totalLatency = 0;

  for (const d of decisions) {
    totalLatency += d.latencyMs;
    providerCounts.set(d.providerSelected, (providerCounts.get(d.providerSelected) || 0) + 1);
  }

  const topProviders = [...providerCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([provider, count]) => ({ provider, count }));

  return {
    total: decisions.length,
    successRate: successful.length / decisions.length,
    avgLatencyMs: Math.round(totalLatency / decisions.length),
    topProviders,
  };
}
