import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-artifacts-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "1";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const detailedLogs = await import("../../src/lib/db/detailedLogs.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("call logs store a single per-request artifact with pipeline details", async () => {
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
  assert.equal(logs[0].hasPipelineDetails, true);

  const detail = await callLogs.getCallLogById(logId);
  assert.equal(detail?.requestedModel, "openai/gpt-5");
  assert.equal(detail?.comboName, "combo-a");
  assert.equal(detail?.comboStepId, "step-openai-a");
  assert.equal(detail?.comboExecutionKey, "combo-a:0:step-openai-a");
  assert.equal(detail?.pipelinePayloads?.clientRawRequest?.body?.raw, true);
  assert.equal(detail?.pipelinePayloads?.providerRequest?.body?.translated, true);
  assert.equal(detail?.pipelinePayloads?.providerResponse?.body?.upstream, true);
  assert.equal(detail?.pipelinePayloads?.clientResponse?.body?.final, true);
  assert.match(
    detail?.artifactRelPath || "",
    /^2026-03-30\/2026-03-30T12-34-56\.789Z_req_artifact_1\.json$/
  );

  const artifactPath = path.join(TEST_DATA_DIR, "call_logs", detail.artifactRelPath);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(artifact.summary.id, logId);
  assert.equal(artifact.summary.requestedModel, "openai/gpt-5");
  assert.equal(artifact.summary.comboName, "combo-a");
  assert.equal(artifact.summary.comboStepId, "step-openai-a");
  assert.equal(artifact.summary.comboExecutionKey, "combo-a:0:step-openai-a");
  assert.equal(artifact.pipeline.clientRawRequest.body.raw, true);
  assert.equal("sourceRequest" in artifact.pipeline, false);
});

test("call log artifact rotation removes directories older than CALL_LOG_RETENTION_DAYS", async () => {
  const oldDir = path.join(TEST_DATA_DIR, "call_logs", "2026-03-10");
  const freshDir = path.join(TEST_DATA_DIR, "call_logs", "2026-03-30");
  fs.mkdirSync(oldDir, { recursive: true });
  fs.mkdirSync(freshDir, { recursive: true });
  fs.writeFileSync(path.join(oldDir, "old.json"), "{}");
  fs.writeFileSync(path.join(freshDir, "fresh.json"), "{}");

  const oldTime = new Date("2026-03-10T00:00:00.000Z");
  const freshTime = new Date();
  fs.utimesSync(oldDir, oldTime, oldTime);
  fs.utimesSync(freshDir, freshTime, freshTime);

  callLogs.rotateCallLogs();

  assert.equal(fs.existsSync(oldDir), false);
  assert.equal(fs.existsSync(freshDir), true);
});

test("getCallLogs applies provider, account, apiKey, combo, and search filters together", async () => {
  const db = core.getDbInstance();
  const insert = db.prepare(`
    INSERT INTO call_logs (
      id, timestamp, method, path, status, model, requested_model, provider, account,
      connection_id, duration, tokens_in, tokens_out, source_format, target_format,
      api_key_id, api_key_name, combo_name, request_body, response_body, error,
      artifact_relpath, has_pipeline_details
    )
    VALUES (
      @id, @timestamp, @method, @path, @status, @model, @requested_model, @provider, @account,
      @connection_id, @duration, @tokens_in, @tokens_out, @source_format, @target_format,
      @api_key_id, @api_key_name, @combo_name, @request_body, @response_body, @error,
      @artifact_relpath, @has_pipeline_details
    )
  `);

  insert.run({
    id: "filter-hit",
    timestamp: "2026-03-30T12:34:56",
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
    request_body: JSON.stringify({ ok: true }),
    response_body: JSON.stringify({ ok: true }),
    error: null,
    artifact_relpath: null,
    has_pipeline_details: 0,
  });
  insert.run({
    id: "filter-miss",
    timestamp: "2026-03-30T12:35:56.000Z",
    method: "POST",
    path: "/v1/embeddings",
    status: 500,
    model: "gemini/text-embedding",
    requested_model: null,
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
    combo_name: null,
    request_body: null,
    response_body: null,
    error: "upstream failed",
    artifact_relpath: null,
    has_pipeline_details: 0,
  });

  const providerFiltered = await callLogs.getCallLogs({ provider: "openai" });
  assert.deepEqual(
    providerFiltered.map((row) => row.id),
    ["filter-hit"]
  );

  const accountFiltered = await callLogs.getCallLogs({ account: "primary" });
  assert.deepEqual(
    accountFiltered.map((row) => row.id),
    ["filter-hit"]
  );

  const apiKeyFiltered = await callLogs.getCallLogs({ apiKey: "Primary" });
  assert.deepEqual(
    apiKeyFiltered.map((row) => row.id),
    ["filter-hit"]
  );

  const comboFiltered = await callLogs.getCallLogs({ combo: true });
  assert.deepEqual(
    comboFiltered.map((row) => row.id),
    ["filter-hit"]
  );

  const searchFiltered = await callLogs.getCallLogs({ search: "gpt-5" });
  assert.deepEqual(
    searchFiltered.map((row) => row.id),
    ["filter-hit"]
  );
});

test("getCallLogs applies status filters for error, ok, and explicit status codes", async () => {
  const db = core.getDbInstance();
  const insert = db.prepare(`
    INSERT INTO call_logs (
      id, timestamp, method, path, status, model, requested_model, provider, account,
      connection_id, duration, tokens_in, tokens_out, source_format, target_format,
      api_key_id, api_key_name, combo_name, request_body, response_body, error,
      artifact_relpath, has_pipeline_details
    )
    VALUES (
      @id, @timestamp, @method, @path, @status, @model, @requested_model, @provider, @account,
      @connection_id, @duration, @tokens_in, @tokens_out, @source_format, @target_format,
      @api_key_id, @api_key_name, @combo_name, @request_body, @response_body, @error,
      @artifact_relpath, @has_pipeline_details
    )
  `);

  insert.run({
    id: "status-ok",
    timestamp: "2026-03-30T12:34:56",
    method: "POST",
    path: "/v1/chat/completions",
    status: 201,
    model: "openai/gpt-4.1",
    requested_model: null,
    provider: "openai",
    account: "Primary Account",
    connection_id: "conn-1",
    duration: 12,
    tokens_in: 1,
    tokens_out: 2,
    source_format: "openai",
    target_format: "openai",
    api_key_id: null,
    api_key_name: null,
    combo_name: null,
    request_body: null,
    response_body: null,
    error: null,
    artifact_relpath: null,
    has_pipeline_details: 0,
  });
  insert.run({
    id: "status-error",
    timestamp: "2026-03-30T12:35:56",
    method: "POST",
    path: "/v1/chat/completions",
    status: 500,
    model: "openai/gpt-4.1",
    requested_model: null,
    provider: "openai",
    account: "Primary Account",
    connection_id: "conn-2",
    duration: 13,
    tokens_in: 1,
    tokens_out: 2,
    source_format: "openai",
    target_format: "openai",
    api_key_id: null,
    api_key_name: null,
    combo_name: null,
    request_body: null,
    response_body: null,
    error: null,
    artifact_relpath: null,
    has_pipeline_details: 0,
  });
  insert.run({
    id: "status-error-by-message",
    timestamp: "2026-03-30T12:36:56",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    requested_model: null,
    provider: "openai",
    account: "Primary Account",
    connection_id: "conn-3",
    duration: 14,
    tokens_in: 1,
    tokens_out: 2,
    source_format: "openai",
    target_format: "openai",
    api_key_id: null,
    api_key_name: null,
    combo_name: null,
    request_body: null,
    response_body: null,
    error: "synthetic failure",
    artifact_relpath: null,
    has_pipeline_details: 0,
  });

  const errorFiltered = await callLogs.getCallLogs({ status: "error" });
  assert.deepEqual(
    errorFiltered.map((row) => row.id),
    ["status-error-by-message", "status-error"]
  );

  const okFiltered = await callLogs.getCallLogs({ status: "ok" });
  assert.deepEqual(
    okFiltered.map((row) => row.id),
    ["status-error-by-message", "status-ok"]
  );

  const numericFiltered = await callLogs.getCallLogs({ status: "500" });
  assert.deepEqual(
    numericFiltered.map((row) => row.id),
    ["status-error"]
  );

  const invalidNumericFiltered = await callLogs.getCallLogs({ status: "not-a-number" });
  assert.deepEqual(
    invalidNumericFiltered.map((row) => row.id),
    ["status-error-by-message", "status-error", "status-ok"]
  );
});

test("getCallLogById falls back to legacy disk payloads and request_detail_logs when artifacts are absent", async () => {
  const db = core.getDbInstance();
  db.prepare(
    `
    INSERT INTO call_logs (
      id, timestamp, method, path, status, model, requested_model, provider, account,
      connection_id, duration, tokens_in, tokens_out, source_format, target_format,
      api_key_id, api_key_name, combo_name, request_body, response_body, error,
      artifact_relpath, has_pipeline_details
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    "legacy-read",
    "2026-03-30T12:34:56",
    "POST",
    "/v1/chat/completions",
    200,
    "openai/gpt-4.1",
    null,
    "openai",
    "Primary Account",
    "conn-1",
    42,
    11,
    7,
    "openai",
    "openai",
    null,
    null,
    null,
    JSON.stringify({ _truncated: true }),
    JSON.stringify({ _truncated: true }),
    "db-error",
    null,
    0
  );

  const legacyDir = path.join(TEST_DATA_DIR, "call_logs", "2026-03-30");
  fs.mkdirSync(legacyDir, { recursive: true });
  fs.writeFileSync(
    path.join(legacyDir, "123456_alt_200.json"),
    JSON.stringify(
      {
        requestBody: { recovered: "request" },
        responseBody: { recovered: "response" },
        error: "legacy-error",
      },
      null,
      2
    )
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
  assert.equal(detail?.error, "legacy-error");
  assert.equal(detail?.pipelinePayloads?.clientRequest?.body?.from, "detail-client");
  assert.equal(detail?.pipelinePayloads?.providerRequest?.body?.from, "detail-provider-request");
  assert.equal(detail?.pipelinePayloads?.providerResponse?.body?.from, "detail-provider-response");
  assert.equal(detail?.pipelinePayloads?.clientResponse?.body?.from, "detail-client-response");
  assert.equal(detail?.hasPipelineDetails, true);
});

test("getCallLogById returns legacy pipeline details even when no legacy disk artifact exists", async () => {
  const db = core.getDbInstance();
  db.prepare(
    `
    INSERT INTO call_logs (
      id, timestamp, method, path, status, model, requested_model, provider, account,
      connection_id, duration, tokens_in, tokens_out, source_format, target_format,
      api_key_id, api_key_name, combo_name, request_body, response_body, error,
      artifact_relpath, has_pipeline_details
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    "legacy-pipeline-only",
    "2026-03-30T12:34:57",
    "POST",
    "/v1/chat/completions",
    200,
    "openai/gpt-4.1",
    null,
    "openai",
    "Primary Account",
    "conn-1",
    1,
    1,
    1,
    "openai",
    "openai",
    null,
    null,
    null,
    JSON.stringify({ stored: "request" }),
    JSON.stringify({ stored: "response" }),
    null,
    null,
    0
  );

  detailedLogs.saveRequestDetailLog({
    call_log_id: "legacy-pipeline-only",
    client_request: { fallback: "pipeline-only" },
  });

  const detail = await callLogs.getCallLogById("legacy-pipeline-only");

  assert.deepEqual(detail?.requestBody, { stored: "request" });
  assert.deepEqual(detail?.responseBody, { stored: "response" });
  assert.deepEqual(detail?.pipelinePayloads?.clientRequest, { fallback: "pipeline-only" });
  assert.equal(detail?.hasPipelineDetails, true);
});

test("saveCallLog keeps payloads below 256KB inline in sqlite", async () => {
  const requestBody = { payload: "x".repeat(64 * 1024) };
  const responseBody = { payload: "y".repeat(96 * 1024) };

  await callLogs.saveCallLog({
    id: "inline-payload-limit",
    timestamp: "2026-03-31T09:00:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    duration: 5,
    requestBody,
    responseBody,
  });

  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT request_body, response_body FROM call_logs WHERE id = ?")
    .get("inline-payload-limit");
  const storedRequest = JSON.parse(row.request_body);
  const storedResponse = JSON.parse(row.response_body);

  assert.equal(storedRequest._truncated, undefined);
  assert.equal(storedResponse._truncated, undefined);

  const detail = await callLogs.getCallLogById("inline-payload-limit");
  assert.equal(detail?.requestBody?.payload?.length, requestBody.payload.length);
  assert.equal(detail?.responseBody?.payload?.length, responseBody.payload.length);
});

test("saveCallLog still truncates oversized inline sqlite payloads above 256KB", async () => {
  const requestBody = { payload: "x".repeat(320 * 1024) };

  await callLogs.saveCallLog({
    id: "truncated-inline-payload-limit",
    timestamp: "2026-03-31T09:05:00.000Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 500,
    model: "openai/gpt-4.1",
    provider: "openai",
    duration: 7,
    requestBody,
  });

  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT request_body FROM call_logs WHERE id = ?")
    .get("truncated-inline-payload-limit");
  const storedRequest = JSON.parse(row.request_body);

  assert.equal(storedRequest._truncated, true);
  assert.equal(storedRequest._preview.length, 256 * 1024);
  assert.ok(storedRequest._originalSize > storedRequest._preview.length);
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
