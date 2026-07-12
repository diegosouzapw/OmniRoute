/**
 * #4009 — Request count log per provider, per date.
 *
 * Some providers bill by request rather than by token, so operators need a
 * plain per-provider, per-date request count breakdown. Verifies
 * `getProviderDailyUsageRows` (src/lib/db/usageAnalytics.ts) groups
 * `usage_history` rows correctly by DATE(timestamp) + provider.
 *
 * Seeds an in-memory temp SQLite DB and releases the handle in test.after
 * (CLAUDE.md PII/Stream Learnings #3 — otherwise node:test hangs).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-provider-daily-4009-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const mod = await import("../../src/lib/db/usageAnalytics.ts");

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

test.before(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#4009 getProviderDailyUsageRows is exported as a function", () => {
  assert.equal(typeof mod.getProviderDailyUsageRows, "function");
});

test("#4009 getProviderDailyUsageRows — groups requests by date + provider", () => {
  const rawCutoffDate = "2020-01-01";
  const day1 = "2026-02-10T09:00:00.000Z";
  const day2 = "2026-02-11T09:00:00.000Z";

  // 3 requests for openai on day1, 1 for anthropic on day1, 2 for openai on day2
  insertUsageHistory({ timestamp: day1, provider: "openai", tokens_input: 10, tokens_output: 20 });
  insertUsageHistory({ timestamp: day1, provider: "openai", tokens_input: 5, tokens_output: 15 });
  insertUsageHistory({ timestamp: day1, provider: "openai", tokens_input: 8, tokens_output: 12 });
  insertUsageHistory({
    timestamp: day1,
    provider: "anthropic",
    tokens_input: 100,
    tokens_output: 50,
  });
  insertUsageHistory({ timestamp: day2, provider: "openai", tokens_input: 1, tokens_output: 1 });
  insertUsageHistory({ timestamp: day2, provider: "openai", tokens_input: 2, tokens_output: 2 });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2026-02-10T00:00:00.000Z",
    untilIso: "2026-02-11T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getProviderDailyUsageRows(unifiedSource, unifiedParams);

  const openaiDay1 = rows.find((r) => r.date === "2026-02-10" && r.provider === "openai");
  const anthropicDay1 = rows.find((r) => r.date === "2026-02-10" && r.provider === "anthropic");
  const openaiDay2 = rows.find((r) => r.date === "2026-02-11" && r.provider === "openai");

  assert.ok(openaiDay1, "openai/day1 row present");
  assert.equal(openaiDay1!.requests, 3, "3 openai requests on day1");
  assert.equal(openaiDay1!.promptTokens, 23, "10+5+8 input tokens summed");
  assert.equal(openaiDay1!.completionTokens, 47, "20+15+12 output tokens summed");
  assert.equal(openaiDay1!.totalTokens, 70, "23+47 total tokens");

  assert.ok(anthropicDay1, "anthropic/day1 row present");
  assert.equal(anthropicDay1!.requests, 1, "1 anthropic request on day1");

  assert.ok(openaiDay2, "openai/day2 row present");
  assert.equal(openaiDay2!.requests, 2, "2 openai requests on day2 (separate from day1)");

  // provider+date pairing must not conflate different dates for the same provider
  assert.notEqual(openaiDay1!.requests, openaiDay2!.requests);
});

test("#4009 getProviderDailyUsageRows — lowercases provider for consistent grouping", () => {
  const rawCutoffDate = "2020-01-01";
  const ts = "2026-03-01T09:00:00.000Z";

  insertUsageHistory({ timestamp: ts, provider: "OpenAI", tokens_input: 1, tokens_output: 1 });
  insertUsageHistory({ timestamp: ts, provider: "openai", tokens_input: 1, tokens_output: 1 });

  const { unifiedSource, unifiedParams } = mod.buildUnifiedSource({
    sinceIso: "2026-03-01T00:00:00.000Z",
    untilIso: "2026-03-01T23:59:59.000Z",
    rawCutoffDate,
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const rows = mod.getProviderDailyUsageRows(unifiedSource, unifiedParams);
  const openaiRows = rows.filter((r) => r.date === "2026-03-01" && r.provider === "openai");

  assert.equal(openaiRows.length, 1, "mixed-case provider values fold into one group");
  assert.equal(openaiRows[0].requests, 2, "both rows counted in the single lowercase group");
});
