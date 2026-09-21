import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-explicit-inactive-w2-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "explicit-inactive-w2-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { maybeReactivateAfterExplicitProbe, resetExplicitProbeMapForTests } = await import(
  "../../src/sse/services/explicitInactiveProbe.ts"
);

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedInactiveSiliconflow(testStatus: "active" | "credits_exhausted") {
  const row = await providersDb.createProviderConnection({
    provider: "siliconflow",
    authType: "apikey",
    name: "sf-inactive",
    apiKey: "sf-inactive-test-key",
    isActive: false,
    testStatus,
  });
  assert.ok(typeof row?.id === "string" && row.id.length > 0);
  return { id: row.id };
}

function asPinnedCreds(creds: unknown) {
  assert.ok(creds);
  return creds as { connectionId?: string; reactivatedFromInactive?: boolean };
}

test.beforeEach(async () => {
  resetExplicitProbeMapForTests();
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("W-2 pin + inactive returns credentials after wiring (was null)", async () => {
  const row = await seedInactiveSiliconflow("active");
  const creds = asPinnedCreds(
    await auth.getProviderCredentials("siliconflow", null, null, "siliconflow/m", {
      forcedConnectionId: row.id,
    })
  );
  assert.equal(creds.connectionId, row.id);
  assert.equal(creds.reactivatedFromInactive, true);
});

test("W-2 pin + credits_exhausted returns credentials after wiring", async () => {
  const row = await seedInactiveSiliconflow("credits_exhausted");
  const creds = asPinnedCreds(
    await auth.getProviderCredentials("siliconflow", null, null, "siliconflow/m", {
      forcedConnectionId: row.id,
    })
  );
  assert.equal(creds.connectionId, row.id);
  assert.equal(creds.reactivatedFromInactive, true);
});

test("W-1 successful probe re-enables inactive pin in SQLite", async () => {
  const row = await seedInactiveSiliconflow("active");
  const before = await providersDb.getProviderConnectionById(row.id);
  assert.equal(before?.isActive, false);
  await maybeReactivateAfterExplicitProbe({
    reactivatedFromInactive: true,
    connectionId: row.id,
  });
  const after = await providersDb.getProviderConnectionById(row.id);
  assert.equal(after?.isActive, true);
});
