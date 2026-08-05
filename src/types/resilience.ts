import type { TransitionRecord } from "@/shared/utils/circuitBreaker";

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
}

export interface BreakerWithHistory {
  name: string;
  state: string;
  failureCount: number;
  retryAfterMs: number;
  lastFailureKind: string | null;
  transitionHistory: TransitionRecord[];
}
