/**
 * Vision Bridge Auto-Router Tests
 *
 * Moved from visionBridgeRouter.test.tsx (which was only collected by the
 * advisory `test:vitest:ui` script, never by the blocking `test:unit` /
 * `test:vitest` gates — see tests/unit/guardrails/*.test.ts glob in
 * package.json vs the `.tsx`-only include in vitest.config.ts). This file
 * has no JSX and needs no jsdom environment, so it belongs under node:test.
 *
 * Credential-usability checks are exercised via the `deps.hasUsableCredentials`
 * injection point on getBestVisionModel()/getFallbackModels() rather than by
 * mocking the `@/lib/db/providers` module: this project's Node native test
 * runner (`node:test`) has no supported ESM module-mocking mechanism (see
 * the "mock.module() is unavailable" notes across tests/unit/*.test.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";

const {
  getBestVisionModel,
  getFallbackModels,
  recordLatency,
  clearSelectionCache,
  getLatencyStats,
} = await import("../../../src/lib/guardrails/visionBridgeRouter.ts");
type VisionBridgeRouterDepsT =
  import("../../../src/lib/guardrails/visionBridgeRouter.ts").VisionBridgeRouterDeps;

// Fail-open default: credential store "unreadable" (indeterminate `null`),
// matching hasUsableCredentialsForModel's real behavior when the DB call
// throws. This mirrors pre-existing test expectations — every catalog
// candidate is still eligible when the credential store can't be checked.
const FAIL_OPEN_DEPS: VisionBridgeRouterDepsT = {
  hasUsableCredentials: async () => null,
};

test.beforeEach(() => {
  clearSelectionCache();
});

// ── getBestVisionModel ──────────────────────────────────────────────────────

test("getBestVisionModel — should return a vision-capable model", async () => {
  const model = await getBestVisionModel({}, FAIL_OPEN_DEPS);
  assert.ok(model);
  assert.equal(typeof model, "string");
});

test("getBestVisionModel — should respect fixed model override", async () => {
  const fixedModel = "openai/gpt-4o-mini";
  const model = await getBestVisionModel({ fixedModel }, FAIL_OPEN_DEPS);
  assert.equal(model, fixedModel);
});

test("getBestVisionModel — should exclude specified models", async () => {
  const model = await getBestVisionModel(
    { excludedModels: ["openai/gpt-4o-mini", "openai/gpt-4o"] },
    FAIL_OPEN_DEPS
  );
  assert.notEqual(model, "openai/gpt-4o-mini");
  assert.notEqual(model, "openai/gpt-4o");
});

test("getBestVisionModel — excludes a candidate with no usable active connection", async () => {
  // Every candidate reports a confirmed-unusable connection (`false`) ->
  // no candidate survives -> returns null instead of an unreachable default.
  const model = await getBestVisionModel(
    {},
    { hasUsableCredentials: async () => false }
  );
  assert.equal(model, null);
});

test(
  "getBestVisionModel — selects a credentialed candidate over an uncredentialed higher-priority one",
  async () => {
    // openai (priority 50, would normally win) has no usable connection;
    // every other vision-capable provider does.
    const model = await getBestVisionModel(
      {},
      {
        hasUsableCredentials: async (fullModelId) => fullModelId.split("/")[0] !== "openai",
      }
    );
    assert.equal(model.startsWith("openai/"), false);
  }
);

// ── getFallbackModels ───────────────────────────────────────────────────────

test("getFallbackModels — should return fallback models excluding the primary", async () => {
  const primary = "openai/gpt-4o-mini";
  const fallbacks = await getFallbackModels(primary, {}, FAIL_OPEN_DEPS);
  assert.ok(!fallbacks.includes(primary));
  assert.ok(fallbacks.length > 0);
});

test("getFallbackModels — should respect max fallback attempts", async () => {
  const fallbacks = await getFallbackModels(
    "openai/gpt-4o-mini",
    { maxFallbackAttempts: 2 },
    FAIL_OPEN_DEPS
  );
  assert.ok(fallbacks.length <= 2);
});

test(
  "getFallbackModels — does not include candidates with a confirmed-unusable connection",
  async () => {
    const fallbacks = await getFallbackModels(
      "openai/gpt-4o-mini",
      {},
      { hasUsableCredentials: async (fullModelId) => fullModelId.split("/")[0] !== "anthropic" }
    );
    assert.ok(!fallbacks.some((m) => m.startsWith("anthropic/")));
  }
);

// ── recordLatency / getLatencyStats ─────────────────────────────────────────

test("recordLatency — should record latency measurements", () => {
  recordLatency("test-model", 100, true);
  recordLatency("test-model", 150, true);
  recordLatency("test-model", 200, false);

  const stats = getLatencyStats();
  assert.ok(stats["test-model"]);
  assert.equal(stats["test-model"].samples, 3);
});

test("getLatencyStats — should return latency statistics", () => {
  recordLatency("model-a", 100, true);
  recordLatency("model-a", 120, true);
  recordLatency("model-b", 200, true);

  const stats = getLatencyStats();
  assert.ok(stats["model-a"]);
  assert.ok(stats["model-b"]);
  assert.equal(stats["model-a"].avg, 110);
  assert.equal(stats["model-a"].successRate, 1);
});
