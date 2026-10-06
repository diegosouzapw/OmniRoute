import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mapRawModelToModelV2, resolveApiBlockV2 } from "../src/shared/models-map.js";
import { parsePluginOptions } from "../src/options.js";
import { publishCatalog } from "../src/catalog.js";
type BetaDraft = {
  provider: {
    list?: () => unknown[];
    get?: (id: string) => unknown;
    update: (id: string, fn: (p: Record<string, any>) => void) => void;
    remove?: () => void;
  };
  model: {
    get?: (...a: string[]) => unknown;
    update: (pid: string, mid: string, fn: (m: Record<string, any>) => void) => void;
    remove?: () => void;
    default?: { get: () => undefined; set: () => void };
  };
};

const GW = "https://gw.example.com";
const PREFIXES = ["cc", "claude", "anthropic", "kiro", "kr"];

describe("deprecated anthropicPrefixes", () => {
  it("routes a default prefix id to anthropic with a deprecation warning", async () => {
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const out = resolveApiBlockV2("cc/claude-x", GW, {
        allowAnthropic: true,
        anthropicPrefixes: [...PREFIXES],
      });
      assert.equal(out.id, "anthropic");
    } finally {
      console.warn = origWarn;
    }
    assert.ok(warns.some((w) => w.includes("deprecated") && w.includes("anthropicModels")));
  });

  it("warns only once per process for the same prefix list", async () => {
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      resolveApiBlockV2("cc/a", GW, { allowAnthropic: true, anthropicPrefixes: ["cc"] });
      resolveApiBlockV2("cc/b", GW, { allowAnthropic: true, anthropicPrefixes: ["cc"] });
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warns.filter((w) => w.includes("deprecated")).length, 1);
  });

  it("documents the known claude/openai-compatible-model edge: prefix wins", async () => {
    // v1 parity keeps prefix matching, so a model literally named
    // `claude/openai-compatible-model` routes to anthropic when its prefix
    // is listed. Documented (not silently fixed): operators hitting this
    // rare name should move the id to the allowlist instead.
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const out = resolveApiBlockV2("claude/openai-compatible-model", GW, {
        allowAnthropic: true,
        anthropicPrefixes: [...PREFIXES],
        anthropicModels: ["anthropic/claude-x"],
      });
      assert.equal(out.id, "anthropic");
      const mapped = mapRawModelToModelV2(
        { id: "claude/openai-compatible-model" },
        {
          providerId: "omniroute",
          baseURL: GW,
          apiFormat: {
            allowAnthropic: true,
            anthropicPrefixes: [...PREFIXES],
            anthropicModels: ["anthropic/claude-x"],
          },
        }
      );
      assert.equal(mapped.api.id, "anthropic");
    } finally {
      console.warn = origWarn;
    }
  });

  it("prefix OR allowlist routes to anthropic; neither means openai-compatible", async () => {
    const origWarn = console.warn;
    console.warn = () => {};
    try {
      assert.equal(
        resolveApiBlockV2("kiro/m", GW, { allowAnthropic: true, anthropicPrefixes: ["kiro"] }).id,
        "anthropic"
      );
      assert.equal(
        resolveApiBlockV2("anthropic/claude-x", GW, {
          allowAnthropic: true,
          anthropicModels: ["anthropic/claude-x"],
        }).id,
        "anthropic"
      );
      assert.equal(resolveApiBlockV2("gpt-x", GW).id, "openai-compatible");
    } finally {
      console.warn = origWarn;
    }
  });

  it("copied v1 config routes anthropic and warns deprecation through publishCatalog", async () => {
    const providers = new Map<string, Record<string, any>>();
    const models = new Map<string, Record<string, any>>();
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const parsed = parsePluginOptions({
        baseURL: GW,
        apiFormat: { allowAnthropic: true, anthropicPrefixes: [...PREFIXES, "v1copy"] },
      });
      const draft = {
        provider: {
          list: () => [],
          get: (id: string) => providers.get(id) as never,
          update: (id: string, fn: (p: Record<string, any>) => void) => {
            const p = (providers.get(id) ?? { id }) as Record<string, any>;
            fn(p);
            providers.set(id, p);
          },
          remove: () => {},
        },
        model: {
          get: () => undefined,
          update: (pid: string, mid: string, fn: (m: Record<string, any>) => void) => {
            const k = pid + "/" + mid;
            const m = (models.get(k) ?? { id: mid, providerID: pid }) as Record<string, any>;
            fn(m);
            models.set(k, m);
          },
          remove: () => {},
          default: { get: () => undefined, set: () => {} },
        },
      };
      const { collectCatalog, buildProviderPayload } = await import("../src/catalog.js");
      const collected = await collectCatalog(
        {
          providerId: "omniroute",
          baseURL: GW,
          apiKey: "k",
          timeoutMs: 1000,
          modelCacheTtlMs: 300000,
          usableOnly: false,
          apiFormat: parsed.apiFormat,
        },
        {
          fetcher: async () => [{ id: "cc/claude-x" }],
          combosFetcher: async () => [],
          enrichmentFetcher: async () => new Map(),
        }
      );
      assert.deepEqual(collected.counts, { models: 1, combos: 0, autoCombos: 0 });
      const payload = buildProviderPayload(collected, {
        providerId: "omniroute",
        baseURL: GW,
        apiKey: "k",
        timeoutMs: 1000,
        modelCacheTtlMs: 300000,
        usableOnly: false,
      });
      const m = payload.models.find((x) => String((x as unknown as { id: string }).id) === "cc/claude-x") as unknown as Record<string, any>;
      assert.ok(m);
      assert.equal(m?.package, "@opencode/ai/providers/anthropic");
    } finally {
      console.warn = origWarn;
    }
    assert.ok(warns.some((w) => w.includes("deprecated") && w.includes("anthropicModels")));
  });
});
