import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dashscope-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const ALIBABA_MODEL_STUDIO_MODEL_IDS = [
  "qwen3.7-max",
  "qwen3.7-plus",
  "qwen3.6-plus",
  "qwen3.6-27b",
  "qwen3.6-35b-a3b",
  "qwen3.5-plus",
  "qwen3.5-122b-a10b",
  "qwen3.5-397b-a17b",
  "glm-5.2",
  "glm-5.2-fast-preview",
  "deepseek-v4-pro",
  "deepseek-v4-flash",
  "kimi-k2.7-code",
];

const QWEN_CLOUD_TEXT_MODEL_IDS = [
  "qwen3.7-max-2026-06-08",
  "qwen3.7-plus",
  "qwen3.6-plus",
  "qwen3.6-27b",
  "qwen3.6-35b-a3b",
  "qwen3.5-plus-2026-04-20",
  "qwen3.5-122b-a10b",
  "qwen3.5-397b-a17b",
  "glm-5.2",
  "glm-5.2-fast-preview",
  "deepseek-v4-pro",
  "deepseek-v4-flash",
  "kimi-k2.7-code",
];

const ALL_DASHSCOPE_TEXT_MODEL_IDS = [
  ...QWEN_CLOUD_TEXT_MODEL_IDS,
  ...ALIBABA_MODEL_STUDIO_MODEL_IDS,
  "qwen3-coder-next",
  "qwen-mt-plus",
  "MiniMax-M2.5",
];
const UPSTREAM_TEXT_MODEL_IDS = [...ALL_DASHSCOPE_TEXT_MODEL_IDS].reverse();

const MIXED_DASHSCOPE_MODELS = [
  ...UPSTREAM_TEXT_MODEL_IDS.map((id) => ({
    id,
    object: "model",
    owned_by: "system",
  })),
  { id: "qwen-image-2.0-pro", object: "model", owned_by: "system" },
  { id: "wan2.7-image-pro", object: "model", owned_by: "system" },
  { id: "qwen3-tts-flash", object: "model", owned_by: "system" },
  { id: "qwen3-asr-flash", object: "model", owned_by: "system" },
  { id: "qwen3.5-omni-plus", object: "model", owned_by: "system" },
  { id: "qwen3-vl-plus", object: "model", owned_by: "system" },
  { id: "qwen3-rerank", object: "model", owned_by: "system" },
  { id: "text-embedding-v4", object: "model", owned_by: "system" },
  { id: "qvq-max", object: "model", owned_by: "system" },
  { id: "ccai-pro", object: "model", owned_by: "system" },
];

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function assertTextOnlyDiscovery({
  provider,
  region,
  expectedUrl,
  expectedModelIds,
}: {
  provider: "alibaba" | "alibaba-cn" | "qwen-cloud";
  region?: "global-sg" | "china-beijing";
  expectedUrl: string;
  expectedModelIds: string[];
}) {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-live-text`,
    apiKey: "test-dashscope-key",
    ...(region ? { providerSpecificData: { region } } : {}),
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, connection.id, [
    { id: "qwen-image-stale", name: "Stale image model", source: "imported" },
  ]);

  let fetchCalls = 0;
  let requestedUrl = "";
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input) => {
    fetchCalls += 1;
    requestedUrl = typeof input === "string" ? input : input.toString();
    return new Response(JSON.stringify({ object: "list", data: MIXED_DASHSCOPE_MODELS }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.source, "api");
    assert.deepEqual(
      body.models.map((model: { id: string }) => model.id),
      expectedModelIds
    );
    assert.equal(requestedUrl, expectedUrl);
    assert.equal(fetchCalls, 1);

    const persisted = await modelsDb.getSyncedAvailableModelsForConnection(provider, connection.id);
    assert.deepEqual(
      persisted.map((model) => model.id),
      expectedModelIds
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Qwen Cloud syncs only text models from the selected Beijing region", async () => {
  await assertTextOnlyDiscovery({
    provider: "qwen-cloud",
    region: "china-beijing",
    expectedUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/models",
    expectedModelIds: QWEN_CLOUD_TEXT_MODEL_IDS,
  });
});

test("Alibaba syncs only text models from the selected Global region", async () => {
  await assertTextOnlyDiscovery({
    provider: "alibaba",
    region: "global-sg",
    expectedUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models",
    expectedModelIds: ALIBABA_MODEL_STUDIO_MODEL_IDS,
  });
});

test("Alibaba syncs only text models from the selected Beijing region", async () => {
  await assertTextOnlyDiscovery({
    provider: "alibaba",
    region: "china-beijing",
    expectedUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/models",
    expectedModelIds: ALIBABA_MODEL_STUDIO_MODEL_IDS,
  });
});

test("legacy Alibaba China connections also sync only Beijing text models", async () => {
  await assertTextOnlyDiscovery({
    provider: "alibaba-cn",
    expectedUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1/models",
    expectedModelIds: ALIBABA_MODEL_STUDIO_MODEL_IDS,
  });
});
