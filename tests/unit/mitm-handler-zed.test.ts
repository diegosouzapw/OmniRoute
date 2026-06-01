import test from "node:test";
import assert from "node:assert/strict";
import { ZedHandler } from "../../src/mitm/handlers/zed.ts";
import { runHandler } from "./_mitmHandlerHarness.ts";

test("zed handler — happy path forwards Chat Completions payload", async () => {
  const r = await runHandler(
    new ZedHandler(),
    { model: "gpt-4o", messages: [] },
    "claude-3.5-sonnet"
  );
  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  const sent = JSON.parse(r.fetchBody);
  assert.equal(sent.model, "claude-3.5-sonnet");
});
