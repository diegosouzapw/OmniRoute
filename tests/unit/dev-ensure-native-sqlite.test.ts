import { test } from "node:test";
import assert from "node:assert/strict";

import {
  ensureNativeSqlite,
  isNativeAbiMismatch,
} from "../../scripts/dev/ensure-native-sqlite.mjs";

// A binary path that is guaranteed to exist so the existsSync() guard passes;
// the injected probe controls the actual outcome.
const EXISTING_PATH = process.execPath;
const silentLogger = { warn() {}, error() {}, log() {} };

// The exact message a Node 24 process produces against a Node 22 (ABI 127) binary.
const ABI_ERROR =
  "The module '/x/node_modules/better-sqlite3/build/Release/better_sqlite3.node' " +
  "was compiled against a different Node.js version using NODE_MODULE_VERSION 127. " +
  "This version of Node.js requires NODE_MODULE_VERSION 137.";

test("isNativeAbiMismatch detects ABI / native-load errors", () => {
  assert.equal(isNativeAbiMismatch(ABI_ERROR), true);
  assert.equal(isNativeAbiMismatch("Module did not self-register"), true);
  assert.equal(isNativeAbiMismatch("ERR_DLOPEN_FAILED: bad bits"), true);
  assert.equal(isNativeAbiMismatch("Could not locate the bindings file"), true);
});

test("isNativeAbiMismatch ignores unrelated errors", () => {
  assert.equal(isNativeAbiMismatch("SQLITE_ERROR: no such table: foo"), false);
  assert.equal(isNativeAbiMismatch("ENOENT: no such file"), false);
  assert.equal(isNativeAbiMismatch(""), false);
  assert.equal(isNativeAbiMismatch(null), false);
  assert.equal(isNativeAbiMismatch(undefined), false);
});

test("ensureNativeSqlite: healthy binary does nothing (fast path)", () => {
  let rebuilt = 0;
  const res = ensureNativeSqlite({
    logger: silentLogger,
    binaryPath: EXISTING_PATH,
    probe: () => {
      /* loads fine */
    },
    rebuild: () => {
      rebuilt++;
      return true;
    },
  });
  assert.deepEqual(res, { ok: true, rebuilt: false });
  assert.equal(rebuilt, 0, "must not rebuild when the ABI already matches");
});

test("ensureNativeSqlite: ABI mismatch triggers exactly one rebuild", () => {
  let rebuilt = 0;
  const res = ensureNativeSqlite({
    logger: silentLogger,
    binaryPath: EXISTING_PATH,
    probe: () => {
      throw new Error(ABI_ERROR);
    },
    rebuild: () => {
      rebuilt++;
      return true;
    },
  });
  assert.equal(res.ok, true);
  assert.equal(res.rebuilt, true);
  assert.equal(rebuilt, 1, "rebuild must run once on ABI mismatch");
});

test("ensureNativeSqlite: failed rebuild reports ok=false", () => {
  const res = ensureNativeSqlite({
    logger: silentLogger,
    binaryPath: EXISTING_PATH,
    probe: () => {
      throw new Error(ABI_ERROR);
    },
    rebuild: () => false,
  });
  assert.equal(res.ok, false);
  assert.equal(res.rebuilt, false);
});

test("ensureNativeSqlite: unrelated load error is NOT swallowed and does not rebuild", () => {
  let rebuilt = 0;
  const res = ensureNativeSqlite({
    logger: silentLogger,
    binaryPath: EXISTING_PATH,
    probe: () => {
      throw new Error("SQLITE_CANTOPEN: unable to open database file");
    },
    rebuild: () => {
      rebuilt++;
      return true;
    },
  });
  assert.equal(res.ok, false);
  assert.equal(res.rebuilt, false);
  assert.ok(res.error instanceof Error);
  assert.equal(rebuilt, 0, "must not rebuild for unrelated errors");
});

test("ensureNativeSqlite: missing binary is a no-op (pre-install)", () => {
  const res = ensureNativeSqlite({
    logger: silentLogger,
    binaryPath: "/path/that/does/not/exist/better_sqlite3.node",
    probe: () => {
      throw new Error("should not be called");
    },
    rebuild: () => true,
  });
  assert.deepEqual(res, { ok: true, rebuilt: false });
});
