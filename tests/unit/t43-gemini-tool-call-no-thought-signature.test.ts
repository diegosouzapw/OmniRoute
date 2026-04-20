/**
 * T43: Gemini tool call parts must NOT inject fake thoughtSignature.
 *
 * After the fix for issue #1410, OmniRoute no longer injects a hardcoded
 * DEFAULT_THINKING_GEMINI_SIGNATURE into tool call parts. The Gemini 3+ API
 * strictly validates thought signatures cryptographically, and injecting a
 * stale/fake one causes 400 errors.
 *
 * Signatures are now only included when:
 * 1. The client explicitly provides them via tool_call.thoughtSignature
 * 2. They are resolved from the geminiThoughtSignatureStore (persisted from
 *    a prior upstream response)
 *
 * Reproduces: https://github.com/diegosouzapw/OmniRoute/issues/1410
 * Supersedes: https://github.com/diegosouzapw/OmniRoute/issues/725
 */

import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function translateToGemini(messages, tools) {
  return translateRequest(FORMATS.OPENAI, FORMATS.GEMINI, "gemini-2.0-flash", {
    model: "gemini-2.0-flash",
    messages,
    tools,
    stream: false,
  });
}

test("T43: functionCall parts do NOT get a fake thoughtSignature injected", () => {
  const messages = [
    { role: "user", content: "What is the weather in Tokyo?" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_abc123",
          type: "function",
          function: { name: "get_weather", arguments: '{"location":"Tokyo"}' },
        },
      ],
    },
    {
      role: "tool",
      tool_call_id: "call_abc123",
      content: '{"temp": "15°C", "condition": "cloudy"}',
    },
  ];

  const tools = [
    {
      type: "function",
      function: {
        name: "get_weather",
        description: "Get weather for a location",
        parameters: {
          type: "object",
          properties: { location: { type: "string" } },
          required: ["location"],
        },
      },
    },
  ];

  const result = translateToGemini(messages, tools);

  const modelTurn = result.contents.find(
    (c) => c.role === "model" && c.parts?.some((p) => p.functionCall)
  );

  assert.ok(modelTurn, "Expected a model turn with functionCall parts");

  const functionCallParts = modelTurn.parts.filter((part) => part.functionCall);
  assert.equal(functionCallParts.length, 1, "Expected exactly 1 functionCall part");
  assert.equal(functionCallParts[0].functionCall.name, "get_weather");
  assert.deepEqual(functionCallParts[0].functionCall.args, { location: "Tokyo" });

  // No fake signature should be injected when the client didn't provide one
  assert.equal(
    functionCallParts[0].thoughtSignature,
    undefined,
    "functionCall parts must NOT have a fake thoughtSignature injected"
  );
});

test("T43: client-provided thoughtSignature is ignored in default enabled cache mode", () => {
  // In "enabled" mode (default), the signature cache ignores client-provided
  // signatures and only uses persisted ones from upstream responses.
  // This is the correct behavior to prevent stale/fake signatures from being
  // forwarded to the Gemini API.
  const clientSignature = "REAL_CLIENT_SIGNATURE_abc123";
  const messages = [
    { role: "user", content: "Get weather for Tokyo" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_001",
          type: "function",
          function: { name: "get_weather", arguments: '{"location":"Tokyo"}' },
          thoughtSignature: clientSignature,
        },
      ],
    },
    {
      role: "tool",
      tool_call_id: "call_001",
      content: '{"temp":"15°C"}',
    },
  ];

  const result = translateToGemini(messages, []);

  const modelTurn = result.contents.find(
    (c) => c.role === "model" && c.parts?.some((p) => p.functionCall)
  );
  assert.ok(modelTurn, "Expected a model turn with functionCall parts");

  const functionCallParts = modelTurn.parts.filter((p) => p.functionCall);
  assert.equal(functionCallParts.length, 1, "Expected 1 functionCall part");

  // In enabled cache mode, client-provided signatures are NOT forwarded
  assert.equal(
    functionCallParts[0].thoughtSignature,
    undefined,
    "Client-provided thoughtSignature should be ignored in enabled cache mode"
  );
});

test("T43: thinking parts still emit thought=true (regression guard)", () => {
  // Ensure we did not accidentally break the thinking parts that legitimately
  // need thought: true (present when msg.reasoning_content is set).
  const messages = [
    { role: "user", content: "Think about the weather" },
    {
      role: "assistant",
      reasoning_content: "The user wants weather data.",
      content: "I'll check the weather.",
      tool_calls: undefined,
    },
  ];

  const result = translateToGemini(messages, []);

  const modelTurn = result.contents.find((c) => c.role === "model");
  assert.ok(modelTurn, "Expected a model turn");

  const thinkingPart = modelTurn.parts.find((p) => p.thought === true);
  assert.ok(thinkingPart, "Expected a thinking part when reasoning_content is set");
  assert.equal(thinkingPart.text, "The user wants weather data.");

  // After #1410 fix, no fake thoughtSignature parts are injected
  const signaturePart = modelTurn.parts.find(
    (p) => "thoughtSignature" in p && !p.functionCall && !p.thought
  );
  assert.equal(
    signaturePart,
    undefined,
    "No standalone fake thoughtSignature parts should be injected"
  );
});
