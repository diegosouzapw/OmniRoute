import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression for #13945: getProviderCredentials() can return a truthy
// "diagnostic sentinel" object (e.g. { allExpired: true, expiredStatus,
// expiredCount } when every connection for a provider is in a terminal
// state) instead of null or real credentials. Non-chat callers such as
// src/lib/search/executeWebSearch.ts's resolveSearchCredentials() used to
// test the return value by plain truthiness ("if (creds) return creds;"),
// so the sentinel was treated as usable credentials and the caller never
// fell through to the configured credential fallback
// (SEARCH_CREDENTIAL_FALLBACKS).
//
// This test seeds "perplexity-search" with ONLY a terminal (banned)
// connection, and its documented fallback provider "perplexity" with a
// perfectly valid, active connection. A correct implementation must fall
// back to the valid "perplexity" credentials and complete the search.

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-executeWebSearch-credential-sentinel-13945-")
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

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("executeWebSearch falls back to the configured credential fallback when the primary provider's only connection is terminal (#13945)", async () => {
  await resetStorage();

  // Primary provider: perplexity-search has ONLY a terminal (banned)
  // connection -> getProviderCredentials("perplexity-search") returns the
  // { allExpired: true, ... } diagnostic sentinel, not null.
  await providersDb.createProviderConnection({
    provider: "perplexity-search",
    authType: "apikey",
    name: "perplexity-search-terminal",
    apiKey: "sk-terminal-perplexity-search",
    isActive: true,
    testStatus: "banned",
    providerSpecificData: {},
  });

  // Fallback provider (SEARCH_CREDENTIAL_FALLBACKS["perplexity-search"] =
  // "perplexity"): a perfectly valid, active connection.
  await providersDb.createProviderConnection({
    provider: "perplexity",
    authType: "apikey",
    name: "perplexity-fallback-valid",
    apiKey: "valid-fallback-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const originalFetch = globalThis.fetch;
  const fetchCalls: Array<{ url: string; authorization: string | null }> = [];

  globalThis.fetch = async (url: string | URL | Request, init: RequestInit = {}) => {
    const urlStr = String(url);
    const headers = new Headers(init?.headers || {});
    fetchCalls.push({ url: urlStr, authorization: headers.get("authorization") });

    if (urlStr.includes("api.perplexity.ai/search")) {
      return new Response(
        JSON.stringify({
          results: [{ title: "Perplexity result", url: "https://example.com/p", snippet: "ok" }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    throw new Error(`Unexpected fetch to ${urlStr}`);
  };

  try {
    // Must succeed by falling back to the valid "perplexity" credentials.
    // With the bug, getProviderCredentials("perplexity-search") returns the
    // truthy allExpired sentinel, resolveSearchCredentials() returns it
    // immediately (never tries the "perplexity" fallback), and the search
    // handler rejects it with "No credentials for search provider:
    // perplexity-search" (401) before ever calling fetch.
    const result = await executeWebSearch({ provider: "perplexity-search", query: "omniroute" });

    assert.equal(result.data.results.length, 1);
    assert.equal(result.data.results[0].title, "Perplexity result");
    assert.ok(
      fetchCalls.some((c) => c.authorization === "Bearer valid-fallback-key"),
      `expected a request using the fallback provider's valid API key; got calls: ${JSON.stringify(fetchCalls)}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
