import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-admin-audit-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-for-audit-events";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const loginRoute = await import("../../src/app/api/auth/login/route.ts");
const logoutRoute = await import("../../src/app/api/auth/logout/route.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const originalGetLoginCookieStore = loginRoute.authRouteInternals.getCookieStore;
const originalGetLogoutCookieStore = logoutRoute.logoutRouteInternals.getCookieStore;

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.afterEach(() => {
  loginRoute.authRouteInternals.getCookieStore = originalGetLoginCookieStore;
  logoutRoute.logoutRouteInternals.getCookieStore = originalGetLogoutCookieStore;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("auth login/logout routes emit structured audit events with ip and request id", async () => {
  const setCalls = [];
  const deleteCalls = [];

  loginRoute.authRouteInternals.getCookieStore = async () => ({
    set: (...args) => setCalls.push(args),
  });
  logoutRoute.logoutRouteInternals.getCookieStore = async () => ({
    delete: (...args) => deleteCalls.push(args),
  });

  const loginResponse = await loginRoute.POST(
    new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "198.51.100.10",
        "x-request-id": "req-auth-login",
      },
      body: JSON.stringify({ password: "admin-secret" }),
    })
  );

  assert.equal(loginResponse.status, 200);
  assert.deepEqual(await loginResponse.json(), { success: true });
  assert.equal(setCalls.length, 1);

  const logoutResponse = await logoutRoute.POST(
    new Request("http://localhost/api/auth/logout", {
      method: "POST",
      headers: {
        "x-forwarded-for": "198.51.100.10",
        "x-request-id": "req-auth-logout",
      },
    })
  );

  assert.equal(logoutResponse.status, 200);
  assert.deepEqual(await logoutResponse.json(), { success: true });
  assert.deepEqual(deleteCalls, [["auth_token"]]);

  const loginEvent = compliance.getAuditLog({ action: "auth.login.success" })[0];
  assert.equal(loginEvent.actor, "admin");
  assert.equal(loginEvent.resourceType, "auth_session");
  assert.equal(loginEvent.status, "success");
  assert.equal(loginEvent.ip, "198.51.100.10");
  assert.equal(loginEvent.requestId, "req-auth-login");

  const logoutEvent = compliance.getAuditLog({ action: "auth.logout.success" })[0];
  assert.equal(logoutEvent.actor, "admin");
  assert.equal(logoutEvent.resourceType, "auth_session");
  assert.equal(logoutEvent.status, "success");
  assert.equal(logoutEvent.requestId, "req-auth-logout");
});

test("auth login route records failed password attempts", async () => {
  loginRoute.authRouteInternals.getCookieStore = async () => ({
    set() {},
  });

  const response = await loginRoute.POST(
    new Request("http://localhost/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "198.51.100.22",
        "x-request-id": "req-auth-failed",
      },
      body: JSON.stringify({ password: "wrong-password" }),
    })
  );

  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: "Invalid password" });

  const event = compliance.getAuditLog({ action: "auth.login.failed" })[0];
  assert.equal(event.actor, "anonymous");
  assert.equal(event.status, "failed");
  assert.equal(event.requestId, "req-auth-failed");
  assert.deepEqual(event.metadata, { reason: "invalid_password", lockedOut: false });
});

test("provider create/update/delete routes emit sanitized credential audit events", async () => {
  const createResponse = await providersRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      headers: {
        "x-forwarded-for": "203.0.113.10",
        "x-request-id": "req-provider-create",
      },
      body: {
        provider: "openai",
        apiKey: "sk-secret-provider-key",
        name: "Primary OpenAI",
        defaultModel: "gpt-4o-mini",
      },
    })
  );

  assert.equal(createResponse.status, 201);
  const createBody = (await createResponse.json()) as any;
  const connectionId = createBody.connection.id;
  assert.equal(typeof connectionId, "string");

  const updateResponse = await providerByIdRoute.PUT(
    await makeManagementSessionRequest(`http://localhost/api/providers/${connectionId}`, {
      method: "PUT",
      headers: {
        "x-forwarded-for": "203.0.113.10",
        "x-request-id": "req-provider-update",
      },
      body: {
        name: "Primary OpenAI Updated",
        defaultModel: "gpt-4.1-mini",
        isActive: false,
      },
    }),
    { params: Promise.resolve({ id: connectionId }) }
  );

  assert.equal(updateResponse.status, 200);

  const deleteResponse = await providerByIdRoute.DELETE(
    await makeManagementSessionRequest(`http://localhost/api/providers/${connectionId}`, {
      method: "DELETE",
      headers: {
        "x-forwarded-for": "203.0.113.10",
        "x-request-id": "req-provider-delete",
      },
    }),
    { params: Promise.resolve({ id: connectionId }) }
  );

  assert.equal(deleteResponse.status, 200);

  const createdEvent = compliance.getAuditLog({ action: "provider.credentials.created" })[0];
  assert.equal(createdEvent.status, "success");
  assert.equal(createdEvent.resourceType, "provider_credentials");
  assert.equal(createdEvent.requestId, "req-provider-create");
  assert.equal(createdEvent.target, "openai:Primary OpenAI");
  assert.equal("apiKey" in (createdEvent.metadata as any).connection, false);

  const updatedEvent = compliance.getAuditLog({ action: "provider.credentials.updated" })[0];
  assert.equal(updatedEvent.requestId, "req-provider-update");
  assert.deepEqual((updatedEvent as any).metadata.changedFields.sort(), [
    "defaultModel",
    "isActive",
    "name",
  ]);
  assert.equal((updatedEvent as any).metadata.before.name, "Primary OpenAI");
  (assert as any).equal((updatedEvent.metadata as any).after.name, "Primary OpenAI Updated");
  (assert as any).equal("apiKey" in (updatedEvent.metadata as any).before, false);
  (assert as any).equal("apiKey" in (updatedEvent.metadata as any).after, false);

  const revokedEvent = compliance.getAuditLog({ action: "provider.credentials.revoked" })[0];
  assert.equal(revokedEvent.requestId, "req-provider-delete");
  assert.equal(revokedEvent.target, "openai:Primary OpenAI Updated");
  assert.equal(revokedEvent.status, "success");
  assert.equal("apiKey" in (revokedEvent.metadata as any).connection, false);
});

test("deleting the final provider connection removes imported models but preserves manual models", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "First",
    apiKey: "first-key",
  });
  const second = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Second",
    apiKey: "second-key",
  });
  await modelsDb.addCustomModel("openai", "manual-model", "Manual", "manual");
  await modelsDb.addCustomModel("openai", "imported-model", "Imported", "imported");
  await modelsDb.addCustomModel("openai", "api-sync-model", "API Sync", "api-sync");
  await modelsDb.addCustomModel("openai", "auto-sync-model", "Auto Sync", "auto-sync");

  const deleteConnection = async (id: string) =>
    providerByIdRoute.DELETE(
      await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
        method: "DELETE",
      }),
      { params: Promise.resolve({ id }) }
    );

  assert.equal((await deleteConnection(first.id)).status, 200);
  assert.deepEqual(
    (await modelsDb.getCustomModels("openai")).map((model: { id: string }) => model.id),
    ["manual-model", "imported-model", "api-sync-model", "auto-sync-model"]
  );

  assert.equal((await deleteConnection(second.id)).status, 200);
  assert.deepEqual(await modelsDb.getCustomModels("openai"), [
    {
      id: "manual-model",
      name: "Manual",
      source: "manual",
      apiFormat: "chat-completions",
      supportedEndpoints: ["chat"],
    },
  ]);
});
