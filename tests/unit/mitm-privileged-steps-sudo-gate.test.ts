/**
 * #7938 — privileged MITM steps (cert trust, DNS) must be skippable when no sudo password.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";
import {
  canRunPrivilegedMitmSteps,
  isMitmSudoPasswordRequired,
} from "../../src/mitm/sudoGate.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mitm-sudo-gate-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const manager = await import("../../src/mitm/manager.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("canRunPrivilegedMitmSteps is false when isMitmSudoPasswordRequired is true", () => {
  assert.equal(canRunPrivilegedMitmSteps("secret"), !isMitmSudoPasswordRequired("secret"));
});

test("canRunPrivilegedMitmSteps is false for empty password on POSIX sudo-required hosts", () => {
  if (process.platform === "win32") return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) return;
  if (!isMitmSudoPasswordRequired("")) return;
  assert.equal(canRunPrivilegedMitmSteps(""), false);
});

test("stopMitm skips DNS teardown without sudo password but still kills server (#7938)", async () => {
  if (process.platform === "win32") return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) return;
  if (!isMitmSudoPasswordRequired("")) return;

  const events: string[] = [];
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

  await manager.stopMitm("", {
    removeDNSEntry: async () => {
      events.push("removeDNSEntry");
    },
    removeDNSEntries: async () => {
      events.push("removeDNSEntries");
    },
    collectManagedHosts: () => ["fake.example.test"],
  });

  assert.equal(
    events.filter((event) => event.startsWith("remove")).length,
    0,
    "must not invoke DNS teardown with empty sudo password"
  );
  assert.ok(events.some((event) => event.startsWith("kill:")), "server process must still be stopped");
});
