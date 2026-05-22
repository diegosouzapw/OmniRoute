/**
 * Unit coverage for the api_keys DB layer — focused on the `scopes` column
 * and the audit-event emission contract for privileged scope changes.
 *
 * The fixtures here intentionally mirror tests/unit/api-auth.test.ts so the
 * two suites share the same bootstrap shape (isolated DATA_DIR, fresh DB per
 * test, env reset).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-api-keys-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const compliance = await import("../../../src/lib/compliance/index.ts");
const { hasManageScope } = await import("../../../src/shared/constants/managementScopes.ts");

const MACHINE_ID = "machine1234567890";

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─────────────────────────────────────────────────────────────────────────────
// createApiKey + scopes round-trip
// ─────────────────────────────────────────────────────────────────────────────

test("createApiKey persists scopes to the api_keys row", async () => {
  const created = await apiKeysDb.createApiKey("with-manage", MACHINE_ID, ["manage"]);
  assert.ok(created.id);
  assert.ok(created.key);
  assert.deepEqual(created.scopes, ["manage"]);

  // Verify the row hit the DB by reading raw column.
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { get: (id: string) => { scopes: string | null } | undefined };
  };
  const row = db.prepare("SELECT scopes FROM api_keys WHERE id = ?").get(created.id);
  assert.equal(row?.scopes, JSON.stringify(["manage"]));
});

test("createApiKey with default scopes writes an empty JSON array", async () => {
  const created = await apiKeysDb.createApiKey("no-scope", MACHINE_ID);
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { get: (id: string) => { scopes: string | null } | undefined };
  };
  const row = db.prepare("SELECT scopes FROM api_keys WHERE id = ?").get(created.id);
  assert.equal(row?.scopes, "[]");
});

test("getApiKeyMetadata returns the scopes for a key created with manage", async () => {
  const created = await apiKeysDb.createApiKey("metadata-readback", MACHINE_ID, ["manage"]);
  const meta = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.deepEqual(meta!.scopes, ["manage"]);
  assert.equal(hasManageScope(meta!.scopes), true);
});

test("getApiKeyMetadata returns an empty scopes array for a key created without scopes", async () => {
  const created = await apiKeysDb.createApiKey("no-manage", MACHINE_ID);
  const meta = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.deepEqual(meta!.scopes, []);
  assert.equal(hasManageScope(meta!.scopes), false);
});

// ─────────────────────────────────────────────────────────────────────────────
// Legacy NULL scopes (pre-migration-032 row simulation)
// ─────────────────────────────────────────────────────────────────────────────

test("legacy rows with NULL scopes parse to an empty array and never hold manage", async () => {
  const created = await apiKeysDb.createApiKey("legacy-null", MACHINE_ID);
  // Simulate a pre-migration row by force-NULL on the scopes column.
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { run: (...args: unknown[]) => unknown };
  };
  db.prepare("UPDATE api_keys SET scopes = NULL WHERE id = ?").run(created.id);
  apiKeysDb.clearApiKeyCaches();

  const meta = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.deepEqual(meta!.scopes, []);
  assert.equal(hasManageScope(meta!.scopes), false);
});

// ─────────────────────────────────────────────────────────────────────────────
// updateApiKeyPermissions — audit events for scope changes
// ─────────────────────────────────────────────────────────────────────────────

test("updateApiKeyPermissions granting manage emits apiKey.scopes.grant", async () => {
  const created = await apiKeysDb.createApiKey("for-grant", MACHINE_ID);

  const before = compliance.getAuditLog({ limit: 100 });
  const beforeGrant = before.filter(
    (e) => e.action === "apiKey.scopes.grant" && e.target === created.id
  );
  assert.equal(beforeGrant.length, 0);

  const ok = await apiKeysDb.updateApiKeyPermissions(created.id, { scopes: ["manage"] });
  assert.equal(ok, true);

  const after = compliance.getAuditLog({ limit: 100 });
  const grants = after.filter((e) => e.action === "apiKey.scopes.grant" && e.target === created.id);
  assert.equal(grants.length, 1, "expected exactly one grant audit event");

  // Confirm the round-trip — manage should now be on the key.
  const meta = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.equal(hasManageScope(meta!.scopes), true);
});

test("updateApiKeyPermissions revoking manage emits apiKey.scopes.revoke", async () => {
  const created = await apiKeysDb.createApiKey("for-revoke", MACHINE_ID, ["manage"]);

  const ok = await apiKeysDb.updateApiKeyPermissions(created.id, { scopes: [] });
  assert.equal(ok, true);

  const after = compliance.getAuditLog({ limit: 100 });
  const revokes = after.filter(
    (e) => e.action === "apiKey.scopes.revoke" && e.target === created.id
  );
  assert.equal(revokes.length, 1, "expected exactly one revoke audit event");

  const meta = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.equal(hasManageScope(meta!.scopes), false);
});

test("updateApiKeyPermissions setting same manage scope does not emit duplicate audit events", async () => {
  const created = await apiKeysDb.createApiKey("idempotent-manage", MACHINE_ID, ["manage"]);

  const ok = await apiKeysDb.updateApiKeyPermissions(created.id, { scopes: ["manage"] });
  assert.equal(ok, true);

  const after = compliance.getAuditLog({ limit: 100 });
  const scopeEvents = after.filter(
    (e) =>
      (e.action === "apiKey.scopes.grant" ||
        e.action === "apiKey.scopes.revoke" ||
        e.action === "apiKey.scopes.update") &&
      e.target === created.id
  );
  assert.equal(
    scopeEvents.length,
    0,
    "no-op scope update should not emit grant/revoke/update events"
  );
});

test("updateApiKeyPermissions changing non-manage scopes emits apiKey.scopes.update", async () => {
  const created = await apiKeysDb.createApiKey("non-manage-update", MACHINE_ID, []);

  const ok = await apiKeysDb.updateApiKeyPermissions(created.id, { scopes: ["read:logs"] });
  assert.equal(ok, true);

  const after = compliance.getAuditLog({ limit: 100 });
  const updates = after.filter(
    (e) => e.action === "apiKey.scopes.update" && e.target === created.id
  );
  assert.equal(updates.length, 1, "expected exactly one non-manage scope update event");
});

// ─────────────────────────────────────────────────────────────────────────────
// Regression — scopes and ban state are orthogonal (T-008)
//
// The Permissions modal previously had two chips bound to `isBanned` (one
// labelled "Management API Access" with manage-scope copy). A user toggling
// it expected manage-scope grant; instead it flipped the ban flag. These
// tests guard against the inverse cross-wire ever returning: updating scopes
// must not touch isBanned, and toggling isBanned must not touch scopes.
// ─────────────────────────────────────────────────────────────────────────────

test("updating scopes to manage leaves isBanned untouched", async () => {
  const created = await apiKeysDb.createApiKey("banned-then-manage", MACHINE_ID, []);
  const banOk = await apiKeysDb.updateApiKeyPermissions(created.id, { isBanned: true });
  assert.equal(banOk, true);

  const ok = await apiKeysDb.updateApiKeyPermissions(created.id, { scopes: ["manage"] });
  assert.equal(ok, true);

  const meta = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.deepEqual(meta!.scopes, ["manage"]);
  assert.equal(meta!.isBanned, true, "ban flag must survive a scopes-only update");
});

test("toggling isBanned does not touch scopes", async () => {
  const created = await apiKeysDb.createApiKey("manage-then-ban", MACHINE_ID, ["manage"]);

  const banOk = await apiKeysDb.updateApiKeyPermissions(created.id, { isBanned: true });
  assert.equal(banOk, true);

  const meta = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(meta);
  assert.deepEqual(meta!.scopes, ["manage"], "scopes must survive a ban-only update");
  assert.equal(meta!.isBanned, true);

  const unbanOk = await apiKeysDb.updateApiKeyPermissions(created.id, { isBanned: false });
  assert.equal(unbanOk, true);

  const meta2 = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(meta2);
  assert.deepEqual(meta2!.scopes, ["manage"], "scopes must survive an unban update");
  assert.equal(meta2!.isBanned, false);
});

test("updateApiKeyPermissions without scopes field does not emit any scope audit event", async () => {
  const created = await apiKeysDb.createApiKey("no-scope-change", MACHINE_ID);

  const ok = await apiKeysDb.updateApiKeyPermissions(created.id, { name: "renamed" });
  assert.equal(ok, true);

  const after = compliance.getAuditLog({ limit: 100 });
  const scopeEvents = after.filter(
    (e) =>
      (e.action === "apiKey.scopes.grant" ||
        e.action === "apiKey.scopes.revoke" ||
        e.action === "apiKey.scopes.update") &&
      e.target === created.id
  );
  assert.equal(scopeEvents.length, 0);
});
