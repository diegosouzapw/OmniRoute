import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  STACKED_PIPELINE_ENGINE_INTENSITIES,
  stackedPipelineStepSchema,
} from "../../../src/shared/validation/compressionConfigSchemas.ts";

// Regression guard for #4955: the Engine Combos pipeline editor used to offer engines
// (headroom, session-dedup, ccr, llmlingua) that `stackedPipelineStepSchema` rejects, so
// selecting one made `PUT /api/context/combos/[id]` fail with HTTP 400 and the UI swallowed
// it. The fix routes the dropdown through STACKED_PIPELINE_ENGINE_INTENSITIES, which MUST stay
// in lockstep with the discriminated union below.
describe("Engine Combos UI ↔ stackedPipelineStepSchema parity (#4955)", () => {
  const unionEngines = stackedPipelineStepSchema.options
    .map((option: { shape: { engine: { value: string } } }) => option.shape.engine.value)
    .sort();

  it("offers exactly the engines the API update schema accepts (no drift)", () => {
    const uiEngines = Object.keys(STACKED_PIPELINE_ENGINE_INTENSITIES).sort();
    assert.deepEqual(uiEngines, unionEngines);
  });

  it("every (engine, intensity) the UI can emit is accepted by the schema", () => {
    for (const [engine, intensities] of Object.entries(STACKED_PIPELINE_ENGINE_INTENSITIES)) {
      for (const intensity of intensities) {
        const result = stackedPipelineStepSchema.safeParse({ engine, intensity });
        assert.equal(
          result.success,
          true,
          `expected { engine: "${engine}", intensity: "${intensity}" } to be accepted`
        );
      }
    }
  });

  it("the engines removed from the UI in #4955 are indeed rejected by the schema", () => {
    for (const engine of ["headroom", "session-dedup", "ccr", "llmlingua"]) {
      assert.equal(
        stackedPipelineStepSchema.safeParse({ engine, intensity: "standard" }).success,
        false,
        `engine "${engine}" must not be a valid stacked-pipeline step`
      );
      assert.equal(
        STACKED_PIPELINE_ENGINE_INTENSITIES[engine],
        undefined,
        `engine "${engine}" must not be offered by the combos UI`
      );
    }
  });
});
