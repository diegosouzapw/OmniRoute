import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");

function createResponsesState() {
  return {
    started: false,
    finishReasonSent: false,
    completedOutputItems: [],
    funcArgsBuf: {},
    funcNames: {},
    funcCallIds: {},
    funcArgsDone: {},
    funcItemAdded: {},
    funcItemDone: {},
  };
}

function createClaudeState() {
  return {
    toolCalls: new Map(),
    _pendingXmlToolCalls: [],
    _xmlInvokeBuffer: "",
  };
}

test("Responses cache usage survives the OpenAI-to-Claude streaming chain", () => {
  const openaiChunk = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        id: "resp-cache-hit",
        model: "gpt-5.6-sol",
        output: [],
        usage: {
          input_tokens: 21_023,
          input_tokens_details: { cached_tokens: 20_224 },
          output_tokens: 5,
        },
      },
    },
    createResponsesState()
  );

  assert.equal(openaiChunk.usage.prompt_tokens, 21_023);
  assert.equal(openaiChunk.usage.prompt_tokens_details.cached_tokens, 20_224);
  assert.equal(openaiChunk.usage.total_tokens, 21_028);

  const events = openaiToClaudeResponse(openaiChunk, createClaudeState());
  const messageDelta = events.find((event) => event.type === "message_delta");

  assert.deepEqual(messageDelta.usage, {
    input_tokens: 799,
    output_tokens: 5,
    cache_read_input_tokens: 20_224,
  });
});

test("Anthropic-style Responses usage still adds cache tokens to total prompt tokens", () => {
  const openaiChunk = openaiResponsesToOpenAIResponse(
    {
      type: "response.completed",
      response: {
        id: "resp-anthropic-usage",
        model: "claude-test",
        output: [],
        usage: {
          input_tokens: 799,
          cache_read_input_tokens: 20_224,
          cache_creation_input_tokens: 100,
          output_tokens: 5,
        },
      },
    },
    createResponsesState()
  );

  assert.equal(openaiChunk.usage.prompt_tokens, 21_123);
  assert.equal(openaiChunk.usage.prompt_tokens_details.cached_tokens, 20_224);
  assert.equal(openaiChunk.usage.prompt_tokens_details.cache_creation_tokens, 100);
  assert.equal(openaiChunk.usage.total_tokens, 21_128);
});
