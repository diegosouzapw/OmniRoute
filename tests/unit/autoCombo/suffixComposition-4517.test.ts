/**
 * Unit tests for the `auto/<category>:<tier>` suffix composition filter.
 *
 * See: `open-sse/services/autoCombo/suffixComposition.ts`
 *
 * Focus: the `:free` tier filter. Regression test for the bug where
 * opencode (noAuth, free) and mimocode (noAuth, free) were NOT being
 * included in the free pool because the legacy `freeProviders` list
 * only contained paid-API-key providers with free tiers (kiro, qoder, ...).
 *
 * #4517.
 */
// NOTE: tests/unit/autoCombo/ is a vitest-only scope (the node:test runner in
// test:unit:ci does not walk this dir), so this suite uses the vitest API even
// though it asserts via node:assert. (#4753 originally landed it with node:test
// imports → vitest reported "No test suite found" and the test ran nowhere.)
import { describe, it, beforeAll, afterAll, beforeEach } from "vitest";
import assert from "node:assert/strict";
import {
  buildAutoCandidateFilter,
  parseAutoSuffix,
} from "../../../open-sse/services/autoCombo/suffixComposition";

describe("suffixComposition :free tier (#4517)", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeAll(() => {
    // Snapshot env so we can restore it after each test.
  });

  beforeEach(() => {
    // Reset env to a known state so OMNIROUTE_AUTO_FREE_FALLBACK_TO_FULL_POOL
    // doesn't leak between cases.
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it("parseAutoSuffix recognizes coding:free", () => {
    assert.deepEqual(parseAutoSuffix("coding:free"), {
      valid: true,
      category: "coding",
      tier: "free",
    });
  });

  it("buildAutoCandidateFilter keeps noAuth free providers", () => {
    // Regression: opencode and mimocode are noAuth and free, but the
    // pre-fix `freeProviders` list omitted them, so the filter rejected
    // their candidates even though they ARE free upstream.
    const filter = buildAutoCandidateFilter("coding", "free");
    assert.notEqual(filter, null);

    assert.equal(filter!({ provider: "opencode", model: "big-pickle" }), true);
    assert.equal(filter!({ provider: "opencode", model: "minimax-m3-free" }), true);
    assert.equal(filter!({ provider: "mimocode", model: "mimo-auto" }), true);
    assert.equal(filter!({ provider: "duckduckgo-web", model: "gpt-4o-mini" }), true);
  });

  it("buildAutoCandidateFilter keeps legacy free providers", () => {
    // Don't break the existing list — kiro, qoder, groq, etc. must still pass.
    const filter = buildAutoCandidateFilter("coding", "free");
    assert.equal(filter!({ provider: "kiro", model: "claude-sonnet-4-5" }), true);
    assert.equal(filter!({ provider: "groq", model: "llama-3.3-70b" }), true);
    assert.equal(filter!({ provider: "qoder", model: "qwen3-coder-plus" }), true);
  });

  it("buildAutoCandidateFilter rejects paid models under :free", () => {
    // The bug: opencode-go/glm-5.1 was being picked because the filter
    // fell back to the full pool when no free candidate was found.
    // After the fix, glm-5.1 must be rejected by the :free filter.
    const filter = buildAutoCandidateFilter("coding", "free");
    assert.equal(filter!({ provider: "opencode-go", model: "glm-5.1" }), false);
    assert.equal(filter!({ provider: "openai", model: "gpt-4o" }), false);
    assert.equal(filter!({ provider: "anthropic", model: "claude-sonnet-4-6" }), false);
    assert.equal(filter!({ provider: "deepseek", model: "deepseek-chat" }), false);
  });

  it("buildAutoCandidateFilter returns null for category-only (no tier)", () => {
    // "coding" with no tier must NOT filter by tier — pass-through.
    const filter = buildAutoCandidateFilter("coding", undefined);
    assert.equal(filter, null);
  });

  it("buildAutoCandidateFilter keeps free candidates alongside capability checks", () => {
    // The category and tier checks are AND-combined. For "coding:free" the
    // category check is a pass-through (no vision/reasoning filter), so
    // any free model should be kept.
    const filter = buildAutoCandidateFilter("coding", "free");
    assert.equal(filter!({ provider: "opencode", model: "minimax-m3-free" }), true);
    // The "reasoning" category also pairs with ":free" and keeps free models.
    const reasoningFilter = buildAutoCandidateFilter("reasoning", "free");
    // big-pickle (model_capabilities: reasoning=1) should pass the reasoning check.
    assert.equal(reasoningFilter!({ provider: "opencode", model: "big-pickle" }), true);
  });
});
