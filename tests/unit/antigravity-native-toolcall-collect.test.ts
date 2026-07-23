/**
 * Native functionCall parts must be collected by the Antigravity SSE collector.
 *
 * Root cause: `processAntigravitySSEPayload` only handled `part.text` (including
 * the legacy "[Tool call: ...]" textual format) and skipped every other part.
 * Gemini 3.x answers native `functionDeclarations` with a native `functionCall`
 * part (usually carrying a `thoughtSignature`), so any tools request collected
 * to an empty stream and was rewritten into a synthetic 502 "Provider returned
 * empty content" — breaking Chatwit Captain Copilot / reply suggestions on
 * agy/gemini-3.5-flash-low while plain text completions kept working.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { processAntigravitySSEPayload } from "../../open-sse/executors/antigravity.ts";
import type { AntigravityCollectedStream } from "../../open-sse/executors/antigravity/sseCollect.ts";

function emptyCollected(): AntigravityCollectedStream {
  return {
    textContent: "",
    finishReason: "",
    toolCalls: [],
    usage: null,
    remainingCredits: null,
  };
}

test("processAntigravitySSEPayload collects a native functionCall part as a tool call", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload(
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [
                {
                  functionCall: { name: "search_documentation", args: { query: "horário" } },
                  thoughtSignature: "sig-abc",
                },
              ],
            },
            finishReason: "STOP",
          },
        ],
      },
    }),
    collected
  );

  assert.equal(collected.toolCalls.length, 1);
  assert.equal(collected.toolCalls[0].type, "function");
  assert.equal(collected.toolCalls[0].function.name, "search_documentation");
  assert.deepEqual(JSON.parse(collected.toolCalls[0].function.arguments), { query: "horário" });
  assert.ok(collected.toolCalls[0].id.length > 0);
});

test("processAntigravitySSEPayload preserves upstream functionCall id and indexes multiple calls", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload(
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [
                { functionCall: { id: "call-1", name: "get_contact", args: { contact_id: 7 } } },
                { functionCall: { name: "get_conversation", args: {} } },
              ],
            },
          },
        ],
      },
    }),
    collected
  );

  assert.equal(collected.toolCalls.length, 2);
  assert.equal(collected.toolCalls[0].id, "call-1");
  assert.equal(collected.toolCalls[0].index, 0);
  assert.equal(collected.toolCalls[1].index, 1);
  assert.equal(collected.toolCalls[1].function.name, "get_conversation");
});

test("processAntigravitySSEPayload still collects text alongside a functionCall part", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload(
    JSON.stringify({
      response: {
        candidates: [
          {
            content: {
              parts: [
                { text: "Vou buscar isso." },
                { functionCall: { name: "search_articles", args: { query: "faq" } } },
              ],
            },
          },
        ],
      },
    }),
    collected
  );

  assert.equal(collected.textContent, "Vou buscar isso.");
  assert.equal(collected.toolCalls.length, 1);
});

test("processAntigravitySSEPayload ignores a malformed functionCall without a name", () => {
  const collected = emptyCollected();
  processAntigravitySSEPayload(
    JSON.stringify({
      response: { candidates: [{ content: { parts: [{ functionCall: { args: {} } }] } }] },
    }),
    collected
  );

  assert.equal(collected.toolCalls.length, 0);
  assert.equal(collected.textContent, "");
});
