import test from "node:test";
import assert from "node:assert/strict";
import v8 from "node:v8";
import vm from "node:vm";

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

// Regression: `AbortSignal.any()` composites are pinned in Node's module-level
// `gcPersistentSignals` set while they carry an abort listener and their sources are
// alive. Downstream listeners (stream controller onDisconnect, executor merges) capture
// the request — and through it the client signal — so a request that completes without
// aborting kept its whole wire body reachable forever (~700MB/h on a busy instance).
test("stream deadline signal does not pin a completed request in memory", async () => {
  // The unit runner does not pass --expose-gc; enable it for this check only.
  v8.setFlagsFromString("--expose-gc");
  const gc = vm.runInNewContext("gc") as () => void;
  let collected = 0;
  const registry = new FinalizationRegistry(() => {
    collected += 1;
  });
  const REQUESTS = 50;
  for (let i = 0; i < REQUESTS; i += 1) {
    (() => {
      const client = new AbortController();
      const request = { signal: client.signal, body: "x".repeat(10_000) };
      const { signal } = createStreamDeadlineSignal(request.signal);
      // A downstream listener that closes over the request, exactly like the
      // chat pipeline's disconnect/merge listeners do; never removed, never fired.
      signal.addEventListener("abort", () => request.body.length, { once: true });
      registry.register(request, i);
    })();
  }
  for (let i = 0; i < 20 && collected < REQUESTS; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 10));
    gc();
  }
  assert.equal(collected, REQUESTS);
});

test("stream deadline creation does not require or rebuild a Request", () => {
  const { signal, deadlineController } = createStreamDeadlineSignal();

  assert.equal(signal, deadlineController.signal);
  assert.equal(signal.aborted, false);
});
