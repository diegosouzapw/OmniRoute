import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-debug-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");

async function resetStorage() {
  const globalDb = (globalThis as { __omnirouteDb?: { open: boolean; close(): void } })
    .__omnirouteDb;
  try {
    if (globalDb?.open) {
      globalDb.close();
    }
  } catch {}
  delete (globalThis as { __omnirouteDb?: unknown }).__omnirouteDb;
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

await resetStorage();

test("#10312: empty store defaults debugMode to false (fresh install is not in debug)", async () => {
  await resetStorage();
  const result = await settings.getSettings();
  assert.equal(result.debugMode, false);
});

test("#10312: persisted debugMode=true is preserved after the default flip", async () => {
  await resetStorage();
  await settings.updateSettings({ debugMode: true });
  const result = await settings.getSettings();
  assert.equal(result.debugMode, true);
});

test("#10312: persisted debugMode=false stays false after the default flip", async () => {
  await resetStorage();
  await settings.updateSettings({ debugMode: false });
  const result = await settings.getSettings();
  assert.equal(result.debugMode, false);
});
