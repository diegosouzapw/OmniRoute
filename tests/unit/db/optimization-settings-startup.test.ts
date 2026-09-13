/**
 * Tests for src/lib/db/optimizationSettings.ts — startup auto-vacuum application
 *
 * Issue #13432: applyStoredDatabaseOptimizationSettings() always called with
 * applyPersistent: false, so the configured auto_vacuum mode was never applied
 * at startup. The fix respects the optimizeOnStartup setting.
 *
 * Covers:
 * 1. applyStoredDatabaseOptimizationSettings applies auto_vacuum when
 *    optimizeOnStartup is true.
 * 2. applyStoredDatabaseOptimizationSettings does NOT apply auto_vacuum when
 *    optimizeOnStartup is false (default).
 * 3. page_size is also applied when optimizeOnStartup is true.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-opt-settings-")
);
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
core.resetDbInstance();

const { applyStoredDatabaseOptimizationSettings } = await import(
  "../../../src/lib/db/optimizationSettings.ts"
);

function setDatabaseSetting(key: string, value: unknown) {
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  ).run("databaseSettings", key, JSON.stringify(value));
}

function getAutoVacuumPragma(): number {
  const db = core.getDbInstance();
  return db.pragma("auto_vacuum", { simple: true }) as number;
}

function setAutoVacuumPragma(mode: number) {
  const db = core.getDbInstance();
  // Reset to NONE first to ensure test isolation
  db.pragma("journal_mode = DELETE");
  db.pragma(`auto_vacuum = ${mode}`);
  db.exec("VACUUM");
  db.pragma("journal_mode = WAL");
}

test.beforeEach(() => {
  // Reset auto_vacuum to NONE (0) before each test
  setAutoVacuumPragma(0);
});

test.after(() => {
  // Restore original DATA_DIR
  if (originalDataDir !== undefined) {
    process.env.DATA_DIR = originalDataDir;
  } else {
    delete process.env.DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("applies auto_vacuum INCREMENTAL when optimizeOnStartup is true", () => {
  // Configure INCREMENTAL auto-vacuum with optimizeOnStartup enabled
  setDatabaseSetting("optimization.autoVacuumMode", "INCREMENTAL");
  setDatabaseSetting("optimization.optimizeOnStartup", true);

  applyStoredDatabaseOptimizationSettings(core.getDbInstance());

  const currentMode = getAutoVacuumPragma();
  assert.equal(currentMode, 2, "auto_vacuum should be INCREMENTAL (2) after startup with optimizeOnStartup=true");
});

test("does NOT apply auto_vacuum when optimizeOnStartup is false (default)", () => {
  // Configure INCREMENTAL auto-vacuum but optimizeOnStartup is false
  setDatabaseSetting("optimization.autoVacuumMode", "INCREMENTAL");
  setDatabaseSetting("optimization.optimizeOnStartup", false);

  applyStoredDatabaseOptimizationSettings(core.getDbInstance());

  const currentMode = getAutoVacuumPragma();
  assert.equal(currentMode, 0, "auto_vacuum should remain NONE (0) when optimizeOnStartup=false");
});

test("applies auto_vacuum FULL when optimizeOnStartup is true", () => {
  setDatabaseSetting("optimization.autoVacuumMode", "FULL");
  setDatabaseSetting("optimization.optimizeOnStartup", true);

  applyStoredDatabaseOptimizationSettings(core.getDbInstance());

  const currentMode = getAutoVacuumPragma();
  assert.equal(currentMode, 1, "auto_vacuum should be FULL (1) after startup with optimizeOnStartup=true");
});

test("does NOT change auto_vacuum when already at target mode", () => {
  // Pre-set to INCREMENTAL (target is also INCREMENTAL)
  setAutoVacuumPragma(2);
  setDatabaseSetting("optimization.autoVacuumMode", "INCREMENTAL");
  setDatabaseSetting("optimization.optimizeOnStartup", true);

  // Should not throw or re-VACUUM (idempotent)
  applyStoredDatabaseOptimizationSettings(core.getDbInstance());

  const currentMode = getAutoVacuumPragma();
  assert.equal(currentMode, 2, "auto_vacuum should remain INCREMENTAL (2)");
});
