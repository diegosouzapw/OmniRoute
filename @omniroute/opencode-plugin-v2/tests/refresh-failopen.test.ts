import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";

// Fail-open refresh: a combos 403/500/abort must not escape setup. Setup
// resolves with a models-only provider payload plus a combos warn.
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
    added: unknown[];
  }): {
    ctx: Record<string, unknown>;
  } {
    const ctx = {
      options: {
        baseURL: "https://gw.example.com",
        providerId: "fo-" + String(opts.combosStatus) + "-" + String(opts.modelsStatus ?? 200),
        apiKey: "k-fo-" + String(opts.combosStatus),
      },
      provider: {
        transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
          cb({ add: (input: unknown) => opts.added.push(input) });
          return Promise.resolve({ dispose: async () => {} });
        },
        reload: async () => {
          opts.reloads.count += 1;
        },
      },
      model: {
        transform: () => Promise.resolve({ dispose: async () => {} }),
      },
      integration: {
        transform: () => Promise.resolve({ dispose: async () => {} }),
      },
    };
    return { ctx };
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

  function modelIds(added: unknown[]): string[] {
    const out: string[] = [];
    for (const entry of added) {
      const models = (entry as { models?: Array<{ id?: unknown }> }).models ?? [];
      for (const m of models) out.push(String(m.id));
    }
    return out;
  }

  it("combos 403: setup resolves (models-only + warn), never rejects", async () => {
    const restoreDisk = await isolateDisk();
    const reloads = { count: 0 };
    const added: unknown[] = [];
    const { ctx } = setupCtx({ combosStatus: 403, reloads, added });
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ combosStatus: 403 });
    try {
      const { warns } = await silenceConsole(async () => {
        // MUST resolve — today it rejects with the 403 error.
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        assert.ok(
          modelIds(added).includes("m1"),
          `models-only fallback must publish m1, got: ${JSON.stringify(modelIds(added))}`
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

  it("combos 500: setup resolves (models-only + warn), never rejects", async () => {
    const restoreDisk = await isolateDisk();
    const reloads = { count: 0 };
    const added: unknown[] = [];
    const { ctx } = setupCtx({ combosStatus: 500, reloads, added });
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ combosStatus: 500 });
    try {
      const { warns } = await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        assert.ok(
          modelIds(added).includes("m1"),
          `models-only fallback must publish m1, got: ${JSON.stringify(modelIds(added))}`
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

  it("combos timeout (abort): setup resolves, never rejects", async () => {
    const restoreDisk = await isolateDisk();
    const reloads = { count: 0 };
    const added: unknown[] = [];
    const { ctx } = setupCtx({ combosStatus: 200, reloads, added });
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
        assert.ok(
          modelIds(added).includes("m1"),
          `models-only fallback must publish m1, got: ${JSON.stringify(modelIds(added))}`
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
