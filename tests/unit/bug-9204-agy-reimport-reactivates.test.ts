import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9204-agy-reimport-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { createConnectionFromAgyToken } = await import(
  "../../src/lib/oauth/utils/agyAuthImport.ts"
);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#9204: reimporting an inactive Antigravity CLI account reactivates it", async () => {
  const existing = await providersDb.createProviderConnection({
    provider: "agy",
    authType: "oauth",
    email: "reporter@example.test",
    accessToken: "stale-access-token",
    refreshToken: "stale-refresh-token",
    expiresAt: new Date(Date.now() - 60_000).toISOString(),
    isActive: false,
    testStatus: "expired",
  });

  await createConnectionFromAgyToken(
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

  const stored = await providersDb.getProviderConnectionById(existing.id);
  assert.equal(stored?.testStatus, "active");
  assert.equal(stored?.isActive, true, "a successful reimport must reactivate the account");

  const active = await providersDb.getProviderConnections({ provider: "agy", isActive: true });
  assert.deepEqual(active.map((connection) => connection.id), [existing.id]);
});