import test from "node:test";
import assert from "node:assert/strict";

import { createStreamController } from "../../../open-sse/utils/streamHandler.ts";

test("createStreamController records deadline abort signals as 504 errors, not 499 disconnects", async () => {
  const clientAbortController = new AbortController();
  let disconnectEvent = null;
  let errorEvent = null;
  const controller = createStreamController({
    clientAbortSignal: clientAbortController.signal,
    onDisconnect(event) {
      disconnectEvent = event;
    },
    onError(event) {
      errorEvent = event;
      return true;
    },
  });
  const timeoutError = new Error("Model test deadline exceeded after 60000ms");
  timeoutError.name = "TimeoutError";

  clientAbortController.abort(timeoutError);
  await Promise.resolve();

  assert.equal(disconnectEvent, null);
  assert.equal(errorEvent?.statusCode, 504);
  assert.equal(errorEvent?.message, "Model test deadline exceeded after 60000ms");
  assert.equal(controller.signal.aborted, true);
});
