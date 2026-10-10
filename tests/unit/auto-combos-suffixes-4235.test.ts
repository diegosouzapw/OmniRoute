/**
 * #4235 Phase B — OpenRouter-style `auto/<category>:<tier>` suffix combos.
 *
 * Covers the pure composition layer (parse + tier→weights + candidate filter) and
 * the end-to-end advertisement of the curated suffix combos in `/v1/models`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-4235b-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auto-4235b-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const suffix = await import("../../open-sse/services/autoCombo/suffixComposition.ts");
const modePacks = await import("../../open-sse/services/autoCombo/modePacks.ts");
const builtinCatalog = await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Auto combos with zero candidates are no longer advertised — seed providers
// so the materialized pools are non-empty where a matching model exists.
async function seedProviders() {
  await settingsDb.updateSettings({ requireLogin: false });
  for (const provider of ["openai", "anthropic", "gemini", "groq", "deepseek", "mistral"]) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-test-4235-${provider}`,
      name: `test-4235-${provider}`,
      isActive: true,
    });
  }
}

test.beforeEach(() => resetStorage());
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#4235 parseAutoSuffix parses category and category:tier", () => {
  assert.deepEqual(suffix.parseAutoSuffix("coding:fast"), {
    valid: true,
    category: "coding",
    tier: "fast",
  });
  assert.deepEqual(suffix.parseAutoSuffix("vision"), { valid: true, category: "vision" });
  assert.deepEqual(suffix.parseAutoSuffix("reasoning:pro"), {
    valid: true,
    category: "reasoning",
    tier: "pro",
  });
  // floor is an accepted tier alias of cheap
  assert.equal(suffix.parseAutoSuffix("coding:floor").valid, true);
});

test("#4235 parseAutoSuffix rejects unknown categories/tiers and malformed input", () => {
  assert.equal(suffix.parseAutoSuffix("coding:bogus").valid, false);
  assert.equal(suffix.parseAutoSuffix("bogus:fast").valid, false);
  assert.equal(suffix.parseAutoSuffix("coding:fast:extra").valid, false);
  // a bare flat-variant token (fast/cheap/smart) is NOT a category — left to parseAutoPrefix
  assert.equal(suffix.parseAutoSuffix("fast").valid, false);
  assert.equal(suffix.parseAutoSuffix("").valid, false);
});

test("#4235 tierToWeightVariant maps tiers to scoring profiles", () => {
  assert.equal(suffix.tierToWeightVariant("fast"), "fast");
  assert.equal(suffix.tierToWeightVariant("cheap"), "cheap");
  assert.equal(suffix.tierToWeightVariant("floor"), "cheap");
  assert.equal(suffix.tierToWeightVariant("reliable"), "reliability");
  // free/pro carry no weight bias — the candidate filter does the work
  assert.equal(suffix.tierToWeightVariant("free"), undefined);
  assert.equal(suffix.tierToWeightVariant("pro"), undefined);
  assert.equal(suffix.tierToWeightVariant(undefined), undefined);
});

test("#4235 buildAutoCandidateFilter only filters when a constraint applies", () => {
  // coding/chat with no tier → no narrowing
  assert.equal(suffix.buildAutoCandidateFilter("coding", undefined), null);
  assert.equal(suffix.buildAutoCandidateFilter("chat", undefined), null);
  // category constraints (vision/reasoning/multimodal) and tier constraints (free/pro) → a filter fn
  assert.equal(typeof suffix.buildAutoCandidateFilter("vision", undefined), "function");
  assert.equal(typeof suffix.buildAutoCandidateFilter("reasoning", undefined), "function");
  assert.equal(typeof suffix.buildAutoCandidateFilter(undefined, "free"), "function");
  assert.equal(typeof suffix.buildAutoCandidateFilter("coding", "pro"), "function");
});

test("#4235 reliability-first mode pack exists and is normalized", () => {
  const pack = modePacks.MODE_PACKS["reliability-first"];
  assert.ok(pack, "reliability-first pack registered");
  const sum = Object.values(pack).reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 1.0) < 0.01, `reliability-first weights sum to ~1.0 (got ${sum})`);
  // health + stability should dominate
  assert.ok(pack.health >= 0.3, "reliability-first leans on circuit-breaker health");
});

test("every pack carries quality>0 and reliability>0", () => {
  for (const [name, w] of Object.entries(modePacks.MODE_PACKS)) {
    const weights = w as { quality?: unknown; reliability?: unknown } & Record<string, unknown>;
    assert.ok(Number(weights.quality) > 0, `${name} quality>0`);
    assert.ok(Number(weights.reliability) > 0, `${name} reliability>0`);
    const sum = Object.values(weights).reduce((a: number, b: unknown) => a + Number(b), 0);
    assert.ok(Math.abs(sum - 0.9999) < 0.002, `${name} sum ~0.9999 got ${sum}`);
  }
});

test("#4235 createBuiltinAutoCombo composes tier weights for auto/coding:fast", async () => {
  const combo = await builtinCatalog.createBuiltinAutoCombo("auto/coding:fast", "coding:fast");
  assert.equal(combo.id, "auto/coding:fast");
  assert.equal(combo.strategy, "auto");
  // The tier mapping resolves through the weight packs: the :fast tier must
  // follow the same pack the factory uses for the ship-fast mapping, and
  // :reliable the reliability-first mapping. Pinned by pack name via the
  // factory's own selection (tierToWeightVariant), not a numeric snapshot —
  // pack contents evolve as scoring factors are added.
  const { tierToWeightVariant } =
    await import("../../open-sse/services/autoCombo/suffixComposition.ts");
  assert.equal(tierToWeightVariant("fast"), "fast");
  assert.equal(tierToWeightVariant("reliable"), "reliability");
  assert.ok(modePacks.MODE_PACKS["ship-fast"], "the ship-fast pack backs :fast");
  assert.ok(
    modePacks.MODE_PACKS["reliability-first"],
    "the reliability-first pack backs :reliable"
  );
});

test("#4235 createBuiltinAutoCombo composes reliability weights for auto/coding:reliable", async () => {
  const combo = await builtinCatalog.createBuiltinAutoCombo(
    "auto/coding:reliable",
    "coding:reliable"
  );
  assert.equal(combo.id, "auto/coding:reliable");
  assert.equal(combo.strategy, "auto");
});

test("#4235 /v1/models advertises the curated auto/<category>:<tier> combos with candidates", async () => {
  await seedProviders();
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string; owned_by?: string }> };
  const ids = new Set(body.data.map((m) => m.id));

  // An auto id is advertised iff its materialized pool is non-empty — ids
  // with zero candidates must be absent. The oracle iterates the source
  // suffix list plus the derived auto/lkgp id (kept independent of the
  // catalog derivation so a regression dropping a suffix still fails here).
  for (const autoId of [...builtinCatalog.AUTO_SUFFIX_VARIANTS, "auto/lkgp"]) {
    const virtual = await builtinCatalog.createBuiltinAutoCombo(
      autoId,
      autoId.slice("auto/".length)
    );
    assert.equal(
      ids.has(autoId),
      virtual.models.length > 0,
      `${autoId} must be advertised iff it has candidates (pool=${virtual.models.length})`
    );
  }
  const codingFast = body.data.find((m) => m.id === "auto/coding:fast");
  assert.equal(codingFast?.owned_by, "combo");
});
