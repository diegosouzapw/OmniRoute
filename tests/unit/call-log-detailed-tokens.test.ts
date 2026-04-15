/**
 * Unit tests for detailed token tracking in call logs.
 *
 * Verifies that getPromptCacheReadTokensOrNull, getPromptCacheCreationTokensOrNull,
 * and getReasoningTokensOrNull correctly distinguish between:
 *   - Provider didn't report the field → null
 *   - Provider reported zero → 0
 *
 * Also tests getLoggedInputTokens for each provider format.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Inline the logic from tokenAccounting.ts ────────────────────────────

function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function toFiniteNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function getPromptTokenDetails(tokens) {
  const tokenRecord = asRecord(tokens);
  const promptDetails = asRecord(tokenRecord.prompt_tokens_details);
  if (Object.keys(promptDetails).length > 0) return promptDetails;
  return asRecord(tokenRecord.input_tokens_details);
}

function getPromptCacheReadTokens(tokens) {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  return toFiniteNumber(
    tokenRecord.cacheRead ??
      tokenRecord.cache_read_input_tokens ??
      tokenRecord.cached_tokens ??
      promptDetails.cached_tokens
  );
}

function getPromptCacheCreationTokens(tokens) {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  return toFiniteNumber(
    tokenRecord.cacheCreation ??
      tokenRecord.cache_creation_input_tokens ??
      promptDetails.cache_creation_tokens
  );
}

function getReasoningTokens(tokens) {
  const tokenRecord = asRecord(tokens);
  const completionDetails = asRecord(tokenRecord.completion_tokens_details);
  return toFiniteNumber(
    tokenRecord.reasoning ?? tokenRecord.reasoning_tokens ?? completionDetails.reasoning_tokens
  );
}

function hasAnyKey(record, keys) {
  return keys.some((k) => record[k] !== undefined && record[k] !== null);
}

function getPromptCacheReadTokensOrNull(tokens) {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  if (
    hasAnyKey(tokenRecord, ["cacheRead", "cache_read_input_tokens", "cached_tokens"]) ||
    hasAnyKey(promptDetails, ["cached_tokens"])
  ) {
    return getPromptCacheReadTokens(tokens);
  }
  return null;
}

function getPromptCacheCreationTokensOrNull(tokens) {
  const tokenRecord = asRecord(tokens);
  const promptDetails = getPromptTokenDetails(tokenRecord);
  if (
    hasAnyKey(tokenRecord, ["cacheCreation", "cache_creation_input_tokens"]) ||
    hasAnyKey(promptDetails, ["cache_creation_tokens"])
  ) {
    return getPromptCacheCreationTokens(tokens);
  }
  return null;
}

function getReasoningTokensOrNull(tokens) {
  const tokenRecord = asRecord(tokens);
  const completionDetails = asRecord(tokenRecord.completion_tokens_details);
  if (
    hasAnyKey(tokenRecord, ["reasoning", "reasoning_tokens"]) ||
    hasAnyKey(completionDetails, ["reasoning_tokens"])
  ) {
    return getReasoningTokens(tokens);
  }
  return null;
}

function getLoggedInputTokens(tokens) {
  const tokenRecord = asRecord(tokens);
  if (tokenRecord.input !== undefined && tokenRecord.input !== null) {
    return toFiniteNumber(tokenRecord.input);
  }
  if (tokenRecord.input_tokens !== undefined && tokenRecord.input_tokens !== null) {
    return (
      toFiniteNumber(tokenRecord.input_tokens) +
      toFiniteNumber(tokenRecord.cache_read_input_tokens) +
      toFiniteNumber(tokenRecord.cache_creation_input_tokens)
    );
  }
  const promptTokens = toFiniteNumber(tokenRecord.prompt_tokens);
  return promptTokens;
}

// ── Provider format tests ───────────────────────────────────────────────

describe("detailed token extraction — per provider format", () => {
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
    // cache_write_tokens is in prompt_tokens_details but our function checks
    // cache_creation_input_tokens / cache_creation_tokens
    // OpenRouter uses cache_write_tokens which is NOT recognized → null
    assert.equal(
      getPromptCacheCreationTokensOrNull(tokens),
      null,
      "OpenRouter cache_write_tokens not mapped to creation"
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
