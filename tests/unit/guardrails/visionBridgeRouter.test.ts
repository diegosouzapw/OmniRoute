/**
 * Vision Bridge Auto-Router Tests
 *
 * Moved from visionBridgeRouter.test.tsx (which was only collected by the
 * advisory `test:vitest:ui` script, never by the blocking `test:unit` /
 * `test:vitest` gates — see tests/unit/guardrails/*.test.ts glob in
 * package.json vs the `.tsx`-only include in vitest.config.ts). This file
 * has no JSX and needs no jsdom environment, so it belongs under node:test.
 *
 * Credential-usability checks are exercised via the `deps.hasUsableCredentials`
 * injection point on getBestVisionModel()/getFallbackModels() rather than by
 * mocking the `@/lib/db/providers` module: this project's Node native test
 * runner (`node:test`) has no supported ESM module-mocking mechanism (see
 * the "mock.module() is unavailable" notes across tests/unit/*.test.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";

const {
  getBestVisionModel,
  getFallbackModels,
  recordLatency,
  clearSelectionCache,
  getLatencyStats,
} = await import("../../../src/lib/guardrails/visionBridgeRouter.ts");
const { PROVIDER_MODELS } = await import("../../../open-sse/config/providerModels.ts");
type VisionBridgeRouterDepsT =
  import("../../../src/lib/guardrails/visionBridgeRouter.ts").VisionBridgeRouterDeps;

function authoritativeCatalogDeps(
  provider: string,
  modelIds: () => string[]
): VisionBridgeRouterDepsT {
  return {
    hasUsableCredentials: async (fullModelId) => fullModelId.startsWith(`${provider}/`),
    getActiveSyncedCatalog: async (providerAlias) => ({
      authoritative: providerAlias === provider,
      models: providerAlias === provider ? modelIds().map((id) => ({ id })) : [],
    }),
  };
}

// Fail-open default: credential store "unreadable" (indeterminate `null`),
// matching hasUsableCredentialsForModel's real behavior when the DB call
// throws. This mirrors pre-existing test expectations — every catalog
// candidate is still eligible when the credential store can't be checked.
const FAIL_OPEN_DEPS: VisionBridgeRouterDepsT = {
  hasUsableCredentials: async () => null,
  getActiveSyncedCatalog: async () => ({ authoritative: false, models: [] }),
};

test.beforeEach(() => {
  clearSelectionCache();
});

// ── getBestVisionModel ──────────────────────────────────────────────────────

test("getBestVisionModel — should return a vision-capable model", async () => {
  const model = await getBestVisionModel({}, FAIL_OPEN_DEPS);
  assert.ok(model);
  assert.equal(typeof model, "string");
});

test("getBestVisionModel — should respect fixed model override", async () => {
  const fixedModel = "openai/gpt-4o-mini";
  const model = await getBestVisionModel({ fixedModel }, FAIL_OPEN_DEPS);
  assert.equal(model, fixedModel);
});

test("getBestVisionModel — should exclude specified models", async () => {
  const model = await getBestVisionModel(
    { excludedModels: ["openai/gpt-4o-mini", "openai/gpt-4o"] },
    FAIL_OPEN_DEPS
  );
  assert.notEqual(model, "openai/gpt-4o-mini");
  assert.notEqual(model, "openai/gpt-4o");
});

test("getBestVisionModel — excludes a candidate with no usable active connection", async () => {
  // Every candidate reports a confirmed-unusable connection (`false`) ->
  // no candidate survives -> returns null instead of an unreachable default.
  const model = await getBestVisionModel({}, { hasUsableCredentials: async () => false });
  assert.equal(model, null);
});

// `auto` / `auto/*` ids are VIRTUAL combos: there is no provider row for
// "auto", so hasUsableCredentialsForModel reports a confirmed `false` for the
// combo id itself while the pool members remain usable (indeterminate here).
const virtualComboOnlyUnusable = async (fullModelId: string) =>
  fullModelId === "auto" || fullModelId.startsWith("auto/") ? false : null;

test("getBestVisionModel — keeps an auto/* virtual-combo fixedModel when its credential check is false (#12237)", async () => {
  // The #8430 short-circuit must not discard the combo — member credentials
  // are enforced downstream when the combo dispatches (same exemption as the
  // reroute guard in visionBridge.ts).
  const fixedModel = "auto/vision";
  const model = await getBestVisionModel(
    { fixedModel },
    { hasUsableCredentials: virtualComboOnlyUnusable }
  );
  assert.equal(model, fixedModel);
});

test('getBestVisionModel — keeps a bare "auto" fixedModel when its credential check is false (#12237)', async () => {
  const model = await getBestVisionModel(
    { fixedModel: "auto" },
    { hasUsableCredentials: virtualComboOnlyUnusable }
  );
  assert.equal(model, "auto");
});

test("getBestVisionModel — keeps an auto/* virtual-combo fixedModel on a cached pool selection (#12237)", async () => {
  // Warm the selection cache with a pool pick, then ask for the combo: the
  // cache-hit branch must still hand back the combo, not the cached member.
  const warm = await getBestVisionModel({}, { hasUsableCredentials: virtualComboOnlyUnusable });
  assert.ok(warm);
  const model = await getBestVisionModel(
    { fixedModel: "auto/vision" },
    { hasUsableCredentials: virtualComboOnlyUnusable }
  );
  assert.equal(model, "auto/vision");
});

test("getBestVisionModel — discards an auto/* virtual-combo fixedModel when the ENTIRE vision pool is unusable (#8430)", async () => {
  // The exemption only bypasses the credential check on the virtual id. With
  // no usable vision-capable member anywhere, the combo has nothing to
  // dispatch to and must fall through to `null` so the caller describes
  // instead of forwarding a raw image to a text-only backend.
  const model = await getBestVisionModel(
    { fixedModel: "auto/vision" },
    { hasUsableCredentials: async () => false }
  );
  assert.equal(model, null);
});

test("getBestVisionModel — still falls through when a concrete fixedModel has no usable credentials (#8430)", async () => {
  // Regression guard for the exemption above: a non-virtual fixedModel with
  // a confirmed-unusable credential check must still be discarded.
  const model = await getBestVisionModel(
    { fixedModel: "openai/gpt-4o-mini" },
    { hasUsableCredentials: async () => false }
  );
  assert.equal(model, null);
});

test("getBestVisionModel — does not query live catalogs for providers without usable credentials", async () => {
  let catalogCalls = 0;

  const model = await getBestVisionModel(
    {},
    {
      hasUsableCredentials: async () => false,
      getActiveSyncedCatalog: async () => {
        catalogCalls += 1;
        return { authoritative: false, models: [] };
      },
    }
  );

  assert.equal(model, null);
  assert.equal(catalogCalls, 0);
});

test("getBestVisionModel — selects a credentialed candidate over an uncredentialed higher-priority one", async () => {
  // openai (priority 50, would normally win) has no usable connection;
  // every other vision-capable provider does.
  const model = await getBestVisionModel(
    {},
    {
      hasUsableCredentials: async (fullModelId) => fullModelId.split("/")[0] !== "openai",
    }
  );
  assert.equal(model.startsWith("openai/"), false);
});

test("getBestVisionModel — excludes static models missing from an authoritative live catalog", async () => {
  const model = await getBestVisionModel(
    {},
    authoritativeCatalogDeps("gemini", () => ["gemini-2.5-flash"])
  );

  assert.equal(model, "gemini/gemini-2.5-flash");
});

test("getBestVisionModel — revalidates a cached model against the current live catalog", async () => {
  let liveModelIds = ["gemini-3.7-flash"];
  const deps = authoritativeCatalogDeps("gemini", () => liveModelIds);

  assert.equal(await getBestVisionModel({}, deps), "gemini/gemini-3.7-flash");

  liveModelIds = ["gemini-2.5-flash"];
  assert.equal(await getBestVisionModel({}, deps), "gemini/gemini-2.5-flash");
});

test("getBestVisionModel — accepts a registry model whose liveCatalogIds match upstream", async () => {
  // #11754 retired the legacy ChatGPT Web implementation after this test was authored — it was the
  // only registry provider populating `liveCatalogIds` (curated ids whose public name
  // differs from the id sent upstream). No live provider currently uses that field, so
  // this exercises the same production predicate (createCatalogModelPredicate's
  // `model.liveCatalogIds?.some(...)` branch in visionBridgeRouter.ts) against a
  // synthetic registry entry instead of trusting stale fixture data. PROVIDER_MODELS is
  // a mutable Proxy over a lazily-generated object (open-sse/config/providerModels.ts),
  // so direct assignment is safe and reverted in `finally`.
  const testProvider = "__vision-bridge-live-catalog-test__";
  PROVIDER_MODELS[testProvider] = [
    {
      id: "synthetic-vision-model-xhigh",
      name: "Synthetic Vision Model (XHigh)",
      liveCatalogIds: ["synthetic-live-id"],
      supportsVision: true,
    },
  ];

  try {
    const model = await getBestVisionModel(
      {},
      authoritativeCatalogDeps(testProvider, () => ["synthetic-live-id"])
    );

    assert.equal(model, `${testProvider}/synthetic-vision-model-xhigh`);
  } finally {
    delete PROVIDER_MODELS[testProvider];
  }
});

// ── getFallbackModels ───────────────────────────────────────────────────────

test("getFallbackModels — should return fallback models excluding the primary", async () => {
  const primary = "openai/gpt-4o-mini";
  const fallbacks = await getFallbackModels(primary, {}, FAIL_OPEN_DEPS);
  assert.ok(!fallbacks.includes(primary));
  assert.ok(fallbacks.length > 0);
});

test("getFallbackModels — should respect max fallback attempts", async () => {
  const fallbacks = await getFallbackModels(
    "openai/gpt-4o-mini",
    { maxFallbackAttempts: 2 },
    FAIL_OPEN_DEPS
  );
  assert.ok(fallbacks.length <= 2);
});

test("getFallbackModels — does not include candidates with a confirmed-unusable connection", async () => {
  const fallbacks = await getFallbackModels(
    "openai/gpt-4o-mini",
    {},
    { hasUsableCredentials: async (fullModelId) => fullModelId.split("/")[0] !== "anthropic" }
  );
  assert.ok(!fallbacks.some((m) => m.startsWith("anthropic/")));
});

test("getFallbackModels — excludes fallbacks missing from an authoritative live catalog", async () => {
  const fallbacks = await getFallbackModels(
    "gemini/gemini-2.5-flash",
    {},
    authoritativeCatalogDeps("gemini", () => ["gemini-2.5-pro", "gemini-2.5-flash"])
  );

  assert.deepEqual(fallbacks, ["gemini/gemini-2.5-pro"]);
});

test("getFallbackModels — keeps registered effort variants backed by a live base model", async () => {
  const fallbacks = await getFallbackModels(
    "cu/claude-fable-5-1-thinking-max",
    { maxFallbackAttempts: 6 },
    authoritativeCatalogDeps("cu", () => ["claude-fable-5-1"])
  );

  assert.ok(fallbacks.includes("cu/claude-fable-5-1-thinking-high"));
});

// ── recordLatency / getLatencyStats ─────────────────────────────────────────

test("recordLatency — should record latency measurements", () => {
  recordLatency("test-model", 100, true);
  recordLatency("test-model", 150, true);
  recordLatency("test-model", 200, false);

  const stats = getLatencyStats();
  assert.ok(stats["test-model"]);
  assert.equal(stats["test-model"].samples, 3);
});

test("getLatencyStats — should return latency statistics", () => {
  recordLatency("model-a", 100, true);
  recordLatency("model-a", 120, true);
  recordLatency("model-b", 200, true);

  const stats = getLatencyStats();
  assert.ok(stats["model-a"]);
  assert.ok(stats["model-b"]);
  assert.equal(stats["model-a"].avg, 110);
  assert.equal(stats["model-a"].successRate, 1);
});
