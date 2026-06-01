import test from "node:test";
import assert from "node:assert/strict";

import { PollinationsExecutor } from "../../open-sse/executors/pollinations.ts";

test("#2987 PollinationsExecutor.buildUrl uses the gen.pollinations.ai gateway (not the legacy text host)", () => {
  const executor = new PollinationsExecutor();
  // Legacy text.pollinations.ai now 404s ("legacy API"); gen.pollinations.ai/v1
  // is the current OpenAI-compatible endpoint and must be the primary.
  assert.equal(
    executor.buildUrl("openai", true),
    "https://gen.pollinations.ai/v1/chat/completions"
  );
  // No legacy text.pollinations.ai endpoint should remain in the rotation.
  assert.equal(
    executor.buildUrl("openai", true, 1),
    "https://gen.pollinations.ai/v1/chat/completions"
  );
});

test("PollinationsExecutor.buildHeaders supports anonymous access and optional SSE accept", () => {
  const executor = new PollinationsExecutor();
  assert.deepEqual(executor.buildHeaders({}, true), {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  });
});

test("PollinationsExecutor.buildHeaders sends API auth for the key-backed tier when configured", () => {
  const executor = new PollinationsExecutor();
  assert.deepEqual(executor.buildHeaders({ apiKey: "poll-key" }, true), {
    "Content-Type": "application/json",
    Authorization: "Bearer poll-key",
    Accept: "text/event-stream",
  });
});

test("PollinationsExecutor.transformRequest is a passthrough for alias models", () => {
  const executor = new PollinationsExecutor();
  const body = { model: "claude", messages: [{ role: "user", content: "hello" }] };
  assert.equal(executor.transformRequest("claude", body, true, {}), body);
});
