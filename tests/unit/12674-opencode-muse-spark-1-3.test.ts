import assert from "node:assert/strict";
import test from "node:test";

const BASE_MODEL = "muse-spark-1.3-contributor";
const EFFORTS = ["minimal", "low", "medium", "high", "xhigh"] as const;
const MODEL_IDS = [BASE_MODEL, ...EFFORTS.map((effort) => `${BASE_MODEL}-${effort}`)];

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { resolveComboTargets } = await import("../../open-sse/services/combo.ts");
const { OpencodeExecutor, parseEffortLevel, resolveOpencodeTargetFormat } =
  await import("../../open-sse/executors/opencode.ts");

test("#12674 registry declares Muse Spark 1.3 and every supported effort variant", () => {
  const models = new Map((REGISTRY["opencode-go"].models || []).map((model) => [model.id, model]));

  assert.deepEqual(models.get(BASE_MODEL)?.supportedThinkingEfforts, EFFORTS);

  for (const modelId of MODEL_IDS) {
    const model = models.get(modelId);
    assert.ok(model, `missing opencode-go registry model ${modelId}`);
    assert.equal(model.targetFormat, "openai-responses", `${modelId} wire format`);
    assert.equal(model.supportsReasoning, true, `${modelId} reasoning capability`);
    assert.equal(model.supportsVision, true, `${modelId} vision capability`);
    assert.equal(model.supportsAudio, true, `${modelId} audio capability`);
    assert.equal(model.supportsVideo, true, `${modelId} video capability`);
    assert.equal(model.contextLength, 1048576, `${modelId} context length`);
    assert.equal(model.maxOutputTokens, 131072, `${modelId} output limit`);
  }
});

test("#12674 OpenCode executor routes Muse Spark 1.3 variants to Responses", async () => {
  assert.deepEqual(
    MODEL_IDS.map((modelId) => resolveOpencodeTargetFormat("opencode-go", modelId)),
    MODEL_IDS.map(() => "openai-responses")
  );

  const originalFetch = globalThis.fetch;
  const requestedUrls: string[] = [];
  globalThis.fetch = async (input) => {
    requestedUrls.push(String(input));
    return new Response(
      JSON.stringify({
        id: "chatcmpl-muse-spark-12674",
        object: "chat.completion",
        created: 1,
        model: BASE_MODEL,
        choices: [{ index: 0, message: { role: "assistant", content: "ok" } }],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    await Promise.all(
      MODEL_IDS.map(async (modelId) => {
        const executor = new OpencodeExecutor("opencode-go");
        const result = await executor.execute({
          model: modelId,
          body: {
            model: modelId,
            messages: [{ role: "user", content: "Say hi in 5 words" }],
            max_tokens: 200,
            stream: false,
          },
          stream: false,
          credentials: { apiKey: "test-opencode-go-key" },
        });
        assert.equal(result.response.status, 200, `${modelId} response status`);
      })
    );
    assert.deepEqual(
      requestedUrls,
      MODEL_IDS.map(() => "https://opencode.ai/zen/go/v1/responses")
    );

    for (const effort of EFFORTS) {
      assert.deepEqual(parseEffortLevel(`${BASE_MODEL}-${effort}`), {
        baseModel: BASE_MODEL,
        effort,
      });
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#12674 combo expansion keeps Muse Spark 1.3 targets on the opencode-go Responses route", () => {
  const targets = resolveComboTargets(
    {
      name: "muse-spark-1-3-combo",
      models: MODEL_IDS.map((modelId) => `opencode-go/${modelId}`),
    },
    null,
    undefined,
    new Map()
  );

  assert.deepEqual(
    targets.map((target) => target.modelStr),
    MODEL_IDS.map((modelId) => `opencode-go/${modelId}`)
  );
  for (const target of targets) {
    assert.equal(
      resolveOpencodeTargetFormat(target.provider, target.modelStr),
      "openai-responses",
      `${target.modelStr} combo target format`
    );
  }
});
