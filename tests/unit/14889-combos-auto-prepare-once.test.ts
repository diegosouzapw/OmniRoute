/**
 * #14889 — GET /api/combos/auto must build the candidate pool once per request.
 *
 * The route lists every auto variant (bare "auto", the named variants, template,
 * suffix and family variants) and called createVirtualAutoCombo() for each one.
 * createVirtualAutoCombo() runs prepareVirtualAutoComboInputs() every time, so one
 * request rebuilt the whole candidate pool once per variant. On a real install that
 * made the endpoint take tens of seconds and hold the event loop the whole time.
 *
 * Pool preparation yields to the event loop (setImmediate) every few candidates and
 * nothing else on this path does, so counting setImmediate calls measures how much
 * preparation a request did. mock.module() is not usable under this tsx/ESM runner.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14889-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "combos-auto-14889-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const combosAutoRoute = await import("../../src/app/api/combos/auto/route.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

async function countDbReads(
  fn: () => Promise<unknown>
): Promise<{ syncedReads: number; capabilityReads: number; overrideReads: number }> {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { all: (...args: unknown[]) => unknown[] };
  };
  const realPrepare = db.prepare.bind(db);
  let syncedReads = 0;
  let capabilityReads = 0;
  let overrideReads = 0;
  db.prepare = ((sql: string, ...rest: unknown[]) => {
    if (typeof sql === "string") {
      if (sql.includes("syncedAvailableModels")) syncedReads++;
      if (sql.includes("model_capabilities")) capabilityReads++;
      if (
        sql.includes("model_capability_overrides") ||
        sql.includes("model_context_overrides") ||
        sql.includes("customModels") ||
        sql.includes("modelCompatOverrides")
      )
        overrideReads++;
    }
    return (realPrepare as (...a: unknown[]) => unknown)(sql, ...rest);
  }) as typeof db.prepare;
  try {
    await fn();
  } finally {
    db.prepare = realPrepare;
  }
  return { syncedReads, capabilityReads, overrideReads };
}

function sorted<T>(values: readonly T[]): T[] {
  return [...values].sort();
}

function normalizeCombo(combo: {
  candidatePool?: unknown;
  candidateCount?: unknown;
  context_length?: unknown;
  max_output_tokens?: unknown;
  config?: { auto?: { candidatePool?: unknown } };
}) {
  return {
    candidatePool: sorted((combo.candidatePool ?? []) as string[]),
    candidateCount: combo.candidateCount,
    context_length: combo.context_length,
    max_output_tokens: combo.max_output_tokens,
    autoPool: sorted((combo.config?.auto?.candidatePool ?? []) as string[]),
  };
}

async function countYields(fn: () => Promise<unknown>): Promise<number> {
  const realSetImmediate = globalThis.setImmediate;
  let count = 0;
  globalThis.setImmediate = ((...args: Parameters<typeof setImmediate>) => {
    count++;
    return realSetImmediate(...args);
  }) as typeof setImmediate;
  try {
    await fn();
  } finally {
    globalThis.setImmediate = realSetImmediate;
  }
  return count;
}

test("GET /api/combos/auto prepares the candidate pool once, not once per variant", async () => {
  await settingsDb.updateSettings({ requireLogin: false });
  // Enough API-key providers that a single pool preparation yields at least once.
  for (const provider of ["openai", "anthropic", "gemini", "groq", "deepseek", "mistral"]) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-test-14889-${provider}`,
      name: `test-14889-${provider}`,
      isActive: true,
    });
  }

  const onePreparation = await countYields(() =>
    virtualFactory.prepareVirtualAutoComboInputs({ includeResolvedCapabilities: true })
  );
  assert.ok(onePreparation > 0, "the seeded pool should be large enough to yield while preparing");

  let combos: Array<{ id: string }> = [];
  const routeYields = await countYields(async () => {
    const res = await combosAutoRoute.GET(new Request("http://localhost/api/combos/auto"));
    combos = (await res.json()).combos;
  });

  assert.ok(combos.length > 1, "the route should list several auto variants");
  assert.equal(
    routeYields,
    onePreparation,
    `listing ${combos.length} variants should prepare the pool once`
  );
});

test("GET /api/combos/auto keeps capability reads bounded by a constant", async () => {
  const reads = await countDbReads(async () => {
    const res = await combosAutoRoute.GET(new Request("http://localhost/api/combos/auto"));
    const body = (await res.json()) as { combos: Array<{ id: string }> };
    assert.ok(body.combos.length > 1, "the route should list several auto variants");
  });
  // Snapshot reads stay request-scoped: one bulk read per table (the six
  // loads of createModelCapabilityResolutionSnapshot), plus one synced /
  // custom row per connected provider. Per-candidate resolution then runs
  // in memory against the snapshot — nothing on this path issues a read per
  // candidate per variant, unlike the on-demand path pinned below.
  //
  // The custom-model vision override keeps one exact row read per provider
  // even with a snapshot (only path-shaped ids scan the bulk map), so the
  // override bound scales with the connected provider count, not with
  // candidates times variants.
  const PROVIDER_COUNT = 6;
  assert.ok(
    reads.syncedReads <= 2 * PROVIDER_COUNT,
    `synced model reads should be bounded, saw ${reads.syncedReads}`
  );
  assert.ok(
    reads.capabilityReads <= 2,
    `capability table reads should be bounded, saw ${reads.capabilityReads}`
  );
  assert.ok(
    reads.overrideReads <= 2 * PROVIDER_COUNT,
    `override reads should be bounded, saw ${reads.overrideReads}`
  );
});

test("without resolved capabilities the same request reads per candidate", async () => {
  const reads = await countDbReads(async () => {
    const prepared = await virtualFactory.prepareVirtualAutoComboInputs();
    const { AUTO_SUFFIX_VARIANTS } =
      await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
    const { parseAutoSuffix } =
      await import("../../open-sse/services/autoCombo/suffixComposition.ts");
    for (const modelStr of AUTO_SUFFIX_VARIANTS.slice(0, 3)) {
      const parsed = parseAutoSuffix(modelStr.slice("auto/".length));
      if (!parsed.valid) continue;
      await virtualFactory.createVirtualAutoComboFromPrepared(prepared, undefined, {
        category: parsed.category,
        tier: parsed.tier,
      });
    }
  });
  // #15378 memoized the synced vision verdict behind the catalog version, so the
  // synced catalog is no longer re-read per candidate on this path either (it
  // stays within the same per-provider bound as the snapshot route). The
  // capability and override tables are still resolved on demand per candidate,
  // which is the contrast with the bounded snapshot path pinned above.
  const PROVIDER_COUNT = 6;
  assert.ok(
    reads.syncedReads <= 2 * PROVIDER_COUNT,
    `synced model reads should stay memoized (#15378), saw ${reads.syncedReads}`
  );
  assert.ok(
    reads.capabilityReads > 50,
    `on-demand resolution should read capabilities per candidate, saw ${reads.capabilityReads}`
  );
  assert.ok(
    reads.overrideReads > 50,
    `on-demand resolution should read overrides per candidate, saw ${reads.overrideReads}`
  );
});

test("vision filter parity holds for the pre-resolved branch", async () => {
  const { buildAutoCandidateFilter } =
    await import("../../open-sse/services/autoCombo/suffixComposition.ts");
  const filter = buildAutoCandidateFilter("vision");
  assert.ok(filter, "vision category should build a filter");
  // Same verdict as the on-demand branch: a pre-resolved vision flag must not
  // admit a model the vision bridge claims. This mirrors the vitest suite
  // under the runner the gate uses, so the red proof counts.
  const forced = [
    { provider: "opencode-go", model: "deepseek-v4-flash" },
    { provider: "opencode-go", model: "deepseek-v4-pro" },
    { provider: "opencode-zen", model: "deepseek-v4-flash" },
  ];
  for (const candidate of forced) {
    assert.equal(filter?.({ ...candidate, resolvedSupportsVision: true }), false);
    assert.equal(filter?.({ ...candidate, resolvedSupportsVision: true }), filter?.(candidate));
  }
});

test("resolved capabilities keep the listed response identical (as sets)", async () => {
  // One variant without spec, one vision suffix parsed from the real variant
  // list (the parity filter path, category + tier combined) and one family
  // variant from the real family list — the route exercises all three shapes.
  const { AUTO_SUFFIX_VARIANTS } =
    await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
  const { AUTO_FAMILY_IDS } = await import("../../open-sse/services/autoCombo/modelFamily.ts");
  const { parseAutoSuffix } =
    await import("../../open-sse/services/autoCombo/suffixComposition.ts");
  const visionSuffix = AUTO_SUFFIX_VARIANTS.find((id) => id.includes("vision"));
  assert.ok(visionSuffix, "the variant list should include a vision suffix");
  const parsedVision = parseAutoSuffix(visionSuffix.slice("auto/".length));
  assert.ok(parsedVision.valid, `${visionSuffix} should parse as a suffix`);
  const familyId = AUTO_FAMILY_IDS[0];
  assert.ok(familyId, "the family list should not be empty");
  const { buildFamilyCandidateFilter } =
    await import("../../open-sse/services/autoCombo/modelFamily.ts");
  const family = familyId.slice("auto/".length);
  assert.ok(
    buildFamilyCandidateFilter(family as "glm"),
    `${familyId} should build a family filter`
  );
  const cases = [
    { variant: undefined, spec: undefined },
    {
      variant: undefined,
      spec: { category: parsedVision.category, tier: parsedVision.tier },
    },
    { variant: undefined, spec: { family: family as "glm" } },
  ];
  const oldPrepared = await virtualFactory.prepareVirtualAutoComboInputs();
  const newPrepared = await virtualFactory.prepareVirtualAutoComboInputs({
    includeResolvedCapabilities: true,
  });
  for (const c of cases) {
    const oldVirtual = await virtualFactory.createVirtualAutoComboFromPrepared(
      oldPrepared,
      c.variant,
      c.spec
    );
    const newVirtual = await virtualFactory.createVirtualAutoComboFromPrepared(
      newPrepared,
      c.variant,
      c.spec
    );
    assert.deepEqual(
      normalizeCombo({
        candidatePool: newVirtual.candidatePool,
        candidateCount: newVirtual.candidatePool?.length,
        context_length: newVirtual.advertisedContextLength,
        max_output_tokens: newVirtual.advertisedMaxOutputTokens,
        config: { auto: { candidatePool: newVirtual.candidatePool } },
      }),
      normalizeCombo({
        candidatePool: oldVirtual.candidatePool,
        candidateCount: oldVirtual.candidatePool?.length,
        context_length: oldVirtual.advertisedContextLength,
        max_output_tokens: oldVirtual.advertisedMaxOutputTokens,
        config: { auto: { candidatePool: oldVirtual.candidatePool } },
      })
    );
  }
  // The prepared pool carries the resolved fields through the clone.
  const sample = newPrepared.regularCandidates[0];
  assert.ok(sample, "the seeded pool should not be empty");
  assert.notEqual(sample.resolvedContextLength, undefined);
  assert.notEqual(sample.resolvedMaxOutputTokens, undefined);
  assert.notEqual(sample.resolvedSupportsVision, undefined);
  assert.notEqual(sample.resolvedReasoning, undefined);
  assert.notEqual(sample.resolvedSupportsThinking, undefined);
});

test("preparation stays resilient for a model missing from every source", async () => {
  const prepared = await virtualFactory.prepareVirtualAutoComboInputs({
    includeResolvedCapabilities: true,
  });
  assert.ok(prepared.regularCandidates.length > 0);
  // A provider with no synced row answers the same null verdict on both
  // branches: the snapshot holds no row, the on-demand read finds none.
  const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
  const probe = { provider: "no-such-provider-14889", model: "no-such-model-14889" };
  const fromSnapshot = getResolvedModelCapabilities(
    probe,
    undefined,
    // The prepared snapshot carries the same empty verdict for unknown rows.
    (
      await import("../../src/lib/modelCapabilityResolutionSnapshot.ts")
    ).createModelCapabilityResolutionSnapshot()
  );
  const onDemand = getResolvedModelCapabilities(probe);
  assert.equal(fromSnapshot.supportsVision, onDemand.supportsVision);
  assert.equal(fromSnapshot.contextWindow, onDemand.contextWindow);
  for (const candidate of prepared.regularCandidates) {
    assert.equal(typeof candidate.provider, "string");
    assert.equal(typeof candidate.model, "string");
  }
  // An empty pool answers null limits, the same verdict as the on-demand path.
  const { computeAdvertisedLimits } = virtualFactory;
  assert.deepEqual(computeAdvertisedLimits([]), {
    contextLength: null,
    maxOutputTokens: null,
  });
});
