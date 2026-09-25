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

// #14529 then kept lossy engines off the header-less path: the runtime replaces lossy steps with
// session-dedup + lite unless the request opts in (`allow-lossy`, `engine:<id>`, a named combo).
// The preview must follow — otherwise it shows rtk → caveman while requests run the safe pair,
// which is #12063 again. Every case below pins preview == runtime, not just a literal plan.
const SAFE_PIPELINE = [{ engine: "session-dedup" }, { engine: "lite" }];

function runtimePlan(config: CompressionConfig) {
  return selectCompressionPlan(
    config,
    /* comboId */ null,
    /* estimatedTokens */ 50_000,
    undefined,
    undefined,
    namedCombos,
    /* header */ null
  );
}

test("issue #12063: preview matches the real runtime plan when a profile is active", () => {
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    activeComboId: "standard-savings",
    // No individual engine toggled on the Settings page grid.
  };

  const realRuntimePlan = runtimePlan(config);
  assert.equal(realRuntimePlan.mode, "stacked");
  assert.deepEqual(realRuntimePlan.stackedPipeline, SAFE_PIPELINE);

  const previewPlan = deriveEffectivePreviewPlan(config, namedCombos);
  assert.equal(previewPlan.mode, realRuntimePlan.mode);
  assert.deepEqual(previewPlan.stackedPipeline, realRuntimePlan.stackedPipeline);

  // The profile itself still runs when the request opts in.
  const optedIn = selectCompressionPlan(
    config,
    null,
    50_000,
    undefined,
    undefined,
    namedCombos,
    "allow-lossy"
  );
  assert.deepEqual(optedIn.stackedPipeline, namedCombos["standard-savings"]);
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
    enginesExplicit: true,
    activeComboId: "does-not-exist",
    engines: { rtk: { enabled: true, level: "standard" } },
  };
  const preview = deriveEffectivePreviewPlan(config, namedCombos);
  const runtime = runtimePlan(config);
  // rtk is lossy, so the engines-derived plan is downgraded exactly as the runtime does it.
  assert.equal(preview.mode, runtime.mode);
  assert.deepEqual(preview.stackedPipeline, runtime.stackedPipeline);
  assert.deepEqual(preview.stackedPipeline, SAFE_PIPELINE);
});

test("no active profile => the engines-derived plan after the lossy policy, same as runtime", () => {
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    enginesExplicit: true,
    activeComboId: null,
    engines: { caveman: { enabled: true, level: "full" } },
  };
  const preview = deriveEffectivePreviewPlan(config, namedCombos);
  const runtime = runtimePlan(config);
  assert.equal(preview.mode, runtime.mode);
  assert.deepEqual(preview.stackedPipeline, runtime.stackedPipeline);
  assert.equal(preview.mode, "stacked");
});

test("a safe-only active profile is shown unchanged", () => {
  const combos = { safe: [{ engine: "session-dedup" }, { engine: "lite" }] };
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    activeComboId: "safe",
  };
  assert.deepEqual(deriveEffectivePreviewPlan(config, combos as never), {
    mode: "stacked",
    stackedPipeline: combos.safe,
  });
});
