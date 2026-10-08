/**
 * Issue #14135 — Combo builder generates qualifiedModel with raw provider node ID
 * instead of configured prefix alias.
 *
 * For custom provider nodes (e.g. "openai-compatible-chat-<uuid>") configured with a
 * prefix alias (e.g. "of"), the combo builder should assign `qualifiedModel: "of/<model>"`
 * so that:
 * 1. The combo step routes properly via the alias prefix.
 * 2. Model catalog and capability resolution (e.g. in /v1/models) looks up the canonical
 *    prefix rather than the raw database node UUID.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-alias-14135-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const nodesDb = await import("../../src/lib/db/providers/nodes.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");
const { buildGlobalModelList, buildManualComboModelStep } =
  await import("../../src/lib/combos/builderDraft.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14135 combo builder uses provider node prefix alias in qualifiedModel", async () => {
  const customNodeId = "openai-compatible-chat-d302c75f-f133-48d3-afa1-066e594e0d29";
  const customAlias = "of";

  // 1. Create custom provider node with alias "of"
  await nodesDb.createProviderNode({
    id: customNodeId,
    type: "openai-compatible",
    name: "OpenAI-Forwarder",
    prefix: customAlias,
    baseUrl: "https://api.example.com/v1",
  });

  // 2. Create a provider connection for this custom node
  await providersDb.createProviderConnection({
    provider: customNodeId,
    authType: "apikey",
    name: "Forwarder Connection",
    apiKey: "sk-test-key",
  });

  // 3. Add custom models under this custom node
  await modelsDb.replaceCustomModels(customNodeId, [
    { id: "MiniMax M3", name: "MiniMax M3" },
    { id: "gpt-4o-custom", name: "Custom GPT-4o" },
  ]);

  // 4. Query combo builder options
  const payload = await getComboBuilderOptions();
  const providerOption = payload.providers.find((p) => p.providerId === customNodeId);

  assert.ok(providerOption, "Custom provider node must appear in combo builder options");
  assert.equal(
    providerOption.alias,
    customAlias,
    "Provider alias must match configured node prefix"
  );
  assert.equal(providerOption.source, "provider-node", "Provider source must be 'provider-node'");

  const miniMaxModel = providerOption.models.find((m) => m.id === "MiniMax M3");
  assert.ok(miniMaxModel, "MiniMax M3 must appear under the custom provider models");
  assert.equal(
    miniMaxModel.qualifiedModel,
    `${customAlias}/MiniMax M3`,
    "qualifiedModel must use alias prefix 'of/' instead of raw node ID"
  );

  const gptModel = providerOption.models.find((m) => m.id === "gpt-4o-custom");
  assert.ok(gptModel, "gpt-4o-custom must appear under custom provider models");
  assert.equal(
    gptModel.qualifiedModel,
    `${customAlias}/gpt-4o-custom`,
    "qualifiedModel must use alias prefix 'of/' instead of raw node ID"
  );

  // 5. Verify buildGlobalModelList builds steps with alias prefix in model
  const globalList = buildGlobalModelList(payload.providers);
  const globalMiniMax = globalList.find(
    (item) => item.providerId === customNodeId && item.modelId === "MiniMax M3"
  );
  assert.ok(globalMiniMax, "MiniMax M3 must be in global model list");
  assert.equal(
    globalMiniMax.step.model,
    `${customAlias}/MiniMax M3`,
    "global search step must serialize model as alias/modelId"
  );
  assert.equal(
    globalMiniMax.step.providerId,
    customNodeId,
    "step providerId must remain canonical node ID"
  );

  // 6. Verify buildManualComboModelStep resolves alias prefix to provider node ID
  const manualStep = buildManualComboModelStep({
    value: `${customAlias}/MiniMax M3`,
    providers: payload.providers,
  });
  assert.ok(manualStep, "Manual step with alias prefix must resolve");
  assert.equal(
    manualStep.providerId,
    customNodeId,
    "Manual step providerId must resolve to customNodeId"
  );
  assert.equal(
    manualStep.model,
    `${customAlias}/MiniMax M3`,
    "Manual step model must retain alias prefix"
  );
});
