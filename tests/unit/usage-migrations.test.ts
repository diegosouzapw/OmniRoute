import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_HOME = process.env.HOME;
const ORIGINAL_USERPROFILE = process.env.USERPROFILE;
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_NEXT_PHASE = process.env.NEXT_PHASE;

const TEST_HOME_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-migrations-home-"));
const TEST_DATA_DIR = path.join(TEST_HOME_DIR, "data");

process.env.HOME = TEST_HOME_DIR;
process.env.USERPROFILE = TEST_HOME_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.NEXT_PHASE;

const migrations = await import("../../src/lib/usage/migrations.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");

const LEGACY_DATA_DIR = path.join(TEST_HOME_DIR, ".omniroute");
const LEGACY_USAGE_JSON_FILE = path.join(LEGACY_DATA_DIR, "usage.json");
const LEGACY_CALL_LOGS_JSON_FILE = path.join(LEGACY_DATA_DIR, "call_logs.json");
const USAGE_JSON_FILE = path.join(TEST_DATA_DIR, "usage.json");
const CALL_LOGS_JSON_FILE = path.join(TEST_DATA_DIR, "call_logs.json");
const CURRENT_REQUEST_LOGS_DIR = path.join(TEST_DATA_DIR, "logs");
const CURRENT_REQUEST_SUMMARY_FILE = path.join(TEST_DATA_DIR, "log.txt");
const MARKER_PATH = migrations.LOG_ARCHIVES_DIR
  ? path.join(migrations.LOG_ARCHIVES_DIR, "legacy-request-logs.json")
  : null;

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function removePath(targetPath) {
  if (!targetPath) return;
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function resetDbTables() {
  const db = getDbInstance();
  db.prepare("DELETE FROM usage_history").run();
  db.prepare("DELETE FROM call_logs").run();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function seedLegacyRequestTargets() {
  fs.mkdirSync(CURRENT_REQUEST_LOGS_DIR, { recursive: true });
  fs.writeFileSync(path.join(CURRENT_REQUEST_LOGS_DIR, "placeholder.txt"), "legacy");
  fs.writeFileSync(CURRENT_REQUEST_SUMMARY_FILE, "legacy summary\n");
}

test.beforeEach(() => {
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  removePath(LEGACY_DATA_DIR);
  removePath(USAGE_JSON_FILE);
  removePath(`${USAGE_JSON_FILE}.migrated`);
  removePath(CALL_LOGS_JSON_FILE);
  removePath(`${CALL_LOGS_JSON_FILE}.migrated`);
  removePath(CURRENT_REQUEST_LOGS_DIR);
  removePath(CURRENT_REQUEST_SUMMARY_FILE);
  removePath(migrations.CALL_LOGS_DIR);
  removePath(migrations.LOG_ARCHIVES_DIR);
  resetDbTables();
});

test.after(() => {
  try {
    const db = getDbInstance();
    if (db?.open) db.close();
  } catch {
    // Database may already be closed.
  }

  if (ORIGINAL_HOME === undefined) {
    delete process.env.HOME;
  } else {
    process.env.HOME = ORIGINAL_HOME;
  }

  if (ORIGINAL_USERPROFILE === undefined) {
    delete process.env.USERPROFILE;
  } else {
    process.env.USERPROFILE = ORIGINAL_USERPROFILE;
  }

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_NEXT_PHASE === undefined) {
    delete process.env.NEXT_PHASE;
  } else {
    process.env.NEXT_PHASE = ORIGINAL_NEXT_PHASE;
  }

  removePath(TEST_HOME_DIR);
});

test("archiveLegacyRequestLogs returns null when there are no targets or the marker already exists", async () => {
  assert.equal(await migrations.archiveLegacyRequestLogs(), null);

  seedLegacyRequestTargets();
  assert.ok(MARKER_PATH, "marker path should exist in local test mode");
  fs.mkdirSync(path.dirname(MARKER_PATH), { recursive: true });
  fs.writeFileSync(MARKER_PATH, JSON.stringify({ archiveFilename: "done.zip" }, null, 2));

  assert.equal(await migrations.archiveLegacyRequestLogs(), null);
  assert.equal(fs.existsSync(CURRENT_REQUEST_LOGS_DIR), true);
  assert.equal(fs.existsSync(CURRENT_REQUEST_SUMMARY_FILE), true);
});

test("migrateLegacyUsageFiles copies legacy JSON files once and does not overwrite existing targets", () => {
  writeJson(LEGACY_USAGE_JSON_FILE, { history: [{ provider: "legacy-openai" }] });
  writeJson(LEGACY_CALL_LOGS_JSON_FILE, { logs: [{ id: "legacy-call" }] });

  migrations.migrateLegacyUsageFiles();

  assert.deepEqual(readJson(USAGE_JSON_FILE), { history: [{ provider: "legacy-openai" }] });
  assert.deepEqual(readJson(CALL_LOGS_JSON_FILE), { logs: [{ id: "legacy-call" }] });

  writeJson(USAGE_JSON_FILE, { history: [{ provider: "current-openai" }] });
  writeJson(CALL_LOGS_JSON_FILE, { logs: [{ id: "current-call" }] });
  writeJson(LEGACY_USAGE_JSON_FILE, { history: [{ provider: "legacy-should-not-win" }] });
  writeJson(LEGACY_CALL_LOGS_JSON_FILE, { logs: [{ id: "legacy-should-not-win" }] });

  migrations.migrateLegacyUsageFiles();

  assert.deepEqual(readJson(USAGE_JSON_FILE), { history: [{ provider: "current-openai" }] });
  assert.deepEqual(readJson(CALL_LOGS_JSON_FILE), { logs: [{ id: "current-call" }] });
});

test("migrateUsageJsonToSqlite migrates usage history aliases and TTFT fallbacks", () => {
  writeJson(USAGE_JSON_FILE, {
    history: [
      {
        provider: "openai",
        model: "gpt-4o-mini",
        connectionId: "conn-openai",
        apiKeyId: "key-1",
        apiKeyName: "Primary Key",
        tokens: {
          prompt_tokens: 11,
          completion_tokens: 7,
          cached_tokens: 2,
          cache_creation_input_tokens: 3,
          reasoning_tokens: 5,
        },
        status: "error",
        success: false,
        latencyMs: "17",
        errorCode: "timeout",
        timestamp: "2026-01-01T00:00:00.000Z",
      },
      {
        provider: "gemini",
        model: "gemini-2.5-flash",
        tokens: {
          input: 9,
          output: 4,
          cacheRead: 1,
          cacheCreation: 2,
          reasoning: 3,
        },
        latencyMs: "99",
        timeToFirstTokenMs: "13",
        timestamp: "2026-01-02T00:00:00.000Z",
      },
    ],
  });

  migrations.migrateUsageJsonToSqlite();

  assert.equal(fs.existsSync(`${USAGE_JSON_FILE}.migrated`), true);

  const db = getDbInstance();
  const rows = db
    .prepare(
      `
        SELECT provider, model, connection_id, api_key_id, api_key_name,
               tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation,
               tokens_reasoning, status, success, latency_ms, ttft_ms, error_code
        FROM usage_history
        ORDER BY timestamp ASC
      `
    )
    .all();

  assert.deepEqual(rows, [
    {
      provider: "openai",
      model: "gpt-4o-mini",
      connection_id: "conn-openai",
      api_key_id: "key-1",
      api_key_name: "Primary Key",
      tokens_input: 11,
      tokens_output: 7,
      tokens_cache_read: 2,
      tokens_cache_creation: 3,
      tokens_reasoning: 5,
      status: "error",
      success: 0,
      latency_ms: 17,
      ttft_ms: 17,
      error_code: "timeout",
    },
    {
      provider: "gemini",
      model: "gemini-2.5-flash",
      connection_id: null,
      api_key_id: null,
      api_key_name: null,
      tokens_input: 9,
      tokens_output: 4,
      tokens_cache_read: 1,
      tokens_cache_creation: 2,
      tokens_reasoning: 3,
      status: null,
      success: 1,
      latency_ms: 99,
      ttft_ms: 13,
      error_code: null,
    },
  ]);
});

test("migrateUsageJsonToSqlite migrates call logs to summary rows and ignores duplicate ids", () => {
  writeJson(CALL_LOGS_JSON_FILE, {
    logs: [
      {
        id: "call-1",
        timestamp: "2026-02-01T00:00:00.000Z",
        method: "GET",
        path: "/v1/chat/completions",
        status: 201,
        model: "gpt-4o-mini",
        provider: "openai",
        account: "acct-a",
        connectionId: "conn-a",
        duration: 31,
        tokens: { in: 12, out: 8 },
        sourceFormat: "openai",
        targetFormat: "openai",
        apiKeyId: "key-a",
        apiKeyName: "Key A",
        comboName: "combo-a",
        requestBody: { messages: [{ role: "user", content: "hi" }] },
        responseBody: { id: "resp-1" },
        error: "bad upstream",
      },
      {
        id: "call-1",
        timestamp: "2026-02-01T01:00:00.000Z",
        method: "PATCH",
        path: "/should-be-ignored",
      },
      {
        timestamp: "2026-02-02T00:00:00.000Z",
        requestBody: { foo: "bar" },
      },
    ],
  });

  migrations.migrateUsageJsonToSqlite();

  assert.equal(fs.existsSync(`${CALL_LOGS_JSON_FILE}.migrated`), true);

  const db = getDbInstance();
  const rows = db
    .prepare(
      `
        SELECT id, method, path, status, provider, account, connection_id,
               detail_state, artifact_relpath, has_request_body, has_response_body, error_summary
        FROM call_logs
        ORDER BY timestamp ASC
      `
    )
    .all();

  assert.equal(rows.length, 2);
  assert.deepEqual(rows[0], {
    id: "call-1",
    method: "GET",
    path: "/v1/chat/completions",
    status: 201,
    provider: "openai",
    account: "acct-a",
    connection_id: "conn-a",
    detail_state: "ready",
    artifact_relpath: (rows[0] as any).artifact_relpath,
    has_request_body: 1,
    has_response_body: 1,
    error_summary: "bad upstream",
  });
  assert.equal(typeof rows[0].artifact_relpath, "string");
  assert.equal((rows[1] as any).id.length > 0, true);
  assert.equal((rows[1] as any).method, "POST");
  assert.equal((rows[1] as any).path, null);
  assert.equal((rows[1] as any).status, 0);
  assert.equal((rows[1] as any).provider, null);
  assert.equal((rows[1] as any).account, null);
  assert.equal((rows[1] as any).connection_id, null);
  assert.equal((rows[1] as any).detail_state, "ready");
  assert.equal((rows[1] as any).has_request_body, 1);
  assert.equal((rows[1] as any).has_response_body, 0);
  assert.equal((rows[1] as any).error_summary, null);

  const firstArtifact = JSON.parse(
    fs.readFileSync(path.join(TEST_DATA_DIR, "call_logs", rows[0].artifact_relpath), "utf8")
  );
  assert.deepEqual(firstArtifact.requestBody, { messages: [{ role: "user", content: "hi" }] });
  assert.deepEqual(firstArtifact.responseBody, { id: "resp-1" });

  const secondArtifact = JSON.parse(
    fs.readFileSync(
      path.join(TEST_DATA_DIR, "call_logs", (rows as any)[1].artifact_relpath),
      "utf8"
    )
  );
  assert.deepEqual(secondArtifact.requestBody, { foo: "bar" });
  assert.equal(secondArtifact.responseBody, null);
});

test("migrateUsageJsonToSqlite renames empty JSON payloads without inserting rows", () => {
  writeJson(USAGE_JSON_FILE, { history: [] });
  writeJson(CALL_LOGS_JSON_FILE, { logs: [] });

  migrations.migrateUsageJsonToSqlite();

  assert.equal(fs.existsSync(`${USAGE_JSON_FILE}.migrated`), true);
  assert.equal(fs.existsSync(`${CALL_LOGS_JSON_FILE}.migrated`), true);

  const db = getDbInstance();
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM usage_history").get() as any).count, 0);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM call_logs").get() as any).count, 0);
});

test("migrateUsageJsonToSqlite leaves malformed JSON files in place and reports both failures", () => {
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  fs.writeFileSync(USAGE_JSON_FILE, "{bad json");
  fs.writeFileSync(CALL_LOGS_JSON_FILE, "{bad json");

  const errors = [];
  const originalConsoleError = console.error;
  console.error = (...args) => {
    errors.push(args.map(String).join(" "));
  };

  try {
    migrations.migrateUsageJsonToSqlite();
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(fs.existsSync(USAGE_JSON_FILE), true);
  assert.equal(fs.existsSync(`${USAGE_JSON_FILE}.migrated`), false);
  assert.equal(fs.existsSync(CALL_LOGS_JSON_FILE), true);
  assert.equal(fs.existsSync(`${CALL_LOGS_JSON_FILE}.migrated`), false);

  const db = getDbInstance();
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM usage_history").get() as any).count, 0);
  assert.equal((db.prepare("SELECT COUNT(*) AS count FROM call_logs").get() as any).count, 0);
  assert.ok(errors.some((entry) => entry.includes("Failed to migrate usage.json")));
  assert.ok(errors.some((entry) => entry.includes("Failed to migrate call_logs.json")));
});
