import test from "node:test";
import assert from "node:assert/strict";

import {
  describeStickyRoundRobinLimit,
  isConnectionAwareExpansionStrategy,
  persistConnectionAwareExpansion,
  persistStickyRoundRobinLimit,
  parseStickyLimitInput,
  shouldShowPromptCacheAffinityHint,
  stickyLimitInputValue,
  triStateFromOptionalBoolean,
  optionalBooleanFromTriState,
} from "../../src/app/(dashboard)/dashboard/combos/comboRrLegibility.ts";

test("describeStickyRoundRobinLimit reports combo override first", () => {
  const described = describeStickyRoundRobinLimit(1, {
    stickyRoundRobinLimit: 3,
    comboStickyRoundRobinLimit: 2,
  });
  assert.deepEqual(described, { value: 1, source: "combo" });
});

test("describeStickyRoundRobinLimit reports combo-defaults when combo is unset", () => {
  const described = describeStickyRoundRobinLimit(undefined, {
    stickyRoundRobinLimit: 3,
    comboStickyRoundRobinLimit: 2,
  });
  assert.deepEqual(described, { value: 2, source: "combo-defaults" });
});

test("describeStickyRoundRobinLimit reports global default 3 when both overrides are empty", () => {
  const described = describeStickyRoundRobinLimit(undefined, {
    stickyRoundRobinLimit: 3,
    comboStickyRoundRobinLimit: null,
  });
  assert.deepEqual(described, { value: 3, source: "global" });
});

test("describeStickyRoundRobinLimit treats an empty combo-defaults string as unset", () => {
  const described = describeStickyRoundRobinLimit(undefined, {
    stickyRoundRobinLimit: 3,
    comboStickyRoundRobinLimit: "",
  });
  assert.deepEqual(described, { value: 3, source: "global" });
});

test("describeStickyRoundRobinLimit uses documented global 3 when the settings key is missing", () => {
  const described = describeStickyRoundRobinLimit(undefined, {});
  assert.deepEqual(described, { value: 3, source: "global" });
});

test("describeStickyRoundRobinLimit treats a null or empty global sticky as default 3", () => {
  assert.deepEqual(describeStickyRoundRobinLimit(undefined, { stickyRoundRobinLimit: null }), {
    value: 3,
    source: "global",
  });
  assert.deepEqual(describeStickyRoundRobinLimit(undefined, { stickyRoundRobinLimit: "" }), {
    value: 3,
    source: "global",
  });
});

test("stickyLimitInputValue maps a stored 0 to the clamped 1", () => {
  assert.equal(stickyLimitInputValue(0), "1");
  assert.equal(stickyLimitInputValue(""), "");
  assert.equal(stickyLimitInputValue(5), "5");
});

test("parseStickyLimitInput clamps 0 to 1 and leaves empty as inherit", () => {
  assert.equal(parseStickyLimitInput(""), undefined);
  assert.equal(parseStickyLimitInput("0"), 1);
  assert.equal(parseStickyLimitInput("-2"), 1);
  assert.equal(parseStickyLimitInput("1"), 1);
  assert.equal(parseStickyLimitInput("5"), 5);
});

test("persistStickyRoundRobinLimit clamps 0 to 1 and keeps a leftover on other strategies", () => {
  const autoSave = { stickyRoundRobinLimit: 3 };
  persistStickyRoundRobinLimit("auto", autoSave);
  assert.equal(autoSave.stickyRoundRobinLimit, 3);

  const zeroSave = { stickyRoundRobinLimit: 0 };
  persistStickyRoundRobinLimit("round-robin", zeroSave);
  assert.equal(zeroSave.stickyRoundRobinLimit, 1);

  const rrSave = { stickyRoundRobinLimit: 5 };
  persistStickyRoundRobinLimit("round-robin", rrSave);
  assert.equal(rrSave.stickyRoundRobinLimit, 5);
});

test("persistStickyRoundRobinLimit copies the form value onto a stripped save payload", () => {
  const configToSave: Record<string, unknown> = {};
  persistStickyRoundRobinLimit("round-robin", configToSave, { stickyRoundRobinLimit: 4 });
  assert.equal(configToSave.stickyRoundRobinLimit, 4);
});

test("isConnectionAwareExpansionStrategy is true for group-B and false for auto", () => {
  assert.equal(isConnectionAwareExpansionStrategy("round-robin"), true);
  assert.equal(isConnectionAwareExpansionStrategy("weighted"), true);
  assert.equal(isConnectionAwareExpansionStrategy("priority"), true);
  assert.equal(isConnectionAwareExpansionStrategy("auto"), false);
  assert.equal(isConnectionAwareExpansionStrategy("reset-aware"), false);
});

test("shouldShowPromptCacheAffinityHint only for rotation strategies with two pinned accounts", () => {
  assert.equal(shouldShowPromptCacheAffinityHint("round-robin", 2), true);
  assert.equal(shouldShowPromptCacheAffinityHint("weighted", 3), true);
  assert.equal(shouldShowPromptCacheAffinityHint("round-robin", 1), false);
  assert.equal(shouldShowPromptCacheAffinityHint("priority", 4), false);
});

test("tri-state maps inherit/on/off onto an optional boolean", () => {
  assert.equal(triStateFromOptionalBoolean(undefined), "inherit");
  assert.equal(triStateFromOptionalBoolean(true), "on");
  assert.equal(triStateFromOptionalBoolean(false), "off");
  assert.equal(optionalBooleanFromTriState("inherit"), undefined);
  assert.equal(optionalBooleanFromTriState("on"), true);
  assert.equal(optionalBooleanFromTriState("off"), false);
});

test("persistConnectionAwareExpansion keeps the flag on non-group-B strategies", () => {
  const autoSave = { connectionAwareExpansion: true, timeoutMs: 1 };
  persistConnectionAwareExpansion("auto", autoSave);
  assert.equal(autoSave.connectionAwareExpansion, true);
  assert.equal(autoSave.timeoutMs, 1);

  const rrSave = { connectionAwareExpansion: true };
  persistConnectionAwareExpansion("round-robin", rrSave);
  assert.equal(rrSave.connectionAwareExpansion, true);
});

test("persistConnectionAwareExpansion copies inherit/on/off from the form payload", () => {
  const inheritSave = { connectionAwareExpansion: true };
  persistConnectionAwareExpansion("round-robin", inheritSave, {});
  assert.equal("connectionAwareExpansion" in inheritSave, false);

  const onSave: Record<string, unknown> = {};
  persistConnectionAwareExpansion("round-robin", onSave, { connectionAwareExpansion: true });
  assert.equal(onSave.connectionAwareExpansion, true);
});

test("switching strategy away from the gating one keeps stickyRoundRobinLimit and connectionAwareExpansion", () => {
  const form = { stickyRoundRobinLimit: 4, connectionAwareExpansion: false, timeoutMs: 1 };
  for (const strategy of ["auto", "reset-aware"]) {
    const saved = { ...form };
    persistStickyRoundRobinLimit(strategy, saved);
    persistConnectionAwareExpansion(strategy, saved);
    assert.deepEqual(saved, form, strategy);
  }
});

test("editor group-B set matches the expander list", async () => {
  const { CONNECTION_AWARE_EXPANSION_GROUP_B } =
    await import("../../open-sse/services/combo/connectionAwareExpansion.ts");
  for (const strategy of CONNECTION_AWARE_EXPANSION_GROUP_B) {
    assert.equal(isConnectionAwareExpansionStrategy(strategy), true, strategy);
  }
  assert.equal(isConnectionAwareExpansionStrategy("auto"), false);
  assert.equal(isConnectionAwareExpansionStrategy("reset-aware"), false);
});
