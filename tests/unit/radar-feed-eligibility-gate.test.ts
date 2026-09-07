import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { RadarFeedSchema } from "../../src/lib/radar/feedSchema.ts";
import { applyFeed, type FeedModel, type MergedEntry } from "../../src/lib/radar/applyFeed.ts";
import { baselineToMergedEntries } from "../../src/lib/radar/index.ts";

const fixture = JSON.parse(
  readFileSync(new URL("../fixtures/radar-feed-canonical.json", import.meta.url), "utf8")
) as { models: Array<Record<string, unknown>> };

test("feed schema: eligibilityGate is optional, nullable and closed to unknown values", () => {
  const absent = RadarFeedSchema.parse(structuredClone(fixture));
  assert.equal(absent.models[0]!.eligibilityGate, undefined);
  const gated = structuredClone(fixture);
  gated.models[0]!.eligibilityGate = "regional-identity";
  assert.equal(RadarFeedSchema.parse(gated).models[0]!.eligibilityGate, "regional-identity");
  const nulled = structuredClone(fixture);
  nulled.models[0]!.eligibilityGate = null;
  assert.equal(RadarFeedSchema.parse(nulled).models[0]!.eligibilityGate, null);
  const bad = structuredClone(fixture);
  bad.models[0]!.eligibilityGate = "vip";
  assert.throws(() => RadarFeedSchema.parse(bad));
});

function feedModel(overrides: Partial<FeedModel> = {}): FeedModel {
  return {
    provider: "modelscope",
    modelId: "Qwen/Qwen3.5-397B-A17B",
    displayName: "Qwen3.5 397B A17B (ModelScope)",
    familyId: null,
    freeType: "recurring-daily",
    budget: { kind: "shared_pool", poolId: "modelscope-free", tokensPerMonth: 6_000_000 },
    limits: { rpm: null, rpd: null, tpm: null, tpd: null },
    contextWindow: null,
    capabilities: { tools: null, vision: null, thinking: null },
    trainsOnPrompts: null,
    tosRisk: "caution",
    setup: null,
    enabled: true,
    ...overrides,
  };
}
const KEY = "modelscope:Qwen/Qwen3.5-397B-A17B";
const noLocal = () => ({
  localOverrides: new Map<string, Partial<MergedEntry>>(),
  tombstones: new Set<string>(),
});
const gatedBaseline = () =>
  baselineToMergedEntries([
    {
      provider: "modelscope",
      modelId: "Qwen/Qwen3.5-397B-A17B",
      displayName: "Qwen3.5 397B A17B (ModelScope)",
      monthlyTokens: 6_000_000,
      creditTokens: 0,
      freeType: "recurring-daily",
      poolKey: "modelscope-free",
      tos: "caution",
      eligibilityGate: "regional-identity",
    },
  ]);

test("baseline entries keep their gate through baselineToMergedEntries", () => {
  assert.equal(gatedBaseline()[0]!.eligibilityGate, "regional-identity");
});

test("a feed-only entry carries its gate into the merged catalog", () => {
  const [m] = applyFeed({
    baseline: [],
    feed: [feedModel({ eligibilityGate: "regional-identity" })],
    ...noLocal(),
  });
  assert.equal(m!.eligibilityGate, "regional-identity");
  assert.equal(m!.origin, "radar");
});

test("a feed that does not know the field preserves the baseline gate; an explicit null clears it", () => {
  const kept = applyFeed({ baseline: gatedBaseline(), feed: [feedModel()], ...noLocal() });
  assert.equal(kept[0]!.eligibilityGate, "regional-identity");
  const cleared = applyFeed({
    baseline: gatedBaseline(),
    feed: [feedModel({ eligibilityGate: null })],
    ...noLocal(),
  });
  assert.equal(cleared[0]!.eligibilityGate, undefined);
});

test("a local override on the gate wins over the feed", () => {
  const localOverrides = new Map<string, Partial<MergedEntry>>([
    [KEY, { eligibilityGate: "regional-identity" }],
  ]);
  const [m] = applyFeed({
    baseline: [],
    feed: [feedModel({ eligibilityGate: null })],
    localOverrides,
    tombstones: new Set(),
  });
  assert.equal(m!.eligibilityGate, "regional-identity");
  assert.equal(m!.origin, "local");
});

test("a local override sets the gate even when the feed clears it on a baseline entry", () => {
  const ungatedBaseline = baselineToMergedEntries([
    {
      provider: "modelscope",
      modelId: "Qwen/Qwen3.5-397B-A17B",
      displayName: "Qwen3.5 397B A17B (ModelScope)",
      monthlyTokens: 6_000_000,
      creditTokens: 0,
      freeType: "recurring-daily",
      poolKey: "modelscope-free",
      tos: "caution",
    },
  ]);
  assert.equal(ungatedBaseline[0]!.eligibilityGate, undefined);
  const [m] = applyFeed({
    baseline: ungatedBaseline,
    feed: [feedModel({ eligibilityGate: null })],
    localOverrides: new Map<string, Partial<MergedEntry>>([
      [KEY, { eligibilityGate: "regional-identity" }],
    ]),
    tombstones: new Set(),
  });
  assert.equal(m!.eligibilityGate, "regional-identity");
  assert.equal(m!.origin, "local");
});
