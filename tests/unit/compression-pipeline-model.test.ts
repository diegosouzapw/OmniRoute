import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  allowedIntensities,
  normalizeStep,
  moveLayer,
  addLayer,
  removeLayer,
  updateLayer,
  type EngineIntensities,
  type PipelineStep,
} from "../../src/shared/components/compression/compressionPipelineModel.ts";

// T06 — pure pipeline model. Reorder/add/remove/update preserve invariants.

const TABLE: EngineIntensities = {
  rtk: ["standard", "aggressive"],
  caveman: ["lite", "full", "ultra"],
  llmlingua: ["standard"],
};

const BASE: PipelineStep[] = [
  { engine: "rtk", intensity: "standard" },
  { engine: "caveman", intensity: "full" },
  { engine: "llmlingua", intensity: "standard" },
];

describe("compressionPipelineModel — normalize", () => {
  it("keeps a valid intensity and coerces an invalid one to the first allowed", () => {
    assert.deepEqual(normalizeStep({ engine: "caveman", intensity: "ultra" }, TABLE), {
      engine: "caveman",
      intensity: "ultra",
    });
    assert.deepEqual(normalizeStep({ engine: "caveman", intensity: "bogus" }, TABLE), {
      engine: "caveman",
      intensity: "lite",
    });
  });

  it("falls back to standard for an unknown engine", () => {
    assert.deepEqual(allowedIntensities("nope", TABLE), ["standard"]);
    assert.deepEqual(normalizeStep({ engine: "nope" }, TABLE), {
      engine: "nope",
      intensity: "standard",
    });
  });
});

describe("compressionPipelineModel — moveLayer", () => {
  it("moves a step and is always a permutation (same length + members)", () => {
    const moved = moveLayer(BASE, 0, 2);
    assert.deepEqual(
      moved.map((s) => s.engine),
      ["caveman", "llmlingua", "rtk"]
    );
    assert.equal(moved.length, BASE.length);
  });

  it("does not mutate the input", () => {
    const copy = BASE.map((s) => ({ ...s }));
    moveLayer(BASE, 0, 2);
    assert.deepEqual(BASE, copy);
  });

  it("returns an unchanged copy for out-of-range or no-op moves", () => {
    assert.deepEqual(moveLayer(BASE, 1, 1), BASE);
    assert.deepEqual(moveLayer(BASE, -1, 2), BASE);
    assert.deepEqual(moveLayer(BASE, 0, 9), BASE);
  });
});

describe("compressionPipelineModel — add/remove", () => {
  it("addLayer appends a normalized step", () => {
    const next = addLayer(BASE, { engine: "caveman", intensity: "bogus" }, TABLE);
    assert.equal(next.length, 4);
    assert.deepEqual(next[3], { engine: "caveman", intensity: "lite" });
  });

  it("removeLayer drops the indexed step but never goes below minLength", () => {
    const next = removeLayer(BASE, 1);
    assert.deepEqual(
      next.map((s) => s.engine),
      ["rtk", "llmlingua"]
    );
    const single: PipelineStep[] = [{ engine: "rtk", intensity: "standard" }];
    assert.deepEqual(removeLayer(single, 0), single, "must not remove the last step");
  });

  it("removeLayer ignores out-of-range index", () => {
    assert.deepEqual(removeLayer(BASE, 9), BASE);
  });
});

describe("compressionPipelineModel — updateLayer", () => {
  it("patches a step and re-normalizes intensity for a new engine", () => {
    const next = updateLayer(BASE, 0, { engine: "caveman" }, TABLE);
    // rtk(standard) → caveman: 'standard' is not a caveman intensity → first allowed (lite)
    assert.deepEqual(next[0], { engine: "caveman", intensity: "lite" });
    // other steps untouched
    assert.deepEqual(next[1], BASE[1]);
  });

  it("keeps a still-valid intensity when only the engine changes to a compatible one", () => {
    const next = updateLayer(BASE, 1, { intensity: "ultra" }, TABLE);
    assert.deepEqual(next[1], { engine: "caveman", intensity: "ultra" });
  });

  it("ignores out-of-range index", () => {
    assert.deepEqual(updateLayer(BASE, 9, { engine: "rtk" }, TABLE), BASE);
  });
});
