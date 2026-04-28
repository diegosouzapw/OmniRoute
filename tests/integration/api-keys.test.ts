import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-keys-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";
process.env.CLOUD_URL = "http://cloud.example";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const localDb = await import("../../src/lib/localDb.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const listRoute = await import("../../src/app/api/keys/route.ts");
const keyRoute = await import("../../src/app/api/keys/[id]/route.ts");
const revealRoute = await import("../../src/app/api/keys/[id]/reveal/route.ts");

const MACHINE_ID = "1234567890abcdef";

async function resetStorage() {
  delete process.env.ALLOW_API_KEY_REVEAL;
  delete process.env.INITIAL_PASSWORD;
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

function makeRequest(
  url: string | URL,
  { method = "GET", token, body }: { method?: string; token?: string; body?: unknown } = {}
) {
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

test("API keys routes require management auth when login protection is enabled", async () => {
  await enableManagementAuth();

  const unauthenticated = await listRoute.GET(new Request("http://localhost/api/keys"));
  const invalidToken = await listRoute.GET(
    new Request("http://localhost/api/keys", {
      headers: { authorization: "Bearer sk-invalid" },
    })
  );

  const unauthenticatedBody = (await unauthenticated.json()) as any;
  const invalidTokenBody = (await invalidToken.json()) as any;

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
});

test("API keys POST also requires management auth when login protection is enabled", async () => {
  await enableManagementAuth();

  const unauthenticated = await listRoute.POST(
    makeRequest("http://localhost/api/keys", {
      method: "POST",
      body: { name: "Blocked Create" },
    })
  );
  const invalidToken = await listRoute.POST(
    makeRequest("http://localhost/api/keys", {
      method: "POST",
      token: "sk-invalid",
      body: { name: "Blocked Create" },
    })
  );

  const unauthenticatedBody = (await unauthenticated.json()) as any;
  const invalidTokenBody = (await invalidToken.json()) as any;

  assert.equal(unauthenticated.status, 401);
  assert.equal(unauthenticatedBody.error.message, "Authentication required");
  assert.equal(invalidToken.status, 403);
  assert.equal(invalidTokenBody.error.message, "Invalid management token");
});

test("POST /api/keys creates a key, preserves special characters, and persists noLog", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const response = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: { name: "Key / Prod #1", noLog: true },
    })
  );
  const body = (await response.json()) as any;
  const stored = await apiKeysDb.getApiKeyById(body.id);

  assert.equal(response.status, 201);
  assert.equal(body.name, "Key / Prod #1");
  assert.equal(body.noLog, true);
  assert.match(body.key, /^sk-[a-z0-9-]+/i);
  assert.equal(stored?.noLog, true);
  assert.equal(compliance.isNoLog(body.id), true);
});

test("POST /api/keys validates missing and oversized names", async () => {
  await enableManagementAuth();
  await createManagementKey();

  const missingName = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: {},
    })
  );
  const oversizedName = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: { name: "x".repeat(201) },
    })
  );

  assert.equal(missingName.status, 400);
  assert.equal(oversizedName.status, 400);
});

test("POST /api/keys returns a server error for malformed JSON payloads", async () => {
  await enableManagementAuth();
  await createManagementKey();

  const response = await listRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 500);
  assert.equal(body.error, "Failed to create key");
});

test("GET /api/keys lists masked keys with pagination and GET /api/keys/[id] stays masked", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const createdA = await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  const createdB = await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const listResponse = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys?limit=1&offset=1")
  );
  const getResponse = await keyRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/keys/${createdB.id}`),
    { params: Promise.resolve({ id: createdB.id }) }
  );

  const listBody = (await listResponse.json()) as any;
  const getBody = (await getResponse.json()) as any;

  assert.equal(listResponse.status, 200);
  assert.equal(listBody.total, 3);
  assert.equal(listBody.keys.length, 1);
  assert.equal(listBody.keys[0].id, createdA.id);
  assert.notEqual(listBody.keys[0].key, createdA.key);
  assert.match(listBody.keys[0].key, /\*{4}/);

  assert.equal(getResponse.status, 200);
  assert.equal(getBody.id, createdB.id);
  assert.notEqual(getBody.key, createdB.key);
  assert.match(getBody.key, /\*{4}/);
});

test("GET /api/keys falls back to default pagination for invalid query params", async () => {
  await enableManagementAuth();
  await createManagementKey();
  await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const response = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys?limit=0&offset=-25")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.total, 3);
  assert.equal(body.keys.length, 3);
  assert.equal(body.keys[0].name, "management");
});

test("GET /api/keys treats non-numeric pagination params as defaults", async () => {
  await enableManagementAuth();
  await createManagementKey();
  await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const response = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys?limit=abc&offset=xyz")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.total, 3);
  assert.equal(body.keys.length, 3);
  assert.deepEqual(
    body.keys.map((entry) => entry.name),
    ["management", "Alpha", "Beta"]
  );
});

test("GET /api/keys uses default pagination when query params are absent and reports reveal support", async () => {
  await enableManagementAuth();
  process.env.ALLOW_API_KEY_REVEAL = "true";
  const authKey = await createManagementKey();
  const createdA = await apiKeysDb.createApiKey("Alpha", MACHINE_ID);
  const createdB = await apiKeysDb.createApiKey("Beta", MACHINE_ID);

  const response = await listRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.total, 3);
  assert.equal(body.allowKeyReveal, true);
  assert.equal(body.keys.length, 3);
  assert.deepEqual(
    body.keys.map((entry) => entry.id).sort(),
    [authKey.id, createdA.id, createdB.id].sort()
  );
  assert.ok(body.keys.every((entry) => entry.key !== undefined && entry.key !== ""));
});

test("POST /api/keys triggers cloud sync when cloud mode is enabled", async () => {
  await enableManagementAuth();
  await localDb.updateSettings({ cloudEnabled: true });
  await createManagementKey();
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url, options });
    return Response.json({ changes: { apiKeys: 1 } });
  };

  try {
    const response = await listRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/keys", {
        method: "POST",
        body: { name: "Cloud Synced Key" },
      })
    );
    const body = (await response.json()) as any;
    const syncPayload = JSON.parse(calls[0].options.body);

    assert.equal(response.status, 201);
    assert.equal(body.name, "Cloud Synced Key");
    assert.equal(calls.length, 1);
    assert.match(String(calls[0].url), /^http:\/\/cloud\.example\/sync\//);
    assert.ok(Array.isArray(syncPayload.providers));
    assert.ok(Array.isArray(syncPayload.apiKeys));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GET /api/keys returns 500 when the key store throws unexpectedly", async () => {
  await apiKeysDb.createApiKey("Alpha", MACHINE_ID);

  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  const originalLog = console.log;
  const originalError = console.error;

  db.prepare = (sql) => {
    if (String(sql).includes("FROM api_keys")) {
      throw new Error("api keys offline");
    }
    return originalPrepare(sql);
  };
  apiKeysDb.resetApiKeyState();
  // Suppress Pino structured log output during test
  console.log = () => {};
  console.error = () => {};

  try {
    const response = await listRoute.GET(new Request("http://localhost/api/keys"));
    const body = (await response.json()) as any;

    assert.equal(response.status, 500);
    assert.equal(body.error, "Failed to fetch keys");
  } finally {
    db.prepare = originalPrepare;
    apiKeysDb.resetApiKeyState();
    console.log = originalLog;
    console.error = originalError;
  }
});

test("POST /api/keys still succeeds when cloud sync fails after creation", async () => {
  await enableManagementAuth();
  await localDb.updateSettings({ cloudEnabled: true });
  await createManagementKey();
  const originalFetch = globalThis.fetch;
  let syncAttempts = 0;

  globalThis.fetch = async () => {
    syncAttempts += 1;
    throw new Error("cloud sync offline");
  };

  try {
    const response = await listRoute.POST(
      await makeManagementSessionRequest("http://localhost/api/keys", {
        method: "POST",
        body: { name: "Cloud Failure Tolerated" },
      })
    );
    const body = (await response.json()) as any;
    const stored = await apiKeysDb.getApiKeyById(body.id);

    assert.equal(response.status, 201);
    assert.equal(body.name, "Cloud Failure Tolerated");
    assert.equal(syncAttempts, 1);
    assert.equal(stored?.name, "Cloud Failure Tolerated");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GET /api/keys/[id] returns 404 for an unknown key and reveal is gated by the feature flag", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const created = await apiKeysDb.createApiKey("Reveal Target", MACHINE_ID);

  const missingResponse = await keyRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/keys/missing"),
    { params: Promise.resolve({ id: "missing" }) }
  );
  const revealDisabled = await revealRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}/reveal`),
    { params: Promise.resolve({ id: created.id }) }
  );

  process.env.ALLOW_API_KEY_REVEAL = "true";
  const revealEnabled = await revealRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}/reveal`),
    { params: Promise.resolve({ id: created.id }) }
  );

  const missingBody = (await missingResponse.json()) as any;
  const revealDisabledBody = (await revealDisabled.json()) as any;
  const revealEnabledBody = (await revealEnabled.json()) as any;

  assert.equal(missingResponse.status, 404);
  assert.equal(missingBody.error, "Key not found");
  assert.equal(revealDisabled.status, 403);
  assert.equal(revealDisabledBody.error, "API key reveal is disabled");
  assert.equal(revealEnabled.status, 200);
  assert.equal(revealEnabledBody.key, created.key);
});

test("PATCH /api/keys/[id] updates permissions and rejects invalid payloads", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const created = await apiKeysDb.createApiKey("Mutable", MACHINE_ID);
  const patchResponse = await keyRoute.PATCH(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      body: {
        noLog: true,
        allowedModels: ["gpt-4.1-mini"],
        allowedConnections: [],
        isActive: false,
        maxSessions: 2,
      },
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  const invalidJsonResponse = await keyRoute.PATCH(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: "{",
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  const missingKeyResponse = await keyRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/keys/missing", {
      method: "PATCH",
      body: { noLog: false },
    }),
    { params: Promise.resolve({ id: "missing" }) }
  );

  const patchBody = (await patchResponse.json()) as any;
  const invalidJsonBody = (await invalidJsonResponse.json()) as any;
  const missingKeyBody = (await missingKeyResponse.json()) as any;
  const updated = await apiKeysDb.getApiKeyById(created.id);

  assert.equal(patchResponse.status, 200);
  assert.equal(patchBody.noLog, true);
  assert.equal(patchBody.isActive, false);
  assert.equal(patchBody.maxSessions, 2);
  assert.deepEqual(updated?.allowedModels, ["gpt-4.1-mini"]);
  assert.equal(updated?.noLog, true);
  assert.equal(updated?.isActive, false);
  assert.equal(invalidJsonResponse.status, 400);
  assert.equal(invalidJsonBody.error.message, "Invalid request");
  assert.equal(missingKeyResponse.status, 404);
  assert.equal(missingKeyBody.error, "Key not found");
});

test("DELETE /api/keys/[id] removes keys and reports missing resources", async () => {
  await enableManagementAuth();
  await createManagementKey();
  const created = await apiKeysDb.createApiKey("Disposable", MACHINE_ID);

  const deleteResponse = await keyRoute.DELETE(
    await makeManagementSessionRequest(`http://localhost/api/keys/${created.id}`, {
      method: "DELETE",
    }),
    { params: Promise.resolve({ id: created.id }) }
  );
  const missingDeleteResponse = await keyRoute.DELETE(
    await makeManagementSessionRequest("http://localhost/api/keys/missing", {
      method: "DELETE",
    }),
    { params: Promise.resolve({ id: "missing" }) }
  );

  const deleteBody = (await deleteResponse.json()) as any;
  const missingDeleteBody = (await missingDeleteResponse.json()) as any;

  assert.equal(deleteResponse.status, 200);
  assert.equal(deleteBody.message, "Key deleted successfully");
  assert.equal(await apiKeysDb.getApiKeyById(created.id), null);
  assert.equal(missingDeleteResponse.status, 404);
  assert.equal(missingDeleteBody.error, "Key not found");
});
