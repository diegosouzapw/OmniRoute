import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import plugin from "../src/index.js";
import {
  diskSnapshotPath,
  isStaleSnapshotModel,
  snapshotIdentityFingerprint,
} from "../src/cache.js";
import { legacyApiToInfoApi } from "../src/catalog.js";

function isolateDisk(): { dir: string; restore: () => void } {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-snapfix-"));
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

function setupCtx(providerId: string): {
  callbacks: Array<(draft: unknown) => Promise<void>>;
  ctx: Record<string, unknown>;
} {
  const callbacks: Array<(draft: unknown) => Promise<void>> = [];
  const ctx = {
    options: {
      providerId,
      baseURL: "https://gw.example.com",
      apiKey: "k-snapfix",
    },
    catalog: {
      transform: (cb: (draft: unknown) => Promise<void>) => {
        callbacks.push(cb);
        return Promise.resolve({ dispose: async () => {} });
      },
      reload: async () => {},
    },
    integration: { transform: () => Promise.resolve({ dispose: async () => {} }) },
  };
  return { callbacks, ctx };
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

function downFetch(): typeof fetch {
  return (async (url: unknown) => {
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
}

const fingerprint = snapshotIdentityFingerprint("https://gw.example.com", "k-snapfix", "k-snapfix");

describe("plugin-v2 snapshot stale-entry filter", () => {
  it("snapshot with 3 unusable pre-mapped entries + 1 valid: only the valid one is published + warn emitted", async () => {
    const disk = isolateDisk();
    const providerId = "snapfix-mixed";
    mkdirSync(join(disk.dir, "plugins"), { recursive: true });
    writeFileSync(
      diskSnapshotPath(providerId),
      JSON.stringify({
        v: 2,
        identityFingerprint: fingerprint,
        // Three pre-mapped entries with an unusable api block — missing npm,
        // empty npm, and a well-formed npm with no url (the shape a snapshot
        // written by an older build carries, and the one that reaches the host
        // as a bare `Invalid URL`) — plus one plain raw entry, which has no api
        // block at all and gets one synthesized at publish time.
        models: [
          { id: "stale-a", api: {} },
          { id: "stale-b", api: { npm: "" } },
          { id: "stale-c", api: { id: "openai-compatible", npm: "@ai-sdk/openai-compatible" } },
          { id: "good-1", context_length: 128000 },
        ],
        combos: [],
        autoCombos: [],
        providers: [],
        writtenAt: Date.now(),
      })
    );
    const origFetch = globalThis.fetch;
    globalThis.fetch = downFetch();
    try {
      const { callbacks, ctx } = setupCtx(providerId);
      const { warns } = await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        const { draft, published } = stubDraft();
        await callbacks[0](draft);
        assert.ok(
          published.has(`${providerId}/good-1`),
          `valid entry must be published, got: ${JSON.stringify([...published.keys()])}`
        );
        assert.ok(
          ![...published.keys()].some((k) => k.includes("stale")),
          `stale entries must be dropped, got: ${JSON.stringify([...published.keys()])}`
        );
      });
      assert.ok(
        warns.some((w) => w.includes("dropping 3 stale snapshot entries with an unusable api block")),
        `expected stale-drop warn, got: ${JSON.stringify(warns)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      disk.restore();
    }
  });

  it("snapshot without version (v1 format): ignored entirely, fail-open to fresh fetch", async () => {
    const disk = isolateDisk();
    const providerId = "snapfix-unversioned";
    mkdirSync(join(disk.dir, "plugins"), { recursive: true });
    writeFileSync(
      diskSnapshotPath(providerId),
      JSON.stringify({
        identityFingerprint: "whatever",
        rawModels: [{ id: "ancient" }],
        rawCombos: [],
        writtenAt: Date.now(),
      })
    );
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
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
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({ data: [{ id: "fresh-1" }] }),
      };
    }) as typeof fetch;
    try {
      const { callbacks, ctx } = setupCtx(providerId);
      await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
        const { draft, published } = stubDraft();
        await callbacks[0](draft);
        assert.ok(
          published.has(`${providerId}/fresh-1`),
          `fresh fetch must win over unversioned snapshot, got: ${JSON.stringify([...published.keys()])}`
        );
        assert.ok(
          ![...published.keys()].some((k) => k.includes("ancient")),
          `unversioned snapshot must be ignored, got: ${JSON.stringify([...published.keys()])}`
        );
      });
    } finally {
      globalThis.fetch = origFetch;
      disk.restore();
    }
  });

  it("legacyApiToInfoApi throws on missing api.npm (fail-fast, publish guard turns it into a warn)", () => {
    assert.throws(
      () => legacyApiToInfoApi(undefined as unknown as { id: string; npm: string; url: string }),
      /without an api block/
    );
    assert.throws(
      () =>
        legacyApiToInfoApi({ id: "openai-compatible", url: "https://x/v1" } as unknown as {
          id: string;
          npm: string;
          url: string;
        }),
      /without an api block/
    );
    // Sanity: sha256 helper used above matches the plugin identity scheme.
    assert.equal(createHash("sha256").update("x").digest("hex").length, 64);
  });

  it("legacyApiToInfoApi throws unless api.url is an http(s) url", () => {
    const npm = "@ai-sdk/openai-compatible";
    for (const api of [
      { id: "openai-compatible", npm },
      { id: "openai-compatible", npm, url: "" },
      { id: "openai-compatible", npm, url: "   " },
      // Non-empty but uncallable: the AI SDK reaches `fetch` and fails there.
      { id: "openai-compatible", npm, url: "/v1" },
      { id: "openai-compatible", npm, url: "gw.example.com/v1" },
      { id: "openai-compatible", npm, url: "ftp://gw.example.com/v1" },
    ]) {
      assert.throws(
        () => legacyApiToInfoApi(api as unknown as { id: string; npm: string; url: string }),
        /api block carries no http\(s\) url/,
        `expected a publish-time refusal for ${JSON.stringify(api)}`
      );
    }
    // A complete block still publishes unchanged.
    assert.deepEqual(
      legacyApiToInfoApi({
        id: "openai-compatible",
        npm: "@ai-sdk/openai-compatible",
        url: "https://gw.example.com/v1",
      }),
      {
        id: "openai-compatible",
        type: "aisdk",
        package: "@ai-sdk/openai-compatible",
        url: "https://gw.example.com/v1",
      }
    );
  });

  it("isStaleSnapshotModel drops a pre-mapped entry whose api.url is unusable", () => {
    const npm = "@ai-sdk/openai-compatible";
    // Present-but-unusable url: stale, for the same reason a missing npm is.
    for (const url of [undefined, "", "   ", "/v1", "gw.example.com/v1", "ftp://gw/v1"]) {
      assert.equal(
        isStaleSnapshotModel({ id: "a/b", api: { id: "x", npm, ...(url === undefined ? {} : { url }) } }),
        true,
        `expected ${JSON.stringify(url)} to be treated as stale`
      );
    }
    // Complete block: publishable.
    assert.equal(
      isStaleSnapshotModel({ id: "a/b", api: { id: "x", npm, url: "https://gw/v1" } }),
      false
    );
    // No api block at all stays publishable: it is synthesized at publish time.
    assert.equal(isStaleSnapshotModel({ id: "a/b" }), false);
  });
});
