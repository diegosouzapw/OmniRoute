/**
 * Gap 7 regression: repairMitm() must be able to undo every system mutation
 * startMitm() makes. buildRepairPlan() is the pure, testable description of
 * that teardown (DNS hosts to remove + cert removal + system-proxy revert),
 * separated from repairMitm() so the enumeration is unit-testable without
 * touching the OS or requiring sudo.
 *
 * DATA_DIR-tmp + resetDbInstance pattern prevents the Node test runner from
 * hanging on open SQLite handles (CLAUDE.md PII learning #3).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-mitm-repair-")
);
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
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("buildRepairPlan enumerates DNS hosts and the CA + proxy teardown steps", () => {
  const plan = manager.buildRepairPlan();
  assert.ok(Array.isArray(plan.dnsHostsToRemove), "plan.dnsHostsToRemove must be an array");
  assert.ok(
    plan.dnsHostsToRemove.length > 0,
    "must remove at least the agent target hosts"
  );
  assert.equal(plan.removeCert, true, "repair must include CA removal");
  assert.equal(plan.revertSystemProxy, true, "repair must attempt system-proxy revert");
});

test("buildRepairPlan reuses collectManagedHosts (same managed host set)", () => {
  const plan = manager.buildRepairPlan();
  assert.deepEqual(
    [...plan.dnsHostsToRemove].sort(),
    [...manager.collectManagedHosts()].sort(),
    "repair must target exactly the managed host set so teardown stays symmetric"
  );
});
