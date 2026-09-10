import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";

interface CapturedCall {
  kind: "catalog" | "integration";
}

interface FakeCtx {
  options: Record<string, unknown>;
  catalog: {
    transform: (cb: (draft: unknown) => unknown) => Promise<{ dispose: () => Promise<void> }>;
  };
  integration: {
    transform: (cb: (draft: unknown) => unknown) => Promise<{ dispose: () => Promise<void> }>;
  };
}

function fakeCtx(options: Record<string, unknown>, seen: CapturedCall[]): FakeCtx {
  return {
    options,
    catalog: {
      transform: (cb: (draft: unknown) => unknown) => {
        seen.push({ kind: "catalog" });
        assert.equal(typeof cb, "function");
        return Promise.resolve({ dispose: async () => {} });
      },
    },
    integration: {
      transform: (cb: (draft: unknown) => unknown) => {
        seen.push({ kind: "integration" });
        assert.equal(typeof cb, "function");
        return Promise.resolve({ dispose: async () => {} });
      },
    },
  };
}

describe("plugin-v2 entrypoint", () => {
  it("boot line is silent by default, visible with startupDebug", async () => {
    const seen: CapturedCall[] = [];
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(args.map(String).join(" "));
    };
    try {
      await (plugin as unknown as { setup: (ctx: FakeCtx) => Promise<void> }).setup(
        fakeCtx({ baseURL: "https://gw.example.com", providerId: "omniroute" }, seen)
      );
    } finally {
      console.warn = origWarn;
    }
    assert.ok(
      !warns.some((line) => line.includes("init providerId=")),
      `boot line must stay silent by default, got: ${JSON.stringify(warns)}`
    );
    assert.deepEqual(
      seen.map((s) => s.kind),
      ["catalog", "integration"]
    );
    const seen2: CapturedCall[] = [];
    const warns2: string[] = [];
    console.warn = (...args: unknown[]) => {
      warns2.push(args.map(String).join(" "));
    };
    try {
      await (plugin as unknown as { setup: (ctx: FakeCtx) => Promise<void> }).setup(
        fakeCtx(
          { baseURL: "https://gw.example.com", providerId: "omniroute", startupDebug: true },
          seen2
        )
      );
    } finally {
      console.warn = origWarn;
    }
    assert.ok(
      warns2.some((line) => line.includes("init providerId=omniroute")),
      `boot line must show with startupDebug, got: ${JSON.stringify(warns2)}`
    );
  });

  it("registers transforms synchronously: captures exist without awaiting fetch", async () => {
    const seen: CapturedCall[] = [];
    const ctx = fakeCtx({ baseURL: "https://gw.example.com" }, seen);
    const pending = (plugin as unknown as { setup: (ctx: FakeCtx) => Promise<void> }).setup(ctx);
    assert.deepEqual(
      seen.map((s) => s.kind),
      ["catalog", "integration"]
    );
    await pending;
  });

  it("declares key plus env methods and no oauth in the integration transform", async () => {
    const seen: CapturedCall[] = [];
    const integrationCallbacks: Array<(draft: unknown) => unknown> = [];
    const catalogCallbacks: Array<(draft: unknown) => unknown> = [];
    const ctx: FakeCtx = {
      options: { baseURL: "https://gw.example.com", providerId: "omniroute" },
      catalog: {
        transform: (cb: (draft: unknown) => unknown) => {
          seen.push({ kind: "catalog" });
          catalogCallbacks.push(cb);
          return Promise.resolve({ dispose: async () => {} });
        },
      },
      integration: {
        transform: (cb: (draft: unknown) => unknown) => {
          seen.push({ kind: "integration" });
          integrationCallbacks.push(cb);
          return Promise.resolve({ dispose: async () => {} });
        },
      },
    };
    const logs: string[] = [];
    const origLog = console.log;
    console.log = (...args: unknown[]) => {
      logs.push(String(args[0]));
    };
    try {
      await (plugin as unknown as { setup: (ctx: FakeCtx) => Promise<void> }).setup(ctx);
    } finally {
      console.log = origLog;
    }
    assert.equal(integrationCallbacks.length, 1);

    interface MethodUpdate {
      integrationID: string;
      method: { type: string; label?: string; names?: string[] };
    }
    interface FakeIntegrationDraft {
      updates: Array<{ id: string; name: string }>;
      methods: MethodUpdate[];
      update: (id: string, fn: (i: { name: string }) => void) => void;
      method: { update: (input: MethodUpdate) => void };
    }
    const draft: FakeIntegrationDraft = {
      updates: [],
      methods: [],
      update(id: string, fn: (i: { name: string }) => void) {
        const entry = { name: "" };
        fn(entry);
        this.updates.push({ id, name: entry.name });
      },
      method: {
        update(input: MethodUpdate) {
          draft.methods.push(input);
        },
      },
    };
    (integrationCallbacks[0] as (draft: FakeIntegrationDraft) => unknown)(draft);
    assert.deepEqual(draft.updates, [{ id: "omniroute", name: "OmniRoute" }]);
    const keyMethod = draft.methods.find((m) => m.method.type === "key");
    const envMethod = draft.methods.find((m) => m.method.type === "env");
    assert.ok(keyMethod);
    assert.equal(keyMethod?.integrationID, "omniroute");
    assert.ok(envMethod);
    assert.deepEqual(envMethod?.method.names, ["OMNIROUTE_API_KEY"]);
    assert.ok(!draft.methods.some((m) => m.method.type === "oauth"));
  });

  it("lazy refresh: [m1] then [m1,m2] reloads once; identical runs never reload", async () => {
    const { mkdtempSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const { setTimeout: sleep } = await import("node:timers/promises");
    const dir = mkdtempSync(join(tmpdir(), "omniroute-lazy-"));
    const prevDataDir = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    let modelsCall = 0;
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (!href.includes("/v1/models")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      modelsCall += 1;
      const ids = modelsCall <= 1 ? [{ id: "m1" }] : [{ id: "m1" }, { id: "m2" }];
      return { ok: true, status: 200, statusText: "OK", json: async () => ({ data: ids }) };
    }) as typeof fetch;
    try {
      const catalogCallbacks: Array<(draft: unknown) => Promise<void>> = [];
      let reloads = 0;
      const ctx = {
        options: {
          baseURL: "https://gw.example.com",
          providerId: "lazy-reload",
          apiKey: "k-lazy",
          modelCacheTtlMs: 1,
        },
        catalog: {
          transform: (cb: (draft: unknown) => Promise<void>) => {
            catalogCallbacks.push(cb);
            return Promise.resolve({ dispose: async () => {} });
          },
          reload: async () => {
            reloads += 1;
          },
        },
        integration: {
          transform: () => Promise.resolve({ dispose: async () => {} }),
        },
      };
      const logs: string[] = [];
      const origLog = console.log;
      console.log = (...args: unknown[]) => {
        logs.push(String(args[0]));
      };
      try {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
      } finally {
        console.log = origLog;
      }
      assert.equal(catalogCallbacks.length, 1);
      const cb = catalogCallbacks[0] as (draft: unknown) => Promise<void>;
      const draft = {
        provider: { update: (_id: string, fn: (p: Record<string, unknown>) => void) => fn({}) },
        model: {
          update: (_pid: string, _mid: string, fn: (m: Record<string, unknown>) => void) => fn({}),
        },
      };
      await cb(draft);
      assert.equal(reloads, 0, "the first publish sets the baseline, it does not reload");
      assert.equal(modelsCall, 1);
      await sleep(5);
      // The optional tier lands after that first publish and brings combos and
      // the overlay with it — one reload, so the picker shows them without
      // waiting for the next refresh.
      const afterFirstUpgrade = reloads;
      assert.ok(afterFirstUpgrade <= 1, `at most one reload for the first upgrade, got ${reloads}`);
      await cb(draft);
      assert.equal(reloads, afterFirstUpgrade + 1, "a new model id reloads once");
      assert.equal(modelsCall, 2);
      await sleep(5);
      await cb(draft);
      assert.equal(reloads, afterFirstUpgrade + 1, "an identical run never reloads");
      assert.equal(modelsCall, 3);
      if (prevDataDir === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prevDataDir;
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});
