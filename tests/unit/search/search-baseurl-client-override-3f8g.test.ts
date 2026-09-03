/**
 * GHSA-3f8g-pfh9-j687 — a tenant-supplied `provider_options.baseUrl` redirected
 * the SaaS search builders, so the OPERATOR's search-provider API key was sent
 * to a tenant-chosen host (query string for google-pse/searchapi, header for
 * you.com/linkup/nimble/ollama).
 *
 * This is the same override the GHSA-j7j4-g9qc-q69c fix hardened — and that fix
 * only added a block-metadata check, which does nothing here: the attacker
 * points at their own PUBLIC host and collects the key. The j7j4 regression test
 * missed it because its fixture was `searxng-search`, the one keyless provider
 * where redirecting the base URL leaks no credential.
 *
 * The two override sources have different trust:
 *   - `providerSpecificData` comes from the stored provider connection
 *     (`credentials?.providerSpecificData`, search.ts:1510) — OPERATOR config.
 *     This is how an operator points at their self-hosted searxng, so it keeps
 *     working on loopback/LAN under the block-metadata policy.
 *   - `providerOptions` comes straight off the request body
 *     (`body.provider_options`, v1/search/route.ts:366) — TENANT input. It is
 *     refused outright: no provider needs a per-request caller-chosen fetch
 *     target, and honoring one is credential exfiltration for keyed providers
 *     and SSRF-with-readback for every provider.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/search/search-baseurl-client-override-3f8g.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { resolveSearchBaseUrl } from "../../../open-sse/handlers/search.ts";
import type { SearchProviderConfig } from "../../../open-sse/config/searchRegistry.ts";
import { SEARCH_PROVIDERS } from "../../../open-sse/config/searchRegistry.ts";

const base = { query: "test", searchType: "web", maxResults: 5 };

/** Every provider whose builder attaches an operator-held key. */
const KEYED_PROVIDER_IDS = Object.values(SEARCH_PROVIDERS)
  .filter((p) => p.authType === "apikey")
  .map((p) => p.id);

describe("resolveSearchBaseUrl — tenant-supplied baseUrl (GHSA-3f8g-pfh9-j687)", () => {
  it("covers every keyed provider in the registry, not one hand-picked fixture", () => {
    // The j7j4 test only exercised searxng. Assert the registry actually has
    // keyed providers so this suite cannot silently degrade to zero coverage.
    assert.ok(
      KEYED_PROVIDER_IDS.length >= 5,
      `expected keyed providers, got ${KEYED_PROVIDER_IDS.length}`
    );
  });

  for (const id of KEYED_PROVIDER_IDS) {
    it(`refuses a tenant baseUrl for the keyed provider ${id}`, () => {
      const config = SEARCH_PROVIDERS[id];
      assert.throws(
        () =>
          resolveSearchBaseUrl(config, {
            ...base,
            providerOptions: { baseUrl: "https://attacker.example" },
          }),
        `${id} honored a tenant baseUrl — the operator key would be sent there`
      );
    });
  }

  it("the opt-in flag is NEVER set on a provider that carries an operator key", () => {
    // The whole invariant in one assertion: if this ever pairs with authType
    // "apikey", a caller can redirect the operator's key again.
    for (const p of Object.values(SEARCH_PROVIDERS)) {
      if (p.allowClientBaseUrlOverride) {
        assert.equal(p.authType, "none", `${p.id} opts into a caller baseUrl while holding a key`);
      }
    }
  });

  it("refuses a caller baseUrl for keyless providers that did NOT opt in", () => {
    for (const id of ["context7", "duckduckgo-free"]) {
      const config = SEARCH_PROVIDERS[id];
      if (!config || config.allowClientBaseUrlOverride) continue;
      assert.throws(
        () =>
          resolveSearchBaseUrl(config, {
            ...base,
            providerOptions: { baseUrl: "https://attacker.example" },
          }),
        `${id} honored a caller baseUrl without opting in`
      );
    }
  });

  it("SearXNG keeps its documented self-hosted caller override, IMDS still blocked", () => {
    // Opted in: keyless, so no operator credential travels with the request.
    // Loopback/LAN is the point of a self-hosted instance (search-route.test.ts
    // covers the route-level flow); cloud metadata stays rejected.
    const config = SEARCH_PROVIDERS["searxng-search"];
    assert.equal(config.allowClientBaseUrlOverride, true);
    assert.equal(
      resolveSearchBaseUrl(config, {
        ...base,
        providerOptions: { baseUrl: "http://127.0.0.1:8888/search" },
      }),
      "http://127.0.0.1:8888/search"
    );
    assert.throws(() =>
      resolveSearchBaseUrl(config, {
        ...base,
        providerOptions: { baseUrl: "http://169.254.169.254/latest/meta-data/" },
      })
    );
  });

  it("keeps the operator-configured override working, including loopback/LAN", () => {
    const config = SEARCH_PROVIDERS["searxng-search"];
    assert.equal(
      resolveSearchBaseUrl(config, {
        ...base,
        providerSpecificData: { baseUrl: "http://127.0.0.1:8888/search" },
      }),
      "http://127.0.0.1:8888/search"
    );
    assert.equal(
      resolveSearchBaseUrl(config, {
        ...base,
        providerSpecificData: { baseUrl: "http://10.0.0.5:8888" },
      }),
      "http://10.0.0.5:8888"
    );
  });

  it("still blocks cloud metadata from the operator source (j7j4 must not regress)", () => {
    const config = SEARCH_PROVIDERS["searxng-search"];
    assert.throws(() =>
      resolveSearchBaseUrl(config, {
        ...base,
        providerSpecificData: { baseUrl: "http://169.254.169.254/latest/meta-data/" },
      })
    );
  });

  it("the operator source wins over a tenant one instead of the tenant shadowing it", () => {
    const config = SEARCH_PROVIDERS["searxng-search"];
    assert.equal(
      resolveSearchBaseUrl(config, {
        ...base,
        providerOptions: { baseUrl: "https://attacker.example" },
        providerSpecificData: { baseUrl: "http://127.0.0.1:8888" },
      }),
      "http://127.0.0.1:8888"
    );
  });

  it("falls back to the catalog baseUrl when neither source supplies one", () => {
    const config: SearchProviderConfig = {
      ...SEARCH_PROVIDERS["searxng-search"],
      baseUrl: "http://localhost:8888/search",
    };
    assert.equal(resolveSearchBaseUrl(config, base), "http://localhost:8888/search");
  });
});
