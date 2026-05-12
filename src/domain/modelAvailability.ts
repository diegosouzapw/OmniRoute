import {
  getAllModelLockouts,
  clearModelLock,
  type ModelLockoutInfo,
} from "@omniroute/open-sse/services/accountFallback";

export type AvailabilityReportItem = Pick<
  ModelLockoutInfo,
  "provider" | "model" | "reason" | "remainingMs" | "failureCount"
> & {
  connectionId: string;
};

export function getAvailabilityReport(): AvailabilityReportItem[] {
  return getAllModelLockouts().map((entry) => ({
    provider: entry.provider,
    model: entry.model,
    connectionId: entry.connectionId,
    reason: entry.reason,
    remainingMs: entry.remainingMs,
    failureCount: entry.failureCount,
  }));
}

export function clearModelUnavailability(provider: string, model: string): boolean {
  const all = getAllModelLockouts();
  const matching = all.filter((e) => e.provider === provider && e.model === model);
  if (matching.length === 0) return false;
  let cleared = false;
  for (const entry of matching) {
    if (clearModelLock(provider, entry.connectionId, model)) cleared = true;
  }
  return cleared;
}

export function resetAllAvailability(): void {
  const all = getAllModelLockouts();
  for (const entry of all) {
    clearModelLock(entry.provider, entry.connectionId, entry.model);
  }
}
