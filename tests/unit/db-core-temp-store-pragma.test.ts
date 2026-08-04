import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-temp-store-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-temp-store-secret";

const { getDbInstance } = await import("../../src/lib/db/core.ts");

test("temp_store pragma is 2 (MEMORY) after initDb", () => {
  // The database singleton should already have the pragma set by initDb().
  // This test confirms the runtime respects the setting.
  const db = getDbInstance();
  const val: unknown = db.pragma("temp_store", { simple: true });
  assert.ok(typeof val === "number");
  // 2 = MEMORY (set by the new PRAGMA in initDb)
  assert.equal(val, 2, "expected temp_store=2 (MEMORY) after initDb");
});
