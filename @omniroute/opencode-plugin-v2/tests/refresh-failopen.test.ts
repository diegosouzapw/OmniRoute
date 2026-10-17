import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";

// Fail-open refresh: the retired combos route is never requested, so even a
// gateway that would have refused it cannot escape setup. Setup resolves
// with a models-only provider payload and issues no combos request.
describe("plugin-v2 fail-open refresh (retired combos route)", () => {
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
    modelsStatus?: number;
    reloads: { count: number };
    added: unknown[];
  }): {
    ctx: Record<string, unknown>;
  } {
    const ctx = {
      options: {
        baseURL: "https://gw.example.com",
        providerId: "fo-" + String(opts.modelsStatus ?? 200),
        apiKey: "k-fo-" + String(opts.modelsStatus ?? 200),
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

  function stubFetch(opts: { modelsStatus?: number; requested: string[] }): typeof fetch {
    const modelsStatus = opts.modelsStatus ?? 200;
    return (async (url: unknown) => {
      const href = String(url);
      opts.requested.push(new URL(href).pathname);
      return {
        ok: modelsStatus === 200,
        status: modelsStatus,
        statusText: "OK",
        json: async () => ({ data: [{ id: "m1", capabilities: { tool_calling: true } }] }),
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

  it("setup resolves with models-only and never requests the retired route", async () => {
    const restoreDisk = await isolateDisk();
    const reloads = { count: 0 };
    const added: unknown[] = [];
    const { ctx } = setupCtx({ reloads, added });
    const requested: string[] = [];
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ requested });
    try {
      await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        assert.ok(
          modelIds(added).includes("m1"),
          `models-only fallback must publish m1, got: ${JSON.stringify(modelIds(added))}`
        );
      });
      assert.ok(
        !requested.some((p) => p === "/api/combos"),
        `retired route must never be requested, got ${JSON.stringify(requested)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("models 500: setup still resolves, never rejects", async () => {
    const restoreDisk = await isolateDisk();
    const reloads = { count: 0 };
    const added: unknown[] = [];
    const { ctx } = setupCtx({ modelsStatus: 500, reloads, added });
    const requested: string[] = [];
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ modelsStatus: 500, requested });
    try {
      await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
      });
      assert.ok(
        !requested.some((p) => p === "/api/combos"),
        `retired route must never be requested, got ${JSON.stringify(requested)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });
});
