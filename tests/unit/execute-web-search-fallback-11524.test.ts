import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-execute-web-search-fallback-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { executeWebSearch } = await import("../../src/lib/search/executeWebSearch.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(
  provider: string,
  overrides: {
    apiKey?: string | null;
    authType?: string;
    providerSpecificData?: Record<string, unknown>;
  } = {}
) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey ?? "test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Regression test for #11524 — executeWebSearch must prefer a credentialed
// provider over duckduckgo-free when the initially selected provider has no credentials.
test("auto-selects credentialed provider before duckduckgo-free fallback (#11524)", async () => {
  await seedConnection("brave-search", { apiKey: "brave-key" });

  const originalFetch = globalThis.fetch;
  const fetchCalls: string[] = [];

  globalThis.fetch = async (url, _init = {}) => {
    const urlStr = String(url);
    fetchCalls.push(urlStr);

    if (urlStr.includes("api.search.brave.com")) {
      return new Response(
        JSON.stringify({
          web: {
            results: [
              {
                title: "Brave result",
                url: "https://example.com/brave",
                description: "Brave search result",
              },
            ],
            totalCount: 1,
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    throw new Error(`Unexpected fetch to ${urlStr} in auto-select path`);
  };

  try {
    const result = await executeWebSearch({ query: "latest omniroute roadmap" });

    assert.equal(
      result.data.provider,
      "brave-search",
      "must use the configured credentialed provider, not duckduckgo-free"
    );
    assert.ok(
      fetchCalls.some((url) => url.includes("api.search.brave.com")),
      "must call the Brave Search endpoint"
    );
    assert.ok(
      !fetchCalls.some((url) => url.includes("duckduckgo.com")),
      "duckduckgo-free must NOT be invoked when a credentialed provider is available (#11524)"
    );
    assert.equal(result.data.results.length, 1);
    assert.equal(result.data.results[0].title, "Brave result");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
