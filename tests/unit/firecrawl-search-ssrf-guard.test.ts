/**
 * SSRF guard coverage for /v1/search's Firecrawl provider.
 *
 * `provider_options.baseUrl` (and the legacy top-level `baseUrl` field) is
 * client-controlled and flows into the server-side fetch target built by
 * `buildFirecrawlSearchRequest()`. Policy (aligned with `resolveSearchBaseUrl`
 * in search.ts and the GHSA-j7j4-g9qc-q69c fix): private/LAN hosts are ALLOWED
 * — self-hosted Firecrawl on loopback/LAN is a supported topology — while
 * cloud-metadata endpoints (the SSRF→IAM-credential pivot) are always rejected.
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

const SELF_HOSTED_BASE_URLS = [
  "http://127.0.0.1:3002",
  "http://192.168.105.98:3002",
  "http://10.0.0.5:3002",
  "http://localhost:3002",
];

const METADATA_BASE_URLS = [
  "http://169.254.169.254/latest/meta-data/", // AWS IMDS
  "http://metadata.google.internal/computeMetadata/v1/",
];

describe("buildFirecrawlSearchRequest — SSRF guard on client-controlled baseUrl", () => {
  for (const selfHostedBase of SELF_HOSTED_BASE_URLS) {
    it(`allows provider_options.baseUrl pointing at self-hosted ${selfHostedBase}`, () => {
      const { url } = buildFirecrawlSearchRequest(config, {
        query: "test",
        searchType: "web",
        maxResults: 5,
        providerSpecificData: { baseUrl: selfHostedBase },
      });
      assert.equal(url, `${selfHostedBase.replace(/\/+$/, "")}/v2/search`);
    });

    it(`allows top-level baseUrl pointing at self-hosted ${selfHostedBase}`, () => {
      const { url } = buildFirecrawlSearchRequest(config, {
        query: "test",
        searchType: "web",
        maxResults: 5,
        baseUrl: selfHostedBase,
      });
      assert.equal(url, `${selfHostedBase.replace(/\/+$/, "")}/v2/search`);
    });
  }

  for (const metadataBase of METADATA_BASE_URLS) {
    it(`rejects provider_options.baseUrl pointing at ${metadataBase}`, () => {
      assert.throws(() => {
        buildFirecrawlSearchRequest(config, {
          query: "test",
          searchType: "web",
          maxResults: 5,
          providerSpecificData: { baseUrl: metadataBase },
        });
      });
    });

    it(`rejects top-level baseUrl pointing at ${metadataBase}`, () => {
      assert.throws(() => {
        buildFirecrawlSearchRequest(config, {
          query: "test",
          searchType: "web",
          maxResults: 5,
          baseUrl: metadataBase,
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
