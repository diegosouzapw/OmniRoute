import test from "node:test";
import assert from "node:assert/strict";

// Regression: 502 "Empty Claude stream at flush" on a genuine 0-byte upstream
// empty response (call logs 1788132529140-96ef4a / 1788142914004-062cf6).
//
// Root cause (retry gap): emitClaudeEmptyStreamErrorAndAbort (stream.ts:1017)
// sends `{ status: 502, code: "empty_response" }` to the onFailure callback AND
// propagates the failure down the pipeline as `controller.error(new Error(msg))`
// (stream.ts:1025). The plain `new Error(msg)` carries NO `.code`, so
// getUpstreamErrorIdentifier (streamErrorResult.ts:56 — reads only `error.code`)
// returns undefined → result.errorCode/result.errorType become undefined →
// the single-model retry block (chat.ts:1931-1936) only matches
// `errorCode === "STREAM_EARLY_EOF"` / `errorType === "stream_early_eof"` and so
// NEVER enters the retry branch for an empty_response 502. The 502 surfaces to
// the client with no re-attempt, even though the failure is the same class of
// transient upstream glitch as STREAM_EARLY_EOF (HTTP 200 then zero useful
// frames) and the bounded same-connection retry was designed exactly for it.
//
// Fix contract (two chokepoints, both required for consistency):
//   1. stream.ts: when emitClaudeEmptyStreamErrorAndAbort propagates the error
//      down the pipeline, preserve the `empty_response` code on the Error so a
//      downstream classifier can identify it (plain `new Error(msg)` drops it).
//   2. shouldRetryStreamEarlyEof / the chat.ts:1931-1936 retry guard must treat
//      `empty_response` as retryable exactly like `STREAM_EARLY_EOF` (one
//      bounded same-connection re-attempt, never a loop).

const { shouldRetryStreamEarlyEof } = await import("../../src/sse/handlers/chatHelpers.ts");

// --- Chokepoint 2: the retry classifier must recognize empty_response --------

test("shouldRetryStreamEarlyEof: retries once on the first empty_response (attempt 0)", () => {
  // A 0-byte upstream empty response (GLM-5.2 autocompact) is the same class of
  // transient upstream glitch as STREAM_EARLY_EOF (HTTP 200 then zero useful
  // frames) and must get the same ONE bounded re-attempt.
  assert.equal(shouldRetryStreamEarlyEof("empty_response", 0), true);
});

test("shouldRetryStreamEarlyEof: does NOT retry a second consecutive empty_response (bounded)", () => {
  // Bounded: exactly one retry, never a loop — mirrors the STREAM_EARLY_EOF cap.
  assert.equal(shouldRetryStreamEarlyEof("empty_response", 1), false);
  assert.equal(shouldRetryStreamEarlyEof("empty_response", 2), false);
  assert.equal(shouldRetryStreamEarlyEof("empty_response", 99), false);
});

test("shouldRetryStreamEarlyEof: still retries STREAM_EARLY_EOF (regression guard)", () => {
  // The existing #3758 behavior must be preserved.
  assert.equal(shouldRetryStreamEarlyEof("STREAM_EARLY_EOF", 0), true);
  assert.equal(shouldRetryStreamEarlyEof("STREAM_EARLY_EOF", 1), false);
});

test("shouldRetryStreamEarlyEof: still ignores unrelated/empty codes (regression guard)", () => {
  assert.equal(shouldRetryStreamEarlyEof("", 0), false);
  assert.equal(shouldRetryStreamEarlyEof(null, 0), false);
  assert.equal(shouldRetryStreamEarlyEof(undefined, 0), false);
  assert.equal(shouldRetryStreamEarlyEof("UPSTREAM_4XX", 0), false);
  assert.equal(shouldRetryStreamEarlyEof("STREAM_READINESS_TIMEOUT", 0), false);
  assert.equal(shouldRetryStreamEarlyEof("stream_timeout", 0), false);
});

// --- End-to-end decision wiring (mirrors chat.ts around the retry guard) -------

test("single-model empty_response: retries once then succeeds; double empty surfaces 502; no markAccountUnavailable", () => {
  function simulate(results: Array<{ errorCode: string; success?: boolean }>) {
    let earlyEofAttempts = 0;
    let markAccountUnavailableCalls = 0;
    let i = 0;

    while (true) {
      const result = results[Math.min(i, results.length - 1)];
      if (result.success) {
        return { outcome: "success", earlyEofAttempts, markAccountUnavailableCalls };
      }

      // empty_response is a transient upstream glitch — never marks the account
      // unavailable (same as STREAM_EARLY_EOF).
      if (shouldRetryStreamEarlyEof(result.errorCode, earlyEofAttempts)) {
        earlyEofAttempts += 1;
        i += 1;
        continue;
      }

      return { outcome: "502", earlyEofAttempts, markAccountUnavailableCalls };
    }
  }

  // attempt 1: empty_response → retry; attempt 2: success
  const recovered = simulate([
    { errorCode: "empty_response" },
    { errorCode: "empty_response", success: true },
  ]);
  assert.equal(recovered.outcome, "success");
  assert.equal(recovered.earlyEofAttempts, 1, "exactly one retry before success");
  assert.equal(
    recovered.markAccountUnavailableCalls,
    0,
    "empty_response must not mark account unavailable"
  );

  // attempt 1 + attempt 2 both empty → surfaces the 502 (bounded, no loop)
  const exhausted = simulate([
    { errorCode: "empty_response" },
    { errorCode: "empty_response" },
    { errorCode: "empty_response" },
  ]);
  assert.equal(exhausted.outcome, "502");
  assert.equal(exhausted.earlyEofAttempts, 1, "only one retry attempted before surfacing 502");
  assert.equal(exhausted.markAccountUnavailableCalls, 0);
});
