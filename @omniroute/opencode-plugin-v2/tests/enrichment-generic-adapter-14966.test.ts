import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  applyEnrichment,
  defaultOmniRouteEnrichmentFetcher,
  lookupEnrichment,
  type OmniRouteEnrichmentMap,
} from "../src/shared/enrich.js";
import { mapRawModelToModelV2 } from "../src/shared/models-map.js";
import { isUsableRawModelId, usableProviderAliasSet } from "../src/shared/usable.js";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

function ok(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200 });
}

/**
 * #14966 — models routed through generic `openai-compatible-chat-*` adapter
 * connections (`providerSpecificData.prefix` like `ih`/`si`) must not be
 * attributed to whichever unrelated provider happens to sell a model with the
 * same bare id.
 */
describe("bare-key fallback keeps generic-adapter attribution isolated (#14966)", () => {
  const enrichment: OmniRouteEnrichmentMap = new Map([
    [
      "glm-5.3",
      {
        name: "GLM 5.3",
        providerAlias: "qwen-cloud",
        providerCanonical: "qwen-cloud",
        providerDisplayName: "Qwen-cloud",
        freeType: "recurring-credit",
        creditTokens: 1_000_000,
        pricing: { input: 0, output: 0 },
      },
    ],
  ]);

  it("preserves legacy bare-key attribution for an unregistered prefix", () => {
    const found = lookupEnrichment("dg/glm-5.3", enrichment, new Map());
    assert.equal(found, enrichment.get("glm-5.3"));
  });

  it("renders the model without the foreign provider label or free marker", () => {
    const model = mapRawModelToModelV2(
      { id: "ih/glm-5.3" },
      { providerId: "omniroute", baseURL: "https://gw.example.com" }
    );
    const withRegistryLabel = new Map(enrichment);
    withRegistryLabel.set("ih/__omniroute_node__", {
      providerAlias: "ih",
      providerDisplayName: "InferHub",
    });
    applyEnrichment(model, lookupEnrichment("ih/glm-5.3", withRegistryLabel, new Map()), {
      providerTag: true,
    });
    assert.ok(model.name.includes("InferHub"), `got: ${model.name}`);
    assert.ok(model.name.includes("GLM 5.3"), `got: ${model.name}`);
    assert.ok(!model.name.includes("Qwen-cloud"), `got: ${model.name}`);
    assert.ok(!model.name.includes("[Free]"), `got: ${model.name}`);
    assert.ok(!model.name.includes("1M"), `got: ${model.name}`);
  });

  it("direct and canonical-alias hits keep their full entry", () => {
    const found = lookupEnrichment("cc/model-x", enrichment, new Map());
    assert.equal(found, undefined, "no cc entry in this fixture");
    const withAlias: OmniRouteEnrichmentMap = new Map([
      [
        "cc/model-x",
        {
          name: "Model X",
          providerAlias: "cc",
          providerCanonical: "claude",
          providerDisplayName: "Claude",
        },
      ],
      [
        "model-x",
        {
          name: "Model X",
          providerAlias: "cc",
          providerCanonical: "claude",
          providerDisplayName: "Claude",
        },
      ],
    ]);
    const direct = lookupEnrichment("cc/model-x", withAlias, new Map());
    assert.equal(direct?.providerDisplayName, "Claude");
    const canonical = lookupEnrichment("claude/model-x", withAlias, buildAliasMap(withAlias));
    assert.equal(canonical?.providerDisplayName, "Claude");
  });
});

function buildAliasMap(enrichment: OmniRouteEnrichmentMap) {
  const out = new Map<string, string>();
  for (const entry of enrichment.values()) {
    const alias = entry.providerAlias ?? "";
    const canonical = entry.providerCanonical ?? "";
    if (alias && canonical && alias !== canonical && !out.has(canonical)) out.set(canonical, alias);
  }
  return out;
}

describe("generic-adapter prefixes get their registry label (#14966)", () => {
  it("labels ih/ models with the connection's nodeName from /api/providers", async () => {
    globalThis.fetch = (async (href: string | URL | Request) => {
      const url = String(href);
      if (url.includes("/api/pricing/models")) return ok({ providers: {} });
      if (url.includes("/api/pricing")) return ok({});
      if (url.includes("/api/free-tier/summary")) return ok({ perModel: [] });
      if (url.includes("/api/providers"))
        return ok({
          connections: [
            {
              id: "conn-1",
              provider: "openai-compatible-chat-abc123",
              providerSpecificData: { prefix: "ih", nodeName: "InferHub" },
            },
          ],
        });
      return ok({});
    }) as unknown as typeof fetch;

    const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
    const found = lookupEnrichment("ih/glm-5.3", map, new Map());
    assert.equal(found?.providerAlias, "ih");
    assert.equal(found?.providerDisplayName, "InferHub");

    const model = mapRawModelToModelV2(
      { id: "ih/glm-5.3" },
      { providerId: "omniroute", baseURL: "https://gw.example.com" }
    );
    applyEnrichment(model, found, { providerTag: true });
    assert.ok(model.name.includes("InferHub"), `got: ${model.name}`);
  });

  it("keeps active generic-adapter models with usableOnly, but drops disabled ones", async () => {
    globalThis.fetch = (async (href: string | URL | Request) => {
      const url = String(href);
      if (url.includes("/api/providers")) {
        return ok({
          connections: [
            {
              provider: "openai-compatible-chat-abc123",
              isActive: true,
              providerSpecificData: { prefix: "ih", nodeName: "InferHub" },
            },
          ],
        });
      }
      if (url.includes("/api/free-tier/summary")) return ok({ perModel: [] });
      return ok({});
    }) as typeof fetch;
    const enrichment = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k");
    const active = usableProviderAliasSet(
      [{ id: "conn-1", provider: "openai-compatible-chat-abc123", isActive: true }],
      enrichment
    );
    assert.equal(isUsableRawModelId("ih/glm-5.3", active), true);
    const disabled = usableProviderAliasSet(
      [{ id: "conn-1", provider: "openai-compatible-chat-abc123", isActive: false }],
      enrichment
    );
    assert.equal(isUsableRawModelId("ih/glm-5.3", disabled), false);
  });

  it("does not treat an adapter label as recovered pricing after a catalog failure", async () => {
    globalThis.fetch = (async (href: string | URL | Request) => {
      const url = String(href);
      if (url.includes("/api/pricing/models")) return new Response("down", { status: 503 });
      if (url.includes("/api/providers")) {
        return ok({
          connections: [
            {
              provider: "openai-compatible-chat-abc123",
              providerSpecificData: { prefix: "ih", nodeName: "InferHub" },
            },
          ],
        });
      }
      return ok({});
    }) as typeof fetch;
    await assert.rejects(
      defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k"),
      /enrichment catalog source failed/
    );
  });

  it("a failed registry fetch is fail-open: catalog unaffected, no labels", async () => {
    globalThis.fetch = (async (href: string | URL | Request) => {
      const url = String(href);
      if (url.includes("/api/pricing/models")) return ok({ providers: {} });
      if (url.includes("/api/pricing")) return ok({});
      if (url.includes("/api/free-tier/summary")) return ok({ perModel: [] });
      if (url.includes("/api/providers")) return new Response("nope", { status: 403 });
      return ok({});
    }) as unknown as typeof fetch;

    const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
    assert.ok(map, "the overlay still ships");
    assert.equal(lookupEnrichment("ih/glm-5.3", map, new Map()), undefined);
  });

  it("a generic-adapter label wins over the foreign bare-key metadata", async () => {
    globalThis.fetch = (async (href: string | URL | Request) => {
      const url = String(href);
      if (url.includes("/api/pricing/models"))
        return ok({
          providers: {
            "qwen-cloud": {
              id: "qwen-cloud",
              alias: "qwen-cloud",
              name: "Qwen-cloud",
              models: [{ id: "glm-5.3", name: "GLM 5.3" }],
            },
          },
        });
      if (url.includes("/api/pricing")) return ok({});
      if (url.includes("/api/free-tier/summary")) return ok({ perModel: [] });
      if (url.includes("/api/providers"))
        return ok({
          connections: [
            {
              id: "conn-1",
              provider: "openai-compatible-chat-abc123",
              providerSpecificData: { prefix: "ih", nodeName: "InferHub" },
            },
          ],
        });
      return ok({});
    }) as unknown as typeof fetch;

    const map = await defaultOmniRouteEnrichmentFetcher("https://gw.example.com", "k", 1000);
    const found = lookupEnrichment("ih/glm-5.3", map, new Map());
    assert.equal(found?.providerDisplayName, "InferHub");
    assert.equal(found?.name, "GLM 5.3", "model-scoped display name remains useful");
    assert.equal(found?.creditTokens, undefined);
  });
});
