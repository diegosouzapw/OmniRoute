import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { setImmediate as nextTurn } from "node:timers/promises";

// Provider-reported search cost: an operator-trusted search backend can report
// what a call actually cost in `usage.search_cost_usd`, which then replaces the
// static costPerQuery for budgets and lands in request_cost_ledger.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-reported-cost-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// Dynamic imports: DATA_DIR must be set before the DB modules load (repo test pattern).
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const costLedger = await import("../../src/lib/db/costLedger.ts");
const costRules = await import("../../src/domain/costRules.ts");
const batchWriter = await import("../../src/lib/spend/batchWriter.ts");
const { executeWebSearch } = await import("../../src/lib/search/executeWebSearch.ts");
const searchProxy = await import("../../open-sse/handlers/search/searchProxy.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");

const ADAPTER_BASE = "http://127.0.0.1:9091/adapter";
const originalFetch = globalThis.fetch;
let keyCounter = 0;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  batchWriter.resetSpendBatchWriterForTests();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await closeCallLogSaves(500).catch(() => {});
  batchWriter.resetSpendBatchWriterForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function nextApiKeyId() {
  keyCounter += 1;
  return `key-reported-cost-${keyCounter}`;
}

async function seedSearxng(providerSpecificData: Record<string, unknown>) {
  await providersDb.createProviderConnection({
    provider: "searxng-search",
    authType: "none",
    name: `searxng-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: null,
    isActive: true,
    testStatus: "active",
    providerSpecificData,
  });
}

function respondWith(status: number, body: unknown, seenUrls: string[] = []) {
  globalThis.fetch = async (url) => {
    seenUrls.push(String(url));
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    });
  };
}

const searxngBody = (usage: unknown) => ({
  results: [{ title: "Result", url: "https://example.com/r", content: "snippet" }],
  usage,
});

// The ledger append is fire-and-forget behind an async pricing lookup, with no
// promise exposed; yield event-loop turns (no wall-clock wait) until it lands.
async function ledgerRows(apiKeyId: string, expected: number) {
  for (let i = 0; i < 500; i++) {
    const rows = costLedger.listLedgerEntries(apiKeyId);
    if (rows.length >= expected) return rows;
    await nextTurn();
  }
  return costLedger.listLedgerEntries(apiKeyId);
}

// Drain pending fire-and-forget ledger writes before asserting that none landed.
async function settle() {
  for (let i = 0; i < 200; i++) await nextTurn();
}

function fetchDirect(
  providerId: string,
  url: string,
  providerSpecificData: Record<string, unknown> | undefined,
  apiKeyId?: string
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  timer.unref?.();
  return searchProxy.executeProviderFetch({
    config: SEARCH_PROVIDERS[providerId],
    url,
    init: { method: "POST" },
    controller,
    timer,
    query: "direct query",
    searchType: "web",
    maxResults: 5,
    startTime: Date.now(),
    proxy: null,
    proxyLevel: "direct",
    costContext: { apiKeyId, providerSpecificData },
    normalize: () => ({ results: [], totalResults: 0 }),
  });
}

test("opted-in operator baseUrl: reported cost is billed and lands in the ledger", async () => {
  await seedSearxng({ baseUrl: ADAPTER_BASE, trustReportedCost: true });
  const apiKeyId = nextApiKeyId();
  const seen: string[] = [];
  respondWith(
    200,
    searxngBody({ search_cost_usd: 0.25, request_id: "req-ok-1", queries_used: 3 }),
    seen
  );

  const { data, cached } = await executeWebSearch({
    query: "operator adapter query",
    provider: "searxng-search",
    apiKeyId,
  });

  assert.equal(cached, false);
  assert.ok(seen[0].startsWith(`${ADAPTER_BASE}/search?`));
  assert.equal(data.usage.search_cost_usd, 0.25);
  assert.equal(data.usage.queries_used, 3);
  assert.equal(data.usage.request_id, "req-ok-1");

  const rows = await ledgerRows(apiKeyId, 1);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].amountUsd, 0.25);
  assert.equal(rows[0].provider, "searxng-search");
  assert.equal(rows[0].model, "searxng-search/search");
  assert.equal(rows[0].requestId, "req-ok-1");
  assert.equal(rows[0].success, true);
  assert.equal(costRules.getCostSummary(apiKeyId).totalCostToday, 0.25);
});

test("caller provider_options.baseUrl never gets its reported cost trusted", async () => {
  // Opted in, but the operator never set a baseUrl: the caller names the host.
  await seedSearxng({ trustReportedCost: true });
  const apiKeyId = nextApiKeyId();
  const seen: string[] = [];
  respondWith(200, searxngBody({ search_cost_usd: 42, request_id: "req-caller" }), seen);

  const { data } = await executeWebSearch({
    query: "caller chosen host query",
    provider: "searxng-search",
    provider_options: { baseUrl: "http://127.0.0.1:9999/evil" },
    apiKeyId,
  });

  assert.ok(seen[0].startsWith("http://127.0.0.1:9999/evil/search?"));
  assert.equal(data.usage.search_cost_usd, SEARCH_PROVIDERS["searxng-search"].costPerQuery);
  assert.equal(data.usage.cost_source, undefined);
  await settle();
  assert.equal(costLedger.listLedgerEntries(apiKeyId).length, 0);
  assert.equal(costRules.getCostSummary(apiKeyId).totalCostToday, 0);
});

test("without the opt-in a reported cost is ignored and costPerQuery is billed", async () => {
  const apiKeyId = nextApiKeyId();
  respondWith(200, { results: [], usage: { search_cost_usd: 0.5, request_id: "req-no-opt" } });

  const result = await fetchDirect(
    "tavily-search",
    "https://api.tavily.com/search",
    undefined,
    apiKeyId
  );

  assert.equal(result.success, true);
  assert.deepEqual(result.data?.usage, {
    queries_used: 1,
    search_cost_usd: SEARCH_PROVIDERS["tavily-search"].costPerQuery,
  });
});

test("invalid reported values fall back to costPerQuery", async () => {
  const fallback = SEARCH_PROVIDERS["tavily-search"].costPerQuery;
  const trusted = { trustReportedCost: true };
  for (const usage of [
    { search_cost_usd: -1 },
    { search_cost_usd: 1000 },
    { search_cost_usd: "0.1" },
    { search_cost_usd: null },
    { search_cost_usd: 0.1, queries_used: 1.5 },
    {},
    "free",
  ]) {
    respondWith(200, { results: [], usage });
    const result = await fetchDirect("tavily-search", "https://api.tavily.com/search", trusted);
    assert.equal(result.data?.usage.search_cost_usd, fallback, JSON.stringify(usage));
    assert.equal(result.data?.usage.cost_source, undefined);
  }

  // A valid zero report is honored (the adapter measured a free call).
  respondWith(200, { results: [], usage: { search_cost_usd: 0 } });
  const zero = await fetchDirect("tavily-search", "https://api.tavily.com/search", trusted);
  assert.equal(zero.data?.usage.search_cost_usd, 0);
  assert.equal(zero.data?.usage.cost_source, "provider_reported");
});

test("a request id is charged once even when reported again", async () => {
  await seedSearxng({ baseUrl: ADAPTER_BASE, trustReportedCost: true });
  const apiKeyId = nextApiKeyId();
  respondWith(200, searxngBody({ search_cost_usd: 0.1, request_id: "req-dup" }));

  await executeWebSearch({ query: "dedupe query one", provider: "searxng-search", apiKeyId });
  await executeWebSearch({ query: "dedupe query two", provider: "searxng-search", apiKeyId });

  await settle();
  const rows = await ledgerRows(apiKeyId, 1);
  assert.equal(rows.length, 1);
  assert.equal(costRules.getCostSummary(apiKeyId).totalCostToday, 0.1);
});

test("a cache hit records no cost", async () => {
  await seedSearxng({ baseUrl: ADAPTER_BASE, trustReportedCost: true });
  const apiKeyId = nextApiKeyId();
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return Response.json(searxngBody({ search_cost_usd: 0.2, request_id: `req-cache-${calls}` }));
  };

  const first = await executeWebSearch({
    query: "cache hit query",
    provider: "searxng-search",
    apiKeyId,
  });
  const second = await executeWebSearch({
    query: "cache hit query",
    provider: "searxng-search",
    apiKeyId,
  });

  assert.equal(first.cached, false);
  assert.equal(second.cached, true);
  assert.equal(calls, 1);
  await settle();
  assert.equal((await ledgerRows(apiKeyId, 1)).length, 1);
  assert.equal(costRules.getCostSummary(apiKeyId).totalCostToday, 0.2);
});

test("an error response from a trusted endpoint still charges its reported cost", async () => {
  await seedSearxng({ baseUrl: ADAPTER_BASE, trustReportedCost: true });
  const apiKeyId = nextApiKeyId();
  respondWith(502, {
    error: "upstream model failed",
    usage: { search_cost_usd: 0.07, request_id: "req-err" },
  });

  await assert.rejects(
    executeWebSearch({ query: "failing adapter query", provider: "searxng-search", apiKeyId }),
    (err: Error & { statusCode?: number }) => err.statusCode === 502
  );

  const rows = await ledgerRows(apiKeyId, 1);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].amountUsd, 0.07);
  assert.equal(rows[0].requestId, "req-err");
  assert.equal(rows[0].success, false);
  assert.equal(costRules.getCostSummary(apiKeyId).totalCostToday, 0.07);
});

test("an error response without the opt-in charges nothing", async () => {
  await seedSearxng({ baseUrl: ADAPTER_BASE });
  const apiKeyId = nextApiKeyId();
  respondWith(502, { usage: { search_cost_usd: 0.07, request_id: "req-err-no-opt" } });

  await assert.rejects(
    executeWebSearch({ query: "failing untrusted query", provider: "searxng-search", apiKeyId })
  );

  await settle();
  assert.equal(costLedger.listLedgerEntries(apiKeyId).length, 0);
  assert.equal(costRules.getCostSummary(apiKeyId).totalCostToday, 0);
});

test("per-key daily/weekly USD quotas count reported and static search spend, chat excluded", async () => {
  await seedSearxng({ baseUrl: ADAPTER_BASE, trustReportedCost: true });
  await providersDb.createProviderConnection({
    provider: "tavily-search",
    authType: "apikey",
    name: "tavily-quota",
    apiKey: "tvly-quota-key",
    isActive: true,
    testStatus: "active",
  });
  const apiKeyId = nextApiKeyId();
  const otherKeyId = nextApiKeyId();
  const staticCost = SEARCH_PROVIDERS["tavily-search"].costPerQuery;

  globalThis.fetch = async (url) =>
    String(url).startsWith(ADAPTER_BASE)
      ? Response.json(searxngBody({ search_cost_usd: 0.3, request_id: "req-quota-1" }))
      : Response.json({ results: [] });

  await executeWebSearch({ query: "quota reported", provider: "searxng-search", apiKeyId });
  await executeWebSearch({ query: "quota static", provider: "tavily-search", apiKeyId });
  await executeWebSearch({
    query: "quota other key",
    provider: "tavily-search",
    apiKeyId: otherKeyId,
  });
  await ledgerRows(apiKeyId, 2);
  await ledgerRows(otherKeyId, 1);

  // A chat call's ledger row (chat spend is already counted from usage_history).
  costLedger.recordLedgerEntry({
    apiKeyId,
    provider: "openai",
    model: "gpt-4o",
    amountUsd: 5,
    serviceTier: "standard",
  });

  const status = await usageLimits.getApiKeyUsageLimitStatus({
    id: apiKeyId,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 0.3,
    weeklyUsageLimitUsd: 1,
  });
  const expected = Math.round((0.3 + staticCost) * 1e6) / 1e6;
  assert.equal(status.dailySpentUsd, expected);
  assert.equal(status.weeklySpentUsd, expected);
  assert.equal(status.dailyExceeded, true);
  assert.equal(status.weeklyExceeded, false);

  const other = await usageLimits.getApiKeyUsageLimitStatus({
    id: otherKeyId,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 1,
    weeklyUsageLimitUsd: 1,
  });
  assert.equal(other.dailySpentUsd, staticCost);
  assert.equal(other.weeklySpentUsd, staticCost);
});
