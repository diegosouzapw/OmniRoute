import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { cleanupOldLogs, cleanupOverflowLogs, getLogConfig } =
  await import("../../src/lib/logRotation.ts");

test("getLogConfig reads APP_LOG_* values", () => {
  const originalEnv = {
    APP_LOG_TO_FILE: process.env.APP_LOG_TO_FILE,
    APP_LOG_FILE_PATH: process.env.APP_LOG_FILE_PATH,
    APP_LOG_MAX_FILE_SIZE: process.env.APP_LOG_MAX_FILE_SIZE,
    APP_LOG_RETENTION_DAYS: process.env.APP_LOG_RETENTION_DAYS,
    APP_LOG_MAX_FILES: process.env.APP_LOG_MAX_FILES,
  };

  process.env.APP_LOG_TO_FILE = "false";
  process.env.APP_LOG_FILE_PATH = "/tmp/omniroute-test-app.log";
  process.env.APP_LOG_MAX_FILE_SIZE = "64M";
  process.env.APP_LOG_RETENTION_DAYS = "14";
  process.env.APP_LOG_MAX_FILES = "12";

  try {
    const config = getLogConfig();

    assert.equal(config.logToFile, false);
    assert.equal(config.logFilePath, "/tmp/omniroute-test-app.log");
    assert.equal(config.maxFileSize, 64 * 1024 * 1024);
    assert.equal(config.retentionDays, 14);
    assert.equal(config.maxFiles, 12);
  } finally {
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
});

test("app log cleanup honors both retention days and file count", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-log-rotation-"));
  const logFilePath = path.join(tmpDir, "app.log");

  fs.writeFileSync(logFilePath, "", "utf8");

  const oldFile = path.join(tmpDir, "app.2026-03-01_010101.log");
  const keepA = path.join(tmpDir, "app.2026-03-02_010101.log");
  const keepB = path.join(tmpDir, "app.2026-03-03_010101.log");
  const dropByCount = path.join(tmpDir, "app.2026-03-04_010101.log");

  for (const file of [oldFile, keepA, keepB, dropByCount]) {
    fs.writeFileSync(file, file, "utf8");
  }

  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  fs.utimesSync(oldFile, new Date(now - 10 * oneDay), new Date(now - 10 * oneDay));
  fs.utimesSync(keepA, new Date(now - 3 * oneDay), new Date(now - 3 * oneDay));
  fs.utimesSync(keepB, new Date(now - 2 * oneDay), new Date(now - 2 * oneDay));
  fs.utimesSync(dropByCount, new Date(now - oneDay), new Date(now - oneDay));

  cleanupOldLogs(logFilePath, 7);
  cleanupOverflowLogs(logFilePath, 2);

  assert.equal(fs.existsSync(oldFile), false);
  assert.equal(fs.existsSync(keepA), false);
  assert.equal(fs.existsSync(keepB), true);
  assert.equal(fs.existsSync(dropByCount), true);

  fs.rmSync(tmpDir, { recursive: true, force: true });
});
