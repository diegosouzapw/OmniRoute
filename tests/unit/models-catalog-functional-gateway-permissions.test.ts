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
const modelsDb = await import("../../src/lib/db/models.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
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
  // opencode (`oc/`) is a noAuth provider with no connection row, so its models
  // are legitimately unowned here and a connected passthrough gateway mirrors them.
  await seedConnection("agentrouter");
  featureFlagsDb.setFeatureFlagOverride("EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS", "true");
  functionalGatewayDb.setFunctionalGatewayProviderSetting("agentrouter", "on");

  const restrictedKey = await apiKeysDb.createApiKey(
    "catalog-functional-mirror",
    "machine-functional"
  );
  await apiKeysDb.updateApiKeyPermissions(restrictedKey.id, {
    allowedModels: ["oc/*"],
  });

  const restrictedResponse = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${restrictedKey.key}` },
    })
  );
  const restrictedIds = catalogIds(await restrictedResponse.json());

  assert.equal(restrictedResponse.status, 200);
  assert.equal(restrictedIds.has("oc/big-pickle"), true);
  assert.equal(restrictedIds.has("agentrouter/oc/big-pickle"), false);

  const gatewayKey = await apiKeysDb.createApiKey(
    "catalog-functional-mirror-allowed",
    "machine-functional-allowed"
  );
  await apiKeysDb.updateApiKeyPermissions(gatewayKey.id, {
    allowedModels: ["oc/*", "agentrouter/*"],
  });

  const gatewayResponse = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${gatewayKey.key}` },
    })
  );
  const gatewayIds = catalogIds(await gatewayResponse.json());

  assert.equal(gatewayResponse.status, 200);
  assert.equal(gatewayIds.has("oc/big-pickle"), true);
  assert.equal(gatewayIds.has("agentrouter/oc/big-pickle"), true);
});

test("v1 models catalog does not mirror a model whose owner is connected under an alias prefix", async () => {
  // `kmc/` is kimi-coding's alias. The owner check used to compare the alias
  // prefix against connection provider ids, never matched, and advertised a
  // dead `agentrouter/kmc/k3` even though kimi-coding itself was connected.
  await seedConnection("kimi-coding", {
    authType: "oauth",
    apiKey: null,
    accessToken: "kimi-access",
  });
  await seedConnection("agentrouter");
  featureFlagsDb.setFeatureFlagOverride("EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS", "true");
  functionalGatewayDb.setFunctionalGatewayProviderSetting("agentrouter", "on");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const ids = catalogIds(await response.json());

  assert.equal(response.status, 200);
  assert.equal(ids.has("kmc/k3"), true);
  assert.equal(ids.has("agentrouter/kmc/k3"), false);
});

test("v1 models catalog skips gateway mirrors the gateway's authoritative live catalog rejects", async () => {
  const gateway = (await seedConnection("agentrouter")) as { id: string };
  featureFlagsDb.setFeatureFlagOverride("EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS", "true");
  functionalGatewayDb.setFunctionalGatewayProviderSetting("agentrouter", "on");
  // A fresh, authoritative live catalog for the gateway that serves exactly one
  // opencode model. The request path rejects everything else ("not available in
  // the active live catalog"), so only that model may be mirrored.
  await modelsDb.replaceSyncedAvailableModelsForConnection("agentrouter", gateway.id, [
    { id: "oc/big-pickle", name: "Big Pickle" },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const ids = catalogIds(await response.json());
  const mirrors = [...ids].filter((id) => id.startsWith("agentrouter/oc/"));

  assert.equal(response.status, 200);
  assert.deepEqual(mirrors, ["agentrouter/oc/big-pickle"]);
});

test("v1 models catalog does not accept a prefix-stripped live-catalog match for a gateway mirror", async () => {
  // The gateway is sent the full `oc/big-pickle`; listing only `big-pickle` must
  // not count (dispatch matches the full id and rejects it).
  const gateway = (await seedConnection("agentrouter")) as { id: string };
  featureFlagsDb.setFeatureFlagOverride("EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS", "true");
  functionalGatewayDb.setFunctionalGatewayProviderSetting("agentrouter", "on");
  await modelsDb.replaceSyncedAvailableModelsForConnection("agentrouter", gateway.id, [
    { id: "big-pickle", name: "Big Pickle" },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const ids = catalogIds(await response.json());

  assert.equal(response.status, 200);
  assert.equal(ids.has("agentrouter/oc/big-pickle"), false);
});

test("v1 models catalog does not mirror through a gateway disabled in blockedProviders", async () => {
  // A blocked gateway keeps its connection row but has no usable credential at
  // request time, so its mirrors would all be advertised-but-dead.
  await seedConnection("agentrouter");
  featureFlagsDb.setFeatureFlagOverride("EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS", "true");
  functionalGatewayDb.setFunctionalGatewayProviderSetting("agentrouter", "on");
  await settingsDb.updateSettings({ blockedProviders: ["agentrouter"] });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const ids = catalogIds(await response.json());

  assert.equal(response.status, 200);
  assert.equal(
    [...ids].some((id) => id.startsWith("agentrouter/")),
    false
  );
});
