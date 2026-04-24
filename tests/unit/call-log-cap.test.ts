import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-artifacts-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "3650";
process.env.CALL_LOG_MAX_ENTRIES = "100";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const detailedLogs = await import("../../src/lib/db/detailedLogs.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertCallLog(row) {
  const db = core.getDbInstance();
  db.prepare(
    `
    INSERT INTO call_logs (
      id, timestamp, method, path, status, model, requested_model, provider, account,
      connection_id, duration, tokens_in, tokens_out, cache_source, source_format, target_format,
      api_key_id, api_key_name, combo_name, combo_step_id, combo_execution_key,
      error_summary, detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256,
      has_request_body, has_response_body, has_pipeline_details, request_summary
    )
    VALUES (
      @id, @timestamp, @method, @path, @status, @model, @requested_model, @provider, @account,
      @connection_id, @duration, @tokens_in, @tokens_out, @cache_source, @source_format, @target_format,
      @api_key_id, @api_key_name, @combo_name, @combo_step_id, @combo_execution_key,
      @error_summary, @detail_state, @artifact_relpath, @artifact_size_bytes, @artifact_sha256,
      @has_request_body, @has_response_body, @has_pipeline_details, @request_summary
    )
  `
  ).run({
    requested_model: null,
    connection_id: null,
    duration: 0,
    tokens_in: 0,
    tokens_out: 0,
    cache_source: "upstream",
    source_format: null,
    target_format: null,
    api_key_id: null,
    api_key_name: null,
    combo_name: null,
    combo_step_id: null,
    combo_execution_key: null,
    error_summary: null,
    detail_state: "none",
    artifact_relpath: null,
    artifact_size_bytes: null,
    artifact_sha256: null,
    has_request_body: 0,
    has_response_body: 0,
    has_pipeline_details: 0,
    request_summary: null,
    ...row,
  });
}

test.beforeEach(async () => {
  process.env.CALL_LOG_RETENTION_DAYS = "3650";
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("saveCallLog stores only summary metadata in SQLite and writes detailed artifact", async () => {
  const timestamp = "2026-03-30T12:34:56.789Z";
  const logId = "req_artifact_1";

  await callLogs.saveCallLog({
    id: logId,
    timestamp,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    requestedModel: "openai/gpt-5",
    provider: "openai",
    cacheSource: "semantic",
    duration: 42,
    comboName: "combo-a",
    comboStepId: "step-openai-a",
    comboExecutionKey: "combo-a:0:step-openai-a",
    requestBody: { messages: [{ role: "user", content: "hello" }] },
    responseBody: { id: "resp_1", choices: [{ message: { content: "world" } }] },
    pipelinePayloads: {
      clientRawRequest: { body: { raw: true } },
      providerRequest: { body: { translated: true } },
      providerResponse: { body: { upstream: true } },
      clientResponse: { body: { final: true } },
    },
  });

  const logs = await callLogs.getCallLogs({ limit: 5 });
  assert.equal(logs.length, 1);
  assert.equal(logs[0].hasRequestBody, true);
  assert.equal(logs[0].hasResponseBody, true);
  assert.equal(logs[0].hasPipelineDetails, true);
  assert.equal(logs[0].detailState, "ready");

  const detail = await callLogs.getCallLogById(logId);
  assert.equal(detail?.requestedModel, "openai/gpt-5");
  assert.equal(detail?.cacheSource, "semantic");
  assert.equal(detail?.comboName, "combo-a");
  assert.equal(detail?.comboStepId, "step-openai-a");
  assert.equal(detail?.comboExecutionKey, "combo-a:0:step-openai-a");
  assert.equal(detail?.pipelinePayloads?.clientRawRequest?.body?.raw, true);
  assert.equal((detail?.pipelinePayloads?.providerRequest as any).body?.translated, true);
  assert.equal((detail?.pipelinePayloads as any).providerResponse?.body?.upstream, true);
  assert.equal((detail?.pipelinePayloads as any).clientResponse?.body?.final, true);
  assert.match(
    detail?.artifactRelPath || "",
    /^2026-03-30\/2026-03-30T12-34-56\.789Z_req_artifact_1\.json$/
  );

  const db = core.getDbInstance();
  const columns = db
    .prepare("SELECT name FROM pragma_table_info('call_logs') ORDER BY cid")
    .all()
    .map((row) => (row as any).name);
  assert.equal(columns.includes("request_body"), false);
  assert.equal(columns.includes("response_body"), false);
  assert.equal(columns.includes("error"), false);

  const summaryRow = db
    .prepare(
      `
      SELECT detail_state, artifact_relpath, cache_source, has_request_body, has_response_body, has_pipeline_details
      FROM call_logs WHERE id = ?
    `
    )
    .get(logId);
  (assert as any).equal((summaryRow as any).detail_state, "ready");
  assert.equal((summaryRow as any).cache_source, "semantic");
  assert.equal((summaryRow as any).has_request_body, 1);
  assert.equal((summaryRow as any).has_response_body, 1);
  assert.equal((summaryRow as any).has_pipeline_details, 1);
  assert.equal(typeof (summaryRow as any).artifact_relpath, "string");

  const artifactPath = path.join(TEST_DATA_DIR, "call_logs", detail.artifactRelPath);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(artifact.summary.id, logId);
  assert.equal(artifact.summary.requestedModel, "openai/gpt-5");
  assert.equal(artifact.summary.comboExecutionKey, "combo-a:0:step-openai-a");
});

test("rotateCallLogs removes expired rows and orphaned artifacts but keeps fresh referenced artifacts", async () => {
  process.env.CALL_LOG_RETENTION_DAYS = "1";
  const oldRelPath = "2026-03-10/2026-03-10T00-00-00.000Z_old.json";
  const oldAbsPath = path.join(TEST_DATA_DIR, "call_logs", oldRelPath);
  fs.mkdirSync(path.dirname(oldAbsPath), { recursive: true });
  fs.writeFileSync(oldAbsPath, JSON.stringify({ schemaVersion: 4 }, null, 2));

  insertCallLog({
    id: "expired-log",
    timestamp: "2026-03-10T00:00:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    account: "Expired",
    detail_state: "ready",
    artifact_relpath: oldRelPath,
    has_request_body: 1,
  });

  await callLogs.saveCallLog({
    id: "fresh-log",
    timestamp: new Date().toISOString(),
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    requestBody: { ok: true },
  });

  const freshRow = core
    .getDbInstance()
    .prepare("SELECT artifact_relpath FROM call_logs WHERE id = ?")
    .get("fresh-log");
  const freshAbsPath = path.join(TEST_DATA_DIR, "call_logs", (freshRow as any).artifact_relpath);
  assert.equal(
    (
      core
        .getDbInstance()
        .prepare("SELECT COUNT(*) AS cnt FROM call_logs WHERE id = ?")
        .get("expired-log") as any
    ).cnt,
    0
  );
  assert.equal(fs.existsSync(oldAbsPath), false);
  assert.equal(fs.existsSync(freshAbsPath), true);

  callLogs.rotateCallLogs();

  const db = core.getDbInstance();
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS cnt FROM call_logs WHERE id = ?").get("fresh-log") as any).cnt,
    1
  );
  assert.equal(fs.existsSync(freshAbsPath), true);

  const orphanDir = path.join(TEST_DATA_DIR, "call_logs", "2026-03-31");
  const orphanFile = path.join(orphanDir, "orphan.json");
  fs.mkdirSync(orphanDir, { recursive: true });
  fs.writeFileSync(orphanFile, "{}");
  callLogs.cleanupOrphanCallLogFiles();
  assert.equal(fs.existsSync(orphanFile), false);

  process.env.CALL_LOG_RETENTION_DAYS = "3650";
});

test("getCallLogs applies provider, account, apiKey, combo, search, and status filters with summary fields", async () => {
  insertCallLog({
    id: "filter-hit",
    timestamp: "2026-03-30T12:34:56.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    requested_model: "openai/gpt-5",
    provider: "openai",
    account: "Primary Account",
    connection_id: "conn-1",
    duration: 42,
    tokens_in: 11,
    tokens_out: 7,
    source_format: "openai",
    target_format: "openai",
    api_key_id: "key-1",
    api_key_name: "Primary Key",
    combo_name: "combo-a",
    combo_step_id: "step-a",
    combo_execution_key: "combo-a:0:step-a",
    has_request_body: 1,
  });
  insertCallLog({
    id: "filter-miss",
    timestamp: "2026-03-30T12:35:56.000Z",
    method: "POST",
    path: "/v1/embeddings",
    status: 200,
    model: "gemini/text-embedding",
    provider: "gemini",
    account: "Backup Account",
    connection_id: "conn-2",
    duration: 9,
    tokens_in: 3,
    tokens_out: 1,
    source_format: "openai",
    target_format: "gemini",
    api_key_id: "key-2",
    api_key_name: "Backup Key",
  });
  insertCallLog({
    id: "status-error-by-message",
    timestamp: "2026-03-30T12:36:56.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    account: "Primary Account",
    error_summary: "synthetic failure",
  });
  insertCallLog({
    id: "status-error",
    timestamp: "2026-03-30T12:37:56.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 500,
    model: "openai/gpt-4.1",
    provider: "openai",
    account: "Primary Account",
  });

  assert.deepEqual(
    (await callLogs.getCallLogs({ provider: "openai" })).map((row) => row.id),
    ["status-error", "status-error-by-message", "filter-hit"]
  );
  assert.deepEqual(
    (await callLogs.getCallLogs({ account: "primary" })).map((row) => row.id),
    ["status-error", "status-error-by-message", "filter-hit"]
  );
  assert.deepEqual(
    (await callLogs.getCallLogs({ apiKey: "Primary" })).map((row) => row.id),
    ["filter-hit"]
  );
  assert.deepEqual(
    (await callLogs.getCallLogs({ combo: true })).map((row) => row.id),
    ["filter-hit"]
  );
  assert.deepEqual(
    (await callLogs.getCallLogs({ search: "gpt-5" })).map((row) => row.id),
    ["filter-hit"]
  );
  assert.deepEqual(
    (await callLogs.getCallLogs({ status: "error" })).map((row) => row.id),
    ["status-error", "status-error-by-message"]
  );
  assert.deepEqual(
    (await callLogs.getCallLogs({ status: "ok" })).map((row) => row.id),
    ["status-error-by-message", "filter-miss", "filter-hit"]
  );
});

test("getCallLogById falls back to legacy inline rows and request_detail_logs", async () => {
  const db = core.getDbInstance();
  db.exec(`
    CREATE TABLE call_logs_v1_legacy (
      id TEXT PRIMARY KEY,
      request_body TEXT,
      response_body TEXT,
      error TEXT
    );
  `);

  insertCallLog({
    id: "legacy-read",
    timestamp: "2026-03-30T12:34:56.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    account: "Primary Account",
    detail_state: "legacy-inline",
    has_request_body: 1,
    has_response_body: 1,
  });
  db.prepare(
    `
    INSERT INTO call_logs_v1_legacy (id, request_body, response_body, error)
    VALUES (?, ?, ?, ?)
  `
  ).run(
    "legacy-read",
    JSON.stringify({ recovered: "request" }),
    JSON.stringify({ recovered: "response" }),
    JSON.stringify({ message: "legacy-error" })
  );

  detailedLogs.saveRequestDetailLog({
    call_log_id: "legacy-read",
    client_request: { body: { from: "detail-client" } },
    translated_request: { body: { from: "detail-provider-request" } },
    provider_response: { body: { from: "detail-provider-response" } },
    client_response: { body: { from: "detail-client-response" } },
  });

  const detail = await callLogs.getCallLogById("legacy-read");
  assert.deepEqual(detail?.requestBody, { recovered: "request" });
  assert.deepEqual(detail?.responseBody, { recovered: "response" });
  assert.deepEqual(detail?.error, { message: "legacy-error" });
  assert.equal(detail?.pipelinePayloads?.clientRequest?.body?.from, "detail-client");
  assert.equal(
    (detail?.pipelinePayloads?.providerRequest as any).body?.from,
    "detail-provider-request"
  );
  (assert as any).equal(
    (detail?.pipelinePayloads?.providerResponse as any).body?.from,
    "detail-provider-response"
  );
  assert.equal(
    (detail?.pipelinePayloads?.clientResponse as any).body?.from,
    "detail-client-response"
  );
  assert.equal(detail?.hasPipelineDetails, true);
});

test("getCallLogById marks missing artifacts explicitly and clears stale DB pointers", async () => {
  insertCallLog({
    id: "missing-artifact",
    timestamp: "2026-03-30T12:34:56.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    account: "Primary Account",
    detail_state: "ready",
    artifact_relpath: "2026-03-30/missing.json",
    has_request_body: 1,
  });

  const detail = await callLogs.getCallLogById("missing-artifact");
  assert.equal(detail?.detailState, "missing");
  assert.equal(detail?.requestBody, null);

  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT artifact_relpath, detail_state FROM call_logs WHERE id = ?")
    .get("missing-artifact");
  assert.equal((row as any).artifact_relpath, null);
  assert.equal((row as any).detail_state, "missing");
});

test("saveCallLog keeps large payloads out of SQLite while preserving explicit detail export", async () => {
  const requestBody = { payload: "x".repeat(320 * 1024) };

  await callLogs.saveCallLog({
    id: "artifact-only-large-payload",
    timestamp: "2026-03-31T09:05:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 500,
    model: "openai/gpt-4.1",
    provider: "openai",
    duration: 7,
    requestType: "search",
    requestBody,
    error: "upstream unavailable",
  });

  const db = core.getDbInstance();
  const row = db
    .prepare(
      `
      SELECT detail_state, has_request_body, artifact_relpath, error_summary, request_summary
      FROM call_logs WHERE id = ?
    `
    )
    .get("artifact-only-large-payload");
  assert.equal((row as any).detail_state, "ready");
  assert.equal((row as any).has_request_body, 1);
  (assert as any).equal(typeof (row as any).artifact_relpath, "string");
  assert.equal((row as any).error_summary, "upstream unavailable");

  const artifactPath = path.join(TEST_DATA_DIR, "call_logs", (row as any).artifact_relpath);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(artifact.requestBody.payload.length, requestBody.payload.length);

  const detail = await callLogs.getCallLogById("artifact-only-large-payload");
  assert.equal(detail?.requestBody?.payload.length, requestBody.payload.length);

  const exported = await callLogs.exportCallLogsSince("2026-03-31T00:00:00.000Z");
  assert.equal(exported.length, 1);
  assert.equal((exported[0] as any).requestBody.payload.length, requestBody.payload.length);
});

test("saveCallLog logs and returns when sqlite persistence throws unexpectedly", async () => {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare;
  const originalConsoleError = console.error;
  const consoleCalls = [];

  db.prepare = () => {
    throw new Error("simulated sqlite prepare failure");
  };
  console.error = (...args) => {
    consoleCalls.push(args.join(" "));
  };

  try {
    await assert.doesNotReject(() =>
      callLogs.saveCallLog({
        id: "prepare-failure",
        timestamp: "2026-03-30T12:40:00Z",
        method: "POST",
        path: "/v1/chat/completions",
        status: 200,
        model: "openai/gpt-4.1",
        provider: "openai",
        duration: 1,
      })
    );
  } finally {
    db.prepare = originalPrepare;
    console.error = originalConsoleError;
  }

  assert.equal(consoleCalls.length, 1);
  assert.match(consoleCalls[0], /Failed to save call log/);
  assert.match(consoleCalls[0], /simulated sqlite prepare failure/);
});

test("getCallLogs and getCallLogById expose combo target identifiers", async () => {
  await callLogs.saveCallLog({
    id: "combo-target-log",
    timestamp: "2026-03-31T08:15:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 503,
    model: "openai/gpt-4o-mini",
    requestedModel: "router-fixed-accounts",
    provider: "openai",
    connectionId: "conn-fixed-2",
    comboName: "router-fixed-accounts",
    comboStepId: "step-openai-secondary",
    comboExecutionKey: "router-fixed-accounts:1:step-openai-secondary",
    error: "upstream unavailable",
  });

  const logs = await callLogs.getCallLogs({ search: "step-openai-secondary" });
  assert.equal(logs.length, 1);
  assert.equal(logs[0].comboStepId, "step-openai-secondary");
  assert.equal(logs[0].comboExecutionKey, "router-fixed-accounts:1:step-openai-secondary");

  const detail = await callLogs.getCallLogById("combo-target-log");
  assert.equal(detail?.comboName, "router-fixed-accounts");
  assert.equal(detail?.comboStepId, "step-openai-secondary");
  assert.equal(detail?.comboExecutionKey, "router-fixed-accounts:1:step-openai-secondary");
});
