import test from "node:test";
import assert from "node:assert/strict";
import {
  ACCOUNT_LIVE_PROVIDER_IDS,
  getDiscoveryClass,
} from "../../../src/lib/providerModels/discoveryClass.ts";
import { HARDCODED_MODELS_CONFIG_IDS } from "../../../src/lib/providerModels/hardcodedModelsConfigIds.ts";
import { PROVIDER_MODELS_CONFIG } from "../../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { getRegistryEntry } from "../../../open-sse/config/providerRegistry.ts";

const L1 = [
  "claude",
  "codex",
  "github",
  "ghe-copilot",
  "agy",
  "antigravity",
  "gemini",
  "cursor",
  "cu",
  "grok-cli",
] as const;

test("test 1: L1 ids are account-live", () => {
  assert.equal(ACCOUNT_LIVE_PROVIDER_IDS.length, 10);
  for (const id of L1) {
    assert.equal(getDiscoveryClass(id), "account-live", id);
  }
  assert.equal(getDiscoveryClass("CLAUDE"), "account-live");
});

test("test 2: curated web providers are static-only", () => {
  for (const id of ["kimi-web", "chatgpt-web", "zai-web"]) {
    assert.equal(getDiscoveryClass(id), "static-only", id);
  }
});

test("test 3: modelsUrl gateway is openai-compat; unknown is static-only", () => {
  assert.ok(getRegistryEntry("minimax")?.modelsUrl);
  assert.equal(getDiscoveryClass("minimax"), "openai-compat");
  assert.equal(getDiscoveryClass("no-such-provider-xyz"), "static-only");
});

test("hardcoded config keys lockstep with PROVIDER_MODELS_CONFIG", () => {
  const fromModule = [...HARDCODED_MODELS_CONFIG_IDS].sort();
  const fromConfig = Object.keys(PROVIDER_MODELS_CONFIG).sort();
  assert.deepEqual(fromModule, fromConfig);
});
