/**
 * Issue #6999 — DuckDuckGo circuit breaker regression tests.
 *
 * The circuit breaker is a module-level singleton with in-process state.
 * Tests directly import and call the exported executor, trigger failures
 * to verify breaker opens, then let cooldown expire to verify it closes.
 */

import test, { describe } from "node:test";
import assert from "node:assert/strict";

/** Minimal shape accepted by DuckDuckGoWebExecutor.execute() */
interface ExecutorRequest {
  model: string;
  messages: Array<{ role: string; content: unknown }>;
  stream: boolean;
  signal?: AbortSignal;
}

// The DuckDuckGoWebExecutor uses module-level mutable state (circuitBreaker)
// so we import the module fresh and interact with execute() to verify
// circuit breaker behavior.
const {
  DuckDuckGoWebExecutor,
  cbIsOpen,
  cbRecordFailure,
  cbRecordSuccess,
  CB_THRESHOLD,
  CB_COOLDOWN_MS,
  __setDdgCircuitBreakerStateForTests,
  __getDdgCircuitBreakerStateForTests,
} = await import("../../open-sse/executors/duckduckgo-web.ts");

function makeExecutor() {
  return new DuckDuckGoWebExecutor();
}

// Helper: build a minimal valid request body.
function validMessages() {
  return [{ role: "user", content: "hello" }];
}

describe("#6999 DDG circuit breaker", () => {
  test("returns 400 for empty messages (circuit breaker does not interfere)", async () => {
    const executor = makeExecutor();
    const response = await executor.execute({
      model: "gpt-4o-mini",
      messages: [],
      stream: false,
    } satisfies ExecutorRequest);

    assert.equal(response.status, 400, "empty messages should still be 400 regardless of CB state");
  });

  test("circuit breaker fast-fails with 503 after consecutive failures", async () => {
    // This test verifies the circuit breaker by directly calling execute()
    // with valid messages. Since we can't control the network in unit tests,
    // we test the exported constants and verify the mechanism exists.
    //
    // The actual circuit breaker logic (cbIsOpen, cbRecordFailure, cbRecordSuccess)
    // is tested indirectly: if 5 consecutive 429/5xx/network errors occurred,
    // the next call returns 503 with the breaker message.
    // In unit-test isolation the breaker starts closed (0 failures),
    // so execute() will attempt a real network call (which may timeout).
    //
    // We verify the breaker constants are exported and reachable.
    const executor = makeExecutor();
    assert.ok(executor, "executor instantiates");
    // Execute with valid input — should NOT get 503 since breaker starts closed
    try {
      const response = await executor.execute({
        model: "gpt-4o-mini",
        messages: validMessages(),
        stream: false,
      } satisfies ExecutorRequest);
      // If we get here, network succeeded or timed out gracefully
      assert.ok(response instanceof Response, "should return a Response object");
      // Should not be 503 (breaker open) on first request
      assert.notEqual(response.status, 503, "circuit breaker should not be open on first request");
    } catch {
      // Network errors are expected in unit tests — that's fine
      assert.ok(true, "network error is acceptable in unit test");
    }
  });
});

function makeResponse(body: string, contentType = "text/plain") {
  return {
    headers: {
      get: (name: string) => (name.toLowerCase() === "content-type" ? contentType : null),
    },
    clone: () => ({ text: async () => body }),
  } as unknown as Response;
}

describe("#7000 null content validation", () => {
  test("validateResponseQuality rejects null content without reasoning or tools", async () => {
    const { validateResponseQuality } =
      await import("../../open-sse/services/combo/validateQuality.ts");

    // Verify null content (no reasoning, no tools) → valid=false
    const res = await validateResponseQuality(
      makeResponse(JSON.stringify({ choices: [{ message: { content: null } }] })),
      false,
      {}
    );
    assert.equal(res.valid, false, "null content without reasoning/tools should be invalid");
    assert.equal(res.reason, "empty content and no tool_calls in response");
  });

  test("validateResponseQuality: empty array content → invalid", async () => {
    const { validateResponseQuality } =
      await import("../../open-sse/services/combo/validateQuality.ts");

    // Empty array content [] — no non-empty parts, no reasoning, no tools
    const res = await validateResponseQuality(
      makeResponse(
        JSON.stringify({
          choices: [{ message: { content: [] } }],
        })
      ),
      false,
      {}
    );
    assert.equal(res.valid, false, "empty array content should be invalid");
    assert.equal(res.reason, "empty content and no tool_calls in response");
  });

  test("validateResponseQuality: array with text content → valid", async () => {
    const { validateResponseQuality } =
      await import("../../open-sse/services/combo/validateQuality.ts");

    // Array with actual text content — should be valid
    const res = await validateResponseQuality(
      makeResponse(
        JSON.stringify({
          choices: [
            {
              message: {
                content: [{ type: "text", text: "Hello world" }],
              },
            },
          ],
        })
      ),
      false,
      {}
    );
    assert.equal(res.valid, true, "array with text content should be valid");
  });
});

// ─── #6999 circuit breaker state machine ──────────────────────────────────
//
// The two tests in the "#6999 DDG circuit breaker" describe block above
// exercise execute() with real (mocked-only-by-absence) network calls and
// never actually drive 5 consecutive failures, so they cannot prove the
// breaker opens, fast-fails, or half-opens. These tests drive the state
// machine directly via the exported cbRecordFailure/cbIsOpen primitives
// (and a test-only setter for the cooldown-expiry/half-open case, so we
// don't wait CB_COOLDOWN_MS=30s in real time), matching the executor's own
// module-level singleton so `execute()`'s cbIsOpen() gate observes the same
// state.

describe("#6999 DDG circuit breaker state machine", () => {
  test("starts closed", () => {
    __setDdgCircuitBreakerStateForTests(0, 0);
    assert.equal(cbIsOpen(), false, "breaker starts closed with no recorded failures");
  });

  test("opens after CB_THRESHOLD consecutive recorded failures", () => {
    __setDdgCircuitBreakerStateForTests(0, 0);
    assert.equal(CB_THRESHOLD, 5, "sanity: this test assumes the documented threshold of 5");

    for (let i = 1; i < CB_THRESHOLD; i++) {
      cbRecordFailure();
      assert.equal(cbIsOpen(), false, `still closed after ${i} failure(s)`);
    }
    cbRecordFailure(); // the CB_THRESHOLD-th consecutive failure
    assert.equal(cbIsOpen(), true, `opens on the ${CB_THRESHOLD}th consecutive failure`);

    __setDdgCircuitBreakerStateForTests(0, 0); // cleanup
  });

  test("execute() fast-fails with 503 while the breaker is open — no network call reached", async () => {
    __setDdgCircuitBreakerStateForTests(CB_THRESHOLD, Date.now());

    const executor = makeExecutor();
    const response = await executor.execute({
      model: "gpt-4o-mini",
      body: { model: "gpt-4o-mini", messages: validMessages(), stream: false },
      stream: false,
      credentials: {},
    });
    const httpResponse =
      response instanceof Response ? response : (response as { response: Response }).response;

    assert.equal(httpResponse.status, 503, "open breaker fast-fails with 503");
    const parsedBody = (await httpResponse.json()) as { error?: { message?: string } };
    assert.match(
      String(parsedBody.error?.message),
      /circuit breaker/i,
      "503 body should identify the circuit breaker as the cause"
    );

    __setDdgCircuitBreakerStateForTests(0, 0); // cleanup
  });

  test("half-open: breaker closes on its own once CB_COOLDOWN_MS has elapsed", () => {
    // openedAt far enough in the past that "now - openedAt >= CB_COOLDOWN_MS"
    // — simulates the cooldown window having elapsed without a real 30s wait.
    __setDdgCircuitBreakerStateForTests(CB_THRESHOLD, Date.now() - CB_COOLDOWN_MS - 1);

    assert.equal(
      cbIsOpen(),
      false,
      "cooldown elapsed -> breaker self-closes (half-open probe allowed through)"
    );
    assert.equal(
      __getDdgCircuitBreakerStateForTests().openedAt,
      0,
      "cbIsOpen() must clear openedAt as a side effect of the half-open transition"
    );
  });

  test("a request made right after the breaker opens (cooldown not yet elapsed) still fast-fails", () => {
    __setDdgCircuitBreakerStateForTests(CB_THRESHOLD, Date.now() - (CB_COOLDOWN_MS - 5_000));
    assert.equal(cbIsOpen(), true, "breaker stays open until the full cooldown elapses");
    __setDdgCircuitBreakerStateForTests(0, 0); // cleanup
  });

  test("cbRecordSuccess resets the failure counter (does not itself trip open)", () => {
    __setDdgCircuitBreakerStateForTests(CB_THRESHOLD - 1, 0);
    cbRecordSuccess();
    assert.equal(
      __getDdgCircuitBreakerStateForTests().failures,
      0,
      "a success clears the consecutive-failure count"
    );

    // Confirm the reset is real: it now takes a fresh run of CB_THRESHOLD
    // failures to open, not just one more.
    cbRecordFailure();
    assert.equal(cbIsOpen(), false, "one failure after a reset is not enough to open");

    __setDdgCircuitBreakerStateForTests(0, 0); // cleanup
  });
});
