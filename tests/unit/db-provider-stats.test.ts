/**
 * #3175 — provider/model call statistics aggregated from call_logs.
 * Guards the SQL extracted out of the /api/provider-stats route (Hard Rule #5).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-provider-stats-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const stats = await import("../../src/lib/db/providerStats.ts");

function insertCallLog(row: Record<string, unknown>) {
  const db = core.getDbInstance();
  const full = {
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    requested_model: null,
    provider: "openai",
    account: null,
    connection_id: null,
    duration: 100,
    tokens_in: 10,
    tokens_out: 20,
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
    id: row.id ?? `log-${Math.random().toString(16).slice(2)}`,
    timestamp: row.timestamp ?? new Date().toISOString(),
  };
  db.prepare(
    `INSERT INTO call_logs (
      id, timestamp, method, path, status, model, requested_model, provider, account,
      connection_id, duration, tokens_in, tokens_out, cache_source, source_format, target_format,
      api_key_id, api_key_name, combo_name, combo_step_id, combo_execution_key,
      error_summary, detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256,
      has_request_body, has_response_body, has_pipeline_details, request_summary
    ) VALUES (
      @id, @timestamp, @method, @path, @status, @model, @requested_model, @provider, @account,
      @connection_id, @duration, @tokens_in, @tokens_out, @cache_source, @source_format, @target_format,
      @api_key_id, @api_key_name, @combo_name, @combo_step_id, @combo_execution_key,
      @error_summary, @detail_state, @artifact_relpath, @artifact_size_bytes, @artifact_sha256,
      @has_request_body, @has_response_body, @has_pipeline_details, @request_summary
    )`
  ).run(full);
}

test.before(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#3175 getProviderCallStats aggregates totals, success and latency per provider", () => {
  insertCallLog({ provider: "openai", status: 200, duration: 100, tokens_in: 10, tokens_out: 20 });
  insertCallLog({ provider: "openai", status: 500, duration: 300, tokens_in: 5, tokens_out: 0 });
  insertCallLog({ provider: "anthropic", status: 200, duration: 50, tokens_in: 1, tokens_out: 2 });
  // excluded: provider '-' / null
  insertCallLog({ provider: "-", status: 200 });

  const rows = stats.getProviderCallStats();
  const openai = rows.find((r) => r.provider === "openai");
  assert.ok(openai, "openai stats present");
  assert.equal(openai.totalRequests, 2);
  assert.equal(openai.successfulRequests, 1); // only the 200
  assert.equal(openai.avgLatencyMs, 200); // (100+300)/2
  assert.equal(openai.totalTokensIn, 15);
  assert.equal(openai.totalTokensOut, 20);
  assert.ok(!rows.some((r) => r.provider === "-"), "provider '-' is excluded");
  // ordered by totalRequests desc → openai (2) before anthropic (1)
  assert.equal(rows[0].provider, "openai");
});

test("#3175 getModelCallStats groups by provider+model", () => {
  const rows = stats.getModelCallStats();
  const m = rows.find((r) => r.model === "openai/gpt-4.1" && r.provider === "openai");
  assert.ok(m, "model row present");
  assert.equal(m.requests, 2);
  assert.equal(m.successfulRequests, 1);
});
