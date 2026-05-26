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

function runCli(dataDir: string): { code: number | null; stderr: string } {
  const cleanEnv = { ...process.env };
  delete cleanEnv.STORAGE_ENCRYPTION_KEY;
  // Isolate from the development repo's .env so local runs match CI where the
  // working tree has no .env at checkout time (gitignored). Without this,
  // bin/omniroute.mjs picks up STORAGE_ENCRYPTION_KEY from the repo .env and
  // the bootstrap skips writing DATA_DIR/.env (the behaviour the test exercises).
  const isolatedHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-home-"));
  try {
    const res = spawnSync("node", [BIN, "--help"], {
      cwd: dataDir,
      env: {
        ...cleanEnv,
        DATA_DIR: dataDir,
        HOME: isolatedHome,
        NO_UPDATE_NOTIFIER: "1",
        OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
      },
      timeout: 60_000,
      encoding: "utf-8",
    });
    return { code: res.status, stderr: res.stderr ?? "" };
  } finally {
    fs.rmSync(isolatedHome, { recursive: true, force: true });
  }
}

// #1622 follow-up (reported by Daniel Nach; original persistence by @Chewji9875):
// the CLI must persist the key into DATA_DIR (not just ~/.omniroute) so Docker/custom-DATA_DIR
// users keep it across restarts, and must NEVER auto-generate a fresh key when a database
// already exists (a new key can't decrypt prior data → user locked out).

test("CLI generates STORAGE_ENCRYPTION_KEY into DATA_DIR on first run (#1622)", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-a-"));
  try {
    runCli(dir);
    const envPath = path.join(dir, ".env");
    assert.ok(fs.existsSync(envPath), "DATA_DIR/.env must be created");
    const content = fs.readFileSync(envPath, "utf-8");
    assert.match(
      content,
      /STORAGE_ENCRYPTION_KEY=[0-9a-f]{64}/,
      "key persisted into DATA_DIR/.env"
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("CLI refuses to auto-generate a key when a database already exists (#1622)", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-b-"));
  try {
    fs.writeFileSync(path.join(dir, "storage.sqlite"), "fake-db");
    const { stderr } = runCli(dir);
    const envPath = path.join(dir, ".env");
    const hasKey =
      fs.existsSync(envPath) &&
      fs.readFileSync(envPath, "utf-8").includes("STORAGE_ENCRYPTION_KEY=");
    assert.equal(hasKey, false, "must NOT generate a key when a DB already exists");
    assert.match(stderr, /already exists/i, "must warn that a database already exists");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
