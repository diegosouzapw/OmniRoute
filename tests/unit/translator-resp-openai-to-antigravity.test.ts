import test from "node:test";
import assert from "node:assert/strict";

const { openaiToAntigravityResponse } =
  await import("../../open-sse/translator/response/openai-to-antigravity.ts");

test("OpenAI -> Antigravity: reasoning and text become Gemini-style parts", () => {
  const result = openaiToAntigravityResponse(
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            reasoning_content: "Plan first",
            content: "Then answer",
          },
          finish_reason: null,
        },
      ],
    },
    {}
  );

  assert.equal(result.response.responseId, "chatcmpl-1");
  assert.equal(result.response.modelVersion, "gpt-4.1");
  assert.deepEqual(result.response.candidates[0].content.parts, [
    { thought: true, text: "Plan first" },
    { text: "Then answer" },
  ]);
});

test("OpenAI -> Antigravity: tool call arguments accumulate and emit once on finish", () => {
  const state = {};
  const first = openaiToAntigravityResponse(
    {
      id: "chatcmpl-2",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "read_", arguments: '{"path":' },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const final = openaiToAntigravityResponse(
    {
      id: "chatcmpl-2",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            content: "done",
            tool_calls: [
              {
                index: 0,
                function: { name: "file", arguments: '"/tmp/a"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: {
        prompt_tokens: 8,
        completion_tokens: 5,
        total_tokens: 13,
        prompt_tokens_details: { cached_tokens: 2 },
        completion_tokens_details: { reasoning_tokens: 1 },
      },
    },
    state
  );

  assert.equal(first, null);
  assert.equal(final.response.candidates[0].content.parts[0].text, "done");
  assert.deepEqual(final.response.candidates[0].content.parts[1], {
    functionCall: {
      name: "read_file",
      args: { path: "/tmp/a" },
    },
  });
  assert.equal(final.response.candidates[0].finishReason, "STOP");
  assert.equal(final.response.usageMetadata.promptTokenCount, 8);
  assert.equal(final.response.usageMetadata.candidatesTokenCount, 5);
  assert.equal(final.response.usageMetadata.totalTokenCount, 13);
  assert.equal(final.response.usageMetadata.thoughtsTokenCount, 1);
  assert.equal(final.response.usageMetadata.cachedContentTokenCount, 2);
});

test("OpenAI -> Antigravity: usage-only chunks are remembered for the final response", () => {
  const state = {};
  const usageOnly = openaiToAntigravityResponse(
    {
      id: "chatcmpl-3",
      model: "gpt-4.1",
      usage: { prompt_tokens: 2, completion_tokens: 3, total_tokens: 5 },
    },
    state
  );
  const final = openaiToAntigravityResponse(
    {
      id: "chatcmpl-3",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "length" }],
    },
    state
  );

  assert.equal(usageOnly, null);
  assert.equal(final.response.candidates[0].finishReason, "MAX_TOKENS");
  assert.deepEqual(final.response.candidates[0].content.parts, [{ text: "" }]);
  assert.deepEqual(final.response.usageMetadata, {
    promptTokenCount: 2,
    candidatesTokenCount: 3,
    totalTokenCount: 5,
  });
});

test("OpenAI -> Antigravity: content_filter maps to SAFETY", () => {
  const result = openaiToAntigravityResponse(
    {
      id: "chatcmpl-4",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "content_filter" }],
    },
    {}
  );

  assert.equal(result.response.candidates[0].finishReason, "SAFETY");
});

test("OpenAI -> Antigravity: null chunks are ignored", () => {
  assert.equal(openaiToAntigravityResponse(null, {}), null);
});
