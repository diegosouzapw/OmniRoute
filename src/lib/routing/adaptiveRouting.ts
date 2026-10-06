import type { ProviderFailure } from "@/lib/resilience/failureClassification";
import type { ProviderQuotaStatus } from "@/lib/quota/providerQuotaTelemetry";

export type AllocationDecision = "allow" | "warn" | "deny";
export type CircuitState = "closed" | "open" | "half_open";

export interface RoutingCandidate {
  providerId: string;
  modelId: string;
  capabilityScore: number;
  allocation: AllocationDecision;
  healthScore: number;
  circuit: CircuitState;
  quota: ProviderQuotaStatus;
  latencyMs?: number;
  errorRate?: number;
  modelPreference?: number;
  costPreference?: number;
}

export interface RoutingExplanation {
  providerId: string;
  modelId: string;
  score: number;
  eligible: boolean;
  reasons: string[];
  factors: Record<string, number | string>;
}

export interface RankedRoutingResult {
  selected: RoutingExplanation | null;
  candidates: RoutingExplanation[];
}

function clamp(value: number, fallback = 0): number {
  return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : fallback;
}

function quotaFactor(quota: ProviderQuotaStatus): number {
  switch (quota) {
    case "exhausted":
      return 0;
    case "approaching_limit":
      return 0.65;
    case "unavailable":
      return 0.9;
    case "unknown":
      return 1;
    case "healthy":
      return 1;
    default:
      return 1;
  }
}

function latencyFactor(latencyMs?: number): number {
  if (!Number.isFinite(latencyMs) || latencyMs === undefined) return 1;
  return Math.max(0.4, 1 - Math.min(latencyMs, 30_000) / 50_000);
}

export function scoreCandidate(candidate: RoutingCandidate): RoutingExplanation {
  const capability = clamp(candidate.capabilityScore);
  const allocation =
    candidate.allocation === "deny" ? 0 : candidate.allocation === "warn" ? 0.85 : 1;
  const health = clamp(candidate.healthScore, 0.5);
  const reliability = 1 - clamp(candidate.errorRate ?? 0);
  const latency = latencyFactor(candidate.latencyMs);
  const preference = clamp(candidate.modelPreference, 0.5);
  const cost = clamp(candidate.costPreference, 1);
  const quota = quotaFactor(candidate.quota);
  const circuit = candidate.circuit === "open" ? 0 : candidate.circuit === "half_open" ? 0.5 : 1;
  const score = Number(
    (
      capability *
      allocation *
      health *
      reliability *
      latency *
      preference *
      cost *
      quota *
      circuit
    ).toFixed(6)
  );
  const reasons = [
    capability >= 0.8 ? "capability match" : "partial capability match",
    candidate.allocation === "allow"
      ? "allocation permitted"
      : candidate.allocation === "warn"
        ? "allocation permitted with warning"
        : "allocation denied",
    health >= 0.8 ? "provider healthy" : "provider health degraded",
    `circuit ${candidate.circuit}`,
    candidate.quota === "unknown"
      ? "quota state unknown but not exhausted"
      : `quota ${candidate.quota}`,
  ];
  if (candidate.latencyMs !== undefined)
    reasons.push(`latency ${Math.round(candidate.latencyMs)}ms`);
  if (candidate.errorRate !== undefined)
    reasons.push(`${Math.round(candidate.errorRate * 100)}% recent errors`);
  return {
    providerId: candidate.providerId,
    modelId: candidate.modelId,
    score,
    eligible:
      score > 0 &&
      candidate.allocation !== "deny" &&
      candidate.circuit !== "open" &&
      candidate.quota !== "exhausted",
    reasons,
    factors: {
      capability,
      allocation,
      health,
      reliability,
      latency,
      preference,
      cost,
      quota,
      circuit,
    },
  };
}

export function rankCandidates(candidates: RoutingCandidate[]): RankedRoutingResult {
  const ranked = candidates.map(scoreCandidate).sort((a, b) => b.score - a.score);
  return { selected: ranked.find((candidate) => candidate.eligible) ?? null, candidates: ranked };
}

export interface FailoverPolicy {
  maxProviderAttempts: number;
  allowCrossProviderFallback: boolean;
  retryRateLimited: boolean;
  retryTimeouts: boolean;
}

export const DEFAULT_FAILOVER_POLICY: FailoverPolicy = {
  maxProviderAttempts: 3,
  allowCrossProviderFallback: true,
  retryRateLimited: true,
  retryTimeouts: true,
};

export function shouldFailover(
  failure: ProviderFailure,
  policy = DEFAULT_FAILOVER_POLICY
): boolean {
  if (!policy.allowCrossProviderFallback || !failure.retryable) return false;
  if (failure.type === "rate_limit") return policy.retryRateLimited;
  if (failure.type === "timeout") return policy.retryTimeouts;
  return failure.type === "network_error" || failure.type === "provider_5xx";
}
