import { test } from "node:test";
import assert from "node:assert/strict";
import { deriveDefaultPlan } from "@omniroute/open-sse/services/compression/deriveDefaultPlan.ts";

const on = (level?: string) => ({ enabled: true, ...(level ? { level } : {}) });

test("master off / empty / none-on => off", () => {
  assert.deepEqual(deriveDefaultPlan({}, false), { mode: "off", stackedPipeline: [] });
  assert.deepEqual(deriveDefaultPlan({}, true), { mode: "off", stackedPipeline: [] });
  assert.deepEqual(deriveDefaultPlan({ rtk: { enabled: false } }, true), { mode: "off", stackedPipeline: [] });
});

test("exactly one single-mode engine => that mode", () => {
  assert.deepEqual(deriveDefaultPlan({ caveman: on("full") }, true), { mode: "standard", stackedPipeline: [] });
  assert.deepEqual(deriveDefaultPlan({ rtk: on("minimal") }, true), { mode: "rtk", stackedPipeline: [] });
  assert.deepEqual(deriveDefaultPlan({ lite: on() }, true), { mode: "lite", stackedPipeline: [] });
});

test("one non-single-mode engine => stacked with that engine", () => {
  const p = deriveDefaultPlan({ headroom: on() }, true);
  assert.equal(p.mode, "stacked");
  assert.deepEqual(p.stackedPipeline, [{ engine: "headroom" }]);
});

test("multiple engines => stacked in stackPriority order, levels as intensity", () => {
  const p = deriveDefaultPlan({ caveman: on("full"), rtk: on("standard"), headroom: on() }, true);
  assert.equal(p.mode, "stacked");
  assert.deepEqual(p.stackedPipeline, [
    { engine: "rtk", intensity: "standard" },   // pri 10
    { engine: "headroom" },                     // pri 15
    { engine: "caveman", intensity: "full" },   // pri 20
  ]);
});
