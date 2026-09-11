import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";

// RED: reproduces the PROD unhandled rejection — combos 403 must not escape
// the catalog transform. Today `loadSnapshot()` awaits
// `Promise.all([models, combos])` with no catch, so a 403 combos fetch
// rejects the snapshot promise and the rejection propagates out of the
// `ctx.catalog.transform` callback (fail-open in `publishCatalog` is
// bypassed because injected fetchers return the already-rejected data).
describe("plugin-v2 fail-open refresh (PROD 403 combos)", () => {
  let diskSeq = 0;
  async function isolateDisk(): Promise<() => void> {
    const { mkdtempSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    diskSeq += 1;
    const dir = mkdtempSync(join(tmpdir(), `omniroute-fo-${diskSeq}-`));
    const prev = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    return () => {
      if (prev === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prev;
    };
  }
  function setupCtx(opts: {
    combosStatus: number;
    modelsStatus?: number;
    reloads: { count: number };
  }): {
    catalogCallbacks: Array<(draft: unknown) => Promise<void>>;
    ctx: Record<string, unknown>;
  } {
    const catalogCallbacks: Array<(draft: unknown) => Promise<void>> = [];
    const ctx = {
      options: {
        baseURL: "https://gw.example.com",
        providerId: "fo-" + String(opts.combosStatus) + "-" + String(opts.modelsStatus ?? 200),
        apiKey: "k-fo-" + String(opts.combosStatus),
      },
      catalog: {
        transform: (cb: (draft: unknown) => Promise<void>) => {
          catalogCallbacks.push(cb);
          return Promise.resolve({ dispose: async () => {} });
        },
        reload: async () => {
          opts.reloads.count += 1;
        },
      },
      integration: {
        transform: () => Promise.resolve({ dispose: async () => {} }),
      },
    };
    return { catalogCallbacks, ctx };
  }

  function stubFetch(opts: { combosStatus: number; modelsStatus?: number }): typeof fetch {
    const modelsStatus = opts.modelsStatus ?? 200;
    return (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/api/combos/auto")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      if (href.includes("/api/combos")) {
        return {
          ok: opts.combosStatus === 200,
          status: opts.combosStatus,
          statusText: opts.combosStatus === 403 ? "Forbidden" : "Error",
          json: async () => ({ combos: [] }),
        };
      }
      return {
        ok: modelsStatus === 200,
        status: modelsStatus,
        statusText: "OK",
        json: async () => ({ data: [{ id: "m1" }] }),
      };
    }) as typeof fetch;
  }

  function stubDraft(): {
    draft: unknown;
    published: Map<string, Record<string, unknown>>;
  } {
    const published = new Map<string, Record<string, unknown>>();
    const draft = {
      provider: { update: (_id: string, fn: (p: Record<string, unknown>) => void) => fn({}) },
      model: {
        update: (pid: string, mid: string, fn: (m: Record<string, unknown>) => void) => {
          const entry: Record<string, unknown> = { id: mid, providerID: pid };
          fn(entry);
          published.set(pid + "/" + mid, entry);
        },
      },
    };
    return { draft, published };
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

  it("combos 403: catalog callback resolves (models-only + warn), never rejects", async () => {
    const restoreDisk = await isolateDisk();
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx({ combosStatus: 403, reloads });
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ combosStatus: 403 });
    try {
      const { warns } = await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        assert.equal(catalogCallbacks.length, 1);
        const { draft, published } = stubDraft();
        // MUST resolve — today it rejects with the 403 error.
        await catalogCallbacks[0](draft);
        const key = [...published.keys()].find((k) => k.endsWith("/m1"));
        assert.ok(
          key,
          `models-only fallback must publish m1, got: ${JSON.stringify([...published.keys()])}`
        );
      });
      assert.ok(
        warns.some((w) => w.includes("combos") && w.includes("403")),
        `expected a combos 403 warn, got: ${JSON.stringify(warns)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("combos 500: catalog callback resolves (models-only + warn), never rejects", async () => {
    const restoreDisk = await isolateDisk();
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx({ combosStatus: 500, reloads });
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ combosStatus: 500 });
    try {
      const { warns } = await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        const { draft, published } = stubDraft();
        await catalogCallbacks[0](draft);
        const key = [...published.keys()].find((k) => k.endsWith("/m1"));
        assert.ok(
          key,
          `models-only fallback must publish m1, got: ${JSON.stringify([...published.keys()])}`
        );
      });
      assert.ok(
        warns.some((w) => w.includes("combos")),
        `expected a combos warn, got: ${JSON.stringify(warns)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("combos timeout (abort): catalog callback resolves, never rejects", async () => {
    const restoreDisk = await isolateDisk();
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx({ combosStatus: 200, reloads });
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/api/combos/auto")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      if (href.includes("/api/combos")) {
        const err = new Error("This operation was aborted");
        err.name = "AbortError";
        throw err;
      }
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({ data: [{ id: "m1" }] }),
      };
    }) as typeof fetch;
    try {
      const { warns } = await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        const { draft, published } = stubDraft();
        await catalogCallbacks[0](draft);
        const key = [...published.keys()].find((k) => k.endsWith("/m1"));
        assert.ok(
          key,
          `models-only fallback must publish m1, got: ${JSON.stringify([...published.keys()])}`
        );
      });
      assert.ok(
        warns.some((w) => w.includes("combos")),
        `expected a combos warn, got: ${JSON.stringify(warns)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });
});
