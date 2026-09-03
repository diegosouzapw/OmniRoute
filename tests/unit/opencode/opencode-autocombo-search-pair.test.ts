import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-pair-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "opencode-pair-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const { getProviderCredentials } = await import("../../../src/sse/services/auth.ts");

test("getProviderCredentials('opencode-zen') finds active connection stored under 'opencode'", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  // Seed an active connection under provider='opencode'
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections
       (id, provider, is_active, api_key, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("opencode-conn-1", "opencode", 1, "test-opencode-key", now, now);

  const creds = (await getProviderCredentials("opencode-zen")) as { apiKey?: string } | null;

  assert.ok(creds, "Credentials should be returned for opencode-zen lookup");
  assert.equal(creds!.apiKey, "test-opencode-key");
});
