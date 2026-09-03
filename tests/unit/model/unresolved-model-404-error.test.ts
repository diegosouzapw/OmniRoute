import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-404-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "model-404-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const { getModelInfo } = await import("../../../src/sse/services/model.ts");

test("getModelInfo returns model_not_found when unprefixed claude- model provider is not active", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  // Seed an active connection for openai (so activeProviders has openai, but NOT anthropic)
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections
       (id, provider, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run("openai-test-conn", "openai", 1, now, now);

  const res = (await getModelInfo("claude-unrecognized-9-9")) as {
    provider: string | null;
    errorType?: string;
  };

  assert.equal(res.provider, null);
  assert.equal(res.errorType, "model_not_found");
});
