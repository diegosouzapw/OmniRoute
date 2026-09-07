import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parsePluginOptions, resolveTimeouts } from "../src/options.js";
import { publishCatalog } from "../src/catalog.js";
import type { CatalogDraft } from "@opencode-ai/plugin/v2/promise";
import type { ModelV2Info, ProviderV2Info } from "@opencode-ai/sdk/v2/types";

function fakeDraft(): CatalogDraft {
  const providers = new Map<string, ProviderV2Info>();
  const models = new Map<string, ModelV2Info>();
  return {
    provider: {
      list: () => [],
      get: (id: string) => providers.get(id) as never,
      update: (id: string, fn: (p: ProviderV2Info) => void) => {
        const p = (providers.get(id) ?? { id }) as ProviderV2Info;
        fn(p);
        providers.set(id, p);
      },
      remove: () => {},
    },
    model: {
      get: () => undefined,
      update: (pid: string, mid: string, fn: (m: ModelV2Info) => void) => {
        const k = pid + "/" + mid;
        const m = (models.get(k) ?? { id: mid, providerID: pid }) as ModelV2Info;
        fn(m);
        models.set(k, m);
      },
      remove: () => {},
      default: { get: () => undefined, set: () => {} },
    },
  } as CatalogDraft;
}

const BER = "https://gw.example.com";

describe("plugin-v2 P2 parity: per-endpoint timeouts", () => {
  it("timeoutMs default is 10s (v1 parity over the old 30s)", () => {
    const opts = parsePluginOptions({ baseURL: BER });
    assert.equal(opts.timeoutMs, 10000);
  });

  it("endpoint timeouts default to the global timeout", () => {
    const opts = parsePluginOptions({ baseURL: BER });
    assert.deepEqual(resolveTimeouts(opts), {
      models: 10000,
      combos: 10000,
      autoCombos: 5000,
      enrichment: 10000,
    });
  });

  it("endpoint overrides win over the global timeout", () => {
    const opts = parsePluginOptions({
      baseURL: BER,
      timeoutMs: 3000,
      timeouts: { models: 1111, combos: 2222, autoCombos: 3333, enrichment: 4444 },
    });
    assert.deepEqual(resolveTimeouts(opts), {
      models: 1111,
      combos: 2222,
      autoCombos: 3333,
      enrichment: 4444,
    });
  });

  it("publishCatalog forwards per-endpoint timeouts (slow models stub aborts at 20ms)", async () => {
    const seen: number[] = [];
    const t0 = Date.now();
    const slowModels = async (_base: string, _key: string, timeoutMs?: number) => {
      seen.push(timeoutMs ?? -1);
      await new Promise<void>((_resolve, reject) => {
        setTimeout(() => {
          reject(Object.assign(new Error("This operation was aborted"), { name: "AbortError" }));
        }, timeoutMs ?? 10000);
      });
      return [{ id: "m1" }];
    };
    const draft = fakeDraft();
    const origWarn = console.warn;
    console.warn = () => {};
    try {
      const res = await publishCatalog(
        draft,
        {
          providerId: "omniroute",
          baseURL: BER,
          apiKey: "k",
          // A per-endpoint value must win over the global one: the 20ms
          // models budget is what this test asserts, not the 10s fallback.
          timeoutMs: 10000,
          timeouts: { models: 20, combos: 10000 },
          modelCacheTtlMs: 300000,
          usableOnly: false,
        },
        { fetcher: slowModels, combosFetcher: async () => [] }
      );
      assert.deepEqual(res, { models: 0, combos: 0, autoCombos: 0 });
    } finally {
      console.warn = origWarn;
    }
    assert.deepEqual(seen, [20]);
    assert.ok(Date.now() - t0 < 2000, "slow fetcher must abort near 20ms, not hang");
  });

  it("logger option accepts logLevel plus startupDebug (default warn)", () => {
    assert.equal(parsePluginOptions({ baseURL: BER }).logLevel, undefined);
    assert.equal(parsePluginOptions({ baseURL: BER }).startupDebug, undefined);
    assert.equal(parsePluginOptions({ baseURL: BER, logLevel: "debug" }).logLevel, "debug");
    assert.equal(parsePluginOptions({ baseURL: BER, startupDebug: true }).startupDebug, true);
    assert.throws(() => parsePluginOptions({ baseURL: BER, logLevel: "verbose" }));
  });

  it("startupDebug silences the boot line at default, shows it with startupDebug", async () => {
    const plugin = (await import("../src/index.js")).default as unknown as {
      setup: (ctx: unknown) => Promise<void>;
    };
    async function bootLogLines(options: Record<string, unknown>): Promise<string[]> {
      const warns: string[] = [];
      const origWarn = console.warn;
      console.warn = (...args: unknown[]) => {
        warns.push(String(args[0]));
      };
      const ctx = {
        options,
        catalog: {
          transform: () => Promise.resolve({ dispose: async () => {} }),
        },
        integration: {
          transform: () => Promise.resolve({ dispose: async () => {} }),
        },
      };
      try {
        await plugin.setup(ctx);
      } finally {
        console.warn = origWarn;
      }
      return warns;
    }
    const quiet = await bootLogLines({
      baseURL: BER,
      providerId: "p2-quiet",
      apiKey: "k",
    });
    assert.ok(
      !quiet.some((line) => line.includes("init providerId=")),
      `boot line must stay silent by default, got: ${JSON.stringify(quiet)}`
    );
    const loud = await bootLogLines({
      baseURL: BER,
      providerId: "p2-loud",
      apiKey: "k",
      startupDebug: true,
    });
    assert.ok(
      loud.some((line) => line.includes("init providerId=p2-loud")),
      `boot line must show with startupDebug, got: ${JSON.stringify(loud)}`
    );
  });
});
