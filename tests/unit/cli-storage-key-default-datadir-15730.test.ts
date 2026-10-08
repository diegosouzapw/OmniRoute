import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BIN = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "bin",
  "omniroute.mjs"
);

// #15730: with DATA_DIR unset and no ~/.omniroute, the CLI must provision
// STORAGE_ENCRYPTION_KEY in getDefaultDataDir() (here $XDG_CONFIG_HOME/omniroute),
// the same dir loadEnvFile() and the server use — not a hardcoded ~/.omniroute.
test(
  "CLI writes STORAGE_ENCRYPTION_KEY to getDefaultDataDir(), not hardcoded ~/.omniroute (#15730)",
  {
    skip: process.platform === "win32" ? "uses XDG_CONFIG_HOME" : false,
  },
  () => {
    const home = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15730-home-"));
    const xdg = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15730-xdg-"));
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15730-cwd-"));
    try {
      const cleanEnv = { ...process.env };
      delete cleanEnv.STORAGE_ENCRYPTION_KEY;
      delete cleanEnv.DATA_DIR;
      spawnSync("node", [BIN, "config", "list", "--json"], {
        cwd,
        env: {
          ...cleanEnv,
          HOME: home,
          USERPROFILE: home,
          XDG_CONFIG_HOME: xdg,
          NO_UPDATE_NOTIFIER: "1",
          OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
        },
        timeout: 60_000,
        encoding: "utf-8",
      });
      const legacyEnv = path.join(home, ".omniroute", ".env");
      const expectedEnv = path.join(xdg, "omniroute", ".env");
      assert.equal(
        fs.existsSync(legacyEnv),
        false,
        "key must not be written to hardcoded ~/.omniroute/.env"
      );
      assert.ok(fs.existsSync(expectedEnv), "key must be written to getDefaultDataDir()/.env");
    } finally {
      for (const d of [home, xdg, cwd])
        fs.rmSync(d, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  }
);

test("existing ~/.omniroute keeps receiving the key (no migration) (#15730)", () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15730-home-"));
  const xdg = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15730-xdg-"));
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15730-cwd-"));
  try {
    fs.mkdirSync(path.join(home, ".omniroute"));
    const cleanEnv = { ...process.env };
    delete cleanEnv.STORAGE_ENCRYPTION_KEY;
    delete cleanEnv.DATA_DIR;
    spawnSync("node", [BIN, "config", "list", "--json"], {
      cwd,
      env: {
        ...cleanEnv,
        HOME: home,
        USERPROFILE: home,
        XDG_CONFIG_HOME: xdg,
        NO_UPDATE_NOTIFIER: "1",
        OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
      },
      timeout: 60_000,
      encoding: "utf-8",
    });
    assert.ok(fs.existsSync(path.join(home, ".omniroute", ".env")));
  } finally {
    for (const d of [home, xdg, cwd])
      fs.rmSync(d, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
