import test from "node:test";
import assert from "node:assert/strict";

const { deliverWebhook } = await import("../../src/lib/webhookDispatcher.ts");

// Regression for the dangling abort-timer leak: deliverWebhook arms a 10s
// setTimeout(() => controller.abort()) before each fetch. The pre-fix code only
// called clearTimeout on the success path, so a non-timeout fetch rejection
// (ECONNREFUSED, DNS failure, etc.) skipped clearTimeout, leaking a live 10s timer
// + AbortController per failed delivery. The fix clears the timer in a `finally`.
test("deliverWebhook clears the abort timer even when fetch rejects", async () => {
  const realSetTimeout = globalThis.setTimeout;
  const realClearTimeout = globalThis.clearTimeout;
  const realFetch = globalThis.fetch;

  const abortTimerIds = new Set<unknown>();
  const clearedIds = new Set<unknown>();

  // Track the 10s abort timer ids; delegate to the real timer so ids stay valid.
  globalThis.setTimeout = ((fn: any, delay?: number, ...args: any[]) => {
    const id = realSetTimeout(fn, delay as any, ...args);
    if (delay === 10_000) abortTimerIds.add(id);
    return id;
  }) as typeof setTimeout;
  globalThis.clearTimeout = ((id: any) => {
    clearedIds.add(id);
    return realClearTimeout(id);
  }) as typeof clearTimeout;
  // Non-timeout network failure — the exact path that previously skipped clearTimeout.
  globalThis.fetch = (async () => {
    throw new Error("ECONNREFUSED");
  }) as typeof fetch;

  try {
    const res = await deliverWebhook(
      "https://example.com/webhook",
      { event: "test.event" as any, timestamp: new Date().toISOString(), data: {} },
      null,
      0 // maxRetries=0 → single attempt, no exponential-backoff timers
    );

    assert.equal(res.success, false, "delivery should fail when fetch rejects");
    assert.ok(abortTimerIds.size >= 1, "an abort timer should have been armed");
    // The regression guard: every armed abort timer must have been cleared,
    // even though the fetch rejected.
    for (const id of abortTimerIds) {
      assert.ok(
        clearedIds.has(id),
        "abort timer must be cleared in finally even when fetch rejects (no dangling 10s timer)"
      );
    }
  } finally {
    globalThis.setTimeout = realSetTimeout;
    globalThis.clearTimeout = realClearTimeout;
    globalThis.fetch = realFetch;
  }
});
