import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mimocode-retirement-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 159 removes stale MiMoCode provider state and is idempotent", () => {
  const db = core.getDbInstance();

  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = 159")
    .get() as { version: number } | undefined;

  assert.ok(applied, "migration 159 must be recorded as applied");

  for (const provider of ["mimocode", "mcode"]) {
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
      "VALUES ('openai-control', 'openai', 'apikey', 'control', 1, datetime('now'), datetime('now'))"
  ).run();

  db.prepare(
    "INSERT INTO registered_keys " +
      "(id, key, key_prefix, name, provider, account_id) " +
      "VALUES ('openai-key-id', 'openai-key-hash', 'openai', 'control', 'openai', 'control-account')"
  ).run();

  db.prepare("INSERT INTO provider_key_limits (provider) VALUES ('openai')").run();

  db.prepare(
    "INSERT INTO discovery_results " +
      "(provider_id, method, endpoint, auth_type) " +
      "VALUES ('openai', 'public_api', 'https://openai.example.invalid/v1', 'api_key')"
  ).run();

  db.prepare(
    "INSERT INTO key_value (namespace, key, value) " + "VALUES ('customModels', 'openai', '[]')"
  ).run();

  const sql = fs.readFileSync(
    path.join(process.cwd(), "src/lib/db/migrations/159_remove_mimocode_provider.sql"),
    "utf8"
  );

  db.exec(sql);
  db.exec(sql);

  for (const provider of ["mimocode", "mcode"]) {
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

    assert.ok(
      db.prepare("SELECT id FROM usage_history WHERE provider = ?").get(provider),
      `${provider} historical usage must be preserved`
    );

    assert.ok(
      db.prepare("SELECT id FROM call_logs WHERE provider = ?").get(provider),
      `${provider} historical call logs must be preserved`
    );
  }

  assert.ok(db.prepare("SELECT id FROM provider_connections WHERE provider = 'openai'").get());

  assert.ok(db.prepare("SELECT id FROM registered_keys WHERE provider = 'openai'").get());

  assert.ok(db.prepare("SELECT provider FROM provider_key_limits WHERE provider = 'openai'").get());

  assert.ok(db.prepare("SELECT id FROM discovery_results WHERE provider_id = 'openai'").get());

  assert.ok(
    db
      .prepare("SELECT key FROM key_value WHERE namespace = 'customModels' AND key = 'openai'")
      .get()
  );
});
