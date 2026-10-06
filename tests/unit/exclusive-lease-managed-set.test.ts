import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-managed-set-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");

await apiKeys.getApiKeys();

function insertKey(input: {
  id: string;
  allowedConnections: string[];
  scopes: string[];
  isActive?: boolean;
  revokedAt?: string | null;
  expiresAt?: string | null;
}): void {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO api_keys
       (id, name, key, machine_id, allowed_models, allowed_connections, scopes, no_log, is_active,
        revoked_at, expires_at, created_at)
       VALUES (?, ?, ?, 'test', '[]', ?, ?, 1, ?, ?, ?, ?)`
    )
    .run(
      input.id,
      input.id,
      `sk-${input.id}`,
      JSON.stringify(input.allowedConnections),
      JSON.stringify(input.scopes),
      input.isActive === false ? 0 : 1,
      input.revokedAt ?? null,
      input.expiresAt ?? null,
      new Date().toISOString()
    );
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("derives the overlapping managed set from active scoped key allowlists", async () => {
  insertKey({
    id: "managed-a",
    allowedConnections: ["conn-a", "conn-overlap"],
    scopes: ["lease:exclusive"],
  });
  insertKey({
    id: "managed-b",
    allowedConnections: ["conn-b", "conn-overlap"],
    scopes: ["lease:exclusive"],
  });
  insertKey({ id: "ordinary", allowedConnections: ["conn-unmanaged"], scopes: [] });
  insertKey({
    id: "inactive",
    allowedConnections: ["conn-inactive"],
    scopes: ["lease:exclusive"],
    isActive: false,
  });
  insertKey({
    id: "revoked",
    allowedConnections: ["conn-revoked"],
    scopes: ["lease:exclusive"],
    revokedAt: new Date().toISOString(),
  });
  insertKey({
    id: "expired",
    allowedConnections: ["conn-expired"],
    scopes: ["lease:exclusive"],
    expiresAt: "2020-01-01T00:00:00.000Z",
  });

  const managed = await apiKeys.getExclusiveLeaseConnectionIds();
  assert.deepEqual([...managed].sort(), ["conn-a", "conn-b", "conn-overlap"]);
});

test("re-derives managed membership after a key expires without cache clearing", async () => {
  insertKey({
    id: "managed-expiring",
    allowedConnections: ["conn-expiring"],
    scopes: ["lease:exclusive"],
  });
  assert.equal((await apiKeys.getExclusiveLeaseConnectionIds()).has("conn-expiring"), true);

  core
    .getDbInstance()
    .prepare("UPDATE api_keys SET expires_at = ? WHERE id = ?")
    .run("2020-01-01T00:00:00.000Z", "managed-expiring");

  assert.equal((await apiKeys.getExclusiveLeaseConnectionIds()).has("conn-expiring"), false);
});
