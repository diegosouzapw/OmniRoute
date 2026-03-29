/**
 * T43: Gemini tool call parts must NOT include thoughtSignature.
 *
 * Regression test for HTTP 400 "invalid argument" when OmniRoute translates
 * OpenAI tool_calls to Gemini format. The thoughtSignature field is only valid
 * on thinking/reasoning parts — injecting it on functionCall parts causes the
 * Gemini API to reject the request with a 400 error.
 *
 * Reproduces: https://github.com/diegosouzapw/OmniRoute/issues/725
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

test("T43: functionCall parts must not contain thoughtSignature", () => {
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

  // Find the model turn that contains the functionCall
  const modelTurn = result.contents.find(
    (c) => c.role === "model" && c.parts?.some((p) => p.functionCall)
  );

  assert.ok(modelTurn, "Expected a model turn with functionCall parts");

  for (const part of modelTurn.parts) {
    if (part.functionCall) {
      assert.ok(
        !("thoughtSignature" in part),
        `functionCall part must not contain thoughtSignature — Gemini API returns HTTP 400 "invalid argument" when it does. Got: ${JSON.stringify(part)}`
      );
      assert.equal(part.functionCall.name, "get_weather");
      assert.deepEqual(part.functionCall.args, { location: "Tokyo" });
    }
  }
});

test("T43: multiple tool calls — none of the functionCall parts may have thoughtSignature", () => {
  const messages = [
    { role: "user", content: "Get weather for Tokyo and London" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_001",
          type: "function",
          function: { name: "get_weather", arguments: '{"location":"Tokyo"}' },
        },
        {
          id: "call_002",
          type: "function",
          function: { name: "get_weather", arguments: '{"location":"London"}' },
        },
      ],
    },
    {
      role: "tool",
      tool_call_id: "call_001",
      content: '{"temp":"15°C"}',
    },
    {
      role: "tool",
      tool_call_id: "call_002",
      content: '{"temp":"10°C"}',
    },
  ];

  const result = translateToGemini(messages, []);

  const modelTurn = result.contents.find(
    (c) => c.role === "model" && c.parts?.some((p) => p.functionCall)
  );
  assert.ok(modelTurn, "Expected a model turn with functionCall parts");

  const functionCallParts = modelTurn.parts.filter((p) => p.functionCall);
  assert.equal(functionCallParts.length, 2, "Expected 2 functionCall parts");

  for (const part of functionCallParts) {
    assert.ok(
      !("thoughtSignature" in part),
      `functionCall part must not contain thoughtSignature. Got: ${JSON.stringify(part)}`
    );
  }
});

test("T43: thinking parts still include thoughtSignature (regression guard)", () => {
  // Ensure we did not accidentally break the thinking parts that legitimately
  // need thoughtSignature (present when msg.reasoning_content is set).
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

  const signaturePart = modelTurn.parts.find((p) => "thoughtSignature" in p);
  assert.ok(signaturePart, "Expected a thoughtSignature part after thinking part");
  assert.ok(
    !signaturePart.functionCall,
    "thoughtSignature part must not also be a functionCall part"
  );
});
