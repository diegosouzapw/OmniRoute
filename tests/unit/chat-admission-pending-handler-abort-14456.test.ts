/**
 * Repro for #14456: an admission lease is NOT released when the client aborts
 * WHILE the handler promise passed to `releaseChatAdmissionAfterHandler` is
 * still pending. The abort-aware wrapper (`releaseChatAdmissionWhenDone`) is
 * only installed AFTER `await responsePromise` resolves, so an abort signal
 * fired during that pending phase has nothing listening to it yet.
 *
 * PR #14457 fixed the case where an SSE `Response` already exists and the
 * client then disconnects (covered by chat-admission-abandoned-stream-lease
 * .test.ts). It did not touch the pending-handler phase, which is what this
 * test isolates: the handler (e.g. an in-flight upstream LLM call) has not
 * resolved to a Response yet when the request aborts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  ChatAdmissionController,
  releaseChatAdmissionAfterHandler,
} from "../../src/shared/middleware/chatBodyAdmission.ts";

test("a request that aborts while the handler is still pending must release the lease promptly, not only after the handler eventually settles", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease, "precondition: a slot is available");
  assert.equal(controller.activeHeavy, 1);

  const abort = new AbortController();

  let resolveHandler!: (value: Response) => void;
  const handlerPromise = new Promise<Response>((resolve) => {
    resolveHandler = resolve;
  });

  const released = releaseChatAdmissionAfterHandler(handlerPromise, lease, {
    signal: abort.signal,
  });

  abort.abort();
  await new Promise((resolve) => setTimeout(resolve, 10));

  assert.equal(
    controller.activeHeavy,
    0,
    "an aborted client must not hold a heavyweight slot while the handler is still pending"
  );

  resolveHandler(
    new Response(null, { status: 504, headers: { "content-type": "application/json" } })
  );
  await released;
});

test("a handler that resolves normally without aborting releases exactly once and detaches its abort listener", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);

  const abort = new AbortController();
  const response = new Response(null, { status: 200 });

  const result = await releaseChatAdmissionAfterHandler(Promise.resolve(response), lease, {
    signal: abort.signal,
  });

  assert.equal(controller.activeHeavy, 0, "lease must be released on normal completion");
  assert.equal(result.status, 200);

  // Aborting after normal completion must not throw or double-release.
  assert.doesNotThrow(() => abort.abort());
});

test("an already-aborted signal before releaseChatAdmissionAfterHandler is called releases immediately", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);

  const abort = new AbortController();
  abort.abort();

  let resolveHandler!: (value: Response) => void;
  const handlerPromise = new Promise<Response>((resolve) => {
    resolveHandler = resolve;
  });

  const released = releaseChatAdmissionAfterHandler(handlerPromise, lease, {
    signal: abort.signal,
  });

  await new Promise((resolve) => setTimeout(resolve, 10));

  assert.equal(controller.activeHeavy, 0, "already-aborted signal must release immediately");

  resolveHandler(new Response(null, { status: 504 }));
  await released;
});
