import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { capThinkingBudget } from "../../src/lib/modelCapabilities.ts";
import {
  recordLearnedThinkingCap,
  __test_resetLearnedThinkingCaps,
} from "../../open-sse/services/learnedThinkingCaps.ts";

beforeEach(() => {
  __test_resetLearnedThinkingCaps();
});

after(() => {
  __test_resetLearnedThinkingCaps();
});

// ── Proactive Gemini fallback (no registry cap, no learned cap) ────────────

test("unregistered gemini model clamps xhigh budget to the 32768 fallback", () => {
  // gemini-2.5-pro has no MODEL_SPECS entry — previously the raw 131072 sailed
  // through to a 400. The gemini-substring fallback now clamps it.
  assert.equal(capThinkingBudget("gemini-2.5-pro", 131072), 32768);
});

test("gemini fallback is provider-agnostic (model-id driven, any provider)", () => {
  assert.equal(capThinkingBudget("openrouter/gemini-2.5-pro", 131072), 32768);
  assert.equal(capThinkingBudget("vertex/gemini-2.5-pro", 131072), 32768);
});

test("gemini fallback is case-insensitive on the model id", () => {
  assert.equal(capThinkingBudget("Gemini-2.5-Pro", 131072), 32768);
});

test("gemini fallback does not inflate a budget already below the cap", () => {
  assert.equal(capThinkingBudget("gemini-2.5-pro", 1024), 1024);
  assert.equal(capThinkingBudget("gemini-2.5-pro", 8192), 8192);
});

test("non-gemini unregistered model passes through unchanged (no fallback)", () => {
  assert.equal(capThinkingBudget("some-random-model", 131072), 131072);
  assert.equal(capThinkingBudget("qwen-something", 131072), 131072);
});

// ── Registry cap still wins for registered models ──────────────────────────

test("registered gemini-2.5-flash keeps its explicit 24576 cap (fallback does not override)", () => {
  assert.equal(capThinkingBudget("gemini-2.5-flash", 131072), 24576);
});

test("registered gemini-3.1-pro keeps its explicit 32768 cap", () => {
  assert.equal(capThinkingBudget("gemini-3.1-pro", 131072), 32768);
});

// ── Learned cap integration ────────────────────────────────────────────────

test("a learned cap lower than the registry cap wins", () => {
  // Registry says gemini-2.5-flash caps at 24576; the upstream actually rejected
  // 24576, so the learned 8192 must win on the next request. Bare model id
  // resolves to the native "gemini" provider for the learned-cap lookup.
  recordLearnedThinkingCap("gemini", "gemini-2.5-flash", 24576); // → 8192
  assert.equal(capThinkingBudget("gemini-2.5-flash", 131072), 8192);
});

test("a learned cap applies to an unregistered gemini model (overrides the 32768 fallback)", () => {
  // First request uses the 32768 fallback; suppose upstream rejects 32768 →
  // learned 24576. Next request must use 24576, not 32768.
  recordLearnedThinkingCap("openrouter", "gemini-2.5-pro", 32768); // → 24576
  assert.equal(capThinkingBudget("openrouter/gemini-2.5-pro", 131072), 24576);
});

test("learned caps are scoped per provider+model (no cross-contamination)", () => {
  recordLearnedThinkingCap("openrouter", "gemini-2.5-pro", 32768); // → 24576 on openrouter only
  // A different provider serving the same model id is unaffected (still fallback).
  assert.equal(capThinkingBudget("vertex/gemini-2.5-pro", 131072), 32768);
  // The native-gemini provider key is independent too.
  assert.equal(capThinkingBudget("gemini/gemini-2.5-pro", 131072), 32768);
  // A different model on the same provider keeps its own (registry) cap.
  assert.equal(capThinkingBudget("openrouter/gemini-2.5-flash", 131072), 24576); // registry cap
});
