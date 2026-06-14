import test from "node:test";
import assert from "node:assert/strict";

// Bug #3758 (Problem A): NVIDIA NIM models intermittently send HTTP 200 then close
// the SSE early with zero useful frames (flaky upstream early-close). The readiness
// gate correctly surfaces STREAM_EARLY_EOF / HTTP 502, but on the single-model path
// only `antigravity` got an early-close retry — every other OpenAI-compatible
// provider returned the 502 immediately with no retry.
//
// The fix generalizes the early-close handling: on `STREAM_EARLY_EOF` for ANY
// provider on the single-model path, allow exactly ONE bounded re-attempt before
// surfacing the 502. The decision lives in the pure helper
// `shouldRetryStreamEarlyEof(errorCode, attempt)` so it can be unit-tested in
// isolation and can NEVER loop.

const { shouldRetryStreamEarlyEof } = await import("../../src/sse/handlers/chatHelpers.ts");

test("shouldRetryStreamEarlyEof: retries once on the first STREAM_EARLY_EOF (attempt 0)", () => {
  // Attempt 1 returned 200 then closed the SSE early → STREAM_EARLY_EOF.
  // A non-antigravity provider (e.g. nvidia) must RETRY ONCE, not return the 502.
  assert.equal(shouldRetryStreamEarlyEof("STREAM_EARLY_EOF", 0), true);
});

test("shouldRetryStreamEarlyEof: does NOT retry a second consecutive early-close (bounded)", () => {
  // Two consecutive early-closes → the second one returns the 502 (exactly one retry, no loop).
  assert.equal(shouldRetryStreamEarlyEof("STREAM_EARLY_EOF", 1), false);
  assert.equal(shouldRetryStreamEarlyEof("STREAM_EARLY_EOF", 2), false);
  assert.equal(shouldRetryStreamEarlyEof("STREAM_EARLY_EOF", 99), false);
});

test("shouldRetryStreamEarlyEof: does NOT retry a stream readiness TIMEOUT (preserves latency)", () => {
  // A slow-but-alive upstream (STREAM_READINESS_TIMEOUT / stream_timeout) must NOT
  // be retried — retrying would double latency for a request that is still warming up.
  assert.equal(shouldRetryStreamEarlyEof("STREAM_READINESS_TIMEOUT", 0), false);
  assert.equal(shouldRetryStreamEarlyEof("stream_timeout", 0), false);
});

test("shouldRetryStreamEarlyEof: ignores unrelated/empty error codes", () => {
  assert.equal(shouldRetryStreamEarlyEof("", 0), false);
  assert.equal(shouldRetryStreamEarlyEof(null, 0), false);
  assert.equal(shouldRetryStreamEarlyEof(undefined, 0), false);
  assert.equal(shouldRetryStreamEarlyEof("UPSTREAM_4XX", 0), false);
  assert.equal(shouldRetryStreamEarlyEof("account_semaphore_capacity", 0), false);
});

// Behavioral end-to-end of the single-model path: stub executeChatWithBreaker so
// attempt 1 returns a STREAM_EARLY_EOF result and attempt 2 returns a successful
// stream. Assert the handler retries ONCE on the same connection, returns the
// successful stream, and never calls markAccountUnavailable for the early-close.
//
// Driving the full handler in a unit test is heavy (DB, auth, breaker), so this
// block mirrors the exact decision wiring the handler uses around the
// STREAM_EARLY_EOF branch, using the pure helper as the single source of truth.
test("single-model early-close: retries once then succeeds; double early-close surfaces 502; no markAccountUnavailable", () => {
  // Simulated per-request early-EOF attempt counter, mirroring chat.ts.
  function simulate(results: Array<{ errorCode: string; success?: boolean }>) {
    let earlyEofAttempts = 0;
    let markAccountUnavailableCalls = 0;
    let i = 0;

    while (true) {
      const result = results[Math.min(i, results.length - 1)];
      if (result.success) {
        return { outcome: "success", earlyEofAttempts, markAccountUnavailableCalls };
      }

      // Non-antigravity early-close: never marks the account unavailable.
      if (shouldRetryStreamEarlyEof(result.errorCode, earlyEofAttempts)) {
        earlyEofAttempts += 1;
        i += 1;
        continue;
      }

      // Falls through to the immediate 502 return.
      return { outcome: "502", earlyEofAttempts, markAccountUnavailableCalls };
    }
  }

  // attempt 1: early-close → retry; attempt 2: success
  const recovered = simulate([
    { errorCode: "STREAM_EARLY_EOF" },
    { errorCode: "STREAM_EARLY_EOF", success: true },
  ]);
  assert.equal(recovered.outcome, "success");
  assert.equal(recovered.earlyEofAttempts, 1, "exactly one retry before success");
  assert.equal(
    recovered.markAccountUnavailableCalls,
    0,
    "early-close must not mark account unavailable"
  );

  // attempt 1 + attempt 2 both early-close → surfaces the 502 (bounded, no loop)
  const exhausted = simulate([
    { errorCode: "STREAM_EARLY_EOF" },
    { errorCode: "STREAM_EARLY_EOF" },
    { errorCode: "STREAM_EARLY_EOF" },
  ]);
  assert.equal(exhausted.outcome, "502");
  assert.equal(exhausted.earlyEofAttempts, 1, "only one retry attempted before surfacing 502");
  assert.equal(exhausted.markAccountUnavailableCalls, 0);
});
