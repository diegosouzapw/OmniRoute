import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-key-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "exclusive-lease-key-policy-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const keysRoute = await import("../../src/app/api/keys/[id]/route.ts");
const CONNECTION = "00000000-0000-4000-8000-000000000001";

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("managed API key create requires and atomically stores an explicit allowlist", async () => {
  await assert.rejects(
    apiKeys.createApiKey("invalid managed", "test", ["lease:exclusive"]),
    /requires explicit allowedConnections/
  );
  const created = await apiKeys.createApiKey("valid managed", "test", ["lease:exclusive"], {
    allowedConnections: [CONNECTION],
  });
  const row = core
    .getDbInstance()
    .prepare("SELECT scopes, allowed_connections FROM api_keys WHERE id = ?")
    .get(created.id) as { scopes: string; allowed_connections: string };
  assert.deepEqual(JSON.parse(row.scopes), ["lease:exclusive"]);
  assert.deepEqual(JSON.parse(row.allowed_connections), [CONNECTION]);
});

test("partial domain mutations enforce the stored-row plus requested-policy invariant", async () => {
  const ordinary = await apiKeys.createApiKey("ordinary", "test");
  await assert.rejects(
    apiKeys.updateApiKeyPermissions(ordinary.id, { scopes: ["lease:exclusive"] }),
    /requires explicit allowedConnections/
  );

  const managed = await apiKeys.createApiKey("managed", "test", ["lease:exclusive"], {
    allowedConnections: [CONNECTION],
  });
  await assert.rejects(
    apiKeys.updateApiKeyPermissions(managed.id, { allowedConnections: [] }),
    /requires explicit allowedConnections/
  );
  assert.equal(
    await apiKeys.updateApiKeyPermissions(managed.id, {
      scopes: [],
      allowedConnections: [],
    }),
    true
  );
});

test("unrelated permission updates retain the ordinary non-transactional path", async () => {
  const ordinary = await apiKeys.createApiKey("ordinary update", "test");
  const db = core.getDbInstance();
  const originalExec = db.exec.bind(db);
  let beginImmediateCalls = 0;
  db.exec = ((sql: string) => {
    if (sql === "BEGIN IMMEDIATE") beginImmediateCalls += 1;
    return originalExec(sql);
  }) as typeof db.exec;
  try {
    assert.equal(await apiKeys.updateApiKeyPermissions(ordinary.id, { name: "renamed" }), true);
    assert.equal(beginImmediateCalls, 0);
  } finally {
    db.exec = originalExec;
  }
});

test("partial management PATCH maps the domain invariant to a sanitized 400", async () => {
  const ordinary = await apiKeys.createApiKey("ordinary route key", "test");
  const management = await apiKeys.createApiKey("management route key", "test", ["manage"]);
  const response = await keysRoute.PATCH(
    new Request(`http://omniroute.local/api/keys/${ordinary.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${management.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scopes: ["lease:exclusive"] }),
    }),
    { params: Promise.resolve({ id: ordinary.id }) }
  );
  assert.equal(response.status, 400);
  const body = (await response.json()) as { error: { code: string; message: string } };
  assert.equal(body.error.code, "LEASE_KEY_POLICY_INVALID");
  assert.equal(body.error.message, "lease:exclusive requires explicit allowedConnections");
});
