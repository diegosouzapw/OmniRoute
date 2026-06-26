/**
 * Regression test for #4041 / #4771: FALLBACK_MEMORY_STORE accumulates
 * stale window keys and never evicts them, leading to a slow heap leak
 * (~500 MB → OOM over ~2 days idle in the self-hosted/no-Redis case).
 *
 * The fix adds `evictStaleRateLimitWindows(store, nowSeconds)` which
 * must be exported from rateLimiter.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";

// Key format: rl:api_key:{id}:{windowSize}:{windowNumber}
// A key's window ends at (windowNumber + 1) * windowSize (epoch-seconds).
// Keys whose window ended in the past must be deleted; the current window must survive.

function makeKey(id: string, windowSize: number, windowNumber: number): string {
  return `rl:api_key:${id}:${windowSize}:${windowNumber}`;
}

test("evictStaleRateLimitWindows is exported from rateLimiter", async () => {
  const { evictStaleRateLimitWindows } = await import("@/shared/utils/rateLimiter.js");
  assert.equal(
    typeof evictStaleRateLimitWindows,
    "function",
    "evictStaleRateLimitWindows must be exported"
  );
});

test("evictStaleRateLimitWindows deletes keys whose window has ended and keeps current keys", async () => {
  const { evictStaleRateLimitWindows } = await import("@/shared/utils/rateLimiter.js");

  const nowSeconds = 1_000_000; // arbitrary fixed "now"
  const windowSize = 60; // 60-second window
  const currentWindow = Math.floor(nowSeconds / windowSize); // window that contains nowSeconds
  const pastWindow1 = currentWindow - 1; // ended at currentWindow * windowSize — already past
  const pastWindow2 = currentWindow - 5; // even older

  const store = new Map<string, number>([
    [makeKey("user-a", windowSize, pastWindow1), 3],
    [makeKey("user-a", windowSize, pastWindow2), 7],
    [makeKey("user-b", windowSize, pastWindow1), 1],
    [makeKey("user-a", windowSize, currentWindow), 2], // LIVE — must survive
  ]);

  assert.equal(store.size, 4, "should start with 4 keys");

  evictStaleRateLimitWindows(store, nowSeconds);

  // Stale keys must be gone
  assert.equal(
    store.has(makeKey("user-a", windowSize, pastWindow1)),
    false,
    "past window -1 for user-a must be evicted"
  );
  assert.equal(
    store.has(makeKey("user-a", windowSize, pastWindow2)),
    false,
    "past window -5 for user-a must be evicted"
  );
  assert.equal(
    store.has(makeKey("user-b", windowSize, pastWindow1)),
    false,
    "past window -1 for user-b must be evicted"
  );

  // Current key must survive
  assert.equal(
    store.has(makeKey("user-a", windowSize, currentWindow)),
    true,
    "current window for user-a must survive"
  );
  assert.equal(
    store.get(makeKey("user-a", windowSize, currentWindow)),
    2,
    "current window count must be unchanged"
  );

  assert.equal(store.size, 1, "only 1 key should remain after eviction");
});

test("evictStaleRateLimitWindows leaves store untouched when all keys are current", async () => {
  const { evictStaleRateLimitWindows } = await import("@/shared/utils/rateLimiter.js");

  const nowSeconds = 2_000_000;
  const windowSize = 3600;
  const currentWindow = Math.floor(nowSeconds / windowSize);

  const store = new Map<string, number>([
    [makeKey("x", windowSize, currentWindow), 5],
    [makeKey("y", windowSize, currentWindow), 9],
  ]);

  evictStaleRateLimitWindows(store, nowSeconds);

  assert.equal(store.size, 2, "no keys should be evicted when all are current");
});

test("evictStaleRateLimitWindows is a no-op on an empty store", async () => {
  const { evictStaleRateLimitWindows } = await import("@/shared/utils/rateLimiter.js");

  const store = new Map<string, number>();
  evictStaleRateLimitWindows(store, 1_000_000);
  assert.equal(store.size, 0);
});

test("evictStaleRateLimitWindows ignores keys with unexpected formats (does not throw)", async () => {
  const { evictStaleRateLimitWindows } = await import("@/shared/utils/rateLimiter.js");

  const store = new Map<string, number>([
    ["not-a-rate-limit-key", 1],
    ["rl:api_key:only-four-segments", 2],
  ]);

  // Must not throw
  assert.doesNotThrow(() => evictStaleRateLimitWindows(store, 1_000_000));
});
