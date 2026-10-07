// Characterization of the pure compression-combo predicates extracted from handleChatCore's
// compression setup (chatCore god-file decomposition, #3501). No DB, no handler state.
import { test } from "node:test";
import assert from "node:assert/strict";

const { defaultComboForRequest, isBuiltinStackedPipeline, isStackedCompressionCombo } =
  await import("../../open-sse/handlers/chatCore/compressionComboPredicates.ts");
const { DEFAULT_COMPRESSION_CONFIG } = await import("../../open-sse/services/compression/types.ts");

test("isBuiltinStackedPipeline true only for the rtk(standard)→caveman(full) shape", () => {
  assert.equal(isBuiltinStackedPipeline([{ engine: "rtk" }, { engine: "caveman" }] as never), true);
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
    isBuiltinStackedPipeline([{ engine: "rtk", config: { x: 1 } }, { engine: "caveman" }] as never),
    false
  );
});

const editedDefaultCombo = {
  id: "default-caveman",
  pipeline: [{ engine: "session-dedup" }, { engine: "lite" }, { engine: "rtk" }],
  languagePacks: ["en"],
  outputMode: false,
  outputModeIntensity: "full",
} as never;
const legacyConfig = {
  ...DEFAULT_COMPRESSION_CONFIG,
  enabled: true,
  defaultMode: "stacked" as const,
};

test("defaultComboForRequest keeps only the safe steps when the request does not opt in", () => {
  for (const header of [null, "safe", "engine:rtk"]) {
    const combo = defaultComboForRequest(editedDefaultCombo, {
      config: legacyConfig,
      header,
      combos: {},
    });
    assert.deepEqual(
      combo?.pipeline,
      [{ engine: "session-dedup" }, { engine: "lite" }],
      String(header)
    );
  }
});

test("defaultComboForRequest keeps the lossy steps under allow-lossy", () => {
  const combo = defaultComboForRequest(editedDefaultCombo, {
    config: legacyConfig,
    header: "allow-lossy",
    combos: {},
  });
  assert.deepEqual(combo?.pipeline, [
    { engine: "session-dedup" },
    { engine: "lite" },
    { engine: "rtk" },
  ]);
});

test("defaultComboForRequest yields to a plan the header chose", () => {
  const combos = { "rtk only": [{ engine: "rtk" }] } as never;
  for (const header of ["RTK only", "default", "off"]) {
    assert.equal(
      defaultComboForRequest(editedDefaultCombo, { config: legacyConfig, header, combos }),
      null,
      header
    );
  }
  assert.equal(
    defaultComboForRequest(null, { config: legacyConfig, header: null, combos: {} }),
    null
  );
});

test("defaultComboForRequest returns null for a non-null combo with an empty pipeline", () => {
  const emptyPipelineCombo = {
    id: "default-caveman",
    pipeline: [],
    languagePacks: ["en"],
    outputMode: false,
    outputModeIntensity: "full",
  } as never;
  assert.equal(
    defaultComboForRequest(emptyPipelineCombo, { config: legacyConfig, header: null, combos: {} }),
    null
  );
});

test("defaultComboForRequest swaps a single lossy engine for the safe default pair", () => {
  const singleLossy = { ...editedDefaultCombo, pipeline: [{ engine: "rtk" }] } as never;
  const combo = defaultComboForRequest(singleLossy, {
    config: legacyConfig,
    header: null,
    combos: {},
  });
  assert.deepEqual(combo?.pipeline, [{ engine: "session-dedup" }, { engine: "lite" }]);
});

test("defaultComboForRequest keeps a single safe engine as-is", () => {
  const singleSafe = { ...editedDefaultCombo, pipeline: [{ engine: "lite" }] } as never;
  const combo = defaultComboForRequest(singleSafe, {
    config: legacyConfig,
    header: null,
    combos: {},
  });
  assert.deepEqual(combo?.pipeline, [{ engine: "lite" }]);
});

test("defaultComboForRequest yields when an engine:<id> header resolves a plan", () => {
  const engineEnabledConfig = {
    ...legacyConfig,
    engines: { ...legacyConfig.engines, rtk: { enabled: true } },
  } as never;
  assert.equal(
    defaultComboForRequest(editedDefaultCombo, {
      config: engineEnabledConfig,
      header: "engine:rtk",
      combos: {},
    }),
    null
  );
});

test("isStackedCompressionCombo true when the combo has >= 1 pipeline layer", () => {
  assert.equal(isStackedCompressionCombo(null), false);
  assert.equal(
    isStackedCompressionCombo({
      id: "c",
      pipeline: [],
      languagePacks: [],
      outputMode: false,
      outputModeIntensity: "full",
    } as never),
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
