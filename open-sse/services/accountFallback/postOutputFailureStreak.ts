/**
 * accountFallback/postOutputFailureStreak.ts — when a 5xx AFTER the stream already
 * relayed output should still lock the model.
 *
 * One such failure is per-request: the client response is committed, so a model-only
 * lockout cannot help that request and only benches the model for every other client.
 * A model that fails EVERY stream mid-way is broken, though, and must still be locked so
 * the next requests fail over instead of receiving cut-off answers. So these failures
 * are counted per provider/connection/model, a completed stream resets the count, and
 * the lock is recorded only when POST_OUTPUT_FAILURE_STREAK_LOCK of them arrive in a row.
 */

export const POST_OUTPUT_FAILURE_STREAK_LOCK = 3;
/** A streak whose last failure is older than this starts over. */
export const POST_OUTPUT_FAILURE_STREAK_WINDOW_MS = 10 * 60_000;

const streaks = new Map<string, { count: number; lastAt: number }>();

function streakKey(provider: string, connectionId: string, model: string): string {
  return `${provider}\u0000${connectionId}\u0000${model}`;
}

/**
 * Record one post-output 5xx. True when it completes a streak that should lock the model
 * (the streak then restarts, so the lockout's own backoff takes over).
 */
export function postOutputFailureReachesLockout(
  provider: string,
  connectionId: string,
  model: string,
  now = Date.now()
): boolean {
  const key = streakKey(provider, connectionId, model);
  const prev = streaks.get(key);
  const count =
    prev && now - prev.lastAt <= POST_OUTPUT_FAILURE_STREAK_WINDOW_MS ? prev.count + 1 : 1;
  if (count >= POST_OUTPUT_FAILURE_STREAK_LOCK) {
    streaks.delete(key);
    return true;
  }
  streaks.set(key, { count, lastAt: now });
  return false;
}

/** A stream on this provider/connection/model completed successfully. */
export function clearPostOutputFailureStreak(
  provider: string | null | undefined,
  connectionId: string | null | undefined,
  model: string | null | undefined
): void {
  if (!provider || !connectionId || !model || streaks.size === 0) return;
  streaks.delete(streakKey(provider, connectionId, model));
}

/** Test helper. */
export function resetPostOutputFailureStreaks(): void {
  streaks.clear();
}
