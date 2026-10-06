import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-aihorde-key-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "aihorde-optional-key-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { supportsApiKeyOnFreeProvider, providerAllowsOptionalApiKey } =
  await import("../../src/shared/constants/providers.ts");
const { getCredentialRequirement } =
  await import("../../src/shared/utils/providerCredentialRequirement.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { isManagedProviderConnectionId } = await import("../../src/lib/providers/catalog.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("aihorde treats a registered key as optional, not required", () => {
  assert.equal(providerAllowsOptionalApiKey("aihorde"), true);
  assert.equal(supportsApiKeyOnFreeProvider("aihorde"), true);
  assert.equal(getCredentialRequirement("aihorde"), "optional");
  assert.equal(isManagedProviderConnectionId("aihorde"), true);
});

test("aihorde without a stored key still uses the synthetic no-auth path", async () => {
  const creds = await getProviderCredentials("aihorde");
  assert.ok(creds);
  assert.equal((creds as { connectionId?: string }).connectionId, "noauth");
  assert.equal((creds as { apiKey?: unknown }).apiKey, null);
});

let registeredKeyConnectionId: string | undefined;

test("aihorde prefers a stored API key over the anonymous fallback", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "aihorde",
    authType: "apikey",
    name: "Horde kudos key",
    apiKey: "horde-registered-key-123",
  });
  assert.ok(created?.id);
  registeredKeyConnectionId = created.id;

  const creds = await getProviderCredentials("aihorde");
  assert.ok(creds);
  assert.equal((creds as { apiKey?: string }).apiKey, "horde-registered-key-123");
  assert.equal((creds as { connectionId?: string }).connectionId, created.id);
});

test("aihorde falls back to anonymous when the only stored key is rate-limited", async () => {
  // Deactivate the healthy connection from the prior test so it cannot mask
  // the fallback behavior being exercised here.
  assert.ok(registeredKeyConnectionId);
  await providersDb.updateProviderConnection(registeredKeyConnectionId, { isActive: false });

  const created = await providersDb.createProviderConnection({
    provider: "aihorde",
    authType: "apikey",
    name: "Horde cooling-down key",
    apiKey: "horde-cooling-down-key",
  });
  assert.ok(created?.id);
  await providersDb.updateProviderConnection(created.id, {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    testStatus: "unavailable",
  });

  const creds = await getProviderCredentials("aihorde");
  assert.ok(creds);
  assert.equal((creds as { connectionId?: string }).connectionId, "noauth");
  assert.equal((creds as { apiKey?: unknown }).apiKey, null);
});

test("aihorde falls back to anonymous when the only stored key is terminally banned", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "aihorde",
    authType: "apikey",
    name: "Horde banned key",
    apiKey: "horde-banned-key",
  });
  assert.ok(created?.id);
  await providersDb.updateProviderConnection(created.id, { testStatus: "banned" });

  const creds = await getProviderCredentials("aihorde");
  assert.ok(creds);
  assert.equal((creds as { connectionId?: string }).connectionId, "noauth");
  assert.equal((creds as { apiKey?: unknown }).apiKey, null);
});

test("aihorde rotates past an unhealthy stored key to the next healthy one", async () => {
  const unhealthy = await providersDb.createProviderConnection({
    provider: "aihorde",
    authType: "apikey",
    name: "Horde unhealthy key",
    apiKey: "horde-unhealthy-key",
    priority: 1,
  });
  assert.ok(unhealthy?.id);
  await providersDb.updateProviderConnection(unhealthy.id, {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    testStatus: "unavailable",
  });

  const healthy = await providersDb.createProviderConnection({
    provider: "aihorde",
    authType: "apikey",
    name: "Horde healthy key",
    apiKey: "horde-healthy-key",
    priority: 2,
  });
  assert.ok(healthy?.id);

  const creds = await getProviderCredentials("aihorde");
  assert.ok(creds);
  assert.equal((creds as { apiKey?: string }).apiKey, "horde-healthy-key");
  assert.equal((creds as { connectionId?: string }).connectionId, healthy.id);
});

test("DefaultExecutor uses a stored Horde key for chat, else the anonymous key", () => {
  const executor = new DefaultExecutor("aihorde");
  const withKey = executor.buildHeaders(
    { apiKey: "horde-registered-key-123", accessToken: null } as never,
    true
  ) as Record<string, string>;
  assert.equal(withKey.Authorization, "Bearer horde-registered-key-123");

  const anonymous = executor.buildHeaders(
    { apiKey: null, accessToken: null } as never,
    true
  ) as Record<string, string>;
  assert.equal(anonymous.Authorization, "Bearer 0000000000");
});
