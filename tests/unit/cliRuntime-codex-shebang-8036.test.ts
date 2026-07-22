import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// #8036: npm-installed CLIs (e.g. codex) are `#!/usr/bin/env node` shebang
// scripts. checkRunnable() in cliRuntime.ts builds a minimal spawn env whose
// PATH comes ONLY from the caller's PATH (getLookupEnv()), never merging in
// the running Node's own bin dir (path.dirname(process.execPath)) the way
// locateCommand's known-path search already does at :641. When the server is
// launched by a minimal-PATH launcher (systemd/docker/PM2) that lacks node's
// directory, `env node` inside the shebang can't resolve → healthcheck spawn
// fails → the CLI is (falsely) reported as not runnable even though it is
// correctly located.
//
// cliRuntime.ts computes EXPECTED_PARENT_PATHS from os.homedir() at MODULE
// LOAD time, so HOME must be redirected before the module is imported.
const sandboxHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8036-home-"));
process.env.HOME = sandboxHome;
process.env.USERPROFILE = sandboxHome;
process.env.npm_config_prefix = path.join(sandboxHome, "npm-prefix-unused");
delete process.env.CLI_CODEX_BIN;
delete process.env.CLI_EXTRA_PATHS;

// Place the fake `codex` npm-shebang script at a KNOWN install location
// (home/.local/bin, within EXPECTED_PARENT_PATHS) so it's located via the
// PATH-independent known-path search — exactly like a real npm global
// install would be found — isolating the test from PATH-dependent `sh`/
// `command -v` resolution and from this test-runner box's own PATH.
const localBinDir = path.join(sandboxHome, ".local", "bin");
fs.mkdirSync(localBinDir, { recursive: true });
const codexScriptPath = path.join(localBinDir, "codex");
fs.writeFileSync(
  codexScriptPath,
  ["#!/usr/bin/env node", 'console.log("codex-cli 0.145.0-test");', ""].join("\n")
);
fs.chmodSync(codexScriptPath, 0o755);

const nodeBinDir = path.dirname(process.execPath);

const { getCliRuntimeStatus } = await import("../../src/shared/services/cliRuntime.ts");

test("#8036: codex is reported runnable even when the launcher PATH omits node's own bin dir", async () => {
  const originalPath = process.env.PATH;
  // Bogus PATH: no `sh`/`env`/system dirs, and — crucially — no node's own
  // bin dir. The known-path match above never needs PATH to LOCATE codex;
  // this isolates whether checkRunnable()'s healthcheck spawn can still
  // RUN it (the `#!/usr/bin/env node` shebang needs `node` resolvable via
  // the child's PATH).
  process.env.PATH = path.join(sandboxHome, "nonexistent-launcher-path");
  try {
    const status = await getCliRuntimeStatus("codex");
    assert.equal(
      status.installed,
      true,
      `expected installed=true but got installed=${status.installed} reason=${status.reason}`
    );
    assert.equal(
      status.runnable,
      true,
      `expected runnable=true but got runnable=${status.runnable} reason=${status.reason} ` +
        `(launcher PATH lacked node's bin dir ${nodeBinDir} — checkRunnable() must merge it in)`
    );
  } finally {
    process.env.PATH = originalPath;
  }
});

test.after(async () => {
  await fsp.rm(sandboxHome, { recursive: true, force: true });
});
