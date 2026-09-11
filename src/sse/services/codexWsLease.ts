import { randomUUID } from "node:crypto";
import {
  acquire as acquireAccountSemaphore,
  buildAccountSemaphoreKey,
} from "@omniroute/open-sse/services/accountSemaphore.ts";

const leases = new Map<string, () => void>();

/** Acquire a non-queued, process-local account slot for one Responses WS session. */
export async function acquireCodexWsLease(
  connectionId: string,
  configuredMaxConcurrent: number | null | undefined
): Promise<string | null> {
  const key = buildAccountSemaphoreKey({ provider: "codex", accountKey: connectionId });
  try {
    const release = await acquireAccountSemaphore(key, {
      maxConcurrency:
        typeof configuredMaxConcurrent === "number" && configuredMaxConcurrent > 0
          ? configuredMaxConcurrent
          : 1,
      maxQueueSize: 0,
    });
    const leaseId = randomUUID();
    leases.set(leaseId, release);
    return leaseId;
  } catch {
    return null;
  }
}

/** Release a bridge lease once; unknown/already-released leases are harmless. */
export function releaseCodexWsLease(leaseId: string | null | undefined): boolean {
  if (!leaseId) return false;
  const release = leases.get(leaseId);
  if (!release) return false;
  leases.delete(leaseId);
  release();
  return true;
}

export function clearCodexWsLeasesForTest(): void {
  for (const leaseId of leases.keys()) releaseCodexWsLease(leaseId);
}
