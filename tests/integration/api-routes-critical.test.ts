import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-critical-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const localDb = await import("../../src/lib/localDb.ts");
const proxiesRoute = await import("../../src/app/api/v1/management/proxies/route.ts");
const settingsProxyRoute = await import("../../src/app/api/settings/proxy/route.ts");
const settingsMitmRoute = await import("../../src/app/api/settings/mitm/route.ts");
const v1ModelsRoute = await import("../../src/app/api/v1/models/route.ts");

const MACHINE_ID = "1234567890abcdef";

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
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

function makeRequest(url, { method = "GET", token, body } = {}) {
  const headers = new Headers();
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  if (body !== undefined) {
    headers.set("content-type", "application/json");
  }

  return new Request(url, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("critical routes: v1 management proxies covers auth, lookup, where-used, patch, and delete branches", async () => {
  await enableManagementAuth();
  await createManagementKey();

  const unauthenticated = await proxiesRoute.GET(
    new Request("http://localhost/api/v1/management/proxies")
  );
  const invalidToken = await proxiesRoute.GET(
    new Request("http://localhost/api/v1/management/proxies", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );
  const createResponse = await proxiesRoute.POST(
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
  const created = (await createResponse.json()) as any;

  await localDb.assignProxyToScope("provider", "openai", created.id);

  const getById = await proxiesRoute.GET(
    await makeManagementSessionRequest(
      `http://localhost/api/v1/management/proxies?id=${created.id}`
    )
  );
  const whereUsed = await proxiesRoute.GET(
    await makeManagementSessionRequest(
      `http://localhost/api/v1/management/proxies?id=${created.id}&where_used=1`
    )
  );
  const missingGet = await proxiesRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies?id=missing")
  );
  const invalidJsonPatch = await proxiesRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const invalidPatch = await proxiesRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      body: {},
    })
  );
  const validPatch = await proxiesRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      body: { id: created.id, host: "patched.local", notes: "updated" },
    })
  );
  const missingDelete = await proxiesRoute.DELETE(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "DELETE",
    })
  );
  const conflictDelete = await proxiesRoute.DELETE(
    await makeManagementSessionRequest(
      `http://localhost/api/v1/management/proxies?id=${created.id}`,
      {
        method: "DELETE",
      }
    )
  );
  const forcedDelete = await proxiesRoute.DELETE(
    await makeManagementSessionRequest(
      `http://localhost/api/v1/management/proxies?id=${created.id}&force=1`,
      {
        method: "DELETE",
      }
    )
  );

  const unauthenticatedBody = (await unauthenticated.json()) as any;
  const invalidTokenBody = (await invalidToken.json()) as any;
  const getByIdBody = (await getById.json()) as any;
  const whereUsedBody = (await whereUsed.json()) as any;
  const missingGetBody = (await missingGet.json()) as any;
  const invalidJsonPatchBody = (await invalidJsonPatch.json()) as any;
  const invalidPatchBody = (await invalidPatch.json()) as any;
  const validPatchBody = (await validPatch.json()) as any;
  const missingDeleteBody = (await missingDelete.json()) as any;
  const conflictDeleteBody = (await conflictDelete.json()) as any;
  const forcedDeleteBody = (await forcedDelete.json()) as any;

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
  assert.equal(createResponse.status, 201);
  assert.equal(getById.status, 200);
  assert.equal(getByIdBody.id, created.id);
  assert.equal(whereUsed.status, 200);
  assert.equal(whereUsedBody.count, 1);
  assert.equal(whereUsedBody.assignments[0].proxyId, created.id);
  assert.equal(missingGet.status, 404);
  assert.equal(missingGetBody.error.message, "Proxy not found");
  assert.equal(invalidJsonPatch.status, 400);
  assert.equal(invalidJsonPatchBody.error.message, "Invalid JSON body");
  assert.equal(invalidPatch.status, 400);
  assert.equal(validPatch.status, 200);
  assert.equal(validPatchBody.host, "patched.local");
  assert.equal(missingDelete.status, 400);
  assert.equal(missingDeleteBody.error.message, "id is required");
  assert.equal(conflictDelete.status, 409);
  assert.match(conflictDeleteBody.error.message, /force=true/i);
  assert.equal(forcedDelete.status, 200);
  assert.equal(forcedDeleteBody.success, true);
});

test("critical routes: v1 management proxies validates create payloads and clamps pagination", async () => {
  await enableManagementAuth();
  await createManagementKey();

  const invalidJsonPost = await proxiesRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const invalidPost = await proxiesRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "POST",
      body: {},
    })
  );

  const createdIds = [];
  for (let index = 0; index < 3; index += 1) {
    const createResponse = await proxiesRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
        method: "POST",
        body: {
          name: `Paged Proxy ${index + 1}`,
          type: index % 2 === 0 ? "http" : "https",
          host: `paged-${index + 1}.local`,
          port: 8000 + index,
        },
      })
    );
    const created = (await createResponse.json()) as any;
    createdIds.push(created.id);
    assert.equal(createResponse.status, 201);
  }

  const pagedList = await proxiesRoute.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/v1/management/proxies?limit=999&offset=-5"
    )
  );
  const missingPatch = await proxiesRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      body: { id: "missing", host: "absent.local" },
    })
  );
  const missingDelete = await proxiesRoute.DELETE(
    await makeManagementSessionRequest("http://localhost/api/v1/management/proxies?id=missing", {
      method: "DELETE",
    })
  );

  const invalidJsonPostBody = (await invalidJsonPost.json()) as any;
  const invalidPostBody = (await invalidPost.json()) as any;
  const pagedListBody = (await pagedList.json()) as any;
  const missingPatchBody = (await missingPatch.json()) as any;
  const missingDeleteBody = (await missingDelete.json()) as any;

  assert.equal(invalidJsonPost.status, 400);
  assert.equal(invalidJsonPostBody.error.message, "Invalid JSON body");
  assert.equal(invalidPost.status, 400);
  assert.equal(invalidPostBody.error.message, "Invalid request");
  assert.equal(pagedList.status, 200);
  assert.equal(pagedListBody.page.limit, 200);
  assert.equal(pagedListBody.page.offset, 0);
  assert.equal(pagedListBody.items.length, createdIds.length);
  assert.equal(missingPatch.status, 404);
  assert.equal(missingPatchBody.error.message, "Proxy not found");
  assert.equal(missingDelete.status, 404);
  assert.equal(missingDeleteBody.error.message, "Proxy not found");
});

test("critical routes: v1 management proxies requires auth on mutating routes", async () => {
  await enableManagementAuth();

  const unauthenticatedPost = await proxiesRoute.POST(
    makeRequest("http://localhost/api/v1/management/proxies", {
      method: "POST",
      body: {
        name: "Denied Proxy",
        type: "http",
        host: "denied.local",
        port: 8080,
      },
    })
  );
  const invalidPost = await proxiesRoute.POST(
    makeRequest("http://localhost/api/v1/management/proxies", {
      method: "POST",
      token: "sk-invalid",
      body: {
        name: "Denied Proxy",
        type: "http",
        host: "denied.local",
        port: 8080,
      },
    })
  );
  const unauthenticatedPatch = await proxiesRoute.PATCH(
    makeRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      body: { id: "proxy-1", host: "patched.local" },
    })
  );
  const invalidPatch = await proxiesRoute.PATCH(
    makeRequest("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      token: "sk-invalid",
      body: { id: "proxy-1", host: "patched.local" },
    })
  );
  const unauthenticatedDelete = await proxiesRoute.DELETE(
    makeRequest("http://localhost/api/v1/management/proxies?id=proxy-1", {
      method: "DELETE",
    })
  );
  const invalidDelete = await proxiesRoute.DELETE(
    makeRequest("http://localhost/api/v1/management/proxies?id=proxy-1", {
      method: "DELETE",
      token: "sk-invalid",
    })
  );

  for (const response of [unauthenticatedPost, unauthenticatedPatch, unauthenticatedDelete]) {
    const body = (await response.json()) as any;
    assert.equal(response.status, 401);
    assert.equal(body.error.message, "Authentication required");
  }

  for (const response of [invalidPost, invalidPatch, invalidDelete]) {
    const body = (await response.json()) as any;
    assert.equal(response.status, 403);
    assert.equal(body.error.message, "Invalid management token");
  }
});

test("critical routes: settings proxy resolves config, validates payloads, and deletes scoped entries", async () => {
  const connection = await localDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "critical-proxy-conn",
    apiKey: "sk-critical",
  });

  const invalidJson = await settingsProxyRoute.PUT(
    new Request("http://localhost/api/settings/proxy", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const invalidProviders = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: { providers: "not-an-object" },
    })
  );
  const setProviderProxy = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "provider",
        id: "openai",
        proxy: {
          type: "HTTP",
          host: "provider.proxy.local",
          port: 9000,
          username: "alice",
        },
      },
    })
  );
  const getProviderProxy = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy?level=provider&id=openai")
  );
  const resolveProxy = await settingsProxyRoute.GET(
    new Request(`http://localhost/api/settings/proxy?resolve=${connection.id}`)
  );
  const missingLevelDelete = await settingsProxyRoute.DELETE(
    new Request("http://localhost/api/settings/proxy")
  );
  const deleteProviderProxy = await settingsProxyRoute.DELETE(
    new Request("http://localhost/api/settings/proxy?level=provider&id=openai", {
      method: "DELETE",
    })
  );
  const getFullConfig = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy")
  );

  const invalidJsonBody = (await invalidJson.json()) as any;
  const invalidProvidersBody = (await invalidProviders.json()) as any;
  const setProviderProxyBody = (await setProviderProxy.json()) as any;
  const getProviderProxyBody = (await getProviderProxy.json()) as any;
  const resolveProxyBody = (await resolveProxy.json()) as any;
  const missingLevelDeleteBody = (await missingLevelDelete.json()) as any;
  const deleteProviderProxyBody = (await deleteProviderProxy.json()) as any;
  const getFullConfigBody = (await getFullConfig.json()) as any;

  assert.equal(invalidJson.status, 400);
  assert.equal(invalidJsonBody.error.message, "Invalid JSON body");
  assert.equal(invalidProviders.status, 400);
  assert.equal(invalidProvidersBody.error.message, "Invalid request");
  assert.equal(setProviderProxy.status, 200);
  assert.equal(setProviderProxyBody.providers.openai.type, "http");
  assert.equal(getProviderProxy.status, 200);
  assert.equal(getProviderProxyBody.proxy.type, "http");
  assert.equal(resolveProxy.status, 200);
  assert.equal(resolveProxyBody.level, "provider");
  assert.equal(resolveProxyBody.proxy.host, "provider.proxy.local");
  assert.equal(missingLevelDelete.status, 400);
  assert.equal(missingLevelDeleteBody.error.message, "level is required");
  assert.equal(deleteProviderProxy.status, 200);
  assert.equal(deleteProviderProxyBody.providers.openai, undefined);
  assert.equal(getFullConfig.status, 200);
  assert.ok(Object.prototype.hasOwnProperty.call(getFullConfigBody, "providers"));
});

test("critical routes: settings proxy prefers registry assignment for global lookups", async () => {
  const proxy = await localDb.createProxy({
    name: "Global Registry Proxy",
    type: "https",
    host: "registry.proxy.local",
    port: 443,
    username: "global-user",
    password: "global-pass",
  });

  await localDb.assignProxyToScope("global", null, proxy.id);

  const response = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy?level=global")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.level, "global");
  assert.equal(body.proxy.type, "https");
  assert.equal(body.proxy.host, "registry.proxy.local");
  assert.equal(body.proxy.username, "global-user");
});

test("critical routes: MITM settings reject non-443 transparent interception ports", async () => {
  await enableManagementAuth();

  const mitmDir = path.join(TEST_DATA_DIR, "mitm");
  fs.mkdirSync(mitmDir, { recursive: true });
  fs.writeFileSync(path.join(mitmDir, "settings.json"), JSON.stringify({ port: 9443 }));

  const staleConfig = await settingsMitmRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings/mitm")
  );
  const staleConfigBody = (await staleConfig.json()) as any;

  const invalidPort = await settingsMitmRoute.PUT(
    await makeManagementSessionRequest("http://localhost/api/settings/mitm", {
      method: "PUT",
      body: { port: 9443 },
    })
  );
  const invalidPortBody = (await invalidPort.json()) as any;

  const validPort = await settingsMitmRoute.PUT(
    await makeManagementSessionRequest("http://localhost/api/settings/mitm", {
      method: "PUT",
      body: { port: 443 },
    })
  );
  const validPortBody = (await validPort.json()) as any;
  const staleAntigravityTarget = staleConfigBody.targets.find(
    (target: any) => target.id === "antigravity"
  );
  const validAntigravityTarget = validPortBody.targets.find(
    (target: any) => target.id === "antigravity"
  );

  assert.equal(staleConfig.status, 200);
  assert.equal(staleConfigBody.port, 443);
  assert.equal(staleAntigravityTarget?.localPort, 443);
  assert.equal(invalidPort.status, 400);
  assert.match(invalidPortBody.error, /requires port 443/i);
  assert.equal(validPort.status, 200);
  assert.equal(validPortBody.port, 443);
  assert.equal(validAntigravityTarget?.localPort, 443);
});

test("critical routes: settings proxy covers global fallback and socks5 gating", async () => {
  const setLegacyGlobalProxy = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "global",
        proxy: {
          type: "https",
          host: "legacy.proxy.local",
          port: 9443,
        },
      },
    })
  );
  const getLegacyGlobalProxy = await settingsProxyRoute.GET(
    new Request("http://localhost/api/settings/proxy?level=global")
  );
  const socksDisabled = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "provider",
        id: "openai",
        proxy: {
          type: "socks5",
          host: "socks.disabled.local",
          port: 1080,
        },
      },
    })
  );

  process.env.ENABLE_SOCKS5_PROXY = "true";
  const socksEnabled = await settingsProxyRoute.PUT(
    makeRequest("http://localhost/api/settings/proxy", {
      method: "PUT",
      body: {
        level: "provider",
        id: "openai",
        proxy: {
          type: "SOCKS5",
          host: "socks.enabled.local",
          port: 1080,
        },
      },
    })
  );

  const setLegacyGlobalProxyBody = (await setLegacyGlobalProxy.json()) as any;
  const getLegacyGlobalProxyBody = (await getLegacyGlobalProxy.json()) as any;
  const socksDisabledBody = (await socksDisabled.json()) as any;
  const socksEnabledBody = (await socksEnabled.json()) as any;

  assert.equal(setLegacyGlobalProxy.status, 200);
  assert.equal(setLegacyGlobalProxyBody.global.host, "legacy.proxy.local");
  assert.equal(getLegacyGlobalProxy.status, 200);
  assert.equal(getLegacyGlobalProxyBody.proxy.host, "legacy.proxy.local");
  assert.equal(socksDisabled.status, 400);
  assert.match(socksDisabledBody.error.message, /SOCKS5 proxy is disabled/i);
  assert.equal(socksEnabled.status, 200);
  assert.equal(socksEnabledBody.providers.openai.type, "socks5");
});

test("critical routes: v1 models route exposes CORS and list contracts", async () => {
  const options = await v1ModelsRoute.OPTIONS();
  const response = await v1ModelsRoute.GET(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );
  const body = (await response.json()) as any;

  assert.equal(options.status, 200);
  assert.match(options.headers.get("Access-Control-Allow-Methods") || "", /GET/);
  assert.equal(response.status, 200);
  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data));
});
