/**
 * Regression: a heavyweight admission lease must not leak when the client goes
 * away without draining or cancelling the SSE body.
 *
 * `releaseChatAdmissionWhenDone` wires release into three places on the wrapped
 * stream: `pull` reaching `done`, `pull` throwing, and `cancel`. All three are
 * driven by the *consumer*. When a client disconnects mid-stream, the runtime
 * may stop pulling and never call `cancel`, so none of the three fire and the
 * slot is held for the lifetime of the process.
 *
 * These tests assert the invariant (the slot is returned once the request is
 * aborted) rather than any particular release mechanism.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  ChatAdmissionController,
  releaseChatAdmissionWhenDone,
} from "../../src/shared/middleware/chatBodyAdmission.ts";

/** An SSE body that stays open, like a real upstream mid-generation. */
function openSseResponse(signal?: AbortSignal): Response {
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("data: first\n\n"));
      // Intentionally left open: upstream is still generating.
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
    ...(signal ? {} : {}),
  });
}

test("abandoned SSE stream returns the heavyweight slot once the request aborts", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease, "precondition: a slot is available");
  assert.equal(controller.activeHeavy, 1);

  const abort = new AbortController();
  const wrapped = releaseChatAdmissionWhenDone(openSseResponse(), lease, {
    signal: abort.signal,
  });

  // The client reads one chunk, then vanishes: no further pull, no cancel.
  const reader = wrapped.body!.getReader();
  await reader.read();

  // The connection drops. Next.js aborts the request signal.
  abort.abort();
  await new Promise((resolve) => setTimeout(resolve, 10));

  assert.equal(
    controller.activeHeavy,
    0,
    "an aborted client must not hold a heavyweight slot forever"
  );
  assert.equal(lease.released, true);
});

test("an already-aborted request does not take a slot hostage", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);

  const abort = new AbortController();
  abort.abort();

  releaseChatAdmissionWhenDone(openSseResponse(), lease, { signal: abort.signal });
  await new Promise((resolve) => setTimeout(resolve, 10));

  assert.equal(controller.activeHeavy, 0);
});

test("normal completion still releases exactly once (no double release)", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);

  const finite = new Response(
    new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(new TextEncoder().encode("data: done\n\n"));
        c.close();
      },
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );

  const abort = new AbortController();
  const wrapped = releaseChatAdmissionWhenDone(finite, lease, { signal: abort.signal });
  const reader = wrapped.body!.getReader();
  while (!(await reader.read()).done) {
    /* drain */
  }

  assert.equal(controller.activeHeavy, 0);

  // A late abort after a clean finish must not double-decrement.
  abort.abort();
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(controller.activeHeavy, 0);
});

test("explicit cancel still releases the slot", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);

  const abort = new AbortController();
  const wrapped = releaseChatAdmissionWhenDone(openSseResponse(), lease, {
    signal: abort.signal,
  });
  const reader = wrapped.body!.getReader();
  await reader.read();
  await reader.cancel("client gone");

  assert.equal(controller.activeHeavy, 0);
});
