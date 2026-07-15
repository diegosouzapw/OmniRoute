import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { removeNativeModules } from "../../../scripts/build/lib/removeNativeModules.mjs";

/**
 * Creates a fake node_modules directory with mixed modules —
 * some that should be removed (native modules matching prefixes)
 * and some that should be preserved (regular npm packages).
 */
function seedNodeModules(baseDir: string) {
  const keep = [
    "@swc/helpers/package.json",
    "playwright-core/index.js",
    "zod/package.json",
    "pino/index.js",
    "typescript/package.json",
    "ws/package.json",
  ];
  for (const rel of keep) {
    const full = path.join(baseDir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, `// ${rel}`);
  }
}

function seedHashedNativeModules(baseDir: string) {
  const remove = [
    "better-sqlite3-90e2652d1716b047/build/Release/better_sqlite3.node",
    "better-sqlite3-a1b2c3d4e5f6a7b8/build/Release/better_sqlite3.node",
    "keytar-eb44cd511463a26b/build/Release/keytar.node",
    "sqlite-vec-63899bd51e44e247/build/Release/vec0.node",
  ];
  for (const rel of remove) {
    const full = path.join(baseDir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, `// ${rel}`);
  }
}

/** Verify that a directory still exists (was NOT removed). */
function assertExists(dir: string, label: string) {
  assert.ok(fs.existsSync(dir), `expected ${label} to still exist`);
}

/** Verify that a directory was removed. */
function assertRemoved(dir: string, label: string) {
  assert.ok(!fs.existsSync(dir), `expected ${label} to have been removed`);
}

// ── removeNativeModules() tests ───────────────────────────────────────

test("removeNativeModules: no-op when baseDir does not exist", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "remove-native-"));
  const nonexistent = path.join(tmp, "does-not-exist");

  // Must not throw
  assert.doesNotThrow(() => {
    removeNativeModules(nonexistent);
  });

  fs.rmSync(tmp, { recursive: true, force: true });
});

test("removeNativeModules: no-op when baseDir is empty", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "remove-native-"));
  const emptyDir = path.join(tmp, "empty");
  fs.mkdirSync(emptyDir);

  assert.doesNotThrow(() => {
    removeNativeModules(emptyDir);
  });

  fs.rmSync(tmp, { recursive: true, force: true });
});

test("removeNativeModules: removes hashed native modules with custom prefixes", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "remove-native-"));
  const nodeModules = path.join(tmp, "node_modules");
  fs.mkdirSync(nodeModules, { recursive: true });

  seedNodeModules(nodeModules);
  seedHashedNativeModules(nodeModules);

  removeNativeModules(nodeModules, ["better-sqlite3", "keytar", "sqlite-vec"]);

  // Hashed native modules should be removed
  assertRemoved(path.join(nodeModules, "better-sqlite3-90e2652d1716b047"), "better-sqlite3-90e2652d1716b047");
  assertRemoved(path.join(nodeModules, "better-sqlite3-a1b2c3d4e5f6a7b8"), "better-sqlite3-a1b2c3d4e5f6a7b8");
  assertRemoved(path.join(nodeModules, "keytar-eb44cd511463a26b"), "keytar-eb44cd511463a26b");
  assertRemoved(path.join(nodeModules, "sqlite-vec-63899bd51e44e247"), "sqlite-vec-63899bd51e44e247");

  // Regular (non-hashed, non-native) modules must be preserved
  assertExists(path.join(nodeModules, "@swc"), "@swc");
  assertExists(path.join(nodeModules, "playwright-core"), "playwright-core");
  assertExists(path.join(nodeModules, "zod"), "zod");
  assertExists(path.join(nodeModules, "pino"), "pino");
  assertExists(path.join(nodeModules, "typescript"), "typescript");
  assertExists(path.join(nodeModules, "ws"), "ws");

  fs.rmSync(tmp, { recursive: true, force: true });
});

test("removeNativeModules: removes unhashed native modules matching prefix", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "remove-native-"));
  const nodeModules = path.join(tmp, "node_modules");
  fs.mkdirSync(nodeModules, { recursive: true });

  // Unhashed native modules (installed by root npm install)
  fs.mkdirSync(path.join(nodeModules, "better-sqlite3", "build", "Release"), { recursive: true });
  fs.writeFileSync(path.join(nodeModules, "better-sqlite3", "build", "Release", "better_sqlite3.node"), "// native");
  fs.mkdirSync(path.join(nodeModules, "keytar"), { recursive: true });
  fs.writeFileSync(path.join(nodeModules, "keytar", "index.js"), "// keytar");

  removeNativeModules(nodeModules, ["better-sqlite3", "keytar"]);

  // Both should be removed (prefix "better-sqlite3" matches "better-sqlite3", "keytar" matches "keytar")
  assertRemoved(path.join(nodeModules, "better-sqlite3"), "better-sqlite3 (unhashed)");
  assertRemoved(path.join(nodeModules, "keytar"), "keytar (unhashed)");

  fs.rmSync(tmp, { recursive: true, force: true });
});

test("removeNativeModules: default prefixes only remove keytar", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "remove-native-"));
  const nodeModules = path.join(tmp, "node_modules");
  fs.mkdirSync(nodeModules, { recursive: true });

  fs.mkdirSync(path.join(nodeModules, "better-sqlite3"), { recursive: true });
  fs.writeFileSync(path.join(nodeModules, "better-sqlite3", "index.js"), "//");
  fs.mkdirSync(path.join(nodeModules, "keytar"), { recursive: true });
  fs.writeFileSync(path.join(nodeModules, "keytar", "index.js"), "//");

  // No custom prefixes → defaults to ["keytar"] only
  removeNativeModules(nodeModules);

  assertExists(path.join(nodeModules, "better-sqlite3"), "better-sqlite3 (not in default prefixes)");
  assertRemoved(path.join(nodeModules, "keytar"), "keytar (in default prefixes)");

  fs.rmSync(tmp, { recursive: true, force: true });
});

test("removeNativeModules: preserves non-matching modules with similar names", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "remove-native-"));
  const nodeModules = path.join(tmp, "node_modules");
  fs.mkdirSync(nodeModules, { recursive: true });

  // Modules with names that contain the prefix but don't START with it
  fs.mkdirSync(path.join(nodeModules, "x-better-sqlite3"), { recursive: true });
  fs.writeFileSync(path.join(nodeModules, "x-better-sqlite3", "index.js"), "//");
  fs.mkdirSync(path.join(nodeModules, "@better-sqlite3"), { recursive: true });
  fs.writeFileSync(path.join(nodeModules, "@better-sqlite3", "index.js"), "//");

  removeNativeModules(nodeModules, ["better-sqlite3"]);

  // These should survive because they don't START with "better-sqlite3"
  assertExists(path.join(nodeModules, "x-better-sqlite3"), "x-better-sqlite3 (prefix not at start)");
  assertExists(path.join(nodeModules, "@better-sqlite3"), "@better-sqlite3 (prefix not at start)");

  fs.rmSync(tmp, { recursive: true, force: true });
});
