/**
 * #14368 - `buildGeminiToolPrompt()` dropped the completed assistant tool call and
 * its `role: "tool"` result, so Gemini Web had no evidence the tool had run and
 * re-issued the same call (five times in the reporter's session, each with a fresh
 * call id). These tests pin the two contracts that must both hold: prior turns are
 * represented in order, and the pre-existing single-turn outputs stay byte-identical
 * (the #7286 guards in gemini-web-tool-calling-7286.test.ts).
 *
 * Run: node --import tsx/esm --test tests/unit/gemini-web-tool-history-14368.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

const { buildGeminiToolPrompt } = await import("../../open-sse/executors/gemini-web.ts");

test("#14368: a post-tool turn carries the assistant tool call and the tool result, in order", () => {
  const prompt = buildGeminiToolPrompt([
    { role: "system", content: "TOOL CONTRACT" },
    { role: "user", content: "What is in the catalog?" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        { id: "call_1", type: "function", function: { name: "lookup_catalog", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "call_1", content: '["Item A","Item B"]' },
    { role: "user", content: "And the cheapest one?" },
  ]);

  assert.ok(prompt.includes("TOOL CONTRACT"), "the synthetic tool contract must survive");
  assert.ok(prompt.includes("What is in the catalog?"), "the original ask must still be there");

  const callAt = prompt.indexOf("lookup_catalog");
  const argsAt = prompt.indexOf("lookup_catalog({})");
  const resultAt = prompt.indexOf('["Item A","Item B"]');
  const currentAt = prompt.indexOf("And the cheapest one?");

  assert.ok(callAt >= 0, "the assistant tool call must be represented: " + prompt);
  assert.ok(argsAt >= 0, "the call arguments must be rendered with the call");
  assert.ok(resultAt >= 0, "the tool result must be represented");
  assert.ok(argsAt < resultAt, "the call is shown before the result that answers it");
  assert.ok(resultAt < currentAt, "the new user message comes after the transcript");
  // The association the model needs to know WHICH call was answered.
  assert.ok(prompt.includes("call_1"), "tool_call_id must tie the result to the call");
});

test("#14368: single-turn tool prompts keep their exact previous shape", () => {
  assert.equal(
    buildGeminiToolPrompt([
      { role: "system", content: "TOOL CONTRACT HERE" },
      { role: "user", content: "what's the weather in Paris?" },
    ]),
    // Built without escapes so this file cannot drift from the two #7286 guards.
    ["TOOL CONTRACT HERE", "", "what's the weather in Paris?"].join(String.fromCharCode(10))
  );
  assert.equal(buildGeminiToolPrompt([{ role: "user", content: "hello" }]), "hello");
});
