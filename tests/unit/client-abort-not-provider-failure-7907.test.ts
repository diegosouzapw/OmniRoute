/**
 * #7907 — client-initiated aborts must not count as provider failures.
 *
 * When the caller drops the connection mid-stream (Claude Code cancels combo
 * race losers, model switches, tab close, user interrupt), the in-flight
 * upstream fetch rejects with the abort reason. Only `error.name ===
 * "AbortError"` shapes were recognized; a STRING abort reason (e.g. the
 * `"request_signal_aborted"` default from the stream controller, or
 * `"Client disconnected: client_closed"`) carries no `name` and no
 * `statusCode`, so it defaulted to HTTP 502 in the failure path — cooling
 * down the healthy serving connection (`markAccountUnavailable`) and
 * accruing whole-provider circuit-breaker failures. A client abort is a
 * client lifecycle event, not a provider fault.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CircuitBreaker,
  isClientAbortError,
  isLocalStreamLifecycleError,
} from "../../src/shared/utils/circuitBreaker.ts";

const uniqueName = (suffix: string) =>
  `cb-test-#7907-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test("#7907 isClientAbortError flags DOM AbortError shapes", () => {
  assert.equal(
    isClientAbortError(
      Object.assign(new Error("This operation was aborted"), { name: "AbortError" })
    ),
    true
  );
  // undici abort surfaced via error code instead of name
  assert.equal(isClientAbortError({ code: "UND_ERR_ABORTED", message: "Request aborted" }), true);
  assert.equal(
    isClientAbortError({ code: "ABORT_ERR", message: "The operation was aborted" }),
    true
  );
});

test("#7907 isClientAbortError flags string abort reasons propagated by abort(reason)", () => {
  // streamHandler's default abort reason — rejects the upstream fetch as a raw string
  assert.equal(isClientAbortError("request_signal_aborted"), true);
  assert.equal(isClientAbortError("The operation was aborted"), true);
  assert.equal(isClientAbortError(new Error("Client disconnected: client_closed")), true);
  assert.equal(isClientAbortError(new Error("request_signal_aborted")), true);
});

test("#7907 isClientAbortError never flags genuine upstream failures", () => {
  assert.equal(isClientAbortError(new Error("502 Bad Gateway")), false);
  assert.equal(isClientAbortError(new Error("upstream timed out")), false);
  // An error that carries a real upstream HTTP status is an upstream response,
  // not a local abort — even if its message mentions aborting.
  assert.equal(
    isClientAbortError(Object.assign(new Error("upstream aborted the operation"), { status: 502 })),
    false
  );
  assert.equal(isClientAbortError(undefined), false);
  assert.equal(isClientAbortError(null), false);
  assert.equal(isClientAbortError(""), false);
});

test("#7907 breaker stays CLOSED when only client aborts are thrown", async () => {
  const cb = new CircuitBreaker(uniqueName("client-abort"), {
    failureThreshold: 3,
    resetTimeout: 30_000,
    isFailure: (e) => !isLocalStreamLifecycleError(e) && !isClientAbortError(e),
  });

  for (let i = 0; i < 5; i++) {
    await assert.rejects(
      cb.execute(async () => {
        throw Object.assign(new Error("This operation was aborted"), { name: "AbortError" });
      }),
      /operation was aborted/
    );
    await assert.rejects(
      cb.execute(async () => {
        // string abort reason rejected as-is by fetch when abort(reason) is called
        throw "request_signal_aborted";
      })
    );
  }

  // 10 client aborts past a threshold of 3 — the provider breaker must NOT open.
  assert.equal(cb.state, "CLOSED");
  assert.equal(cb.failureCount, 0);
  cb.reset();
});

test("#7907 breaker still opens on genuine upstream failures with the combined predicate", async () => {
  const cb = new CircuitBreaker(uniqueName("real-failure"), {
    failureThreshold: 3,
    resetTimeout: 30_000,
    isFailure: (e) => !isLocalStreamLifecycleError(e) && !isClientAbortError(e),
  });

  for (let i = 0; i < 3; i++) {
    await assert.rejects(
      cb.execute(async () => {
        throw Object.assign(new Error("502 Bad Gateway"), { status: 502 });
      }),
      /502/
    );
  }

  assert.equal(cb.state, "OPEN");
  cb.reset();
});
