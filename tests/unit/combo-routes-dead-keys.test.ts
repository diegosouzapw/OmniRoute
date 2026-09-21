import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-dead-keys-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const createRoute = await import("../../src/app/api/combos/route.ts");
const comboRoute = await import("../../src/app/api/combos/[id]/route.ts");

function makeCreateRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/combos", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeUpdateRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/combos/combo-1", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function comboInput(name: string, config: Record<string, unknown>) {
  return {
    name,
    strategy: "priority",
    models: [{ providerId: "claude", model: "claude-sonnet-4-6" }],
    config,
  };
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("POST strips the 3 dead keys and keeps a live witness", async () => {
  const response = await createRoute.POST(
    makeCreateRequest(
      comboInput("dead-post", {
        pipelineConcurrency: 4,
        resetAwareEnabled: true,
        resetAwareWindow: 7,
        maxComboDepth: 3,
      })
    )
  );
  assert.equal(response.status, 201);
  const stored = (await combosDb.getComboByName("dead-post")) as { config?: Record<string, unknown> } | null;
  assert.deepEqual(stored?.config, { maxComboDepth: 3 });
});

test("PUT strips the 3 dead keys and keeps the 9 live ones", async () => {
  const combo = await combosDb.createCombo({
    name: "dead-put",
    models: [{ provider: "claude", model: "claude-sonnet-4-6" }],
  } as never);
  const response = await comboRoute.PUT(
    makeUpdateRequest({
      config: {
        pipelineConcurrency: 4,
        resetAwareEnabled: true,
        resetAwareWindow: 7,
        maxComboDepth: 5,
        queueDepth: 10,
        fallbackDelayMs: 100,
        handoffProviders: ["codex"],
        manifestRouting: true,
        complexityAwareRouting: true,
        pipeline_enabled: true,
        shadowRouting: { enabled: false },
        evalRouting: { enabled: false },
        queueTimeoutMs: 5000,
      },
    }),
    { params: Promise.resolve({ id: (combo as { id: string }).id }) }
  );
  assert.equal(response.status, 200);
  const stored = (await combosDb.getComboById((combo as { id: string }).id)) as {
    config?: Record<string, unknown>;
  } | null;
  assert.equal(stored?.config?.pipelineConcurrency, undefined);
  assert.equal(stored?.config?.resetAwareEnabled, undefined);
  assert.equal(stored?.config?.resetAwareWindow, undefined);
  assert.equal(stored?.config?.maxComboDepth, 5);
  assert.equal(stored?.config?.queueDepth, 10);
  assert.equal(stored?.config?.fallbackDelayMs, 100);
  assert.deepEqual(stored?.config?.handoffProviders, ["codex"]);
  assert.equal(stored?.config?.manifestRouting, true);
  assert.equal(stored?.config?.complexityAwareRouting, true);
  assert.equal(stored?.config?.pipeline_enabled, true);
  assert.deepEqual(stored?.config?.shadowRouting, { enabled: false });
  assert.deepEqual(stored?.config?.evalRouting, { enabled: false });
  assert.equal(stored?.config?.queueTimeoutMs, 5000);
});

test("PUT { config } round-trip rewrites identically", async () => {
  const created = await createRoute.POST(
    makeCreateRequest(
      comboInput("round-trip", {
        pipelineConcurrency: 9,
        maxComboDepth: 4,
      })
    )
  );
  assert.equal(created.status, 201);
  const createdBody = (await created.json()) as { id: string; config?: Record<string, unknown> };
  assert.equal(createdBody.config?.pipelineConcurrency, undefined);
  assert.equal(createdBody.config?.maxComboDepth, 4);

  const response = await comboRoute.PUT(makeUpdateRequest({ config: createdBody.config ?? {} }), {
    params: Promise.resolve({ id: createdBody.id }),
  });
  assert.equal(response.status, 200);
  const stored = (await combosDb.getComboById(createdBody.id)) as {
    config?: Record<string, unknown>;
  } | null;
  assert.deepEqual(stored?.config, { maxComboDepth: 4 });
});
