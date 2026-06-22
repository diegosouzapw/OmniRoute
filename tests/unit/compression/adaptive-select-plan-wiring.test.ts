import { test } from "node:test";
import assert from "node:assert/strict";
import {
  selectCompressionPlan,
  shouldAutoTrigger,
} from "@omniroute/open-sse/services/compression/strategySelector.ts";
import { getDefaultCompressionConfig } from "@omniroute/open-sse/services/compression/stats.ts";

function legacyCfg() {
  return {
    ...getDefaultCompressionConfig(),
    enabled: true,
    enginesExplicit: false,
    defaultMode: "lite" as const,
    autoTriggerMode: "aggressive" as const,
    autoTriggerTokens: 100000,
  };
}

test("no contextBudget → auto-trigger path is byte-identical to legacy", () => {
  const cfg = legacyCfg(); // no contextBudget field
  // under threshold → derived default ("lite")
  const small = selectCompressionPlan(cfg, null, 1000);
  assert.equal(small.mode, "lite");
  // over threshold → auto-trigger fires → "aggressive"
  const big = selectCompressionPlan(cfg, null, 200000);
  assert.equal(big.mode, "aggressive");
  assert.equal(shouldAutoTrigger(cfg, 200000), true);
});

test("contextBudget.mode='off' → identical to no contextBudget", () => {
  const cfg = { ...legacyCfg(), contextBudget: { mode: "off" as const } };
  assert.equal(selectCompressionPlan(cfg as any, null, 200000).mode, "aggressive");
});
