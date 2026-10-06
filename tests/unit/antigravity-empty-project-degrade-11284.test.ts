/**
 * #11284 follow-up: empty Cloud Code projectId must mark the connection
 * degraded even when projectDiscoveryOutcome is missing.
 *
 * Production evidence (X500, 2026-08-31): an agy OAuth connect for a working
 * Google One account persisted testStatus="active" with projectId="" and
 * tier="legacy-tier". Dashboard usage then showed "Antigravity access
 * forbidden. Check subscription." because fetchAvailableModels returned 403.
 * The official Windows `agy` CLI could still serve Gemini on the same
 * account -- Omni never stored the CLI's Cloud Code project.
 *
 * The original #11284 gate only fired when tokenData.projectDiscoveryOutcome
 * was set. Paste-credentials / persistOAuthConnection / agy CLI import all
 * persist empty projectId without that flag, so the dashboard showed Connected.
 *
 * Run: node --import tsx/esm --test tests/unit/antigravity-empty-project-degrade-11284.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  antigravityDegradedProjectState,
  antigravityPersistStatus,
} from "../../src/lib/oauth/antigravityProjectGate.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-11284-empty-project-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { persistOAuthConnection, buildOAuthConnectionCreatePayload } = await import(
  "../../src/lib/oauth/connectionPersistence.ts"
);
const { createConnectionFromAgyToken } = await import("../../src/lib/oauth/utils/agyAuthImport.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("gate degrades agy/antigravity when projectId is empty even without outcome flag", () => {
  for (const provider of ["agy", "antigravity"]) {
    const degraded = antigravityDegradedProjectState(provider, {
      projectId: "",
      providerSpecificData: { projectId: "", tier: "legacy-tier" },
    });
    assert.ok(degraded, `${provider}: empty projectId must degrade`);
    assert.equal(degraded.testStatus, "degraded");
    assert.equal(degraded.errorCode, "missing_project_id");
    assert.equal(degraded.lastErrorType, "oauth_missing_project_id");
  }
});

test("gate degrades when only providerSpecificData.projectId is empty", () => {
  const degraded = antigravityDegradedProjectState("agy", {
    providerSpecificData: { projectId: "   ", clientProfile: "cli" },
  });
  assert.ok(degraded, "whitespace projectId is empty");
  assert.equal(degraded.testStatus, "degraded");
});

test("gate stays null for a real Cloud Code projectId", () => {
  assert.equal(
    antigravityDegradedProjectState("agy", {
      projectId: "dotted-relic-q6pck",
      providerSpecificData: { projectId: "dotted-relic-q6pck", tier: "g1-pro-tier" },
    }),
    null
  );
});

test("gate stays healthy when projectId is present even if discovery_failed", () => {
  assert.equal(
    antigravityDegradedProjectState("agy", {
      projectId: "aicode-consumers-xyz",
      projectDiscoveryOutcome: "discovery_failed",
    }),
    null,
    "projectId is the source of truth; outcome only picks the empty-id warning"
  );
});

test("gate ignores non-antigravity providers even with empty projectId", () => {
  assert.equal(antigravityDegradedProjectState("codex", { projectId: "" }), null);
});

test("antigravityPersistStatus wins over stale error fields in a spread payload", () => {
  const stale = { errorCode: "missing_project_id", lastErrorType: "oauth_missing_project_id" };
  const merged = { ...stale, ...antigravityPersistStatus(null) };
  assert.equal(merged.testStatus, "active");
  assert.equal(merged.errorCode, null);
  assert.equal(merged.lastErrorType, null);
  assert.equal(merged.lastError, null);

  const degraded = antigravityDegradedProjectState("agy", { projectId: "" });
  assert.ok(degraded);
  const down = { testStatus: "active", ...antigravityPersistStatus(degraded) };
  assert.equal(down.testStatus, "degraded");
  assert.equal(down.errorCode, "missing_project_id");
});

test("persistOAuthConnection does not save agy with empty projectId as active", async () => {
  const connection = await persistOAuthConnection("agy", {
    email: "empty-project@example.test",
    accessToken: "agy-access-token-fixture",
    refreshToken: "agy-refresh-token-fixture",
    expiresIn: 3600,
    projectId: "",
    providerSpecificData: { clientProfile: "cli", projectId: "", tier: "legacy-tier" },
  });
  const stored = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(stored?.testStatus, "degraded");
  assert.equal(stored?.errorCode, "missing_project_id");
  assert.equal(stored?.lastErrorType, "oauth_missing_project_id");
  assert.equal(stored?.isActive, true, "refresh token stays stored; request-time bootstrap can heal");
});

test("persistOAuthConnection clears stale degrade fields once projectId appears", async () => {
  const first = await persistOAuthConnection("agy", {
    email: "heal-project@example.test",
    accessToken: "agy-access-token-fixture",
    refreshToken: "agy-refresh-token-fixture",
    expiresIn: 3600,
    projectId: "",
    providerSpecificData: { clientProfile: "cli", projectId: "", tier: "legacy-tier" },
  });
  assert.equal(first.testStatus, "degraded");
  assert.equal(first.errorCode, "missing_project_id");

  const healed = await persistOAuthConnection("agy", {
    email: "heal-project@example.test",
    accessToken: "agy-access-token-fixture-2",
    refreshToken: "agy-refresh-token-fixture",
    expiresIn: 3600,
    projectId: "healed-cloud-code-proj",
    providerSpecificData: {
      clientProfile: "cli",
      projectId: "healed-cloud-code-proj",
      tier: "g1-pro-tier",
    },
  });
  const stored = await providersDb.getProviderConnectionById(healed.id);
  assert.equal(stored?.id, first.id, "same connection is updated, not duplicated");
  assert.equal(stored?.testStatus, "active");
  assert.ok(!stored?.errorCode);
  assert.ok(!stored?.lastErrorType);
  assert.ok(!stored?.lastError);
});

test("persistOAuthConnection keeps a discovered projectId active", async () => {
  const connection = await persistOAuthConnection("agy", {
    email: "has-project@example.test",
    accessToken: "agy-access-token-fixture",
    refreshToken: "agy-refresh-token-fixture",
    expiresIn: 3600,
    projectId: "generated-strength-t6b5h",
    providerSpecificData: {
      clientProfile: "cli",
      projectId: "generated-strength-t6b5h",
      tier: "g1-pro-tier",
    },
  });
  const stored = await providersDb.getProviderConnectionById(connection.id);
  assert.equal(stored?.testStatus, "active");
  assert.ok(!stored?.errorCode);
});

test("agy CLI import with empty projectId is degraded, not Connected", async () => {
  const { connection, created } = await createConnectionFromAgyToken(
    {
      accessToken: "agy-access-token-fixture",
      refreshToken: "agy-refresh-token-fixture",
      expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      tokenType: "Bearer",
      authMethod: "oauth",
      email: "cli-empty@example.test",
      projectId: "",
      tier: "legacy-tier",
    },
    {}
  );
  assert.equal(created, true);
  const stored = await providersDb.getProviderConnectionById(connection.id as string);
  assert.equal(stored?.testStatus, "degraded");
  assert.equal(stored?.errorCode, "missing_project_id");
});

test("agy CLI import with a projectId stays active (#9204 reactivation still works)", async () => {
  const { connection } = await createConnectionFromAgyToken(
    {
      accessToken: "agy-access-token-fixture",
      refreshToken: "agy-refresh-token-fixture",
      expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      tokenType: "Bearer",
      authMethod: "oauth",
      email: "cli-ok@example.test",
      projectId: "project-9204",
      tier: "free-tier",
    },
    {}
  );
  const stored = await providersDb.getProviderConnectionById(connection.id as string);
  assert.equal(stored?.testStatus, "active");
  // getProviderConnectionById runs cleanNulls, so SQL NULL becomes undefined.
  assert.ok(!stored?.errorCode);
  assert.ok(!stored?.lastErrorType);
  assert.ok(!stored?.lastError);
});

test("healthy create payload sets error fields to null, not omitted", () => {
  const payload = buildOAuthConnectionCreatePayload(
    "agy",
    { email: "create-null@example.test", accessToken: "t", refreshToken: "r" },
    null,
    null
  );
  assert.equal(payload.testStatus, "active");
  assert.equal(payload.errorCode, null);
  assert.equal(payload.lastErrorType, null);
  assert.equal(payload.lastError, null);
  assert.ok("errorCode" in payload, "key must be present so SQLite writes NULL");
});

test("createProviderConnection upsert clears stale degrade fields from payload nulls", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "agy",
    authType: "oauth",
    email: "create-upsert@example.test",
    accessToken: "agy-access-token-fixture",
    refreshToken: "agy-refresh-token-fixture",
    isActive: true,
    testStatus: "degraded",
    errorCode: "missing_project_id",
    lastErrorType: "oauth_missing_project_id",
    lastError: "no Cloud Code projectId",
  });
  assert.equal(first?.errorCode, "missing_project_id");

  await providersDb.createProviderConnection({
    provider: "agy",
    authType: "oauth",
    email: "create-upsert@example.test",
    accessToken: "agy-access-token-fixture-2",
    refreshToken: "agy-refresh-token-fixture",
    isActive: true,
    testStatus: "active",
    errorCode: null,
    lastErrorType: null,
    lastError: null,
    projectId: "healed-cloud-code-proj",
  });

  const stored = await providersDb.getProviderConnectionById(first.id as string);
  assert.equal(stored?.id, first.id, "same connection is updated, not duplicated");
  assert.equal(stored?.testStatus, "active");
  assert.ok(!stored?.errorCode);
  assert.ok(!stored?.lastErrorType);
  assert.ok(!stored?.lastError);
});
