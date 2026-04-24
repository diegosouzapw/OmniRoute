import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-route-edges-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";
process.env.CLOUD_URL = "http://cloud.example";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const localDb = await import("../../src/lib/localDb.ts");
const listKeysRoute = await import("../../src/app/api/keys/route.ts");
const settingsProxyRoute = await import("../../src/app/api/settings/proxy/route.ts");
const managementProxiesRoute = await import("../../src/app/api/v1/management/proxies/route.ts");
const embeddingsRoute = await import("../../src/app/api/v1/embeddings/route.ts");

const MACHINE_ID = "1234567890abcdef";

async function resetStorage() {
  delete process.env.ALLOW_API_KEY_REVEAL;
  delete process.env.INITIAL_PASSWORD;
  delete process.env.REQUIRE_API_KEY;
  delete process.env.ENABLE_SOCKS5_PROXY;

  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

async function createManagementKey() {
  return apiKeysDb.createApiKey("management", MACHINE_ID);
}

function makeRequest(url, { method = "GET", token, body, headers } = {}) {
  const requestHeaders = new Headers(headers);
  if (token) {
    requestHeaders.set("authorization", `Bearer ${token}`);
  }
  if (body !== undefined && !requestHeaders.has("content-type")) {
    requestHeaders.set("content-type", "application/json");
  }

  return new Request(url, {
    method,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function seedOpenAIConnection({
  email = "embeddings@example.com",
  provider = "openai",
  rateLimitedUntil = null,
} = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    email,
    name: email,
    apiKey: "sk-provider",
    testStatus: "active",
    lastError: null,
    lastErrorType: "token_refresh_failed",
    lastErrorSource: "oauth",
    errorCode: "refresh_failed",
    rateLimitedUntil,
    backoffLevel: 2,
  });
}

async function withPrepareFailure(match, message, fn) {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);

  db.prepare = (sql, ...args) => {
    const sqlText = String(sql);
    const matched = typeof match === "function" ? match(sqlText) : sqlText.includes(match);
    if (matched) {
      throw new Error(message);
    }
    return originalPrepare(sql, ...args);
  };

  try {
    return await fn();
  } finally {
    db.prepare = originalPrepare;
  }
}

async function withPrepareOverride(match, override, fn) {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);

  db.prepare = (sql, ...args) => {
    const sqlText = String(sql);
    const matched = typeof match === "function" ? match(sqlText) : sqlText.includes(match);
    const statement = originalPrepare(sql, ...args);
    if (!matched) {
      return statement;
    }
    return override({ sqlText, statement, args });
  };

  try {
    return await fn();
  } finally {
    db.prepare = originalPrepare;
  }
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("api keys route covers auth, create, masking, pagination fallback and cloud sync", async () => {
  await enableManagementAuth();

  const unauthenticated = await listKeysRoute.GET(new Request("http://localhost/api/keys"));
  const invalidToken = await listKeysRoute.GET(
    new Request("http://localhost/api/keys", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );
  await createManagementKey();

  const originalFetch = globalThis.fetch;
  const fetchCalls = [];
  globalThis.fetch = async (url, options = {}) => {
    fetchCalls.push({ url: String(url), options });
    return Response.json({ changes: { apiKeys: 1 } });
  };

  try {
    await localDb.updateSettings({ cloudEnabled: true });

    const created = await listKeysRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/keys", {
        method: "POST",
        body: { name: "Key / Prod #1", noLog: true },
      })
    );
    const createdBody = (await created.json()) as any;
    const stored = await apiKeysDb.getApiKeyById(createdBody.id);

    await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
    await apiKeysDb.createApiKey("Beta", MACHINE_ID);

    const paged = await listKeysRoute.GET(
      await makeManagementSessionRequest("http://localhost/api/keys?limit=0&offset=-25")
    );

    const unauthenticatedBody = (await unauthenticated.json()) as any;
    const invalidTokenBody = (await invalidToken.json()) as any;
    const pagedBody = (await paged.json()) as any;

    assert.equal(unauthenticated.status, 401);
    assert.equal(unauthenticatedBody.error.message, "Authentication required");
    assert.equal(invalidToken.status, 403);
    assert.equal(invalidTokenBody.error.message, "Invalid management token");

    assert.equal(created.status, 201);
    assert.equal(createdBody.name, "Key / Prod #1");
    assert.equal(createdBody.noLog, true);
    assert.match(createdBody.key, /^sk-/);
    assert.equal(stored?.noLog, true);
    assert.equal(compliance.isNoLog(createdBody.id), true);

    assert.equal(paged.status, 200);
    assert.equal(pagedBody.total, 4);
    assert.equal(pagedBody.keys.length, 4);
    assert.match(pagedBody.keys[0].key, /\*{4}/);
    assert.equal(fetchCalls.length, 1);
    assert.match(fetchCalls[0].url, /^http:\/\/cloud\.example\/sync\//);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("api keys route rejects invalid payloads and malformed JSON", async () => {
  await enableManagementAuth();
  await createManagementKey();

  const missingName = await listKeysRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: {},
    })
  );

  const malformed = await listKeysRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );

  const malformedBody = (await malformed.json()) as any;

  assert.equal(missingName.status, 400);
  assert.equal(malformed.status, 500);
  assert.equal(malformedBody.error, "Failed to create key");
});

test("settings proxy route covers full config, resolve, validation, delete and global fallback", async () => {
  const providerConnection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "provider-conn",
    apiKey: "sk-openai",
  });

  const invalidJson = await settingsProxyRoute.PUT(
    new Request("http://localhost/api/settings/proxy", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );

  const invalidBody = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: { level: "provider", proxy: "bad-shape" },
    })
  );

  const validPut = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "provider",
        id: "openai",
        proxy: { type: "http", host: "provider.local", port: "8080" },
        global: { type: "https", host: "global.local", port: "443" },
        combos: {
          primary: { type: "http", host: "combo.local", port: "9000" },
        },
        keys: {
          key1: { type: "https", host: "key.local", port: "9443" },
        },
      },
    })
  );
  const legacyPut = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        global: { type: "https", host: "global.local", port: "443" },
        combos: {
          primary: { type: "http", host: "combo.local", port: "9000" },
        },
        keys: {
          key1: { type: "https", host: "key.local", port: "9443" },
        },
      },
    })
  );

  const providerGet = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy?level=provider&id=openai")
  );
  const resolveGet = await settingsProxyRoute.GET(
    new Request(`http://localhost/api/settings/proxy?resolve=${providerConnection.id}`)
  );
  const fullConfig = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy")
  );
  const deleted = await settingsProxyRoute.DELETE(
    new Request("http://localhost/api/settings/proxy?level=provider&id=openai", {
      method: "DELETE",
    })
  );
  const resolveAfterDelete = await settingsProxyRoute.GET(
    new Request(`http://localhost/api/settings/proxy?resolve=${providerConnection.id}`)
  );
  const missingLevel = await settingsProxyRoute.DELETE(
    new Request("http://localhost/api/settings/proxy", { method: "DELETE" })
  );

  const invalidJsonBody = (await invalidJson.json()) as any;
  const invalidBodyPayload = (await invalidBody.json()) as any;
  const validPutBody = (await validPut.json()) as any;
  const legacyPutBody = (await legacyPut.json()) as any;
  const providerGetBody = (await providerGet.json()) as any;
  const resolveBody = (await resolveGet.json()) as any;
  const fullConfigBody = (await fullConfig.json()) as any;
  const deletedBody = (await deleted.json()) as any;
  const resolveAfterDeleteBody = (await resolveAfterDelete.json()) as any;
  const missingLevelBody = (await missingLevel.json()) as any;

  assert.equal(invalidJson.status, 400);
  assert.equal(invalidJsonBody.error.message, "Invalid JSON body");
  assert.equal(invalidBody.status, 400);
  assert.match(invalidBodyPayload.error.message, /invalid/i);

  assert.equal(validPut.status, 200);
  assert.equal(validPutBody.providers.openai.host, "provider.local");
  assert.equal(legacyPut.status, 200);
  assert.equal(legacyPutBody.global.host, "global.local");
  assert.equal(providerGet.status, 200);
  assert.equal(providerGetBody.proxy.host, "provider.local");
  assert.equal(resolveGet.status, 200);
  assert.equal(resolveBody.proxy.host, "provider.local");
  assert.equal(fullConfig.status, 200);
  assert.equal(fullConfigBody.global.host, "global.local");
  assert.equal(deleted.status, 200);
  assert.equal(Object.prototype.hasOwnProperty.call(deletedBody.providers, "openai"), false);
  assert.equal(resolveAfterDelete.status, 200);
  assert.equal(resolveAfterDeleteBody.level, "global");
  assert.equal(resolveAfterDeleteBody.proxy.host, "global.local");
  assert.equal(missingLevel.status, 400);
  assert.equal(missingLevelBody.error.message, "level is required");
});

test("settings proxy route prefers proxy registry assignments and enforces socks5 feature gating", async () => {
  const created = await localDb.createProxy({
    name: "Global Proxy",
    type: "http",
    host: "registry.local",
    port: 8080,
    username: "alice",
    password: "secret",
  });
  await localDb.assignProxyToScope("global", null, created.id);

  const registryBacked = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy?level=global")
  );
  const registryBackedBody = (await registryBacked.json()) as any;

  process.env.ENABLE_SOCKS5_PROXY = "false";
  const disabledSocks = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "global",
        proxy: { type: "socks5", host: "127.0.0.1", port: "1080" },
      },
    })
  );

  process.env.ENABLE_SOCKS5_PROXY = "true";
  const enabledSocks = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "global",
        proxy: { type: "SOCKS5", host: "127.0.0.1", port: "1080" },
      },
    })
  );

  const disabledSocksBody = (await disabledSocks.json()) as any;
  const enabledSocksBody = (await enabledSocks.json()) as any;

  assert.equal(registryBacked.status, 200);
  assert.equal(registryBackedBody.proxy.host, "registry.local");
  assert.equal(registryBackedBody.proxy.password, "secret");
  assert.equal(disabledSocks.status, 400);
  assert.match(disabledSocksBody.error.message, /SOCKS5 proxy is disabled/i);
  assert.equal(enabledSocks.status, 200);
  assert.equal(enabledSocksBody.global.type, "socks5");
});

test("settings proxy route covers default types, null maps, registry fallback, and server-error branches", async () => {
  const defaultTypePut = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "global",
        proxy: { host: "default-type.local", port: "8088" },
      },
    })
  );
  assert.equal(defaultTypePut.status, 200);
  const defaultTypeBody = (await defaultTypePut.json()) as any;
  assert.equal(defaultTypeBody.global.type, "http");

  const clearMapPut = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        global: null,
        providers: { openai: null },
      },
    })
  );
  assert.equal(clearMapPut.status, 200);
  const clearMapBody = (await clearMapPut.json()) as any;
  assert.equal(clearMapBody.global, null);
  assert.equal(Object.prototype.hasOwnProperty.call(clearMapBody.providers || {}, "openai"), false);

  await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "global",
        proxy: { type: "https", host: "legacy-fallback.local", port: "9443" },
      },
    })
  );

  const missingRegistryProxy = await localDb.createProxy({
    name: "Missing Registry Proxy",
    type: "http",
    host: "missing-registry.local",
    port: 8080,
  });
  await localDb.assignProxyToScope("global", null, missingRegistryProxy.id);

  await withPrepareOverride(
    "FROM proxy_registry WHERE id = ?",
    ({ statement }) => ({
      ...statement,
      get() {
        return undefined;
      },
    }),
    async () => {
      const response = await settingsProxyRoute.GET(
        new Request("http://localhost/api/settings/proxy?level=global")
      );
      assert.equal(response.status, 200);
      const body = (await response.json()) as any;
      assert.equal(body.level, "global");
      assert.equal(body.proxy.host, "legacy-fallback.local");
    }
  );

  await withPrepareFailure(
    "SELECT key, value FROM key_value WHERE namespace = 'proxyConfig'",
    "proxy config read failure",
    async () => {
      const response = await settingsProxyRoute.GET(
        new Request("http://localhost/api/settings/proxy")
      );
      assert.equal(response.status, 500);
      assert.match((await response.json()).error.message, /proxy config read failure/i);
    }
  );

  await withPrepareFailure(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', 'global', ?)",
    "proxy config write failure",
    async () => {
      const response = await settingsProxyRoute.PUT(
        makeRequest("http://localhost/api/settings/proxy", {
          method: "PUT",
          body: {
            level: "global",
            proxy: { host: "broken-write.local", port: "8080" },
          },
        })
      );
      assert.equal(response.status, 500);
      const body = (await response.json()) as any;
      assert.equal(body.error.type, "server_error");
      assert.match(body.error.message, /proxy config write failure/i);
    }
  );

  await withPrepareFailure(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', 'global', ?)",
    "proxy config delete failure",
    async () => {
      const response = await settingsProxyRoute.DELETE(
        new Request("http://localhost/api/settings/proxy?level=global", {
          method: "DELETE",
        })
      );
      assert.equal(response.status, 500);
      assert.match((await response.json()).error.message, /proxy config delete failure/i);
    }
  );
});

test("management proxies route covers auth, pagination, lookup, where-used, patch and delete flows", async () => {
  await enableManagementAuth();
  await createManagementKey();

  const unauthenticated = await managementProxiesRoute.GET(
    new Request("http://localhost/api/v1/management/proxies")
  );
  const invalidToken = await managementProxiesRoute.GET(
    new Request("http://localhost/api/v1/management/proxies", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );

  const createdResponse = await managementProxiesRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "POST",
      body: {
        name: "Branch Proxy",
        type: "http",
        host: "branch.local",
        port: 8080,
      },
    })
  );
  const created = (await createdResponse.json()) as any;
  await localDb.assignProxyToScope("provider", "openai", created.id);

  const pagedList = await managementProxiesRoute.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/v1/management/proxies?limit=999&offset=-5"
    )
  );
  const byId = await managementProxiesRoute.GET(
    await makeManagementSessionRequest(
      `http://localhost/api/v1/management/proxies?id=${created.id}`
    )
  );
  const whereUsed = await managementProxiesRoute.GET(
    await makeManagementSessionRequest(
      `http://localhost/api/v1/management/proxies?id=${created.id}&where_used=1`
    )
  );
  const missingGet = await managementProxiesRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies?id=missing")
  );
  const invalidJsonPatch = await managementProxiesRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const invalidPatch = await managementProxiesRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      body: {},
    })
  );
  const patched = await managementProxiesRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      body: { id: created.id, host: "patched.local", notes: "updated" },
    })
  );
  const missingDelete = await managementProxiesRoute.DELETE(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "DELETE",
    })
  );
  const conflictDelete = await managementProxiesRoute.DELETE(
    await makeManagementSessionRequest(
      `http://localhost/api/v1/management/proxies?id=${created.id}`,
      {
        method: "DELETE",
      }
    )
  );
  const forcedDelete = await managementProxiesRoute.DELETE(
    await makeManagementSessionRequest(
      `http://localhost/api/v1/management/proxies?id=${created.id}&force=1`,
      {
        method: "DELETE",
      }
    )
  );

  const unauthenticatedBody = (await unauthenticated.json()) as any;
  const invalidTokenBody = (await invalidToken.json()) as any;
  const pagedListBody = (await pagedList.json()) as any;
  const byIdBody = (await byId.json()) as any;
  const whereUsedBody = (await whereUsed.json()) as any;
  const missingGetBody = (await missingGet.json()) as any;
  const invalidJsonPatchBody = (await invalidJsonPatch.json()) as any;
  const invalidPatchBody = (await invalidPatch.json()) as any;
  const patchedBody = (await patched.json()) as any;
  const missingDeleteBody = (await missingDelete.json()) as any;
  const conflictDeleteBody = (await conflictDelete.json()) as any;
  const forcedDeleteBody = (await forcedDelete.json()) as any;

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
  assert.equal(createdResponse.status, 201);
  assert.equal(pagedList.status, 200);
  assert.equal(pagedListBody.page.limit, 200);
  assert.equal(pagedListBody.page.offset, 0);
  assert.equal(byId.status, 200);
  assert.equal(byIdBody.id, created.id);
  assert.equal(whereUsed.status, 200);
  assert.equal(whereUsedBody.count, 1);
  assert.equal(missingGet.status, 404);
  assert.equal(missingGetBody.error.message, "Proxy not found");
  assert.equal(invalidJsonPatch.status, 400);
  assert.equal(invalidJsonPatchBody.error.message, "Invalid JSON body");
  assert.equal(invalidPatch.status, 400);
  assert.equal(invalidPatchBody.error.message, "Invalid request");
  assert.equal(patched.status, 200);
  assert.equal(patchedBody.host, "patched.local");
  assert.equal(missingDelete.status, 400);
  assert.equal(missingDeleteBody.error.message, "id is required");
  assert.equal(conflictDelete.status, 409);
  assert.match(conflictDeleteBody.error.message, /force=true/i);
  assert.equal(forcedDelete.status, 200);
  assert.equal(forcedDeleteBody.success, true);
});

test("embeddings route covers options, custom-model listing and defensive POST branches", async () => {
  await modelsDb.addCustomModel(
    "custom-embedder",
    "text-embed-1",
    "Custom Embedder",
    "manual",
    "responses",
    ["embeddings"]
  );

  const optionsResponse = await embeddingsRoute.OPTIONS();
  const getResponse = await embeddingsRoute.GET();
  const getBody = (await getResponse.json()) as any;

  const invalidJson = await embeddingsRoute.POST(
    new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const validationFailure = await embeddingsRoute.POST(
    makeRequest("http://localhost/v1/embeddings", {
      method: "POST",
      body: {},
    })
  );
  const invalidModel = await embeddingsRoute.POST(
    makeRequest("http://localhost/v1/embeddings", {
      method: "POST",
      body: { model: "unknown/model", input: "hello" },
    })
  );

  const optionsHeaders = Object.fromEntries(optionsResponse.headers.entries());
  const invalidJsonBody = (await invalidJson.json()) as any;
  const validationFailureBody = (await validationFailure.json()) as any;
  const invalidModelBody = (await invalidModel.json()) as any;

  assert.equal(optionsHeaders["access-control-allow-origin"], "*");
  assert.equal(getResponse.status, 200);
  assert.equal(
    getBody.data.some((model) => model.id === "custom-embedder/text-embed-1"),
    true
  );
  assert.equal(invalidJson.status, 400);
  assert.equal(invalidJsonBody.error.message, "Invalid JSON body");
  assert.equal(validationFailure.status, 400);
  assert.match(validationFailureBody.error.message, /invalid|required/i);
  assert.equal(invalidModel.status, 400);
  assert.match(
    invalidModelBody.error.message,
    /Invalid embedding model|Unknown embedding provider/
  );
});

test("embeddings route enforces caller auth, missing credentials and provider rate limits", async () => {
  process.env.REQUIRE_API_KEY = "true";

  const missingKey = await embeddingsRoute.POST(
    makeRequest("http://localhost/v1/embeddings", {
      method: "POST",
      body: { model: "openai/text-embedding-3-small", input: "hello" },
    })
  );

  const invalidKey = await embeddingsRoute.POST(
    new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer sk-invalid",
      },
      body: JSON.stringify({ model: "openai/text-embedding-3-small", input: "hello" }),
    })
  );

  const validApiKey = await apiKeysDb.createApiKey("caller", MACHINE_ID);
  const missingCredentials = await embeddingsRoute.POST(
    new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${validApiKey.key}`,
      },
      body: JSON.stringify({ model: "openai/text-embedding-3-small", input: "hello" }),
    })
  );

  await seedOpenAIConnection({
    email: "rate-limited@example.com",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });

  const allRateLimited = await embeddingsRoute.POST(
    new Request("http://localhost/v1/embeddings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${validApiKey.key}`,
      },
      body: JSON.stringify({ model: "openai/text-embedding-3-small", input: "hello" }),
    })
  );

  const missingKeyBody = (await missingKey.json()) as any;
  const invalidKeyBody = (await invalidKey.json()) as any;
  const missingCredentialsBody = (await missingCredentials.json()) as any;
  const allRateLimitedBody = (await allRateLimited.json()) as any;

  assert.equal(missingKey.status, 401);
  assert.equal(missingKeyBody.error.message, "Missing API key");
  assert.equal(invalidKey.status, 401);
  assert.equal(invalidKeyBody.error.message, "Invalid API key");
  assert.equal(missingCredentials.status, 400);
  assert.match(missingCredentialsBody.error.message, /No credentials for embedding provider/);
  assert.equal(allRateLimited.status, 429);
  assert.match(allRateLimitedBody.error.message, /All accounts rate limited/);
});

test("embeddings route tolerates custom-model and provider-node lookup failures", async () => {
  await seedOpenAIConnection();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    Response.json({
      data: [{ object: "embedding", index: 0, embedding: [0.1, 0.2] }],
      usage: { prompt_tokens: 3, total_tokens: 3 },
    });

  try {
    await withPrepareFailure(
      "SELECT key, value FROM key_value WHERE namespace = 'customModels'",
      "custom models unavailable",
      async () => {
        const response = await embeddingsRoute.GET();
        const body = (await response.json()) as any;

        assert.equal(response.status, 200);
        assert.ok(body.data.some((model) => model.id === "openai/text-embedding-3-small"));
      }
    );

    await withPrepareFailure(
      "SELECT * FROM provider_nodes",
      "provider nodes unavailable",
      async () => {
        const response = await embeddingsRoute.POST(
          makeRequest("http://localhost/v1/embeddings", {
            method: "POST",
            body: { model: "openai/text-embedding-3-small", input: "hello" },
          })
        );
        const body = (await response.json()) as any;

        assert.equal(response.status, 200);
        assert.equal(body.model, "openai/text-embedding-3-small");
      }
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("embeddings route supports local provider nodes without credentials and enforces model policy", async () => {
  await providersDb.createProviderNode({
    id: "local-embed-node",
    type: "openai-compatible",
    name: "Local Embed Node",
    prefix: "localembed",
    apiType: "chat",
    baseUrl: "http://localhost:7788/v1",
  });

  const localFetchCalls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    localFetchCalls.push({
      url: String(url),
      headers: init.headers,
      body: JSON.parse(String(init.body)),
    });
    return Response.json({
      data: [{ object: "embedding", index: 0, embedding: [0.9, 0.1] }],
      usage: { prompt_tokens: 2, total_tokens: 2 },
    });
  };

  try {
    const localResponse = await embeddingsRoute.POST(
      makeRequest("http://localhost/v1/embeddings", {
        method: "POST",
        body: {
          model: "localembed/demo-embed",
          input: "hello",
          user: "user-123",
        },
      })
    );
    const localBody = (await localResponse.json()) as any;

    assert.equal(localResponse.status, 200);
    assert.equal(localBody.model, "localembed/demo-embed");
    assert.equal(localFetchCalls.length, 1);
    assert.equal(localFetchCalls[0].url, "http://localhost:7788/v1/embeddings");
    assert.equal(localFetchCalls[0].headers.Authorization, undefined);
    assert.equal(localFetchCalls[0].body.model, "demo-embed");
    assert.equal(localFetchCalls[0].body.user, "user-123");

    process.env.REQUIRE_API_KEY = "true";
    const restrictedKey = await apiKeysDb.createApiKey("embeddings-policy", MACHINE_ID);
    await apiKeysDb.updateApiKeyPermissions(restrictedKey.id, {
      allowedModels: ["openai/text-embedding-ada-002"],
    });

    const rejected = await embeddingsRoute.POST(
      new Request("http://localhost/v1/embeddings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${restrictedKey.key}`,
        },
        body: JSON.stringify({
          model: "openai/text-embedding-3-small",
          input: "hello",
        }),
      })
    );
    const rejectedBody = (await rejected.json()) as any;

    assert.equal(rejected.status, 403);
    assert.match(rejectedBody.error.message, /not allowed/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("embeddings route returns normalized upstream failures", async () => {
  await seedOpenAIConnection();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("upstream boom", { status: 502 });

  try {
    const response = await embeddingsRoute.POST(
      makeRequest("http://localhost/v1/embeddings", {
        method: "POST",
        body: { model: "openai/text-embedding-3-small", input: "hello" },
      })
    );
    const body = (await response.json()) as any;

    assert.equal(response.status, 502);
    assert.equal(body.error.message, "upstream boom");
    assert.equal(body.error.type, "upstream_error");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("embeddings route GET skips malformed, non-embedding, and duplicate custom model rows", async () => {
  await modelsDb.addCustomModel(
    "openai",
    "text-embedding-3-small",
    "Duplicate OpenAI Embed",
    "manual",
    "responses",
    ["embeddings"]
  );

  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)"
  ).run("broken-embed-provider", JSON.stringify({ invalid: true }));
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)"
  ).run(
    "mixed-embed-provider",
    JSON.stringify([
      { name: "Missing Id", supportedEndpoints: ["embeddings"] },
      { id: "chat-only", supportedEndpoints: ["chat"] },
      { id: "edge-embed", supportedEndpoints: ["embeddings"] },
    ])
  );

  const response = await embeddingsRoute.GET();
  const body = (await response.json()) as any;
  const ids = body.data.map((model) => model.id);

  assert.equal(response.status, 200);
  assert.equal(ids.filter((id) => id === "openai/text-embedding-3-small").length, 1);
  assert.ok(ids.includes("mixed-embed-provider/edge-embed"));
  assert.equal(ids.includes("mixed-embed-provider/chat-only"), false);
  assert.equal(ids.includes("broken-embed-provider/edge-embed"), false);
});

test("embeddings route tolerates non-array provider nodes and remote fallback lookup errors", async () => {
  await seedOpenAIConnection();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    Response.json({
      data: [{ object: "embedding", index: 0, embedding: [0.3, 0.4] }],
      usage: { prompt_tokens: 2, total_tokens: 2 },
    });

  try {
    await withPrepareOverride(
      "SELECT * FROM provider_nodes",
      ({ statement }) =>
        new Proxy(statement, {
          get(target, prop, receiver) {
            if (prop === "all") {
              return () => ({ broken: true });
            }
            return Reflect.get(target, prop, receiver);
          },
        }),
      async () => {
        const response = await embeddingsRoute.POST(
          makeRequest("http://localhost/v1/embeddings", {
            method: "POST",
            body: { model: "openai/text-embedding-3-small", input: "hello" },
          })
        );
        assert.equal(response.status, 200);
      }
    );

    let providerNodeSelects = 0;
    const remoteFallback = await withPrepareOverride(
      "SELECT * FROM provider_nodes",
      ({ statement }) =>
        new Proxy(statement, {
          get(target, prop, receiver) {
            if (prop === "all") {
              return (...args) => {
                providerNodeSelects++;
                if (providerNodeSelects === 1) {
                  return [];
                }
                throw new Error("remote provider node lookup failed");
              };
            }
            return Reflect.get(target, prop, receiver);
          },
        }),
      async () =>
        embeddingsRoute.POST(
          makeRequest("http://localhost/v1/embeddings", {
            method: "POST",
            body: { model: "remote/demo-embed", input: "hello" },
          })
        )
    );
    const remoteFallbackBody = (await remoteFallback.json()) as any;

    assert.equal(remoteFallback.status, 400);
    assert.match(remoteFallbackBody.error.message, /Unknown embedding provider|No matching/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("embeddings route handles responses provider nodes, invalid local nodes, and id-less remote fallback", async () => {
  await providersDb.createProviderNode({
    type: "openai-compatible",
    name: "Local Responses Embed Node",
    prefix: "localresponses",
    apiType: "responses",
    baseUrl: "http://localhost:7790/v1",
  });
  await providersDb.createProviderNode({
    type: "openai-compatible",
    name: "Invalid URL Node",
    prefix: "badurl",
    apiType: "chat",
    baseUrl: "not a valid url",
  });
  await providersDb.createProviderNode({
    type: "openai-compatible",
    name: "Invalid Prefix Node",
    prefix: "bad/prefix",
    apiType: "chat",
    baseUrl: "http://localhost:7791/v1",
  });
  await providersDb.createProviderConnection({
    provider: "remoteprefix",
    authType: "apikey",
    name: "remoteprefix-key",
    apiKey: "sk-remoteprefix",
  });

  const originalFetch = globalThis.fetch;
  const fetchCalls = [];
  globalThis.fetch = async (url, init = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: init.headers,
      body: JSON.parse(String(init.body)),
    });
    return Response.json({
      data: [{ object: "embedding", index: 0, embedding: [0.7, 0.8] }],
      usage: { prompt_tokens: 4, total_tokens: 4 },
    });
  };

  try {
    const localResponse = await embeddingsRoute.POST(
      makeRequest("http://localhost/v1/embeddings", {
        method: "POST",
        body: { model: "localresponses/demo-embed", input: "hello" },
      })
    );
    assert.equal(localResponse.status, 200);
    assert.equal(fetchCalls[0].url, "http://localhost:7790/v1/embeddings");

    const remoteResponse = await withPrepareOverride(
      "SELECT * FROM provider_nodes",
      ({ statement }) =>
        new Proxy(statement, {
          get(target, prop, receiver) {
            if (prop === "all") {
              return () => [
                {
                  prefix: "remoteprefix",
                  apiType: "responses",
                  baseUrl: "https://remote.example.com/v1beta/openai",
                },
              ];
            }
            return Reflect.get(target, prop, receiver);
          },
        }),
      async () =>
        embeddingsRoute.POST(
          makeRequest("http://localhost/v1/embeddings", {
            method: "POST",
            body: { model: "remoteprefix/demo-embed", input: "hello" },
          })
        )
    );
    const remoteBody = (await remoteResponse.json()) as any;

    assert.equal(remoteResponse.status, 200);
    assert.equal(fetchCalls[1].url, "https://remote.example.com/v1beta/openai/embeddings");
    assert.equal(fetchCalls[1].headers.Authorization, "Bearer sk-remoteprefix");
    assert.equal(remoteBody.model, "remoteprefix/demo-embed");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
