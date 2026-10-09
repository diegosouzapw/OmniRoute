/**
 * `POST /api/cloud/auth` answers any valid API key, including a key that only has inference
 * access. It may tell such a caller which providers are configured, within the connections its
 * key policy allows, but the fragments of upstream secrets and the cloud project ids are for
 * keys that can manage the instance.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-cloud-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "cloud-auth-api-key-secret";
process.env.JWT_SECRET = "cloud-auth-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { createProviderConnection } = await import("../../src/models/index.ts");
const ORIGINAL_ENV_KEY = process.env.OMNIROUTE_API_KEY;
process.env.OMNIROUTE_API_KEY = "sk-deployment-env-key-1234567890";
const cloudAuthRoute = await import("../../src/app/api/cloud/auth/route.ts");

const UPSTREAM_KEY = "sk-proj-SECRETSECRETSECRET1234567890abcd";
const PROJECT_ID = "acme-prod-project-4471";

const primary = (await createProviderConnection({
  provider: "openai",
  authType: "apikey",
  name: "primary",
  apiKey: UPSTREAM_KEY,
  projectId: PROJECT_ID,
  isActive: true,
})) as { id: string };
await createProviderConnection({
  provider: "anthropic",
  authType: "apikey",
  name: "secondary",
  apiKey: "sk-ant-OTHERSECRETOTHERSECRET9999",
  isActive: true,
});

const plainKey = await apiKeysDb.createApiKey("inference-only", "machine1234567890");
const manageKey = await apiKeysDb.createApiKey("manage", "machine1234567890", ["manage"]);
const adminKey = await apiKeysDb.createApiKey("admin", "machine1234567890", ["admin"]);
const mcpKey = await apiKeysDb.createApiKey("mcp", "machine1234567890", ["mcp:connect"]);
const scopedKey = await apiKeysDb.createApiKey("scoped", "machine1234567890", [], {
  allowedConnections: [primary.id],
});

test.after(() => {
  if (ORIGINAL_ENV_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_ENV_KEY;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function authRequest(apiKey?: string) {
  return new Request("http://omniroute.example/api/cloud/auth", {
    method: "POST",
    headers: apiKey ? { authorization: `Bearer ${apiKey}` } : {},
  });
}

test("a request without a key or with an unknown key is refused", async () => {
  assert.equal((await cloudAuthRoute.POST(authRequest())).status, 401);
  assert.equal((await cloudAuthRoute.POST(authRequest("sk-not-a-real-key"))).status, 401);
});

test("an inference-only key learns the providers but no secret fragments or project ids", async () => {
  const res = await cloudAuthRoute.POST(authRequest(plainKey.key));
  assert.equal(res.status, 200);
  const text = await res.text();
  const body = JSON.parse(text) as {
    connections: Array<Record<string, unknown>>;
  };

  const connection = body.connections.find((c) => c.provider === "openai")!;
  assert.equal(connection.hasApiKey, true);
  assert.equal("maskedApiKey" in connection, false);
  assert.equal("projectId" in connection, false);
  assert.ok(!text.includes("sk-p"), "the start of the upstream key must not be returned");
  assert.ok(!text.includes("abcd"), "the end of the upstream key must not be returned");
  assert.ok(!text.includes(PROJECT_ID), "the project id must not be returned");
});

test("a manage-scope key still receives the masked key and the project id", async () => {
  const res = await cloudAuthRoute.POST(authRequest(manageKey.key));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { connections: Array<Record<string, unknown>> };
  const connection = body.connections.find((c) => c.provider === "openai")!;
  assert.equal(connection.maskedApiKey, "sk-p****abcd");
  assert.equal(connection.projectId, PROJECT_ID);
});

test("the admin scope and the deployment env key also receive the detail", async () => {
  for (const credential of [adminKey.key, process.env.OMNIROUTE_API_KEY as string]) {
    const res = await cloudAuthRoute.POST(authRequest(credential));
    assert.equal(res.status, 200);
    const body = (await res.json()) as { connections: Array<Record<string, unknown>> };
    const connection = body.connections.find((c) => c.provider === "openai")!;
    assert.equal(connection.maskedApiKey, "sk-p****abcd");
    assert.equal(connection.projectId, PROJECT_ID);
  }
});

test("the narrow mcp:connect scope does not receive the detail", async () => {
  const res = await cloudAuthRoute.POST(authRequest(mcpKey.key));
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.ok(!text.includes("maskedApiKey"));
  assert.ok(!text.includes(PROJECT_ID));
});

test("a key restricted to some connections only learns about those", async () => {
  const res = await cloudAuthRoute.POST(authRequest(scopedKey.key));
  const body = (await res.json()) as { connections: Array<Record<string, unknown>> };
  assert.deepEqual(
    body.connections.map((c) => c.provider),
    ["openai"]
  );

  const unrestricted = await cloudAuthRoute.POST(authRequest(plainKey.key));
  const all = (await unrestricted.json()) as { connections: Array<Record<string, unknown>> };
  assert.deepEqual(all.connections.map((c) => c.provider).sort(), ["anthropic", "openai"]);
});

test("credential presence is reported without decrypting the stored credentials", async () => {
  const res = await cloudAuthRoute.POST(authRequest(plainKey.key));
  const body = (await res.json()) as { connections: Array<Record<string, unknown>> };
  for (const connection of body.connections) {
    assert.equal(connection.hasApiKey, true);
    assert.equal(connection.hasAccessToken, false);
    assert.equal(connection.hasRefreshToken, false);
  }
});

test("a short upstream key is not shown in part and a longer one only up to a quarter at each end", async () => {
  const created = async (name: string, apiKey: string) =>
    (await createProviderConnection({
      provider: `mask-${name}`,
      authType: "apikey",
      name,
      apiKey,
      isActive: true,
    })) as { id: string };
  await created("nine", "abcdefghi");
  await created("twelve", "abcdefghijkl");
  const res = await cloudAuthRoute.POST(authRequest(manageKey.key));
  const body = (await res.json()) as { connections: Array<Record<string, unknown>> };
  const masked = (provider: string) =>
    body.connections.find((c) => c.provider === provider)!.maskedApiKey;
  assert.equal(masked("mask-nine"), "ab****hi");
  assert.equal(masked("mask-twelve"), "abc****jkl");
});
