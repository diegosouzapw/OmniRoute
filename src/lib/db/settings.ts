/**
 * db/settings.js — Settings, pricing, and proxy config.
 */

import { getDbInstance } from "./core";
import { backupDbFile } from "./backup";
import { PROVIDER_ID_TO_ALIAS } from "@omniroute/open-sse/config/providerModels.ts";
import { invalidateDbCache } from "./readCache";
import { getProxyRegistryGeneration, resolveProxyForScopeFromRegistry } from "./proxies";
import { getComboModelProvider as getComboEntryProvider } from "@/lib/combos/steps";
import { requestBodyLimitMbFromEnv } from "@/shared/constants/bodySize";
import { DEFAULT_RESPONSES_PREVIOUS_RESPONSE_ID_MODE } from "@/shared/constants/responsesPreviousResponseId";
import { type JsonRecord, toRecord } from "./settings/shared";

type ProxyValue = JsonRecord | string | null;
type ProxyResolutionResult = {
  proxy: ProxyValue;
  level: string;
  levelId: string | null;
  source?: string;
};
type ProxyResolutionCacheEntry = {
  generation: number;
  registryGeneration: number;
  result: ProxyResolutionResult;
};

const PROXY_RESOLUTION_CACHE_MAX_ENTRIES = 100;

function isTruthyEnvFlag(value: string | undefined): boolean {
  return typeof value === "string" && /^(1|true|yes|on)$/i.test(value.trim());
}

let proxyConfigGeneration = 0;
const proxyResolutionCache = new Map<string, ProxyResolutionCacheEntry>();

export function bumpProxyConfigGeneration() {
  proxyConfigGeneration++;
  proxyResolutionCache.clear();
}

function cacheProxyResolution(
  connectionId: string,
  generation: number,
  registryGeneration: number,
  result: ProxyResolutionResult
) {
  if (generation !== proxyConfigGeneration) return;
  if (registryGeneration !== getProxyRegistryGeneration()) return;
  if (proxyResolutionCache.size >= PROXY_RESOLUTION_CACHE_MAX_ENTRIES) {
    const oldestKey = proxyResolutionCache.keys().next().value;
    if (oldestKey) proxyResolutionCache.delete(oldestKey);
  }
  proxyResolutionCache.set(connectionId, { generation, registryGeneration, result });
}
type ProxyMap = Record<string, ProxyValue>;

interface ProxyConfig {
  global: ProxyValue;
  providers: ProxyMap;
  combos: ProxyMap;
  keys: ProxyMap;
  [key: string]: unknown;
}

function toProxyMap(value: unknown): ProxyMap {
  return value && typeof value === "object" ? (value as ProxyMap) : {};
}

function toProxyValue(value: unknown): ProxyValue {
  if (value === null || typeof value === "string") return value as string | null;
  if (value && typeof value === "object") return value as JsonRecord;
  return null;
}

// Legacy proxyConfig store (key_value namespace 'proxyConfig') predates the
// IPv6-only `family` directive, so its object configs have no family field.
// Default to "auto" so the family marker rides along the cascade end-to-end
// (consumed by proxyConfigToUrl). String configs are returned unchanged.
function withFamilyDefault(value: ProxyValue): ProxyValue {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as JsonRecord;
    if (typeof record.family === "string") return record;
    return { ...record, family: "auto" };
  }
  return value;
}

// ──────────────── Settings ────────────────

export async function getSettings() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'settings'").all();
  const settings: Record<string, unknown> = {
    cloudEnabled: true,
    tailscaleEnabled: false,
    tailscaleUrl: "",
    stickyRoundRobinLimit: 3,
    requestRetry: 3,
    maxRetryIntervalSec: 30,
    antigravitySignatureCacheMode: "enabled",
    requireLogin: true,
    mcpEnabled: false,
    a2aEnabled: false,
    hiddenSidebarItems: [],
    hiddenSidebarGroupLabels: [],
    sidebarSectionOrder: [],
    sidebarItemOrder: {},
    sidebarActivePreset: null,
    hideEndpointCloudflaredTunnel: false,
    hideEndpointTailscaleFunnel: false,
    hideEndpointNgrokTunnel: false,
    preferClaudeCodeForUnprefixedClaudeModels: isTruthyEnvFlag(
      process.env.OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS
    ),
    // Opt-in (default "off"): short-circuits Claude Code's `--permission-mode auto`
    // internal security-classifier request with a synthetic `<block>no</block>` ALLOW
    // response, without calling the upstream provider. See
    // open-sse/handlers/chatCore/claudeClassifierCompat.ts for the detector + builder.
    claudeClassifierCompat: "off",
    autoRefreshProviderQuota: false,
    autoRefreshProviderQuotaInterval: 180,
    comboConfigMode: "guided",
    comboAutoPromoteEnabled: false,
    codexServiceTier: { enabled: false },
    claudeFastMode: {
      enabled: false,
      supportedModels: ["claude-fable-5", "claude-opus-4-8", "claude-opus-4-7", "claude-opus-4-6"],
    },
    codexSessionAffinityTtlMs: 0,
    responsesPreviousResponseIdMode: DEFAULT_RESPONSES_PREVIOUS_RESPONSE_ID_MODE,
    alwaysPreserveClientCache: "auto",
    idempotencyWindowMs: 5000,
    wsAuth: false,
    maxBodySizeMb: requestBodyLimitMbFromEnv(process.env.MAX_BODY_SIZE_BYTES),
    debugMode: true,
    // Opt-in diagnostic: when true, the chat handler emits a `log.debug("TOOLS", …)`
    // line per request summarizing tool count + MCP/hosted/client source breakdown.
    logToolSources: false,
    // LOCAL_ONLY manage-scope bypass policy defaults (T-011 / spec §Data Model).
    // Preserves PR #2473 behaviour on migration — the bypass starts ENABLED
    // for `/api/mcp/` so existing manage-scope Bearer clients keep working.
    // Operators flip the kill-switch to false (or drop the prefix) via the
    // Settings UI; the change hot-reloads through `applyRuntimeSettings` →
    // `applyAuthzBypassSection` → `getAuthzBypassSnapshot()`.
    localOnlyManageScopeBypassEnabled: true,
    localOnlyManageScopeBypassPrefixes: ["/api/mcp/"],
    customBannedSignals: [],
    proxyEnabled: true,
    perKeyProxyEnabled: false,
    customSystemPromptEnabled: false,
    customSystemPrompt: "",
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

  // Bust proxy resolution cache when proxy toggle settings change
  const PROXY_TOGGLE_KEYS = ["proxyEnabled", "perKeyProxyEnabled"];
  if (Object.keys(updates).some((k) => PROXY_TOGGLE_KEYS.includes(k))) {
    bumpProxyConfigGeneration();
  }

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
  bumpProxyConfigGeneration();
  return config;
}

export async function deleteProxyForLevel(level: string, id: string | null) {
  return setProxyForLevel(level, id, null);
}

export async function resolveProxyForConnection(connectionId: string, apiKeyId?: string) {
  const cacheKey = apiKeyId ? `${connectionId}:${apiKeyId}` : connectionId;
  const startGeneration = proxyConfigGeneration;
  const startRegistryGeneration = getProxyRegistryGeneration();
  const cached = proxyResolutionCache.get(cacheKey);
  if (
    cached &&
    cached.generation === startGeneration &&
    cached.registryGeneration === startRegistryGeneration
  ) {
    return cached.result;
  }

  const db = getDbInstance();

  // Step 1: Check global proxyEnabled setting
  // Read only the proxyEnabled key for performance instead of loading all settings.
  let globalProxyEnabled = true;
  try {
    const proxyEnabledRow = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'proxyEnabled'")
      .get() as { value?: string } | undefined;
    if (proxyEnabledRow?.value) {
      globalProxyEnabled = JSON.parse(proxyEnabledRow.value) !== false;
    }
  } catch {
    // Default to true on read error
  }

  if (!globalProxyEnabled) {
    const result: ProxyResolutionResult = { proxy: null, level: "direct", levelId: null };
    // Do not cache the "direct" result when global toggle is off so that
    // toggling it back on takes effect immediately without a generation bump.
    return result;
  }

  let connectionRecord: JsonRecord | null = null;
  let connectionProvider: string | null = null;
  let connectionProxyEnabled = true;
  let connectionPerKeyProxyEnabled = false;

  const row = db
    .prepare(
      "SELECT provider, proxy_enabled, per_key_proxy_enabled FROM provider_connections WHERE id = ?"
    )
    .get(connectionId);
  if (row) {
    connectionRecord = toRecord(row);
    connectionProvider =
      typeof connectionRecord.provider === "string" ? connectionRecord.provider : null;
    connectionProxyEnabled = connectionRecord.proxy_enabled !== 0;
    connectionPerKeyProxyEnabled = connectionRecord.per_key_proxy_enabled === 1;
  }

  // A connection-level Proxy Off is explicit: it must bypass every stored proxy
  // source for this connection, including account, provider, global, and automatic
  // fallback candidates from the proxy pool.
  if (connectionRecord && !connectionProxyEnabled) {
    const result: ProxyResolutionResult = { proxy: null, level: "direct", levelId: null };
    cacheProxyResolution(cacheKey, startGeneration, startRegistryGeneration, result);
    return result;
  }

  // Step 1.5: Check global perKeyProxyEnabled setting
  let globalPerKeyProxyEnabled = false;
  try {
    const perKeyRow = db
      .prepare(
        "SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'perKeyProxyEnabled'"
      )
      .get() as { value?: string } | undefined;
    if (perKeyRow?.value) {
      globalPerKeyProxyEnabled = JSON.parse(perKeyRow.value) !== false;
    }
  } catch {
    // Default to false on read error
  }

  const config = await getProxyConfig();

  // Step 2: API key-level proxy (only if per-key proxy is enabled globally or per-connection)
  if (apiKeyId) {
    // Check if per-key proxy is allowed: globally OR per-connection
    const perKeyEnabled = globalPerKeyProxyEnabled || connectionPerKeyProxyEnabled;

    if (perKeyEnabled) {
      try {
        const apiKeyRow = db.prepare("SELECT proxy_id FROM api_keys WHERE id = ?").get(apiKeyId) as
          { proxy_id?: string | null } | undefined;
        if (apiKeyRow?.proxy_id) {
          const proxyRow = db
            .prepare(
              "SELECT p.type, p.host, p.port, p.username, p.password, p.family FROM proxy_registry p WHERE p.id = ?"
            )
            .get(apiKeyRow.proxy_id) as
            | {
                type: string;
                host: string;
                port: number;
                username: string;
                password: string;
                family?: string;
              }
            | undefined;
          if (proxyRow) {
            const result = {
              proxy: {
                type: proxyRow.type,
                host: proxyRow.host,
                port: proxyRow.port,
                username: proxyRow.username,
                password: proxyRow.password,
                family: typeof proxyRow.family === "string" ? proxyRow.family : "auto",
              },
              level: "apiKey" as const,
              levelId: apiKeyId,
              source: "api_key" as const,
            };
            cacheProxyResolution(cacheKey, startGeneration, startRegistryGeneration, result);
            return result;
          }
        }
      } catch {
        // Fall through to existing resolution
      }
    }
  }

  // Step 3: Account-level registry
  const registryAccount = await resolveProxyForScopeFromRegistry("account", connectionId);
  if (registryAccount?.proxy) {
    cacheProxyResolution(cacheKey, startGeneration, startRegistryGeneration, registryAccount);
    return registryAccount;
  }

  // Step 4: Legacy key-level
  if (connectionId && config.keys?.[connectionId]) {
    const result = {
      proxy: withFamilyDefault(config.keys[connectionId]),
      level: "key",
      levelId: connectionId,
    };
    cacheProxyResolution(cacheKey, startGeneration, startRegistryGeneration, result);
    return result;
  }

  // Step 5: Use the connection's provider for provider/combo scoped proxies.
  if (connectionRecord) {
    // Step 6: Provider-level registry (only if proxy_enabled)
    if (connectionProvider && connectionProxyEnabled) {
      const registryProvider = await resolveProxyForScopeFromRegistry(
        "provider",
        connectionProvider
      );
      if (registryProvider?.proxy) {
        cacheProxyResolution(cacheKey, startGeneration, startRegistryGeneration, registryProvider);
        return registryProvider;
      }
    }

    // Step 7: Legacy combo-level (only if proxy_enabled)
    if (connectionProxyEnabled && config.combos && Object.keys(config.combos).length > 0) {
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
              (entry) => getComboModelProvider(entry) === connectionProvider
            );
            if (usesProvider) {
              const result = {
                proxy: withFamilyDefault(config.combos[comboId]),
                level: "combo",
                levelId: comboId,
              };
              cacheProxyResolution(cacheKey, startGeneration, startRegistryGeneration, result);
              return result;
            }
          } catch {
            // Ignore malformed combo records during proxy resolution.
          }
        }
      }
    }

    // Step 8: Legacy provider-level (only if proxy_enabled)
    if (connectionProvider && connectionProxyEnabled && config.providers?.[connectionProvider]) {
      const result = {
        proxy: withFamilyDefault(config.providers[connectionProvider]),
        level: "provider",
        levelId: connectionProvider,
      };
      cacheProxyResolution(cacheKey, startGeneration, startRegistryGeneration, result);
      return result;
    }
  }

  // Step 9: Global registry
  const registryGlobal = await resolveProxyForScopeFromRegistry("global");
  if (registryGlobal?.proxy) {
    cacheProxyResolution(cacheKey, startGeneration, startRegistryGeneration, registryGlobal);
    return registryGlobal;
  }

  // Step 10: Legacy global
  if (config.global) {
    const result = { proxy: withFamilyDefault(config.global), level: "global", levelId: null };
    cacheProxyResolution(cacheKey, startGeneration, startRegistryGeneration, result);
    return result;
  }

  // Step 11: Auto-selection fallback (only when global proxy is enabled)
  try {
    const { selectWorkingProxyFallback } = await import("@omniroute/open-sse/utils/proxyFallback");
    const fallback = await selectWorkingProxyFallback(connectionId);
    if (fallback) {
      // Auto-selected proxies are probed via a URL roundtrip that drops any
      // per-registry family policy, so default the family marker to "auto"
      // (no IPv6-only enforcement) when the fallback object omits it.
      const normalizedFallback =
        fallback.proxy && typeof fallback.proxy === "object"
          ? { ...fallback, proxy: withFamilyDefault(fallback.proxy as ProxyValue) }
          : fallback;
      cacheProxyResolution(
        cacheKey,
        startGeneration,
        startRegistryGeneration,
        normalizedFallback as ProxyResolutionResult
      );
      return normalizedFallback;
    }
  } catch (err) {
    console.warn({ err, connectionId }, "Proxy fallback auto-selection failed");
  }

  // Step 12: Return direct
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
  bumpProxyConfigGeneration();
  return current;
}

// ──────────────── Re-exports from leaf modules ────────────────

export {
  type PricingSource,
  type PricingSourceMap,
  getPricing,
  getPricingWithSources,
  getPricingForModel,
  updatePricing,
  resetPricing,
  resetAllPricing,
} from "./settings/pricing";

export { type LKGPRecord, getLKGP, setLKGP, clearAllLKGP } from "./settings/lkgp";

export {
  type CacheTrendPoint,
  getCacheMetrics,
  updateCacheMetrics,
  getCacheTrend,
  resetCacheMetrics,
} from "./settings/cacheMetrics";
