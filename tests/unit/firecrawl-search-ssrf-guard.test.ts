/**
 * SSRF guard coverage for /v1/search's Firecrawl provider.
 *
 * `provider_options.baseUrl` (and the legacy top-level `baseUrl` field) is
 * client-controlled and was used verbatim to build the server-side fetch
 * target in `buildFirecrawlSearchRequest()`, with no SSRF validation. A
 * caller with a valid API key could redirect the search request to an
 * internal host (loopback, RFC1918, or a cloud metadata endpoint) and read
 * the response back through the normal search result shape.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/firecrawl-search-ssrf-guard.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { buildFirecrawlSearchRequest } from "../../open-sse/handlers/search/firecrawlSearch.ts";
import type { SearchProviderConfig } from "../../open-sse/config/searchRegistry.ts";

const config: SearchProviderConfig = {
  id: "firecrawl",
  name: "Firecrawl",
  baseUrl: "https://api.firecrawl.dev/v2/search",
  method: "POST",
  authType: "apikey",
  authHeader: "Authorization",
  costPerQuery: 0,
} as SearchProviderConfig;

const MALICIOUS_BASE_URLS = [
  "http://127.0.0.1:22",
  "http://169.254.169.254/latest/meta-data/", // AWS IMDS
  "http://10.0.0.5:6379",
  "http://localhost:20128/api/admin",
];

describe("buildFirecrawlSearchRequest — SSRF guard on client-controlled baseUrl", () => {
  for (const maliciousBase of MALICIOUS_BASE_URLS) {
    it(`rejects provider_options.baseUrl pointing at ${maliciousBase}`, () => {
      assert.throws(() => {
        buildFirecrawlSearchRequest(config, {
          query: "test",
          searchType: "web",
          maxResults: 5,
          providerSpecificData: { baseUrl: maliciousBase },
        });
      });
    });

    it(`rejects top-level baseUrl pointing at ${maliciousBase}`, () => {
      assert.throws(() => {
        buildFirecrawlSearchRequest(config, {
          query: "test",
          searchType: "web",
          maxResults: 5,
          baseUrl: maliciousBase,
        });
      });
    });
  }

  it("still allows the default public Firecrawl base URL", () => {
    const { url } = buildFirecrawlSearchRequest(config, {
      query: "test",
      searchType: "web",
      maxResults: 5,
    });
    assert.equal(url, config.baseUrl);
  });

  it("still allows an explicit public https baseUrl override", () => {
    const { url } = buildFirecrawlSearchRequest(config, {
      query: "test",
      searchType: "web",
      maxResults: 5,
      providerSpecificData: { baseUrl: "https://self-hosted.example.com" },
    });
    assert.equal(url, "https://self-hosted.example.com/v2/search");
  });
});
