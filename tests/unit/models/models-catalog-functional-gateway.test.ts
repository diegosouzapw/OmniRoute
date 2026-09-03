import { test, after } from "node:test";
import assert from "node:assert/strict";
import {
  applyCatalogPostFilters,
  filterUnauthorizedFunctionalGatewayMirrors,
} from "../../../src/app/api/v1/models/catalogResponse.ts";
import {
  removeFeatureFlagOverride,
  setFeatureFlagOverride,
} from "../../../src/lib/db/featureFlags.ts";
import { setFunctionalGatewayProviderSetting } from "../../../src/lib/db/functionalGatewayMirrors.ts";
import { resetDbInstance } from "../../../src/lib/db/core.ts";

const FLAG_KEY = "EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS";

after(() => {
  removeFeatureFlagOverride(FLAG_KEY);
  setFunctionalGatewayProviderSetting("agentrouter", null);
  resetDbInstance();
});

// Minimal Request shim for applyCatalogPostFilters.
function makeRequest(query = ""): Request {
  return new Request(`http://localhost/v1/models${query}`);
}

test("catalog post-filters do not add mirrors when gate off (default)", async () => {
  const models = [
    { id: "deepseek/deepseek-v4-flash", owned_by: "deepseek", root: "deepseek-v4-flash" },
  ];
  const out = await applyCatalogPostFilters(makeRequest(), models, {
    connections: [],
    prefixMode: "dual",
    aliasToProviderId: {},
  });
  assert.deepEqual(out, models);
});

test("final catalog permission filtering does not let a mirror inherit base access", async () => {
  setFeatureFlagOverride(FLAG_KEY, "true");
  setFunctionalGatewayProviderSetting("agentrouter", "on");

  const models = [{ id: "kmc/k3", owned_by: "kimi-coding", root: "k3" }];
  const withMirror = await applyCatalogPostFilters(makeRequest(), models, {
    connections: [
      {
        id: "conn-1",
        provider: "agentrouter",
        isActive: true,
        providerSpecificData: {},
      },
    ],
    prefixMode: "dual",
    aliasToProviderId: {},
  });
  const allowed = await filterUnauthorizedFunctionalGatewayMirrors(
    withMirror,
    "restricted-key",
    async (_key, modelId) => modelId === "kmc/k3"
  );

  assert.deepEqual(
    allowed.map((model) => model.id),
    ["kmc/k3"],
    "a synthesized gateway mirror must authorize its own public ID"
  );

  const gatewayAllowed = await filterUnauthorizedFunctionalGatewayMirrors(
    withMirror,
    "gateway-key",
    async (_key, modelId) => modelId === "agentrouter/kmc/k3"
  );
  assert.deepEqual(
    gatewayAllowed.map((model) => model.id),
    ["kmc/k3", "agentrouter/kmc/k3"],
    "an independently authorized gateway mirror must remain visible"
  );
});

test("catalog post-filters synthesize a gateway mirror when gate on and gateway has a connection", async () => {
  setFeatureFlagOverride(FLAG_KEY, "true");
  setFunctionalGatewayProviderSetting("agentrouter", "on");

  const models = [
    { id: "deepseek/deepseek-v4-flash", owned_by: "deepseek", root: "deepseek-v4-flash" },
  ];
  const out = await applyCatalogPostFilters(makeRequest(), models, {
    connections: [
      {
        id: "conn-1",
        provider: "agentrouter",
        isActive: true,
        providerSpecificData: {},
      },
    ],
    prefixMode: "dual",
    aliasToProviderId: {},
  });
  // The mirror pass is wired and synthesizes agentrouter/deepseek/deepseek-v4-flash
  // when the gate is on AND agentrouter (a passthrough gateway) has an active
  // connection covering the model.
  assert.ok(
    out.some((m) => m.id === "agentrouter/deepseek/deepseek-v4-flash"),
    `expected mirror to be synthesized, got: ${out.map((m) => m.id).join(", ")}`
  );
});
