/**
 * Issue #14553 — deleting a combo must purge its combo-scoped proxy_assignments
 * rows (and the rotation cursor) instead of leaving them orphaned.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14553-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR))
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createCombo(name: string): Promise<string> {
  const combo = (await combosDb.createCombo({
    name,
    strategy: "round-robin",
    models: ["openai/gpt-4"],
  })) as Record<string, unknown>;
  assert.ok(typeof combo?.id === "string", "combo fixture must return an id");
  return combo.id as string;
}

async function comboAssignments(comboId: string) {
  const all = await proxiesDb.getProxyAssignments({ scope: "combo" });
  return all.filter((a) => a.scopeId === comboId);
}

async function createProxy(name: string) {
  const proxy = await proxiesDb.createProxy({
    name,
    type: "http",
    host: "proxy.local",
    port: 8080,
  });
  assert.ok(proxy?.id, "proxy must be created");
  return proxy!;
}

test("#14553: deleteCombo purges combo-scoped proxy_assignments", async () => {
  const doomedId = await createCombo("doomed-combo");
  const proxy = await createProxy("combo-proxy");

  const assignment = await proxiesDb.assignProxyToScope("combo", doomedId, proxy.id);
  assert.ok(assignment, "assignment must be created");
  assert.equal((await comboAssignments(doomedId)).length, 1, "sanity: assignment exists");

  const deleted = await combosDb.deleteCombo(doomedId);
  assert.equal(deleted, true, "combo row must be deleted");

  assert.equal(
    (await comboAssignments(doomedId)).length,
    0,
    "EXPECTED: proxy_assignments rows purged with the combo"
  );
});

test("#14553: a surviving combo keeps its own assignment and the proxy row survives", async () => {
  const doomedId = await createCombo("doomed-combo");
  const survivorId = await createCombo("survivor-combo");
  const proxy = await createProxy("shared-proxy");

  await proxiesDb.assignProxyToScope("combo", doomedId, proxy.id);
  await proxiesDb.assignProxyToScope("combo", survivorId, proxy.id);

  assert.equal(await combosDb.deleteCombo(doomedId), true);

  assert.equal((await comboAssignments(doomedId)).length, 0, "doomed assignments purged");
  assert.equal((await comboAssignments(survivorId)).length, 1, "survivor assignment untouched");

  const registry = await proxiesDb.listProxies();
  const entries =
    (registry as unknown as { items?: { id?: string }[] }).items ??
    (registry as unknown as { id?: string }[]);
  assert.ok(
    Array.isArray(entries) && entries.some((entry) => entry.id === proxy.id),
    "the proxy itself must stay registered while other scopes still use it"
  );
});

test("#14553: the combo pool rotation cursor is dropped with the assignments", async () => {
  const doomedId = await createCombo("pooled-combo");
  const survivorId = await createCombo("survivor-combo");
  const proxyA = await createProxy("pool-proxy-a");
  const proxyB = await createProxy("pool-proxy-b");

  await proxiesDb.assignProxyToScope("combo", doomedId, proxyA.id);
  await proxiesDb.addProxyToScopePool("combo", doomedId, proxyB.id);
  await proxiesDb.setScopeRotationStrategy("combo", doomedId, "round-robin");
  await proxiesDb.assignProxyToScope("combo", survivorId, proxyA.id);
  await proxiesDb.setScopeRotationStrategy("combo", survivorId, "round-robin");

  // Touch the doomed combo's cursor so a stale row would be observable.
  const db = core.getDbInstance();
  db.prepare(
    "UPDATE proxy_scope_rotation SET cursor = 1 WHERE scope = 'combo' AND scope_id = ?"
  ).run(doomedId);

  assert.equal(await combosDb.deleteCombo(doomedId), true);

  const rotationRows = db
    .prepare("SELECT scope_id FROM proxy_scope_rotation WHERE scope = 'combo'")
    .all() as { scope_id: string }[];
  assert.equal(
    rotationRows.filter((row) => row.scope_id === doomedId).length,
    0,
    "EXPECTED: the doomed combo's rotation cursor is purged"
  );
  assert.equal(
    rotationRows.filter((row) => row.scope_id === survivorId).length,
    1,
    "the surviving combo keeps its rotation state"
  );
});

test("#14553: proxy registry generation bumps so cached resolutions are discarded", async () => {
  const { getProxyRegistryGeneration } = proxiesDb as unknown as {
    getProxyRegistryGeneration: () => number;
  };
  const comboId = await createCombo("gen-combo");
  const proxy = await createProxy("gen-proxy");
  await proxiesDb.assignProxyToScope("combo", comboId, proxy.id);

  const before = getProxyRegistryGeneration();
  assert.equal(await combosDb.deleteCombo(comboId), true);
  assert.ok(
    getProxyRegistryGeneration() > before,
    "deleting a combo with proxy assignments must bump the registry generation"
  );
});
