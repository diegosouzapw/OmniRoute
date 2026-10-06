import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-model-catalog-gateway-permissions-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-gateway-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const functionalGatewayDb = await import("../../src/lib/db/functionalGatewayMirrors.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedConnection(
  provider: string,
  overrides: {
    authType?: string;
    apiKey?: string | null;
    accessToken?: string;
  } = {}
) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: `${provider}-catalog-permissions`,
    apiKey: overrides.apiKey === undefined ? "sk-test" : overrides.apiKey,
    accessToken: overrides.accessToken,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function catalogIds(body: unknown): Set<string> {
  if (!body || typeof body !== "object" || !("data" in body) || !Array.isArray(body.data)) {
    return new Set();
  }
  return new Set(
    body.data.flatMap((item) =>
      item && typeof item === "object" && "id" in item && typeof item.id === "string"
        ? [item.id]
        : []
    )
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("v1 models catalog requires independent permission for functional gateway mirrors", async () => {
  await seedConnection("kimi-coding", {
    authType: "oauth",
    apiKey: null,
    accessToken: "kimi-access",
  });
  await seedConnection("agentrouter");
  featureFlagsDb.setFeatureFlagOverride("EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS", "true");
  functionalGatewayDb.setFunctionalGatewayProviderSetting("agentrouter", "on");

  const restrictedKey = await apiKeysDb.createApiKey(
    "catalog-functional-mirror",
    "machine-functional"
  );
  await apiKeysDb.updateApiKeyPermissions(restrictedKey.id, {
    allowedModels: ["kimi-coding/*"],
  });

  const restrictedResponse = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${restrictedKey.key}` },
    })
  );
  const restrictedIds = catalogIds(await restrictedResponse.json());

  assert.equal(restrictedResponse.status, 200);
  assert.equal(restrictedIds.has("kmc/k3"), true);
  assert.equal(restrictedIds.has("agentrouter/kmc/k3"), false);

  const gatewayKey = await apiKeysDb.createApiKey(
    "catalog-functional-mirror-allowed",
    "machine-functional-allowed"
  );
  await apiKeysDb.updateApiKeyPermissions(gatewayKey.id, {
    allowedModels: ["kimi-coding/*", "agentrouter/*"],
  });

  const gatewayResponse = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${gatewayKey.key}` },
    })
  );
  const gatewayIds = catalogIds(await gatewayResponse.json());

  assert.equal(gatewayResponse.status, 200);
  assert.equal(gatewayIds.has("kmc/k3"), true);
  assert.equal(gatewayIds.has("agentrouter/kmc/k3"), true);
});
