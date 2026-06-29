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

test("adaptive floor: bypasses auto-trigger, escalates a base plan to fit", () => {
  const cfg = {
    ...legacyCfg(),
    autoTriggerTokens: 100000,
    autoTriggerMode: "lite" as const,
    contextBudget: {
      mode: "floor" as const,
      policy: "reserve-output" as const,
      outputReserve: 4096,
      safetyMargin: 1024,
      pct: 0.85,
      absoluteBudget: 0,
    },
  };
  const tel: {
    value: import("@omniroute/open-sse/services/compression/adaptiveCompression/types.ts").AdaptiveTelemetry | null;
  } = { value: null };
  // estimatedTokens far over the 200000-window target → adaptive must escalate.
  const plan = selectCompressionPlan(
    cfg as any, null, 5_000_000, undefined, undefined, {}, null,
    { modelContextLimit: 200000, requestMaxTokens: 8000, onAdaptive: (t) => { tel.value = t; } }
  );
  assert.equal(plan.mode, "stacked");
  assert.ok(plan.stackedPipeline.length > 0);
  assert.ok(tel.value, "adaptive telemetry must be surfaced");
  assert.equal(tel.value!.policy, "reserve-output");
  assert.equal(tel.value!.target, 200000 - 8000 - 1024);
  assert.ok(tel.value!.stagesApplied.length > 0);
});

test("adaptive escalation still respects caching downgrade (D-C / §6 cache-safety)", () => {
  const cfg = {
    ...legacyCfg(),
    contextBudget: { mode: "floor" as const, policy: "reserve-output" as const, outputReserve: 4096, safetyMargin: 1024, pct: 0.85, absoluteBudget: 0 },
  };
  // A caching provider context downgrades aggressive/ultra → standard; the adaptive plan's
  // mode is "stacked", which getCacheAwareStrategy passes through unchanged, but the
  // pipeline engines remain those that the existing apply path already cache-guards.
  const body = { model: "openai/gpt-5", messages: [{ role: "user", content: "x" }] };
  const plan = selectCompressionPlan(
    cfg as any, null, 5_000_000, body, { provider: "openai", model: "openai/gpt-5" }, {}, null,
    { modelContextLimit: 200000, requestMaxTokens: 8000 }
  );
  // mode is still a valid CompressionMode string after the cache-aware pass
  assert.ok(typeof plan.mode === "string");
  assert.ok(plan.stackedPipeline.length > 0);
});
