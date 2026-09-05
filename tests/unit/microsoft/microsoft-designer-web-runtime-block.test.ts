import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-designer-retired-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const leasesDb = await import("../../../src/lib/db/exclusiveConnectionLeases.ts");
const auth = await import("../../../src/sse/services/auth.ts");

const LEASE_OWNER_ID = `vlo_${"D".repeat(43)}`;
const API_KEY_ID = "designer-retirement-managed-key";

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("creating a retired Microsoft Designer connection reports its persisted tombstone", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "msdesigner",
    authType: "cookie",
    name: "retired-designer-create",
    isActive: true,
    providerSpecificData: { accessToken: "test-token" },
  })) as {
    id: string;
    isActive: boolean;
    testStatus: string | null;
    lastErrorType: string | null;
    lastErrorSource: string | null;
  };

  assert.equal(connection.isActive, false);
  assert.equal(connection.testStatus, "unavailable");
  assert.equal(connection.lastErrorType, "provider_retired");
  assert.equal(connection.lastErrorSource, "migration:retire-microsoft-designer-web");

  const persisted = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(persisted?.isActive, false);
  assert.equal(persisted?.providerSpecificData.accessToken, "test-token");

  const reactivated = await providersDb.updateProviderConnection(connection.id, {
    isActive: true,
    testStatus: "active",
    lastError: null,
    lastErrorType: null,
    lastErrorSource: null,
  });
  assert.equal(reactivated?.isActive, false);
  assert.equal(reactivated?.testStatus, "unavailable");
  assert.equal(reactivated?.lastErrorType, "provider_retired");

  const upserted = await providersDb.createProviderConnection({
    provider: "msdesigner",
    authType: "cookie",
    name: "retired-designer-create",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { accessToken: "replacement-token" },
  });
  assert.equal(upserted?.id, connection.id);
  assert.equal(upserted?.isActive, false);
  assert.equal(upserted?.testStatus, "unavailable");

  const control = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-control",
    apiKey: "sk-openai-control",
    isActive: true,
  });
  assert.equal(control?.isActive, true);
});

test("retired Microsoft Designer credentials are rejected and an active managed lease is invalidated", async () => {
  await core.ensureDbInitialized();
  const db = core.getDbInstance();
  for (const trigger of [
    "trg_retire_microsoft_designer_web_provider_insert",
    "trg_retire_microsoft_designer_web_provider_update",
    "trg_retire_microsoft_designer_web_lease_insert",
    "trg_retire_microsoft_designer_web_lease_update",
  ]) {
    db.exec(`DROP TRIGGER IF EXISTS ${trigger}`);
  }

  const connection = (await providersDb.createProviderConnection({
    provider: "microsoft-designer-web",
    authType: "cookie",
    name: "retired-designer",
    isActive: true,
    providerSpecificData: { accessToken: "test-token" },
  })) as { id: string };

  const acquired = leasesDb.acquireExclusiveConnectionLease({
    leaseOwnerId: LEASE_OWNER_ID,
    apiKeyId: API_KEY_ID,
    provider: "microsoft-designer-web",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  const selected = await auth.getProviderCredentials(
    "microsoft-designer-web",
    null,
    [connection.id],
    "dall-e-3",
    {
      lease: {
        apiKeyId: API_KEY_ID,
        context: {
          leaseOwnerId: LEASE_OWNER_ID,
          leaseOwnerHash: leasesDb.hashLeaseOwnerId(LEASE_OWNER_ID),
          ownerDiagnostic: "designer-retirement-test",
          generation: acquired.lease.generation,
        },
        mode: "request",
      },
    }
  );

  assert.equal(selected, null);
  assert.equal(leasesDb.getActiveExclusiveConnectionLease(LEASE_OWNER_ID), null);
});
