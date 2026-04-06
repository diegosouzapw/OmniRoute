/**
 * Unit tests for getLoggedInputTokens fix — Anthropic / anthropic-compatible-cc
 *
 * The bug: Claude streaming sets prompt_tokens = input_tokens (non-cached only).
 * Fix: extractUsage in usageTracking.ts now sums input + cache_read + cache_creation
 * into prompt_tokens, consistent with the non-streaming extractor.
 *
 * getLoggedInputTokens itself also has a safety-net: when raw `input_tokens`
 * is present (e.g. from a raw API response), it adds cache tokens too.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Inline the fixed logic from tokenAccounting.ts ──────────────────────

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

  // prompt_tokens from translator/extractor already includes cache tokens
  const promptTokens = toFiniteNumber(tokenRecord.prompt_tokens);
  return promptTokens;
}

// ── Tests ────────────────────────────────────────────────────────────────

describe("getLoggedInputTokens — input fix for Anthropic streaming", () => {
  it("raw Anthropic usage with input_tokens: adds cache for correct total", () => {
    // Raw API response shape (before extractUsage processes it)
    const tokens = {
      input_tokens: 3,
      cache_read_input_tokens: 500,
      cache_creation_input_tokens: 100,
      output_tokens: 200,
    };
    assert.equal(getLoggedInputTokens(tokens), 603);
  });

  it("raw Anthropic usage: input_tokens=3, cache_creation=113613 → 113616", () => {
    const tokens = {
      input_tokens: 3,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 113613,
      output_tokens: 6921,
    };
    assert.equal(getLoggedInputTokens(tokens), 113616);
  });

  it("extracted streaming usage (after fix): prompt_tokens is total, no double-count", () => {
    // After the streaming extractor fix, message_start produces:
    // prompt_tokens = input_tokens + cache_read + cache_creation
    const tokens = {
      prompt_tokens: 113616, // already total (3 + 0 + 113613)
      completion_tokens: 6921,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 113613,
    };
    // No input_tokens field → falls to prompt_tokens → returns 113616 (no double-count)
    assert.equal(getLoggedInputTokens(tokens), 113616);
  });

  it("extracted non-streaming usage: prompt_tokens is total, no double-count", () => {
    // extractUsageFromResponse sets prompt_tokens = input + cacheRead + cacheCreation
    const tokens = {
      prompt_tokens: 113616,
      completion_tokens: 6921,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 113613,
    };
    assert.equal(getLoggedInputTokens(tokens), 113616);
  });

  it("OpenAI format: prompt_tokens=1000, no cache top-level fields → 1000", () => {
    const tokens = {
      prompt_tokens: 1000,
      completion_tokens: 500,
      total_tokens: 1500,
    };
    assert.equal(getLoggedInputTokens(tokens), 1000);
  });

  it("OpenAI format with cached_tokens in details (no top-level cache fields) → prompt_tokens", () => {
    const tokens = {
      prompt_tokens: 54042,
      completion_tokens: 8000,
      prompt_tokens_details: { cached_tokens: 53221 },
    };
    assert.equal(getLoggedInputTokens(tokens), 54042);
  });

  it("pre-computed 'input' field takes precedence over everything", () => {
    const tokens = {
      input: 999,
      prompt_tokens: 100,
      input_tokens: 50,
    };
    assert.equal(getLoggedInputTokens(tokens), 999);
  });

  it("handles null/undefined gracefully", () => {
    assert.equal(getLoggedInputTokens(null), 0);
    assert.equal(getLoggedInputTokens(undefined), 0);
    assert.equal(getLoggedInputTokens({}), 0);
  });
});
