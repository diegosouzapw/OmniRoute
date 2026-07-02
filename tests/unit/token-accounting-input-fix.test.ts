/**
 * Unit tests for getLoggedInputTokens fix — Anthropic / anthropic-compatible-cc
 *
 * getLoggedInputTokens has a safety-net: when raw `input_tokens` is present
 * (e.g. from a raw API response), it adds cache tokens too. When both
 * `prompt_tokens` and `input_tokens` are present, `prompt_tokens` wins because
 * stream translators keep `input_tokens` as a compatibility alias.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getLoggedInputTokens } from "../../src/lib/usage/tokenAccounting.ts";

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

  it("translated Claude stream usage: prompt_tokens wins over compatibility input_tokens", () => {
    const tokens = {
      prompt_tokens: 600_000,
      input_tokens: 600_000,
      completion_tokens: 1_000,
      output_tokens: 1_000,
      cache_read_input_tokens: 600_000,
    };
    assert.equal(getLoggedInputTokens(tokens), 600_000);
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
