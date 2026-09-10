import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";

// A catalog that only appears once the slowest optional source has answered is
// a catalog that never appears at all on a host that exits first: an
// unreachable `/api/combos/auto` kept models, combos and everything else
// unpublished until its own timeout fired. Models and combos must reach the
// draft as soon as they are known; the optional sources upgrade the snapshot
// when they land.
describe("plugin-v2 staged refresh: optional sources never gate the publish", () => {
  let seq = 0;

  async function isolateDisk(): Promise<() => void> {
    const { mkdtempSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    seq += 1;
    const dir = mkdtempSync(join(tmpdir(), `omniroute-staged-${seq}-`));
    const prev = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    return () => {
      if (prev === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prev;
    };
  }

  function setupCtx(
    providerId: string,
    reloads: { count: number }
  ): {
    catalogCallbacks: Array<(draft: unknown) => Promise<void>>;
    ctx: Record<string, unknown>;
  } {
    const catalogCallbacks: Array<(draft: unknown) => Promise<void>> = [];
    const ctx = {
      options: { baseURL: "https://gw.example.com", providerId, apiKey: "k-" + providerId },
      catalog: {
        transform: (cb: (draft: unknown) => Promise<void>) => {
          catalogCallbacks.push(cb);
          return Promise.resolve({ dispose: async () => {} });
        },
        reload: async () => {
          reloads.count += 1;
        },
      },
      integration: { transform: () => Promise.resolve({ dispose: async () => {} }) },
    };
    return { catalogCallbacks, ctx };
  }

  function stubDraft(): { draft: unknown; published: Map<string, Record<string, unknown>> } {
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

  /**
   * `/api/combos/auto` never answers and never honours the abort signal — the
   * shape of a gateway that accepts the connection and then goes quiet.
   */
  function stubFetch(opts: {
    autoCombosHangs: boolean;
    combosHangs?: boolean;
    enrichmentDelayMs?: number;
  }): typeof fetch {
    return (async (url: unknown) => {
      const href = String(url);
      const ok = (body: unknown) => ({
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => body,
      });
      if (href.includes("/api/combos/auto")) {
        if (opts.autoCombosHangs) return await new Promise(() => {});
        return ok({ combos: [] });
      }
      if (href.includes("/api/combos")) {
        // A gateway that accepts the connection and then goes quiet on the
        // combos endpoint: models must still publish without waiting for it.
        if (opts.combosHangs) return await new Promise(() => {});
        return ok({ combos: [] });
      }
      if (href.includes("/api/pricing/models")) {
        if (opts.enrichmentDelayMs !== undefined) {
          await new Promise((r) => setTimeout(r, opts.enrichmentDelayMs));
        }
        return ok({
          omni: {
            id: "omni",
            alias: "omni",
            name: "Omni",
            models: [{ id: "m1", name: "Model One" }],
          },
        });
      }
      if (href.includes("/api/pricing")) return ok({});
      if (href.includes("/api/free-tier/summary")) return ok({});
      return ok({ data: [{ id: "m1" }] });
    }) as typeof fetch;
  }

  async function withSilentConsole<T>(fn: () => Promise<T>): Promise<T> {
    const warn = console.warn;
    const log = console.log;
    console.warn = () => {};
    console.log = () => {};
    try {
      return await fn();
    } finally {
      console.warn = warn;
      console.log = log;
    }
  }

  it("publishes models while an optional source is still hanging", async () => {
    const restoreDisk = await isolateDisk();
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ autoCombosHangs: true });
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx("staged-hang", reloads);
    try {
      await withSilentConsole(async () => {
        await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
        const { draft, published } = stubDraft();
        const done = catalogCallbacks[0]!(draft);
        const raced = await Promise.race([
          done.then(() => "published" as const),
          new Promise<"timeout">((r) => setTimeout(() => r("timeout"), 1500)),
        ]);
        assert.equal(
          raced,
          "published",
          "the publish must not wait on a source that never answers"
        );
        assert.ok([...published.keys()].some((k) => k.endsWith("/m1")));
      });
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("applies an optional source that lands after the publish, on the next transform", async () => {
    const restoreDisk = await isolateDisk();
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ autoCombosHangs: false, enrichmentDelayMs: 120 });
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx("staged-late", reloads);
    try {
      await withSilentConsole(async () => {
        await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
        const first = stubDraft();
        await catalogCallbacks[0]!(first.draft);
        const early = [...first.published.values()].find((m) => m["id"] === "m1");
        assert.ok(early, "models publish before the slow enrichment");

        await new Promise((r) => setTimeout(r, 300));
        const second = stubDraft();
        await catalogCallbacks[0]!(second.draft);
        const late = [...second.published.values()].find((m) => m["id"] === "m1");
        // The overlay is rendered, not just stored: the provider label the
        // gateway ships alongside the display name reaches the picker.
        assert.equal(
          late?.["name"],
          "Omni - Model One",
          "the late enrichment must reach the catalog, provider tag included"
        );
      });
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("does not ask the host to reload when the overlay came back identical", async () => {
    const restoreDisk = await isolateDisk();
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ autoCombosHangs: false });
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx("staged-stable", reloads);
    try {
      await withSilentConsole(async () => {
        await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
        for (let i = 0; i < 3; i++) {
          const d = stubDraft();
          await catalogCallbacks[0]!(d.draft);
          await new Promise((r) => setTimeout(r, 60));
        }
      });
      assert.ok(
        reloads.count <= 1,
        `an unchanged overlay must not trigger a reload per refresh, got ${reloads.count}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("a refresh after the TTL keeps the overlay instead of downgrading the picker", async () => {
    const restoreDisk = await isolateDisk();
    const origFetch = globalThis.fetch;
    // Enrichment answers once, then goes away: the second refresh must not
    // strip the names the first one obtained.
    let enrichCalls = 0;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      const ok = (body: unknown) => ({
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => body,
      });
      if (href.includes("/api/combos/auto")) return ok({ combos: [] });
      if (href.includes("/api/combos")) return ok({ combos: [] });
      if (href.includes("/api/pricing/models")) {
        enrichCalls += 1;
        if (enrichCalls > 1) {
          return { ok: false, status: 503, statusText: "Unavailable", json: async () => ({}) };
        }
        return ok({
          omni: {
            id: "omni",
            alias: "omni",
            name: "Omni",
            models: [{ id: "m1", name: "Model One" }],
          },
        });
      }
      if (href.includes("/api/pricing")) return ok({});
      if (href.includes("/api/free-tier/summary")) return ok({});
      return ok({ data: [{ id: "m1" }] });
    }) as unknown as typeof fetch;
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx("staged-ttl", reloads);
    (ctx["options"] as Record<string, unknown>)["modelCacheTtlMs"] = 1;
    try {
      await withSilentConsole(async () => {
        await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
        await catalogCallbacks[0]!(stubDraft().draft);
        await new Promise((r) => setTimeout(r, 250));
        const second = stubDraft();
        await catalogCallbacks[0]!(second.draft);
        const m1 = [...second.published.values()].find((m) => m["id"] === "m1");
        assert.equal(
          m1?.["name"],
          "Omni - Model One",
          "the second refresh must keep the name the first one resolved"
        );
      });
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("publishes models while a hanging /api/combos holds nothing back", async () => {
    // Combos used to sit on the critical path (Promise.all with models), so a
    // gateway slow on /api/combos held the whole picker back. Regression pin:
    // models publish even when combos never answers.
    const restoreDisk = await isolateDisk();
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ autoCombosHangs: false, combosHangs: true });
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx("staged-combos-hang", reloads);
    try {
      await withSilentConsole(async () => {
        await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
        const { draft, published } = stubDraft();
        const done = catalogCallbacks[0]!(draft);
        const raced = await Promise.race([
          done.then(() => "published" as const),
          new Promise<"timeout">((r) => setTimeout(() => r("timeout"), 1500)),
        ]);
        assert.equal(
          raced,
          "published",
          "models must publish without waiting for a hanging /api/combos"
        );
        assert.ok([...published.keys()].some((k) => k.endsWith("/m1")));
        // "staged-combos-hang" contains "combo" as a substring — filter on the
        // model id suffix instead: no published model id may start with a
        // combo prefix.
        assert.equal(
          [...published.keys()].filter((k) => /\/combo/i.test(k)).length,
          0,
          `no combos known yet — models-only on the first publish is correct, got ${JSON.stringify([...published.keys()])}`
        );
      });
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("keeps names/pricing on the third transform when enrichment stays down", async () => {
    // The old all-empty guard is gone by design (it also blocked genuine
    // removals); the per-source failure signal replaces it. A persistent 503
    // on the overlay must keep last-known names on EVERY later transform,
    // not just the second one — this is the regression pin for the throw
    // instead of soft-fail change.
    const restoreDisk = await isolateDisk();
    const origFetch = globalThis.fetch;
    let enrichCalls = 0;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      const ok = (body: unknown) => ({
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => body,
      });
      if (href.includes("/api/combos/auto")) return ok({ combos: [] });
      if (href.includes("/api/combos")) return ok({ combos: [] });
      if (href.includes("/api/pricing/models")) {
        enrichCalls += 1;
        if (enrichCalls > 1) {
          return { ok: false, status: 503, statusText: "Unavailable", json: async () => ({}) };
        }
        return ok({
          omni: {
            id: "omni",
            alias: "omni",
            name: "Omni",
            models: [{ id: "m1", name: "Model One" }],
          },
        });
      }
      if (href.includes("/api/pricing")) return ok({});
      if (href.includes("/api/free-tier/summary")) return ok({});
      return ok({ data: [{ id: "m1" }] });
    }) as unknown as typeof fetch;
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx("staged-enrich-down", reloads);
    (ctx["options"] as Record<string, unknown>)["modelCacheTtlMs"] = 1;
    try {
      await withSilentConsole(async () => {
        await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
        await catalogCallbacks[0]!(stubDraft().draft);
        await new Promise((r) => setTimeout(r, 250));
        await catalogCallbacks[0]!(stubDraft().draft);
        await new Promise((r) => setTimeout(r, 250));
        const third = stubDraft();
        await catalogCallbacks[0]!(third.draft);
        const m1 = [...third.published.values()].find((m) => m["id"] === "m1");
        assert.equal(
          m1?.["name"],
          "Omni - Model One",
          `a persistently failing overlay must not wipe names, got ${JSON.stringify(m1?.["name"])}`
        );
      });
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("serves last-known without refetching inside the unreachable window", async () => {
    // A gateway that answers nothing at all gets a short breather instead of
    // a full fetch suite on every transform: the cooldown arms only once a
    // total failure is confirmed (no models AND a prior entry exists to
    // serve), and transforms inside the window must not issue new requests.
    const restoreDisk = await isolateDisk();
    const origFetch = globalThis.fetch;
    let modelCalls = 0;
    let down = false;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      const ok = (body: unknown) => ({
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => body,
      });
      if (href.includes("/api/combos/auto")) return ok({ combos: [] });
      if (href.includes("/api/combos")) return ok({ combos: [] });
      if (href.includes("/api/pricing") || href.includes("/api/free-tier")) return ok({});
      modelCalls += 1;
      if (down) {
        return { ok: false, status: 500, statusText: "Down", json: async () => ({}) };
      }
      return ok({ data: [{ id: "m1" }] });
    }) as unknown as typeof fetch;
    const reloads = { count: 0 };
    const { catalogCallbacks, ctx } = setupCtx("staged-unreachable", reloads);
    (ctx["options"] as Record<string, unknown>)["modelCacheTtlMs"] = 1;
    try {
      await withSilentConsole(async () => {
        await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
        // First transform: gateway healthy, entry stored.
        await catalogCallbacks[0]!(stubDraft().draft);
        await new Promise((r) => setTimeout(r, 250));
        // Gateway goes down only now: the next transform fails totally while
        // a prior entry exists, arming the cooldown.
        down = true;
        await new Promise((r) => setTimeout(r, 10));
        await catalogCallbacks[0]!(stubDraft().draft);
        const afterArming = modelCalls;
        assert.ok(afterArming >= 2, "the failing transform tries the network once");
        await catalogCallbacks[0]!(stubDraft().draft);
        assert.equal(modelCalls, afterArming, "a transform inside the cooldown must not refetch");
      });
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("throws on a synchronously refusing integration hook, catalog intact", async () => {
    // A host whose integration.transform throws while registering must cost
    // the plugin the connect action only — setup resolves, the catalog
    // callback is registered, and the throw is warned, not propagated.
    const restoreDisk = await isolateDisk();
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch({ autoCombosHangs: false });
    const catalogCallbacks: Array<(draft: unknown) => Promise<void>> = [];
    const ctx = {
      options: { baseURL: "https://gw.example.com", providerId: "staged-integ", apiKey: "k" },
      catalog: {
        transform: (cb: (draft: unknown) => Promise<void>) => {
          catalogCallbacks.push(cb);
          return Promise.resolve({ dispose: async () => {} });
        },
      },
      integration: {
        transform: () => {
          throw new Error("host says no");
        },
      },
    };
    try {
      await withSilentConsole(async () => {
        await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
        assert.equal(catalogCallbacks.length, 1, "the catalog still registers");
      });
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });
});
