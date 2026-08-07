import test from "node:test";
import assert from "node:assert/strict";

import { buildTestComboBody } from "../../open-sse/mcp-server/tools/advancedTools.ts";

// Regression guard: the omniroute_test_combo tool used to inject an
// `x-provider` body field. The gateway forwards the body verbatim to the
// upstream, and strict OpenAI-compatible providers (Mistral) reject the
// unknown field with 422 — so healthy combo targets appeared broken in the
// tool's results even though the real chatCore path worked.
test("buildTestComboBody: does not inject an x-provider body field", () => {
  const body = buildTestComboBody("mistral/mistral-large-latest", "Say hello");
  assert.ok(!("x-provider" in body), "body must not contain an x-provider field");
});

test("buildTestComboBody: plain chat-completions shape", () => {
  const body = buildTestComboBody("ollama-local/qwen2.5:14b", "hi");
  assert.equal(body.model, "ollama-local/qwen2.5:14b");
  assert.deepEqual(body.messages, [{ role: "user", content: "hi" }]);
  assert.equal(body.max_tokens, 50);
  assert.equal(body.stream, false);
});

test("buildTestComboBody: only forwards recognized chat-completions keys", () => {
  const body = buildTestComboBody("auto", "");
  const keys = Object.keys(body).sort();
  assert.deepEqual(keys, ["max_tokens", "messages", "model", "stream"].sort());
});
