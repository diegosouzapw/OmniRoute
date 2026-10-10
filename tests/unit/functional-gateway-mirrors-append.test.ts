import { test } from "node:test";
import assert from "node:assert/strict";

import { appendFunctionalGatewayMirrors } from "../../open-sse/utils/functionalGatewayMirrors.ts";
import { appendCcDiscoveryAliases } from "../../open-sse/utils/ccDiscoveryAliases.ts";

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

// A gateway with a distinct short alias (kilocode -> kc), and a connected codex owner.
const kcDeps = {
  gatewayProviderIds: ["kilocode"],
  isGateway: (p: string) => p === "kilocode",
  gatewayAlias: (p: string) => (p === "kilocode" ? "kc" : p),
  gatewayCovers: () => true,
  gatewayHasConnection: (p: string) => p === "kilocode",
  canonicalOwnerHasConnection: (owner: string) => owner === "codex" || owner === "claude",
};

test("resolves the owner from owned_by, not the id prefix (alias-prefixed ids)", () => {
  // In `dual`/`alias` catalog modes codex models are also listed as `cx/<model>`.
  // `cx` is not a provider id, so keying the owner check on the prefix reported
  // "no connection" for a connected codex account and emitted a dead
  // `kc/cx/<model>` mirror that the request path then rejects.
  const models: CatalogEntry[] = [
    { id: "cx/gpt-6-sol-low", owned_by: "codex", root: "gpt-6-sol-low" },
    { id: "codex/gpt-6-sol-low", owned_by: "codex", root: "gpt-6-sol-low" },
  ];
  const out = appendFunctionalGatewayMirrors(models, kcDeps);
  assert.equal(out, models, "connected owner behind an alias prefix must not be mirrored");
});

test("does NOT mirror synthetic no-think/ ids whose real owner is connected", () => {
  const models: CatalogEntry[] = [
    { id: "no-think/claude/claude-opus-5-5", owned_by: "claude", root: "claude-opus-5-5" },
  ];
  const out = appendFunctionalGatewayMirrors(models, kcDeps);
  assert.equal(out, models);
});

test("never mirrors combos (incl. built-in auto/*): gateways cannot route them", () => {
  const models: CatalogEntry[] = [
    { id: "auto/best-fast", owned_by: "combo", root: "auto/best-fast" },
    { id: "team/primary", owned_by: "combo", root: "team/primary" },
  ];
  const out = appendFunctionalGatewayMirrors(models, kcDeps);
  assert.equal(out, models);
});

test("never mirrors a model onto its own owner via that owner's alias", () => {
  const models: CatalogEntry[] = [
    { id: "kilocode/some-free-model", owned_by: "kilocode", root: "some-free-model" },
  ];
  const out = appendFunctionalGatewayMirrors(models, {
    ...kcDeps,
    canonicalOwnerHasConnection: () => false,
  });
  assert.equal(out, models, "kc/kilocode/<model> would just re-route to the same provider");
});

test("never mirrors OmniRoute-synthesized ids, even when their owner has no connection", () => {
  // `claude/…` discovery aliases and `no-think/…` variants only resolve through
  // OmniRoute's own leading-prefix handling; behind a gateway prefix the gateway
  // gets the synthetic id verbatim and rejects it.
  const ccAliased = appendCcDiscoveryAliases(
    [{ id: "dva/claude-fable-5-1-max", owned_by: "devin-cli-agentic" }] as CatalogEntry[],
    () => true
  );
  const models: CatalogEntry[] = [
    ...ccAliased,
    { id: "no-think/dva/claude-fable-5-1-max", owned_by: "devin-cli-agentic" },
  ];
  const out = appendFunctionalGatewayMirrors(models, {
    ...kcDeps,
    canonicalOwnerHasConnection: () => false,
  });
  assert.deepEqual(
    out.map((m) => m.id),
    [
      "dva/claude-fable-5-1-max",
      "claude/dva/claude-fable-5-1-max",
      "no-think/dva/claude-fable-5-1-max",
      "kc/dva/claude-fable-5-1-max",
    ],
    "only the real model id gets a gateway mirror"
  );
});

test("still mirrors when the real owner (from owned_by) has no connection", () => {
  const models: CatalogEntry[] = [
    { id: "ds/deepseek-v4-flash", owned_by: "deepseek", root: "deepseek-v4-flash" },
  ];
  const out = appendFunctionalGatewayMirrors(models, kcDeps);
  assert.deepEqual(
    out.map((m) => m.id),
    ["ds/deepseek-v4-flash", "kc/ds/deepseek-v4-flash"]
  );
});

test("asks the gateway about the full id it will actually receive", () => {
  // The mirror is `<gatewayAlias>/<originalId>`, so the gateway is sent
  // `ds/deepseek-v4-flash` — not the prefix-stripped `deepseek-v4-flash`, which
  // a gateway may well list while still rejecting the prefixed form.
  const asked: string[] = [];
  const models: CatalogEntry[] = [
    { id: "ds/deepseek-v4-flash", owned_by: "deepseek", root: "deepseek-v4-flash" },
  ];
  const out = appendFunctionalGatewayMirrors(models, {
    ...kcDeps,
    gatewayCovers: (_p: string, modelId: string) => {
      asked.push(modelId);
      return modelId === "deepseek-v4-flash";
    },
  });
  assert.deepEqual(asked, ["ds/deepseek-v4-flash"]);
  assert.deepEqual(
    out.map((m) => m.id),
    ["ds/deepseek-v4-flash"]
  );
});
