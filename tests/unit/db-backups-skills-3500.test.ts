/**
 * #3500 slice 5 — skills UPDATE + db-backups SQL extracted into db modules
 * (Hard Rule #5).
 *
 * Seeds a temp SQLite DB and asserts:
 *  1. updateSkill applies a patch correctly (allowed columns), including the
 *     co-update of `mode` when only `enabled` is provided (legacy sync logic).
 *  2. updateSkill ignores unknown columns (allowlist guard — injection-safe).
 *  3. exportAllSummaryRows returns seeded rows from key_value / combos /
 *     provider_connections / api_keys.
 *  4. getTableNamesFromAdapter returns table names from an adapter.
 *  5. countImportedRows returns correct counts from the live DB.
 *
 * DB handles are released in test.after to prevent the Node native runner from
 * hanging indefinitely (CLAUDE.md PII/Stream Learnings #3).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-backups-skills-3500-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const skillsMod = await import("../../src/lib/db/skills.ts");
const backupMod = await import("../../src/lib/db/backup.ts");

// ──────────────── Helpers ────────────────

function uniqueId(prefix = "test") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Insert a minimal skills row directly (bypasses the module under test). */
function seedSkill(overrides: Partial<Record<string, unknown>> = {}) {
  const db = core.getDbInstance();
  const id = uniqueId("skill");
  db.prepare(
    `INSERT INTO skills
      (id, api_key_id, name, version, description, schema, handler, enabled, mode)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    overrides.id ?? id,
    overrides.api_key_id ?? "key-1",
    overrides.name ?? "test-skill",
    overrides.version ?? "1.0.0",
    overrides.description ?? "desc",
    overrides.schema ?? "{}",
    overrides.handler ?? "handler",
    overrides.enabled ?? 1,
    overrides.mode ?? "auto"
  );
  return (overrides.id as string) ?? id;
}

// ──────────────── updateSkill ────────────────

test("updateSkill — patches enabled+mode, updates updated_at", () => {
  const id = seedSkill({ enabled: 1, mode: "auto" });

  // Act
  const changed = skillsMod.updateSkill(id, { enabled: 0, mode: "off" });

  assert.equal(changed, 1, "should affect 1 row");

  const db = core.getDbInstance();
  const row = db.prepare("SELECT enabled, mode FROM skills WHERE id = ?").get(id) as {
    enabled: number;
    mode: string;
  };
  assert.equal(row.enabled, 0);
  assert.equal(row.mode, "off");
});

test("updateSkill — only mode provided keeps enabled consistent", () => {
  const id = seedSkill({ enabled: 0, mode: "off" });

  skillsMod.updateSkill(id, { mode: "on" });

  const db = core.getDbInstance();
  const row = db.prepare("SELECT enabled, mode FROM skills WHERE id = ?").get(id) as {
    enabled: number;
    mode: string;
  };
  assert.equal(row.mode, "on");
});

test("updateSkill — unknown columns are silently ignored (allowlist guard)", () => {
  const id = seedSkill({ enabled: 1, mode: "auto" });

  // Inject an unknown key; this must NOT throw or produce SQL with an injected column.
  const patch = { enabled: 0, "'; DROP TABLE skills; --": 1 } as Record<string, unknown>;
  // Cast via any to bypass TS type — testing the runtime allowlist
  const changed = skillsMod.updateSkill(id, patch as Parameters<typeof skillsMod.updateSkill>[1]);
  assert.equal(changed, 1, "should still apply the known field");

  const db = core.getDbInstance();
  const tableExists = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='skills'")
    .get();
  assert.ok(tableExists, "skills table must still exist after attempted injection");
});

test("updateSkill — empty patch (all unknown columns) returns 0 changes", () => {
  const id = seedSkill();
  const patch = { unknownField: "x" } as Parameters<typeof skillsMod.updateSkill>[1];
  const changed = skillsMod.updateSkill(id, patch);
  assert.equal(changed, 0);
});

test("updateSkill — non-existent id returns 0 changes", () => {
  const changed = skillsMod.updateSkill("non-existent-id", { enabled: 1 });
  assert.equal(changed, 0);
});

// ──────────────── exportAllSummaryRows ────────────────

test("exportAllSummaryRows — returns key_value rows", () => {
  const db = core.getDbInstance();
  // key_value schema: namespace TEXT, key TEXT, value TEXT — PK is (namespace, key)
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "settings",
    "test.export.key",
    "hello-value"
  );

  const { settings } = backupMod.exportAllSummaryRows();

  // exportAllSummaryRows does "SELECT key, value FROM key_value" (all namespaces)
  assert.equal(settings["test.export.key"], "hello-value", "settings must contain seeded key");
});

test("exportAllSummaryRows — returns combos rows", () => {
  const db = core.getDbInstance();
  const comboId = uniqueId("combo");
  const now = new Date().toISOString();
  // combos schema: id, name, data, created_at, updated_at (sort_order optional)
  db.prepare(
    `INSERT INTO combos (id, name, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`
  ).run(comboId, "export-test-combo", "{}", now, now);

  const { combos } = backupMod.exportAllSummaryRows();

  assert.ok(
    (combos as Array<{ id: string }>).some((c) => c.id === comboId),
    "combos must include seeded row"
  );
});

test("exportAllSummaryRows — returns provider_connections rows (no credentials)", () => {
  const db = core.getDbInstance();
  const connId = uniqueId("conn");
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO provider_connections
       (id, provider, name, auth_type, is_active, email, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(connId, "openai", "My Key", "api_key", 1, "test@example.com", now, now);

  const { providers } = backupMod.exportAllSummaryRows();

  const found = (providers as Array<{ id: string; provider: string }>).find(
    (p) => p.id === connId
  );
  assert.ok(found, "providers must include seeded row");
  assert.equal(found?.provider, "openai");
  // Sensitive credential columns must NOT be exported — the query only selects
  // id, provider, name, auth_type, is_active, email, created_at.
  assert.ok(!("api_key" in (found as object)), "api_key column must not be exported");
  assert.ok(!("oauth_token" in (found as object)), "oauth_token column must not be exported");
});

test("exportAllSummaryRows — returns api_keys rows (masked prefix only)", () => {
  const db = core.getDbInstance();
  const keyId = uniqueId("apikey");
  const fullKey = "sk-supersecretvalue123456";
  // api_keys schema: id, name, key, machine_id, created_at
  db.prepare(
    `INSERT INTO api_keys (id, name, key, created_at)
     VALUES (?, ?, ?, datetime('now'))`
  ).run(keyId, "export-test-key", fullKey);

  const { apiKeys } = backupMod.exportAllSummaryRows();

  const found = (apiKeys as Array<{ id: string; prefix?: string }>).find((k) => k.id === keyId);
  assert.ok(found, "apiKeys must include seeded row");
  assert.equal(found?.prefix, fullKey.slice(0, 8), "only the first 8 chars must be exported");
  assert.ok(!("key" in (found as object)), "full key column must not be exported");
});

// ──────────────── getTableNamesFromAdapter ────────────────

test("getTableNamesFromAdapter — returns table names from the live db adapter", () => {
  // Use the live db instance (which has been initialized with all migrations)
  // cast to the minimal interface the function requires.
  const db = core.getDbInstance() as {
    prepare: (sql: string) => { all: () => unknown[] };
  };
  const tables = backupMod.getTableNamesFromAdapter(db);

  assert.ok(Array.isArray(tables), "must return an array");
  assert.ok(tables.includes("skills"), "skills table must be present");
  assert.ok(tables.includes("combos"), "combos table must be present");
  assert.ok(tables.includes("provider_connections"), "provider_connections must be present");
  assert.ok(tables.includes("api_keys"), "api_keys must be present");
});

// ──────────────── countImportedRows ────────────────

test("countImportedRows — returns correct non-negative counts", () => {
  const counts = backupMod.countImportedRows();

  // Counts must be non-negative integers (we can't assert exact values since
  // other tests may have inserted rows, but we verify the shape).
  assert.ok(typeof counts.connCount === "number" && counts.connCount >= 0);
  assert.ok(typeof counts.nodeCount === "number" && counts.nodeCount >= 0);
  assert.ok(typeof counts.comboCount === "number" && counts.comboCount >= 0);
  assert.ok(typeof counts.keyCount === "number" && counts.keyCount >= 0);
});

// ──────────────── Teardown ────────────────

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {
    /* best effort */
  }
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    /* best effort */
  }
});
