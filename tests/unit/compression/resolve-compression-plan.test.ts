import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveCompressionPlan } from "@omniroute/open-sse/services/compression/resolveCompressionPlan.ts";

const base = { enabled:true, engines:{ caveman:{enabled:true,level:"full"} }, activeComboId:null, comboOverrides:{} };
test("derived default when no override/active/header", () => {
  assert.deepEqual(resolveCompressionPlan(base, {}), { mode:"standard", stackedPipeline:[] });
});
test("routing-combo override wins over default", () => {
  const cfg = { ...base, comboOverrides:{ cmb:"aggressive" } };
  assert.equal(resolveCompressionPlan(cfg, { comboId:"cmb" }).mode, "aggressive");
});
test("active named combo wins over default (Phase 2 wiring uses combos table; here pass it in)", () => {
  const cfg = { ...base, activeComboId:"c1" };
  const combos = { c1: [{ engine:"rtk", intensity:"standard" }] };
  const plan = resolveCompressionPlan(cfg, { combos });
  assert.equal(plan.mode, "stacked");
  assert.deepEqual(plan.stackedPipeline, [{ engine:"rtk", intensity:"standard" }]);
});
test("master off => off regardless", () => {
  assert.equal(resolveCompressionPlan({ ...base, enabled:false }, {}).mode, "off");
});
