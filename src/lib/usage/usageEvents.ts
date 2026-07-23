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

// ── Stats-event debounce ─────────────────────────────────────────────────────
//
// Rapid back-to-back inserts (e.g. combo routing that fans out to multiple
// models simultaneously) can fire dozens of "update" events per second.
// scheduleStatsEvent collapses bursts: the first call within a window sets a
// timer; subsequent calls within the same window are no-ops. The timer fires
// once at the end of the window.

type StatsEventKey = "update" | "pending";

const statsEmitTimers: Record<StatsEventKey, ReturnType<typeof setTimeout> | null> = {
  update: null,
  pending: null,
};

const statsListeners: Record<StatsEventKey, Set<() => void>> = {
  update: new Set(),
  pending: new Set(),
};

/** Register a debounced stats listener. Returns an unsubscribe fn. */
export function onStatsEvent(event: StatsEventKey, listener: () => void): () => void {
  statsListeners[event].add(listener);
  return () => {
    statsListeners[event].delete(listener);
  };
}

/**
 * Schedule a stats event emission after `delayMs`, collapsing rapid bursts
 * into a single notification. Safe to call from hot paths — subsequent calls
 * within the same window are no-ops.
 */
export function scheduleStatsEvent(event: StatsEventKey, delayMs = 200): void {
  if (statsEmitTimers[event] != null) return;
  statsEmitTimers[event] = setTimeout(() => {
    statsEmitTimers[event] = null;
    for (const listener of statsListeners[event]) {
      try {
        listener();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[usageEvents] stats listener (${event}) failed: ${message}`);
      }
    }
  }, delayMs);
  // Allow Node.js to exit naturally even if the timer is still pending
  // (avoids keeping the event loop alive for a stray stats notification).
  (statsEmitTimers[event] as any)?.unref?.();
}
