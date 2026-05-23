/**
 * Cloud-agent credentials CRUD + migration coverage.
 *
 * Release/v3.8.2 review finding: the `cloud_agent_credentials` table used to be
 * created inline via `ensureCredentialsTable()` on every call (violating the
 * versioned-migration policy). That inline DDL was removed in favor of
 * migration `061_cloud_agent_credentials.sql`. These tests prove the table is
 * provisioned by the normal DB-init migration run and that encrypt-at-rest
 * CRUD still works end to end — with NO lazy table creation.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cloud-agent-creds-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "cloud-agent-creds-test-secret";

const core = await import("../../src/lib/db/core.ts");
const creds = await import("../../src/lib/cloudAgent/credentials.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("migration 061 provisions cloud_agent_credentials (table exists after DB init)", () => {
  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get("cloud_agent_credentials") as { name?: string } | undefined;
  assert.equal(
    row?.name,
    "cloud_agent_credentials",
    "table must be created by migration, not inline"
  );
});

test("ensureCredentialsTable is no longer exported (inline DDL removed)", () => {
  assert.equal(
    (creds as Record<string, unknown>).ensureCredentialsTable,
    undefined,
    "lazy table creation must be gone — migration owns the schema"
  );
});

test("save → get round-trips and decrypts the API key", () => {
  creds.saveCloudAgentCredential("devin", "sk-secret-123", "https://api.devin.example");
  const got = creds.getCloudAgentCredentialFromDb("devin");
  assert.deepEqual(got, { apiKey: "sk-secret-123", baseUrl: "https://api.devin.example" });
});

test("get returns null for unknown provider", () => {
  assert.equal(creds.getCloudAgentCredentialFromDb("does-not-exist"), null);
});

test("save upserts (ON CONFLICT) rather than duplicating", () => {
  creds.saveCloudAgentCredential("jules", "sk-first");
  creds.saveCloudAgentCredential("jules", "sk-second", "https://jules.example");
  const got = creds.getCloudAgentCredentialFromDb("jules");
  assert.deepEqual(got, { apiKey: "sk-second", baseUrl: "https://jules.example" });
});

test("list returns masked keys, never the plaintext", () => {
  creds.saveCloudAgentCredential("codex-cloud", "sk-supersecretvalue");
  const list = creds.listCloudAgentCredentials();
  const entry = list.find((c) => c.providerId === "codex-cloud");
  assert.ok(entry, "saved provider must appear in the list");
  assert.equal(entry.apiKey, "****alue");
  assert.ok(!entry.apiKey.includes("supersecret"), "plaintext key must never be returned");
});

test("delete removes the credential", () => {
  creds.saveCloudAgentCredential("temp", "sk-temp");
  assert.ok(creds.getCloudAgentCredentialFromDb("temp"));
  creds.deleteCloudAgentCredential("temp");
  assert.equal(creds.getCloudAgentCredentialFromDb("temp"), null);
});
