import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("model aliases can be created, listed and deleted", async () => {
  await modelsDb.setModelAlias("fast-default", { provider: "openai", model: "gpt-4.1-mini" });
  await modelsDb.setModelAlias("reasoning", { provider: "anthropic", model: "claude-3-7-sonnet" });

  const aliases = await modelsDb.getModelAliases();

  assert.deepEqual(aliases["fast-default"], {
    provider: "openai",
    model: "gpt-4.1-mini",
  });
  assert.deepEqual(aliases.reasoning, {
    provider: "anthropic",
    model: "claude-3-7-sonnet",
  });

  await modelsDb.deleteModelAlias("fast-default");

  assert.equal((await modelsDb.getModelAliases())["fast-default"], undefined);
});

test("MITM aliases support per-tool lookup and aggregated reads", async () => {
  await modelsDb.setMitmAliasAll("cursor", {
    "gpt-4.1": "cursor/gpt-4.1",
  });
  await modelsDb.setMitmAliasAll("codex", {
    "gpt-4.1-mini": "codex/gpt-4.1-mini",
  });

  assert.deepEqual(await modelsDb.getMitmAlias("cursor"), {
    "gpt-4.1": "cursor/gpt-4.1",
  });
  assert.deepEqual(await modelsDb.getMitmAlias(), {
    cursor: { "gpt-4.1": "cursor/gpt-4.1" },
    codex: { "gpt-4.1-mini": "codex/gpt-4.1-mini" },
  });
});

test("custom models can be added once and queried by provider", async () => {
  const created = await modelsDb.addCustomModel(
    "openrouter",
    "anthropic/claude-3.7-sonnet",
    "Claude 3.7 Sonnet",
    "manual",
    "responses",
    ["chat", "responses"]
  );
  const duplicate = await modelsDb.addCustomModel(
    "openrouter",
    "anthropic/claude-3.7-sonnet",
    "Claude 3.7 Sonnet"
  );
  const providerModels = await modelsDb.getCustomModels("openrouter");
  const allModels = await modelsDb.getAllCustomModels();

  assert.equal(duplicate.id, created.id);
  assert.equal(providerModels.length, 1);
  assert.deepEqual(providerModels[0], created);
  assert.equal((allModels.openrouter as any).length, 1);
});

test("replaceCustomModels preserves compat fields and respects the empty-list guard", async () => {
  await modelsDb.addCustomModel("openai", "gpt-4.1", "GPT-4.1");
  await modelsDb.updateCustomModel("openai", "gpt-4.1", {
    normalizeToolCallId: true,
    preserveOpenAIDeveloperRole: false,
    upstreamHeaders: {
      "X-Test": "  enabled  ",
      Host: "should-be-removed",
    },
  });

  const replaced = await modelsDb.replaceCustomModels("openai", [
    {
      id: "gpt-4.1",
      name: "GPT-4.1 Refreshed",
      source: "imported",
      supportsThinking: true,
    },
  ]);
  const guarded = await modelsDb.replaceCustomModels("openai", []);

  assert.equal(replaced[0].compat?.normalizeToolCallId, true);
  assert.equal(replaced[0].compat?.preserveOpenAIDeveloperRole, false);
  assert.deepEqual(replaced[0].compat?.upstreamHeaders, { "X-Test": "enabled" });
  assert.equal(replaced[0].capabilities?.supportsReasoning, true);
  assert.equal((replaced[0].capabilities as any)?.supportsThinking, undefined);
  assert.equal(guarded.length, 1);

  await modelsDb.replaceCustomModels("openai", [], { allowEmpty: true });

  assert.deepEqual(await modelsDb.getCustomModels("openai"), []);
});

test("removing a custom model also removes its compat override", async () => {
  await modelsDb.addCustomModel("anthropic", "claude-3-haiku", "Claude 3 Haiku");
  modelsDb.mergeModelCompatOverride("anthropic", "claude-3-haiku", {
    normalizeToolCallId: true,
    isHidden: true,
  });

  assert.equal(await modelsDb.removeCustomModel("anthropic", "claude-3-haiku"), true);
  assert.equal(await modelsDb.removeCustomModel("anthropic", "claude-3-haiku"), false);
  assert.deepEqual(await modelsDb.getCustomModels("anthropic"), []);
  assert.deepEqual(modelsDb.getModelCompatOverrides("anthropic"), []);
});

test("synced available models are unioned across connections and cleaned per connection", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-a", [
    { id: "gpt-4.1", name: "GPT-4.1", source: "imported" },
    { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", source: "imported" },
  ]);
  const union = await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-b", [
    { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", source: "imported" },
    { id: "o3-mini", name: "o3-mini", source: "imported" },
  ]);
  const remaining = await modelsDb.deleteSyncedAvailableModelsForConnection("openai", "conn-a");
  const allProviders = await modelsDb.getAllSyncedAvailableModels();

  assert.deepEqual(union.map((model) => model.id).sort(), ["gpt-4.1", "gpt-4.1-mini", "o3-mini"]);
  assert.deepEqual(remaining.map((model) => model.id).sort(), ["gpt-4.1-mini", "o3-mini"]);
  assert.deepEqual(allProviders.openai.map((model) => model.id).sort(), [
    "gpt-4.1-mini",
    "o3-mini",
  ]);
});

test("provider-first capability override survives sync and reset returns to baseline", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    {
      id: "provider/model-a",
      name: "Provider Model A",
      source: "imported",
      capabilities: {
        contextWindow: 200000,
        maxOutputTokens: 8192,
        supportsVision: true,
        supportsTools: true,
      },
    },
  ]);

  modelsDb.mergeModelCompatOverride("openrouter", "provider/model-a", {
    capabilities: {
      supportsVision: false,
      supportsReasoning: true,
    },
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    {
      id: "provider/model-a",
      name: "Provider Model A",
      source: "imported",
      capabilities: {
        contextWindow: 256000,
        maxOutputTokens: 16384,
        supportsVision: true,
        supportsTools: true,
      },
    },
  ]);

  let snapshot = modelsDb.getProviderModelConfigSnapshot("openrouter", "provider/model-a");
  assert.equal(snapshot.capabilities?.supportsVision, false);
  assert.equal(snapshot.capabilities?.supportsReasoning, true);
  assert.equal(snapshot.capabilities?.contextWindow, 256000);
  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openrouter",
    model: "provider/model-a",
  });
  assert.equal(runtime.supportsVision, false);
  assert.equal(runtime.supportsThinking, true);
  assert.equal(runtime.contextWindow, 256000);

  const resetModel = await modelsDb.resetProviderModelConfig("openrouter", "provider/model-a");
  const resetCapabilities = (resetModel as any)?.capabilities;
  assert.equal(resetModel?.id, "provider/model-a");
  assert.equal(resetCapabilities?.supportsVision, true);
  assert.equal(resetCapabilities?.maxOutputTokens, 16384);

  snapshot = modelsDb.getProviderModelConfigSnapshot("openrouter", "provider/model-a");
  assert.equal(snapshot.capabilities?.supportsVision, true);
  assert.equal(snapshot.capabilities?.supportsReasoning, undefined);
  assert.equal(snapshot.capabilities?.maxOutputTokens, 16384);
});

test("reset clears deleted synced model marker and immediately restores the model", async () => {
  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    {
      id: "provider/model-deleted",
      name: "Provider Model Deleted",
      source: "imported",
    },
  ]);
  assert.deepEqual(
    (await modelsDb.getSyncedAvailableModels("openrouter")).map((model) => model.id),
    ["provider/model-deleted"]
  );

  modelsDb.mergeModelCompatOverride("openrouter", "provider/model-deleted", {
    isDeleted: true,
    isHidden: true,
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection("openrouter", "conn-a", [
    {
      id: "provider/model-deleted",
      name: "Provider Model Deleted",
      source: "imported",
    },
  ]);
  assert.deepEqual(await modelsDb.getSyncedAvailableModels("openrouter"), []);

  await modelsDb.resetProviderModelConfig("openrouter", "provider/model-deleted");

  assert.deepEqual(
    (await modelsDb.getSyncedAvailableModels("openrouter")).map((model) => model.id),
    ["provider/model-deleted"]
  );
  assert.equal(
    modelsDb
      .getModelCompatOverrides("openrouter")
      .find((model) => model.id === "provider/model-deleted"),
    undefined
  );
});

test("reset clears legacy capability fields when a custom model has no baseline", async () => {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)")
    .run(
      "openrouter",
      JSON.stringify([
        {
          id: "legacy/model",
          name: "Legacy Model",
          source: "manual",
          inputTokenLimit: 32000,
          outputTokenLimit: 4096,
          supportsVision: false,
          supportsTools: false,
          supportsThinking: true,
          targetFormat: "claude",
          unsupportedParams: ["temperature"],
        },
      ])
    );

  let snapshot = modelsDb.getProviderModelConfigSnapshot("openrouter", "legacy/model");
  assert.equal(snapshot.capabilities?.supportsReasoning, true);
  assert.equal(snapshot.capabilities?.contextWindow, 32000);
  assert.equal(snapshot.compat?.targetFormat, "claude");
  assert.deepEqual(snapshot.compat?.unsupportedParams, ["temperature"]);

  await modelsDb.resetProviderModelConfig("openrouter", "legacy/model");

  snapshot = modelsDb.getProviderModelConfigSnapshot("openrouter", "legacy/model");
  assert.equal(snapshot.capabilities, undefined);
  assert.equal(snapshot.compat, undefined);
});

test("reset sanitizes legacy capability fields restored from a custom model baseline", async () => {
  core
    .getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES ('customModels', ?, ?)")
    .run(
      "openrouter",
      JSON.stringify([
        {
          id: "legacy/baseline-model",
          name: "Legacy Baseline Model",
          source: "manual",
          supportsThinking: false,
          capabilities: {
            supportsThinking: false,
            reasoningEfforts: ["low", "max"],
          },
          baseline: {
            id: "legacy/baseline-model",
            name: "Legacy Baseline Model",
            source: "manual",
            supportsThinking: true,
            capabilities: {
              supportsThinking: true,
              reasoningEfforts: ["xhigh"],
            },
          },
        },
      ])
    );

  await modelsDb.resetProviderModelConfig("openrouter", "legacy/baseline-model");

  const [model] = (await modelsDb.getCustomModels("openrouter")) as any[];
  assert.equal(model.supportsThinking, undefined);
  assert.equal(model.reasoningEfforts, undefined);
  assert.equal(model.supportsReasoning, undefined);
  assert.equal(model.capabilities?.supportsThinking, undefined);
  assert.equal(model.capabilities?.reasoningEfforts, undefined);
  assert.equal(model.capabilities?.supportsReasoning, true);
  assert.equal(model.baseline?.supportsThinking, undefined);
  assert.equal(model.baseline?.capabilities?.supportsThinking, undefined);
  assert.equal(model.baseline?.capabilities?.supportsReasoning, true);
});

test("compat overrides expose per-protocol getters and removable extra headers", async () => {
  modelsDb.mergeModelCompatOverride("openai", "gpt-4.1", {
    normalizeToolCallId: true,
    preserveOpenAIDeveloperRole: false,
    isHidden: true,
    upstreamHeaders: {
      "X-Top": "1",
      "bad header": "skip",
    },
    compatByProtocol: {
      openai: {
        normalizeToolCallId: false,
        preserveOpenAIDeveloperRole: true,
        upstreamHeaders: {
          "X-Proto": "yes",
        },
      },
    },
  });

  assert.equal(modelsDb.getModelNormalizeToolCallId("openai", "gpt-4.1"), true);
  assert.equal(modelsDb.getModelNormalizeToolCallId("openai", "gpt-4.1", "openai"), false);
  assert.equal(modelsDb.getModelPreserveOpenAIDeveloperRole("openai", "gpt-4.1"), false);
  assert.equal(modelsDb.getModelPreserveOpenAIDeveloperRole("openai", "gpt-4.1", "openai"), true);
  assert.equal(modelsDb.getModelIsHidden("openai", "gpt-4.1"), true);
  assert.deepEqual(modelsDb.getModelUpstreamExtraHeaders("openai", "gpt-4.1", "openai"), {
    "X-Top": "1",
    "X-Proto": "yes",
  });

  modelsDb.removeModelCompatOverride("openai", "gpt-4.1");

  assert.equal(modelsDb.getModelNormalizeToolCallId("openai", "gpt-4.1"), false);
  assert.deepEqual(modelsDb.getModelCompatOverrides("openai"), []);
});

test("sanitizeUpstreamHeadersMap keeps only safe trimmed headers", () => {
  const sanitized = modelsDb.sanitizeUpstreamHeadersMap({
    "X-First": "  one  ",
    Host: "blocked",
    "Bad Header": "blocked",
    "X-Newline": "bad\nvalue",
    "X-Second": 42,
  });

  assert.deepEqual(sanitized, {
    "X-First": "one",
    "X-Second": "42",
  });
});

test("compat overrides ignore invalid protocol keys and can be fully removed again", () => {
  modelsDb.mergeModelCompatOverride("openai", "gpt-4.1-mini", {
    normalizeToolCallId: true,
    preserveOpenAIDeveloperRole: true,
    isHidden: true,
    upstreamHeaders: {
      "X-Test": "enabled",
      Host: "blocked",
    },
    compatByProtocol: {
      openai: {
        normalizeToolCallId: false,
      },
      invalid: {
        normalizeToolCallId: true,
      },
    },
  });

  let overrides = modelsDb.getModelCompatOverrides("openai");

  assert.equal(overrides.length, 1);
  assert.equal(overrides[0].compatByProtocol.invalid, undefined);
  assert.deepEqual(overrides[0].upstreamHeaders, { "X-Test": "enabled" });

  modelsDb.mergeModelCompatOverride("openai", "gpt-4.1-mini", {
    normalizeToolCallId: false,
    preserveOpenAIDeveloperRole: null,
    isHidden: null,
    upstreamHeaders: null,
    compatByProtocol: {
      openai: {
        upstreamHeaders: {},
      },
    },
  });

  overrides = modelsDb.getModelCompatOverrides("openai");

  assert.deepEqual(overrides, [
    {
      id: "gpt-4.1-mini",
      compatByProtocol: {
        openai: {
          normalizeToolCallId: false,
        },
      },
    },
  ]);
});

test("compat getters fall back to override rows when custom model storage is malformed", async () => {
  await modelsDb.addCustomModel("anthropic", "claude-edge", "Claude Edge");
  await modelsDb.updateCustomModel("anthropic", "claude-edge", {
    normalizeToolCallId: true,
    preserveOpenAIDeveloperRole: false,
    upstreamHeaders: {
      "X-Custom": "top",
    },
    compatByProtocol: {
      openai: {
        normalizeToolCallId: false,
        preserveOpenAIDeveloperRole: true,
        upstreamHeaders: {
          "X-Proto": "proto",
        },
      },
    },
  });

  modelsDb.mergeModelCompatOverride("anthropic", "claude-edge", {
    normalizeToolCallId: true,
    preserveOpenAIDeveloperRole: false,
    isHidden: true,
    upstreamHeaders: {
      "X-Compat": "fallback",
    },
    compatByProtocol: {
      openai: {
        normalizeToolCallId: false,
        preserveOpenAIDeveloperRole: true,
        upstreamHeaders: {
          "X-Compat-Proto": "fallback-proto",
        },
      },
    },
  });

  const db = core.getDbInstance();
  db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'customModels' AND key = ?").run(
    "{not-json",
    "anthropic"
  );

  assert.equal(modelsDb.getModelNormalizeToolCallId("anthropic", "claude-edge", "openai"), false);
  assert.equal(
    modelsDb.getModelPreserveOpenAIDeveloperRole("anthropic", "claude-edge", "openai"),
    true
  );
  assert.equal(modelsDb.getModelIsHidden("anthropic", "claude-edge"), true);
  assert.deepEqual(modelsDb.getModelUpstreamExtraHeaders("anthropic", "claude-edge", "openai"), {
    "X-Compat": "fallback",
    "X-Compat-Proto": "fallback-proto",
  });
});

test("missing alias helpers return empty results for unknown tools and providers", async () => {
  assert.deepEqual(await modelsDb.getMitmAlias("missing-tool"), {});
  assert.deepEqual(await modelsDb.getCustomModels("missing-provider"), []);
  assert.deepEqual(await modelsDb.getAllSyncedAvailableModels(), {});
});
