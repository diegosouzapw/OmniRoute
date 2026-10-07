/**
 * SSRF guard coverage for /v1/search's shared base-url resolution (GHSA-j7j4-g9qc-q69c).
 *
 * `provider_options.baseUrl` (and legacy `providerSpecificData.baseUrl`) is
 * client-controlled and flowed verbatim through `resolveSearchBaseUrl()` into
 * every search builder's server-side fetch target (searxng, ollama, …), with
 * no SSRF validation — while the sink (`searchProxy.ts`) is a plain `fetch()`.
 * The Firecrawl sibling was fixed in #10738; this shared resolver was missed.
 *
 * Guard mode is `block-metadata` (NOT public-only): the catalog's primary
 * searxng use case is a self-hosted instance on loopback/LAN, so private
 * hosts must keep working, while cloud-metadata endpoints (IMDS credential
 * theft — the worst pivot) are rejected.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/search-baseurl-ssrf-guard.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { resolveSearchBaseUrl } from "../../open-sse/handlers/search.ts";
import type { SearchProviderConfig } from "../../open-sse/config/searchRegistry.ts";

const config: SearchProviderConfig = {
  id: "searxng-search",
  name: "SearXNG",
  baseUrl: "http://127.0.0.1:8888",
  method: "GET",
  authType: "none",
  costPerQuery: 0,
} as SearchProviderConfig;

const base = {
  query: "test",
  searchType: "web",
  maxResults: 5,
};

const METADATA_URLS = [
  "http://169.254.169.254/latest/meta-data/iam/security-credentials/",
  "http://169.254.169.254/latest/meta-data/?x=/search", // reporter's suffix-bypass shape
  "http://metadata.google.internal/computeMetadata/v1/",
];

describe("resolveSearchBaseUrl — SSRF guard on client-controlled baseUrl (GHSA-j7j4)", () => {
  for (const malicious of METADATA_URLS) {
    it(`rejects providerOptions.baseUrl pointing at cloud metadata (${malicious})`, () => {
      assert.throws(() => {
        resolveSearchBaseUrl(config, { ...base, providerOptions: { baseUrl: malicious } });
      });
    });

    it(`rejects providerSpecificData.baseUrl pointing at cloud metadata (${malicious})`, () => {
      assert.throws(() => {
        resolveSearchBaseUrl(config, { ...base, providerSpecificData: { baseUrl: malicious } });
      });
    });
  }

  // CORRECTED for GHSA-3f8g-pfh9-j687. This case originally asserted the
  // loopback/LAN override via `providerOptions` — i.e. via TENANT input — which
  // is the SSRF-with-readback half of that advisory. The self-hosted use case
  // this test was written to protect is operator configuration, and it arrives
  // on `providerSpecificData` (search.ts reads it from the stored connection's
  // `credentials?.providerSpecificData`), so that is where it is asserted now.
  // Tenant-supplied overrides are refused outright — see
  // search-baseurl-client-override-3f8g.test.ts.
  it("still allows a self-hosted loopback/LAN override from OPERATOR config", () => {
    assert.equal(
      resolveSearchBaseUrl(config, {
        ...base,
        providerSpecificData: { baseUrl: "http://127.0.0.1:9999" },
      }),
      "http://127.0.0.1:9999"
    );
    assert.equal(
      resolveSearchBaseUrl(config, {
        ...base,
        providerSpecificData: { baseUrl: "http://10.0.0.5:8080" },
      }),
      "http://10.0.0.5:8080"
    );
  });

  it("leaves the catalog baseUrl untouched when no override is supplied", () => {
    assert.equal(resolveSearchBaseUrl(config, base), "http://127.0.0.1:8888");
  });
});
