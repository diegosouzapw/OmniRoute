import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-providers-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("createProviderConnection assigns provider-scoped priorities and supports filtered reads", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Primary",
    apiKey: "sk-primary",
    group: "team-b",
  });
  const second = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Secondary",
    apiKey: "sk-secondary",
    isActive: false,
    group: "team-a",
  });

  const openAiConnections = await providersDb.getProviderConnections({ provider: "openai" });
  const activeConnections = await providersDb.getProviderConnections({
    provider: "openai",
    isActive: true,
  });

  assert.deepEqual(
    openAiConnections.map((connection) => ({
      name: connection.name,
      priority: connection.priority,
    })),
    [
      { name: "Primary", priority: 1 },
      { name: "Secondary", priority: 2 },
    ]
  );
  assert.deepEqual(
    activeConnections.map((connection) => connection.id),
    [first.id]
  );
  assert.deepEqual(await providersDb.getDistinctGroups(), ["team-a", "team-b"]);
  assert.equal(second.isActive, false);
});

test("oauth connections upsert by provider and email instead of duplicating rows", async () => {
  const original = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "dev@example.com",
    accessToken: "token-a",
    refreshToken: "refresh-a",
    testStatus: "ok",
  });

  const updated = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "dev@example.com",
    accessToken: "token-b",
    refreshToken: "refresh-b",
    lastError: "expired",
    testStatus: "retrying",
  });

  const rows = await providersDb.getProviderConnections({ provider: "claude" });

  assert.equal(updated.id, original.id);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].accessToken, "token-b");
  assert.equal(rows[0].lastError, "expired");
  assert.equal(rows[0].testStatus, "retrying");
});

test("codex workspace uniqueness uses workspaceId alongside email", async () => {
  const workspaceA = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "workspace@example.com",
    providerSpecificData: { workspaceId: "ws-a" },
  });
  const workspaceAUpdate = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "workspace@example.com",
    providerSpecificData: { workspaceId: "ws-a" },
    accessToken: "updated-token",
  });
  const workspaceB = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "workspace@example.com",
    providerSpecificData: { workspaceId: "ws-b" },
  });

  const rows = await providersDb.getProviderConnections({ provider: "codex" });

  assert.equal(workspaceAUpdate.id, workspaceA.id);
  assert.notEqual(workspaceB.id, workspaceA.id);
  assert.equal(rows.length, 2);
  assert.deepEqual(rows.map((row) => (row.providerSpecificData as any).workspaceId).sort(), [
    "ws-a",
    "ws-b",
  ]);
});

test("updateProviderConnection reorders priorities and returns decrypted payloads", async () => {
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
  const third = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Third",
    apiKey: "third-key",
  });

  const updated = await providersDb.updateProviderConnection((third as any).id, {
    priority: 0,
    providerSpecificData: { region: "us-east-1" },
    rateLimitProtection: true,
  });

  const ordered = await providersDb.getProviderConnections({ provider: "openai" });

  assert.equal((updated as any).providerSpecificData.region, "us-east-1");
  assert.equal(updated.rateLimitProtection, true);
  assert.deepEqual(
    ordered.map((connection) => ({
      id: connection.id,
      priority: connection.priority,
    })),
    [
      { id: third.id, priority: 1 },
      { id: first.id, priority: 2 },
      { id: second.id, priority: 3 },
    ]
  );
});

test("deleteProviderConnection reorders remaining rows and bulk delete reports changes", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "One",
    apiKey: "one",
  });
  const second = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Two",
    apiKey: "two",
  });
  const third = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Three",
    apiKey: "three",
  });

  assert.equal(await providersDb.deleteProviderConnection((second as any).id), true);

  const reordered = await providersDb.getProviderConnections({ provider: "anthropic" });
  const deletedCount = await providersDb.deleteProviderConnectionsByProvider("anthropic");

  assert.deepEqual(
    reordered.map((connection) => ({
      id: connection.id,
      priority: connection.priority,
    })),
    [
      { id: first.id, priority: 1 },
      { id: third.id, priority: 2 },
    ]
  );
  assert.equal(deletedCount, 2);
  assert.deepEqual(await providersDb.getProviderConnections({ provider: "anthropic" }), []);
});

test("provider node CRUD supports filter, update and delete", async () => {
  const customNode = await providersDb.createProviderNode({
    type: "custom",
    name: "Custom Gateway",
    prefix: "custom-",
    baseUrl: "https://custom.example.com",
  });
  const openAiNode = await providersDb.createProviderNode({
    type: "openai",
    name: "OpenAI Native",
    baseUrl: "https://api.openai.com",
  });

  const filtered = await providersDb.getProviderNodes({ type: "custom" });
  const updated = await providersDb.updateProviderNode((customNode as any).id, {
    name: "Custom Gateway v2",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const deleted = await providersDb.deleteProviderNode((openAiNode as any).id);

  assert.deepEqual(
    filtered.map((node) => node.id),
    [customNode.id]
  );
  assert.equal(updated.name, "Custom Gateway v2");
  assert.equal(updated.chatPath, "/v1/chat/completions");
  assert.deepEqual(await providersDb.getProviderNodeById((customNode as any).id), updated);
  assert.equal(deleted.id, openAiNode.id);
  assert.equal(await providersDb.getProviderNodeById((openAiNode as any).id), null);
});

test("rate-limit helpers persist cooldown state in the database", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Rate Limited",
    apiKey: "rate-key",
  });
  const future = Date.now() + 90_000;

  providersDb.setConnectionRateLimitUntil((connection as any).id, future);

  assert.equal(providersDb.isConnectionRateLimited((connection as any).id), true);
  assert.deepEqual(
    providersDb
      .getRateLimitedConnections("openai")
      .map((entry) => ({ ...entry, rateLimitedUntil: Number(entry.rateLimitedUntil) })),
    [{ id: connection.id, rateLimitedUntil: future }]
  );

  providersDb.setConnectionRateLimitUntil((connection as any).id, null);

  assert.equal(providersDb.isConnectionRateLimited((connection as any).id), false);
  assert.deepEqual(providersDb.getRateLimitedConnections("openai"), []);
});

test("quota helpers zero stale windows and format countdowns", () => {
  const past = Date.now() - 1_000;
  const future = Date.now() + 65_000;

  assert.equal(providersDb.getEffectiveQuotaUsage(120, past), 0);
  assert.equal(providersDb.getEffectiveQuotaUsage(120, "not-a-date"), 120);
  assert.equal(providersDb.getEffectiveQuotaUsage(120, null), 120);
  assert.match(providersDb.formatResetCountdown(future), /1m \d+s/);
  assert.equal(providersDb.formatResetCountdown(past), null);
});
