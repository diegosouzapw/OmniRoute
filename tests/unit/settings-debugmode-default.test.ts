import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

// Isolated DATA_DIR so persisted settings rows don't mask the default.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-debugmode-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "settings-debugmode-test-secret";

const { getSettings } = await import("../../src/lib/db/settings.ts");

test("debugMode defaults to false for fresh installs (no persisted setting)", async () => {
  const settings = await getSettings();
  assert.equal(settings.debugMode, false, "debugMode should default to false, not true");
});

test("logToolSources defaults to false", async () => {
  const settings = await getSettings();
  assert.equal(settings.logToolSources, false, "logToolSources should default to false");
});

test.after(async () => {
  await cleanupTempDataDir(TEST_DATA_DIR);
});
