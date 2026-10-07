import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest, openaiToAntigravityRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
  clearGeminiThoughtSignatures,
} = await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

test.beforeEach(() => {
  clearGeminiThoughtSignatures();
});

type UnknownRecord = Record<string, unknown>;

function getFunctionResponse(part: unknown) {
  assert.ok(part && typeof part === "object", "expected Gemini part");
  const functionResponse = (part as UnknownRecord).functionResponse;
  assert.ok(functionResponse && typeof functionResponse === "object", "expected functionResponse");
  return functionResponse as { id?: string; name: string; response?: unknown };
}

// A tool result whose payload is itself valid JSON (e.g. a WebFetch result
// `{"title": ..., "summary": ...}`). It must be passed through to Gemini /
// Antigravity as the raw string — it must NOT be JSON.parse'd into a nested
// object, which made Antigravity reject the request with HTTP 400 "upstream
// error" (upstream translator used tryParseJSON on tool result content).
const JSON_TOOL_RESULT = '{"title":"Example","summary":"antigravity 400 repro"}';

test("OpenAI -> Gemini keeps a JSON-string tool result as a raw string", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "user", content: "fetch it" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_json_1",
              type: "function",
              function: { name: "web_fetch", arguments: '{"url":"https://example.com"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_json_1", content: JSON_TOOL_RESULT },
      ],
    },
    false
  );

  const toolTurn = (result as { contents: Array<UnknownRecord> }).contents.find(
    (c) => c.role === "user" && c.parts.some((part) => (part as UnknownRecord).functionResponse)
  );
  assert.ok(toolTurn, "expected a tool response turn");
  assert.deepEqual(getFunctionResponse((toolTurn.parts as unknown[])[0]).response, {
    result: JSON_TOOL_RESULT,
  });
});

test("OpenAI -> Gemini keeps a plain-text tool result as a raw string (no double wrap)", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "user", content: "read it" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_txt_1",
              type: "function",
              function: { name: "read_file", arguments: '{"path":"a.txt"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_txt_1", content: "plain text output" },
      ],
    },
    false
  );

  const toolTurn = (result as { contents: Array<UnknownRecord> }).contents.find(
    (c) => c.role === "user" && c.parts.some((part) => (part as UnknownRecord).functionResponse)
  );
  assert.ok(toolTurn, "expected a tool response turn");
  assert.deepEqual(getFunctionResponse((toolTurn.parts as unknown[])[0]).response, {
    result: "plain text output",
  });
});

test("OpenAI -> Antigravity keeps a JSON-string tool result as a raw string", () => {
  const result = openaiToAntigravityRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "user", content: "fetch it" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_json_2",
              type: "function",
              function: { name: "web_fetch", arguments: '{"url":"https://example.com"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_json_2", content: JSON_TOOL_RESULT },
      ],
    },
    false,
    { projectId: "proj-json-passthrough" } as never
  );

  const request = (result as unknown as { request: { contents: Array<UnknownRecord> } }).request;
  const toolTurn = request.contents.find(
    (c) => c.role === "user" && c.parts.some((part) => (part as UnknownRecord).functionResponse)
  );
  assert.ok(toolTurn, "expected an Antigravity tool response turn");
  assert.deepEqual(getFunctionResponse((toolTurn.parts as unknown[])[0]).response, {
    result: JSON_TOOL_RESULT,
  });
});

test("Claude -> Gemini keeps a JSON-string tool_result as a raw string", () => {
  // Native functionResponse requires a cached thoughtSignature for the tool use.
  const ns = "conn-tool-result-json";
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "tu_json_1"), "SIG_JSON_1");

  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "user", content: [{ type: "text", text: "fetch it" }] },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "need tool" },
            {
              type: "tool_use",
              id: "tu_json_1",
              name: "web_fetch",
              input: { url: "https://example.com" },
            },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "tu_json_1", content: JSON_TOOL_RESULT }],
        },
      ],
    },
    false,
    { _signatureNamespace: ns } as never
  );

  const toolTurn = (result as { contents: Array<UnknownRecord> }).contents.find(
    (c) => c.role === "user" && c.parts.some((part) => (part as UnknownRecord).functionResponse)
  );
  assert.ok(toolTurn, "expected a tool response turn");
  assert.deepEqual(getFunctionResponse((toolTurn.parts as unknown[])[0]).response, {
    result: JSON_TOOL_RESULT,
  });
});

test("Claude -> Gemini keeps a plain-text tool_result as a raw string (no double wrap)", () => {
  const ns = "conn-tool-result-txt";
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "tu_txt_1"), "SIG_TXT_1");

  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "user", content: [{ type: "text", text: "read it" }] },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "need tool" },
            { type: "tool_use", id: "tu_txt_1", name: "read_file", input: { path: "a.txt" } },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "tu_txt_1", content: "plain text output" }],
        },
      ],
    },
    false,
    { _signatureNamespace: ns } as never
  );

  const toolTurn = (result as { contents: Array<UnknownRecord> }).contents.find(
    (c) => c.role === "user" && c.parts.some((part) => (part as UnknownRecord).functionResponse)
  );
  assert.ok(toolTurn, "expected a tool response turn");
  assert.deepEqual(getFunctionResponse((toolTurn.parts as unknown[])[0]).response, {
    result: "plain text output",
  });
});