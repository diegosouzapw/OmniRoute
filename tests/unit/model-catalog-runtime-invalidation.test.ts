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
const capabilityOverrides = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const auth = await import("../../src/sse/services/auth.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

/**
 * #9147 yields in getUnifiedModelsResponse before the cache generation is bound.
 * A single setImmediate therefore mutates during the auth prologue, where both
 * callers correctly coalesce onto one current-generation build. Isolation is
 * only observable after the builder has started.
 */
async function waitForInFlightCatalogBuild(
  isSettled: () => boolean,
  message: string
): Promise<void> {
  const deadline = Date.now() + 10_000;
  while (v1ModelsCatalog.__getCatalogBuilderRunsForTest() < 1) {
    assert.equal(isSettled(), false, message);
    assert.ok(Date.now() < deadline, "timed out waiting for catalog builder to start");
    await new Promise<void>((resolve) => setImmediate(resolve));
  }
  // Drain the builder's post-auth cooperative yield so settings/capabilities
  // are snapshotted against the in-flight generation before we write.
  for (let i = 0; i < 4; i++) {
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(isSettled(), false, message);
  }
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

test("#9199 capability data writes advance the model-catalog generation", () => {
  const expectGenerationAdvance = (label: string, mutate: () => void) => {
    const before = readCache.getModelCatalogCacheVersion();
    mutate();
    assert.ok(
      readCache.getModelCatalogCacheVersion() > before,
      `${label} must hard-invalidate the published model catalog`
    );
  };
  const expectGenerationUnchanged = (label: string, mutate: () => void) => {
    const before = readCache.getModelCatalogCacheVersion();
    mutate();
    assert.equal(
      readCache.getModelCatalogCacheVersion(),
      before,
      `${label} must not invalidate when no capability row changed`
    );
  };

  expectGenerationAdvance("setModelCapabilityOverride", () => {
    assert.equal(
      capabilityOverrides.setModelCapabilityOverride("openai/gpt-5.4-mini", "max_token", 64000),
      true
    );
  });
  expectGenerationAdvance("removeModelCapabilityOverride", () => {
    assert.equal(
      capabilityOverrides.removeModelCapabilityOverride("openai/gpt-5.4-mini", "max_token"),
      true
    );
  });
  expectGenerationAdvance("set reasoning_efforts override", () => {
    assert.equal(
      capabilityOverrides.setModelCapabilityOverride(
        "openai/gpt-5.4-mini",
        "reasoning_efforts",
        "low,max,ultra"
      ),
      true
    );
  });
  expectGenerationAdvance("remove reasoning_efforts override", () => {
    assert.equal(
      capabilityOverrides.removeModelCapabilityOverride("openai/gpt-5.4-mini", "reasoning_efforts"),
      true
    );
  });
  expectGenerationAdvance("setModelContextOverride", () => {
    assert.equal(contextOverrides.setModelContextOverride("openai", "gpt-5.4-mini", 400000), true);
  });
  expectGenerationAdvance("removeModelContextOverride", () => {
    assert.equal(contextOverrides.removeModelContextOverride("openai", "gpt-5.4-mini"), true);
  });

  expectGenerationUnchanged("empty saveModelsDevCapabilities", () => {
    modelsDevSync.saveModelsDevCapabilities({});
  });
  expectGenerationAdvance("saveModelsDevCapabilities", () => {
    modelsDevSync.saveModelsDevCapabilities({
      openai: {
        "gpt-5.4-mini": {
          tool_call: true,
          reasoning: true,
          attachment: false,
          structured_output: true,
          temperature: true,
          modalities_input: '["text"]',
          modalities_output: '["text"]',
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: "gpt",
          open_weights: false,
          limit_context: 400000,
          limit_input: 380000,
          limit_output: 64000,
          interleaved_field: null,
        },
      },
    });
  });
  expectGenerationAdvance("clearModelsDevCapabilities", () => {
    modelsDevSync.clearModelsDevCapabilities();
  });
  expectGenerationUnchanged("empty clearModelsDevCapabilities", () => {
    modelsDevSync.clearModelsDevCapabilities();
  });
});

test("#9199 a capability mutation during preparation detaches the obsolete generation", async () => {
  let firstSettled = false;
  const firstPromise = v1ModelsCatalog
    .getUnifiedModelsResponse(catalogRequest())
    .then((response) => {
      firstSettled = true;
      return response;
    });

  await waitForInFlightCatalogBuild(
    () => firstSettled,
    "the mutation must occur while capability preparation is active"
  );
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride("openai/gpt-5.4-mini", "max_token", 64000),
    true
  );

  const secondPromise = v1ModelsCatalog.getUnifiedModelsResponse(catalogRequest());
  await Promise.all([firstPromise, secondPromise]);
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    2,
    "a post-mutation caller must not join capability work from the old generation"
  );

  await v1ModelsCatalog.getUnifiedModelsResponse(catalogRequest());
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    2,
    "obsolete capability work must not repopulate the current cache generation"
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

  await waitForInFlightCatalogBuild(
    () => firstSettled,
    "the mutation must occur while the first build is in flight"
  );

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
