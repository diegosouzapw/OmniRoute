import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cloud-write-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.JWT_SECRET = "cloud-write-auth-jwt";
process.env.INITIAL_PASSWORD = "bootstrap-password";
process.env.API_KEY_SECRET = "cloud-write-auth-api-key-secret";

type ApiKeyRecord = { key: string };
type ProviderConnectionRecord = {
  id: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  expiresAt?: string | null;
};

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const credentialsRoute = await import("../../src/app/api/cloud/credentials/update/route.ts");
const aliasRoute = await import("../../src/app/api/cloud/models/alias/route.ts");

async function resetStorage() {
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  process.env.JWT_SECRET = "cloud-write-auth-jwt";
  process.env.API_KEY_SECRET = "cloud-write-auth-api-key-secret";
  core.resetDbInstance();
  localDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await localDb.updateSettings({ requireLogin: true, password: "" });
}

async function createKey(scopes: string[] = []): Promise<ApiKeyRecord> {
  return localDb.createApiKey(`cloud-write-${scopes.join("-") || "none"}`, "machine-test", scopes);
}

async function createActiveConnection(): Promise<ProviderConnectionRecord> {
  const connection = await localDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    name: "OpenAI OAuth",
    email: "owner@example.test",
    isActive: true,
    accessToken: "old-access-token",
    refreshToken: "old-refresh-token",
    expiresAt: "2026-01-01T00:00:00.000Z",
  });
  assert.ok(connection?.id);
  return connection as ProviderConnectionRecord;
}

async function readActiveConnection(): Promise<ProviderConnectionRecord> {
  const [connection] = (await localDb.getProviderConnections({
    provider: "openai",
    isActive: true,
  })) as ProviderConnectionRecord[];
  assert.ok(connection);
  return connection;
}

function credentialUpdateBody() {
  return {
    provider: "openai",
    credentials: {
      accessToken: "new-access-secret",
      refreshToken: "new-refresh-secret",
      expiresIn: 3600,
    },
  };
}

function aliasUpdateBody() {
  return {
    model: "openai/gpt-4o-mini",
    alias: "fast-default",
  };
}

function cloudCredentialsRequest(token: string | null, body = credentialUpdateBody()) {
  const headers = new Headers({ "content-type": "application/json" });
  if (token) headers.set("authorization", `Bearer ${token}`);
  return new Request("http://localhost/api/cloud/credentials/update", {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
}

function cloudAliasRequest(token: string | null, body = aliasUpdateBody()) {
  const headers = new Headers({ "content-type": "application/json" });
  if (token) headers.set("authorization", `Bearer ${token}`);
  return new Request("http://localhost/api/cloud/models/alias", {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
}

async function captureConsoleLog<T>(fn: () => Promise<T>): Promise<{ value: T; logs: string }> {
  const originalLog = console.log;
  const entries: string[] = [];
  console.log = (...args: unknown[]) => {
    entries.push(args.map((arg) => String(arg)).join(" "));
  };
  try {
    return { value: await fn(), logs: entries.join("\n") };
  } finally {
    console.log = originalLog;
  }
}

function assertTextDoesNotLeakSecrets(text: string, label: string, secrets: string[]) {
  for (const secret of secrets) {
    assert.equal(text.includes(secret), false, `${label} leaked secret: ${secret}`);
  }
}

async function assertResponseDoesNotLeakSecrets(response: Response, secrets: string[]) {
  const text = await response.text();
  assertTextDoesNotLeakSecrets(text, "response", secrets);
  return text.length > 0 ? JSON.parse(text) : null;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  localDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("PUT /api/cloud/credentials/update rejects valid API key without manage/admin scope and leaves credentials unchanged", async () => {
  await createActiveConnection();
  const key = await createKey();

  const { value: response, logs } = await captureConsoleLog(() =>
    credentialsRoute.PUT(cloudCredentialsRequest(key.key))
  );
  const body = await assertResponseDoesNotLeakSecrets(response, [
    "new-access-secret",
    "new-refresh-secret",
  ]);
  assertTextDoesNotLeakSecrets(logs, "logs", ["new-access-secret", "new-refresh-secret"]);
  const connection = await readActiveConnection();

  assert.equal(response.status, 403);
  assert.match(body.error?.message || "", /manage/);
  assert.equal(connection.accessToken, "old-access-token");
  assert.equal(connection.refreshToken, "old-refresh-token");
  assert.equal(connection.expiresAt, "2026-01-01T00:00:00.000Z");
});

test("PUT /api/cloud/models/alias rejects valid API key without manage/admin scope and leaves aliases unchanged", async () => {
  await localDb.setModelAlias("fast-default", "openai/original-model");
  const key = await createKey();

  const { value: response, logs } = await captureConsoleLog(() =>
    aliasRoute.PUT(cloudAliasRequest(key.key))
  );
  const body = await assertResponseDoesNotLeakSecrets(response, ["openai/gpt-4o-mini"]);
  assertTextDoesNotLeakSecrets(logs, "logs", ["openai/gpt-4o-mini"]);
  const aliases = await localDb.getModelAliases();

  assert.equal(response.status, 403);
  assert.match(body.error?.message || "", /manage/);
  assert.equal(aliases["fast-default"], "openai/original-model");
});

test("PUT /api/cloud/credentials/update accepts API key with manage scope", async () => {
  await createActiveConnection();
  const key = await createKey(["manage"]);

  const response = await credentialsRoute.PUT(cloudCredentialsRequest(key.key));
  const body = await response.json();
  const connection = await readActiveConnection();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(connection.accessToken, "new-access-secret");
  assert.equal(connection.refreshToken, "new-refresh-secret");
  assert.notEqual(connection.expiresAt, "2026-01-01T00:00:00.000Z");
});

test("PUT /api/cloud/models/alias accepts API key with manage scope", async () => {
  const key = await createKey(["manage"]);

  const response = await aliasRoute.PUT(cloudAliasRequest(key.key));
  const body = await response.json();
  const aliases = await localDb.getModelAliases();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(aliases["fast-default"], "openai/gpt-4o-mini");
});

test("cloud write routes keep 401 for missing or invalid Bearer credentials", async () => {
  await createActiveConnection();

  const { value: missing, logs: missingLogs } = await captureConsoleLog(() =>
    credentialsRoute.PUT(cloudCredentialsRequest(null))
  );
  const { value: invalid, logs: invalidLogs } = await captureConsoleLog(() =>
    aliasRoute.PUT(cloudAliasRequest("sk-invalid"))
  );
  await assertResponseDoesNotLeakSecrets(missing, ["new-access-secret", "new-refresh-secret"]);
  await assertResponseDoesNotLeakSecrets(invalid, ["openai/gpt-4o-mini"]);
  assertTextDoesNotLeakSecrets(missingLogs, "logs", ["new-access-secret", "new-refresh-secret"]);
  assertTextDoesNotLeakSecrets(invalidLogs, "logs", ["openai/gpt-4o-mini"]);

  assert.equal(missing.status, 401);
  assert.equal(invalid.status, 401);
});
