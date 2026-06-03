import test from "node:test";
import assert from "node:assert/strict";
import { AntigravityHandler } from "../../src/mitm/handlers/antigravity.ts";
import { runHandler } from "./_mitmHandlerHarness.ts";

test("antigravity handler — forwards to OmniRoute and pipes SSE", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] },
    "claude-3.5-sonnet",
    { upstreamBody: "data: hello\n\ndata: world\n\n" }
  );
  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  assert.ok(r.responseChunks.join("").includes("hello"));
});

test("antigravity handler — propagates upstream failure as 500", async () => {
  const r = await runHandler(
    new AntigravityHandler(),
    { model: "gpt-4o" },
    "claude-3.5-sonnet",
    { upstreamStatus: 500, upstreamBody: "boom" }
  );
  assert.equal(r.status, 500);
  const body = r.responseChunks.join("");
  // Error must NOT include raw stack trace (Hard Rule #12 sanitization).
  assert.ok(!body.includes("at /"));
});
