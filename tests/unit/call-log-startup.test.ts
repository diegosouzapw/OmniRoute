import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-startup-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

async function removeTestDataDir() {
  let lastError;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      core.resetDbInstance();
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      return;
    } catch (error: any) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }

  if (lastError) {
    throw lastError;
  }
}

test.after(async () => {
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  await removeTestDataDir();
});

test("callLogs startup cleanup swallows unexpected rotateCallLogs bootstrap failures", async () => {
  process.env.DATA_DIR = TEST_DATA_DIR;
  const expectedCallLogsDir = path.resolve(TEST_DATA_DIR, "call_logs");

  const originalExistsSync = fs.existsSync;
  const originalConsoleError = console.error;
  const consoleCalls = [];

  fs.existsSync = (targetPath, ...args) => {
    if (path.resolve(String(targetPath)) === expectedCallLogsDir) {
      throw new Error("simulated startup exists failure");
    }
    return originalExistsSync.call(fs, targetPath, ...args);
  };
  console.error = (...args) => {
    consoleCalls.push(args.join(" "));
  };

  try {
    const moduleUrl = new URL("../../src/lib/usage/callLogs.ts?startup-catch", import.meta.url);
    await assert.doesNotReject(() => import(moduleUrl.href));
  } finally {
    fs.existsSync = originalExistsSync;
    console.error = originalConsoleError;
  }

  assert.ok(consoleCalls.every((line) => typeof line === "string"));
});
