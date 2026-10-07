/**
 * Unit tests for detailed token tracking in call logs.
 *
 * Verifies that getPromptCacheReadTokensOrNull, getPromptCacheCreationTokensOrNull,
 * and getReasoningTokensOrNull correctly distinguish between:
 *   - Provider didn't report the field -> null
 *   - Provider reported zero -> 0
 *
 * Also tests getLoggedInputTokens for each provider format.
 *
 * These import the real implementations. They used to inline a hand-copied clone
 * of tokenAccounting.ts, which drifted from the source and ended up asserting a
 * bug as expected behaviour (`cache_write_tokens` silently dropped).
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  getLoggedInputTokens,
  getPromptCacheCreationTokensOrNull,
  getPromptCacheReadTokensOrNull,
  getReasoningTokensOrNull,
} from "../../src/lib/usage/tokenAccounting.ts";
describe("detailed token extraction â€” per provider format", () => {
  it("Anthropic (streaming extracted): input_tokens=3, cache_creation=113613, cache_read=0", () => {
    // Raw Anthropic streaming usage (from message_start event)
    const tokens = {
      input_tokens: 3,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 113613,
      output_tokens: 6921,
    };
    assert.equal(getLoggedInputTokens(tokens), 113616, "Total input = 3 + 0 + 113613");
    assert.equal(getPromptCacheReadTokensOrNull(tokens), 0, "Cache read reported as 0");
    assert.equal(getPromptCacheCreationTokensOrNull(tokens), 113613, "Cache write = 113613");
    assert.equal(getReasoningTokensOrNull(tokens), null, "No reasoning field");
  });

  it("anthropic-compatible-cc: same format as Anthropic", () => {
    const tokens = {
      input_tokens: 3,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 113613,
      output_tokens: 6921,
    };
    assert.equal(getLoggedInputTokens(tokens), 113616);
    assert.equal(getPromptCacheReadTokensOrNull(tokens), 0);
    assert.equal(getPromptCacheCreationTokensOrNull(tokens), 113613);
    assert.equal(getReasoningTokensOrNull(tokens), null);
  });

  it("openai-compatible-aio: prompt_tokens=54042, cached=53221, reasoning=6433", () => {
    const tokens = {
      prompt_tokens: 54042,
      completion_tokens: 8000,
      prompt_tokens_details: { cached_tokens: 53221 },
      completion_tokens_details: { reasoning_tokens: 6433 },
    };
    assert.equal(getLoggedInputTokens(tokens), 54042, "prompt_tokens already includes cached");
    assert.equal(getPromptCacheReadTokensOrNull(tokens), 53221, "Cache read from details");
    assert.equal(getPromptCacheCreationTokensOrNull(tokens), null, "No cache creation field");
    assert.equal(getReasoningTokensOrNull(tokens), 6433, "Reasoning from completion details");
  });

  it("OpenRouter: prompt_tokens=5, cached=0, cache_write=0, reasoning=60", () => {
    const tokens = {
      prompt_tokens: 5,
      completion_tokens: 100,
      prompt_tokens_details: { cached_tokens: 0, cache_write_tokens: 0 },
      completion_tokens_details: { reasoning_tokens: 60 },
    };
    assert.equal(getLoggedInputTokens(tokens), 5);
    assert.equal(getPromptCacheReadTokensOrNull(tokens), 0, "Cache read = 0 (reported)");
    // OpenRouter spells cache creation `cache_write_tokens`. It is a reported
    // zero, so it must map to 0 -- not to null, which means "not reported".
    assert.equal(
      getPromptCacheCreationTokensOrNull(tokens),
      0,
      "OpenRouter cache_write_tokens maps to cache creation"
    );
    assert.equal(getReasoningTokensOrNull(tokens), 60, "Reasoning = 60");
  });

  it("GitHub: prompt_tokens=5, cached=0, reasoning_tokens=57", () => {
    const tokens = {
      prompt_tokens: 5,
      completion_tokens: 100,
      prompt_tokens_details: { cached_tokens: 0 },
      reasoning_tokens: 57,
    };
    assert.equal(getLoggedInputTokens(tokens), 5);
    assert.equal(getPromptCacheReadTokensOrNull(tokens), 0, "Cache read = 0 (reported)");
    assert.equal(getPromptCacheCreationTokensOrNull(tokens), null, "No cache creation");
    assert.equal(getReasoningTokensOrNull(tokens), 57, "Reasoning from top-level");
  });

  it("Codex: only prompt_tokens/completion_tokens, no breakdowns", () => {
    const tokens = {
      prompt_tokens: 500,
      completion_tokens: 200,
      total_tokens: 700,
    };
    assert.equal(getLoggedInputTokens(tokens), 500);
    assert.equal(getPromptCacheReadTokensOrNull(tokens), null, "No cache read field");
    assert.equal(getPromptCacheCreationTokensOrNull(tokens), null, "No cache creation field");
    assert.equal(getReasoningTokensOrNull(tokens), null, "No reasoning field");
  });

  it("Antigravity / openai-compatible-sp: same as Codex (no breakdowns)", () => {
    const tokens = {
      prompt_tokens: 300,
      completion_tokens: 150,
    };
    assert.equal(getPromptCacheReadTokensOrNull(tokens), null);
    assert.equal(getPromptCacheCreationTokensOrNull(tokens), null);
    assert.equal(getReasoningTokensOrNull(tokens), null);
  });
});

describe("null vs 0 distinction", () => {
  it("explicit 0 is preserved (not collapsed to null)", () => {
    const tokens = {
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 0,
      reasoning_tokens: 0,
    };
    assert.equal(getPromptCacheReadTokensOrNull(tokens), 0);
    assert.equal(getPromptCacheCreationTokensOrNull(tokens), 0);
    assert.equal(getReasoningTokensOrNull(tokens), 0);
  });

  it("missing fields return null", () => {
    const tokens = { prompt_tokens: 100, completion_tokens: 50 };
    assert.equal(getPromptCacheReadTokensOrNull(tokens), null);
    assert.equal(getPromptCacheCreationTokensOrNull(tokens), null);
    assert.equal(getReasoningTokensOrNull(tokens), null);
  });

  it("undefined fields return null (not 0)", () => {
    const tokens = {
      prompt_tokens: 100,
      cache_read_input_tokens: undefined,
    };
    assert.equal(getPromptCacheReadTokensOrNull(tokens), null);
  });
});
