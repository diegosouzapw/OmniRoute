import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-engine-config-save-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../../src/lib/db/compression.ts");
const { compressionPreviewConfigSchema, compressionSettingsUpdateSchema } =
  await import("../../../src/shared/validation/compressionConfigSchemas.ts");
const { aggressiveEngine, liteEngine, ultraEngine } =
  await import("../../../open-sse/services/compression/engines/cavemanAdapter.ts");
const { headroomEngine } =
  await import("../../../open-sse/services/compression/engines/headroom/index.ts");
const { sessionDedupEngine } =
  await import("../../../open-sse/services/compression/engines/session-dedup/index.ts");
const { ccrEngine } = await import("../../../open-sse/services/compression/engines/ccr/index.ts");
const {
  seedEngineForm,
  buildEngineDetailUpdate,
  formAfterSave,
  forgetSentEdits,
  withoutEmptyText,
} = await import("../../../src/shared/components/compression/engineConfigSave.ts");

type Settings = Record<string, unknown>;
type Engine = typeof aggressiveEngine;

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

async function readSettings(): Promise<Settings> {
  return (await getCompressionSettings()) as unknown as Settings;
}

// Mirrors PUT /api/settings/compression: the route's schema validates the body, then the
// settings are written.
async function put(body: Settings): Promise<number> {
  const parsed = compressionSettingsUpdateSchema.safeParse(body);
  if (!parsed.success) return 400;
  await updateCompressionSettings(parsed.data as Parameters<typeof updateCompressionSettings>[0]);
  return 200;
}

// An engine page save: the form was seeded from `loadedSettings`, the operator applied
// `edits`, and the body is built from a read made at save time.
async function pageSave(
  engine: Engine,
  subKey: string,
  loadedSettings: Settings,
  edits: Settings
): Promise<number> {
  const loaded = seedEngineForm(engine.id, engine.getConfigSchema(), loadedSettings[subKey]);
  const current = await readSettings();
  return put({
    [subKey]: buildEngineDetailUpdate(engine.id, loaded, { ...loaded, ...edits }, current[subKey]),
  });
}

describe("engine config page save", () => {
  it("keeps aggressive fields another page saved after the engine page loaded", async () => {
    const loadedSettings = await readSettings();
    const now = (await readSettings()).aggressive as Settings & {
      thresholds: Settings;
      toolStrategies: Settings;
    };
    const fromSettingsTab = {
      ...now,
      thresholds: { ...now.thresholds, fullSummary: 9 },
      toolStrategies: { ...now.toolStrategies, json: false },
      summarizerEnabled: false,
    };
    assert.equal(await put({ aggressive: fromSettingsTab }), 200);

    const status = await pageSave(aggressiveEngine, "aggressive", loadedSettings, {
      maxTokensPerMessage: 4096,
    });

    assert.equal(status, 200);
    assert.deepEqual((await readSettings()).aggressive, {
      ...fromSettingsTab,
      maxTokensPerMessage: 4096,
    });
  });

  it("saves the ultra page on a default install, where the form shows an empty model path", async () => {
    const loadedSettings = await readSettings();
    const before = loadedSettings.ultra as Settings;
    assert.equal(before.modelPath, undefined);

    const status = await pageSave(ultraEngine, "ultra", loadedSettings, { compressionRate: 0.4 });

    assert.equal(status, 200);
    assert.deepEqual((await readSettings()).ultra, { ...before, compressionRate: 0.4 });
  });

  it("keeps ultra.enabled and the model path when the ultra page saves another field", async () => {
    const now = (await readSettings()).ultra as Settings;
    assert.equal(await put({ ultra: { ...now, enabled: true, modelPath: "/models/ultra" } }), 200);
    const loadedSettings = await readSettings();

    const status = await pageSave(ultraEngine, "ultra", loadedSettings, { compressionRate: 0.4 });

    assert.equal(status, 200);
    assert.deepEqual((await readSettings()).ultra, {
      ...now,
      enabled: true,
      modelPath: "/models/ultra",
      compressionRate: 0.4,
    });
  });

  it("clears the stored model path when the field is emptied", async () => {
    const now = (await readSettings()).ultra as Settings;
    assert.equal(await put({ ultra: { ...now, modelPath: "/models/ultra" } }), 200);
    const loadedSettings = await readSettings();

    const status = await pageSave(ultraEngine, "ultra", loadedSettings, { modelPath: "  " });

    assert.equal(status, 200);
    assert.deepEqual((await readSettings()).ultra, now);
  });

  it("never writes enabled from the page form", async () => {
    const now = (await readSettings()).ultra as Settings;
    assert.equal(await put({ ultra: { ...now, enabled: true } }), 200);
    const loadedSettings = await readSettings();

    const status = await pageSave(ultraEngine, "ultra", loadedSettings, { enabled: false });

    assert.equal(status, 200);
    assert.equal(((await readSettings()).ultra as Settings).enabled, true);
  });

  it("sends back the stored sub-object when nothing was edited", async () => {
    const settings = await readSettings();
    const loaded = seedEngineForm(
      aggressiveEngine.id,
      aggressiveEngine.getConfigSchema(),
      settings.aggressive
    );

    assert.deepEqual(
      buildEngineDetailUpdate(aggressiveEngine.id, loaded, loaded, settings.aggressive),
      settings.aggressive
    );
  });

  it("saves every engine page sub-object back unchanged when nothing was edited", async () => {
    // Each save starts from the stored copy the settings read returns, so that copy has to
    // pass the strict update schema for every engine page.
    const pages: [Engine, string][] = [
      [liteEngine, "lite"],
      [aggressiveEngine, "aggressive"],
      [ultraEngine, "ultra"],
      [headroomEngine, "headroom"],
      [sessionDedupEngine, "sessionDedup"],
      [ccrEngine, "ccr"],
    ];
    for (const [engine, subKey] of pages) {
      const loadedSettings = await readSettings();

      assert.equal(await pageSave(engine, subKey, loadedSettings, {}), 200, subKey);
      assert.deepEqual((await readSettings())[subKey], loadedSettings[subKey], subKey);
    }
  });

  it("keeps the lite switch another page changed when the lite page edits the cap", async () => {
    assert.equal(await put({ lite: { compressToolResults: true, maxToolLength: 8000 } }), 200);
    const loadedSettings = await readSettings();
    assert.equal(await put({ lite: { compressToolResults: false } }), 200);

    const status = await pageSave(liteEngine, "lite", loadedSettings, { maxToolLength: 9000 });

    assert.equal(status, 200);
    assert.deepEqual((await readSettings()).lite, {
      compressToolResults: false,
      maxToolLength: 9000,
    });
  });

  it("clears the stored lite cap when the cap input is emptied", async () => {
    assert.equal(await put({ lite: { compressToolResults: true, maxToolLength: 8000 } }), 200);
    const loadedSettings = await readSettings();

    // A cleared number input holds NaN.
    const status = await pageSave(liteEngine, "lite", loadedSettings, {
      maxToolLength: Number.NaN,
    });

    assert.equal(status, 200);
    assert.deepEqual((await readSettings()).lite, { compressToolResults: true });
  });

  it("leaves the lite cap unset when the lite page saves the switch", async () => {
    const loadedSettings = await readSettings();
    const form = seedEngineForm(liteEngine.id, liteEngine.getConfigSchema(), loadedSettings.lite);
    assert.equal("maxToolLength" in form, false);

    const status = await pageSave(liteEngine, "lite", loadedSettings, {
      compressToolResults: false,
    });

    assert.equal(status, 200);
    assert.deepEqual((await readSettings()).lite, { compressToolResults: false });
  });

  it("sends a field again after a save whose response was lost", async () => {
    const loadedSettings = await readSettings();
    const loaded = seedEngineForm(
      ultraEngine.id,
      ultraEngine.getConfigSchema(),
      loadedSettings.ultra
    );
    const sent = { ...loaded, compressionRate: 0.4 };
    // The server applies this save, but the response is lost, so the page reports a failure.
    const current = (await readSettings()).ultra;
    assert.equal(
      await put({ ultra: buildEngineDetailUpdate(ultraEngine.id, loaded, sent, current) }),
      200
    );
    const baseline = forgetSentEdits(loaded, sent);

    // The operator puts the loaded value back and saves again.
    const restored = { ...sent, compressionRate: loaded.compressionRate };
    const afterLostSave = (await readSettings()).ultra;
    assert.equal(
      await put({
        ultra: buildEngineDetailUpdate(ultraEngine.id, baseline, restored, afterLostSave),
      }),
      200
    );

    assert.deepEqual((await readSettings()).ultra, loadedSettings.ultra);
  });

  it("shows another page's value after a save, so typing the loaded value back sends it", async () => {
    const loadedSettings = await readSettings();
    const schema = ultraEngine.getConfigSchema();
    const loaded = seedEngineForm(ultraEngine.id, schema, loadedSettings.ultra);
    assert.equal(
      await put({ ultra: { ...(loadedSettings.ultra as Settings), compressionRate: 0.9 } }),
      200
    );

    // The page saves a different field. The PUT response is the settings read after the write.
    const sent = { ...loaded, minScoreThreshold: 0.6 };
    const current = (await readSettings()).ultra;
    assert.equal(
      await put({ ultra: buildEngineDetailUpdate(ultraEngine.id, loaded, sent, current) }),
      200
    );
    const written = seedEngineForm(ultraEngine.id, schema, (await readSettings()).ultra);
    const shown = formAfterSave(written, sent, sent);
    assert.equal(shown.compressionRate, 0.9);

    const retyped = { ...shown, compressionRate: loaded.compressionRate };
    const afterSave = (await readSettings()).ultra;
    assert.equal(
      await put({ ultra: buildEngineDetailUpdate(ultraEngine.id, written, retyped, afterSave) }),
      200
    );

    assert.deepEqual((await readSettings()).ultra, {
      ...(loadedSettings.ultra as Settings),
      minScoreThreshold: 0.6,
    });
  });

  it("keeps an edit typed while a save was in flight", () => {
    const sent = { compressionRate: 0.4, modelPath: "" };
    const now = { compressionRate: 0.4, modelPath: "/models/ultra" };
    const written = { compressionRate: 0.4, modelPath: "", enabled: true };

    assert.deepEqual(formAfterSave(written, sent, now), {
      compressionRate: 0.4,
      modelPath: "/models/ultra",
      enabled: true,
    });
  });

  it("builds an ultra preview config that the preview schema accepts on a default install", async () => {
    const settings = await readSettings();
    const form = seedEngineForm(ultraEngine.id, ultraEngine.getConfigSchema(), settings.ultra);
    assert.equal(form.modelPath, "");

    const parsed = compressionPreviewConfigSchema.safeParse({ ultra: withoutEmptyText(form) });

    assert.equal(parsed.success, true);
  });
});
