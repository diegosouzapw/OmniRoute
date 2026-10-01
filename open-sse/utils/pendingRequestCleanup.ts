import { trackPendingRequest } from "@/lib/usageDb";

export type PendingCleanup = {
  model: string | null;
  provider: string | null;
  connectionId: string | null;
  pendingRequestId?: string | null;
};

export function clearPendingRequestOnce(seen: { done: boolean }, c: PendingCleanup): void {
  if (seen.done) return;
  seen.done = true;
  trackPendingRequest(
    c.model,
    c.provider,
    c.connectionId,
    false,
    undefined,
    c.pendingRequestId ?? undefined
  );
}
