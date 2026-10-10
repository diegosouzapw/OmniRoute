/**
 * Auto-discovery + force-sync (OpenCode parity with Pi `/omni sync`).
 */
import test from "node:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import assert from "node:assert/strict";
import {
  sanitizeAutoSyncIntervalMs,
  DEFAULT_AUTO_SYNC_INTERVAL_MS,
  MIN_AUTO_SYNC_INTERVAL_MS,
  parseOmniRoutePluginOptions,
  resolveOmniRoutePluginOptions,
  invalidateOmniRouteFetchCache,
  forceSyncOmniRouteModels,
  diskSnapshotPath,
  type OmniRouteFetchCache,
  type OmniRouteFetchCacheEntry,
} from "../src/index.js";
import { getLogLevel, setLogLevel } from "../src/logger.js";

async function captureConsole(run: () => Promise<void>): Promise<string[]> {
  const lines: string[] = [];
  const originalError = console.error;
  const originalWarn = console.warn;
  console.error = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  console.warn = (...args: unknown[]) => lines.push(args.map(String).join(" "));
  try {
    await run();
  } finally {
    console.error = originalError;
    console.warn = originalWarn;
  }
  return lines;
}

test("sanitizeAutoSyncIntervalMs: unset → default 300000", () => {
  assert.equal(sanitizeAutoSyncIntervalMs(undefined), DEFAULT_AUTO_SYNC_INTERVAL_MS);
  assert.equal(sanitizeAutoSyncIntervalMs(null), DEFAULT_AUTO_SYNC_INTERVAL_MS);
});

test("sanitizeAutoSyncIntervalMs: 0 disables", () => {
  assert.equal(sanitizeAutoSyncIntervalMs(0), 0);
});

test("sanitizeAutoSyncIntervalMs: clamps below min to 60000", () => {
  assert.equal(sanitizeAutoSyncIntervalMs(1), MIN_AUTO_SYNC_INTERVAL_MS);
  assert.equal(sanitizeAutoSyncIntervalMs(59_999), MIN_AUTO_SYNC_INTERVAL_MS);
});

test("sanitizeAutoSyncIntervalMs: keeps valid values", () => {
  assert.equal(sanitizeAutoSyncIntervalMs(60_000), 60_000);
  assert.equal(sanitizeAutoSyncIntervalMs(300_000), 300_000);
});

test("parseOmniRoutePluginOptions accepts autoSyncIntervalMs including 0", () => {
  assert.equal(parseOmniRoutePluginOptions({ autoSyncIntervalMs: 0 }).autoSyncIntervalMs, 0);
  assert.equal(
    parseOmniRoutePluginOptions({ autoSyncIntervalMs: 120_000 }).autoSyncIntervalMs,
    120_000
  );
});

test("resolveOmniRoutePluginOptions defaults autoSyncIntervalMs to 300000", () => {
  const r = resolveOmniRoutePluginOptions({});
  assert.equal(r.autoSyncIntervalMs, DEFAULT_AUTO_SYNC_INTERVAL_MS);
});

test("resolveOmniRoutePluginOptions clamps low positive autoSyncIntervalMs", () => {
  const r = resolveOmniRoutePluginOptions({ autoSyncIntervalMs: 5000 });
  assert.equal(r.autoSyncIntervalMs, MIN_AUTO_SYNC_INTERVAL_MS);
});

test("invalidateOmniRouteFetchCache clears by baseURL prefix", () => {
  const cache: OmniRouteFetchCache = new Map();
  cache.set("https://a.example/v1::abc", {
    rawModels: [],
    rawCombos: [],
    rawEnrichment: new Map(),
    rawCompressionCombos: [],
    rawConnections: [],
    expiresAt: Date.now() + 1000,
  });
  cache.set("https://b.example/v1::def", {
    rawModels: [],
    rawCombos: [],
    rawEnrichment: new Map(),
    rawCompressionCombos: [],
    rawConnections: [],
    expiresAt: Date.now() + 1000,
  });
  const removed = invalidateOmniRouteFetchCache(cache, "https://a.example/v1");
  assert.equal(removed, 1);
  assert.equal(cache.size, 1);
  assert.equal(cache.has("https://b.example/v1::def"), true);
});

test("forceSyncOmniRouteModels: fetches, populates cache, returns count", async () => {
  const cache: OmniRouteFetchCache = new Map();
  const resolved = resolveOmniRoutePluginOptions({
    providerId: "omniroute",
    baseURL: "https://omniroute.example/v1",
    autoSyncIntervalMs: 0,
    features: {
      combos: false,
      enrichment: false,
      compressionMetadata: false,
      usableOnly: false,
      diskCache: false,
    },
  });

  const result = await forceSyncOmniRouteModels({
    resolved,
    cache,
    readAuthJson: async () => ({
      omniroute: { type: "api", key: "test-key" },
    }),
    fetcher: async () => [
      { id: "model-a", object: "model" },
      { id: "model-b", object: "model" },
    ],
    now: () => 1_000_000,
  });

  assert.equal(result.ok, true);
  assert.equal(result.count, 2);
  assert.equal(result.provider, "omniroute");
  assert.equal(cache.size, 1);
  const entry = [...cache.values()][0];
  assert.equal(entry.rawModels.length, 2);
  assert.equal(entry.expiresAt, 1_000_000 + resolved.modelCacheTtl);
});

test("forceSyncOmniRouteModels suppresses successful lifecycle output at error level", async () => {
  const previousLevel = getLogLevel();
  const cache: OmniRouteFetchCache = new Map();
  const resolved = resolveOmniRoutePluginOptions({
    providerId: "omniroute",
    baseURL: "https://omniroute.example/v1",
    features: {
      combos: false,
      compressionMetadata: false,
      diskCache: false,
      enrichment: false,
      logLevel: "error",
      usableOnly: false,
    },
  });

  try {
    setLogLevel("error");
    const lines = await captureConsole(async () => {
      const result = await forceSyncOmniRouteModels({
        resolved,
        cache,
        readAuthJson: async () => ({ omniroute: { type: "api", key: "test-key" } }),
        fetcher: async () => [{ id: "model-a", object: "model" }],
      });
      assert.equal(result.ok, true);
    });

    assert.deepEqual(lines, []);
  } finally {
    setLogLevel(previousLevel);
  }
});

test("forceSyncOmniRouteModels preserves successful lifecycle output at info level", async () => {
  const previousLevel = getLogLevel();
  const cache: OmniRouteFetchCache = new Map();
  const resolved = resolveOmniRoutePluginOptions({
    providerId: "omniroute",
    baseURL: "https://omniroute.example/v1",
    features: {
      combos: false,
      compressionMetadata: false,
      diskCache: false,
      enrichment: false,
      logLevel: "info",
      usableOnly: false,
    },
  });

  try {
    setLogLevel("info");
    const lines = await captureConsole(async () => {
      const result = await forceSyncOmniRouteModels({
        resolved,
        cache,
        readAuthJson: async () => ({ omniroute: { type: "api", key: "test-key" } }),
        fetcher: async () => [{ id: "model-a", object: "model" }],
      });
      assert.equal(result.ok, true);
    });

    assert.equal(lines.filter((line) => line.includes("force sync ok")).length, 1);
  } finally {
    setLogLevel(previousLevel);
  }
});

test("forceSyncOmniRouteModels: missing auth returns error", async () => {
  const cache: OmniRouteFetchCache = new Map();
  const resolved = resolveOmniRoutePluginOptions({
    providerId: "omniroute",
    baseURL: "https://omniroute.example/v1",
    autoSyncIntervalMs: 0,
    features: { diskCache: false },
  });
  const result = await forceSyncOmniRouteModels({
    resolved,
    cache,
    readAuthJson: async () => ({}),
  });
  assert.equal(result.ok, false);
  assert.match(result.error ?? "", /credentials|baseURL|connect/i);
});

// #14926: the models fetch used to run AFTER the memory cache was invalidated
// and the disk snapshot unlinked, so a single transient failure (the 10s
// abort) destroyed the last good catalog. The caches must only be replaced
// after a successful fetch.
async function withTempDataDir(run: (dir: string) => Promise<void>): Promise<void> {
  const previous = process.env.OPENCODE_DATA_DIR;
  const dir = await mkdtemp(join(tmpdir(), "omniroute-force-sync-"));
  process.env.OPENCODE_DATA_DIR = dir;
  try {
    await run(dir);
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_DATA_DIR;
    else process.env.OPENCODE_DATA_DIR = previous;
    await rm(dir, { recursive: true, force: true });
  }
}

function diskCacheResolved() {
  return resolveOmniRoutePluginOptions({
    providerId: "omniroute",
    baseURL: "https://omniroute.example/v1",
    autoSyncIntervalMs: 0,
    features: {
      combos: false,
      enrichment: false,
      compressionMetadata: false,
      usableOnly: false,
      diskCache: true,
      logLevel: "error",
    },
  });
}

test("forceSyncOmniRouteModels: models fetch abort keeps memory and disk cache (#14926)", async () => {
  await withTempDataDir(async () => {
    const resolved = diskCacheResolved();
    const snapshotFile = diskSnapshotPath(resolved.providerId);
    await mkdir(dirname(snapshotFile), { recursive: true });
    const previousSnapshot = JSON.stringify({ v: 2, marker: "last-good-catalog" });
    await writeFile(snapshotFile, previousSnapshot, "utf8");

    const cache: OmniRouteFetchCache = new Map();
    const previousEntry = {
      rawModels: [{ id: "cached-model", object: "model" }],
      rawCombos: [],
      rawEnrichment: new Map(),
      rawCompressionCombos: [],
      rawConnections: [],
      expiresAt: 1,
    } as unknown as OmniRouteFetchCacheEntry;
    cache.set("https://omniroute.example/v1::old-credentials", previousEntry);

    const result = await forceSyncOmniRouteModels({
      resolved,
      cache,
      readAuthJson: async () => ({ omniroute: { type: "api", key: "test-key" } }),
      fetcher: async () => {
        throw new DOMException("The operation was aborted.", "AbortError");
      },
    });

    assert.equal(result.ok, false);
    assert.match(result.error ?? "", /aborted/);
    assert.equal(result.clearedMemory, 0);
    assert.equal(result.clearedDisk, false);
    assert.equal(cache.size, 1, "in-memory cache must survive a failed fetch");
    assert.equal(cache.get("https://omniroute.example/v1::old-credentials"), previousEntry);
    assert.equal(
      await readFile(snapshotFile, "utf8"),
      previousSnapshot,
      "disk snapshot must survive a failed fetch"
    );
  });
});

test("forceSyncOmniRouteModels: successful fetch replaces memory and disk cache", async () => {
  await withTempDataDir(async () => {
    const resolved = diskCacheResolved();
    const snapshotFile = diskSnapshotPath(resolved.providerId);
    await mkdir(dirname(snapshotFile), { recursive: true });
    await writeFile(snapshotFile, JSON.stringify({ v: 2, marker: "old" }), "utf8");

    const cache: OmniRouteFetchCache = new Map();
    cache.set("https://stale.example/v1::old", {} as OmniRouteFetchCacheEntry);

    const result = await forceSyncOmniRouteModels({
      resolved,
      cache,
      readAuthJson: async () => ({ omniroute: { type: "api", key: "test-key" } }),
      fetcher: async () => [{ id: "fresh-model", object: "model" }],
    });

    assert.equal(result.ok, true);
    assert.equal(result.clearedMemory, 1);
    assert.equal(result.clearedDisk, true);
    assert.equal(cache.size, 1);
    assert.equal([...cache.values()][0].rawModels[0].id, "fresh-model");
    const written = JSON.parse(await readFile(snapshotFile, "utf8"));
    assert.equal(written.rawModels[0].id, "fresh-model");
    assert.equal(written.marker, undefined);
  });
});
