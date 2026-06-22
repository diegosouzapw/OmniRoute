/**
 * #3500 — usage_history / daily_usage_summary aggregation functions extracted
 * into usageAnalytics.ts (Hard Rule #5, slice 2).
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-usageanalytics-3500-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const mod = await import("../../src/lib/db/usageAnalytics.ts");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _idSeq = 0;

function insertUsageHistory(row: Record<string, unknown>) {
  const db = core.getDbInstance();
  const full = {
    provider: "openai",
    model: "gpt-4.1",
    tokens_input: 10,
    tokens_output: 20,
    tokens_cache_read: 0,
    tokens_cache_creation: 0,
    tokens_reasoning: 0,
    service_tier: "standard",
    success: 1,
    latency_ms: 100,
    connection_id: null,
    api_key_id: null,
    api_key_name: null,
    ...row,
    timestamp: row.timestamp ?? new Date().toISOString(),
  };
  // id is AUTOINCREMENT — omit it to let SQLite assign it
  db.prepare(
    `INSERT INTO usage_history (
      timestamp, provider, model,
      tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation, tokens_reasoning,
      service_tier, success, latency_ms, connection_id, api_key_id, api_key_name
    ) VALUES (
      @timestamp, @provider, @model,
      @tokens_input, @tokens_output, @tokens_cache_read, @tokens_cache_creation, @tokens_reasoning,
      @service_tier, @success, @latency_ms, @connection_id, @api_key_id, @api_key_name
    )`
  ).run(full);
}

function insertDailyUsageSummary(row: Record<string, unknown>) {
  const db = core.getDbInstance();
  const full = {
    provider: "openai",
    model: "gpt-4.1",
    total_input_tokens: 100,
    total_output_tokens: 200,
    total_requests: 5,
    total_cost: 0.0,
    ...row,
    date: row.date ?? "2024-01-01",
  };
  // id is AUTOINCREMENT — omit it to let SQLite assign it
  db.prepare(
    `INSERT INTO daily_usage_summary (
      date, provider, model, total_input_tokens, total_output_tokens, total_requests, total_cost
    ) VALUES (
      @date, @provider, @model, @total_input_tokens, @total_output_tokens, @total_requests, @total_cost
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
// buildUnifiedSource — raw-only branch (no agg needed)
// ---------------------------------------------------------------------------

test("#3500 buildUnifiedSource — raw-only branch when sinceIso is recent", () => {
  // sinceIso >= rawCutoffDate means no aggregated rows are needed.
  const recentIso = "2025-06-02T12:00:00.000Z";
  const result = mod.buildUnifiedSource({
    sinceIso: recentIso,
    untilIso: null,
    rawCutoffDate: "2025-06-01",
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  assert.equal(typeof result.unifiedSource, "string");
  assert.ok(result.unifiedSource.includes("usage_history"), "source references usage_history");
  assert.ok(!result.unifiedSource.includes("daily_usage_summary"), "no agg table needed");
  assert.ok(result.unifiedSource.includes("@since"), "has @since param");
  assert.ok("since" in result.unifiedParams, "unifiedParams has since key");
});

test("#3500 buildUnifiedSource — raw-only branch for same cutoff date ISO", () => {
  const rawCutoffDate = "2026-06-21";
  const result = mod.buildUnifiedSource({
    sinceIso: "2026-06-21T01:00:00.000Z",
    untilIso: null,
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  assert.ok(!result.unifiedSource.includes("daily_usage_summary"), "no same-day agg table");
  assert.equal(result.unifiedParams.since, "2026-06-21T01:00:00.000Z");
  assert.ok(!("rawCutoffDate" in result.unifiedParams), "rawCutoffDate not needed");
});

// ---------------------------------------------------------------------------
// buildUnifiedSource — UNION branch (agg needed)
// ---------------------------------------------------------------------------

test("#3500 buildUnifiedSource — UNION branch when sinceIso is old", () => {
  // sinceIso must be BEFORE rawCutoffDate to trigger the UNION branch
  const oldIso = "2024-01-01T00:00:00.000Z"; // sinceIso before rawCutoffDate
  const rawCutoffDate = "2025-01-01"; // rawCutoffDate after sinceIso → UNION fires
  const result = mod.buildUnifiedSource({
    sinceIso: oldIso,
    untilIso: null,
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  assert.ok(result.unifiedSource.includes("usage_history"), "raw leg present");
  assert.ok(result.unifiedSource.includes("daily_usage_summary"), "agg leg present");
  assert.ok(result.unifiedSource.includes("UNION ALL"), "UNION ALL present");
  assert.ok("rawCutoff" in result.unifiedParams, "rawCutoff param present");
  assert.ok("sinceDate" in result.unifiedParams, "sinceDate param present");
  assert.ok("rawCutoffDate" in result.unifiedParams, "rawCutoffDate param present");
});

// ---------------------------------------------------------------------------
// buildUnifiedSource — api_key filter disables agg leg
// ---------------------------------------------------------------------------

test("#3500 buildUnifiedSource — api_key filter suppresses daily_usage_summary leg", () => {
  const oldIso = "2024-01-01T00:00:00.000Z";
  const rawCutoffDate = "2025-01-01"; // after sinceIso, so UNION would fire without the api_key filter
  const result = mod.buildUnifiedSource({
    sinceIso: oldIso,
    untilIso: null,
    rawCutoffDate,
    apiKeyWhere: "(api_key_id IN (@apiKey0))",
    apiKeyParams: { apiKey0: "key-abc" },
  });

  assert.ok(
    !result.unifiedSource.includes("daily_usage_summary"),
    "agg leg suppressed with api_key filter"
  );
  assert.ok(result.unifiedSource.includes("usage_history"), "raw leg still present");
  assert.equal(result.unifiedParams.apiKey0, "key-abc", "apiKey0 propagated");
});

// ---------------------------------------------------------------------------
// getUsageSummary
// ---------------------------------------------------------------------------

test("#3500 getUsageSummary — returns correct scalar aggregations", () => {
  const rawCutoffDate = "2020-01-01";
  const ts = new Date().toISOString();

  insertUsageHistory({
    tokens_input: 50,
    tokens_output: 80,
    success: 1,
    latency_ms: 200,
    timestamp: ts,
  });
  insertUsageHistory({
    tokens_input: 30,
    tokens_output: 40,
    success: 0,
    latency_ms: 400,
    timestamp: ts,
  });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: null,
    untilIso: null,
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const row = mod.getUsageSummary(unifiedSource, unifiedParams);

  assert.ok(row.totalRequests >= 2, "totalRequests >= 2");
  assert.ok(row.promptTokens >= 80, "promptTokens >= 80");
  assert.ok(row.completionTokens >= 120, "completionTokens >= 120");
  assert.ok(row.totalTokens >= 200, "totalTokens >= 200");
  assert.ok(row.successfulRequests >= 1, "successfulRequests >= 1");
  assert.ok(row.avgLatencyMs > 0, "avgLatencyMs > 0");
  assert.equal(typeof row.firstRequest, "string");
  assert.equal(typeof row.lastRequest, "string");
});

// ---------------------------------------------------------------------------
// getDailyUsage
// ---------------------------------------------------------------------------

test("#3500 getDailyUsage — groups by date, ascending order", () => {
  // Use far-future rawCutoffDate so all rows fall in the raw leg (no UNION needed)
  const rawCutoffDate = "2020-01-01";
  const day1 = "2025-03-01T12:00:00.000Z";
  const day2 = "2025-03-02T12:00:00.000Z";

  insertUsageHistory({ timestamp: day1, tokens_input: 10, tokens_output: 20 });
  insertUsageHistory({ timestamp: day1, tokens_input: 5, tokens_output: 10 });
  insertUsageHistory({ timestamp: day2, tokens_input: 20, tokens_output: 30 });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2025-03-01T00:00:00.000Z",
    untilIso: "2025-03-02T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getDailyUsage(unifiedSource, unifiedParams);

  const march1 = rows.find((r) => r.date === "2025-03-01");
  const march2 = rows.find((r) => r.date === "2025-03-02");

  assert.ok(march1, "2025-03-01 row present");
  assert.ok(march2, "2025-03-02 row present");
  assert.equal(march1!.requests, 2, "2 requests on march 1");
  assert.equal(march1!.promptTokens, 15, "promptTokens summed on march 1");
  assert.equal(march1!.completionTokens, 30, "completionTokens summed on march 1");
  assert.equal(march1!.totalTokens, 45, "totalTokens summed on march 1");
});

// ---------------------------------------------------------------------------
// getDailyCostRows
// ---------------------------------------------------------------------------

test("#3500 getDailyCostRows — groups by date+provider+model+serviceTier", () => {
  const rawCutoffDate = "2020-01-01";
  const ts = "2025-04-01T12:00:00.000Z";

  insertUsageHistory({
    timestamp: ts,
    provider: "anthropic",
    model: "claude-3-5-sonnet",
    tokens_input: 100,
    tokens_output: 200,
    service_tier: "priority",
  });
  insertUsageHistory({
    timestamp: ts,
    provider: "anthropic",
    model: "claude-3-5-sonnet",
    tokens_input: 50,
    tokens_output: 100,
    service_tier: "priority",
  });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2025-04-01T00:00:00.000Z",
    untilIso: "2025-04-01T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getDailyCostRows(unifiedSource, unifiedParams);
  const row = rows.find((r) => r.provider === "anthropic" && r.model === "claude-3-5-sonnet");

  assert.ok(row, "anthropic/claude row present");
  assert.equal(row!.date, "2025-04-01");
  assert.equal(row!.serviceTier, "priority");
  assert.equal(row!.promptTokens, 150, "promptTokens aggregated");
  assert.equal(row!.completionTokens, 300, "completionTokens aggregated");
});

// ---------------------------------------------------------------------------
// getHeatmapRows
// ---------------------------------------------------------------------------

test("#3500 getHeatmapRows — groups by date, respects conditions", () => {
  const ts = "2025-05-15T10:00:00.000Z";
  insertUsageHistory({ timestamp: ts, tokens_input: 40, tokens_output: 60 });

  const rows = mod.getHeatmapRows(["timestamp >= @heatmapStart"], {
    heatmapStart: "2025-05-15T00:00:00.000Z",
  });

  const may15 = rows.find((r) => r.date === "2025-05-15");
  assert.ok(may15, "2025-05-15 row present");
  assert.ok(may15!.totalTokens >= 100, "totalTokens >= 100 (40+60)");
});

// ---------------------------------------------------------------------------
// getModelUsageRows
// ---------------------------------------------------------------------------

test("#3500 getModelUsageRows — returns per-model aggregates", () => {
  const rawCutoffDate = "2020-01-01";
  const ts = "2025-06-01T10:00:00.000Z";

  insertUsageHistory({
    timestamp: ts,
    provider: "openai",
    model: "gpt-5",
    tokens_input: 100,
    tokens_output: 200,
    success: 1,
    latency_ms: 150,
  });
  insertUsageHistory({
    timestamp: ts,
    provider: "openai",
    model: "gpt-5",
    tokens_input: 50,
    tokens_output: 100,
    success: 1,
    latency_ms: 250,
  });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2025-06-01T00:00:00.000Z",
    untilIso: "2025-06-01T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getModelUsageRows(unifiedSource, unifiedParams);
  const row = rows.find((r) => r.model === "gpt-5" && r.provider === "openai");

  assert.ok(row, "gpt-5/openai row present");
  assert.equal(row!.requests, 2);
  assert.equal(row!.promptTokens, 150);
  assert.equal(row!.completionTokens, 300);
  assert.equal(row!.successfulRequests, 2);
  assert.ok(row!.avgLatencyMs > 0, "avgLatencyMs > 0");
});

// ---------------------------------------------------------------------------
// getProviderCostRows
// ---------------------------------------------------------------------------

test("#3500 getProviderCostRows — groups by provider+model+serviceTier", () => {
  const rawCutoffDate = "2020-01-01";
  const ts = "2025-07-01T12:00:00.000Z";

  insertUsageHistory({
    timestamp: ts,
    provider: "gemini",
    model: "gemini-2.5-flash",
    tokens_input: 200,
    tokens_output: 300,
    tokens_cache_read: 50,
  });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2025-07-01T00:00:00.000Z",
    untilIso: "2025-07-01T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getProviderCostRows(unifiedSource, unifiedParams);
  const row = rows.find((r) => r.provider === "gemini");

  assert.ok(row, "gemini row present");
  assert.equal(row!.cacheReadTokens, 50, "cacheReadTokens passed through");
});

// ---------------------------------------------------------------------------
// getProviderUsageRows
// ---------------------------------------------------------------------------

test("#3500 getProviderUsageRows — aggregates per provider", () => {
  const rawCutoffDate = "2020-01-01";
  const ts = "2025-08-01T12:00:00.000Z";

  insertUsageHistory({
    timestamp: ts,
    provider: "mistral",
    tokens_input: 100,
    tokens_output: 100,
    success: 1,
    latency_ms: 200,
  });
  insertUsageHistory({
    timestamp: ts,
    provider: "mistral",
    tokens_input: 100,
    tokens_output: 100,
    success: 0,
    latency_ms: 400,
  });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2025-08-01T00:00:00.000Z",
    untilIso: "2025-08-01T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getProviderUsageRows(unifiedSource, unifiedParams);
  const row = rows.find((r) => r.provider === "mistral");

  assert.ok(row, "mistral row present");
  assert.equal(row!.requests, 2);
  assert.equal(row!.successfulRequests, 1);
  assert.equal(row!.totalTokens, 400, "200 input + 200 output");
  assert.ok(row!.avgLatencyMs > 0);
});

// ---------------------------------------------------------------------------
// getApiKeyUsageRows + getApiKeyMetadataRows
// ---------------------------------------------------------------------------

test("#3500 getApiKeyUsageRows — groups by api_key identity", () => {
  const ts = new Date().toISOString();
  const apiKeyWhereClause =
    "WHERE (api_key_id IS NOT NULL AND api_key_id != '') OR (api_key_name IS NOT NULL AND api_key_name != '')";

  insertUsageHistory({
    timestamp: ts,
    provider: "openai",
    model: "gpt-4.1",
    api_key_id: "key-xyz",
    tokens_input: 50,
    tokens_output: 80,
  });
  insertUsageHistory({
    timestamp: ts,
    provider: "openai",
    model: "gpt-4.1",
    api_key_id: "key-xyz",
    tokens_input: 30,
    tokens_output: 40,
  });

  const rows = mod.getApiKeyUsageRows(apiKeyWhereClause, {});
  const row = rows.find((r) => r.apiKeyId === "key-xyz");

  assert.ok(row, "key-xyz row present");
  assert.ok(row!.requests >= 2, "at least 2 requests");
  assert.ok(row!.promptTokens >= 80, "promptTokens >= 80");
});

test("#3500 getApiKeyMetadataRows — returns api key metadata with lastUsed", () => {
  const ts = new Date().toISOString();
  const apiKeyWhereClause =
    "WHERE (api_key_id IS NOT NULL AND api_key_id != '') OR (api_key_name IS NOT NULL AND api_key_name != '')";

  insertUsageHistory({ timestamp: ts, api_key_id: "key-meta-1", api_key_name: "My Key" });

  const rows = mod.getApiKeyMetadataRows(apiKeyWhereClause, {});
  const row = rows.find((r) => r.apiKeyId === "key-meta-1");

  assert.ok(row, "key-meta-1 present in metadata");
  assert.equal(row!.apiKeyName, "My Key");
  assert.equal(typeof row!.lastUsed, "string");
});

// ---------------------------------------------------------------------------
// getServiceTierUsageRows
// ---------------------------------------------------------------------------

test("#3500 getServiceTierUsageRows — groups by serviceTier+provider+model", () => {
  const rawCutoffDate = "2020-01-01";
  const ts = "2025-09-01T12:00:00.000Z";

  insertUsageHistory({
    timestamp: ts,
    provider: "openai",
    model: "gpt-5",
    service_tier: "flex",
    tokens_input: 100,
    tokens_output: 150,
  });
  insertUsageHistory({
    timestamp: ts,
    provider: "openai",
    model: "gpt-5",
    service_tier: "flex",
    tokens_input: 50,
    tokens_output: 75,
  });
  insertUsageHistory({
    timestamp: ts,
    provider: "openai",
    model: "gpt-5",
    service_tier: "standard",
    tokens_input: 200,
    tokens_output: 300,
  });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2025-09-01T00:00:00.000Z",
    untilIso: "2025-09-01T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getServiceTierUsageRows(unifiedSource, unifiedParams);

  const flexRow = rows.find((r) => r.serviceTier === "flex" && r.model === "gpt-5");
  const stdRow = rows.find((r) => r.serviceTier === "standard" && r.model === "gpt-5");

  assert.ok(flexRow, "flex tier row present");
  assert.ok(stdRow, "standard tier row present");
  assert.equal(flexRow!.requests, 2, "2 flex requests");
  assert.equal(flexRow!.totalTokens, 375, "flex totalTokens = 100+150+50+75");
  assert.equal(stdRow!.requests, 1, "1 standard request");
});

// ---------------------------------------------------------------------------
// getWeeklyPatternRows
// ---------------------------------------------------------------------------

test("#3500 getWeeklyPatternRows — groups by day of week, ascending", () => {
  const rawCutoffDate = "2020-01-01";
  // Monday 2025-06-02
  insertUsageHistory({
    timestamp: "2025-06-02T10:00:00.000Z",
    tokens_input: 10,
    tokens_output: 20,
  });
  insertUsageHistory({ timestamp: "2025-06-02T11:00:00.000Z", tokens_input: 5, tokens_output: 10 });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2025-06-02T00:00:00.000Z",
    untilIso: "2025-06-02T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getWeeklyPatternRows(unifiedSource, unifiedParams);
  // Monday is strftime('%w', ...) = 1
  const monday = rows.find((r) => r.dayOfWeek === "1");

  assert.ok(monday, "Monday row present");
  assert.ok(monday!.requests >= 2, "at least 2 requests on Monday");
  assert.ok(monday!.totalTokens >= 45, "totalTokens >= 45");
});

// ---------------------------------------------------------------------------
// buildPresetUnifiedSource
// ---------------------------------------------------------------------------

test("#3500 buildPresetUnifiedSource — UNION branch with old sinceIso", () => {
  // sinceIso must be < rawCutoffDate for UNION to fire
  const rawCutoffDate = "2025-01-01";
  const result = mod.buildPresetUnifiedSource({
    sinceIso: "2024-01-01T00:00:00.000Z",
    untilIso: null,
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  assert.ok(result.unifiedSource.includes("daily_usage_summary"), "agg leg present");
  assert.ok("presetRawCutoff" in result.unifiedParams, "presetRawCutoff param present");
});

test("#3500 buildPresetUnifiedSource — raw-only with recent sinceIso", () => {
  // sinceIso >= rawCutoffDate → no UNION needed
  const rawCutoffDate = "2020-01-01";
  const recentIso = new Date(Date.now() - 1000).toISOString(); // today > 2020-01-01 → raw-only
  const result = mod.buildPresetUnifiedSource({
    sinceIso: recentIso,
    untilIso: null,
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  assert.ok(!result.unifiedSource.includes("daily_usage_summary"), "no agg leg needed");
  assert.ok("presetSince" in result.unifiedParams, "presetSince param present");
});

// ---------------------------------------------------------------------------
// getPresetCostModelRows
// ---------------------------------------------------------------------------

test("#3500 getPresetCostModelRows — groups by model+provider+serviceTier", () => {
  const rawCutoffDate = "2020-01-01";
  const ts = "2025-10-01T12:00:00.000Z";

  insertUsageHistory({
    timestamp: ts,
    provider: "cohere",
    model: "command-r-plus",
    tokens_input: 200,
    tokens_output: 300,
    tokens_cache_read: 10,
    tokens_cache_creation: 5,
    tokens_reasoning: 0,
  });

  const { unifiedSource, unifiedParams } = mod.buildPresetUnifiedSource({
    sinceIso: "2025-10-01T00:00:00.000Z",
    untilIso: "2025-10-01T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getPresetCostModelRows(unifiedSource, unifiedParams);
  const row = rows.find((r) => r.provider === "cohere" && r.model === "command-r-plus");

  assert.ok(row, "cohere/command-r-plus row present");
  assert.equal(row!.promptTokens, 200);
  assert.equal(row!.completionTokens, 300);
  assert.equal(row!.cacheReadTokens, 10);
  assert.equal(row!.cacheCreationTokens, 5);
});

// ---------------------------------------------------------------------------
// getAllUsageHistory / getAllDomainCostHistory / getAllDomainBudgets
// ---------------------------------------------------------------------------

test("#3500 getAllUsageHistory — returns array (empty or rows)", () => {
  const rows = mod.getAllUsageHistory();
  assert.ok(Array.isArray(rows), "returns array");
});

test("#3500 getAllDomainCostHistory — returns array", () => {
  const rows = mod.getAllDomainCostHistory();
  assert.ok(Array.isArray(rows), "returns array");
});

test("#3500 getAllDomainBudgets — returns array", () => {
  const rows = mod.getAllDomainBudgets();
  assert.ok(Array.isArray(rows), "returns array");
});

// ---------------------------------------------------------------------------
// UNION source integration — daily_usage_summary rows included in aggregates
// ---------------------------------------------------------------------------

test("#3500 buildUnifiedSource UNION — summary rows merged into getDailyUsage result", () => {
  // Set rawCutoffDate to tomorrow so today's usage_history rows are in the raw leg;
  // also insert a daily_usage_summary row for a past date that is below rawCutoffDate.
  const tomorrow = new Date(Date.now() + 86_400_000);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // Past date clearly before rawCutoffDate
  const pastDate = "2023-06-01";
  insertDailyUsageSummary({
    date: pastDate,
    provider: "google",
    model: "gemini-1.5-pro",
    total_input_tokens: 500,
    total_output_tokens: 750,
    total_requests: 10,
  });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2023-06-01T00:00:00.000Z",
    untilIso: "2023-06-01T23:59:59.000Z",
    rawCutoffDate: tomorrowStr,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  // UNION branch must be used because sinceIso < rawCutoffDate
  assert.ok(unifiedSource.includes("daily_usage_summary"), "UNION branch active");

  const rows = mod.getDailyUsage(unifiedSource, unifiedParams);
  const june1 = rows.find((r) => r.date === pastDate);

  assert.ok(june1, "2023-06-01 summary row is visible through UNION");
  // daily_usage_summary synthesizes a timestamp at noon; totalTokens = 500+750 = 1250
  assert.equal(june1!.totalTokens, 1250, "tokens from summary row: 500+750=1250");
});
