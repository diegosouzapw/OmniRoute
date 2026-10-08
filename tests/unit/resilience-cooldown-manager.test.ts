/**
 * Bulk cooldown manager (/api/resilience/cooldowns + src/lib/resilience/cooldownManager.ts).
 *
 * Operators had to open each provider page to lift a cooldown. The manager lists every
 * connection with its cooldown / model lockout / terminal state (never credentials) and
 * clears transient states in bulk, while terminal states (banned, expired,
 * credits_exhausted) are left for an explicit credential fix.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cooldown-manager-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "cooldown-manager-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const manager = await import("../../src/lib/resilience/cooldownManager.ts");
const route = await import("../../src/app/api/resilience/cooldowns/route.ts");

const IN_TEN_MINUTES = () => new Date(Date.now() + 10 * 60_000).toISOString();

async function resetStorage() {
  accountFallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

async function seed(provider: string, overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    accessToken: `secret-token-${provider}`,
    isActive: true,
    testStatus: "active",
    ...overrides,
  });
}

async function seedPool() {
  const cooling = await seed("codex", { name: "cooling" });
  await providersDb.updateProviderConnection(cooling.id, {
    testStatus: "unavailable",
    rateLimitedUntil: IN_TEN_MINUTES(),
    errorCode: 502,
    lastError: "upstream 502",
    lastErrorType: "server_error",
    backoffLevel: 2,
  });
  const locked = await seed("codex", { name: "locked" });
  accountFallback.lockModel("codex", locked.id, "gpt-6-luna-max", "rate_limited", 600_000);
  const banned = await seed("codex", { name: "banned", testStatus: "banned" });
  const other = await seed("claude", { name: "other-provider" });
  await providersDb.updateProviderConnection(other.id, {
    testStatus: "unavailable",
    rateLimitedUntil: IN_TEN_MINUTES(),
    errorCode: 429,
  });
  return { cooling, locked, banned, other };
}

function postRequest(body: unknown) {
  return new Request("http://localhost/api/resilience/cooldowns", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.after(() => {
  accountFallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("lists every connection with its cooldown, lockout and terminal state", async () => {
  await resetStorage();
  const { cooling, locked, banned } = await seedPool();

  const list = await manager.listConnectionCooldowns("codex");
  const byId = new Map(list.map((connection) => [connection.id, connection]));

  assert.equal(list.length, 3, "provider filter keeps only codex connections");
  assert.equal(byId.get(cooling.id)?.status, "cooling_down");
  assert.ok((byId.get(cooling.id)?.cooldownRemainingMs ?? 0) > 0);
  assert.equal(byId.get(cooling.id)?.backoffLevel, 2);
  assert.equal(byId.get(locked.id)?.status, "model_locked");
  // Codex locks per quota scope, so the listed "model" is the scope name.
  assert.equal(byId.get(locked.id)?.lockouts.length, 1);
  assert.ok((byId.get(locked.id)?.lockouts[0]?.remainingMs ?? 0) > 0);
  assert.equal(byId.get(banned.id)?.status, "terminal");
});

test("the GET response never carries credentials", async () => {
  await resetStorage();
  await seedPool();

  const response = await route.GET(new Request("http://localhost/api/resilience/cooldowns"));
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.ok(!body.includes("secret-token"), "access tokens must not leak");
  assert.equal(JSON.parse(body).connections.length, 4);
});

test("clearing selected connections lifts the cooldown and model lockouts", async () => {
  await resetStorage();
  const { cooling, locked, other } = await seedPool();

  const response = await route.POST(postRequest({ connectionIds: [cooling.id, locked.id] }));
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.cleared, 1);
  assert.equal(result.unchanged, 1, "the locked connection had no connection-level error");
  assert.equal(result.lockoutsCleared, 1);

  const after = await providersDb.getProviderConnectionById(cooling.id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil);
  assert.equal(after.backoffLevel, 0);
  assert.equal(accountFallback.getModelLockoutInfo("codex", locked.id, "gpt-6-luna-max"), null);

  const untouched = await providersDb.getProviderConnectionById(other.id);
  assert.ok(untouched.rateLimitedUntil, "connections outside the selection keep their cooldown");
});

test("clearing all within a provider skips terminal connections", async () => {
  await resetStorage();
  const { banned, other } = await seedPool();

  const response = await route.POST(postRequest({ all: true, provider: "codex" }));
  const result = await response.json();
  assert.equal(result.cleared, 1);
  assert.equal(result.skippedTerminal, 1);

  const stillBanned = await providersDb.getProviderConnectionById(banned.id);
  assert.equal(stillBanned.testStatus, "banned", "terminal states are not cooldowns");
  const otherProvider = await providersDb.getProviderConnectionById(other.id);
  assert.ok(otherProvider.rateLimitedUntil, "other providers are not touched");
});

test("POST rejects a body with neither connectionIds nor all", async () => {
  await resetStorage();

  const empty = await route.POST(postRequest({}));
  assert.equal(empty.status, 400);
  const unknownField = await route.POST(postRequest({ all: true, everything: true }));
  assert.equal(unknownField.status, 400);
});

test("both methods require management auth when login is enabled", async () => {
  await resetStorage();
  process.env.INITIAL_PASSWORD = "cooldown-manager-requires-login";

  const get = await route.GET(new Request("http://localhost/api/resilience/cooldowns"));
  const post = await route.POST(postRequest({ all: true }));
  assert.ok(get.status === 401 || get.status === 403, `GET got ${get.status}`);
  assert.ok(post.status === 401 || post.status === 403, `POST got ${post.status}`);
  const body = JSON.stringify(await post.json());
  assert.ok(!/\bat \/|\bat file:\/\//.test(body), "no stack trace in the error body");
  delete process.env.INITIAL_PASSWORD;
});

test("the page maps /api/resilience into the rules it edits", async () => {
  const { toCooldownRules } =
    await import("../../src/app/(dashboard)/dashboard/resilience/cooldowns/components/useCooldownData.ts");

  const rules = toCooldownRules({
    streamStallCooldown: { enabled: true },
    connectionCooldown: {
      oauth: { baseCooldownMs: 5000, maxBackoffSteps: 6, useUpstreamRetryHints: true },
      apikey: { baseCooldownMs: 3000, maxBackoffSteps: 4 },
    },
  });
  assert.deepEqual(rules, {
    streamStallCooldown: true,
    oauth: { baseCooldownMs: 5000, maxBackoffSteps: 6 },
    apikey: { baseCooldownMs: 3000, maxBackoffSteps: 4 },
  });
  assert.equal(toCooldownRules({}).streamStallCooldown, false, "missing setting reads as off");
});
