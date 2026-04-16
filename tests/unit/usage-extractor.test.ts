import test from "node:test";
import assert from "node:assert/strict";

const { extractUsageFromResponse } = await import("../../open-sse/handlers/usageExtractor.ts");
const { extractUsage } = await import("../../open-sse/utils/usageTracking.ts");

test("extractUsageFromResponse reads OpenAI chat completion usage", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 12,
        completion_tokens: 8,
        prompt_tokens_details: { cached_tokens: 3 },
        completion_tokens_details: { reasoning_tokens: 2 },
      },
    },
    "openai"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 12,
    completion_tokens: 8,
    cached_tokens: 3,
    reasoning_tokens: 2,
  });
});

test("extractUsageFromResponse reads OpenAI usage when cache/reasoning live under input/output token details", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 12,
        completion_tokens: 8,
        input_tokens_details: { cached_tokens: 4 },
        output_tokens_details: { reasoning_tokens: 1 },
      },
    },
    "codex"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 12,
    completion_tokens: 8,
    cached_tokens: 4,
    reasoning_tokens: 1,
  });
});

test("extractUsageFromResponse defaults missing OpenAI token fields to zero", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        prompt_tokens: 0,
      },
    },
    "openai"
  );

  assert.equal(usage.prompt_tokens, 0);
  assert.equal(usage.completion_tokens, 0);
  assert.equal(usage.cached_tokens, undefined);
  assert.equal(usage.reasoning_tokens, undefined);
});

test("extractUsageFromResponse reads Responses API usage from the top-level usage field", () => {
  const usage = extractUsageFromResponse(
    {
      object: "response",
      usage: {
        input_tokens: 20,
        output_tokens: 9,
        cache_read_input_tokens: 4,
        cache_creation_input_tokens: 5,
        reasoning_tokens: 3,
      },
    },
    "github"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 20,
    completion_tokens: 9,
    cache_read_input_tokens: 4,
    cached_tokens: 4,
    cache_creation_input_tokens: 5,
    reasoning_tokens: 3,
  });
});

test("extractUsageFromResponse reads Responses API usage from nested response.usage", () => {
  const usage = extractUsageFromResponse(
    {
      response: {
        usage: {
          input_tokens: 14,
          output_tokens: 6,
          input_tokens_details: { cached_tokens: 2 },
          output_tokens_details: { reasoning_tokens: 1 },
        },
      },
    },
    "codex"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 14,
    completion_tokens: 6,
    cache_read_input_tokens: undefined,
    cached_tokens: 2,
    cache_creation_input_tokens: undefined,
    reasoning_tokens: 1,
  });
});

test("extractUsageFromResponse reads Responses API usage with prompt_tokens_details (OpenAI hybrid format)", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        input_tokens: 30,
        output_tokens: 12,
        prompt_tokens_details: { cached_tokens: 10 },
        completion_tokens_details: { reasoning_tokens: 5 },
      },
    },
    "codex"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 30,
    completion_tokens: 12,
    cache_read_input_tokens: undefined,
    cached_tokens: 10,
    cache_creation_input_tokens: undefined,
    reasoning_tokens: 5,
  });
});

test("extractUsageFromResponse reads Responses API cache_read_input_tokens as cached_tokens fallback", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        input_tokens: 50,
        output_tokens: 20,
        cache_read_input_tokens: 15,
        cache_creation_input_tokens: 8,
        reasoning_tokens: 3,
      },
    },
    "github"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 50,
    completion_tokens: 20,
    cache_read_input_tokens: 15,
    cached_tokens: 15,
    cache_creation_input_tokens: 8,
    reasoning_tokens: 3,
  });
});

test("extractUsageFromResponse totals Claude prompt tokens with cache read and cache creation", () => {
  const usage = extractUsageFromResponse(
    {
      usage: {
        input_tokens: 10,
        output_tokens: 7,
        cache_read_input_tokens: 4,
        cache_creation_input_tokens: 6,
      },
    },
    "claude"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 20,
    completion_tokens: 7,
    cache_read_input_tokens: 4,
    cache_creation_input_tokens: 6,
  });
});

test("extractUsageFromResponse reads Gemini usageMetadata and thinking tokens", () => {
  const usage = extractUsageFromResponse(
    {
      usageMetadata: {
        promptTokenCount: 11,
        candidatesTokenCount: 5,
        thoughtsTokenCount: 2,
      },
    },
    "gemini"
  );

  assert.deepEqual(usage, {
    prompt_tokens: 11,
    completion_tokens: 5,
    reasoning_tokens: 2,
  });
});

test("extractUsageFromResponse returns null when usage is missing", () => {
  const usage = extractUsageFromResponse(
    {
      id: "chatcmpl_no_usage",
      choices: [{ message: { role: "assistant", content: "ok" } }],
    },
    "openai"
  );

  assert.equal(usage, null);
});

test("extractUsageFromResponse returns null for null and undefined response bodies", () => {
  assert.equal(extractUsageFromResponse(null, "openai"), null);
  assert.equal(extractUsageFromResponse(undefined, "openai"), null);
});

test("extractUsageFromResponse returns null for non-object response bodies", () => {
  assert.equal(extractUsageFromResponse("not-an-object", "openai"), null);
  assert.equal(extractUsageFromResponse(42, "openai"), null);
});

// ── extractUsage (streaming) tests ──

test("extractUsage reads response.completed with prompt_tokens_details.cached_tokens", () => {
  const usage = extractUsage({
    type: "response.completed",
    response: {
      usage: {
        input_tokens: 100,
        output_tokens: 50,
        prompt_tokens_details: { cached_tokens: 30 },
        completion_tokens_details: { reasoning_tokens: 10 },
      },
    },
  });

  assert.equal(usage.prompt_tokens, 100);
  assert.equal(usage.completion_tokens, 50);
  assert.equal(usage.cached_tokens, 30);
  assert.equal(usage.reasoning_tokens, 10);
});

test("extractUsage reads response.done with input_tokens_details and output_tokens_details", () => {
  const usage = extractUsage({
    type: "response.done",
    response: {
      usage: {
        input_tokens: 80,
        output_tokens: 40,
        input_tokens_details: { cached_tokens: 20 },
        output_tokens_details: { reasoning_tokens: 8 },
      },
    },
  });

  assert.equal(usage.cached_tokens, 20);
  assert.equal(usage.reasoning_tokens, 8);
});

test("extractUsage reads response.completed with cache_read_input_tokens", () => {
  const usage = extractUsage({
    type: "response.completed",
    response: {
      usage: {
        input_tokens: 60,
        output_tokens: 25,
        cache_read_input_tokens: 15,
        cache_creation_input_tokens: 5,
        reasoning_tokens: 3,
      },
    },
  });

  assert.equal(usage.cached_tokens, 15);
  assert.equal(usage.cache_creation_input_tokens, 5);
  assert.equal(usage.reasoning_tokens, 3);
});

test("extractUsage reads OpenAI streaming chunk with prompt_tokens_details", () => {
  const usage = extractUsage({
    choices: [{ delta: {}, finish_reason: "stop" }],
    usage: {
      prompt_tokens: 200,
      completion_tokens: 100,
      prompt_tokens_details: { cached_tokens: 50 },
      completion_tokens_details: { reasoning_tokens: 20 },
    },
  });

  assert.equal(usage.cached_tokens, 50);
  assert.equal(usage.reasoning_tokens, 20);
});
