// A key can hold one token limit per (scope, reset interval). Regression for the operator
// report "adding a token limit replaces the previous record": the old UNIQUE
// (api_key_id, scope_type, scope_value) made a weekly global limit overwrite the daily one.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-limits-window-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const tokenLimits = await import("../../src/lib/db/tokenLimits.ts");
const counter = await import("../../open-sse/services/tokenLimitCounter.ts");
const route = await import("../../src/app/api/usage/token-limits/route.ts");

const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  counter.clearTokenLimitCache();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function postLimit(body: Record<string, unknown>) {
  return route.POST(
    new Request("http://localhost/api/usage/token-limits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

test("daily and weekly global limits for one key both persist", () => {
  const daily = tokenLimits.upsertTokenLimit({
    apiKeyId: "k1",
    scopeType: "global",
    tokenLimit: 1000,
    resetInterval: "daily",
  });
  const weekly = tokenLimits.upsertTokenLimit({
    apiKeyId: "k1",
    scopeType: "global",
    tokenLimit: 5000,
    resetInterval: "weekly",
  });

  const rows = tokenLimits.listTokenLimits("k1");
  assert.equal(rows.length, 2);
  assert.notEqual(daily.id, weekly.id);
  assert.deepEqual(rows.map((r) => [r.resetInterval, r.tokenLimit]).sort(), [
    ["daily", 1000],
    ["weekly", 5000],
  ]);
});

test("re-posting the same scope and window updates that row in place", () => {
  const first = tokenLimits.upsertTokenLimit({
    apiKeyId: "k2",
    scopeType: "provider",
    scopeValue: "claude",
    tokenLimit: 100,
    resetInterval: "daily",
  });
  const second = tokenLimits.upsertTokenLimit({
    apiKeyId: "k2",
    scopeType: "provider",
    scopeValue: "claude",
    tokenLimit: 250,
    resetInterval: "daily",
  });

  assert.equal(second.id, first.id);
  assert.equal(second.tokenLimit, 250);
  assert.equal(tokenLimits.listTokenLimits("k2").length, 1);
});

test("updating by id can change the window and leaves other rows alone", () => {
  const daily = tokenLimits.upsertTokenLimit({
    apiKeyId: "k3",
    scopeType: "global",
    tokenLimit: 100,
    resetInterval: "daily",
  });
  const model = tokenLimits.upsertTokenLimit({
    apiKeyId: "k3",
    scopeType: "model",
    scopeValue: "gpt-4o",
    tokenLimit: 50,
    resetInterval: "daily",
  });

  const updated = tokenLimits.upsertTokenLimit({
    id: daily.id,
    apiKeyId: "k3",
    scopeType: "global",
    tokenLimit: 700,
    resetInterval: "monthly",
  });

  assert.equal(updated.id, daily.id);
  assert.equal(updated.resetInterval, "monthly");
  assert.equal(updated.tokenLimit, 700);
  const untouched = tokenLimits.listTokenLimits("k3").find((r) => r.id === model.id);
  assert.equal(untouched?.tokenLimit, 50);
});

test("both windows are enforced: the daily limit breaches before the weekly one", () => {
  const daily = tokenLimits.upsertTokenLimit({
    apiKeyId: "k4",
    scopeType: "global",
    tokenLimit: 100,
    resetInterval: "daily",
  });
  tokenLimits.upsertTokenLimit({
    apiKeyId: "k4",
    scopeType: "global",
    tokenLimit: 10_000,
    resetInterval: "weekly",
  });
  const ws = tokenLimits.resetWindowIfElapsed(daily, NOW).windowStart;
  tokenLimits.incrementWindowTokens(daily.id, ws, 150);

  const breach = counter.checkTokenLimits("k4", "openai", "gpt-4o", NOW);
  assert.ok(breach);
  assert.equal(breach!.limitValue, 100);
});

test("route: an update by id that collides with another window returns 409 without a stack", async () => {
  const daily = tokenLimits.upsertTokenLimit({
    apiKeyId: "k5",
    scopeType: "global",
    tokenLimit: 100,
    resetInterval: "daily",
  });
  tokenLimits.upsertTokenLimit({
    apiKeyId: "k5",
    scopeType: "global",
    tokenLimit: 500,
    resetInterval: "weekly",
  });

  const res = await postLimit({
    id: daily.id,
    apiKeyId: "k5",
    scopeType: "global",
    tokenLimit: 100,
    resetInterval: "weekly",
  });

  assert.equal(res.status, 409);
  const body = (await res.json()) as { error: { message: string } };
  assert.match(body.error.message, /already has a weekly global token limit/);
  assert.ok(!body.error.message.includes("at /"));
  assert.equal(tokenLimits.listTokenLimits("k5").length, 2);
});

test("route: updating an unknown id returns 404", async () => {
  const res = await postLimit({
    id: "does-not-exist",
    apiKeyId: "k6",
    scopeType: "global",
    tokenLimit: 100,
    resetInterval: "daily",
  });
  assert.equal(res.status, 404);
});

test("migration 196 keeps existing rows, ids and counters, then allows a second window", async () => {
  const { default: Database } = await import("better-sqlite3");
  const dir = path.join(process.cwd(), "src/lib/db/migrations");
  const db = new Database(":memory:");
  try {
    // 073 also indexes usage_history; a stub is enough for this schema test.
    db.exec(
      "CREATE TABLE usage_history (api_key_id TEXT, provider TEXT, model TEXT, timestamp TEXT)"
    );
    db.exec(fs.readFileSync(path.join(dir, "073_per_model_token_limits.sql"), "utf8"));
    db.prepare(
      `INSERT INTO api_key_token_limits (id, api_key_id, scope_type, scope_value, token_limit, reset_interval)
       VALUES ('lim-daily', 'k7', 'global', '', 100, 'daily')`
    ).run();
    db.prepare(
      "INSERT INTO api_key_token_counters (limit_id, window_start, tokens_used) VALUES ('lim-daily', 'w1', 42)"
    ).run();
    db.prepare(
      "INSERT INTO api_key_token_limit_reset_logs (limit_id, prev_tokens, window_start) VALUES ('lim-daily', 7, 'w0')"
    ).run();
    // Production runs better-sqlite3 with foreign keys ON: DROP TABLE would cascade.
    assert.equal(db.pragma("foreign_keys", { simple: true }), 1);

    // The runner applies each file inside one transaction.
    db.exec("BEGIN");
    db.exec(fs.readFileSync(path.join(dir, "196_token_limits_unique_per_window.sql"), "utf8"));
    db.exec("COMMIT");

    const rows = db.prepare("SELECT id, token_limit FROM api_key_token_limits").all();
    assert.deepEqual(rows, [{ id: "lim-daily", token_limit: 100 }]);
    const counters = db.prepare("SELECT limit_id, tokens_used FROM api_key_token_counters").all();
    assert.deepEqual(counters, [{ limit_id: "lim-daily", tokens_used: 42 }]);
    const counterSchema = db
      .prepare("SELECT sql FROM sqlite_master WHERE name = 'api_key_token_counters'")
      .get() as { sql: string };
    assert.match(counterSchema.sql, /REFERENCES api_key_token_limits \(id\)/);
    const logs = db
      .prepare("SELECT limit_id, prev_tokens FROM api_key_token_limit_reset_logs")
      .all();
    assert.deepEqual(logs, [{ limit_id: "lim-daily", prev_tokens: 7 }]);

    db.prepare(
      `INSERT INTO api_key_token_limits (id, api_key_id, scope_type, scope_value, token_limit, reset_interval)
       VALUES ('lim-weekly', 'k7', 'global', '', 500, 'weekly')`
    ).run();
    assert.equal(
      (db.prepare("SELECT COUNT(*) AS n FROM api_key_token_limits").get() as { n: number }).n,
      2
    );

    db.exec(fs.readFileSync(path.join(dir, "196_token_limits_unique_per_window.sql"), "utf8"));
    assert.equal(
      (db.prepare("SELECT COUNT(*) AS n FROM api_key_token_limits").get() as { n: number }).n,
      2,
      "re-running the migration keeps both rows"
    );
  } finally {
    db.close();
  }
});
