/**
 * tests/unit/ops-scripts.test.ts
 *
 * Contract tests for the self-hoster incident-recovery / cold-start ops scripts
 * under bin/:
 *   rollback.sh · snapshot-data.sh · restore-data.sh · restore-policies.sh ·
 *   cold-start-bench.sh
 *
 * These scripts touch deploys and the SQLite store, so the suite pins down the
 * safety contract rather than full ops behavior: every script is executable
 * bash with strict mode, prints usage on --help, the restore commands refuse to
 * run without a snapshot id, and a snapshot→restore round-trip works while the
 * non-interactive TTY guard blocks an unattended destructive restore.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const BIN = path.join(ROOT, "bin");
const SCRIPTS = [
  "rollback.sh",
  "snapshot-data.sh",
  "restore-data.sh",
  "restore-policies.sh",
  "cold-start-bench.sh",
];

const hasSqlite3 = spawnSync("sqlite3", ["--version"], { stdio: "ignore" }).status === 0;

/** Run a bin/ script with a NON-tty stdin (so the TTY guard engages). */
function runScript(script: string, args: string[], env: Record<string, string> = {}) {
  return spawnSync("bash", [path.join(BIN, script), ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, ...env },
  });
}

describe("ops runbook scripts (bin/*.sh)", () => {
  it("every script exists, is executable, and uses bash + strict mode", () => {
    for (const s of SCRIPTS) {
      const p = path.join(BIN, s);
      assert.ok(fs.existsSync(p), `${s} is missing`);
      assert.ok(fs.statSync(p).mode & 0o111, `${s} is not executable (chmod +x)`);
      const body = fs.readFileSync(p, "utf8");
      assert.ok(body.startsWith("#!/usr/bin/env bash"), `${s} missing bash shebang`);
      assert.ok(body.includes("set -euo pipefail"), `${s} missing 'set -euo pipefail'`);
    }
  });

  it("the shared helper and every script pass `bash -n` (syntax check)", () => {
    for (const s of [...SCRIPTS, "_ops-common.sh"]) {
      const r = spawnSync("bash", ["-n", path.join(BIN, s)], { encoding: "utf8" });
      assert.equal(r.status, 0, `${s} has a syntax error: ${r.stderr}`);
    }
  });

  it("--help exits 0 with a usage banner for every script", () => {
    for (const s of SCRIPTS) {
      const r = runScript(s, ["--help"]);
      assert.equal(r.status, 0, `${s} --help exited ${r.status}: ${r.stderr}`);
      assert.match(r.stdout, /Usage:/, `${s} --help printed no usage banner`);
    }
  });

  it("restore scripts refuse to run without a snapshot id", () => {
    for (const s of ["restore-data.sh", "restore-policies.sh"]) {
      const r = runScript(s, []);
      assert.notEqual(r.status, 0, `${s} should fail without an id`);
      assert.match(r.stderr, /snapshot id required/, `${s} wrong error: ${r.stderr}`);
    }
  });

  it("snapshot → restore-data round-trips, and the TTY guard blocks unattended restores", async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-ops-"));
    try {
      const Database = (await import("better-sqlite3")).default;
      const dbPath = path.join(dataDir, "storage.sqlite");
      let db = new Database(dbPath);
      db.exec(
        "CREATE TABLE api_keys (id TEXT PRIMARY KEY, name TEXT);" +
          "INSERT INTO api_keys VALUES ('k1','orig');"
      );
      db.close();

      const env = { DATA_DIR: dataDir };
      const snap = runScript("snapshot-data.sh", ["--label", "test"], env);
      assert.equal(snap.status, 0, `snapshot failed: ${snap.stderr}`);
      const id = snap.stdout.trim();
      assert.ok(id, "snapshot id not printed on stdout");
      assert.ok(
        fs.existsSync(path.join(dataDir, "db_backups", `snapshot_${id}`, "storage.sqlite")),
        "snapshot dir not created"
      );

      // Mutate the live DB so a successful restore is observable.
      db = new Database(dbPath);
      db.exec("UPDATE api_keys SET name='changed' WHERE id='k1';");
      db.close();

      // Guard: non-interactive restore WITHOUT --yes must refuse (nothing destroyed).
      const blocked = runScript("restore-data.sh", [id], env);
      assert.notEqual(blocked.status, 0, "restore without --yes should be blocked");
      assert.match(blocked.stderr, /TTY/, `expected TTY guard, got: ${blocked.stderr}`);
      db = new Database(dbPath);
      assert.equal(
        (db.prepare("SELECT name FROM api_keys WHERE id='k1'").get() as { name: string }).name,
        "changed",
        "blocked restore must not have changed the DB"
      );
      db.close();

      // With --yes it reverts to the snapshot.
      const ok = runScript("restore-data.sh", [id, "--yes"], env);
      assert.equal(ok.status, 0, `restore failed: ${ok.stderr}`);
      db = new Database(dbPath);
      assert.equal(
        (db.prepare("SELECT name FROM api_keys WHERE id='k1'").get() as { name: string }).name,
        "orig",
        "restore did not revert the row"
      );
      db.close();
    } finally {
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  });

  it(
    "restore-policies replaces only api_key* tables, preserving other tables",
    { skip: hasSqlite3 ? false : "sqlite3 CLI not installed" },
    async () => {
      const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-pol-"));
      try {
        const Database = (await import("better-sqlite3")).default;
        const dbPath = path.join(dataDir, "storage.sqlite");
        let db = new Database(dbPath);
        db.exec(
          "CREATE TABLE api_keys (id TEXT PRIMARY KEY, name TEXT);" +
            "INSERT INTO api_keys VALUES ('k1','orig');" +
            "CREATE TABLE sessions (id TEXT PRIMARY KEY);" +
            "INSERT INTO sessions VALUES ('s-old');"
        );
        db.close();

        const env = { DATA_DIR: dataDir };
        const id = runScript("snapshot-data.sh", [], env).stdout.trim();
        assert.ok(id, "snapshot id not printed");

        // Change BOTH a policy table and a non-policy table after the snapshot.
        db = new Database(dbPath);
        db.exec(
          "UPDATE api_keys SET name='changed' WHERE id='k1';" +
            "INSERT INTO sessions VALUES ('s-new');"
        );
        db.close();

        const r = runScript("restore-policies.sh", [id, "--yes"], env);
        assert.equal(r.status, 0, `restore-policies failed: ${r.stderr}`);

        db = new Database(dbPath);
        // Policy table reverted…
        assert.equal(
          (db.prepare("SELECT name FROM api_keys WHERE id='k1'").get() as { name: string }).name,
          "orig",
          "api_keys policy was not restored"
        );
        // …non-policy table left intact (live usage not rewound).
        assert.equal(
          (db.prepare("SELECT COUNT(*) c FROM sessions").get() as { c: number }).c,
          2,
          "non-policy table must not be touched by restore-policies"
        );
        db.close();
      } finally {
        fs.rmSync(dataDir, { recursive: true, force: true });
      }
    }
  );
});
