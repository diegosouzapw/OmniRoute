import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-quota-pool-delete-combo-cleanup-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-pool-delete-combo-cleanup-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const groupsDb = await import("../../src/lib/db/quotaGroups.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const poolIdRoute = await import("../../src/app/api/quota/pools/[id]/route.ts");
const { removeQuotaCombosForPool, syncQuotaCombos } =
  await import("../../src/lib/quota/quotaCombos.ts");
const { parseQuotaModelName, quotaGroupSlug } =
  await import("../../src/lib/quota/quotaModelNaming.ts");

type Combo = Awaited<ReturnType<typeof combosDb.getCombos>>[number];

type Db = {
  prepare: (sql: string) => {
    all: (...params: unknown[]) => unknown[];
    get: (...params: unknown[]) => unknown;
  };
};

function resetDb() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function quotaNamesFor(combos: Combo[], groupName: string, provider: string): string[] {
  const groupSlug = quotaGroupSlug(groupName);
  return combos
    .map((combo) => (typeof combo.name === "string" ? combo.name : ""))
    .filter((name) => {
      const parsed = parseQuotaModelName(name);
      return parsed?.groupSlug === groupSlug && parsed.provider === provider;
    })
    .sort();
}

async function createConnection(provider: "openrouter" | "baidu", name: string) {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `test-only-${name}`,
  });
  const id = (connection as Record<string, unknown>).id;
  assert.equal(typeof id, "string", `${provider} connection should have an id`);
  return id as string;
}

async function deletePoolThroughRoute(poolId: string): Promise<Response> {
  const request = await makeManagementSessionRequest(`http://localhost/api/quota/pools/${poolId}`, {
    method: "DELETE",
  });
  return poolIdRoute.DELETE(request, { params: Promise.resolve({ id: poolId }) });
}

function getAllowedQuotas(apiKeyId: string): string[] {
  const db = core.getDbInstance() as unknown as Db;
  const row = db.prepare("SELECT allowed_quotas FROM api_keys WHERE id = ?").get(apiKeyId) as {
    allowed_quotas: string;
  };
  return JSON.parse(row.allowed_quotas) as string[];
}

function countRows(sql: string, id: string): number {
  const db = core.getDbInstance() as unknown as Db;
  const row = db.prepare(sql).get(id) as { count: number };
  return row.count;
}

function nextImmediate(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

test.beforeEach(() => {
  resetDb();
  compliance.initAuditLog();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("DELETE pool waits for scoped quota-combo cleanup before returning 204", async () => {
  const targetGroup = groupsDb.createGroup("Delete Target Group");
  const otherGroup = groupsDb.createGroup("Delete Other Group");
  const targetConnectionId = await createConnection("openrouter", "delete-target-openrouter");
  const sameGroupConnectionId = await createConnection("baidu", "delete-control-baidu");
  const otherGroupConnectionId = await createConnection("openrouter", "delete-control-openrouter");
  const apiKey = await apiKeysDb.createApiKey("Delete Pool Key", "delete-pool-machine");

  const targetPool = poolsDb.createPool({
    connectionId: targetConnectionId,
    name: "Delete Target Pool",
    groupId: targetGroup.id,
    allocations: [{ apiKeyId: apiKey.id, weight: 100, policy: "hard" }],
  });
  const sameGroupPool = poolsDb.createPool({
    connectionId: sameGroupConnectionId,
    name: "Same Group Different Provider",
    groupId: targetGroup.id,
  });
  const otherGroupPool = poolsDb.createPool({
    connectionId: otherGroupConnectionId,
    name: "Different Group Same Provider",
    groupId: otherGroup.id,
  });
  await apiKeysDb.updateApiKeyPermissions(apiKey.id, {
    allowedQuotas: [targetPool.id, otherGroupPool.id],
  });

  await syncQuotaCombos(targetPool.id);
  await syncQuotaCombos(sameGroupPool.id);
  await syncQuotaCombos(otherGroupPool.id);
  await nextImmediate();
  await nextImmediate();
  const ordinaryCombo = await combosDb.createCombo({
    name: "ordinary-delete-control",
    models: [{ kind: "model", model: "openrouter/control-model", weight: 100 }],
    strategy: "priority",
  });

  const before = await combosDb.getCombos();
  const targetNames = quotaNamesFor(before, targetGroup.name, "openrouter");
  const sameGroupControlNames = quotaNamesFor(before, targetGroup.name, "baidu");
  const otherGroupControlNames = quotaNamesFor(before, otherGroup.name, "openrouter");
  assert.ok(targetNames.length > 0, "target openrouter quota combos must exist before DELETE");
  assert.ok(sameGroupControlNames.length > 0, "same-group baidu control combos must exist");
  assert.ok(otherGroupControlNames.length > 0, "other-group openrouter control combos must exist");
  assert.ok(
    await combosDb.getComboByName(ordinaryCombo.name as string),
    "ordinary combo must exist"
  );
  assert.ok(poolsDb.getPool(targetPool.id), "target pool row must exist before DELETE");
  assert.equal(
    countRows(
      "SELECT count(*) AS count FROM quota_pool_connections WHERE pool_id = ?",
      targetPool.id
    ),
    1
  );
  assert.equal(
    countRows("SELECT count(*) AS count FROM quota_allocations WHERE pool_id = ?", targetPool.id),
    1
  );
  assert.deepEqual(getAllowedQuotas(apiKey.id), [targetPool.id, otherGroupPool.id]);

  const response = await deletePoolThroughRoute(targetPool.id);

  assert.equal(response.status, 204);
  const after = await combosDb.getCombos();
  assert.deepEqual(
    quotaNamesFor(after, targetGroup.name, "openrouter"),
    [],
    "DELETE must not return while target group+provider quota combos remain"
  );
  assert.deepEqual(
    quotaNamesFor(after, targetGroup.name, "baidu"),
    sameGroupControlNames,
    "same-group combos for another provider must remain byte/name-identical"
  );
  assert.deepEqual(
    quotaNamesFor(after, otherGroup.name, "openrouter"),
    otherGroupControlNames,
    "same-provider combos for another group must remain byte/name-identical"
  );
  assert.deepEqual(
    await combosDb.getComboByName(ordinaryCombo.name as string),
    ordinaryCombo,
    "ordinary user combo must remain unchanged"
  );
  assert.equal(poolsDb.getPool(targetPool.id), null);
  assert.equal(
    countRows(
      "SELECT count(*) AS count FROM quota_pool_connections WHERE pool_id = ?",
      targetPool.id
    ),
    0
  );
  assert.equal(
    countRows("SELECT count(*) AS count FROM quota_allocations WHERE pool_id = ?", targetPool.id),
    0
  );
  assert.deepEqual(getAllowedQuotas(apiKey.id), [otherGroupPool.id]);
  const auditEvents = compliance.getAuditLog({ action: "quota.pool.deleted", limit: 10 });
  assert.ok(
    auditEvents.some(
      (event) =>
        typeof event === "object" &&
        event !== null &&
        (event as Record<string, unknown>).target === targetPool.id
    ),
    "successful DELETE must record quota.pool.deleted audit event"
  );
});

test("DELETE prevents an in-flight create sync from recreating quota combos", async () => {
  const group = groupsDb.createGroup("Immediate Create Delete Group");
  const connectionId = await createConnection("openrouter", "immediate-create-delete");
  const pool = poolsDb.createPool({
    connectionId,
    name: "Immediate Create Delete Pool",
    groupId: group.id,
  });

  const deleted = await poolsDb.deletePool(pool.id);
  await nextImmediate();
  await nextImmediate();

  assert.equal(deleted, true);
  assert.equal(poolsDb.getPool(pool.id), null);
  assert.deepEqual(
    quotaNamesFor(await combosDb.getCombos(), group.name, "openrouter"),
    [],
    "a create sync already in flight must not mint quota combos after pool deletion"
  );
});

test("DELETE prevents an in-flight update sync from recreating quota combos", async () => {
  const group = groupsDb.createGroup("Immediate Update Delete Group");
  const connectionId = await createConnection("openrouter", "immediate-update-delete");
  const pool = poolsDb.createPool({
    connectionId,
    name: "Immediate Update Delete Pool",
    groupId: group.id,
  });
  await syncQuotaCombos(pool.id);
  await nextImmediate();
  await nextImmediate();
  await removeQuotaCombosForPool(pool.id);
  assert.deepEqual(quotaNamesFor(await combosDb.getCombos(), group.name, "openrouter"), []);

  assert.ok(poolsDb.updatePool(pool.id, { name: "Updated Then Deleted Pool" }));
  const deleted = await poolsDb.deletePool(pool.id);
  await nextImmediate();
  await nextImmediate();

  assert.equal(deleted, true);
  assert.equal(poolsDb.getPool(pool.id), null);
  assert.deepEqual(
    quotaNamesFor(await combosDb.getCombos(), group.name, "openrouter"),
    [],
    "an update sync already in flight must not recreate quota combos after pool deletion"
  );
});

test("DELETE rejects a synchronous pool update once deletion has started", async () => {
  const oldGroup = groupsDb.createGroup("Deleting Pool Old Group");
  const newGroup = groupsDb.createGroup("Deleting Pool New Group");
  const connectionId = await createConnection("openrouter", "delete-update-race");
  const pool = poolsDb.createPool({
    connectionId,
    name: "Delete Update Race Pool",
    groupId: oldGroup.id,
  });
  await syncQuotaCombos(pool.id);
  await nextImmediate();
  await nextImmediate();
  assert.ok(quotaNamesFor(await combosDb.getCombos(), oldGroup.name, "openrouter").length > 0);

  const deleting = poolsDb.deletePool(pool.id);
  const updated = poolsDb.updatePool(pool.id, { groupId: newGroup.id });
  const deleted = await deleting;
  await nextImmediate();
  await nextImmediate();

  assert.equal(updated, null, "a pool must become immutable as soon as deletion starts");
  assert.equal(deleted, true);
  assert.equal(poolsDb.getPool(pool.id), null);
  assert.deepEqual(quotaNamesFor(await combosDb.getCombos(), oldGroup.name, "openrouter"), []);
  assert.deepEqual(quotaNamesFor(await combosDb.getCombos(), newGroup.name, "openrouter"), []);
});

test("DELETE makes a synchronous allocation upsert a no-op once deletion has started", async () => {
  const group = groupsDb.createGroup("Deleting Pool Allocation Group");
  const targetConnectionId = await createConnection("openrouter", "delete-allocation-target");
  const siblingConnectionId = await createConnection("baidu", "delete-allocation-sibling");
  const targetPool = poolsDb.createPool({
    connectionId: targetConnectionId,
    name: "Delete Allocation Target",
    groupId: group.id,
  });
  const siblingPool = poolsDb.createPool({
    connectionId: siblingConnectionId,
    name: "Delete Allocation Sibling",
    groupId: group.id,
  });
  const apiKey = await apiKeysDb.createApiKey("Delete Allocation Key", "delete-allocation-key");
  await nextImmediate();
  await nextImmediate();

  const deleting = poolsDb.deletePool(targetPool.id);
  poolsDb.upsertAllocations(targetPool.id, [{ apiKeyId: apiKey.id, weight: 100, policy: "hard" }]);
  const deleted = await deleting;

  assert.equal(deleted, true);
  assert.equal(poolsDb.getPool(targetPool.id), null);
  assert.deepEqual(
    poolsDb.getPool(siblingPool.id)?.allocations,
    [],
    "an allocation upsert on a deleting pool must not mutate sibling pools"
  );
});

test("concurrent DELETE calls report one deletion and one missing pool", async () => {
  const group = groupsDb.createGroup("Concurrent Delete Group");
  const connectionId = await createConnection("openrouter", "concurrent-delete");
  const pool = poolsDb.createPool({
    connectionId,
    name: "Concurrent Delete Pool",
    groupId: group.id,
  });

  const results = await Promise.all([poolsDb.deletePool(pool.id), poolsDb.deletePool(pool.id)]);

  assert.deepEqual(results, [true, false]);
  assert.equal(poolsDb.getPool(pool.id), null);
  assert.deepEqual(quotaNamesFor(await combosDb.getCombos(), group.name, "openrouter"), []);
});

test("DELETE nonexistent pool returns sanitized 404 without changing combos", async () => {
  const missingPoolId = "pool-that-never-existed";
  const group = groupsDb.createGroup("Missing Pool Control Group");
  const connectionId = await createConnection("baidu", "missing-pool-control-baidu");
  const pool = poolsDb.createPool({
    connectionId,
    name: "Missing Pool Control",
    groupId: group.id,
  });
  const apiKey = await apiKeysDb.createApiKey("Missing Pool Key", "missing-pool-key");
  await apiKeysDb.updateApiKeyPermissions(apiKey.id, {
    allowedQuotas: [missingPoolId, pool.id],
  });
  await syncQuotaCombos(pool.id);
  await nextImmediate();
  await nextImmediate();
  await combosDb.createCombo({
    name: "ordinary-missing-delete-control",
    models: [{ kind: "model", model: "baidu/control-model", weight: 100 }],
    strategy: "priority",
  });
  const before = await combosDb.getCombos();
  assert.ok(quotaNamesFor(before, group.name, "baidu").length > 0);

  const response = await deletePoolThroughRoute(missingPoolId);
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.equal(body.error?.message, "Pool not found");
  assert.doesNotMatch(JSON.stringify(body), /\s+at\s+\//, "404 must not expose a stack trace");
  assert.deepEqual(await combosDb.getCombos(), before);
  assert.deepEqual(
    getAllowedQuotas(apiKey.id),
    [missingPoolId, pool.id],
    "a missing-pool DELETE must not mutate API key permissions"
  );
  assert.ok(poolsDb.getPool(pool.id), "unrelated pool must remain");
});

test("DELETE keeps relational cleanup non-fatal when quota-combo listing fails", async () => {
  const group = groupsDb.createGroup("Cleanup Failure Group");
  const connectionId = await createConnection("openrouter", "cleanup-failure-openrouter");
  const apiKey = await apiKeysDb.createApiKey("Cleanup Failure Key", "cleanup-failure-machine");
  const pool = poolsDb.createPool({
    connectionId,
    name: "Cleanup Failure Pool",
    groupId: group.id,
    allocations: [{ apiKeyId: apiKey.id, weight: 100, policy: "hard" }],
  });
  await apiKeysDb.updateApiKeyPermissions(apiKey.id, { allowedQuotas: [pool.id] });
  await syncQuotaCombos(pool.id);
  await nextImmediate();
  await nextImmediate();
  assert.ok(quotaNamesFor(await combosDb.getCombos(), group.name, "openrouter").length > 0);

  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => unhandled.push(reason);
  process.on("unhandledRejection", onUnhandled);
  db.prepare = ((sql: string) => {
    if (sql.startsWith("SELECT data, sort_order, context_cache_protection FROM combos ORDER BY")) {
      throw new Error("forced quota combo listing failure");
    }
    return originalPrepare(sql);
  }) as typeof db.prepare;

  let response: Response;
  try {
    response = await deletePoolThroughRoute(pool.id);
    await nextImmediate();
    await nextImmediate();
  } finally {
    db.prepare = originalPrepare as typeof db.prepare;
    process.off("unhandledRejection", onUnhandled);
  }

  assert.equal(response!.status, 204);
  assert.deepEqual(unhandled, [], "guarded combo failure must not produce unhandledRejection");
  assert.equal(poolsDb.getPool(pool.id), null);
  assert.equal(
    countRows("SELECT count(*) AS count FROM quota_pool_connections WHERE pool_id = ?", pool.id),
    0
  );
  assert.equal(
    countRows("SELECT count(*) AS count FROM quota_allocations WHERE pool_id = ?", pool.id),
    0
  );
  assert.deepEqual(getAllowedQuotas(apiKey.id), []);
});
