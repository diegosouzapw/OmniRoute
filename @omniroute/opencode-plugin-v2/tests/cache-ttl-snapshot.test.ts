import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import plugin from "../src/index.js";
import { DEFAULT_MODEL_CACHE_TTL_MS, diskSnapshotPath } from "../src/cache.js";

interface CtxOpts {
  providerId: string;
  baseURL: string;
  apiKey: string;
  modelCacheTtlMs?: number;
}

function stubFetch(
  counter: { models: number; combos: number; autoCombos?: number; enrichment?: number },
  modelIds: string[]
) {
  return (async (url: unknown) => {
    const href = String(url);
    if (href.includes("/api/pricing") || href.includes("/api/free-tier")) {
      if (counter.enrichment !== undefined) counter.enrichment += 1;
      return { ok: true, status: 200, statusText: "OK", json: async () => ({}) };
    }
    if (href.includes("/api/combos/auto")) {
      if (counter.autoCombos !== undefined) counter.autoCombos += 1;
      return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
    }
    if (href.includes("/api/combos")) {
      counter.combos += 1;
      return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
    }
    counter.models += 1;
    return {
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => ({ data: modelIds.map((id) => ({ id })) }),
    };
  }) as typeof fetch;
}

async function setupPlugin(opts: CtxOpts): Promise<{
  callbacks: Array<(draft: unknown) => Promise<void>>;
  reloads: { count: number };
}> {
  const callbacks: Array<(draft: unknown) => Promise<void>> = [];
  const reloads = { count: 0 };
  const ctx = {
    options: { ...opts },
    catalog: {
      transform: (cb: (draft: unknown) => Promise<void>) => {
        callbacks.push(cb);
        return Promise.resolve({ dispose: async () => {} });
      },
      reload: async () => {
        reloads.count += 1;
      },
    },
    integration: { transform: () => Promise.resolve({ dispose: async () => {} }) },
  };
  const logs: string[] = [];
  const warns: string[] = [];
  const origLog = console.log;
  const origWarn = console.warn;
  console.log = (...args: unknown[]) => {
    logs.push(String(args[0]));
  };
  console.warn = (...args: unknown[]) => {
    warns.push(String(args[0]));
  };
  try {
    await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
  } finally {
    console.log = origLog;
    console.warn = origWarn;
  }
  return { callbacks, reloads };
}

function stubDraft(): { draft: unknown; published: Map<string, Record<string, unknown>> } {
  const published = new Map<string, Record<string, unknown>>();
  return {
    published,
    draft: {
      provider: { update: (_id: string, fn: (p: Record<string, unknown>) => void) => fn({}) },
      model: {
        update: (pid: string, mid: string, fn: (m: Record<string, unknown>) => void) => {
          const entry: Record<string, unknown> = { id: mid, providerID: pid };
          fn(entry);
          published.set(pid + "/" + mid, entry);
        },
      },
    },
  };
}

function isolateDisk(): { dir: string; restore: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-p1-"));
  const prev = process.env.OPENCODE_DATA_DIR;
  process.env.OPENCODE_DATA_DIR = dir;
  return {
    dir,
    restore: () => {
      if (prev === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prev;
    },
  };
}

describe("plugin-v2 P1 parity: TTL 300s + disk snapshot", () => {
  it("TTL default is 300s (v1 parity)", () => {
    assert.equal(DEFAULT_MODEL_CACHE_TTL_MS, 300_000);
  });

  it("2nd transform within TTL -> 0 network fetches (stub counter)", async () => {
    const disk = isolateDisk();
    const counter = { models: 0, combos: 0, autoCombos: 0 };
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch(counter, ["m1"]);
    try {
      const { callbacks } = await setupPlugin({
        providerId: "ttl-hit",
        baseURL: "https://gw.example.com",
        apiKey: "k-ttl",
      });
      const { draft, published } = stubDraft();
      await callbacks[0](draft);
      assert.equal(counter.models, 1);
      assert.equal(counter.combos, 1);
      assert.equal(counter.autoCombos, 1);
      assert.ok(published.has("ttl-hit/m1"));
      await callbacks[0](draft);
      assert.equal(counter.models, 1);
      assert.equal(counter.combos, 1);
      assert.equal(counter.autoCombos, 1);
    } finally {
      globalThis.fetch = origFetch;
      disk.restore();
    }
  });

  it("expired TTL -> network refetch", async () => {
    const disk = isolateDisk();
    const counter = { models: 0, combos: 0 };
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch(counter, ["m1"]);
    const origNow = Date.now;
    let now = 1_000_000;
    Date.now = () => now;
    try {
      const { callbacks } = await setupPlugin({
        providerId: "ttl-expire",
        baseURL: "https://gw.example.com",
        apiKey: "k-expire",
        modelCacheTtlMs: 1000,
      });
      const { draft } = stubDraft();
      await callbacks[0](draft);
      assert.equal(counter.models, 1);
      now += 500;
      await callbacks[0](draft);
      assert.equal(counter.models, 1);
      now += 1000;
      await callbacks[0](draft);
      assert.equal(counter.models, 2);
    } finally {
      Date.now = origNow;
      globalThis.fetch = origFetch;
      disk.restore();
    }
  });

  it("concurrent calls share a single refresh promise", async () => {
    const disk = isolateDisk();
    const counter = { models: 0, combos: 0 };
    const origFetch = globalThis.fetch;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/api/pricing") || href.includes("/api/free-tier")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({}) };
      }
      if (href.includes("/v1/models")) {
        counter.models += 1;
        await gate;
        return {
          ok: true,
          status: 200,
          statusText: "OK",
          json: async () => ({ data: [{ id: "m1" }] }),
        };
      }
      if (href.includes("/api/combos/auto")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      if (href.includes("/api/providers")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({}) };
      }
      counter.combos += 1;
      return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
    }) as typeof fetch;
    const origLog = console.log;
    const origWarn = console.warn;
    console.log = () => {};
    console.warn = () => {};
    try {
      const { callbacks } = await setupPlugin({
        providerId: "singleflight",
        baseURL: "https://gw.example.com",
        apiKey: "k-sf",
      });
      const { draft } = stubDraft();
      const a = callbacks[0](draft);
      const b = callbacks[0](draft);
      release();
      await Promise.all([a, b]);
      assert.equal(counter.models, 1);
    } finally {
      console.log = origLog;
      console.warn = origWarn;
      globalThis.fetch = origFetch;
      disk.restore();
    }
  });

  it("snapshot: fetch down at boot + snapshot present -> warm catalog published", async () => {
    const disk = isolateDisk();
    const warmCounter = { models: 0, combos: 0 };
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch(warmCounter, ["mw"]);
    const origLog = console.log;
    const origWarn = console.warn;
    console.log = () => {};
    console.warn = () => {};
    try {
      const { callbacks } = await setupPlugin({
        providerId: "warm",
        baseURL: "https://gw.example.com",
        apiKey: "k-warm",
      });
      const { draft } = stubDraft();
      await callbacks[0](draft);
      assert.ok(statSync(diskSnapshotPath("warm")).isFile());
    } finally {
      console.log = origLog;
      console.warn = origWarn;
      globalThis.fetch = origFetch;
      disk.restore();
    }

    const warmBody = (await import("node:fs/promises").then((fs) =>
      fs.readFile(join(disk.dir, "plugins", "omniroute-warm.json"), "utf8")
    )) as string;
    void warmBody;

    const disk2prev = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = disk.dir;
    const downFetch = (async (url: unknown) => {
      const href = String(url);
      if (href.includes("/api/pricing") || href.includes("/api/free-tier")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({}) };
      }
      if (href.includes("/api/combos/auto")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      if (href.includes("/api/combos")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({ combos: [] }) };
      }
      return { ok: false, status: 500, statusText: "Down", json: async () => ({}) };
    }) as typeof fetch;
    globalThis.fetch = downFetch;
    const warns: string[] = [];
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    console.log = () => {};
    try {
      const { callbacks } = await setupPlugin({
        providerId: "warm",
        baseURL: "https://gw.example.com",
        apiKey: "k-warm",
      });
      const { draft, published } = stubDraft();
      await callbacks[0](draft);
      assert.ok(
        published.has("warm/mw"),
        `warm snapshot must publish mw, got: ${JSON.stringify([...published.keys()])}`
      );
    } finally {
      console.log = origLog;
      console.warn = origWarn;
      globalThis.fetch = origFetch;
      if (disk2prev === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = disk2prev;
    }
    void warns;
  });

  it("invalidation: fresh setup does not reuse the previous in-memory cache", async () => {
    const disk = isolateDisk();
    const counter = { models: 0, combos: 0 };
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch(counter, ["m1"]);
    const origLog = console.log;
    const origWarn = console.warn;
    console.log = () => {};
    console.warn = () => {};
    try {
      const first = await setupPlugin({
        providerId: "inval",
        baseURL: "https://gw.example.com",
        apiKey: "k-inval",
        modelCacheTtlMs: 1,
      });
      const { draft } = stubDraft();
      await first.callbacks[0](draft);
      assert.equal(counter.models, 1);
      // Fresh setup = empty memory (setup closure): the stale disk warm entry
      // expires + the refetch starts, no reuse of the previous cache.
      const { setTimeout: sleep } = await import("node:timers/promises");
      await sleep(5);
      const second = await setupPlugin({
        providerId: "inval",
        baseURL: "https://gw.example.com",
        apiKey: "k-inval",
        modelCacheTtlMs: 1,
      });
      await second.callbacks[0](draft);
      assert.equal(counter.models, 2);
    } finally {
      console.log = origLog;
      console.warn = origWarn;
      globalThis.fetch = origFetch;
      disk.restore();
    }
  });
});

describe("the snapshot carries the display overlay across a restart", () => {
  it("round-trips enrichment so a cold start is not a wall of raw ids", async () => {
    const { mkdtempSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const { writeDiskSnapshot, readDiskSnapshot } = await import("../src/cache.js");
    const dir = mkdtempSync(join(tmpdir(), "omniroute-enrich-snap-"));
    const prev = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    try {
      const enrichment = new Map([
        ["cc/sonnet", { name: "Claude Sonnet 4.6", providerDisplayName: "Claude" }],
      ]);
      await writeDiskSnapshot(
        "omni",
        {
          models: [{ id: "cc/sonnet" }],
          combos: [],
          autoCombos: [],
          providers: [],
          enrichment,
          fetchedAt: Date.now(),
        } as never,
        "fp-1"
      );
      const back = await readDiskSnapshot("omni", "fp-1");
      assert.ok(back, "snapshot readable");
      assert.equal(back.enrichment?.get("cc/sonnet")?.name, "Claude Sonnet 4.6");
      assert.equal(back.enrichment?.get("cc/sonnet")?.providerDisplayName, "Claude");
    } finally {
      if (prev === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prev;
    }
  });
});
