import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-json-migration-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { runJsonMigration } = await import("../../src/lib/db/jsonMigration.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const exportRoute = await import("../../src/app/api/settings/export-json/route.ts");

test.beforeEach(() => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM usage_history").run();
  db.prepare("DELETE FROM provider_connections").run();
  db.prepare("DELETE FROM combos").run();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("runJsonMigration preserves exported snapshots and camelCase connection attribution", () => {
  const db = core.getDbInstance();

  runJsonMigration(db, {
    providerConnections: [
      {
        id: "codex-connection",
        provider: "codex",
        authType: "oauth",
        email: "current@example.com",
        providerSpecificData: { workspaceId: "team", chatgptUserId: "user-a" },
      },
    ],
    usageHistory: [
      {
        id: 1,
        provider: "codex",
        model: "gpt-5.5",
        connectionId: "codex-connection",
        accountKey: "stable-exported-account",
        accountLabel: "Historical label",
        accountLabelPriority: 4,
        tokens_input: 10,
        tokens_output: 5,
        timestamp: "2026-01-01T00:00:00.000Z",
      },
    ],
  });

  const row = db
    .prepare(
      `SELECT connection_id, account_key, account_label, account_label_priority,
              tokens_input + tokens_output total_tokens
       FROM usage_history WHERE id = 1`
    )
    .get();

  assert.deepEqual(row, {
    connection_id: "codex-connection",
    account_key: "stable-exported-account",
    account_label: "Historical label",
    account_label_priority: 4,
    total_tokens: 15,
  });
});

test("usage snapshots survive an export, connection deletion, and import round trip", async () => {
  const db = core.getDbInstance();
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "member@example.com",
    displayName: "Production Codex",
    providerSpecificData: { workspaceId: "team", chatgptUserId: "user-a" },
  });
  await usageHistory.saveRequestUsage({
    provider: "codex",
    model: "gpt-5.5",
    connectionId: connection.id as string,
    tokens: { input: 10, output: 5 },
    timestamp: "2026-02-01T00:00:00.000Z",
  });

  const response = await exportRoute.GET(
    new Request("http://localhost/api/settings/export-json?includeHistory=true")
  );
  assert.equal(response.status, 200);
  const exported = await response.json();

  await providersDb.deleteProviderConnection(connection.id as string);
  db.prepare("DELETE FROM usage_history").run();
  db.prepare("DELETE FROM provider_connections").run();
  runJsonMigration(db, exported);

  const restored = db
    .prepare(
      `SELECT COUNT(*) requests, SUM(tokens_input + tokens_output) tokens,
              MAX(account_label) label
       FROM usage_history WHERE connection_id = ?`
    )
    .get(connection.id);
  assert.deepEqual(restored, { requests: 1, tokens: 15, label: "Production Codex" });
});

test("runJsonMigration normalizes legacy combo strategy names at the import boundary", () => {
  const db = core.getDbInstance();

  runJsonMigration(db, {
    combos: [
      {
        id: "combo-usage",
        name: "combo-usage",
        strategy: "usage",
        models: ["openai/gpt-4o-mini"],
        config: { strategy: "context" },
      },
      {
        id: "combo-unknown",
        name: "combo-unknown",
        strategy: "not-a-real-strategy",
        models: ["openai/gpt-4o-mini"],
      },
    ],
  });

  const rows = db.prepare("SELECT id, data FROM combos ORDER BY id ASC").all() as Array<{
    id: string;
    data: string;
  }>;
  const byId = new Map(rows.map((row) => [row.id, JSON.parse(row.data)]));

  assert.equal(byId.get("combo-usage").strategy, "least-used");
  assert.equal(byId.get("combo-usage").config.strategy, "context-optimized");
  assert.equal(byId.get("combo-unknown").strategy, "priority");
});
