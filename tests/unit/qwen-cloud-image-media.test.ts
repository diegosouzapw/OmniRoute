import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-qwen-cloud-image-"));

const { IMAGE_PROVIDERS, parseImageModel } = await import("../../open-sse/config/imageRegistry.ts");
const { resolveProviderServiceKinds } = await import("../../open-sse/config/mediaServiceKinds.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("Qwen Cloud owns an independent six-model image catalog", () => {
  assert.deepEqual(
    IMAGE_PROVIDERS["qwen-cloud"].models.map((model) => model.id),
    [
      "wan2.7-image-pro",
      "wan2.7-image",
      "qwen-image-3.0-pro",
      "qwen-image-2.0-pro-2026-06-22",
      "qwen-image-2.0-2026-03-03",
      "z-image-turbo",
    ]
  );
  assert.notEqual(
    IMAGE_PROVIDERS["qwen-cloud"].models,
    IMAGE_PROVIDERS["qwen-cloud-token-plan"].models
  );
  assert.notEqual(
    IMAGE_PROVIDERS["qwen-cloud"].models,
    IMAGE_PROVIDERS["bailian-coding-plan"].models
  );
  assert.notEqual(IMAGE_PROVIDERS["qwen-cloud"].models, IMAGE_PROVIDERS.alibaba.models);
  assert.deepEqual(parseImageModel("qwc/qwen-image-3.0-pro"), {
    provider: "qwen-cloud",
    model: "qwen-image-3.0-pro",
  });
  assert.deepEqual(resolveProviderServiceKinds("qwen-cloud", ["llm"]).sort(), [
    "image",
    "llm",
    "video",
  ]);
});

test("Qwen Cloud images use only the selected Qwen Cloud endpoint and key", async () => {
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
              content: [{ image: "https://cdn.example.com/qwen-cloud-image.png" }],
            },
          },
        ],
      },
    });
  };

  try {
    for (const model of IMAGE_PROVIDERS["qwen-cloud"].models.map((entry) => entry.id)) {
      const result = await handleImageGeneration({
        body: {
          model: `qwen-cloud/${model}`,
          prompt: "A horse above the clouds",
          size: "2048x2048",
        },
        credentials: {
          apiKey: "qwen-cloud-key",
          providerSpecificData: { region: "china-beijing" },
        },
        log: null,
      });
      assert.equal(result.success, true);
    }

    assert.equal(captures.length, 6);
    for (const capture of captures) {
      assert.equal(
        capture.url,
        "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
      );
      assert.equal(capture.headers.Authorization, "Bearer qwen-cloud-key");
      assert.deepEqual(capture.body.input.messages[0].content, [
        { text: "A horse above the clouds" },
      ]);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Qwen Cloud rejects image models outside its own allowlist", async () => {
  const result = await handleImageGeneration({
    body: {
      model: "qwen-cloud/qwen-image-2.0",
      prompt: "wrong catalog",
    },
    credentials: { apiKey: "qwen-cloud-key" },
    log: null,
  });

  assert.equal(result.status, 400);
  assert.match(result.error, /unsupported qwen-cloud image model/i);
});
