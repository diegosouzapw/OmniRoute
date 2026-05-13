import test from "node:test";
import assert from "node:assert/strict";
import { generateRoutingHints } from "../../open-sse/services/manifestAdapter.ts";

test("manifest routing generates hints without error", async () => {
  const hints = generateRoutingHints([], {
    messages: [{ content: "Test" }],
  });
  assert.equal(hints.specificityLevel, "trivial");
  assert.equal(hints.strategyModifier, "prefer-free");
});

test("manifest routing failure gracefully falls back - empty targets handled", async () => {
  const hints = generateRoutingHints([], {
    messages: [{ content: "Hello world" }],
  });
  assert.equal(hints.eligibleTargets.length, 0);
  assert.equal(hints.underqualifiedTargets.length, 0);
  assert.ok(hints.specificityLevel.length > 0);
});

test("specificity score is non-negative and bounded", async () => {
  const hints = generateRoutingHints([], {
    messages: [{ content: "Hello" }],
  });
  assert.ok(hints.specificity.score >= 0);
  assert.ok(hints.specificity.score <= 100);
});

test("routing hints contain all required fields", async () => {
  const hints = generateRoutingHints([], {
    messages: [{ content: "Test message" }],
  });
  assert.ok("specificityLevel" in hints);
  assert.ok("strategyModifier" in hints);
  assert.ok("recommendedMinTier" in hints);
  assert.ok("specificity" in hints);
  assert.ok("eligibleTargets" in hints);
  assert.ok("underqualifiedTargets" in hints);
});

test("trivial query recommends free tier", async () => {
  const hints = generateRoutingHints([], {
    messages: [{ content: "Hello" }],
  });
  assert.equal(hints.recommendedMinTier, "free");
});

test("full manifest routing flow overhead is minimal", async () => {
  const t0 = performance.now();
  for (let i = 0; i < 100; i++) {
    generateRoutingHints([], {
      messages: [{ content: "Test message for performance" }],
    });
  }
  const elapsed = performance.now() - t0;
  const avgMs = elapsed / 100;
  assert.ok(
    avgMs < 1,
    `Average manifest routing overhead should be < 1ms, got ${avgMs.toFixed(2)}ms`
  );
});

test("tier resolver module loads without error", async () => {
  const { classifyTier, clearTierCache } = await import("../../open-sse/services/tierResolver.ts");
  clearTierCache();
  const result = classifyTier("kiro", "claude-sonnet-4.5");
  assert.equal(result.tier, "free");
});

test("specificity detector module loads without error", async () => {
  const { analyzeSpecificity } = await import("../../open-sse/services/specificityDetector.ts");
  const result = analyzeSpecificity({
    messages: [{ content: "Test" }],
  });
  assert.ok(result.score >= 0);
});
