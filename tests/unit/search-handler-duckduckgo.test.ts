import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-ddg-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");

// Real lite shape: single-quoted class='result-link', direct https href, <b> highlights.
const DDG_HTML = `<table>
  <tr><td><a rel="nofollow" href="https://platform.claude.com/docs" class='result-link'>Claude <b>API</b> Docs</a></td></tr>
  <tr><td class='result-snippet'>The <b>Claude</b> API reference.</td></tr>
  <tr><td><a rel="nofollow" href="https://www.anthropic.com" class='result-link'>Anthropic</a></td></tr>
  <tr><td class='result-snippet'>AI safety company.</td></tr>
</table>`;

test("handleSearch fulfills duckduckgo-free via the HTML scraping path (no API key)", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  globalThis.fetch = (async (url: string | URL) => {
    capturedUrl = String(url);
    return new Response(DDG_HTML, { status: 200, headers: { "content-type": "text/html" } });
  }) as typeof fetch;

  try {
    const result = await handleSearch({
      query: "claude api",
      provider: "duckduckgo-free",
      maxResults: 5,
      searchType: "web",
      credentials: {},
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(capturedUrl.includes("lite.duckduckgo.com"), "must hit the DDG lite endpoint");
    assert.equal(result.data.provider, "duckduckgo-free");
    assert.equal(result.data.usage.search_cost_usd, 0, "free provider has zero cost");
    assert.equal(result.data.results.length, 2);
    assert.equal(result.data.results[0].url, "https://platform.claude.com/docs");
    assert.equal(result.data.results[0].title, "Claude API Docs");
    assert.ok(result.data.results[0].snippet.includes("Claude API reference"));
    assert.equal(result.data.results[0].citation.provider, "duckduckgo-free");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch fails over to duckduckgo-free when the primary provider errors", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL) => {
    if (String(url).includes("lite.duckduckgo.com")) {
      return new Response(DDG_HTML, { status: 200, headers: { "content-type": "text/html" } });
    }
    // Primary (e.g. searxng on localhost) is unreachable.
    return new Response("bad gateway", { status: 502 });
  }) as typeof fetch;

  try {
    const result = await handleSearch({
      query: "claude api",
      provider: "searxng-search",
      maxResults: 5,
      searchType: "web",
      credentials: {},
      alternateProvider: "duckduckgo-free",
      alternateCredentials: {},
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(
      result.data.provider,
      "duckduckgo-free",
      "failover must land on the free last-resort provider"
    );
    assert.equal(result.data.results.length, 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
