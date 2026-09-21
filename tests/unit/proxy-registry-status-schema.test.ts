import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// zod 4 applies .default() even under .partial(), so a default status on the shared
// proxy field schema rewrote the stored status on every update or import that simply
// omitted it. These tests pin "a status is written only when the caller sends one".

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-status-schema-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const schemas = await import("../../src/shared/validation/schemas/proxy.ts");
const statuses = await import("../../src/shared/constants/proxyRegistryStatus.ts");
const { handleProxyUpdate } = await import("../../src/lib/api/proxyRegistryRouteHandlers.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("update schema does not invent a status the client did not send", () => {
  const parsed = schemas.updateProxyRegistrySchema.parse({ id: "row-1", name: "renamed" });
  assert.equal("status" in parsed, false);
});

test("bulk import schema does not invent a status the client did not send", () => {
  const parsed = schemas.bulkImportProxiesSchema.parse({
    items: [{ name: "n", host: "proxy.example.com", port: 8080 }],
  });
  assert.equal("status" in parsed.items[0], false);
});

test("an explicit status is still validated against the enumeration", () => {
  const bad = schemas.bulkImportProxiesSchema.safeParse({
    items: [{ name: "n", host: "proxy.example.com", port: 8080, status: "bogus" }],
  });
  assert.equal(bad.success, false);
  const good = schemas.updateProxyRegistrySchema.parse({ id: "row-2", status: "inactive" });
  assert.equal(good.status, "inactive");
});

test("isProxyRegistryStatus accepts only the enumerated statuses", () => {
  for (const value of ["active", "inactive", "dead"]) {
    assert.equal(statuses.isProxyRegistryStatus(value), true, value);
  }
  for (const value of ["", "error", "ACTIVE", undefined, null, 1]) {
    assert.equal(statuses.isProxyRegistryStatus(value), false, String(value));
  }
});

test("renaming a dead proxy through the update handler keeps it dead", async () => {
  resetStorage();
  const created = await proxiesDb.createProxy({
    name: "before",
    type: "http",
    host: "10.1.0.1",
    port: 8080,
  });
  await proxiesDb.updateProxy(created.id, { status: "dead" });

  const response = await handleProxyUpdate(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: created.id, name: "after" }),
    })
  );

  assert.equal(response.status, 200);
  const row = await proxiesDb.getProxyById(created.id);
  assert.equal(row?.name, "after");
  assert.equal(row?.status, "dead");
});

test("creating a proxy without a status still creates it active", async () => {
  resetStorage();
  const created = await proxiesDb.createProxy({
    name: "fresh",
    type: "http",
    host: "10.1.0.2",
    port: 8080,
  });
  assert.equal((await proxiesDb.getProxyById(created.id))?.status, "active");
});
