import assert from "node:assert/strict";
import test from "node:test";

import {
  buildSmokeEnv,
  FATAL_LOG_PATTERNS,
  LINUX_EXECUTABLE_NAMES,
} from "../../scripts/smoke-electron-packaged.mjs";

test("electron smoke discovers the default Linux executable name", () => {
  assert.ok(LINUX_EXECUTABLE_NAMES.includes("omniroute-desktop"));
});

test("electron smoke env allowlists runtime variables and drops secrets", () => {
  const env = buildSmokeEnv({
    currentPlatform: "linux",
    dataDir: "/tmp/omniroute-electron-smoke-test",
    parentEnv: {
      DISPLAY: ":99",
      GITHUB_TOKEN: "should-not-leak",
      PATH: "/usr/bin",
      SNYK_TOKEN: "should-not-leak",
    },
  });

  assert.equal(env.DATA_DIR, "/tmp/omniroute-electron-smoke-test");
  assert.equal(env.DISPLAY, ":99");
  assert.equal(env.PATH, "/usr/bin");
  assert.equal(env.HOME, "/tmp/omniroute-electron-smoke-test/home");
  assert.equal(env.XDG_CONFIG_HOME, "/tmp/omniroute-electron-smoke-test/config");
  assert.equal(env.ELECTRON_ENABLE_LOGGING, "1");
  assert.equal(env.ELECTRON_ENABLE_STACK_DUMPING, "1");
  assert.equal(env.GITHUB_TOKEN, undefined);
  assert.equal(env.SNYK_TOKEN, undefined);
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
