import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import Database from "better-sqlite3";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const OMNIROUTE_BIN = path.join(ROOT, "bin", "omniroute.mjs");
const RESET_BIN = path.join(ROOT, "bin", "reset-password.mjs");

// Isolate every spawn from the development repo's .env and the machine's real
// ~/.omniroute so DATA_DIR is the only data directory in play.
function baseEnv(dataDir: string, isolatedHome: string): NodeJS.ProcessEnv {
  const env = { ...process.env };
  return {
    ...env,
    DATA_DIR: dataDir,
    HOME: isolatedHome,
    // Give the CLI a key so bin/omniroute.mjs never warns/provisions.
    STORAGE_ENCRYPTION_KEY: "0".repeat(64),
    CI: "1",
    NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_NO_UPDATE_NOTIFIER: "1",
    OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
  };
}

// Seed a storage.sqlite that already exists with the settings schema so the
// reset CLI passes its "database exists" precondition.
function seedDb(dataDir: string): string {
  fs.mkdirSync(dataDir, { recursive: true });
  const dbPath = path.join(dataDir, "storage.sqlite");
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.prepare(
    `CREATE TABLE IF NOT EXISTS key_value (
      namespace TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (namespace, key)
    )`
  ).run();
  db.close();
  return dbPath;
}

// Read the stored management password (JSON-encoded bcrypt hash) from the DB.
function readStoredPassword(dbPath: string): string | null {
  const db = new Database(dbPath, { readonly: true });
  try {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'password'")
      .get() as { value?: string } | undefined;
    if (!row?.value) return null;
    try {
      return JSON.parse(row.value);
    } catch {
      return row.value;
    }
  } finally {
    db.close();
  }
}

function mkHome(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reset-home-"));
}
function mkDataDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reset-data-"));
}

// #6261: `omniroute reset-password` must be a real subcommand (not "unknown
// command"), routing into bin/reset-password.mjs — and #6258: under piped
// (non-TTY) stdin it must actually apply the reset and print the success line.
test("omniroute reset-password subcommand applies the reset over piped stdin (#6261, #6258)", async () => {
  const dataDir = mkDataDir();
  const home = mkHome();
  try {
    const dbPath = seedDb(dataDir);
    const res = spawnSync("node", [OMNIROUTE_BIN, "reset-password"], {
      env: baseEnv(dataDir, home),
      input: "ChangeMe\nChangeMe\n",
      timeout: 60_000,
      encoding: "utf-8",
    });
    const out = `${res.stdout ?? ""}\n${res.stderr ?? ""}`;
    assert.equal(res.status, 0, `expected exit 0, got ${res.status}. Output:\n${out}`);
    assert.doesNotMatch(
      out,
      /unknown command|unknown option|error: unknown/i,
      `must not be treated as an unknown command:\n${out}`
    );
    assert.match(out, /Password Reset/i, `must enter the reset flow:\n${out}`);
    assert.match(out, /reset successfully/i, `must print the success line:\n${out}`);

    const stored = readStoredPassword(dbPath);
    assert.ok(stored, "a password must be persisted to the DB");
    assert.ok(
      await bcrypt.compare("ChangeMe", stored as string),
      "the stored password must verify against the piped value"
    );
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
    fs.rmSync(home, { recursive: true, force: true });
  }
});

// #6258: the standalone bin under piped (non-TTY) two-line stdin must not hang;
// it reads both lines, applies the reset, and flushes the success line.
test("omniroute-reset-password applies the reset over piped two-line stdin (#6258)", async () => {
  const dataDir = mkDataDir();
  const home = mkHome();
  try {
    const dbPath = seedDb(dataDir);
    const res = spawnSync("node", [RESET_BIN], {
      env: baseEnv(dataDir, home),
      input: "ChangeMe\nChangeMe\n",
      timeout: 60_000,
      encoding: "utf-8",
    });
    const out = `${res.stdout ?? ""}\n${res.stderr ?? ""}`;
    assert.equal(res.status, 0, `expected exit 0, got ${res.status}. Output:\n${out}`);
    assert.match(out, /reset successfully/i, `must print the success line:\n${out}`);

    const stored = readStoredPassword(dbPath);
    assert.ok(stored, "a password must be persisted to the DB");
    assert.ok(
      await bcrypt.compare("ChangeMe", stored as string),
      "the stored password must verify against the piped value"
    );
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
    fs.rmSync(home, { recursive: true, force: true });
  }
});

// #6258: the --password-stdin flag reads the entire stdin as the password (no
// confirmation prompt) — for scripted / automated resets.
test("omniroute-reset-password --password-stdin reads the whole stdin as the password (#6258)", async () => {
  const dataDir = mkDataDir();
  const home = mkHome();
  try {
    const dbPath = seedDb(dataDir);
    const res = spawnSync("node", [RESET_BIN, "--password-stdin"], {
      env: baseEnv(dataDir, home),
      input: "ChangeMe\n",
      timeout: 60_000,
      encoding: "utf-8",
    });
    const out = `${res.stdout ?? ""}\n${res.stderr ?? ""}`;
    assert.equal(res.status, 0, `expected exit 0, got ${res.status}. Output:\n${out}`);
    assert.match(out, /reset successfully/i, `must print the success line:\n${out}`);

    const stored = readStoredPassword(dbPath);
    assert.ok(stored, "a password must be persisted to the DB");
    assert.ok(
      await bcrypt.compare("ChangeMe", stored as string),
      "the stored password must verify against the --password-stdin value"
    );
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
    fs.rmSync(home, { recursive: true, force: true });
  }
});
