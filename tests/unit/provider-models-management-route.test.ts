import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-management-route-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");
const providerModelsResetRoute = await import("../../src/app/api/provider-models/reset/route.ts");

type ProviderModelRow = {
  id?: string;
  name?: string;
  targetFormat?: string;
  unsupportedParams?: string[];
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  upstreamHeaders?: Record<string, string>;
  compatByProtocol?: Record<
    string,
    {
      normalizeToolCallId?: boolean;
      preserveOpenAIDeveloperRole?: boolean;
      upstreamHeaders?: Record<string, string>;
    }
  >;
  capabilities?: Record<string, unknown>;
  capabilityOverrides?: Record<string, unknown>;
  baseline?: Record<string, unknown>;
  compat?: Record<string, unknown>;
  isHidden?: boolean;
};

type ProviderModelsBody = {
  ok?: boolean;
  updated?: number;
  error?: {
    message?: string;
    type?: string;
  };
  model?: ProviderModelRow;
  models?: ProviderModelRow[];
  modelCompatOverrides?: ProviderModelRow[];
};

async function readProviderModelsBody(response: Response): Promise<ProviderModelsBody> {
  return (await response.json()) as ProviderModelsBody;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function buildPatchRequest(url, body) {
  return new Request(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function buildPostRequest(url, body) {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function buildGetRequest(url) {
  return new Request(url, {
    method: "GET",
  });
}

function buildPutRequest(url, body) {
  return new Request(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("provider-models PATCH updates hidden flag for custom models", async () => {
  await modelsDb.addCustomModel("openai", "gpt-test", "GPT Test", "manual", "chat-completions", [
    "chat",
  ]);

  const response = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=openai&modelId=gpt-test", {
      isHidden: true,
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);

  const models = await modelsDb.getCustomModels("openai");
  assert.equal(models.find((model) => model.id === "gpt-test")?.isHidden, true);
});

test("provider-models PATCH persists visibility overrides for catalog models", async () => {
  modelsDb.mergeModelCompatOverride("claude", "claude-sonnet-4-6", {
    targetFormat: "claude",
    unsupportedParams: ["temperature"],
  });

  const response = await providerModelsRoute.PATCH(
    buildPatchRequest(
      "http://localhost/api/provider-models?provider=claude&modelId=claude-sonnet-4-6",
      { isHidden: true }
    )
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  const responseOverride = body.modelCompatOverrides.find(
    (model) => model.id === "claude-sonnet-4-6"
  );
  assert.equal(responseOverride.isHidden, true);
  assert.deepEqual(responseOverride.compat, {
    targetFormat: "claude",
    unsupportedParams: ["temperature"],
  });
  assert.equal("targetFormat" in responseOverride, false);
  assert.equal("unsupportedParams" in responseOverride, false);

  const overrides = modelsDb.getModelCompatOverrides("claude");
  assert.equal(overrides.find((model) => model.id === "claude-sonnet-4-6")?.isHidden, true);
});

test("provider-models PATCH supports bulk visibility updates", async () => {
  await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      isHidden: true,
      modelIds: ["claude-opus-4-6", "claude-sonnet-4-6"],
    })
  );

  const response = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      isHidden: false,
      modelIds: ["claude-opus-4-6", "claude-sonnet-4-6"],
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.equal(body.updated, 2);

  const overrides = modelsDb.getModelCompatOverrides("claude");
  assert.equal(overrides.find((model) => model.id === "claude-opus-4-6")?.isHidden, false);
  assert.equal(overrides.find((model) => model.id === "claude-sonnet-4-6")?.isHidden, false);
});

test("provider-models PATCH validates required fields", async () => {
  const response = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      modelIds: ["claude-sonnet-4-6"],
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "isHidden boolean is required");
});

test("provider-models write routes reject unknown body fields", async () => {
  const putResponse = await providerModelsRoute.PUT(
    buildPutRequest("http://localhost/api/provider-models", {
      provider: "claude",
      modelId: "claude-sonnet-4-6",
      unexpected: true,
    })
  );
  const putBody = await readProviderModelsBody(putResponse);

  assert.equal(putResponse.status, 400);
  assert.equal(putBody.error.message, "Invalid request");

  const patchResponse = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      isHidden: true,
      modelIds: ["claude-sonnet-4-6"],
      unexpected: true,
    })
  );
  const patchBody = await readProviderModelsBody(patchResponse);

  assert.equal(patchResponse.status, 400);
  assert.equal(patchBody.error.message, "Invalid request");

  const resetResponse = await providerModelsResetRoute.POST(
    buildPostRequest("http://localhost/api/provider-models/reset", {
      provider: "claude",
      modelId: "claude-sonnet-4-6",
      unexpected: true,
    })
  );
  const resetBody = await readProviderModelsBody(resetResponse);

  assert.equal(resetResponse.status, 400);
  assert.equal(resetBody.error.type, "validation_error");
});

test("provider-models reset clears model config overrides but keeps visibility", async () => {
  modelsDb.mergeModelCompatOverride("claude", "claude-sonnet-4-6", {
    isHidden: true,
    capabilities: {
      supportsVision: false,
      supportsReasoning: true,
    },
    targetFormat: "claude",
  });

  const response = await providerModelsResetRoute.POST(
    buildPostRequest("http://localhost/api/provider-models/reset", {
      provider: "claude",
      modelId: "claude-sonnet-4-6",
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.model?.id, "claude-sonnet-4-6");
  assert.equal(body.model?.capabilities?.maxOutputTokens, 64000);
  const responseOverride = body.modelCompatOverrides.find(
    (model) => model.id === "claude-sonnet-4-6"
  );
  assert.equal(responseOverride.isHidden, true);
  assert.equal(responseOverride.compat, undefined);
  assert.equal("targetFormat" in responseOverride, false);

  const override = modelsDb
    .getModelCompatOverrides("claude")
    .find((model) => model.id === "claude-sonnet-4-6");
  assert.equal(override?.isHidden, true);
  assert.equal(override?.capabilities, undefined);
  assert.equal(override?.targetFormat, undefined);
});

test("provider-models PUT accepts nested provider-first compat patches", async () => {
  const response = await providerModelsRoute.PUT(
    buildPutRequest("http://localhost/api/provider-models", {
      provider: "claude",
      modelId: "claude-sonnet-4-6",
      compat: {
        targetFormat: "claude",
        unsupportedParams: ["temperature", "top_p"],
      },
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  const responseOverride = body.modelCompatOverrides.find(
    (model) => model.id === "claude-sonnet-4-6"
  );
  assert.equal(responseOverride.compat.targetFormat, "claude");
  assert.deepEqual(responseOverride.compat.unsupportedParams, ["temperature", "top_p"]);
  assert.equal("targetFormat" in responseOverride, false);

  const override = modelsDb
    .getModelCompatOverrides("claude")
    .find((model) => model.id === "claude-sonnet-4-6");
  assert.equal(override?.targetFormat, "claude");
  assert.deepEqual(override?.unsupportedParams, ["temperature", "top_p"]);
});

test("provider-models POST persists nested provider-first compat config", async () => {
  const response = await providerModelsRoute.POST(
    buildPostRequest("http://localhost/api/provider-models", {
      provider: "openai",
      modelId: "custom-compat-model",
      modelName: "Custom Compat Model",
      compat: {
        targetFormat: "claude",
        unsupportedParams: ["temperature"],
        normalizeToolCallId: true,
        preserveOpenAIDeveloperRole: false,
        upstreamHeaders: {
          "X-Test": "enabled",
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
      },
      capabilities: {
        supportsVision: true,
      },
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.equal(body.model.compat.targetFormat, "claude");
  assert.deepEqual(body.model.compat.unsupportedParams, ["temperature"]);
  assert.equal(body.model.compat.normalizeToolCallId, true);
  assert.equal(body.model.compat.preserveOpenAIDeveloperRole, false);
  assert.deepEqual(body.model.compat.upstreamHeaders, { "X-Test": "enabled" });
  assert.equal(body.model.compat.compatByProtocol.openai.normalizeToolCallId, false);
  assert.equal(body.model.compat.compatByProtocol.openai.preserveOpenAIDeveloperRole, true);
  assert.deepEqual(body.model.compat.compatByProtocol.openai.upstreamHeaders, {
    "X-Proto": "yes",
  });
  assert.equal(body.model.capabilities.supportsVision, true);
});

test("provider-models POST persists initial null capability masks", async () => {
  const response = await providerModelsRoute.POST(
    buildPostRequest("http://localhost/api/provider-models", {
      provider: "openai",
      modelId: "gpt-4.1",
      modelName: "GPT-4.1 Unknown Limits",
      capabilities: {
        contextWindow: null,
        maxInputTokens: null,
        maxOutputTokens: null,
        supportsVision: null,
      },
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.deepEqual(body.model.capabilities, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
    supportsVision: null,
  });
  assert.deepEqual(body.model.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
    supportsVision: null,
  });

  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai",
    model: "gpt-4.1",
  });
  assert.equal(runtime.contextWindow, null);
  assert.equal(runtime.maxOutputTokens, null);
  assert.equal(runtime.supportsVision, null);
});

test("provider-models GET returns explicit null capability markers", async () => {
  await providerModelsRoute.POST(
    buildPostRequest("http://localhost/api/provider-models", {
      provider: "openai",
      modelId: "custom-unknown-model",
      modelName: "Custom Unknown Model",
      capabilities: {
        contextWindow: null,
        maxOutputTokens: null,
        supportsVision: null,
      },
    })
  );

  const response = await providerModelsRoute.GET(
    buildGetRequest("http://localhost/api/provider-models?provider=openai")
  );
  const body = await readProviderModelsBody(response);
  const model = body.models?.find((entry) => entry.id === "custom-unknown-model");

  assert.equal(response.status, 200);
  assert.deepEqual(model?.capabilities, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
    supportsVision: null,
  });
  assert.deepEqual(model?.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
    supportsVision: null,
  });
});

test("provider-models POST keeps nested null masks over top-level alias values", async () => {
  const response = await providerModelsRoute.POST(
    buildPostRequest("http://localhost/api/provider-models", {
      provider: "openai",
      modelId: "gpt-4.1",
      modelName: "GPT-4.1 Conflicting Nulls",
      max_input_tokens: 128000,
      supportsTools: true,
      capabilities: {
        contextWindow: null,
        supportsTools: null,
      },
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.deepEqual(body.model.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    supportsTools: null,
  });

  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai",
    model: "gpt-4.1",
  });
  assert.equal(runtime.contextWindow, null);
  assert.equal(runtime.maxInputTokens, null);
  assert.equal(runtime.supportsTools, null);
});

test("provider-models PUT accepts null capability fields as delete patches", async () => {
  await providerModelsRoute.PUT(
    buildPutRequest("http://localhost/api/provider-models", {
      provider: "claude",
      modelId: "claude-sonnet-4-6",
      capabilities: {
        contextWindow: 200000,
        maxOutputTokens: 8192,
        supportsReasoning: true,
      },
    })
  );

  const response = await providerModelsRoute.PUT(
    buildPutRequest("http://localhost/api/provider-models", {
      provider: "claude",
      modelId: "claude-sonnet-4-6",
      capabilities: {
        contextWindow: null,
        contextLength: null,
        maxInputTokens: null,
        inputTokenLimit: null,
        maxOutputTokens: null,
        outputTokenLimit: null,
      },
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);

  const override = modelsDb
    .getModelCompatOverrides("claude")
    .find((model) => model.id === "claude-sonnet-4-6");
  assert.equal(override?.capabilities?.contextWindow, null);
  assert.equal(override?.capabilities?.maxInputTokens, null);
  assert.equal(override?.capabilities?.maxOutputTokens, null);
  assert.equal(override?.capabilities?.supportsReasoning, true);
});

test("provider-models PUT accepts top-level null token limit masks", async () => {
  const response = await providerModelsRoute.PUT(
    buildPutRequest("http://localhost/api/provider-models", {
      provider: "openai",
      modelId: "gpt-4.1",
      max_input_tokens: null,
      max_output_tokens: null,
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  const responseOverride = body.modelCompatOverrides?.find((model) => model.id === "gpt-4.1");
  assert.deepEqual(responseOverride?.capabilities, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
  });
  assert.deepEqual(responseOverride?.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    maxOutputTokens: null,
  });

  const override = modelsDb
    .getModelCompatOverrides("openai")
    .find((model) => model.id === "gpt-4.1");
  assert.equal(override?.capabilities?.contextWindow, null);
  assert.equal(override?.capabilities?.maxInputTokens, null);
  assert.equal(override?.capabilities?.maxOutputTokens, null);
});

test("provider-models PUT accepts top-level null boolean capability masks", async () => {
  const response = await providerModelsRoute.PUT(
    buildPutRequest("http://localhost/api/provider-models", {
      provider: "openai",
      modelId: "gpt-4.1",
      supportsVision: null,
      supportsXHighEffort: null,
      supportsMaxEffort: null,
    })
  );
  const body = await readProviderModelsBody(response);

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);

  const override = modelsDb
    .getModelCompatOverrides("openai")
    .find((model) => model.id === "gpt-4.1");
  assert.equal(override?.capabilities?.supportsVision, null);
  assert.equal(override?.capabilities?.supportsXHighEffort, null);
  assert.equal(override?.capabilities?.supportsMaxEffort, null);

  const runtime = modelCapabilities.getResolvedModelCapabilities({
    provider: "openai",
    model: "gpt-4.1",
  });
  assert.equal(runtime.supportsVision, null);
  assert.equal(runtime.supportsXHighEffort, null);
  assert.equal(runtime.supportsMaxEffort, null);
});
