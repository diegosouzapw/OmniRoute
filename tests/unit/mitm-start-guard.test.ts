/**
 * Regression test for a TOCTOU race in src/mitm/manager.ts::startMitm().
 *
 * Before this fix, the "already running" guard only checked the module-level
 * `serverProcess` variable, which is not assigned until `spawn()` — ~130
 * lines and several `await`s later (DNS entries, cert generation, cert
 * install). Two concurrent `startMitm()` calls both pass that check before
 * either assigns `serverProcess`, so both proceed to spawn a second MITM
 * server process. (upstream 9router#2316, thanks @anki1kr)
 *
 * The fix adds a synchronous single-flight lock (`tryAcquireMitmStartLock` /
 * `releaseMitmStartLock`) that is acquired *before* any async work begins.
 *
 * IMPORTANT — safety: `startMitm()`'s real body (`startMitmInternal`) mutates
 * real OS state (writes `/etc/hosts` via sudo, installs a cert into the
 * system trust store, spawns a real child process bound to port 443). It
 * must NEVER be invoked for real from an automated test — doing so once
 * during development of this test actually modified `/etc/hosts` and the
 * system CA trust store on a machine with passwordless sudo, both of which
 * had to be manually reverted. This file therefore:
 *   (a) drives the lock primitives (`tryAcquireMitmStartLock` /
 *       `releaseMitmStartLock`) directly — the real, exported guard code —
 *       with zero OS access, and
 *   (b) source-scans `startMitm()`'s own text to prove the guard is actually
 *       wired into the exported function (not just an unused helper),
 *       again without ever calling it.
 *
 * DATA_DIR-tmp pattern prevents the Node test runner from hanging on open
 * SQLite handles (CLAUDE.md PII learning #3), even though these tests never
 * reach the DB-touching code path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mitm-start-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const manager = await import("../../src/mitm/manager.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Belt-and-braces: never leave the module-level lock held across tests.
test.afterEach(() => {
  manager.releaseMitmStartLock();
});

test("tryAcquireMitmStartLock — first caller acquires, second is blocked while held", () => {
  assert.equal(manager.tryAcquireMitmStartLock(), true, "first acquire must succeed");
  assert.equal(
    manager.tryAcquireMitmStartLock(),
    false,
    "second acquire must fail while the lock is held"
  );
  manager.releaseMitmStartLock();
  assert.equal(manager.tryAcquireMitmStartLock(), true, "acquire must succeed again after release");
  manager.releaseMitmStartLock();
});

test("releaseMitmStartLock is idempotent (safe to call when not held)", () => {
  // Must not throw even if nothing is holding the lock.
  manager.releaseMitmStartLock();
  manager.releaseMitmStartLock();
  assert.equal(manager.tryAcquireMitmStartLock(), true);
  manager.releaseMitmStartLock();
});

test("startMitm() source: guard is checked+acquired before any async work, and released in a finally", () => {
  // Source-scan (never executes startMitm() — see file header on why the
  // real function must not be invoked from a test). Confirms the guard is
  // actually wired into the exported entry point, not just an unused helper.
  const managerPath = fileURLToPath(new URL("../../src/mitm/manager.ts", import.meta.url));
  const src = fs.readFileSync(managerPath, "utf8");

  const startMitmMatch = src.match(
    /export async function startMitm\([\s\S]*?\nasync function startMitmInternal\(/
  );
  assert.ok(startMitmMatch, "startMitm() must delegate to a startMitmInternal() body");
  const startMitmSrc = startMitmMatch[0];

  const alreadyRunningIdx = startMitmSrc.indexOf(
    'throw new Error("MITM proxy is already running")'
  );
  const acquireIdx = startMitmSrc.indexOf("tryAcquireMitmStartLock()");
  const alreadyStartingIdx = startMitmSrc.indexOf(
    'throw new Error("MITM server is already starting")'
  );
  const tryIdx = startMitmSrc.indexOf("try {");
  const finallyIdx = startMitmSrc.indexOf("releaseMitmStartLock();");
  const internalCallIdx = startMitmSrc.indexOf("startMitmInternal(");

  assert.ok(alreadyRunningIdx !== -1, "must still guard on serverProcess already running");
  assert.ok(acquireIdx !== -1, "must call tryAcquireMitmStartLock()");
  assert.ok(alreadyStartingIdx !== -1, 'must throw "MITM server is already starting"');
  assert.ok(tryIdx !== -1 && finallyIdx !== -1, "must release the lock in a finally block");

  // Ordering: already-running check → acquire lock → throw-if-not-acquired →
  // try { ...delegate to the real (async, side-effecting) body... } finally { release }.
  assert.ok(
    alreadyRunningIdx < acquireIdx,
    "the already-running check must run before the start-lock is touched"
  );
  assert.ok(
    acquireIdx < alreadyStartingIdx,
    "the lock must be acquired before the already-starting error can be thrown"
  );
  assert.ok(
    alreadyStartingIdx < tryIdx,
    "the guard must reject BEFORE entering the try that runs the real (unsafe) body"
  );
  assert.ok(
    tryIdx < internalCallIdx && internalCallIdx < finallyIdx,
    "startMitmInternal() must run inside the try, with release in the finally"
  );
});

test("TOCTOU race across an await boundary: only the first of two concurrent starts proceeds", async () => {
  // Mirrors the exact shape of the bug: a guard-check, then real async work
  // (DNS/cert/spawn in production) before the "running" state is committed.
  // Uses the REAL exported lock primitives — the actual shipped fix — with
  // the unsafe OS operations replaced by an inert timer.
  const events: string[] = [];

  async function fakeStartMitm(id: string): Promise<string> {
    if (!manager.tryAcquireMitmStartLock()) {
      throw new Error("MITM server is already starting");
    }
    try {
      events.push(`${id}:acquired`);
      // Simulates the multi-await gap (DNS entries, cert generation, cert
      // install) between the old guard check and serverProcess assignment.
      await new Promise((resolve) => setTimeout(resolve, 20));
      events.push(`${id}:spawned`);
      return id;
    } finally {
      manager.releaseMitmStartLock();
    }
  }

  const p1 = fakeStartMitm("call-1");
  // Issued synchronously, before call-1 has had a chance to release the
  // lock — reproduces two overlapping startMitm() invocations.
  const p2 = fakeStartMitm("call-2");

  const [r1, r2] = await Promise.allSettled([p1, p2]);

  assert.equal(r1.status, "fulfilled", "the first caller must proceed and complete");
  if (r1.status === "fulfilled") assert.equal(r1.value, "call-1");

  assert.equal(r2.status, "rejected", "the second, overlapping caller must be rejected");
  if (r2.status === "rejected") {
    assert.match((r2.reason as Error).message, /already starting/i);
  }

  // The second call must never have reached the "spawn" phase.
  assert.deepEqual(events, ["call-1:acquired", "call-1:spawned"]);

  // Lock must be fully released afterwards, so a subsequent start can proceed.
  assert.equal(manager.tryAcquireMitmStartLock(), true);
  manager.releaseMitmStartLock();
});
