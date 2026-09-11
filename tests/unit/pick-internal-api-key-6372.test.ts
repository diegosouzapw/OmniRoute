import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #6372: internal probes (combo-test, cloud-sync verify) must NOT naively grab
// getApiKeys()[0] — that first row is usually a restricted self:usage key, so
// the probe hits "Model X is not allowed for this API key" even when the combo
// path is healthy. pickApiKeyForInternalUse prefers a management-scoped key.
//
// Updated for the plaintext-redaction security fix: createApiKey()/
// regenerateApiKey() no longer persist a usable plaintext `key` (see
// redactedKeyPlaceholder() in src/lib/db/apiKeys.ts), so a freshly created
// "management-scoped" or "allow-all" key in these tests is never itself
// selectable via steps 1-4 of pickApiKeyForInternalUse — only a legacy row
// with a real (or encrypted-and-decryptable) key, or the dedicated
// auto-created internal-service key (step 5), can be returned.

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

test("#6372: with no keys, falls back to a lazily-created internal-service key rather than null", async () => {
  const picked = await apiKeysDb.pickApiKeyForInternalUse("combo-health-check");
  assert.equal(typeof picked, "string");
  assert.ok(picked && picked.length > 0);

  // Idempotent: a second call reuses the same auto-created key rather than
  // minting a new one every time.
  const pickedAgain = await apiKeysDb.pickApiKeyForInternalUse("combo-health-check");
  assert.equal(pickedAgain, picked);
});

test("internal probes never auto-select a hard-lease key (falls back to the internal-service key instead)", async () => {
  await apiKeysDb.createApiKey("managed-key", "machine-a", ["manage", "lease:exclusive"], {
    allowedConnections: ["00000000-0000-4000-8000-000000000001"],
  });

  const picked = await apiKeysDb.pickApiKeyForInternalUse("combo-health-check");
  // Not null (the internal-service fallback covers this case), and not a
  // value that could plausibly be the hard-lease key's own secret.
  assert.ok(picked);
  assert.notEqual(picked, "");
});

test("#6372: prefers a legacy usable key over the auto-created internal-service fallback", async () => {
  // Freshly created keys are always redacted (see module docstring), so to
  // exercise the "prefer an existing usable key" branch (steps 1-4) we
  // simulate a pre-migration row the same way `encryptApiKeyPlaintext()`
  // would leave one that could not be encrypted (STORAGE_ENCRYPTION_KEY
  // unset) — a real plaintext value still sitting in `api_keys.key`.
  await apiKeysDb.createApiKey("usage-key", "machine-a", ["self:usage"]);
  const mgr = await apiKeysDb.createApiKey("manage-key", "machine-a", ["manage"]);

  const db = core.getDbInstance();
  const legacyPlaintextKey = "sk-legacy-plaintext-test-key-0123456789abcdef";
  db.prepare("UPDATE api_keys SET key = ? WHERE id = ?").run(legacyPlaintextKey, mgr.id);

  const picked = await apiKeysDb.pickApiKeyForInternalUse("combo-health-check");
  assert.equal(
    picked,
    legacyPlaintextKey,
    "should prefer the legacy management-scoped key over minting a new internal-service key",
  );
});

test("#6372: a restricted-empty legacy key does not outrank a real legacy allow-all key", async () => {
  const restricted = await apiKeysDb.createApiKey("restricted-empty", "machine-a", ["self:usage"]);
  await apiKeysDb.updateApiKeyPermissions(restricted.id, {
    modelAccessMode: "restricted",
    allowedModels: [],
  });
  const allowAll = await apiKeysDb.createApiKey("allow-all", "machine-a", ["self:usage"]);

  const db = core.getDbInstance();
  const restrictedLegacyKey = "sk-legacy-restricted-0123456789abcdef";
  const allowAllLegacyKey = "sk-legacy-allow-all-0123456789abcdef";
  db.prepare("UPDATE api_keys SET key = ? WHERE id = ?").run(restrictedLegacyKey, restricted.id);
  db.prepare("UPDATE api_keys SET key = ? WHERE id = ?").run(allowAllLegacyKey, allowAll.id);

  const picked = await apiKeysDb.pickApiKeyForInternalUse("internal-probe");
  assert.equal(picked, allowAllLegacyKey);
});

test("#6372: falls back to an active legacy key when none is management-scoped or allow-all", async () => {
  const only = await apiKeysDb.createApiKey("restricted-empty", "machine-a", ["self:usage"]);
  await apiKeysDb.updateApiKeyPermissions(only.id, {
    modelAccessMode: "restricted",
    allowedModels: [],
  });

  const db = core.getDbInstance();
  const legacyKey = "sk-legacy-fallback-0123456789abcdef";
  db.prepare("UPDATE api_keys SET key = ? WHERE id = ?").run(legacyKey, only.id);

  const picked = await apiKeysDb.pickApiKeyForInternalUse("internal-probe");
  assert.equal(
    picked,
    legacyKey,
    "last-resort fallback stays best-effort and does not bypass policy",
  );
});
