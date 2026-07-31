import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-retired-provider-purge-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_SKIP_DB_HEALTHCHECK = "1";

const core = await import("../../src/lib/db/core.ts");
const purge = await import("../../src/lib/db/retiredProviderPurge.ts");

const db = core.getDbInstance();
const NOW = "2026-07-31T00:00:00.000Z";

function count(table: string): number {
  return Number(
    (db.prepare(`SELECT COUNT(*) AS count FROM "${table}"`).get() as { count: number }).count
  );
}

function seedFixture() {
  db.prepare(
    `INSERT INTO provider_connections (id, provider, name, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)`
  ).run(
    "conn-ghm",
    "github-models",
    "Retired GitHub Models",
    NOW,
    NOW,
    "conn-github",
    "github",
    "Copilot",
    NOW,
    NOW
  );

  db.prepare(
    `INSERT INTO provider_nodes (id, type, name, prefix, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)`
  ).run(
    "node-ghm",
    "custom",
    "Retired node",
    "ghm",
    NOW,
    NOW,
    "node-live",
    "custom",
    "Live node",
    "live",
    NOW,
    NOW
  );

  db.prepare(
    `INSERT INTO quota_pools (id, connection_id, name, created_at)
     VALUES (?, ?, ?, ?), (?, ?, ?, ?)`
  ).run("pool-mixed", "conn-ghm", "mixed", NOW, "pool-retired", "conn-ghm", "retired", NOW);
  db.prepare(
    `INSERT INTO quota_pool_connections (pool_id, connection_id) VALUES
      (?, ?), (?, ?), (?, ?), (?, ?)`
  ).run(
    "pool-mixed",
    "conn-ghm",
    "pool-mixed",
    "conn-github",
    "pool-retired",
    "conn-ghm",
    "pool-retired",
    "conn-missing"
  );
  db.prepare(
    `INSERT INTO quota_allocations (pool_id, api_key_id, weight, policy)
     VALUES (?, ?, ?, ?), (?, ?, ?, ?)`
  ).run("pool-mixed", "key-1", 50, "hard", "pool-retired", "key-1", 100, "hard");
  db.prepare(
    `INSERT INTO quota_allocation_model_caps
      (pool_id, api_key_id, model, cap_value, cap_unit)
     VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)`
  ).run(
    "pool-mixed",
    "key-1",
    "gpt-4o-mini",
    100,
    "requests",
    "pool-mixed",
    "key-1",
    "ghm/alpha",
    50,
    "requests",
    "pool-retired",
    "key-1",
    "ghm/alpha",
    100,
    "requests"
  );

  db.prepare(
    `INSERT INTO api_keys (id, name, key, allowed_models, created_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run(
    "key-1",
    "fixture",
    "sk-retired-purge-fixture",
    JSON.stringify(["ghm/alpha", "gpt-4o-mini"]),
    NOW
  );

  db.prepare(
    `INSERT INTO relay_tokens
      (id, name, token_hash, token_prefix, allowed_models, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "relay-mixed",
    "mixed relay",
    "hash-retired-purge-fixture",
    "rl_test",
    JSON.stringify(["ghm/alpha", "gpt-4o-mini"]),
    1,
    1
  );
  db.prepare(
    `INSERT INTO relay_rate_limits (token_id, window_start, request_count, cost)
     VALUES (?, ?, ?, ?)`
  ).run("relay-mixed", 1, 7, 0.5);

  db.prepare(
    `INSERT INTO api_key_token_limits
      (id, api_key_id, scope_type, scope_value, token_limit)
     VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)`
  ).run(
    "limit-ghm",
    "key-1",
    "provider",
    "github-models",
    1000,
    "limit-live",
    "key-1",
    "model",
    "gpt-4o-mini",
    1000
  );
  db.prepare(
    `INSERT INTO api_key_token_counters (limit_id, window_start, tokens_used)
     VALUES (?, ?, ?)`
  ).run("limit-ghm", NOW, 20);

  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, timestamp)
     VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`
  ).run(
    "github-models",
    "ghm/alpha",
    "conn-ghm",
    NOW,
    "github",
    "gpt-4o-mini",
    "conn-github",
    NOW,
    "github",
    "text-embedding-3-small",
    "conn-github",
    NOW
  );

  db.prepare(
    `INSERT INTO combos (id, name, data, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)`
  ).run(
    "combo-mixed",
    "mixed-combo",
    JSON.stringify({
      models: [
        { providerId: "github-models", model: "gpt-4o" },
        { provider: "github", model: "gpt-4o-mini" },
      ],
    }),
    NOW,
    NOW,
    "combo-retired",
    "retired-combo",
    JSON.stringify({ models: [{ providerId: "github-models", model: "ghm/alpha" }] }),
    NOW,
    NOW
  );

  db.prepare(
    `INSERT INTO key_value (namespace, key, value) VALUES
      (?, ?, ?), (?, ?, ?), (?, ?, ?)`
  ).run(
    "customModels",
    "github",
    JSON.stringify({ "text-embedding-3-small": { context: 1 }, "gpt-4o-mini": { context: 2 } }),
    "customModels",
    "github-models",
    JSON.stringify({ "ghm/alpha": { context: 1 } }),
    "syncedAvailableModels",
    "github-models:conn-ghm",
    JSON.stringify(["ghm/alpha"])
  );

  const artifactRelPath = "2026-07-31/retired-call.json";
  const artifactPath = path.join(TEST_DATA_DIR, "call_logs", artifactRelPath);
  fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
  fs.writeFileSync(artifactPath, "retired artifact", "utf8");
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, model, requested_model, provider, connection_id, artifact_relpath)
     VALUES (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "call-retired",
    NOW,
    "ghm/alpha",
    "ghm/alpha",
    "github-models",
    "conn-ghm",
    artifactRelPath,
    "call-live",
    NOW,
    "gpt-4o-mini",
    "gpt-4o-mini",
    "github",
    "conn-github",
    null,
    "call-embedding",
    NOW,
    "text-embedding-3-small",
    "text-embedding-3-small",
    "github",
    "conn-github",
    null
  );
  db.prepare(
    `INSERT INTO request_detail_logs
      (id, call_log_id, timestamp, client_request, provider, model)
     VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)`
  ).run(
    "detail-linked",
    "call-retired",
    NOW,
    JSON.stringify({ userText: "ghm/alpha" }),
    null,
    null,
    "detail-orphan",
    null,
    NOW,
    JSON.stringify({ userText: "ghm/alpha" }),
    "github-models",
    "ghm/alpha",
    "detail-live-text",
    null,
    NOW,
    JSON.stringify({ userText: "ghm/alpha" }),
    "github",
    "gpt-4o-mini"
  );

  // This is an arbitrary user payload and must remain byte-for-byte intact on
  // a live row; the purge must not recursively rewrite free-form JSON.
  db.prepare(`INSERT INTO a2a_tasks (id, input_json, output_json) VALUES (?, ?, ?)`).run(
    "a2a-live",
    JSON.stringify({ prompt: "ghm/alpha" }),
    JSON.stringify({ text: "ghm/alpha" })
  );

  db.prepare(
    `UPDATE retired_provider_purge_queue
     SET status = 'pending', attempts = 0, last_error = NULL,
         completed_at = NULL, updated_at = datetime('now')
     WHERE provider_id = ? AND model_prefix = ?`
  ).run(purge.RETIRED_PROVIDER_ID, purge.RETIRED_MODEL_PREFIX);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("purges retired GitHub Models data while preserving Copilot and mixed state", () => {
  seedFixture();
  const artifactPath = path.join(TEST_DATA_DIR, "call_logs", "2026-07-31/retired-call.json");
  const result = purge.runRetiredProviderPurge(db);

  assert.equal(result.length, 1);
  assert.equal(result[0].status, "completed");
  assert.equal(result[0].deletedArtifacts, 1);
  assert.equal(fs.existsSync(artifactPath), false);

  assert.deepEqual(db.prepare("SELECT id, provider FROM provider_connections ORDER BY id").all(), [
    { id: "conn-github", provider: "github" },
  ]);
  assert.equal(count("provider_nodes"), 1);
  assert.equal(
    (db.prepare("SELECT prefix FROM provider_nodes").get() as { prefix: string }).prefix,
    "live"
  );
  assert.deepEqual(db.prepare("SELECT provider, model FROM usage_history ORDER BY id").all(), [
    { provider: "github", model: "gpt-4o-mini" },
  ]);
  assert.deepEqual(db.prepare("SELECT provider, model FROM call_logs").all(), [
    { provider: "github", model: "gpt-4o-mini" },
  ]);
  assert.equal(count("request_detail_logs"), 1);
  assert.equal(
    (
      db.prepare("SELECT client_request FROM request_detail_logs").get() as {
        client_request: string;
      }
    ).client_request,
    JSON.stringify({ userText: "ghm/alpha" })
  );
  assert.equal(count("api_key_token_limits"), 1);
  assert.equal(count("api_key_token_counters"), 0);

  const mixedPool = db
    .prepare("SELECT connection_id FROM quota_pools WHERE id = 'pool-mixed'")
    .get() as { connection_id: string };
  assert.equal(mixedPool.connection_id, "conn-github");
  assert.deepEqual(
    db
      .prepare(
        "SELECT connection_id FROM quota_pool_connections WHERE pool_id = 'pool-mixed' ORDER BY connection_id"
      )
      .all(),
    [{ connection_id: "conn-github" }]
  );
  assert.equal(count("quota_allocations"), 1);
  assert.equal(count("quota_allocation_model_caps"), 1);
  assert.equal(count("quota_pools"), 1);
  assert.deepEqual(
    JSON.parse(
      (
        db.prepare("SELECT allowed_models FROM relay_tokens WHERE id = 'relay-mixed'").get() as {
          allowed_models: string;
        }
      ).allowed_models
    ),
    ["gpt-4o-mini"]
  );
  assert.equal(count("relay_rate_limits"), 1);

  const mixedCombo = db.prepare("SELECT data FROM combos WHERE id = 'combo-mixed'").get() as {
    data: string;
  };
  assert.deepEqual(JSON.parse(mixedCombo.data).models, [
    { provider: "github", model: "gpt-4o-mini" },
  ]);
  assert.equal(count("combos"), 1);
  assert.deepEqual(
    JSON.parse(
      (
        db
          .prepare(
            "SELECT value FROM key_value WHERE namespace = 'customModels' AND key = 'github'"
          )
          .get() as { value: string }
      ).value
    ),
    { "gpt-4o-mini": { context: 2 } }
  );
  assert.deepEqual(
    JSON.parse(
      (
        db.prepare("SELECT allowed_models FROM api_keys WHERE id = 'key-1'").get() as {
          allowed_models: string;
        }
      ).allowed_models
    ),
    ["gpt-4o-mini"]
  );
  assert.equal(count("retired_provider_purge_artifacts"), 0);

  const a2aPayload = db
    .prepare("SELECT input_json, output_json FROM a2a_tasks WHERE id = 'a2a-live'")
    .get() as { input_json: string; output_json: string };
  assert.equal(a2aPayload.input_json, JSON.stringify({ prompt: "ghm/alpha" }));
  assert.equal(a2aPayload.output_json, JSON.stringify({ text: "ghm/alpha" }));

  // A second invocation is a no-op once the durable queue marker is complete.
  assert.deepEqual(purge.runRetiredProviderPurge(db), []);
  assert.equal(purge.purgeRetiredProviderData(db).status, "completed");
});

test("resumes pending artifact rows and removes queue children without traversal", () => {
  const safeRelPath = "2026-07-31/retry-call.json";
  const safePath = path.join(TEST_DATA_DIR, "call_logs", safeRelPath);
  const outsidePath = path.join(TEST_DATA_DIR, "outside-retired.txt");
  fs.mkdirSync(path.dirname(safePath), { recursive: true });
  fs.writeFileSync(safePath, "retry artifact", "utf8");
  fs.writeFileSync(outsidePath, "must survive", "utf8");
  db.prepare(
    `INSERT INTO retired_provider_purge_artifacts
      (provider_id, model_prefix, artifact_relpath, status) VALUES (?, ?, ?, 'pending'), (?, ?, ?, 'pending')`
  ).run(
    purge.RETIRED_PROVIDER_ID,
    purge.RETIRED_MODEL_PREFIX,
    safeRelPath,
    purge.RETIRED_PROVIDER_ID,
    purge.RETIRED_MODEL_PREFIX,
    "../outside-retired.txt"
  );
  db.prepare(
    `UPDATE retired_provider_purge_queue SET status = 'artifacts_pending', completed_at = NULL
     WHERE provider_id = ? AND model_prefix = ?`
  ).run(purge.RETIRED_PROVIDER_ID, purge.RETIRED_MODEL_PREFIX);

  const result = purge.purgeRetiredProviderData(db);
  assert.equal(result.status, "completed");
  assert.equal(result.deletedArtifacts, 1);
  assert.equal(fs.existsSync(safePath), false);
  assert.equal(fs.readFileSync(outsidePath, "utf8"), "must survive");
  assert.equal(count("retired_provider_purge_artifacts"), 0);
});
