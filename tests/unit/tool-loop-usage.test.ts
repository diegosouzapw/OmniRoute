import test from "node:test";
import assert from "node:assert/strict";

import { aggregateProviderLegUsage } from "../../src/lib/skills/serverOwnedToolLoop.ts";
import type { ProviderLegUsage } from "../../src/lib/skills/toolLoopTypes.ts";

// ─── Basic aggregation ────────────────────────────────────────────────────────

test("aggregateProviderLegUsage: sums prompt_tokens, completion_tokens, total_tokens", () => {
  const a: ProviderLegUsage = {
    prompt_tokens: 100,
    completion_tokens: 20,
    total_tokens: 120,
  };
  const b: ProviderLegUsage = {
    prompt_tokens: 150,
    completion_tokens: 80,
    total_tokens: 230,
  };

  const result = aggregateProviderLegUsage([a, b]);
  assert.strictEqual(result.prompt_tokens, 250);
  assert.strictEqual(result.completion_tokens, 100);
  assert.strictEqual(result.total_tokens, 350, "total_tokens rederived as prompt+completion");
});

// ─── Optional fields: present in at least one leg ────────────────────────────

test("aggregateProviderLegUsage: optional fields summed when present", () => {
  const a: ProviderLegUsage = {
    prompt_tokens: 10,
    completion_tokens: 5,
    total_tokens: 15,
    cached_tokens: 3,
    cache_read_input_tokens: 2,
    cache_creation_input_tokens: 1,
    reasoning_tokens: 4,
    cost_in_usd_ticks: 100,
  };
  const b: ProviderLegUsage = {
    prompt_tokens: 10,
    completion_tokens: 5,
    total_tokens: 15,
    // no optional fields
  };

  const result = aggregateProviderLegUsage([a, b]);
  assert.strictEqual(result.prompt_tokens, 20);
  assert.strictEqual(result.completion_tokens, 10);
  assert.strictEqual(result.total_tokens, 30);
  assert.strictEqual(result.cached_tokens, 3);
  assert.strictEqual(result.cache_read_input_tokens, 2);
  assert.strictEqual(result.cache_creation_input_tokens, 1);
  assert.strictEqual(result.reasoning_tokens, 4);
  assert.strictEqual(result.cost_in_usd_ticks, 100);
});

// ─── All-null usage → null ───────────────────────────────────────────────────

test("aggregateProviderLegUsage: all null usages → returns zero usage (not null)", () => {
  const result = aggregateProviderLegUsage([null, null]);
  assert.strictEqual(result.prompt_tokens, 0);
  assert.strictEqual(result.completion_tokens, 0);
  assert.strictEqual(result.total_tokens, 0);
});

test("aggregateProviderLegUsage: mix of null and non-null → sums only non-null", () => {
  const a: ProviderLegUsage = {
    prompt_tokens: 100,
    completion_tokens: 20,
    total_tokens: 120,
  };

  const result = aggregateProviderLegUsage([a, null]);
  assert.strictEqual(result.prompt_tokens, 100);
  assert.strictEqual(result.completion_tokens, 20);
  assert.strictEqual(result.total_tokens, 120);
});

// ─── total_tokens rederived ───────────────────────────────────────────────────

test("aggregateProviderLegUsage: total_tokens is always prompt+completion, not sum of raw total_tokens", () => {
  const a: ProviderLegUsage = {
    prompt_tokens: 100,
    completion_tokens: 20,
    total_tokens: 999, // wrong raw value
  };
  const b: ProviderLegUsage = {
    prompt_tokens: 100,
    completion_tokens: 20,
    total_tokens: 999, // wrong raw value
  };

  const result = aggregateProviderLegUsage([a, b]);
  assert.strictEqual(result.total_tokens, 240, "100+20 + 100+20 = 240, not 1998");
});

// ─── Optional fields absent when no leg defines them ──────────────────────────

test("aggregateProviderLegUsage: optional fields absent when no leg defines them", () => {
  const a: ProviderLegUsage = {
    prompt_tokens: 10,
    completion_tokens: 5,
    total_tokens: 15,
  };

  const result = aggregateProviderLegUsage([a]);
  assert.strictEqual(result.cached_tokens, undefined);
  assert.strictEqual(result.cache_read_input_tokens, undefined);
  assert.strictEqual(result.cache_creation_input_tokens, undefined);
  assert.strictEqual(result.reasoning_tokens, undefined);
  assert.strictEqual(result.cost_in_usd_ticks, undefined);
});

// ─── Empty array ──────────────────────────────────────────────────────────────

test("aggregateProviderLegUsage: empty array → zeros", () => {
  const result = aggregateProviderLegUsage([]);
  assert.strictEqual(result.prompt_tokens, 0);
  assert.strictEqual(result.completion_tokens, 0);
  assert.strictEqual(result.total_tokens, 0);
});

// ─── Claude-style alias normalization is caller's responsibility ──────────────

test("aggregateProviderLegUsage: Claude input_tokens/output_tokens are NOT aliases — caller must normalize before aggregation", () => {
  // Claude uses input_tokens/output_tokens, not prompt_tokens/completion_tokens.
  // The caller must normalize before passing to aggregateProviderLegUsage.
  // This test verifies that aggregateProviderLegUsage uses the standard field names.
  const a: ProviderLegUsage = {
    prompt_tokens: 100,
    completion_tokens: 20,
    total_tokens: 120,
  };

  const result = aggregateProviderLegUsage([a]);
  assert.strictEqual(result.prompt_tokens, 100);
  assert.strictEqual(result.completion_tokens, 20);
  // If someone passes input_tokens (Claude alias), it would be ignored
  const claudeStyle = {
    prompt_tokens: 0,
    completion_tokens: 0,
    total_tokens: 0,
    input_tokens: 50,
    output_tokens: 10,
  } as unknown as ProviderLegUsage;
  const result2 = aggregateProviderLegUsage([claudeStyle]);
  assert.strictEqual(result2.prompt_tokens, 0, "Claude alias not summed into prompt_tokens");
});
