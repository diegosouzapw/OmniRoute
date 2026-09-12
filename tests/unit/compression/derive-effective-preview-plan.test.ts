import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_COMPRESSION_CONFIG,
  type CompressionConfig,
} from "@omniroute/open-sse/services/compression/types.ts";
import { selectCompressionPlan } from "@omniroute/open-sse/services/compression/strategySelector.ts";
import { deriveEffectivePreviewPlan } from "@omniroute/open-sse/services/compression/deriveEffectivePreviewPlan.ts";

// Issue #12063: the dashboard shows an "active profile" selected (e.g. "Standard Savings",
// pipeline rtk:standard -> caveman:full on /dashboard/context/combos), but the Settings-page
// "Effective pipeline" preview disagreed with what a live request actually runs, because it
// was computed as deriveDefaultPlan(config.engines, config.enabled) -- which never consults
// config.activeComboId, unlike the real per-request resolver (resolveBasePlan).
// deriveEffectivePreviewPlan() closes that gap for static preview surfaces.

const namedCombos = {
  "standard-savings": [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ],
};

test("issue #12063: preview matches the real runtime plan when a profile is active", () => {
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    activeComboId: "standard-savings",
    // No individual engine toggled on the Settings page grid.
  };

  const realRuntimePlan = selectCompressionPlan(
    config,
    /* comboId */ null,
    /* estimatedTokens */ 50_000,
    undefined,
    undefined,
    namedCombos,
    /* header */ null
  );
  assert.equal(realRuntimePlan.mode, "stacked");
  assert.deepEqual(realRuntimePlan.stackedPipeline, namedCombos["standard-savings"]);

  const previewPlan = deriveEffectivePreviewPlan(config, namedCombos);
  assert.equal(previewPlan.mode, realRuntimePlan.mode);
  assert.deepEqual(previewPlan.stackedPipeline, realRuntimePlan.stackedPipeline);
});

test("master switch off => off, regardless of an active profile", () => {
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: false,
    activeComboId: "standard-savings",
  };
  assert.deepEqual(deriveEffectivePreviewPlan(config, namedCombos), {
    mode: "off",
    stackedPipeline: [],
  });
});

test("activeComboId set but unresolved in combos => falls back to the engines map", () => {
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    activeComboId: "does-not-exist",
    engines: { rtk: { enabled: true, level: "standard" } },
  };
  const preview = deriveEffectivePreviewPlan(config, namedCombos);
  assert.equal(preview.mode, "rtk");
});

test("no active profile => matches deriveDefaultPlan(engines, enabled) exactly", () => {
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    activeComboId: null,
    engines: { caveman: { enabled: true, level: "full" } },
  };
  const preview = deriveEffectivePreviewPlan(config, namedCombos);
  assert.equal(preview.mode, "standard");
  assert.deepEqual(preview.stackedPipeline, []);
});
