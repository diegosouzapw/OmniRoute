import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  togglePipelineStep,
  movePipelineStep,
  setStepIntensity,
  setStepConfig,
  availableEngines,
  type EngineCatalogEntry,
} from "../../../src/shared/components/compression/compressionPipelineModel.ts";
import type { CompressionPipelineStep } from "../../../open-sse/services/compression/types.ts";

// ── fixture ───────────────────────────────────────────────────────────────

const CATALOG: EngineCatalogEntry[] = [
  { id: "rtk", stackPriority: 10 },
  { id: "headroom", stackPriority: 15 },
  { id: "caveman", stackPriority: 20 },
];

// ── togglePipelineStep ────────────────────────────────────────────────────

describe("togglePipelineStep", () => {
  it("adds an engine to an empty pipeline", () => {
    const result = togglePipelineStep([], "caveman", CATALOG);
    assert.deepEqual(result, [{ engine: "caveman" }]);
  });

  it("adds a new engine and sorts by stackPriority", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const result = togglePipelineStep(steps, "headroom", CATALOG);
    assert.equal(result.length, 3);
    assert.equal(result[0].engine, "rtk"); // priority 10
    assert.equal(result[1].engine, "headroom"); // priority 15
    assert.equal(result[2].engine, "caveman"); // priority 20
  });

  it("removes an engine that is already present", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const result = togglePipelineStep(steps, "rtk", CATALOG);
    assert.equal(result.length, 1);
    assert.equal(result[0].engine, "caveman");
  });

  it("does not mutate the input steps array", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }];
    const original = steps.slice();
    togglePipelineStep(steps, "caveman", CATALOG);
    assert.deepEqual(steps, original);
  });

  it("sorts by unknown stackPriority defaulting to 50", () => {
    const catalogWithUnknown: EngineCatalogEntry[] = [
      { id: "rtk", stackPriority: 10 },
      { id: "caveman", stackPriority: 60 },
    ];
    const steps: CompressionPipelineStep[] = [{ engine: "caveman" }];
    // "headroom" not in catalog → priority 50, so between rtk(10) and caveman(60)
    const result = togglePipelineStep(steps, "headroom", catalogWithUnknown);
    assert.equal(result.length, 2);
    // headroom=50 < caveman=60, so headroom comes first
    assert.equal(result[0].engine, "headroom");
    assert.equal(result[1].engine, "caveman");
  });
});

// ── movePipelineStep ──────────────────────────────────────────────────────

describe("movePipelineStep", () => {
  it("moves a step up by one position", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const result = movePipelineStep(steps, "caveman", "up");
    assert.equal(result[0].engine, "caveman");
    assert.equal(result[1].engine, "rtk");
  });

  it("moves a step down by one position", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const result = movePipelineStep(steps, "rtk", "down");
    assert.equal(result[0].engine, "caveman");
    assert.equal(result[1].engine, "rtk");
  });

  it("moving the first step up is a no-op", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const result = movePipelineStep(steps, "rtk", "up");
    assert.equal(result[0].engine, "rtk");
    assert.equal(result[1].engine, "caveman");
  });

  it("moving the last step down is a no-op", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const result = movePipelineStep(steps, "caveman", "down");
    assert.equal(result[0].engine, "rtk");
    assert.equal(result[1].engine, "caveman");
  });

  it("is a no-op if the engine is not found", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }];
    const result = movePipelineStep(steps, "headroom", "up");
    assert.deepEqual(result, steps);
  });

  it("does not mutate the input array", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const original = steps.map((s) => ({ ...s }));
    movePipelineStep(steps, "caveman", "up");
    assert.deepEqual(steps, original);
  });
});

// ── setStepIntensity ──────────────────────────────────────────────────────

describe("setStepIntensity", () => {
  it("sets intensity on the matching step", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const result = setStepIntensity(steps, "caveman", "full");
    assert.equal(result[1].intensity, "full");
  });

  it("leaves other steps unchanged", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const result = setStepIntensity(steps, "caveman", "full");
    assert.equal(result[0].intensity, undefined);
  });

  it("does not mutate the input array", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    setStepIntensity(steps, "rtk", "standard");
    // original elements must not be mutated
    assert.equal(steps[0].intensity, undefined);
    assert.equal(steps[1].intensity, undefined);
  });

  it("returns the same array length", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }, { engine: "caveman" }];
    const result = setStepIntensity(steps, "rtk", "standard");
    assert.equal(result.length, 2);
  });

  it("is a no-op if engine is not in steps", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }];
    const result = setStepIntensity(steps, "headroom", "lite");
    assert.deepEqual(result, steps);
  });
});

// ── setStepConfig ─────────────────────────────────────────────────────────

describe("setStepConfig", () => {
  it("merges config into the matching step", () => {
    const steps: CompressionPipelineStep[] = [
      { engine: "rtk", config: { foo: 1 } },
      { engine: "caveman" },
    ];
    const result = setStepConfig(steps, "rtk", { bar: 2 });
    assert.deepEqual(result[0].config, { foo: 1, bar: 2 });
  });

  it("creates config when step had none", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "caveman" }];
    const result = setStepConfig(steps, "caveman", { key: "value" });
    assert.deepEqual(result[0].config, { key: "value" });
  });

  it("does not mutate the input step objects", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk", config: { foo: 1 } }];
    setStepConfig(steps, "rtk", { bar: 2 });
    assert.deepEqual(steps[0].config, { foo: 1 });
  });

  it("is a no-op if engine is not found", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }];
    const result = setStepConfig(steps, "headroom", { x: 1 });
    assert.deepEqual(result, steps);
  });
});

// ── availableEngines ──────────────────────────────────────────────────────

describe("availableEngines", () => {
  it("returns engines not currently in steps", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }];
    const result = availableEngines(CATALOG, steps);
    assert.equal(result.length, 2);
    assert.ok(result.some((e) => e.id === "headroom"));
    assert.ok(result.some((e) => e.id === "caveman"));
  });

  it("excludes all engines when all are in steps", () => {
    const steps: CompressionPipelineStep[] = [
      { engine: "rtk" },
      { engine: "headroom" },
      { engine: "caveman" },
    ];
    const result = availableEngines(CATALOG, steps);
    assert.equal(result.length, 0);
  });

  it("returns full catalog when steps is empty", () => {
    const result = availableEngines(CATALOG, []);
    assert.equal(result.length, 3);
  });

  it("preserves order from catalog", () => {
    const steps: CompressionPipelineStep[] = [{ engine: "rtk" }];
    const result = availableEngines(CATALOG, steps);
    // catalog order: headroom(15), caveman(20)
    assert.equal(result[0].id, "headroom");
    assert.equal(result[1].id, "caveman");
  });
});
