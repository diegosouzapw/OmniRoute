// Regression guard: every copy of the default DATA_DIR resolver must prefer an EXISTING
// legacy ~/.omniroute over $XDG_CONFIG_HOME/omniroute.
//
// The canonical resolver (src/lib/dataPaths.ts::getDefaultDataDir) and the CLI
// (bin/cli/data-dir.mjs) already did. The three self-contained copies did not —
// scripts/build/bootstrap-env.mjs (server bootstrap, copied alone into the standalone
// build) and scripts/dev/sync-env.mjs (`npm run env:sync`) jumped
// straight to XDG whenever XDG_CONFIG_HOME was set. On a machine that exports
// XDG_CONFIG_HOME, the first `npm run dev` therefore persisted JWT_SECRET,
// STORAGE_ENCRYPTION_KEY and API_KEY_SECRET to ~/.config/omniroute/server.env while the app
// opened ~/.omniroute/storage.sqlite and the CLI read ~/.omniroute/.env: two different
// encryption keys for one database, so a credential written by either side could not be
// decrypted by the other.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  bootstrapEnv,
  resolveDataDir as bootstrapResolveDataDir,
} from "../../scripts/build/bootstrap-env.mjs";
import { resolveDataDir as syncEnvResolveDataDir } from "../../scripts/dev/sync-env.mjs";
import { resolveDataDir as cliResolveDataDir } from "../../bin/cli/data-dir.mjs";
import { resolveDataDir as runtimeResolveDataDir } from "../../src/lib/dataPaths.ts";

type TempEnv = { tempRoot: string; tempHome: string; tempCwd: string };

function withTempEnv(fn: (paths: TempEnv) => void) {
  const originalCwd = process.cwd();
  const originalEnv = { ...process.env };
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-datadir-xdg-"));
  const tempHome = path.join(tempRoot, "home");
  const tempCwd = path.join(tempRoot, "cwd");
  fs.mkdirSync(tempHome, { recursive: true });
  fs.mkdirSync(tempCwd, { recursive: true });

  for (const key of [
    "DATA_DIR",
    "XDG_CONFIG_HOME",
    "APPDATA",
    "JWT_SECRET",
    "STORAGE_ENCRYPTION_KEY",
    "STORAGE_ENCRYPTION_KEY_VERSION",
    "API_KEY_SECRET",
    "INITIAL_PASSWORD",
  ]) {
    delete process.env[key];
  }
  process.env.HOME = tempHome;
  process.chdir(tempCwd);

  try {
    fn({ tempRoot, tempHome, tempCwd });
  } finally {
    process.chdir(originalCwd);
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) delete process.env[key];
    }
    for (const [key, value] of Object.entries(originalEnv)) {
      process.env[key] = value;
    }
    fs.rmSync(tempRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

const posix = process.platform !== "win32";

test("an existing legacy ~/.omniroute wins over XDG_CONFIG_HOME in every resolver", () => {
  withTempEnv(({ tempHome, tempRoot }) => {
    const legacyDir = path.join(tempHome, ".omniroute");
    fs.mkdirSync(legacyDir, { recursive: true });
    process.env.XDG_CONFIG_HOME = path.join(tempRoot, "xdg");

    const expected = runtimeResolveDataDir();
    assert.equal(expected, legacyDir, "canonical runtime resolver keeps the legacy dir");
    assert.equal(cliResolveDataDir(), expected, "bin/cli/data-dir.mjs");
    assert.equal(bootstrapResolveDataDir(), expected, "scripts/build/bootstrap-env.mjs");
    assert.equal(syncEnvResolveDataDir(), expected, "scripts/dev/sync-env.mjs");
  });
});

test(
  "without a legacy dir, XDG_CONFIG_HOME still selects $XDG_CONFIG_HOME/omniroute everywhere",
  {
    skip: !posix && "XDG is a Linux/macOS convention; Windows resolves %APPDATA% first",
  },
  () => {
    withTempEnv(({ tempRoot }) => {
      const xdg = path.join(tempRoot, "xdg");
      process.env.XDG_CONFIG_HOME = xdg;

      const expected = path.join(xdg, "omniroute");
      assert.equal(runtimeResolveDataDir(), expected);
      assert.equal(cliResolveDataDir(), expected);
      assert.equal(bootstrapResolveDataDir(), expected);
      assert.equal(syncEnvResolveDataDir(), expected);
    });
  }
);

test("an explicit DATA_DIR beats both the legacy dir and XDG_CONFIG_HOME in every resolver", () => {
  withTempEnv(({ tempHome, tempRoot }) => {
    fs.mkdirSync(path.join(tempHome, ".omniroute"), { recursive: true });
    process.env.XDG_CONFIG_HOME = path.join(tempRoot, "xdg");
    const configured = path.join(tempRoot, "explicit");
    process.env.DATA_DIR = configured;

    assert.equal(runtimeResolveDataDir(), configured);
    assert.equal(cliResolveDataDir(), configured);
    assert.equal(bootstrapResolveDataDir(), configured);
    assert.equal(syncEnvResolveDataDir(), configured);
  });
});

test("bootstrapEnv persists first-run secrets into the existing legacy ~/.omniroute, not under XDG_CONFIG_HOME", () => {
  withTempEnv(({ tempHome, tempRoot }) => {
    const legacyDir = path.join(tempHome, ".omniroute");
    fs.mkdirSync(legacyDir, { recursive: true });
    const xdg = path.join(tempRoot, "xdg");
    process.env.XDG_CONFIG_HOME = xdg;

    const env = bootstrapEnv({ quiet: true });

    const legacyServerEnv = path.join(legacyDir, "server.env");
    const xdgServerEnv = path.join(xdg, "omniroute", "server.env");
    assert.ok(fs.existsSync(legacyServerEnv), "server.env must land next to storage.sqlite");
    assert.ok(!fs.existsSync(xdgServerEnv), "nothing may be written under $XDG_CONFIG_HOME");

    const persisted = fs.readFileSync(legacyServerEnv, "utf8");
    assert.match(
      persisted,
      new RegExp(`^STORAGE_ENCRYPTION_KEY=${env.STORAGE_ENCRYPTION_KEY}$`, "m")
    );
    assert.match(persisted, new RegExp(`^JWT_SECRET=${env.JWT_SECRET}$`, "m"));
  });
});
