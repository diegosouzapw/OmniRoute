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

// #7037 — non-streaming (and tool-only) responses carry the tool call as a native
// `part.functionCall` with no `part.text`. It must produce a tool call instead of
// empty content (which previously surfaced as a 502 "Provider returned empty content").
test("processAntigravitySSEPayload converts native part.functionCall into a tool call (#7037)", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload(
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [{ functionCall: { name: "get_weather", args: { city: "Paris" } } }],
            },
            finishReason: "STOP",
          },
        ],
        usageMetadata: { promptTokenCount: 12, candidatesTokenCount: 932, totalTokenCount: 944 },
      },
    }),
    collected
  );

  assert.equal(collected.textContent, "");
  assert.equal(collected.toolCalls.length, 1);
  assert.equal(collected.toolCalls[0].type, "function");
  assert.equal(collected.toolCalls[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(collected.toolCalls[0].function.arguments), { city: "Paris" });
  assert.equal(collected.finishReason, "tool_calls");
  assert.ok(collected.usage !== null, "usage metadata should still be collected");
});

test("processAntigravitySSEPayload handles a mixed text + functionCall response (#7037)", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload(
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [
                { text: "Let me check." },
                { functionCall: { name: "get_weather", args: { city: "Paris" } } },
              ],
            },
          },
        ],
      },
    }),
    collected
  );

  assert.equal(collected.textContent, "Let me check.");
  assert.equal(collected.toolCalls.length, 1);
  assert.equal(collected.toolCalls[0].function.name, "get_weather");
});

// #7037 — before the fix, a function-call-only payload yielded no text and no
// tool call, so the non-streaming path returned empty content. Guard that the
// textual-tool-call path is unaffected.
test("processAntigravitySSEPayload still parses textual [Tool call:] when present", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload(
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "[Tool call: get_weather]\nArguments: {\"city\":\"Paris\"}",
                },
              ],
            },
          },
        ],
      },
    }),
    collected
  );

  assert.equal(collected.toolCalls.length, 1);
  assert.equal(collected.toolCalls[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(collected.toolCalls[0].function.arguments), { city: "Paris" });
});
