/**
 * Regression test for upstream issue #1809: "connect ECONNREFUSED 127.0.0.1:443"
 * after stopping the MITM proxy.
 *
 * Root cause: stopMitm() killed the spawned MITM server process FIRST, and only
 * removed the /etc/hosts DNS-spoof entries AFTER. During that window any client
 * whose DNS still resolved the target host to 127.0.0.1 (from startMitm's spoof)
 * but whose MITM listener was already dead got ECONNREFUSED — exactly the
 * community-confirmed workaround ("stop DNS before stopping the server") proves.
 *
 * This test drives stopMitm() with real DI: a fake serverProcess standing in for
 * the spawned MITM child, and dependency-injected DNS-removal functions that
 * record the order in which they are invoked relative to the process kill. The
 * fix must remove DNS entries before killing the server process so no window
 * exists where DNS points at 127.0.0.1 with nothing listening there.
 *
 * Uses the project's DATA_DIR-tmp + resetDbInstance pattern so the Node native
 * test runner does not hang on open SQLite handles (CLAUDE.md PII learning #3).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mitm-stop-order-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const manager = await import("../../src/mitm/manager.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("stopMitm removes DNS entries before killing the MITM server process (#1809)", async () => {
  const events: string[] = [];

  // Fake child process standing in for the spawned MITM server.
  const fakeProc = new EventEmitter() as EventEmitter & {
    killed: boolean;
    kill: (signal?: string) => boolean;
  };
  fakeProc.killed = false;
  fakeProc.kill = (signal?: string) => {
    events.push(`kill:${signal}`);
    fakeProc.killed = true;
    return true;
  };

  manager.__setServerProcessForTest(fakeProc as unknown as import("child_process").ChildProcess, 4242);

  const removeDNSEntry = async () => {
    events.push("removeDNSEntry");
  };
  const removeDNSEntries = async () => {
    events.push("removeDNSEntries");
  };
  const collectManagedHosts = () => ["fake.example.test"];

  await manager.stopMitm("fake-sudo-password", {
    removeDNSEntry,
    removeDNSEntries,
    collectManagedHosts,
  });

  const firstKillIndex = events.findIndex((e) => e.startsWith("kill:"));
  const firstDnsIndex = events.findIndex(
    (e) => e === "removeDNSEntry" || e === "removeDNSEntries"
  );

  assert.ok(firstKillIndex !== -1, "server process kill was never invoked");
  assert.ok(firstDnsIndex !== -1, "DNS removal was never invoked");
  assert.ok(
    firstDnsIndex < firstKillIndex,
    `DNS entries must be removed BEFORE the MITM server process is killed ` +
      `(got order: ${JSON.stringify(events)}) — otherwise a client whose DNS still ` +
      `points at 127.0.0.1 hits a dead listener and gets ECONNREFUSED (#1809)`
  );
});
