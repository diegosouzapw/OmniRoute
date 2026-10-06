import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-status-projection-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const leases = await import("../../src/lib/db/exclusiveConnectionLeases.ts");

const OWNER = "vlo_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const EMAIL = "lease-connection-owner@example.com";
const DISPLAY_NAME = "Lease Connection Owner";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("status lease object never carries the joined connection identity columns", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "glm",
    authType: "access_token",
    accessToken: "lease-status-projection-token",
    name: "Team GLM",
    email: EMAIL,
    displayName: DISPLAY_NAME,
    isActive: true,
    testStatus: "active",
  })) as { id: string };

  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "key-status-projection",
    provider: "glm",
    connectionId: connection.id,
    now: "2026-08-30T12:00:00.000Z",
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  const status = leases.getExclusiveConnectionLeaseStatus({
    leaseOwnerId: OWNER,
    generation: acquired.lease.generation,
    apiKeyId: "key-status-projection",
    now: "2026-08-30T12:00:01.000Z",
  });
  assert.notEqual(status, null);
  if (!status) return;

  // Status-level fenced fields stay exactly as before: the configured (safe)
  // name plus the joined connection's provider.
  assert.equal(status.provider, "glm");
  assert.equal(status.connectionName, "Team GLM");

  // The lease object must be a projection of lease columns only — the joined
  // connection_* identity values (owner email / display name) must never ride
  // along on the runtime object, even though the current route consumer
  // whitelists what it serializes.
  for (const forbidden of [
    "connectionEmail",
    "connectionDisplayName",
    "connectionName",
    "connectionAuthType",
    "connectionProvider",
  ]) {
    assert.equal(forbidden in status.lease, false, `lease must not carry ${forbidden}`);
  }
  const serialized = JSON.stringify(status.lease);
  assert.equal(serialized.includes(EMAIL), false);
  assert.equal(serialized.includes(DISPLAY_NAME), false);

  // Legitimate lease lifecycle fields are intact.
  assert.equal(status.lease.state, "ACTIVE");
  assert.equal(status.lease.generation, acquired.lease.generation);
  assert.equal(status.lease.connectionId, connection.id);
  assert.equal(status.lease.apiKeyId, "key-status-projection");
  assert.equal(status.lease.provider, "glm");
  assert.equal(status.lease.acquiredAt, "2026-08-30T12:00:00.000Z");
  assert.equal(status.lease.renewedAt, "2026-08-30T12:00:00.000Z");
  assert.equal(status.lease.expiresAt, "2026-08-30T12:02:00.000Z");
  assert.equal(status.lease.leaseOwnerHash, leases.hashLeaseOwnerId(OWNER));
  assert.equal(status.lease.endedAt, null);
  assert.equal(status.lease.endReason, null);
  assert.deepEqual(Object.keys(status.lease).sort(), [
    "acquiredAt",
    "apiKeyId",
    "connectionId",
    "endReason",
    "endedAt",
    "expiresAt",
    "generation",
    "id",
    "leaseOwnerHash",
    "provider",
    "renewedAt",
    "state",
  ]);
});
