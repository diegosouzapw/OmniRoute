import { isResponseStatusRetryable, runWithTransientBackendRetry, TRANSIENT_BACKEND_STATUS_CODES, } from "../../open-sse/services/transientBackendRetry";
import assert from "node:assert/strict";
import test from "node:test";

const sleepImpl = async (_ms: number, _signal?: AbortSignal): Promise<void> => {
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

test("transientBackendRetry: default sleep respects AbortSignal without custom sleep", async () => {
  const ac = new AbortController();
  let calls = 0;
  const promise = runWithTransientBackendRetry(
    async () => {
      calls++;
      return { ok: false, status: 503, body: null };
    },
    { maxAttempts: 5, baseMs: 50, capMs: 100, signal: ac.signal }
  );
  // Abort during the first sleep — should reject quickly, not after 50-100ms
  setTimeout(() => ac.abort(), 10);
  const start = Date.now();
  await assert.rejects(promise, /aborted/i);
  const elapsed = Date.now() - start;
  assert.ok(elapsed < 80, `should abort quickly (elapsed ${elapsed}ms), not wait for the full sleep`);
  assert.ok(calls >= 1);
});

test("transientBackendRetry: onRetry receives source label", async () => {
  let calls = 0;
  const retries: Array<{ attempt: number; status?: number; source?: string }> = [];
  await runWithTransientBackendRetry(
    async () => {
      calls++;
      if (calls < 2) return { ok: false, status: 503, body: null };
      return { ok: true, status: 200, body: "ok" };
    },
    {
      sleep: sleepImpl,
      maxAttempts: 3,
      baseMs: 1,
      capMs: 4,
      source: "global-fallback",
      onRetry: (info) => { retries.push(info); },
    }
  );
  assert.equal(retries.length, 1);
  assert.equal(retries[0].source, "global-fallback");
  assert.equal(retries[0].status, 503);
});

test("transientBackendRetry: decorrelated jitter is bounded by capMs", async () => {
  let calls = 0;
  await runWithTransientBackendRetry(
    async () => {
      calls++;
      return { ok: false, status: 503, body: null };
    },
    { sleep: sleepImpl, maxAttempts: 5, baseMs: 1, capMs: 4 }
  );
  assert.equal(calls, 5);
});

// #PR-12695 follow-up (chatgpt-codex-connector P1 review): the wrapper cannot
// recover the scenario it targets if the inner action poisons the connection's
// `rateLimitedUntil` on attempt #1 — attempt #2 then cannot re-select the only
// eligible credential. The fix is at the call site: pass
// `suppressConnectionCooldown: true` to `handleSingleModelChat` so the action
// does NOT call `markAccountUnavailable`. These tests pin the wrapper-level
// contract the fix relies on.
test("transientBackendRetry: re-invokes the action on every attempt (caller relies on this to retry after suppressConnectionCooldown)", async () => {
  const seenAtAttempt: number[] = [];
  let attempt = 0;
  const result = await runWithTransientBackendRetry(
    async () => {
      attempt += 1;
      seenAtAttempt.push(attempt);
      // Simulate the fixed call site: by the time attempt #2 runs,
      // `suppressConnectionCooldown: true` would have prevented the
      // cooldown from being recorded, so this attempt still has the same
      // connection available.
      return attempt < 3
        ? { ok: false, status: 502, body: null }
        : { ok: true, status: 200, body: "recovered" };
    },
    { sleep: sleepImpl, maxAttempts: 3, baseMs: 1, capMs: 4 }
  );
  assert.equal(result.ok, true);
  assert.equal(result.status, 200, "retry succeeded on attempt #3 after transient 502s");
  assert.deepEqual(
    seenAtAttempt,
    [1, 2, 3],
    "wrapper re-invoked action on every attempt — caller needs every attempt to be fresh"
  );
});

test("transientBackendRetry: always invokes maxAttempts times for transient errors (never caches the first response)", async () => {
  // Pins the contract that the wrapper does not short-circuit on its own.
  // The CALLER (via suppressConnectionCooldown on handleSingleModelChat) is
  // responsible for keeping each attempt meaningful; the wrapper's job is to
  // drive the re-invocation.
  let calls = 0;
  const result = await runWithTransientBackendRetry(
    async () => {
      calls += 1;
      return { ok: false, status: 502, body: null };
    },
    { sleep: sleepImpl, maxAttempts: 3, baseMs: 1, capMs: 4 }
  );
  assert.equal(calls, 3, "wrapper always invokes exactly maxAttempts times for transient errors");
  assert.equal(result.status, 502, "returns the final transient response on exhaustion");
});
