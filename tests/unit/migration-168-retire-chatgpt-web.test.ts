import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatgpt-web-retirement-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

const RETIRED_PROVIDER_IDS = ["chatgpt-web", "cgpt-web"] as const;
const CONTROL_PROVIDER = "chatgpt-web-codex";

type ConnectionState = {
  id: string;
  is_active: number;
  test_status: string;
  error_code: string;
  last_error: string;
  last_error_type: string;
  last_error_source: string;
  last_error_at: string;
  updated_at: string;
};

type LeaseState = {
  id: number;
  generation: number;
  state: string;
  ended_at: string | null;
  end_reason: string | null;
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 168 retires every common ChatGPT Web id fail-closed and preserves audit history", async () => {
  const db = core.getDbInstance();

  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = 168")
    .get() as { version: number } | undefined;
  assert.ok(applied, "migration 168 must be recorded as applied");

  // Recreate a pre-migration fixture even though a fresh test database already
  // applied migration 168 during startup.
  db.exec(`
    DROP TRIGGER IF EXISTS provider_connections_retire_chatgpt_web_insert;
    DROP TRIGGER IF EXISTS provider_connections_retire_chatgpt_web_update;
    DROP TRIGGER IF EXISTS provider_connections_preserve_chatgpt_web_identity_insert;
    DROP TRIGGER IF EXISTS provider_connections_preserve_chatgpt_web_identity_update;
    DROP TRIGGER IF EXISTS exclusive_connection_leases_retire_chatgpt_web_insert;
    DROP TRIGGER IF EXISTS exclusive_connection_leases_retire_chatgpt_web_update;
  `);

  // The domain module reconciles API-key policy columns on a fresh database.
  // Production upgrades already carry these columns from normal API-key use.
  await apiKeysDb.getApiKeys();

  for (const provider of [...RETIRED_PROVIDER_IDS, CONTROL_PROVIDER]) {
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, is_active, created_at, updated_at) " +
        "VALUES (?, ?, 'apikey', ?, 1, datetime('now'), datetime('now'))"
    ).run(`${provider}-connection`, provider, `${provider}-fixture`);
  }

  for (const provider of RETIRED_PROVIDER_IDS) {
    db.prepare(
      "UPDATE provider_connections SET test_status = 'active', last_error = 'legacy error', " +
        "last_error_type = 'legacy', last_error_source = 'legacy:test', " +
        "last_error_at = '2000-01-01T00:00:00.000Z', updated_at = '2000-01-01T00:00:00.000Z' " +
        "WHERE provider = ?"
    ).run(provider);
  }

  const normalizedProviderVariants = [
    { id: "mixed-case-chatgpt-web-connection", provider: " ChAtGpT-WeB " },
    { id: "mixed-case-cgpt-web-alias-connection", provider: "\tCGPT-WEB\n" },
    { id: "nbsp-chatgpt-web-connection", provider: "\u00a0CHATGPT-WEB\uFEFF" },
    { id: "em-space-cgpt-web-alias-connection", provider: "\u2003cgpt-web\u2029" },
    { id: "ideographic-chatgpt-web-connection", provider: "\u3000CHATGPT-WEB\u3000" },
  ] as const;
  for (const { id, provider } of normalizedProviderVariants) {
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, is_active, test_status, last_error, " +
        "last_error_type, last_error_source, last_error_at, created_at, updated_at) " +
        "VALUES (?, ?, 'apikey', ?, 1, 'active', 'legacy error', 'legacy', " +
        "'legacy:test', '2000-01-01T00:00:00.000Z', datetime('now'), " +
        "'2000-01-01T00:00:00.000Z')"
    ).run(id, provider, `${id}-fixture`);
  }

  const retiredConnectionIds = RETIRED_PROVIDER_IDS.map((provider) => `${provider}-connection`);
  db.prepare(
    "INSERT INTO api_keys " +
      "(id, name, key, key_hash, key_prefix, allowed_connections, is_active, created_at) " +
      "VALUES ('restricted-key', 'restricted-key', 'restricted-secret', " +
      "'restricted-hash', 'restrict', ?, 1, datetime('now'))"
  ).run(JSON.stringify(retiredConnectionIds));

  const mixedConnectionIds = [...retiredConnectionIds, `${CONTROL_PROVIDER}-connection`];
  const mixedAllowedConnectionsRaw =
    ' [ "chatgpt-web-connection" , "cgpt-web-connection" , "chatgpt-web-codex-connection" ] ';
  db.prepare(
    "INSERT INTO api_keys " +
      "(id, name, key, key_hash, key_prefix, allowed_connections, is_active, created_at) " +
      "VALUES ('mixed-key', 'mixed-key', 'mixed-secret', " +
      "'mixed-hash', 'mixed', ?, 1, datetime('now'))"
  ).run(mixedAllowedConnectionsRaw);

  const leaseIds = new Map<string, number>();
  const staleLeaseEndedAt = "2000-01-01T00:00:00.000Z";
  for (const provider of RETIRED_PROVIDER_IDS) {
    const connectionId = `${provider}-connection`;
    const leaseProvider = provider === "chatgpt-web" ? "legacy-imported-provider" : provider;
    const insertedLease = db
      .prepare(
        "INSERT INTO exclusive_connection_leases " +
          "(lease_owner_hash, api_key_id, provider, connection_id, generation, state, " +
          "acquired_at, renewed_at, expires_at) VALUES (?, 'restricted-key', ?, ?, 7, " +
          "'ACTIVE', datetime('now'), datetime('now'), datetime('now', '+1 hour'))"
      )
      .run(provider.padEnd(64, "0"), leaseProvider, connectionId);
    leaseIds.set(provider, Number(insertedLease.lastInsertRowid));
    if (provider === "chatgpt-web") {
      db.prepare("UPDATE exclusive_connection_leases SET ended_at = ? WHERE id = ?").run(
        staleLeaseEndedAt,
        Number(insertedLease.lastInsertRowid)
      );
    }

    db.prepare(
      "INSERT INTO usage_history (provider, model, timestamp) " +
        "VALUES (?, 'gpt-5.5', datetime('now'))"
    ).run(provider);
    db.prepare(
      "INSERT INTO call_logs (id, timestamp, provider, model, status) " +
        "VALUES (?, datetime('now'), ?, 'gpt-5.5', 200)"
    ).run(`${provider}-call`, provider);
    db.prepare(
      "INSERT INTO quota_snapshots " +
        "(provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at) " +
        "VALUES (?, ?, 'monthly', 50, 0, ?)"
    ).run(provider, connectionId, new Date().toISOString());
  }

  const controlLeaseId = Number(
    db
      .prepare(
        "INSERT INTO exclusive_connection_leases " +
          "(lease_owner_hash, api_key_id, provider, connection_id, generation, state, " +
          "acquired_at, renewed_at, expires_at) VALUES (?, 'mixed-key', ?, ?, 11, " +
          "'ACTIVE', datetime('now'), datetime('now'), datetime('now', '+1 hour'))"
      )
      .run("chatgpt-web-codex".padEnd(64, "0"), CONTROL_PROVIDER, `${CONTROL_PROVIDER}-connection`)
      .lastInsertRowid
  );

  const readConnection = (provider: string) =>
    db
      .prepare(
        "SELECT id, is_active, test_status, error_code, last_error, last_error_type, " +
          "last_error_source, last_error_at, updated_at FROM provider_connections " +
          "WHERE provider = ?"
      )
      .get(provider) as ConnectionState;
  const readConnectionById = (id: string) =>
    db
      .prepare(
        "SELECT id, is_active, test_status, error_code, last_error, last_error_type, " +
          "last_error_source, last_error_at, updated_at FROM provider_connections " +
          "WHERE id = ?"
      )
      .get(id) as ConnectionState;
  const readLease = (id: number) =>
    db
      .prepare(
        "SELECT id, generation, state, ended_at, end_reason FROM exclusive_connection_leases " +
          "WHERE id = ?"
      )
      .get(id) as LeaseState;
  const readTotalChanges = () =>
    (db.prepare("SELECT total_changes() AS changes").get() as { changes: number }).changes;

  const sql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/168_retire_chatgpt_web.sql"),
    "utf8"
  );
  db.exec(sql);
  const firstConnections = new Map(
    RETIRED_PROVIDER_IDS.map((provider) => [provider, readConnection(provider)])
  );
  const firstLeases = new Map(
    RETIRED_PROVIDER_IDS.map((provider) => [provider, readLease(leaseIds.get(provider)!)])
  );

  const changesBeforeSecondExecution = readTotalChanges();
  db.exec(sql);
  assert.equal(
    readTotalChanges() - changesBeforeSecondExecution,
    0,
    "a second execution must not rewrite any retired connection or lease row"
  );

  for (const provider of RETIRED_PROVIDER_IDS) {
    const connection = firstConnections.get(provider)!;
    const lease = firstLeases.get(provider)!;

    assert.deepEqual(readConnection(provider), connection, "timestamps must remain stable");
    assert.deepEqual(
      readLease(leaseIds.get(provider)!),
      lease,
      "the invalidated lease must remain stable"
    );

    assert.equal(connection.id, `${provider}-connection`);
    assert.equal(connection.is_active, 0);
    assert.equal(connection.test_status, "unavailable");
    assert.equal(connection.error_code, "PROVIDER_REMOVED");
    assert.equal(connection.last_error, "Provider integration retired from OmniRoute v3.8.51");
    assert.equal(connection.last_error_type, "provider_removed");
    assert.equal(connection.last_error_source, "migration:retire-chatgpt-web");
    assert.notEqual(connection.last_error_at, "2000-01-01T00:00:00.000Z");
    assert.notEqual(connection.updated_at, "2000-01-01T00:00:00.000Z");

    assert.equal(lease.id, leaseIds.get(provider));
    assert.equal(lease.generation, 7);
    assert.equal(lease.state, "INVALIDATED");
    assert.ok(lease.ended_at);
    if (provider === "chatgpt-web") {
      assert.notEqual(
        lease.ended_at,
        staleLeaseEndedAt,
        "the retirement event must replace a stale restored end timestamp"
      );
    }
    assert.equal(lease.end_reason, "CONNECTION_INELIGIBLE");

    assert.ok(db.prepare("SELECT id FROM usage_history WHERE provider = ?").get(provider));
    assert.ok(db.prepare("SELECT id FROM call_logs WHERE provider = ?").get(provider));
    assert.ok(db.prepare("SELECT id FROM quota_snapshots WHERE provider = ?").get(provider));
  }

  for (const { id } of normalizedProviderVariants) {
    const connection = db
      .prepare(
        "SELECT is_active, test_status, error_code, last_error_type, last_error_source " +
          "FROM provider_connections WHERE id = ?"
      )
      .get(id) as {
      is_active: number;
      test_status: string;
      error_code: string;
      last_error_type: string;
      last_error_source: string;
    };
    assert.deepEqual(connection, {
      is_active: 0,
      test_status: "unavailable",
      error_code: "PROVIDER_REMOVED",
      last_error_type: "provider_removed",
      last_error_source: "migration:retire-chatgpt-web",
    });
  }

  const control = db
    .prepare("SELECT is_active FROM provider_connections WHERE id = 'chatgpt-web-codex-connection'")
    .get() as { is_active: number };
  assert.equal(
    control.is_active,
    1,
    "the independent ChatGPT Web Codex provider must remain active"
  );

  assert.deepEqual(
    readLease(controlLeaseId),
    {
      id: controlLeaseId,
      generation: 11,
      state: "ACTIVE",
      ended_at: null,
      end_reason: null,
    },
    "an unrelated active lease must not be invalidated"
  );

  const apiKey = db
    .prepare("SELECT is_active, allowed_connections FROM api_keys WHERE id = 'restricted-key'")
    .get() as { is_active: number; allowed_connections: string };
  assert.equal(apiKey.is_active, 1);
  assert.deepEqual(
    JSON.parse(apiKey.allowed_connections),
    retiredConnectionIds,
    "an allowlist containing only common ChatGPT Web ids must remain non-empty and fail closed"
  );

  const mixedApiKey = db
    .prepare("SELECT is_active, allowed_connections FROM api_keys WHERE id = 'mixed-key'")
    .get() as { is_active: number; allowed_connections: string };
  assert.equal(mixedApiKey.is_active, 1);
  assert.equal(
    mixedApiKey.allowed_connections,
    mixedAllowedConnectionsRaw,
    "the migration must preserve a mixed allowlist byte-for-byte"
  );
  assert.deepEqual(
    JSON.parse(mixedApiKey.allowed_connections),
    mixedConnectionIds,
    "a mixed allowlist must preserve both retired ids and its unrelated connection"
  );

  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, test_status, created_at, updated_at) " +
      "VALUES ('post-migration-cgpt-web', 'chatgpt-web', 'apikey', 'post migration import', " +
      "1, 'active', datetime('now'), datetime('now'))"
  ).run();
  const postMigrationConnection = db
    .prepare(
      "SELECT id, is_active, test_status, error_code, last_error, last_error_type, " +
        "last_error_source, last_error_at, updated_at FROM provider_connections " +
        "WHERE id = 'post-migration-cgpt-web'"
    )
    .get() as ConnectionState;
  assert.equal(postMigrationConnection.is_active, 0);
  assert.equal(postMigrationConnection.test_status, "unavailable");
  assert.equal(postMigrationConnection.error_code, "PROVIDER_REMOVED");
  assert.equal(postMigrationConnection.last_error_type, "provider_removed");
  assert.equal(postMigrationConnection.last_error_source, "migration:retire-chatgpt-web");

  db.prepare(
    "INSERT OR REPLACE INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, test_status, created_at, updated_at) " +
      "VALUES ('post-migration-replace-cgpt-web', '\fCGPT-WEB\r', 'apikey', 'replace import', " +
      "1, 'active', datetime('now'), datetime('now'))"
  ).run();
  const postMigrationReplace = readConnectionById("post-migration-replace-cgpt-web");
  assert.equal(postMigrationReplace.is_active, 0);
  assert.equal(postMigrationReplace.test_status, "unavailable");
  assert.equal(postMigrationReplace.error_code, "PROVIDER_REMOVED");
  assert.equal(postMigrationReplace.last_error_source, "migration:retire-chatgpt-web");

  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, test_status, created_at, updated_at) " +
      "VALUES ('post-migration-cgpt-web-alias', ' CGPT-WEB ', 'apikey', 'post migration alias', " +
      "1, 'active', datetime('now'), datetime('now'))"
  ).run();
  const postMigrationAlias = db
    .prepare(
      "SELECT is_active, test_status, error_code, last_error_source " +
        "FROM provider_connections WHERE id = 'post-migration-cgpt-web-alias'"
    )
    .get() as {
    is_active: number;
    test_status: string;
    error_code: string;
    last_error_source: string;
  };
  assert.deepEqual(postMigrationAlias, {
    is_active: 0,
    test_status: "unavailable",
    error_code: "PROVIDER_REMOVED",
    last_error_source: "migration:retire-chatgpt-web",
  });

  const insertActiveLease = (owner: string, provider: string, connectionId: string) =>
    Number(
      db
        .prepare(
          "INSERT INTO exclusive_connection_leases " +
            "(lease_owner_hash, api_key_id, provider, connection_id, generation, state, " +
            "acquired_at, renewed_at, expires_at) VALUES (?, ?, ?, ?, 1, 'ACTIVE', " +
            "datetime('now'), datetime('now'), datetime('now', '+1 hour'))"
        )
        .run(owner.padEnd(64, "0"), `${owner}-key`, provider, connectionId).lastInsertRowid
    );

  const alreadyTombstonedInsertLeaseId = insertActiveLease(
    "already-tombstoned-cgpt-web-insert",
    "legacy-imported-provider",
    "already-tombstoned-cgpt-web-insert-connection"
  );
  assert.equal(readLease(alreadyTombstonedInsertLeaseId).state, "ACTIVE");
  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, test_status, error_code, last_error, " +
      "last_error_type, last_error_source, last_error_at, created_at, updated_at) " +
      "VALUES ('already-tombstoned-cgpt-web-insert-connection', '\u00a0chatgpt-web\uFEFF', " +
      "'apikey', 'already tombstoned restore', 0, 'unavailable', 'PROVIDER_REMOVED', " +
      "'Provider integration retired from OmniRoute v3.8.51', 'provider_removed', " +
      "'migration:retire-chatgpt-web', '2001-01-01T00:00:00.000Z', datetime('now'), datetime('now'))"
  ).run();
  assert.equal(readLease(alreadyTombstonedInsertLeaseId).state, "INVALIDATED");

  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, created_at, updated_at) " +
      "VALUES ('already-tombstoned-cgpt-web-update-connection', 'legacy-provider', 'apikey', " +
      "'update to retired', 1, datetime('now'), datetime('now'))"
  ).run();
  const alreadyTombstonedUpdateLeaseId = insertActiveLease(
    "already-tombstoned-cgpt-web-update",
    "legacy-imported-provider",
    "already-tombstoned-cgpt-web-update-connection"
  );
  assert.equal(readLease(alreadyTombstonedUpdateLeaseId).state, "ACTIVE");
  db.prepare(
    "UPDATE provider_connections SET provider = '\u2003CGPT-WEB\u2029', is_active = 0, " +
      "test_status = 'unavailable', error_code = 'PROVIDER_REMOVED', " +
      "last_error = 'Provider integration retired from OmniRoute v3.8.51', " +
      "last_error_type = 'provider_removed', last_error_source = 'migration:retire-chatgpt-web', " +
      "last_error_at = '2001-01-01T00:00:00.000Z' " +
      "WHERE id = 'already-tombstoned-cgpt-web-update-connection'"
  ).run();
  assert.equal(readLease(alreadyTombstonedUpdateLeaseId).state, "INVALIDATED");

  const directRetiredLeaseId = insertActiveLease(
    "post-direct-cgpt-web",
    " ChAtGpT-WeB ",
    "direct-retired-cgpt-web-provider-connection"
  );
  assert.equal(readLease(directRetiredLeaseId).state, "INVALIDATED");

  const retiredConnectionLeaseId = insertActiveLease(
    "post-retired-cgpt-web-connection",
    "legacy-imported-provider",
    "post-migration-cgpt-web"
  );
  assert.equal(readLease(retiredConnectionLeaseId).state, "INVALIDATED");

  const restoredBeforeConnectionLeaseId = insertActiveLease(
    "restored-before-cgpt-web-connection",
    "legacy-imported-provider",
    "restored-chatgpt-web-connection"
  );
  assert.equal(readLease(restoredBeforeConnectionLeaseId).state, "ACTIVE");
  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, created_at, updated_at) " +
      "VALUES ('restored-chatgpt-web-connection', 'chatgpt-web', 'apikey', " +
      "'restored after lease', 1, datetime('now'), datetime('now'))"
  ).run();
  assert.equal(readLease(restoredBeforeConnectionLeaseId).state, "INVALIDATED");

  const openCodeLeaseId = insertActiveLease(
    "post-chatgpt-web-codex-control",
    "chatgpt-web-codex",
    "post-chatgpt-web-codex-control-connection"
  );
  assert.deepEqual(readLease(openCodeLeaseId), {
    id: openCodeLeaseId,
    generation: 1,
    state: "ACTIVE",
    ended_at: null,
    end_reason: null,
  });

  db.prepare(
    "UPDATE provider_connections SET provider = ' CgPt-WeB ', is_active = 1, test_status = 'active', " +
      "error_code = NULL, last_error = NULL, last_error_type = NULL, " +
      "last_error_source = NULL, last_error_at = NULL WHERE provider = 'cgpt-web'"
  ).run();
  const updateProtectedConnection = readConnectionById("cgpt-web-connection");
  assert.equal(updateProtectedConnection.is_active, 0);
  assert.equal(updateProtectedConnection.test_status, "unavailable");
  assert.equal(updateProtectedConnection.error_code, "PROVIDER_REMOVED");
  assert.equal(updateProtectedConnection.last_error_type, "provider_removed");
  assert.equal(updateProtectedConnection.last_error_source, "migration:retire-chatgpt-web");

  assert.throws(
    () =>
      db
        .prepare(
          "UPDATE provider_connections SET provider = 'openai', is_active = 1, " +
            "test_status = 'active', error_code = NULL WHERE id = 'chatgpt-web-connection'"
        )
        .run(),
    /retired provider connection identity cannot be changed/i
  );
  const updateIdentityControl = db
    .prepare("SELECT provider, is_active, error_code FROM provider_connections WHERE id = ?")
    .get("chatgpt-web-connection") as {
    provider: string;
    is_active: number;
    error_code: string;
  };
  assert.deepEqual(updateIdentityControl, {
    provider: "chatgpt-web",
    is_active: 0,
    error_code: "PROVIDER_REMOVED",
  });

  assert.throws(
    () =>
      db
        .prepare(
          "INSERT OR REPLACE INTO provider_connections " +
            "(id, provider, auth_type, name, is_active, test_status, created_at, updated_at) " +
            "VALUES ('cgpt-web-connection', 'openai', 'apikey', 'identity replacement', 1, " +
            "'active', datetime('now'), datetime('now'))"
        )
        .run(),
    /retired provider connection identity cannot be changed/i
  );
  const replaceIdentityControl = db
    .prepare("SELECT provider, is_active, error_code FROM provider_connections WHERE id = ?")
    .get("cgpt-web-connection") as {
    provider: string;
    is_active: number;
    error_code: string;
  };
  assert.deepEqual(replaceIdentityControl, {
    provider: " CgPt-WeB ",
    is_active: 0,
    error_code: "PROVIDER_REMOVED",
  });

  db.prepare(
    "UPDATE provider_connections SET name = 'renamed' WHERE id = 'cgpt-web-connection'"
  ).run();
  const unrelatedUpdate = readConnectionById("cgpt-web-connection");
  assert.equal(unrelatedUpdate.last_error_at, updateProtectedConnection.last_error_at);
  assert.equal(unrelatedUpdate.updated_at, updateProtectedConnection.updated_at);
});
