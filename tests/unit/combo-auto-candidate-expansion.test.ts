import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression coverage for the #3322 auto-combo candidate expansion: an auto-combo
// without an explicit candidatePool broadens its eligible targets to every model
// of every active provider connection (so the router has the full pool to score).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-expand-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combo = await import("../../open-sse/services/combo.ts");
const providerModels = await import("../../open-sse/config/providerModels.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => resetStorage());

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("expandAutoComboCandidatePool adds every model of an active provider when no candidatePool is set", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });

  const expanded = await combo.expandAutoComboCandidatePool([], { config: {} });

  // It should surface at least one openai/<model> target, all well-formed.
  assert.ok(expanded.length > 0, "expected the active provider's models to be expanded in");
  const openaiTargets = expanded.filter((t) => t.provider === "openai");
  assert.ok(openaiTargets.length > 0, "expected openai targets");
  for (const t of openaiTargets) {
    assert.equal(t.kind, "model");
    assert.equal(t.modelStr, `openai/${t.modelStr.split("/").slice(1).join("/")}`);
    assert.equal(t.connectionId, null);
  }
  // Every catalog model for openai should be represented.
  const catalogIds = providerModels.getProviderModels("openai").map((m) => `openai/${m.id}`);
  assert.ok(catalogIds.length > 0);
  for (const id of catalogIds) {
    assert.ok(
      expanded.some((t) => t.modelStr === id),
      `expected expanded targets to include ${id}`
    );
  }
});

test("expandAutoComboCandidatePool is a no-op when an explicit candidatePool exists", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });

  const seed = [
    {
      kind: "model" as const,
      stepId: "openai/gpt-4o",
      executionKey: "openai/gpt-4o",
      modelStr: "openai/gpt-4o",
      provider: "openai",
      providerId: "openai",
      connectionId: null,
      weight: 1,
      label: null,
    },
  ];
  const result = await combo.expandAutoComboCandidatePool(seed, {
    config: { auto: { candidatePool: ["openai"] } },
  });
  assert.equal(result.length, 1, "candidatePool present → no expansion");
  assert.equal(result[0].modelStr, "openai/gpt-4o");
});

test("expandAutoComboCandidatePool falls through to active connections when candidatePool is an empty array", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });

  const expanded = await combo.expandAutoComboCandidatePool([], {
    config: { auto: { candidatePool: [] } },
  });

  // An empty candidatePool should NOT trigger early return — the function
  // should fall through and expand from active connections instead.
  assert.ok(
    expanded.length > 0,
    "expected expansion from active connections despite empty candidatePool"
  );
  const openaiTargets = expanded.filter((t) => t.provider === "openai");
  assert.ok(openaiTargets.length > 0, "expected openai targets to be expanded");
});

test("expandAutoComboCandidatePool does not duplicate an already-present modelStr", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });

  const firstCatalogId = providerModels.getProviderModels("openai")[0]?.id;
  assert.ok(firstCatalogId, "expected at least one openai catalog model");
  const existing = `openai/${firstCatalogId}`;
  const seed = [
    {
      kind: "model" as const,
      stepId: existing,
      executionKey: existing,
      modelStr: existing,
      provider: "openai",
      providerId: "openai",
      connectionId: "conn-1",
      weight: 5,
      label: "pinned",
    },
  ];

  const result = await combo.expandAutoComboCandidatePool(seed, { config: {} });
  const matches = result.filter((t) => t.modelStr === existing);
  assert.equal(matches.length, 1, "the pre-existing target must not be duplicated");
  // …and the original pinned entry (weight 5 / conn-1) is preserved, not overwritten.
  assert.equal(matches[0].connectionId, "conn-1");
  assert.equal(matches[0].weight, 5);
});
