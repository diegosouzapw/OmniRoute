import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { pathToFileURL } from "node:url";

// #12563 companion: end-to-end `getCliRuntimeStatus` must mark an npm-style
// `.cmd` shim runnable (not `settings_found_binary_unresolved`). Helper-path
// enumeration lives in cli-runtime-windows-node-12563.test.ts so this file can
// import cliRuntime.ts the same way the other runtime suites do.

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const modulePath = path.join(process.cwd(), "src/shared/services/cliRuntime.ts");

const originalSpawn = childProcess.spawn;
const originalExecFileSync = childProcess.execFileSync;
const originalEnv = { ...process.env };

async function importFresh(label: string) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`);
}

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
}

after(() => {
  childProcess.spawn = originalSpawn;
  childProcess.execFileSync = originalExecFileSync;
  syncBuiltinESMExports();
  restoreEnv();
});

describe("#12563 — npm .cmd shim is runnable via known paths", () => {
  it("marks Claude runnable from an npm-style .cmd shim (not settings fallback)", async () => {
    if (process.platform !== "win32") return;

    const prefixDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12563-npm-"));
    const cmdPath = path.join(prefixDir, "claude.cmd");
    fs.writeFileSync(
      cmdPath,
      "@echo off\r\necho 2.1.259 (Claude Code)\r\nREM padding padding padding padding\r\n"
    );

    process.env.npm_config_prefix = prefixDir;
    process.env.PATH = "C:\\Windows\\System32";
    process.env.Path = process.env.PATH;
    delete process.env.CLI_CLAUDE_BIN;
    delete process.env.CLI_EXTRA_PATHS;

    childProcess.execFileSync = () => {
      throw new Error("npm should not be consulted when npm_config_prefix is set");
    };
    syncBuiltinESMExports();

    try {
      const cliRuntime = await importFresh("npm-cmd-shim-runnable");
      const status = await cliRuntime.getCliRuntimeStatus("claude");

      assert.equal(status.installed, true, `expected installed, got reason=${status.reason}`);
      assert.equal(status.runnable, true, `expected runnable, got reason=${status.reason}`);
      assert.equal(status.reason, null);
      assert.equal(status.commandPath, cmdPath);
      assert.notEqual(status.reason, "settings_found_binary_unresolved");
    } finally {
      fs.rmSync(prefixDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });
});
