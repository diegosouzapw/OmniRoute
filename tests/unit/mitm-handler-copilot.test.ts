import test from "node:test";
import assert from "node:assert/strict";
import { CopilotHandler } from "../../src/mitm/handlers/copilot.ts";
import { runHandler } from "./_mitmHandlerHarness.ts";

test("copilot handler — rewrites model and forwards to /v1/chat/completions", async () => {
  const r = await runHandler(
    new CopilotHandler(),
    { model: "gpt-4o", messages: [] },
    "claude-3.5-sonnet"
  );
  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  assert.ok(r.fetchUrl?.endsWith("/v1/chat/completions"));
  const sent = JSON.parse(r.fetchBody);
  assert.equal(sent.model, "claude-3.5-sonnet");
  // AgentBridge correlation headers must be present.
  const headers = r.fetchHeaders as Record<string, string>;
  assert.equal(headers["x-omniroute-source"], "agent-bridge");
  assert.equal(headers["x-omniroute-agent"], "copilot");
});
