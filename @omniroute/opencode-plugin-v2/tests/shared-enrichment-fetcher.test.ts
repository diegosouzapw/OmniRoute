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

  // Regression tests for issue #14966 (fetcher step 4):
  // /api/providers is now fetched to seed prefix→nodeName label entries for
  // openai-compatible-chat-* connections so the alias index can resolve the
  // correct provider display name for generic-adapter models.
  it("#14966: seeds generic-adapter prefix labels from /api/providers", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch((url) =>
      url.endsWith("/api/pricing/models")
        ? {}
        : url.endsWith("/api/pricing")
          ? {}
          : url.endsWith("/api/free-tier/summary")
            ? { perModel: [] }
            : url.endsWith("/api/providers")
              ? {
                  connections: [
                    {
                      id: "conn-1",
                      provider: "openai-compatible-chat-abc",
                      isActive: true,
                      providerSpecificData: { prefix: "ih", nodeName: "InferHub" },
                    },
                    {
                      id: "conn-2",
                      provider: "openai-compatible-chat-def",
                      isActive: true,
                      providerSpecificData: { prefix: "si", nodeName: "SiliconFlow" },
                    },
                    // First-party — must not produce a bare-prefix seed.
                    { id: "conn-3", provider: "claude", isActive: true },
                  ],
                }
              : {}
    );
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      const ih = map.get("ih");
      assert.ok(ih, "expected a seed entry for the 'ih' prefix");
      assert.equal(ih?.providerAlias, "ih");
      assert.equal(ih?.providerDisplayName, "InferHub");
      // No model-scoped fields on a provider-label seed entry.
      assert.equal(ih?.name, undefined);
      assert.equal(ih?.pricing, undefined);
      assert.equal(ih?.freeType, undefined);
      const si = map.get("si");
      assert.ok(si);
      assert.equal(si?.providerDisplayName, "SiliconFlow");
      // First-party providers must NOT get a bare-prefix seed via this path.
      assert.equal(map.get("claude"), undefined);
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("#14966: /api/providers failure is fail-open (catalog still returned)", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.endsWith("/api/providers")) throw new Error("network error");
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () =>
          href.endsWith("/api/pricing/models")
            ? { cc: { id: "claude", models: [{ id: "m1", name: "Model One" }] } }
            : {},
      };
    }) as unknown as typeof fetch;
    try {
      // Must not throw — /api/providers is best-effort.
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      assert.ok(map.has("cc/m1"), "catalog names must survive a /api/providers failure");
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});

describe("free-tier canonical fan-out", () => {
  const modelsBody = {
    cf: {
      id: "cloudflare-ai",
      alias: "cf",
      name: "Cloudflare",
      models: [{ id: "@cf/meta/llama-3.3-70b-instruct-fp8-fast", name: "Llama 3.3 70B" }],
    },
  };

  function fetchFor(perModel: unknown[]): typeof fetch {
    return (async (url: unknown) => {
      const href = String(url);
      const body = href.endsWith("/api/pricing/models")
        ? modelsBody
        : href.endsWith("/api/pricing")
          ? {}
          : { perModel };
      return { ok: true, status: 200, statusText: "OK", json: async () => body };
    }) as unknown as typeof fetch;
  }

  it("stamps the canonical freeType and budgets on every namespaced key of the provider", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = fetchFor([
      {
        provider: "cloudflare-ai",
        modelId: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
        freeType: "recurring-monthly",
        monthlyTokens: 1_000_000,
        creditTokens: 0,
      },
    ]);
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      const namespaced = map.get("cf/@cf/meta/llama-3.3-70b-instruct-fp8-fast");
      assert.equal(namespaced?.freeType, "recurring-monthly");
      assert.equal(namespaced?.monthlyTokens, 1_000_000);
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("stamps the alias-served key built from the canonical provider entry", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = fetchFor([
      {
        provider: "cloudflare-ai",
        modelId: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
        freeType: "recurring-monthly",
        monthlyTokens: 1_000_000,
      },
    ]);
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      assert.equal(
        map.get("cf/@cf/meta/llama-3.3-70b-instruct-fp8-fast")?.freeType,
        "recurring-monthly"
      );
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("leaves the homonym of another provider unstamped", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      const body = href.endsWith("/api/pricing/models")
        ? {
            cf: {
              id: "cloudflare-ai",
              alias: "cf",
              name: "Cloudflare",
              models: [{ id: "shared-model", name: "Shared" }],
            },
            xx: {
              id: "other-provider",
              alias: "xx",
              name: "Other",
              models: [{ id: "shared-model", name: "Shared" }],
            },
          }
        : href.endsWith("/api/pricing")
          ? {}
          : {
              perModel: [
                { provider: "cloudflare-ai", modelId: "shared-model", freeType: "keyless" },
              ],
            };
      return { ok: true, status: 200, statusText: "OK", json: async () => body };
    }) as unknown as typeof fetch;
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      assert.equal(map.get("cf/shared-model")?.freeType, "keyless");
      assert.equal(map.get("xx/shared-model")?.freeType, undefined);
      assert.equal(map.get("shared-model")?.providerCanonical, "cloudflare-ai");
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("stamps once when alias equals canonical", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      const body = href.endsWith("/api/pricing/models")
        ? {
            kiro: {
              id: "kiro",
              alias: "kiro",
              name: "Kiro",
              models: [{ id: "m1", name: "Model One" }],
            },
          }
        : href.endsWith("/api/pricing")
          ? {}
          : { perModel: [{ provider: "kiro", modelId: "m1", freeType: "keyless" }] };
      return { ok: true, status: 200, statusText: "OK", json: async () => body };
    }) as unknown as typeof fetch;
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      assert.equal(map.get("kiro/m1")?.freeType, "keyless");
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  it("ignores a free-tier line without provider", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = fetchFor([
      { provider: "", modelId: "@cf/meta/llama-3.3-70b-instruct-fp8-fast", freeType: "keyless" },
    ]);
    try {
      const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
      assert.equal(map.get("cf/@cf/meta/llama-3.3-70b-instruct-fp8-fast")?.freeType, undefined);
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});
