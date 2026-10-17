/**
 * An `auto/*` request prepares the pool with resolved capabilities.
 *
 * The request path (`resolveModelOrError` and the auto-routing wrapper) built
 * the candidate pool without `includeResolvedCapabilities`, so capability and
 * override tables were re-read per candidate on every request. Preparing once
 * with a snapshot bounds those reads by a constant, like the combos/auto
 * route.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-req-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "auto-req-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");

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

const PROVIDERS = ["openai", "anthropic", "gemini", "groq", "deepseek", "mistral"];

async function seedProviders() {
  await settingsDb.updateSettings({ requireLogin: false });
  for (const provider of PROVIDERS) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-test-auto-req-${provider}`,
      name: `test-auto-req-${provider}`,
      isActive: true,
    });
  }
}

function sorted<T>(values: readonly T[]): T[] {
  return [...values].sort();
}

test("request auto/coding on test db, syncedAvailableModels read counter is bounded", async () => {
  await seedProviders();
  const reads = await countDbReads(async () => {
    const result = await resolveModelOrError(
      "auto/coding",
      { messages: [{ role: "user", content: "hi" }] },
      "/v1/chat/completions"
    );
    assert.equal(result.error, undefined);
    assert.ok(result.combo);
  });
  assert.ok(
    reads.syncedReads <= 2 * PROVIDERS.length,
    `synced model reads should be bounded, saw ${reads.syncedReads}`
  );
  assert.ok(
    reads.capabilityReads <= 2,
    `capability table reads should be bounded, saw ${reads.capabilityReads}`
  );
  // One bulk read per override table plus one custom-model row per connected
  // provider: the bound scales with the provider count, not with candidates.
  assert.ok(
    reads.overrideReads <= 3 * PROVIDERS.length,
    `override reads should be bounded, saw ${reads.overrideReads}`
  );
});

test("same request without the change reads per candidate", async () => {
  const { createBuiltinAutoCombo } =
    await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
  const reads = await countDbReads(async () => {
    await createBuiltinAutoCombo("auto/coding", "coding");
  });
  assert.ok(
    reads.capabilityReads > 50,
    `on-demand resolution should read capabilities per candidate, saw ${reads.capabilityReads}`
  );
  assert.ok(
    reads.overrideReads > 50,
    `on-demand resolution should read overrides per candidate, saw ${reads.overrideReads}`
  );
});

test("same request before and after on test db serves the same targets as sets", async () => {
  const { createBuiltinAutoCombo, prepareBuiltinAutoComboInputs } =
    await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
  const oldVirtual = await createBuiltinAutoCombo("auto/coding", "coding");
  const prepared = await prepareBuiltinAutoComboInputs();
  const newVirtual = await createBuiltinAutoCombo("auto/coding", "coding", prepared);
  assert.deepEqual(sorted(newVirtual.candidatePool ?? []), sorted(oldVirtual.candidatePool ?? []));
});

test("forced model at the vision bridge keeps an identical verdict on both branches", async () => {
  const { buildAutoCandidateFilter } =
    await import("../../open-sse/services/autoCombo/suffixComposition.ts");
  const filter = buildAutoCandidateFilter("vision");
  assert.ok(filter, "vision category should build a filter");
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

test("auto request with no connected candidate keeps the existing 503", async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  const result = await resolveModelOrError(
    "auto/coding:pro",
    { messages: [{ role: "user", content: "hi" }] },
    "/v1/chat/completions"
  );
  assert.ok(result.error, "expected an error result, not a combo");
  assert.equal(result.error.status, 503, "empty auto pool must fail fast with 503");
  assert.equal(result.combo, undefined, "must not return a combo for an empty pool");
  await seedProviders();
});

test("auto-routing wrapper request on test db reads bounded with snapshot", async () => {
  const { resolveAutoRoutingState, createVirtualAutoCombo } =
    await import("../../src/sse/handlers/autoRouting.ts");
  const state = await resolveAutoRoutingState("auto/coding");
  assert.ok(state.isAutoRouting, "auto/coding should route through the wrapper");
  const reads = await countDbReads(async () => {
    const combo = await createVirtualAutoCombo(state, null);
    assert.ok(combo && !(combo instanceof Response));
  });
  assert.ok(
    reads.capabilityReads <= 2,
    `capability table reads should be bounded, saw ${reads.capabilityReads}`
  );
  assert.ok(
    reads.overrideReads <= 3 * PROVIDERS.length,
    `override reads should be bounded, saw ${reads.overrideReads}`
  );
});
