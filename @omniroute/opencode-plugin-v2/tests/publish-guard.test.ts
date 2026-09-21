import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import plugin from "../src/index.js";

// Guard around `publishCatalog` in the catalog transform: fetcher-level
// fail-open covers fetch rejections, but a mapper throw or a host throw in
// `draft.update` would reject the transform callback (unhandled rejection).
// The guard must warn + resolve instead.
describe("plugin-v2 publish guard (mapper/draft throws)", () => {
  function isolateDisk(): () => void {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-guard-"));
    const prev = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    return () => {
      if (prev === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prev;
    };
  }
  function setupCtx(): {
    catalogCallbacks: Array<(draft: unknown) => Promise<void>>;
    ctx: Record<string, unknown>;
  } {
    const catalogCallbacks: Array<(draft: unknown) => Promise<void>> = [];
    const ctx = {
      options: { baseURL: "https://gw.example.com", providerId: "omniroute", apiKey: "k" },
      catalog: {
        transform: (cb: (draft: unknown) => Promise<void>) => {
          catalogCallbacks.push(cb);
          return Promise.resolve({ dispose: async () => {} });
        },
      },
      integration: {
        transform: () => Promise.resolve({ dispose: async () => {} }),
      },
    };
    return { catalogCallbacks, ctx };
  }

  function stubFetch(): typeof fetch {
    return (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/api/combos/auto")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      if (href.includes("/api/combos")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({ data: [{ id: "m1" }] }),
      };
    }) as typeof fetch;
  }

  async function silenceConsole<T>(fn: () => Promise<T>): Promise<{ result: T; warns: string[] }> {
    const warns: string[] = [];
    const origWarn = console.warn;
    const origLog = console.log;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    console.log = () => {};
    try {
      const result = await fn();
      return { result, warns };
    } finally {
      console.warn = origWarn;
      console.log = origLog;
    }
  }

  it("host throw in draft.model.update: callback resolves + warn, never rejects", async () => {
    const restoreDisk = isolateDisk();
    const { catalogCallbacks, ctx } = setupCtx();
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch();
    try {
      const { warns } = await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        assert.equal(catalogCallbacks.length, 1);
        const draft = {
          provider: { update: (_id: string, fn: (p: Record<string, unknown>) => void) => fn({}) },
          model: {
            update: () => {
              throw new Error("host boom");
            },
          },
        };
        // MUST resolve — without the guard this rejects with "host boom".
        await catalogCallbacks[0](draft);
      });
      assert.ok(
        warns.some((w) => w.includes("catalog publish failed") && w.includes("host boom")),
        `expected a publish-guard warn, got: ${JSON.stringify(warns)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("host throw in draft.provider.update: callback resolves + warn, never rejects", async () => {
    const restoreDisk = isolateDisk();
    const { catalogCallbacks, ctx } = setupCtx();
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch();
    try {
      const { warns } = await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        const draft = {
          provider: {
            update: () => {
              throw new Error("provider host boom");
            },
          },
          model: {
            update: (_pid: string, _mid: string, fn: (m: Record<string, unknown>) => void) =>
              fn({}),
          },
        };
        await catalogCallbacks[0](draft);
      });
      assert.ok(
        warns.some((w) => w.includes("catalog publish failed")),
        `expected a publish-guard warn, got: ${JSON.stringify(warns)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });
});
