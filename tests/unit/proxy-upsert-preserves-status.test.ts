import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// upsertProxy is the single writer shared by bulk import and subscription sync. A write
// that carries no valid status must leave the stored one alone, and the sync must be
// able to refuse writing a row it does not own.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-upsert-status-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const tuple = { type: "http", host: "10.2.0.1", port: 8080, username: "u" };

async function seed(status?: string) {
  const created = await proxiesDb.upsertProxy({ name: "seed", ...tuple, password: "old" });
  assert.equal(created.action, "created");
  const id = created.proxy!.id;
  if (status) await proxiesDb.updateProxy(id, { status });
  return id;
}

test("a new row without a status is created active", async () => {
  const id = await seed();
  assert.equal((await proxiesDb.getProxyById(id))?.status, "active");
});

test("re-importing a disabled proxy without a status keeps it disabled", async () => {
  const id = await seed("inactive");
  const again = await proxiesDb.upsertProxy({ name: "seed", ...tuple, password: "new" });
  assert.equal(again.action, "updated");
  const row = await proxiesDb.getProxyById(id, { includeSecrets: true });
  assert.equal(row?.status, "inactive");
  assert.equal(row?.password, "new");
});

test("an explicit status on re-import is applied", async () => {
  const id = await seed();
  await proxiesDb.upsertProxy({ name: "seed", ...tuple, status: "inactive" });
  assert.equal((await proxiesDb.getProxyById(id))?.status, "inactive");
});

test("an empty, unknown or undefined status on an existing row is ignored", async () => {
  const id = await seed("dead");
  await proxiesDb.upsertProxy({ name: "seed", ...tuple, status: "" });
  await proxiesDb.upsertProxy({ name: "seed", ...tuple, status: "bogus" });
  await proxiesDb.upsertProxy({ name: "seed", ...tuple, status: undefined });
  assert.equal((await proxiesDb.getProxyById(id))?.status, "dead");
});

test("a row flagged error stays in error on re-import", async () => {
  const id = await seed("error");
  await proxiesDb.upsertProxy({ name: "seed", ...tuple });
  assert.equal((await proxiesDb.getProxyById(id))?.status, "error");
});

test("an explicit source on import is still applied by default", async () => {
  const id = await seed();
  await proxiesDb.upsertProxy({ name: "seed", ...tuple, source: "oneproxy" });
  assert.equal((await proxiesDb.getProxyById(id))?.source, "oneproxy");
});

test("claimOwnership false leaves a manual row completely untouched", async () => {
  const id = await seed("dead");
  const before = await proxiesDb.getProxyById(id, { includeSecrets: true });

  const result = await proxiesDb.upsertProxy(
    {
      name: "feed node",
      ...tuple,
      type: "socks5",
      password: "feed-pass",
      source: "subscription",
      subscriptionId: "sub-b",
    },
    { claimOwnership: false }
  );

  assert.equal(result.action, "skipped");
  assert.equal(result.proxy, null);
  assert.deepEqual(await proxiesDb.getProxyById(id, { includeSecrets: true }), before);
});

test("claimOwnership false leaves another subscription's row untouched", async () => {
  const created = await proxiesDb.upsertProxy({
    name: "owned by a",
    ...tuple,
    source: "subscription",
    subscriptionId: "sub-a",
  });
  const id = created.proxy!.id;
  const before = await proxiesDb.getProxyById(id, { includeSecrets: true });

  const result = await proxiesDb.upsertProxy(
    { name: "claimed by b", ...tuple, source: "subscription", subscriptionId: "sub-b" },
    { claimOwnership: false }
  );

  assert.equal(result.action, "skipped");
  assert.deepEqual(await proxiesDb.getProxyById(id, { includeSecrets: true }), before);
});

test("claimOwnership false still updates a row the same subscription owns", async () => {
  const created = await proxiesDb.upsertProxy({
    name: "old name",
    ...tuple,
    source: "subscription",
    subscriptionId: "sub-a",
  });
  const id = created.proxy!.id;
  await proxiesDb.updateProxy(id, { status: "dead" });

  const result = await proxiesDb.upsertProxy(
    { name: "new name", ...tuple, source: "subscription", subscriptionId: "sub-a" },
    { claimOwnership: false }
  );

  assert.equal(result.action, "updated");
  const row = await proxiesDb.getProxyById(id);
  assert.equal(row?.name, "new name");
  assert.equal(row?.status, "dead");
});
