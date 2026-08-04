import { test } from "node:test";
import assert from "node:assert/strict";

import { appendFunctionalGatewayMirrors } from "../../open-sse/utils/functionalGatewayMirrors.ts";

interface CatalogEntry {
  id: string;
  owned_by?: string;
  root?: string;
  name?: string;
  [key: string]: unknown;
}

// Simulate: canonical owner "deepseek" has no eligible connection; passthrough
// gateway "agentrouter" (alias "agentrouter") has one and routes arbitrary models.
const deps = {
  gatewayProviderIds: ["agentrouter", "openrouter"],
  isGateway: (p: string) => p === "agentrouter" || p === "openrouter",
  gatewayAlias: (p: string) => p, // agentrouter has no distinct alias
  gatewayCovers: (p: string, modelId: string) => p === "agentrouter", // routes anything
  gatewayHasConnection: (p: string) => p === "agentrouter",
  canonicalOwnerHasConnection: (owner: string) => owner !== "deepseek",
};

test("synthesizes a gateway-alias mirror when canonical owner has no connection", () => {
  const models: CatalogEntry[] = [
    {
      id: "deepseek/deepseek-v4-flash",
      owned_by: "deepseek",
      root: "deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
    },
  ];
  const out = appendFunctionalGatewayMirrors(models, deps);

  assert.ok(out.some((m) => m.id === "agentrouter/deepseek/deepseek-v4-flash"));
  const mirror = out.find((m) => m.id === "agentrouter/deepseek/deepseek-v4-flash");
  assert.equal(mirror!.root, "deepseek/deepseek-v4-flash");
  assert.equal(mirror!.owned_by, "agentrouter");
  assert.equal(mirror!.display_name, "DeepSeek V4 Flash (via agentrouter)");
});

test("does NOT mirror when the canonical owner already has a connection", () => {
  const models: CatalogEntry[] = [
    { id: "kimi/kimi-k2.7-code", owned_by: "kimi", root: "kimi-k2.7-code" },
  ];
  const out = appendFunctionalGatewayMirrors(models, {
    gatewayProviderIds: ["agentrouter"],
    isGateway: () => false,
    gatewayAlias: (p) => p,
    gatewayCovers: () => false,
    gatewayHasConnection: () => true,
    canonicalOwnerHasConnection: () => true,
  });
  assert.equal(out.length, 1); // unchanged
});

test("does NOT mirror when the gateway has no connection", () => {
  const models: CatalogEntry[] = [
    { id: "deepseek/deepseek-v4-flash", owned_by: "deepseek", root: "deepseek-v4-flash" },
  ];
  const out = appendFunctionalGatewayMirrors(models, {
    gatewayProviderIds: ["agentrouter"],
    isGateway: () => true,
    gatewayAlias: (p) => p,
    gatewayCovers: () => true,
    gatewayHasConnection: () => false, // no gateway credential
    canonicalOwnerHasConnection: () => false,
  });
  assert.equal(out.length, 1); // unchanged
});

test("never mirrors ids that already carry the gateway alias prefix", () => {
  const models: CatalogEntry[] = [
    {
      id: "agentrouter/deepseek/deepseek-v4-flash",
      owned_by: "deepseek",
      root: "deepseek-v4-flash",
    },
  ];
  const out = appendFunctionalGatewayMirrors(models, deps);
  assert.equal(out.length, 1); // unchanged
});
