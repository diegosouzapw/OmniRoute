import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function createStreamingState() {
  return {
    toolCalls: new Map(),
  };
}

test("Gemini non-stream: single candidate text maps to one OpenAI choice", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-single",
      modelVersion: "gemini-2.5-flash",
      createTime: "2026-04-05T12:00:00.000Z",
      candidates: [
        {
          content: {
            parts: [{ text: "Hello from Gemini" }],
          },
          finishReason: "STOP",
        },
      ],
      usageMetadata: {
        promptTokenCount: 3,
        candidatesTokenCount: 5,
        totalTokenCount: 8,
      },
    },
    FORMATS.GEMINI,
    FORMATS.OPENAI
  );

  assert.equal((result as any).object, "chat.completion");
  (assert as any).equal((result as any).id, "chatcmpl-resp-single");
  (assert as any).equal((result as any).model, "gemini-2.5-flash");
  assert.equal((result as any).choices.length, 1);
  assert.equal((result as any).choices[0].message.role, "assistant");
  assert.equal((result as any).choices[0].message.content, "Hello from Gemini");
  assert.equal((result as any).choices[0].finish_reason, "stop");
  (assert as any).deepEqual((result as any).usage, {
    prompt_tokens: 3,
    completion_tokens: 5,
    total_tokens: 8,
  });
});

test("Gemini non-stream: multiple candidates keep multimodal content, reasoning and tool calls", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-multi",
      modelVersion: "gemini-2.5-pro",
      createTime: "2026-04-05T12:00:00.000Z",
      candidates: [
        {
          content: {
            parts: [
              { thought: true, text: "Plan first." },
              { text: "Answer:" },
              { inlineData: { mimeType: "image/png", data: "abc123" } },
              { functionCall: { name: "read_file", args: { path: "/tmp/a" } } },
            ],
          },
          finishReason: "STOP",
        },
        {
          content: {
            parts: [{ text: "Second option" }],
          },
          finishReason: "MAX_TOKENS",
        },
      ],
      usageMetadata: {
        promptTokenCount: 4,
        candidatesTokenCount: 6,
        thoughtsTokenCount: 2,
        totalTokenCount: 12,
        cachedContentTokenCount: 1,
      },
    },
    FORMATS.GEMINI,
    (FORMATS as any).OPENAI
  );

  assert.equal((result as any).choices.length, 2);
  assert.equal(((result as any).choices as any)[0].finish_reason, "tool_calls");
  assert.equal(((result as any).choices[0] as any).message.reasoning_content, "Plan first.");
  assert.equal((result as any).choices[0].message.content[0].text, "Answer:");
  assert.equal(
    ((result as any).choices[0].message as any).content[1].image_url.url,
    "data:image/png;base64,abc123"
  );
  assert.equal((result as any).choices[0].message.tool_calls[0].function.name, "read_file");
  assert.equal(
    ((result as any).choices[0].message as any).tool_calls[0].function.arguments,
    JSON.stringify({ path: "/tmp/a" })
  );
  assert.equal(((result as any).choices[1].message as any).content, "Second option");
  (assert as any).equal((result as any).choices[1].finish_reason, "length");
  assert.equal((result as any).usage.prompt_tokens, 4);
  assert.equal((result as any).usage.completion_tokens, 8);
  (assert as any).equal((result as any).usage.total_tokens, 12);
  assert.equal((result as any).usage.prompt_tokens_details.cached_tokens, 1);
  assert.equal((result as any).usage.completion_tokens_details.reasoning_tokens, 2);
});

test("Gemini non-stream: promptFeedback-only block becomes content_filter", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-safety",
      modelVersion: "gemini-2.5-flash",
      promptFeedback: { blockReason: "SAFETY" },
    },
    FORMATS.GEMINI,
    (FORMATS as any).OPENAI
  );

  assert.equal((result as any).object, "chat.completion");
  assert.equal((result as any).choices.length, 1);
  assert.equal((result as any).choices[0].message.content, "");
  assert.equal((result as any).choices[0].finish_reason, "content_filter");
});

test("Gemini non-stream: restores sanitized tool names from the request map", () => {
  const sanitizedToolName = "read_multiple_files_with_validation_bundle_ab12cd34";
  const originalToolName =
    "mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle_v2";
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-tool-map",
      modelVersion: "gemini-2.5-pro",
      createTime: "2026-04-05T12:00:00.000Z",
      candidates: [
        {
          content: {
            parts: [
              {
                functionCall: {
                  name: sanitizedToolName,
                  args: { path: "/tmp/a" },
                },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    FORMATS.GEMINI,
    FORMATS.OPENAI,
    new Map([[sanitizedToolName, originalToolName]])
  );

  assert.equal((result as any).choices[0].message.tool_calls[0].function.name, originalToolName);
});

test("Gemini non-stream: restores Antigravity _ide-cloaked tool names from the request map", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-ag-tool-map",
      modelVersion: "antigravity/gemini-2.5-pro",
      createTime: "2026-04-22T12:00:00.000Z",
      candidates: [
        {
          content: {
            parts: [
              {
                functionCall: {
                  name: "read_project_file_ide",
                  args: { path: "/tmp/a" },
                },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    FORMATS.ANTIGRAVITY,
    FORMATS.OPENAI,
    new Map([["read_project_file_ide", "read_project_file"]])
  );

  assert.equal((result as any).choices[0].message.tool_calls[0].function.name, "read_project_file");
});

test("Gemini stream: first text chunk emits assistant role then content delta", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-stream",
      modelVersion: "gemini-2.5-pro",
      candidates: [
        {
          content: {
            parts: [{ text: "Hello" }],
          },
        },
      ],
    },
    state
  );

  assert.equal(result.length, 2);
  assert.equal(result[0].choices[0].delta.role, "assistant");
  assert.equal(result[1].choices[0].delta.content, "Hello");
  assert.equal(result[1].id, "chatcmpl-resp-stream");
});

test("Gemini stream: subsequent text chunks append content without re-emitting role", () => {
  const state = createStreamingState();
  geminiToOpenAIResponse(
    {
      responseId: "resp-stream",
      modelVersion: "gemini-2.5-pro",
      candidates: [{ content: { parts: [{ text: "Hel" }] } }],
    },
    state
  );

  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-stream",
      modelVersion: "gemini-2.5-pro",
      candidates: [{ content: { parts: [{ text: "lo" }] } }],
    },
    state
  );

  assert.equal(result.length, 1);
  assert.equal(result[0].choices[0].delta.role, undefined);
  assert.equal(result[0].choices[0].delta.content, "lo");
});

test("Gemini stream: reasoning, tool call, image and MAX_TOKENS finish are converted", () => {
  const state = {
    ...createStreamingState(),
    toolNameMap: new Map([
      [
        "weather_lookup_bundle_ab12cd34",
        "mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle_v2",
      ],
    ]),
  };
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-rich",
      modelVersion: "gemini-2.5-pro",
      candidates: [
        {
          content: {
            parts: [
              { thought: true, thoughtSignature: "sig-1", text: "Need a plan." },
              {
                functionCall: {
                  name: "weather_lookup_bundle_ab12cd34",
                  args: { city: "Sao Paulo" },
                },
              },
              { inlineData: { mimeType: "image/png", data: "imgdata" } },
            ],
          },
          finishReason: "MAX_TOKENS",
        },
      ],
      usageMetadata: {
        promptTokenCount: 4,
        candidatesTokenCount: 3,
        thoughtsTokenCount: 2,
        totalTokenCount: 9,
        cachedContentTokenCount: 1,
      },
    },
    state
  );

  assert.equal(result[1].choices[0].delta.reasoning_content, "Need a plan.");
  assert.equal(
    result[2].choices[0].delta.tool_calls[0].function.name,
    "mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle_v2"
  );
  assert.equal(
    result[2].choices[0].delta.tool_calls[0].function.arguments,
    JSON.stringify({ city: "Sao Paulo" })
  );
  assert.equal(result[3].choices[0].delta.images[0].image_url.url, "data:image/png;base64,imgdata");
  assert.equal(result[4].choices[0].finish_reason, "length");
  assert.equal(result[4].usage.prompt_tokens, 4);
  assert.equal(result[4].usage.completion_tokens, 5);
  assert.equal(result[4].usage.prompt_tokens_details.cached_tokens, 1);
  assert.equal(result[4].usage.completion_tokens_details.reasoning_tokens, 2);
});

test("Gemini stream: safety block without candidates emits role chunk then content_filter finish", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-safety",
      modelVersion: "gemini-2.5-flash",
      promptFeedback: { blockReason: "SAFETY" },
    },
    state
  );

  assert.equal(result.length, 2);
  assert.equal(result[0].choices[0].delta.role, "assistant");
  assert.equal(result[1].choices[0].finish_reason, "content_filter");
});

test("Gemini stream: null chunk is ignored", () => {
  assert.equal(geminiToOpenAIResponse(null, createStreamingState()), null);
});
