import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-quota-windows-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("createProviderConnection persists quotaWindowThresholds map", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "Codex A",
    apiKey: "sk-a",
    quotaWindowThresholds: { window5h: 95, window7d: 80 },
  });
  assert.deepEqual(created.quotaWindowThresholds, { window5h: 95, window7d: 80 });

  const fetched = await providersDb.getProviderConnectionById(created.id);
  assert.deepEqual(fetched.quotaWindowThresholds, { window5h: 95, window7d: 80 });
});

test("createProviderConnection with no map yields null on re-read", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "Codex Default",
    apiKey: "sk-default",
  });
  const fetched = await providersDb.getProviderConnectionById(created.id);
  // null/undefined are both acceptable signals for "no overrides".
  assert.ok(
    fetched.quotaWindowThresholds === null || fetched.quotaWindowThresholds === undefined,
    `expected null/undefined, got ${JSON.stringify(fetched.quotaWindowThresholds)}`
  );
});

test("updateProviderConnection persists a partial map", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "Codex B",
    apiKey: "sk-b",
  });

  const updated = await providersDb.updateProviderConnection(created.id, {
    quotaWindowThresholds: { window5h: 50 },
  });
  assert.deepEqual(updated.quotaWindowThresholds, { window5h: 50 });

  const reread = await providersDb.getProviderConnectionById(created.id);
  assert.deepEqual(reread.quotaWindowThresholds, { window5h: 50 });
});

test("updateProviderConnection with explicit null clears the column entirely", async () => {
  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "Codex Clearable",
    apiKey: "sk-clear",
    quotaWindowThresholds: { window5h: 90 },
  });
  assert.deepEqual(created.quotaWindowThresholds, { window5h: 90 });

  const cleared = await providersDb.updateProviderConnection(created.id, {
    quotaWindowThresholds: null,
  });
  // After a clear, the read path should not return a stray map.
  assert.ok(cleared.quotaWindowThresholds === null || cleared.quotaWindowThresholds === undefined);
  const reread = await providersDb.getProviderConnectionById(created.id);
  assert.ok(reread.quotaWindowThresholds === null || reread.quotaWindowThresholds === undefined);
});

test("DB serializer drops out-of-range values silently", async () => {
  // The DB module sanitizes the map on the way in; values outside 0-100 or
  // non-integers are pruned. This is a defense in depth — the Zod schema
  // already rejects them at the API boundary, but the DB shouldn't trust.
  const created = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "Codex Sanitize",
    apiKey: "sk-san",
    quotaWindowThresholds: { window5h: 95, bogus: 999, fractional: 1.5 },
  });
  assert.deepEqual(created.quotaWindowThresholds, { window5h: 95 });
});

test("updateProviderConnectionSchema accepts a valid window map", () => {
  const result = updateProviderConnectionSchema.safeParse({
    quotaWindowThresholds: { window5h: 95, window7d: 80 },
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.deepEqual(result.data.quotaWindowThresholds, { window5h: 95, window7d: 80 });
  }
});

test("updateProviderConnectionSchema accepts null to clear all overrides", () => {
  const result = updateProviderConnectionSchema.safeParse({ quotaWindowThresholds: null });
  assert.equal(result.success, true);
});

test("updateProviderConnectionSchema accepts null at individual window keys", () => {
  // The API route uses key=null as "clear that window's override" while
  // preserving the others.
  const result = updateProviderConnectionSchema.safeParse({
    quotaWindowThresholds: { window5h: null, window7d: 80 },
  });
  assert.equal(result.success, true);
});

test("updateProviderConnectionSchema coerces numeric strings inside the map", () => {
  const result = updateProviderConnectionSchema.safeParse({
    quotaWindowThresholds: { window5h: "85" },
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.quotaWindowThresholds?.window5h, 85);
  }
});

test("updateProviderConnectionSchema rejects out-of-range values", () => {
  for (const v of [-1, 101, 150, 1.5]) {
    const result = updateProviderConnectionSchema.safeParse({
      quotaWindowThresholds: { window5h: v },
    });
    assert.equal(result.success, false, `expected window5h=${v} to be rejected`);
  }
});
