/**
 * Regression test for issue #10139 (follow-up to #6637).
 *
 * Reporter observed: for a model whose real output ceiling is only known via a
 * provider-scoped override (e.g. an operator-set `max_output_tokens` for
 * `opencode-go/qwen3.7-plus`, written through the dashboard's
 * `PUT /api/provider-models`), `fitThinkingToMaxTokens()` resolved the cap by
 * model name alone. The provider-scoped override was invisible to that lookup,
 * so the cap resolved to `null` and the synthesized `max_tokens` (caller's
 * `max_tokens` + the `reasoning_effort` thinking budget) went out unbounded —
 * `64000 + 131072 = 195072`, which the upstream provider rejected with a bare
 * `400 {"model":"qwen3.7-plus"}`.
 *
 * Root cause (confirmed by reading `fitThinkingToMaxTokens` and its caller in
 * `openai-to-claude.ts`): the caller already has `routedProvider` in scope
 * (used two lines earlier for the Kimi-coding check) but never passed it
 * through, so `safeCapMaxOutputTokens()` always resolved the model-only
 * capability entry and missed any provider-scoped override.
 *
 * Fix: `fitThinkingToMaxTokens()` takes an optional `provider` argument and
 * forwards it to `capMaxOutputTokens({ provider, model })`, which already
 * supports provider-scoped resolution; the caller now passes `routedProvider`.
 */
import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-repro-10139-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { setModelCapabilityOverride, removeModelCapabilityOverride } =
  await import("../../src/lib/db/modelCapabilityOverrides.ts");
const { fitThinkingToMaxTokens } =
  await import("../../open-sse/translator/request/openai-to-claude/thinkingBudget.ts");

const PROVIDER = "opencode-go";
const MODEL = "qwen3.7-plus";
const TARGET = `${PROVIDER}/${MODEL}`;
const REAL_UPSTREAM_OUTPUT_CAP = 131072; // per reporter's boundary test (131072 -> 200, 131073 -> 400)
const CALLER_MAX_TOKENS = 64000; // DEFAULT_MAX_TOKENS when the client sends none
const THINKING_BUDGET = 131072; // effortBudgetMap.high

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#10139: a provider-scoped-only output cap is invisible without a provider argument", () => {
  assert.ok(
    setModelCapabilityOverride(TARGET, "max_output_tokens", REAL_UPSTREAM_OUTPUT_CAP),
    "expected the max_output_tokens override to be written"
  );
  try {
    // Reproduces the pre-fix call shape: no provider passed.
    const result = fitThinkingToMaxTokens(MODEL, CALLER_MAX_TOKENS, {
      type: "enabled",
      budget_tokens: THINKING_BUDGET,
    });
    // This is the defect: with no provider, the override is invisible and the
    // synthesized max_tokens goes out unbounded (64000 + 131072 = 195072).
    assert.equal(
      result.maxTokens,
      CALLER_MAX_TOKENS + THINKING_BUDGET,
      "documents the pre-fix behavior: uncapped when provider is omitted"
    );
  } finally {
    removeModelCapabilityOverride(TARGET, "max_output_tokens");
  }
});

test("#10139: passing the routed provider resolves the override and clamps max_tokens", () => {
  assert.ok(
    setModelCapabilityOverride(TARGET, "max_output_tokens", REAL_UPSTREAM_OUTPUT_CAP),
    "expected the max_output_tokens override to be written"
  );
  try {
    const result = fitThinkingToMaxTokens(
      MODEL,
      CALLER_MAX_TOKENS,
      { type: "enabled", budget_tokens: THINKING_BUDGET },
      PROVIDER
    );
    assert.ok(
      result.maxTokens <= REAL_UPSTREAM_OUTPUT_CAP,
      `expected max_tokens to stay <= ${REAL_UPSTREAM_OUTPUT_CAP}, got ${result.maxTokens} ` +
        `(reproduces the reported 195072, upstream then 400s)`
    );
    assert.equal(result.maxTokens, REAL_UPSTREAM_OUTPUT_CAP);
    assert.equal(result.thinking?.budget_tokens, REAL_UPSTREAM_OUTPUT_CAP - CALLER_MAX_TOKENS);
  } finally {
    removeModelCapabilityOverride(TARGET, "max_output_tokens");
  }
});

test("#10139: no override present, provider argument is a no-op (unchanged behavior)", () => {
  const withoutProvider = fitThinkingToMaxTokens(MODEL, CALLER_MAX_TOKENS, {
    type: "enabled",
    budget_tokens: THINKING_BUDGET,
  });
  const withProvider = fitThinkingToMaxTokens(
    MODEL,
    CALLER_MAX_TOKENS,
    { type: "enabled", budget_tokens: THINKING_BUDGET },
    PROVIDER
  );
  assert.deepEqual(withProvider, withoutProvider);
});
