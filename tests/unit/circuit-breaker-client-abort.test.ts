/**
 * Client-side aborts must not cool down provider accounts or trip the breaker.
 *
 * When the caller drops the connection mid-stream (combo race loser, model
 * switch in the client, tab close), the in-flight leg surfaces
 * `request_signal_aborted` / `Client disconnected: ...` / DOM `AbortError`
 * with no upstream status. Counting those as provider failures cascades one
 * user action into provider cooldowns (`lastErrorCode=null`,
 * `lastError=undefined` in the "all accounts cooling down" log) and can
 * dead-end a combo on its last-resort target. Extends the #4602 local
 * stream-lifecycle policy to client aborts.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CircuitBreaker,
  isLocalStreamLifecycleError,
} from "../../src/shared/utils/circuitBreaker.ts";

const uniqueName = (suffix: string) =>
  `cb-test-client-abort-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test("client-abort shapes are local lifecycle errors", () => {
  // streamHandler's default client-abort reason
  assert.equal(isLocalStreamLifecycleError("request_signal_aborted"), true);
  assert.equal(isLocalStreamLifecycleError(new Error("request_signal_aborted")), true);
  // chatCore's client-disconnect failure message
  assert.equal(
    isLocalStreamLifecycleError(new Error("Client disconnected: request_signal_aborted")),
    true
  );
  assert.equal(isLocalStreamLifecycleError({ message: "Client disconnected: model_switch" }), true);
  // DOM AbortError (fetch aborted via AbortSignal)
  const abortError = new Error("This operation was aborted");
  abortError.name = "AbortError";
  assert.equal(isLocalStreamLifecycleError(abortError), true);
  // AbortError recognized by name even with a nonstandard message
  const bareAbort = new Error("aborted");
  bareAbort.name = "AbortError";
  assert.equal(isLocalStreamLifecycleError(bareAbort), true);
});

test("genuine upstream failures still count as failures", () => {
  assert.equal(isLocalStreamLifecycleError(new Error("502 Bad Gateway")), false);
  assert.equal(isLocalStreamLifecycleError(new Error("upstream timed out")), false);
  assert.equal(isLocalStreamLifecycleError(new Error("429 rate limited")), false);
  assert.equal(
    isLocalStreamLifecycleError(new Error("401 authentication_error: invalid x-api-key")),
    false
  );
  assert.equal(isLocalStreamLifecycleError(undefined), false);
  assert.equal(isLocalStreamLifecycleError(null), false);
  assert.equal(isLocalStreamLifecycleError(""), false);
});

test("breaker stays CLOSED across repeated client aborts", async () => {
  const cb = new CircuitBreaker(uniqueName("aborts"), {
    failureThreshold: 3,
    resetTimeout: 30_000,
    isFailure: (e) => !isLocalStreamLifecycleError(e),
  });

  for (let i = 0; i < 5; i++) {
    await assert.rejects(
      cb.execute(async () => {
        throw new Error("Client disconnected: request_signal_aborted");
      }),
      /request_signal_aborted/
    );
  }

  assert.equal(cb.state, "CLOSED");
  assert.equal(cb.failureCount, 0);
  cb.reset();
});
