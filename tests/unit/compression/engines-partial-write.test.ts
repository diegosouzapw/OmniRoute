// Two dashboard pages write the `engines` map: the Omniglyph page and the context settings
// panel. A write that carries only the engine it changed must leave every other engine as it
// was, or a toggle on one page turns off what the other page (or a failed GET) never loaded.
import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-engines-partial-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../../src/lib/db/compression.ts");

type SettingsUpdate = Parameters<typeof updateCompressionSettings>[0];

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

afterEach(() => {
  core.resetDbInstance();
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

describe("updateCompressionSettings engines partial writes", () => {
  it("keeps the other stored engines when a write carries one engine", async () => {
    await updateCompressionSettings({
      engines: {
        rtk: { enabled: true, level: "standard" },
        caveman: { enabled: true, level: "full" },
      },
    });
    core.resetDbInstance();

    await updateCompressionSettings({ engines: { omniglyph: { enabled: true } } });
    core.resetDbInstance();

    const { engines, enginesExplicit } = await getCompressionSettings();
    assert.deepEqual(engines.rtk, { enabled: true, level: "standard" });
    assert.deepEqual(engines.caveman, { enabled: true, level: "full" });
    assert.deepEqual(engines.omniglyph, { enabled: true });
    assert.equal(enginesExplicit, true);
  });

  it("keeps a toggle made on one page when the other page writes a different engine", async () => {
    await updateCompressionSettings({ engines: { rtk: { enabled: true } } });
    // The Omniglyph page turns its engine on after the panel loaded the map...
    await updateCompressionSettings({ engines: { omniglyph: { enabled: true } } });
    // ...then the panel turns caveman on.
    await updateCompressionSettings({ engines: { caveman: { enabled: true } } });
    core.resetDbInstance();

    const { engines } = await getCompressionSettings();
    assert.equal(engines.omniglyph.enabled, true);
    assert.equal(engines.rtk.enabled, true);
    assert.equal(engines.caveman.enabled, true);
  });

  it("keeps a stored engine level when a write only sets enabled", async () => {
    await updateCompressionSettings({ engines: { caveman: { enabled: true, level: "ultra" } } });
    core.resetDbInstance();

    await updateCompressionSettings({ engines: { caveman: { enabled: false } } });
    core.resetDbInstance();

    const { engines } = await getCompressionSettings();
    assert.deepEqual(engines.caveman, { enabled: false, level: "ultra" });
  });

  it("keeps the engines derived from legacy settings on the first engines write", async () => {
    await updateCompressionSettings({ cavemanConfig: { enabled: true } } as SettingsUpdate);
    core.resetDbInstance();
    const before = await getCompressionSettings();
    assert.equal(before.enginesExplicit, false);
    assert.equal(before.engines.caveman.enabled, true);
    core.resetDbInstance();

    await updateCompressionSettings({ engines: { omniglyph: { enabled: true } } });
    core.resetDbInstance();

    const after = await getCompressionSettings();
    assert.equal(after.enginesExplicit, true);
    assert.equal(after.engines.caveman.enabled, true);
    assert.equal(after.engines.omniglyph.enabled, true);
  });

  it("treats a stored non-text engines row as absent and merges over the legacy-derived map", async () => {
    await updateCompressionSettings({ cavemanConfig: { enabled: true } } as SettingsUpdate);
    core.resetDbInstance();

    // A BLOB in the engines key: the read path skips non-text rows, so the write path must
    // not pick the row up as a merge base either and falls back to the derived map.
    core
      .getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run("compression", "engines", Buffer.from([0x00, 0xff]));
    core.resetDbInstance();

    const before = await getCompressionSettings();
    assert.equal(before.enginesExplicit, false);
    assert.equal(before.engines.caveman.enabled, true);
    core.resetDbInstance();

    await updateCompressionSettings({ engines: { omniglyph: { enabled: true } } });
    core.resetDbInstance();

    const after = await getCompressionSettings();
    assert.equal(after.engines.caveman.enabled, true);
    assert.equal(after.engines.omniglyph.enabled, true);
    assert.equal(after.enginesExplicit, true);
  });
});
