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

function runCli(dataDir: string): { code: number | null; stdout: string; stderr: string } {
  const cleanEnv = { ...process.env };
  delete cleanEnv.STORAGE_ENCRYPTION_KEY;
  delete cleanEnv.JWT_SECRET;
  delete cleanEnv.API_KEY_SECRET;
  delete cleanEnv.DATA_DIR;
  const isolatedHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-home-"));
  try {
    const res = spawnSync("node", [BIN, "config", "list", "--json"], {
      cwd: dataDir,
      env: {
        ...cleanEnv,
        DATA_DIR: dataDir,
        HOME: isolatedHome,
        USERPROFILE: isolatedHome,
        NO_UPDATE_NOTIFIER: "1",
        OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
      },
      timeout: 60_000,
      encoding: "utf-8",
    });
    return { code: res.status, stdout: res.stdout ?? "", stderr: res.stderr ?? "" };
  } finally {
    fs.rmSync(isolatedHome, { recursive: true, force: true });
  }
}

// #7302: Electron persists secrets to <DATA_DIR>/server.env (electron/main.js), but the CLI
// (bin/omniroute.mjs) only ever loaded <DATA_DIR>/.env — so migrating storage.sqlite +
// server.env from the desktop app to the CLI silently lost STORAGE_ENCRYPTION_KEY and
// permanently corrupted every encrypted credential. The CLI must recognize server.env as a
// legacy/migration fallback source when .env is absent, without letting it override an
// existing .env.

test("#7302: CLI must recognize DATA_DIR/server.env (Electron's secrets file) when migrating an existing database", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-"));
  try {
    fs.writeFileSync(path.join(dir, "storage.sqlite"), "fake-existing-db-with-real-data");
    const electronKey = "electron-storage-key-0123456789abcdef0123456789abcdef";
    fs.writeFileSync(
      path.join(dir, "server.env"),
      [
        "JWT_SECRET=electron-jwt-secret-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "API_KEY_SECRET=electron-api-key-secret-bbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        `STORAGE_ENCRYPTION_KEY=${electronKey}`,
        "STORAGE_ENCRYPTION_KEY_VERSION=v1",
        "",
      ].join("\n")
    );

    const { stderr } = runCli(dir);

    const envPath = path.join(dir, ".env");
    const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";
    assert.match(
      envContent,
      new RegExp(`STORAGE_ENCRYPTION_KEY=${electronKey}`),
      "the Electron-persisted STORAGE_ENCRYPTION_KEY from server.env must be honored " +
        "after migrating to the CLI install — got .env content: " + JSON.stringify(envContent)
    );

    assert.doesNotMatch(
      stderr,
      /STORAGE_ENCRYPTION_KEY is not set but a database already exists/,
      "the CLI should not need to refuse key generation — it should have found the " +
        "Electron-persisted key in server.env"
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("#7302: an existing DATA_DIR/.env must still win over DATA_DIR/server.env when both exist", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-winner-"));
  try {
    fs.writeFileSync(path.join(dir, "storage.sqlite"), "fake-existing-db-with-real-data");
    const cliKey = "cli-owned-storage-key-fedcba9876543210fedcba9876543210";
    const electronKey = "electron-storage-key-0123456789abcdef0123456789abcdef";
    fs.writeFileSync(path.join(dir, ".env"), `STORAGE_ENCRYPTION_KEY=${cliKey}\n`);
    fs.writeFileSync(path.join(dir, "server.env"), `STORAGE_ENCRYPTION_KEY=${electronKey}\n`);

    runCli(dir);

    const envContent = fs.readFileSync(path.join(dir, ".env"), "utf-8");
    assert.match(
      envContent,
      new RegExp(`STORAGE_ENCRYPTION_KEY=${cliKey}`),
      "an existing .env must never be overwritten by server.env"
    );
    assert.doesNotMatch(
      envContent,
      new RegExp(electronKey),
      "server.env must not leak into an existing .env"
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
