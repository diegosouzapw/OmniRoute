import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-luna-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-luna-routing-secret";

const core = await import("../../src/lib/db/core.ts");
const rulesDb = await import("../../src/lib/db/reasoningRoutingRules.ts");
const policy = await import("../../src/lib/reasoningRouting/policy.ts");
const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
const { resolveOpencodeTargetFormat } = await import("../../open-sse/executors/opencode.ts");

test.after(() => {
  core.resetDbInstance();
  cleanupTempDataDir(TEST_DATA_DIR);
});

test("opencode-zen gpt-5.6 family routes to openai-responses", () => {
  for (const modelId of ["gpt-5.6-luna", "gpt-5.6-sol", "gpt-5.6-terra"]) {
    assert.equal(
      resolveOpencodeTargetFormat("opencode-zen", modelId),
      "openai-responses",
      `opencode-zen/${modelId} must route to openai-responses`
    );
  }
});

test("github and openai gpt-5.6-luna route to openai-responses", () => {
  assert.equal(
    getModelTargetFormat("openai", "gpt-5.6-luna"),
    "openai-responses",
    "openai/gpt-5.6-luna must route to openai-responses"
  );
  assert.equal(
    getModelTargetFormat("github", "gpt-5.6-luna"),
    "openai-responses",
    "github/gpt-5.6-luna must route to openai-responses"
  );
});

test("reasoning routing policy treats forced max on openai/gpt-5.6-luna as supported", async () => {
  await rulesDb.createReasoningRoutingRule({
    name: "force max on openai luna",
    description: "",
    scope: "model",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "openai/gpt-5.6-luna",
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "max",
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 10,
    enabled: true,
  });

  const decision = await policy.resolveReasoningRoutingRule({
    sourceModel: "openai/gpt-5.6-luna",
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });

  assert.ok(decision, "rule should match openai/gpt-5.6-luna");
  assert.equal(decision.targetEffort, "max");
  assert.equal(
    decision.capability,
    "supported",
    "openai/gpt-5.6-luna must be supported for max effort (not 400 unsupported)"
  );
});

test("reasoning routing policy treats forced ultra on gpt-5.6-luna as unsupported", async () => {
  await rulesDb.createReasoningRoutingRule({
    name: "force ultra on luna",
    description: "",
    scope: "model",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "gpt-5.6-luna",
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "ultra",
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 20,
    enabled: true,
  });

  const decision = await policy.resolveReasoningRoutingRule({
    sourceModel: "gpt-5.6-luna",
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });

  assert.ok(decision, "rule should match gpt-5.6-luna");
  assert.equal(decision.targetEffort, "ultra");
  assert.equal(decision.capability, "unsupported", "gpt-5.6-luna does not support ultra effort");
});

test("reasoning routing policy handles github and codex prefixed luna models", async () => {
  await rulesDb.createReasoningRoutingRule({
    name: "force max on github luna",
    description: "",
    scope: "model",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "github/gpt-5.6-luna",
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "max",
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 30,
    enabled: true,
  });

  const githubDecision = await policy.resolveReasoningRoutingRule({
    sourceModel: "github/gpt-5.6-luna",
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });

  assert.ok(githubDecision, "rule should match github/gpt-5.6-luna");
  assert.equal(githubDecision.targetEffort, "max");
  assert.equal(
    githubDecision.capability,
    "supported",
    "github/gpt-5.6-luna must be supported for max effort"
  );

  await rulesDb.createReasoningRoutingRule({
    name: "force ultra on codex luna",
    description: "",
    scope: "model",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "codex/gpt-5.6-luna",
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "ultra",
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 40,
    enabled: true,
  });

  const codexDecision = await policy.resolveReasoningRoutingRule({
    sourceModel: "codex/gpt-5.6-luna",
    sourceEffort: "missing",
    hasReasoningSignal: false,
  });

  assert.ok(codexDecision, "rule should match codex/gpt-5.6-luna");
  assert.equal(codexDecision.targetEffort, "ultra");
  assert.equal(
    codexDecision.capability,
    "unsupported",
    "codex/gpt-5.6-luna must not support ultra effort"
  );
});
