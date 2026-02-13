import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fixes-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.js");
const backupDb = await import("../../src/lib/db/backup.js");
const providersDb = await import("../../src/lib/db/providers.js");
const combosDb = await import("../../src/lib/db/combos.js");
const settingsDb = await import("../../src/lib/db/settings.js");
const tokenRefresh = await import("../../open-sse/services/tokenRefresh.js");
const proxyFetch = await import("../../open-sse/utils/proxyFetch.js");
const proxyDispatcher = await import("../../open-sse/utils/proxyDispatcher.js");
const proxySettingsRoute = await import("../../src/app/api/settings/proxy/route.js");
const proxyTestRoute = await import("../../src/app/api/settings/proxy/test/route.js");

async function withEnv(name, value, fn) {
  const previous = process.env[name];
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }

  try {
    return await fn();
  } finally {
    if (previous === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = previous;
    }
  }
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("token refresh dedupe key avoids collision for same-prefix tokens", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];

  globalThis.fetch = async (_url, options = {}) => {
    const refreshToken = options.body?.get?.("refresh_token") || "unknown";
    requests.push(refreshToken);
    return new Response(
      JSON.stringify({
        access_token: `access-${refreshToken}`,
        refresh_token: `refresh-${refreshToken}`,
        expires_in: 3600,
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const prefix = "abcdefghijklmnop";
    const tokenA = `${prefix}-account-a`;
    const tokenB = `${prefix}-account-b`;

    const [resultA, resultB] = await Promise.all([
      tokenRefresh.getAccessToken("codex", { refreshToken: tokenA }, null),
      tokenRefresh.getAccessToken("codex", { refreshToken: tokenB }, null),
    ]);

    assert.equal(requests.length, 2);
    assert.equal(resultA.accessToken, `access-${tokenA}`);
    assert.equal(resultB.accessToken, `access-${tokenB}`);
    assert.notEqual(resultA.accessToken, resultB.accessToken);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("restoreDbBackup clears stale sqlite sidecars before reopen", async () => {
  await resetStorage();

  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run("restore-test-conn", "openai", "apikey", "restore-test", 1, now, now);

  const backupId = "db_2000-01-01T00-00-00-000Z_manual.sqlite";
  const backupPath = path.join(core.DB_BACKUPS_DIR, backupId);
  fs.mkdirSync(core.DB_BACKUPS_DIR, { recursive: true });
  await db.backup(backupPath);

  fs.writeFileSync(`${core.SQLITE_FILE}-wal`, "STALE-WAL-MARKER");
  fs.writeFileSync(`${core.SQLITE_FILE}-shm`, "STALE-SHM-MARKER");
  fs.writeFileSync(`${core.SQLITE_FILE}-journal`, "STALE-JOURNAL-MARKER");

  await backupDb.restoreDbBackup(backupId);

  for (const suffix of ["-wal", "-shm", "-journal"]) {
    const sidecarPath = `${core.SQLITE_FILE}${suffix}`;
    if (!fs.existsSync(sidecarPath)) continue;
    const text = fs.readFileSync(sidecarPath, "utf8");
    assert.equal(text.includes("STALE-"), false, `sidecar ${suffix} still contains stale marker`);
  }

  const reopenedDb = core.getDbInstance();
  const row = reopenedDb
    .prepare("SELECT COUNT(*) AS cnt FROM provider_connections WHERE id = ?")
    .get("restore-test-conn");
  assert.equal(row.cnt, 1);
});

test("provider connection persists rateLimitProtection across reopen", async () => {
  await resetStorage();

  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "rl-test",
    apiKey: "sk-test",
  });

  await providersDb.updateProviderConnection(created.id, { rateLimitProtection: true });

  const firstRead = await providersDb.getProviderConnectionById(created.id);
  assert.equal(firstRead.rateLimitProtection, true);

  core.resetDbInstance();
  const secondRead = await providersDb.getProviderConnectionById(created.id);
  assert.equal(secondRead.rateLimitProtection, true);
});

test("resolveProxyForConnection applies combo proxy for object/string model entries", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "combo-test@example.com",
    accessToken: "access",
    refreshToken: "refresh",
  });

  const combo = await combosDb.createCombo({
    id: "combo-proxy-test",
    name: "combo-proxy-test",
    strategy: "priority",
    models: ["openai/gpt-5", { model: "cc/claude-sonnet-4-5-20250929", weight: 100 }],
  });

  await settingsDb.setProxyForLevel("combo", combo.id, {
    type: "http",
    host: "127.0.0.1",
    port: "8080",
  });

  const resolved = await settingsDb.resolveProxyForConnection(conn.id);
  assert.equal(resolved.level, "combo");
  assert.equal(resolved.levelId, combo.id);
});

test("normalizeProxyUrl accepts socks5 only when explicitly allowed", () => {
  const socksUrl = "socks5://127.0.0.1:1080";

  const normalized = proxyDispatcher.normalizeProxyUrl(socksUrl, "test proxy", {
    allowSocks5: true,
  });
  assert.match(normalized, /^socks5:\/\/127\.0\.0\.1:1080\/?$/);

  assert.throws(
    () =>
      proxyDispatcher.normalizeProxyUrl(socksUrl, "test proxy", {
        allowSocks5: false,
      }),
    /SOCKS5 proxy is disabled/i
  );
});

test("createProxyDispatcher builds dispatchers for http, https, and socks5", async () => {
  await withEnv("ENABLE_SOCKS5_PROXY", "true", async () => {
    const httpDispatcher = proxyDispatcher.createProxyDispatcher("http://127.0.0.1:8080");
    const httpsDispatcher = proxyDispatcher.createProxyDispatcher("https://127.0.0.1:8443");
    const socksDispatcher = proxyDispatcher.createProxyDispatcher("socks5://127.0.0.1:1080");

    assert.equal(typeof httpDispatcher.dispatch, "function");
    assert.equal(typeof httpsDispatcher.dispatch, "function");
    assert.equal(typeof socksDispatcher.dispatch, "function");
  });
});

test("proxy fetch fails closed when context proxy is invalid", async () => {
  await assert.rejects(
    proxyFetch.runWithProxyContext({ type: "http", host: "127.0.0.1", port: "9" }, async () =>
      fetch("https://example.com")
    )
  );
});

test("proxy fetch rejects socks5 context when feature flag is disabled", async () => {
  await withEnv("ENABLE_SOCKS5_PROXY", "false", async () => {
    await assert.rejects(
      proxyFetch.runWithProxyContext(
        { type: "socks5", host: "127.0.0.1", port: "1080" },
        async () => fetch("https://example.com")
      ),
      /ENABLE_SOCKS5_PROXY/i
    );
  });
});

test("proxy fetch accepts socks5 context when feature flag is enabled", async () => {
  await withEnv("ENABLE_SOCKS5_PROXY", "true", async () => {
    const result = await proxyFetch.runWithProxyContext(
      { type: "socks5", host: "127.0.0.1", port: "1080" },
      async () => "ok"
    );
    assert.equal(result, "ok");
  });
});

test("proxy settings route blocks socks5 with backend flag disabled", async () => {
  await resetStorage();

  await withEnv("ENABLE_SOCKS5_PROXY", "false", async () => {
    const request = new Request("http://localhost/api/settings/proxy", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        level: "global",
        proxy: {
          type: "socks5",
          host: "127.0.0.1",
          port: "1080",
        },
      }),
    });

    const response = await proxySettingsRoute.PUT(request);
    const payload = await response.json();
    assert.equal(response.status, 400);
    assert.match(payload.error.message, /SOCKS5 proxy is disabled/i);
  });
});

test("proxy settings route accepts socks5 with backend flag enabled", async () => {
  await resetStorage();

  await withEnv("ENABLE_SOCKS5_PROXY", "true", async () => {
    const request = new Request("http://localhost/api/settings/proxy", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        level: "global",
        proxy: {
          type: "SOCKS5",
          host: "127.0.0.1",
          port: "1080",
        },
      }),
    });

    const response = await proxySettingsRoute.PUT(request);
    const payload = await response.json();
    assert.equal(response.status, 200);
    assert.equal(payload.global.type, "socks5");
  });
});

test("proxy test route rejects socks5 when backend flag is disabled", async () => {
  await withEnv("ENABLE_SOCKS5_PROXY", "false", async () => {
    const request = new Request("http://localhost/api/settings/proxy/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        proxy: {
          type: "socks5",
          host: "127.0.0.1",
          port: "1080",
        },
      }),
    });

    const response = await proxyTestRoute.POST(request);
    const payload = await response.json();

    assert.equal(response.status, 400);
    assert.match(payload.error.message, /SOCKS5 proxy is disabled/i);
  });
});

test("proxy test route runs socks5 test when backend flag is enabled", async () => {
  await withEnv("ENABLE_SOCKS5_PROXY", "true", async () => {
    const request = new Request("http://localhost/api/settings/proxy/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        proxy: {
          type: "socks5",
          host: "127.0.0.1",
          port: "1",
        },
      }),
    });

    const response = await proxyTestRoute.POST(request);
    const payload = await response.json();

    assert.notEqual(response.status, 400);
    assert.equal(payload.success, false);
    assert.equal(payload.proxyUrl, "socks5://127.0.0.1:1");
  });
});
