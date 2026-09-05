// #11295 — the learned clamp (reactive, from upstream 4xx) and the declared
// clamp (static registry `supportedThinkingEfforts`) used to disagree on
// direction for the identical accepted set {low,high,max}: the learned path
// was downgrade-only (medium -> low) while the declared path was already
// nearest-tier (medium -> high). Same inputs, opposite outputs, depending only
// on whether the model happened to have a static registry entry. This test
// proves the two paths now agree, and that a request below the learned floor
// (previously silently passed through unmapped, returning null from
// clampToLearned) is now mapped up to the nearest accepted tier instead.
import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { clampToLearned } from "../../../open-sse/services/learnedReasoningEffortCaps.ts";
import { sanitizeReasoningEffortForProvider } from "../../../open-sse/executors/base/reasoningEffort.ts";
import {
  recordLearnedReasoningEffort,
  __test_resetLearnedReasoningEffortCaps,
} from "../../../open-sse/services/learnedReasoningEffortCaps.ts";

beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
});

after(() => {
  __test_resetLearnedReasoningEffortCaps();
});

test("clampToLearned: nearest-tier medium -> high when accepted is {low,high,max} (was low pre-#11295)", () => {
  assert.equal(clampToLearned("medium", new Set(["low", "high", "max"])), "high");
});

test("sanitizeReasoningEffortForProvider maps medium identically for a LEARNED-only model and a DECLARED model with the same {low,high,max} accepted set", () => {
  // Learned side: a custom OpenAI-compatible connection that has no static
  // registry entry — the only source of truth is the reactively-learned set.
  recordLearnedReasoningEffort("acme-oai-compatible", "custom-reasoner", [
    "low",
    "high",
    "max",
  ]);
  const learnedResult = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "medium" },
    "acme-oai-compatible",
    "custom-reasoner"
  ) as Record<string, unknown>;

  // Declared side: opencode-go/ox-alpha-free, whose registry entry declares
  // supportedThinkingEfforts: ["low", "high", "max"] (see reasoningEffort.ts
  // comment referencing the Console Go 400 case).
  const declaredResult = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "medium" },
    "opencode-go",
    "ox-alpha-free"
  ) as Record<string, unknown>;

  assert.equal(learnedResult.reasoning_effort, "high");
  assert.equal(declaredResult.reasoning_effort, "high");
  assert.equal(learnedResult.reasoning_effort, declaredResult.reasoning_effort);
});

test("sub-floor request (none) on a learned-only model with floor {low,high,max} maps to low, not a pass-through null-clamp", () => {
  recordLearnedReasoningEffort("acme-oai-compatible", "custom-reasoner-2", [
    "low",
    "high",
    "max",
  ]);
  const result = sanitizeReasoningEffortForProvider(
    { reasoning_effort: "none" },
    "acme-oai-compatible",
    "custom-reasoner-2"
  ) as Record<string, unknown>;
  assert.equal(result.reasoning_effort, "low");
});

test("clampToLearned: sub-floor demand (none) below accepted {low,high,max} maps to the accepted floor (low), not null", () => {
  assert.equal(clampToLearned("none", new Set(["low", "high", "max"])), "low");
});

test("clampToLearned: sub-floor demand (low) below accepted {high,max} maps to the accepted floor (high), not null", () => {
  assert.equal(clampToLearned("low", new Set(["high", "max"])), "high");
});
