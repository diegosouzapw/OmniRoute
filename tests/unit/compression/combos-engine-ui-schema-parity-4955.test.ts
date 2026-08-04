import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  STACKED_PIPELINE_ENGINE_INTENSITIES,
  compressionSettingsUpdateSchema,
  stackedPipelineStepSchema,
} from "../../../src/shared/validation/compressionConfigSchemas.ts";
import { ENGINE_IDS } from "../../../open-sse/services/compression/engineCatalog.ts";

// Regression guard for #4955 / #6747:
// - #4955: UI and API schema must stay in lockstep (no engines the UI offers that PUT rejects).
// - #6747: PUT must accept every ENGINE_CATALOG / GET stackedPipeline engine so GET→PUT
//   round-trips of compression settings succeed (session-dedup, ccr, headroom, relevance,
//   llmlingua were previously rejected by a 5-engine discriminator).
describe("Engine Combos UI ↔ stackedPipelineStepSchema parity (#4955 / #6747)", () => {
  const unionEngines = stackedPipelineStepSchema.options
    .map((option: { shape: { engine: { value: string } } }) => option.shape.engine.value)
    .sort();

  it("offers exactly the engines the API update schema accepts (no drift)", () => {
    const uiEngines = Object.keys(STACKED_PIPELINE_ENGINE_INTENSITIES).sort();
    assert.deepEqual(uiEngines, unionEngines);
  });

  it("covers every ENGINE_CATALOG id (GET /api/compression/engines parity)", () => {
    assert.deepEqual([...ENGINE_IDS].sort(), unionEngines);
  });

  it("every (engine, intensity) the UI can emit is accepted by the schema", () => {
    for (const [engine, intensities] of Object.entries(STACKED_PIPELINE_ENGINE_INTENSITIES)) {
      // Engines with no level selector still need bare { engine } accepted
      assert.equal(
        stackedPipelineStepSchema.safeParse({ engine }).success,
        true,
        `expected bare { engine: "${engine}" } to be accepted`
      );
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

  it("accepts structural catalog engines that #4955 had temporarily dropped from the UI (#6747)", () => {
    for (const engine of ["headroom", "session-dedup", "ccr", "llmlingua", "relevance"]) {
      assert.equal(
        stackedPipelineStepSchema.safeParse({ engine }).success,
        true,
        `engine "${engine}" must be a valid stacked-pipeline step`
      );
      assert.ok(
        Object.prototype.hasOwnProperty.call(STACKED_PIPELINE_ENGINE_INTENSITIES, engine),
        `engine "${engine}" must be offered by the combos UI`
      );
    }
  });

  it("accepts a full GET-shaped stackedPipeline on settings update (#6747)", () => {
    const result = compressionSettingsUpdateSchema.safeParse({
      stackedPipeline: [
        { engine: "session-dedup" },
        { engine: "ccr" },
        { engine: "lite", intensity: "lite" },
        { engine: "rtk", intensity: "standard" },
        { engine: "headroom" },
        { engine: "relevance" },
        { engine: "caveman", intensity: "full" },
        { engine: "aggressive", intensity: "ultra" },
        { engine: "llmlingua" },
        { engine: "ultra", intensity: "ultra" },
      ],
    });
    assert.equal(result.success, true, () =>
      result.success ? "" : JSON.stringify(result.error.issues)
    );
  });
});
