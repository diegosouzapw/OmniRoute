import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

test("getSettings exposes defaults and updateSettings persists typed values", async () => {
  const defaults = await settingsDb.getSettings();
  const updated = await settingsDb.updateSettings({
    requireLogin: false,
    cloudEnabled: true,
    stickyRoundRobinLimit: 7,
    requestRetry: 5,
    maxRetryIntervalSec: 12,
    label: "task-303",
  });

  assert.equal(defaults.cloudEnabled, false);
  assert.equal(defaults.requireLogin, true);
  assert.deepEqual(defaults.hiddenSidebarItems, []);
  assert.equal(defaults.idempotencyWindowMs, 5000);
  assert.equal(defaults.requestRetry, 3);
  assert.equal(defaults.maxRetryIntervalSec, 30);
  assert.equal(defaults.antigravitySignatureCacheMode, "enabled");
  assert.equal(defaults.comboConfigMode, "guided");
  assert.equal(defaults.mcpEnabled, false);
  assert.equal(defaults.a2aEnabled, false);
  assert.equal(updated.requireLogin, false);
  assert.equal(updated.cloudEnabled, true);
  assert.equal(updated.stickyRoundRobinLimit, 7);
  assert.equal(updated.requestRetry, 5);
  assert.equal(updated.maxRetryIntervalSec, 12);
  assert.equal(updated.antigravitySignatureCacheMode, "enabled");
  assert.equal(updated.label, "task-303");
  assert.equal(await settingsDb.isCloudEnabled(), true);
});

test("INITIAL_PASSWORD marks onboarding as complete on first read", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-secret";

  const settings = await settingsDb.getSettings();
  const stored = await settingsDb.getSettings();

  assert.equal(settings.setupComplete, true);
  assert.equal(settings.requireLogin, true);
  assert.equal(stored.setupComplete, true);
});

test("pricing layers merge synced, models.dev and user overrides", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing_synced",
    "layered-provider",
    JSON.stringify({
      "model-a": { prompt: 1, completion: 2 },
    })
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "models_dev_pricing",
    "layered-provider",
    JSON.stringify({
      "model-a": { completion: 5, cached: 3 },
    })
  );

  await settingsDb.updatePricing({
    "layered-provider": {
      "model-a": { prompt: 9, custom: 42 },
      "model-b": { prompt: 7 },
    },
  });

  const pricing = await settingsDb.getPricing();
  const direct = await settingsDb.getPricingForModel("layered-provider", "model-a");
  const cnFallback = await settingsDb.getPricingForModel("openai-cn", "gpt-4o");

  assert.deepEqual(pricing["layered-provider"]["model-a"], {
    prompt: 9,
    completion: 5,
    cached: 3,
    custom: 42,
  });
  assert.deepEqual(direct, {
    prompt: 9,
    completion: 5,
    cached: 3,
    custom: 42,
  });
  assert.ok(cnFallback);

  const afterModelReset = await settingsDb.resetPricing("layered-provider", "model-a");
  assert.equal(afterModelReset["layered-provider"]["model-a"], undefined);

  const afterProviderReset = await settingsDb.resetPricing("layered-provider");
  assert.equal(afterProviderReset["layered-provider"], undefined);

  await settingsDb.updatePricing({
    temp: { model: { prompt: 1 } },
  });
  assert.deepEqual(await settingsDb.resetAllPricing(), {});
});

test("getPricingWithSources reports the winning layer for each provider/model", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing_synced",
    "layer-source",
    JSON.stringify({
      "model-litellm": { prompt: 1, completion: 2 },
      "model-user": { prompt: 3 },
    })
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "models_dev_pricing",
    "layer-source",
    JSON.stringify({
      "model-modelsdev": { prompt: 4, completion: 5 },
      "model-user": { completion: 6 },
    })
  );

  await settingsDb.updatePricing({
    "layer-source": {
      "model-user": { cached: 7 },
    },
  });

  const { pricing, sourceMap } = await settingsDb.getPricingWithSources();

  assert.deepEqual(pricing["layer-source"]["model-litellm"], {
    prompt: 1,
    completion: 2,
  });
  assert.deepEqual(pricing["layer-source"]["model-modelsdev"], {
    prompt: 4,
    completion: 5,
  });
  assert.deepEqual(pricing["layer-source"]["model-user"], {
    prompt: 3,
    completion: 6,
    cached: 7,
  });
  assert.equal(sourceMap["layer-source"]["model-litellm"], "litellm");
  assert.equal(sourceMap["layer-source"]["model-modelsdev"], "modelsDev");
  assert.equal(sourceMap["layer-source"]["model-user"], "user");
  assert.equal(sourceMap.openai["gpt-4o"], "default");
});

test("LKGP values can be set, read and cleared", async () => {
  assert.equal(await settingsDb.getLKGP("combo-a", "model-a"), null);

  await settingsDb.setLKGP("combo-a", "model-a", "openai");
  await settingsDb.setLKGP("combo-a", "model-b", "anthropic");

  assert.equal(await settingsDb.getLKGP("combo-a", "model-a"), "openai");
  assert.equal(await settingsDb.getLKGP("combo-a", "model-b"), "anthropic");

  settingsDb.clearAllLKGP();

  assert.equal(await settingsDb.getLKGP("combo-a", "model-a"), null);
});

test("pricing helpers ignore malformed synced data and LKGP falls back to raw values", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "models_dev_pricing",
    "broken-provider",
    "{not-json"
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing",
    "alias-provider",
    JSON.stringify({
      "model-a": { prompt: 7 },
    })
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "lkgp",
    "combo-raw:model-raw",
    "raw-provider-id"
  );

  const pricing = await settingsDb.getPricing();

  assert.equal(pricing["broken-provider"], undefined);
  assert.equal(await settingsDb.getPricingForModel("alias-provider", "missing-model"), null);
  assert.equal(await settingsDb.getLKGP("combo-raw", "model-raw"), "raw-provider-id");
});

test("pricing helpers resolve aliased providers and tolerate no-op resets", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing",
    "cc",
    JSON.stringify({
      "claude-3-5-sonnet": { prompt: 4, completion: 6 },
    })
  );

  const aliasPricing = await settingsDb.getPricingForModel("claude", "claude-3-5-sonnet");
  const missingPricing = await settingsDb.getPricingForModel("missing-provider", "missing-model");
  const afterUnknownReset = await settingsDb.resetPricing("missing-provider", "missing-model");

  assert.deepEqual(aliasPricing, { prompt: 4, completion: 6 });
  assert.equal(missingPricing, null);
  assert.equal(afterUnknownReset["missing-provider"], undefined);
});

test("settings and pricing readers skip malformed rows while merging surviving layers", async () => {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);

  db.prepare = (sql) => {
    const text = String(sql);

    if (text.includes("namespace = 'settings'")) {
      return {
        all: () => [
          123,
          { key: 456, value: "true" },
          { key: "cloudEnabled", value: "true" },
          { key: "requireLogin", value: null },
        ],
      };
    }

    if (text === "SELECT key, value FROM key_value WHERE namespace = ?") {
      return {
        all: (namespace) => {
          if (namespace === "pricing_synced") {
            return [
              123,
              { key: 456, value: JSON.stringify({ ignored: true }) },
              {
                key: "layered-provider",
                value: JSON.stringify({
                  "model-a": { prompt: 1, completion: 2 },
                }),
              },
            ];
          }

          if (namespace === "models_dev_pricing") {
            return [
              { key: "broken-provider", value: "{bad" },
              { key: "missing-value", value: null },
              {
                key: "layered-provider",
                value: JSON.stringify({
                  "model-a": { cached: 3 },
                }),
              },
            ];
          }

          if (namespace === "pricing") {
            return [
              {
                key: "layered-provider",
                value: JSON.stringify({
                  "model-a": { prompt: 9, custom: 42 },
                  "model-b": { prompt: 7 },
                }),
              },
              { key: null, value: JSON.stringify({ ignored: true }) },
            ];
          }

          return originalPrepare(sql).all(namespace);
        },
      };
    }

    return originalPrepare(sql);
  };

  try {
    const settings = await settingsDb.getSettings();
    const pricing = await settingsDb.getPricing();
    const modelPricing = await settingsDb.getPricingForModel("layered-provider", "model-a");

    assert.equal(settings.cloudEnabled, true);
    assert.equal(settings.requireLogin, true);
    assert.deepEqual(pricing["layered-provider"]["model-a"], {
      prompt: 9,
      completion: 2,
      cached: 3,
      custom: 42,
    });
    assert.deepEqual(modelPricing, {
      prompt: 9,
      completion: 2,
      cached: 3,
      custom: 42,
    });
    assert.equal(pricing["broken-provider"], undefined);
  } finally {
    db.prepare = originalPrepare;
  }
});

test("proxy config migrates legacy strings and supports bulk merge updates", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "global",
    JSON.stringify("http://user:pass@global.local:8080")
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "providers",
    JSON.stringify({
      openai: "https://provider.local:8443",
    })
  );

  const migrated = await settingsDb.getProxyConfig();
  assert.deepEqual(migrated.global, {
    type: "http",
    host: "global.local",
    port: "8080",
    username: "user",
    password: "pass",
  });
  assert.deepEqual(migrated.providers.openai, {
    type: "https",
    host: "provider.local",
    port: "8443",
    username: "",
    password: "",
  });

  const merged = await settingsDb.setProxyConfig({
    providers: {
      openai: null,
      anthropic: {
        type: "http",
        host: "anthropic.local",
        port: 9000,
      },
    },
    keys: {
      key123: {
        type: "socks5",
        host: "key.local",
        port: 1080,
      },
    },
  });

  assert.equal(merged.providers.openai, undefined);
  assert.equal(merged.providers.anthropic.host, "anthropic.local");
  assert.equal((await settingsDb.getProxyForLevel("key", "key123")).host, "key.local");

  await settingsDb.deleteProxyForLevel("key", "key123");

  assert.equal(await settingsDb.getProxyForLevel("key", "key123"), null);
});

test("proxy config migrates socks5 and host-only entries while preserving plural lookups", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "global",
    JSON.stringify("fallback-only-host")
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "proxyConfig",
    "providers",
    JSON.stringify({
      claude: "socks5://sockshost",
    })
  );

  const migrated = await settingsDb.getProxyConfig();
  assert.deepEqual(migrated.global, {
    type: "http",
    host: "fallback-only-host",
    port: "8080",
    username: "",
    password: "",
  });
  assert.deepEqual(migrated.providers.claude, {
    type: "socks5",
    host: "sockshost",
    port: "1080",
    username: "",
    password: "",
  });
  assert.equal((await settingsDb.getProxyForLevel("providers", "claude")).host, "sockshost");

  const updated = await settingsDb.setProxyConfig({
    global: null,
    providers: {},
  });

  assert.equal(updated.global, null);
  assert.equal(await settingsDb.getProxyForLevel("global"), null);

  await settingsDb.deleteProxyForLevel("provider", null);

  assert.equal((await settingsDb.getProxyForLevel("provider", "claude")).host, "sockshost");
});

test("proxy helpers resolve key, provider, global, and direct paths while tolerating malformed combo rows", async () => {
  const db = core.getDbInstance();
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Proxy Resolution Target",
    apiKey: "sk-proxy-resolution",
  });

  await settingsDb.setProxyConfig({
    level: "global",
    proxy: {
      type: "http",
      host: "global.local",
      port: 8080,
    },
  });
  await settingsDb.setProxyForLevel("provider", "openai", {
    type: "https",
    host: "provider.local",
    port: 8443,
  });
  await settingsDb.setProxyForLevel("combo", "combo-broken", {
    type: "socks5",
    host: "combo.local",
    port: 1080,
  });
  const combo = await combosDb.createCombo({
    name: "combo-broken",
    models: ["openai/gpt-4o-mini"],
    strategy: "priority",
  });
  db.prepare("UPDATE combos SET data = ? WHERE id = ?").run("{not-json", combo.id);

  const providerResolved = await settingsDb.resolveProxyForConnection((connection as any).id);

  assert.equal(providerResolved.level, "provider");
  assert.equal(providerResolved.proxy.host, "provider.local");
  assert.deepEqual(await settingsDb.getProxyForLevel("combo", "combo-broken"), {
    type: "socks5",
    host: "combo.local",
    port: 1080,
  });

  await settingsDb.deleteProxyForLevel("provider", "openai");

  const globalResolved = await settingsDb.resolveProxyForConnection((connection as any).id);

  assert.equal(globalResolved.level, "global");
  assert.equal(globalResolved.proxy.host, "global.local");

  await settingsDb.setProxyForLevel("key", (connection as any).id, {
    type: "http",
    host: "key.local",
    port: 3128,
  });

  const keyResolved = await settingsDb.resolveProxyForConnection((connection as any).id);

  assert.equal(keyResolved.level, "key");
  assert.equal(keyResolved.proxy.host, "key.local");

  await settingsDb.deleteProxyForLevel("key", (connection as any).id);
  await settingsDb.deleteProxyForLevel("global", null);

  const directResolved = await settingsDb.resolveProxyForConnection((connection as any).id);

  assert.equal(directResolved.level, "direct");
  assert.equal(directResolved.proxy, null);
});

test("proxy resolution skips combos without serialized data and falls back to provider proxies", async () => {
  const db = core.getDbInstance();
  const connection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "Proxy Null Combo",
    apiKey: "sk-claude-proxy",
  });

  await settingsDb.setProxyForLevel("provider", "claude", {
    type: "https",
    host: "provider-claude.local",
    port: 443,
  });

  const combo = await combosDb.createCombo({
    name: "combo-null-data",
    models: ["claude/claude-3-5-sonnet"],
    strategy: "priority",
  });
  await settingsDb.setProxyForLevel("combo" as any, (combo as any).id, {
    type: "http",
    host: "combo-null.local",
    port: 8080,
  });
  db.prepare("UPDATE combos SET data = ? WHERE id = ?").run(0, combo.id);

  const resolved = await settingsDb.resolveProxyForConnection((connection as any).id);

  assert.equal(resolved.level, "provider");
  assert.equal(resolved.proxy.host, "provider-claude.local");
});

test("proxy resolution matches combo proxies through aliased model entries", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "Proxy Alias Combo",
    apiKey: "sk-claude-alias",
  });

  const combo = await combosDb.createCombo({
    name: "combo-aliased-model",
    models: [{ model: "cc/claude-3-5-sonnet" }],
    strategy: "priority",
  });
  await settingsDb.setProxyForLevel("combo", (combo as any).id, {
    type: "https",
    host: "combo-alias.local",
    port: 443,
  });

  const resolved = await settingsDb.resolveProxyForConnection((connection as any).id);

  assert.equal(resolved.level, "combo");
  assert.equal(resolved.levelId, combo.id);
  assert.equal(resolved.proxy.host, "combo-alias.local");
});

test("proxy readers normalize legacy rows, skip malformed entries, and coerce invalid globals to null", async () => {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);

  db.prepare = (sql) => {
    const text = String(sql);

    if (text.includes("namespace = 'proxyConfig'") && text.startsWith("SELECT")) {
      return {
        all: () => [
          123,
          { key: 456, value: JSON.stringify({ ignored: true }) },
          { key: "global", value: JSON.stringify("https://user%40name:pass%2Fword@proxy.example") },
          {
            key: "providers",
            value: JSON.stringify({
              openai: "http://provider.example",
            }),
          },
          { key: "combos", value: JSON.stringify("not-a-map") },
          { key: "keys", value: null },
        ],
      };
    }

    if (text.includes("namespace = 'proxyConfig'") && text.startsWith("INSERT OR REPLACE")) {
      return { run: () => ({ changes: 1 }) };
    }

    return originalPrepare(sql);
  };

  try {
    const config = await settingsDb.getProxyConfig();
    assert.deepEqual(config.global, {
      type: "https",
      host: "proxy.example",
      port: "443",
      username: "user@name",
      password: "pass/word",
    });
    assert.deepEqual(config.providers.openai, {
      type: "http",
      host: "provider.example",
      port: "8080",
      username: "",
      password: "",
    });
    assert.equal(await settingsDb.getProxyForLevel("combo", "missing"), null);
  } finally {
    db.prepare = originalPrepare;
  }

  const updated = await settingsDb.setProxyConfig({ level: 123, id: 456, proxy: 0 });
  assert.equal(updated.global, null);
  assert.equal(await settingsDb.getProxyForLevel("global"), null);
});

test("cache metrics, trend and no-op update/reset methods read from usage_history", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const insertUsage = db.prepare(`
    INSERT INTO usage_history (
      provider, model, connection_id, api_key_id, api_key_name,
      tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation,
      tokens_reasoning, status, success, latency_ms, ttft_ms, error_code, timestamp
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUsage.run(
    "openai",
    "gpt-4.1",
    "conn-1",
    "key-1",
    "Primary",
    1000,
    400,
    300,
    120,
    0,
    "200",
    1,
    100,
    40,
    null,
    oneHourAgo
  );
  insertUsage.run(
    "anthropic",
    "claude-3-7-sonnet",
    "conn-2",
    "key-2",
    "Secondary",
    700,
    280,
    200,
    80,
    0,
    "200",
    1,
    90,
    30,
    null,
    now
  );

  const metrics = await settingsDb.getCacheMetrics();
  const trend = await settingsDb.getCacheTrend(4);
  const updateNoOp = await settingsDb.updateCacheMetrics({ anything: true });
  const resetNoOp = await settingsDb.resetCacheMetrics();

  assert.ok(metrics.totalRequests >= 2);
  assert.ok(metrics.requestsWithCacheControl >= 2);
  assert.ok(metrics.byProvider.openai);
  assert.ok(metrics.byProvider.anthropic);
  assert.ok(trend.length >= 1);
  assert.equal(updateNoOp.totalCachedTokens, metrics.totalCachedTokens);
  assert.equal(resetNoOp.totalCachedTokens, metrics.totalCachedTokens);
});

test("cache metric helpers degrade gracefully when SQLite aggregation fails", async () => {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  db.prepare = () => {
    throw new Error("db offline");
  };

  try {
    const metrics = await settingsDb.getCacheMetrics();
    const updated = await settingsDb.updateCacheMetrics({ force: true });
    const trend = await settingsDb.getCacheTrend(6);
    const reset = await settingsDb.resetCacheMetrics();

    assert.equal(metrics.totalRequests, 0);
    assert.equal(updated.totalCachedTokens, 0);
    assert.deepEqual(trend, []);
    assert.equal(reset.requestsWithCacheControl, 0);
  } finally {
    db.prepare = originalPrepare;
  }
});

test("cache metrics and trend coerce null aggregate fields to zero", async () => {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);

  db.prepare = (sql) => {
    const text = String(sql);

    if (
      text.includes("COUNT(*) as totalRequests") &&
      text.includes("SUM(tokens_input) as totalInputTokens") &&
      !text.includes("GROUP BY")
    ) {
      return {
        get: () => ({
          totalRequests: 2,
          totalInputTokens: null,
          totalCachedTokens: null,
          totalCacheCreationTokens: null,
        }),
      };
    }

    if (text.match(/SELECT\s+COUNT\(\*\)\s+as\s+totalRequests\s+FROM\s+usage_history\s*$/)) {
      return {
        get: () => ({
          totalRequests: 5,
        }),
      };
    }

    if (text.includes("GROUP BY provider")) {
      return {
        all: () => [
          {
            provider: "openai",
            totalRequests: 1,
            cachedRequests: 1,
            inputTokens: null,
            cachedTokens: null,
            cacheCreationTokens: null,
          },
        ],
      };
    }

    if (text.includes("GROUP BY 'direct'")) {
      return {
        all: () => [
          {
            strategy: "direct",
            requests: 2,
            inputTokens: null,
            cachedTokens: null,
            cacheCreationTokens: null,
          },
        ],
      };
    }

    if (text.includes("strftime('%Y-%m-%dT%H:00:00Z', timestamp) as hour")) {
      return {
        all: () => [
          {
            hour: "2026-01-01T10:00:00Z",
            requests: 3,
            cachedRequests: 1,
            inputTokens: null,
            cachedTokens: null,
            cacheCreationTokens: null,
          },
        ],
      };
    }

    return originalPrepare(sql);
  };

  try {
    const metrics = await settingsDb.getCacheMetrics();
    const updated = await settingsDb.updateCacheMetrics({ force: true });
    const trend = await settingsDb.getCacheTrend(2);
    const reset = await settingsDb.resetCacheMetrics();

    assert.equal(metrics.totalRequests, 5);
    assert.equal(metrics.totalInputTokens, 0);
    assert.equal(metrics.totalCachedTokens, 0);
    assert.equal(metrics.totalCacheCreationTokens, 0);
    assert.deepEqual(metrics.byProvider.openai, {
      requests: 1,
      totalRequests: 1,
      cachedRequests: 1,
      inputTokens: 0,
      cachedTokens: 0,
      cacheCreationTokens: 0,
    });
    assert.deepEqual(metrics.byStrategy.direct, {
      requests: 2,
      inputTokens: 0,
      cachedTokens: 0,
      cacheCreationTokens: 0,
    });
    assert.deepEqual(trend, [
      {
        timestamp: "2026-01-01T10:00:00Z",
        requests: 3,
        cachedRequests: 1,
        inputTokens: 0,
        cachedTokens: 0,
        cacheCreationTokens: 0,
      },
    ]);
    assert.equal(updated.totalCachedTokens, 0);
    assert.equal(reset.totalCachedTokens, 0);
  } finally {
    db.prepare = originalPrepare;
  }
});
