/**
 * Lightweight usage-event bus.
 *
 * Decouples usage recording (usageHistory.ts) from the provider-limits
 * subsystem (providerLimits.ts). usageHistory must NOT import providerLimits:
 * providerLimits pulls in the executors barrel (and the whole translator graph),
 * so a direct or dynamic import from usageHistory expands the type-check surface
 * across modules that have nothing to do with usage recording. usageHistory
 * emits here; providerLimits subscribes at module load.
 *
 * @module lib/usage/usageEvents
 */

export type UsageRecordedListener = (provider: string, connectionId: string) => void;

const listeners = new Set<UsageRecordedListener>();

/** Register a listener for usage-recorded events. Returns an unsubscribe fn. */
export function onUsageRecorded(listener: UsageRecordedListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Emit a usage-recorded event. No-ops when provider/connectionId is missing. */
export function emitUsageRecorded(
  provider: string | null | undefined,
  connectionId: string | null | undefined
): void {
  if (!provider || !connectionId) return;
  for (const listener of listeners) {
    try {
      listener(provider, connectionId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[usageEvents] usage-recorded listener failed: ${message}`);
    }
  }
}
