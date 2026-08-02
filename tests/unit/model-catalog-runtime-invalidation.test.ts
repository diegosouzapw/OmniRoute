import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-model-catalog-runtime-invalidation-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET =
  process.env.API_KEY_SECRET || "catalog-runtime-invalidation-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedOpenAiConnection() {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-catalog-invalidation",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function catalogRequest() {
  return new Request("http://localhost/api/v1/models?prefix=alias");
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("session-affinity bookkeeping preserves the published model catalog", async () => {
  await settingsDb.updateSettings({ sessionAffinityTtlMs: 60_000 });
  const connection = await seedOpenAiConnection();
  const firstResponse = await v1ModelsCatalog.getUnifiedModelsResponse(catalogRequest());
  const firstBody = await firstResponse.text();

  const firstSelection = await auth.getProviderCredentials("openai", null, null, "gpt-5.4-mini", {
    sessionKey: "catalog-runtime-affinity-session",
    forcedConnectionId: connection.id as string,
  });

  const secondSelection = await auth.getProviderCredentials("openai", null, null, "gpt-5.4-mini", {
    sessionKey: "catalog-runtime-affinity-session",
    forcedConnectionId: connection.id as string,
  });

  assert.equal(firstSelection?.connectionId, connection.id);
  assert.equal(secondSelection?.connectionId, connection.id);
  const persisted = await providersDb.getProviderConnectionById(connection.id as string);
  assert.equal(
    persisted?.consecutiveUseCount,
    2,
    "reusing a cached affinity connection must keep its usage counter current"
  );
  assert.equal(typeof persisted?.lastUsedAt, "string");

  const secondResponse = await v1ModelsCatalog.getUnifiedModelsResponse(catalogRequest());
  const secondBody = await secondResponse.text();

  assert.equal(secondBody, firstBody);
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    1,
    "runtime-only affinity bookkeeping must not force a second catalog build"
  );
});

test("catalog-affecting connection changes still rebuild the published catalog", async () => {
  const connection = await seedOpenAiConnection();
  const firstResponse = await v1ModelsCatalog.getUnifiedModelsResponse(catalogRequest());
  const firstBody = (await firstResponse.json()) as { data: Array<{ id: string }> };
  assert.equal(
    firstBody.data.some((model) => model.id === "openai/gpt-5.4-mini"),
    true
  );

  await providersDb.updateProviderConnection(connection.id as string, {
    providerSpecificData: {
      excludedModels: ["gpt-5.4*"],
    },
  });

  const secondResponse = await v1ModelsCatalog.getUnifiedModelsResponse(catalogRequest());
  const secondBody = (await secondResponse.json()) as { data: Array<{ id: string }> };

  assert.equal(
    secondBody.data.some((model) => model.id === "openai/gpt-5.4-mini"),
    false
  );
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    2,
    "catalog-affecting connection changes must keep hard invalidation"
  );
});

test("#9199 a mutation during a cooperative catalog build detaches the obsolete generation", async () => {
  await settingsDb.updateSettings({ blockedProviders: [] });

  let firstSettled = false;
  const firstPromise = v1ModelsCatalog
    .getUnifiedModelsResponse(catalogRequest())
    .then((response) => {
      firstSettled = true;
      return response;
    });

  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(firstSettled, false, "the mutation must occur while the first build is in flight");

  await settingsDb.updateSettings({ blockedProviders: ["auto"] });
  const secondPromise = v1ModelsCatalog.getUnifiedModelsResponse(catalogRequest());

  const [firstResponse, secondResponse] = await Promise.all([firstPromise, secondPromise]);
  const firstBody = (await firstResponse.json()) as { data: Array<{ id: string }> };
  const secondBody = (await secondResponse.json()) as { data: Array<{ id: string }> };
  const thirdResponse = await v1ModelsCatalog.getUnifiedModelsResponse(catalogRequest());
  const thirdBody = (await thirdResponse.json()) as { data: Array<{ id: string }> };
  const advertisesAuto = (body: { data: Array<{ id: string }> }) =>
    body.data.some((model) => model.id === "auto/best-coding");

  assert.equal(advertisesAuto(firstBody), true, "the pre-mutation caller keeps its own snapshot");
  assert.equal(
    advertisesAuto(secondBody),
    false,
    "a post-mutation caller must not join the obsolete in-flight build"
  );
  assert.equal(
    advertisesAuto(thirdBody),
    false,
    "the obsolete build must not repopulate the current cache generation"
  );
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    2,
    "the current generation must publish from a distinct builder run"
  );
});
