/**
 * db/settings.js — Settings, pricing, and proxy config.
 */

import { getDbInstance } from "./core.js";
import { backupDbFile } from "./backup.js";
import { PROVIDER_ID_TO_ALIAS } from "@omniroute/open-sse/config/providerModels.js";

// ──────────────── Settings ────────────────

export async function getSettings() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'settings'").all();
  const settings = { cloudEnabled: false, stickyRoundRobinLimit: 3, requireLogin: true };
  for (const row of rows) {
    settings[row.key] = JSON.parse(row.value);
  }
  return settings;
}

export async function updateSettings(updates) {
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
  return getSettings();
}

export async function isCloudEnabled() {
  const settings = await getSettings();
  return settings.cloudEnabled === true;
}

// ──────────────── Pricing ────────────────

export async function getPricing() {
  const db = getDbInstance();
  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all();
  const userPricing = {};
  for (const row of rows) {
    userPricing[row.key] = JSON.parse(row.value);
  }

  const { getDefaultPricing } = await import("@/shared/constants/pricing.js");
  const defaultPricing = getDefaultPricing();

  const mergedPricing = {};
  for (const [provider, models] of Object.entries(defaultPricing)) {
    mergedPricing[provider] = { ...models };
    if (userPricing[provider]) {
      for (const [model, pricing] of Object.entries(userPricing[provider])) {
        mergedPricing[provider][model] = mergedPricing[provider][model]
          ? { ...mergedPricing[provider][model], ...pricing }
          : pricing;
      }
    }
  }

  for (const [provider, models] of Object.entries(userPricing)) {
    if (!mergedPricing[provider]) {
      mergedPricing[provider] = { ...models };
    } else {
      for (const [model, pricing] of Object.entries(models)) {
        if (!mergedPricing[provider][model]) {
          mergedPricing[provider][model] = pricing;
        }
      }
    }
  }

  return mergedPricing;
}

export async function getPricingForModel(provider, model) {
  const pricing = await getPricing();
  if (pricing[provider]?.[model]) return pricing[provider][model];

  const { PROVIDER_ID_TO_ALIAS } = await import("@omniroute/open-sse/config/providerModels.js");
  const alias = PROVIDER_ID_TO_ALIAS[provider];
  if (alias && pricing[alias]) return pricing[alias][model] || null;

  const np = provider?.replace(/-cn$/, "");
  if (np && np !== provider && pricing[np]) return pricing[np][model] || null;

  return null;
}

export async function updatePricing(pricingData) {
  const db = getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('pricing', ?, ?)"
  );

  const rows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all();
  const existing = {};
  for (const row of rows) existing[row.key] = JSON.parse(row.value);

  const tx = db.transaction(() => {
    for (const [provider, models] of Object.entries(pricingData)) {
      insert.run(provider, JSON.stringify({ ...(existing[provider] || {}), ...models }));
    }
  });
  tx();
  backupDbFile("pre-write");

  const updated = {};
  const allRows = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all();
  for (const row of allRows) updated[row.key] = JSON.parse(row.value);
  return updated;
}

export async function resetPricing(provider, model) {
  const db = getDbInstance();

  if (model) {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = 'pricing' AND key = ?")
      .get(provider);
    if (row) {
      const models = JSON.parse(row.value);
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
  const result = {};
  for (const row of allRows) result[row.key] = JSON.parse(row.value);
  return result;
}

export async function resetAllPricing() {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'pricing'").run();
  backupDbFile("pre-write");
  return {};
}

// ──────────────── Proxy Config ────────────────

const DEFAULT_PROXY_CONFIG = { global: null, providers: {}, combos: {}, keys: {} };
const ALIAS_TO_PROVIDER_ID = Object.entries(PROVIDER_ID_TO_ALIAS).reduce(
  (acc, [providerId, alias]) => {
    if (alias) acc[alias] = providerId;
    acc[providerId] = providerId;
    return acc;
  },
  {}
);

function resolveProviderAliasOrId(providerOrAlias) {
  if (typeof providerOrAlias !== "string") return providerOrAlias;
  return ALIAS_TO_PROVIDER_ID[providerOrAlias] || providerOrAlias;
}

function getComboModelProvider(modelEntry) {
  if (modelEntry && typeof modelEntry.provider === "string") {
    return resolveProviderAliasOrId(modelEntry.provider);
  }

  const modelValue =
    typeof modelEntry === "string"
      ? modelEntry
      : typeof modelEntry?.model === "string"
        ? modelEntry.model
        : null;

  if (!modelValue) return null;

  const [providerOrAlias] = modelValue.split("/", 1);
  if (!providerOrAlias) return null;
  return resolveProviderAliasOrId(providerOrAlias);
}

function migrateProxyEntry(value) {
  if (!value) return null;
  if (typeof value === "object" && value.type) return value;
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return {
      type: url.protocol.replace(":", "").replace("//", "") || "http",
      host: url.hostname,
      port: url.port || (url.protocol === "socks5:" ? "1080" : "8080"),
      username: url.username || "",
      password: url.password || "",
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

  const raw = { ...DEFAULT_PROXY_CONFIG };
  for (const row of rows) raw[row.key] = JSON.parse(row.value);

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

export async function getProxyForLevel(level, id) {
  const config = await getProxyConfig();
  if (level === "global") return config.global || null;
  const map = config[level + "s"] || config[level] || {};
  return (id ? map[id] : null) || null;
}

export async function setProxyForLevel(level, id, proxy) {
  const db = getDbInstance();
  const config = await getProxyConfig();

  if (level === "global") {
    config.global = proxy || null;
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', 'global', ?)"
    ).run(JSON.stringify(config.global));
  } else {
    const mapKey = level + "s";
    if (!config[mapKey]) config[mapKey] = {};
    if (proxy) {
      config[mapKey][id] = proxy;
    } else {
      delete config[mapKey][id];
    }
    db.prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', ?, ?)"
    ).run(mapKey, JSON.stringify(config[mapKey]));
  }

  backupDbFile("pre-write");
  return config;
}

export async function deleteProxyForLevel(level, id) {
  return setProxyForLevel(level, id, null);
}

export async function resolveProxyForConnection(connectionId) {
  const config = await getProxyConfig();

  if (connectionId && config.keys?.[connectionId]) {
    return { proxy: config.keys[connectionId], level: "key", levelId: connectionId };
  }

  const db = getDbInstance();
  const connection = db
    .prepare("SELECT provider FROM provider_connections WHERE id = ?")
    .get(connectionId);

  if (connection) {
    if (config.combos && Object.keys(config.combos).length > 0) {
      const combos = db.prepare("SELECT id, data FROM combos").all();
      for (const comboRow of combos) {
        if (config.combos[comboRow.id]) {
          try {
            const combo = JSON.parse(comboRow.data);
            const usesProvider = (combo.models || []).some(
              (entry) => getComboModelProvider(entry) === connection.provider
            );
            if (usesProvider) {
              return { proxy: config.combos[comboRow.id], level: "combo", levelId: comboRow.id };
            }
          } catch {
            // Ignore malformed combo records during proxy resolution.
          }
        }
      }
    }

    if (config.providers?.[connection.provider]) {
      return {
        proxy: config.providers[connection.provider],
        level: "provider",
        levelId: connection.provider,
      };
    }
  }

  if (config.global) {
    return { proxy: config.global, level: "global", levelId: null };
  }

  return { proxy: null, level: "direct", levelId: null };
}

export async function setProxyConfig(config) {
  if (config.level !== undefined) {
    return setProxyForLevel(config.level, config.id || null, config.proxy);
  }

  const db = getDbInstance();
  const current = await getProxyConfig();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', ?, ?)"
  );

  const tx = db.transaction(() => {
    if (config.global !== undefined) {
      current.global = config.global || null;
      insert.run("global", JSON.stringify(current.global));
    }
    for (const mapKey of ["providers", "combos", "keys"]) {
      if (config[mapKey]) {
        current[mapKey] = { ...(current[mapKey] || {}), ...config[mapKey] };
        for (const [k, v] of Object.entries(current[mapKey])) {
          if (!v) delete current[mapKey][k];
        }
        insert.run(mapKey, JSON.stringify(current[mapKey]));
      }
    }
  });
  tx();

  backupDbFile("pre-write");
  return current;
}
