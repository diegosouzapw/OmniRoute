/**
 * @file antigravity-project-persistence.test.ts
 * @description Regression tests for Antigravity projectId persistence and account selection.
 *
 * @changes
 * - [2026-07-24] [Composer] - Initial coverage for runtime projectId persistence helpers
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-project-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ag-project-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const {
  clearAntigravityProjectPersistenceInFlight,
  extractAntigravityProjectIdFromPayload,
  getStoredAntigravityProjectId,
  persistDiscoveredAntigravityProjectId,
  preferAntigravityConnectionsWithStoredProject,
} = await import("../../open-sse/services/antigravityProjectPersistence.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  clearAntigravityProjectPersistenceInFlight();
  await resetStorage();
});

test.after(async () => {
  clearAntigravityProjectPersistenceInFlight();
  await resetStorage();
});

test("extractAntigravityProjectIdFromPayload reads string and object project ids", () => {
  assert.equal(
    extractAntigravityProjectIdFromPayload({ cloudaicompanionProject: "stable-theater-6thmw" }),
    "stable-theater-6thmw"
  );
  assert.equal(
    extractAntigravityProjectIdFromPayload({
      cloudaicompanionProject: { id: "subtle-processor-mxhhm" },
    }),
    "subtle-processor-mxhhm"
  );
  assert.equal(extractAntigravityProjectIdFromPayload({ cloudaicompanionProject: null }), null);
});

test("getStoredAntigravityProjectId prefers connection column then providerSpecificData", () => {
  assert.equal(
    getStoredAntigravityProjectId({
      projectId: "column-project",
      providerSpecificData: { projectId: "psd-project" },
    }),
    "column-project"
  );
  assert.equal(
    getStoredAntigravityProjectId({
      providerSpecificData: { projectId: "psd-only" },
    }),
    "psd-only"
  );
  assert.equal(getStoredAntigravityProjectId({}), null);
});

test("preferAntigravityConnectionsWithStoredProject keeps no-project pool when all lack projectId", () => {
  const connections = [
    { id: "a", projectId: "" },
    { id: "b", providerSpecificData: {} },
  ];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(connections).map((c) => c.id),
    ["a", "b"]
  );
});

test("preferAntigravityConnectionsWithStoredProject prefers stored projectId accounts", () => {
  const connections = [
    { id: "broken", errorCode: "missing_project_id" },
    { id: "no-project", projectId: "" },
    { id: "healthy", projectId: "bright-ripsaw-xtq63" },
  ];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(connections).map((c) => c.id),
    ["healthy"]
  );
});

test("preferAntigravityConnectionsWithStoredProject skips confirmed-missing when alternatives exist", () => {
  const connections = [
    { id: "broken", errorCode: "missing_project_id", projectId: "" },
    { id: "fallback", projectId: "" },
    { id: "healthy", projectId: "instant-haiku-j0zxb" },
  ];
  assert.deepEqual(
    preferAntigravityConnectionsWithStoredProject(connections).map((c) => c.id),
    ["healthy"]
  );
});

test("persistDiscoveredAntigravityProjectId writes projectId to SQLite", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "persist-project",
    email: "persist-project@example.test",
    accessToken: "token",
    refreshToken: "refresh",
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
    providerSpecificData: { tier: "legacy-tier" },
    isActive: true,
    testStatus: "active",
    errorCode: "missing_project_id",
    lastError: "old error",
  });

  persistDiscoveredAntigravityProjectId(
    connection.id,
    "discovered-project-123",
    connection.providerSpecificData as Record<string, unknown>
  );

  await new Promise((resolve) => setTimeout(resolve, 50));

  const updated = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(updated?.projectId, "discovered-project-123");
  assert.equal(
    (updated?.providerSpecificData as Record<string, unknown>)?.projectId,
    "discovered-project-123"
  );
  assert.ok(!updated?.errorCode);
  assert.ok(!updated?.lastError);
});
