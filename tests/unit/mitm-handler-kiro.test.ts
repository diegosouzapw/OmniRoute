import test from "node:test";
import assert from "node:assert/strict";
import { KiroHandler } from "../../src/mitm/handlers/kiro.ts";
import { runHandler } from "./_mitmHandlerHarness.ts";

test("kiro handler — forwards Anthropic-style body to OmniRoute /v1/messages", async () => {
  const r = await runHandler(
    new KiroHandler(),
    { model: "claude-3.5-sonnet", messages: [{ role: "user", content: "hi" }] },
    "claude-sonnet-4.5",
    { upstreamBody: "event: message_start\n\n" }
  );
  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  // Router URL must point at /v1/messages for the Anthropic path.
  assert.ok(r.fetchUrl?.endsWith("/v1/messages"));
  // Body must have been rewritten with mapped model.
  const sent = JSON.parse(r.fetchBody);
  assert.equal(sent.model, "claude-sonnet-4.5");
});
