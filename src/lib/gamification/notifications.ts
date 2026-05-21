/**
 * Badge unlock notification system.
 * Emits events that the dashboard can listen to for toast notifications.
 *
 * @module lib/gamification/notifications
 */

export interface BadgeUnlockEvent {
  badgeId: string;
  badgeName: string;
  badgeDescription: string;
  badgeIcon: string;
  badgeRarity: string;
  unlockedAt: string;
}

// In-memory event buffer for SSE streaming
const recentUnlocks: Map<string, { event: BadgeUnlockEvent; addedAt: number }[]> = new Map();
const MAX_BUFFER_SIZE = 50;
const BUFFER_TTL_MS = 60_000; // 1 minute
const STALE_KEY_TTL_MS = 120_000; // 2 minutes for stale key cleanup

/**
 * Record a badge unlock event for notification.
 * Also cleans stale entries across all keys to prevent memory leaks.
 */
export function recordBadgeUnlock(apiKeyId: string, event: BadgeUnlockEvent): void {
  if (!recentUnlocks.has(apiKeyId)) {
    recentUnlocks.set(apiKeyId, []);
  }
  const list = recentUnlocks.get(apiKeyId)!;
  list.push({ event, addedAt: Date.now() });

  // Trim old entries for this key
  const cutoff = Date.now() - BUFFER_TTL_MS;
  while (list.length > 0 && list[0].addedAt < cutoff) {
    list.shift();
  }
  if (list.length > MAX_BUFFER_SIZE) {
    list.splice(0, list.length - MAX_BUFFER_SIZE);
  }

  // Periodic stale key cleanup (on each record, check all keys)
  const staleCutoff = Date.now() - STALE_KEY_TTL_MS;
  for (const [key, entries] of recentUnlocks) {
    // Remove old entries
    const fresh = entries.filter((e) => e.addedAt >= staleCutoff);
    if (fresh.length === 0) {
      recentUnlocks.delete(key);
    } else if (fresh.length !== entries.length) {
      recentUnlocks.set(key, fresh);
    }
  }
}

/**
 * Get and clear recent badge unlocks for an API key.
 */
export function consumeBadgeUnlocks(apiKeyId: string): BadgeUnlockEvent[] {
  const entries = recentUnlocks.get(apiKeyId) || [];
  recentUnlocks.delete(apiKeyId);
  return entries.map((e) => e.event);
}

/**
 * Create a ReadableStream for badge unlock notifications via SSE.
 */
export function createBadgeNotificationStream(
  apiKeyId: string,
  signal?: AbortSignal
): ReadableStream {
  return new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      let closed = false;

      const safeEnqueue = (chunk: Uint8Array) => {
        if (closed) return;
        try {
          controller.enqueue(chunk);
        } catch {
          closed = true;
          clearInterval(interval);
          clearInterval(heartbeat);
        }
      };

      // Check for unlocks every 2s
      const interval = setInterval(() => {
        const events = consumeBadgeUnlocks(apiKeyId);
        for (const event of events) {
          safeEnqueue(encoder.encode(`event: badge_unlock\ndata: ${JSON.stringify(event)}\n\n`));
        }
      }, 2000);

      // Heartbeat every 15s
      const heartbeat = setInterval(() => {
        safeEnqueue(encoder.encode(`: heartbeat ${Date.now()}\n\n`));
      }, 15_000);

      // Cleanup on abort
      const cleanup = () => {
        closed = true;
        clearInterval(interval);
        clearInterval(heartbeat);
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };

      if (signal) {
        signal.addEventListener("abort", cleanup);
      }
    },
  });
}
