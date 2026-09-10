import test from "node:test";
import assert from "node:assert/strict";
import {
  acquireTurnExecution,
  clearTurnExecutionsForTesting,
  createTurnInProgressResult,
  getTurnExecutionSnapshot,
} from "../../open-sse/handlers/chatCore/turnExecutionGuard.ts";

test.afterEach(() => {
  clearTurnExecutionsForTesting();
});

test("turn execution guard rejects a concurrent duplicate and reports its retry count", () => {
  const first = acquireTurnExecution("turn-guard-key");
  const duplicate = acquireTurnExecution("turn-guard-key");

  assert.equal(first.acquired, true);
  assert.equal(duplicate.acquired, false);
  assert.equal(duplicate.retryCount, 1);
  assert.deepEqual(getTurnExecutionSnapshot("turn-guard-key"), {
    retryCount: 1,
    ageMs: 0,
  });

  first.release();
  const next = acquireTurnExecution("turn-guard-key");
  assert.equal(next.acquired, true);
  next.release();
});

test("turn execution guard release is idempotent", () => {
  const first = acquireTurnExecution("turn-guard-release");
  assert.equal(first.acquired, true);

  first.release();
  first.release();

  const next = acquireTurnExecution("turn-guard-release");
  assert.equal(next.acquired, true);
  next.release();
});

test("turn execution guard bypasses missing idempotency keys", () => {
  const first = acquireTurnExecution(null);
  const second = acquireTurnExecution(null);

  assert.equal(first.acquired, true);
  assert.equal(second.acquired, true);
  first.release();
  second.release();
});

test("duplicate turn result uses a sanitized 409 body and retry headers", async () => {
  const duplicate = createTurnInProgressResult(3);

  assert.deepEqual(duplicate.body, {
    error: {
      message: "An identical request is already in progress",
      type: "turn_in_progress",
      code: "turn_in_progress",
      reason: undefined,
    },
  });
  assert.equal(duplicate.result.status, 409);
  assert.equal(duplicate.result.errorType, "turn_in_progress");
  assert.equal(duplicate.result.errorCode, "turn_in_progress");
  assert.equal(duplicate.result.response.headers.get("Retry-After"), "1");
  assert.equal(duplicate.result.response.headers.get("X-OmniRoute-Turn-Retry"), "3");
  assert.deepEqual(
    await duplicate.result.response.json(),
    JSON.parse(JSON.stringify(duplicate.body)),
  );
});
