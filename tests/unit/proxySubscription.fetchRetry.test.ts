import test from "node:test";
import assert from "node:assert/strict";

const { withRetry } = await import("../../src/lib/proxySubscription/fetchRetry.ts");

test("withRetry returns on first success", async () => {
  let calls = 0;
  const r = await withRetry(async () => {
    calls++;
    return "ok";
  });
  assert.equal(r, "ok");
  assert.equal(calls, 1);
});

test("withRetry retries then succeeds", async () => {
  let calls = 0;
  const r = await withRetry(async () => {
    calls++;
    if (calls < 3) throw new Error("transient");
    return "ok";
  });
  assert.equal(r, "ok");
  assert.equal(calls, 3);
});

test("withRetry exhausts attempts on persistent retryable error", async () => {
  let calls = 0;
  await assert.rejects(async () => {
    await withRetry(
      async () => {
        calls++;
        throw new Error("boom");
      },
      { maxAttempts: 3 }
    );
  }, /boom/);
  assert.equal(calls, 3);
});

test("withRetry stops immediately on non-retryable error", async () => {
  let calls = 0;
  await assert.rejects(async () => {
    await withRetry(
      async () => {
        calls++;
        throw new Error("permanent");
      },
      { isRetryable: () => false }
    );
  }, /permanent/);
  assert.equal(calls, 1);
});

test("withRetry applies exponential backoff between attempts", async () => {
  const delays: number[] = [];
  let calls = 0;
  await assert.rejects(async () => {
    await withRetry(
      async () => {
        calls++;
        throw new Error("x");
      },
      {
        maxAttempts: 3,
        baseDelayMs: 100,
        maxDelayMs: 1000,
        sleep: async (ms: number) => {
          delays.push(ms);
        },
      }
    );
  });
  assert.equal(calls, 3);
  // attempt0 → wait 100, attempt1 → wait 200 (min(cap, 100*2)); last attempt does not sleep
  assert.deepEqual(delays, [100, 200]);
});
