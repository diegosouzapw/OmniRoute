import test from "node:test";
import assert from "node:assert/strict";
import { CursorHandler } from "../../src/mitm/handlers/cursor.ts";
import { runHandler } from "./_mitmHandlerHarness.ts";

test("cursor handler — happy path forwards mapped model", async () => {
  const r = await runHandler(
    new CursorHandler(),
    { model: "claude-sonnet-4.5", messages: [] },
    "gpt-4o"
  );
  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  const sent = JSON.parse(r.fetchBody);
  assert.equal(sent.model, "gpt-4o");
});
