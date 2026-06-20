import test from "node:test";
import assert from "node:assert/strict";

import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";

// Verifies the Claude Code (`cc`) provider pricing block matches Anthropic's
// officially published per-MTok rates. Sourced from
// https://platform.claude.com/docs/en/about-claude/pricing
// (verified by the upstream PR decolua/9router#275 and re-verified at port time).
//
// Pricing schema multipliers (per Anthropic):
//   - 5-minute cache write = 1.25x input
//   - cache hit (cached)   = 0.1x input
//   - reasoning tokens are billed at the OUTPUT rate

test("cc/claude-opus-4-6 matches Anthropic Opus 4.6 pricing", () => {
  const p = getDefaultPricing().cc["claude-opus-4-6"];
  assert.equal(p.input, 5.0);
  assert.equal(p.output, 25.0);
  assert.equal(p.cached, 0.5);
  assert.equal(p.reasoning, 25.0);
  assert.equal(p.cache_creation, 6.25);
});

test("cc/claude-opus-4-7 matches Anthropic Opus 4.7 pricing", () => {
  const p = getDefaultPricing().cc["claude-opus-4-7"];
  assert.equal(p.input, 5.0);
  assert.equal(p.output, 25.0);
  assert.equal(p.cached, 0.5);
  assert.equal(p.reasoning, 25.0);
  assert.equal(p.cache_creation, 6.25);
});

test("cc/claude-opus-4-8 matches Anthropic Opus 4.8 pricing", () => {
  const p = getDefaultPricing().cc["claude-opus-4-8"];
  assert.equal(p.input, 5.0);
  assert.equal(p.output, 25.0);
  assert.equal(p.cached, 0.5);
  assert.equal(p.reasoning, 25.0);
  assert.equal(p.cache_creation, 6.25);
});

test("cc/claude-opus-4-5-20251101 matches Anthropic Opus 4.5 pricing", () => {
  const p = getDefaultPricing().cc["claude-opus-4-5-20251101"];
  assert.equal(p.input, 5.0);
  assert.equal(p.output, 25.0);
  assert.equal(p.cached, 0.5);
  assert.equal(p.reasoning, 25.0);
  assert.equal(p.cache_creation, 6.25);
});

test("cc/claude-sonnet-4-6 matches Anthropic Sonnet 4.6 pricing", () => {
  const p = getDefaultPricing().cc["claude-sonnet-4-6"];
  assert.equal(p.input, 3.0);
  assert.equal(p.output, 15.0);
  assert.equal(p.cached, 0.3);
  assert.equal(p.reasoning, 15.0);
  assert.equal(p.cache_creation, 3.75);
});

test("cc/claude-sonnet-4-5-20250929 matches Anthropic Sonnet 4.5 pricing", () => {
  const p = getDefaultPricing().cc["claude-sonnet-4-5-20250929"];
  assert.equal(p.input, 3.0);
  assert.equal(p.output, 15.0);
  assert.equal(p.cached, 0.3);
  assert.equal(p.reasoning, 15.0);
  assert.equal(p.cache_creation, 3.75);
});

test("cc/claude-haiku-4-5-20251001 matches Anthropic Haiku 4.5 pricing", () => {
  const p = getDefaultPricing().cc["claude-haiku-4-5-20251001"];
  assert.equal(p.input, 1.0);
  assert.equal(p.output, 5.0);
  assert.equal(p.cached, 0.1);
  assert.equal(p.reasoning, 5.0);
  assert.equal(p.cache_creation, 1.25);
});

test("cc/claude-fable-5 matches Anthropic Fable 5 pricing", () => {
  const p = getDefaultPricing().cc["claude-fable-5"];
  assert.equal(p.input, 10.0);
  assert.equal(p.output, 50.0);
  assert.equal(p.cached, 1.0);
  assert.equal(p.reasoning, 50.0);
  assert.equal(p.cache_creation, 12.5);
});
