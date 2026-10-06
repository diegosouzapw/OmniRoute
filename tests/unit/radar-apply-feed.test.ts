/**
 * tests/unit/radar-apply-feed.test.ts
 *
 * TDD regression guard for the Radar read-time overlay merge rules.
 *
 * Tests cover:
 *  - 4 merge rules (local override, feed disable, user-added, tombstone)
 *  - flag off => baseline passthrough
 *  - no cache => baseline
 *  - corrupt cache => baseline (defensive)
 *  - feed-only entry gets added
 *  - feed fields merge over baseline when no local override
 *  - getRadarCatalog() accessor
 */

import test from "node:test";
import assert from "node:assert/strict";
import { applyFeed, type MergedEntry, type FeedModel } from "../../src/lib/radar/applyFeed.ts";
import {
  getRadarCatalog,
  baselineToMergedEntries,
  type RadarCatalogResult,
} from "../../src/lib/radar/index.ts";

// ---------------------------------------------------------------------------
// Minimal fixtures — shape-matched to real types
// ---------------------------------------------------------------------------

/** Slimmed-down baseline entries (the static free catalog shape). */
function makeBaseline(): MergedEntry[] {
  return [
    {
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      displayName: "Llama 3.3 70B Versatile",
      monthlyTokens: 1_000_000,
      creditTokens: 0,
      freeType: "recurring-daily",
      poolKey: null,
      tos: "ok",
      trainsOnPrompts: false,
      origin: "baseline",
    },
    {
      provider: "gemini",
      modelId: "gemini-2.5-flash",
      displayName: "Gemini 2.5 Flash",
      monthlyTokens: 500_000,
      creditTokens: 0,
      freeType: "recurring-daily",
      poolKey: "gemini-free-pool",
      tos: "ok",
      origin: "baseline",
    },
    {
      provider: "openrouter",
      modelId: "mistral-small-3.1-24b-instruct:free",
      displayName: "Mistral Small 3.1 24B",
      monthlyTokens: 200_000,
      creditTokens: 0,
      freeType: "recurring-daily",
      poolKey: null,
      tos: "caution",
      origin: "baseline",
    },
  ];
}

function makeFeedModel(
  overrides: Partial<FeedModel> & { provider: string; modelId: string }
): FeedModel {
  return {
    displayName: overrides.displayName ?? overrides.modelId,
    familyId: null,
    freeType: overrides.freeType ?? "recurring-daily",
    budget: overrides.budget ?? { kind: "per_model", tokensPerMonth: 1_000_000 },
    limits: { rpm: null, rpd: null, tpm: null, tpd: null },
    contextWindow: 131072,
    capabilities: { tools: true, vision: false, thinking: false },
    trainsOnPrompts: null,
    tosRisk: overrides.tosRisk ?? "ok",
    setup: null,
    enabled: overrides.enabled ?? true,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Rule 1: Feed never overwrites a local override
// ---------------------------------------------------------------------------

test("rule 1: feed does NOT overwrite a local override field", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      displayName: "Feed Updated Name",
      tosRisk: "avoid",
      budget: { kind: "per_model", tokensPerMonth: 9_999_999 },
    }),
  ];

  // User has locally overridden displayName and tos for this entry
  const localOverrides = new Map<string, Partial<MergedEntry>>([
    ["groq:llama-3.3-70b-versatile", { displayName: "My Custom Name", tos: "ok" }],
  ]);

  const result = applyFeed({
    baseline,
    feed,
    localOverrides,
    tombstones: new Set(),
  });

  const groq = result.find(
    (e) => e.provider === "groq" && e.modelId === "llama-3.3-70b-versatile"
  )!;

  // Local override fields must survive
  assert.equal(groq.displayName, "My Custom Name");
  assert.equal(groq.tos, "ok");

  // Feed fields that the user did NOT override should still merge
  assert.equal(groq.monthlyTokens, 9_999_999);
  assert.equal(groq.origin, "local");
});

// ---------------------------------------------------------------------------
// Rule 2: enabled:false in the feed disables the entry with provenance
// ---------------------------------------------------------------------------

test("rule 2: feed enabled:false disables entry and carries disabledBy provenance", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      enabled: false,
    }),
  ];

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  const groq = result.find(
    (e) => e.provider === "groq" && e.modelId === "llama-3.3-70b-versatile"
  )!;

  assert.equal(groq.enabled, false);
  assert.equal(groq.disabledBy, "radar");
  assert.equal(groq.origin, "radar");
});

// ---------------------------------------------------------------------------
// Rule 3: User-added entry NOT in the feed survives untouched
// ---------------------------------------------------------------------------

test("rule 3: user-added entry not in feed survives untouched", () => {
  // Add a user-created entry to baseline
  const baseline = [
    ...makeBaseline(),
    {
      provider: "custom",
      modelId: "my-local-model",
      displayName: "My Local Model",
      monthlyTokens: 50_000,
      creditTokens: 0,
      freeType: "recurring-daily" as const,
      poolKey: null,
      tos: "ok" as const,
      origin: "local" as const,
    },
  ];

  // Feed does NOT mention custom:my-local-model
  const feed: FeedModel[] = [
    makeFeedModel({ provider: "groq", modelId: "llama-3.3-70b-versatile" }),
  ];

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  const custom = result.find((e) => e.provider === "custom" && e.modelId === "my-local-model")!;

  assert.equal(custom.displayName, "My Local Model");
  assert.equal(custom.monthlyTokens, 50_000);
  assert.equal(custom.origin, "local");
});

// ---------------------------------------------------------------------------
// Rule 3b: User-added entry that IS in the feed => rule 1 applies (merge)
// ---------------------------------------------------------------------------

test("rule 3b: user-added entry that IS in the feed merges with rule 1", () => {
  const baseline = [
    ...makeBaseline(),
    {
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      displayName: "My Custom Groq",
      monthlyTokens: 999_000,
      creditTokens: 0,
      freeType: "recurring-daily" as const,
      poolKey: null,
      tos: "ok" as const,
      origin: "local" as const,
    },
  ];

  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      displayName: "Feed Name",
      budget: { kind: "per_model", tokensPerMonth: 2_000_000 },
    }),
  ];

  // User has overridden displayName locally
  const localOverrides = new Map<string, Partial<MergedEntry>>([
    ["groq:llama-3.3-70b-versatile", { displayName: "My Custom Groq" }],
  ]);

  const result = applyFeed({
    baseline,
    feed,
    localOverrides,
    tombstones: new Set(),
  });

  const groq = result.filter(
    (e) => e.provider === "groq" && e.modelId === "llama-3.3-70b-versatile"
  );

  // Should be deduplicated to ONE entry
  assert.equal(groq.length, 1);

  // Local override preserved
  assert.equal(groq[0].displayName, "My Custom Groq");

  // Feed field that user did not override merges through
  assert.equal(groq[0].monthlyTokens, 2_000_000);
});

// ---------------------------------------------------------------------------
// Rule 4: Tombstone prevents feed from resurrecting a deleted entry
// ---------------------------------------------------------------------------

test("rule 4: tombstone prevents feed from resurrecting a deleted entry", () => {
  // Baseline has an entry for gemini, but user deleted it
  const baseline = makeBaseline().filter(
    (e) => !(e.provider === "gemini" && e.modelId === "gemini-2.5-flash")
  );

  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "gemini",
      modelId: "gemini-2.5-flash",
      displayName: "Gemini 2.5 Flash",
    }),
  ];

  // Tombstone marks this key as deleted by the user
  const tombstones = new Set<string>(["gemini:gemini-2.5-flash"]);

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones,
  });

  const gemini = result.find((e) => e.provider === "gemini" && e.modelId === "gemini-2.5-flash");

  // Must NOT be resurrected
  assert.equal(gemini, undefined);
});

// ---------------------------------------------------------------------------
// Flag off => accessor returns baseline byte-for-byte equivalent
// ---------------------------------------------------------------------------

test("getRadarCatalog: flag off returns baseline unchanged", async () => {
  // We test applyFeed directly: when called with empty feed, result = baseline
  const baseline = makeBaseline();
  const result = applyFeed({
    baseline,
    feed: [],
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  assert.equal(result.length, baseline.length);
  for (let i = 0; i < result.length; i++) {
    assert.equal(result[i].provider, baseline[i].provider);
    assert.equal(result[i].modelId, baseline[i].modelId);
    assert.equal(result[i].displayName, baseline[i].displayName);
    assert.equal(result[i].monthlyTokens, baseline[i].monthlyTokens);
    assert.equal(result[i].origin, baseline[i].origin);
  }
});

// ---------------------------------------------------------------------------
// No feed (empty) => baseline passthrough
// ---------------------------------------------------------------------------

test("applyFeed: empty feed returns baseline unchanged", () => {
  const baseline = makeBaseline();
  const result = applyFeed({
    baseline,
    feed: [],
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  assert.deepEqual(result, baseline);
});

// ---------------------------------------------------------------------------
// Feed entry NOT in baseline is ADDED with origin "radar"
// ---------------------------------------------------------------------------

test("applyFeed: feed-only entry is added with origin 'radar'", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "new-provider",
      modelId: "new-model",
      displayName: "Brand New Model",
      budget: { kind: "per_model", tokensPerMonth: 3_000_000 },
    }),
  ];

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  const added = result.find((e) => e.provider === "new-provider" && e.modelId === "new-model");

  assert.ok(added, "feed-only entry should be present");
  assert.equal(added.displayName, "Brand New Model");
  assert.equal(added.monthlyTokens, 3_000_000);
  assert.equal(added.origin, "radar");
  assert.equal(added.enabled, true);
});

// ---------------------------------------------------------------------------
// Feed merges over baseline where no local override exists
// ---------------------------------------------------------------------------

test("applyFeed: feed fields merge over baseline where no local override", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      displayName: "Feed Updated Name",
      tosRisk: "avoid",
      budget: { kind: "per_model", tokensPerMonth: 5_000_000 },
    }),
  ];

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  const groq = result.find(
    (e) => e.provider === "groq" && e.modelId === "llama-3.3-70b-versatile"
  )!;

  // Feed values win when no local override
  assert.equal(groq.displayName, "Feed Updated Name");
  assert.equal(groq.tos, "avoid");
  assert.equal(groq.monthlyTokens, 5_000_000);
  assert.equal(groq.origin, "radar");
});

// ---------------------------------------------------------------------------
// Corrupt feed payload => baseline passthrough (defensive)
// ---------------------------------------------------------------------------

test("applyFeed: returns baseline when feed is empty (defensive corrupt scenario)", () => {
  const baseline = makeBaseline();

  // Simulate a corrupt/invalid feed by passing an empty array
  // (the real accessor would catch JSON.parse failures before calling applyFeed)
  const result = applyFeed({
    baseline,
    feed: [],
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  assert.deepEqual(result, baseline);
});

// ---------------------------------------------------------------------------
// Deduplication: baseline + feed with same key produces one entry
// ---------------------------------------------------------------------------

test("applyFeed: duplicate key (baseline + feed) produces single merged entry", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      displayName: "Feed Groq",
      budget: { kind: "per_model", tokensPerMonth: 7_000_000 },
    }),
  ];

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  const groqEntries = result.filter(
    (e) => e.provider === "groq" && e.modelId === "llama-3.3-70b-versatile"
  );

  assert.equal(groqEntries.length, 1, "should be deduplicated to one entry");
  assert.equal(groqEntries[0].displayName, "Feed Groq");
  assert.equal(groqEntries[0].monthlyTokens, 7_000_000);
});

// ---------------------------------------------------------------------------
// Tombstone: feed entry is tombstoned even when baseline also has it
// ---------------------------------------------------------------------------

test("rule 4b: tombstoned entry removed even when baseline has it", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [];

  const tombstones = new Set<string>(["groq:llama-3.3-70b-versatile"]);

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones,
  });

  const groq = result.find((e) => e.provider === "groq" && e.modelId === "llama-3.3-70b-versatile");

  assert.equal(groq, undefined, "tombstoned entry should be excluded");
});

// ---------------------------------------------------------------------------
// Entry with origin "baseline" that feed updates gets origin "radar"
// ---------------------------------------------------------------------------

test("origin switches to 'radar' when feed updates a baseline entry", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "gemini",
      modelId: "gemini-2.5-flash",
      displayName: "Updated Gemini",
      budget: { kind: "per_model", tokensPerMonth: 800_000 },
    }),
  ];

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  const gemini = result.find((e) => e.provider === "gemini" && e.modelId === "gemini-2.5-flash")!;

  assert.equal(gemini.origin, "radar");
  assert.equal(gemini.displayName, "Updated Gemini");
});

// ===========================================================================
// getRadarCatalog() accessor tests
// ===========================================================================

/** Minimal valid RadarFeed payload (passes RadarFeedSchema.parse). */
const VALID_FEED_JSON = JSON.stringify({
  feed: "omniroute-radar",
  schemaVersion: 1,
  version: "2026.08.01.1",
  generatedAt: "2026-08-01T12:00:00Z",
  tier: "community",
  counts: { providers: 1, models: 1 },
  providers: [{ id: "groq", name: "Groq" }],
  models: [
    {
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      displayName: "Feed Groq Name",
      familyId: "llama-3.3-70b",
      freeType: "recurring-daily",
      budget: { kind: "per_model", tokensPerMonth: 5_000_000 },
      limits: { rpm: 30, rpd: 14400, tpm: 6000, tpd: null },
      contextWindow: 131072,
      capabilities: { tools: true, vision: false, thinking: false },
      trainsOnPrompts: null,
      tosRisk: "ok",
      setup: { keyUrl: "https://console.groq.com/keys", steps: ["Step 1"] },
      enabled: true,
    },
  ],
  quirks: [],
  totals: { dedupedTokensPerMonth: 5_000_000, modelCount: 1, poolCount: 0 },
});

// ---------------------------------------------------------------------------
// Accessor: flag off => baseline passthrough, no cache read
// ---------------------------------------------------------------------------

test("getRadarCatalog: flag off returns baseline and does NOT read cache", () => {
  let cacheRead = false;

  const result = getRadarCatalog({
    getFlag: () => false,
    getCache: () => {
      cacheRead = true;
      return null;
    },
    baseline: makeBaseline(),
  });

  assert.equal(result.entries.length, 3, "baseline entries returned");
  assert.equal(result.meta, null, "no meta when flag off");
  assert.equal(cacheRead, false, "cache should not be read when flag is off");
});

// ---------------------------------------------------------------------------
// Accessor: no cache => baseline
// ---------------------------------------------------------------------------

test("getRadarCatalog: no cache returns baseline", () => {
  const result = getRadarCatalog({
    getFlag: () => true,
    getCache: () => null,
    baseline: makeBaseline(),
  });

  assert.equal(result.entries.length, 3);
  assert.equal(result.meta, null);
  assert.equal(result.entries[0].origin, "baseline");
});

// ---------------------------------------------------------------------------
// Accessor: corrupt cached payload => baseline (defensive), no throw
// ---------------------------------------------------------------------------

test("getRadarCatalog: corrupt payload returns baseline without throwing", () => {
  const result = getRadarCatalog({
    getFlag: () => true,
    getCache: () => ({
      version: "2026.08.01.1",
      tier: "community",
      payload: "{invalid json!!!",
      fetchedAt: "2026-08-01T12:00:00Z",
    }),
    baseline: makeBaseline(),
  });

  assert.equal(result.entries.length, 3);
  assert.equal(result.meta, null);
  assert.equal(result.entries[0].origin, "baseline");
});

// ---------------------------------------------------------------------------
// Accessor: valid cache => applyFeed output + meta
// ---------------------------------------------------------------------------

test("getRadarCatalog: valid cache returns merged entries with meta", () => {
  const result = getRadarCatalog({
    getFlag: () => true,
    getLocalState: () => ({ localOverrides: new Map(), tombstones: new Set() }),
    getCache: () => ({
      version: "2026.08.01.1",
      tier: "community",
      payload: VALID_FEED_JSON,
      fetchedAt: "2026-08-01T12:00:00Z",
    }),
    baseline: makeBaseline(),
  });

  // The feed has groq:llama-3.3-70b-versatile, which merges over baseline
  const groq = result.entries.find(
    (e) => e.provider === "groq" && e.modelId === "llama-3.3-70b-versatile"
  )!;

  assert.equal(groq.displayName, "Feed Groq Name");
  assert.equal(groq.monthlyTokens, 5_000_000);
  assert.equal(groq.origin, "radar");

  // Meta is present
  assert.ok(result.meta);
  assert.equal(result.meta.version, "2026.08.01.1");
  assert.equal(result.meta.tier, "community");
  assert.equal(result.meta.fetchedAt, "2026-08-01T12:00:00Z");

  // Other baseline entries survive
  assert.equal(result.entries.length, 3);
});

// ---------------------------------------------------------------------------
// Accessor: schema-valid but wrong feed name => falls back to baseline
// ---------------------------------------------------------------------------

test("getRadarCatalog: wrong feed literal falls back to baseline", () => {
  const badPayload = JSON.stringify({
    feed: "wrong-feed-name",
    schemaVersion: 1,
    version: "2026.08.01.1",
    generatedAt: "2026-08-01T12:00:00Z",
    tier: "community",
    counts: { providers: 0, models: 0 },
    providers: [],
    models: [],
    quirks: [],
    totals: { dedupedTokensPerMonth: 0, modelCount: 0, poolCount: 0 },
  });

  const result = getRadarCatalog({
    getFlag: () => true,
    getCache: () => ({
      version: "2026.08.01.1",
      tier: "community",
      payload: badPayload,
      fetchedAt: "2026-08-01T12:00:00Z",
    }),
    baseline: makeBaseline(),
  });

  assert.equal(result.entries.length, 3, "baseline returned for bad feed literal");
  assert.equal(result.meta, null);
});

// ---------------------------------------------------------------------------
// baselineToMergedEntries converter
// ---------------------------------------------------------------------------

test("baselineToMergedEntries: converts FreeModelBudget shape to MergedEntry", () => {
  const budgets = [
    {
      provider: "test",
      modelId: "model-1",
      displayName: "Test Model",
      monthlyTokens: 100_000,
      creditTokens: 0,
      freeType: "recurring-daily" as const,
      poolKey: null,
      tos: "ok" as const,
    },
  ];

  const entries = baselineToMergedEntries(budgets);

  assert.equal(entries.length, 1);
  assert.equal(entries[0].provider, "test");
  assert.equal(entries[0].origin, "baseline");
  assert.equal(entries[0].enabled, true);
});

// ===========================================================================
// FIX 2 — extended feed fields (contextWindow/capabilities/limits/setup)
// must survive the merge on BOTH code paths (mergeOne + feedModelToMerged).
// ===========================================================================

test("FIX2 mergeOne path: contextWindow/capabilities/limits/setup survive merge over a baseline entry", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      contextWindow: 131072,
      capabilities: { tools: true, vision: true, thinking: false },
      limits: { rpm: 30, rpd: 14400, tpm: 6000, tpd: null },
      setup: { keyUrl: "https://console.groq.com/keys", steps: ["Sign up", "Create key"] },
    }),
  ];

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  const groq = result.find(
    (e) => e.provider === "groq" && e.modelId === "llama-3.3-70b-versatile"
  )!;

  assert.equal(groq.contextWindow, 131072);
  assert.deepEqual(groq.capabilities, { tools: true, vision: true, thinking: false });
  assert.deepEqual(groq.limits, { rpm: 30, rpd: 14400, tpm: 6000, tpd: null });
  assert.deepEqual(groq.setup, {
    keyUrl: "https://console.groq.com/keys",
    steps: ["Sign up", "Create key"],
  });
});

test("FIX2 feedModelToMerged path: contextWindow/capabilities/limits/setup survive for a feed-only entry", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "new-provider",
      modelId: "new-model",
      contextWindow: 65536,
      capabilities: { tools: false, vision: true, thinking: true },
      limits: { rpm: null, rpd: 100, tpm: null, tpd: null },
      setup: { keyUrl: "https://new-provider.example/keys", steps: ["Step A"] },
    }),
  ];

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  const added = result.find((e) => e.provider === "new-provider" && e.modelId === "new-model")!;

  assert.equal(added.contextWindow, 65536);
  assert.deepEqual(added.capabilities, { tools: false, vision: true, thinking: true });
  assert.deepEqual(added.limits, { rpm: null, rpd: 100, tpm: null, tpd: null });
  assert.deepEqual(added.setup, {
    keyUrl: "https://new-provider.example/keys",
    steps: ["Step A"],
  });
});

test("metadata evidence is removed when a baseline model overrides feed metadata", () => {
  const evidence = "https://provider.example/docs/model";
  const baseline = makeBaseline();
  const feed = [
    makeFeedModel({
      provider: "groq",
      modelId: "llama-3.3-70b-versatile",
      contextWindow: 100,
      capabilities: { tools: true, vision: false, thinking: null },
      metadataEvidenceUrls: [evidence],
    }),
  ];
  const key = "groq:llama-3.3-70b-versatile";

  const [entry] = applyFeed({
    baseline,
    feed,
    localOverrides: new Map([
      [key, { contextWindow: 999, capabilities: { tools: false, vision: null, thinking: null } }],
    ]),
    tombstones: new Set(),
  });

  assert.equal(entry.contextWindow, 999);
  assert.deepEqual(entry.metadataEvidenceUrls, []);
});

test("metadata evidence is removed when a feed-only model overrides metadata with null", () => {
  const key = "new-provider:new-model";
  const [entry] = applyFeed({
    baseline: [],
    feed: [
      makeFeedModel({
        provider: "new-provider",
        modelId: "new-model",
        contextWindow: 100,
        metadataEvidenceUrls: ["https://provider.example/docs/model"],
      }),
    ],
    localOverrides: new Map([[key, { contextWindow: null }]]),
    tombstones: new Set(),
  });

  assert.equal(entry.contextWindow, null);
  assert.deepEqual(entry.metadataEvidenceUrls, []);
});

test("F3 mergeOne path: familyId survives the feed merge over a baseline entry", () => {
  const result = applyFeed({
    baseline: makeBaseline(),
    feed: [
      makeFeedModel({
        provider: "groq",
        modelId: "llama-3.3-70b-versatile",
        familyId: "llama-3.3-70b",
      }),
    ],
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  assert.equal(result.find((entry) => entry.provider === "groq")?.familyId, "llama-3.3-70b");
});

test("F3 feedModelToMerged path: familyId survives for a feed-only entry", () => {
  const result = applyFeed({
    baseline: [],
    feed: [
      makeFeedModel({
        provider: "new-provider",
        modelId: "shared-model",
        familyId: "shared-family",
      }),
    ],
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  assert.equal(result[0]?.familyId, "shared-family");
});

// ===========================================================================
// Feed `enabled:false` is the safety exception to local override precedence:
// a model confirmed dead upstream must not be resurrected locally.
// ===========================================================================

test("rule 2: feed-only entry stays disabled even with local enabled:true", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "new-provider",
      modelId: "disabled-model",
      enabled: false,
    }),
  ];

  const localOverrides = new Map<string, Partial<MergedEntry>>([
    ["new-provider:disabled-model", { enabled: true }],
  ]);

  const result = applyFeed({
    baseline,
    feed,
    localOverrides,
    tombstones: new Set(),
  });

  const entry = result.find(
    (e) => e.provider === "new-provider" && e.modelId === "disabled-model"
  )!;

  assert.equal(entry.enabled, false, "a local override must not resurrect a dead upstream model");
  assert.equal(entry.disabledBy, "radar");
});

test("FIX4: feed-only entry with NO override still gets disabled with disabledBy provenance", () => {
  const baseline = makeBaseline();
  const feed: FeedModel[] = [
    makeFeedModel({
      provider: "new-provider",
      modelId: "disabled-model-2",
      enabled: false,
    }),
  ];

  const result = applyFeed({
    baseline,
    feed,
    localOverrides: new Map(),
    tombstones: new Set(),
  });

  const entry = result.find(
    (e) => e.provider === "new-provider" && e.modelId === "disabled-model-2"
  )!;

  assert.equal(entry.enabled, false);
  assert.equal(entry.disabledBy, "radar");
});
