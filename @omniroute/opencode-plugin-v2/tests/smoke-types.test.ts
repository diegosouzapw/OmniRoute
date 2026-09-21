import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { CatalogDraft, PluginContext } from "@opencode-ai/plugin/v2/promise";
import type { ModelV2Info, ProviderV2Info } from "@opencode-ai/sdk/v2/types";
import plugin from "../src/index.js";

describe("v2 contract smoke", () => {
  it("default export has string id and function setup", () => {
    assert.equal(typeof (plugin as { id: unknown }).id, "string");
    assert.equal(typeof (plugin as { setup: unknown }).setup, "function");
  });
  it("setup registers transforms against a structurally-real ctx", async () => {
    const seen: string[] = [];
    const ctx = {
      options: { baseURL: "https://gw.example.com", providerId: "omniroute" },
      catalog: {
        transform: async () => {
          seen.push("catalog.transform");
          return { dispose: async () => {} };
        },
        reload: async () => {},
      },
      integration: {
        transform: async () => {
          seen.push("integration.transform");
          return { dispose: async () => {} };
        },
        reload: async () => {},
        connection: { active: async () => undefined, resolve: async () => undefined },
      },
      agent: { transform: async () => ({ dispose: async () => {} }), reload: async () => {} },
      command: { transform: async () => ({ dispose: async () => {} }), reload: async () => {} },
      reference: { transform: async () => ({ dispose: async () => {} }), reload: async () => {} },
      skill: { transform: async () => ({ dispose: async () => {} }), reload: async () => {} },
      aisdk: {
        sdk: async () => ({ dispose: async () => {} }),
        language: async () => ({ dispose: async () => {} }),
      },
      plugin: { add: async () => {}, remove: async () => {} },
    } satisfies PluginContext;
    await (plugin as { setup: (c: PluginContext) => Promise<void> }).setup(ctx);
    assert.deepEqual(seen, ["catalog.transform", "integration.transform"]);
  });
  it("publishCatalog writes into a real CatalogDraft without proxy breakage", async () => {
    const { publishCatalog } = await import("../src/catalog.js");
    const written: { provider?: string; models: string[] } = { models: [] };
    const draft: CatalogDraft = {
      provider: {
        list: () => [],
        get: () => undefined,
        update: (id: string, fn: (p: ProviderV2Info) => void) => {
          written.provider = id;
          const p = {
            id,
            name: "",
            api: { type: "aisdk", package: "" },
            request: { headers: {}, body: {} },
          } as ProviderV2Info;
          fn(p);
        },
        remove: () => {},
      },
      model: {
        get: () => undefined,
        update: (providerID: string, modelID: string, fn: (d: ModelV2Info) => void) => {
          written.models.push(providerID + "/" + modelID);
          const d = { id: modelID, providerID } as ModelV2Info;
          fn(d);
        },
        remove: () => {},
        default: { get: () => undefined, set: () => {} },
      },
    };
    const res = await publishCatalog(
      draft,
      {
        providerId: "omniroute",
        baseURL: "https://gw.example.com",
        apiKey: "k",
        timeoutMs: 1000,
        modelCacheTtlMs: 300000,
        usableOnly: false,
      },
      {
        models: async () => [{ id: "m1", context_length: 1000 }],
        combos: async () => [],
      }
    );
    assert.equal(res.models, 1);
    assert.equal(written.provider, "omniroute");
    assert.deepEqual(written.models, ["omniroute/m1"]);
  });
});
