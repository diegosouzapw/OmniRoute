import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import os from "os";
import path from "path";
import { createRequire, syncBuiltinESMExports } from "node:module";
import { pathToFileURL } from "node:url";

// #12563 — a failed `npm config get prefix` must not permanently poison the
// process-lifetime cache as "". Env recovery and soft-fail retry keep custom
// npm prefixes / nvm-windows discoverable after a cold Electron PATH miss.

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");
const modulePath = path.join(process.cwd(), "src/shared/services/cliRuntimeNpmPrefix.ts");

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

afterEach(() => {
  childProcess.execFileSync = originalExecFileSync;
  syncBuiltinESMExports();
  restoreEnv();
});

describe("#12563 — npm global prefix soft-fail cache", () => {
  it("does not permanently cache an empty prefix after npm spawn failure", async () => {
    delete process.env.npm_config_prefix;

    let calls = 0;
    childProcess.execFileSync = () => {
      calls += 1;
      throw new Error("npm missing from PATH");
    };
    syncBuiltinESMExports();

    const mod = await importFresh("soft-fail");
    assert.equal(mod.getNpmGlobalPrefix(), "");
    assert.equal(calls, 1);

    // Still inside the retry window — do not re-spawn, but also do not lock "".
    assert.equal(mod.getNpmGlobalPrefix(), "");
    assert.equal(calls, 1);

    // Env can recover without waiting for the retry window.
    const recovered = path.join(os.tmpdir(), "omniroute-12563-recovered-prefix");
    process.env.npm_config_prefix = recovered;
    assert.equal(mod.getNpmGlobalPrefix(), recovered);
    assert.equal(calls, 1);
  });

  it("caches a successful npm prefix and skips further spawns", async () => {
    delete process.env.npm_config_prefix;
    const prefix = path.join(os.tmpdir(), "omniroute-12563-ok-prefix");

    let calls = 0;
    childProcess.execFileSync = () => {
      calls += 1;
      return `${prefix}\n`;
    };
    syncBuiltinESMExports();

    const mod = await importFresh("success-cache");
    assert.equal(mod.getNpmGlobalPrefix(), prefix);
    assert.equal(mod.getNpmGlobalPrefix(), prefix);
    assert.equal(calls, 1);
  });

  it("reset helper clears success so a later failure can soft-fail again", async () => {
    delete process.env.npm_config_prefix;
    const prefix = path.join(os.tmpdir(), "omniroute-12563-reset-prefix");

    childProcess.execFileSync = () => `${prefix}\n`;
    syncBuiltinESMExports();

    const mod = await importFresh("reset");
    assert.equal(mod.getNpmGlobalPrefix(), prefix);

    mod.__resetNpmGlobalPrefixCacheForTests();
    childProcess.execFileSync = () => {
      throw new Error("boom");
    };
    syncBuiltinESMExports();

    assert.equal(mod.getNpmGlobalPrefix(), "");
  });
});
