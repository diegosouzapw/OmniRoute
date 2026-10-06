import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * The Logs tab provider / model / account / API-key dropdowns used to be built from
 * the rows of the currently loaded page only. A key (or model, account…) that had no
 * row in that window — or any value other than the selected one, once a filter was
 * applied server-side — was missing from its dropdown, so it could not be picked.
 * getCallLogFilterOptions() reads the distinct values from the whole call_logs table
 * so the dropdowns no longer depend on what the page happens to contain.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-calllogs-filter-opts-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CALL_LOG_RETENTION_DAYS = "3650";

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogFilterOptions.ts");
const { mergeLogFilterOptions } = await import("../../src/shared/utils/logFilterOptions.ts");

type SeedRow = {
  id: string;
  model?: string | null;
  requested_model?: string | null;
  provider?: string | null;
  account?: string | null;
  connection_id?: string | null;
  api_key_id?: string | null;
  api_key_name?: string | null;
};

function insertCallLog(row: SeedRow) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO call_logs (
        id, timestamp, method, path, status, model, requested_model, provider, account,
        connection_id, api_key_id, api_key_name, detail_state
      ) VALUES (
        @id, '2026-01-01T00:00:00.000Z', 'POST', '/v1/chat/completions', 200, @model,
        @requested_model, @provider, @account, @connection_id, @api_key_id, @api_key_name, 'none'
      )`
    )
    .run({
      model: null,
      requested_model: null,
      provider: null,
      account: null,
      connection_id: null,
      api_key_id: null,
      api_key_name: null,
      ...row,
    });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("getCallLogFilterOptions returns distinct values across the whole table", async () => {
  insertCallLog({
    id: "a",
    model: "gpt-5",
    requested_model: "codex/gpt-5",
    provider: "codex",
    account: "alice@example.com",
    api_key_id: "key-a",
    api_key_name: "Team A",
  });
  insertCallLog({
    id: "b",
    model: "gpt-5",
    provider: "codex",
    account: "alice@example.com",
    api_key_id: "key-a",
    api_key_name: "Team A",
  });
  insertCallLog({
    id: "c",
    model: "claude-opus",
    provider: "cursor",
    account: "bob@example.com",
    api_key_id: "key-b",
    api_key_name: "Team B",
  });
  // Unattributed / placeholder values must not become options.
  insertCallLog({ id: "d", model: "", provider: "-", account: "-" });

  const options = await callLogs.getCallLogFilterOptions();

  assert.deepEqual(options.providers, ["codex", "cursor"]);
  assert.deepEqual(options.models, ["claude-opus", "codex/gpt-5", "gpt-5"]);
  assert.deepEqual(options.accounts, ["alice@example.com", "bob@example.com"]);
  assert.deepEqual(options.apiKeys, [
    { id: "key-a", name: "Team A" },
    { id: "key-b", name: "Team B" },
  ]);
});

test("getCallLogFilterOptions resolves the account label like the list rows do", async () => {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO provider_connections
         (id, provider, auth_type, name, email, is_active, created_at, updated_at)
       VALUES ('conn-1', 'codex', 'oauth', 'Codex Main', 'main@example.com', 1,
         '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z')`
    )
    .run();
  insertCallLog({ id: "a", provider: "codex", account: "raw-id", connection_id: "conn-1" });

  const options = await callLogs.getCallLogFilterOptions();
  assert.deepEqual(options.accounts, ["Codex Main"]);
});

test("mergeLogFilterOptions lists configured keys and values missing from the loaded page", () => {
  const merged = mergeLogFilterOptions(
    {
      providers: ["cursor"],
      models: ["claude-opus"],
      accounts: ["bob@example.com"],
      apiKeys: [{ id: "key-b", name: "Team B" }],
    },
    [{ id: "unused-key", name: "Never Used" }],
    [
      {
        provider: "codex",
        model: "gpt-5",
        requestedModel: null,
        account: "alice@example.com",
        apiKeyId: "key-a",
        apiKeyName: "Team A",
      },
      { provider: "-", model: null, account: "-", apiKeyId: null, apiKeyName: null },
    ]
  );

  assert.deepEqual(merged.providers, ["codex", "cursor"]);
  assert.deepEqual(merged.models, ["claude-opus", "gpt-5"]);
  assert.deepEqual(merged.accounts, ["alice@example.com", "bob@example.com"]);
  assert.deepEqual(
    merged.apiKeys.map((k) => k.value),
    ["unused-key", "key-a", "key-b"],
    "sorted by display name"
  );
  const unused = merged.apiKeys.find((k) => k.value === "unused-key");
  assert.equal(unused?.name, "Never Used");
});

test("mergeLogFilterOptions keeps a name-only key and does not duplicate a known id", () => {
  const merged = mergeLogFilterOptions(
    { providers: [], models: [], accounts: [], apiKeys: [{ id: null, name: "legacy" }] },
    [{ id: "key-a", name: "Team A (renamed)" }],
    [{ apiKeyId: "key-a", apiKeyName: "Team A" }]
  );

  assert.deepEqual(
    merged.apiKeys.map((k) => [k.value, k.name]),
    [
      ["legacy", "legacy"],
      ["key-a", "Team A (renamed)"],
    ]
  );
});

test("mergeLogFilterOptions falls back to the loaded rows when the options fetch failed", () => {
  const merged = mergeLogFilterOptions(null, null, [
    { provider: "codex", model: "gpt-5", account: "a@example.com", apiKeyId: "key-a" },
  ]);
  assert.deepEqual(merged.providers, ["codex"]);
  assert.deepEqual(merged.models, ["gpt-5"]);
  assert.deepEqual(merged.accounts, ["a@example.com"]);
  assert.deepEqual(
    merged.apiKeys.map((k) => k.value),
    ["key-a"]
  );
});
