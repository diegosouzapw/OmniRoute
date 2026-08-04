/**
 * Auto-discovery + force-sync (OpenCode parity with Pi `/omni sync`).
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  sanitizeAutoSyncIntervalMs,
  DEFAULT_AUTO_SYNC_INTERVAL_MS,
  MIN_AUTO_SYNC_INTERVAL_MS,
  parseOmniRoutePluginOptions,
  resolveOmniRoutePluginOptions,
  invalidateOmniRouteFetchCache,
  forceSyncOmniRouteModels,
  type OmniRouteFetchCache,
} from "../src/index.js";

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
  assert.equal(parseOmniRoutePluginOptions({ autoSyncIntervalMs: 120_000 }).autoSyncIntervalMs, 120_000);
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
    rawAutoCombos: [],
    rawEnrichment: new Map(),
    rawCompressionCombos: [],
    rawConnections: [],
    expiresAt: Date.now() + 1000,
  });
  cache.set("https://b.example/v1::def", {
    rawModels: [],
    rawCombos: [],
    rawAutoCombos: [],
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
      autoCombos: false,
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
