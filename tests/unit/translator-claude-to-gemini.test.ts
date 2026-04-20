import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { DEFAULT_SAFETY_SETTINGS } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");

type UnknownRecord = Record<string, unknown>;

function getFunctionDeclarationParameters(parameters: unknown) {
  assert.ok(
    parameters && typeof parameters === "object",
    "expected function declaration parameters"
  );
  return parameters as UnknownRecord & {
    properties?: Record<string, UnknownRecord>;
    examples?: unknown;
  };
}

function getFunctionCall(part: unknown) {
  assert.ok(part && typeof part === "object", "expected Gemini part");
  const functionCall = (part as UnknownRecord).functionCall;
  assert.ok(functionCall && typeof functionCall === "object", "expected functionCall");
  return functionCall as { name: string };
}

function getFunctionResponse(part: unknown) {
  assert.ok(part && typeof part === "object", "expected Gemini part");
  const functionResponse = (part as UnknownRecord).functionResponse;
  assert.ok(functionResponse && typeof functionResponse === "object", "expected functionResponse");
  return functionResponse as { name: string };
}

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
  assert.deepEqual(result.contents[0].parts[0] as any, { thought: true, text: "need tool" });
  assert.deepEqual(result.contents[0].parts[1] as any, {
    functionCall: { id: "tu_1", name: "weather", args: { city: "Tokyo" } },
  });
  assert.deepEqual(result.contents[1].parts[0] as any, {
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
  assert.deepEqual((result as any).tools[0].functionDeclarations[0].parameters, {
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
  assert.equal((result.contents[0].parts[0] as any).functionCall.name, "read_file");
  assert.equal((result.contents[0].parts[0] as any).thoughtSignature, undefined);
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

  const sanitizedToolName = (result as any).tools[0].functionDeclarations[0].name as string;
  const parameters = getFunctionDeclarationParameters(
    (result as any).tools[0].functionDeclarations[0].parameters
  );
  assert.ok(longToolName.length > 64);
  assert.equal(sanitizedToolName.length, 64);
  assert.equal((result as any)._toolNameMap.get(sanitizedToolName), longToolName);
  assert.equal(getFunctionCall(result.contents[0].parts[0] as any).name, sanitizedToolName);
  assert.equal(getFunctionResponse(result.contents[1].parts[0] as any).name, sanitizedToolName);
  assert.equal(parameters.examples, undefined);
  assert.equal(parameters.properties?.path?.["x-ui"], undefined);
});

test("Claude -> Gemini handles empty bodies without producing invalid content", () => {
  const result = claudeToGeminiRequest("gemini-2.5-flash", {}, false);

  assert.deepEqual(result.contents, []);
  assert.deepEqual(result.generationConfig, {});
  assert.deepEqual(result.safetySettings, DEFAULT_SAFETY_SETTINGS);
});
