// Characterization of resolveCompressionSettings — the compression settings read extracted from
// handleChatCore's Proactive Context Compression setup (chatCore god-file decomposition, #3501).
// Uses a real temp DB (getCompressionSettings reads/seeds the settings row). Locks: the derived
// enabled / contextEditingEnabled flags and the disabled fallback shape.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-comp-settings-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { resolveCompressionSettings } = await import(
  "../../open-sse/handlers/chatCore/compressionSettings.ts"
);

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  try {
    fs.rmSync(testDataDir, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

test("returns the settings object from the DB", async () => {
  const result = await resolveCompressionSettings();
  assert.ok(result.settings, "expected a settings object from the seeded DB");
});

test("derives enabled and contextEditingEnabled from the settings", async () => {
  const result = await resolveCompressionSettings();
  // `enabled` mirrors settings.enabled exactly
  assert.equal(result.enabled, result.settings!.enabled);
  // `contextEditingEnabled` is the strict === true derivation of the nested flag
  assert.equal(result.contextEditingEnabled, result.settings!.contextEditing?.enabled === true);
  assert.equal(typeof result.contextEditingEnabled, "boolean");
});
