import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-composite-tiers-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const createRoute = await import("../../src/app/api/combos/route.ts");
const comboRoute = await import("../../src/app/api/combos/[id]/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeCreateRequest(body) {
  return new Request("http://localhost/api/combos", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeUpdateRequest(body) {
  return new Request("http://localhost/api/combos/combo-1", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function createTieredComboInput() {
  return {
    name: "tiered-codex",
    strategy: "priority",
    models: [
      {
        kind: "model",
        id: "step-primary",
        providerId: "codex",
        model: "gpt-5.4",
        connectionId: "conn-codex-a",
      },
      {
        kind: "model",
        id: "step-backup",
        providerId: "codex",
        model: "gpt-5.4",
        connectionId: "conn-codex-b",
      },
    ],
    config: {
      compositeTiers: {
        defaultTier: "primary",
        tiers: {
          primary: {
            stepId: "step-primary",
            fallbackTier: "backup",
          },
          backup: {
            stepId: "step-backup",
          },
        },
      },
    },
  };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("POST /api/combos rejects composite tiers that point to unknown steps", async () => {
  const response = await createRoute.POST(
    makeCreateRequest({
      ...createTieredComboInput(),
      config: {
        compositeTiers: {
          defaultTier: "primary",
          tiers: {
            primary: {
              stepId: "step-missing",
            },
          },
        },
      },
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.deepEqual(body, {
    error: {
      message: "Invalid composite tiers",
      details: [
        {
          field: "config.compositeTiers.tiers.primary.stepId",
          message: 'stepId "step-missing" does not exist in combo.models',
        },
      ],
    },
  });
});

test("POST /api/combos persists valid composite tiers", async () => {
  const response = await createRoute.POST(makeCreateRequest(createTieredComboInput()));
  const body = (await response.json()) as any;
  const stored = await combosDb.getComboByName("tiered-codex");

  assert.equal(response.status, 201);
  assert.equal(body.config.compositeTiers.defaultTier, "primary");
  assert.equal((stored.config as any).compositeTiers.tiers.primary.stepId, "step-primary");
  assert.equal(stored.models[0].id, "step-primary");
});

test("POST /api/combos preserves legacy string combo refs during normalization", async () => {
  await combosDb.createCombo({
    name: "child-ref",
    strategy: "priority",
    models: ["openai/gpt-4o-mini"],
  });

  const response = await createRoute.POST(
    makeCreateRequest({
      name: "parent-ref",
      strategy: "priority",
      models: ["child-ref"],
    })
  );
  const body = (await response.json()) as any;
  const stored = await combosDb.getComboByName("parent-ref");

  assert.equal(response.status, 201);
  assert.equal(body.models[0].kind, "combo-ref");
  assert.equal(body.models[0].comboName, "child-ref");
  assert.equal(stored.models[0].kind, "combo-ref");
  assert.equal(stored.models[0].comboName, "child-ref");
});

test("PUT /api/combos rejects updates that orphan an existing composite tier step reference", async () => {
  const combo = await combosDb.createCombo(createTieredComboInput());

  const response = await comboRoute.PUT(
    makeUpdateRequest({
      models: [
        {
          kind: "model",
          id: "step-backup",
          providerId: "codex",
          model: "gpt-5.4",
          connectionId: "conn-codex-b",
        },
      ],
    }),
    { params: Promise.resolve({ id: combo.id }) }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.deepEqual(body, {
    error: {
      message: "Invalid composite tiers",
      details: [
        {
          field: "config.compositeTiers.tiers.primary.stepId",
          message: 'stepId "step-primary" does not exist in combo.models',
        },
      ],
    },
  });
});

test("PUT /api/combos preserves legacy string combo refs during normalization", async () => {
  await combosDb.createCombo({
    name: "child-ref",
    strategy: "priority",
    models: ["openai/gpt-4o-mini"],
  });
  const combo = await combosDb.createCombo({
    name: "parent-ref",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const response = await comboRoute.PUT(
    makeUpdateRequest({
      models: ["child-ref"],
    }),
    { params: Promise.resolve({ id: combo.id }) }
  );
  const body = (await response.json()) as any;
  const stored = await combosDb.getComboById((combo as any).id);

  assert.equal(response.status, 200);
  assert.equal(body.models[0].kind, "combo-ref");
  assert.equal(body.models[0].comboName, "child-ref");
  assert.equal(stored.models[0].kind, "combo-ref");
  assert.equal(stored.models[0].comboName, "child-ref");
});
