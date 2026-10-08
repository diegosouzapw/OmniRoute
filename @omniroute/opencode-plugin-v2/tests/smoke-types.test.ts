import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";

describe("stable contract smoke", () => {
  it("default export has string id and function setup", () => {
    assert.equal(typeof (plugin as { id: unknown }).id, "string");
    assert.equal(typeof (plugin as { setup: unknown }).setup, "function");
  });
  it("setup registers transforms against a stable ctx", async () => {
    const seen: string[] = [];
    const ctx = {
      options: { baseURL: "https://gw.example.com", providerId: "omniroute" },
      provider: {
        transform: async () => {
          seen.push("provider.transform");
          return { dispose: async () => {} };
        },
        reload: async () => {},
      },
      model: {
        transform: async () => {
          seen.push("model.transform");
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
      aisdk: {
        hook: async () => ({ dispose: async () => {} }),
      },
    };
    await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
    assert.deepEqual(seen, ["provider.transform", "integration.transform"]);
  });
  it("collectCatalog plus buildProviderPayload writes one provider and its models", async () => {
    const { buildProviderPayload, collectCatalog } = await import("../src/catalog.js");
    const collected = await collectCatalog(
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
    assert.equal(collected.counts.models, 1);
    const payload = buildProviderPayload(collected, {
      providerId: "omniroute",
      baseURL: "https://gw.example.com",
      apiKey: "k",
      timeoutMs: 1000,
      modelCacheTtlMs: 300000,
      usableOnly: false,
    });
    assert.equal((payload.info as unknown as { id: string }).id, "omniroute");
    assert.deepEqual(
      payload.models.map((m) => String((m as unknown as { id: string }).id)),
      ["m1"]
    );
  });
});
