import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

// Regression for the "cross-process contenders never both acquire the same
// connection" flake (tests/unit/exclusive-connection-leases.test.ts): the
// faster contender exited while the slower one was still opening, and a
// closing WAL connection briefly takes an EXCLUSIVE lock on the database file
// (checkpoint + WAL delete). getDbInstance() issued `PRAGMA journal_mode = WAL`
// — the connection's first statement, which needs a SHARED lock — *before*
// installing the busy handler, so on node:sqlite (busy timeout 0 by default)
// the slower process died with `database is locked` instead of waiting the few
// milliseconds the lock is held. The corruption probe that runs first had the
// same gap: it only recognised BUSY when the driver put "SQLITE_BUSY" in the
// message, which neither node:sqlite nor better-sqlite3 does, so a transient
// lock there renamed the database away as corrupt.
//
// The holder below reproduces the lock deterministically (WAL + EXCLUSIVE
// locking mode keeps the file lock from the first read until close) and
// releases it only after the child has reached getDbInstance(), so the open
// path meets the lock on every run and must wait it out via busy_timeout.

const CORE_URL = new URL("../../src/lib/db/core.ts", import.meta.url).href;
// Longer than the probe's first transient-retry delay (500ms), so the main
// open still meets the lock after the probe has retried; well inside the
// 2000ms busy_timeout getDbInstance() configures, so the fixed open waits it
// out instead of timing out.
const HOLD_MS = 1200;

type ChildResult = { code: number | null; stdout: string; stderr: string };

function runChild(script: string, env: Record<string, string>): Promise<ChildResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ["--import", "tsx/esm", "--input-type=module", "-e", script],
      {
        cwd: process.cwd(),
        env: { ...process.env, ...env },
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => (stdout += chunk));
    child.stderr.setEncoding("utf8").on("data", (chunk) => (stderr += chunk));
    child.once("error", reject);
    child.once("exit", (code) => resolve({ code, stdout, stderr }));
  });
}

async function waitForFile(file: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (!fs.existsSync(file)) {
    if (Date.now() > deadline) throw new Error(`timed out waiting for ${file}`);
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

test("getDbInstance() waits out a transient exclusive file lock instead of failing on its first statement", async () => {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-open-busy-"));
  const sqliteFile = path.join(dataDir, "storage.sqlite");
  const ready = path.join(dataDir, "ready");
  const env = { DATA_DIR: dataDir, OPEN_READY_FILE: ready };
  let holder: DatabaseSync | null = null;
  try {
    // Seed a real database (schema + migrations) so the corruption probe in
    // getDbInstance() sees a healthy file rather than a skeleton.
    const seed = await runChild(
      `const core = await import(${JSON.stringify(CORE_URL)}); core.getDbInstance(); core.closeDbInstance();`,
      env
    );
    assert.equal(seed.code, 0, seed.stderr);

    // Hold the database file's EXCLUSIVE lock from another connection, exactly
    // what a closing WAL connection holds while it checkpoints and deletes the WAL.
    holder = new DatabaseSync(sqliteFile);
    holder.exec("PRAGMA locking_mode = EXCLUSIVE");
    holder.prepare("SELECT count(*) AS n FROM sqlite_master").get();

    const opener = runChild(
      [
        `import fs from "node:fs";`,
        `const core = await import(${JSON.stringify(CORE_URL)});`,
        `fs.writeFileSync(process.env.OPEN_READY_FILE, "ready");`,
        `const busyTimeout = core.getDbInstance().pragma("busy_timeout", { simple: true });`,
        `core.closeDbInstance();`,
        `process.stdout.write(JSON.stringify({ busyTimeout }) + "\\n");`,
      ].join("\n"),
      env
    );
    await waitForFile(ready, 30_000);
    await new Promise((resolve) => setTimeout(resolve, HOLD_MS));
    holder.close();
    holder = null;

    const result = await opener;
    assert.equal(result.code, 0, `open failed under a transient lock: ${result.stderr}`);
    // The probe may log that it met the lock; what must not happen is the
    // corruption path (rename + manual-recovery abort) or a failed main open.
    assert.doesNotMatch(result.stderr, /Renamed corrupt DB|probe-failed|Manual recovery/);
    assert.deepEqual(
      fs.readdirSync(dataDir).filter((name) => name.includes("probe-failed")),
      [],
      "a transient lock must not rename the database away as corrupt"
    );
    const summary = result.stdout.match(/^\{"busyTimeout":(\d+)\}$/m);
    assert.ok(summary, `child did not report its busy timeout: ${result.stdout}`);
    assert.equal(Number(summary[1]), 2000);
  } finally {
    holder?.close();
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
