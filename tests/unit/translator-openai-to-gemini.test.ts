import test from "node:test";
import assert from "node:assert/strict";

const { openaiToAntigravityRequest, openaiToGeminiCLIRequest, openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const {
  DEFAULT_SAFETY_SETTINGS,
  cleanJSONSchemaForAntigravity,
  convertOpenAIContentToParts,
  generateRequestId,
  generateSessionId,
  tryParseJSON,
} = await import("../../open-sse/translator/helpers/geminiHelper.ts");
const { ANTIGRAVITY_DEFAULT_SYSTEM } = await import("../../open-sse/config/constants.ts");

type UnknownRecord = Record<string, unknown>;

function getFunctionCall(part: unknown) {
  assert.ok(part && typeof part === "object", "expected Gemini functionCall part");
  const functionCall = (part as UnknownRecord).functionCall;
  assert.ok(functionCall && typeof functionCall === "object", "expected functionCall payload");
  return functionCall as { id?: string; name: string; args?: unknown };
}

function getFunctionResponse(part: unknown) {
  assert.ok(part && typeof part === "object", "expected Gemini functionResponse part");
  const functionResponse = (part as UnknownRecord).functionResponse;
  assert.ok(
    functionResponse && typeof functionResponse === "object",
    "expected functionResponse payload"
  );
  return functionResponse as { id?: string; name: string; response?: unknown };
}

function getFunctionDeclarationParameters(parameters: unknown) {
  assert.ok(
    parameters && typeof parameters === "object",
    "expected function declaration parameters"
  );
  return parameters as UnknownRecord & {
    properties?: Record<string, UnknownRecord>;
    examples?: unknown;
    $schema?: unknown;
  };
}

test("OpenAI -> Gemini helper converts text, images and files into Gemini parts", () => {
  const parts = convertOpenAIContentToParts([
    { type: "text", text: "Hello" },
    { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
    { type: "file_url", file_url: { url: "data:application/pdf;base64,Zm9v" } },
    { type: "document", document: { url: "data:text/plain;base64,YmFy" } },
    { type: "image_url", image_url: { url: "https://example.com/skip.png" } },
    { type: "file_url", file_url: { url: "not-a-data-url" } },
  ]);

  assert.deepEqual(parts, [
    { text: "Hello" },
    { inlineData: { mimeType: "image/png", data: "abc" } },
    { inlineData: { mimeType: "application/pdf", data: "Zm9v" } },
    { inlineData: { mimeType: "text/plain", data: "YmFy" } },
  ]);
  assert.deepEqual(convertOpenAIContentToParts("raw text"), [{ text: "raw text" }]);
});

test("OpenAI -> Gemini helper cleans complex JSON Schema structures for Gemini compatibility", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    title: "Root schema",
    properties: {
      mode: { const: "fast" },
      retries: { type: "integer", enum: [1, 2, 3] },
      payload: {
        anyOf: [
          { type: "null" },
          {
            type: "object",
            properties: {
              id: { type: ["string", "null"], minLength: 1 },
              nested: {
                allOf: [
                  {
                    properties: {
                      a: { type: "string" },
                    },
                    required: ["a"],
                  },
                  {
                    properties: {
                      b: { type: "number" },
                    },
                    required: ["missing", "b"],
                  },
                ],
              },
            },
            required: ["id", "missing"],
          },
        ],
      },
      emptyObject: {
        type: "object",
        additionalProperties: false,
      },
    },
    required: ["mode", "payload", "missingRoot"],
  });

  assert.equal(cleaned.properties.mode.type, "string");
  assert.deepEqual(cleaned.properties.mode.enum, ["fast"]);
  assert.equal(cleaned.properties.retries.enum, undefined);
  assert.equal(cleaned.properties.payload.type, "object");
  assert.equal(cleaned.properties.payload.properties.id.type, "string");
  assert.equal("minLength" in cleaned.properties.payload.properties.id, false);
  assert.deepEqual(cleaned.properties.payload.required, ["id"]);
  assert.deepEqual(cleaned.properties.payload.properties.nested.required.sort(), ["a", "b"]);
  assert.deepEqual(cleaned.required.sort(), ["mode", "payload"]);
  assert.deepEqual(cleaned.properties.emptyObject.required, ["reason"]);
  assert.equal(cleaned.properties.emptyObject.properties.reason.type, "string");
});

test("OpenAI -> Gemini helper inlines local refs and preserves only additionalProperties=true", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    $defs: {
      Address: {
        type: "object",
        properties: {
          street: { type: "string", minLength: 1 },
        },
        required: ["street"],
        additionalProperties: false,
      },
    },
    properties: {
      shipping: { $ref: "#/$defs/Address" },
      metadata: {
        type: "object",
        additionalProperties: true,
      },
      options: {
        type: "object",
        additionalProperties: { type: "string" },
      },
    },
    required: ["shipping"],
  });

  assert.equal(cleaned.$defs, undefined);
  assert.equal(cleaned.properties.shipping.$ref, undefined);
  assert.equal(cleaned.properties.shipping.properties.street.type, "string");
  assert.equal(cleaned.properties.shipping.properties.street.minLength, undefined);
  assert.deepEqual(cleaned.properties.shipping.required, ["street"]);
  assert.equal(cleaned.properties.shipping.additionalProperties, undefined);
  assert.equal(cleaned.properties.metadata.additionalProperties, undefined);
  assert.equal(cleaned.properties.options.additionalProperties, undefined);
});

test("OpenAI -> Gemini request maps messages, merged system instructions, tools and response schema", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "system", content: "Rule A" },
        { role: "system", content: [{ type: "text", text: "Rule B" }] },
        {
          role: "user",
          content: [
            { type: "text", text: "What is the weather?" },
            { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
          ],
        },
        {
          role: "assistant",
          reasoning_content: "Need live data",
          content: "Calling a tool",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "weather", arguments: '{"city":"Tokyo"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_1",
          content: '{"temp":20}',
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "weather",
            description: "Fetch weather",
            parameters: {
              type: "object",
              properties: {
                city: { type: ["string", "null"] },
              },
              required: ["city"],
            },
          },
        },
      ],
      max_completion_tokens: 2222,
      temperature: 0.3,
      top_p: 0.9,
      stop: ["DONE"],
      response_format: {
        type: "json_schema",
        json_schema: {
          schema: {
            type: "object",
            properties: {
              answer: { const: "ok" },
            },
            required: ["answer"],
          },
        },
      },
    },
    false
  );

  assert.equal((result as any).systemInstruction.role, "user");
  assert.deepEqual((result as any).systemInstruction.parts, [
    { text: "Rule A" },
    { text: "Rule B" },
  ]);
  assert.equal(result.contents[0].role, "user");
  assert.deepEqual(result.contents[0].parts, [
    { text: "What is the weather?" },
    { inlineData: { mimeType: "image/png", data: "abc" } },
  ]);

  const modelTurn = result.contents.find(
    (content) => content.role === "model" && content.parts.some((part) => part.functionCall)
  );
  assert.ok(modelTurn, "expected a model turn with functionCall");
  const modelTurnThought = modelTurn.parts[0] as { thought?: boolean; text?: string };
  const modelTurnFunctionCall = getFunctionCall(modelTurn.parts[2]);
  assert.equal(modelTurn.parts[0].thought, true);
  assert.equal(modelTurnThought.text, "Need live data");
  assert.equal(modelTurn.parts[1].text, "Calling a tool");
  assert.equal(modelTurnFunctionCall.name, "weather");
  assert.deepEqual(modelTurnFunctionCall.args, { city: "Tokyo" });

  const toolResponseTurn = result.contents.find(
    (content) => content.role === "user" && content.parts.some((part) => part.functionResponse)
  );
  assert.ok(toolResponseTurn, "expected a tool response turn");
  assert.deepEqual(getFunctionResponse(toolResponseTurn.parts[0]), {
    id: "call_1",
    name: "weather",
    response: { result: { temp: 20 } },
  });

  assert.equal((result as any).generationConfig.maxOutputTokens, 2222);
  assert.equal((result as any).generationConfig.temperature, 0.3);
  assert.equal((result as any).generationConfig.topP, 0.9);
  assert.deepEqual((result as any).generationConfig.stopSequences, ["DONE"]);
  assert.equal((result as any).generationConfig.responseMimeType, "application/json");
  const responseSchema = (result as any).generationConfig.responseSchema as {
    properties: { answer: { type: string; enum?: string[] } };
  };
  assert.equal(responseSchema.properties.answer.type, "string");
  assert.deepEqual(responseSchema.properties.answer.enum, ["ok"]);
  const parameters = getFunctionDeclarationParameters(
    (result as any).tools[0].functionDeclarations[0].parameters
  );
  assert.deepEqual(parameters, {
    type: "object",
    properties: {
      city: { type: "string" },
    },
    required: ["city"],
  });
  assert.deepEqual(result.safetySettings, DEFAULT_SAFETY_SETTINGS);
});

test("OpenAI -> Gemini request preserves custom safety settings and handles system-only requests", () => {
  const customSafety = [{ category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" }];

  const result = openaiToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "system", content: "Only rules" }],
      safetySettings: customSafety,
    },
    false
  );

  assert.deepEqual(result.safetySettings, customSafety);
  assert.equal((result as any).systemInstruction, undefined);
  assert.equal(result.contents.length, 1);
  assert.equal(result.contents[0].role, "user");
  assert.deepEqual(result.contents[0].parts, [{ text: "Only rules" }]);
});

test("OpenAI -> Gemini CLI adds thinking config and normalizes namespaced tool names", () => {
  const result = openaiToGeminiCLIRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "user", content: "Check weather" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "ns:weather", arguments: '{"city":"Tokyo"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_1",
          content: '{"temp":20}',
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "ns:weather",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
      reasoning_effort: "high",
    },
    false
  );

  assert.equal((result as any).generationConfig.thinkingConfig.includeThoughts, true);
  assert.ok((result as any).generationConfig.thinkingConfig.thinkingBudget > 0);
  assert.equal((result as any).tools[0].functionDeclarations[0].name, "weather");
  assert.equal((result as any)._toolNameMap.get("weather"), "ns:weather");

  const modelTurn = result.contents.find((content) => content.role === "model");
  assert.ok(modelTurn, "expected a model turn");
  assert.equal(getFunctionCall(modelTurn.parts[0]).name, "weather");

  const responseTurn = result.contents.find(
    (content) => content.role === "user" && content.parts.some((part) => part.functionResponse)
  );
  assert.ok(responseTurn, "expected a function response turn");
  assert.equal(getFunctionResponse(responseTurn.parts[0]).name, "weather");
});

test("OpenAI -> Gemini request sanitizes long MCP tool names and strips unsupported schema fields", () => {
  const longToolName =
    "mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle_v2";
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "user", content: "Read the file set" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_long_1",
              type: "function",
              function: { name: longToolName, arguments: '{"paths":["/tmp/a","/tmp/b"]}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_long_1",
          content: '{"ok":true}',
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: longToolName,
            parameters: {
              type: "object",
              $schema: "http://json-schema.org/draft-07/schema#",
              examples: [{ paths: ["/tmp/a"] }],
              properties: {
                paths: {
                  type: "array",
                  items: { type: "string", "x-ui": "hidden" },
                },
              },
            },
          },
        },
      ],
    },
    false
  );

  const sanitizedToolName = (result as any).tools[0].functionDeclarations[0].name;
  assert.ok(longToolName.length > 64);
  assert.equal(sanitizedToolName.length, 64);
  assert.match(sanitizedToolName, /_[a-f0-9]{8}$/);
  assert.equal((result as any)._toolNameMap.get(sanitizedToolName), longToolName);

  const modelTurn = result.contents.find((content) => content.role === "model");
  assert.ok(modelTurn, "expected a model turn");
  assert.equal(getFunctionCall(modelTurn.parts[0]).name, sanitizedToolName);

  const toolTurn = result.contents.find(
    (content) => content.role === "user" && content.parts.some((part) => part.functionResponse)
  );
  assert.ok(toolTurn, "expected a tool response turn");
  assert.equal(getFunctionResponse(toolTurn.parts[0]).name, sanitizedToolName);
  const longToolParameters = getFunctionDeclarationParameters(
    (result as any).tools[0].functionDeclarations[0].parameters
  ) as UnknownRecord & {
    properties?: {
      paths?: {
        items?: UnknownRecord;
      };
    };
  };
  assert.equal(longToolParameters.$schema, undefined);
  assert.equal(longToolParameters.examples, undefined);
  assert.equal(longToolParameters.properties?.paths?.items?.["x-ui"], undefined);
});

test("OpenAI -> Gemini request gives googleSearch precedence over function tools", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: "Search the web" }],
      tools: [
        {
          type: "function",
          function: {
            name: "weather",
            description: "Fetch weather",
            parameters: { type: "object", properties: {} },
          },
        },
        { type: "web_search" },
      ],
    },
    false
  );

  assert.deepEqual((result as any).tools, [{ googleSearch: {} }]);
});

test("OpenAI -> Antigravity keeps googleSearch without function calling config", () => {
  const result = openaiToAntigravityRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: "Search the web" }],
      tools: [
        {
          type: "function",
          function: {
            name: "weather",
            parameters: { type: "object", properties: {} },
          },
        },
        { type: "web_search_preview" },
      ],
    },
    false,
    { projectId: "proj-search" } as any
  );

  assert.deepEqual((result as any).request?.tools, [{ googleSearch: {} }]);
  assert.equal(result.request.toolConfig, undefined);
});

test("OpenAI -> Gemini helper IDs and JSON parsing stay in the expected format", () => {
  assert.match(generateRequestId(), /^agent-/);
  assert.match(generateSessionId(), /^-\d+$/);
  assert.deepEqual(tryParseJSON('{"ok":true}'), { ok: true });
  assert.equal(tryParseJSON("not-json"), null as any);
});

test("OpenAI -> Antigravity wraps Gemini requests in a Cloud Code envelope", () => {
  const result = openaiToAntigravityRequest(
    "gemini-2.5-pro",
    {
      messages: [{ role: "user", content: "Hello" }],
      tools: [
        {
          type: "function",
          function: {
            name: "weather",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
      reasoning_effort: "medium",
    },
    false,
    { projectId: "proj-1" } as any
  );

  assert.equal(result.project, "proj-1");
  assert.equal(result.userAgent, "antigravity");
  assert.equal(result.requestType, "agent");
  assert.match(result.requestId, /^agent-/);
  assert.match(result.request.sessionId, /^-\d+$/);
  assert.equal(
    (result as any).request?.systemInstruction.parts[0].text,
    ANTIGRAVITY_DEFAULT_SYSTEM
  );
  assert.deepEqual(result.request.toolConfig, {
    functionCallingConfig: { mode: "VALIDATED" },
  });
});

test("OpenAI -> Antigravity uses the Claude bridge for Claude-family models", () => {
  const result = openaiToAntigravityRequest(
    "claude-3-7-sonnet",
    {
      messages: [
        { role: "system", content: "Project rules" },
        { role: "user", content: "Read a file" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "read_file", arguments: '{"path":"/tmp/demo"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_1",
          content: '{"ok":true}',
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "read_file",
            parameters: {
              type: "object",
              properties: { path: { type: "string" } },
              required: ["path"],
            },
          },
        },
      ],
    },
    false,
    { projectId: "proj-claude" } as any
  );

  assert.equal(result.project, "proj-claude");
  assert.equal(result.userAgent, "antigravity");
  assert.equal(
    (result as any).request?.systemInstruction.parts[0].text,
    ANTIGRAVITY_DEFAULT_SYSTEM
  );
  assert.equal((result as any).request?.systemInstruction.parts[1].text, "Project rules");

  const modelTurn = result.request.contents.find(
    (content) => content.role === "model" && content.parts.some((part) => part.functionCall)
  );
  assert.ok(modelTurn, "expected a Claude-bridged model turn");
  const bridgeFunctionCall = getFunctionCall(modelTurn.parts[0]);
  assert.equal(bridgeFunctionCall.name, "read_file");
  assert.deepEqual(bridgeFunctionCall.args, { path: "/tmp/demo" });

  const toolTurn = result.request.contents.find(
    (content) => content.role === "user" && content.parts.some((part) => part.functionResponse)
  );
  assert.ok(toolTurn, "expected a Claude-bridged tool response turn");
  assert.equal(getFunctionResponse(toolTurn.parts[0]).id, "call_1");
  assert.equal((result as any).request?.tools[0].functionDeclarations[0].name, "read_file");
});

test("OpenAI -> Antigravity Claude bridge sanitizes long names and preserves restore map", () => {
  const longToolName =
    "ns:mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle";
  const result = openaiToAntigravityRequest(
    "claude-3-7-sonnet",
    {
      messages: [
        { role: "user", content: "Read a file" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_long_2",
              type: "function",
              function: { name: longToolName, arguments: '{"path":"/tmp/demo"}' },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_long_2",
          content: '{"ok":true}',
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: longToolName,
            parameters: {
              type: "object",
              properties: { path: { type: "string", "x-ui": "hidden" } },
              required: ["path"],
            },
          },
        },
      ],
    },
    false,
    { projectId: "proj-claude-map" } as any
  );

  const sanitizedToolName = (result as any).request?.tools[0].functionDeclarations[0].name;
  assert.equal(sanitizedToolName.length, 64);
  assert.equal((result as any)._toolNameMap.get(sanitizedToolName), longToolName);

  const modelTurn = result.request.contents.find(
    (content) => content.role === "model" && content.parts.some((part) => part.functionCall)
  );
  assert.ok(modelTurn, "expected a model turn");
  assert.equal(getFunctionCall(modelTurn.parts[0]).name, sanitizedToolName);

  const toolTurn = result.request.contents.find(
    (content) => content.role === "user" && content.parts.some((part) => part.functionResponse)
  );
  assert.ok(toolTurn, "expected a tool response turn");
  assert.equal(getFunctionResponse(toolTurn.parts[0]).name, sanitizedToolName);
});
