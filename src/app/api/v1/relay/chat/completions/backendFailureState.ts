interface FailureEntry {
  until: number;
  reason: string;
}

const failures = new Map<string, FailureEntry>();

export interface ActiveBackendFailure {
  remainingMs: number;
  reason: string;
}

export function getActiveBackendFailure(
  backendId: string,
  now = Date.now()
): ActiveBackendFailure | null {
  const entry = failures.get(backendId);
  if (!entry) return null;
  if (entry.until <= now) {
    failures.delete(backendId);
    return null;
  }

  return {
    remainingMs: entry.until - now,
    reason: entry.reason,
  };
}

export function recordBackendFailure(
  backendId: string,
  reason: string,
  now = Date.now(),
  cooldownMs: number
): void {
  if (cooldownMs <= 0) {
    failures.delete(backendId);
    return;
  }
  failures.set(backendId, { until: now + cooldownMs, reason });
}

export function clearBackendFailure(backendId: string): void {
  failures.delete(backendId);
}

export function resetBackendFailures(): void {
  failures.clear();
}
