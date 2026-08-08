import type { WarmupResult } from "./core";

export interface CircuitBreakerState {
  connectionId: string;
  streak: number;
  until: string | null;
  lastFailAt: string | null;
  lastWarmupAt: string | null;
  lastResult: string | null;
}

export interface CircuitBreakerStore {
  get(connectionId: string): Promise<CircuitBreakerState | null>;
  recordResult(connectionId: string, result: WarmupResult): Promise<void>;
  isInBackoff(connectionId: string): Promise<boolean>;
}
