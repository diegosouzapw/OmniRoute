import test from "node:test";
import assert from "node:assert/strict";

const { StreamTracker, STREAM_STATES } = await import("../../src/sse/services/streamState.ts");

// A stream can fail during setup — before it ever reaches CONNECTING (e.g. credential
// selection throws). fail() must record that as FAILED, not leave the tracker stuck in
// INITIALIZED with an error set (an inconsistent record that archiveStream then persists).
test("StreamTracker: fail() from INITIALIZED records FAILED (setup-time failure)", () => {
  const t = new StreamTracker("req-setup-fail");
  assert.equal(t.state, STREAM_STATES.INITIALIZED);

  t.fail(new Error("credential setup failed"));

  assert.equal(t.state, STREAM_STATES.FAILED, "a setup-time failure must be recorded as FAILED");
  assert.equal(t.error, "credential setup failed");
  assert.equal(t.isTerminal(), true, "a failed stream is terminal");
});
