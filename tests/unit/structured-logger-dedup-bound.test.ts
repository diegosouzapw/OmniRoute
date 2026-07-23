import test from "node:test";
import assert from "node:assert/strict";

const { __structuredLoggerInternals } = await import(
  "../../src/shared/utils/structuredLogger.ts"
);

test("pruneRecentErrors enforces a hard cap during a unique-message burst", () => {
  const { recentErrors, pruneRecentErrors, MAX_TRACKED_ERRORS } = __structuredLoggerInternals;
  recentErrors.clear();

  const now = Date.now();
  // Simulate a burst of unique messages within a single dedup window (all firstSeen = now,
  // so the age-based cleanup removes none of them).
  for (let i = 0; i < MAX_TRACKED_ERRORS * 2; i++) {
    pruneRecentErrors(now);
    recentErrors.set(`unique-error-${i}`, { count: 1, firstSeen: now });
  }
  pruneRecentErrors(now);

  assert.ok(
    recentErrors.size <= MAX_TRACKED_ERRORS,
    `map should be bounded by ${MAX_TRACKED_ERRORS}, got ${recentErrors.size}`
  );

  // The cap evicts the OLDEST entries, so the most recent ones survive.
  assert.ok(
    recentErrors.has(`unique-error-${MAX_TRACKED_ERRORS * 2 - 1}`),
    "the newest entry should be retained"
  );

  recentErrors.clear();
});

test("pruneRecentErrors removes entries older than the dedup window", () => {
  const { recentErrors, pruneRecentErrors } = __structuredLoggerInternals;
  recentErrors.clear();

  const base = Date.now();
  // 150 entries (>100 so the age cleanup runs), all old.
  for (let i = 0; i < 150; i++) {
    recentErrors.set(`old-${i}`, { count: 1, firstSeen: base });
  }
  // Advance well past the 5s dedup window.
  pruneRecentErrors(base + 60_000);

  assert.equal(recentErrors.size, 0, "all expired entries should be cleaned up");
  recentErrors.clear();
});
