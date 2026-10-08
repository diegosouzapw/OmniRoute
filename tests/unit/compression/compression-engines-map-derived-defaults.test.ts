import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-compression-derived-engines-")
);
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings } = await import("../../../src/lib/db/compression.ts");

function freshDir() {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

function setRow(key: string, value: string) {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('compression',?,?)")
    .run(key, value);
}

test("no engines row: derived map keeps aggressive off by default", async () => {
  freshDir();
  getDbInstance();
  const cfg = await getCompressionSettings();
  assert.equal(cfg.enginesExplicit, false);
  assert.equal(cfg.engines.aggressive.enabled, false);
});

test("no engines row: defaultMode 'aggressive' is the only signal that turns it on", async () => {
  freshDir();
  getDbInstance();
  setRow("defaultMode", '"aggressive"');
  const cfg = await getCompressionSettings();
  assert.equal(cfg.enginesExplicit, false);
  assert.equal(cfg.engines.aggressive.enabled, true);
});

test("no engines row: a stored aggressive.enabled=true outside the schema is ignored", async () => {
  freshDir();
  getDbInstance();
  setRow("aggressive", '{"enabled":true}');
  const cfg = await getCompressionSettings();
  assert.equal(cfg.enginesExplicit, false);
  assert.equal(cfg.engines.aggressive.enabled, false);
});
