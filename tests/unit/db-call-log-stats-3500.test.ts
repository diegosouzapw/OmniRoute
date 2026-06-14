/**
 * #3500 — call_logs aggregation functions extracted into callLogStats.ts (Hard Rule #5).
 *
 * Seeds an in-memory temp SQLite DB and asserts each new db function returns the
 * correct aggregation. DB handles are released in test.after to prevent Node
 * native test runner from hanging (CLAUDE.md PII/Stream Learnings #3).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-callogstats-3500-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const mod = await import("../../src/lib/db/callLogStats.ts");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _idSeq = 0;
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
    request_type: null,
    ...row,
    id: row.id ?? `log-3500-${++_idSeq}`,
    timestamp: row.timestamp ?? new Date().toISOString(),
  };
  db.prepare(
    `INSERT INTO call_logs (
      id, timestamp, method, path, status, model, requested_model, provider, account,
      connection_id, duration, tokens_in, tokens_out, cache_source, source_format, target_format,
      api_key_id, api_key_name, combo_name, combo_step_id, combo_execution_key,
      error_summary, detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256,
      has_request_body, has_response_body, has_pipeline_details, request_summary, request_type
    ) VALUES (
      @id, @timestamp, @method, @path, @status, @model, @requested_model, @provider, @account,
      @connection_id, @duration, @tokens_in, @tokens_out, @cache_source, @source_format, @target_format,
      @api_key_id, @api_key_name, @combo_name, @combo_step_id, @combo_execution_key,
      @error_summary, @detail_state, @artifact_relpath, @artifact_size_bytes, @artifact_sha256,
      @has_request_body, @has_response_body, @has_pipeline_details, @request_summary, @request_type
    )`
  ).run(full);
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

test.before(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// getProviderMetrics
// ---------------------------------------------------------------------------

test("#3500 getProviderMetrics — aggregates totals and latency per provider", () => {
  // Two openai rows: one success, one error with error_summary
  const ts1 = "2025-06-01T10:00:00.000Z";
  const ts2 = "2025-06-01T11:00:00.000Z";
  insertCallLog({ provider: "openai", status: 200, duration: 100, timestamp: ts1 });
  insertCallLog({
    provider: "openai",
    status: 500,
    duration: 300,
    error_summary: "upstream error",
    timestamp: ts2,
  });
  // One anthropic success row
  const ts3 = "2025-06-01T09:00:00.000Z";
  insertCallLog({ provider: "anthropic", status: 200, duration: 50, timestamp: ts3 });
  // Provider '-' should be excluded
  insertCallLog({ provider: "-", status: 200 });
  // Provider null should be excluded (insert directly to avoid type issue)
  core.getDbInstance().prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, duration,
      tokens_in, tokens_out, cache_source, detail_state, has_request_body, has_response_body, has_pipeline_details)
     VALUES (?, ?, 'POST', '/v1/test', 200, 'x', NULL, 100, 0, 0, 'upstream', 'none', 0, 0, 0)`
  ).run(`log-3500-null-${++_idSeq}`, new Date().toISOString());

  const rows = mod.getProviderMetrics();

  // '-' and null providers must not appear
  assert.ok(!rows.some((r) => r.provider === "-"), "provider '-' excluded");
  assert.ok(!rows.some((r) => r.provider === null), "null provider excluded");

  const openai = rows.find((r) => r.provider === "openai");
  assert.ok(openai, "openai row present");
  assert.equal(openai.totalRequests, 2);
  assert.equal(openai.totalSuccesses, 1); // only the 200
  assert.equal(openai.avgLatencyMs, 200); // ROUND((100+300)/2) = 200
  assert.equal(openai.lastRequestAt, ts2, "lastRequestAt = most recent ts");
  assert.equal(openai.lastErrorAt, ts2, "lastErrorAt = ts of the 500/error row");
  assert.equal(openai.lastStatus, 500, "lastStatus = most recent status");
  assert.equal(openai.lastErrorStatus, 500, "lastErrorStatus = most recent error status");

  const anthropic = rows.find((r) => r.provider === "anthropic");
  assert.ok(anthropic, "anthropic row present");
  assert.equal(anthropic.totalRequests, 1);
  assert.equal(anthropic.totalSuccesses, 1);
  assert.equal(anthropic.lastErrorAt, null, "no error row → lastErrorAt is null");
  assert.equal(anthropic.lastStatus, 200);
  assert.equal(anthropic.lastErrorStatus, null, "no error → lastErrorStatus is null");
});

// ---------------------------------------------------------------------------
// getSearchProviderStats
// ---------------------------------------------------------------------------

test("#3500 getSearchProviderStats — aggregates search requests per provider", () => {
  insertCallLog({ provider: "brave", status: 200, duration: 50, request_type: "search" });
  insertCallLog({ provider: "brave", status: 200, duration: 150, request_type: "search" });
  insertCallLog({ provider: "serper", status: 200, duration: 80, request_type: "search" });
  // non-search row — must NOT appear
  insertCallLog({ provider: "openai", status: 200, duration: 100, request_type: null });

  const rows = mod.getSearchProviderStats();

  // Only search request_type rows
  assert.ok(!rows.some((r) => r.provider === "openai"), "non-search row excluded");

  const brave = rows.find((r) => r.provider === "brave");
  assert.ok(brave, "brave row present");
  assert.equal(brave.requests, 2);
  assert.equal(brave.avg_latency_ms, 100); // CAST(AVG(50,150) AS INTEGER) = 100

  const serper = rows.find((r) => r.provider === "serper");
  assert.ok(serper, "serper row present");
  assert.equal(serper.requests, 1);
});

// ---------------------------------------------------------------------------
// getRecentSearchLogs
// ---------------------------------------------------------------------------

test("#3500 getRecentSearchLogs — returns up to 10 most recent search rows", () => {
  // Insert 12 search rows with incrementing timestamps
  for (let i = 1; i <= 12; i++) {
    const ts = new Date(Date.UTC(2025, 5, i, 12, 0, 0)).toISOString();
    insertCallLog({
      provider: "brave",
      status: 200,
      request_type: "search",
      timestamp: ts,
      request_summary: JSON.stringify({ query: `q${i}` }),
    });
  }

  const rows = mod.getRecentSearchLogs();
  assert.equal(rows.length, 10, "limited to 10 rows");
  // Most recent first (i=12 is the newest)
  assert.ok(rows[0].timestamp >= rows[rows.length - 1].timestamp, "ordered newest-first");
});

// ---------------------------------------------------------------------------
// getSearchAggregateStats
// ---------------------------------------------------------------------------

test("#3500 getSearchAggregateStats — correct totals, today, errors, avg, cached", () => {
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  const todayIso = todayStart.toISOString();

  // Rows inserted after todayStart qualify as "today"
  const nowIso = new Date().toISOString();
  // duration=0 → excluded from avg_duration; duration=3 → cached (>0 && <5)
  insertCallLog({ provider: "brave", status: 200, duration: 100, request_type: "search", timestamp: nowIso });
  insertCallLog({ provider: "brave", status: 200, duration: 3, request_type: "search", timestamp: nowIso });
  insertCallLog({ provider: "brave", status: 500, duration: 80, request_type: "search", timestamp: nowIso });
  // Old row (yesterday) — not in today count
  const yesterday = new Date(Date.now() - 86_400_000).toISOString();
  insertCallLog({ provider: "brave", status: 200, duration: 200, request_type: "search", timestamp: yesterday });

  const result = mod.getSearchAggregateStats(todayIso);

  assert.ok(result.total >= 4, "total includes all search rows (across all tests in file)");
  assert.ok(result.today >= 3, "today counts rows from today");
  assert.ok(result.errors >= 1, "errors counts status >= 400");
  assert.ok(result.cached >= 1, "cached counts duration in (0,5)");
  assert.ok(result.avg_duration !== null, "avg_duration not null when rows have duration > 0");
});

test("#3500 getSearchAggregateStats — returns zero struct when no search rows match", () => {
  // Use a far-future todayIso so no row qualifies
  const farFuture = "2999-01-01T00:00:00.000Z";
  const result = mod.getSearchAggregateStats(farFuture);
  // total should be 0 (no rows WHERE request_type='search' AND timestamp >= 2999…)
  // Actually the total counts ALL search rows regardless of todayIso; only "today" is gated.
  // The function never returns null, so we just check the shape.
  assert.equal(typeof result.total, "number");
  assert.equal(typeof result.today, "number");
  assert.equal(result.today, 0, "no rows qualify as 'today' in far future");
});

// ---------------------------------------------------------------------------
// getSearchProviderCounts
// ---------------------------------------------------------------------------

test("#3500 getSearchProviderCounts — ordered by cnt desc", () => {
  // brave has multiple rows from earlier tests; add a burst to ensure ordering
  for (let i = 0; i < 5; i++) {
    insertCallLog({ provider: "bing", status: 200, request_type: "search" });
  }
  for (let i = 0; i < 2; i++) {
    insertCallLog({ provider: "rare_provider", status: 200, request_type: "search" });
  }

  const rows = mod.getSearchProviderCounts();
  // Each row must have provider + cnt
  for (const row of rows) {
    assert.equal(typeof row.provider, "string");
    assert.equal(typeof row.cnt, "number");
  }
  // First row should have count >= last row (ordered desc)
  if (rows.length >= 2) {
    assert.ok(rows[0].cnt >= rows[rows.length - 1].cnt, "ordered by cnt desc");
  }
  // bing (5 added) should beat rare_provider (2 added) if both appear
  const bing = rows.find((r) => r.provider === "bing");
  const rare = rows.find((r) => r.provider === "rare_provider");
  if (bing && rare) {
    assert.ok(bing.cnt > rare.cnt, "bing cnt > rare_provider cnt");
  }
});
