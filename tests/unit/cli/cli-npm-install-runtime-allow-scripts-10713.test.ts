import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, chmodSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { npmInstallRuntime } from "../../../bin/cli/runtime/nativeDeps.mjs";

test("issue #10713: npmInstallRuntime requests --allow-scripts for its own fully-controlled runtime dependency", () => {
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

    assert.equal(ok, true, "npm 12 exits 0 even when it silently skipped install scripts");
    assert.ok(existsSync(argvLog), "fake npm should have been invoked");

    const argv = readFileSync(argvLog, "utf8");

    assert.ok(
      argv.includes("--allow-scripts=better-sqlite3@12.10.1"),
      "npm must be told to allow-scripts for its own runtime dep. argv was:\n" + argv
    );
  } finally {
    process.env.PATH = originalPath;
    if (originalDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = originalDataDir;
    rmSync(fakeBinDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    rmSync(fakeDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
