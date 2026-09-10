import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";
import { publishCatalog } from "../src/catalog.js";

const MODELS_URL = "https://gw.example.com/v1/models";
const COMBOS_URL = "https://gw.example.com/api/combos";

function silence() {
  const warns: string[] = [];
  const origWarn = console.warn;
  const origLog = console.log;
  console.warn = (...args: unknown[]) => {
    warns.push(String(args[0]));
  };
  console.log = () => {};
  return {
    warns,
    restore() {
      console.warn = origWarn;
      console.log = origLog;
    },
  };
}

function setup(options: Record<string, unknown>, reload?: () => Promise<void>) {
  const catalogCallbacks: Array<(draft: unknown) => Promise<void>> = [];
  const ctx = {
    options,
    catalog: {
      transform: (cb: (draft: unknown) => Promise<void>) => {
        catalogCallbacks.push(cb);
        return Promise.resolve({ dispose: async () => {} });
      },
      ...(reload ? { reload } : {}),
    },
    integration: {
      transform: () => Promise.resolve({ dispose: async () => {} }),
    },
  };
  return { catalogCallbacks, ctx };
}

function stubDraft() {
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

describe("plugin-v2 managementReadToken wiring (F1)", () => {
  it("combos fetch uses managementReadToken while models use apiKey", async () => {
    const seen = new Map<string, string>();
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown, init?: { headers?: Record<string, string> }) => {
      const href = String(url);
      seen.set(href, String(init?.headers?.Authorization ?? ""));
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
    const guard = silence();
    try {
      const { catalogCallbacks, ctx } = setup({
        baseURL: "https://gw.example.com",
        providerId: "omniroute",
        apiKey: "chat-key",
        managementReadToken: "mgmt-key",
      });
      await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
      const { draft, published } = stubDraft();
      await catalogCallbacks[0](draft);
      assert.ok(published.has("omniroute/m1"));
      assert.equal(seen.get(COMBOS_URL), "Bearer mgmt-key");
      assert.equal(seen.get(MODELS_URL), "Bearer chat-key");
    } finally {
      globalThis.fetch = origFetch;
      guard.restore();
    }
  });

  it("combos fetch falls back to apiKey when managementReadToken is absent", async () => {
    const seen = new Map<string, string>();
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown, init?: { headers?: Record<string, string> }) => {
      const href = String(url);
      seen.set(href, String(init?.headers?.Authorization ?? ""));
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
    const guard = silence();
    try {
      const { catalogCallbacks, ctx } = setup({
        baseURL: "https://gw.example.com",
        providerId: "omniroute",
        apiKey: "chat-key",
      });
      await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
      const { draft } = stubDraft();
      await catalogCallbacks[0](draft);
      assert.equal(seen.get(COMBOS_URL), "Bearer chat-key");
    } finally {
      globalThis.fetch = origFetch;
      guard.restore();
    }
  });

  it("publishCatalog routes combosFetcher to managementReadToken, models to apiKey", async () => {
    const calls: Array<[string, string]> = [];
    const draft = {
      provider: { update: (_id: string, fn: (p: Record<string, unknown>) => void) => fn({}) },
      model: {
        update: (_p: string, _m: string, fn: (m: Record<string, unknown>) => void) => fn({}),
      },
    };
    const res = await publishCatalog(
      draft as never,
      {
        providerId: "omniroute",
        baseURL: "https://gw.example.com",
        apiKey: "chat-key",
        managementReadToken: "mgmt-key",
        timeoutMs: 1000,
        modelCacheTtlMs: 300000,
        usableOnly: false,
      },
      {
        fetcher: async (_baseURL, token) => {
          calls.push(["models", token]);
          return [{ id: "m1" }];
        },
        combosFetcher: async (_baseURL, token) => {
          calls.push(["combos", token]);
          return [];
        },
      }
    );
    assert.deepEqual(res, { models: 1, combos: 0, autoCombos: 0 });
    assert.deepEqual(calls, [
      ["models", "chat-key"],
      ["combos", "mgmt-key"],
    ]);
  });
});

describe("plugin-v2 fail-closed models (F2)", () => {
  it("empty models fetch on 2nd refresh keeps the last-known catalog", async () => {
    const { mkdtempSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const dir = mkdtempSync(join(tmpdir(), "omniroute-f2-"));
    const prevDataDir = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    let modelsCall = 0;
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/api/combos/auto")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      if (href.includes("/api/combos")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      modelsCall += 1;
      if (modelsCall === 1) {
        return {
          ok: true,
          status: 200,
          statusText: "OK",
          json: async () => ({ data: [{ id: "m1" }] }),
        };
      }
      return { ok: false, status: 500, statusText: "Error", json: async () => ({}) };
    }) as typeof fetch;
    const guard = silence();
    try {
      const { catalogCallbacks, ctx } = setup({
        baseURL: "https://gw.example.com",
        providerId: "f2-keep",
        apiKey: "k-f2",
        modelCacheTtlMs: 1,
      });
      await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
      const first = stubDraft();
      await catalogCallbacks[0](first.draft);
      assert.ok(first.published.has("f2-keep/m1"), "first refresh must publish m1");
      const { setTimeout: sleep } = await import("node:timers/promises");
      await sleep(5);
      const second = stubDraft();
      await catalogCallbacks[0](second.draft);
      if (prevDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prevDataDir;
      assert.ok(
        second.published.has("f2-keep/m1"),
        "empty models fetch must reuse last-known catalog"
      );
      assert.ok(
        guard.warns.some((w) => w.includes("keeping last-known catalog")),
        `expected keep-last-known warn, got: ${JSON.stringify(guard.warns)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      guard.restore();
    }
  });
});
