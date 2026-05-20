import test from "node:test";
import assert from "node:assert/strict";

import { isNativeSqliteLoadError } from "../../src/lib/db/core";

test("isNativeSqliteLoadError detects Module did not self-register", () => {
  const err = new Error("Module did not self-register: better_sqlite3.node");
  assert.equal(isNativeSqliteLoadError(err), true);
});

test("isNativeSqliteLoadError detects NODE_MODULE_VERSION mismatch", () => {
  const err = new Error(
    "The module was compiled against a different Node.js version using NODE_MODULE_VERSION 115."
  );
  assert.equal(isNativeSqliteLoadError(err), true);
});

test("isNativeSqliteLoadError detects ERR_DLOPEN_FAILED in message", () => {
  const err = new Error("ERR_DLOPEN_FAILED while loading better_sqlite3.node");
  assert.equal(isNativeSqliteLoadError(err), true);
});

test("isNativeSqliteLoadError detects ERR_DLOPEN_FAILED via error.code", () => {
  const err = Object.assign(new Error("dlopen failed"), { code: "ERR_DLOPEN_FAILED" });
  assert.equal(isNativeSqliteLoadError(err), true);
});

// #2358 — bun and similar runtimes skip postinstall, so the *.node binary
// is never downloaded. `bindings()` produces this exact message before any
// DLOPEN even happens, and we need to surface the friendly rebuild guide.
test("isNativeSqliteLoadError detects 'Could not locate the bindings file' (bun #2358)", () => {
  const err = new Error(
    "Could not locate the bindings file. Tried: → /Users/x/.../better-sqlite3/build/better_sqlite3.node"
  );
  assert.equal(isNativeSqliteLoadError(err), true);
});

test("isNativeSqliteLoadError detects 'Cannot find module better-sqlite3'", () => {
  const err = new Error("Cannot find module 'better-sqlite3'");
  assert.equal(isNativeSqliteLoadError(err), true);
});

test("isNativeSqliteLoadError detects MODULE_NOT_FOUND via error.code", () => {
  const err = Object.assign(new Error("not found"), { code: "MODULE_NOT_FOUND" });
  assert.equal(isNativeSqliteLoadError(err), true);
});

test("isNativeSqliteLoadError returns false for unrelated errors", () => {
  assert.equal(isNativeSqliteLoadError(new Error("SQLITE_BUSY: database is locked")), false);
  assert.equal(isNativeSqliteLoadError(new Error("ENOENT: no such file")), false);
  assert.equal(isNativeSqliteLoadError(null), false);
  assert.equal(isNativeSqliteLoadError(undefined), false);
  assert.equal(isNativeSqliteLoadError("some string"), false);
});
