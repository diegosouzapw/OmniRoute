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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

test("forced max/ultra is supported when the model declares that effort", async () => {
  const { setModelCapabilityOverride } =
    await import("../../src/lib/db/modelCapabilityOverrides.ts");
  // Synthetic id: no static spec, registry row, or models.dev sync row can
  // exist for it, so capability resolution is deterministic in any environment.
  const model = "custom-provider/test-only-forced-max-model";

  await rulesDb.createReasoningRoutingRule(
    ruleInput({
      name: "force max on declared-vocabulary model",
      scope: "model",
      modelPattern: model,
      effortMode: "force",
      targetEffort: "max",
      priority: 10,
    })
  );

  const beforeDecision = await policy.resolveReasoningRoutingRule({
    sourceModel: model,
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });
  assert.ok(beforeDecision, "rule should match");
  assert.equal(beforeDecision.targetEffort, "max");
  assert.equal(
    beforeDecision.capability,
    "unknown",
    "without declared vocabulary, forced max on a model with no capability data stays unknown (legacy passthrough)"
  );

  // Operator declares the model's real effort vocabulary (what the Model
  // Overrides UI writes via PATCH /api/model-capability-overrides).
  const set = setModelCapabilityOverride(model, "reasoning_efforts", ["low", "high", "max"]);
  assert.equal(set, true, "override must accept a low/high/max vocabulary");

  const afterDecision = await policy.resolveReasoningRoutingRule({
    sourceModel: model,
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });
  assert.equal(
    afterDecision?.capability,
    "supported",
    "declared vocabulary containing max must make forced max supported"
  );

  // Declared vocabulary without max still rejects forced max.
  assert.equal(setModelCapabilityOverride(model, "reasoning_efforts", ["low", "high"]), true);
  const noMaxDecision = await policy.resolveReasoningRoutingRule({
    sourceModel: model,
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });
  assert.equal(
    noMaxDecision?.capability,
    "unsupported",
    "declared vocabulary without max must keep forced max unsupported"
  );
});

test("static registry vocabulary outranks the operator override so the gate matches dispatch clamping", async () => {
  const { setModelCapabilityOverride } =
    await import("../../src/lib/db/modelCapabilityOverrides.ts");
  const { getProviderModels, PROVIDER_ID_TO_ALIAS } =
    await import("@omniroute/open-sse/config/providerModels.ts");

  // Case 1: registry-declared model, operator override WIDENS. The
  // dispatch-time sanitizer ignores DB overrides for registry-declared
  // models, so the gate must reject too. xai/grok-4.6 declares
  // ["low","medium","high","xhigh"] — no max — in the static registry.
  const registeredModel = "xai/grok-4.6";
  // One global force-max rule drives every decision in this test; each case
  // varies only the model and its capability data. Global scope matches any
  // model, so no per-model rule setup is needed.
  await rulesDb.createReasoningRoutingRule(
    ruleInput({
      name: "force max on registered models",
      scope: "global",
      effortMode: "force",
      targetEffort: "max",
      priority: 10,
    })
  );
  assert.ok(
    getProviderModels("xai").some(
      (entry) => entry.id === "grok-4.6" && !entry.supportedThinkingEfforts?.includes("max")
    ),
    "precondition: registry must declare grok-4.6 without max"
  );
  setModelCapabilityOverride(registeredModel, "reasoning_efforts", ["low", "high", "max"]);
  const widened = await policy.resolveReasoningRoutingRule({
    sourceModel: registeredModel,
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });
  assert.ok(widened, "force-max rule on the narrow-vocabulary model must match");
  assert.equal(widened.targetEffort, "max");
  assert.equal(
    widened.capability,
    "unsupported",
    "registry vocabulary without max must keep forced max unsupported even with a widening DB override"
  );

  // Case 2: registry-declared model, operator override NARROWS to exclude
  // max. The override is terminal — the legacy gpt-5.6 regex must not
  // resurrect the tier (grok ids never matched that regex, but the
  // precedence guarantee must not depend on the id shape).
  setModelCapabilityOverride(registeredModel, "reasoning_efforts", ["low", "high"]);
  const narrowed = await policy.resolveReasoningRoutingRule({
    sourceModel: registeredModel,
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });
  assert.equal(
    narrowed?.capability,
    "unsupported",
    "a narrowed operator override is terminal and must not fall through to the legacy regex"
  );

  // Case 3: registry model WITHOUT any declared vocabulary, operator
  // override WIDENS. The sanitizer forwards verbatim for undeclared models
  // (#8057), so the gate must accept. codex entries declare no vocabulary.
  const undeclaredModel = "codex/test-only-undeclared-model";
  assert.ok(
    getProviderModels("codex").every((entry) => !Array.isArray(entry.supportedThinkingEfforts)),
    "precondition: codex entries declare no static effort vocabulary"
  );
  setModelCapabilityOverride(undeclaredModel, "reasoning_efforts", ["low", "high", "max"]);
  const passthrough = await policy.resolveReasoningRoutingRule({
    sourceModel: undeclaredModel,
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });
  assert.ok(passthrough, "force-max rule on the undeclared model must match");
  assert.equal(
    passthrough.capability,
    "supported",
    "undeclared registry model with a widening DB override stays supported (#8057 trust-the-upstream)"
  );

  // Case 4: the alias-resolved namespace. The sanitizer resolves id→alias
  // before reading the provider namespace (#2798), so `cx/<model>` and
  // `codex/<model>` must produce identical verdicts.
  assert.ok(PROVIDER_ID_TO_ALIAS["codex"] === "cx", "precondition: codex aliases to cx");
  const viaAlias = await policy.resolveReasoningRoutingRule({
    sourceModel: "cx/test-only-undeclared-model",
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });
  assert.equal(
    viaAlias?.capability,
    passthrough.capability,
    "alias-spelled provider prefix must resolve to the same registry namespace"
  );

  // Case 5: a narrowing override on a gpt-5.6 id is terminal. The legacy
  // regex matches this exact id shape — without the terminal check it would
  // resurrect forced max the operator explicitly declared away.
  const gpt56Model = "codex/gpt-5.6-sol";
  setModelCapabilityOverride(gpt56Model, "reasoning_efforts", ["low", "high"]);
  const denied56 = await policy.resolveReasoningRoutingRule({
    sourceModel: gpt56Model,
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });
  assert.ok(denied56, "force-max rule on the gpt-5.6 model must match");
  assert.equal(
    denied56.capability,
    "unsupported",
    "operator narrowing override on gpt-5.6 must not be overruled by the legacy regex"
  );
});
