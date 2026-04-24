import test from "node:test";
import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  writeFileSync,
  unlinkSync,
  readdirSync,
  mkdtempSync,
  rmdirSync,
} from "fs";
import { join } from "path";
import { tmpdir } from "os";

// Dynamically import the module under test so we can control env vars per subtest.
const { getAppLogRotationCheckInterval } = await import("../../src/lib/logRotation.ts");

test("getAppLogRotationCheckInterval — default", () => {
  delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  assert.equal(getAppLogRotationCheckInterval(), 60_000);
});

test("getAppLogRotationCheckInterval — custom ms", () => {
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "30000";
  try {
    assert.equal(getAppLogRotationCheckInterval(), 30_000);
  } finally {
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  }
});

test("getAppLogRotationCheckInterval — invalid value falls back to default", () => {
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "not-a-number";
  try {
    assert.equal(getAppLogRotationCheckInterval(), 60_000);
  } finally {
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  }
});

test("getAppLogRotationCheckInterval — zero/negative falls back to default", () => {
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "0";
  try {
    assert.equal(getAppLogRotationCheckInterval(), 60_000);
  } finally {
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  }
});

// ── rotateIfNeeded ────────────────────────────────────────────────────────────

test("rotateIfNeeded — skips when file does not exist", async () => {
  const { rotateIfNeeded } = await import("../../src/lib/logRotation.ts");
  rotateIfNeeded("/non/existent/path.log", 50 * 1024 * 1024); // must not throw
});

test("rotateIfNeeded — skips when file is below max size", async () => {
  const { rotateIfNeeded } = await import("../../src/lib/logRotation.ts");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-small-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  writeFileSync(logPath, "small content\n");

  try {
    // Call with explicit maxSize (50 MB) — bypasses any cached env-level config.
    rotateIfNeeded(logPath, 50 * 1024 * 1024);
    // File must still exist and not be rotated
    assert.ok(existsSync(logPath), "log file should still exist");
    // rotated = files that match the rotated pattern AND are NOT the active log itself
    const rotated = readdirSync(dir).filter(
      (f) => f.startsWith("app.") && f.endsWith(".log") && f !== "app.log"
    );
    assert.equal(rotated.length, 0, "no rotated files expected");
  } finally {
    unlinkSync(logPath);
    rmdirSync(dir);
  }
});

test("rotateIfNeeded — rotates when file exceeds max size", async () => {
  const { rotateIfNeeded } = await import("../../src/lib/logRotation.ts");
  const dir = mkdtempSync(join(tmpdir(), `rot-test-large-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  // Write content larger than 100 bytes to trigger rotation (maxSize = 100)
  writeFileSync(logPath, "x".repeat(150));

  try {
    rotateIfNeeded(logPath, 100);
    // Original file must have been renamed
    assert.ok(!existsSync(logPath), "original log file should be renamed");
    const rotated = readdirSync(dir).find(
      (f) => f.startsWith("app.") && f.endsWith(".log") && f !== "app.log"
    );
    assert.ok(rotated, "a rotated file should exist");
  } finally {
    for (const f of readdirSync(dir)) {
      unlinkSync(join(dir, f));
    }
    rmdirSync(dir);
  }
});

// ── closeLogRotation ───────────────────────────────────────────────────────────

test("closeLogRotation — idempotent (safe to call twice)", async () => {
  // Temporarily set a very short check interval so initLogRotation starts a timer.
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "10000";
  const { initLogRotation, closeLogRotation } = await import("../../src/lib/logRotation.ts");

  try {
    initLogRotation(); // starts a timer
    closeLogRotation(); // stops it
    closeLogRotation(); // must not throw — idempotent
  } finally {
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
  }
});

// ── Periodic rotation timer — integration ──────────────────────────────────────

test("periodic timer actually fires and rotates a large log", async () => {
  // Use a short interval (250 ms) and small max size to trigger rotation quickly.
  process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS = "250";
  const { initLogRotation, closeLogRotation } = await import("../../src/lib/logRotation.ts");

  const dir = mkdtempSync(join(tmpdir(), `rot-test-periodic-${Date.now()}-`));
  const logPath = join(dir, "app.log");
  // Write a file just under the 1 MB threshold
  writeFileSync(logPath, "y".repeat(900 * 1024));

  try {
    // Override max file size to 1 MB via env (parseFileSize handles the suffix)
    process.env.APP_LOG_MAX_FILE_SIZE = "1M";
    initLogRotation();

    // Append enough to exceed 1 MB — after the next timer tick (≤250 ms)
    // the rotation should trigger.
    await new Promise<void>((resolve) => setTimeout(resolve, 600));
    writeFileSync(logPath, "y".repeat(200 * 1024)); // now 1.1 MB total

    await new Promise<void>((resolve) => setTimeout(resolve, 600));

    const rotatedExists =
      readdirSync(dir).filter((f) => f.startsWith("app.") && f.endsWith(".log")).length > 0;
    assert.ok(
      rotatedExists,
      "a rotated file should exist after periodic check fired on an oversized log"
    );
  } finally {
    closeLogRotation();
    delete process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS;
    delete process.env.APP_LOG_MAX_FILE_SIZE;
    for (const f of readdirSync(dir)) {
      unlinkSync(join(dir, f));
    }
    rmdirSync(dir);
  }
});

// (cleanup done inline with rmdirSync)
