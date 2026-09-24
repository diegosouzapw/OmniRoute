import test from "node:test";
import assert from "node:assert/strict";
import {
  PROVIDER_MODELS_CONFIG,
  getXaiOauthLiveModelsConfig,
} from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { HARDCODED_MODELS_CONFIG_IDS } from "../../src/lib/providerModels/hardcodedModelsConfigIds.ts";
import { getDiscoveryClass } from "../../src/lib/providerModels/discoveryClass.ts";
import { deriveConfigFromRegistryModelsUrl } from "../../src/app/api/providers/[id]/models/discoveryConfig.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";

const core = await import("../../src/lib/db/core.ts");

const XAI_MODELS_URL = "https://api.x.ai/v1/models";
const FLAG_KEY = "XAI_OAUTH_LIVE_MODEL_DISCOVERY";

const XAI_SEED_IDS = [
  "grok-4.6",
  "grok-4.3",
  "grok-build-0.1",
  "grok-4.20-multi-agent-0309",
  "grok-4.20-0309-reasoning",
  "grok-4.20-0309-non-reasoning",
]
  .slice()
  .sort();

const XAI_OAUTH_SEED_IDS = [...XAI_SEED_IDS, "grok-4.5"].sort();

function modelIds(provider: string): string[] {
  const entry = getRegistryEntry(provider);
  assert.ok(entry, `${provider} registry entry missing`);
  return (entry.models ?? [])
    .map((model) => model.id)
    .slice()
    .sort();
}

test.after(() => {
  delete process.env[FLAG_KEY];
  try {
    core.resetDbInstance?.();
  } catch {
    // best-effort cleanup
  }
});

test("test 1: xai stays statically registered with the exact live-discovery shape", () => {
  const apikey = PROVIDER_MODELS_CONFIG["xai"];
  assert.ok(apikey, "xai must exist in PROVIDER_MODELS_CONFIG");
  assert.equal(apikey.url, XAI_MODELS_URL);
  assert.equal(apikey.method, "GET");
  assert.equal(apikey.authHeader, "Authorization");
  assert.equal(apikey.authPrefix, "Bearer ");
});

test("test 2: getXaiOauthLiveModelsConfig — flag off keeps xai-oauth on the frozen seed (real code path)", () => {
  delete process.env[FLAG_KEY];
  assert.equal(
    getXaiOauthLiveModelsConfig(),
    undefined,
    "with the flag unset (default false), xai-oauth must resolve to no live-discovery config"
  );
});

test("test 2b: getXaiOauthLiveModelsConfig — flag on resolves the same live-discovery shape as xai (real code path)", () => {
  process.env[FLAG_KEY] = "true";
  try {
    const live = getXaiOauthLiveModelsConfig();
    assert.ok(live, "with the flag on, xai-oauth must resolve a live-discovery config");
    assert.equal(live.url, XAI_MODELS_URL);
    assert.equal(live.method, "GET");
    assert.equal(live.authHeader, "Authorization");
    assert.equal(live.authPrefix, "Bearer ");
  } finally {
    delete process.env[FLAG_KEY];
  }
});

test("test 3: xai-oauth is intentionally NOT in PROVIDER_MODELS_CONFIG / HARDCODED lockstep", () => {
  assert.equal(PROVIDER_MODELS_CONFIG["xai-oauth"], undefined);
  assert.equal(HARDCODED_MODELS_CONFIG_IDS.has("xai-oauth"), false);
  const fromModule = [...HARDCODED_MODELS_CONFIG_IDS].sort();
  const fromConfig = Object.keys(PROVIDER_MODELS_CONFIG).sort();
  assert.deepEqual(fromModule, fromConfig);
});

test("test 4: getDiscoveryClass — xai is openai-compat; xai-oauth is static-only by default (flag off)", () => {
  // xai-oauth is deliberately absent from HARDCODED_MODELS_CONFIG_IDS and has no
  // registry modelsUrl, so with XAI_OAUTH_LIVE_MODEL_DISCOVERY off (default) it
  // classifies as static-only — matching its pre-PR #13518 behavior.
  assert.equal(getDiscoveryClass("xai-oauth"), "static-only");
  assert.equal(getDiscoveryClass("xai"), "openai-compat");
});

// Former test 5 ("catalog siblings and search pairs stay unmerged") was a source-grep
// tautology: it read activeSyncedCatalog.ts / auth.ts as text, hand-parsed a bracket-
// matched block out of it, and asserted regexes over that extracted text — never
// exercising CATALOG_SIBLING_IDS or PROVIDER_SEARCH_PAIRS as real code. Both constants
// are module-private (not exported), so the only way to assert against their real
// values is to export them — an unrelated surface change outside this PR's scope (live
// xAI model discovery for xai-oauth). Dropped rather than kept as a tautology; a
// follow-up PR that exports those constants can add a real regression test for the
// xai/xai-oauth-not-merged invariant.

test("test 6: gate 4 deriveConfig does not mutate registry, and stays undefined for xai-oauth", () => {
  const minimax = getRegistryEntry("minimax");
  assert.ok(minimax?.modelsUrl);
  assert.equal(deriveConfigFromRegistryModelsUrl("minimax")?.url, minimax.modelsUrl);
  assert.equal(deriveConfigFromRegistryModelsUrl("xai-oauth"), undefined);
  assert.equal(deriveConfigFromRegistryModelsUrl("no-such-provider-xyz"), undefined);
});

test("test 7: xai and xai-oauth seeds stay frozen", () => {
  assert.deepEqual(modelIds("xai"), XAI_SEED_IDS);
  assert.deepEqual(modelIds("xai-oauth"), XAI_OAUTH_SEED_IDS);
  assert.equal(modelIds("xai").includes("grok-4.7"), false);
  assert.equal(modelIds("xai-oauth").includes("grok-4.7"), false);
});

test("test 8: alias xao is not a discovery key", () => {
  assert.equal(PROVIDER_MODELS_CONFIG["xao"], undefined);
  assert.equal(getDiscoveryClass("xao"), "static-only");
});
