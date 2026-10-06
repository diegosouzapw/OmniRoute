import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker.ts";

export type BreakerState = "CLOSED" | "HALF_OPEN" | "OPEN";

/**
 * Build-time breaker state per provider. Any other state (e.g. DEGRADED) and a
 * failed lookup leave the provider absent, so it scores neutral.
 */
export function readBreakerStates(providers: Iterable<string>): Map<string, BreakerState> {
  const states = new Map<string, BreakerState>();
  for (const provider of providers) {
    try {
      const state = getCircuitBreaker(provider).getStatus().state as string;
      if (state === "OPEN" || state === "HALF_OPEN" || state === "CLOSED") {
        states.set(provider, state);
      }
    } catch {
      // An unreadable breaker leaves the provider neutral.
    }
  }
  return states;
}

/** Snapshot health factor: OPEN 0, CLOSED 1, HALF_OPEN or unknown 0.5 (neutral). */
export function snapshotHealthFactor(
  states: ReadonlyMap<string, BreakerState> | undefined,
  provider: string
): number {
  const state = states?.get(provider);
  return state === "OPEN" ? 0 : state === "CLOSED" ? 1 : 0.5;
}
