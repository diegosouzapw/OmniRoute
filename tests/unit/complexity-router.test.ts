/**
 * tests/unit/complexity-router.test.ts
 *
 * 2026 strategy: request-complexity classification → recommended tier, with an
 * explicit tool-use escalation. Validates the classifier facade over the
 * existing specificity detector.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyRequestComplexity,
  escalateTier,
  buildComplexityRoutingHint,
} from "../../open-sse/services/autoCombo/complexityRouter.ts";

const NOOP_LOG = { info: () => {} };

function modelTargets(): Parameters<typeof buildComplexityRoutingHint>[0] {
  return [
    {
      kind: "model",
      provider: "openai",
      model: "gpt-4o-mini",
      modelStr: "openai/gpt-4o-mini",
      executionKey: "k1",
      stepId: "s1",
    },
  ] as unknown as Parameters<typeof buildComplexityRoutingHint>[0];
}

test("escalateTier — raises to the floor, never lowers", () => {
  assert.equal(escalateTier("free", "cheap"), "cheap");
  assert.equal(escalateTier("free", "premium"), "premium");
  assert.equal(escalateTier("premium", "cheap"), "premium");
  assert.equal(escalateTier("cheap", "free"), "cheap");
  assert.equal(escalateTier("cheap", "cheap"), "cheap");
});

test("classifyRequestComplexity — a trivial prompt stays cheap/free with no tool signal", () => {
  const c = classifyRequestComplexity({ messages: [{ role: "user", content: "hi there" }] });
  assert.equal(c.hasToolUse, false);
  assert.equal(c.recommendedTier, "free");
  assert.ok(["trivial", "simple"].includes(c.level), `expected low level, got ${c.level}`);
});

test("classifyRequestComplexity — a hard, multi-step coding+reasoning prompt scores higher", () => {
  const trivial = classifyRequestComplexity({ messages: [{ role: "user", content: "hi" }] });
  const hard = classifyRequestComplexity({
    messages: [
      {
        role: "user",
        content:
          "First, analyze this TypeScript module for race conditions:\n" +
          "```ts\nasync function f(){ /* ... */ }\n```\n" +
          "Then, step by step, prove the time complexity is O(n log n), " +
          "derive the recurrence relation, and refactor it to remove the data race. " +
          "Finally, explain the trade-offs of each approach in depth.",
      },
    ],
  });
  assert.ok(hard.score > trivial.score, `hard (${hard.score}) must exceed trivial (${trivial.score})`);
});

test("classifyRequestComplexity — tool schemas escalate the tier above free", () => {
  const c = classifyRequestComplexity({
    messages: [{ role: "user", content: "weather?" }],
    tools: [
      {
        function: {
          name: "get_weather",
          description: "Get the weather",
          parameters: { type: "object", properties: { city: { type: "string" } } },
        },
      },
    ],
  });
  assert.equal(c.hasToolUse, true);
  assert.notEqual(c.recommendedTier, "free", "tool-using requests must not route to the free tier");
});

test("buildComplexityRoutingHint — a tool-using request floors the hint tier above free", () => {
  const hint = buildComplexityRoutingHint(
    modelTargets(),
    {
      messages: [{ role: "user", content: "weather?" }],
      tools: [{ function: { name: "get_weather", description: "Get the weather", parameters: {} } }],
    },
    NOOP_LOG
  );
  assert.ok(hint, "expected a non-null hint when complexity routing builds successfully");
  if (!hint) return;
  assert.notEqual(
    hint.recommendedMinTier,
    "free",
    "tool-use must floor the recommended tier at cheap (escalation applied)"
  );
});

test("buildComplexityRoutingHint — a null body is safe and still builds a tier-neutral hint", () => {
  const hint = buildComplexityRoutingHint(modelTargets(), null, NOOP_LOG);
  assert.ok(hint, "a null body must not throw — messages default to [] and a hint is built");
  if (!hint) return;
  assert.ok(
    ["free", "cheap", "premium"].includes(hint.recommendedMinTier),
    `unexpected tier ${hint.recommendedMinTier}`
  );
});
