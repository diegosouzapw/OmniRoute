import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";

import {
  buildExclusiveDashboardSessions,
  mergeDashboardSessions,
} from "../../src/lib/sessionObservability.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-observability-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "ab".repeat(32);

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const leases = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const providers = await import("../../src/lib/db/providers.ts");
const sessionManager = await import("../../open-sse/services/sessionManager.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const sessionsRoute = await import("../../src/app/api/sessions/route.ts");

const OWNER_A = "vlo_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const OWNER_B = "vlo_BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
const BASE_TIME = Date.parse("2026-08-24T12:00:00.000Z");

function at(offsetMs: number): string {
  return new Date(BASE_TIME + offsetMs).toISOString();
}

function projectOfficialOccupancy(connectionIds: string[], now: string) {
  const occupancy = leases.getExclusiveLeaseOccupancy(connectionIds, now);
  return buildExclusiveDashboardSessions(new Set(occupancy.keys()), {}, []);
}

test.afterEach(() => {
  sessionManager.clearSessions();
  usageHistory.clearPendingRequests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("projects idle and active leases, distinct connections, legacy rows, and de-duplication", () => {
  const leaseRows = buildExclusiveDashboardSessions(
    new Set(["conn-idle", "conn-active"]),
    { "conn-active": { "gpt-5.6-sol (codex)": 2 }, "conn-idle": { ignored: 0 } },
    [
      {
        sessionId: "legacy-duplicate-a",
        ageMs: 10_000,
        requestCount: 2,
        connectionId: "conn-active",
      },
      {
        sessionId: "legacy-duplicate-b",
        ageMs: 5_000,
        requestCount: 3,
        connectionId: "conn-active",
      },
    ],
    new Map([
      ["conn-active", "Managed Active"],
      ["conn-idle", "Managed Idle"],
    ])
  );

  assert.equal(leaseRows.length, 2);
  assert.deepEqual(
    leaseRows.map((row) => [row.connectionId, row.active, row.requestCount]),
    [
      ["conn-active", true, 5],
      ["conn-idle", false, 0],
    ]
  );
  assert.equal(leaseRows[0].connectionName, "Managed Active");

  const displayed = mergeDashboardSessions(leaseRows, [
    {
      sessionId: "legacy-duplicate-a",
      ageMs: 10_000,
      requestCount: 2,
      connectionId: "conn-active",
    },
    {
      sessionId: "legacy-unmanaged",
      ageMs: 2_000,
      requestCount: 1,
      connectionId: "conn-unmanaged",
    },
    {
      sessionId: "legacy-unbound",
      ageMs: 1_000,
      requestCount: 1,
      connectionId: null,
    },
  ]);

  assert.deepEqual(
    displayed.map((row) => row.sessionId),
    ["lease:conn-active", "lease:conn-idle", "legacy-unmanaged", "legacy-unbound"]
  );
});

test("lease projection is a minimum privacy-safe observability payload", () => {
  const secretOwnerHash = "c".repeat(64);
  const rows = buildExclusiveDashboardSessions(
    new Set(["conn-private"]),
    {},
    [],
    new Map([["conn-private", "Private account"]])
  );
  const payload = JSON.stringify(rows);

  assert.deepEqual(Object.keys(rows[0]).sort(), [
    "active",
    "ageMs",
    "connectionId",
    "connectionName",
    "leaseBacked",
    "requestCount",
    "sessionId",
  ]);
  for (const forbidden of [
    secretOwnerHash,
    "leaseOwnerHash",
    "lease_owner_hash",
    "generation",
    "apiKeyId",
    "leaseOwnerId",
    "expiresAt",
    "IDLE",
  ]) {
    assert.equal(payload.includes(forbidden), false, `payload must not contain ${forbidden}`);
  }
});

test("official SQLite lease lifecycle remains visible through idle renew, release, and expiry", async () => {
  const connectionA = "11111111-1111-4111-8111-111111111111";
  const connectionB = "22222222-2222-4222-8222-222222222222";
  const managedKey = await apiKeys.createApiKey(
    "Lifecycle managed key",
    "0123456789abcdef",
    ["lease:exclusive"],
    { allowedConnections: [connectionA, connectionB] }
  );
  const managed = await apiKeys.getExclusiveLeaseConnectionIds();
  assert.equal(managed.has(connectionA), true);
  assert.equal(managed.has(connectionB), true);

  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_A,
    apiKeyId: managedKey.id,
    provider: "codex",
    connectionId: connectionA,
    now: at(0),
    ttlMs: 120_000,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;
  assert.equal(projectOfficialOccupancy([connectionA], at(30_000)).length, 1);
  assert.equal(projectOfficialOccupancy([connectionA], at(30_000))[0].active, false);

  const renewed = leases.renewExclusiveConnectionLease({
    leaseOwnerId: OWNER_A,
    generation: acquired.lease.generation,
    apiKeyId: managedKey.id,
    now: at(60_000),
    ttlMs: 120_000,
  });
  assert.equal(renewed.kind, "RENEWED");
  if (renewed.kind !== "RENEWED") return;
  assert.equal(renewed.lease.generation, acquired.lease.generation);
  assert.equal(projectOfficialOccupancy([connectionA], at(150_000)).length, 1);
  assert.equal(
    leases.assertExclusiveConnectionLeaseFence({
      leaseOwnerId: OWNER_A,
      generation: acquired.lease.generation,
      apiKeyId: managedKey.id,
      connectionId: connectionA,
      now: at(150_000),
    }).kind,
    "VALID"
  );
  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: OWNER_A,
      generation: acquired.lease.generation + 1,
      apiKeyId: managedKey.id,
      now: at(151_000),
    }).kind,
    "STALE"
  );
  assert.equal(projectOfficialOccupancy([connectionA], at(152_000)).length, 1);

  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: OWNER_A,
      generation: acquired.lease.generation,
      apiKeyId: managedKey.id,
      now: at(153_000),
    }).kind,
    "RELEASED"
  );
  assert.equal(projectOfficialOccupancy([connectionA], at(154_000)).length, 0);

  const expiring = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_B,
    apiKeyId: managedKey.id,
    provider: "codex",
    connectionId: connectionB,
    now: at(200_000),
    ttlMs: 1_000,
  });
  assert.equal(expiring.kind, "ACQUIRED");
  if (expiring.kind !== "ACQUIRED") return;
  assert.equal(projectOfficialOccupancy([connectionB], at(200_500)).length, 1);
  assert.equal(leases.reconcileExpiredExclusiveConnectionLeases(at(202_000)), 1);
  assert.equal(projectOfficialOccupancy([connectionB], at(202_000)).length, 0);

  const reacquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_B,
    apiKeyId: managedKey.id,
    provider: "codex",
    connectionId: connectionB,
    now: at(203_000),
  });
  assert.equal(reacquired.kind, "ACQUIRED");
  if (reacquired.kind !== "ACQUIRED") return;
  assert.equal(reacquired.lease.generation, expiring.lease.generation + 1);
  assert.equal(
    leases.assertExclusiveConnectionLeaseFence({
      leaseOwnerId: OWNER_B,
      generation: expiring.lease.generation,
      apiKeyId: managedKey.id,
      connectionId: connectionB,
      now: at(204_000),
    }).kind,
    "STALE"
  );
  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: OWNER_B,
      generation: reacquired.lease.generation,
      apiKeyId: managedKey.id,
      now: at(205_000),
    }).kind,
    "RELEASED"
  );
});

test("sessions API keeps legacy fields additive and decorates only in-flight leased work", async () => {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Friendly Lease Account",
    accessToken: "synthetic-local-token",
  });
  const managedKey = await apiKeys.createApiKey(
    "Route managed key",
    "fedcba9876543210",
    ["lease:exclusive"],
    { allowedConnections: [connection.id] }
  );
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: "vlo_CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
    apiKeyId: managedKey.id,
    provider: "codex",
    connectionId: connection.id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  sessionManager.touchSession("legacy-unmanaged", "legacy-connection");
  const idleResponse = await sessionsRoute.GET();
  const idleBody = (await idleResponse.json()) as Record<string, unknown>;
  assert.equal(idleResponse.status, 200);
  assert.equal(idleBody.count, 1);
  assert.equal(Array.isArray(idleBody.sessions), true);
  assert.equal(
    (idleBody.sessions as Array<{ sessionId: string }>)[0].sessionId,
    "legacy-unmanaged"
  );
  assert.deepEqual(idleBody.byApiKey, {});
  const idleLease = (idleBody.exclusiveSessions as Array<Record<string, unknown>>)[0];
  assert.equal(idleLease.connectionId, connection.id);
  assert.equal(idleLease.connectionName, "Friendly Lease Account");
  assert.equal(idleLease.active, false);
  for (const forbidden of ["leaseOwnerHash", "lease_owner_hash", "generation", "apiKeyId"]) {
    assert.equal(JSON.stringify(idleBody).includes(forbidden), false);
  }

  usageHistory.trackPendingRequest("gpt-5.6-sol", "codex", connection.id, true);
  const activeBody = (await (await sessionsRoute.GET()).json()) as {
    exclusiveSessions: Array<{ active: boolean }>;
  };
  assert.equal(activeBody.exclusiveSessions[0].active, true);
  usageHistory.trackPendingRequest("gpt-5.6-sol", "codex", connection.id, false);

  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: "vlo_CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      generation: acquired.lease.generation,
      apiKeyId: managedKey.id,
    }).kind,
    "RELEASED"
  );
  const releasedBody = (await (await sessionsRoute.GET()).json()) as {
    count: number;
    sessions: Array<{ sessionId: string }>;
    exclusiveSessions: unknown[];
  };
  assert.equal(releasedBody.count, 1);
  assert.equal(releasedBody.sessions[0].sessionId, "legacy-unmanaged");
  assert.deepEqual(releasedBody.exclusiveSessions, []);
});

test("sessions API deduplicates projection warnings per contiguous outage", async () => {
  const secretFailure = {
    ownerHash: "d".repeat(64),
    generation: 91,
    apiKeyId: "private-api-key-id",
    credential: "private-credential",
    token: "private-token",
    connectionIdentity: "private-connection-identity",
    leaseOwnership: "private-lease-ownership",
    fencingMaterial: "private-fencing-material",
  };
  const nowMock = mock.method(Date, "now", () => BASE_TIME);
  sessionManager.touchSession("legacy-fallback", "legacy-connection");
  sessionManager.registerKeySession("legacy-key", "legacy-fallback");

  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  let projectionFails = true;
  const prepareMock = mock.method(db, "prepare", (sql: string) => {
    if (projectionFails) throw new Error(JSON.stringify(secretFailure));
    return originalPrepare(sql);
  });
  const warnings: unknown[][] = [];
  const warnMock = mock.method(console, "warn", (...args: unknown[]) => {
    warnings.push(args);
  });

  try {
    const firstResponse = await sessionsRoute.GET();
    const firstBody = (await firstResponse.json()) as {
      count: number;
      sessions: Array<{ sessionId: string; connectionId: string | null }>;
      byApiKey: Record<string, number>;
      exclusiveSessions: unknown[];
    };
    const secondResponse = await sessionsRoute.GET();
    const secondBody = (await secondResponse.json()) as typeof firstBody;

    assert.equal(firstResponse.status, 200);
    assert.equal(secondResponse.status, 200);
    assert.deepEqual(secondBody, firstBody);
    assert.equal(firstBody.count, 1);
    assert.equal(firstBody.sessions[0].sessionId, "legacy-fallback");
    assert.equal(firstBody.sessions[0].connectionId, "legacy-connection");
    assert.deepEqual(firstBody.byApiKey, { "legacy-key": 1 });
    assert.deepEqual(firstBody.exclusiveSessions, []);
    assert.deepEqual(warnings, [["[SESSIONS] Exclusive session projection unavailable"]]);

    projectionFails = false;
    const recoveredResponse = await sessionsRoute.GET();
    assert.equal(recoveredResponse.status, 200);
    projectionFails = true;

    const laterOutageResponse = await sessionsRoute.GET();
    const laterOutageBody = (await laterOutageResponse.json()) as typeof firstBody;
    assert.equal(laterOutageResponse.status, 200);
    assert.deepEqual(laterOutageBody, firstBody);
    assert.deepEqual(warnings, [
      ["[SESSIONS] Exclusive session projection unavailable"],
      ["[SESSIONS] Exclusive session projection unavailable"],
    ]);

    const observableOutput = JSON.stringify({
      firstBody,
      secondBody,
      laterOutageBody,
      warnings,
    });
    for (const forbidden of Object.values(secretFailure)) {
      assert.equal(observableOutput.includes(String(forbidden)), false);
    }
  } finally {
    warnMock.mock.restore();
    prepareMock.mock.restore();
    nowMock.mock.restore();
  }
});

test("sessions route keeps raw lease SQL out of the API and sanitizes failures", () => {
  const route = fs.readFileSync(
    new URL("../../src/app/api/sessions/route.ts", import.meta.url),
    "utf8"
  );
  assert.match(route, /getExclusiveLeaseConnectionIds/);
  assert.match(route, /getExclusiveLeaseOccupancy/);
  assert.match(route, /getPendingRequests/);
  assert.match(route, /sanitizeErrorMessage\(error\)/);
  assert.doesNotMatch(route, /SELECT\s|exclusive_connection_leases/i);
});
