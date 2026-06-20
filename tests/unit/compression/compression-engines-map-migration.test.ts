import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-engines-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } = await import(
  "../../../src/lib/db/compression.ts"
);

function freshDir() {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("migration backfills engines map from prior defaultMode + default combo", async () => {
  freshDir();
  const db = getDbInstance(); // runs migrations incl. 102
  // simulate a pre-102 install: master on, defaultMode 'standard', caveman enabled
  db.prepare(
    "INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('compression','enabled','true')"
  ).run();
  db.prepare(
    "INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('compression','defaultMode','\"standard\"')"
  ).run();
  db.prepare(
    "INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('compression','cavemanConfig','{\"enabled\":true}')"
  ).run();
  const cfg = await getCompressionSettings();
  assert.equal(cfg.engines.caveman.enabled, true);
  assert.equal(cfg.activeComboId, null);
  // No stored engines row → backfilled map is display-only; dispatch stays on the legacy path.
  assert.equal(cfg.enginesExplicit, false);
});

test("engines map persists round-trip + activeComboId", async () => {
  freshDir();
  getDbInstance();
  await updateCompressionSettings({
    enabled: true,
    engines: {
      rtk: { enabled: true, level: "standard" },
      caveman: { enabled: true, level: "full" },
    },
    activeComboId: null,
  });
  const cfg = await getCompressionSettings();
  assert.equal(cfg.engines.rtk.enabled, true);
  assert.equal(cfg.engines.rtk.level, "standard");
  assert.equal(cfg.engines.caveman.level, "full");
  // A stored engines row exists → the panel configured engines; dispatch trusts the map.
  assert.equal(cfg.enginesExplicit, true);
});
