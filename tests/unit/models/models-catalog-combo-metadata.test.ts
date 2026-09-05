import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-metadata-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "combo-metadata-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const combosDb = await import("../../../src/lib/db/combos.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const contextOverrides = await import("../../../src/lib/db/modelContextOverrides.ts");
const capabilityOverrides = await import("../../../src/lib/db/modelCapabilityOverrides.ts");
const overrideRoute = await import("../../../src/app/api/model-capability-overrides/route.ts");
const catalog = await import("../../../src/app/api/v1/models/catalog.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("single-target combo preserves its direct model metadata", async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-gpt-5.6-single-target-combo",
    accessToken: "codex-test-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await combosDb.createCombo({
    name: "gpt-5.6-sol-combo",
    strategy: "auto",
    models: ["codex/gpt-5.6-sol"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const direct = body.data.find((item) => item.id === "cx/gpt-5.6-sol");
  const combo = body.data.find((item) => item.id === "gpt-5.6-sol-combo");

  assert.equal(response.status, 200);
  assert.ok(direct);
  assert.ok(combo);
  for (const field of [
    "context_length",
    "max_input_tokens",
    "max_output_tokens",
    "input_modalities",
    "output_modalities",
  ]) {
    assert.deepEqual(combo[field], direct[field], field);
  }
  const comboCapabilities = combo.capabilities as Record<string, unknown>;
  assert.equal(comboCapabilities.reasoning, true);
  assert.equal(comboCapabilities.supportsThinking, true);
  assert.equal(
    Object.hasOwn(comboCapabilities, "effort_tiers"),
    false,
    "the combo must not infer adjustable tiers from the Codex model id"
  );
});

test("single-target Codex combo advertises a larger model context override", async () => {
  const modelId = "gpt-5.6-terra";
  const contextWindow = 500000;
  assert.equal(contextOverrides.setModelContextOverride("codex", modelId, contextWindow), true);

  try {
    await providersDb.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: "codex-gpt-5.6-context-override-combo",
      accessToken: "codex-test-token",
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });
    await combosDb.createCombo({
      name: "gpt-5.6-context-override-combo",
      strategy: "auto",
      models: [`codex/${modelId}`],
    });

    const response = await catalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    const body = (await response.json()) as { data: Array<Record<string, unknown>> };
    const direct = body.data.find((item) => item.id === `cx/${modelId}`);
    const combo = body.data.find((item) => item.id === "gpt-5.6-context-override-combo");

    assert.equal(response.status, 200);
    assert.equal(direct?.context_length, contextWindow);
    assert.equal(combo?.context_length, contextWindow);
    // #11179 raised the static codex catalog cap to maxInputTokens=872000 (the real
    // usable window; the old 272000 was just the first pricing tier). The input cap
    // can never exceed the total window, so with the 500K override it clamps to it:
    // min(872000, 500000) = 500000.
    assert.equal(combo?.max_input_tokens, 500000);
  } finally {
    contextOverrides.removeModelContextOverride("codex", modelId);
  }
});

test("single-target combo respects registry reasoning overrides before specs", async () => {
  await providersDb.createProviderConnection({
    provider: "command-code",
    authType: "apikey",
    name: "command-code-gpt-5.4-mini-combo",
    apiKey: "command-code-test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await combosDb.createCombo({
    name: "gpt-5.4-mini-command-code-combo",
    strategy: "auto",
    models: ["command-code/gpt-5.4-mini"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const combo = body.data.find((item) => item.id === "gpt-5.4-mini-command-code-combo");

  assert.equal(response.status, 200);
  assert.ok(combo);
  const capabilities = combo.capabilities as Record<string, unknown>;
  assert.equal(typeof capabilities.reasoning, "boolean");
  assert.equal(typeof capabilities.thinking, "boolean");
  assert.equal(typeof capabilities.supportsThinking, "boolean");
});

test("reasoning_efforts overrides project exact native tiers to direct models and combo intersections", async () => {
  const openaiTarget = "openai/gpt-4o";
  const anthropicTarget = "anthropic/claude-sonnet-4-5";
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(
      openaiTarget,
      "reasoning_efforts",
      "low,max,ultra"
    ),
    true
  );
  assert.equal(
    capabilityOverrides.setModelCapabilityOverride(
      anthropicTarget,
      "reasoning_efforts",
      "medium,max,ultra"
    ),
    true
  );

  try {
    await providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: "reasoning-efforts-openai-combo",
      apiKey: "openai-test-key",
      isActive: true,
      testStatus: "active",
    });
    await providersDb.createProviderConnection({
      provider: "anthropic",
      authType: "apikey",
      name: "reasoning-efforts-anthropic-combo",
      apiKey: "anthropic-test-key",
      isActive: true,
      testStatus: "active",
    });
    await combosDb.createCombo({
      name: "reasoning-efforts-override-combo",
      strategy: "auto",
      models: [openaiTarget, anthropicTarget],
    });

    const response = await catalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    const body = (await response.json()) as { data: Array<Record<string, unknown>> };
    const direct = body.data.find((item) => item.id === openaiTarget);
    const combo = body.data.find((item) => item.id === "reasoning-efforts-override-combo");

    assert.equal(response.status, 200);
    assert.ok(direct);
    assert.ok(combo);
    assert.deepEqual((direct.capabilities as Record<string, unknown>).effort_tiers, [
      "low",
      "max",
      "ultra",
    ]);
    assert.deepEqual((combo.capabilities as Record<string, unknown>).effort_tiers, [
      "max",
      "ultra",
    ]);
  } finally {
    capabilityOverrides.removeModelCapabilityOverride(openaiTarget, "reasoning_efforts");
    capabilityOverrides.removeModelCapabilityOverride(anthropicTarget, "reasoning_efforts");
  }
});

test("compatible provider-node override reaches direct and combo metadata through its public prefix", async () => {
  const nodeId = "openai-compatible-chat-reasoning-override";
  const prefix = "reasoning-override";
  const modelId = "native-reasoning-model";
  await providersDb.createProviderNode({
    id: nodeId,
    type: "openai-compatible",
    prefix,
    name: "Reasoning Override",
    apiType: "chat",
    baseUrl: "https://example.com/v1",
  });
  const connection = await providersDb.createProviderConnection({
    provider: nodeId,
    authType: "api_key",
    name: "reasoning-override-connection",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(nodeId, connection.id, [
    { id: modelId, name: "Native Reasoning Model" },
  ]);

  const patch = await overrideRoute.PATCH(
    new Request("http://localhost/api/model-capability-overrides", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        target: `${prefix}/${modelId}`,
        key: "reasoning_efforts",
        value: "low,max,ultra",
      }),
    })
  );
  assert.equal(patch.status, 200);
  assert.deepEqual(capabilityOverrides.getReasoningEffortsOverride(nodeId, modelId), [
    "low",
    "max",
    "ultra",
  ]);

  await combosDb.createCombo({
    name: "provider-node-reasoning-override-combo",
    strategy: "auto",
    models: [`${prefix}/${modelId}`],
  });
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const direct = body.data.find((item) => item.id === `${prefix}/${modelId}`);
  const combo = body.data.find((item) => item.id === "provider-node-reasoning-override-combo");

  assert.equal(response.status, 200);
  assert.ok(direct);
  assert.ok(combo);
  for (const item of [direct, combo]) {
    assert.deepEqual((item.capabilities as Record<string, unknown>).effort_tiers, [
      "low",
      "max",
      "ultra",
    ]);
  }
});

test("single-target combo reflects unblocked Antigravity Gemini reasoning", async () => {
  await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "antigravity-gemini-reasoning-combo",
    accessToken: "antigravity-test-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await combosDb.createCombo({
    name: "antigravity-gemini-reasoning-combo",
    strategy: "auto",
    models: ["antigravity/gemini-3.1-pro-high"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const combo = body.data.find((item) => item.id === "antigravity-gemini-reasoning-combo");

  assert.equal(response.status, 200);
  assert.ok(combo);
  const capabilities = combo.capabilities as Record<string, unknown>;
  assert.equal(capabilities.reasoning, true);
  assert.equal(capabilities.thinking, true);
  assert.equal(capabilities.supportsThinking, true);
  assert.equal(
    Object.hasOwn(capabilities, "effort_tiers"),
    false,
    "reasoning support alone must not synthesize adjustable tiers"
  );
});

test("malformed connection catalog rows are marked for strict fail-closed consumers", async () => {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("syncedAvailableModels", "malformed-provider:malformed-connection", "{not-json");

  const byConnection = await modelsDb.getSyncedAvailableModelsByConnection("malformed-provider");
  assert.equal(byConnection[modelsDb.SYNCED_AVAILABLE_MODELS_MALFORMED], true);
  assert.deepEqual(Object.keys(byConnection), []);
});

test("dynamic-account combo advertises only efforts shared by every selectable connection", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "grok-cli",
    authType: "oauth",
    name: "grok-4.6-dynamic-first",
    accessToken: "grok-first-token",
    isActive: true,
    testStatus: "active",
  });
  const second = await providersDb.createProviderConnection({
    provider: "grok-cli",
    authType: "oauth",
    name: "grok-4.6-dynamic-second",
    accessToken: "grok-second-token",
    isActive: true,
    testStatus: "active",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("grok-cli", first.id, [
    {
      id: "grok-4.6",
      name: "Grok 4.6",
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection("grok-cli", second.id, [
    {
      id: "grok-4.6",
      name: "Grok 4.6",
      supportedThinkingEfforts: ["medium", "high"],
    },
  ]);
  await combosDb.createCombo({
    name: "grok-dynamic-combo",
    strategy: "auto",
    models: ["grok-cli/grok-4.6"],
  });
  await combosDb.createCombo({
    name: "grok-pinned-combo",
    strategy: "auto",
    models: [
      {
        kind: "model",
        model: "grok-cli/grok-4.6",
        connectionId: first.id,
      },
    ],
  });
  await combosDb.createCombo({
    name: "grok-allowlisted-combo",
    strategy: "auto",
    models: [
      {
        kind: "model",
        model: "grok-cli/grok-4.6",
        allowedConnectionIds: [second.id],
      },
    ],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const capabilitiesFor = (comboId: string) => {
    const combo = body.data.find((item) => item.id === comboId);
    assert.ok(combo, comboId);
    return combo.capabilities as Record<string, unknown>;
  };

  assert.equal(response.status, 200);
  assert.deepEqual(capabilitiesFor("grok-dynamic-combo").effort_tiers, ["medium", "high"]);
  assert.deepEqual(capabilitiesFor("grok-pinned-combo").effort_tiers, ["low", "medium", "high"]);
  assert.deepEqual(capabilitiesFor("grok-allowlisted-combo").effort_tiers, ["medium", "high"]);

  const unknown = await providersDb.createProviderConnection({
    provider: "grok-cli",
    authType: "oauth",
    name: "grok-4.6-unknown-efforts",
    accessToken: "grok-unknown-token",
    isActive: true,
    testStatus: "active",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("grok-cli", unknown.id, [
    { id: "grok-4.6", name: "Grok 4.6" },
  ]);
  await combosDb.createCombo({
    name: "grok-unknown-efforts-combo",
    strategy: "auto",
    models: [
      {
        kind: "model",
        model: "grok-cli/grok-4.6",
        allowedConnectionIds: [first.id, unknown.id],
      },
    ],
  });

  const failClosedResponse = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const failClosedBody = (await failClosedResponse.json()) as {
    data: Array<Record<string, unknown>>;
  };
  const failClosedCombo = failClosedBody.data.find(
    (item) => item.id === "grok-unknown-efforts-combo"
  );
  assert.ok(failClosedCombo);
  assert.equal(
    Object.hasOwn(failClosedCombo.capabilities as Record<string, unknown>, "effort_tiers"),
    false
  );
});

test("provider-node combo intersects connection-scoped efforts behind its public prefix", async () => {
  const nodeId = "openai-compatible-chat-connection-efforts";
  const prefix = "scoped-efforts";
  const modelId = "reasoning-model";
  await providersDb.createProviderNode({
    id: nodeId,
    type: "openai-compatible",
    prefix,
    name: "Scoped Efforts",
    apiType: "chat",
    baseUrl: "https://example.com/v1",
  });
  const first = await providersDb.createProviderConnection({
    provider: nodeId,
    authType: "api_key",
    name: "scoped-efforts-first",
    apiKey: "sk-first",
    isActive: true,
    testStatus: "active",
  });
  const second = await providersDb.createProviderConnection({
    provider: nodeId,
    authType: "api_key",
    name: "scoped-efforts-second",
    apiKey: "sk-second",
    isActive: true,
    testStatus: "active",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(nodeId, first.id, [
    { id: modelId, supportedThinkingEfforts: ["low", "high"] },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(nodeId, second.id, [
    { id: modelId, supportedThinkingEfforts: ["high"] },
  ]);
  await combosDb.createCombo({
    name: "provider-node-efforts-combo",
    strategy: "auto",
    models: [`${prefix}/${modelId}`],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const combo = body.data.find((item) => item.id === "provider-node-efforts-combo");

  assert.equal(response.status, 200);
  assert.ok(combo);
  assert.deepEqual((combo.capabilities as Record<string, unknown>).effort_tiers, ["high"]);
});

test("multi-target combo does not ignore a target with unknown reasoning metadata", async () => {
  await providersDb
    .createProviderConnection({
      provider: "grok-cli",
      authType: "oauth",
      name: "known-target-mixed-combo",
      accessToken: "grok-known-token",
      isActive: true,
      testStatus: "active",
    })
    .then((connection) =>
      modelsDb.replaceSyncedAvailableModelsForConnection("grok-cli", connection.id, [
        {
          id: "grok-4.6",
          supportedThinkingEfforts: ["low", "medium", "high"],
        },
      ])
    );
  await providersDb.createProviderConnection({
    provider: "github",
    authType: "api_key",
    name: "unknown-target-mixed-combo",
    apiKey: "ghp-test",
    isActive: true,
    testStatus: "active",
  });
  await combosDb.createCombo({
    name: "known-and-unknown-efforts-combo",
    strategy: "auto",
    models: ["grok-cli/grok-4.6", "github/catalog-unknown-model"],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const combo = body.data.find((item) => item.id === "known-and-unknown-efforts-combo");

  assert.equal(response.status, 200);
  assert.ok(combo);
  assert.equal(Object.hasOwn(combo.capabilities as Record<string, unknown>, "effort_tiers"), false);
});

test("mixed DeepSeek combos advertise the efforts accepted by every V4 target", async () => {
  await providersDb.createProviderConnection({
    provider: "deepseek",
    authType: "apikey",
    name: "deepseek-v4-combos",
    apiKey: "deepseek-test-key",
    isActive: true,
    testStatus: "active",
  });
  await providersDb.createProviderConnection({
    provider: "opencode-go",
    authType: "apikey",
    name: "opencode-go-deepseek-v4-combos",
    apiKey: "opencode-go-test-key",
    isActive: true,
    testStatus: "active",
  });
  for (const modelId of ["deepseek-v4-flash", "deepseek-v4-pro"]) {
    await combosDb.createCombo({
      name: `${modelId}-combo`,
      strategy: "auto",
      models: [`deepseek/${modelId}`, `opencode-go/${modelId}`],
    });
  }

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };

  assert.equal(response.status, 200);
  for (const modelId of ["deepseek-v4-flash", "deepseek-v4-pro"]) {
    const combo = body.data.find((item) => item.id === `${modelId}-combo`);
    assert.ok(combo);
    assert.deepEqual((combo.capabilities as Record<string, unknown>).effort_tiers, [
      "none",
      "low",
      "high",
      "max",
    ]);
  }
});

test("Ollama Cloud projects native efforts for base, tagged, and combo models", async () => {
  const provider = "ollama-cloud";
  const baseModel = "deepseek-v4-flash";
  const taggedModel = "deepseek-v4-flash:0731";
  const narrowModel = "gpt-oss:20b";
  const nativeEfforts = ["none", "low", "medium", "high", "max"];
  const narrowEfforts = ["low", "medium", "high"];
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: "ollama-cloud-native-efforts",
    apiKey: "ollama-cloud-test-key",
    isActive: true,
    testStatus: "active",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, connection.id, [
    { id: baseModel, name: "DeepSeek V4 Flash", supportsThinking: true },
    { id: taggedModel, name: "DeepSeek V4 Flash 0731", supportsThinking: true },
    {
      id: narrowModel,
      name: "GPT-OSS 20B",
      supportsThinking: true,
      supportedThinkingEfforts: nativeEfforts,
    },
  ]);
  await combosDb.createCombo({
    name: "ollama-cloud-native-efforts-combo",
    strategy: "auto",
    models: [`${provider}/${baseModel}`, `${provider}/${taggedModel}`],
  });
  await combosDb.createCombo({
    name: "ollama-cloud-narrow-efforts-combo",
    strategy: "auto",
    models: [`${provider}/${narrowModel}`],
  });

  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<Record<string, unknown>> };
  const capabilitiesFor = (modelId: string) => {
    const model = body.data.find((item) => item.id === modelId);
    assert.ok(model, modelId);
    return model.capabilities as Record<string, unknown>;
  };

  assert.equal(response.status, 200);
  for (const modelId of [
    `ollamacloud/${baseModel}`,
    `ollamacloud/${taggedModel}`,
    "ollama-cloud-native-efforts-combo",
  ]) {
    const effortTiers = capabilitiesFor(modelId).effort_tiers;
    assert.deepEqual(effortTiers, nativeEfforts, modelId);
    assert.equal((effortTiers as string[]).includes("xhigh"), false, modelId);
  }
  for (const modelId of [`ollamacloud/${narrowModel}`, "ollama-cloud-narrow-efforts-combo"]) {
    assert.deepEqual(capabilitiesFor(modelId).effort_tiers, narrowEfforts, modelId);
  }
});
