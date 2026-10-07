import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-pins-8887-"));

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

type JsonRecord = Record<string, unknown>;

async function resetStorage(): Promise<void> {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      fs.rmSync(TEST_DATA_DIR, {
        recursive: true,
        force: true,

        maxRetries: 5,
        retryDelay: 100,
      });
      break;
    } catch (error: unknown) {
      const code =
        error && typeof error === "object" && "code" in error
          ? String((error as { code?: unknown }).code)
          : "";

      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
        continue;
      }

      throw error;
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, {
    recursive: true,
  });
}

async function createConnection(provider: string, name: string): Promise<string> {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `test-key-${name}`,
  });

  assert.equal(typeof connection.id, "string", "provider fixture must return a connection id");

  return connection.id as string;
}

async function createPinnedCombo(name: string, models: JsonRecord[]): Promise<void> {
  await combosDb.createCombo({
    name,
    strategy: "priority",
    models,
  });
}

async function readModels(name: string): Promise<JsonRecord[]> {
  const combo = await combosDb.getComboByName(name);

  assert.ok(combo, `combo ${name} must still exist`);
  assert.ok(Array.isArray(combo.models), `combo ${name} must retain a models array`);

  return combo.models as JsonRecord[];
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();

  fs.rmSync(TEST_DATA_DIR, {
    recursive: true,
    force: true,

    maxRetries: 5,
    retryDelay: 100,
  });
});

test("#8887: single connection delete clears only matching combo pins", async () => {
  const doomedId = await createConnection("openai", "single-doomed");
  const survivorId = await createConnection("openai", "single-survivor");

  await createPinnedCombo("single-delete-8887", [
    {
      provider: "openai",
      model: "gpt-5.6-sol",
      connectionId: doomedId,
      allowedConnectionIds: [doomedId, survivorId],
    },
    {
      provider: "openai",
      model: "gpt-5.6-sol",
      connectionId: survivorId,
    },
  ]);

  assert.equal(await providersDb.deleteProviderConnection(doomedId), true);

  const models = await readModels("single-delete-8887");

  assert.equal(
    "connectionId" in models[0],
    false,
    "single delete must remove the deleted direct connection pin"
  );
  assert.deepEqual(
    models[0].allowedConnectionIds,
    [survivorId],
    "single delete must remove the deleted id from allowedConnectionIds"
  );
  assert.equal(
    models[1].connectionId,
    survivorId,
    "single delete must preserve surviving connection pins"
  );
});

test("#8887: bulk connection delete clears every matching combo pin", async () => {
  const doomedA = await createConnection("anthropic", "bulk-doomed-a");
  const doomedB = await createConnection("anthropic", "bulk-doomed-b");
  const survivorId = await createConnection("anthropic", "bulk-survivor");

  await createPinnedCombo("bulk-delete-8887", [
    {
      provider: "anthropic",
      model: "claude-sonnet-5",
      connectionId: doomedA,
      allowedConnectionIds: [doomedA, survivorId],
    },
    {
      provider: "anthropic",
      model: "claude-sonnet-5",
      connectionId: doomedB,
      allowedConnectionIds: [doomedB, survivorId],
    },
    {
      provider: "anthropic",
      model: "claude-sonnet-5",
      connectionId: survivorId,
    },
  ]);

  assert.equal(await providersDb.deleteProviderConnections([doomedA, doomedB]), 2);

  const models = await readModels("bulk-delete-8887");

  assert.equal(
    "connectionId" in models[0],
    false,
    "bulk delete must remove the first deleted direct pin"
  );
  assert.equal(
    "connectionId" in models[1],
    false,
    "bulk delete must remove the second deleted direct pin"
  );
  assert.deepEqual(models[0].allowedConnectionIds, [survivorId]);
  assert.deepEqual(models[1].allowedConnectionIds, [survivorId]);
  assert.equal(models[2].connectionId, survivorId);
});

test("#8887: provider-wide delete clears that provider's combo pins only", async () => {
  const doomedA = await createConnection("nvidia", "provider-doomed-a");
  const doomedB = await createConnection("nvidia", "provider-doomed-b");
  const otherProviderId = await createConnection("cerebras", "provider-survivor");

  await createPinnedCombo("provider-delete-8887", [
    {
      provider: "nvidia",
      model: "z-ai/glm-5.2",
      connectionId: doomedA,
      allowedConnectionIds: [doomedA, doomedB, otherProviderId],
    },
    {
      provider: "nvidia",
      model: "deepseek-ai/deepseek-v4-pro",
      connectionId: doomedB,
    },
    {
      provider: "cerebras",
      model: "zai-glm-4.7",
      connectionId: otherProviderId,
    },
  ]);

  assert.equal(await providersDb.deleteProviderConnectionsByProvider("nvidia"), 2);

  const models = await readModels("provider-delete-8887");

  assert.equal(
    "connectionId" in models[0],
    false,
    "provider delete must remove its first deleted direct pin"
  );
  assert.equal(
    "connectionId" in models[1],
    false,
    "provider delete must remove its second deleted direct pin"
  );
  assert.deepEqual(
    models[0].allowedConnectionIds,
    [otherProviderId],
    "provider delete must preserve ids belonging to other providers"
  );
  assert.equal(
    models[2].connectionId,
    otherProviderId,
    "provider delete must preserve another provider's direct pin"
  );
});
