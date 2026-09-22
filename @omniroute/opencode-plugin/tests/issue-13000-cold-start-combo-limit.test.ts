/**
 * Repro for #13000: combo context limits fall back to Math.min(member)
 * instead of using computed_context_length after cold start — no disk
 * snapshot fallback.
 *
 * Scenario (mirrors the report): a warm disk snapshot holds the combo with
 * its correct server-computed `computed_context_length` (245000, from all 6
 * members). After a restart, the live refresh's combos fetch returns the
 * SAME combo but without `computed_context_length` (e.g. the value hasn't
 * propagated yet), and the live models fetch only resolves 2 of the 6
 * members (the rest not yet in /v1/models). The background refresh then
 * republishes the provider block built from this degraded live data,
 * downgrading a previously-known-good 245000 limit to Math.min(163840,
 * 1_000_000) = 163840 — exactly the member-minimum described in the issue.
 */

import test from "node:test";
import assert from "node:assert/strict";
import type { Config } from "@opencode-ai/plugin";

import {
  createOmniRouteConfigHook,
  _resetInflightRefresh,
  type OmniRouteAutoCombosFetcher,
  type OmniRouteCombosFetcher,
  type OmniRouteCompressionMetaFetcher,
  type OmniRouteEnrichmentFetcher,
  type OmniRouteFetchCache,
  type OmniRouteModelsFetcher,
  type OmniRouteProvidersFetcher,
  type OmniRouteRawCombo,
  type OmniRouteRawModelEntry,
  type OmniRouteReadAuthJson,
  type OmniRouteStaticProviderEntry,
  type OmniRouteDiskSnapshotReader,
  type OmniRouteDiskSnapshotWriter,
} from "../src/index.js";

test.beforeEach(() => {
  _resetInflightRefresh();
});

function stubReadAuthJson(value: Record<string, unknown>): OmniRouteReadAuthJson {
  return async () => value as never;
}

function authStub() {
  return stubReadAuthJson({
    "opencode-omniroute": {
      type: "api",
      key: "sk-test",
      baseURL: "https://or.example.com/v1",
    },
  });
}

function makeInput(): Config {
  return { provider: {} } as unknown as Config;
}

// The two members resolvable in the degraded live /v1/models response.
const MEMBER_DEEPSEEK: OmniRouteRawModelEntry = {
  id: "deepseek-v4-pro",
  capabilities: { tool_calling: true, reasoning: true, vision: false, thinking: false },
  context_length: 163_840,
  max_output_tokens: 64_000,
  input_modalities: ["text"],
  output_modalities: ["text"],
};

const MEMBER_GLM: OmniRouteRawModelEntry = {
  id: "glm-5.2",
  capabilities: { tool_calling: true, reasoning: true, vision: false, thinking: false },
  context_length: 1_000_000,
  max_output_tokens: 16_384,
  input_modalities: ["text"],
  output_modalities: ["text"],
};

// The other member that IS present once the server is fully warm.
const MEMBER_GLM_53_HIGH: OmniRouteRawModelEntry = {
  id: "GLM-5.3-high",
  capabilities: { tool_calling: true, reasoning: true, vision: false, thinking: false },
  context_length: 245_000,
  max_output_tokens: 128_000,
  input_modalities: ["text"],
  output_modalities: ["text"],
};

const COMBO_MODELS: OmniRouteRawCombo["models"] = [
  { kind: "model", model: "deepseek-v4-pro", weight: 25 },
  { kind: "model", model: "glm-5.2", weight: 25 },
  { kind: "model", model: "GLM-5.3-high", weight: 50 },
];

test("issue #13000: warm combo limit (245000) survives a degraded post-restart refresh instead of downgrading to Math.min(member)", async () => {
  const warmSnapshot: Omit<import("../src/index.js").OmniRouteFetchCacheEntry, "expiresAt"> = {
    rawModels: [MEMBER_DEEPSEEK, MEMBER_GLM, MEMBER_GLM_53_HIGH],
    rawCombos: [
      {
        id: "orchestrator",
        name: "orchestrator",
        models: COMBO_MODELS,
        computed_context_length: 245_000,
      },
    ],
    rawAutoCombos: [],
    rawEnrichment: new Map(),
    rawCompressionCombos: [],
    rawConnections: [],
  };

  const fetcher: OmniRouteModelsFetcher = async () => [MEMBER_DEEPSEEK, MEMBER_GLM];
  const combosFetcher: OmniRouteCombosFetcher = async () => [
    {
      id: "orchestrator",
      name: "orchestrator",
      models: COMBO_MODELS,
      // computed_context_length intentionally omitted.
    },
  ];
  const autoCombosFetcher: OmniRouteAutoCombosFetcher = async () => [];
  const enrichmentFetcher: OmniRouteEnrichmentFetcher = async () => new Map();
  const compressionMetaFetcher: OmniRouteCompressionMetaFetcher = async () => [];
  const providersFetcher: OmniRouteProvidersFetcher = async () => [];

  const diskSnapshotReader: OmniRouteDiskSnapshotReader = async () => warmSnapshot;
  const diskSnapshotWriter: OmniRouteDiskSnapshotWriter = async () => {};

  const sharedCache: OmniRouteFetchCache = new Map();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", modelCacheTtl: 60_000 },
    {
      readAuthJson: authStub(),
      fetcher,
      combosFetcher,
      autoCombosFetcher,
      enrichmentFetcher,
      compressionMetaFetcher,
      providersFetcher,
      diskSnapshotReader,
      diskSnapshotWriter,
      cache: sharedCache,
    }
  );

  const input = makeInput();
  await hook(input);

  // Let the detached background refresh (degraded live data) complete and
  // republish the block.
  await new Promise((r) => setTimeout(r, 100));

  const entryAfter = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider[
    "opencode-omniroute"
  ];
  const comboModelAfter = entryAfter.models["orchestrator"];
  assert.ok(comboModelAfter, "combo model still published after refresh");

  assert.equal(
    comboModelAfter.limit.context,
    245_000,
    `expected the combo limit to stay at the known-good 245000, but got ${comboModelAfter.limit.context} ` +
      `(Math.min(member) fallback — the exact bug described in #13000)`
  );
});

test("issue #13000 (control): no warm snapshot exists — Math.min(member) fallback is still used (expected, documented behavior)", async () => {
  const fetcher: OmniRouteModelsFetcher = async () => [MEMBER_DEEPSEEK, MEMBER_GLM];
  const combosFetcher: OmniRouteCombosFetcher = async () => [
    {
      id: "orchestrator",
      name: "orchestrator",
      models: COMBO_MODELS,
      // computed_context_length intentionally omitted.
    },
  ];
  const autoCombosFetcher: OmniRouteAutoCombosFetcher = async () => [];
  const enrichmentFetcher: OmniRouteEnrichmentFetcher = async () => new Map();
  const compressionMetaFetcher: OmniRouteCompressionMetaFetcher = async () => [];
  const providersFetcher: OmniRouteProvidersFetcher = async () => [];

  // No prior snapshot on disk.
  const diskSnapshotReader: OmniRouteDiskSnapshotReader = async () => undefined;
  const diskSnapshotWriter: OmniRouteDiskSnapshotWriter = async () => {};

  const sharedCache: OmniRouteFetchCache = new Map();

  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", modelCacheTtl: 60_000 },
    {
      readAuthJson: authStub(),
      fetcher,
      combosFetcher,
      autoCombosFetcher,
      enrichmentFetcher,
      compressionMetaFetcher,
      providersFetcher,
      diskSnapshotReader,
      diskSnapshotWriter,
      cache: sharedCache,
    }
  );

  const input = makeInput();
  await hook(input);

  const entryAfter = (input as { provider: Record<string, OmniRouteStaticProviderEntry> }).provider[
    "opencode-omniroute"
  ];
  const comboModelAfter = entryAfter.models["orchestrator"];
  assert.ok(comboModelAfter, "combo model published on cold first run");

  // No snapshot to backfill from — Math.min(163840, 1_000_000) = 163840.
  assert.equal(
    comboModelAfter.limit.context,
    163_840,
    "pure cold start with no snapshot must keep using the Math.min(member) fallback"
  );
});
