import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

// Reasoning-routing rules decided which Codex models accept `max` / `ultra` with a
// hard-coded gpt-5.6 regex, so GPT-6 models the Codex executor already serves at
// those tiers were read as unsupported: a rule forcing `max` dropped cx/gpt-6-astra
// from its target combo (or rejected it as a single target), and cx/gpt-6-astra-max
// was not read as a max request. The gate now reads the executor's alias sets
// (open-sse/executors/codex/reasoningSuffix.ts).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reasoning-extended-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const rulesDb = await import("../../src/lib/db/reasoningRoutingRules.ts");
const policy = await import("../../src/lib/reasoningRouting/policy.ts");
const { CODEX_MAX_ALIAS_MODELS, CODEX_ULTRA_ALIAS_MODELS } =
  await import("../../open-sse/executors/codex/reasoningSuffix.ts");
const { codexModelFamilySupportsExtendedEffort, isCodexExtendedEffortBaseModel } =
  await import("../../src/shared/reasoning/codexExtendedEffort.ts");

const ALIAS_MODELS = new Set([...CODEX_MAX_ALIAS_MODELS, ...CODEX_ULTRA_ALIAS_MODELS]);

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  rulesDb.invalidateReasoningRoutingRuleCache();
}

function forcedRule(
  targetEffort: "max" | "ultra",
  target: { targetKind: "model" | "combo"; targetModel?: string; targetComboId?: string }
): rulesDb.ReasoningRoutingRuleInput {
  return {
    name: `force ${targetEffort}`,
    description: "",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "reasoning-source",
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort,
    targetKind: target.targetKind,
    targetModel: target.targetModel ?? null,
    targetComboId: target.targetComboId ?? null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 0,
    enabled: true,
  };
}

async function decide(rule: rulesDb.ReasoningRoutingRuleInput) {
  await rulesDb.createReasoningRoutingRule(rule);
  const decision = await policy.resolveReasoningRoutingRule({
    sourceModel: "reasoning-source",
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });
  assert.ok(decision, "the forced rule must match");
  return decision;
}

async function removedFromCombo(models: string[], targetEffort: "max" | "ultra") {
  const combo = await combosDb.createCombo({
    name: "extended-effort-target",
    models,
    strategy: "priority",
  });
  const decision = await decide(
    forcedRule(targetEffort, { targetKind: "combo", targetComboId: String(combo.id) })
  );
  return policy.filterComboForReasoningDecision(decision.targetCombo, decision).removed;
}

test.beforeEach(resetStorage);

test.after(async () => {
  resetStorage();
  await cleanupTempDataDir(TEST_DATA_DIR);
});

test("forced max keeps GPT-6 Astra in a Codex combo", async () => {
  assert.deepEqual(
    await removedFromCombo(["cx/gpt-6-astra", "codex/gpt-6-astra-high", "cx/gpt-5.6-sol"], "max"),
    []
  );
});

test("forced ultra keeps GPT-6 Astra and still drops max-only models", async () => {
  assert.deepEqual(await removedFromCombo(["cx/gpt-6-astra", "cx/gpt-5.6-luna"], "ultra"), [
    "cx/gpt-5.6-luna",
  ]);
});

test("forced max/ultra on a single GPT-6 Astra target is supported", async () => {
  for (const effort of ["max", "ultra"] as const) {
    resetStorage();
    const decision = await decide(
      forcedRule(effort, { targetKind: "model", targetModel: "cx/gpt-6-astra" })
    );
    assert.equal(decision.capability, "supported", effort);
  }
});

test("every Codex max/ultra alias model passes the gate for its tiers", async () => {
  const maxModels = [...CODEX_MAX_ALIAS_MODELS].map((model) => `cx/${model}`);
  assert.deepEqual(await removedFromCombo(maxModels, "max"), []);

  resetStorage();
  const allModels = [...ALIAS_MODELS];
  const notUltra = allModels
    .filter((model) => !CODEX_ULTRA_ALIAS_MODELS.has(model))
    .map((model) => `cx/${model}`);
  assert.deepEqual(
    await removedFromCombo(
      allModels.map((model) => `cx/${model}`),
      "ultra"
    ),
    notUltra
  );
});

test("max/ultra suffixes on GPT-6 Astra are read as the requested effort", () => {
  for (const effort of ["max", "ultra"] as const) {
    const intent = policy.extractReasoningIntent(`cx/gpt-6-astra-${effort}`, {});
    assert.equal(intent.model, "cx/gpt-6-astra");
    assert.equal(intent.effort, effort);
    assert.equal(intent.sourceEffort, effort);
  }
});

test("suffix parsing follows the alias sets for every model", () => {
  for (const model of ALIAS_MODELS) {
    for (const effort of ["max", "ultra"] as const) {
      const supported = (
        effort === "ultra" ? CODEX_ULTRA_ALIAS_MODELS : CODEX_MAX_ALIAS_MODELS
      ).has(model);
      const intent = policy.extractReasoningIntent(`codex/${model}-${effort}`, {});
      assert.equal(intent.effort, supported ? effort : null, `${model}-${effort}`);
      assert.equal(
        intent.model,
        supported ? `codex/${model}` : `codex/${model}-${effort}`,
        `${model}-${effort}`
      );
    }
  }
});

test("suffix parsing needs the exact base model", () => {
  for (const model of ["cx/gpt-6-astra-high-max", "cx/gpt-6-astral-max"]) {
    const intent = policy.extractReasoningIntent(model, {});
    assert.equal(intent.model, model);
    assert.equal(intent.effort, null);
  }
});

test("model helpers match whole Codex model ids", () => {
  assert.equal(isCodexExtendedEffortBaseModel("CX/GPT-6-Astra", "ultra"), true);
  assert.equal(isCodexExtendedEffortBaseModel("cx/gpt-6-astra-high", "max"), false);
  assert.equal(codexModelFamilySupportsExtendedEffort("gpt-6-astra", "max"), true);
  assert.equal(codexModelFamilySupportsExtendedEffort(" CX/GPT-6-Astra-High ", "ultra"), true);
  assert.equal(codexModelFamilySupportsExtendedEffort("gpt-6-astral", "max"), false);
  assert.equal(codexModelFamilySupportsExtendedEffort("openai/gpt-6-astra", "max"), false);
  assert.equal(codexModelFamilySupportsExtendedEffort("cx/gpt-5.6-luna", "ultra"), false);
  assert.equal(codexModelFamilySupportsExtendedEffort("", "max"), false);
});
