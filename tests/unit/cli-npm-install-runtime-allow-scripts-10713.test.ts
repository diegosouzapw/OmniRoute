import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, chmodSync, readFileSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { npmInstallRuntime } from "../../bin/cli/runtime/nativeDeps.mjs";

// #14355: npm 11+ hard-rejects `--allow-scripts=<pkg>` as a CLI flag for
// project-scoped installs (EALLOWSCRIPTS). The mechanism for satisfying
// #10713's original requirement — that better-sqlite3's install script is
// actually permitted to run — moved from a CLI flag to the `allowScripts`
// field in the runtime package.json, which every npm version that
// recognizes install-script restrictions at all honors.
test("issue #10713 / #14355: npmInstallRuntime grants better-sqlite3 script permission via the runtime package.json, not a rejected CLI flag", () => {
  const fakeBinDir = mkdtempSync(join(tmpdir(), "omniroute-fakenpm-"));
  const argvLog = join(fakeBinDir, "argv.log");
  const npmScript = join(fakeBinDir, "npm");
  writeFileSync(npmScript, `#!/usr/bin/env bash\nprintf '%s\\n' "$@" > "${argvLog}"\nexit 0\n`);
  chmodSync(npmScript, 0o755);

  const originalPath = process.env.PATH;
  const originalDataDir = process.env.DATA_DIR;
  const fakeDataDir = mkdtempSync(join(tmpdir(), "omniroute-fakedata-"));
  try {
    process.env.PATH = `${fakeBinDir}:${originalPath}`;
    process.env.DATA_DIR = fakeDataDir;

    const ok = npmInstallRuntime(["better-sqlite3@12.10.1"], { silent: true });

    assert.equal(ok, true, "npm exits 0 for a normal install");
    assert.ok(existsSync(argvLog), "fake npm should have been invoked");

    const argv = readFileSync(argvLog, "utf8");

    // The old CLI flag must be gone — npm 11+ errors out (EALLOWSCRIPTS) if
    // it's present for a project-scoped install like this one.
    assert.ok(
      !argv.includes("--allow-scripts"),
      "npm must NOT be passed --allow-scripts as a CLI flag (rejected by npm 11+). argv was:\n" +
        argv
    );

    // Instead, the runtime package.json (written by ensureRuntimeDir(), which
    // npmInstallRuntime calls before spawning npm) must declare it.
    const runtimePkgPath = join(fakeDataDir, "runtime", "package.json");
    assert.ok(existsSync(runtimePkgPath), "runtime package.json should have been created");
    const runtimePkg = JSON.parse(readFileSync(runtimePkgPath, "utf8"));
    assert.ok(
      Array.isArray(runtimePkg.allowScripts) && runtimePkg.allowScripts.includes("better-sqlite3"),
      `runtime package.json must list better-sqlite3 in allowScripts, got: ${JSON.stringify(runtimePkg.allowScripts)}`
    );
  } finally {
    process.env.PATH = originalPath;
    if (originalDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = originalDataDir;
    rmSync(fakeBinDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    rmSync(fakeDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("#14355: an existing runtime package.json without allowScripts is retrofitted on the next install", () => {
  const fakeBinDir = mkdtempSync(join(tmpdir(), "omniroute-fakenpm-retrofit-"));
  const npmScript = join(fakeBinDir, "npm");
  writeFileSync(npmScript, `#!/usr/bin/env bash\nexit 0\n`);
  chmodSync(npmScript, 0o755);

  const originalPath = process.env.PATH;
  const originalDataDir = process.env.DATA_DIR;
  const fakeDataDir = mkdtempSync(join(tmpdir(), "omniroute-fakedata-retrofit-"));
  try {
    process.env.PATH = `${fakeBinDir}:${originalPath}`;
    process.env.DATA_DIR = fakeDataDir;

    // Simulate a runtime dir created by an older OmniRoute version, before
    // this fix existed — no allowScripts field at all.
    const runtimeDir = join(fakeDataDir, "runtime");
    mkdirSync(runtimeDir, { recursive: true });
    const runtimePkgPath = join(runtimeDir, "package.json");
    writeFileSync(
      runtimePkgPath,
      JSON.stringify(
        { name: "omniroute-runtime", version: "1.0.0", private: true },
        null,
        2
      )
    );

    npmInstallRuntime(["better-sqlite3@12.10.1"], { silent: true });

    const runtimePkg = JSON.parse(readFileSync(runtimePkgPath, "utf8"));
    assert.ok(
      Array.isArray(runtimePkg.allowScripts) && runtimePkg.allowScripts.includes("better-sqlite3"),
      `pre-existing runtime package.json should be retrofitted with allowScripts, got: ${JSON.stringify(runtimePkg.allowScripts)}`
    );
  } finally {
    process.env.PATH = originalPath;
    if (originalDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = originalDataDir;
    rmSync(fakeBinDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    rmSync(fakeDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
