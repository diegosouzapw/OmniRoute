import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-alibaba-image-media-"));

const { IMAGE_PROVIDERS, parseImageModel } = await import("../../open-sse/config/imageRegistry.ts");
const { resolveProviderServiceKinds } = await import("../../open-sse/config/mediaServiceKinds.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { resolveAlibabaProviderMediaBaseUrl } =
  await import("../../src/shared/constants/alibabaProviderRegions.ts");

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("Alibaba owns an independent five-model image catalog", () => {
  assert.deepEqual(
    IMAGE_PROVIDERS.alibaba.models.map((model) => model.id),
    [
      "qwen-image-3.0-pro",
      "qwen-image-2.0-pro-2026-06-22",
      "qwen-image-2.0",
      "z-image-turbo",
      "wan2.6-t2i",
    ]
  );
  assert.notEqual(IMAGE_PROVIDERS.alibaba.models, IMAGE_PROVIDERS["bailian-coding-plan"].models);
  assert.notEqual(IMAGE_PROVIDERS.alibaba.models, IMAGE_PROVIDERS["qwen-cloud-token-plan"].models);
  assert.deepEqual(parseImageModel("ali/qwen-image-3.0-pro"), {
    provider: "alibaba",
    model: "qwen-image-3.0-pro",
  });
  assert.deepEqual(resolveProviderServiceKinds("alibaba", ["llm"]).sort(), [
    "image",
    "llm",
    "video",
  ]);
});

test("Alibaba registration preserves existing bare duplicate-model routing", () => {
  assert.deepEqual(parseImageModel("z-image-turbo"), {
    provider: "nanogpt",
    model: "z-image-turbo",
  });
  assert.deepEqual(parseImageModel("qwen-image-2.0"), {
    provider: "lmarena",
    model: "qwen-image-2.0",
  });
  assert.deepEqual(parseImageModel("qwen-image-3.0-pro"), {
    provider: "alibaba",
    model: "qwen-image-3.0-pro",
  });
});

test("Alibaba image URLs follow only the selected Alibaba region", () => {
  assert.equal(
    resolveAlibabaProviderMediaBaseUrl("alibaba", { region: "global-sg" }),
    "https://dashscope-intl.aliyuncs.com/api/v1"
  );
  assert.equal(
    resolveAlibabaProviderMediaBaseUrl("alibaba", { region: "china-beijing" }),
    "https://dashscope.aliyuncs.com/api/v1"
  );
  assert.notEqual(
    resolveAlibabaProviderMediaBaseUrl("alibaba", { region: "global-sg" }),
    resolveAlibabaProviderMediaBaseUrl("bailian-coding-plan", { region: "global-sg" })
  );
  assert.notEqual(
    resolveAlibabaProviderMediaBaseUrl("alibaba", { region: "global-sg" }),
    resolveAlibabaProviderMediaBaseUrl("qwen-cloud-token-plan", { region: "global-sg" })
  );
});

test("All five Alibaba image models use the Alibaba multimodal endpoint and key", async () => {
  const originalFetch = globalThis.fetch;
  const captures = [];

  globalThis.fetch = async (url, options = {}) => {
    captures.push({
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    });
    return jsonResponse({
      output: {
        choices: [
          {
            message: {
              content: [{ image: "https://cdn.example.com/alibaba-image.png" }],
            },
          },
        ],
      },
    });
  };

  try {
    for (const model of IMAGE_PROVIDERS.alibaba.models.map((entry) => entry.id)) {
      const result = await handleImageGeneration({
        body: {
          model: `alibaba/${model}`,
          prompt: "A cinematic horse portrait",
          size: "2048x2048",
          n: 1,
          negative_prompt: "blurry",
          prompt_extend: true,
          watermark: false,
          seed: 42,
        },
        credentials: {
          apiKey: "alibaba-key",
          providerSpecificData: { region: "china-beijing" },
        },
        log: null,
      });
      assert.equal(result.success, true);
    }

    assert.equal(captures.length, 5);
    for (const capture of captures) {
      assert.equal(
        capture.url,
        "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
      );
      assert.equal(capture.headers.Authorization, "Bearer alibaba-key");
      assert.deepEqual(capture.body.input.messages[0].content, [
        { text: "A cinematic horse portrait" },
      ]);
      assert.deepEqual(capture.body.parameters, {
        size: "2048*2048",
        n: 1,
        negative_prompt: "blurry",
        prompt_extend: true,
        watermark: false,
        seed: 42,
      });
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Alibaba rejects image models outside its own allowlist", async () => {
  const result = await handleImageGeneration({
    body: {
      model: "alibaba/wan2.7-image-pro",
      prompt: "wrong catalog",
    },
    credentials: { apiKey: "alibaba-key" },
    log: null,
  });

  assert.equal(result.status, 400);
  assert.match(result.error, /unsupported alibaba image model/i);
});
