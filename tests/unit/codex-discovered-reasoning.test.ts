import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-discovered-reasoning-"));
process.env.DATA_DIR = dataDir;
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { normalizeCodexModelsResponse } =
  await import("../../src/app/api/providers/[id]/models/discovery/codex.ts");
const { persistDiscoveredModels } = await import("../../src/lib/providerModels/modelDiscovery.ts");
const { mergeProviderModelListing } =
  await import("../../src/lib/providers/mergeProviderModelListing.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { resolveExecutionCredentials } =
  await import("../../open-sse/handlers/chatCore/executionCredentials.ts");
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
const { getUnifiedModelsResponse } = await import("../../src/app/api/v1/models/catalog.ts");

const modelId = "future-codex-preview";
const efforts = ["minimal", "low", "high", "max", "ultra"];
let connectionId: string;
test.before(async () => {
  const c = await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "test",
    accessToken: "test",
    isActive: true,
  });
  connectionId = c.id;
});
test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

async function sync() {
  const models = normalizeCodexModelsResponse({
    models: [
      {
        slug: modelId,
        supported_reasoning_levels: [
          ...efforts.map((effort) => ({ effort })),
          { effort: "max" },
          null,
          { effort: 5 },
        ],
        default_reasoning_level: "max",
      },
      {
        slug: "future-codex-max",
        supported_reasoning_levels: ["low", "high"],
        default_reasoning_level: "low",
      },
      {
        slug: "future-codex-high",
        supported_reasoning_levels: ["low", "high"],
        default_reasoning_level: "low",
      },
    ],
  });
  await persistDiscoveredModels("codex", connectionId, models);
  return getSyncedAvailableModelsForConnection("codex", connectionId);
}

test("Codex discovery and repeated sync retain exact native tiers and default", async () => {
  await sync();
  const saved = await sync();
  assert.equal(saved.length, 3);
  assert.deepEqual(saved[0].supportedThinkingEfforts, efforts);
  assert.equal(saved[0].defaultThinkingEffort, "max");
});

test("dashboard and public catalog expose future model wire tiers without client-only Ultra", async () => {
  const saved = await sync();
  const listing = mergeProviderModelListing({
    providerId: "codex",
    registryModels: [{ id: "gpt-5.6-sol-ultra" }],
    syncedModels: saved,
    customModels: [],
  });
  for (const tier of efforts.filter((e) => e !== "ultra"))
    assert.ok(
      listing.some((m) => m.id === `${modelId}-${tier}`),
      tier
    );
  assert.ok(!listing.some((m) => m.id === `${modelId}-ultra`));
  assert.ok(listing.some((m) => m.id === "gpt-5.6-sol-ultra"));
  assert.equal(new Set(listing.map((m) => m.id)).size, listing.length);
  const response = await getUnifiedModelsResponse(new Request("http://localhost/api/v1/models"));
  const catalog = await response.json();
  assert.ok(catalog.data.some((m: { id: string }) => m.id === `cx/${modelId}-max`));
  assert.ok(!catalog.data.some((m: { id: string }) => m.id === `cx/${modelId}-ultra`));
});

async function capture(model: string, body: Record<string, unknown> = {}) {
  const info = await getModelInfo(`cx/${model}`);
  const credentials = resolveExecutionCredentials({
    credentials: { accessToken: "test", connectionId },
    nativeCodexPassthrough: false,
    endpointPath: "/responses",
    targetFormat: "openai-responses",
    provider: "codex",
    ccSessionId: null,
    modelInfo: info,
  });
  const executor = new CodexExecutor();
  const captured: Array<{ model: string; reasoning: { effort: string } }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, init) => {
    captured.push(JSON.parse(String(init?.body)));
    return new Response(JSON.stringify({ id: "resp_test", object: "response" }), {
      headers: { "Content-Type": "application/json" },
    });
  };
  try {
    await executor.execute({
      model: info.model,
      body: { model: info.model, input: [], ...body },
      stream: true,
      credentials,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.equal(captured.length, 1);
  return captured[0];
}

test("resolved future max alias wins over client default and reaches actual upstream body", async () => {
  await sync();
  const body = await capture(`${modelId}-max`, { reasoning: { effort: "low" } });
  assert.equal(body.model, modelId);
  assert.equal(body.reasoning.effort, "max");
});

test("future base default and explicit max are forwarded without xhigh clamping", async () => {
  await sync();
  assert.equal((await capture(modelId)).reasoning.effort, "max");
  assert.equal((await capture(modelId, { reasoning_effort: "max" })).reasoning.effort, "max");
  // A caller's unsupported wire value is left for upstream validation, never silently lowered.
  assert.equal((await capture(modelId, { reasoning_effort: "ultra" })).reasoning.effort, "ultra");
});

test("exact discovered ids ending in max or high remain literal upstream model ids", async () => {
  await sync();
  for (const id of ["future-codex-max", "future-codex-high"]) {
    const body = await capture(id);
    assert.equal(body.model, id);
    assert.equal(body.reasoning.effort, "low");
  }
  assert.equal(
    (await capture("gpt-5.1-codex-max", { reasoning_effort: "high" })).model,
    "gpt-5.1-codex-max"
  );
});

test("chat route preserves the declared native max through Responses translation", async () => {
  await sync();
  const { POST } = await import("../../src/app/api/v1/chat/completions/route.ts");
  const originalFetch = globalThis.fetch;
  const captured: Array<{ model: string; reasoning: { effort: string } }> = [];
  globalThis.fetch = async (url, init) => {
    assert.equal(String(url), "https://chatgpt.com/backend-api/codex/responses");
    captured.push(JSON.parse(String(init?.body)));
    const response = {
      id: "resp_test",
      object: "response",
      status: "completed",
      model: modelId,
      output: [
        { type: "message", role: "assistant", content: [{ type: "output_text", text: "5" }] },
      ],
      usage: { input_tokens: 5, output_tokens: 1, total_tokens: 6 },
    };
    return new Response(
      `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "5", output_index: 0, content_index: 0 })}\n\ndata: ${JSON.stringify({ type: "response.completed", response })}\n\n`,
      { headers: { "Content-Type": "text/event-stream" } }
    );
  };
  try {
    for (const payload of [{ reasoning_effort: "max" }, {}]) {
      const result = await POST(
        new Request("http://localhost/api/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: `cx/${modelId}`,
            messages: [{ role: "user", content: "2+3?" }],
            stream: true,
            ...payload,
          }),
        })
      );
      await result.text();
      assert.equal(result.status, 200);
      assert.equal(captured.at(-1)?.reasoning.effort, "max");
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("resync replaces changed tiers and default without stale variants", async () => {
  await sync();
  await persistDiscoveredModels(
    "codex",
    connectionId,
    normalizeCodexModelsResponse({
      models: [
        {
          slug: modelId,
          supported_reasoning_levels: ["low", "high"],
          default_reasoning_level: "high",
        },
      ],
    })
  );
  const saved = await getSyncedAvailableModelsForConnection("codex", connectionId);
  const listing = mergeProviderModelListing({
    providerId: "codex",
    registryModels: [],
    syncedModels: saved,
    customModels: [],
  });
  assert.equal(listing.length, 3);
  assert.ok(!listing.some((m) => m.id === `${modelId}-max`));
  const info = await getModelInfo(`cx/${modelId}`);
  assert.deepEqual(info.supportedThinkingEfforts, ["low", "high"]);
  assert.equal(info.defaultThinkingEffort, "high");
});

test("malformed defaults are not advertised and literal max metadata remains native", () => {
  const models = normalizeCodexModelsResponse({
    models: [
      {
        slug: "unlisted-default",
        supported_reasoning_levels: ["high"],
        default_reasoning_level: "max",
      },
      {
        slug: "string-tiers",
        supported_reasoning_levels: [" high ", "max", "max"],
        default_reasoning_level: "max",
      },
    ],
  });
  assert.equal(models[0].defaultThinkingEffort, undefined);
  assert.deepEqual(models[1].supportedThinkingEfforts, ["high", "max"]);
  assert.equal(models[1].defaultThinkingEffort, "max");
});
