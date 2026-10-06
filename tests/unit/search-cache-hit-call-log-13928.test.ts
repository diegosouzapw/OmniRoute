/**
 * Issue #13928 — a cache-hit POST /v1/search response never wrote a
 * call_logs row, so search analytics cacheHitRate was always 0%.
 *
 * Root cause (confirmed by reading the real source):
 *   - open-sse/services/searchCache.ts::getOrCoalesce() returns the cached
 *     entry directly on a hit and never invokes the passed-in fetch
 *     function.
 *   - src/app/api/v1/search/route.ts passed the ENTIRE search execution
 *     (handleSearch(), the only place that calls saveCallLog() for search
 *     requests — open-sse/handlers/search.ts) as that fetch function.
 *   - route.ts itself never called saveCallLog() on its own.
 *   - So a cache HIT produced zero call_logs rows, regardless of any SQL
 *     fix on the read side.
 *
 * This test drives the real POST handler twice with an identical body
 * (miss then hit) and asserts BOTH requests produce a call_logs row for
 * '/v1/search', with the second one carrying cache_source='semantic'.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-search-cachehit-13928-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("issue #13928: a cache-hit /v1/search response logs its own call_logs row", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;

  const liteHtml = `<html><body>
    <a href="https://example.com/cache-hit-result" class='result-link'>Cache hit fixture result</a>
    <td class='result-snippet'>Fixture snippet</td>
  </body></html>`;

  globalThis.fetch = async () => {
    fetchCalls++;
    return new Response(liteHtml, { status: 200, headers: { "content-type": "text/html" } });
  };

  // No `provider` — mirrors PR #11097's contract: zero-credential /v1/search
  // auto-promotes the fallback-only duckduckgo-free provider. An explicit
  // `provider: "duckduckgo-free"` would instead route through
  // getProviderCredentialsWithQuotaPreflight()'s live-network preflight.
  const makeRequest = () =>
    new Request("http://localhost/api/v1/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "issue 13928 cache hit repro",
        search_type: "web",
      }),
    });

  try {
    const missResponse = await searchRoute.POST(makeRequest());
    const missBody = (await missResponse.json()) as { cached: boolean };
    assert.equal(missResponse.status, 200);
    assert.equal(missBody.cached, false, "first identical request must be a cache miss");

    const hitResponse = await searchRoute.POST(makeRequest());
    const hitBody = (await hitResponse.json()) as { cached: boolean };
    assert.equal(hitResponse.status, 200);
    assert.equal(hitBody.cached, true, "second identical request must be a cache hit");

    // handleSearch() (and therefore the upstream fetch) must run exactly
    // once — the hit must be served from cache, not by re-fetching.
    assert.equal(fetchCalls, 1, "cache hit must not re-invoke the upstream provider");

    const drained = await waitForCallLogSaves(15_000);
    assert.ok(drained, "call log saves must drain before the assertions below");

    const rows = core
      .getDbInstance()
      .prepare(
        `SELECT status, cache_source FROM call_logs
         WHERE path = '/v1/search' AND provider = 'duckduckgo-free'
         ORDER BY timestamp ASC`
      )
      .all() as Array<{ status: number; cache_source: string }>;

    assert.equal(
      rows.length,
      2,
      "expected one call_logs row per client-facing request (1 miss + 1 hit), " +
        `but got ${rows.length} — the cache-hit request never reached any code ` +
        "path that calls saveCallLog()."
    );
    assert.equal(rows[0].cache_source, "upstream", "the miss row must be cache_source=upstream");
    assert.equal(rows[1].cache_source, "semantic", "the hit row must be cache_source=semantic");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
