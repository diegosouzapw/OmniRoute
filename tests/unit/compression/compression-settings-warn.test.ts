/**
 * Tests for #13456: compression settings row warnings for unreadable values.
 *
 * Before the fix, non-string (BLOB) and invalid-JSON settings rows were
 * silently ignored. Operators had no way to diagnose config drift from the
 * panel vs. the runtime.
 */
import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-warn-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings } = await import("../../../src/lib/db/compression.ts");

const warnings: string[] = [];
const originalWarn = console.warn;

function freshDir() {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

beforeEach(() => {
  warnings.length = 0;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.join(" "));
  };
});

after(() => {
  console.warn = originalWarn;
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("warns when a settings row is stored as a non-string (BLOB) value", async () => {
  freshDir();
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "compression",
    "cacheMinutes",
    Buffer.from("corrupt-blob")
  );

  await getCompressionSettings();

  assert.ok(
    warnings.some((w) => w.includes("cacheMinutes") && w.includes("non-string value type")),
    `expected a non-string-value warning for 'cacheMinutes', got: ${JSON.stringify(warnings)}`
  );
});

test("warns when a settings row has unparseable JSON", async () => {
  freshDir();
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "compression",
    "cacheMinutes",
    "{not valid json"
  );

  await getCompressionSettings();

  assert.ok(
    warnings.some((w) => w.includes("cacheMinutes") && w.includes("unparseable JSON")),
    `expected an unparseable-JSON warning for 'cacheMinutes', got: ${JSON.stringify(warnings)}`
  );
});

test("warns when the 'engines' row is not a usable object", async () => {
  freshDir();
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "compression",
    "engines",
    "42"
  );

  await getCompressionSettings();

  assert.ok(
    warnings.some((w) => w.includes("'engines'") && w.includes("unreadable")),
    `expected an unreadable-engines warning, got: ${JSON.stringify(warnings)}`
  );
});

test("does NOT warn when the 'engines' row is a valid but empty object", async () => {
  freshDir();
  const db = getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "compression",
    "engines",
    "{}"
  );

  await getCompressionSettings();

  assert.equal(
    warnings.some((w) => w.includes("'engines'")),
    false,
    `a deliberately empty (but valid) engines map must not warn, got: ${JSON.stringify(warnings)}`
  );
});
