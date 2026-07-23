import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { findModel } = await import("../../open-sse/executors/inner-ai.ts");

// Regression guard for the escalated bug "On Inner.ai the only model that seems to
// respond is gpt-4o". The live model list is plan-gated, so a requested model the
// plan does not expose used to silently fall back to `models[0]` (the first entry,
// typically gpt-4o) instead of returning null. That rerouted every unmatched model
// to gpt-4o with no error. findModel must return null on no match so the caller can
// pass the *requested* model through as a synthetic entry.
const PLAN_MODELS = [
  { id: "u1", llm_model: "gpt-4o" },
  { id: "u2", llm_model: "gpt-4.1" },
  { id: "u3", llm_model: "claude-opus-4-5" },
];

describe("inner-ai findModel", () => {
  it("returns null (not models[0]) when the requested model is not in the plan list", () => {
    const result = findModel(PLAN_MODELS, "gemini-2.5-pro");
    assert.equal(
      result,
      null,
      "unmatched model must NOT silently fall back to the first plan model (gpt-4o)"
    );
  });

  it("returns null for an empty model list", () => {
    assert.equal(findModel([], "gpt-4o"), null);
  });

  it("matches exactly by llm_model", () => {
    assert.equal(findModel(PLAN_MODELS, "gpt-4.1")?.id, "u2");
  });

  it("matches case-insensitively", () => {
    assert.equal(findModel(PLAN_MODELS, "GPT-4O")?.id, "u1");
  });

  it("matches by substring (requested id contained in llm_model)", () => {
    const models = [
      { id: "a", llm_model: "anthropic/claude-opus-4-5-20260101" },
      { id: "b", llm_model: "gpt-4o" },
    ];
    assert.equal(findModel(models, "claude-opus-4-5")?.id, "a");
  });
});
