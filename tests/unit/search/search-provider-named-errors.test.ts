import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-named-errors-"));

const { handleSearch } = await import("../../../open-sse/handlers/search.ts");
const { formatSearchProviderFailure } = await import(
  "../../../open-sse/handlers/search/providerFailure.ts"
);

test("formatSearchProviderFailure names the provider and sanitized Node cause", () => {
  const err = new TypeError("fetch failed");
  (err as Error & { cause?: { code: string; address: string } }).cause = {
    code: "ENETUNREACH",
    address: "203.0.113.10",
  };

  const result = formatSearchProviderFailure("serper-search", err, false);

  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(
    result.error,
    "Search provider serper-search error: fetch failed (cause: ENETUNREACH)"
  );
  assert.equal(result.error.includes("203.0.113"), false);
});

test("formatSearchProviderFailure omits non-Node cause codes", () => {
  const err = new TypeError("fetch failed");
  (err as Error & { cause?: { code: string } }).cause = { code: "not-a-node-code" };

  const result = formatSearchProviderFailure("brave-search", err, false);

  assert.equal(result.status, 502);
  assert.equal(result.error, "Search provider brave-search error: fetch failed");
});

test("handleSearch names the provider and sanitized cause on fetch failed 502", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    const err = new TypeError("fetch failed");
    (err as Error & { cause?: { code: string; address: string } }).cause = {
      code: "ENETUNREACH",
      address: "203.0.113.10",
    };
    throw err;
  };

  try {
    const result = await handleSearch({
      query: "named provider 502",
      provider: "serper-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.equal(
      result.error,
      "Search provider serper-search error: fetch failed (cause: ENETUNREACH)"
    );
    assert.equal(String(result.error).includes("203.0.113"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
