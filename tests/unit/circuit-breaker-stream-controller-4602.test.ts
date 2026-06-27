/**
 * #4602 — Codex WebSocket bridge failures must not trip the whole-provider
 * circuit breaker.
 *
 * When `codexTransport = websocket`, a `/v1/responses` request can fail in
 * ~300ms with a bare `Invalid state: Controller is already closed` throw (the
 * WS→SSE bridge enqueues after the response controller is closed). That error
 * carries no `statusCode`, so it defaults to HTTP 502, and 502 is a
 * provider-failure code — a burst trips the OAuth provider breaker (threshold
 * 3) and every subsequent Codex request fails with `503 ... circuit breaker is
 * open`, even on the healthy HTTP/SSE path. A local stream-lifecycle error is
 * NOT an upstream provider outage and must be excluded from the breaker.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CircuitBreaker,
  isLocalStreamLifecycleError,
} from "../../src/shared/utils/circuitBreaker.ts";

const uniqueName = (suffix: string) =>
  `cb-test-#4602-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test("#4602 isLocalStreamLifecycleError flags the WS controller-closed error and nothing else", () => {
  assert.equal(
    isLocalStreamLifecycleError(new Error("Invalid state: Controller is already closed")),
    true
  );
  assert.equal(
    isLocalStreamLifecycleError({ message: "Controller is already closed" }),
    true
  );
  // Real upstream failures must still count.
  assert.equal(isLocalStreamLifecycleError(new Error("502 Bad Gateway")), false);
  assert.equal(isLocalStreamLifecycleError(new Error("upstream timed out")), false);
  assert.equal(isLocalStreamLifecycleError(undefined), false);
  assert.equal(isLocalStreamLifecycleError(null), false);
});

test("#4602 breaker stays CLOSED when only the WS controller-closed error is thrown", async () => {
  const cb = new CircuitBreaker(uniqueName("ws-closed"), {
    failureThreshold: 3,
    resetTimeout: 30_000,
    isFailure: (e) => !isLocalStreamLifecycleError(e),
  });

  for (let i = 0; i < 5; i++) {
    await assert.rejects(
      cb.execute(async () => {
        throw new Error("Invalid state: Controller is already closed");
      }),
      /Controller is already closed/
    );
  }

  // 5 bridge errors past a threshold of 3 — the provider breaker must NOT open.
  assert.equal(cb.state, "CLOSED");
  assert.equal(cb.failureCount, 0);
  cb.reset();
});

test("#4602 a genuine upstream failure still trips the breaker with the same isFailure guard", async () => {
  const cb = new CircuitBreaker(uniqueName("real-failure"), {
    failureThreshold: 3,
    resetTimeout: 30_000,
    isFailure: (e) => !isLocalStreamLifecycleError(e),
  });

  for (let i = 0; i < 3; i++) {
    await assert.rejects(
      cb.execute(async () => {
        throw new Error("502 Bad Gateway from upstream");
      })
    );
  }

  assert.equal(cb.state, "OPEN");
  cb.reset();
});
