/**
 * Search stats must not surface "ghost" rows, and must not hide real traffic.
 *
 * Always hidden: rows with a NULL provider or the '-' sentinel.
 * Hidden only with SEARCH_STATS_HIDE_DELETED_CONNECTIONS on: a keyed provider whose
 * provider_connections row is gone (deleted connection). Off (the default) keeps
 * the historical stats, where every retained row with a provider id counts.
 * Kept either way: keyed providers with a live connection (directly or through a
 * registry credential fallback such as perplexity-search → perplexity) and
 * keyless providers (`authType: "none"` — duckduckgo-free, searxng-search,
 * anonymous context7), which are served without any provider_connections row.
 * Totals and per-provider rows use the same guard, so they always agree.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-search-ghost-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const mod = await import("../../src/lib/db/callLogStats.ts");
const { SEARCH_PROVIDERS, SEARCH_CREDENTIAL_FALLBACKS } =
  await import("../../open-sse/config/searchRegistry.ts");
const analyticsRoute = await import("../../src/app/api/v1/search/analytics/route.ts");

const KEYLESS_IDS = Object.values(SEARCH_PROVIDERS)
  .filter((provider) => provider.authType === "none")
  .map((provider) => provider.id);

let idSeq = 0;
function insertSearchLog(provider: string | null, fields: Record<string, unknown> = {}) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, duration,
        tokens_in, tokens_out, cache_source, request_type, detail_state, error_summary,
        request_summary, has_request_body, has_response_body, has_pipeline_details)
       VALUES (@id, @timestamp, 'POST', '/v1/search', @status, 'search', @provider, @duration,
        0, 0, 'upstream', 'search', 'none', NULL, @summary, 0, 0, 0)`
    )
    .run({
      id: `log-ghost-${++idSeq}`,
      timestamp: new Date().toISOString(),
      status: 200,
      duration: 100,
      summary: JSON.stringify({ query: `q-${idSeq}` }),
      provider,
      ...fields,
    });
}

function insertConnection(id: string, provider: string) {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO provider_connections (id, provider, created_at, updated_at) VALUES (?, ?, ?, ?)`
    )
    .run(id, provider, now, now);
}

test.before(() => {
  core.resetDbInstance();
  insertConnection("conn-ghost-brave", "brave-search");
  insertConnection("conn-ghost-perplexity-chat", "perplexity");

  insertSearchLog("brave-search", { duration: 50 });
  insertSearchLog("brave-search", { duration: 150, status: 502 });
  insertSearchLog("perplexity-search", { duration: 90 }); // live via credential fallback
  insertSearchLog("duckduckgo-free", { duration: 70 }); // keyless, no connection row
  insertSearchLog("duckduckgo-free", { duration: 30 });
  insertSearchLog("searxng-search", { duration: 40 }); // keyless, no connection row
  insertSearchLog("context7", { duration: 60 }); // anonymous tier, no connection row
  // Ghosts
  insertSearchLog("tavily-search", { duration: 80 }); // connection deleted
  insertSearchLog("-", { duration: 80 });
  insertSearchLog(null, { duration: 80 });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const FLAG = "SEARCH_STATS_HIDE_DELETED_CONNECTIONS";

function withFlag<T>(value: "true" | undefined, fn: () => T): T {
  const previous = process.env[FLAG];
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
  try {
    return fn();
  } finally {
    if (previous === undefined) delete process.env[FLAG];
    else process.env[FLAG] = previous;
  }
}

const LIVE_COUNTS: Record<string, number> = {
  "brave-search": 2,
  "duckduckgo-free": 2,
  "perplexity-search": 1,
  "searxng-search": 1,
  context7: 1,
};
// Flag off: the deleted tavily-search connection still counts (historical behavior).
const HISTORICAL_COUNTS: Record<string, number> = { ...LIVE_COUNTS, "tavily-search": 1 };

function todayStartIso(): string {
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  return todayStart.toISOString();
}

test("registry fixtures used here are real: keyless ids and the perplexity fallback", () => {
  for (const id of ["duckduckgo-free", "searxng-search", "context7"]) {
    assert.ok(KEYLESS_IDS.includes(id), `${id} is authType none in the search registry`);
  }
  for (const id of ["brave-search", "tavily-search", "perplexity-search"]) {
    assert.equal(SEARCH_PROVIDERS[id]?.authType, "apikey", `${id} is a keyed search provider`);
  }
  assert.equal(SEARCH_CREDENTIAL_FALLBACKS["perplexity-search"], "perplexity");
});

test("flag off (default): NULL and '-' rows are hidden, deleted-connection traffic still counts", () => {
  withFlag(undefined, () => {
    const stats = mod.getSearchProviderStats();
    assert.deepEqual(
      Object.fromEntries(stats.map((r) => [r.provider, r.requests])),
      HISTORICAL_COUNTS
    );
    assert.deepEqual(
      Object.fromEntries(mod.getSearchProviderCounts().map((r) => [r.provider, r.cnt])),
      HISTORICAL_COUNTS
    );
    const recent = mod.getRecentSearchLogs().map((r) => r.provider);
    assert.equal(recent.length, 8);
    assert.ok(
      recent.includes("tavily-search"),
      "deleted connection still listed with the flag off"
    );
    assert.ok(!recent.includes("-") && !recent.includes(null as unknown as string));
    const aggregate = mod.getSearchAggregateStats(todayStartIso());
    assert.equal(aggregate.total, 8);
    assert.equal(
      aggregate.total,
      mod.getSearchProviderCounts().reduce((sum, r) => sum + r.cnt, 0)
    );
  });
});

test("flag on: getSearchProviderStats keeps live + keyless providers and drops ghosts", () => {
  withFlag("true", () => {
    const rows = mod.getSearchProviderStats();
    const byProvider = Object.fromEntries(rows.map((r) => [r.provider, r]));
    assert.deepEqual(Object.fromEntries(rows.map((r) => [r.provider, r.requests])), LIVE_COUNTS);
    assert.equal(byProvider["brave-search"].avg_latency_ms, 100);
    assert.equal(byProvider["duckduckgo-free"].avg_latency_ms, 50);
  });
});

test("flag on: getSearchProviderCounts keeps live + keyless providers, ordered by count", () => {
  withFlag("true", () => {
    const rows = mod.getSearchProviderCounts();
    assert.deepEqual(Object.fromEntries(rows.map((r) => [r.provider, r.cnt])), LIVE_COUNTS);
    for (let i = 1; i < rows.length; i++) {
      assert.ok(rows[i - 1].cnt >= rows[i].cnt, "ordered by cnt desc");
    }
  });
});

test("flag on: getRecentSearchLogs keeps keyless traffic and drops ghost rows", () => {
  withFlag("true", () => {
    const providers = mod.getRecentSearchLogs().map((r) => r.provider);
    assert.equal(providers.length, 7);
    for (const ghost of ["tavily-search", "-", null]) {
      assert.ok(!providers.includes(ghost as string), `${String(ghost)} excluded`);
    }
    for (const live of Object.keys(LIVE_COUNTS)) {
      assert.ok(providers.includes(live), `${live} present`);
    }
  });
});

test("flag on: aggregate totals agree with the per-provider breakdown", () => {
  withFlag("true", () => {
    const stats = mod.getSearchAggregateStats(todayStartIso());
    const breakdownTotal = mod.getSearchProviderCounts().reduce((sum, r) => sum + r.cnt, 0);
    assert.equal(stats.total, breakdownTotal);
    assert.equal(stats.total, 7);
    assert.equal(stats.today, 7);
    assert.equal(stats.errors, 1);
  });
});

test("GET /api/v1/search/analytics: total equals the sum of byProvider counts in both modes", async () => {
  for (const mode of [undefined, "true"] as const) {
    const previous = process.env[FLAG];
    if (mode === undefined) delete process.env[FLAG];
    else process.env[FLAG] = mode;
    try {
      const response = await analyticsRoute.GET(
        new Request("http://localhost/api/v1/search/analytics")
      );
      assert.equal(response.status, 200);
      const body = (await response.json()) as {
        total: number;
        byProvider: Record<string, { count: number }>;
      };
      const byProviderTotal = Object.values(body.byProvider).reduce((sum, p) => sum + p.count, 0);
      assert.equal(body.total, byProviderTotal, `mode=${String(mode)}`);
      assert.equal(body.byProvider["duckduckgo-free"]?.count, 2);
      if (mode === "true") assert.equal(body.byProvider["tavily-search"], undefined);
      else assert.equal(body.byProvider["tavily-search"]?.count, 1);
    } finally {
      if (previous === undefined) delete process.env[FLAG];
      else process.env[FLAG] = previous;
    }
  }
});
