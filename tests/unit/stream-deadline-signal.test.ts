import test from "node:test";
import assert from "node:assert/strict";

import { createStreamDeadlineSignal } from "../../open-sse/utils/streamDeadlineSignal.ts";

test("stream deadline signal follows client disconnects", () => {
  const client = new AbortController();
  const { signal, deadlineController } = createStreamDeadlineSignal(client.signal);

  assert.equal(signal.aborted, false);
  assert.equal(deadlineController.signal.aborted, false);

  client.abort(new Error("client disconnected"));

  assert.equal(signal.aborted, true);
  assert.equal(deadlineController.signal.aborted, false);
});

test("stream deadline signal follows the route-owned deadline controller", () => {
  const client = new AbortController();
  const { signal, deadlineController } = createStreamDeadlineSignal(client.signal);

  deadlineController.abort(new Error("stream deadline"));

  assert.equal(signal.aborted, true);
  assert.equal(client.signal.aborted, false);
});

test("stream deadline creation does not require or rebuild a Request", () => {
  const { signal, deadlineController } = createStreamDeadlineSignal();

  assert.equal(signal, deadlineController.signal);
  assert.equal(signal.aborted, false);
});
