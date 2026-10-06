import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #6372: internal probes (combo-test, cloud-sync verify) must NOT naively grab
// getApiKeys()[0] — that first row is usually a restricted self:usage key, so
// the probe hits "Model X is not allowed for this API key" even when the combo
// path is healthy. pickApiKeyForInternalUse prefers a management-scoped key.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-pick-internal-key-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

function reset() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => reset());
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#6372: returns null when there are no keys", async () => {
  assert.equal(await apiKeysDb.pickApiKeyForInternalUse("combo-health-check"), null);
});

test("internal probes never auto-select a hard-lease key", async () => {
  await apiKeysDb.createApiKey("managed-key", "machine-a", ["manage", "lease:exclusive"], {
    allowedConnections: ["00000000-0000-4000-8000-000000000001"],
  });

  assert.equal(await apiKeysDb.pickApiKeyForInternalUse("combo-health-check"), null);
  assert.equal(await apiKeysDb.pickApiKeyForInternalUse("internal-probe"), null);
});

test("#6372: prefers a management-scoped key over a plain self:usage key", async () => {
  // Insert the plain (restricted-intent) key FIRST so getApiKeys()[0] would be
  // the wrong one under the old naive selection.
  await apiKeysDb.createApiKey("usage-key", "machine-a", ["self:usage"]);
  const mgr = await apiKeysDb.createApiKey("manage-key", "machine-a", ["manage"]);

  const picked = await apiKeysDb.pickApiKeyForInternalUse("combo-health-check");
  assert.equal(picked, mgr.key, "should pick the management-scoped key, not the first row");
});

test("#6372: a restricted-empty key does not outrank a real allow-all key", async () => {
  const restricted = await apiKeysDb.createApiKey("restricted-empty", "machine-a", ["self:usage"]);
  await apiKeysDb.updateApiKeyPermissions(restricted.id, {
    modelAccessMode: "restricted",
    allowedModels: [],
  });
  const allowAll = await apiKeysDb.createApiKey("allow-all", "machine-a", ["self:usage"]);

  const picked = await apiKeysDb.pickApiKeyForInternalUse("internal-probe");
  assert.equal(picked, allowAll.key);
});

test("#6372: falls back to an active key when none is management-scoped or allow-all", async () => {
  const only = await apiKeysDb.createApiKey("restricted-empty", "machine-a", ["self:usage"]);
  await apiKeysDb.updateApiKeyPermissions(only.id, {
    modelAccessMode: "restricted",
    allowedModels: [],
  });

  const picked = await apiKeysDb.pickApiKeyForInternalUse("internal-probe");
  assert.equal(
    picked,
    only.key,
    "last-resort fallback stays best-effort and does not bypass policy"
  );
});
