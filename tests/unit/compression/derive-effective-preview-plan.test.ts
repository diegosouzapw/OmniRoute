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
  // The profile itself is lossy (rtk/caveman) and the runtime request carries no
  // opt-in header, so the lossy-request policy downgrades BOTH the live plan and
  // the preview to the safe dedup+whitespace pipeline (#12063 parity).
  assert.deepEqual(realRuntimePlan.stackedPipeline, [
    { engine: "session-dedup" },
    { engine: "lite" },
  ]);

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
    // Panel-saved engines map (enginesExplicit) so the engines map — not the
    // legacy defaultMode — drives the default. session-dedup + lite are the
    // lossless safe engines, so the derived stacked pipeline survives the
    // lossy-request policy unchanged (matching what a live request runs).
    enginesExplicit: true,
    engines: {
      "session-dedup": { enabled: true },
      lite: { enabled: true },
    },
  };
  const preview = deriveEffectivePreviewPlan(config, namedCombos);
  assert.equal(preview.mode, "stacked");
  assert.deepEqual(preview.stackedPipeline, [
    { engine: "session-dedup" },
    { engine: "lite" },
  ]);
});

test("lossy engines-derived default is downgraded like the live runtime plan", () => {
  // resolveBasePlan ends with applyLossyRequestPolicy; the preview must agree.
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    activeComboId: "does-not-exist",
    enginesExplicit: true,
    engines: { rtk: { enabled: true, level: "standard" } },
  };
  const preview = deriveEffectivePreviewPlan(config, namedCombos);
  assert.equal(preview.mode, "stacked");
  assert.deepEqual(preview.stackedPipeline, [
    { engine: "session-dedup" },
    { engine: "lite" },
  ]);
});

test("no active profile => matches what a live header-less request runs", () => {
  const config: CompressionConfig = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    activeComboId: null,
    engines: { caveman: { enabled: true, level: "full" } },
  };
  // The single lossy engine derives mode "standard" before the lossy-request
  // policy downgrades it — the preview must show the downgraded plan, because
  // that is what a header-less live request actually runs.
  const livePlan = selectCompressionPlan(
    config,
    /* comboId */ null,
    /* estimatedTokens */ 50_000,
    undefined,
    undefined,
    namedCombos,
    /* header */ null
  );
  const preview = deriveEffectivePreviewPlan(config, namedCombos);
  assert.equal(preview.mode, livePlan.mode);
  assert.deepEqual(preview.stackedPipeline, livePlan.stackedPipeline);
});
