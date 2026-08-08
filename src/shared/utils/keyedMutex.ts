/**
 * Generic keyed serialization lock. `run(key, fn)` queues onto whatever call
 * is currently pending for `key` (or runs immediately if none), always
 * invoking a NEW call to `fn()` for every caller — this is a SERIALIZATION
 * queue, not a dedup cache. Contrast with
 * `open-sse/services/tokenRefresh.ts`'s `connectionRefreshMutex`, which
 * intentionally shares one execution's result across concurrent callers
 * because they all want the identical "current access token" outcome; here,
 * concurrent callers for the same key each get their own `fn`'s own result,
 * just run one at a time.
 */
export function createKeyedMutex<T = unknown>(): {
  run(key: string, fn: () => Promise<T>): Promise<T>;
} {
  const queue = new Map<string, Promise<void>>();

  function run(key: string, fn: () => Promise<T>): Promise<T> {
    const prior = queue.get(key) ?? Promise.resolve();
    const result = prior.then(fn, fn);
    // Neutral marker (never rejects) used only to chain subsequent callers
    // and to identify — by reference — whether this call is still the last
    // one queued for `key` once it settles.
    const marker: Promise<void> = result.then(
      () => undefined,
      () => undefined
    );
    queue.set(key, marker);
    marker.finally(() => {
      if (queue.get(key) === marker) {
        queue.delete(key);
      }
    });
    return result;
  }

  return { run };
}
