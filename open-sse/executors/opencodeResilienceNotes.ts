import { noteResilienceAction } from "@/lib/usage/resilienceActionsContext.ts";

/**
 * resilience effective served-account changes (effective-change counting): the first served dispatch is 0,
 * each later dispatch served by a distinct account is +1. Abort and
 * shared-egress exclusion arms never reach the call site, so they never
 * count. Best-effort notes only.
 */
export function createServedAccountTracker(): (fingerprint: string) => void {
  let lastServedFingerprint: string | null = null;
  return (fingerprint: string): void => {
    if (lastServedFingerprint !== null && lastServedFingerprint !== fingerprint) {
      noteResilienceAction({ rotations: 1 });
    }
    lastServedFingerprint = fingerprint;
  };
}

/** resilience park outcome notes (local monotone wait + replayed/stored flags). */
export function noteParkWait(elapsedMs: number): void {
  noteResilienceAction({ parked: true, parkMs: Math.max(0, Math.round(elapsedMs)) });
}

export function noteReplayed(): void {
  noteResilienceAction({ replayed: true });
}

export function noteStoredFallback(): void {
  // The stored 429 fallback is served without a new send.
  noteResilienceAction({ replayed: false, stored429: true });
}
