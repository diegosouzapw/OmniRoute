import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-quota-protected-"));
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const comboRoute = await import("../../src/app/api/combos/[id]/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ requireLogin: false });
}

function makePutRequest(id: string, body: Record<string, unknown>) {
  return new Request(`http://localhost/api/combos/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json", "x-omniroute-peer-locality": "loopback" },
    body: JSON.stringify(body),
  });
}

function makeDeleteRequest(id: string) {
  return new Request(`http://localhost/api/combos/${id}`, {
    method: "DELETE",
    headers: { "x-omniroute-peer-locality": "loopback" },
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
  if (ORIGINAL_JWT_SECRET === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  }
});

// ---- quota-protected combos ----

test("DELETE /api/combos/[id] returns 409 for a qtSd/* combo and does NOT delete it", async () => {
  const combo = await combosDb.createCombo({
    name: "qtSd/groupdemo/openai/gpt-4o",
    strategy: "priority",
    models: [{ provider: "openai", model: "gpt-4o" }],
    isHidden: true,
  });

  const response = await comboRoute.DELETE(makeDeleteRequest(combo.id), {
    params: Promise.resolve({ id: combo.id }),
  });

  assert.equal(response.status, 409, "DELETE quota combo should return 409");

  const body = (await response.json()) as any;
  assert.ok(
    body.error?.message?.includes("Quota Share"),
    `Error message should mention Quota Share; got: ${JSON.stringify(body)}`
  );

  // Verify the combo was NOT deleted
  const still = await combosDb.getComboById(combo.id);
  assert.ok(still, "Quota combo must still exist after rejected DELETE");
});

test("PUT /api/combos/[id] returns 409 for a qtSd/* combo and does NOT mutate it", async () => {
  const combo = await combosDb.createCombo({
    name: "qtSd/groupdemo/openai/gpt-4o",
    strategy: "priority",
    models: [{ provider: "openai", model: "gpt-4o" }],
    isHidden: true,
  });

  const response = await comboRoute.PUT(
    makePutRequest(combo.id, { name: "qtSd/groupdemo/openai/gpt-4o", strategy: "random" }),
    { params: Promise.resolve({ id: combo.id }) }
  );

  assert.equal(response.status, 409, "PUT quota combo should return 409");

  const body = (await response.json()) as any;
  assert.ok(
    body.error?.message?.includes("Quota Share"),
    `Error message should mention Quota Share; got: ${JSON.stringify(body)}`
  );

  // Verify the combo was NOT mutated
  const unchanged = await combosDb.getComboById(combo.id);
  assert.equal(
    unchanged?.strategy,
    "priority",
    "Strategy must remain unchanged after rejected PUT"
  );
});

// ---- non-quota combos still work ----

test("DELETE /api/combos/[id] succeeds for a regular (non-quota) combo", async () => {
  const combo = await combosDb.createCombo({
    name: "regular-combo",
    strategy: "priority",
    models: [{ provider: "openai", model: "gpt-4o" }],
  });

  const response = await comboRoute.DELETE(makeDeleteRequest(combo.id), {
    params: Promise.resolve({ id: combo.id }),
  });

  assert.equal(response.status, 200, "DELETE regular combo should return 200");

  const body = (await response.json()) as any;
  assert.equal(body.success, true);

  // Verify the combo was actually deleted
  const gone = await combosDb.getComboById(combo.id);
  assert.equal(gone, null, "Regular combo must be gone after DELETE");
});

test("PUT /api/combos/[id] succeeds for a regular (non-quota) combo", async () => {
  const combo = await combosDb.createCombo({
    name: "regular-editable-combo",
    strategy: "priority",
    models: [{ provider: "openai", model: "gpt-4o" }],
  });

  const response = await comboRoute.PUT(
    makePutRequest(combo.id, {
      name: "regular-editable-combo",
      strategy: "round-robin",
      models: [{ providerId: "openai", model: "gpt-4o" }],
    }),
    { params: Promise.resolve({ id: combo.id }) }
  );

  assert.equal(response.status, 200, "PUT regular combo should return 200");

  const body = (await response.json()) as any;
  assert.equal(body.strategy, "round-robin", "Strategy should be updated for regular combo");
});

// ---- 404 still works when combo doesn't exist ----

test("DELETE /api/combos/[id] returns 404 when combo does not exist", async () => {
  const response = await comboRoute.DELETE(makeDeleteRequest("nonexistent-id"), {
    params: Promise.resolve({ id: "nonexistent-id" }),
  });

  assert.equal(response.status, 404, "DELETE nonexistent combo should return 404, not 409");
});

// ---- structural assertion: page filters isHidden ----

test("combos page source filters isHidden from rendered list", async () => {
  const pageSource = fs.readFileSync(
    new URL("../../src/app/(dashboard)/dashboard/combos/page.tsx", import.meta.url).pathname,
    "utf8"
  );
  assert.ok(
    pageSource.includes("!c.isHidden") || pageSource.includes("!combo.isHidden"),
    "Combos page must filter out isHidden combos from the rendered list"
  );
});
