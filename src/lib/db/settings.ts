/**
 * db/settings.js — Settings, pricing, and proxy config.
 */

import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import { PROVIDER_ID_TO_ALIAS } from "@omniroute/open-sse/config/providerModels.ts";
import { invalidateDbCache } from "./readCache";
import { resolveProxyForConnectionFromRegistry } from "./proxies";
import { getComboModelProvider as getComboEntryProvider } from "@/lib/combos/steps";

type JsonRecord = Record<string, unknown>;
type PricingModels = Record<string, JsonRecord>;
type PricingByProvider = Record<string, PricingModels>;
export type PricingSource = "default" | "litellm" | "modelsDev" | "user";
export type PricingSourceMap = Record<string, Record<string, PricingSource>>;
type ProxyValue = JsonRecord | string | null;
type ProxyMap = Record<string, ProxyValue>;

interface ProxyConfig {
  global: ProxyValue;
  providers: ProxyMap;
  combos: ProxyMap;
  keys: ProxyMap;
  [key: string]: unknown;
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function toProxyMap(value: unknown): ProxyMap {
  return value && typeof value === "object" ? (value as ProxyMap) : {};
}

function toProxyValue(value: unknown): ProxyValue {
  if (value === null || typeof value === "string") return value as string | null;
  if (value && typeof value === "object") return value as JsonRecord;
  return null;
}

// ──────────────── Settings ────────────────

export async function getSettings() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'settings'").all();
  const settings: Record<string, unknown> = {
    cloudEnabled: false,
    tailscaleEnabled: false,
    tailscaleUrl: "",
    stickyRoundRobinLimit: 3,
    requestRetry: 3,
    maxRetryIntervalSec: 30,
    antigravitySignatureCacheMode: "enabled",
    requireLogin: true,
    hiddenSidebarItems: [],
    comboConfigMode: "guided",
    alwaysPreserveClientCache: "auto",
    idempotencyWindowMs: 5000,
    wsAuth: false,
  };
  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    settings[key] = JSON.parse(rawValue);
  }

  // Auto-complete onboarding for pre-configured deployments (Docker/VM)
  // If INITIAL_PASSWORD is set via env, this is a headless deploy — skip the wizard
  if (!settings.setupComplete && process.env.INITIAL_PASSWORD) {
    settings.setupComplete = true;
    settings.requireLogin = true;
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'setupComplete', 'true')"
    ).run();
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'requireLogin', 'true')"
    ).run();
  }

  return settings;
}

export async function updateSettings(updates: Record<string, unknown>) {
  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', ?, ?)"
  );
  const tx = db.transaction(() => {
    for (const [key, value] of Object.entries(updates)) {
      insert.run(key, JSON.stringify(value));
    }
  });
  tx();
  backupDbFile("pre-write");
  invalidateDbCache("settings"); // Bust the read cache immediately
  const nextSettings = await getSettings();

  try {
    const { applyRuntimeSettings } = await import("@/lib/config/runtimeSettings");
    await applyRuntimeSettings(nextSettings, { source: "settings:update" });
  } catch (error) {
    console.warn(
      "[HOT_RELOAD] Failed to apply runtime settings after update:",
      error instanceof Error ? error.message : error
    );
  }

  return nextSettings;
}

export async function isCloudEnabled() {
  const settings = await getSettings();
  return settings.cloudEnabled === true;
}

// ──────────────── Pricing ────────────────

function readPricingNamespace(
  db: ReturnType<typeof getDbInstance>,
  namespace: string
): PricingByProvider {
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = ?").all(namespace);
  const pricing: PricingByProvider = {};

  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;

    try {
      pricing[key] = toRecord(JSON.parse(rawValue)) as PricingModels;
    } catch {
      // Corrupted data — skip silently, fallback to lower layers
    }
  }

  return pricing;
}

function mergePricingLayers(layers: PricingByProvider[]): PricingByProvider {
  const mergedPricing: PricingByProvider = {};

  for (const layer of layers) {
    for (const [provider, models] of Object.entries(layer)) {
      if (!mergedPricing[provider]) {
        mergedPricing[provider] = { ...models };
        continue;
      }

      for (const [model, pricing] of Object.entries(models)) {
        mergedPricing[provider][model] = mergedPricing[provider][model]
          ? { ...(mergedPricing[provider][model] || {}), ...toRecord(pricing) }
          : pricing;
      }
    }
  }

  return mergedPricing;
}

function buildPricingSourceMap(layers: {
  defaults: PricingByProvider;
  litellm: PricingByProvider;
  modelsDev: PricingByProvider;
  user: PricingByProvider;
}): PricingSourceMap {
  const sourceMap: PricingSourceMap = {};
  const mergedPricing = mergePricingLayers([
    layers.defaults,
    layers.litellm,
    layers.modelsDev,
    layers.user,
  ]);

  for (const [provider, models] of Object.entries(mergedPricing)) {
    sourceMap[provider] = {};

    for (const model of Object.keys(models)) {
      if (layers.user[provider]?.[model]) {
        sourceMap[provider][model] = "user";
      } else if (layers.modelsDev[provider]?.[model]) {
        sourceMap[provider][model] = "modelsDev";
      } else if (layers.litellm[provider]?.[model]) {
        sourceMap[provider][model] = "litellm";
      } else {
        sourceMap[provider][model] = "default";
      }
    }
  }

  return sourceMap;
}

async function getPricingLayers() {
  const db = getDbInstance();

  // Layer 1: Hardcoded defaults (lowest priority)
  const { getDefaultPricing } = await import("@/shared/constants/pricing");
  return {
    defaults: getDefaultPricing(),
    litellm: readPricingNamespace(db, "pricing_synced"),
    modelsDev: readPricingNamespace(db, "models_dev_pricing"),
    user: readPricingNamespace(db, "pricing"),
  };
}

export async function getPricing() {
  const layers = await getPricingLayers();
  // Merge: defaults → LiteLLM → models.dev → user (each layer overrides the previous)
  return mergePricingLayers([layers.defaults, layers.litellm, layers.modelsDev, layers.user]);
}

export async function getPricingWithSources(): Promise<{
  pricing: PricingByProvider;
  sourceMap: PricingSourceMap;
}> {
  const layers = await getPricingLayers();
  return {
    pricing: mergePricingLayers([layers.defaults, layers.litellm, layers.modelsDev, layers.user]),
    sourceMap: buildPricingSourceMap(layers),
  };
}

export async function getPricingForModel(provider: string, model: string) {
  const pricing = await getPricing();
  if (pricing[provider]?.[model]) return pricing[provider][model];

  const { PROVIDER_ID_TO_ALIAS } = await import("@omniroute/open-sse/config/providerModels");
  const alias = PROVIDER_ID_TO_ALIAS[provider];
  if (alias && pricing[alias]) return pricing[alias][model] || null;

  const np = provider?.replace(/-cn$/, "");
  if (np && np !== provider && pricing[np]) return pricing[np][model] || null;

  return null;
}

export async function updatePricing(pricingData: PricingByProvider) {
  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('pricing', ?, ?)"
  );

  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all();
  const existing: PricingByProvider = {};
  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    existing[key] = toRecord(JSON.parse(rawValue)) as PricingModels;
  }

  const tx = db.transaction(() => {
    for (const [provider, models] of Object.entries(pricingData)) {
      insert.run(provider, JSON.stringify({ ...(existing[provider] || {}), ...models }));
    }
  });
  tx();
  backupDbFile("pre-write");
  invalidateDbCache("pricing"); // Bust the pricing read cache
  const updated: PricingByProvider = {};
  const allRows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all();
  for (const row of allRows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    updated[key] = toRecord(JSON.parse(rawValue)) as PricingModels;
  }
  return updated;
}

export async function resetPricing(provider: string, model?: string) {
  const db = getDbInstance();

  if (model) {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'pricing' AND key = ?")
      .get(provider);
    if (row) {
      const rowRecord = toRecord(row);
      const value = typeof rowRecord.value === "string" ? rowRecord.value : "{}";
      const models = toRecord(JSON.parse(value));
      delete models[model];
      if (Object.keys(models).length === 0) {
        db.prepare("DELETE FROM key_value WHERE namespace = 'pricing' AND key = ?").run(provider);
      } else {
        db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'pricing' AND key = ?").run(
          JSON.stringify(models),
          provider
        );
      }
    }
  } else {
    db.prepare("DELETE FROM key_value WHERE namespace = 'pricing' AND key = ?").run(provider);
  }

  backupDbFile("pre-write");
  const allRows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all();
  const result: Record<string, unknown> = {};
  for (const row of allRows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    result[key] = JSON.parse(rawValue);
  }
  return result;
}

export async function resetAllPricing() {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'pricing'").run();
  backupDbFile("pre-write");
  return {};
}

// ──────────────── LKGP (Last Known Good Provider) ────────────────

export async function getLKGP(comboName: string, modelId: string): Promise<string | null> {
  const db = getDbInstance();
  const key = `${comboName}:${modelId}`;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'lkgp' AND key = ?")
    .get(key) as { value?: string } | undefined;
  if (!row?.value) return null;
  try {
    return JSON.parse(row.value);
  } catch {
    return row.value;
  }
}

export async function setLKGP(comboName: string, modelId: string, providerId: string) {
  const db = getDbInstance();
  const key = `${comboName}:${modelId}`;
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('lkgp', ?, ?)").run(
    key,
    JSON.stringify(providerId)
  );
}

export function clearAllLKGP(): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'lkgp'").run();
}

// ──────────────── Proxy Config ────────────────

const DEFAULT_PROXY_CONFIG: ProxyConfig = { global: null, providers: {}, combos: {}, keys: {} };
const ALIAS_TO_PROVIDER_ID = Object.entries(PROVIDER_ID_TO_ALIAS).reduce(
  (acc, [providerId, alias]) => {
    if (alias) acc[alias] = providerId;
    acc[providerId] = providerId;
    return acc;
  },
  {} as Record<string, string>
);

function resolveProviderAliasOrId(providerOrAlias: string): string {
  if (typeof providerOrAlias !== "string") return providerOrAlias;
  return ALIAS_TO_PROVIDER_ID[providerOrAlias] || providerOrAlias;
}

function getComboModelProvider(modelEntry: unknown): string | null {
  const providerOrAlias = getComboEntryProvider(modelEntry);
  return providerOrAlias ? resolveProviderAliasOrId(providerOrAlias) : null;
}

function migrateProxyEntry(value: unknown): JsonRecord | null {
  if (!value) return null;
  if (typeof value === "object") {
    const record = toRecord(value);
    if (record.type) return record;
  }
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return {
      type: url.protocol.replace(":", "") || "http",
      host: url.hostname,
      port:
        url.port ||
        (url.protocol === "socks5:" ? "1080" : url.protocol === "https:" ? "443" : "8080"),
      username: url.username ? decodeURIComponent(url.username) : "",
      password: url.password ? decodeURIComponent(url.password) : "",
    };
  } catch {
    const parts = value.split(":");
    return {
      type: "http",
      host: parts[0] || value,
      port: parts[1] || "8080",
      username: "",
      password: "",
    };
  }
}

export async function getProxyConfig() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'proxyConfig'").all();

  const raw: ProxyConfig = { ...DEFAULT_PROXY_CONFIG };
  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    raw[key] = JSON.parse(rawValue);
  }

  let migrated = false;
  if (raw.global && typeof raw.global === "string") {
    raw.global = migrateProxyEntry(raw.global);
    migrated = true;
  }
  if (raw.providers) {
    for (const [k, v] of Object.entries(raw.providers)) {
      if (typeof v === "string") {
        raw.providers[k] = migrateProxyEntry(v);
        migrated = true;
      }
    }
  }

  if (migrated) {
    const insert = db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', ?, ?)"
    );
    if (raw.global !== undefined) insert.run("global", JSON.stringify(raw.global));
    if (raw.providers) insert.run("providers", JSON.stringify(raw.providers));
  }

  return raw;
}

export async function getProxyForLevel(level: string, id?: string | null) {
  const config = await getProxyConfig();
  if (level === "global") return config.global || null;
  const map = toProxyMap(config[level + "s"] || config[level] || {});
  return (id ? map[id] : null) || null;
}

export async function setProxyForLevel(level: string, id: string | null, proxy: ProxyValue) {
  const db = getDbInstance();
  const config = await getProxyConfig();

  if (level === "global") {
    config.global = proxy || null;
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', 'global', ?)"
    ).run(JSON.stringify(config.global));
  } else {
    const mapKey = level + "s";
    const map = toProxyMap(config[mapKey] || {});
    if (proxy && id) {
      map[id] = proxy;
    } else {
      if (id) delete map[id];
    }
    config[mapKey] = map;
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', ?, ?)"
    ).run(mapKey, JSON.stringify(map));
  }

  backupDbFile("pre-write");
  return config;
}

export async function deleteProxyForLevel(level: string, id: string | null) {
  return setProxyForLevel(level, id, null);
}

export async function resolveProxyForConnection(connectionId: string) {
  const registryResolved = await resolveProxyForConnectionFromRegistry(connectionId);
  if (registryResolved?.proxy) {
    return registryResolved;
  }

  const config = await getProxyConfig();

  if (connectionId && config.keys?.[connectionId]) {
    return { proxy: config.keys[connectionId], level: "key", levelId: connectionId };
  }

  const db = getDbInstance();
  const connection = db
    .prepare("SELECT provider FROM provider_connections WHERE id = ?")
    .get(connectionId);

  if (connection) {
    const connectionRecord = toRecord(connection);
    const provider =
      typeof connectionRecord.provider === "string" ? connectionRecord.provider : null;
    if (config.combos && Object.keys(config.combos).length > 0) {
      const combos = db.prepare("SELECT id, data FROM combos").all();
      for (const comboRow of combos) {
        const comboRecord = toRecord(comboRow);
        const comboId = typeof comboRecord.id === "string" ? comboRecord.id : null;
        if (comboId && config.combos[comboId]) {
          try {
            const comboRaw = typeof comboRecord.data === "string" ? comboRecord.data : null;
            if (!comboRaw) continue;
            const combo = toRecord(JSON.parse(comboRaw));
            const comboModels = Array.isArray(combo.models) ? combo.models : [];
            const usesProvider = comboModels.some(
              (entry) => getComboModelProvider(entry) === provider
            );
            if (usesProvider) {
              return { proxy: config.combos[comboId], level: "combo", levelId: comboId };
            }
          } catch {
            // Ignore malformed combo records during proxy resolution.
          }
        }
      }
    }

    if (provider && config.providers?.[provider]) {
      return {
        proxy: config.providers[provider],
        level: "provider",
        levelId: provider,
      };
    }
  }

  if (config.global) {
    return { proxy: config.global, level: "global", levelId: null };
  }

  return { proxy: null, level: "direct", levelId: null };
}

export async function setProxyConfig(config: Record<string, unknown>) {
  if (config.level !== undefined) {
    const level = typeof config.level === "string" ? config.level : "global";
    const id = typeof config.id === "string" ? config.id : null;
    const proxy = (config.proxy as ProxyValue) || null;
    return setProxyForLevel(level, id, proxy);
  }

  const db = getDbInstance();
  const current = await getProxyConfig();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', ?, ?)"
  );

  const tx = db.transaction(() => {
    if (config.global !== undefined) {
      current.global = toProxyValue(config.global);
      insert.run("global", JSON.stringify(current.global));
    }
    for (const mapKey of ["providers", "combos", "keys"]) {
      if (config[mapKey]) {
        const merged = { ...toProxyMap(current[mapKey]), ...toProxyMap(config[mapKey]) };
        for (const [k, v] of Object.entries(merged)) {
          if (!v) delete merged[k];
        }
        current[mapKey] = merged;
        insert.run(mapKey, JSON.stringify(merged));
      }
    }
  });
  tx();

  backupDbFile("pre-write");
  return current;
}

// ──────────────── Cache Control Metrics ────────────────
// Cache metrics are now computed from usage_history table on-the-fly
// This avoids race conditions and keeps a single source of truth for token data

export async function getCacheMetrics() {
  const db = getDbInstance();

  try {
    // Aggregate totals from usage_history
    const totalsRow = db
      .prepare(
        `
      SELECT
        COUNT(*) as totalRequests,
        SUM(tokens_input) as totalInputTokens,
        SUM(tokens_cache_read) as totalCachedTokens,
        SUM(tokens_cache_creation) as totalCacheCreationTokens
      FROM usage_history
      WHERE tokens_cache_read > 0 OR tokens_cache_creation > 0
    `
      )
      .get() as
      | {
          totalRequests: number;
          totalInputTokens: number | null;
          totalCachedTokens: number | null;
          totalCacheCreationTokens: number | null;
        }
      | undefined;

    // Get all requests count (including those without cache activity)
    const allRequestsRow = db
      .prepare(
        `
      SELECT COUNT(*) as totalRequests
      FROM usage_history
    `
      )
      .get() as { totalRequests: number } | undefined;

    // Aggregate by provider
    const byProviderRows = db
      .prepare(
        `
      SELECT
        provider,
        COUNT(*) as totalRequests,
        SUM(CASE WHEN tokens_cache_read > 0 OR tokens_cache_creation > 0 THEN 1 ELSE 0 END) as cachedRequests,
        SUM(CASE WHEN tokens_cache_read > 0 OR tokens_cache_creation > 0 THEN tokens_input ELSE 0 END) as inputTokens,
        SUM(tokens_cache_read) as cachedTokens,
        SUM(tokens_cache_creation) as cacheCreationTokens
      FROM usage_history
      WHERE provider IS NOT NULL
      GROUP BY provider
      HAVING cachedRequests > 0
    `
      )
      .all() as Array<{
      provider: string;
      totalRequests: number;
      cachedRequests: number;
      inputTokens: number | null;
      cachedTokens: number | null;
      cacheCreationTokens: number | null;
    }>;

    // Aggregate by strategy
    // Since combo_strategy isn't tracked in usage_history yet, we use 'direct' for all requests
    // TODO: Add combo_strategy column to usage_history for proper strategy tracking
    const byStrategyRows = db
      .prepare(
        `
      SELECT
        'direct' as strategy,
        COUNT(*) as requests,
        SUM(tokens_input) as inputTokens,
        SUM(tokens_cache_read) as cachedTokens,
        SUM(tokens_cache_creation) as cacheCreationTokens
      FROM usage_history
      WHERE (tokens_cache_read > 0 OR tokens_cache_creation > 0)
      GROUP BY 'direct'
    `
      )
      .all() as Array<{
      strategy: string;
      requests: number;
      inputTokens: number | null;
      cachedTokens: number | null;
      cacheCreationTokens: number | null;
    }>;

    const tokensSaved = totalsRow?.totalCachedTokens || 0;

    const AVG_INPUT_PRICE_PER_MILLION = 3;
    const CACHE_DISCOUNT = 0.9;
    const estimatedCostSaved =
      Math.round((tokensSaved / 1_000_000) * AVG_INPUT_PRICE_PER_MILLION * CACHE_DISCOUNT * 100) /
      100;

    // Build byProvider object
    const byProvider: Record<
      string,
      {
        requests: number;
        totalRequests: number;
        cachedRequests: number;
        inputTokens: number;
        cachedTokens: number;
        cacheCreationTokens: number;
      }
    > = {};
    for (const row of byProviderRows) {
      byProvider[row.provider] = {
        requests: row.cachedRequests,
        totalRequests: row.totalRequests,
        cachedRequests: row.cachedRequests,
        inputTokens: row.inputTokens || 0,
        cachedTokens: row.cachedTokens || 0,
        cacheCreationTokens: row.cacheCreationTokens || 0,
      };
    }

    // Build byStrategy object
    const byStrategy: Record<
      string,
      {
        requests: number;
        inputTokens: number;
        cachedTokens: number;
        cacheCreationTokens: number;
      }
    > = {};
    for (const row of byStrategyRows) {
      byStrategy[row.strategy] = {
        requests: row.requests,
        inputTokens: row.inputTokens || 0,
        cachedTokens: row.cachedTokens || 0,
        cacheCreationTokens: row.cacheCreationTokens || 0,
      };
    }

    return {
      totalRequests: allRequestsRow?.totalRequests || totalsRow?.totalRequests || 0,
      requestsWithCacheControl: totalsRow?.totalRequests || 0,
      totalInputTokens: totalsRow?.totalInputTokens || 0,
      totalCachedTokens: totalsRow?.totalCachedTokens || 0,
      totalCacheCreationTokens: totalsRow?.totalCacheCreationTokens || 0,
      tokensSaved,
      estimatedCostSaved,
      byProvider,
      byStrategy,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch cache metrics from usage_history:", error);
    return {
      totalRequests: 0,
      requestsWithCacheControl: 0,
      totalInputTokens: 0,
      totalCachedTokens: 0,
      totalCacheCreationTokens: 0,
      tokensSaved: 0,
      estimatedCostSaved: 0,
      byProvider: {},
      byStrategy: {},
      lastUpdated: new Date().toISOString(),
    };
  }
}

export async function updateCacheMetrics(_metrics: Record<string, unknown>) {
  // No-op: metrics are now computed from usage_history on-the-fly
  // The usage_history table is the single source of truth
  return getCacheMetrics();
}

export interface CacheTrendPoint {
  timestamp: string;
  requests: number;
  cachedRequests: number;
  inputTokens: number;
  cachedTokens: number;
  cacheCreationTokens: number;
}

export async function getCacheTrend(hours = 24): Promise<CacheTrendPoint[]> {
  const db = getDbInstance();

  try {
    const rows = db
      .prepare(
        `
        SELECT
          strftime('%Y-%m-%dT%H:00:00Z', timestamp) as hour,
          COUNT(*) as requests,
          SUM(CASE WHEN tokens_cache_read > 0 OR tokens_cache_creation > 0 THEN 1 ELSE 0 END) as cachedRequests,
          SUM(tokens_input) as inputTokens,
          SUM(tokens_cache_read) as cachedTokens,
          SUM(tokens_cache_creation) as cacheCreationTokens
        FROM usage_history
        WHERE timestamp >= datetime('now', ?)
        GROUP BY hour
        ORDER BY hour ASC
      `
      )
      .all(`-${hours} hours`) as Array<{
      hour: string;
      requests: number;
      cachedRequests: number;
      inputTokens: number | null;
      cachedTokens: number | null;
      cacheCreationTokens: number | null;
    }>;

    return rows.map((r) => ({
      timestamp: r.hour,
      requests: r.requests,
      cachedRequests: r.cachedRequests,
      inputTokens: r.inputTokens || 0,
      cachedTokens: r.cachedTokens || 0,
      cacheCreationTokens: r.cacheCreationTokens || 0,
    }));
  } catch (error) {
    console.error("Failed to fetch cache trend:", error);
    return [];
  }
}

export async function resetCacheMetrics() {
  // No-op: cannot delete historical usage data
  // Cache metrics are computed from usage_history, so they reflect actual request history
  console.warn(
    "resetCacheMetrics is deprecated - cache metrics are now computed from usage_history"
  );
  return getCacheMetrics();
}
