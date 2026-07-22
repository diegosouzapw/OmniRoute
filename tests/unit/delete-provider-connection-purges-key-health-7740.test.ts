import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-probe-7740-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const catalog = await import("../../src/lib/providers/catalog.ts");
const apiKeyRotator = await import("../../open-sse/services/apiKeyRotator.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string } | undefined)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else throw error;
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});
test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#7740: orphaned provider connection (id removed from catalog) keeps surfacing apiKeyHealth and 404s on click, but deleting purges in-memory key-health", async () => {
  assert.equal(
    catalog.resolveStaticProviderCatalogEntry("phind"),
    null,
    "sanity: phind must already be absent from the live catalog"
  );

  const created = await providersDb.createProviderConnection({
    provider: "phind",
    authType: "apikey",
    name: "Legacy Phind key",
    apiKey: "sk-legacy-orphan",
    providerSpecificData: {
      apiKeyHealth: {
        primary: {
          status: "invalid",
          failures: 3,
          lastFailure: new Date().toISOString(),
          lastSuccess: null,
          totalRequests: 5,
          totalFailures: 3,
        },
      },
    },
  });
  assert.ok(created?.id, "connection must be created");

  const all = await providersDb.getProviderConnections({});
  const orphan = all.find((c: { id: string }) => c.id === created.id) as
    | {
        id: string;
        provider: string;
        providerSpecificData?: {
          apiKeyHealth?: { primary?: { status?: string } };
        };
      }
    | undefined;
  assert.ok(orphan, "orphaned connection must still be returned by getProviderConnections()");
  assert.equal(orphan.provider, "phind");
  assert.equal(
    orphan.providerSpecificData?.apiKeyHealth?.primary?.status,
    "invalid",
    "the stale invalid-key health survives untouched — this is what triggers the homepage popup"
  );

  const providerInfo = catalog.resolveStaticProviderCatalogEntry(orphan.provider);
  assert.equal(
    providerInfo,
    null,
    "clicking the popup navigates to a provider id that resolves to nothing — reproduces the reported 404"
  );

  apiKeyRotator.recordKeyFailure(created.id, "primary");
  apiKeyRotator.recordKeyFailure(created.id, "primary");
  const beforeDelete = apiKeyRotator.getAllKeyHealth();
  assert.ok(
    Object.prototype.hasOwnProperty.call(beforeDelete, `${created.id}:primary`),
    "sanity: in-memory health entry exists before delete"
  );

  const deleted = await providersDb.deleteProviderConnection(created.id);
  assert.equal(deleted, true, "connection row must actually be deleted");

  const afterDelete = apiKeyRotator.getAllKeyHealth();
  assert.equal(
    Object.prototype.hasOwnProperty.call(afterDelete, `${created.id}:primary`),
    false,
    "EXPECTED: deleting a connection should purge its in-memory key-health entry " +
      "(deleteProviderConnection() should call removeConnectionHealth()/removeConnectionIndex()) " +
      "— issue #7740 expects 'Deleted keys shouldn't be checked anymore'"
  );
});
