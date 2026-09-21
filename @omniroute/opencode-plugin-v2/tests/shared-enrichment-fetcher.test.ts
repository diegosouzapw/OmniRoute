import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { defaultOmniRouteEnrichmentFetcher } from "../src/shared/enrich.js";

function stubFetch(handler: (url: string) => unknown): typeof fetch {
  return (async (url: unknown) => {
    const body = handler(String(url));
    return {
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => body,
    };
  }) as unknown as typeof fetch;
}

describe("defaultOmniRouteEnrichmentFetcher", () => {
  it("merges display names and pricing from the two catalog sources", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch((url) =>
      url.endsWith("/api/pricing/models")
        ? {
            cc: {
              id: "claude",
              alias: "cc",
              name: "Claude",
              models: [{ id: "m1", name: "Model One" }],
            },
          }
        : url.endsWith("/api/pricing")
          ? { cc: { m1: { input: 3, output: 15, cached: 0.3, cache_creation: 3.75 } } }
          : { perModel: [] }
    );
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      const namespaced = map.get("cc/m1");
      assert.ok(namespaced);
      assert.equal(namespaced?.name, "Model One");
      assert.equal(namespaced?.providerAlias, "cc");
      assert.equal(namespaced?.providerCanonical, "claude");
      assert.deepEqual(namespaced?.pricing, {
        input: 3,
        output: 15,
        cacheRead: 0.3,
        cacheWrite: 3.75,
      });
      assert.deepEqual(map.get("m1")?.pricing, namespaced?.pricing);
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("soft-fails per source: a dead pricing endpoint still returns catalog names", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.endsWith("/api/pricing")) throw new Error("boom");
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({
          cc: { id: "claude", models: [{ id: "m1", name: "Model One" }] },
        }),
      };
    }) as unknown as typeof fetch;
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      assert.equal(map.get("cc/m1")?.name, "Model One");
      assert.equal(map.get("cc/m1")?.pricing, undefined);
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("soft-fails per source: a dead catalog endpoint still returns pricing", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.endsWith("/api/pricing/models")) {
        return { ok: false, status: 500, statusText: "err", json: async () => ({}) };
      }
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({ cc: { m1: { input: 1, output: 2 } } }),
      };
    }) as unknown as typeof fetch;
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      assert.deepEqual(map.get("cc/m1")?.pricing, { input: 1, output: 2 });
      assert.equal(map.get("cc/m1")?.name, undefined);
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("attaches free-tier budgets from the third source", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch((url) =>
      url.endsWith("/api/pricing/models")
        ? { cc: { id: "claude", models: [{ id: "m1", name: "Model One" }] } }
        : url.endsWith("/api/pricing")
          ? {}
          : {
              perModel: [
                { provider: "cc", modelId: "m1", freeType: "monthly", monthlyTokens: 100 },
              ],
            }
    );
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      assert.equal(map.get("cc/m1")?.freeType, "monthly");
      assert.equal(map.get("cc/m1")?.monthlyTokens, 100);
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("returns an empty map without credentials instead of throwing", async () => {
    const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "", 1000);
    assert.equal(map.size, 0);
  });
});
