import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base/reasoningEffort.ts";

/**
 * Regression tests for #9318: OpenCode Zen DeepSeek models should accept `max`
 * reasoning effort (not normalized to `xhigh`).
 *
 * OpenCode Zen proxies DeepSeek with the native DeepSeek API contract, which
 * accepts {high, max} literally — same as opencode-go. Without this opt-in,
 * `max` would be normalized to `xhigh` and rejected by the upstream.
 */
describe("opencode-zen reasoning effort — max support (#9318)", () => {
  // ── max passes through for opencode-zen with DeepSeek models ──────────
  it("opencode-zen + deepseek model with max keeps max (not downgraded)", () => {
    const result = sanitizeReasoningEffortForProvider(
      { reasoning_effort: "max", messages: [{ role: "user", content: "hi" }] },
      "opencode-zen",
      "oc/deepseek-v4-flash-free"
    );
    assert.equal(
      (result as Record<string, unknown>).reasoning_effort,
      "max",
      "expected max to pass through for opencode-zen + deepseek"
    );
  });

  it("opencode-zen + deepseek-v4-pro with max keeps max", () => {
    const result = sanitizeReasoningEffortForProvider(
      { reasoning_effort: "max", messages: [] },
      "opencode-zen",
      "deepseek-v4-pro"
    );
    assert.equal(
      (result as Record<string, unknown>).reasoning_effort,
      "max",
      "expected max to pass through for opencode-zen + deepseek-v4-pro"
    );
  });

  // ── high passes through for opencode-zen with any model (already works) ─
  it("opencode-zen + non-deepseek model with high keeps high", () => {
    const result = sanitizeReasoningEffortForProvider(
      { reasoning_effort: "high", messages: [] },
      "opencode-zen",
      "oc/gpt-5"
    );
    assert.equal(
      (result as Record<string, unknown>).reasoning_effort,
      "high",
      "expected high to pass through for opencode-zen + non-deepseek model"
    );
  });

  // ── opencode (noauth) behavior unchanged ─────────────────────────────
  it("opencode (noauth) with max → normalized to xhigh (unchanged behavior)", () => {
    const result = sanitizeReasoningEffortForProvider(
      { reasoning_effort: "max", messages: [] },
      "opencode",
      "deepseek-v4-flash"
    );
    // opencode (noauth) is NOT in the supportsMaxEffortForProvider list, so
    // max normalizes to xhigh (which is the xhigh-opt-in fallback).
    // If xhigh is supported by the model, max→xhigh; otherwise max→high.
    const eff = (result as Record<string, unknown>).reasoning_effort;
    assert.ok(
      eff === "xhigh" || eff === "high",
      `expected max to normalize to xhigh or high for opencode (noauth), got ${eff}`
    );
  });

  it("opencode (noauth) with high keeps high", () => {
    const result = sanitizeReasoningEffortForProvider(
      { reasoning_effort: "high", messages: [] },
      "opencode",
      "deepseek-v4-flash"
    );
    assert.equal(
      (result as Record<string, unknown>).reasoning_effort,
      "high",
      "expected high to remain high for opencode (noauth)"
    );
  });

  // ── opencode-go effort tiers unaffected (regression guard) ────────────
  it("opencode-go + deepseek model with max keeps max (regression guard)", () => {
    const result = sanitizeReasoningEffortForProvider(
      { reasoning_effort: "max", messages: [] },
      "opencode-go",
      "deepseek-v4-pro"
    );
    assert.equal(
      (result as Record<string, unknown>).reasoning_effort,
      "max",
      "expected max to pass through for opencode-go + deepseek"
    );
  });

  it("opencode-go + non-deepseek model with max normalizes (regression guard)", () => {
    const result = sanitizeReasoningEffortForProvider(
      { reasoning_effort: "max", messages: [] },
      "opencode-go",
      "some-other-model"
    );
    // opencode-go only supports max for deepseek models; other models normalize
    const eff = (result as Record<string, unknown>).reasoning_effort;
    assert.ok(
      eff === "xhigh" || eff === "high",
      `expected max to normalize for opencode-go + non-deepseek model, got ${eff}`
    );
  });
});
