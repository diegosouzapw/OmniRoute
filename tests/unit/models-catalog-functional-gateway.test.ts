import { test, after } from "node:test";
import assert from "node:assert/strict";
import { applyCatalogPostFilters } from "../../src/app/api/v1/models/catalogResponse.ts";
import {
  removeFeatureFlagOverride,
  setFeatureFlagOverride,
} from "../../src/lib/db/featureFlags.ts";
import { setFunctionalGatewayProviderSetting } from "../../src/lib/db/functionalGatewayMirrors.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

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

test("catalog post-filters do not add mirrors when gate off (default)", () => {
  const models = [
    { id: "deepseek/deepseek-v4-flash", owned_by: "deepseek", root: "deepseek-v4-flash" },
  ];
  const out = applyCatalogPostFilters(makeRequest(), models, {
    connections: [],
    prefixMode: "dual",
    aliasToProviderId: {},
  });
  assert.deepEqual(out, models);
});

test("catalog post-filters synthesize a gateway mirror when gate on and gateway has a connection", () => {
  setFeatureFlagOverride(FLAG_KEY, "true");
  setFunctionalGatewayProviderSetting("agentrouter", "on");

  const models = [
    { id: "deepseek/deepseek-v4-flash", owned_by: "deepseek", root: "deepseek-v4-flash" },
  ];
  const out = applyCatalogPostFilters(makeRequest(), models, {
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
