import { isResponseStatusRetryable, runWithTransientBackendRetry, TRANSIENT_BACKEND_STATUS_CODES, } from "../../open-sse/services/transientBackendRetry";
import assert from "node:assert/strict";
import test from "node:test";

const sleepImpl = async (_ms: number): Promise<void> => {
  // no-op
};

test("transientBackendRetry: classify 502/503/504 as retryable, others not", () => {
  for (const code of [502, 503, 504]) {
    assert.equal(isResponseStatusRetryable(code), true, `${code} should be retryable`);
  }
  for (const code of [400, 401, 403, 404, 409, 422, 429, 500, 501, 505, 507, 510]) {
    assert.equal(isResponseStatusRetryable(code), false, `${code} should NOT be retryable`);
  }
  assert.equal(TRANSIENT_BACKEND_STATUS_CODES.has(429), false, "429 is intentionally not retryable here — the upstream proxy treats 429 as a permanent policy signal");
});

test("transientBackendRetry: returns the first success without retrying", async () => {
  let calls = 0;
  const result = await runWithTransientBackendRetry(async () => {
    calls++;
    return { ok: true, status: 200, body: "hello" };
  }, { sleep: sleepImpl });
  assert.equal(calls, 1);
  assert.deepEqual(result, { ok: true, status: 200, body: "hello" });
});

test("transientBackendRetry: retries on 502/503/504 then returns success", async () => {
  let calls = 0;
  const result = await runWithTransientBackendRetry(async () => {
    calls++;
    if (calls < 3) {
      return { ok: false, status: 503, body: null };
    }
    return { ok: true, status: 200, body: "ok" };
  }, { sleep: sleepImpl, maxAttempts: 5, baseMs: 1, capMs: 4 });
  assert.equal(calls, 3, "should have tried exactly 3 times");
  assert.equal(result.ok, true);
  assert.equal(result.status, 200);
});

test("transientBackendRetry: returns last error when budget exhausted", async () => {
  let calls = 0;
  const result = await runWithTransientBackendRetry(async () => {
    calls++;
    return { ok: false, status: 502, body: null };
  }, { sleep: sleepImpl, maxAttempts: 3, baseMs: 1, capMs: 4 });
  assert.equal(calls, 3, "should have tried exactly 3 times");
  assert.equal(result.ok, false);
  assert.equal(result.status, 502);
});

test("transientBackendRetry: bubbles non-retryable errors immediately", async () => {
  let calls = 0;
  // 401 is NOT transient — should NOT retry (would mean classify failed)
  const result = await runWithTransientBackendRetry(async () => {
    calls++;
    return { ok: false, status: 401, body: "nope" };
  }, { sleep: sleepImpl, maxAttempts: 5, baseMs: 1, capMs: 4 });
  assert.equal(calls, 1, "non-retryable must not retry");
  assert.equal(result.status, 401);
});

test("transientBackendRetry: throws on exhausted attempts for thrown errors", async () => {
  let calls = 0;
  await assert.rejects(async () => {
    await runWithTransientBackendRetry(async () => {
      calls++;
      throw new Error("network down");
    }, { sleep: sleepImpl, maxAttempts: 2, baseMs: 1, capMs: 4 });
  }, /network down/);
  assert.equal(calls, 2, "should retry transient-thrown errors until budget");
});

test("transientBackendRetry: honours AbortSignal mid-flight", async () => {
  const ac = new AbortController();
  let calls = 0;
  const promise = runWithTransientBackendRetry(
    async () => {
      calls++;
      return { ok: false, status: 503, body: null };
    },
    { sleep: async (_ms) => {
      // Wait a tick so the test can abort during the sleep
      await new Promise((resolve) => setTimeout(resolve, 5));
      // Simulate the helper aborting the sleep
      if (ac.signal.aborted) {
        throw Object.assign(new Error("aborted"), { name: "AbortError" });
      }
    }, maxAttempts: 3, baseMs: 1, capMs: 4, signal: ac.signal }
  );
  setTimeout(() => ac.abort(), 10);
  await assert.rejects(promise, /aborted|cancelled/i);
  assert.ok(calls >= 1, "should have called the action at least once before abort");
});
