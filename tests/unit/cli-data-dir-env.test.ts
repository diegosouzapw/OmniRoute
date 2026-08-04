import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { resolveDataDir as cliResolveDataDir } from "../../bin/cli/data-dir.mjs";
import { resolveDataDir as runtimeResolveDataDir } from "../../src/lib/dataPaths.ts";

const REPO_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const BIN = path.join(REPO_ROOT, "bin", "omniroute.mjs");

async function withTempEnv(
  fn: (paths: { root: string; home: string; cwd: string }) => void | Promise<void>
) {
  const originalEnv = { ...process.env };
  const originalCwd = process.cwd();
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cli-env-"));
  const home = path.join(root, "home");
  const cwd = path.join(root, "cwd");
  fs.mkdirSync(home, { recursive: true });
  fs.mkdirSync(cwd, { recursive: true });

  delete process.env.DATA_DIR;
  delete process.env.XDG_CONFIG_HOME;
  delete process.env.APPDATA;
  process.env.HOME = home;
  process.chdir(cwd);

  try {
    await fn({ root, home, cwd });
  } finally {
    process.chdir(originalCwd);
    for (const key of Object.keys(process.env)) {
      if (!(key in originalEnv)) delete process.env[key];
    }
    for (const [key, value] of Object.entries(originalEnv)) {
      process.env[key] = value;
    }
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test("CLI data dir preserves existing legacy ~/.omniroute before XDG", async () => {
  await withTempEnv(({ home, root }) => {
    const legacyDir = path.join(home, ".omniroute");
    fs.mkdirSync(legacyDir, { recursive: true });
    process.env.XDG_CONFIG_HOME = path.join(root, "xdg");

    assert.equal(cliResolveDataDir(), legacyDir);
    assert.equal(cliResolveDataDir(), runtimeResolveDataDir());
  });
});

test("CLI env loader scans all env paths while preserving first value wins", () => {
  const source = fs.readFileSync(BIN, "utf8");
  const loaderStart = source.indexOf("function loadEnvFile()");
  const loaderEnd = source.indexOf("loadEnvFile();", loaderStart);
  const loaderSource = source.slice(loaderStart, loaderEnd);

  assert.match(loaderSource, /for \(const envPath of envPaths\)/);
  assert.match(loaderSource, /if \(process\.env\[key\] === undefined\)/);
  assert.doesNotMatch(
    loaderSource,
    /Loaded env from \$\{envPath\}[\s\S]{0,80}\breturn;/
  );
});
