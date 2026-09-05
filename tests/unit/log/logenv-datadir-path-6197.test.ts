/**
 * Regression test for #6197 — default app log path must resolve under DATA_DIR,
 * not process.cwd().
 *
 * The globally-installed `omniroute` CLI runs from an arbitrary working directory
 * (whatever the user's shell happens to be in), so anchoring the default log file
 * to `process.cwd()` means file logging silently writes to (or fails under) a
 * directory unrelated to the app's data home. The `.env.example` docs promise the
 * default is relative to DATA_DIR — this test pins that contract.
 *
 * Fix: `getAppLogFilePath()` resolves the default lazily via `resolveDataDir()`
 * (pure resolver from `@/lib/dataPaths`) so it honours the DATA_DIR env var and the
 * default user data dir, never the transient cwd.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import os from "node:os";
import { getAppLogFilePath } from "@/lib/logEnv";
import { resolveDataDir } from "@/lib/dataPaths";

function withEnv(overrides: Record<string, string | undefined>, fn: () => void) {
  const keys = Object.keys(overrides);
  const saved: Record<string, string | undefined> = {};
  for (const k of keys) saved[k] = process.env[k];
  try {
    for (const k of keys) {
      if (overrides[k] === undefined) delete process.env[k];
      else process.env[k] = overrides[k];
    }
    fn();
  } finally {
    for (const k of keys) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
  }
}

test("getAppLogFilePath: default anchors to DATA_DIR, not process.cwd()", () => {
  const dataDir = path.join(os.tmpdir(), "omni-log-6197");
  withEnv({ DATA_DIR: dataDir, APP_LOG_FILE_PATH: undefined }, () => {
    const resolved = getAppLogFilePath();
    assert.ok(
      resolved.startsWith(path.resolve(dataDir)),
      `expected log path under DATA_DIR (${dataDir}), got ${resolved}`
    );
    assert.ok(
      !resolved.startsWith(path.resolve(process.cwd())) ||
        path.resolve(dataDir).startsWith(path.resolve(process.cwd())),
      `log path must not be anchored to cwd; got ${resolved}`
    );
    assert.equal(
      resolved,
      path.join(resolveDataDir(), "logs", "application", "app.log")
    );
  });
});

test("getAppLogFilePath: default with no DATA_DIR uses default data dir, not cwd", () => {
  withEnv({ DATA_DIR: undefined, APP_LOG_FILE_PATH: undefined }, () => {
    const resolved = getAppLogFilePath();
    assert.equal(
      resolved,
      path.join(resolveDataDir(), "logs", "application", "app.log")
    );
  });
});

test("getAppLogFilePath: explicit APP_LOG_FILE_PATH still takes precedence", () => {
  const explicit = path.join(os.tmpdir(), "custom", "my.log");
  withEnv({ DATA_DIR: "/some/other/dir", APP_LOG_FILE_PATH: explicit }, () => {
    assert.equal(getAppLogFilePath(), explicit);
  });
});
