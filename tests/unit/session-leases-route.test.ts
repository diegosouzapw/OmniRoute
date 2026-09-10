import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-leases-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "session-leases-route-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelAliasesDb = await import("../../src/lib/db/models/aliases.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const modelAliasResolver = await import("../../src/lib/modelAliasResolver.ts");
const leaseDb = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const route = await import("../../src/app/api/v1/session-leases/route.ts");

const OWNER_A = "vlo_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const OWNER_B = "vlo_BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
let attemptedExternalCalls = 0;
const originalFetch = globalThis.fetch;

function request(key: string, body: unknown, owner?: string, generation?: number): Request {
  const headers = new Headers({
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  });
  if (owner) headers.set("X-OmniRoute-Lease-Owner", owner);
  if (generation !== undefined) {
    headers.set("X-OmniRoute-Lease-Generation", String(generation));
  }
  return new Request("http://omniroute.local/api/v1/session-leases", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

async function json(response: Response): Promise<Record<string, unknown>> {
  return (await response.json()) as Record<string, unknown>;
}

async function seedConnection(priority: number): Promise<{ id: string }> {
  return (await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `lease-route-${priority}`,
    apiKey: `sk-route-${priority}`,
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: {},
  })) as { id: string };
}

async function seedKey(
  connectionIds: string[],
  scopes: string[] = ["lease:exclusive"]
): Promise<{ id: string; key: string }> {
  return apiKeysDb.createApiKey("lease-route-key", "test", scopes, {
    allowedConnections: connectionIds,
  });
}

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  attemptedExternalCalls = 0;
  modelAliasResolver.invalidateAliasCache();
}

test.before(() => {
  globalThis.fetch = async () => {
    attemptedExternalCalls += 1;
    throw new Error("unexpected external provider/model/quota dispatch");
  };
});
test.beforeEach(resetStorage);
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("requires authentication, managed scope, and canonical explicit owner", async () => {
  const unauthenticated = await route.POST(
    new Request("http://omniroute.local/api/v1/session-leases", {
      method: "POST",
      body: JSON.stringify({ action: "acquire", model: "glm/glm-4.6" }),
    })
  );
  assert.equal(unauthenticated.status, 401);

  const connection = await seedConnection(1);
  const unmanaged = await seedKey([connection.id], []);
  const noScope = await route.POST(
    request(unmanaged.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)
  );
  assert.equal(noScope.status, 403);

  const managed = await seedKey([connection.id]);
  const missing = await route.POST(
    request(managed.key, { action: "acquire", model: "glm/glm-4.6" })
  );
  assert.equal(missing.status, 400);
  assert.equal(((await json(missing)).error as { code: string }).code, "LEASE_CONTEXT_REQUIRED");

  const malformed = await route.POST(
    request(managed.key, { action: "acquire", model: "glm/glm-4.6" }, "vlo_short")
  );
  assert.equal(malformed.status, 400);
  assert.equal(((await json(malformed)).error as { code: string }).code, "LEASE_CONTEXT_INVALID");
  assert.equal(attemptedExternalCalls, 0);
});

test("lease acquire preserves deterministic retirement errors for the legacy ChatGPT Web alias", async () => {
  const connection = await seedConnection(1);
  const managed = await seedKey([connection.id]);
  const unmanaged = await seedKey([connection.id], []);

  const beforePolicy = await route.POST(
    request(unmanaged.key, { action: "acquire", model: "cgpt-web/gpt-5.5" }, OWNER_A)
  );
  assert.equal(beforePolicy.status, 410);
  assert.equal(((await json(beforePolicy)).error as { code?: string }).code, "PROVIDER_RETIRED");

  for (const provider of ["cgpt-web"]) {
    const alias = `lease-via-${provider}`;
    await modelAliasesDb.setModelAlias(alias, `${provider}/gpt-5.5`);
    await settingsDb.updateSettings({
      wildcardAliases: [{ pattern: `lease-wildcard-${provider}-*`, target: `${provider}/gpt-5.5` }],
    });
    modelAliasResolver.invalidateAliasCache();

    for (const model of [`${provider}/gpt-5.5`, alias, `lease-wildcard-${provider}-model`]) {
      const response = await route.POST(
        request(managed.key, { action: "acquire", model }, OWNER_A)
      );
      const body = await json(response);
      assert.equal(response.status, 410);
      assert.equal((body.error as { code?: string }).code, "PROVIDER_RETIRED");
      assert.equal(
        (body.error as { message?: string }).message,
        "Provider is retired and unavailable."
      );
    }
  }
  assert.equal(attemptedExternalCalls, 0);
});

test("requires JSON mutation input after authenticating and exposes generic CORS headers", async () => {
  const connection = await seedConnection(1);
  const managed = await seedKey([connection.id]);
  const unsupported = await route.POST(
    new Request("http://omniroute.local/api/v1/session-leases", {
      method: "POST",
      headers: { Authorization: `Bearer ${managed.key}` },
      body: JSON.stringify({ action: "acquire", model: "glm/glm-4.6" }),
    })
  );
  assert.equal(unsupported.status, 415);
  assert.equal(
    ((await json(unsupported)).error as { code: string }).code,
    "LEASE_CONTENT_TYPE_REQUIRED"
  );

  const preflight = await route.OPTIONS();
  assert.equal(preflight.status, 204);
  const allowedHeaders = preflight.headers.get("Access-Control-Allow-Headers") ?? "";
  assert.match(allowedHeaders, /X-OmniRoute-Lease-Owner/i);
  assert.match(allowedHeaders, /X-OmniRoute-Lease-Generation/i);
  assert.equal(attemptedExternalCalls, 0);
});

test("acquire rejects retired Felo models with the sanitized retirement response", async () => {
  const retiredConnection = (await providersDb.createProviderConnection({
    provider: "felo-web",
    authType: "apikey",
    name: "retired-felo-lease-route",
    apiKey: "sk-retired-felo-lease-route",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  })) as { id: string };
  const managed = await seedKey([retiredConnection.id]);

  const response = await route.POST(
    request(managed.key, { action: "acquire", model: "felo-web/gpt-4o" }, OWNER_A)
  );

  assert.equal(response.status, 410);
  const body = await json(response);
  assert.equal((body.error as { code?: string }).code, "PROVIDER_RETIRED");
  assert.equal(
    (body.error as { message?: string }).message,
    "Provider is retired and unavailable."
  );
  assert.equal(JSON.stringify(body).includes("felo-web"), false);
  assert.equal(attemptedExternalCalls, 0);
});

test("acquires, reuses, renews, releases, and fences a stale lifecycle", async () => {
  const connection = await seedConnection(1);
  const managed = await seedKey([connection.id]);

  const acquired = await route.POST(
    request(managed.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)
  );
  assert.equal(acquired.status, 200);
  const acquiredBody = await json(acquired);
  assert.equal(acquiredBody.state, "ACTIVE");
  assert.equal(acquiredBody.generation, 1);
  assert.equal("connectionId" in acquiredBody, false);
  assert.equal("credentials" in acquiredBody, false);
  assert.equal(JSON.stringify(acquiredBody).includes(OWNER_A), false);

  const reused = await route.POST(
    request(managed.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)
  );
  assert.equal(reused.status, 200);
  assert.equal((await json(reused)).generation, 1);

  const renewed = await route.POST(
    request(managed.key, { action: "renew", generation: 1 }, OWNER_A)
  );
  assert.equal(renewed.status, 200);
  assert.equal("connection" in (await json(renewed)), false);

  const staleRenew = await route.POST(
    request(managed.key, { action: "renew", generation: 2 }, OWNER_A)
  );
  assert.equal(staleRenew.status, 409);
  assert.equal(((await json(staleRenew)).error as { code: string }).code, "LEASE_FENCE_STALE");

  const released = await route.POST(
    request(managed.key, { action: "release", generation: 1, reason: "CLIENT_CANCELLED" }, OWNER_A)
  );
  assert.equal(released.status, 200);
  const releasedBody = await json(released);
  assert.equal(releasedBody.state, "RELEASED");
  assert.equal("connection" in releasedBody, false);

  const idempotent = await route.POST(
    request(managed.key, { action: "release", generation: 1 }, OWNER_A)
  );
  assert.equal(idempotent.status, 200);
  assert.equal((await json(idempotent)).state, "RELEASED");
  assert.equal(attemptedExternalCalls, 0);
});

test("status explicitly returns only the active owner's privacy-safe connection display metadata", async () => {
  const connection = await seedConnection(1);
  const managed = await seedKey([connection.id]);
  const acquired = await route.POST(
    request(managed.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)
  );
  assert.equal(acquired.status, 200);

  const response = await route.POST(
    request(managed.key, { action: "status", generation: 1 }, OWNER_A)
  );
  assert.equal(response.status, 200);
  const body = await json(response);
  assert.deepEqual(Object.keys(body).sort(), [
    "acquiredAt",
    "connection",
    "expiresAt",
    "generation",
    "renewedAt",
    "state",
  ]);
  assert.deepEqual(body.connection, {
    displayName: "lease-route-1",
    provider: "glm",
  });

  const serialized = JSON.stringify(body);
  for (const forbidden of [
    connection.id,
    managed.id,
    managed.key,
    OWNER_A,
    leaseDb.hashLeaseOwnerId(OWNER_A),
    "sk-route-1",
    "connectionId",
    "apiKeyId",
    "leaseOwnerHash",
    "leaseOwnerId",
    "credentials",
    "accessToken",
    "refreshToken",
    "cookie",
    "fencing",
  ]) {
    assert.equal(serialized.includes(forbidden), false, `status must not contain ${forbidden}`);
  }
  assert.equal(attemptedExternalCalls, 0);
});

test("status fails closed for a foreign key, different owner, or stale generation", async () => {
  const connection = await seedConnection(1);
  const ownerKey = await seedKey([connection.id]);
  const foreignKey = await seedKey([connection.id]);
  assert.equal(
    (await route.POST(request(ownerKey.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)))
      .status,
    200
  );

  const attempts = [
    request(foreignKey.key, { action: "status", generation: 1 }, OWNER_A),
    request(ownerKey.key, { action: "status", generation: 1 }, OWNER_B),
    request(ownerKey.key, { action: "status", generation: 2 }, OWNER_A),
  ];
  for (const attempt of attempts) {
    const response = await route.POST(attempt);
    assert.equal(response.status, 409);
    const body = await json(response);
    assert.equal((body.error as { code: string }).code, "LEASE_FENCE_STALE");
    const serialized = JSON.stringify(body);
    assert.equal("connection" in body, false);
    assert.equal(serialized.includes("lease-route-1"), false);
    assert.equal(serialized.includes(connection.id), false);
  }
  assert.equal(attemptedExternalCalls, 0);
});

test("status never uses provider identity as a connection display-name fallback", async () => {
  for (const identity of [
    { email: "private-lease-owner@example.com" },
    { displayName: "Private Provider Account" },
  ]) {
    await resetStorage();
    const privateIdentity = identity.email ?? identity.displayName;
    const providerToken = `private-provider-access-token-${privateIdentity}`;
    const connection = await providersDb.createProviderConnection({
      provider: "glm",
      authType: "access_token",
      accessToken: providerToken,
      ...identity,
      isActive: true,
      testStatus: "active",
    });
    assert.equal(connection.name, privateIdentity, "the stored name is a generated fallback");
    const managed = await seedKey([connection.id]);
    assert.equal(
      (await route.POST(request(managed.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)))
        .status,
      200
    );

    const response = await route.POST(
      request(managed.key, { action: "status", generation: 1 }, OWNER_A)
    );
    assert.equal(response.status, 200);
    const body = await json(response);
    assert.deepEqual(body.connection, { displayName: null, provider: "glm" });
    const serialized = JSON.stringify(body);
    assert.equal(serialized.includes(privateIdentity), false);
    assert.equal(serialized.includes(providerToken), false);
    assert.equal(serialized.includes(connection.id), false);
  }
  assert.equal(attemptedExternalCalls, 0);
});

test("status replaces a generated compatible-provider id with a non-sensitive label", async () => {
  const providerId = "openai-compatible-chat-01234567-89ab-cdef-0123-456789abcdef";
  await providersDb.createProviderNode({
    id: providerId,
    type: "openai-compatible",
    name: "Internal routing node",
    prefix: "internal-routing-node",
    apiType: "chat",
    baseUrl: "https://private-provider.invalid/v1",
  });
  const connection = await providersDb.createProviderConnection({
    provider: providerId,
    authType: "apikey",
    name: "Safe gateway label",
    apiKey: "private-compatible-provider-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const managed = await seedKey([connection.id]);
  const acquired = leaseDb.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_A,
    apiKeyId: managed.id,
    provider: providerId,
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");

  const response = await route.POST(
    request(managed.key, { action: "status", generation: 1 }, OWNER_A)
  );
  assert.equal(response.status, 200);
  const body = await json(response);
  assert.deepEqual(body.connection, {
    displayName: "Safe gateway label",
    provider: "Compatible (openai)",
  });
  const serialized = JSON.stringify(body);
  assert.equal(serialized.includes(providerId), false);
  assert.equal(serialized.includes("internal-routing-node"), false);
  assert.equal(serialized.includes("private-provider.invalid"), false);
  assert.equal(serialized.includes("private-compatible-provider-key"), false);
  assert.equal(attemptedExternalCalls, 0);
});

test("status reads the new binding after transition and never returns the old label", async () => {
  const oldConnection = await seedConnection(1);
  const newConnection = await seedConnection(2);
  const managed = await seedKey([oldConnection.id, newConnection.id]);
  assert.equal(
    (await route.POST(request(managed.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)))
      .status,
    200
  );

  const transitioned = leaseDb.transitionExclusiveConnectionLease({
    leaseOwnerId: OWNER_A,
    generation: 1,
    apiKeyId: managed.id,
    provider: "glm",
    connectionId: newConnection.id,
    reason: "CONNECTION_INELIGIBLE",
  });
  assert.equal(transitioned.kind, "TRANSITIONED");
  if (transitioned.kind !== "TRANSITIONED") return;

  const currentResponse = await route.POST(
    request(managed.key, { action: "status", generation: transitioned.lease.generation }, OWNER_A)
  );
  assert.equal(currentResponse.status, 200);
  const currentBody = await json(currentResponse);
  assert.deepEqual(currentBody.connection, {
    displayName: "lease-route-2",
    provider: "glm",
  });
  const serialized = JSON.stringify(currentBody);
  assert.equal(serialized.includes("lease-route-1"), false);
  assert.equal(serialized.includes(oldConnection.id), false);
  assert.equal(serialized.includes(newConnection.id), false);
  assert.equal(attemptedExternalCalls, 0);
});

test("status exposes no connection metadata for released, expired, invalidated, or missing leases", async () => {
  for (const inactiveState of ["released", "expired", "invalidated"] as const) {
    await resetStorage();
    const connection = await seedConnection(1);
    const managed = await seedKey([connection.id]);
    assert.equal(
      (await route.POST(request(managed.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)))
        .status,
      200
    );

    if (inactiveState === "released") {
      assert.equal(
        (await route.POST(request(managed.key, { action: "release", generation: 1 }, OWNER_A)))
          .status,
        200
      );
    } else if (inactiveState === "expired") {
      leaseDb.reconcileExpiredExclusiveConnectionLeases(
        new Date(Date.now() + 180_000).toISOString()
      );
    } else {
      assert.equal(
        leaseDb.invalidateExclusiveConnectionLease({
          leaseOwnerId: OWNER_A,
          generation: 1,
          apiKeyId: managed.id,
          reason: "AUTHORIZATION_CHANGED",
        }).kind,
        "INVALIDATED"
      );
    }

    const response = await route.POST(
      request(managed.key, { action: "status", generation: 1 }, OWNER_A)
    );
    assert.equal(response.status, 409, inactiveState);
    const body = await json(response);
    assert.equal("connection" in body, false, inactiveState);
    assert.equal(JSON.stringify(body).includes("lease-route-1"), false, inactiveState);
    assert.equal(JSON.stringify(body).includes(connection.id), false, inactiveState);
  }

  await resetStorage();
  const connection = await seedConnection(1);
  const managed = await seedKey([connection.id]);
  const missing = await route.POST(
    request(managed.key, { action: "status", generation: 1 }, OWNER_A)
  );
  assert.equal(missing.status, 409);
  assert.equal("connection" in (await json(missing)), false);
  assert.equal(attemptedExternalCalls, 0);
});

test("renew and release require the API key that owns the active authorization", async () => {
  const connection = await seedConnection(1);
  const ownerKey = await seedKey([connection.id]);
  const foreignKey = await seedKey([connection.id]);
  const acquired = await route.POST(
    request(ownerKey.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)
  );
  assert.equal(acquired.status, 200);

  const foreignRenew = await route.POST(
    request(foreignKey.key, { action: "renew", generation: 1 }, OWNER_A)
  );
  assert.equal(foreignRenew.status, 409);
  assert.equal(((await json(foreignRenew)).error as { code: string }).code, "LEASE_FENCE_STALE");

  const foreignRelease = await route.POST(
    request(foreignKey.key, { action: "release", generation: 1 }, OWNER_A)
  );
  assert.equal(foreignRelease.status, 409);
  assert.equal(((await json(foreignRelease)).error as { code: string }).code, "LEASE_FENCE_STALE");

  const ownerRenew = await route.POST(
    request(ownerKey.key, { action: "renew", generation: 1 }, OWNER_A)
  );
  assert.equal(ownerRenew.status, 200);
  assert.equal(attemptedExternalCalls, 0);
});

test("same-owner acquire through a second managed key is rejected without rebinding", async () => {
  const first = await seedConnection(1);
  const second = await seedConnection(2);
  const firstKey = await seedKey([first.id]);
  const secondKey = await seedKey([second.id]);
  const acquired = await route.POST(
    request(firstKey.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)
  );
  assert.equal(acquired.status, 200);
  assert.equal((await json(acquired)).generation, 1);

  const transitioned = await route.POST(
    request(secondKey.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)
  );
  assert.equal(transitioned.status, 409);

  const active = (
    await import("../../src/lib/db/exclusiveConnectionLeases.ts")
  ).getActiveExclusiveConnectionLease(OWNER_A);
  assert.equal(active?.connectionId, first.id);
  assert.equal(active?.apiKeyId, firstKey.id);
  assert.equal(attemptedExternalCalls, 0);
});

test("returns bounded WAITING_FOR_CAPACITY without credential or owner disclosure", async () => {
  const connection = await seedConnection(1);
  const managed = await seedKey([connection.id]);
  assert.equal(
    (await route.POST(request(managed.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_A)))
      .status,
    200
  );

  const waiting = await route.POST(
    request(managed.key, { action: "acquire", model: "glm/glm-4.6" }, OWNER_B)
  );
  assert.equal(waiting.status, 429);
  const retryAfterHeader = Number(waiting.headers.get("Retry-After"));
  assert.equal(Number.isInteger(retryAfterHeader), true);
  assert.equal(retryAfterHeader >= 1 && retryAfterHeader <= 120, true);
  const body = await json(waiting);
  assert.equal(body.state, "WAITING_FOR_CAPACITY");
  assert.equal(body.reason, "NO_FREE_ELIGIBLE_CONNECTION");
  assert.equal(body.freeCount, 0);
  assert.equal(typeof body.retryAfter, "number");
  assert.equal(body.retryAfter, retryAfterHeader);
  assert.equal((body.error as { code: string }).code, "LEASE_CAPACITY_UNAVAILABLE");
  const serialized = JSON.stringify(body);
  assert.equal(serialized.includes(OWNER_A), false);
  assert.equal(serialized.includes(OWNER_B), false);
  assert.equal(serialized.includes("apiKey"), false);
  assert.equal(serialized.includes("at /"), false);
  assert.equal("connection" in body, false);
  assert.equal(attemptedExternalCalls, 0);
});
