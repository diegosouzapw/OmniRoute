/**
 * Gap 8 regression: every host OmniRoute can spoof in startMitm() must be
 * enumerated by collectManagedHosts() so stopMitm() can remove it. Without
 * this, agent + custom-host /etc/hosts lines leak across start/stop cycles and
 * keep hijacking those hostnames machine-wide after the user thinks MITM is off.
 *
 * Uses the project's DATA_DIR-tmp + resetDbInstance pattern so the Node native
 * test runner does not hang on open SQLite handles (CLAUDE.md PII learning #3).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-mitm-cleanup-symmetry-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const customHostsDb = await import("../../src/lib/db/inspectorCustomHosts.ts");
const manager = await import("../../src/mitm/manager.ts");
const { ALL_TARGETS } = await import("../../src/mitm/targets/index.ts");

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

test("collectManagedHosts includes every host of every agent target", () => {
  const managed = new Set(manager.collectManagedHosts());
  for (const target of ALL_TARGETS) {
    for (const host of target.hosts) {
      assert.ok(
        managed.has(host),
        `managed host set is missing agent host "${host}" (${target.id}) — it would leak in /etc/hosts after stop`
      );
    }
  }
});

test("collectManagedHosts returns a de-duplicated list", () => {
  const list = manager.collectManagedHosts();
  assert.equal(
    list.length,
    new Set(list).size,
    "collectManagedHosts must not return duplicates"
  );
});

test("collectManagedHosts includes custom hosts persisted in the DB", () => {
  customHostsDb.addCustomHost("api.my-internal-llm.test", "custom");
  const managed = new Set(manager.collectManagedHosts());
  assert.ok(
    managed.has("api.my-internal-llm.test"),
    "a custom host added to the DB must be enumerated for cleanup"
  );
});
