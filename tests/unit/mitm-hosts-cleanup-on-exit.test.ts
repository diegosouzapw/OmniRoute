/**
 * Gap 7 follow-up: installCleanupHandlers() previously only killed the spawned
 * MITM child on SIGINT/SIGTERM and always left `/etc/hosts` state for a manual
 * Repair, even when a sudo password was already cached in this session
 * (getCachedPassword()/setCachedPassword()). handleExitCleanup() — extracted
 * from the signal handler so it is directly unit-testable without sending a
 * real OS signal to the test process — now best-effort reverts every managed
 * host (collectManagedHosts(), mirroring stopMitm()'s DNS teardown) when a
 * password is cached, and falls back to flagging `_orphanedStateDetected`
 * (surfaced via getMitmStatus().orphanedStateDetected) exactly as before when
 * no password is available.
 *
 * DATA_DIR-tmp + resetDbInstance pattern prevents the Node test runner from
 * hanging on open SQLite handles (CLAUDE.md PII learning #3).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mitm-exit-cleanup-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const manager = await import("../../src/mitm/manager.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string } | null)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  manager.clearCachedPassword();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("handleExitCleanup: with a cached sudo password, best-effort reverts managed /etc/hosts entries", async () => {
  manager.setCachedPassword("s3cr3t-session-password");

  const removeDNSEntryCalls: string[] = [];
  const removeDNSEntriesCalls: Array<{ hosts: string[]; sudoPassword: string }> = [];
  const managedHosts = ["daily-cloudcode-pa.googleapis.com", "api.individual.githubcopilot.com"];

  await manager.handleExitCleanup("SIGINT", {
    removeDNSEntry: async (sudoPassword: string) => {
      removeDNSEntryCalls.push(sudoPassword);
    },
    removeDNSEntries: async (hosts: string[], sudoPassword: string) => {
      removeDNSEntriesCalls.push({ hosts, sudoPassword });
    },
    collectManagedHosts: () => managedHosts,
  });

  assert.deepEqual(
    removeDNSEntryCalls,
    ["s3cr3t-session-password"],
    "must revert the legacy Antigravity DNS entries with the cached password"
  );
  assert.equal(removeDNSEntriesCalls.length, 1, "must revert the managed host set exactly once");
  assert.deepEqual(
    removeDNSEntriesCalls[0].hosts,
    managedHosts,
    "must pass collectManagedHosts() output through to removeDNSEntries"
  );
  assert.equal(
    removeDNSEntriesCalls[0].sudoPassword,
    "s3cr3t-session-password",
    "must forward the cached sudo password to removeDNSEntries"
  );

  const status = await manager.getMitmStatus();
  assert.equal(
    status.orphanedStateDetected,
    false,
    "a successful hosts revert must not flag orphaned state"
  );
});

test("handleExitCleanup: with NO cached password, falls back to orphaned-state flag and skips DNS removal", async () => {
  manager.clearCachedPassword();
  assert.equal(manager.getCachedPassword(), null, "precondition: no password cached in this session");

  let removeDNSEntryCalled = false;
  let removeDNSEntriesCalled = false;

  await manager.handleExitCleanup("SIGTERM", {
    removeDNSEntry: async () => {
      removeDNSEntryCalled = true;
    },
    removeDNSEntries: async () => {
      removeDNSEntriesCalled = true;
    },
    collectManagedHosts: () => ["should-not-be-used.invalid"],
  });

  assert.equal(
    removeDNSEntryCalled,
    false,
    "must NOT attempt privileged DNS removal without a cached password"
  );
  assert.equal(
    removeDNSEntriesCalled,
    false,
    "must NOT attempt privileged DNS removal without a cached password"
  );

  const status = await manager.getMitmStatus();
  assert.equal(
    status.orphanedStateDetected,
    true,
    "must fall back to the orphaned-state flag for a manual Repair when no password is cached"
  );
});
