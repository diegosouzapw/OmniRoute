// Characterization of the pure compression-combo predicates extracted from handleChatCore's
// compression setup (chatCore god-file decomposition, #3501). No DB, no handler state.
import { test } from "node:test";
import assert from "node:assert/strict";

const { isBuiltinStackedPipeline, isStackedCompressionCombo } = await import(
  "../../open-sse/handlers/chatCore/compressionComboPredicates.ts"
);

test("isBuiltinStackedPipeline true only for the rtk(standard)→caveman(full) shape", () => {
  assert.equal(
    isBuiltinStackedPipeline([{ engine: "rtk" }, { engine: "caveman" }] as never),
    true
  );
  assert.equal(
    isBuiltinStackedPipeline([
      { engine: "rtk", intensity: "standard" },
      { engine: "caveman", intensity: "full" },
    ] as never),
    true
  );
});

test("isBuiltinStackedPipeline false for wrong length / engines / intensities / config", () => {
  assert.equal(isBuiltinStackedPipeline(undefined), false);
  assert.equal(isBuiltinStackedPipeline([] as never), false);
  assert.equal(isBuiltinStackedPipeline([{ engine: "rtk" }] as never), false);
  assert.equal(
    isBuiltinStackedPipeline([{ engine: "caveman" }, { engine: "rtk" }] as never),
    false
  );
  assert.equal(
    isBuiltinStackedPipeline([
      { engine: "rtk", intensity: "aggressive" },
      { engine: "caveman", intensity: "full" },
    ] as never),
    false
  );
  assert.equal(
    isBuiltinStackedPipeline([
      { engine: "rtk", config: { x: 1 } },
      { engine: "caveman" },
    ] as never),
    false
  );
});

test("isStackedCompressionCombo true when the combo has >= 1 pipeline layer", () => {
  assert.equal(isStackedCompressionCombo(null), false);
  assert.equal(
    isStackedCompressionCombo({ id: "c", pipeline: [], languagePacks: [], outputMode: false, outputModeIntensity: "full" } as never),
    false
  );
  assert.equal(
    isStackedCompressionCombo({
      id: "c",
      pipeline: [{ engine: "rtk" }],
      languagePacks: [],
      outputMode: false,
      outputModeIntensity: "full",
    } as never),
    true
  );
});
