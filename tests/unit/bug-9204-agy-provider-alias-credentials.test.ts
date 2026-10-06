import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9204-agy-alias-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createConnectionFromAgyToken } = await import("../../src/lib/oauth/utils/agyAuthImport.ts");
const { parseModel } = await import("../../open-sse/services/model.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#9204: an Antigravity CLI login is eligible for an agy model request", async () => {
  const { connection } = await createConnectionFromAgyToken(
    {
      accessToken: "fresh-access-token",
      refreshToken: "fresh-refresh-token",
      expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      tokenType: "Bearer",
      authMethod: "oauth",
      email: "reporter@example.test",
      projectId: "project-9204",
      tier: "free-tier",
    },
    { overwriteExisting: true }
  );

  assert.equal(connection.provider, "agy");
  assert.equal(connection.isActive, true);
  assert.equal(connection.testStatus, "active");

  const parsed = parseModel("agy/gemini-2.5-flash");
  assert.equal(parsed.provider, "antigravity");

  const credentials = await getProviderCredentials(parsed.provider!, null, null, parsed.model);
  assert.ok(credentials, "the active Antigravity CLI connection must remain selectable");
  assert.equal(credentials.connectionId, connection.id);
  assert.equal(credentials.accessToken, "fresh-access-token");
});
