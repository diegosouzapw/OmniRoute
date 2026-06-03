import test from "node:test";
import assert from "node:assert/strict";
import { ClaudeCodeHandler } from "../../src/mitm/handlers/claudeCode.ts";
import { runHandler } from "./_mitmHandlerHarness.ts";

test("claude-code handler — happy path forwards to /v1/messages", async () => {
  const r = await runHandler(
    new ClaudeCodeHandler(),
    { model: "claude-3.5-sonnet", messages: [] },
    "claude-opus-4.5"
  );
  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  assert.ok(r.fetchUrl?.endsWith("/v1/messages"));
  const sent = JSON.parse(r.fetchBody);
  assert.equal(sent.model, "claude-opus-4.5");
});
