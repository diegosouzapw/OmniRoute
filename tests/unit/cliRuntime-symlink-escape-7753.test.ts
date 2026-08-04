import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// cliRuntime.ts computes EXPECTED_PARENT_PATHS from os.homedir() at MODULE LOAD
// time, so HOME must be redirected before the module is imported.
const sandboxHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7753-home-"));
const outsideDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7753-outside-"));

process.env.HOME = sandboxHome;
process.env.USERPROFILE = sandboxHome;
process.env.npm_config_prefix = path.join(sandboxHome, "npm-prefix-unused");
delete process.env.CLI_OPENCODE_BIN;

const localBinDir = path.join(sandboxHome, ".local", "bin");
fs.mkdirSync(localBinDir, { recursive: true });

const realBinaryPath = path.join(outsideDir, "opencode-real-binary");
fs.writeFileSync(realBinaryPath, "#!/bin/sh\necho fake-opencode-binary-body-padding\n");
fs.chmodSync(realBinaryPath, 0o755);

// symlink lives INSIDE a trusted parent (HOME/.local/bin) — like nvm-windows's
// opencode.cmd under AppData\Local\nvm\<ver>\ — but its resolved target is outside.
const symlinkPath = path.join(localBinDir, "opencode");
fs.symlinkSync(realBinaryPath, symlinkPath);

const { getCliRuntimeStatus, checkKnownPath } = await import(
  "../../src/shared/services/cliRuntime.ts"
);

test("#7753: a CLI symlink located inside an expected parent dir is wrongly reported not-installed when its resolved target escapes EXPECTED_PARENT_PATHS", async () => {
  const status = await getCliRuntimeStatus("opencode");
  assert.equal(
    status.installed,
    true,
    `expected installed=true but got installed=${status.installed} reason=${status.reason}`
  );
});

test("#7753: a genuinely unsafe symlink whose ORIGINAL location is also untrusted must still be rejected", async () => {
  // Neither the symlink's own location nor its resolved target is inside any
  // EXPECTED_PARENT_PATHS entry — this must stay rejected as symlink_escape.
  const untrustedDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7753-untrusted-"));
  const untrustedSymlink = path.join(untrustedDir, "opencode");
  fs.symlinkSync(realBinaryPath, untrustedSymlink);

  const result = await checkKnownPath(untrustedSymlink);
  assert.equal(result.installed, false);
  assert.equal(result.reason, "symlink_escape");

  await fsp.rm(untrustedDir, { recursive: true, force: true });
});

test.after(async () => {
  await fsp.rm(sandboxHome, { recursive: true, force: true });
  await fsp.rm(outsideDir, { recursive: true, force: true });
});
