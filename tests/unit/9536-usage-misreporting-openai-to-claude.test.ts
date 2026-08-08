import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

/**
 * Test for #9536: Usage misreported on OpenAI-shaped upstreams when translating
 * to Claude format (non-streaming path).
 *
 * Two defects:
 * 1. cache_read_input_tokens is always 0 (missing mapping)
 * 2. input_tokens is inflated by cached tokens (not subtracting prompt_tokens_details.cached_tokens)
 *
 * Plus regression guard for #8331 (buffer isolation via context_budget_* fields).
 */

const DEEPSEEK_OPENAI_RESPONSE = {
  id: "chatcmpl-deepseek-abc123",
  object: "chat.completion",
  model: "deepseek/deepseek-v4-flash",
  choices: [
    {
      index: 0,
      message: { role: "assistant", content: "I am an AI assistant." },
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 4364,
    prompt_tokens_details: { cached_tokens: 4352 },
    prompt_cache_hit_tokens: 4352,
    prompt_cache_miss_tokens: 12,
    completion_tokens: 27,
    total_tokens: 4391,
  },
};

const DEEPSEEK_OPENAI_RESPONSE_NO_CACHE = {
  id: "chatcmpl-deepseek-no-cache",
  object: "chat.completion",
  model: "deepseek/deepseek-v4-flash",
  choices: [
    {
      index: 0,
      message: { role: "assistant", content: "Hello." },
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 125,
    prompt_tokens_details: {},
    completion_tokens: 5,
    total_tokens: 130,
  },
};

/**
 * OpenAI response that (before #8331's context_budget_* fix) would have had
 * input_tokens += buffer. After #8331, the buffer values go into
 * context_budget_* fields that filterUsageForFormat strips.
 */
const RESPONSE_WITH_BUFFER = {
  id: "chatcmpl-buffer-test",
  object: "chat.completion",
  model: "gpt-4o",
  choices: [
    {
      index: 0,
      message: { role: "assistant", content: "Hello." },
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 50,
    completion_tokens: 10,
    total_tokens: 60,
  },
};

describe("9536 - usage misreporting OpenAI->Claude (non-streaming)", () => {
  it("Defect 1: cache_read_input_tokens should be present when cached_tokens > 0", () => {
    const result = translateNonStreamingResponse(
      DEEPSEEK_OPENAI_RESPONSE,
      FORMATS.OPENAI,
      FORMATS.CLAUDE
    );

    const usage = (result as Record<string, unknown>).usage as Record<string, unknown>;

    // cache_read_input_tokens should be mapped from prompt_tokens_details.cached_tokens
    assert.equal(
      usage.cache_read_input_tokens,
      4352,
      `cache_read_input_tokens = ${usage.cache_read_input_tokens} (expected 4352)`
    );
  });

  it("Defect 2: input_tokens should be prompt_tokens minus cached tokens", () => {
    const result = translateNonStreamingResponse(
      DEEPSEEK_OPENAI_RESPONSE,
      FORMATS.OPENAI,
      FORMATS.CLAUDE
    );

    const usage = (result as Record<string, unknown>).usage as Record<string, unknown>;

    // input_tokens = prompt_tokens(4364) - cached_tokens(4352) = 12
    assert.equal(usage.input_tokens, 12, `input_tokens = ${usage.input_tokens} (expected 12)`);
  });

  it("Regression guard #8331: buffer should NOT inflate input_tokens", () => {
    const result = translateNonStreamingResponse(
      RESPONSE_WITH_BUFFER,
      FORMATS.OPENAI,
      FORMATS.CLAUDE
    );

    const usage = (result as Record<string, unknown>).usage as Record<string, unknown>;

    // input_tokens should be exactly prompt_tokens (50), no buffer added
    assert.equal(usage.input_tokens, 50, `input_tokens = ${usage.input_tokens} (expected 50)`);

    // No context_budget_* fields should leak into the translated response
    assert.equal(usage.context_budget_remaining, undefined);
    assert.equal(usage.context_budget_consume, undefined);
    assert.equal(usage.context_budget_add, undefined);
  });

  it("No cache data: input_tokens unchanged, no cache_read_input_tokens", () => {
    const result = translateNonStreamingResponse(
      DEEPSEEK_OPENAI_RESPONSE_NO_CACHE,
      FORMATS.OPENAI,
      FORMATS.CLAUDE
    );

    const usage = (result as Record<string, unknown>).usage as Record<string, unknown>;

    // Without cached_tokens, input_tokens = prompt_tokens = 125
    assert.equal(usage.input_tokens, 125, `input_tokens = ${usage.input_tokens} (expected 125)`);

    // cache_read_input_tokens should NOT be present when there's no caching
    assert.equal(usage.cache_read_input_tokens, undefined);
  });

  it("Pass-through: same format returns usage unchanged", () => {
    // When source === target, the function returns the response as-is
    const result = translateNonStreamingResponse(
      DEEPSEEK_OPENAI_RESPONSE,
      FORMATS.OPENAI,
      FORMATS.OPENAI
    );

    const usage = (result as Record<string, unknown>).usage as Record<string, unknown>;

    // OpenAI format should preserve all fields, including cached_tokens
    assert.equal(usage.prompt_tokens, 4364);
    assert.equal(usage.completion_tokens, 27);
    assert.ok(usage.prompt_tokens_details, "prompt_tokens_details should be preserved");
  });
});
