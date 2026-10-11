import type { TransitionRecord } from "@/shared/utils/circuitBreaker";
import type { ProviderAvailability } from "@/lib/providerAvailability";

// Shared contract between the connections API (src/app/api/resilience/connections/route.ts)
// and any future UI consumer. Keep in sync with the route's GET response shape.

export interface ResilienceConnectionsResponse {
  connections: ConnectionState[];
  breakers: BreakerWithHistory[];
  // sinceMs/untilMs are ABSOLUTE timestamps (epoch ms); now is server time.
  window: { sinceMs: number; untilMs: number; now: number };
  // Client-side field: set after fetch resolves (not sent by server).
  // Used for clock-skew-immune countdown: cooldownRemainingMs - (Date.now() - receivedAt).
  receivedAt?: number;
  meta: {
    totalConnections: number;
    coolingDownCount: number;
    unhealthyBreakerCount: number;
    countsCapped: boolean; // true when totalConnections > CONNECTION_LIMIT
    degraded: string[];
  };
}

export interface RotationAccountState {
  masked: string;
  ready: boolean;
  cooldownUntilMs: number | null;
  consecutiveFails: number;
}

export interface ConnectionState {
  id: string;
  provider: string;
  name: string | null;
  authType: string;
  priority: number;
  isActive: boolean;
  connectionStatus: "healthy" | "cooling_down" | "circuit_open" | "terminal";
  rateLimitedUntil: string | null;
  backoffLevel: number;
  testStatus: string | null;
  lastErrorType: string | null;
  lastErrorAt: string | null;
  errorCode: string | null;
  lastUsedAt: string | null;
  cooldownRemainingMs: number;
  isCoolingDown: boolean;
  breaker: {
    state: string;
    failureCount: number;
    retryAfterMs: number;
    lastFailureKind: string | null;
  } | null;
  lockouts: Array<{ model: string; reason: string; remainingMs: number }>;
  /** Per-account rotation state (loopback-gated read-only) — null when the
   * attribution flag is off or no rotation snapshot was recorded. */
  rotation: RotationAccountState[] | null;
  /** Typed availability derived from the connection's stored state (Section 2):
   * NO_CREDENTIAL / AUTH_EXPIRED / QUOTA_EXHAUSTED / DISABLED / STALE_TERMINAL /
   * UNHEALTHY / AVAILABLE, instead of the single coarse `connectionStatus` badge. */
  availability: ProviderAvailability;
}

export interface BreakerWithHistory {
  name: string;
  state: string;
  failureCount: number;
  retryAfterMs: number;
  lastFailureKind: string | null;
  transitionHistory: TransitionRecord[];
}
