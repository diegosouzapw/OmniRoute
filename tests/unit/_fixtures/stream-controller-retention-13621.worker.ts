import assert from "node:assert/strict";
import { setImmediate as nextTurn } from "node:timers/promises";

assert.ok(process.env.DATA_DIR, "probe must receive an isolated DATA_DIR before imports");
assert.equal(typeof global.gc, "function", "probe requires --expose-gc");
const { createStreamController } = await import("../../../open-sse/utils/streamHandler.ts");

type Payload = { bodyString: string; input: { image_url: string }[] };
function capture(
  payload: Payload,
  calls: { disconnect: number; error: number; drain: number },
  handoff: boolean
) {
  const controller = createStreamController({
    allowCompletedToolHandoffGrace: handoff,
    clientDisconnectGracePeriodMs: handoff ? 1000 : 0,
    onDisconnect() {
      assert.ok(payload.bodyString.length > 0);
      calls.disconnect += 1;
    },
    onError() {
      assert.ok(payload.input[0].image_url.length > 0);
      calls.error += 1;
      return true;
    },
  });
  controller.registerCompletedToolHandoffDrain(() => {
    assert.ok(payload.bodyString.length > 0);
    calls.drain += 1;
  });
  return controller;
}

function prepare(mode: string) {
  const payload = {
    bodyString: "p".repeat(4 * 1024 * 1024),
    input: [{ image_url: `data:image/png;base64,${"a".repeat(1024 * 1024)}` }],
  };
  const ref = new WeakRef(payload);
  const calls = { disconnect: 0, error: 0, drain: 0 };
  const controller = capture(payload, calls, mode.startsWith("handoff"));
  if (mode === "complete") controller.handleComplete();
  if (mode === "disconnect") controller.handleDisconnect("fixture_cancel");
  if (mode === "error") controller.handleError(new Error("fixture_upstream_error"));
  if (mode === "abort") controller.abort();
  if (mode.startsWith("handoff")) {
    controller.markCompletedToolHandoffSeen();
    controller.handleDisconnect("completed_tool_handoff");
    if (mode === "handoff-complete") controller.handleComplete();
  }
  return { mode, ref, controller, calls };
}

const probes = [
  "active",
  "complete",
  "disconnect",
  "error",
  "abort",
  "handoff-draining",
  "handoff-complete",
].map(prepare);
// The controllers deliberately remain reachable, as a caller may retain a
// completed Response. Their callbacks no longer need the full request body.
for (let i = 0; i < 12; i += 1) {
  await nextTurn();
  global.gc!();
}
const results = probes.map(({ mode, ref, controller, calls }) => ({
  mode,
  retained: ref.deref() !== undefined,
  calls,
  connected: controller.isConnected(),
  draining: controller.shouldDeferCompletedToolHandoff(),
}));
console.log(`RETENTION_RESULT=${JSON.stringify(results)}`);
