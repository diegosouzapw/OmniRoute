import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-catalog-low-noise-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-low-noise-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

type ModelsResponseBody = {
  data: Array<{ id: string }>;
};

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, accessToken: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    name: `${provider}-low-noise`,
    apiKey: null,
    accessToken,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function getIds(url = "http://localhost/api/v1/models"): Promise<Set<string>> {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(new Request(url));
  const body = (await response.json()) as ModelsResponseBody;
  return new Set(body.data.map((item) => item.id));
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("MODELS_CATALOG_PREFIX_MODE=alias suppresses canonical provider-id prefixes", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "alias");
  try {
    await seedConnection("claude", "claude-access");
    await seedConnection("cline", "cline-access");
    await modelsDb.addCustomModel("cline", "demo-custom", "Demo Custom");
    const ids = await getIds();
    assert.ok(ids.has("cc/claude-sonnet-4-6"), "alias prefix cc/ should be present");
    assert.equal(
      ids.has("claude/claude-sonnet-4-6"),
      false,
      "canonical prefix claude/ should be absent"
    );
    assert.ok(ids.has("cl/demo-custom"), "alias prefix cl/ should be present");
    assert.equal(ids.has("cline/demo-custom"), false, "canonical prefix cline/ should be absent");
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});

test("MODELS_CATALOG_PREFIX_MODE=dual emits both alias and canonical prefixes (default)", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "dual");
  try {
    await seedConnection("claude", "claude-access");
    const ids = await getIds();
    assert.ok(ids.has("cc/claude-sonnet-4-6"), "alias prefix cc/ should be present in dual mode");
    assert.ok(
      ids.has("claude/claude-sonnet-4-6"),
      "canonical prefix claude/ should be present in dual mode"
    );
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});

test("?prefix=alias query param overrides flag to alias-only mode", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "dual");
  try {
    await seedConnection("claude", "claude-access");
    const ids = await getIds("http://localhost/api/v1/models?prefix=alias");
    assert.ok(ids.has("cc/claude-sonnet-4-6"), "alias prefix present with ?prefix=alias");
    assert.equal(
      ids.has("claude/claude-sonnet-4-6"),
      false,
      "canonical prefix absent with ?prefix=alias"
    );
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});

test("?prefix=canonical query param overrides flag to canonical-only mode", async () => {
  featureFlagsDb.setFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE", "dual");
  try {
    await seedConnection("claude", "claude-access");
    const ids = await getIds("http://localhost/api/v1/models?prefix=canonical");
    assert.equal(
      ids.has("cc/claude-sonnet-4-6"),
      false,
      "alias prefix absent with ?prefix=canonical"
    );
    assert.ok(
      ids.has("claude/claude-sonnet-4-6"),
      "canonical prefix present with ?prefix=canonical"
    );
  } finally {
    featureFlagsDb.removeFeatureFlagOverride("MODELS_CATALOG_PREFIX_MODE");
  }
});
