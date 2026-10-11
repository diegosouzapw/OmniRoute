import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-free-retirement-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 206 removes stale OpenCode Free provider state, keeps opencode-zen, and is idempotent", () => {
  const db = core.getDbInstance();

  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = 206")
    .get() as { version: number } | undefined;

  assert.ok(applied, "migration 206 must be recorded as applied");

  for (const provider of ["opencode", "oc"]) {
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, is_active, created_at, updated_at) " +
        "VALUES (?, ?, ?, ?, 1, datetime('now'), datetime('now'))"
    ).run(`${provider}-connection`, provider, "apikey", `${provider}-legacy`);

    db.prepare(
      "INSERT INTO registered_keys " +
        "(id, key, key_prefix, name, provider, account_id) " +
        "VALUES (?, ?, ?, ?, ?, ?)"
    ).run(
      `${provider}-key-id`,
      `${provider}-key-hash`,
      `${provider.slice(0, 8)}`,
      `${provider}-key`,
      provider,
      `${provider}-account`
    );

    db.prepare("INSERT INTO provider_key_limits (provider) VALUES (?)").run(provider);

    db.prepare(
      "INSERT INTO discovery_results " +
        "(provider_id, method, endpoint, auth_type) " +
        "VALUES (?, 'public_api', ?, 'api_key')"
    ).run(provider, `https://${provider}.example.invalid/v1`);

    db.prepare(
      "INSERT INTO key_value (namespace, key, value) " + "VALUES ('customModels', ?, '[]')"
    ).run(provider);

    for (const namespace of ["modelCompatOverrides", "providerAliases"]) {
      db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, '{}')").run(
        namespace,
        provider
      );
    }

    db.prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, '[]')"
    ).run(`${provider}:conn-1`);

    db.prepare(
      "INSERT INTO usage_history (provider, model, timestamp) " +
        "VALUES (?, 'legacy-model', datetime('now'))"
    ).run(provider);

    db.prepare(
      "INSERT INTO call_logs (id, timestamp, provider, model, status) " +
        "VALUES (?, datetime('now'), ?, 'legacy-model', 200)"
    ).run(`${provider}-historical-call`, provider);
  }

  db.prepare(
    "INSERT INTO provider_connections " +
      "(id, provider, auth_type, name, is_active, created_at, updated_at) " +
      "VALUES ('opencode-zen-control', 'opencode-zen', 'apikey', 'control', 1, datetime('now'), datetime('now'))"
  ).run();

  db.prepare(
    "INSERT INTO registered_keys " +
      "(id, key, key_prefix, name, provider, account_id) " +
      "VALUES ('opencode-zen-key-id', 'opencode-zen-key-hash', 'opencode-', 'control', 'opencode-zen', 'control-account')"
  ).run();

  db.prepare("INSERT INTO provider_key_limits (provider) VALUES ('opencode-zen')").run();

  db.prepare(
    "INSERT INTO discovery_results " +
      "(provider_id, method, endpoint, auth_type) " +
      "VALUES ('opencode-zen', 'public_api', 'https://opencode-zen.example.invalid/v1', 'api_key')"
  ).run();

  db.prepare(
    "INSERT INTO key_value (namespace, key, value) " +
      "VALUES ('customModels', 'opencode-zen', '[]')"
  ).run();

  db.prepare(
    "INSERT INTO key_value (namespace, key, value) " +
      "VALUES ('modelCompatOverrides', 'opencode-zen', '{}')"
  ).run();

  const sql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/206_remove_opencode_free_provider.sql"),
    "utf8"
  );

  db.exec(sql);
  db.exec(sql);

  for (const provider of ["opencode", "oc"]) {
    assert.equal(
      db.prepare("SELECT id FROM provider_connections WHERE provider = ?").get(provider),
      undefined,
      `${provider} provider_connections rows must be deleted`
    );

    assert.equal(
      db.prepare("SELECT id FROM registered_keys WHERE provider = ?").get(provider),
      undefined,
      `${provider} registered_keys rows must be deleted`
    );

    assert.equal(
      db.prepare("SELECT provider FROM provider_key_limits WHERE provider = ?").get(provider),
      undefined,
      `${provider} provider_key_limits rows must be deleted`
    );

    assert.equal(
      db.prepare("SELECT id FROM discovery_results WHERE provider_id = ?").get(provider),
      undefined,
      `${provider} discovery_results rows must be deleted`
    );

    assert.equal(
      db
        .prepare("SELECT key FROM key_value WHERE namespace = 'customModels' AND key = ?")
        .get(provider),
      undefined,
      `${provider} custom models must be deleted`
    );

    for (const namespace of ["modelCompatOverrides", "providerAliases"]) {
      assert.equal(
        db
          .prepare("SELECT key FROM key_value WHERE namespace = ? AND key = ?")
          .get(namespace, provider),
        undefined,
        `${provider} ${namespace} rows must be deleted so they cannot leak onto opencode-zen`
      );
    }

    assert.equal(
      db
        .prepare("SELECT key FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
        .get(`${provider}:conn-1`),
      undefined,
      `${provider} synced model rows must be deleted`
    );

    assert.ok(
      db.prepare("SELECT id FROM usage_history WHERE provider = ?").get(provider),
      `${provider} historical usage must be preserved`
    );

    assert.ok(
      db.prepare("SELECT id FROM call_logs WHERE provider = ?").get(provider),
      `${provider} historical call logs must be preserved`
    );
  }

  assert.ok(
    db.prepare("SELECT id FROM provider_connections WHERE provider = 'opencode-zen'").get()
  );

  assert.ok(db.prepare("SELECT id FROM registered_keys WHERE provider = 'opencode-zen'").get());

  assert.ok(
    db.prepare("SELECT provider FROM provider_key_limits WHERE provider = 'opencode-zen'").get()
  );

  assert.ok(
    db.prepare("SELECT id FROM discovery_results WHERE provider_id = 'opencode-zen'").get()
  );

  assert.ok(
    db
      .prepare(
        "SELECT key FROM key_value WHERE namespace = 'customModels' AND key = 'opencode-zen'"
      )
      .get()
  );

  assert.ok(
    db
      .prepare(
        "SELECT key FROM key_value WHERE namespace = 'modelCompatOverrides' AND key = 'opencode-zen'"
      )
      .get()
  );
});
