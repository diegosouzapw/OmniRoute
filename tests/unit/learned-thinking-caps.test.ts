import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  getLearnedThinkingCap,
  recordLearnedThinkingCap,
  parseThinkingBudgetMax,
  __test_resetLearnedThinkingCaps,
} from "../../open-sse/services/learnedThinkingCaps.ts";

beforeEach(() => {
  __test_resetLearnedThinkingCaps();
});

after(() => {
  __test_resetLearnedThinkingCaps();
});

// ── parseThinkingBudgetMax ─────────────────────────────────────────────────

test("parseThinkingBudgetMax extracts 65535 from the real Gemini error body", () => {
  const err =
    "* GenerateContentRequest.generation_config.thinking_config.thinking_budget: " +
    "thinking_budget must be in the range [-1, 65535]";
  assert.equal(parseThinkingBudgetMax(err), 65535);
});

test("parseThinkingBudgetMax handles camelCase thinkingBudget variant", () => {
  const err = "generationConfig.thinkingConfig.thinkingBudget must be in the range [-1, 24576]";
  assert.equal(parseThinkingBudgetMax(err), 24576);
});

test("parseThinkingBudgetMax returns null for unrelated 400 text", () => {
  assert.equal(parseThinkingBudgetMax("some random upstream error"), null);
  assert.equal(parseThinkingBudgetMax(""), null);
  assert.equal(parseThinkingBudgetMax(null), null);
  assert.equal(parseThinkingBudgetMax(undefined), null);
});

test("parseThinkingBudgetMax returns null when thinking_budget mentioned but no range", () => {
  assert.equal(parseThinkingBudgetMax("thinking_budget is deprecated"), null);
});

// ── recordLearnedThinkingCap step ladder ───────────────────────────────────

test("recordLearnedThinkingCap steps 131072 → 32768 on first failure", () => {
  const next = recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 131072);
  assert.equal(next, 32768);
  assert.equal(getLearnedThinkingCap("gemini", "gemini-2.5-pro"), 32768);
});

test("recordLearnedThinkingCap steps 32768 → 24576 on second failure", () => {
  recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 131072);
  const next = recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 32768);
  assert.equal(next, 24576);
  assert.equal(getLearnedThinkingCap("gemini", "gemini-2.5-pro"), 24576);
});

test("recordLearnedThinkingCap steps 24576 → 8192 on third failure", () => {
  recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 131072);
  recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 32768);
  const next = recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 24576);
  assert.equal(next, 8192);
  assert.equal(getLearnedThinkingCap("gemini", "gemini-2.5-pro"), 8192);
});

test("recordLearnedThinkingCap returns null when steps exhausted (8192 failed)", () => {
  recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 131072);
  recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 32768);
  recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 24576);
  const next = recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 8192);
  assert.equal(next, null);
});

test("recordLearnedThinkingCap picks the first step strictly below failedBudget", () => {
  // A budget of 30000 failing should skip 32768 (not below) and land on 24576.
  const next = recordLearnedThinkingCap("gemini", "gemini-3.1-pro", 30000);
  assert.equal(next, 24576);
});

// ── getLearnedThinkingCap key handling ─────────────────────────────────────

test("getLearnedThinkingCap returns null for unknown provider+model", () => {
  assert.equal(getLearnedThinkingCap("gemini", "unknown-model"), null);
});

test("getLearnedThinkingCap is keyed case-insensitively on provider+model", () => {
  recordLearnedThinkingCap("Gemini", "Gemini-2.5-Pro", 131072);
  assert.equal(getLearnedThinkingCap("gemini", "gemini-2.5-pro"), 32768);
  assert.equal(getLearnedThinkingCap("GEMINI", "GEMINI-2.5-PRO"), 32768);
});

test("different providers for the same model id have independent caps", () => {
  recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 131072);
  assert.equal(getLearnedThinkingCap("openrouter", "gemini-2.5-pro"), null);
});

test("different models for the same provider have independent caps", () => {
  recordLearnedThinkingCap("gemini", "gemini-2.5-pro", 131072);
  assert.equal(getLearnedThinkingCap("gemini", "gemini-2.5-flash"), null);
});

test("handles empty/null provider or model gracefully", () => {
  assert.equal(getLearnedThinkingCap("", "gemini-2.5-pro"), null);
  assert.equal(getLearnedThinkingCap("gemini", ""), null);
  assert.equal(getLearnedThinkingCap(null, "gemini-2.5-pro"), null);
  assert.equal(getLearnedThinkingCap("gemini", null), null);
  assert.equal(recordLearnedThinkingCap("", "gemini-2.5-pro", 131072), null);
  assert.equal(recordLearnedThinkingCap("gemini", "", 131072), null);
});
