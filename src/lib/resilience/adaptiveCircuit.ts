export type AdaptiveCircuitState = "closed" | "open" | "half_open";

export interface AdaptiveCircuit {
  state: AdaptiveCircuitState;
  failureCount: number;
  successCount: number;
  lastFailureAt?: string;
  openedAt?: string;
  halfOpenAt?: string;
  nextProbeAt?: string;
  reason?: string;
}

export function createAdaptiveCircuit(): AdaptiveCircuit {
  return { state: "closed", failureCount: 0, successCount: 0 };
}

export function observeCircuit(
  current: AdaptiveCircuit,
  event: "failure" | "success" | "probe",
  options: { now?: Date; failureThreshold?: number; cooldownMs?: number; reason?: string } = {}
): AdaptiveCircuit {
  const now = options.now ?? new Date();
  const failureThreshold = options.failureThreshold ?? 3;
  const cooldownMs = options.cooldownMs ?? 60_000;
  const next = { ...current };

  if (event === "failure") {
    next.failureCount += 1;
    next.successCount = 0;
    next.lastFailureAt = now.toISOString();
    next.reason = options.reason;
    if (next.state === "half_open" || next.failureCount >= failureThreshold) {
      next.state = "open";
      next.openedAt = now.toISOString();
      next.nextProbeAt = new Date(now.getTime() + cooldownMs).toISOString();
      next.halfOpenAt = undefined;
    }
    return next;
  }

  if (event === "probe") {
    if (next.state === "open" && (!next.nextProbeAt || now >= new Date(next.nextProbeAt))) {
      next.state = "half_open";
      next.halfOpenAt = now.toISOString();
    }
    return next;
  }

  next.successCount += 1;
  if (next.state === "half_open" || next.successCount >= 1) {
    next.state = "closed";
    next.failureCount = 0;
    next.openedAt = undefined;
    next.halfOpenAt = undefined;
    next.nextProbeAt = undefined;
    next.reason = undefined;
  }
  return next;
}
