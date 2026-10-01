/**
 * Issue #13928 — search analytics cacheHitRate was always 0%.
 *
 * Root cause had two layers:
 *   1. A cache HIT on POST /v1/search never wrote a call_logs row at all
 *      (getOrCoalesce() short-circuits handleSearch(), the only place that
 *      called saveCallLog() for search requests) — fixed in
 *      src/app/api/v1/search/route.ts (logs its own row when `cached`).
 *   2. Even when a row existed, getSearchAggregateStats() identified
 *      "cached" rows via a `duration < 5ms` latency heuristic instead of
 *      the real `cache_source` column — fixed in src/lib/db/callLogStats.ts.
 *
 * This test covers layer 2 directly at the DB level with four real
 * saveCallLog() rows chosen so the OLD `duration < 5` heuristic and the NEW
 * `cache_source = 'semantic'` check disagree on the total `cached` count
 * (not just on which row counts, so a coincidental count match can't mask
 * the regression):
 *   - TWO genuinely fast UPSTREAM calls (duration 1-2ms, cache_source=
 *     'upstream') — the old heuristic would wrongly count both as cached.
 *   - a coalesced-but-slower CACHE HIT (duration 50ms, cache_source='semantic')
 *     — the old heuristic would wrongly exclude this.
 *   - a normal slow upstream MISS (duration 250ms, cache_source='upstream')
 *     — excluded by both the old and the new logic (sanity control).
 * Old heuristic: cached=2 (the two fast rows, wrong). New: cached=1 (only
 * the real hit, correct).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-search-cachehit-13928-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveCallLog } = await import("../../src/lib/usage/callLogs.ts");
const { getSearchAggregateStats } = await import("../../src/lib/db/callLogStats.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function todayStartIso(): string {
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  return todayStart.toISOString();
}

test("issue #13928: getSearchAggregateStats counts cache hits via cache_source, not latency", async () => {
  // Fast upstream miss: the OLD `duration < 5` heuristic would wrongly
  // count this as cached. cache_source is the real signal — it must not.
  await saveCallLog({
    id: "log-13928-fast-upstream",
    method: "POST",
    path: "/v1/search",
    status: 200,
    model: "duckduckgo-free",
    provider: "duckduckgo-free",
    duration: 1,
    requestType: "search",
    cacheSource: "upstream",
    tokens: {},
    requestBody: { query: "fast-upstream" },
    responseBody: { results_count: 1, cached: false },
  });

  // A second fast upstream call — same effect as above, so the old
  // heuristic's miscount (2) can't coincidentally match the correct
  // cache-hit count (1) below.
  await saveCallLog({
    id: "log-13928-fast-upstream-2",
    method: "POST",
    path: "/v1/search",
    status: 200,
    model: "duckduckgo-free",
    provider: "duckduckgo-free",
    duration: 2,
    requestType: "search",
    cacheSource: "upstream",
    tokens: {},
    requestBody: { query: "fast-upstream-2" },
    responseBody: { results_count: 1, cached: false },
  });

  // Coalesced cache hit that took longer than 5ms (e.g. joined an inflight
  // request): the OLD heuristic would wrongly exclude this from `cached`.
  await saveCallLog({
    id: "log-13928-slow-hit",
    method: "POST",
    path: "/v1/search",
    status: 200,
    model: "duckduckgo-free",
    provider: "duckduckgo-free",
    duration: 50,
    requestType: "search",
    cacheSource: "semantic",
    tokens: {},
    requestBody: { query: "slow-hit" },
    responseBody: { results_count: 1, cached: true },
  });

  // Normal slow upstream miss — excluded by both heuristics (sanity control).
  await saveCallLog({
    id: "log-13928-slow-miss",
    method: "POST",
    path: "/v1/search",
    status: 200,
    model: "duckduckgo-free",
    provider: "duckduckgo-free",
    duration: 250,
    requestType: "search",
    cacheSource: "upstream",
    tokens: {},
    requestBody: { query: "slow-miss" },
    responseBody: { results_count: 1, cached: false },
  });

  const stats = getSearchAggregateStats(todayStartIso());
  assert.equal(stats.total, 4);
  assert.equal(
    stats.cached,
    1,
    "only the cache_source='semantic' row must count as cached, regardless of duration"
  );
  const cacheHitRate = Math.round((stats.cached / stats.total) * 100);
  assert.equal(cacheHitRate, 25);
});
