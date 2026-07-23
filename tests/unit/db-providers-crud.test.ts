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

test("getProviderConnections filters by authType", async () => {
  const apiKeyConnection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "API Key Connection",
    apiKey: "sk-apikey",
  });
  const oauthConnection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "oauth@example.com",
    accessToken: "token-a",
    refreshToken: "refresh-a",
  });

  const oauthOnly = await providersDb.getProviderConnections({ authType: "oauth" });
  const apiKeyOnly = await providersDb.getProviderConnections({ authType: "apikey" });

  assert.deepEqual(
    oauthOnly.map((connection) => connection.id),
    [oauthConnection.id]
  );
  assert.deepEqual(
    apiKeyOnly.map((connection) => connection.id),
    [apiKeyConnection.id]
  );
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

test("codex logins without a workspaceId are not merged on bare email match", async () => {
  const loginA = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "shared@example.com",
    accessToken: "token-account-a",
    refreshToken: "refresh-account-a",
    providerSpecificData: { chatgptUserId: "user-a" },
  });
  const loginB = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "shared@example.com",
    accessToken: "token-account-b",
    refreshToken: "refresh-account-b",
    providerSpecificData: { chatgptUserId: "user-b" },
  });

  const rows = await providersDb.getProviderConnections({ provider: "codex" });

  // Two distinct Codex accounts sharing an email but lacking a verifiable
  // workspaceId must NOT collapse into a single row — that would silently
  // overwrite the first account's token pair on the second login.
  assert.notEqual(loginB.id, loginA.id);
  assert.equal(rows.length, 2);

  const rowA = rows.find((row) => row.id === loginA.id);
  assert.equal(rowA?.accessToken, "token-account-a");
  assert.equal(rowA?.refreshToken, "refresh-account-a");
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

test("deleteProviderConnections deletes multiple connections and returns correct count", async () => {
  const a = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Alpha",
    apiKey: "alpha-key",
  });
  const b = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Beta",
    apiKey: "beta-key",
  });
  const c = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Gamma",
    apiKey: "gamma-key",
  });

  const deleted = await providersDb.deleteProviderConnections([(a as any).id, (c as any).id]);
  assert.equal(deleted, 2);

  assert.equal(await providersDb.getProviderConnectionById((a as any).id), null);
  assert.equal(await providersDb.getProviderConnectionById((c as any).id), null);
  const remaining = await providersDb.getProviderConnectionById((b as any).id);
  assert.notEqual(remaining, null);
});

test("deleteProviderConnections with empty array returns 0", async () => {
  const deleted = await providersDb.deleteProviderConnections([]);
  assert.equal(deleted, 0);
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
test("getProviderConnections supports authType filter and column projection", async () => {
  const oauth = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    name: "OAuth Conn",
    email: "user@example.com",
    refreshToken: "rt_abc123",
    isActive: true,
  });
  const apiKey = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "API Key Conn",
    apiKey: "sk-xyz",
    isActive: true,
  });

  // authType filter
  const oauthConns = await providersDb.getProviderConnections({ authType: "oauth" });
  assert.equal(oauthConns.length, 1);
  assert.equal(oauthConns[0].id, oauth.id);

  const apiKeyConns = await providersDb.getProviderConnections({ authType: "apikey" });
  assert.equal(apiKeyConns.length, 1);
  assert.equal(apiKeyConns[0].id, apiKey.id);

  // authType + isActive filter
  const activeOAuth = await providersDb.getProviderConnections({
    authType: "oauth",
    isActive: true,
  });
  assert.equal(activeOAuth.length, 1);

  // Column projection: only requested columns returned
  const projected = await providersDb.getProviderConnections({ authType: "oauth" }, undefined, undefined, [
    "id",
    "provider",
    "name",
  ]);
  assert.equal(projected.length, 1);
  const keys = Object.keys(projected[0]);
  // id, provider, name each appear in camelCase
  assert.ok(keys.includes("id"));
  assert.ok(keys.includes("provider"));
  assert.ok(keys.includes("name"));
  // decryptConnectionFields always adds undefined keys via explicit spread,
  // so `in` checks can't distinguish "not projected" from "undefined value."
  // Check value semantics instead.
  assert.strictEqual(projected[0].refreshToken, undefined);
  assert.strictEqual(projected[0].authType, undefined);

  // Default (no columns param) returns all fields
  const full = await providersDb.getProviderConnections({ authType: "oauth" });
  const fullKeys = Object.keys(full[0]);
  assert.ok(fullKeys.length > keys.length);
  assert.ok("refreshToken" in full[0]);
  assert.ok("authType" in full[0]);
});

test("getProviderConnections rejects column names outside the real provider_connections schema", async () => {
  // The `columns` array is interpolated directly into the SQL SELECT clause,
  // so it must be validated against an allowlist before use — otherwise it's
  // a SQL-injection footgun for whichever future caller wires it to
  // untrusted input. A single bogus column should reject the whole call.
  await assert.rejects(
    () => providersDb.getProviderConnections({}, undefined, undefined, ["not_a_real_column"]),
    /invalid column/i
  );

  // A mix of valid + invalid columns must still reject (fail-closed, not a
  // silent partial projection).
  await assert.rejects(
    () => providersDb.getProviderConnections({}, undefined, undefined, ["id", "provider; DROP TABLE provider_connections; --"]),
    /invalid column/i
  );

  // The reserved SQL keyword "group" is a legitimate, allowlisted column and
  // must still work (quoted internally so it doesn't collide with the SQL
  // GROUP keyword).
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    name: "Group Column Conn",
    email: "group-col@example.com",
    refreshToken: "rt_group_col",
    isActive: true,
    group: "team-a",
  });
  const withGroup = await providersDb.getProviderConnections({ authType: "oauth" }, undefined, undefined, [
    "id",
    "group",
  ]);
  assert.equal(withGroup.length, 1);
  assert.equal(withGroup[0].group, "team-a");
});

test("getProviderConnections supports limit/offset pagination", async () => {
  // Create 5 connections
  for (let i = 5; i >= 1; i--) {
    const conn = await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: `Pageable conn ${i}`,
      apiKey: `sk-paging-${i}`,
      priority: i,
    });
  }
  // createProviderConnection calls _reorderConnections after every insert,
  // which reassigns priorities — so expectations must come from the DB.
  const allFromDb = await providersDb.getProviderConnections({ provider: "openai" });
  const expectedOrder = allFromDb.map((c) => c.id);
  assert.equal(expectedOrder.length, 5, "must have 5 connections");

  const all = await providersDb.getProviderConnections({ provider: "openai" });
  assert.equal(all.length, 5);
  assert.equal(all[0].id, expectedOrder[0]);

  // limit=2, offset=0 → first 2
  const page1 = await providersDb.getProviderConnections({ provider: "openai" }, 2, 0);
  assert.equal(page1.length, 2);
  assert.equal(page1[0].id, expectedOrder[0]);
  assert.equal(page1[1].id, expectedOrder[1]);

  // limit=2, offset=2 → next 2
  const page2 = await providersDb.getProviderConnections({ provider: "openai" }, 2, 2);
  assert.equal(page2.length, 2);
  assert.equal(page2[0].id, expectedOrder[2]);
  assert.equal(page2[1].id, expectedOrder[3]);

  // limit=2, offset=4 → last 1
  const page3 = await providersDb.getProviderConnections({ provider: "openai" }, 2, 4);
  assert.equal(page3.length, 1);
  assert.equal(page3[0].id, expectedOrder[4]);

  // offset beyond total → empty
  const empty = await providersDb.getProviderConnections({ provider: "openai" }, 10, 100);
  assert.equal(empty.length, 0);

  // limit=20 exceeds total → returns all 5
  const oversized = await providersDb.getProviderConnections({ provider: "openai" }, 20, 0);
  assert.equal(oversized.length, 5);
});
