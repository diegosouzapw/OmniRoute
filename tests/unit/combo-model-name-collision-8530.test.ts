// #8530 — combo name / model id collision guard.
//
// #6940 (closed by the maintainer) documents a combo named identically to a
// bare model id (e.g. combo `gpt-5.5`) as THE supported mechanism for
// per-model provider fallback — see `tests/unit/responses-combo-resolution-3227.test.ts`
// and `tests/unit/combo-name-codex-responses-rewrite.test.ts` for the
// combo-before-rewrite precedence this relies on. So creation/rename must
// NEVER hard-reject a colliding name (that would regress #6940); it must
// only make the collision observable via a non-blocking `warning` field.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-collision-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const createRoute = await import("../../src/app/api/combos/route.ts");
const comboRoute = await import("../../src/app/api/combos/[id]/route.ts");
const collision = await import("../../src/lib/combos/modelNameCollision.ts");

// A model id that really is registered by multiple providers (verified via
// PROVIDER_MODELS at write time — see open-sse/config/providers/*).
const REAL_MODEL_ID = "gpt-5.5";
// Not a registered bare model id anywhere in the provider registry.
const NON_COLLIDING_NAME = "not-a-real-model-8530-guard-probe";

interface ComboResponseBody {
  name?: string;
  warning?: { code: string; modelId: string; providerId: string };
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeCreateRequest(body: unknown) {
  return new Request("http://localhost/api/combos", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeUpdateRequest(body: unknown) {
  return new Request("http://localhost/api/combos/combo-1", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("POST /api/combos: name colliding with a real model id is created (#6940 pattern), with a warning", async () => {
  const response = await createRoute.POST(
    makeCreateRequest({
      name: REAL_MODEL_ID,
      strategy: "priority",
      models: [
        { providerId: "codex", model: REAL_MODEL_ID },
        { providerId: "openai", model: REAL_MODEL_ID },
      ],
    })
  );
  const body = (await response.json()) as ComboResponseBody;

  // Legitimate/sanctioned shape MUST still pass — never a 4xx (would regress #6940).
  assert.equal(response.status, 201);
  assert.equal(body.name, REAL_MODEL_ID);
  const stored = await combosDb.getComboByName(REAL_MODEL_ID);
  assert.equal(stored?.name, REAL_MODEL_ID);

  // But it is now observable via a non-blocking warning.
  assert.equal(body.warning?.code, "COMBO_NAME_SHADOWS_MODEL");
  assert.equal(body.warning?.modelId, REAL_MODEL_ID);
  assert.equal(typeof body.warning?.providerId, "string");
});

test("POST /api/combos: non-colliding name is created with no warning field at all", async () => {
  const response = await createRoute.POST(
    makeCreateRequest({
      name: NON_COLLIDING_NAME,
      strategy: "priority",
      models: [{ providerId: "claude", model: "claude-sonnet-4-6" }],
    })
  );
  const body = (await response.json()) as ComboResponseBody;

  assert.equal(response.status, 201);
  assert.equal(body.name, NON_COLLIDING_NAME);
  assert.equal("warning" in body, false);
});

test("PUT /api/combos/[id]: renaming to a real model id is applied (#6940 pattern), with a warning", async () => {
  const combo = await combosDb.createCombo({
    name: "claude-plain",
    models: [{ provider: "claude", model: "claude-sonnet-4-6" }],
  });

  const response = await comboRoute.PUT(makeUpdateRequest({ name: REAL_MODEL_ID }), {
    params: Promise.resolve({ id: combo.id }),
  });
  const body = (await response.json()) as ComboResponseBody;

  // Legitimate/sanctioned rename MUST still pass — never a 4xx.
  assert.equal(response.status, 200);
  assert.equal(body.name, REAL_MODEL_ID);
  const stored = await combosDb.getComboByName(REAL_MODEL_ID);
  assert.equal(stored?.id, combo.id);

  assert.equal(body.warning?.code, "COMBO_NAME_SHADOWS_MODEL");
  assert.equal(body.warning?.modelId, REAL_MODEL_ID);
});

test("PUT /api/combos/[id]: renaming to a non-colliding name has no warning field", async () => {
  const combo = await combosDb.createCombo({
    name: "claude-plain",
    models: [{ provider: "claude", model: "claude-sonnet-4-6" }],
  });

  const response = await comboRoute.PUT(makeUpdateRequest({ name: NON_COLLIDING_NAME }), {
    params: Promise.resolve({ id: combo.id }),
  });
  const body = (await response.json()) as ComboResponseBody;

  assert.equal(response.status, 200);
  assert.equal(body.name, NON_COLLIDING_NAME);
  assert.equal("warning" in body, false);
});

test("scanCombosForModelCollisions: reports existing combos that shadow a real model id", () => {
  const results = collision.scanCombosForModelCollisions([
    { name: REAL_MODEL_ID },
    { name: NON_COLLIDING_NAME },
    { name: "" },
  ]);
  assert.equal(results.length, 1);
  assert.equal(results[0].comboName, REAL_MODEL_ID);
  assert.equal(results[0].modelId, REAL_MODEL_ID);
});

test("findCollidingModel: returns null for a name with no real-model-id collision", () => {
  assert.equal(collision.findCollidingModel(NON_COLLIDING_NAME), null);
});

test("scanComboModelNameCollisionsAtBoot: logs a startup warning enumerating existing collisions", async () => {
  await combosDb.createCombo({
    name: REAL_MODEL_ID,
    models: [{ provider: "codex", model: REAL_MODEL_ID }],
  });
  await combosDb.createCombo({
    name: NON_COLLIDING_NAME,
    models: [{ provider: "claude", model: "claude-sonnet-4-6" }],
  });

  const { scanComboModelNameCollisionsAtBoot } = await import("../../src/instrumentation-node.ts");
  const originalWarn = console.warn;
  const warnings: unknown[][] = [];
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  try {
    await scanComboModelNameCollisionsAtBoot();
  } finally {
    console.warn = originalWarn;
  }

  const collisionWarning = warnings.find((args) =>
    String(args[0]).includes("share a name with a real model id (#8530)")
  );
  assert.ok(collisionWarning, "expected a startup warning about the model-name collision");
  assert.ok(String(collisionWarning![0]).includes(REAL_MODEL_ID));
  assert.ok(
    !String(collisionWarning![0]).includes(NON_COLLIDING_NAME),
    "non-colliding combo must not be reported"
  );
});
