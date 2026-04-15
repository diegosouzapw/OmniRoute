import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { DEFAULT_SAFETY_SETTINGS } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");
const { DEFAULT_THINKING_GEMINI_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");

test("Claude -> Gemini maps system, thinking, tool use, tool result and tools", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      system: [{ text: "Rules" }],
      messages: [
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "need tool" },
            { type: "tool_use", id: "tu_1", name: "weather", input: { city: "Tokyo" } },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tu_1",
              content: [{ type: "text", text: "20C" }],
            },
          ],
        },
      ],
      tools: [
        {
          name: "weather",
          description: "Get weather",
          input_schema: {
            type: "object",
            properties: { city: { type: ["string", "null"] } },
          },
        },
      ],
      max_tokens: 256,
      temperature: 0.4,
      top_p: 0.8,
      thinking: { type: "enabled", budget_tokens: 512 },
    },
    false
  );

  assert.deepEqual(result.systemInstruction, {
    role: "user",
    parts: [{ text: "Rules" }],
  });
  assert.equal(result.contents[0].role, "model");
  assert.deepEqual(result.contents[0].parts[0], { thought: true, text: "need tool" });
  assert.deepEqual(result.contents[0].parts[1], {
    thoughtSignature: DEFAULT_THINKING_GEMINI_SIGNATURE,
    text: "",
  });
  assert.deepEqual(result.contents[0].parts[2], {
    functionCall: { id: "tu_1", name: "weather", args: { city: "Tokyo" } },
  });
  assert.deepEqual(result.contents[1].parts[0], {
    functionResponse: {
      id: "tu_1",
      name: "weather",
      response: { result: { result: "20C" } },
    },
  });
  assert.equal(result.generationConfig.maxOutputTokens, 256);
  assert.equal(result.generationConfig.temperature, 0.4);
  assert.equal(result.generationConfig.topP, 0.8);
  assert.deepEqual(result.generationConfig.thinkingConfig, {
    thinkingBudget: 512,
    includeThoughts: true,
  });
  assert.deepEqual(result.safetySettings, DEFAULT_SAFETY_SETTINGS);
  assert.deepEqual(result.tools[0].functionDeclarations[0].parameters, {
    type: "object",
    properties: { city: { type: "string" } },
  });
});

test("Claude -> Gemini converts text and base64 images to Gemini parts", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            {
              type: "image",
              source: { type: "base64", media_type: "image/png", data: "abc" },
            },
          ],
        },
      ],
    },
    false
  );

  assert.deepEqual(result.contents, [
    {
      role: "user",
      parts: [{ text: "Hello" }, { inlineData: { mimeType: "image/png", data: "abc" } }],
    },
  ]);
});

test("Claude -> Gemini injects a fallback thoughtSignature on tool-call batches without thinking", () => {
  const result = claudeToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "tu_1", name: "read_file", input: {} }],
        },
      ],
    },
    false
  );

  assert.equal(result.contents.length, 1);
  assert.equal(result.contents[0].role, "model");
  assert.equal(result.contents[0].parts[0].functionCall.name, "read_file");
  assert.equal(result.contents[0].parts[0].thoughtSignature, DEFAULT_THINKING_GEMINI_SIGNATURE);
});

test("Claude -> Gemini sanitizes long tool names and exposes a restore map", () => {
  const longToolName =
    "mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle_v2";
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "tu_long_1", name: longToolName, input: { path: "/tmp/a" } },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "tu_long_1", content: "ok" }],
        },
      ],
      tools: [
        {
          name: longToolName,
          description: "Read files",
          input_schema: {
            type: "object",
            properties: {
              path: { type: "string", "x-ui": "hidden" },
            },
            examples: [{ path: "/tmp/a" }],
          },
        },
      ],
    },
    false
  );

  const sanitizedToolName = result.tools[0].functionDeclarations[0].name;
  assert.ok(longToolName.length > 64);
  assert.equal(sanitizedToolName.length, 64);
  assert.equal(result._toolNameMap.get(sanitizedToolName), longToolName);
  assert.equal(result.contents[0].parts[0].functionCall.name, sanitizedToolName);
  assert.equal(result.contents[1].parts[0].functionResponse.name, sanitizedToolName);
  assert.equal(result.tools[0].functionDeclarations[0].parameters.examples, undefined);
  assert.equal(
    result.tools[0].functionDeclarations[0].parameters.properties.path["x-ui"],
    undefined
  );
});

test("Claude -> Gemini handles empty bodies without producing invalid content", () => {
  const result = claudeToGeminiRequest("gemini-2.5-flash", {}, false);

  assert.deepEqual(result.contents, []);
  assert.deepEqual(result.generationConfig, {});
  assert.deepEqual(result.safetySettings, DEFAULT_SAFETY_SETTINGS);
});
