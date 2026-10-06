import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  assertNativeDriverSelected,
  buildSmokeEnv,
  ensureSmokeEnvDirs,
  FATAL_LOG_PATTERNS,
  LINUX_EXECUTABLE_NAMES,
  stopApp,
  waitForDatabaseOpen,
  DB_TOUCH_PATH,
} from "../../scripts/dev/smoke-electron-packaged.mjs";
import { tarPack } from "../../scripts/build/optionalPackStaging.mjs";

test("electron smoke discovers the default Linux executable name", () => {
  assert.ok(LINUX_EXECUTABLE_NAMES.includes("omniroute-desktop"));
});

test("electron smoke env allowlists runtime variables and drops secrets", () => {
  const dataDir = path.join("/tmp", "omniroute-electron-smoke-test");
  const env = buildSmokeEnv({
    currentPlatform: "linux",
    dataDir,
    parentEnv: {
      DISPLAY: ":99",
      GITHUB_TOKEN: "should-not-leak",
      PATH: "/usr/bin",
      SNYK_TOKEN: "should-not-leak",
    },
  });

  // Expected values are built with path.join so the assertions hold on every
  // host platform: buildSmokeEnv() composes its redirected paths with join(),
  // which yields backslashes on Windows even when currentPlatform is "linux".
  assert.equal(env.DATA_DIR, dataDir);
  assert.equal(env.DISPLAY, ":99");
  assert.equal(env.PATH, "/usr/bin");
  assert.equal(env.HOME, path.join(dataDir, "home"));
  assert.equal(env.XDG_CONFIG_HOME, path.join(dataDir, "config"));
  assert.equal(env.ELECTRON_ENABLE_LOGGING, "1");
  assert.equal(env.ELECTRON_ENABLE_STACK_DUMPING, "1");
  assert.equal(env.GITHUB_TOKEN, undefined);
  assert.equal(env.SNYK_TOKEN, undefined);
});

test("electron smoke pre-creates the USERPROFILE-derived Roaming userData tree on Windows", async () => {
  // #7592: Electron resolves userData from %USERPROFILE%\AppData\Roaming\<name>
  // (USERPROFILE takes precedence over the APPDATA env var) and the path
  // service throws — rather than creates — when the directory is missing, so
  // requestSingleInstanceLock() returns false and the app exits(0) silently.
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-smoke-env-test-"));
  try {
    const smokeEnv = buildSmokeEnv({ currentPlatform: "win32", dataDir });
    // Inject the smoke TARGET platform: ensureSmokeEnvDirs must key its win32
    // userData-tree branches off the target, not the host OS — otherwise this
    // guard can never pass on a Linux CI host (the 8/9 red the reviewer hit).
    await ensureSmokeEnvDirs(smokeEnv, dataDir, { currentPlatform: "win32" });

    for (const appName of ["omniroute-desktop", "OmniRoute", "omniroute"]) {
      const derived = path.join(smokeEnv.USERPROFILE, "AppData", "Roaming", appName);
      assert.ok(fs.existsSync(derived), `expected pre-created derived userData dir: ${derived}`);
      const viaAppData = path.join(smokeEnv.APPDATA, appName);
      assert.ok(fs.existsSync(viaAppData), `expected pre-created APPDATA dir: ${viaAppData}`);
    }
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("electron smoke tarPack handles absolute Windows-style tarball paths", () => {
  // GNU tar treats `C:\...` in `-f` as a remote rsh target ("Cannot connect to
  // C:"), which broke optional-pack staging on Windows. tarPack() must pass a
  // bare filename with cwd at the tarball directory instead.
  const staging = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tar-pack-test-"));
  try {
    const nodeModules = path.join(staging, "pack", "node_modules");
    fs.mkdirSync(path.join(nodeModules, "fixture-pkg"), { recursive: true });
    fs.writeFileSync(path.join(nodeModules, "fixture-pkg", "index.js"), "module.exports = 1;");

    const tarballPath = path.join(staging, "optional-pack-fixture.tar.gz");
    tarPack(path.join(staging, "pack"), tarballPath);

    assert.ok(fs.existsSync(tarballPath), "tarball should exist after tarPack");
    assert.ok(fs.statSync(tarballPath).size > 0, "tarball should not be empty");
  } finally {
    fs.rmSync(staging, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("electron smoke treats Electron process errors as fatal startup logs", () => {
  const logs = [
    "[Electron] Unhandled Rejection: Error: startup failed",
    "[Electron] Uncaught Exception: Error: startup failed",
  ];

  for (const log of logs) {
    assert.ok(
      FATAL_LOG_PATTERNS.some((pattern) => pattern.test(log)),
      `${log} should match a fatal log pattern`
    );
  }
});

test("electron smoke force-terminates the Windows process tree before the parent can exit", async () => {
  const signals: string[] = [];
  const waits: number[] = [];
  const child = {
    pid: 4242,
    exitCode: 0,
    signalCode: null,
  };

  await stopApp(child, {
    currentPlatform: "win32",
    signalProcessTreeFn: async (_child, signal) => {
      signals.push(signal);
    },
    waitForProcessTreeExitFn: async (_child, timeoutMs) => {
      waits.push(timeoutMs);
    },
  });

  assert.deepEqual(signals, ["SIGKILL"]);
  assert.deepEqual(waits, [2_000]);
});

// #7592: on a cold restart against an already-persisted DATA_DIR, a stale-ABI
// better-sqlite3 binary used to fail to load and silently fall through to the
// sql.js (WASM) driver. These are the regression guards for that assertion.
test("electron smoke accepts every native SQLite driver on the startup log", () => {
  for (const driver of ["bun:sqlite", "better-sqlite3", "node:sqlite"]) {
    assert.doesNotThrow(() =>
      assertNativeDriverSelected(`[electron] [DB] Driver: ${driver} | file: /data/storage.sqlite`)
    );
  }
});

test("electron smoke flags a cold-restart fallback to the sql.js WASM driver", () => {
  assert.throws(
    () => assertNativeDriverSelected("[electron] [DB] Driver: sql.js | file: /data/storage.sqlite"),
    /fell back to the sql\.js \(WASM\) driver/
  );
});

test("electron smoke flags startup logs missing any driver selection line", () => {
  assert.throws(
    () => assertNativeDriverSelected("[electron] [server] listening on 20128"),
    /no database activity/
  );
});

test("electron smoke waits for database-open evidence after touching a DB-backed endpoint", async () => {
  assert.equal(DB_TOUCH_PATH, "/api/monitoring/health");
  let logs = "[electron] [Server] [STARTUP] ready\n";
  setTimeout(() => {
    logs += "[electron] [Server] [DB] Added usage_history.combo_strategy column\n";
  }, 60);
  const seen = await waitForDatabaseOpen(() => logs, { timeoutMs: 2_000, pollMs: 20 });
  assert.match(seen, /\[DB\] Added/);
});

test("electron smoke fails clearly when the database never opens", async () => {
  await assert.rejects(
    () =>
      waitForDatabaseOpen(() => "[electron] [Server] [STARTUP] ready\n", {
        timeoutMs: 120,
        pollMs: 20,
      }),
    /logged no \[DB\]\/\[Migration\] startup line within 120ms/
  );
});

test("electron smoke driver guard: native line, DB evidence and sql.js fallback", () => {
  assert.doesNotThrow(() =>
    assertNativeDriverSelected("[DB] Driver: better-sqlite3 | file: /tmp/x/storage.sqlite\n")
  );
  assert.doesNotThrow(() =>
    assertNativeDriverSelected(
      "[electron] [Server] [DB] Added call_logs.session_tag column\n[electron] [Server] [Migration] Applied: 046_database_settings\n"
    )
  );
  assert.throws(
    () => assertNativeDriverSelected("[DB] Driver: sql.js | file: /tmp/x/storage.sqlite\n"),
    /sql\.js \(WASM\) driver/
  );
  assert.throws(
    () => assertNativeDriverSelected("[STARTUP] nothing here\n"),
    /no database activity/
  );
});
