/**
 * Shared test helper for Windows-safe DATA_DIR isolation and cleanup.
 *
 * On Windows, a directory cannot be removed while it contains open file handles
 * (SQLite database + WAL/SHM sidecars). This helper ensures the DB is closed
 * via `core.resetDbInstance()` before attempting directory removal.
 *
 * Usage:
 *   import { createIsolatedTestEnv } from "../../../_setup/withIsolatedDataDir.ts";
 *   const { testDataDir, cleanup } = createIsolatedTestEnv("my-test-prefix");
 *   // process.env.DATA_DIR is set to testDataDir
 *   test.after(() => cleanup());
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { SqliteDatabase } from "../../src/lib/db/adapters/types.ts";

let coreModule: { resetDbInstance: () => void; getDbInstance: () => SqliteDatabase } | null = null;

async function loadCore() {
  if (!coreModule) {
    coreModule = await import("../../src/lib/db/core.ts");
  }
  return coreModule;
}

export interface IsolatedTestEnv {
  testDataDir: string;
  originalDataDir: string | undefined;
  cleanup: () => Promise<void>;
}

/**
 * Creates an isolated test environment with a unique temp DATA_DIR.
 * Returns the testDataDir and a cleanup function that properly closes the DB
 * before removing the directory (Windows-safe).
 */
export async function createIsolatedTestEnv(prefix = "omniroute-test-"): Promise<IsolatedTestEnv> {
  const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  const originalDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = testDataDir;

  const cleanup = async () => {
    const core = await loadCore();
    // Close the database connection first (critical on Windows)
    core.resetDbInstance();
    // Give the OS a moment to release file handles
    await new Promise((resolve) => setTimeout(resolve, 50));
    // Remove the temp directory
    try {
      fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // Ignore - OS will clean up temp dir eventually
    }
    // Restore original DATA_DIR
    if (originalDataDir === undefined) {
      delete process.env.DATA_DIR;
    } else {
      process.env.DATA_DIR = originalDataDir;
    }
  };

  return { testDataDir, originalDataDir, cleanup };
}

/**
 * Synchronous version for simpler test files that don't need async setup.
 * Must be paired with `cleanupIsolatedTestEnv()` in test.after().
 */
export function createIsolatedTestEnvSync(prefix = "omniroute-test-"): {
  testDataDir: string;
  originalDataDir: string | undefined;
} {
  const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  const originalDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = testDataDir;
  return { testDataDir, originalDataDir };
}

/**
 * Windows-safe cleanup: closes DB then removes directory.
 * Call this in test.after().
 */
export async function cleanupIsolatedTestEnv(
  testDataDir: string,
  originalDataDir: string | undefined
): Promise<void> {
  const core = await loadCore();
  core.resetDbInstance();
  await new Promise((resolve) => setTimeout(resolve, 50));
  try {
    fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // Ignore
  }
  if (originalDataDir === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = originalDataDir;
  }
}

/**
 * Synchronous cleanup (less safe on Windows, but works if DB wasn't opened).
 * Prefer the async version above.
 */
export function cleanupIsolatedTestEnvSync(
  testDataDir: string,
  originalDataDir: string | undefined
): void {
  try {
    fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // Ignore
  }
  if (originalDataDir === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = originalDataDir;
  }
}
