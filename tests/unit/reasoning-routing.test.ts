import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reasoning-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-reasoning-routing-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const rulesDb = await import("../../src/lib/db/reasoningRoutingRules.ts");
const policy = await import("../../src/lib/reasoningRouting/policy.ts");
const schemas = await import("../../src/shared/validation/schemas/reasoningRouting.ts");

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  rulesDb.invalidateReasoningRoutingRuleCache();
}

function ruleInput(
  patch: Partial<rulesDb.ReasoningRoutingRuleInput> = {}
): rulesDb.ReasoningRoutingRuleInput {
  return {
    name: "Test rule",
    description: "",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: null,
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "inherit",
    targetEffort: null,
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 0,
    enabled: true,
    ...patch,
  };
}

test.beforeEach(resetStorage);

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("reasoning intent distinguishes missing, discrete effort, toggle, and budget-only signals", () => {
  assert.deepEqual(policy.extractReasoningIntent("codex/gpt-5.6-sol-high", {}), {
    model: "codex/gpt-5.6-sol",
    effort: "high",
    sourceEffort: "high",
    hasReasoningSignal: true,
    hasThinkingBudget: false,
  });

  const missing = policy.extractReasoningIntent("openai/gpt-4o", {});
  assert.equal(missing.sourceEffort, "missing");
  assert.equal(missing.hasReasoningSignal, false);

  const budgetOnly = policy.extractReasoningIntent("anthropic/claude-opus-4-8", {
    thinking: { type: "enabled", budget_tokens: 4096 },
  });
  assert.equal(budgetOnly.sourceEffort, "signal");
  assert.equal(budgetOnly.hasThinkingBudget, true);

  const disabled = policy.extractReasoningIntent("anthropic/claude-opus-4-8", {
    thinking: { type: "disabled" },
  });
  assert.equal(disabled.sourceEffort, "none");
  assert.equal(disabled.effort, "none");

  const ordinarySuffixedModel = policy.extractReasoningIntent("custom/my-model-high", {});
  assert.equal(ordinarySuffixedModel.model, "custom/my-model-high");
  assert.equal(ordinarySuffixedModel.sourceEffort, "missing");
});

test("glob and tag matching use deterministic scope, priority, and exact-model precedence", async () => {
  const key = await apiKeysDb.createApiKey("Scoped key", "reasoning-test-machine");
  const keyId = String((key as Record<string, unknown>).id);

  const global = await rulesDb.createReasoningRoutingRule(
    ruleInput({ name: "global", priority: 999, targetKind: "model", targetModel: "openai/global" })
  );
  const wildcard = await rulesDb.createReasoningRoutingRule(
    ruleInput({
      name: "wildcard",
      scope: "apiKey",
      apiKeyId: keyId,
      modelPattern: "codex/gpt-*",
      priority: 10,
      requestTags: ["coding", "internal"],
      tagMatchMode: "all",
      targetKind: "model",
      targetModel: "codex/gpt-5.6-terra",
    })
  );
  const exact = await rulesDb.createReasoningRoutingRule(
    ruleInput({
      name: "exact",
      scope: "apiKey",
      apiKeyId: keyId,
      modelPattern: "codex/gpt-5.6-sol",
      priority: 10,
      requestTags: ["coding"],
      targetKind: "model",
      targetModel: "codex/gpt-5.6-luna",
    })
  );

  const decision = await policy.resolveReasoningRoutingRule({
    sourceModel: "codex/gpt-5.6-sol",
    sourceEffort: "missing",
    hasReasoningSignal: false,
    apiKeyId: keyId,
    requestTags: ["INTERNAL", "coding"],
  });

  assert.equal(decision?.rule.id, exact.id);
  assert.notEqual(decision?.rule.id, wildcard.id);
  assert.notEqual(decision?.rule.id, global.id);
  assert.equal(policy.globMatches("codex/gpt-5.?", "codex/gpt-5.6"), true);
});

test("default does not override a budget-only signal and force replaces discrete effort", async () => {
  await rulesDb.createReasoningRoutingRule(
    ruleInput({ effortMode: "default", targetEffort: "high" })
  );
  const budgetOnly = policy.extractReasoningIntent("custom/unknown", {
    thinking: { type: "enabled", budget_tokens: 2048 },
  });
  const defaultDecision = await policy.resolveReasoningRoutingRule({
    sourceModel: budgetOnly.model,
    sourceEffort: budgetOnly.sourceEffort,
    hasReasoningSignal: budgetOnly.hasReasoningSignal,
  });
  assert.equal(defaultDecision?.targetEffort, null);

  const forced = policy.applyReasoningRuleDirective({
    model: "codex/gpt-5.6-sol",
    effort: "low",
    reasoning_effort: "low",
    reasoning: { effort: "low", summary: "auto" },
    thinking: { type: "enabled", budget_tokens: 2048 },
    _omnirouteReasoningRule: {
      id: "force-high",
      effortMode: "force",
      targetEffort: "high",
      budgetAction: "preserve",
      budgetTokens: null,
    },
  }) as Record<string, unknown>;
  assert.equal(forced.reasoning_effort, "high");
  assert.equal(forced.effort, undefined);
  assert.deepEqual(forced.reasoning, { summary: "auto", effort: "high" });
  assert.deepEqual(forced.thinking, { type: "enabled", budget_tokens: 2048 });
  assert.equal(forced._omnirouteReasoningRule, undefined);

  const untouched = { model: "openai/gpt-4o", messages: [] };
  assert.equal(policy.applyReasoningRuleDirective(untouched), untouched);
});

test("CRUD validates references, invalidates cache, and cascades deleted owners", async () => {
  const key = await apiKeysDb.createApiKey("Owner", "reasoning-owner-machine");
  const combo = await combosDb.createCombo({
    name: "reasoning-target",
    models: ["openai/gpt-4o-mini"],
    strategy: "priority",
  });
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Reasoning connection",
    apiKey: "sk-reasoning-test",
  });

  await assert.rejects(
    rulesDb.createReasoningRoutingRule(ruleInput({ scope: "apiKey", apiKeyId: "missing-key" })),
    /API key does not exist/
  );

  const apiRule = await rulesDb.createReasoningRoutingRule(
    ruleInput({ scope: "apiKey", apiKeyId: String((key as Record<string, unknown>).id) })
  );
  const comboRule = await rulesDb.createReasoningRoutingRule(
    ruleInput({ scope: "combo", comboId: String((combo as Record<string, unknown>).id) })
  );
  const connectionRule = await rulesDb.createReasoningRoutingRule(
    ruleInput({
      scope: "connection",
      connectionId: String((connection as Record<string, unknown>).id),
    })
  );
  assert.equal((await rulesDb.getReasoningRoutingRules()).length, 3);

  await rulesDb.updateReasoningRoutingRule(apiRule.id, { priority: 42 });
  assert.equal((await rulesDb.getReasoningRoutingRuleById(apiRule.id))?.priority, 42);

  await apiKeysDb.deleteApiKey(String((key as Record<string, unknown>).id));
  await combosDb.deleteCombo(String((combo as Record<string, unknown>).id));
  await providersDb.deleteProviderConnection(String((connection as Record<string, unknown>).id));
  assert.equal(await rulesDb.getReasoningRoutingRuleById(apiRule.id), null);
  assert.equal(await rulesDb.getReasoningRoutingRuleById(comboRule.id), null);
  assert.equal(await rulesDb.getReasoningRoutingRuleById(connectionRule.id), null);
  assert.equal((await rulesDb.getReasoningRoutingRules()).length, 0);
});

test("schema rejects connection reroutes and none with a fixed budget", () => {
  const connectionReroute = schemas.createReasoningRoutingRuleSchema.safeParse({
    ...ruleInput(),
    scope: "connection",
    connectionId: "connection-id",
    targetKind: "model",
    targetModel: "openai/gpt-4o",
  });
  assert.equal(connectionReroute.success, false);

  const noneWithBudget = schemas.createReasoningRoutingRuleSchema.safeParse({
    ...ruleInput(),
    effortMode: "force",
    targetEffort: "none",
    budgetAction: "set",
    budgetTokens: 1024,
  });
  assert.equal(noneWithBudget.success, false);
});
