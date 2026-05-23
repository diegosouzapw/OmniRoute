import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression for #2565: the dashboard log viewer paginates by growing its
// fetch window. getCallLogs must honor `limit` and `offset` and keep a stable
// `timestamp DESC` ordering so each page returns the expected rows.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-pagination-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "3650";
process.env.CALL_LOG_MAX_ENTRIES = "100000";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");

function insertCallLog(row: Record<string, unknown>) {
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
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    requested_model: null,
    provider: "openai",
    account: null,
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

test.before(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // Seed 25 rows with strictly increasing timestamps (id N -> minute N).
  for (let i = 0; i < 25; i++) {
    const mm = String(i).padStart(2, "0");
    insertCallLog({ id: `log_${mm}`, timestamp: `2026-05-22T10:${mm}:00.000Z` });
  }
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#2565: getCallLogs honors limit and returns newest-first", async () => {
  const page = await callLogs.getCallLogs({ limit: 10 });
  assert.equal(page.length, 10);
  // Newest first: log_24 down to log_15.
  assert.equal(page[0].id, "log_24");
  assert.equal(page[9].id, "log_15");
});

test("#2565: getCallLogs offset returns the next page without overlap", async () => {
  const first = await callLogs.getCallLogs({ limit: 10, offset: 0 });
  const second = await callLogs.getCallLogs({ limit: 10, offset: 10 });

  assert.equal(second.length, 10);
  // Second page continues where the first ended.
  assert.equal(second[0].id, "log_14");
  assert.equal(second[9].id, "log_05");

  // No overlap between pages.
  const firstIds = new Set(first.map((l: { id: string }) => l.id));
  assert.ok(second.every((l: { id: string }) => !firstIds.has(l.id)));
});

test("#2565: growing window includes everything the paged windows cover", async () => {
  const grown = await callLogs.getCallLogs({ limit: 20 });
  assert.equal(grown.length, 20);
  assert.equal(grown[0].id, "log_24");
  assert.equal(grown[19].id, "log_05");
});

test("#2565: offset past the end yields an empty page", async () => {
  const beyond = await callLogs.getCallLogs({ limit: 10, offset: 100 });
  assert.equal(beyond.length, 0);
});
