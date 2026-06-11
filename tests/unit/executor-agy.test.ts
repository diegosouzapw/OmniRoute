import test from "node:test";
import assert from "node:assert/strict";

import { getExecutor, AntigravityExecutor } from "../../open-sse/executors/index.ts";
import { processAntigravitySSEPayload } from "../../open-sse/executors/antigravity.ts";

function emptyCollected(): any {
  return {
    textContent: "",
    finishReason: "",
    toolCalls: [],
    usage: null,
    remainingCredits: null,
  };
}

test("getExecutor('agy') returns AntigravityExecutor (not DefaultExecutor)", () => {
  const executor = getExecutor("agy");
  assert.ok(executor instanceof AntigravityExecutor, "agy provider should use AntigravityExecutor");
});

test("getExecutor('antigravity') returns AntigravityExecutor", () => {
  const executor = getExecutor("antigravity");
  assert.ok(
    executor instanceof AntigravityExecutor,
    "antigravity provider should use AntigravityExecutor"
  );
});

test("getExecutor('agy') builds valid streaming URL", () => {
  const executor = getExecutor("agy");
  const url = executor.buildUrl("gemini-3.5-flash-high", true);
  assert.ok(
    url.includes("streamGenerateContent?alt=sse"),
    `expected streaming endpoint URL, got: ${url}`
  );
});

test("getExecutor('agy') builds valid non-streaming URL", () => {
  const executor = getExecutor("agy");
  const url = executor.buildUrl("gemini-3.5-flash-high", false);
  // Antigravity executor always uses streaming endpoint (buildUrl ignores stream flag)
  assert.ok(
    url.includes("streamGenerateContent?alt=sse"),
    `expected streaming endpoint URL (always), got: ${url}`
  );
});

test("getExecutor('agy') buildHeaders returns Bearer auth", () => {
  const executor = getExecutor("agy");
  const headers = executor.buildHeaders({ accessToken: "test-token" });
  assert.equal(headers.Authorization, "Bearer test-token");
});

// #3821-review LEDGER-9 — the Antigravity SSE `markdown` extraction branch had no test.
test("processAntigravitySSEPayload accumulates top-level markdown into textContent", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload(JSON.stringify({ markdown: "Hello " }), collected);
  processAntigravitySSEPayload(JSON.stringify({ response: { markdown: "world" } }), collected);
  assert.equal(collected.textContent, "Hello world");
});

test("processAntigravitySSEPayload uses candidate parts text when no markdown is present", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload(
    JSON.stringify({ response: { candidates: [{ content: { parts: [{ text: "from parts" }] } }] } }),
    collected
  );
  assert.equal(collected.textContent, "from parts");
});

test("processAntigravitySSEPayload ignores [DONE] and malformed payloads without throwing", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload("[DONE]", collected);
  processAntigravitySSEPayload("{not json", collected);
  assert.equal(collected.textContent, "");
});
