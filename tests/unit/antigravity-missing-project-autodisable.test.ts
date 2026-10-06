/**
 * #11284 — Auto-disable Antigravity connections whose Cloud Code project is
 * confirmed missing, so credential selection rotates to healthy siblings
 * instead of re-dispatching into a guaranteed 422 on every request.
 *
 * Production evidence (VPS docker `omniroute`, 2026-08-24): five rows carried
 * project_id="" with NO missing-project marker — nothing excluded them from
 * selection, so each dispatch paid the discovery round-trip and failed.
 *
 * Contract: `markAntigravityMissingCloudCodeProject()` must persist the
 * typed marker (errorCode/lastErrorType) AND `isActive: false` +
 * `testStatus: "unavailable"` (recoverable — NOT a terminal status), while
 * `persistDiscoveredAntigravityProjectId()` re-enables the row when a project
 * is later discovered at request time.
 *
 * Run: node --import tsx/esm --test tests/unit/antigravity-missing-project-autodisable.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-11284-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ag-11284-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { markAntigravityMissingCloudCodeProject, persistDiscoveredAntigravityProjectId } =
  await import("../../open-sse/services/antigravityProjectPersistence.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  await resetStorage();
});

async function createConnection() {
  return providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "autodisable-test",
    email: `autodisable-${Date.now()}@example.test`,
    accessToken: "token",
    refreshToken: "refresh",
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
    providerSpecificData: { tier: "g1-pro-tier" },
    isActive: true,
    testStatus: "active",
  }) as Promise<{ id: string; providerSpecificData: Record<string, unknown> }>;
}

test("confirmed-missing project disables the connection for selection", async () => {
  const connection = await createConnection();

  markAntigravityMissingCloudCodeProject(connection.id);
  await new Promise((resolve) => setTimeout(resolve, 50));

  const updated = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(updated?.isActive, false, "selection must skip disabled accounts");
  assert.equal(updated?.testStatus, "unavailable");
  assert.equal(updated?.errorCode, "missing_project_id");
  assert.equal(updated?.lastErrorType, "oauth_missing_project_id");
});

test("discovery of a projectId later re-enables the connection", async () => {
  const connection = await createConnection();

  markAntigravityMissingCloudCodeProject(connection.id);
  await new Promise((resolve) => setTimeout(resolve, 50));
  persistDiscoveredAntigravityProjectId(
    connection.id,
    "recovered-project-99",
    connection.providerSpecificData as Record<string, unknown>
  );
  await new Promise((resolve) => setTimeout(resolve, 50));

  const healed = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(healed?.projectId, "recovered-project-99");
  assert.equal(healed?.isActive, true, "healthy accounts return to rotation");
  assert.equal(healed?.testStatus, "active");
  assert.ok(!healed?.errorCode);
});
