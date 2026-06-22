import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  selectCompressionStrategy,
  selectCompressionPlan,
  activeComboResolves,
} from "../../../open-sse/services/compression/strategySelector.ts";
import {
  DEFAULT_COMPRESSION_CONFIG,
  type CompressionConfig,
} from "../../../open-sse/services/compression/types.ts";

const combos = { c1: [{ engine: "rtk", intensity: "standard" }, { engine: "caveman", intensity: "full" }] };

function cfg(overrides: Partial<CompressionConfig> = {}): CompressionConfig {
  return { ...DEFAULT_COMPRESSION_CONFIG, enabled: true, ...overrides };
}

describe("active named combo resolution (Phase 2)", () => {
  it("activeComboId + combo present => that combo's stacked pipeline (regardless of enginesExplicit)", () => {
    const config = cfg({ activeComboId: "c1", enginesExplicit: false });
    const plan = selectCompressionPlan(config, null, 0, undefined, undefined, combos);
    assert.equal(plan.mode, "stacked");
    assert.deepEqual(plan.stackedPipeline, combos.c1);
  });
  it("activeComboId null => falls through to derived default (not the combo)", () => {
    const config = cfg({ activeComboId: null, enginesExplicit: true, engines: { rtk: { enabled: true } } });
    assert.equal(selectCompressionStrategy(config, null, 0, undefined, undefined, combos), "rtk");
  });
  it("activeComboId set but combo missing => graceful fall-through to default", () => {
    const config = cfg({ activeComboId: "ghost", defaultMode: "lite", enginesExplicit: false });
    assert.equal(selectCompressionStrategy(config, null, 0, undefined, undefined, combos), "lite");
  });
  it("routing-combo override wins over the active profile", () => {
    const config = cfg({ activeComboId: "c1", comboOverrides: { "my-combo": "off" } });
    assert.equal(selectCompressionStrategy(config, "my-combo", 0, undefined, undefined, combos), "off");
  });
  it("active profile wins over auto-trigger", () => {
    const config = cfg({ activeComboId: "c1", autoTriggerTokens: 1000, autoTriggerMode: "aggressive" });
    assert.equal(selectCompressionStrategy(config, null, 5000, undefined, undefined, combos), "stacked");
  });
});

describe("activeComboResolves", () => {
  it("true only when activeComboId is set AND present in combos", () => {
    assert.equal(activeComboResolves(cfg({ activeComboId: "c1" }), combos), true);
    assert.equal(activeComboResolves(cfg({ activeComboId: "ghost" }), combos), false);
    assert.equal(activeComboResolves(cfg({ activeComboId: null }), combos), false);
  });
});
