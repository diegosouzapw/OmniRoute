import test from "node:test";
import assert from "node:assert/strict";

const core = await import("../../src/lib/db/core.ts");
const { runJsonMigration } = await import("../../src/lib/db/jsonMigration.ts");

test.afterEach(() => {
  try {
    core.resetDbInstance();
  } catch {
    // ignore — no instance open
  }
});

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {
    // ignore — no instance open
  }
});

test("dashboard re-import stores rateLimitOverrides in rate_limit_overrides_json", () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM provider_connections").run();
  try {
    runJsonMigration(db, {
      providerConnections: [
        {
          id: "dashboard-store-1",
          provider: "openai",
          authType: "apikey",
          rateLimitOverrides: { rpm: 90 },
        },
      ],
    });
    const row = db
      .prepare("SELECT rate_limit_overrides_json FROM provider_connections WHERE id = ?")
      .get("dashboard-store-1") as { rate_limit_overrides_json: string | null } | undefined;
    assert.ok(row, "row must exist");
    assert.deepEqual(JSON.parse(row.rate_limit_overrides_json as string), { rpm: 90 });
  } finally {
    db.prepare("DELETE FROM provider_connections").run();
  }
});

test("dashboard re-import without overrides preserves existing rate_limit_overrides_json", () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM provider_connections").run();
  try {
    runJsonMigration(db, {
      providerConnections: [
        {
          id: "dashboard-preserve-1",
          provider: "openai",
          authType: "apikey",
          rateLimitOverrides: { rpm: 77 },
        },
      ],
    });
    runJsonMigration(db, {
      providerConnections: [
        { id: "dashboard-preserve-1", provider: "openai", authType: "apikey" },
      ],
    });
    const row = db
      .prepare("SELECT rate_limit_overrides_json FROM provider_connections WHERE id = ?")
      .get("dashboard-preserve-1") as { rate_limit_overrides_json: string | null } | undefined;
    assert.ok(row, "row must exist");
    assert.deepEqual(JSON.parse(row.rate_limit_overrides_json as string), { rpm: 77 });
  } finally {
    db.prepare("DELETE FROM provider_connections").run();
  }
});

test("dashboard re-import without overrides on a missing row stores NULL without error", () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM provider_connections").run();
  try {
    runJsonMigration(db, {
      providerConnections: [
        { id: "dashboard-missing-1", provider: "openai", authType: "apikey" },
      ],
    });
    const row = db
      .prepare("SELECT rate_limit_overrides_json FROM provider_connections WHERE id = ?")
      .get("dashboard-missing-1") as { rate_limit_overrides_json: string | null } | undefined;
    assert.ok(row, "row must exist");
    assert.equal(row.rate_limit_overrides_json, null);
  } finally {
    db.prepare("DELETE FROM provider_connections").run();
  }
});

test("exported backup with rateLimitOverrides survives a dashboard re-import", () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM provider_connections").run();
  try {
    const backup = {
      providerConnections: [
        {
          id: "dashboard-backup-1",
          provider: "openai",
          authType: "apikey",
          rateLimitOverrides: { rpm: 45, minTime: 200 },
        },
      ],
    };
    const exported = JSON.parse(JSON.stringify(backup));
    runJsonMigration(db, exported);
    const row = db
      .prepare("SELECT rate_limit_overrides_json FROM provider_connections WHERE id = ?")
      .get("dashboard-backup-1") as { rate_limit_overrides_json: string | null } | undefined;
    assert.ok(row, "row must exist");
    assert.deepEqual(JSON.parse(row.rate_limit_overrides_json as string), {
      rpm: 45,
      minTime: 200,
    });
  } finally {
    db.prepare("DELETE FROM provider_connections").run();
  }
});
