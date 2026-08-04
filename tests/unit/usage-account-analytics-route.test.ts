import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-account-analytics-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-account-analytics-secret";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { resolveUsageAccountIdentity } = await import("../../src/lib/usage/accountIdentity.ts");
const analyticsRoute = await import("../../src/app/api/usage/analytics/route.ts");

function makeRequest() {
  return new Request("http://localhost/api/usage/analytics?startDate=2026-01-01T00:00:00.000Z");
}

async function readAnalytics() {
  const response = await analyticsRoute.GET(makeRequest());
  assert.equal(response.status, 200);
  return (await response.json()) as {
    summary: Record<string, unknown>;
    byAccount: Array<Record<string, unknown>>;
  };
}

async function readAccounts() {
  return (await readAnalytics()).byAccount;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Codex account grouping follows workspace and user identity, not email", async () => {
  await localDb.updatePricing({ codex: { "gpt-5.5": { input: 1, output: 2 } } });
  const specs = [
    { workspaceId: "workspace-a", chatgptUserId: "user-a", email: "old@example.com" },
    { workspaceId: "workspace-a", chatgptUserId: "user-b", email: "old@example.com" },
    { workspaceId: "workspace-b", chatgptUserId: "user-a", email: "old@example.com" },
  ];

  for (const [index, spec] of specs.entries()) {
    const connection = await providersDb.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      email: spec.email,
      displayName: `Account ${index + 1}`,
      providerSpecificData: spec,
    });
    await usageHistory.saveRequestUsage({
      provider: "codex",
      model: "gpt-5.5",
      connectionId: connection.id as string,
      tokens: { input: 1000, output: 500 },
      timestamp: `2026-01-0${index + 1}T00:00:00.000Z`,
    });
  }

  const sameUser = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "new@example.com",
    displayName: "Account 1 renamed",
    providerSpecificData: { workspaceId: "workspace-a", chatgptUserId: "user-a" },
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: sameUser.id as string,
    tokens: { input: 1000, output: 500 },
    timestamp: "2026-01-04T00:00:00.000Z",
  });

  const accounts = await readAccounts();
  assert.equal(accounts.length, 3);
  assert.deepEqual(accounts.map((account) => [account.account, account.requests]).sort(), [
    ["Account 1 renamed", 2],
    ["Account 2", 1],
    ["Account 3", 1],
  ]);
  assert.equal(
    accounts.reduce((sum, account) => sum + Number(account.cost), 0),
    0.008
  );
});

test("updating an established Codex user or workspace does not reattribute earlier usage", async () => {
  const changes = [
    {
      name: "user boundary",
      before: { workspaceId: "workspace-user", chatgptUserId: "user-a" },
      after: { workspaceId: "workspace-user", chatgptUserId: "user-b" },
    },
    {
      name: "workspace boundary",
      before: { workspaceId: "workspace-a", chatgptUserId: "stable-user" },
      after: { workspaceId: "workspace-b", chatgptUserId: "stable-user" },
    },
  ];

  for (const [index, change] of changes.entries()) {
    const connection = await providersDb.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      displayName: `${change.name} before`,
      providerSpecificData: change.before,
    });
    await usageHistory.saveRequestUsage({
      provider: "codex",
      model: "gpt-5.5",
      connectionId: connection.id as string,
      tokens: { input: 10, output: 5 },
      timestamp: `2026-02-0${index + 1}T00:00:00.000Z`,
    });

    await providersDb.updateProviderConnection(connection.id as string, {
      displayName: `${change.name} after`,
      providerSpecificData: change.after,
    });
    await usageHistory.saveRequestUsage({
      provider: "codex",
      model: "gpt-5.5",
      connectionId: connection.id as string,
      tokens: { input: 20, output: 10 },
      timestamp: `2026-02-1${index + 1}T00:00:00.000Z`,
    });
  }

  const accounts = await readAccounts();
  assert.deepEqual(
    accounts.map((account) => [account.account, account.requests, account.totalTokens]).sort(),
    [
      ["user boundary after", 1, 30],
      ["user boundary before", 1, 15],
      ["workspace boundary after", 1, 30],
      ["workspace boundary before", 1, 15],
    ]
  );
});

test("deleting and recreating the same Codex account preserves one historical account", async () => {
  await localDb.updatePricing({ codex: { "gpt-5.5": { input: 1, output: 2 } } });
  const identity = {
    workspaceId: "workspace-internal-recreated",
    chatgptUserId: "user-internal-recreated",
  };
  const original = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    displayName: "Production Codex <member@example.com>",
    providerSpecificData: identity,
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: original.id as string,
    tokens: { input: 1000, output: 500 },
    timestamp: "2026-03-01T00:00:00.000Z",
  });

  assert.equal(await providersDb.deleteProviderConnection(original.id as string), true);
  const recreated = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    providerSpecificData: identity,
  });
  assert.notEqual(recreated.id, original.id);
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: recreated.id as string,
    tokens: { input: 1000, output: 500 },
    timestamp: "2026-03-02T00:00:00.000Z",
  });

  const analytics = await readAnalytics();
  assert.deepEqual(
    analytics.byAccount.map((account) => ({
      account: account.account,
      requests: account.requests,
      promptTokens: account.promptTokens,
      completionTokens: account.completionTokens,
      totalTokens: account.totalTokens,
      cost: account.cost,
    })),
    [
      {
        account: "Production Codex <member@example.com>",
        requests: 2,
        promptTokens: 2000,
        completionTokens: 1000,
        totalTokens: 3000,
        cost: 0.004,
      },
    ]
  );

  const serialized = JSON.stringify(analytics);
  const { accountKey } = resolveUsageAccountIdentity({
    id: recreated.id,
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    providerSpecificData: identity,
  });
  for (const privateValue of [
    accountKey,
    identity.workspaceId,
    identity.chatgptUserId,
    recreated.id as string,
  ]) {
    assert.equal(serialized.includes(privateValue), false);
  }
});

test("account cost and usage share the same trimmed legacy connection fallback", async () => {
  await localDb.updatePricing({ codex: { "gpt-5.5": { input: 1, output: 2 } } });
  const timestamp = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history
        (provider, model, connection_id, account_label, account_label_priority,
         tokens_input, tokens_output, success, timestamp)
       VALUES ('codex', 'gpt-5.5', '  legacy-id  ', 'Legacy Codex', 4,
               1000, 500, 1, ?)`
    )
    .run(timestamp);

  const analytics = await readAnalytics();
  assert.equal(analytics.byAccount.length, 1);
  assert.deepEqual(
    {
      account: analytics.byAccount[0].account,
      requests: analytics.byAccount[0].requests,
      totalTokens: analytics.byAccount[0].totalTokens,
      cost: analytics.byAccount[0].cost,
    },
    { account: "Legacy Codex", requests: 1, totalTokens: 1500, cost: 0.002 }
  );
  assert.equal(analytics.summary.totalCost, analytics.byAccount[0].cost);
});

test("analytics prefers the highest-priority historical label and reports blank orphan IDs as unknown", async () => {
  await localDb.updatePricing({ codex: { "gpt-5.5": { input: 1, output: 2 } } });
  const db = core.getDbInstance();
  const insert = db.prepare(`INSERT INTO usage_history
    (provider, model, connection_id, account_key, account_label, account_label_priority,
     tokens_input, tokens_output, success, timestamp)
    VALUES (?, 'gpt-5.5', ?, ?, ?, ?, 10, 5, 1, ?)`);
  insert.run(
    "codex",
    "old-uuid",
    "stable-account",
    "  Production Codex  ",
    4,
    "2026-01-01T00:00:00.000Z"
  );
  insert.run("codex", "new-uuid", "stable-account", "   ", 5, "2026-01-02T00:00:00.000Z");
  insert.run("codex", "   ", null, null, 0, "2026-01-03T00:00:00.000Z");

  const analytics = await readAnalytics();
  assert.deepEqual(
    analytics.byAccount.map((account) => [
      account.account,
      account.requests,
      account.totalTokens,
      account.cost,
    ]),
    [
      ["Production Codex", 2, 30, 0.00004],
      ["unknown", 1, 15, 0.00002],
    ]
  );
});

test("generic provider and Codex workspace identities stay distinct under a shared email", async () => {
  const accountSpecs = [
    { provider: "codex", providerSpecificData: { workspaceId: "workspace-a" } },
    { provider: "codex", providerSpecificData: { workspaceId: "workspace-b" } },
    { provider: "openai", providerSpecificData: {} },
  ];

  for (const [index, spec] of accountSpecs.entries()) {
    const connection = await providersDb.createProviderConnection({
      provider: spec.provider,
      authType: "oauth",
      email: "shared@example.com",
      accessToken: `secret-${index}`,
      providerSpecificData: spec.providerSpecificData,
    });
    await usageHistory.saveRequestUsage({
      provider: spec.provider,
      model: spec.provider === "codex" ? "gpt-5.5" : "gpt-4o",
      connectionId: connection.id as string,
      tokens: { input: 100 + index, output: 50 + index },
      timestamp: `2026-01-0${index + 1}T00:00:00.000Z`,
    });
  }

  const accounts = await readAccounts();
  // Three separate accounts share one email label; grouping must not collapse
  // them because workspace and provider identities differ.
  assert.equal(accounts.length, 3);
  assert.deepEqual(accounts.map((account) => account.account).sort(), [
    "shared@example.com",
    "shared@example.com",
    "shared@example.com",
  ]);
  assert.deepEqual(accounts.map((account) => account.requests).sort(), [1, 1, 1]);
});

test("a nonblank orphaned connection ID stays a truthful fallback label", async () => {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history (provider, model, connection_id, tokens_input, tokens_output, success, latency_ms, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run("codex", "gpt-5.5", "deleted-legacy-uuid", 10, 5, 1, 25, "2026-01-01T00:00:00.000Z");

  const accounts = await readAccounts();
  assert.equal(accounts.length, 1);
  assert.equal(accounts[0].account, "deleted-legacy-uuid");
});

test("the newest label wins for one account at equal priority", async () => {
  const db = core.getDbInstance();
  const accountKey = resolveUsageAccountIdentity({
    id: "new-uuid",
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    providerSpecificData: { chatgptUserId: "user-a" },
  }).accountKey;
  const now = Date.now();
  const insert = db.prepare(
    `INSERT INTO usage_history
      (provider, model, connection_id, account_key, account_label, account_label_priority,
       tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  insert.run(
    "codex",
    "gpt-5.5",
    "old-uuid",
    accountKey,
    "Zulu before rename",
    4,
    10,
    5,
    1,
    20,
    new Date(now - 60_000).toISOString()
  );
  insert.run(
    "codex",
    "gpt-5.5",
    "new-uuid",
    accountKey,
    "Alpha after rename",
    4,
    20,
    10,
    1,
    30,
    new Date(now).toISOString()
  );

  const analytics = await readAnalytics();
  assert.equal(analytics.summary.uniqueAccounts, 1);
  assert.equal(analytics.byAccount.length, 1);
  assert.equal(analytics.byAccount[0].account, "Alpha after rename");
  assert.equal(analytics.byAccount[0].requests, 2);
});
