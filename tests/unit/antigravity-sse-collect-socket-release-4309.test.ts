import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

// Regression guard for #4309 (thanks @Ardem2025 / Dmitry Kuznetsov): when the upstream
// SSE collection aborts or errors, AntigravityExecutor.collectStreamToResponse must
// release the stream reader AND cancel the response body — otherwise the underlying
// socket stays checked out of the Undici agent pool (a slow socket/memory leak under
// abort-heavy load). Previously the catch block just fell through ("return whatever was
// collected"), leaving the body uncancelled and the reader locked.
//
// We drive the error path deterministically with a pre-aborted signal (the first loop
// iteration throws "Request aborted during SSE collection" before any read), then assert
// the reader was released and the body cancelled exactly as the fix does.
test("collectStreamToResponse releases the reader and cancels the body on abort (Undici socket leak #4309)", async () => {
  const executor = new AntigravityExecutor();

  let releaseLockCalls = 0;
  let cancelCalls = 0;

  const fakeReader = {
    // Never resolves — with a pre-aborted signal the loop throws before ever reading,
    // so read() must not be needed to reach the cleanup path.
    read: () => new Promise<never>(() => {}),
    releaseLock: () => {
      releaseLockCalls += 1;
    },
  };

  const fakeBody = {
    getReader: () => fakeReader,
    cancel: () => {
      cancelCalls += 1;
      return Promise.resolve();
    },
  };

  const response = { body: fakeBody } as unknown as Response;

  const controller = new AbortController();
  controller.abort(); // pre-aborted → the collect loop throws on its first guard check

  await executor.collectStreamToResponse(
    response,
    "antigravity-model",
    "https://example.invalid/sse",
    {},
    {},
    null,
    controller.signal
  );

  assert.ok(
    releaseLockCalls >= 1,
    "reader.releaseLock() must be called on the abort/error path (was never released before the fix)"
  );
  assert.equal(
    cancelCalls,
    1,
    "response.body.cancel() must be called exactly once to return the socket to the Undici pool"
  );
});
