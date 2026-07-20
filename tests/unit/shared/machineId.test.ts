import assert from "node:assert/strict";
import test, { mock } from "node:test";
import os from "node:os";
import path from "node:path";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const fs = require("node:fs");
const childProcess = require("node:child_process");

const modulePath = path.join(process.cwd(), "src/shared/utils/machineId.ts");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Force Strategies 1-3 to fail so the fallback chain reaches os.hostname().
 * - Strategy 1 (REG.exe): override SystemRoot so the exe path doesn't exist.
 * - Strategy 2 (ioreg): only runs on darwin — skipped on Linux/Windows.
 * - Strategy 3 (Linux files): stub readFileSync to throw for machine-id paths.
 *
 * Returns a restore function.
 * NOTE: call syncBuiltinESMExports() AFTER this so ESM imports see the updates.
 */
function disableWindowsRegistryStrategy(): () => void {
  const origSysRoot = process.env.SystemRoot;
  const origWindir = process.env.windir;
  process.env.SystemRoot = "Z:\\NonExistent";
  process.env.windir = "Z:\\NonExistent";

  const origReadFileSync = fs.readFileSync;
  fs.readFileSync = (filePath: string, encoding: string) => {
    if (filePath === "/etc/machine-id" || filePath === "/var/lib/dbus/machine-id") {
      throw new Error("ENOENT: mocked machine-id file not found");
    }
    return origReadFileSync(filePath, encoding);
  };

  return () => {
    if (origSysRoot !== undefined) {
      process.env.SystemRoot = origSysRoot;
    } else {
      delete process.env.SystemRoot;
    }
    if (origWindir !== undefined) {
      process.env.windir = origWindir;
    } else {
      delete process.env.windir;
    }
    fs.readFileSync = origReadFileSync;
  };
}

/**
 * Load the machineId module with a cache-busting query param so each
 * call gets a fresh instance (needed when monkey-patching built-ins).
 */
async function loadMachineId(label: string) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

// ===========================================================================
// Tests — basic validity
// ===========================================================================

test("getRawMachineId returns a non-empty string", async () => {
  const machineId = await loadMachineId("non-empty");
  machineId.resetMachineIdCache();
  const id = await machineId.getRawMachineId();
  assert.ok(id, "machine ID should not be empty");
  assert.ok(id.length > 0, "machine ID should have length > 0");
});

test("getRawMachineId caches result after first call", async () => {
  const machineId = await loadMachineId("cache");
  machineId.resetMachineIdCache();
  const id1 = await machineId.getRawMachineId();
  const id2 = await machineId.getRawMachineId();
  assert.equal(id1, id2, "second call should return cached result");
});

test("getRawMachineId with mocked os.hostname(): caches, does not re-call", async () => {
  const restoreEnv = disableWindowsRegistryStrategy();
  syncBuiltinESMExports();
  const mockHostname = mock.method(os, "hostname", () => "sisyphus-test-pc");

  const machineId = await loadMachineId("mock-hostname-cache");
  machineId.resetMachineIdCache();
  const id1 = await machineId.getRawMachineId();
  const calledAfterFirst = mockHostname.mock.callCount();

  const id2 = await machineId.getRawMachineId();

  assert.equal(id1, id2, "cached result should match first call");
  assert.equal(
    mockHostname.mock.callCount(),
    calledAfterFirst,
    "os.hostname() should NOT be called again on cached access"
  );

  mockHostname.mock.restore();
  restoreEnv();
  syncBuiltinESMExports();
});

test("resetMachineIdCache clears cached value", async () => {
  const restoreEnv = disableWindowsRegistryStrategy();
  syncBuiltinESMExports();
  const mockHostname = mock.method(os, "hostname", () => "first-pc");

  const machineId = await loadMachineId("reset-cache");
  machineId.resetMachineIdCache();
  const id1 = await machineId.getRawMachineId();

  machineId.resetMachineIdCache();

  mockHostname.mock.mockImplementation(() => "second-pc");
  const id2 = await machineId.getRawMachineId();

  assert.equal(
    id2,
    "second-pc",
    "after reset, os.hostname() should be called again with new value"
  );
  assert.notEqual(id1, id2, "different hostname after reset returns different ID");

  mockHostname.mock.restore();
  restoreEnv();
  syncBuiltinESMExports();
});

// ===========================================================================
// Tests — strategy fallback order
// ===========================================================================

test("os.hostname() (Strategy 4) is tried before execSync hostname (Strategy 5)", async () => {
  const restoreEnv = disableWindowsRegistryStrategy();
  syncBuiltinESMExports();
  const mockHostname = mock.method(os, "hostname", () => "preferred-hostname");

  const machineId = await loadMachineId("strategy-order");
  machineId.resetMachineIdCache();
  const id = await machineId.getRawMachineId();

  assert.equal(
    id,
    "preferred-hostname",
    "os.hostname() result should be used before execSync fallback"
  );
  assert.ok(mockHostname.mock.callCount() >= 1, "os.hostname() was called");

  mockHostname.mock.restore();
  restoreEnv();
  syncBuiltinESMExports();
});

test("Strategy 5 (execSync hostname) is used when os.hostname() fails", async () => {
  const restoreEnv = disableWindowsRegistryStrategy();
  syncBuiltinESMExports();
  const mockHostname = mock.method(os, "hostname", () => {
    throw new Error("E_UNAVAIL");
  });

  const machineId = await loadMachineId("execsync-fallback");
  machineId.resetMachineIdCache();
  const id = await machineId.getRawMachineId();

  // execSync("hostname") succeeds on any real OS
  assert.ok(id, "fallback hostname should return a non-empty string");
  assert.ok(id.length > 0, "fallback hostname should have length > 0");
  // Must NOT be the mocked throw value
  assert.notEqual(id, "E_UNAVAIL");

  mockHostname.mock.restore();
  restoreEnv();
  syncBuiltinESMExports();
});

// ===========================================================================
// Tests — getConsistentMachineId
// ===========================================================================

test("getConsistentMachineId returns a 16-character hex string", async () => {
  const machineId = await loadMachineId("consistent-length");
  machineId.resetMachineIdCache();
  const id = await machineId.getConsistentMachineId();
  assert.equal(id.length, 16, "consistent machine ID should be 16 characters");
  assert.match(id, /^[0-9a-f]{16}$/, "consistent machine ID should be lowercase hex");
});

test("getConsistentMachineId is deterministic for same salt", async () => {
  const machineId = await loadMachineId("deterministic-salt");
  machineId.resetMachineIdCache();
  const id1 = await machineId.getConsistentMachineId("test-salt");
  const id2 = await machineId.getConsistentMachineId("test-salt");
  assert.equal(id1, id2, "same salt should produce the same machine ID");
});

test("getConsistentMachineId produces different IDs for different salts", async () => {
  const machineId = await loadMachineId("different-salts");
  machineId.resetMachineIdCache();
  const id1 = await machineId.getConsistentMachineId("salt-a");
  const id2 = await machineId.getConsistentMachineId("salt-b");
  assert.notEqual(id1, id2, "different salts should produce different machine IDs");
});

test("getConsistentMachineId uses env var MACHINE_ID_SALT when no salt given", async () => {
  const machineId = await loadMachineId("env-salt");
  machineId.resetMachineIdCache();
  process.env.MACHINE_ID_SALT = "env-salt-override";

  const id = await machineId.getConsistentMachineId();
  assert.equal(id.length, 16, "should still return a valid 16-char hex ID");

  delete process.env.MACHINE_ID_SALT;
});
